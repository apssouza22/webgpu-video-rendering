import {EffectsPipeline} from './EffectsPipeline';
import {OutputPipeline} from './OutputPipeline';
import {CopyPipeline} from './CopyPipeline';
import {TransformPipeline, type VideoTransformLayerParams} from './TransformPipeline';
import {DemoEffectParams, DemoEffectType, PingPongTexturePair} from "./types";
import {ScopeRenderer} from './analysis';

const WORK_FORMAT: GPUTextureFormat = 'rgba8unorm';
export type OutputPresentationMode = 'normal' | 'grid' | 'stackedAlpha';

/** Optional WebGPU canvases for histogram / waveform / vectorscope (see `src/analysis/`). */
export interface ScopeGpuContexts {
  histogram?: GPUCanvasContext | null;
  waveform?: GPUCanvasContext | null;
  vectorscope?: GPUCanvasContext | null;
}

export interface FrameRenderOptions {
  effectType: DemoEffectType | 'none';
  effectParams: DemoEffectParams;
  outputMode: OutputPresentationMode;
  transformParams: VideoTransformLayerParams;
}

export class VideoFrameRenderer {
  readonly device: GPUDevice;
  readonly gpuContext: GPUCanvasContext;
  private readonly presentationFormat: GPUTextureFormat;
  private readonly sampler: GPUSampler;
  private readonly effectsPipeline: EffectsPipeline;
  private readonly outputPipeline: OutputPipeline;

  private videoTexture: GPUTexture | null = null;
  private videoView: GPUTextureView | null = null;
  private videoWidth = 0;
  private videoHeight = 0;

  private canvasWidth = 0;
  private canvasHeight = 0;

  private transformPipeline: TransformPipeline;
  private copyPipeline: CopyPipeline;
  private pingPongView: PingPongTexturePair | null = null;
  private readonly scopeRenderer: ScopeRenderer | null;
  private readonly scopeContexts: ScopeGpuContexts;

  private constructor(
      device: GPUDevice,
      gpuContext: GPUCanvasContext,
      presentationFormat: GPUTextureFormat,
      sampler: GPUSampler,
      effects: EffectsPipeline,
      outputPass: OutputPipeline,
      copyPipeline: CopyPipeline,
      transformPipeline: TransformPipeline,
      scopeRenderer: ScopeRenderer | null,
      scopeContexts: ScopeGpuContexts,
  ) {
    this.device = device;
    this.gpuContext = gpuContext;
    this.presentationFormat = presentationFormat;
    this.sampler = sampler;
    this.effectsPipeline = effects;
    this.outputPipeline = outputPass;
    this.transformPipeline = transformPipeline;
    this.copyPipeline = copyPipeline;
    this.scopeRenderer = scopeRenderer;
    this.scopeContexts = scopeContexts;
  }

  static async create(
      canvas: HTMLCanvasElement,
      scopeContexts: ScopeGpuContexts = {},
  ): Promise<VideoFrameRenderer> {
    const adapter = await navigator.gpu!.requestAdapter({powerPreference: 'high-performance'});
    if (!adapter) {
      throw new Error('No WebGPU adapter');
    }
    const device = await adapter.requestDevice();
    const gpuContext = canvas.getContext('webgpu');
    if (!gpuContext) {
      throw new Error('Could not get WebGPU canvas context');
    }
    const presentationFormat = navigator.gpu!.getPreferredCanvasFormat();

    const effectPipeline = EffectsPipeline.create(device);
    const outputPipeline = OutputPipeline.create(device);
    const copyPipeline = CopyPipeline.create(device, WORK_FORMAT);
    const transformPipeline = TransformPipeline.create(device, WORK_FORMAT);

    const sampler = device.createSampler({
      label: 'linear-clamp',
      magFilter: 'linear',
      minFilter: 'linear',
      addressModeU: 'clamp-to-edge',
      addressModeV: 'clamp-to-edge',
    });

    const hasScopes = Boolean(
        scopeContexts.histogram || scopeContexts.waveform || scopeContexts.vectorscope,
    );
    const scopeRenderer = hasScopes ? new ScopeRenderer(device, presentationFormat) : null;

    const configureCtx = (ctx: GPUCanvasContext | null | undefined) => {
      if (!ctx) return;
      ctx.configure({
        device,
        format: presentationFormat,
        alphaMode: 'premultiplied',
      });
    };
    configureCtx(scopeContexts.histogram ?? null);
    configureCtx(scopeContexts.waveform ?? null);
    configureCtx(scopeContexts.vectorscope ?? null);

    return new VideoFrameRenderer(
        device,
        gpuContext,
        presentationFormat,
        sampler,
        effectPipeline,
        outputPipeline,
        copyPipeline,
        transformPipeline,
        scopeRenderer,
        scopeContexts,
    );
  }

  configureSurface(): void {
    this.gpuContext.configure({
      device: this.device,
      format: this.presentationFormat,
      alphaMode: 'premultiplied',
    });
  }

  releaseWorkTextures(): void {
    this.videoTexture?.destroy();
    this.videoTexture = null;
    this.videoView = null;
    this.videoWidth = 0;
    this.videoHeight = 0;

    this.pingPongView?.destroy();
    this.pingPongView = null;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    this.outputPipeline.invalidateCache();
  }

  private ensureVideoTexture(width: number, height: number): void {
    if (width === this.videoWidth && height === this.videoHeight && this.videoTexture && this.videoView) {
      return;
    }
    this.videoTexture?.destroy();
    this.videoWidth = width;
    this.videoHeight = height;
    this.videoTexture = this.device.createTexture({
      label: 'video-rgba',
      size: [width, height],
      format: WORK_FORMAT,
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    });
    this.videoView = this.videoTexture.createView();
  }

  private ensureCanvasTextures(width: number, height: number): void {
    if (
        width === this.canvasWidth &&
        height === this.canvasHeight
    ) {
      return;
    }
    this.pingPongView?.destroy();
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.pingPongView = new PingPongTexturePair(this.device, width, height);
    this.outputPipeline.invalidateCache();
  }

  renderVideoFrame(
      canvas: HTMLCanvasElement,
      videoFrame: VideoFrame,
      frameOptions: FrameRenderOptions,
      onComplete: () => void,
      onImportError: (message: string) => void
  ): void {
    const vw = videoFrame.displayWidth;
    const vh = videoFrame.displayHeight;
    if (vw < 1 || vh < 1) {
      videoFrame.close();
      onComplete();
      return;
    }
    const cw = canvas.width;
    const ch = canvas.height;
    if (cw < 1 || ch < 1) {
      videoFrame.close();
      onComplete();
      return;
    }

    this.configureSurface();
    this.ensureVideoTexture(vw, vh);
    this.ensureCanvasTextures(cw, ch);

    if (!this.videoView || !this.pingPongView) {
      videoFrame.close();
      onComplete();
      return;
    }

    let external: GPUExternalTexture;
    try {
      external = this.device.importExternalTexture({source: videoFrame});
    } catch (e) {
      onImportError(String(e));
      videoFrame.close();
      onComplete();
      return;
    }
    this.copyPipeline.setOptions(frameOptions, cw, ch, vw, vh)
    this.transformPipeline.setOptions(frameOptions, cw, ch, vw, vh)
    this.effectsPipeline.setOptions(frameOptions, cw, ch, vw, vh)
    this.outputPipeline.setOptions(frameOptions, cw, ch, vw, vh)

    const encoder = this.device.createCommandEncoder({label: 'frame'});
    const params = {
      encoder,
      sampler: this.sampler,
      inputView: external,
      outputView: this.videoView
    };
    this.copyPipeline.gpuRender({...params});
    this.transformPipeline.gpuRender({
      ...params,
      inputView: this.videoView,
      outputView: this.pingPongView.ping,
    });
    const effectOutputView = this.effectsPipeline.gpuRender({
      ...params,
      inputView: this.pingPongView.ping,
      outputView: this.pingPongView.pong,
    });
    this.outputPipeline.gpuRender({
      ...params,
      inputView: effectOutputView,
      outputView: this.gpuContext.getCurrentTexture().createView()
    });
    this.device.queue.submit([encoder.finish()]);

    const scopes = this.scopeRenderer;
    if (scopes) {
      const { histogram, waveform, vectorscope } = this.scopeContexts;
      if (histogram) {
        scopes.renderHistogram(effectOutputView, histogram, cw, ch, 0);
      }
      if (waveform) {
        scopes.renderWaveform(effectOutputView, waveform, cw, ch, 0);
      }
      if (vectorscope) {
        scopes.renderVectorscope(effectOutputView, vectorscope, cw, ch);
      }
    }

    const done = this.device.queue.onSubmittedWorkDone?.();
    if (done) {
      void done.then(() => {
        videoFrame.close();
        onComplete();
      });
    } else {
      videoFrame.close();
      onComplete();
    }
  }

}
