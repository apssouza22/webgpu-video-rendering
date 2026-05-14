
struct OutputUniforms {
  showTransparencyGrid: u32,
  outputWidth: f32,
  outputHeight: f32,
  _padding: f32,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var positions = array<vec2f, 6>(
    vec2f(-1.0, -1.0),
    vec2f(1.0, -1.0),
    vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0),
    vec2f(1.0, -1.0),
    vec2f(1.0, 1.0)
  );

  // triangle strip: 0, 1, 2, 3, 4, 5
  var uvs = array<vec2f, 6>(
    vec2f(0.0, 1.0), // top-left
    vec2f(1.0, 1.0), // top-right
    vec2f(0.0, 0.0), // bottom-left
    vec2f(0.0, 0.0), // bottom-left
    vec2f(1.0, 1.0), // top-right
    vec2f(1.0, 0.0) // bottom-right
  );

  var output: VertexOutput;
  output.position = vec4f(positions[vertexIndex], 0.0, 1.0);
  output.uv = uvs[vertexIndex];
  return output;
}

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTexture: texture_2d<f32>;
@group(0) @binding(2) var<uniform> uniforms: OutputUniforms;

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  if (uniforms.showTransparencyGrid == 2u) {
    let topUV = vec2f(input.uv.x, input.uv.y * 2.0);
    let botUV = vec2f(input.uv.x, (input.uv.y - 0.5) * 2.0);
    let topColor = textureSample(inputTexture, texSampler, topUV);
    let botColor = textureSample(inputTexture, texSampler, botUV);
    let isBottom = input.uv.y >= 0.5;
    let rgb = select(topColor.rgb, vec3f(botColor.a), isBottom);
    return vec4f(rgb, 1.0);
  }

  let color = textureSample(inputTexture, texSampler, input.uv);

  if (uniforms.showTransparencyGrid == 1u && color.a < 1.0) {
    let pixelX = input.uv.x * uniforms.outputWidth;
    let pixelY = input.uv.y * uniforms.outputHeight;
    let checkerSize = 24.0;
    let cx = floor(pixelX / checkerSize);
    let cy = floor(pixelY / checkerSize);
    let checker = (u32(cx) + u32(cy)) % 2u;
    let light = 0.25;
    let dark = 0.19;
    let bg = select(dark, light, checker == 0u);
    let checkerColor = vec3f(bg);
    let result = mix(checkerColor, color.rgb, color.a);
    return vec4f(result, 1.0);
  }

  // Default preview: straight-alpha input → premultiplied RGBA for the swap chain
  // (VideoFrameRenderer uses canvas alphaMode "premultiplied"). Preserves empty
  // margin around scaled / moved layers instead of smearing edge-clamped RGB.
  return vec4f(color.rgb * color.a, color.a);
}
