# WebGPU video lab

Local-first demo that plays a file in the browser, pushes each decoded frame through **WebCodecs → WebGPU**, and shows the result live—with optional **GPU scopes**, **optical flow**, and **WebM export** processed entirely on the GPU (no `readPixels` / `getImageData` on the main path).

Browsers can treat **WebCodecs** as the decoder and **WebGPU** as the high-throughput pixel engine. This repo leans on the same bridge API, `GPUDevice.importExternalTexture({ source: videoFrame })`, so frames stay on an efficient GPU path instead of bouncing through CPU bitmaps for every effect.

[Try it out]()

## What it does

- **Decode** with WebCodecs (`new VideoFrame(video, …)`).
- **Normalize** the decoder’s external texture into an internal `rgba8unorm` texture so downstream passes always sample a regular `texture_2d`.
- **Transform** the layer in 3D (straight alpha, premultiplied output where needed).
- **Effects** via WGSL fragment shaders (hue, blur, levels, kaleidoscope, etc.) with ping-pong targets so no pass reads and writes the same attachment.
- **Composite** to the preview canvas (normal, checkerboard, or stacked alpha debug).
- **Analysis** (histogram, waveform, vectorscope) using **compute** shaders that aggregate the post-effects image—parallel for heavy per-pixel work.
- **Optical flow** (Lucas–Kanade-style pipeline in WGSL compute) with a small motion UI; the CPU only sees aggregated stats, not full-frame readback for the main preview.

## Requirements

- A **Chromium-class** browser with **WebGPU** and **WebCodecs** enabled (Chrome/Edge are the realistic baseline).
- A **local video file** loaded through the file picker (no CORS surprises).

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`), choose a video, and use the controls. 


## Notes
- **Intermediate RGBA** is still a GPU texture copy of the external sample; “zero-copy” here means **no JavaScript-visible framebuffer readback** for encoding input, matching common WebCodecs + canvas/OffscreenCanvas patterns—not a claim that the encoder never copies internally.
- **4K @ 60 fps** on the web is plausible with careful pipelining; this demo prioritizes clarity (effects, scopes, motion) over a production scheduling/decoder graph.

## Further reading

- [WebGPU Video Filters: Real-time 4K Processing in JS](https://sachinsharma.dev/blogs/webgpu-video-filters-2026) — motivation and WebCodecs + WebGPU integration sketch  
- [WebGPU](https://www.w3.org/TR/webgpu/) · [WebCodecs](https://www.w3.org/TR/webcodecs/)
