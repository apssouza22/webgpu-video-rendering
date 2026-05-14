import type {
  FrameRenderOptions,
  VideoFrameRenderer,
} from './VideoFrameRenderer';
import type {MotionResult, OpticalFlowAnalyzer} from './analysis';
import {DemoEffectParams, DemoEffectType} from "./types";
import {VideoTransformLayerParams} from "./TransformPipeline";

export interface TransformDemoDom {
  statusEl: HTMLParagraphElement;
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  fileInput: HTMLInputElement;
  opacityInput: HTMLInputElement;
  opacityVal: HTMLSpanElement;
  posXInput: HTMLInputElement;
  posXVal: HTMLSpanElement;
  posYInput: HTMLInputElement;
  posYVal: HTMLSpanElement;
  posZInput: HTMLInputElement;
  posZVal: HTMLSpanElement;
  scaleXInput: HTMLInputElement;
  scaleXVal: HTMLSpanElement;
  scaleYInput: HTMLInputElement;
  scaleYVal: HTMLSpanElement;
  rotXInput: HTMLInputElement;
  rotXVal: HTMLSpanElement;
  rotYInput: HTMLInputElement;
  rotYVal: HTMLSpanElement;
  rotZInput: HTMLInputElement;
  rotZVal: HTMLSpanElement;
  perspectiveInput: HTMLInputElement;
  perspectiveVal: HTMLSpanElement;
  outputModeSelect: HTMLSelectElement;
  effectSelect: HTMLSelectElement;
  mirrorHInput: HTMLInputElement;
  mirrorVInput: HTMLInputElement;
  paramALabel: HTMLSpanElement;
  paramAInput: HTMLInputElement;
  paramAVal: HTMLSpanElement;
  paramBLabel: HTMLSpanElement;
  paramBInput: HTMLInputElement;
  paramBVal: HTMLSpanElement;
  paramCLabel: HTMLSpanElement;
  paramCInput: HTMLInputElement;
  paramCVal: HTMLSpanElement;
  /** Live optical flow readout (optional) */
  motionEl?: HTMLParagraphElement;
}

function degToRad(d: number): number {
  return (d * Math.PI) / 180;
}

export class DemoApp {
  private readonly renderer: VideoFrameRenderer;
  private readonly dom: TransformDemoDom;
  private readonly opticalFlow: OpticalFlowAnalyzer | null;
  private gpuFrameBusy = false;
  private currentObjectUrl: string | null = null;

  private opacity = 1;
  private posX = 0;
  private posY = 0;
  private posZ = 0;
  private scaleX = 1;
  private scaleY = 1;
  private rotXDeg = 0;
  private rotYDeg = 0;
  private rotZDeg = 0;
  private perspective = 2;
  private paramA = 0;
  private paramB = 0;
  private paramC = 1;

  constructor(
      renderer: VideoFrameRenderer,
      dom: TransformDemoDom,
      opticalFlow: OpticalFlowAnalyzer | null = null,
  ) {
    this.renderer = renderer;
    this.dom = dom;
    this.opticalFlow = opticalFlow;
    this.syncNumbersFromDom();
    this.refreshEffectUiLabels();
  }

  private syncNumbersFromDom(): void {
    const d = this.dom;
    this.opacity = Number(d.opacityInput.value);
    this.posX = Number(d.posXInput.value);
    this.posY = Number(d.posYInput.value);
    this.posZ = Number(d.posZInput.value);
    this.scaleX = Number(d.scaleXInput.value);
    this.scaleY = Number(d.scaleYInput.value);
    this.rotXDeg = Number(d.rotXInput.value);
    this.rotYDeg = Number(d.rotYInput.value);
    this.rotZDeg = Number(d.rotZInput.value);
    this.perspective = Number(d.perspectiveInput.value);
    this.paramA = Number(d.paramAInput.value);
    this.paramB = Number(d.paramBInput.value);
    this.paramC = Number(d.paramCInput.value);
  }

  private refreshSpanLabels(): void {
    const d = this.dom;
    d.opacityVal.textContent = this.opacity.toFixed(2);
    d.posXVal.textContent = this.posX.toFixed(2);
    d.posYVal.textContent = this.posY.toFixed(2);
    d.posZVal.textContent = this.posZ.toFixed(2);
    d.scaleXVal.textContent = this.scaleX.toFixed(2);
    d.scaleYVal.textContent = this.scaleY.toFixed(2);
    d.rotXVal.textContent = String(Math.round(this.rotXDeg));
    d.rotYVal.textContent = String(Math.round(this.rotYDeg));
    d.rotZVal.textContent = String(Math.round(this.rotZDeg));
    d.perspectiveVal.textContent = this.perspective.toFixed(2);
    d.paramAVal.textContent = this.fmtSlider(this.paramA);
    d.paramBVal.textContent = this.fmtSlider(this.paramB);
    d.paramCVal.textContent = this.fmtSlider(this.paramC);
  }

  private fmtSlider(v: number): string {
    return Math.abs(v - Math.round(v)) < 1e-6 ? String(Math.round(v)) : v.toFixed(3);
  }

  private refreshEffectUiLabels(): void {
    const t = this.dom.effectSelect.value as DemoEffectType | 'none';
    const { paramALabel, paramBLabel, paramCLabel, paramAInput, paramBInput, paramCInput } = this.dom;

    const hideRow = (row: HTMLSpanElement, input: HTMLInputElement, hide: boolean) => {
      row.style.display = hide ? 'none' : '';
      ;(input.closest('label') as HTMLElement).style.display = hide ? 'none' : '';
    };

    hideRow(paramALabel, paramAInput, t === 'none' || t === 'invert');
    hideRow(paramBLabel, paramBInput, t === 'none' || t === 'invert' || t === 'hue-shift' || t === 'brightness' || t === 'contrast' || t === 'saturation' || t === 'pixelate' || t === 'box-blur');
    hideRow(paramCLabel, paramCInput, t !== 'levels');

    switch (t) {
      case 'hue-shift':
        paramALabel.textContent = 'Hue shift';
        paramAInput.min = '0';
        paramAInput.max = '1';
        paramAInput.step = '0.01';
        paramAInput.value = String(this.paramA > 0 ? this.paramA : '0.15');
        break;
      case 'brightness':
        paramALabel.textContent = 'Brightness Δ';
        paramAInput.min = '-0.5';
        paramAInput.max = '0.5';
        paramAInput.step = '0.01';
        break;
      case 'contrast':
        paramALabel.textContent = 'Contrast';
        paramAInput.min = '0.25';
        paramAInput.max = '3';
        paramAInput.step = '0.02';
        paramAInput.value = paramAInput.value === '' ? '1' : paramAInput.value;
        break;
      case 'saturation':
        paramALabel.textContent = 'Saturation';
        paramAInput.min = '0';
        paramAInput.max = '3';
        paramAInput.step = '0.02';
        paramAInput.value = paramAInput.value === '' ? '1' : paramAInput.value;
        break;
      case 'pixelate':
        paramALabel.textContent = 'Pixel size';
        paramAInput.min = '2';
        paramAInput.max = '80';
        paramAInput.step = '1';
        break;
      case 'box-blur':
        paramALabel.textContent = 'Radius';
        paramAInput.min = '0';
        paramAInput.max = '20';
        paramAInput.step = '1';
        paramAInput.value = paramAInput.value === '' ? '5' : paramAInput.value;
        break;
      case 'kaleidoscope':
        paramALabel.textContent = 'Segments';
        paramAInput.min = '2';
        paramAInput.max = '24';
        paramAInput.step = '1';
        paramBLabel.textContent = 'Rotation';
        paramBInput.min = '-3.15';
        paramBInput.max = '3.15';
        paramBInput.step = '0.05';
        break;
      case 'rgb-split':
        paramALabel.textContent = 'Amount';
        paramAInput.min = '0';
        paramAInput.max = '0.06';
        paramAInput.step = '0.002';
        paramBLabel.textContent = 'Angle rad';
        paramBInput.min = '0';
        paramBInput.max = '6.29';
        paramBInput.step = '0.05';
        break;
      case 'levels':
        paramALabel.textContent = 'Input black';
        paramAInput.min = '0';
        paramAInput.max = '0.45';
        paramAInput.step = '0.01';
        paramBLabel.textContent = 'Input white';
        paramBInput.min = '0.55';
        paramBInput.max = '1';
        paramBInput.step = '0.01';
        paramBInput.value = paramBInput.value === '' ? '1' : paramBInput.value;
        paramCLabel.textContent = 'Gamma';
        paramCInput.min = '0.3';
        paramCInput.max = '3';
        paramCInput.step = '0.05';
        paramCInput.value = paramCInput.value === '' ? '1' : paramCInput.value;
        break;
      default:
        break;
    }

    const mirrorRow = this.dom.mirrorHInput.closest('.mirror-row') as HTMLElement;
    mirrorRow.style.display = t === 'mirror' ? 'flex' : 'none';

    this.syncNumbersFromDom();
    this.refreshSpanLabels();
  }

  private layerParams(): VideoTransformLayerParams {
    return {
      opacity: this.opacity,
      posX: this.posX,
      posY: this.posY,
      posZ: this.posZ,
      scaleX: this.scaleX,
      scaleY: this.scaleY,
      rotationX: degToRad(this.rotXDeg),
      rotationY: degToRad(this.rotYDeg),
      rotationZ: degToRad(this.rotZDeg),
      perspective: this.perspective,
    };
  }

  private effectParams(): DemoEffectParams {
    const t = this.dom.effectSelect.value as DemoEffectType | 'none';
    const a = Number(this.dom.paramAInput.value);
    const b = Number(this.dom.paramBInput.value);
    const c = Number(this.dom.paramCInput.value);

    switch (t) {
      case 'hue-shift':
        return { hueShift: a };
      case 'brightness':
        return { brightnessAmt: a };
      case 'contrast':
        return { contrastAmt: a };
      case 'saturation':
        return { saturationAmt: a };
      case 'pixelate':
        return { pixelate: a };
      case 'kaleidoscope':
        return { kaleidoscopeSegments: a, kaleidoscopeRotation: b };
      case 'mirror':
        return { mirrorH: this.dom.mirrorHInput.checked, mirrorV: this.dom.mirrorVInput.checked };
      case 'rgb-split':
        return { rgbSplitAmount: a, rgbSplitAngle: b };
      case 'levels':
        return {
          levelsInputBlack: a,
          levelsInputWhite: b,
          levelsGamma: c,
          levelsOutputBlack: 0,
          levelsOutputWhite: 1,
        };
      case 'box-blur':
        return { boxBlurRadius: a };
      default:
        return {};
    }
  }

  private frameOptions(): FrameRenderOptions {
    const om = this.dom.outputModeSelect.value;
    const et = this.dom.effectSelect.value as DemoEffectType | 'none';
    return {
      outputMode: om === 'grid' ? 'grid' : om === 'stackedAlpha' ? 'stackedAlpha' : 'normal',
      effectType: et,
      effectParams: this.effectParams(),
      transformParams: this.layerParams(),
    };
  }

  private setStatus(msg: string): void {
    this.dom.statusEl.textContent = msg;
  }

  private setMotionReadout(m: MotionResult): void {
    const el = this.dom.motionEl;
    if (!el) {
      return;
    }
    const t = (x: number) => (x * 100).toFixed(0);
    el.textContent =
        `Optical flow (GPU, Lucas–Kanade pyramid): total ${t(m.total)}% · global ${t(m.global)}% · local ${t(m.local)}%` +
        (m.isSceneCut ? ' · scene cut?' : '');
  }

  start(): void {
    this.dom.video.loop = true;

    const bindRange = (el: HTMLInputElement) => {
      el.addEventListener('input', () => {
        this.syncNumbersFromDom();
        this.refreshSpanLabels();
      });
    };

    bindRange(this.dom.opacityInput);
    bindRange(this.dom.posXInput);
    bindRange(this.dom.posYInput);
    bindRange(this.dom.posZInput);
    bindRange(this.dom.scaleXInput);
    bindRange(this.dom.scaleYInput);
    bindRange(this.dom.rotXInput);
    bindRange(this.dom.rotYInput);
    bindRange(this.dom.rotZInput);
    bindRange(this.dom.perspectiveInput);
    bindRange(this.dom.paramAInput);
    bindRange(this.dom.paramBInput);
    bindRange(this.dom.paramCInput);

    this.dom.effectSelect.addEventListener('change', () => this.refreshEffectUiLabels());
    this.dom.mirrorHInput.addEventListener('change', () => {});
    this.dom.mirrorVInput.addEventListener('change', () => {});

    this.dom.video.addEventListener('loadeddata', () => {
      this.setStatus('Playing — GPU transform, effects, and output pass are live.');
      void this.dom.video.play().catch((e) => this.setStatus(`play() failed: ${e}`));
    });

    this.dom.fileInput.addEventListener('change', () => this.onFileSelected());

    this.refreshSpanLabels();
    this.renderer.configureSurface();
    this.setStatus(
        'Choose a video file to start. Tip: checkerboard preview needs visible alpha — shrink or rotate the layer if the frame is opaque.',
    );
    requestAnimationFrame(() => this.loop());
  }

  private onFileSelected(): void {
    const file = this.dom.fileInput.files?.[0];
    if (!file) {
      return;
    }
    if (this.currentObjectUrl) {
      URL.revokeObjectURL(this.currentObjectUrl);
      this.currentObjectUrl = null;
    }
    this.renderer.releaseWorkTextures();
    this.opticalFlow?.reset();
    this.currentObjectUrl = URL.createObjectURL(file);
    this.dom.video.src = this.currentObjectUrl;
  }

  private loop(): void {
    if (!this.dom.video.paused && !this.dom.video.ended) {
      void this.captureVideoFrame();
    }
    requestAnimationFrame(() => this.loop());
  }

  private async captureVideoFrame(): Promise<void> {
    if (this.gpuFrameBusy) {
      return;
    }
    const { video } = this.dom;
    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      return;
    }
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      return;
    }

    let frame: VideoFrame;
    try {
      const ts = Math.floor(video.currentTime * 1_000_000);
      frame = new VideoFrame(video, { timestamp: ts });
    } catch (e) {
      console.log(`new VideoFrame(video) failed (${e}). Try Chrome; some browsers need WebCodecs + compatible sources.`)

      return;
    }

    // One in-flight capture at a time: `await` below would otherwise let the next
    // rAF start another `new VideoFrame(video)` while this frame is still open,
    // which throws InvalidStateError on many browsers.
    this.gpuFrameBusy = true;

    this.syncNumbersFromDom();

    let flowBitmap: ImageBitmap | null = null;
    if (this.opticalFlow != null) {
      try {
        flowBitmap = await createImageBitmap(frame);
      } catch (e) {
        const el = this.dom.motionEl;
        if (el) {
          el.textContent = `Optical flow: createImageBitmap failed (${e})`;
        }
      }
    }

    this.renderer.renderVideoFrame(
      this.dom.canvas,
      frame,
      this.frameOptions(),
      () => {
        this.gpuFrameBusy = false;
        if (this.opticalFlow && flowBitmap) {
          const bmp = flowBitmap;
          void this.opticalFlow
              .analyzeFrame(bmp)
              .then((m) => this.setMotionReadout(m))
              .catch((e) => {
                const el = this.dom.motionEl;
                if (el) {
                  el.textContent = `Optical flow error: ${e}`;
                }
              })
              .finally(() => bmp.close());
        }
      },
      (message) => this.setStatus(`importExternalTexture failed: ${message}`)
    );
  }
}
