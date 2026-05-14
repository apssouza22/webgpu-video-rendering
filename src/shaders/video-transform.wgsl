// Transform UV math synced from ../src/shaders/composite.wgsl (fragmentMain, ~429–502).
// Outputs straight alpha so ../../src/shaders/output.wgsl can draw transparency grid (parity with main app).

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

struct LayerUniforms {
  opacity: f32,
  blendMode: u32,
  posX: f32,
  posY: f32,
  scaleX: f32,
  scaleY: f32,
  rotationZ: f32,
  sourceAspect: f32,
  outputAspect: f32,
  time: f32,
  hasMask: u32,
  maskInvert: u32,
  rotationX: f32,
  rotationY: f32,
  perspective: f32,
  maskFeather: f32,
  maskFeatherQuality: u32,
  posZ: f32,
  inlineBrightness: f32,
  inlineContrast: f32,
  inlineSaturation: f32,
  inlineInvert: u32,
  _pad4: f32,
  _pad5: f32,
}

@group(0) @binding(0) var samp: sampler;
@group(0) @binding(1) var videoTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> layer: LayerUniforms;

fn luminosity(c: vec3f) -> f32 {
  return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4f {
  var uv = in.uv;

  uv = uv - vec2f(0.5);

  var p = vec3f(uv.x, uv.y / layer.outputAspect, layer.posZ);

  if (abs(layer.rotationX) > 0.0001) {
    let cosX = cos(-layer.rotationX);
    let sinX = sin(-layer.rotationX);
    p = vec3f(
      p.x,
      p.y * cosX - p.z * sinX,
      p.y * sinX + p.z * cosX
    );
  }

  if (abs(layer.rotationY) > 0.0001) {
    let cosY = cos(-layer.rotationY);
    let sinY = sin(-layer.rotationY);
    p = vec3f(
      p.x * cosY + p.z * sinY,
      p.y,
      -p.x * sinY + p.z * cosY
    );
  }

  if (abs(layer.rotationZ) > 0.0001) {
    let cosZ = cos(layer.rotationZ);
    let sinZ = sin(layer.rotationZ);
    p = vec3f(
      p.x * cosZ - p.y * sinZ,
      p.x * sinZ + p.y * cosZ,
      p.z
    );
  }

  let perspectiveDist = max(layer.perspective, 0.5);
  let w = 1.0 - p.z / perspectiveDist;
  let projectedX = p.x / w;
  let projectedY = p.y / w;

  uv = vec2f(projectedX, projectedY * layer.outputAspect);

  uv = uv / vec2f(layer.scaleX, layer.scaleY);

  let aspectRatio = layer.sourceAspect / layer.outputAspect;
  if (aspectRatio > 1.0) {
    uv.y = uv.y * aspectRatio;
  } else {
    uv.x = uv.x / aspectRatio;
  }

  uv = uv + vec2f(0.5) - vec2f(layer.posX, layer.posY);

  let clampedUV = clamp(uv, vec2f(0.0), vec2f(1.0));
  var layerColor = textureSample(videoTex, samp, clampedUV);

  var ec = layerColor.rgb;
  ec = select(ec, 1.0 - ec, layer.inlineInvert == 1u);
  ec = clamp((ec + layer.inlineBrightness - 0.5) * layer.inlineContrast + 0.5, vec3f(0.0), vec3f(1.0));
  ec = mix(vec3f(luminosity(ec)), ec, layer.inlineSaturation);
  layerColor = vec4f(clamp(ec, vec3f(0.0), vec3f(1.0)), layerColor.a);

  let outOfBounds = uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0;
  let maskAlpha = select(layerColor.a, 0.0, outOfBounds);
  let alpha = maskAlpha * layer.opacity;

  return vec4f(layerColor.rgb, alpha);
}
