// Copy GPUExternalTexture (VideoFrame / HTMLVideoElement) into a regular rgba8unorm target.
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VertexOutput {
  var pos = array<vec2f, 6>(
    vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0)
  );
  var uv = array<vec2f, 6>(
    vec2f(0.0, 1.0), vec2f(1.0, 1.0), vec2f(0.0, 0.0),
    vec2f(0.0, 0.0), vec2f(1.0, 1.0), vec2f(1.0, 0.0)
  );
  var o: VertexOutput;
  o.position = vec4f(pos[vi], 0.0, 1.0);
  o.uv = uv[vi];
  return o;
}

@group(0) @binding(0) var samp: sampler;
@group(0) @binding(1) var ext: texture_external;

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4f {
  return textureSampleBaseClampToEdge(ext, samp, in.uv);
}
