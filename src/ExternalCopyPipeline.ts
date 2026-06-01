import copyExternalSource from './shaders/copy-external.wgsl?raw';
import {GpuRenderParams} from "./types";
import AbstractPipeline from "./AbstractPipeline";

/**
 * CopyPipeline - GPU pipeline for copying external textures to a GPUTextureView
 */
export class ExternalCopyPipeline extends AbstractPipeline {
  private readonly device: GPUDevice;
  private readonly bindGroupLayout: GPUBindGroupLayout;
  private readonly pipeline: GPURenderPipeline;

  private constructor(
      device: GPUDevice,
      bindGroupLayout: GPUBindGroupLayout,
      pipeline: GPURenderPipeline,
  ) {
    super();
    this.device = device;
    this.bindGroupLayout = bindGroupLayout;
    this.pipeline = pipeline;
  }

  static create(device: GPUDevice, colorFormat: GPUTextureFormat = 'rgba8unorm'): ExternalCopyPipeline {
    const shaderModule = device.createShaderModule({
      label: 'copy-external',
      code: copyExternalSource as string,
    });
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'copy-external-layout',
      entries: [
        {binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: {}},
        {binding: 1, visibility: GPUShaderStage.FRAGMENT, externalTexture: {}},
      ],
    });
    const pipeline = device.createRenderPipeline({
      label: 'copy-external-pipeline',
      layout: device.createPipelineLayout({bindGroupLayouts: [bindGroupLayout]}),
      vertex: {module: shaderModule, entryPoint: 'vs_main'},
      fragment: {
        module: shaderModule,
        entryPoint: 'fs_main',
        targets: [{format: colorFormat}],
      },
      primitive: {topology: 'triangle-list'},
    });
    return new ExternalCopyPipeline(device, bindGroupLayout, pipeline);
  }

  gpuRender(params: GpuRenderParams): GPUTextureView {
    const bindGroup = this.device.createBindGroup({
      layout: this.bindGroupLayout,
      entries: [
        {binding: 0, resource: params.sampler},
        {binding: 1, resource: params.inputView},
      ],
    });
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
