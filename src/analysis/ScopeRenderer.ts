/**
 * GPU-accelerated scope renderer.
 * Delegates to specialized scope classes for each mode.
 */

import { WaveformScope } from './WaveformScope';
import { HistogramScope } from './HistogramScope';
import { VectorscopeScope } from './VectorscopeScope';
import type { ScopeSourceTexture } from './scopeSource';

export class ScopeRenderer {
  private waveform: WaveformScope;
  private histogram: HistogramScope;
  private vectorscope: VectorscopeScope;

  constructor(device: GPUDevice, format: GPUTextureFormat) {
    this.waveform = new WaveformScope(device, format);
    this.histogram = new HistogramScope(device, format);
    this.vectorscope = new VectorscopeScope(device, format);
  }

  renderWaveform(
      source: ScopeSourceTexture,
      ctx: GPUCanvasContext,
      srcW: number,
      srcH: number,
      mode: number = 0
  ) {
    this.waveform.render(source, ctx, srcW, srcH, mode);
  }

  renderHistogram(
      source: ScopeSourceTexture,
      ctx: GPUCanvasContext,
      srcW: number,
      srcH: number,
      mode: number = 0
  ) {
    this.histogram.render(source, ctx, srcW, srcH, mode);
  }

  renderVectorscope(
      source: ScopeSourceTexture,
      ctx: GPUCanvasContext,
      srcW: number,
      srcH: number
  ) {
    this.vectorscope.render(source, ctx, srcW, srcH);
  }

  destroy() {
    this.waveform.destroy();
    this.histogram.destroy();
    this.vectorscope.destroy();
  }
}
