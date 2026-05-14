/**
 * Builds a render pipeline with the given WGSL shader.
 * Caches buffer data and binding group layouts for reuse.
 */
export class RenderPipelineBuilder {
  private readonly shaderModule: GPUShaderModule;
  private readonly device: GPUDevice;
  private bufferDataMap: Map<string, GPUBuffer> = new Map();
  private bindingGroupLayout?: GPUBindGroupLayout;
  private readonly label: string;

  constructor(wgsl: string, device: GPUDevice, label: string = 'none') {
    this.device = device;
    this.label = label;
    this.shaderModule = this.device.createShaderModule({
      code: wgsl,
    });
  }

  setBindingGroupDataDescriptor(entries: Iterable<GPUBindGroupLayoutEntry>) {
    this.bindingGroupLayout = this.device.createBindGroupLayout({
      label: `binding-group-layout-${this.label}`,
      entries,
    });
  }

  pushBindingGroupData(entries: Iterable<GPUBindGroupEntry>): GPUBindGroup {
    return this.device.createBindGroup({
      label: `binding-group-${this.label}`,
      layout: this.bindingGroupLayout!,
      entries: entries,
    });
  }

  createPipeline(
      vertexEntrypoint: string,
      fragmentEntrypoint: string,
      colorTargetFormat: GPUTextureFormat = navigator.gpu!.getPreferredCanvasFormat()
  ) {
    return this.device.createRenderPipeline({
      layout: this.device.createPipelineLayout({
        bindGroupLayouts: [this.bindingGroupLayout!],
      }),
      vertex: {module: this.shaderModule, entryPoint: vertexEntrypoint},
      fragment: {
        module: this.shaderModule,
        entryPoint: fragmentEntrypoint,
        targets: [{format: colorTargetFormat}],
      },
      primitive: {topology: 'triangle-list'},
    });
  }

  setBufferDataDescriptor(name: string, descriptor: GPUBufferDescriptor): GPUBuffer {
    const gpuBuffer = this.device.createBuffer(descriptor);
    this.bufferDataMap.set(name, gpuBuffer);
    return gpuBuffer;
  }

  pushBufferDataFor(name: string, data: ArrayBuffer, offset: number = 0) {
    const bufferData = this.bufferDataMap.get(name);
    if (bufferData === undefined) return;
    this.device.queue.writeBuffer(bufferData, offset, data);
  }
}