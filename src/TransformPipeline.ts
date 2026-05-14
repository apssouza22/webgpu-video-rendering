import videoTransformSource from './shaders/video-transform.wgsl?raw';
import {RenderPipelineBuilder} from './RenderPipelineBuilder';
import {GpuRenderParams} from "./types";
import AbstractPipeline from "./AbstractPipeline";
import {FrameRenderOptions} from "./VideoFrameRenderer";

export const LAYER_UNIFORM_BYTES = 96; // LayerUniforms from video-transform.wgsl
export const TRANSFORM_LAYER_UNIFORM_NAME = 'layerUniforms';

/** Values packed into the transform shader's layer uniform buffer. */
export interface VideoTransformLayerParams {
  opacity: number;
  posX: number;
  posY: number;
  posZ: number;
  scaleX: number;
  scaleY: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  perspective: number;
}

/**
 * GPU pipeline for transforming a video frame (position/scale/rotation) to a fixed-size canvas.
 */
export class TransformPipeline extends AbstractPipeline {
  readonly builder: RenderPipelineBuilder;
  private readonly pipeline: GPURenderPipeline;
  private readonly uniformBuffer: GPUBuffer;
  private readonly uniformBufferData = new ArrayBuffer(LAYER_UNIFORM_BYTES);
  private readonly uniformF32 = new Float32Array(this.uniformBufferData);
  private readonly uniformU32 = new Uint32Array(this.uniformBufferData);

  private constructor(
      builder: RenderPipelineBuilder,
      pipeline: GPURenderPipeline,
      uniformBuffer: GPUBuffer
  ) {
    super()
    this.builder = builder;
    this.pipeline = pipeline;
    this.uniformBuffer = uniformBuffer;
  }

  /** Writes packed layer uniforms for the next `gpuRender` call. */
  private writeLayerUniforms(
      renderOptions: FrameRenderOptions,
      sourceAspect: number,
      outputAspect: number
  ): void {
    const f = this.uniformF32;
    const u = this.uniformU32;
    const transformParams = renderOptions.transformParams
    f[0] = transformParams.opacity;
    u[1] = 0;
    f[2] = transformParams.posX;
    f[3] = transformParams.posY;
    f[4] = transformParams.scaleX;
    f[5] = transformParams.scaleY;
    f[6] = transformParams.rotationZ;
    f[7] = sourceAspect;
    f[8] = outputAspect;
    f[9] = 0;
    u[10] = 0;
    u[11] = 0;
    f[12] = transformParams.rotationX;
    f[13] = transformParams.rotationY;
    f[14] = Math.max(transformParams.perspective, 0.5);
    f[15] = 0;
    u[16] = 0;
    f[17] = transformParams.posZ;
    f[18] = 0;
    f[19] = 1;
    f[20] = 1;
    u[21] = 0;
    f[22] = 0;
    f[23] = 0;

    this.builder.pushBufferDataFor(TRANSFORM_LAYER_UNIFORM_NAME, this.uniformBufferData, 0);
  }

  static create(device: GPUDevice, colorFormat: GPUTextureFormat = 'rgba8unorm'): TransformPipeline {
    const builder = new RenderPipelineBuilder(videoTransformSource as string, device);
    const uniformBuffer = builder.setBufferDataDescriptor(TRANSFORM_LAYER_UNIFORM_NAME, {
      label: 'layer-uniform',
      size: LAYER_UNIFORM_BYTES,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    builder.setBindingGroupDataDescriptor([
      {binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: {}},
      {binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: {}},
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: {type: 'uniform', minBindingSize: LAYER_UNIFORM_BYTES},
      },
    ]);
    const pipeline = builder.createPipeline('vs_main', 'fs_main', colorFormat);
    return new TransformPipeline(builder, pipeline, uniformBuffer);
  }

  gpuRender(params: GpuRenderParams): GPUTextureView {
    const bindGroup = this.builder.pushBindingGroupData([
      {binding: 0, resource: params.sampler},
      {binding: 1, resource: params.inputView},
      {binding: 2, resource: {buffer: this.uniformBuffer}},
    ]);
    const pass = params.encoder.beginRenderPass({
      colorAttachments: [
        {
          view: params.outputView,
          clearValue: {r: 0, g: 0, b: 0, a: 0},
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    });
    pass.setPipeline(this.pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.draw(6);
    pass.end();
    return params.outputView;
  }

  setOptions(frameOptions: FrameRenderOptions, cw: number, ch: number, vw: number, vh: number) {
    super.setOptions(frameOptions, cw, ch, vw, vh);
    const sourceAspect = vw / vh;
    const outputAspect = cw / ch;
    this.writeLayerUniforms(frameOptions, sourceAspect, outputAspect);
  }
}
