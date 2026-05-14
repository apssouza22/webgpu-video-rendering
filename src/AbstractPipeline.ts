import {GpuRenderParams} from "./types";
import {FrameRenderOptions} from "./VideoFrameRenderer";

export default abstract class AbstractPipeline {
  abstract gpuRender(params: GpuRenderParams): GPUTextureView

  setOptions(frameOptions: FrameRenderOptions, cw: number, ch: number, vw: number, vh: number): void{
  //Default implementation does nothing
  }
}