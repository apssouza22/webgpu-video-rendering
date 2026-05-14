import copyExternalSource from './shaders/copy-external.wgsl?raw';
import {RenderPipelineBuilder} from './RenderPipelineBuilder';
import {GpuRenderParams} from "./types";
import AbstractPipeline from "./AbstractPipeline";

/**
 * CopyPipeline - GPU pipeline for copying external textures to a GPUTextureView
 */
export class ExternalCopyPipeline extends AbstractPipeline{
  readonly builder: RenderPipelineBuilder;
  readonly pipeline: GPURenderPipeline;

  private constructor(
      builder: RenderPipelineBuilder,
      pipeline: GPURenderPipeline
  ) {
    super();
    this.builder = builder;
    this.pipeline = pipeline;
  }

  static create(device: GPUDevice, colorFormat: GPUTextureFormat = 'rgba8unorm'): ExternalCopyPipeline {
    const builder = new RenderPipelineBuilder(copyExternalSource as string, device);
    builder.setBindingGroupDataDescriptor([
      {binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: {}},
      {binding: 1, visibility: GPUShaderStage.FRAGMENT, externalTexture: {}},
    ]);
    const pipeline = builder.createPipeline('vs_main', 'fs_main', colorFormat);
    return new ExternalCopyPipeline(builder,  pipeline);
  }

  gpuRender(params: GpuRenderParams): GPUTextureView {
    const bindGroup = this.builder.pushBindingGroupData([
      {binding: 0, resource: params.sampler},
      {binding: 1, resource: params.inputView},
    ]);
    const pass = params.encoder.beginRenderPass({
      colorAttachments: [
        {
          view: params.outputView,
          clearValue: {r: 0, g: 0, b: 0, a: 1},
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
}
