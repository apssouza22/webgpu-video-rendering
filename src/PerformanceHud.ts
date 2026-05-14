/**
 * Smoothed readout of WebGPU video processing: frame rate and GPU idle latency
 * (preview pipeline plus histogram / waveform / vectorscope submits).
 */
export interface PerformanceHudElements {
  fps: HTMLElement;
  gpuMs: HTMLElement;
  prepMs: HTMLElement;
  resolution: HTMLElement;
}

export class PerformanceHud {
  private readonly els: PerformanceHudElements;
  private lastGpuEnd = 0;
  private smoothedGpu = 0;
  private smoothedFps = 0;
  private smoothedPrep = 0;
  private readonly alpha = 0.14;

  constructor(els: PerformanceHudElements) {
    this.els = els;
  }

  reset(): void {
    this.lastGpuEnd = 0;
    this.smoothedGpu = 0;
    this.smoothedFps = 0;
    this.smoothedPrep = 0;
    this.els.fps.textContent = '—';
    this.els.gpuMs.textContent = '—';
    this.els.prepMs.textContent = '—';
    this.els.resolution.textContent = '—';
  }

  /**
   * @param gpuStart - performance.now() immediately before `renderVideoFrame`
   * @param gpuEnd - performance.now() inside onComplete (after queue idle)
   * @param prepMs - optional CPU time before GPU (e.g. ImageBitmap for optical flow)
   */
  recordFrame(
      gpuStart: number,
      gpuEnd: number,
      vw: number,
      vh: number,
      cw: number,
      ch: number,
      prepMs?: number,
  ): void {
    const gpuRaw = Math.max(0, gpuEnd - gpuStart);
    this.smoothedGpu =
        this.smoothedGpu === 0
            ? gpuRaw
            : this.smoothedGpu * (1 - this.alpha) + gpuRaw * this.alpha;

    if (this.lastGpuEnd > 0) {
      const dt = gpuEnd - this.lastGpuEnd;
      if (dt > 0.5) {
        const inst = 1000 / dt;
        this.smoothedFps =
            this.smoothedFps === 0
                ? inst
                : this.smoothedFps * (1 - this.alpha) + inst * this.alpha;
      }
    }
    this.lastGpuEnd = gpuEnd;

    if (prepMs !== undefined && prepMs >= 0) {
      this.smoothedPrep =
          this.smoothedPrep === 0
              ? prepMs
              : this.smoothedPrep * (1 - this.alpha) + prepMs * this.alpha;
      this.els.prepMs.textContent =
          this.smoothedPrep < 0.05 ? '—' : this.smoothedPrep.toFixed(2);
    } else {
      this.smoothedPrep = 0;
      this.els.prepMs.textContent = '—';
    }

    this.els.fps.textContent =
        this.smoothedFps === 0 ? '—' : this.smoothedFps.toFixed(0);
    this.els.gpuMs.textContent = this.smoothedGpu.toFixed(2);
    this.els.resolution.textContent = `${cw}×${ch} ← ${vw}×${vh}`;
  }
}
