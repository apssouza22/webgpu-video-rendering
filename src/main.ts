import { DemoApp } from './DemoApp';
import { MotionFlowVisualization } from './analysis/MotionFlowVisualization';
import { OpticalFlowAnalyzer } from './analysis/OpticalFlowAnalyzer';
import { VideoFrameRenderer } from './VideoFrameRenderer';

const statusEl = document.querySelector<HTMLParagraphElement>('#status')!;
const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
const video = document.querySelector<HTMLVideoElement>('#video')!;
const fileInput = document.querySelector<HTMLInputElement>('#file')!;

const scopeHistogramCanvas = document.querySelector<HTMLCanvasElement>('#scopeHistogram');
const scopeWaveformCanvas = document.querySelector<HTMLCanvasElement>('#scopeWaveform');
const scopeVectorscopeCanvas = document.querySelector<HTMLCanvasElement>('#scopeVectorscope');

const scopeHistogramCtx = scopeHistogramCanvas?.getContext('webgpu') ?? null;
const scopeWaveformCtx = scopeWaveformCanvas?.getContext('webgpu') ?? null;
const scopeVectorscopeCtx = scopeVectorscopeCanvas?.getContext('webgpu') ?? null;

const outputModeSelect = document.querySelector<HTMLSelectElement>('#outputMode')!;
const effectSelect = document.querySelector<HTMLSelectElement>('#effectType')!;
const mirrorHInput = document.querySelector<HTMLInputElement>('#mirrorH')!;
const mirrorVInput = document.querySelector<HTMLInputElement>('#mirrorV')!;

const paramALabel = document.querySelector<HTMLSpanElement>('#paramALabel')!;
const paramAInput = document.querySelector<HTMLInputElement>('#paramA')!;
const paramAVal = document.querySelector<HTMLSpanElement>('#paramAVal')!;
const paramBLabel = document.querySelector<HTMLSpanElement>('#paramBLabel')!;
const paramBInput = document.querySelector<HTMLInputElement>('#paramB')!;
const paramBVal = document.querySelector<HTMLSpanElement>('#paramBVal')!;
const paramCLabel = document.querySelector<HTMLSpanElement>('#paramCLabel')!;
const paramCInput = document.querySelector<HTMLInputElement>('#paramC')!;
const paramCVal = document.querySelector<HTMLSpanElement>('#paramCVal')!;

const opacityInput = document.querySelector<HTMLInputElement>('#opacity')!;
const opacityVal = document.querySelector<HTMLSpanElement>('#opacityVal')!;
const posXInput = document.querySelector<HTMLInputElement>('#posX')!;
const posXVal = document.querySelector<HTMLSpanElement>('#posXVal')!;
const posYInput = document.querySelector<HTMLInputElement>('#posY')!;
const posYVal = document.querySelector<HTMLSpanElement>('#posYVal')!;
const posZInput = document.querySelector<HTMLInputElement>('#posZ')!;
const posZVal = document.querySelector<HTMLSpanElement>('#posZVal')!;
const scaleXInput = document.querySelector<HTMLInputElement>('#scaleX')!;
const scaleXVal = document.querySelector<HTMLSpanElement>('#scaleXVal')!;
const scaleYInput = document.querySelector<HTMLInputElement>('#scaleY')!;
const scaleYVal = document.querySelector<HTMLSpanElement>('#scaleYVal')!;
const rotXInput = document.querySelector<HTMLInputElement>('#rotX')!;
const rotXVal = document.querySelector<HTMLSpanElement>('#rotXVal')!;
const rotYInput = document.querySelector<HTMLInputElement>('#rotY')!;
const rotYVal = document.querySelector<HTMLSpanElement>('#rotYVal')!;
const rotZInput = document.querySelector<HTMLInputElement>('#rotZ')!;
const rotZVal = document.querySelector<HTMLSpanElement>('#rotZVal')!;
const perspectiveInput = document.querySelector<HTMLInputElement>('#perspective')!;
const perspectiveVal = document.querySelector<HTMLSpanElement>('#perspectiveVal')!;
const motionPanel = document.querySelector<HTMLElement>('#motionPanel');
const motionViz = motionPanel ? new MotionFlowVisualization(motionPanel) : undefined;

if (!navigator.gpu) {
  statusEl.textContent =
      'WebGPU is not available here. Try a recent Chromium-based browser with GPU acceleration enabled.';
  throw new Error('no webgpu');
}

const renderer = await VideoFrameRenderer.create(canvas, {
  histogram: scopeHistogramCtx,
  waveform: scopeWaveformCtx,
  vectorscope: scopeVectorscopeCtx,
});

const opticalFlow = new OpticalFlowAnalyzer(renderer.device);
const flowReady = await opticalFlow.initialize();
if (!flowReady) {
  motionViz?.setError('Optical flow: GPU initialization failed (check the console).');
}

const app = new DemoApp(renderer, {
  statusEl,
  canvas,
  video,
  fileInput,
  opacityInput,
  opacityVal,
  posXInput,
  posXVal,
  posYInput,
  posYVal,
  posZInput,
  posZVal,
  scaleXInput,
  scaleXVal,
  scaleYInput,
  scaleYVal,
  rotXInput,
  rotXVal,
  rotYInput,
  rotYVal,
  rotZInput,
  rotZVal,
  perspectiveInput,
  perspectiveVal,
  outputModeSelect,
  effectSelect,
  mirrorHInput,
  mirrorVInput,
  paramALabel,
  paramAInput,
  paramAVal,
  paramBLabel,
  paramBInput,
  paramBVal,
  paramCLabel,
  paramCInput,
  paramCVal,
  motionViz,
}, flowReady ? opticalFlow : null);
app.start();
