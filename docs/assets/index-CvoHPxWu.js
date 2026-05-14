(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();function U(c){return c*Math.PI/180}class ${renderer;dom;opticalFlow;gpuFrameBusy=!1;currentObjectUrl=null;opacity=1;posX=0;posY=0;posZ=0;scaleX=1;scaleY=1;rotXDeg=0;rotYDeg=0;rotZDeg=0;perspective=2;paramA=0;paramB=0;paramC=1;constructor(e,t,r=null){this.renderer=e,this.dom=t,this.opticalFlow=r,this.syncNumbersFromDom(),this.refreshEffectUiLabels()}syncNumbersFromDom(){const e=this.dom;this.opacity=Number(e.opacityInput.value),this.posX=Number(e.posXInput.value),this.posY=Number(e.posYInput.value),this.posZ=Number(e.posZInput.value),this.scaleX=Number(e.scaleXInput.value),this.scaleY=Number(e.scaleYInput.value),this.rotXDeg=Number(e.rotXInput.value),this.rotYDeg=Number(e.rotYInput.value),this.rotZDeg=Number(e.rotZInput.value),this.perspective=Number(e.perspectiveInput.value),this.paramA=Number(e.paramAInput.value),this.paramB=Number(e.paramBInput.value),this.paramC=Number(e.paramCInput.value)}refreshSpanLabels(){const e=this.dom;e.opacityVal.textContent=this.opacity.toFixed(2),e.posXVal.textContent=this.posX.toFixed(2),e.posYVal.textContent=this.posY.toFixed(2),e.posZVal.textContent=this.posZ.toFixed(2),e.scaleXVal.textContent=this.scaleX.toFixed(2),e.scaleYVal.textContent=this.scaleY.toFixed(2),e.rotXVal.textContent=String(Math.round(this.rotXDeg)),e.rotYVal.textContent=String(Math.round(this.rotYDeg)),e.rotZVal.textContent=String(Math.round(this.rotZDeg)),e.perspectiveVal.textContent=this.perspective.toFixed(2),e.paramAVal.textContent=this.fmtSlider(this.paramA),e.paramBVal.textContent=this.fmtSlider(this.paramB),e.paramCVal.textContent=this.fmtSlider(this.paramC)}fmtSlider(e){return Math.abs(e-Math.round(e))<1e-6?String(Math.round(e)):e.toFixed(3)}refreshEffectUiLabels(){const e=this.dom.effectSelect.value,{paramALabel:t,paramBLabel:r,paramCLabel:i,paramAInput:n,paramBInput:a,paramCInput:s}=this.dom,u=(o,p,d)=>{o.style.display=d?"none":"",p.closest("label").style.display=d?"none":""};switch(u(t,n,e==="none"||e==="invert"),u(r,a,e==="none"||e==="invert"||e==="hue-shift"||e==="brightness"||e==="contrast"||e==="saturation"||e==="pixelate"||e==="box-blur"),u(i,s,e!=="levels"),e){case"hue-shift":t.textContent="Hue shift",n.min="0",n.max="1",n.step="0.01",n.value=String(this.paramA>0?this.paramA:"0.15");break;case"brightness":t.textContent="Brightness Δ",n.min="-0.5",n.max="0.5",n.step="0.01";break;case"contrast":t.textContent="Contrast",n.min="0.25",n.max="3",n.step="0.02",n.value=n.value===""?"1":n.value;break;case"saturation":t.textContent="Saturation",n.min="0",n.max="3",n.step="0.02",n.value=n.value===""?"1":n.value;break;case"pixelate":t.textContent="Pixel size",n.min="2",n.max="80",n.step="1";break;case"box-blur":t.textContent="Radius",n.min="0",n.max="20",n.step="1",n.value=n.value===""?"5":n.value;break;case"kaleidoscope":t.textContent="Segments",n.min="2",n.max="24",n.step="1",r.textContent="Rotation",a.min="-3.15",a.max="3.15",a.step="0.05";break;case"rgb-split":t.textContent="Amount",n.min="0",n.max="0.06",n.step="0.002",r.textContent="Angle rad",a.min="0",a.max="6.29",a.step="0.05";break;case"levels":t.textContent="Input black",n.min="0",n.max="0.45",n.step="0.01",r.textContent="Input white",a.min="0.55",a.max="1",a.step="0.01",a.value=a.value===""?"1":a.value,i.textContent="Gamma",s.min="0.3",s.max="3",s.step="0.05",s.value=s.value===""?"1":s.value;break}const l=this.dom.mirrorHInput.closest(".mirror-row");l.style.display=e==="mirror"?"flex":"none",this.syncNumbersFromDom(),this.refreshSpanLabels()}layerParams(){return{opacity:this.opacity,posX:this.posX,posY:this.posY,posZ:this.posZ,scaleX:this.scaleX,scaleY:this.scaleY,rotationX:U(this.rotXDeg),rotationY:U(this.rotYDeg),rotationZ:U(this.rotZDeg),perspective:this.perspective}}effectParams(){const e=this.dom.effectSelect.value,t=Number(this.dom.paramAInput.value),r=Number(this.dom.paramBInput.value),i=Number(this.dom.paramCInput.value);switch(e){case"hue-shift":return{hueShift:t};case"brightness":return{brightnessAmt:t};case"contrast":return{contrastAmt:t};case"saturation":return{saturationAmt:t};case"pixelate":return{pixelate:t};case"kaleidoscope":return{kaleidoscopeSegments:t,kaleidoscopeRotation:r};case"mirror":return{mirrorH:this.dom.mirrorHInput.checked,mirrorV:this.dom.mirrorVInput.checked};case"rgb-split":return{rgbSplitAmount:t,rgbSplitAngle:r};case"levels":return{levelsInputBlack:t,levelsInputWhite:r,levelsGamma:i,levelsOutputBlack:0,levelsOutputWhite:1};case"box-blur":return{boxBlurRadius:t};default:return{}}}frameOptions(){const e=this.dom.outputModeSelect.value,t=this.dom.effectSelect.value;return{outputMode:e==="grid"?"grid":e==="stackedAlpha"?"stackedAlpha":"normal",effectType:t,effectParams:this.effectParams(),transformParams:this.layerParams()}}setStatus(e){this.dom.statusEl.textContent=e}setMotionReadout(e){this.dom.motionViz?.update(e)}start(){this.dom.video.loop=!0;const e=t=>{t.addEventListener("input",()=>{this.syncNumbersFromDom(),this.refreshSpanLabels()})};e(this.dom.opacityInput),e(this.dom.posXInput),e(this.dom.posYInput),e(this.dom.posZInput),e(this.dom.scaleXInput),e(this.dom.scaleYInput),e(this.dom.rotXInput),e(this.dom.rotYInput),e(this.dom.rotZInput),e(this.dom.perspectiveInput),e(this.dom.paramAInput),e(this.dom.paramBInput),e(this.dom.paramCInput),this.dom.effectSelect.addEventListener("change",()=>this.refreshEffectUiLabels()),this.dom.mirrorHInput.addEventListener("change",()=>{}),this.dom.mirrorVInput.addEventListener("change",()=>{}),this.dom.video.addEventListener("loadeddata",()=>{this.setStatus("Playing — GPU transform, effects, and output pass are live."),this.dom.video.play().catch(t=>this.setStatus(`play() failed: ${t}`))}),this.dom.fileInput.addEventListener("change",()=>this.onFileSelected()),this.refreshSpanLabels(),this.renderer.configureSurface(),this.setStatus("Choose a video file to start. Tip: checkerboard preview needs visible alpha — shrink or rotate the layer if the frame is opaque."),requestAnimationFrame(()=>this.loop())}onFileSelected(){const e=this.dom.fileInput.files?.[0];e&&(this.currentObjectUrl&&(URL.revokeObjectURL(this.currentObjectUrl),this.currentObjectUrl=null),this.renderer.releaseWorkTextures(),this.opticalFlow?.reset(),this.dom.motionViz?.reset(),this.dom.perfHud?.reset(),this.currentObjectUrl=URL.createObjectURL(e),this.dom.video.src=this.currentObjectUrl)}loop(){!this.dom.video.paused&&!this.dom.video.ended&&this.captureVideoFrame(),requestAnimationFrame(()=>this.loop())}async captureVideoFrame(){if(this.gpuFrameBusy)return;const{video:e}=this.dom;if(e.readyState<HTMLMediaElement.HAVE_CURRENT_DATA||e.videoWidth===0||e.videoHeight===0)return;let t;try{const a=Math.floor(e.currentTime*1e6);t=new VideoFrame(e,{timestamp:a})}catch(a){console.log(`new VideoFrame(video) failed (${a}). Try Chrome; some browsers need WebCodecs + compatible sources.`);return}this.gpuFrameBusy=!0,this.syncNumbersFromDom();let r=null,i;if(this.opticalFlow!=null){const a=performance.now();try{r=await createImageBitmap(t),i=performance.now()-a}catch(s){this.dom.motionViz?.setError(`createImageBitmap failed: ${s}`)}}const n=performance.now();this.renderer.renderVideoFrame(this.dom.canvas,t,this.frameOptions(),()=>{if(this.gpuFrameBusy=!1,this.dom.perfHud?.recordFrame(n,performance.now(),e.videoWidth,e.videoHeight,this.dom.canvas.width,this.dom.canvas.height,i),this.opticalFlow&&r){const a=r;this.opticalFlow.analyzeFrame(a).then(s=>this.setMotionReadout(s)).catch(s=>{this.dom.motionViz?.setError(`Analysis error: ${s}`)}).finally(()=>a.close())}},a=>this.setStatus(`importExternalTexture failed: ${a}`))}}const Q=.14,J=28,ee=140;class te{root;statusEl;sceneCutEl;fills;vals;sparkline;sparklineCtx=null;smTotal=0;smGlobal=0;smLocal=0;history=[];sceneCutHold=0;resizeObs=null;constructor(e){this.root=e,this.statusEl=e.querySelector("#motionStatus"),this.sceneCutEl=e.querySelector("#motionSceneCut"),this.sparkline=e.querySelector("#motionSparkline"),this.fills={total:e.querySelector('[data-flow-fill="total"]'),global:e.querySelector('[data-flow-fill="global"]'),local:e.querySelector('[data-flow-fill="local"]')},this.vals={total:e.querySelector('[data-flow-val="total"]'),global:e.querySelector('[data-flow-val="global"]'),local:e.querySelector('[data-flow-val="local"]')},this.sparklineCtx=this.sparkline.getContext("2d"),this.observeSparklineSize()}observeSparklineSize(){typeof ResizeObserver>"u"||(this.resizeObs=new ResizeObserver(()=>this.redrawSparkline()),this.resizeObs.observe(this.sparkline))}destroy(){this.resizeObs?.disconnect(),this.resizeObs=null}setWaiting(e="Waiting for video frames…"){this.statusEl.textContent=e,this.statusEl.hidden=!1,this.root.classList.add("motion-panel--idle")}setError(e){this.statusEl.textContent=e,this.statusEl.hidden=!1,this.root.classList.add("motion-panel--idle")}reset(){this.smTotal=0,this.smGlobal=0,this.smLocal=0,this.history=[],this.sceneCutHold=0,this.sceneCutEl.hidden=!0,this.fills.total.style.width="0%",this.fills.global.style.width="0%",this.fills.local.style.width="0%",this.vals.total.textContent="0%",this.vals.global.textContent="0%",this.vals.local.textContent="0%",this.redrawSparkline(),this.setWaiting("Waiting for video frames…")}hideStatus(){this.statusEl.hidden=!0,this.root.classList.remove("motion-panel--idle")}update(e){this.hideStatus();const t=Q;this.smTotal=this.smTotal*(1-t)+e.total*t,this.smGlobal=this.smGlobal*(1-t)+e.global*t,this.smLocal=this.smLocal*(1-t)+e.local*t,e.isSceneCut?this.sceneCutHold=J:this.sceneCutHold=Math.max(0,this.sceneCutHold-1),this.sceneCutEl.hidden=this.sceneCutHold===0;const r=s=>Math.min(100,Math.max(0,Math.round(s*100))),i=r(this.smTotal),n=r(this.smGlobal),a=r(this.smLocal);this.fills.total.style.width=`${i}%`,this.fills.global.style.width=`${n}%`,this.fills.local.style.width=`${a}%`,this.vals.total.textContent=`${i}%`,this.vals.global.textContent=`${n}%`,this.vals.local.textContent=`${a}%`,this.history.push(this.smTotal),this.history.length>ee&&this.history.shift(),this.redrawSparkline()}redrawSparkline(){const e=this.sparklineCtx;if(!e)return;const t=this.sparkline,r=Math.min(2,window.devicePixelRatio||1),i=t.clientWidth||320,n=56,a=Math.max(1,Math.floor(i*r)),s=Math.max(1,Math.floor(n*r));(t.width!==a||t.height!==s)&&(t.width=a,t.height=s),e.setTransform(r,0,0,r,0,0);const u=i,l=n,o={t:6,r:4,b:6,l:4},p=u-o.l-o.r,d=l-o.t-o.b;e.clearRect(0,0,u,l),e.fillStyle="rgba(15, 23, 36, 0.95)",e.fillRect(0,0,u,l),e.strokeStyle="rgba(148, 163, 184, 0.15)",e.lineWidth=1;for(const f of[.25,.5,.75]){const S=o.t+d*(1-f);e.beginPath(),e.moveTo(o.l,S),e.lineTo(o.l+p,S),e.stroke()}const h=this.history;if(h.length<2){e.fillStyle="rgba(148, 163, 184, 0.5)",e.font="11px system-ui, sans-serif",e.fillText("History builds as the clip plays…",o.l,o.t+14);return}const g=h.length,v=f=>o.l+f/(g-1)*p,m=f=>o.t+d*(1-Math.min(1,Math.max(0,f))),b=e.createLinearGradient(0,o.t,0,o.t+d);b.addColorStop(0,"rgba(34, 211, 238, 0.35)"),b.addColorStop(1,"rgba(34, 211, 238, 0.02)"),e.beginPath(),e.moveTo(v(0),m(h[0]));for(let f=1;f<g;f++)e.lineTo(v(f),m(h[f]));e.lineTo(v(g-1),o.t+d),e.lineTo(v(0),o.t+d),e.closePath(),e.fillStyle=b,e.fill(),e.beginPath(),e.moveTo(v(0),m(h[0]));for(let f=1;f<g;f++)e.lineTo(v(f),m(h[f]));e.strokeStyle="rgba(34, 211, 238, 0.95)",e.lineWidth=1.5,e.stroke()}}const re=`// Optical Flow Compute Shaders for Motion Analysis
// Lucas-Kanade with Gaussian Pyramid

// ==================== CONSTANTS ====================
const PI: f32 = 3.14159265359;

// Luminance weights (BT.601)
const LUMA_R: f32 = 0.299;
const LUMA_G: f32 = 0.587;
const LUMA_B: f32 = 0.114;

// ==================== GRAYSCALE CONVERSION ====================
// Converts RGBA texture to grayscale luminance

@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var outputTexture: texture_storage_2d<r32float, write>;

@compute @workgroup_size(8, 8)
fn grayscaleMain(@builtin(global_invocation_id) id: vec3u) {
    let dims = textureDimensions(inputTexture);
    if (id.x >= dims.x || id.y >= dims.y) { return; }

    let color = textureLoad(inputTexture, vec2i(id.xy), 0);
    let gray = dot(color.rgb, vec3f(LUMA_R, LUMA_G, LUMA_B));
    textureStore(outputTexture, vec2i(id.xy), vec4f(gray, 0.0, 0.0, 1.0));
}

// ==================== GAUSSIAN BLUR (5x5) ====================
// Used for pyramid generation and noise reduction

@group(0) @binding(0) var blurInput: texture_2d<f32>;
@group(0) @binding(1) var blurOutput: texture_storage_2d<r32float, write>;

// Gaussian kernel 5x5, sigma=1.0
const GAUSS_KERNEL = array<f32, 25>(
    0.003765, 0.015019, 0.023792, 0.015019, 0.003765,
    0.015019, 0.059912, 0.094907, 0.059912, 0.015019,
    0.023792, 0.094907, 0.150342, 0.094907, 0.023792,
    0.015019, 0.059912, 0.094907, 0.059912, 0.015019,
    0.003765, 0.015019, 0.023792, 0.015019, 0.003765
);

@compute @workgroup_size(8, 8)
fn gaussianBlurMain(@builtin(global_invocation_id) id: vec3u) {
    let dims = textureDimensions(blurInput);
    if (id.x >= dims.x || id.y >= dims.y) { return; }

    var sum: f32 = 0.0;
    let center = vec2i(id.xy);

    for (var ky: i32 = -2; ky <= 2; ky++) {
        for (var kx: i32 = -2; kx <= 2; kx++) {
            let coord = clamp(center + vec2i(kx, ky), vec2i(0), vec2i(dims) - 1);
            let weight = GAUSS_KERNEL[(ky + 2) * 5 + (kx + 2)];
            sum += textureLoad(blurInput, coord, 0).r * weight;
        }
    }

    textureStore(blurOutput, center, vec4f(sum, 0.0, 0.0, 1.0));
}

// ==================== PYRAMID DOWNSAMPLE ====================
// Downsamples by 2x with Gaussian filtering

@group(0) @binding(0) var pyramidSrc: texture_2d<f32>;
@group(0) @binding(1) var pyramidDst: texture_storage_2d<r32float, write>;

@compute @workgroup_size(8, 8)
fn pyramidDownsampleMain(@builtin(global_invocation_id) id: vec3u) {
    let dstDims = textureDimensions(pyramidDst);
    if (id.x >= dstDims.x || id.y >= dstDims.y) { return; }

    let srcCoord = vec2i(id.xy) * 2;
    let srcDims = vec2i(textureDimensions(pyramidSrc));

    // 4x4 Gaussian-weighted average for 2x downsample
    var sum: f32 = 0.0;
    var weightSum: f32 = 0.0;

    // Simplified 4x4 Gaussian weights
    let weights = array<f32, 16>(
        0.0625, 0.125, 0.125, 0.0625,
        0.125,  0.25,  0.25,  0.125,
        0.125,  0.25,  0.25,  0.125,
        0.0625, 0.125, 0.125, 0.0625
    );

    for (var ky: i32 = 0; ky < 4; ky++) {
        for (var kx: i32 = 0; kx < 4; kx++) {
            let coord = clamp(srcCoord + vec2i(kx - 1, ky - 1), vec2i(0), srcDims - 1);
            let weight = weights[ky * 4 + kx];
            sum += textureLoad(pyramidSrc, coord, 0).r * weight;
            weightSum += weight;
        }
    }

    textureStore(pyramidDst, vec2i(id.xy), vec4f(sum / weightSum, 0.0, 0.0, 1.0));
}

// ==================== SPATIAL GRADIENTS (SCHARR) ====================
// Computes Ix and Iy using Scharr operator (more accurate than Sobel)

@group(0) @binding(0) var gradInput: texture_2d<f32>;
@group(0) @binding(1) var gradIx: texture_storage_2d<r32float, write>;
@group(0) @binding(2) var gradIy: texture_storage_2d<r32float, write>;

// Scharr kernels (scaled by 1/32 for normalization)
// Kx = [-3, 0, 3; -10, 0, 10; -3, 0, 3] / 32
// Ky = [-3, -10, -3; 0, 0, 0; 3, 10, 3] / 32

@compute @workgroup_size(8, 8)
fn spatialGradientsMain(@builtin(global_invocation_id) id: vec3u) {
    let dims = textureDimensions(gradInput);
    if (id.x >= dims.x || id.y >= dims.y) { return; }

    let center = vec2i(id.xy);
    let maxCoord = vec2i(dims) - 1;

    // Load 3x3 neighborhood
    let tl = textureLoad(gradInput, clamp(center + vec2i(-1, -1), vec2i(0), maxCoord), 0).r;
    let tc = textureLoad(gradInput, clamp(center + vec2i( 0, -1), vec2i(0), maxCoord), 0).r;
    let tr = textureLoad(gradInput, clamp(center + vec2i( 1, -1), vec2i(0), maxCoord), 0).r;
    let ml = textureLoad(gradInput, clamp(center + vec2i(-1,  0), vec2i(0), maxCoord), 0).r;
    let mr = textureLoad(gradInput, clamp(center + vec2i( 1,  0), vec2i(0), maxCoord), 0).r;
    let bl = textureLoad(gradInput, clamp(center + vec2i(-1,  1), vec2i(0), maxCoord), 0).r;
    let bc = textureLoad(gradInput, clamp(center + vec2i( 0,  1), vec2i(0), maxCoord), 0).r;
    let br = textureLoad(gradInput, clamp(center + vec2i( 1,  1), vec2i(0), maxCoord), 0).r;

    // Scharr X gradient: [-3, 0, 3; -10, 0, 10; -3, 0, 3] / 32
    let ix = ((-3.0 * tl + 3.0 * tr) +
              (-10.0 * ml + 10.0 * mr) +
              (-3.0 * bl + 3.0 * br)) / 32.0;

    // Scharr Y gradient: [-3, -10, -3; 0, 0, 0; 3, 10, 3] / 32
    let iy = ((-3.0 * tl - 10.0 * tc - 3.0 * tr) +
              (3.0 * bl + 10.0 * bc + 3.0 * br)) / 32.0;

    textureStore(gradIx, center, vec4f(ix, 0.0, 0.0, 1.0));
    textureStore(gradIy, center, vec4f(iy, 0.0, 0.0, 1.0));
}

// ==================== TEMPORAL GRADIENT ====================
// Computes It = I(t) - I(t-1)

@group(0) @binding(0) var currFrame: texture_2d<f32>;
@group(0) @binding(1) var prevFrame: texture_2d<f32>;
@group(0) @binding(2) var temporalGrad: texture_storage_2d<r32float, write>;

@compute @workgroup_size(8, 8)
fn temporalGradientMain(@builtin(global_invocation_id) id: vec3u) {
    let dims = textureDimensions(currFrame);
    if (id.x >= dims.x || id.y >= dims.y) { return; }

    let coord = vec2i(id.xy);
    let curr = textureLoad(currFrame, coord, 0).r;
    let prev = textureLoad(prevFrame, coord, 0).r;
    let it = curr - prev;

    textureStore(temporalGrad, coord, vec4f(it, 0.0, 0.0, 1.0));
}

// ==================== LUCAS-KANADE OPTICAL FLOW ====================
// Solves for (Vx, Vy) using least squares over a window

struct LKParams {
    windowRadius: u32,     // Half-size of window (e.g., 2 for 5x5)
    minEigenvalue: f32,    // Threshold for reliable flow
    pyramidScale: f32,     // Scale factor from previous level
    _pad: u32,
};

@group(0) @binding(0) var lkIx: texture_2d<f32>;
@group(0) @binding(1) var lkIy: texture_2d<f32>;
@group(0) @binding(2) var lkIt: texture_2d<f32>;
@group(0) @binding(3) var<uniform> lkParams: LKParams;
@group(0) @binding(4) var flowOutput: texture_storage_2d<rg32float, write>;
@group(0) @binding(5) var prevFlow: texture_2d<f32>;  // Flow from coarser level (or zero)

@compute @workgroup_size(8, 8)
fn lucasKanadeMain(@builtin(global_invocation_id) id: vec3u) {
    let dims = textureDimensions(lkIx);
    if (id.x >= dims.x || id.y >= dims.y) { return; }

    let center = vec2i(id.xy);
    let maxCoord = vec2i(dims) - 1;
    let radius = i32(lkParams.windowRadius);

    // Get initial flow estimate from coarser level (scaled up)
    var initFlow = vec2f(0.0);
    let prevDims = textureDimensions(prevFlow);
    if (prevDims.x > 1u) {
        // Sample from coarser level and scale
        let prevCoord = vec2i(id.xy / 2u);
        let prevCoordClamped = clamp(prevCoord, vec2i(0), vec2i(prevDims) - 1);
        initFlow = textureLoad(prevFlow, prevCoordClamped, 0).rg * lkParams.pyramidScale;
    }

    // Accumulate structure tensor components over window
    // [sum(Ix*Ix), sum(Ix*Iy)]   [Vx]   [-sum(Ix*It)]
    // [sum(Ix*Iy), sum(Iy*Iy)] * [Vy] = [-sum(Iy*It)]
    var sumIxIx: f32 = 0.0;
    var sumIyIy: f32 = 0.0;
    var sumIxIy: f32 = 0.0;
    var sumIxIt: f32 = 0.0;
    var sumIyIt: f32 = 0.0;

    for (var wy: i32 = -radius; wy <= radius; wy++) {
        for (var wx: i32 = -radius; wx <= radius; wx++) {
            let coord = clamp(center + vec2i(wx, wy), vec2i(0), maxCoord);

            let ix = textureLoad(lkIx, coord, 0).r;
            let iy = textureLoad(lkIy, coord, 0).r;
            let it = textureLoad(lkIt, coord, 0).r;

            sumIxIx += ix * ix;
            sumIyIy += iy * iy;
            sumIxIy += ix * iy;
            sumIxIt += ix * it;
            sumIyIt += iy * it;
        }
    }

    // Solve 2x2 linear system using Cramer's rule
    // A = [sumIxIx, sumIxIy; sumIxIy, sumIyIy]
    // b = [-sumIxIt, -sumIyIt]
    let det = sumIxIx * sumIyIy - sumIxIy * sumIxIy;

    // Check if matrix is well-conditioned (eigenvalue check)
    // For 2x2 symmetric matrix, smallest eigenvalue is bounded by det/trace
    let trace = sumIxIx + sumIyIy;
    let minEig = (trace - sqrt(max(0.0, trace * trace - 4.0 * det))) * 0.5;

    var flow = initFlow;

    if (abs(det) > 1e-6 && minEig > lkParams.minEigenvalue) {
        // Solve: [Vx, Vy] = A^-1 * b
        let invDet = 1.0 / det;
        let vx = (sumIyIy * (-sumIxIt) - sumIxIy * (-sumIyIt)) * invDet;
        let vy = (sumIxIx * (-sumIyIt) - sumIxIy * (-sumIxIt)) * invDet;

        // Add to initial estimate from coarser level
        flow = initFlow + vec2f(vx, vy);
    }

    textureStore(flowOutput, center, vec4f(flow, 0.0, 1.0));
}

// ==================== FLOW STATISTICS REDUCTION ====================
// Computes motion statistics from flow field using atomics

struct FlowStats {
    sumMagnitude: atomic<u32>,      // Fixed-point (x1000)
    sumMagnitudeSq: atomic<u32>,    // For variance
    sumVx: atomic<i32>,             // Fixed-point (x1000)
    sumVy: atomic<i32>,             // Fixed-point (x1000)
    pixelCount: atomic<u32>,
    significantPixels: atomic<u32>, // Pixels with magnitude > threshold
    maxMagnitude: atomic<u32>,      // Fixed-point (x1000)
    directionHistogram: array<atomic<u32>, 8>,  // 8 direction bins (45 deg each)
};

struct StatsParams {
    magnitudeThreshold: f32,  // Minimum flow magnitude to count as motion
    _pad1: f32,
    _pad2: f32,
    _pad3: f32,
};

@group(0) @binding(0) var statsFlow: texture_2d<f32>;
@group(0) @binding(1) var<storage, read_write> stats: FlowStats;
@group(0) @binding(2) var<uniform> statsParams: StatsParams;

@compute @workgroup_size(8, 8)
fn flowStatisticsMain(@builtin(global_invocation_id) id: vec3u) {
    let dims = textureDimensions(statsFlow);
    if (id.x >= dims.x || id.y >= dims.y) { return; }

    let flow = textureLoad(statsFlow, vec2i(id.xy), 0).rg;
    let magnitude = length(flow);

    // Convert to fixed-point for atomic operations (scale by 1000)
    let magFixed = u32(clamp(magnitude * 1000.0, 0.0, 1000000.0));
    let magSqFixed = u32(clamp(magnitude * magnitude * 1000.0, 0.0, 1000000.0));
    let vxFixed = i32(clamp(flow.x * 1000.0, -1000000.0, 1000000.0));
    let vyFixed = i32(clamp(flow.y * 1000.0, -1000000.0, 1000000.0));

    // Accumulate statistics
    atomicAdd(&stats.sumMagnitude, magFixed);
    atomicAdd(&stats.sumMagnitudeSq, magSqFixed);
    atomicAdd(&stats.sumVx, vxFixed);
    atomicAdd(&stats.sumVy, vyFixed);
    atomicAdd(&stats.pixelCount, 1u);

    // Track max magnitude
    atomicMax(&stats.maxMagnitude, magFixed);

    // Count significant motion pixels
    if (magnitude > statsParams.magnitudeThreshold) {
        atomicAdd(&stats.significantPixels, 1u);

        // Direction histogram (8 bins, 45 degrees each)
        let angle = atan2(flow.y, flow.x);  // -PI to PI
        let normalizedAngle = (angle + PI) / (2.0 * PI);  // 0 to 1
        let bin = u32(clamp(normalizedAngle * 8.0, 0.0, 7.0));
        atomicAdd(&stats.directionHistogram[bin], 1u);
    }
}

// ==================== STATS BUFFER CLEAR ====================
// Clears the statistics buffer before each frame

@group(0) @binding(0) var<storage, read_write> clearStats: FlowStats;

@compute @workgroup_size(1)
fn clearStatsMain() {
    atomicStore(&clearStats.sumMagnitude, 0u);
    atomicStore(&clearStats.sumMagnitudeSq, 0u);
    atomicStore(&clearStats.sumVx, 0i);
    atomicStore(&clearStats.sumVy, 0i);
    atomicStore(&clearStats.pixelCount, 0u);
    atomicStore(&clearStats.significantPixels, 0u);
    atomicStore(&clearStats.maxMagnitude, 0u);
    for (var i: u32 = 0u; i < 8u; i++) {
        atomicStore(&clearStats.directionHistogram[i], 0u);
    }
}
`,y=160,x=90,P=3,ie=.5,ne=8,ae=.6,se=.7;class oe{device;initialized=!1;grayscalePipeline=null;pyramidDownsamplePipeline=null;spatialGradientsPipeline=null;temporalGradientPipeline=null;lucasKanadePipeline=null;flowStatisticsPipeline=null;clearStatsPipeline=null;grayscaleLayout=null;pyramidDownsampleLayout=null;spatialGradientsLayout=null;temporalGradientLayout=null;lucasKanadeLayout=null;flowStatisticsLayout=null;clearStatsLayout=null;inputTexture=null;grayscaleTextures=[];pyramidTextures=[];gradientTextures=[];flowTextures=[];blurTempTexture=null;statsBuffer=null;stagingBuffer=null;lkParamsBuffer=null;statsParamsBuffer=null;hasPreviousFrame=!1;frameIndex=0;constructor(e){this.device=e}async initialize(){if(this.initialized)return!0;try{return await this.createPipelines(),this.createTextures(),this.createBuffers(),this.initialized=!0,!0}catch(e){return console.error("[OpticalFlowAnalyzer] Failed to initialize",e),!1}}async createPipelines(){const e=this.device.createShaderModule({code:re});this.grayscaleLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"r32float"}}]}),this.grayscalePipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.grayscaleLayout]}),compute:{module:e,entryPoint:"grayscaleMain"}}),this.pyramidDownsampleLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"r32float"}}]}),this.pyramidDownsamplePipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.pyramidDownsampleLayout]}),compute:{module:e,entryPoint:"pyramidDownsampleMain"}}),this.spatialGradientsLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"r32float"}},{binding:2,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"r32float"}}]}),this.spatialGradientsPipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.spatialGradientsLayout]}),compute:{module:e,entryPoint:"spatialGradientsMain"}}),this.temporalGradientLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:2,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"r32float"}}]}),this.temporalGradientPipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.temporalGradientLayout]}),compute:{module:e,entryPoint:"temporalGradientMain"}}),this.lucasKanadeLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:2,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:4,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"rg32float"}},{binding:5,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}}]}),this.lucasKanadePipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.lucasKanadeLayout]}),compute:{module:e,entryPoint:"lucasKanadeMain"}}),this.flowStatisticsLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),this.flowStatisticsPipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.flowStatisticsLayout]}),compute:{module:e,entryPoint:"flowStatisticsMain"}}),this.clearStatsLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),this.clearStatsPipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.clearStatsLayout]}),compute:{module:e,entryPoint:"clearStatsMain"}})}createTextures(){this.inputTexture=this.device.createTexture({size:[y,x],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});for(let r=0;r<2;r++)this.grayscaleTextures.push(this.device.createTexture({size:[y,x],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC}));this.blurTempTexture=this.device.createTexture({size:[y,x],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING});for(let r=0;r<2;r++){const i=[];let n=y,a=x;for(let s=0;s<P;s++)i.push(this.device.createTexture({size:[n,a],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING|(s===0?GPUTextureUsage.COPY_DST:0)})),n=Math.max(1,Math.floor(n/2)),a=Math.max(1,Math.floor(a/2));this.pyramidTextures.push(i)}let e=y,t=x;for(let r=0;r<P;r++)this.gradientTextures.push({ix:this.device.createTexture({size:[e,t],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING}),iy:this.device.createTexture({size:[e,t],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING}),it:this.device.createTexture({size:[e,t],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING})}),e=Math.max(1,Math.floor(e/2)),t=Math.max(1,Math.floor(t/2));e=y,t=x;for(let r=0;r<P;r++)this.flowTextures.push(this.device.createTexture({size:[e,t],format:"rg32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING})),e=Math.max(1,Math.floor(e/2)),t=Math.max(1,Math.floor(t/2))}createBuffers(){this.statsBuffer=this.device.createBuffer({size:64,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),this.stagingBuffer=this.device.createBuffer({size:64,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),this.lkParamsBuffer=this.device.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.statsParamsBuffer=this.device.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const e=new Float32Array([ie,0,0,0]);this.device.queue.writeBuffer(this.statsParamsBuffer,0,e)}async analyzeFrame(e){if(!this.initialized&&!await this.initialize())return{total:0,global:0,local:0,isSceneCut:!1};const t=this.frameIndex%2,r=(this.frameIndex+1)%2;this.device.queue.copyExternalImageToTexture({source:e},{texture:this.inputTexture},[y,x]);const i=this.device.createCommandEncoder();if(this.dispatchGrayscale(i,t),this.dispatchPyramid(i,t),this.hasPreviousFrame){for(let a=P-1;a>=0;a--)this.dispatchSpatialGradients(i,t,a),this.dispatchTemporalGradient(i,t,r,a),this.dispatchLucasKanade(i,a);this.dispatchClearStats(i),this.dispatchFlowStatistics(i)}this.device.queue.submit([i.finish()]);let n={total:0,global:0,local:0,isSceneCut:!1};if(this.hasPreviousFrame){const a=await this.readStats();n=this.classifyMotion(a)}return this.hasPreviousFrame=!0,this.frameIndex++,n}dispatchGrayscale(e,t){const r=this.device.createBindGroup({layout:this.grayscaleLayout,entries:[{binding:0,resource:this.inputTexture.createView()},{binding:1,resource:this.grayscaleTextures[t].createView()}]}),i=e.beginComputePass();i.setPipeline(this.grayscalePipeline),i.setBindGroup(0,r),i.dispatchWorkgroups(Math.ceil(y/8),Math.ceil(x/8)),i.end()}dispatchPyramid(e,t){e.copyTextureToTexture({texture:this.grayscaleTextures[t]},{texture:this.pyramidTextures[t][0]},[y,x]);let r=y,i=x;for(let n=1;n<P;n++){r=Math.max(1,Math.floor(r/2)),i=Math.max(1,Math.floor(i/2));const a=this.device.createBindGroup({layout:this.pyramidDownsampleLayout,entries:[{binding:0,resource:this.pyramidTextures[t][n-1].createView()},{binding:1,resource:this.pyramidTextures[t][n].createView()}]}),s=e.beginComputePass();s.setPipeline(this.pyramidDownsamplePipeline),s.setBindGroup(0,a),s.dispatchWorkgroups(Math.ceil(r/8),Math.ceil(i/8)),s.end()}}dispatchSpatialGradients(e,t,r){const i=this.getPyramidDimensions(r),n=this.device.createBindGroup({layout:this.spatialGradientsLayout,entries:[{binding:0,resource:this.pyramidTextures[t][r].createView()},{binding:1,resource:this.gradientTextures[r].ix.createView()},{binding:2,resource:this.gradientTextures[r].iy.createView()}]}),a=e.beginComputePass();a.setPipeline(this.spatialGradientsPipeline),a.setBindGroup(0,n),a.dispatchWorkgroups(Math.ceil(i.w/8),Math.ceil(i.h/8)),a.end()}dispatchTemporalGradient(e,t,r,i){const n=this.getPyramidDimensions(i),a=this.device.createBindGroup({layout:this.temporalGradientLayout,entries:[{binding:0,resource:this.pyramidTextures[t][i].createView()},{binding:1,resource:this.pyramidTextures[r][i].createView()},{binding:2,resource:this.gradientTextures[i].it.createView()}]}),s=e.beginComputePass();s.setPipeline(this.temporalGradientPipeline),s.setBindGroup(0,a),s.dispatchWorkgroups(Math.ceil(n.w/8),Math.ceil(n.h/8)),s.end()}dispatchLucasKanade(e,t){const r=this.getPyramidDimensions(t),i=2,n=.001,a=t<P-1?2:0,s=new ArrayBuffer(16),u=new DataView(s);u.setUint32(0,i,!0),u.setFloat32(4,n,!0),u.setFloat32(8,a,!0),u.setUint32(12,0,!0),this.device.queue.writeBuffer(this.lkParamsBuffer,0,s);const l=t<P-1?this.flowTextures[t+1]:this.createDummyFlowTexture(),o=this.device.createBindGroup({layout:this.lucasKanadeLayout,entries:[{binding:0,resource:this.gradientTextures[t].ix.createView()},{binding:1,resource:this.gradientTextures[t].iy.createView()},{binding:2,resource:this.gradientTextures[t].it.createView()},{binding:3,resource:{buffer:this.lkParamsBuffer}},{binding:4,resource:this.flowTextures[t].createView()},{binding:5,resource:l.createView()}]}),p=e.beginComputePass();p.setPipeline(this.lucasKanadePipeline),p.setBindGroup(0,o),p.dispatchWorkgroups(Math.ceil(r.w/8),Math.ceil(r.h/8)),p.end()}dummyFlowTexture=null;createDummyFlowTexture(){return this.dummyFlowTexture||(this.dummyFlowTexture=this.device.createTexture({size:[1,1],format:"rg32float",usage:GPUTextureUsage.TEXTURE_BINDING})),this.dummyFlowTexture}dispatchClearStats(e){const t=this.device.createBindGroup({layout:this.clearStatsLayout,entries:[{binding:0,resource:{buffer:this.statsBuffer}}]}),r=e.beginComputePass();r.setPipeline(this.clearStatsPipeline),r.setBindGroup(0,t),r.dispatchWorkgroups(1),r.end()}dispatchFlowStatistics(e){const t=this.device.createBindGroup({layout:this.flowStatisticsLayout,entries:[{binding:0,resource:this.flowTextures[0].createView()},{binding:1,resource:{buffer:this.statsBuffer}},{binding:2,resource:{buffer:this.statsParamsBuffer}}]}),r=e.beginComputePass();r.setPipeline(this.flowStatisticsPipeline),r.setBindGroup(0,t),r.dispatchWorkgroups(Math.ceil(y/8),Math.ceil(x/8)),r.end(),e.copyBufferToBuffer(this.statsBuffer,0,this.stagingBuffer,0,64)}async readStats(){await this.stagingBuffer.mapAsync(GPUMapMode.READ);const e=new Uint32Array(this.stagingBuffer.getMappedRange().slice(0));this.stagingBuffer.unmap();const t=e[0]/1e3,r=e[1]/1e3,i=new Int32Array([e[2]])[0]/1e3,n=new Int32Array([e[3]])[0]/1e3,a=e[4],s=e[5],u=e[6]/1e3,l=[];for(let S=0;S<8;S++)l.push(e[7+S]);if(a===0)return{meanMagnitude:0,magnitudeVariance:0,meanVx:0,meanVy:0,directionCoherence:0,coverageRatio:0,maxMagnitude:0};const o=t/a,d=r/a-o*o,h=i/a,g=n/a,v=Math.sqrt(h*h+g*g),m=o>.01?v/o:0,b=y*x,f=s/b;return{meanMagnitude:o,magnitudeVariance:d,meanVx:h,meanVy:g,directionCoherence:Math.min(1,m),coverageRatio:f,maxMagnitude:u}}classifyMotion(e){const t=Math.min(1,e.meanMagnitude/10),r=e.meanMagnitude>ne&&e.coverageRatio>se,i=e.directionCoherence;let n,a;if(r)n=t,a=0;else if(i>ae)n=t*i,a=t*(1-i);else{const s=Math.min(1,Math.sqrt(e.magnitudeVariance)/5);n=t*i,a=Math.max(t*(1-i),s)}return{total:t,global:Math.min(1,n),local:Math.min(1,a),isSceneCut:r}}getPyramidDimensions(e){let t=y,r=x;for(let i=0;i<e;i++)t=Math.max(1,Math.floor(t/2)),r=Math.max(1,Math.floor(r/2));return{w:t,h:r}}reset(){this.hasPreviousFrame=!1,this.frameIndex=0}destroy(){this.inputTexture?.destroy(),this.blurTempTexture?.destroy(),this.dummyFlowTexture?.destroy();for(const e of this.grayscaleTextures)e.destroy();for(const e of this.pyramidTextures)for(const t of e)t.destroy();for(const e of this.gradientTextures)e.ix.destroy(),e.iy.destroy(),e.it.destroy();for(const e of this.flowTextures)e.destroy();this.statsBuffer?.destroy(),this.stagingBuffer?.destroy(),this.lkParamsBuffer?.destroy(),this.statsParamsBuffer?.destroy(),this.initialized=!1}}class ue{els;lastGpuEnd=0;smoothedGpu=0;smoothedFps=0;smoothedPrep=0;alpha=.14;constructor(e){this.els=e}reset(){this.lastGpuEnd=0,this.smoothedGpu=0,this.smoothedFps=0,this.smoothedPrep=0,this.els.fps.textContent="—",this.els.gpuMs.textContent="—",this.els.prepMs.textContent="—",this.els.resolution.textContent="—"}recordFrame(e,t,r,i,n,a,s){const u=Math.max(0,t-e);if(this.smoothedGpu=this.smoothedGpu===0?u:this.smoothedGpu*(1-this.alpha)+u*this.alpha,this.lastGpuEnd>0){const l=t-this.lastGpuEnd;if(l>.5){const o=1e3/l;this.smoothedFps=this.smoothedFps===0?o:this.smoothedFps*(1-this.alpha)+o*this.alpha}}this.lastGpuEnd=t,s!==void 0&&s>=0?(this.smoothedPrep=this.smoothedPrep===0?s:this.smoothedPrep*(1-this.alpha)+s*this.alpha,this.els.prepMs.textContent=this.smoothedPrep<.05?"—":this.smoothedPrep.toFixed(2)):(this.smoothedPrep=0,this.els.prepMs.textContent="—"),this.els.fps.textContent=this.smoothedFps===0?"—":this.smoothedFps.toFixed(0),this.els.gpuMs.textContent=this.smoothedGpu.toFixed(2),this.els.resolution.textContent=`${n}×${a} ← ${r}×${i}`}}const ce=`// Shared shader code for all effects
// This file is prepended to every effect shader

// Vertex output structure - used by all effects
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

// Fullscreen quad vertex shader - shared by all effects
@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var positions = array<vec2f, 6>(
    vec2f(-1.0, -1.0),
    vec2f(1.0, -1.0),
    vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0),
    vec2f(1.0, -1.0),
    vec2f(1.0, 1.0)
  );

  var uvs = array<vec2f, 6>(
    vec2f(0.0, 1.0),
    vec2f(1.0, 1.0),
    vec2f(0.0, 0.0),
    vec2f(0.0, 0.0),
    vec2f(1.0, 1.0),
    vec2f(1.0, 0.0)
  );

  var output: VertexOutput;
  output.position = vec4f(positions[vertexIndex], 0.0, 1.0);
  output.uv = uvs[vertexIndex];
  return output;
}

// ==================== COLOR SPACE CONVERSIONS ====================

// RGB to HSV conversion
fn rgb2hsv(c: vec3f) -> vec3f {
  let K = vec4f(0.0, -1.0/3.0, 2.0/3.0, -1.0);
  let p = mix(vec4f(c.bg, K.wz), vec4f(c.gb, K.xy), step(c.b, c.g));
  let q = mix(vec4f(p.xyw, c.r), vec4f(c.r, p.yzx), step(p.x, c.r));
  let d = q.x - min(q.w, q.y);
  let e = 1.0e-10;
  return vec3f(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// HSV to RGB conversion
fn hsv2rgb(c: vec3f) -> vec3f {
  let K = vec4f(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  let p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, vec3f(0.0), vec3f(1.0)), c.y);
}

// RGB to HSL conversion
fn rgb2hsl(c: vec3f) -> vec3f {
  let maxC = max(max(c.r, c.g), c.b);
  let minC = min(min(c.r, c.g), c.b);
  let l = (maxC + minC) * 0.5;

  if (maxC == minC) {
    return vec3f(0.0, 0.0, l);
  }

  let d = maxC - minC;
  let s = select(d / (2.0 - maxC - minC), d / (maxC + minC), l > 0.5);

  var h: f32;
  if (maxC == c.r) {
    h = (c.g - c.b) / d + select(0.0, 6.0, c.g < c.b);
  } else if (maxC == c.g) {
    h = (c.b - c.r) / d + 2.0;
  } else {
    h = (c.r - c.g) / d + 4.0;
  }
  h /= 6.0;

  return vec3f(h, s, l);
}

// Helper for HSL to RGB
fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
  var tt = t;
  if (tt < 0.0) { tt += 1.0; }
  if (tt > 1.0) { tt -= 1.0; }
  if (tt < 1.0/6.0) { return p + (q - p) * 6.0 * tt; }
  if (tt < 1.0/2.0) { return q; }
  if (tt < 2.0/3.0) { return p + (q - p) * (2.0/3.0 - tt) * 6.0; }
  return p;
}

// HSL to RGB conversion
fn hsl2rgb(c: vec3f) -> vec3f {
  if (c.y == 0.0) {
    return vec3f(c.z);
  }

  let q = select(c.z + c.y - c.z * c.y, c.z * (1.0 + c.y), c.z < 0.5);
  let p = 2.0 * c.z - q;

  return vec3f(
    hue2rgb(p, q, c.x + 1.0/3.0),
    hue2rgb(p, q, c.x),
    hue2rgb(p, q, c.x - 1.0/3.0)
  );
}

// ==================== UTILITY FUNCTIONS ====================

// Luminance (Rec. 709)
fn luminance(c: vec3f) -> f32 {
  return dot(c, vec3f(0.2126, 0.7152, 0.0722));
}

// Luminance (Rec. 601 - legacy)
fn luminance601(c: vec3f) -> f32 {
  return dot(c, vec3f(0.299, 0.587, 0.114));
}

// Constants
const PI: f32 = 3.14159265359;
const TAU: f32 = 6.28318530718;
const E: f32 = 2.71828182846;

// Gaussian function
fn gaussian(x: f32, sigma: f32) -> f32 {
  return exp(-(x * x) / (2.0 * sigma * sigma));
}

// Smoothstep variant
fn smootherstep(edge0: f32, edge1: f32, x: f32) -> f32 {
  let t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

// Random hash function
fn hash(p: vec2f) -> f32 {
  let p2 = vec2f(dot(p, vec2f(127.1, 311.7)), dot(p, vec2f(269.5, 183.3)));
  return fract(sin(dot(p2, vec2f(12.9898, 78.233))) * 43758.5453);
}

// 2D noise
fn noise2d(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2f(0.0, 0.0)), hash(i + vec2f(1.0, 0.0)), u.x),
    mix(hash(i + vec2f(0.0, 1.0)), hash(i + vec2f(1.0, 1.0)), u.x),
    u.y
  );
}
`,le=`// Hue Shift Effect Shader

struct HueShiftParams {
  shift: f32,
  _p1: f32,
  _p2: f32,
  _p3: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: HueShiftParams;

@fragment
fn hueShiftFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  var hsv = rgb2hsv(color.rgb);
  hsv.x = fract(hsv.x + params.shift);
  return vec4f(hsv2rgb(hsv), color.a);
}
`,de=`// Brightness Effect Shader

struct BrightnessParams {
  amount: f32,
  _p1: f32,
  _p2: f32,
  _p3: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: BrightnessParams;

@fragment
fn brightnessFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let adjusted = color.rgb + params.amount;
  return vec4f(clamp(adjusted, vec3f(0.0), vec3f(1.0)), color.a);
}
`,pe=`// Contrast Effect Shader

struct ContrastParams {
  amount: f32,
  _p1: f32,
  _p2: f32,
  _p3: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: ContrastParams;

@fragment
fn contrastFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let adjusted = (color.rgb - 0.5) * params.amount + 0.5;
  return vec4f(clamp(adjusted, vec3f(0.0), vec3f(1.0)), color.a);
}
`,fe=`// Saturation Effect Shader

struct SaturationParams {
  amount: f32,
  _p1: f32,
  _p2: f32,
  _p3: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: SaturationParams;

@fragment
fn saturationFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let gray = luminance601(color.rgb);
  let adjusted = mix(vec3f(gray), color.rgb, params.amount);
  return vec4f(clamp(adjusted, vec3f(0.0), vec3f(1.0)), color.a);
}
`,me=`// Levels Effect Shader

struct LevelsParams {
  inputBlack: f32,
  inputWhite: f32,
  gamma: f32,
  outputBlack: f32,
  outputWhite: f32,
  _p1: f32,
  _p2: f32,
  _p3: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: LevelsParams;

@fragment
fn levelsFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);

  // Remap input range
  var adjusted = (color.rgb - vec3f(params.inputBlack)) /
                 (params.inputWhite - params.inputBlack);
  adjusted = clamp(adjusted, vec3f(0.0), vec3f(1.0));

  // Apply gamma
  adjusted = pow(adjusted, vec3f(1.0 / params.gamma));

  // Remap to output range
  adjusted = mix(vec3f(params.outputBlack), vec3f(params.outputWhite), adjusted);

  return vec4f(adjusted, color.a);
}
`,he=`// Pixelate Effect Shader

struct PixelateParams {
  pixelSize: f32,
  width: f32,
  height: f32,
  _p: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: PixelateParams;

@fragment
fn pixelateFragment(input: VertexOutput) -> @location(0) vec4f {
  let pixelX = params.pixelSize / params.width;
  let pixelY = params.pixelSize / params.height;
  let uv = vec2f(
    floor(input.uv.x / pixelX) * pixelX + pixelX * 0.5,
    floor(input.uv.y / pixelY) * pixelY + pixelY * 0.5
  );
  return textureSample(inputTex, texSampler, uv);
}
`,ge=`// Kaleidoscope Effect Shader

struct KaleidoscopeParams {
  segments: f32,
  rotation: f32,
  _p1: f32,
  _p2: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: KaleidoscopeParams;

@fragment
fn kaleidoscopeFragment(input: VertexOutput) -> @location(0) vec4f {
  var uv = input.uv - 0.5;
  let angle = atan2(uv.y, uv.x) + params.rotation;
  let radius = length(uv);

  let segmentAngle = TAU / params.segments;
  var a = fract(angle / segmentAngle) * segmentAngle;

  if (a > segmentAngle * 0.5) {
    a = segmentAngle - a;
  }

  uv = vec2f(cos(a), sin(a)) * radius + 0.5;
  return textureSample(inputTex, texSampler, uv);
}
`,ve=`// Mirror Effect Shader

struct MirrorParams {
  horizontal: f32,
  vertical: f32,
  _p1: f32,
  _p2: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: MirrorParams;

@fragment
fn mirrorFragment(input: VertexOutput) -> @location(0) vec4f {
  var uv = input.uv;

  if (params.horizontal > 0.5 && uv.x > 0.5) {
    uv.x = 1.0 - uv.x;
  }

  if (params.vertical > 0.5 && uv.y > 0.5) {
    uv.y = 1.0 - uv.y;
  }

  return textureSample(inputTex, texSampler, uv);
}
`,ye=`// RGB Split (Chromatic Aberration) Effect Shader

struct RGBSplitParams {
  amount: f32,
  angle: f32,
  _p1: f32,
  _p2: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: RGBSplitParams;

@fragment
fn rgbSplitFragment(input: VertexOutput) -> @location(0) vec4f {
  let offset = vec2f(cos(params.angle), sin(params.angle)) * params.amount;
  let r = textureSample(inputTex, texSampler, input.uv + offset).r;
  let g = textureSample(inputTex, texSampler, input.uv).g;
  let b = textureSample(inputTex, texSampler, input.uv - offset).b;
  let a = textureSample(inputTex, texSampler, input.uv).a;
  return vec4f(r, g, b, a);
}
`,xe=`// Invert Effect Shader

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;

@fragment
fn invertFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  return vec4f(1.0 - color.rgb, color.a);
}
`,be=`
struct BoxBlurParams {
  radius: f32,
  width: f32,
  height: f32,
  _pad: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: BoxBlurParams;

@fragment
fn boxBlurFragment(input: VertexOutput) -> @location(0) vec4f {
  if (params.radius < 0.5) {
    return textureSample(inputTex, texSampler, input.uv);
  }

  let texelSize = vec2f(1.0 / params.width, 1.0 / params.height);
  let samples = i32(params.radius);

  var color = vec4f(0.0);
  var count = 0.0;

  for (var x = -samples; x <= samples; x++) {
    for (var y = -samples; y <= samples; y++) {
      let offset = vec2f(f32(x), f32(y)) * texelSize;
      color += textureSample(inputTex, texSampler, input.uv + offset);
      count += 1.0;
    }
  }

  return color / count;
}
`;function Se(c){return`${ce}
${c}`}const Pe={id:"hue-shift",shader:le,entryPoint:"hueShiftFragment",uniformSize:16,packUniforms:(c,e,t)=>new Float32Array([c.shift??0,0,0,0])},Ge={id:"brightness",shader:de,entryPoint:"brightnessFragment",uniformSize:16,packUniforms:(c,e,t)=>new Float32Array([c.amount??0,0,0,0])},we={id:"contrast",shader:pe,entryPoint:"contrastFragment",uniformSize:16,packUniforms:(c,e,t)=>new Float32Array([c.amount??1,0,0,0])},Be={id:"saturation",shader:fe,entryPoint:"saturationFragment",uniformSize:16,packUniforms:(c,e,t)=>new Float32Array([c.amount??1,0,0,0])},Te={id:"pixelate",shader:he,entryPoint:"pixelateFragment",uniformSize:16,packUniforms:(c,e,t)=>new Float32Array([c.size??8,e,t,0])},Ce={id:"kaleidoscope",shader:ge,entryPoint:"kaleidoscopeFragment",uniformSize:16,packUniforms:(c,e,t)=>new Float32Array([c.segments??6,c.rotation??0,0,0])},Ue={id:"mirror",shader:ve,entryPoint:"mirrorFragment",uniformSize:16,packUniforms:(c,e,t)=>new Float32Array([c.horizontal?1:0,c.vertical?1:0,0,0])},Me={id:"rgb-split",shader:ye,entryPoint:"rgbSplitFragment",uniformSize:16,packUniforms:(c,e,t)=>new Float32Array([c.amount??.01,c.angle??0,0,0])},Ae={id:"invert",shader:xe,entryPoint:"invertFragment",uniformSize:0,packUniforms:()=>null},Re={id:"levels",shader:me,entryPoint:"levelsFragment",uniformSize:32,packUniforms:(c,e,t)=>new Float32Array([c.inputBlack??0,c.inputWhite??1,c.gamma??1,c.outputBlack??0,c.outputWhite??1,0,0,0])},Ie={id:"box-blur",shader:be,entryPoint:"boxBlurFragment",uniformSize:16,packUniforms:(c,e,t)=>new Float32Array([c.radius??5,e,t,0])},F=new Map([["hue-shift",Pe],["brightness",Ge],["contrast",we],["saturation",Be],["pixelate",Te],["kaleidoscope",Ce],["mirror",Ue],["rgb-split",Me],["invert",Ae],["levels",Re],["box-blur",Ie]]);function Oe(c,e){switch(c){case"hue-shift":return{shift:e.hueShift??0};case"brightness":return{amount:e.brightnessAmt??0};case"contrast":return{amount:e.contrastAmt??1};case"saturation":return{amount:e.saturationAmt??1};case"pixelate":return{size:e.pixelate??8};case"kaleidoscope":return{segments:e.kaleidoscopeSegments??6,rotation:e.kaleidoscopeRotation??0};case"mirror":return{horizontal:!!e.mirrorH,vertical:!!e.mirrorV};case"rgb-split":return{amount:e.rgbSplitAmount??.01,angle:e.rgbSplitAngle??0};case"invert":return{};case"levels":return{inputBlack:e.levelsInputBlack??0,inputWhite:e.levelsInputWhite??1,gamma:e.levelsGamma??1,outputBlack:e.levelsOutputBlack??0,outputWhite:e.levelsOutputWhite??1};case"box-blur":return{radius:e.boxBlurRadius??5}}}function Le(c,e){return c==="none"?[]:[{id:"demo",type:c,enabled:!0,params:Oe(c,e)}]}class C{setOptions(e,t,r,i,n){}}const Ee="rgba8unorm";class R extends C{device;pipelines=new Map;bindGroupLayouts=new Map;initialized=!1;frameOptions=null;canvasW=0;canvasH=0;constructor(e){super(),this.device=e,this.createPipelines()}static create(e){return new R(e)}createPipelines(){if(!this.initialized){for(const[e,t]of F)this.createEffectPipeline(t);this.initialized=!0}}createEffectPipeline(e){const t=Se(e.shader),r=this.device.createShaderModule({label:`simplified-effect-${e.id}`,code:t}),i=[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}}];e.uniformSize>0&&i.push({binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}});const n=this.device.createBindGroupLayout({label:`simplified-effect-${e.id}-layout`,entries:i});this.bindGroupLayouts.set(e.id,n);const a=this.device.createRenderPipeline({label:`simplified-effect-${e.id}-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[n]}),vertex:{module:r,entryPoint:"vertexMain"},fragment:{module:r,entryPoint:e.entryPoint,targets:[{format:Ee}]},primitive:{topology:"triangle-list"}});this.pipelines.set(e.id,a)}setOptions(e,t,r,i,n){this.frameOptions=e,this.canvasW=t,this.canvasH=r}gpuRender(e){const t=this.frameOptions,r=t?Le(t.effectType,t.effectParams):[];if(r.length===0)return e.inputView;const{finalView:i}=this.applyEffects(r,e);return i}createEffectUniformData(e,t,r){const i=F.get(e.type);return i?i.packUniforms(e.params,t,r):null}applyEffects(e,t){const r=e.filter(l=>l.enabled),i=t.inputView,n=t.outputView;if(r.length===0)return{finalView:i,swapped:!1};let a=i,s=n,u=!1;for(const l of r){const o=this.pipelines.get(l.type),p=this.bindGroupLayouts.get(l.type);if(!o||!p){console.warn(`[EffectsPipeline] No pipeline for effect type: ${l.type}`);continue}const d=this.createEffectUniformData(l,this.canvasW,this.canvasH);this.createGpuRenderPass(t,d,a,p,s,o);const h=a;a=s,s=h,u=!u}return{finalView:a,swapped:u}}createGpuRenderPass(e,t,r,i,n,a){let s=null;t&&(s=this.device.createBuffer({size:t.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.device.queue.writeBuffer(s,0,t.buffer));const u=[{binding:0,resource:e.sampler},{binding:1,resource:r}];s&&u.push({binding:2,resource:{buffer:s}});const l=this.device.createBindGroup({layout:i,entries:u}),o=e.encoder.beginRenderPass({colorAttachments:[{view:n,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});o.setPipeline(a),o.setBindGroup(0,l),o.draw(6),o.end()}}const _e=`
struct OutputUniforms {
  showTransparencyGrid: u32,
  outputWidth: f32,
  outputHeight: f32,
  _padding: f32,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var positions = array<vec2f, 6>(
    vec2f(-1.0, -1.0),
    vec2f(1.0, -1.0),
    vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0),
    vec2f(1.0, -1.0),
    vec2f(1.0, 1.0)
  );

  // triangle strip: 0, 1, 2, 3, 4, 5
  var uvs = array<vec2f, 6>(
    vec2f(0.0, 1.0), // top-left
    vec2f(1.0, 1.0), // top-right
    vec2f(0.0, 0.0), // bottom-left
    vec2f(0.0, 0.0), // bottom-left
    vec2f(1.0, 1.0), // top-right
    vec2f(1.0, 0.0) // bottom-right
  );

  var output: VertexOutput;
  output.position = vec4f(positions[vertexIndex], 0.0, 1.0);
  output.uv = uvs[vertexIndex];
  return output;
}

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTexture: texture_2d<f32>;
@group(0) @binding(2) var<uniform> uniforms: OutputUniforms;

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  if (uniforms.showTransparencyGrid == 2u) {
    let topUV = vec2f(input.uv.x, input.uv.y * 2.0);
    let botUV = vec2f(input.uv.x, (input.uv.y - 0.5) * 2.0);
    let topColor = textureSample(inputTexture, texSampler, topUV);
    let botColor = textureSample(inputTexture, texSampler, botUV);
    let isBottom = input.uv.y >= 0.5;
    let rgb = select(topColor.rgb, vec3f(botColor.a), isBottom);
    return vec4f(rgb, 1.0);
  }

  let color = textureSample(inputTexture, texSampler, input.uv);

  if (uniforms.showTransparencyGrid == 1u && color.a < 1.0) {
    let pixelX = input.uv.x * uniforms.outputWidth;
    let pixelY = input.uv.y * uniforms.outputHeight;
    let checkerSize = 24.0;
    let cx = floor(pixelX / checkerSize);
    let cy = floor(pixelY / checkerSize);
    let checker = (u32(cx) + u32(cy)) % 2u;
    let light = 0.25;
    let dark = 0.19;
    let bg = select(dark, light, checker == 0u);
    let checkerColor = vec3f(bg);
    let result = mix(checkerColor, color.rgb, color.a);
    return vec4f(result, 1.0);
  }

  // Default preview: straight-alpha input → premultiplied RGBA for the swap chain
  // (VideoFrameRenderer uses canvas alphaMode "premultiplied"). Preserves empty
  // margin around scaled / moved layers instead of smearing edge-clamped RGB.
  return vec4f(color.rgb * color.a, color.a);
}
`;class I{shaderModule;device;bufferDataMap=new Map;bindingGroupLayout;label;constructor(e,t,r="none"){this.device=t,this.label=r,this.shaderModule=this.device.createShaderModule({code:e})}setBindingGroupDataDescriptor(e){this.bindingGroupLayout=this.device.createBindGroupLayout({label:`binding-group-layout-${this.label}`,entries:e})}pushBindingGroupData(e){return this.device.createBindGroup({label:`binding-group-${this.label}`,layout:this.bindingGroupLayout,entries:e})}createPipeline(e,t,r=navigator.gpu.getPreferredCanvasFormat()){return this.device.createRenderPipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.bindingGroupLayout]}),vertex:{module:this.shaderModule,entryPoint:e},fragment:{module:this.shaderModule,entryPoint:t,targets:[{format:r}]},primitive:{topology:"triangle-list"}})}setBufferDataDescriptor(e,t){const r=this.device.createBuffer(t);return this.bufferDataMap.set(e,r),r}pushBufferDataFor(e,t,r=0){const i=this.bufferDataMap.get(e);i!==void 0&&this.device.queue.writeBuffer(i,r,t)}}class O extends C{outputPipeline=null;uniformBufferGridOn=null;uniformBufferGridOff=null;uniformBufferStackedAlpha=null;bindGroupCacheGridOn=new Map;bindGroupCacheGridOff=new Map;bindGroupCacheStackedAlpha=new Map;pipelineBuilder;outputWidth=0;outputHeight=0;outputMode="normal";constructor(e){super(),this.pipelineBuilder=e,this.createPipeline()}static create(e){const t=new I(_e,e);return new O(t)}createPipeline(){const e={size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST};this.uniformBufferGridOn=this.pipelineBuilder.setBufferDataDescriptor("uniformBufferGridOn",e),this.uniformBufferGridOff=this.pipelineBuilder.setBufferDataDescriptor("uniformBufferGridOff",e),this.uniformBufferStackedAlpha=this.pipelineBuilder.setBufferDataDescriptor("uniformBufferStackedAlpha",e);const t=[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}];this.pipelineBuilder.setBindingGroupDataDescriptor(t),this.outputPipeline=this.pipelineBuilder.createPipeline("vertexMain","fragmentMain")}updateResolution(e,t){this.outputWidth=e,this.outputHeight=t,this.pipelineBuilder.pushBufferDataFor("uniformBufferGridOff",this.getBufferData(0)),this.pipelineBuilder.pushBufferDataFor("uniformBufferGridOn",this.getBufferData(1)),this.pipelineBuilder.pushBufferDataFor("uniformBufferStackedAlpha",this.getBufferData(2))}getBufferData(e){const t=new ArrayBuffer(16),r=new DataView(t);return r.setUint32(0,e,!0),r.setFloat32(4,this.outputWidth,!0),r.setFloat32(8,this.outputHeight,!0),r.setFloat32(12,0,!0),t}invalidateCache(){this.bindGroupCacheGridOn.clear(),this.bindGroupCacheGridOff.clear(),this.bindGroupCacheStackedAlpha.clear()}createOutputBindGroup(e,t,r){const i=r==="grid"?this.bindGroupCacheGridOn:r==="stackedAlpha"?this.bindGroupCacheStackedAlpha:this.bindGroupCacheGridOff,n=i.get(t);if(n)return n;const a=r==="grid"?this.uniformBufferGridOn:r==="stackedAlpha"?this.uniformBufferStackedAlpha:this.uniformBufferGridOff,s=this.pipelineBuilder.pushBindingGroupData([{binding:0,resource:e},{binding:1,resource:t},{binding:2,resource:{buffer:a}}]);return i.set(t,s),s}gpuRender(e){const t=e.inputView;if(!this.outputPipeline)return t;const r=this.createOutputBindGroup(e.sampler,t,this.outputMode),i=e.encoder.beginRenderPass({colorAttachments:[{view:e.outputView,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});return i.setPipeline(this.outputPipeline),i.setBindGroup(0,r),i.draw(6),i.end(),e.outputView}setOptions(e,t,r,i,n){super.setOptions(e,t,r,i,n),this.updateResolution(t,r),this.outputMode=e.outputMode==="grid"?"grid":e.outputMode==="stackedAlpha"?"stackedAlpha":"normal"}}const Ve=`// Copy GPUExternalTexture (VideoFrame / HTMLVideoElement) into a regular rgba8unorm target.
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VertexOutput {
  var pos = array<vec2f, 6>(
    vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0)
  );
  var uv = array<vec2f, 6>(
    vec2f(0.0, 1.0), vec2f(1.0, 1.0), vec2f(0.0, 0.0),
    vec2f(0.0, 0.0), vec2f(1.0, 1.0), vec2f(1.0, 0.0)
  );
  var o: VertexOutput;
  o.position = vec4f(pos[vi], 0.0, 1.0);
  o.uv = uv[vi];
  return o;
}

@group(0) @binding(0) var samp: sampler;
@group(0) @binding(1) var ext: texture_external;

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4f {
  return textureSampleBaseClampToEdge(ext, samp, in.uv);
}
`;class L extends C{builder;pipeline;constructor(e,t){super(),this.builder=e,this.pipeline=t}static create(e,t="rgba8unorm"){const r=new I(Ve,e);r.setBindingGroupDataDescriptor([{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,externalTexture:{}}]);const i=r.createPipeline("vs_main","fs_main",t);return new L(r,i)}gpuRender(e){const t=this.builder.pushBindingGroupData([{binding:0,resource:e.sampler},{binding:1,resource:e.inputView}]),r=e.encoder.beginRenderPass({colorAttachments:[{view:e.outputView,clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}]});return r.setPipeline(this.pipeline),r.setBindGroup(0,t),r.draw(6),r.end(),e.outputView}}const Fe=`
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VertexOutput {
  var pos = array<vec2f, 6>(
    vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0)
  );
  var uv = array<vec2f, 6>(
    vec2f(0.0, 1.0), vec2f(1.0, 1.0), vec2f(0.0, 0.0),
    vec2f(0.0, 0.0), vec2f(1.0, 1.0), vec2f(1.0, 0.0)
  );
  var o: VertexOutput;
  o.position = vec4f(pos[vi], 0.0, 1.0);
  o.uv = uv[vi];
  return o;
}

struct LayerUniforms {
  opacity: f32,
  blendMode: u32,
  posX: f32,
  posY: f32,
  scaleX: f32,
  scaleY: f32,
  rotationZ: f32,
  sourceAspect: f32,
  outputAspect: f32,
  time: f32,
  hasMask: u32,
  maskInvert: u32,
  rotationX: f32,
  rotationY: f32,
  perspective: f32,
  maskFeather: f32,
  maskFeatherQuality: u32,
  posZ: f32,
  inlineBrightness: f32,
  inlineContrast: f32,
  inlineSaturation: f32,
  inlineInvert: u32,
  _pad4: f32,
  _pad5: f32,
}

@group(0) @binding(0) var samp: sampler;
@group(0) @binding(1) var videoTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> layer: LayerUniforms;

fn luminosity(c: vec3f) -> f32 {
  return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4f {
  var uv = in.uv;

  uv = uv - vec2f(0.5);

  var p = vec3f(uv.x, uv.y / layer.outputAspect, layer.posZ);

  if (abs(layer.rotationX) > 0.0001) {
    let cosX = cos(-layer.rotationX);
    let sinX = sin(-layer.rotationX);
    p = vec3f(
      p.x,
      p.y * cosX - p.z * sinX,
      p.y * sinX + p.z * cosX
    );
  }

  if (abs(layer.rotationY) > 0.0001) {
    let cosY = cos(-layer.rotationY);
    let sinY = sin(-layer.rotationY);
    p = vec3f(
      p.x * cosY + p.z * sinY,
      p.y,
      -p.x * sinY + p.z * cosY
    );
  }

  if (abs(layer.rotationZ) > 0.0001) {
    let cosZ = cos(layer.rotationZ);
    let sinZ = sin(layer.rotationZ);
    p = vec3f(
      p.x * cosZ - p.y * sinZ,
      p.x * sinZ + p.y * cosZ,
      p.z
    );
  }

  let perspectiveDist = max(layer.perspective, 0.5);
  let w = 1.0 - p.z / perspectiveDist;
  let projectedX = p.x / w;
  let projectedY = p.y / w;

  uv = vec2f(projectedX, projectedY * layer.outputAspect);

  uv = uv / vec2f(layer.scaleX, layer.scaleY);

  let aspectRatio = layer.sourceAspect / layer.outputAspect;
  if (aspectRatio > 1.0) {
    uv.y = uv.y * aspectRatio;
  } else {
    uv.x = uv.x / aspectRatio;
  }

  uv = uv + vec2f(0.5) - vec2f(layer.posX, layer.posY);

  let clampedUV = clamp(uv, vec2f(0.0), vec2f(1.0));
  var layerColor = textureSample(videoTex, samp, clampedUV);

  var ec = layerColor.rgb;
  ec = select(ec, 1.0 - ec, layer.inlineInvert == 1u);
  ec = clamp((ec + layer.inlineBrightness - 0.5) * layer.inlineContrast + 0.5, vec3f(0.0), vec3f(1.0));
  ec = mix(vec3f(luminosity(ec)), ec, layer.inlineSaturation);
  layerColor = vec4f(clamp(ec, vec3f(0.0), vec3f(1.0)), layerColor.a);

  let outOfBounds = uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0;
  let maskAlpha = select(layerColor.a, 0.0, outOfBounds);
  let alpha = maskAlpha * layer.opacity;
  let rgb = select(vec3f(0.0), layerColor.rgb, !outOfBounds);

  return vec4f(rgb, alpha);
}
`,M=96,D="layerUniforms";class E extends C{builder;pipeline;uniformBuffer;uniformBufferData=new ArrayBuffer(M);uniformF32=new Float32Array(this.uniformBufferData);uniformU32=new Uint32Array(this.uniformBufferData);constructor(e,t,r){super(),this.builder=e,this.pipeline=t,this.uniformBuffer=r}writeLayerUniforms(e,t,r){const i=this.uniformF32,n=this.uniformU32,a=e.transformParams;i[0]=a.opacity,n[1]=0,i[2]=a.posX,i[3]=a.posY,i[4]=a.scaleX,i[5]=a.scaleY,i[6]=a.rotationZ,i[7]=t,i[8]=r,i[9]=0,n[10]=0,n[11]=0,i[12]=a.rotationX,i[13]=a.rotationY,i[14]=Math.max(a.perspective,.5),i[15]=0,n[16]=0,i[17]=a.posZ,i[18]=0,i[19]=1,i[20]=1,n[21]=0,i[22]=0,i[23]=0,this.builder.pushBufferDataFor(D,this.uniformBufferData,0)}static create(e,t="rgba8unorm"){const r=new I(Fe,e),i=r.setBufferDataDescriptor(D,{label:"layer-uniform",size:M,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});r.setBindingGroupDataDescriptor([{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform",minBindingSize:M}}]);const n=r.createPipeline("vs_main","fs_main",t);return new E(r,n,i)}gpuRender(e){const t=this.builder.pushBindingGroupData([{binding:0,resource:e.sampler},{binding:1,resource:e.inputView},{binding:2,resource:{buffer:this.uniformBuffer}}]),r=e.encoder.beginRenderPass({colorAttachments:[{view:e.outputView,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});return r.setPipeline(this.pipeline),r.setBindGroup(0,t),r.draw(6),r.end(),e.outputView}setOptions(e,t,r,i,n){super.setOptions(e,t,r,i,n);const a=i/n,s=t/r;this.writeLayerUniforms(e,a,s)}}class De{device;texturePing;texturePong;ping;pong;constructor(e,t,r){const i={label:"canvas-ping",size:[t,r],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING};this.device=e,this.texturePing=this.device.createTexture(i),this.texturePong=this.device.createTexture({...i,label:"canvas-pong"}),this.ping=this.texturePing.createView(),this.pong=this.texturePong.createView()}destroy(){this.texturePing.destroy(),this.texturePong.destroy()}}function _(c){return c instanceof GPUTexture?c.createView():c}const ke=`
struct Params {
  outW: u32,
  outH: u32,
  srcW: u32,
  srcH: u32,
}

@group(0) @binding(0) var inputTex: texture_2d<f32>;
@group(0) @binding(1) var<storage, read_write> accumR: array<atomic<u32>>;
@group(0) @binding(2) var<storage, read_write> accumG: array<atomic<u32>>;
@group(0) @binding(3) var<storage, read_write> accumB: array<atomic<u32>>;
@group(0) @binding(4) var<uniform> params: Params;
@group(0) @binding(5) var<storage, read_write> accumL: array<atomic<u32>>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  if (gid.x >= params.srcW || gid.y >= params.srcH) { return; }

  let pixel = textureLoad(inputTex, vec2i(gid.xy), 0);

  // Sub-pixel X: distribute weight across 2 adjacent columns (scale 256)
  let fxPos = f32(gid.x) * f32(params.outW) / f32(params.srcW);
  let x0 = u32(fxPos);
  let x1 = min(x0 + 1u, params.outW - 1u);
  let frac = fxPos - f32(x0);
  let w0 = u32((1.0 - frac) * 256.0);
  let w1 = 256u - w0;

  let hm1 = f32(params.outH - 1u);
  let maxY = i32(params.outH - 1u);

  // Gaussian vertical spread kernel — 5 rows for smooth DaVinci-style traces
  let gK = array<f32, 5>(0.06, 0.24, 0.40, 0.24, 0.06);

  // ── Red ──
  let ryC = i32(hm1 - clamp(pixel.r, 0.0, 1.0) * hm1);
  for (var d: i32 = -2; d <= 2; d += 1) {
    let y = u32(clamp(ryC + d, 0, maxY));
    let yw = gK[u32(d + 2)];
    let idx = y * params.outW;
    let wA = u32(f32(w0) * yw);
    let wB = u32(f32(w1) * yw);
    if (wA > 0u) { atomicAdd(&accumR[idx + x0], wA); }
    if (wB > 0u) { atomicAdd(&accumR[idx + x1], wB); }
  }

  // ── Green ──
  let gyC = i32(hm1 - clamp(pixel.g, 0.0, 1.0) * hm1);
  for (var d: i32 = -2; d <= 2; d += 1) {
    let y = u32(clamp(gyC + d, 0, maxY));
    let yw = gK[u32(d + 2)];
    let idx = y * params.outW;
    let wA = u32(f32(w0) * yw);
    let wB = u32(f32(w1) * yw);
    if (wA > 0u) { atomicAdd(&accumG[idx + x0], wA); }
    if (wB > 0u) { atomicAdd(&accumG[idx + x1], wB); }
  }

  // ── Blue ──
  let byC = i32(hm1 - clamp(pixel.b, 0.0, 1.0) * hm1);
  for (var d: i32 = -2; d <= 2; d += 1) {
    let y = u32(clamp(byC + d, 0, maxY));
    let yw = gK[u32(d + 2)];
    let idx = y * params.outW;
    let wA = u32(f32(w0) * yw);
    let wB = u32(f32(w1) * yw);
    if (wA > 0u) { atomicAdd(&accumB[idx + x0], wA); }
    if (wB > 0u) { atomicAdd(&accumB[idx + x1], wB); }
  }

  // ── Luma (BT.709) ──
  let luma = 0.2126 * clamp(pixel.r, 0.0, 1.0) + 0.7152 * clamp(pixel.g, 0.0, 1.0) + 0.0722 * clamp(pixel.b, 0.0, 1.0);
  let lyC = i32(hm1 - luma * hm1);
  for (var d: i32 = -2; d <= 2; d += 1) {
    let y = u32(clamp(lyC + d, 0, maxY));
    let yw = gK[u32(d + 2)];
    let idx = y * params.outW;
    let wA = u32(f32(w0) * yw);
    let wB = u32(f32(w1) * yw);
    if (wA > 0u) { atomicAdd(&accumL[idx + x0], wA); }
    if (wB > 0u) { atomicAdd(&accumL[idx + x1], wB); }
  }
}
`,ze=`
struct VertexOutput {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex
fn vs(@builtin(vertex_index) vid: u32) -> VertexOutput {
  var p = array<vec2f, 3>(vec2f(-1,-1), vec2f(3,-1), vec2f(-1,3));
  var out: VertexOutput;
  out.pos = vec4f(p[vid], 0, 1);
  out.uv = vec2f((p[vid].x + 1.0) * 0.5, (1.0 - p[vid].y) * 0.5);
  return out;
}

struct RenderParams {
  outW: f32,
  outH: f32,
  refValue: f32,
  intensity: f32,
  mode: u32,   // 0=RGB, 1=R, 2=G, 3=B, 4=Luma
  _pad0: u32,
  _pad1: u32,
  _pad2: u32,
}

@group(0) @binding(0) var<storage, read> accumR: array<u32>;
@group(0) @binding(1) var<storage, read> accumG: array<u32>;
@group(0) @binding(2) var<storage, read> accumB: array<u32>;
@group(0) @binding(3) var<uniform> params: RenderParams;
@group(0) @binding(4) var<storage, read> accumL: array<u32>;

// Bilinear sample helper: reads accumulator with interpolation
fn sampleAccum(acc: ptr<storage, array<u32>, read>, fx: f32, fy: f32, w: u32, h: u32) -> f32 {
  let x0 = u32(clamp(fx, 0.0, f32(w - 1u)));
  let y0 = u32(clamp(fy, 0.0, f32(h - 1u)));
  let x1 = min(x0 + 1u, w - 1u);
  let y1 = min(y0 + 1u, h - 1u);
  let dx = fract(fx);
  let dy = fract(fy);
  let v00 = f32((*acc)[y0 * w + x0]);
  let v10 = f32((*acc)[y0 * w + x1]);
  let v01 = f32((*acc)[y1 * w + x0]);
  let v11 = f32((*acc)[y1 * w + x1]);
  return mix(mix(v00, v10, dx), mix(v01, v11, dx), dy);
}

// Nearest-neighbor read for bloom sampling
fn readAccum(acc: ptr<storage, array<u32>, read>, x: i32, y: i32, w: i32, h: i32) -> f32 {
  return f32((*acc)[u32(clamp(y, 0, h - 1)) * u32(w) + u32(clamp(x, 0, w - 1))]);
}

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
  let uv = in.uv;
  if (uv.x < 0.0 || uv.x >= 1.0 || uv.y < 0.0 || uv.y >= 1.0) {
    return vec4f(0.04, 0.04, 0.04, 1.0);
  }

  let w = u32(params.outW);
  let h = u32(params.outH);
  let iw = i32(w);
  let ih = i32(h);
  let mode = params.mode;

  // Floating-point grid position for bilinear sampling
  let fx = uv.x * params.outW - 0.5;
  let fy = uv.y * params.outH - 0.5;

  // Center value (bilinear — sharp trace)
  let rCenter = sampleAccum(&accumR, fx, fy, w, h);
  let gCenter = sampleAccum(&accumG, fx, fy, w, h);
  let bCenter = sampleAccum(&accumB, fx, fy, w, h);
  let lCenter = sampleAccum(&accumL, fx, fy, w, h);

  // Phosphor bloom: 3x3 gaussian at 4px step for soft glow
  let ix = i32(fx + 0.5);
  let iy = i32(fy + 0.5);
  var rBloom = 0.0; var gBloom = 0.0; var bBloom = 0.0; var lBloom = 0.0;
  let bK = array<f32, 3>(0.25, 0.50, 0.25);
  for (var by: i32 = -1; by <= 1; by += 1) {
    for (var bx: i32 = -1; bx <= 1; bx += 1) {
      let bw = bK[u32(bx + 1)] * bK[u32(by + 1)];
      rBloom += readAccum(&accumR, ix + bx * 4, iy + by * 4, iw, ih) * bw;
      gBloom += readAccum(&accumG, ix + bx * 4, iy + by * 4, iw, ih) * bw;
      bBloom += readAccum(&accumB, ix + bx * 4, iy + by * 4, iw, ih) * bw;
      lBloom += readAccum(&accumL, ix + bx * 4, iy + by * 4, iw, ih) * bw;
    }
  }

  let rv = params.refValue;
  let s = params.intensity;

  // Tone-map: main trace (sharp) + subtle bloom halo
  let rT = pow(clamp(sqrt(rCenter) / rv, 0.0, 1.0), 0.75) * s;
  let gT = pow(clamp(sqrt(gCenter) / rv, 0.0, 1.0), 0.75) * s;
  let bT = pow(clamp(sqrt(bCenter) / rv, 0.0, 1.0), 0.75) * s;
  let lT = pow(clamp(sqrt(lCenter) / rv, 0.0, 1.0), 0.75) * s;

  let rG = pow(clamp(sqrt(rBloom) / rv, 0.0, 1.0), 0.65) * 0.12;
  let gG = pow(clamp(sqrt(gBloom) / rv, 0.0, 1.0), 0.65) * 0.12;
  let bG = pow(clamp(sqrt(bBloom) / rv, 0.0, 1.0), 0.65) * 0.12;
  let lG = pow(clamp(sqrt(lBloom) / rv, 0.0, 1.0), 0.65) * 0.12;

  // Additive phosphor composite based on mode
  var color: vec3f;
  if (mode == 0u) {
    // RGB: all channels
    color = clamp(vec3f(rT + rG, gT + gG, bT + bG), vec3f(0.0), vec3f(1.0));
  } else if (mode == 1u) {
    // Red only
    let v = clamp(rT + rG, 0.0, 1.0);
    color = vec3f(v, v * 0.15, v * 0.15);
  } else if (mode == 2u) {
    // Green only
    let v = clamp(gT + gG, 0.0, 1.0);
    color = vec3f(v * 0.15, v, v * 0.15);
  } else if (mode == 3u) {
    // Blue only
    let v = clamp(bT + bG, 0.0, 1.0);
    color = vec3f(v * 0.15, v * 0.15, v);
  } else {
    // Luma: white trace
    let v = clamp(lT + lG, 0.0, 1.0);
    color = vec3f(v);
  }

  // Grid: every 10 IRE (10% of height)
  let gridY = fract(uv.y * 10.0);
  let dGrid = min(gridY, 1.0 - gridY) * params.outH * 0.5;
  if (dGrid < 0.8) {
    let a = 0.15 * (1.0 - dGrid / 0.8);
    color = max(color, vec3f(0.55, 0.45, 0.12) * a);
  }

  return vec4f(color, 1.0);
}
`,He=`
struct Params { len: u32, _p0: u32, _p1: u32, _p2: u32 }

@group(0) @binding(0) var<storage, read_write> buf: array<u32>;
@group(0) @binding(1) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  if (gid.x >= params.len) { return; }
  // Temporal decay: no persistence (full clear)
  buf[gid.x] = 0u;
}
`,T=1024,w=512;class Ne{device;computePipeline;renderPipeline;computeBGL;renderBGL;accumR;accumG;accumB;accumL;computeParams;renderParams;decayPipeline;decayBGL;decayParams;constructor(e,t){this.device=e,this.initWaveform(t),this.initDecay()}initWaveform(e){const t=this.device,r=T*w*4;this.accumR=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.accumG=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.accumB=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.accumL=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.computeParams=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.renderParams=t.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.computeBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]});const i=t.createShaderModule({code:ke});this.computePipeline=t.createComputePipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.computeBGL]}),compute:{module:i,entryPoint:"main"}}),this.renderBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}}]});const n=t.createShaderModule({code:ze});this.renderPipeline=t.createRenderPipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.renderBGL]}),vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:e}]}})}initDecay(){const e=this.device;this.decayBGL=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]});const t=e.createShaderModule({code:He});this.decayPipeline=e.createComputePipeline({layout:e.createPipelineLayout({bindGroupLayouts:[this.decayBGL]}),compute:{module:t,entryPoint:"main"}}),this.decayParams=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}render(e,t,r,i,n=0){const a=this.device,s=_(e);a.queue.writeBuffer(this.computeParams,0,new Uint32Array([T,w,r,i]));const u=Math.sqrt(i/w)*40,l=new ArrayBuffer(32);new Float32Array(l,0,4).set([T,w,u,.9]),new Uint32Array(l,16,4).set([n,0,0,0]),a.queue.writeBuffer(this.renderParams,0,l);const o=a.createCommandEncoder(),p=T*w;a.queue.writeBuffer(this.decayParams,0,new Uint32Array([p,0,0,0]));const d=a.createBindGroup({layout:this.decayBGL,entries:[{binding:0,resource:{buffer:this.accumR}},{binding:1,resource:{buffer:this.decayParams}}]}),h=a.createBindGroup({layout:this.decayBGL,entries:[{binding:0,resource:{buffer:this.accumG}},{binding:1,resource:{buffer:this.decayParams}}]}),g=a.createBindGroup({layout:this.decayBGL,entries:[{binding:0,resource:{buffer:this.accumB}},{binding:1,resource:{buffer:this.decayParams}}]}),v=a.createBindGroup({layout:this.decayBGL,entries:[{binding:0,resource:{buffer:this.accumL}},{binding:1,resource:{buffer:this.decayParams}}]}),m=o.beginComputePass();m.setPipeline(this.decayPipeline),m.setBindGroup(0,d),m.dispatchWorkgroups(Math.ceil(p/256)),m.setBindGroup(0,h),m.dispatchWorkgroups(Math.ceil(p/256)),m.setBindGroup(0,g),m.dispatchWorkgroups(Math.ceil(p/256)),m.setBindGroup(0,v),m.dispatchWorkgroups(Math.ceil(p/256)),m.end();const b=a.createBindGroup({layout:this.computeBGL,entries:[{binding:0,resource:s},{binding:1,resource:{buffer:this.accumR}},{binding:2,resource:{buffer:this.accumG}},{binding:3,resource:{buffer:this.accumB}},{binding:4,resource:{buffer:this.computeParams}},{binding:5,resource:{buffer:this.accumL}}]}),f=o.beginComputePass();f.setPipeline(this.computePipeline),f.setBindGroup(0,b),f.dispatchWorkgroups(Math.ceil(r/16),Math.ceil(i/16)),f.end();const S=a.createBindGroup({layout:this.renderBGL,entries:[{binding:0,resource:{buffer:this.accumR}},{binding:1,resource:{buffer:this.accumG}},{binding:2,resource:{buffer:this.accumB}},{binding:3,resource:{buffer:this.renderParams}},{binding:4,resource:{buffer:this.accumL}}]}),B=o.beginRenderPass({colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.04,g:.04,b:.04,a:1}}]});B.setPipeline(this.renderPipeline),B.setBindGroup(0,S),B.draw(3),B.end(),a.queue.submit([o.finish()])}destroy(){const e=[this.accumR,this.accumG,this.accumB,this.accumL,this.computeParams,this.renderParams,this.decayParams];for(const t of e)t?.destroy()}}const qe=`
struct Params { srcW: u32, srcH: u32, _pad0: u32, _pad1: u32 }

@group(0) @binding(0) var inputTex: texture_2d<f32>;
@group(0) @binding(1) var<storage, read_write> histR: array<atomic<u32>>;
@group(0) @binding(2) var<storage, read_write> histG: array<atomic<u32>>;
@group(0) @binding(3) var<storage, read_write> histB: array<atomic<u32>>;
@group(0) @binding(4) var<storage, read_write> histL: array<atomic<u32>>;
@group(0) @binding(5) var<uniform> params: Params;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  if (gid.x >= params.srcW || gid.y >= params.srcH) { return; }
  let pixel = textureLoad(inputTex, vec2i(gid.xy), 0);
  let r = min(u32(pixel.r * 255.0), 255u);
  let g = min(u32(pixel.g * 255.0), 255u);
  let b = min(u32(pixel.b * 255.0), 255u);
  let luma = min(u32(0.2126 * pixel.r * 255.0 + 0.7152 * pixel.g * 255.0 + 0.0722 * pixel.b * 255.0), 255u);
  atomicAdd(&histR[r], 1u);
  atomicAdd(&histG[g], 1u);
  atomicAdd(&histB[b], 1u);
  atomicAdd(&histL[luma], 1u);
}
`,We=`
struct VertexOutput { @builtin(position) pos: vec4f, @location(0) uv: vec2f }

@vertex
fn vs(@builtin(vertex_index) vid: u32) -> VertexOutput {
  var p = array<vec2f, 3>(vec2f(-1,-1), vec2f(3,-1), vec2f(-1,3));
  var out: VertexOutput;
  out.pos = vec4f(p[vid], 0, 1);
  out.uv = vec2f((p[vid].x + 1.0) * 0.5, (1.0 - p[vid].y) * 0.5);
  return out;
}

struct Params {
  totalPixels: f32,
  mode: f32,    // 0=RGB, 1=R, 2=G, 3=B, 4=Luma (as float for alignment)
  _pad1: f32,
  _pad2: f32,
}

@group(0) @binding(0) var<storage, read> histR: array<u32>;
@group(0) @binding(1) var<storage, read> histG: array<u32>;
@group(0) @binding(2) var<storage, read> histB: array<u32>;
@group(0) @binding(3) var<storage, read> histL: array<u32>;
@group(0) @binding(4) var<uniform> params: Params;

// Linear interpolation between bins for smooth curves
fn sampleHist(hist: ptr<storage, array<u32>, read>, fx: f32) -> f32 {
  let b0 = u32(clamp(fx, 0.0, 255.0));
  let b1 = min(b0 + 1u, 255u);
  let t = fract(fx);
  return mix(f32((*hist)[b0]), f32((*hist)[b1]), t);
}

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
  let uv = in.uv;
  if (uv.x < 0.0 || uv.x >= 1.0 || uv.y < 0.0 || uv.y >= 1.0) {
    return vec4f(0.04, 0.04, 0.04, 1.0);
  }

  let mode = u32(params.mode);

  // Smooth bin position (linear interpolation between adjacent bins)
  let fx = uv.x * 255.0;
  let rVal = sampleHist(&histR, fx);
  let gVal = sampleHist(&histG, fx);
  let bVal = sampleHist(&histB, fx);
  let lVal = sampleHist(&histL, fx);

  // Sqrt scaling, normalized to total pixels (0.08 = expect peak bin ~8% of pixels)
  let scale = 1.0 / sqrt(params.totalPixels * 0.08);
  let rH = sqrt(rVal) * scale;
  let gH = sqrt(gVal) * scale;
  let bH = sqrt(bVal) * scale;
  let lH = sqrt(lVal) * scale;

  // Y coordinate: 0 = bottom (zero), 1 = top (highest count)
  let y = 1.0 - uv.y;

  // Anti-aliased edge width (in normalized Y units)
  let aaW = 0.004;

  // Filled area with soft anti-aliased top edge
  var color = vec3f(0.0);

  if (mode == 0u) {
    // RGB overlay: soft semi-transparent fills with additive blending
    let lFill = smoothstep(lH, lH - aaW, y);
    let rFill = smoothstep(rH, rH - aaW, y);
    let gFill = smoothstep(gH, gH - aaW, y);
    let bFill = smoothstep(bH, bH - aaW, y);
    // Gradient: brighter near top edge, dimmer at bottom
    let rGrad = 0.35 + 0.35 * (y / max(rH, 0.001));
    let gGrad = 0.35 + 0.35 * (y / max(gH, 0.001));
    let bGrad = 0.35 + 0.35 * (y / max(bH, 0.001));
    color += vec3f(0.08) * lFill;
    color += vec3f(rGrad, 0.05, 0.05) * rFill;
    color += vec3f(0.05, gGrad, 0.05) * gFill;
    color += vec3f(0.05, 0.05, bGrad) * bFill;
  } else if (mode == 1u) {
    let fill = smoothstep(rH, rH - aaW, y);
    let grad = 0.3 + 0.5 * (y / max(rH, 0.001));
    color = vec3f(grad, 0.08, 0.08) * fill;
  } else if (mode == 2u) {
    let fill = smoothstep(gH, gH - aaW, y);
    let grad = 0.3 + 0.5 * (y / max(gH, 0.001));
    color = vec3f(0.08, grad, 0.08) * fill;
  } else if (mode == 3u) {
    let fill = smoothstep(bH, bH - aaW, y);
    let grad = 0.3 + 0.5 * (y / max(bH, 0.001));
    color = vec3f(0.08, 0.08, grad) * fill;
  } else {
    let fill = smoothstep(lH, lH - aaW, y);
    let grad = 0.3 + 0.4 * (y / max(lH, 0.001));
    color = vec3f(grad) * fill;
  }

  // Bright edge glow at the top of each fill (phosphor-style)
  let edgeW = 0.006;
  if (mode == 0u) {
    let rEdge = smoothstep(edgeW, 0.0, abs(y - rH)) * step(y, rH + edgeW);
    let gEdge = smoothstep(edgeW, 0.0, abs(y - gH)) * step(y, gH + edgeW);
    let bEdge = smoothstep(edgeW, 0.0, abs(y - bH)) * step(y, bH + edgeW);
    color += vec3f(0.6, 0.12, 0.12) * rEdge;
    color += vec3f(0.12, 0.55, 0.12) * gEdge;
    color += vec3f(0.12, 0.12, 0.6) * bEdge;
  } else if (mode == 1u) {
    let e = smoothstep(edgeW, 0.0, abs(y - rH)) * step(y, rH + edgeW);
    color += vec3f(0.7, 0.18, 0.18) * e;
  } else if (mode == 2u) {
    let e = smoothstep(edgeW, 0.0, abs(y - gH)) * step(y, gH + edgeW);
    color += vec3f(0.18, 0.65, 0.18) * e;
  } else if (mode == 3u) {
    let e = smoothstep(edgeW, 0.0, abs(y - bH)) * step(y, bH + edgeW);
    color += vec3f(0.18, 0.18, 0.7) * e;
  } else {
    let e = smoothstep(edgeW, 0.0, abs(y - lH)) * step(y, lH + edgeW);
    color += vec3f(0.6) * e;
  }

  // Grid lines at 64, 128, 192 (anti-aliased)
  let gridBins = array<f32, 3>(64.0, 128.0, 192.0);
  for (var i = 0u; i < 3u; i++) {
    let gx = gridBins[i] / 256.0;
    let gAA = smoothstep(0.003, 0.001, abs(uv.x - gx));
    color = max(color, vec3f(0.10) * gAA);
  }
  // Horizontal grid at 25%, 50%, 75%
  for (var i = 1u; i < 4u; i++) {
    let gy = f32(i) * 0.25;
    let hAA = smoothstep(0.004, 0.001, abs(y - gy));
    color = max(color, vec3f(0.07) * hAA);
  }

  return vec4f(clamp(color, vec3f(0.0), vec3f(1.0)), 1.0);
}
`;class Ye{device;computePipeline;renderPipeline;computeBGL;renderBGL;histR;histG;histB;histL;computeParams;renderParams;constructor(e,t){this.device=e,this.init(t)}init(e){const t=this.device,r=256*4;this.histR=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.histG=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.histB=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.histL=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.computeParams=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.renderParams=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.computeBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]});const i=t.createShaderModule({code:qe});this.computePipeline=t.createComputePipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.computeBGL]}),compute:{module:i,entryPoint:"main"}}),this.renderBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});const n=t.createShaderModule({code:We});this.renderPipeline=t.createRenderPipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.renderBGL]}),vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:e}]}})}render(e,t,r,i,n=0){const a=this.device,s=_(e);a.queue.writeBuffer(this.computeParams,0,new Uint32Array([r,i,0,0])),a.queue.writeBuffer(this.renderParams,0,new Float32Array([r*i,n,0,0]));const u=a.createCommandEncoder();u.clearBuffer(this.histR),u.clearBuffer(this.histG),u.clearBuffer(this.histB),u.clearBuffer(this.histL);const l=a.createBindGroup({layout:this.computeBGL,entries:[{binding:0,resource:s},{binding:1,resource:{buffer:this.histR}},{binding:2,resource:{buffer:this.histG}},{binding:3,resource:{buffer:this.histB}},{binding:4,resource:{buffer:this.histL}},{binding:5,resource:{buffer:this.computeParams}}]}),o=u.beginComputePass();o.setPipeline(this.computePipeline),o.setBindGroup(0,l),o.dispatchWorkgroups(Math.ceil(r/16),Math.ceil(i/16)),o.end();const p=a.createBindGroup({layout:this.renderBGL,entries:[{binding:0,resource:{buffer:this.histR}},{binding:1,resource:{buffer:this.histG}},{binding:2,resource:{buffer:this.histB}},{binding:3,resource:{buffer:this.histL}},{binding:4,resource:{buffer:this.renderParams}}]}),d=u.beginRenderPass({colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.04,g:.04,b:.04,a:1}}]});d.setPipeline(this.renderPipeline),d.setBindGroup(0,p),d.draw(3),d.end(),a.queue.submit([u.finish()])}destroy(){const e=[this.histR,this.histG,this.histB,this.histL,this.computeParams,this.renderParams];for(const t of e)t?.destroy()}}const Xe=`
struct Params { outSize: u32, srcW: u32, srcH: u32, _pad: u32 }

@group(0) @binding(0) var inputTex: texture_2d<f32>;
@group(0) @binding(1) var<storage, read_write> accumR: array<atomic<u32>>;
@group(0) @binding(2) var<storage, read_write> accumG: array<atomic<u32>>;
@group(0) @binding(3) var<storage, read_write> accumB: array<atomic<u32>>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  if (gid.x >= params.srcW || gid.y >= params.srcH) { return; }
  let pixel = textureLoad(inputTex, vec2i(gid.xy), 0);

  let r = pixel.r * 255.0;
  let g = pixel.g * 255.0;
  let b = pixel.b * 255.0;

  // BT.709 Cb/Cr
  let cb = -0.1687 * r - 0.3313 * g + 0.5 * b;
  let cr = 0.5 * r - 0.4187 * g - 0.0813 * b;

  let center = f32(params.outSize) * 0.5;
  let scale = center * 0.92;
  let px = u32(clamp(center + cb / 128.0 * scale, 0.0, f32(params.outSize - 1u)));
  let py = u32(clamp(center - cr / 128.0 * scale, 0.0, f32(params.outSize - 1u)));

  let idx = py * params.outSize + px;
  // Accumulate raw pixel color (no bias, preserves color ratios)
  atomicAdd(&accumR[idx], u32(max(r, 1.0)));
  atomicAdd(&accumG[idx], u32(max(g, 1.0)));
  atomicAdd(&accumB[idx], u32(max(b, 1.0)));
}
`,Ke=`
struct VertexOutput { @builtin(position) pos: vec4f, @location(0) uv: vec2f }

@vertex
fn vs(@builtin(vertex_index) vid: u32) -> VertexOutput {
  var p = array<vec2f, 3>(vec2f(-1,-1), vec2f(3,-1), vec2f(-1,3));
  var out: VertexOutput;
  out.pos = vec4f(p[vid], 0, 1);
  out.uv = vec2f((p[vid].x + 1.0) * 0.5, (1.0 - p[vid].y) * 0.5);
  return out;
}

struct Params { outSize: f32, refValue: f32, _p0: f32, _p1: f32 }

@group(0) @binding(0) var<storage, read> accumR: array<u32>;
@group(0) @binding(1) var<storage, read> accumG: array<u32>;
@group(0) @binding(2) var<storage, read> accumB: array<u32>;
@group(0) @binding(3) var<uniform> params: Params;

// Bilinear sample from accumulator
fn sampleVS(acc: ptr<storage, array<u32>, read>, fx: f32, fy: f32, sz: u32) -> f32 {
  let x0 = u32(clamp(fx, 0.0, f32(sz - 1u)));
  let y0 = u32(clamp(fy, 0.0, f32(sz - 1u)));
  let x1 = min(x0 + 1u, sz - 1u);
  let y1 = min(y0 + 1u, sz - 1u);
  let dx = fract(fx);
  let dy = fract(fy);
  let v00 = f32((*acc)[y0 * sz + x0]);
  let v10 = f32((*acc)[y0 * sz + x1]);
  let v01 = f32((*acc)[y1 * sz + x0]);
  let v11 = f32((*acc)[y1 * sz + x1]);
  return mix(mix(v00, v10, dx), mix(v01, v11, dx), dy);
}

// Nearest read for bloom
fn readVS(acc: ptr<storage, array<u32>, read>, x: i32, y: i32, sz: i32) -> f32 {
  return f32((*acc)[u32(clamp(y, 0, sz - 1)) * u32(sz) + u32(clamp(x, 0, sz - 1))]);
}

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
  let uv = in.uv;
  let size = params.outSize;
  let sz = u32(size);
  let isz = i32(sz);
  let center = 0.5;
  let d = distance(uv, vec2f(center));
  let gratScale = 0.92;

  // Background
  var color = vec3f(0.04);

  // Graticule: outer circle (100% saturation boundary) + 75% + 25%
  let radiusFull = gratScale * 0.5;
  let radius75 = gratScale * 0.5 * 0.75;
  let radius25 = gratScale * 0.5 * 0.25;
  let lineW = 1.2 / size; // ~1.2px anti-aliased
  let aa = smoothstep(0.0, lineW, abs(d - radiusFull));
  color = mix(vec3f(0.20), color, aa);
  let aa75 = smoothstep(0.0, lineW, abs(d - radius75));
  color = mix(vec3f(0.14), color, aa75);
  let aa25 = smoothstep(0.0, lineW, abs(d - radius25));
  color = mix(vec3f(0.10), color, aa25);

  // Crosshair (anti-aliased)
  let crossW = 0.8 / size;
  if (d < radiusFull + 0.01) {
    let axH = smoothstep(0.0, crossW, abs(uv.y - center));
    let axV = smoothstep(0.0, crossW, abs(uv.x - center));
    color = mix(vec3f(0.12), color, axH);
    color = mix(vec3f(0.12), color, axV);
  }

  // Skin tone line (~123 degrees)
  let angle = atan2(-(uv.y - center), uv.x - center);
  let skinAngle = radians(123.0);
  let skinAA = smoothstep(0.0, crossW, abs(angle - skinAngle));
  if (d < radiusFull + 0.01 && d > 0.01) {
    color = mix(vec3f(0.28, 0.20, 0.08), color, skinAA);
  }

  // BT.709 color targets (R, MG, B, CY, G, YL) — placed on 75% ring
  let targetAngles = array<f32, 6>(
    radians(103.0), radians(61.0), radians(-13.0),
    radians(-77.0), radians(-119.0), radians(167.0)
  );
  let targetColors = array<vec3f, 6>(
    vec3f(0.6, 0.15, 0.15), vec3f(0.5, 0.15, 0.5), vec3f(0.15, 0.15, 0.6),
    vec3f(0.15, 0.5, 0.5), vec3f(0.15, 0.5, 0.15), vec3f(0.5, 0.5, 0.1)
  );
  let dotR = 8.0 / size;
  let ringW = 2.0 / size;
  for (var i = 0u; i < 6u; i++) {
    let ta = targetAngles[i];
    let tx = center + cos(ta) * radius75;
    let ty = center - sin(ta) * radius75;
    let td = distance(uv, vec2f(tx, ty));
    // Filled dot with ring outline
    let dotAA = smoothstep(dotR, dotR - ringW, td);
    let ringAA = smoothstep(ringW * 0.5, 0.0, abs(td - dotR));
    color = mix(color, targetColors[i] * 0.5, dotAA);
    color = mix(color, targetColors[i], ringAA);
  }

  // Data: bilinear center + bloom glow
  if (uv.x >= 0.0 && uv.x < 1.0 && uv.y >= 0.0 && uv.y < 1.0) {
    let fx = uv.x * size - 0.5;
    let fy = uv.y * size - 0.5;

    // Sharp center (bilinear)
    let rCenter = sampleVS(&accumR, fx, fy, sz);
    let gCenter = sampleVS(&accumG, fx, fy, sz);
    let bCenter = sampleVS(&accumB, fx, fy, sz);

    // Bloom: 3x3 gaussian at 3px step
    let ix = i32(fx + 0.5);
    let iy = i32(fy + 0.5);
    var rBloom = 0.0; var gBloom = 0.0; var bBloom = 0.0;
    let bK = array<f32, 3>(0.25, 0.50, 0.25);
    for (var by: i32 = -1; by <= 1; by += 1) {
      for (var bx: i32 = -1; bx <= 1; bx += 1) {
        let bw = bK[u32(bx + 1)] * bK[u32(by + 1)];
        rBloom += readVS(&accumR, ix + bx * 3, iy + by * 3, isz) * bw;
        gBloom += readVS(&accumG, ix + bx * 3, iy + by * 3, isz) * bw;
        bBloom += readVS(&accumB, ix + bx * 3, iy + by * 3, isz) * bw;
      }
    }

    let rv = params.refValue;

    // Density-based brightness (sum of channels)
    let totalCenter = rCenter + gCenter + bCenter;
    let totalBloom = rBloom + gBloom + bBloom;
    let density = pow(clamp(sqrt(totalCenter / 3.0) / rv, 0.0, 1.0), 0.7);
    let bloomD = pow(clamp(sqrt(totalBloom / 3.0) / rv, 0.0, 1.0), 0.6) * 0.18;

    // Color ratios from accumulated data (preserves hue)
    if (totalCenter > 0.0) {
      let rRatio = rCenter / totalCenter;
      let gRatio = gCenter / totalCenter;
      let bRatio = bCenter / totalCenter;
      // Scale ratios to visible range (neutral = 0.33 each, pure channel = 1.0)
      let chromaColor = vec3f(rRatio, gRatio, bRatio) * 3.0;
      // Blend: at low density show saturated color, at high density tend toward white
      let whiteMix = density * density * 0.5;
      let traceColor = mix(chromaColor, vec3f(1.0), whiteMix) * (density + bloomD);
      color = max(color, clamp(traceColor, vec3f(0.0), vec3f(1.0)));
    }
  }

  return vec4f(color, 1.0);
}
`,G=512;class Ze{device;computePipeline;renderPipeline;computeBGL;renderBGL;accumR;accumG;accumB;computeParams;renderParams;constructor(e,t){this.device=e,this.init(t)}init(e){const t=this.device,r=G*G*4;this.accumR=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.accumG=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.accumB=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.computeParams=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.renderParams=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.computeBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]});const i=t.createShaderModule({code:Xe});this.computePipeline=t.createComputePipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.computeBGL]}),compute:{module:i,entryPoint:"main"}}),this.renderBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});const n=t.createShaderModule({code:Ke});this.renderPipeline=t.createRenderPipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.renderBGL]}),vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:e}]}})}render(e,t,r,i){const n=this.device,a=_(e);n.queue.writeBuffer(this.computeParams,0,new Uint32Array([G,r,i,0]));const s=Math.sqrt(i*r/(G*G))*18;n.queue.writeBuffer(this.renderParams,0,new Float32Array([G,s,0,0]));const u=n.createCommandEncoder();u.clearBuffer(this.accumR),u.clearBuffer(this.accumG),u.clearBuffer(this.accumB);const l=n.createBindGroup({layout:this.computeBGL,entries:[{binding:0,resource:a},{binding:1,resource:{buffer:this.accumR}},{binding:2,resource:{buffer:this.accumG}},{binding:3,resource:{buffer:this.accumB}},{binding:4,resource:{buffer:this.computeParams}}]}),o=u.beginComputePass();o.setPipeline(this.computePipeline),o.setBindGroup(0,l),o.dispatchWorkgroups(Math.ceil(r/16),Math.ceil(i/16)),o.end();const p=n.createBindGroup({layout:this.renderBGL,entries:[{binding:0,resource:{buffer:this.accumR}},{binding:1,resource:{buffer:this.accumG}},{binding:2,resource:{buffer:this.accumB}},{binding:3,resource:{buffer:this.renderParams}}]}),d=u.beginRenderPass({colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.04,g:.04,b:.04,a:1}}]});d.setPipeline(this.renderPipeline),d.setBindGroup(0,p),d.draw(3),d.end(),n.queue.submit([u.finish()])}destroy(){const e=[this.accumR,this.accumG,this.accumB,this.computeParams,this.renderParams];for(const t of e)t?.destroy()}}class je{waveform;histogram;vectorscope;constructor(e,t){this.waveform=new Ne(e,t),this.histogram=new Ye(e,t),this.vectorscope=new Ze(e,t)}renderWaveform(e,t,r,i,n=0){this.waveform.render(e,t,r,i,n)}renderHistogram(e,t,r,i,n=0){this.histogram.render(e,t,r,i,n)}renderVectorscope(e,t,r,i){this.vectorscope.render(e,t,r,i)}destroy(){this.waveform.destroy(),this.histogram.destroy(),this.vectorscope.destroy()}}const A="rgba8unorm";class V{device;gpuContext;presentationFormat;sampler;effectsPipeline;outputPipeline;videoTexture=null;videoView=null;videoWidth=0;videoHeight=0;canvasWidth=0;canvasHeight=0;transformPipeline;copyPipeline;pingPongView=null;scopeRenderer;scopeContexts;constructor(e,t,r,i,n,a,s,u,l,o){this.device=e,this.gpuContext=t,this.presentationFormat=r,this.sampler=i,this.effectsPipeline=n,this.outputPipeline=a,this.transformPipeline=u,this.copyPipeline=s,this.scopeRenderer=l,this.scopeContexts=o}static async create(e,t={}){const r=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!r)throw new Error("No WebGPU adapter");const i=await r.requestDevice(),n=e.getContext("webgpu");if(!n)throw new Error("Could not get WebGPU canvas context");const a=navigator.gpu.getPreferredCanvasFormat(),s=R.create(i),u=O.create(i),l=L.create(i,A),o=E.create(i,A),p=i.createSampler({label:"linear-clamp",magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),h=!!(t.histogram||t.waveform||t.vectorscope)?new je(i,a):null,g=v=>{v&&v.configure({device:i,format:a,alphaMode:"premultiplied"})};return g(t.histogram??null),g(t.waveform??null),g(t.vectorscope??null),new V(i,n,a,p,s,u,l,o,h,t)}configureSurface(){this.gpuContext.configure({device:this.device,format:this.presentationFormat,alphaMode:"premultiplied"})}releaseWorkTextures(){this.videoTexture?.destroy(),this.videoTexture=null,this.videoView=null,this.videoWidth=0,this.videoHeight=0,this.pingPongView?.destroy(),this.pingPongView=null,this.canvasWidth=0,this.canvasHeight=0,this.outputPipeline.invalidateCache()}ensureVideoTexture(e,t){e===this.videoWidth&&t===this.videoHeight&&this.videoTexture&&this.videoView||(this.videoTexture?.destroy(),this.videoWidth=e,this.videoHeight=t,this.videoTexture=this.device.createTexture({label:"video-rgba",size:[e,t],format:A,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.videoView=this.videoTexture.createView())}ensureCanvasTextures(e,t){e===this.canvasWidth&&t===this.canvasHeight||(this.pingPongView?.destroy(),this.canvasWidth=e,this.canvasHeight=t,this.pingPongView=new De(this.device,e,t),this.outputPipeline.invalidateCache())}renderVideoFrame(e,t,r,i,n){const a=t.displayWidth,s=t.displayHeight;if(a<1||s<1){t.close(),i();return}const u=e.width,l=e.height;if(u<1||l<1){t.close(),i();return}if(this.configureSurface(),this.ensureVideoTexture(a,s),this.ensureCanvasTextures(u,l),!this.videoView||!this.pingPongView){t.close(),i();return}let o;try{o=this.device.importExternalTexture({source:t})}catch(m){n(String(m)),t.close(),i();return}this.copyPipeline.setOptions(r,u,l,a,s),this.transformPipeline.setOptions(r,u,l,a,s),this.effectsPipeline.setOptions(r,u,l,a,s),this.outputPipeline.setOptions(r,u,l,a,s);const p=this.device.createCommandEncoder({label:"frame"}),d={encoder:p,sampler:this.sampler,inputView:o,outputView:this.videoView};this.copyPipeline.gpuRender({...d}),this.transformPipeline.gpuRender({...d,inputView:this.videoView,outputView:this.pingPongView.ping});const h=this.effectsPipeline.gpuRender({...d,inputView:this.pingPongView.ping,outputView:this.pingPongView.pong});this.outputPipeline.gpuRender({...d,inputView:h,outputView:this.gpuContext.getCurrentTexture().createView()}),this.device.queue.submit([p.finish()]);const g=this.scopeRenderer;if(g){const{histogram:m,waveform:b,vectorscope:f}=this.scopeContexts;m&&g.renderHistogram(h,m,u,l,0),b&&g.renderWaveform(h,b,u,l,0),f&&g.renderVectorscope(h,f,u,l)}const v=this.device.queue.onSubmittedWorkDone?.();v?v.then(()=>{t.close(),i()}):(t.close(),i())}}const W=document.querySelector("#status"),Y=document.querySelector("#canvas"),$e=document.querySelector("#video"),Qe=document.querySelector("#file"),Je=document.querySelector("#scopeHistogram"),et=document.querySelector("#scopeWaveform"),tt=document.querySelector("#scopeVectorscope"),rt=Je?.getContext("webgpu")??null,it=et?.getContext("webgpu")??null,nt=tt?.getContext("webgpu")??null,at=document.querySelector("#outputMode"),st=document.querySelector("#effectType"),ot=document.querySelector("#mirrorH"),ut=document.querySelector("#mirrorV"),ct=document.querySelector("#paramALabel"),lt=document.querySelector("#paramA"),dt=document.querySelector("#paramAVal"),pt=document.querySelector("#paramBLabel"),ft=document.querySelector("#paramB"),mt=document.querySelector("#paramBVal"),ht=document.querySelector("#paramCLabel"),gt=document.querySelector("#paramC"),vt=document.querySelector("#paramCVal"),yt=document.querySelector("#opacity"),xt=document.querySelector("#opacityVal"),bt=document.querySelector("#posX"),St=document.querySelector("#posXVal"),Pt=document.querySelector("#posY"),Gt=document.querySelector("#posYVal"),wt=document.querySelector("#posZ"),Bt=document.querySelector("#posZVal"),Tt=document.querySelector("#scaleX"),Ct=document.querySelector("#scaleXVal"),Ut=document.querySelector("#scaleY"),Mt=document.querySelector("#scaleYVal"),At=document.querySelector("#rotX"),Rt=document.querySelector("#rotXVal"),It=document.querySelector("#rotY"),Ot=document.querySelector("#rotYVal"),Lt=document.querySelector("#rotZ"),Et=document.querySelector("#rotZVal"),_t=document.querySelector("#perspective"),Vt=document.querySelector("#perspectiveVal"),k=document.querySelector("#motionPanel"),X=k?new te(k):void 0,z=document.querySelector("#perfFps"),H=document.querySelector("#perfGpuMs"),N=document.querySelector("#perfPrepMs"),q=document.querySelector("#perfRes"),Ft=z&&H&&N&&q?new ue({fps:z,gpuMs:H,prepMs:N,resolution:q}):void 0;if(!navigator.gpu)throw W.textContent="WebGPU is not available here. Try a recent Chromium-based browser with GPU acceleration enabled.",new Error("no webgpu");const K=await V.create(Y,{histogram:rt,waveform:it,vectorscope:nt}),Z=new oe(K.device),j=await Z.initialize();j||X?.setError("Optical flow: GPU initialization failed (check the console).");const Dt=new $(K,{statusEl:W,canvas:Y,video:$e,fileInput:Qe,opacityInput:yt,opacityVal:xt,posXInput:bt,posXVal:St,posYInput:Pt,posYVal:Gt,posZInput:wt,posZVal:Bt,scaleXInput:Tt,scaleXVal:Ct,scaleYInput:Ut,scaleYVal:Mt,rotXInput:At,rotXVal:Rt,rotYInput:It,rotYVal:Ot,rotZInput:Lt,rotZVal:Et,perspectiveInput:_t,perspectiveVal:Vt,outputModeSelect:at,effectSelect:st,mirrorHInput:ot,mirrorVInput:ut,paramALabel:ct,paramAInput:lt,paramAVal:dt,paramBLabel:pt,paramBInput:ft,paramBVal:mt,paramCLabel:ht,paramCInput:gt,paramCVal:vt,motionViz:X,perfHud:Ft},j?Z:null);Dt.start();
