# Stop processing video pixels on the CPU

Video processing on the CPU is the naive path. It works for small demos, short clips, and a couple of toy filters. It falls apart when the frame size goes up, the frame rate stays high, and every effect wants to touch every pixel.

A single 4K frame has more than 8 million pixels. At 60 frames per second, the system is looking at almost 500 million pixels per second before blur, color correction, transforms, scopes, motion analysis, or export enter the picture. That is too much per-pixel work to treat JavaScript on the CPU as the main processing engine. Video processing is mostly the same operation repeated across millions of pixels. That is GPU work.

The project this article is based on takes that idea seriously: decode the video in the browser, hand each frame to WebGPU, and keep the expensive work on the GPU for as long as possible.

The result is a local-first video processing lab built around WebCodecs and WebGPU. It plays a video file in the browser, imports each decoded frame into a GPU pipeline, applies heavy processing with WGSL shaders, renders a live preview, and can also run GPU-backed analysis such as histogram, waveform, vectorscope, and optical flow.

You can try the demo at [apssouza22.github.io/webgpu-video-processing](https://apssouza22.github.io/webgpu-video-processing) and explore the source code on [GitHub](https://github.com/apssouza22/webgpu-video-processing).

## Why CPU-first video processing breaks down

The simplest browser video processing pipeline usually looks something like this:

![CPU-first browser video pipeline](https://raw.githubusercontent.com/apssouza22/webgpu-video-processing/main/docs/diagrams/cpu-first-pipeline.drawio.png)

That approach is easy to understand. It is also the wrong shape for serious video work.

The CPU is good at control flow, application logic, scheduling, parsing, and all the messy work around the edges. It is not where you want to run millions of identical pixel operations every frame, especially from JavaScript. A GPU is built for that: thousands of small operations running in parallel over images, buffers, and textures.

The copies make the naive design even worse. Every time a full frame is pulled into JavaScript-visible memory, the browser has to move a large chunk of data across a boundary that should stay quiet during playback. Do that once and nobody cares. Do it every frame, then add multiple effects, and the pipeline starts wasting time on traffic instead of image processing.

So the rule is simple: keep the hot path GPU-first. Use the CPU to decide what should happen. Use the GPU to do it.

## The project pipeline

The demo project uses WebCodecs and WebGPU together. WebCodecs gives the app decoded `VideoFrame` objects. WebGPU turns those frames into GPU input with `GPUDevice.importExternalTexture({ source: videoFrame })`.

From there, the frame is normalized into an internal `rgba8unorm` texture. That internal texture becomes the stable input for transforms, effects, analysis passes, and the final preview.

![WebCodecs to WebGPU project pipeline](https://raw.githubusercontent.com/apssouza22/webgpu-video-processing/main/docs/diagrams/webgpu-project-pipeline.drawio.png)

The important part is what is missing from that diagram: there is no `getImageData()`, no `readPixels()`, and no full-frame CPU readback on the main preview path.

That does not mean the browser never copies anything internally. Browser engines, drivers, decoders, and encoders have their own implementation details. The practical claim is narrower and more useful: the app does not pull every processed frame into JavaScript memory just to apply effects.

That matters because reading data back from the GPU is not a cheap convenience API. It can force synchronization between the CPU and GPU, and it moves data in the wrong direction for a real-time preview. If the architecture needs data on the CPU, it should ask for the smallest result it can use, not the whole frame.

This project follows that rule. Effects stay in textures. Scopes render through GPU pipelines. Optical flow does the expensive motion work in compute shaders and reads back compact statistics, not a video frame.

## WebGPU as the pixel engine

Most modern devices already have a GPU. Even thin laptops and phones usually ship with integrated GPUs that sit close to the rest of the system and are built to process images quickly. WebGPU gives browser applications a direct, modern way to use that hardware.

For video processing, this changes the shape of the application.

The CPU still runs the app. It handles UI controls, file selection, frame scheduling, uniforms, and small analysis results. The GPU does the frame work: sampling textures, transforming pixels, chaining effects, drawing previews, and running compute passes.

![CPU and GPU work split in the WebGPU video pipeline](https://raw.githubusercontent.com/apssouza22/webgpu-video-processing/main/docs/diagrams/cpu-gpu-work-split.drawio.png)

That split is the difference between "JavaScript edits video" and "JavaScript orchestrates a GPU video pipeline." The second version is the one that scales.

## Importing frames without a CPU bitmap step

The bridge is `importExternalTexture`.

In the renderer, each frame arrives as a `VideoFrame`. The app imports it as a `GPUExternalTexture`, starts a command encoder, then runs the frame through the GPU pipeline.

```ts
const external = device.importExternalTexture({ source: videoFrame });
const encoder = device.createCommandEncoder({ label: "frame" });

copyPipeline.gpuRender({
  encoder,
  sampler,
  inputView: external,
  outputView: videoTextureView,
});

transformPipeline.gpuRender({
  encoder,
  sampler,
  inputView: videoTextureView,
  outputView: pingTextureView,
});

const finalView = effectsPipeline.gpuRender({
  encoder,
  sampler,
  inputView: pingTextureView,
  outputView: pongTextureView,
});

outputPipeline.gpuRender({
  encoder,
  sampler,
  inputView: finalView,
  outputView: gpuContext.getCurrentTexture().createView(),
});

device.queue.submit([encoder.finish()]);
```

The first pass copies the external texture into the project-owned work texture. That extra copy is a GPU texture-to-texture step, not a trip through a JavaScript bitmap. It is intentional. External textures are great as an entry point, but downstream passes are easier to compose when every stage samples a regular `texture_2d<f32>`.

Once the frame is in that internal texture, the pipeline can treat it like any other GPU image.

## Effects as shader passes

The project implements effects as WGSL fragment shaders. The registry includes color effects such as hue shift, brightness, contrast, saturation, levels, and invert. It also includes heavier image effects such as pixelate, kaleidoscope, mirror, RGB split, and box blur.

A simplified shader pass looks like this:

```wgsl
@group(0) @binding(0) var samp: sampler;
@group(0) @binding(1) var videoTex: texture_2d<f32>;

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(videoTex, samp, in.uv);
  return vec4f(color.rgb, color.a);
}
```

Real effects add uniforms and more math. A blur pass samples neighboring pixels. A levels pass remaps black, white, and gamma. A kaleidoscope pass bends UV coordinates before sampling. The pattern is the same: sample the input texture, compute a new pixel value, and write to a render target.

## Ping-pong textures for heavy chains

GPU render passes cannot safely read from and write to the same texture in the same pass. The project uses a ping-pong pair to chain effects.

![Ping-pong textures for GPU effect chains](https://raw.githubusercontent.com/apssouza22/webgpu-video-processing/main/docs/diagrams/ping-pong-effect-chain.drawio.png)

The code swaps the input and output view after each enabled effect:

```ts
let effectInput = inputView;
let effectOutput = outputView;

for (const effect of enabledEffects) {
  runEffectPass(effect, effectInput, effectOutput);

  const tempView = effectInput;
  effectInput = effectOutput;
  effectOutput = tempView;
}

return effectInput;
```

That small pattern makes the effect chain flexible. One effect, five effects, no effects: the output is still just a GPU texture view that can be handed to the next stage.

## Transforms before effects

The project also applies layer-style transforms on the GPU. Position, scale, opacity, rotation on X/Y/Z, perspective, mirroring, brightness, contrast, saturation, and invert can all happen before the effect chain.

The transform shader samples from the normalized video texture and writes a transformed image into the ping texture. Conceptually, it does this:

```wgsl
var uv = in.uv;
uv = uv - vec2f(0.5);

// Rotate, scale, project, and move the layer.
// Then sample the source video texture at the transformed UV.

let clampedUV = clamp(uv, vec2f(0.0), vec2f(1.0));
var layerColor = textureSample(videoTex, samp, clampedUV);

return vec4f(layerColor.rgb, layerColor.a * layer.opacity);
```

Doing this on the GPU matters. Rotation and perspective are per-pixel operations. If the app did them on the CPU, it would have to resample the image in JavaScript for every frame. Here, it is just another render pass.

## Analysis belongs on the GPU too

The project is not limited to visual filters. It also computes analysis views:

- Histogram
- Waveform
- Vectorscope
- Optical flow

These are also image-wide operations. A histogram needs to inspect many pixels. A waveform maps image intensity into a visual distribution. Optical flow compares frames and estimates motion. None of that wants a full-frame CPU copy in the hot path.

The optical flow pipeline is a good example. It uses compute shaders for grayscale conversion, pyramid downsampling, spatial gradients, temporal gradients, Lucas-Kanade flow, and final statistics.

![Optical flow compute pipeline](https://raw.githubusercontent.com/apssouza22/webgpu-video-processing/main/docs/diagrams/optical-flow-compute-pipeline.drawio.png)

The CPU does receive some data here, but it is compact: motion totals, global motion, local motion, and scene-cut hints. In the implementation, the compute pass writes those numbers into a GPU buffer, copies 64 bytes into a staging buffer, and maps that buffer for reading. That is very different from mapping an entire 4K frame.

This is the architecture point that is easy to miss. GPU readback is allowed, but it should be designed. If the UI needs a number, read a number. If it needs a small histogram, read the bins. If the user needs to see an image, render it from the GPU to a canvas instead of dragging the frame back into JavaScript.

## Why this matters for real projects

The browser is already good at distribution. No installer, no native build, no platform-specific UI work. The hard part has always been performance once media processing gets serious.

WebGPU changes that. It gives browser apps access to the same class of hardware that native video tools rely on, while still keeping the browser workflow.

The demo uses that to process local video with:

- GPU-backed frame import from `VideoFrame`
- Internal GPU textures for predictable downstream processing
- WGSL effects for heavy per-pixel work
- Ping-pong render targets for multi-pass chains
- GPU scopes for visual analysis
- Compute-shader optical flow
- Live preview without full-frame CPU readback

The big idea is simple: do not make the CPU pretend to be a GPU.

Let the CPU coordinate. Let WebCodecs decode. Let WebGPU process the frame where the frame already wants to be.

That is the secret weapon. Not magic, just the right work on the right hardware, and a pipeline that treats GPU readback as a cost to budget for instead of a default step.
