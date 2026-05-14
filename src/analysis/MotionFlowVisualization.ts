import type { MotionResult } from './OpticalFlowAnalyzer';

const SMOOTH = 0.14;
const SCENE_CUT_HOLD_FRAMES = 28;
const HISTORY_CAP = 140;

/**
 * Rich optical-flow readout: exponential smoothing, horizontal meters, sparkline history.
 */
export class MotionFlowVisualization {
  private readonly root: HTMLElement;
  private readonly statusEl: HTMLElement;
  private readonly sceneCutEl: HTMLElement;
  private readonly fills: { total: HTMLElement; global: HTMLElement; local: HTMLElement };
  private readonly vals: { total: HTMLElement; global: HTMLElement; local: HTMLElement };
  private readonly sparkline: HTMLCanvasElement;
  private sparklineCtx: CanvasRenderingContext2D | null = null;

  private smTotal = 0;
  private smGlobal = 0;
  private smLocal = 0;
  private history: number[] = [];
  private sceneCutHold = 0;
  private resizeObs: ResizeObserver | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.statusEl = root.querySelector('#motionStatus')!;
    this.sceneCutEl = root.querySelector('#motionSceneCut')!;
    this.sparkline = root.querySelector('#motionSparkline') as HTMLCanvasElement;
    this.fills = {
      total: root.querySelector('[data-flow-fill="total"]')!,
      global: root.querySelector('[data-flow-fill="global"]')!,
      local: root.querySelector('[data-flow-fill="local"]')!,
    };
    this.vals = {
      total: root.querySelector('[data-flow-val="total"]')!,
      global: root.querySelector('[data-flow-val="global"]')!,
      local: root.querySelector('[data-flow-val="local"]')!,
    };
    this.sparklineCtx = this.sparkline.getContext('2d');
    this.observeSparklineSize();
  }

  private observeSparklineSize(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    this.resizeObs = new ResizeObserver(() => this.redrawSparkline());
    this.resizeObs.observe(this.sparkline);
  }

  destroy(): void {
    this.resizeObs?.disconnect();
    this.resizeObs = null;
  }

  setWaiting(message = 'Waiting for video frames…'): void {
    this.statusEl.textContent = message;
    this.statusEl.hidden = false;
    this.root.classList.add('motion-panel--idle');
  }

  setError(message: string): void {
    this.statusEl.textContent = message;
    this.statusEl.hidden = false;
    this.root.classList.add('motion-panel--idle');
  }

  /** Call when changing source clip so meters and history restart clean. */
  reset(): void {
    this.smTotal = 0;
    this.smGlobal = 0;
    this.smLocal = 0;
    this.history = [];
    this.sceneCutHold = 0;
    this.sceneCutEl.hidden = true;
    this.fills.total.style.width = '0%';
    this.fills.global.style.width = '0%';
    this.fills.local.style.width = '0%';
    this.vals.total.textContent = '0%';
    this.vals.global.textContent = '0%';
    this.vals.local.textContent = '0%';
    this.redrawSparkline();
    this.setWaiting('Waiting for video frames…');
  }

  private hideStatus(): void {
    this.statusEl.hidden = true;
    this.root.classList.remove('motion-panel--idle');
  }

  update(m: MotionResult): void {
    this.hideStatus();

    const a = SMOOTH;
    this.smTotal = this.smTotal * (1 - a) + m.total * a;
    this.smGlobal = this.smGlobal * (1 - a) + m.global * a;
    this.smLocal = this.smLocal * (1 - a) + m.local * a;

    if (m.isSceneCut) {
      this.sceneCutHold = SCENE_CUT_HOLD_FRAMES;
    } else {
      this.sceneCutHold = Math.max(0, this.sceneCutHold - 1);
    }
    this.sceneCutEl.hidden = this.sceneCutHold === 0;

    const p = (x: number) => Math.min(100, Math.max(0, Math.round(x * 100)));

    const pt = p(this.smTotal);
    const pg = p(this.smGlobal);
    const pl = p(this.smLocal);

    this.fills.total.style.width = `${pt}%`;
    this.fills.global.style.width = `${pg}%`;
    this.fills.local.style.width = `${pl}%`;

    this.vals.total.textContent = `${pt}%`;
    this.vals.global.textContent = `${pg}%`;
    this.vals.local.textContent = `${pl}%`;

    this.history.push(this.smTotal);
    if (this.history.length > HISTORY_CAP) {
      this.history.shift();
    }
    this.redrawSparkline();
  }

  private redrawSparkline(): void {
    const ctx = this.sparklineCtx;
    if (!ctx) {
      return;
    }

    const canvas = this.sparkline;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const cssW = canvas.clientWidth || 320;
    const cssH = 56;
    const bw = Math.max(1, Math.floor(cssW * dpr));
    const bh = Math.max(1, Math.floor(cssH * dpr));
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = cssW;
    const h = cssH;
    const pad = { t: 6, r: 4, b: 6, l: 4 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(15, 23, 36, 0.95)';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.lineWidth = 1;
    for (const frac of [0.25, 0.5, 0.75] as const) {
      const y = pad.t + innerH * (1 - frac);
      ctx.beginPath();
      ctx.moveTo(pad.l, y);
      ctx.lineTo(pad.l + innerW, y);
      ctx.stroke();
    }

    const hist = this.history;
    if (hist.length < 2) {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillText('History builds as the clip plays…', pad.l, pad.t + 14);
      return;
    }

    const n = hist.length;
    const xAt = (i: number) => pad.l + (i / (n - 1)) * innerW;
    const yAt = (v: number) => pad.t + innerH * (1 - Math.min(1, Math.max(0, v)));

    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + innerH);
    grad.addColorStop(0, 'rgba(34, 211, 238, 0.35)');
    grad.addColorStop(1, 'rgba(34, 211, 238, 0.02)');
    ctx.beginPath();
    ctx.moveTo(xAt(0), yAt(hist[0]!));
    for (let i = 1; i < n; i++) {
      ctx.lineTo(xAt(i), yAt(hist[i]!));
    }
    ctx.lineTo(xAt(n - 1), pad.t + innerH);
    ctx.lineTo(xAt(0), pad.t + innerH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(xAt(0), yAt(hist[0]!));
    for (let i = 1; i < n; i++) {
      ctx.lineTo(xAt(i), yAt(hist[i]!));
    }
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.95)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}
