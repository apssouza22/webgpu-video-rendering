import type { DemoEffectParams, DemoEffectType } from '../types';
import type { DemoEffectInstance } from './demoEffectTypes';

function registryParams(
  effectType: DemoEffectType,
  demo: DemoEffectParams
): Record<string, number | boolean | string> {
  switch (effectType) {
    case 'hue-shift':
      return { shift: demo.hueShift ?? 0 };
    case 'brightness':
      return { amount: demo.brightnessAmt ?? 0 };
    case 'contrast':
      return { amount: demo.contrastAmt ?? 1 };
    case 'saturation':
      return { amount: demo.saturationAmt ?? 1 };
    case 'pixelate':
      return { size: demo.pixelate ?? 8 };
    case 'kaleidoscope':
      return {
        segments: demo.kaleidoscopeSegments ?? 6,
        rotation: demo.kaleidoscopeRotation ?? 0,
      };
    case 'mirror':
      return {
        horizontal: !!demo.mirrorH,
        vertical: !!demo.mirrorV,
      };
    case 'rgb-split':
      return {
        amount: demo.rgbSplitAmount ?? 0.01,
        angle: demo.rgbSplitAngle ?? 0,
      };
    case 'invert':
      return {};
    case 'levels':
      return {
        inputBlack: demo.levelsInputBlack ?? 0,
        inputWhite: demo.levelsInputWhite ?? 1,
        gamma: demo.levelsGamma ?? 1,
        outputBlack: demo.levelsOutputBlack ?? 0,
        outputWhite: demo.levelsOutputWhite ?? 1,
      };
    case 'box-blur':
      return { radius: demo.boxBlurRadius ?? 5 };
  }
}

export function buildDemoEffectInstances(
  effectType: DemoEffectType | 'none',
  effectParams: DemoEffectParams
): DemoEffectInstance[] {
  if (effectType === 'none') {
    return [];
  }
  return [
    {
      id: 'demo',
      type: effectType,
      enabled: true,
      params: registryParams(effectType, effectParams),
    },
  ];
}
