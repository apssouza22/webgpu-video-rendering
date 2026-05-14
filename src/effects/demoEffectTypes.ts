export interface GpuEffectDefinition {
  id: string;
  shader: string;
  entryPoint: string;
  uniformSize: number;
  packUniforms: (
    params: Record<string, number | boolean | string>,
    width: number,
    height: number
  ) => Float32Array | null;
}

export interface DemoEffectInstance {
  id: string;
  type: string;
  enabled: boolean;
  params: Record<string, number | boolean | string>;
}
