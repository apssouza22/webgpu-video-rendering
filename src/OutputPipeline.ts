import outputShader from './shaders/output.wgsl?raw';
import {GpuRenderParams} from "./types";
import {FrameRenderOptions} from "./VideoFrameRenderer";
import AbstractPipeline from "./AbstractPipeline";

type OutputMode = 'normal' | 'grid' | 'stackedAlpha';

/**
 * OutputPipeline - Manages the final output pass for the video frame renderer
 *
 * Features:
 * - 3 output modes: normal, grid, stackedAlpha
 * - Caches bind groups for efficient rendering
 * - Handles resolution changes
 */
export class OutputPipeline extends AbstractPipeline {
  private readonly device: GPUDevice;
  private readonly bindGroupLayout: GPUBindGroupLayout;
  private readonly outputPipeline: GPURenderPipeline;
  private readonly uniformBufferGridOn: GPUBuffer;
  private readonly uniformBufferGridOff: GPUBuffer;
  private readonly uniformBufferStackedAlpha: GPUBuffer;

  private bindGroupCacheGridOn = new Map<GPUTextureView, GPUBindGroup>();
  private bindGroupCacheGridOff = new Map<GPUTextureView, GPUBindGroup>();
  private bindGroupCacheStackedAlpha = new Map<GPUTextureView, GPUBindGroup>();
  private outputWidth = 0;
  private outputHeight = 0;
  private outputMode: OutputMode = 'normal';

  private constructor(
      device: GPUDevice,
      bindGroupLayout: GPUBindGroupLayout,
      outputPipeline: GPURenderPipeline,
      uniformBufferGridOn: GPUBuffer,
      uniformBufferGridOff: GPUBuffer,
      uniformBufferStackedAlpha: GPUBuffer,
  ) {
    super();
    this.device = device;
    this.bindGroupLayout = bindGroupLayout;
    this.outputPipeline = outputPipeline;
    this.uniformBufferGridOn = uniformBufferGridOn;
    this.uniformBufferGridOff = uniformBufferGridOff;
    this.uniformBufferStackedAlpha = uniformBufferStackedAlpha;
  }

  static create(device: GPUDevice): OutputPipeline {
    const shaderModule = device.createShaderModule({
      label: 'output',
      code: outputShader as string,
    });
    const bufferDescriptor: GPUBufferDescriptor = {
      size: 16,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    };
    const uniformBufferGridOn = device.createBuffer({
      ...bufferDescriptor,
      label: 'output-uniform-grid-on',
    });
    const uniformBufferGridOff = device.createBuffer({
      ...bufferDescriptor,
      label: 'output-uniform-grid-off',
    });
    const uniformBufferStackedAlpha = device.createBuffer({
      ...bufferDescriptor,
      label: 'output-uniform-stacked-alpha',
    });
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'output-layout',
      entries: [
        {binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: {}},
        {binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: {}},
        {binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: {type: 'uniform'}},
      ],
    });
    const outputPipeline = device.createRenderPipeline({
      label: 'output-pipeline',
      layout: device.createPipelineLayout({bindGroupLayouts: [bindGroupLayout]}),
      vertex: {module: shaderModule, entryPoint: 'vertexMain'},
      fragment: {
        module: shaderModule,
        entryPoint: 'fragmentMain',
        targets: [{format: navigator.gpu!.getPreferredCanvasFormat()}],
      },
      primitive: {topology: 'triangle-list'},
    });
    return new OutputPipeline(
        device,
        bindGroupLayout,
        outputPipeline,
        uniformBufferGridOn,
        uniformBufferGridOff,
        uniformBufferStackedAlpha,
    );
  }

  private updateResolution(outputWidth: number, outputHeight: number): void {
    this.outputWidth = outputWidth;
    this.outputHeight = outputHeight;
    this.device.queue.writeBuffer(this.uniformBufferGridOff, 0, this.getBufferData(0));
    this.device.queue.writeBuffer(this.uniformBufferGridOn, 0, this.getBufferData(1));
    this.device.queue.writeBuffer(this.uniformBufferStackedAlpha, 0, this.getBufferData(2));
  }

  private getBufferData(mode: number) {
    const data = new ArrayBuffer(16);
    const view = new DataView(data);
    view.setUint32(0, mode, true);
    view.setFloat32(4, this.outputWidth, true);
    view.setFloat32(8, this.outputHeight, true);
    view.setFloat32(12, 0, true);
    return data;
  }

  invalidateCache(): void {
    this.bindGroupCacheGridOn.clear();
    this.bindGroupCacheGridOff.clear();
    this.bindGroupCacheStackedAlpha.clear();
  }

  private createOutputBindGroup(
      sampler: GPUSampler,
      textureView: GPUTextureView,
      mode: 'normal' | 'grid' | 'stackedAlpha'
  ): GPUBindGroup {
    const cache =
        mode === 'grid'
            ? this.bindGroupCacheGridOn
            : mode === 'stackedAlpha'
                ? this.bindGroupCacheStackedAlpha
                : this.bindGroupCacheGridOff;

    const bg = cache.get(textureView);
    if (bg) {
      return bg;
    }

    const uniformBuffer =
        mode === 'grid'
            ? this.uniformBufferGridOn
            : mode === 'stackedAlpha'
                ? this.uniformBufferStackedAlpha
                : this.uniformBufferGridOff;

    const created = this.device.createBindGroup({
      layout: this.bindGroupLayout,
      entries: [
        {binding: 0, resource: sampler},
        {binding: 1, resource: textureView},
        {binding: 2, resource: {buffer: uniformBuffer}},
      ],
    });
    cache.set(textureView, created);
    return created;
  }

  gpuRender(params: GpuRenderParams): GPUTextureView {
    const inputView = params.inputView as GPUTextureView;
    const bindGroup = this.createOutputBindGroup(params.sampler, inputView, this.outputMode);
    const renderPass = params.encoder.beginRenderPass({
      colorAttachments: [
        {
          view: params.outputView,
          clearValue: {r: 0, g: 0, b: 0, a: 0},
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    });
    renderPass.setPipeline(this.outputPipeline);
    renderPass.setBindGroup(0, bindGroup);
    renderPass.draw(6);
    renderPass.end();
    return params.outputView;
  }

  setOptions(frameOptions: FrameRenderOptions, cw: number, ch: number, vw: number, vh: number): void {
    super.setOptions(frameOptions, cw, ch, vw, vh);
    this.updateResolution(cw, ch);
    this.outputMode = frameOptions.outputMode === 'grid'
        ? 'grid'
        : frameOptions.outputMode === 'stackedAlpha'
            ? 'stackedAlpha'
            : 'normal';
  }
}
