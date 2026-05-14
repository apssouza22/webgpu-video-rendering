export interface GpuRenderParams {
  encoder: GPUCommandEncoder,
  sampler: GPUSampler,
  inputView: GPUTextureView | GPUExternalTexture,
  outputView: GPUTextureView,
  externalTexture?: GPUExternalTexture,
}

export const DEMO_EFFECT_IDS = [
  'hue-shift',
  'brightness',
  'contrast',
  'saturation',
  'pixelate',
  'kaleidoscope',
  'mirror',
  'rgb-split',
  'invert',
  'levels',
  'box-blur',
] as const;

export type DemoEffectType = (typeof DEMO_EFFECT_IDS)[number];

export interface DemoEffectParams {
  hueShift?: number;
  brightnessAmt?: number;
  contrastAmt?: number;
  saturationAmt?: number;
  pixelate?: number;
  kaleidoscopeSegments?: number;
  kaleidoscopeRotation?: number;
  mirrorH?: boolean;
  mirrorV?: boolean;
  rgbSplitAmount?: number;
  rgbSplitAngle?: number;
  levelsInputBlack?: number;
  levelsInputWhite?: number;
  levelsGamma?: number;
  levelsOutputBlack?: number;
  levelsOutputWhite?: number;
  boxBlurRadius?: number;
}

/**
 * Two interchangeable render Target views: each pass reads from one and draws into the other
 * so fragment shaders never sample and write the same attachment.
 */
export class PingPongTexturePair {
  private device : GPUDevice;
  private texturePing: GPUTexture;
  private texturePong: GPUTexture;
  public readonly ping: GPUTextureView;
  public readonly pong: GPUTextureView;

  constructor(device: GPUDevice, width:number, height:number) {
    const desc: GPUTextureDescriptor = {
      label: 'canvas-ping',
      size: [width, height],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    };
    this.device = device;
    this.texturePing = this.device.createTexture(desc);
    this.texturePong = this.device.createTexture({...desc, label: 'canvas-pong'});
    this.ping = this.texturePing.createView();
    this.pong = this.texturePong.createView();
  }

  destroy() {
    this.texturePing.destroy();
    this.texturePong.destroy();
  }

}
