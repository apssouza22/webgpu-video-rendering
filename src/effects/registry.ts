import commonShader from '../shaders/effects/_shared-common.wgsl?raw';
import hueShiftShader from '../shaders/effects/color-hue-shift.wgsl?raw';
import brightnessShader from '../shaders/effects/color-brightness.wgsl?raw';
import contrastShader from '../shaders/effects/color-contrast.wgsl?raw';
import saturationShader from '../shaders/effects/color-saturation.wgsl?raw';
import levelsShader from '../shaders/effects/color-levels.wgsl?raw';
import pixelateShader from '../shaders/effects/distort-pixelate.wgsl?raw';
import kaleidoscopeShader from '../shaders/effects/distort-kaleidoscope.wgsl?raw';
import mirrorShader from '../shaders/effects/distort-mirror.wgsl?raw';
import rgbSplitShader from '../shaders/effects/distort-rgb-split.wgsl?raw';
import invertShader from '../shaders/effects/color-invert.wgsl?raw';
import blurBoxShader from '../shaders/effects/blur-box.wgsl?raw';
import type { GpuEffectDefinition } from './demoEffectTypes';

export function fullShaderCode(effectFragmentSource: string): string {
  return `${commonShader}\n${effectFragmentSource}`;
}

const hueShift: GpuEffectDefinition = {
  id: 'hue-shift',
  shader: hueShiftShader as string,
  entryPoint: 'hueShiftFragment',
  uniformSize: 16,
  packUniforms: (params, _w, _h) =>
    new Float32Array([(params.shift as number) ?? 0, 0, 0, 0]),
};

const brightness: GpuEffectDefinition = {
  id: 'brightness',
  shader: brightnessShader as string,
  entryPoint: 'brightnessFragment',
  uniformSize: 16,
  packUniforms: (params, _w, _h) =>
    new Float32Array([(params.amount as number) ?? 0, 0, 0, 0]),
};

const contrast: GpuEffectDefinition = {
  id: 'contrast',
  shader: contrastShader as string,
  entryPoint: 'contrastFragment',
  uniformSize: 16,
  packUniforms: (params, _w, _h) =>
    new Float32Array([(params.amount as number) ?? 1, 0, 0, 0]),
};

const saturation: GpuEffectDefinition = {
  id: 'saturation',
  shader: saturationShader as string,
  entryPoint: 'saturationFragment',
  uniformSize: 16,
  packUniforms: (params, _w, _h) =>
    new Float32Array([(params.amount as number) ?? 1, 0, 0, 0]),
};

const pixelate: GpuEffectDefinition = {
  id: 'pixelate',
  shader: pixelateShader as string,
  entryPoint: 'pixelateFragment',
  uniformSize: 16,
  packUniforms: (params, width, height) =>
    new Float32Array([
      (params.size as number) ?? 8,
      width,
      height,
      0,
    ]),
};

const kaleidoscope: GpuEffectDefinition = {
  id: 'kaleidoscope',
  shader: kaleidoscopeShader as string,
  entryPoint: 'kaleidoscopeFragment',
  uniformSize: 16,
  packUniforms: (params, _w, _h) =>
    new Float32Array([
      (params.segments as number) ?? 6,
      (params.rotation as number) ?? 0,
      0,
      0,
    ]),
};

const mirror: GpuEffectDefinition = {
  id: 'mirror',
  shader: mirrorShader as string,
  entryPoint: 'mirrorFragment',
  uniformSize: 16,
  packUniforms: (params, _w, _h) =>
    new Float32Array([
      (params.horizontal as boolean) ? 1 : 0,
      (params.vertical as boolean) ? 1 : 0,
      0,
      0,
    ]),
};

const rgbSplit: GpuEffectDefinition = {
  id: 'rgb-split',
  shader: rgbSplitShader as string,
  entryPoint: 'rgbSplitFragment',
  uniformSize: 16,
  packUniforms: (params, _w, _h) =>
    new Float32Array([
      (params.amount as number) ?? 0.01,
      (params.angle as number) ?? 0,
      0,
      0,
    ]),
};

const invert: GpuEffectDefinition = {
  id: 'invert',
  shader: invertShader as string,
  entryPoint: 'invertFragment',
  uniformSize: 0,
  packUniforms: () => null,
};

const levels: GpuEffectDefinition = {
  id: 'levels',
  shader: levelsShader as string,
  entryPoint: 'levelsFragment',
  uniformSize: 32,
  packUniforms: (params, _w, _h) =>
    new Float32Array([
      (params.inputBlack as number) ?? 0,
      (params.inputWhite as number) ?? 1,
      (params.gamma as number) ?? 1,
      (params.outputBlack as number) ?? 0,
      (params.outputWhite as number) ?? 1,
      0,
      0,
      0,
    ]),
};

const boxBlur: GpuEffectDefinition = {
  id: 'box-blur',
  shader: blurBoxShader as string,
  entryPoint: 'boxBlurFragment',
  uniformSize: 16,
  packUniforms: (params, width, height) =>
    new Float32Array([
      (params.radius as number) ?? 5,
      width,
      height,
      0,
    ]),
};


export const DEMO_EFFECT_REGISTRY = new Map<string, GpuEffectDefinition>([
  ['hue-shift', hueShift],
  ['brightness', brightness],
  ['contrast', contrast],
  ['saturation', saturation],
  ['pixelate', pixelate],
  ['kaleidoscope', kaleidoscope],
  ['mirror', mirror],
  ['rgb-split', rgbSplit],
  ['invert', invert],
  ['levels', levels],
  ['box-blur', boxBlur],
]);

export function getDemoEffect(id: string): GpuEffectDefinition | undefined {
  return DEMO_EFFECT_REGISTRY.get(id);
}
