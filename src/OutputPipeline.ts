import outputShader from './shaders/output.wgsl?raw';
import {RenderPipelineBuilder} from "./RenderPipelineBuilder";
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
  private outputPipeline: GPURenderPipeline | null = null;
  private uniformBufferGridOn: GPUBuffer | null = null;
  private uniformBufferGridOff: GPUBuffer | null = null;
  private uniformBufferStackedAlpha: GPUBuffer | null = null;

  private bindGroupCacheGridOn = new Map<GPUTextureView, GPUBindGroup>();
  private bindGroupCacheGridOff = new Map<GPUTextureView, GPUBindGroup>();
  private bindGroupCacheStackedAlpha = new Map<GPUTextureView, GPUBindGroup>();
  private pipelineBuilder: RenderPipelineBuilder;
  private outputWidth = 0;
  private outputHeight = 0;
  private outputMode: OutputMode = 'normal';

  constructor(pipelineBuilder: RenderPipelineBuilder) {
    super();
    this.pipelineBuilder = pipelineBuilder;
    this.createPipeline();
  }

  static create(device: GPUDevice): OutputPipeline {
    const pipelineBuilder = new RenderPipelineBuilder(outputShader as string, device)
    return new OutputPipeline(pipelineBuilder)
  }

  private createPipeline() {
    const descriptor = {
      size: 16,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    };
    this.uniformBufferGridOn = this.pipelineBuilder.setBufferDataDescriptor("uniformBufferGridOn", descriptor);
    this.uniformBufferGridOff = this.pipelineBuilder.setBufferDataDescriptor("uniformBufferGridOff", descriptor);
    this.uniformBufferStackedAlpha = this.pipelineBuilder.setBufferDataDescriptor("uniformBufferStackedAlpha", descriptor);

    const entries: Array<GPUBindGroupLayoutEntry> = [
      {binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: {}},
      {binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: {}},
      {binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: {type: 'uniform'}},
    ];
    this.pipelineBuilder.setBindingGroupDataDescriptor(entries);
    this.outputPipeline = this.pipelineBuilder.createPipeline(
        'vertexMain',
        'fragmentMain'
    );
  }

  private updateResolution(outputWidth: number, outputHeight: number): void {
    this.outputWidth = outputWidth;
    this.outputHeight = outputHeight;
    this.pipelineBuilder.pushBufferDataFor("uniformBufferGridOff", this.getBufferData(0));
    this.pipelineBuilder.pushBufferDataFor("uniformBufferGridOn", this.getBufferData(1));
    this.pipelineBuilder.pushBufferDataFor("uniformBufferStackedAlpha", this.getBufferData(2));
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
            ? this.uniformBufferGridOn!
            : mode === 'stackedAlpha'
                ? this.uniformBufferStackedAlpha!
                : this.uniformBufferGridOff!;

    const created = this.pipelineBuilder.pushBindingGroupData([
      {binding: 0, resource: sampler},
      {binding: 1, resource: textureView},
      {binding: 2, resource: {buffer: uniformBuffer}},
    ]);
    cache.set(textureView, created);
    return created;
  }

  gpuRender(params: GpuRenderParams): GPUTextureView {
    const inputView = params.inputView as GPUTextureView;
    if (!this.outputPipeline) {
      return inputView;
    }

    const bindGroup = this.createOutputBindGroup(params.sampler, inputView, this.outputMode);
    const renderPass = params.encoder.beginRenderPass({
      colorAttachments: [
        {
          view: params.outputView,
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
