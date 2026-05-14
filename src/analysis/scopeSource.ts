/** Accept either a texture or a view (effect pipeline returns views). */

export type ScopeSourceTexture = GPUTexture | GPUTextureView;

export function scopeSourceView(src: ScopeSourceTexture): GPUTextureView {
  return src instanceof GPUTexture ? src.createView() : src;
}
