import {DEMO_EFFECT_REGISTRY, fullShaderCode} from './effects/registry';
import {buildDemoEffectInstances} from './effects';
import type {DemoEffectInstance, GpuEffectDefinition} from './effects';
import type {FrameRenderOptions} from './VideoFrameRenderer';
import {GpuRenderParams} from "./types";
import AbstractPipeline from "./AbstractPipeline";

const OFFSCREEN_FORMAT: GPUTextureFormat = 'rgba8unorm';

/**
 * GPU effects using the same modular registry pattern as `src/effects/EffectsPipeline.ts`:
 * per-effect WGSL (with shared `common.wgsl`) and ping-pong `applyEffects`.
 */
export class EffectsPipeline extends AbstractPipeline{
  private readonly device: GPUDevice;
  private readonly pipelines = new Map<string, GPURenderPipeline>();
  private readonly bindGroupLayouts = new Map<string, GPUBindGroupLayout>();
  private initialized = false;

  private frameOptions: FrameRenderOptions | null = null;
  private canvasW = 0;
  private canvasH = 0;

  private constructor(device: GPUDevice) {
    super();
    this.device = device;
    this.createPipelines();
  }

  static create(device: GPUDevice): EffectsPipeline {
    return new EffectsPipeline(device);
  }

  private createPipelines(): void {
    if (this.initialized) {
      return;
    }
    for (const [_id, effect] of DEMO_EFFECT_REGISTRY) {
      this.createEffectPipeline(effect);
    }
    this.initialized = true;
  }

  private createEffectPipeline(effect: GpuEffectDefinition): void {
    const shaderCode = fullShaderCode(effect.shader);
    const shaderModule = this.device.createShaderModule({
      label: `simplified-effect-${effect.id}`,
      code: shaderCode,
    });

    const entries: GPUBindGroupLayoutEntry[] = [
      {binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: {}},
      {binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: {}},
    ];
    if (effect.uniformSize > 0) {
      entries.push({
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: {type: 'uniform'},
      });
    }

    const bindGroupLayout = this.device.createBindGroupLayout({
      label: `simplified-effect-${effect.id}-layout`,
      entries,
    });
    this.bindGroupLayouts.set(effect.id, bindGroupLayout);

    const pipeline = this.device.createRenderPipeline({
      label: `simplified-effect-${effect.id}-pipeline`,
      layout: this.device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      }),
      vertex: {
        module: shaderModule,
        entryPoint: 'vertexMain',
      },
      fragment: {
        module: shaderModule,
        entryPoint: effect.entryPoint,
        targets: [{format: OFFSCREEN_FORMAT}],
      },
      primitive: {topology: 'triangle-list'},
    });
    this.pipelines.set(effect.id, pipeline);
  }

  setOptions(frameOptions: FrameRenderOptions, cw: number, ch: number, _vw: number, _vh: number): void {
    this.frameOptions = frameOptions;
    this.canvasW = cw;
    this.canvasH = ch;
  }

  /**
   * Transform output is `texture_2d<f32>` on `transformOutView`. Runs queued demo effect(s) with ping–pong.
   * If `effectType === 'none'`, returns `transformOutView` unchanged (no passes).
   */
  gpuRender(params: GpuRenderParams): GPUTextureView {
    const opts = this.frameOptions;
    const effects = opts
        ? buildDemoEffectInstances(opts.effectType, opts.effectParams)
        : [];
    if (effects.length === 0) {
      return params.inputView as GPUTextureView;
    }
    const {finalView} = this.applyEffects(
        effects,
        params
    );
    return finalView;
  }

  private createEffectUniformData(
      effect: DemoEffectInstance,
      outputWidth: number,
      outputHeight: number,
  ): Float32Array | null {
    const definition = DEMO_EFFECT_REGISTRY.get(effect.type);
    if (!definition) {
      return null;
    }
    return definition.packUniforms(effect.params, outputWidth, outputHeight);
  }

  private applyEffects(
      effects: DemoEffectInstance[],
      params: GpuRenderParams
  ): { finalView: GPUTextureView; swapped: boolean } {
    const enabledEffects = effects.filter(
        e => e.enabled,
    );
    const inputView = params.inputView as GPUTextureView;
    const outputView = params.outputView;
    if (enabledEffects.length === 0) {
      return {finalView: inputView, swapped: false};
    }

    let effectInput = inputView;
    let effectOutput = outputView;
    let swapped = false;

    for (const effect of enabledEffects) {
      const pipeline = this.pipelines.get(effect.type);
      const bindGroupLayout = this.bindGroupLayouts.get(effect.type);

      if (!pipeline || !bindGroupLayout) {
        console.warn(`[EffectsPipeline] No pipeline for effect type: ${effect.type}`);
        continue;
      }

      const effectParams = this.createEffectUniformData(
          effect,
          this.canvasW,
          this.canvasH
      );
      this.createGpuRenderPass(
          params, effectParams, effectInput, bindGroupLayout, effectOutput, pipeline
      );

      const tempView = effectInput;
      effectInput = effectOutput;
      effectOutput = tempView;
      swapped = !swapped;
    }

    return {finalView: effectInput, swapped};
  }

  private createGpuRenderPass(
      params: GpuRenderParams,
      effectParams: Float32Array | null,
      effectInput: GPUTextureView,
      bindGroupLayout: GPUBindGroupLayout,
      effectOutput: GPUTextureView,
      pipeline: GPURenderPipeline
  ) {
    let effectUniformBuffer: GPUBuffer | null = null;

    if (effectParams) {
      effectUniformBuffer = this.device.createBuffer({
        size: effectParams.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      this.device.queue.writeBuffer(effectUniformBuffer, 0, effectParams.buffer);
    }

    const entries: GPUBindGroupEntry[] = [
      {binding: 0, resource: params.sampler},
      {binding: 1, resource: effectInput},
    ];

    if (effectUniformBuffer) {
      entries.push({binding: 2, resource: {buffer: effectUniformBuffer}});
    }

    const effectBindGroup = this.device.createBindGroup({
      layout: bindGroupLayout,
      entries,
    });

    const effectPass = params.encoder.beginRenderPass({
      colorAttachments: [
        {
          view: effectOutput,
          clearValue: {r: 0, g: 0, b: 0, a: 0},
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    });
    effectPass.setPipeline(pipeline);
    effectPass.setBindGroup(0, effectBindGroup);
    effectPass.draw(6);
    effectPass.end();
  }
}
