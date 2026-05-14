(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();var dt=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},a=(i,e,t)=>(dt(i,e,"read from private field"),t?t.call(i):e.get(i)),c=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},g=(i,e,t,r)=>(dt(i,e,"write to private field"),e.set(i,t),t),p=(i,e,t)=>(dt(i,e,"access private method"),t),qt=class{constructor(i){this.value=i}},pt=class{constructor(i){this.value=i}},Yt=i=>i<256?1:i<65536?2:i<1<<24?3:i<2**32?4:i<2**40?5:6,Ti=i=>{if(i<127)return 1;if(i<16383)return 2;if(i<(1<<21)-1)return 3;if(i<(1<<28)-1)return 4;if(i<2**35-1)return 5;if(i<2**42-1)return 6;throw new Error("EBML VINT size not supported "+i)},j=(i,e,t)=>{let r=0;for(let n=e;n<t;n++){let s=Math.floor(n/8),o=i[s],u=7-(n&7),l=(o&1<<u)>>u;r<<=1,r|=l}return r},Gi=(i,e,t,r)=>{for(let n=e;n<t;n++){let s=Math.floor(n/8),o=i[s],u=7-(n&7);o&=~(1<<u),o|=(r&1<<t-n-1)>>t-n-1<<u,i[s]=o}},Xe=class{},Xt=class extends Xe{constructor(){super(...arguments),this.buffer=null}},Kt=class extends Xe{constructor(i){if(super(),this.options=i,typeof i!="object")throw new TypeError("StreamTarget requires an options object to be passed to its constructor.");if(i.onData){if(typeof i.onData!="function")throw new TypeError("options.onData, when provided, must be a function.");if(i.onData.length<2)throw new TypeError("options.onData, when provided, must be a function that takes in at least two arguments (data and position). Ignoring the position argument, which specifies the byte offset at which the data is to be written, can lead to broken outputs.")}if(i.onHeader&&typeof i.onHeader!="function")throw new TypeError("options.onHeader, when provided, must be a function.");if(i.onCluster&&typeof i.onCluster!="function")throw new TypeError("options.onCluster, when provided, must be a function.");if(i.chunked!==void 0&&typeof i.chunked!="boolean")throw new TypeError("options.chunked, when provided, must be a boolean.");if(i.chunkSize!==void 0&&(!Number.isInteger(i.chunkSize)||i.chunkSize<1024))throw new TypeError("options.chunkSize, when provided, must be an integer and not smaller than 1024.")}},Bi=class extends Xe{constructor(i,e){if(super(),this.stream=i,this.options=e,!(i instanceof FileSystemWritableFileStream))throw new TypeError("FileSystemWritableFileStreamTarget requires a FileSystemWritableFileStream instance.");if(e!==void 0&&typeof e!="object")throw new TypeError("FileSystemWritableFileStreamTarget's options, when provided, must be an object.");if(e&&e.chunkSize!==void 0&&(!Number.isInteger(e.chunkSize)||e.chunkSize<=0))throw new TypeError("options.chunkSize, when provided, must be a positive integer")}},z,b,et,Zt,tt,$t,it,jt,Le,rt,at,Qt,Jt=class{constructor(){c(this,et),c(this,tt),c(this,it),c(this,Le),c(this,at),this.pos=0,c(this,z,new Uint8Array(8)),c(this,b,new DataView(a(this,z).buffer)),this.offsets=new WeakMap,this.dataOffsets=new WeakMap}seek(i){this.pos=i}writeEBMLVarInt(i,e=Ti(i)){let t=0;switch(e){case 1:a(this,b).setUint8(t++,128|i);break;case 2:a(this,b).setUint8(t++,64|i>>8),a(this,b).setUint8(t++,i);break;case 3:a(this,b).setUint8(t++,32|i>>16),a(this,b).setUint8(t++,i>>8),a(this,b).setUint8(t++,i);break;case 4:a(this,b).setUint8(t++,16|i>>24),a(this,b).setUint8(t++,i>>16),a(this,b).setUint8(t++,i>>8),a(this,b).setUint8(t++,i);break;case 5:a(this,b).setUint8(t++,8|i/2**32&7),a(this,b).setUint8(t++,i>>24),a(this,b).setUint8(t++,i>>16),a(this,b).setUint8(t++,i>>8),a(this,b).setUint8(t++,i);break;case 6:a(this,b).setUint8(t++,4|i/2**40&3),a(this,b).setUint8(t++,i/2**32|0),a(this,b).setUint8(t++,i>>24),a(this,b).setUint8(t++,i>>16),a(this,b).setUint8(t++,i>>8),a(this,b).setUint8(t++,i);break;default:throw new Error("Bad EBML VINT size "+e)}this.write(a(this,z).subarray(0,t))}writeEBML(i){if(i!==null)if(i instanceof Uint8Array)this.write(i);else if(Array.isArray(i))for(let e of i)this.writeEBML(e);else if(this.offsets.set(i,this.pos),p(this,Le,rt).call(this,i.id),Array.isArray(i.data)){let e=this.pos,t=i.size===-1?1:i.size??4;i.size===-1?p(this,et,Zt).call(this,255):this.seek(this.pos+t);let r=this.pos;if(this.dataOffsets.set(i,r),this.writeEBML(i.data),i.size!==-1){let n=this.pos-r,s=this.pos;this.seek(e),this.writeEBMLVarInt(n,t),this.seek(s)}}else if(typeof i.data=="number"){let e=i.size??Yt(i.data);this.writeEBMLVarInt(e),p(this,Le,rt).call(this,i.data,e)}else typeof i.data=="string"?(this.writeEBMLVarInt(i.data.length),p(this,at,Qt).call(this,i.data)):i.data instanceof Uint8Array?(this.writeEBMLVarInt(i.data.byteLength,i.size),this.write(i.data)):i.data instanceof qt?(this.writeEBMLVarInt(4),p(this,tt,$t).call(this,i.data.value)):i.data instanceof pt&&(this.writeEBMLVarInt(8),p(this,it,jt).call(this,i.data.value))}};z=new WeakMap;b=new WeakMap;et=new WeakSet;Zt=function(i){a(this,b).setUint8(0,i),this.write(a(this,z).subarray(0,1))};tt=new WeakSet;$t=function(i){a(this,b).setFloat32(0,i,!1),this.write(a(this,z).subarray(0,4))};it=new WeakSet;jt=function(i){a(this,b).setFloat64(0,i,!1),this.write(a(this,z))};Le=new WeakSet;rt=function(i,e=Yt(i)){let t=0;switch(e){case 6:a(this,b).setUint8(t++,i/2**40|0);case 5:a(this,b).setUint8(t++,i/2**32|0);case 4:a(this,b).setUint8(t++,i>>24);case 3:a(this,b).setUint8(t++,i>>16);case 2:a(this,b).setUint8(t++,i>>8);case 1:a(this,b).setUint8(t++,i);break;default:throw new Error("Bad UINT size "+e)}this.write(a(this,z).subarray(0,t))};at=new WeakSet;Qt=function(i){this.write(new Uint8Array(i.split("").map(e=>e.charCodeAt(0))))};var Ve,K,Ge,Re,nt,Ci=class extends Jt{constructor(i){super(),c(this,Re),c(this,Ve,void 0),c(this,K,new ArrayBuffer(2**16)),c(this,Ge,new Uint8Array(a(this,K))),g(this,Ve,i)}write(i){p(this,Re,nt).call(this,this.pos+i.byteLength),a(this,Ge).set(i,this.pos),this.pos+=i.byteLength}finalize(){p(this,Re,nt).call(this,this.pos),a(this,Ve).buffer=a(this,K).slice(0,this.pos)}};Ve=new WeakMap;K=new WeakMap;Ge=new WeakMap;Re=new WeakSet;nt=function(i){let e=a(this,K).byteLength;for(;e<i;)e*=2;if(e===a(this,K).byteLength)return;let t=new ArrayBuffer(e),r=new Uint8Array(t);r.set(a(this,Ge),0),g(this,K,t),g(this,Ge,r)};var J,E,_,N,_e=class extends Jt{constructor(i){super(),this.target=i,c(this,J,!1),c(this,E,void 0),c(this,_,void 0),c(this,N,void 0)}write(i){if(!a(this,J))return;let e=this.pos;if(e<a(this,_)){if(e+i.byteLength<=a(this,_))return;i=i.subarray(a(this,_)-e),e=0}let t=e+i.byteLength-a(this,_),r=a(this,E).byteLength;for(;r<t;)r*=2;if(r!==a(this,E).byteLength){let n=new Uint8Array(r);n.set(a(this,E),0),g(this,E,n)}a(this,E).set(i,e-a(this,_)),g(this,N,Math.max(a(this,N),e+i.byteLength))}startTrackingWrites(){g(this,J,!0),g(this,E,new Uint8Array(2**10)),g(this,_,this.pos),g(this,N,this.pos)}getTrackedWrites(){if(!a(this,J))throw new Error("Can't get tracked writes since nothing was tracked.");let e={data:a(this,E).subarray(0,a(this,N)-a(this,_)),start:a(this,_),end:a(this,N)};return g(this,E,void 0),g(this,J,!1),e}};J=new WeakMap;E=new WeakMap;_=new WeakMap;N=new WeakMap;var Ui=2**24,Mi=2,H,re,ye,fe,R,U,We,st,ht,ei,ft,ti,be,De,mt=class extends _e{constructor(i,e){super(i),c(this,We),c(this,ht),c(this,ft),c(this,be),c(this,H,[]),c(this,re,0),c(this,ye,void 0),c(this,fe,void 0),c(this,R,void 0),c(this,U,[]),g(this,ye,e),g(this,fe,i.options?.chunked??!1),g(this,R,i.options?.chunkSize??Ui)}write(i){super.write(i),a(this,H).push({data:i.slice(),start:this.pos}),this.pos+=i.byteLength}flush(){if(a(this,H).length===0)return;let i=[],e=[...a(this,H)].sort((t,r)=>t.start-r.start);i.push({start:e[0].start,size:e[0].data.byteLength});for(let t=1;t<e.length;t++){let r=i[i.length-1],n=e[t];n.start<=r.start+r.size?r.size=Math.max(r.size,n.start+n.data.byteLength-r.start):i.push({start:n.start,size:n.data.byteLength})}for(let t of i){t.data=new Uint8Array(t.size);for(let r of a(this,H))t.start<=r.start&&r.start<t.start+t.size&&t.data.set(r.data,r.start-t.start);if(a(this,fe))p(this,We,st).call(this,t.data,t.start),p(this,be,De).call(this);else{if(a(this,ye)&&t.start<a(this,re))throw new Error("Internal error: Monotonicity violation.");this.target.options.onData?.(t.data,t.start),g(this,re,t.start+t.data.byteLength)}}a(this,H).length=0}finalize(){a(this,fe)&&p(this,be,De).call(this,!0)}};H=new WeakMap;re=new WeakMap;ye=new WeakMap;fe=new WeakMap;R=new WeakMap;U=new WeakMap;We=new WeakSet;st=function(i,e){let t=a(this,U).findIndex(u=>u.start<=e&&e<u.start+a(this,R));t===-1&&(t=p(this,ft,ti).call(this,e));let r=a(this,U)[t],n=e-r.start,s=i.subarray(0,Math.min(a(this,R)-n,i.byteLength));r.data.set(s,n);let o={start:n,end:n+s.byteLength};if(p(this,ht,ei).call(this,r,o),r.written[0].start===0&&r.written[0].end===a(this,R)&&(r.shouldFlush=!0),a(this,U).length>Mi){for(let u=0;u<a(this,U).length-1;u++)a(this,U)[u].shouldFlush=!0;p(this,be,De).call(this)}s.byteLength<i.byteLength&&p(this,We,st).call(this,i.subarray(s.byteLength),e+s.byteLength)};ht=new WeakSet;ei=function(i,e){let t=0,r=i.written.length-1,n=-1;for(;t<=r;){let s=Math.floor(t+(r-t+1)/2);i.written[s].start<=e.start?(t=s+1,n=s):r=s-1}for(i.written.splice(n+1,0,e),(n===-1||i.written[n].end<e.start)&&n++;n<i.written.length-1&&i.written[n].end>=i.written[n+1].start;)i.written[n].end=Math.max(i.written[n].end,i.written[n+1].end),i.written.splice(n+1,1)};ft=new WeakSet;ti=function(i){let t={start:Math.floor(i/a(this,R))*a(this,R),data:new Uint8Array(a(this,R)),written:[],shouldFlush:!1};return a(this,U).push(t),a(this,U).sort((r,n)=>r.start-n.start),a(this,U).indexOf(t)};be=new WeakSet;De=function(i=!1){for(let e=0;e<a(this,U).length;e++){let t=a(this,U)[e];if(!(!t.shouldFlush&&!i)){for(let r of t.written){if(a(this,ye)&&t.start+r.start<a(this,re))throw new Error("Internal error: Monotonicity violation.");this.target.options.onData?.(t.data.subarray(r.start,r.end),t.start+r.start),g(this,re,t.start+r.end)}a(this,U).splice(e--,1)}}};var Ei=class extends mt{constructor(i,e){super(new Kt({onData:(t,r)=>i.stream.write({type:"write",data:t,position:r}),chunked:!0,chunkSize:i.options?.chunkSize}),e)}},ce=1,Be=2,Ne=3,_i=1,Ai=2,ki=17,Ii=2**15,xe=2**13,Lt="https://github.com/Vanilagy/webm-muxer",ii=6,ri=5,Li=["strict","offset","permissive"],m,h,Ce,Ue,V,de,ee,Z,pe,W,ae,ne,k,Ae,se,O,F,q,we,Se,oe,ue,He,Me,Pe,ot,ai,ut,ni,gt,si,vt,oi,yt,ui,bt,li,xt,ci,Ke,wt,Ze,St,Pt,di,Y,te,X,ie,lt,pi,ct,hi,me,Oe,ge,Fe,Tt,fi,A,L,le,Ee,Te,qe,Gt,mi,Ye,Bt,ve,ze,Vi=class{constructor(i){c(this,ot),c(this,ut),c(this,gt),c(this,vt),c(this,yt),c(this,bt),c(this,xt),c(this,Ke),c(this,Ze),c(this,Pt),c(this,Y),c(this,X),c(this,lt),c(this,ct),c(this,me),c(this,ge),c(this,Tt),c(this,A),c(this,le),c(this,Te),c(this,Gt),c(this,Ye),c(this,ve),c(this,m,void 0),c(this,h,void 0),c(this,Ce,void 0),c(this,Ue,void 0),c(this,V,void 0),c(this,de,void 0),c(this,ee,void 0),c(this,Z,void 0),c(this,pe,void 0),c(this,W,void 0),c(this,ae,void 0),c(this,ne,void 0),c(this,k,void 0),c(this,Ae,void 0),c(this,se,0),c(this,O,[]),c(this,F,[]),c(this,q,[]),c(this,we,void 0),c(this,Se,void 0),c(this,oe,-1),c(this,ue,-1),c(this,He,-1),c(this,Me,void 0),c(this,Pe,!1),p(this,ot,ai).call(this,i),g(this,m,{type:"webm",firstTimestampBehavior:"strict",...i}),this.target=i.target;let e=!!a(this,m).streaming;if(i.target instanceof Xt)g(this,h,new Ci(i.target));else if(i.target instanceof Kt)g(this,h,new mt(i.target,e));else if(i.target instanceof Bi)g(this,h,new Ei(i.target,e));else throw new Error(`Invalid target: ${i.target}`);p(this,ut,ni).call(this)}addVideoChunk(i,e,t){if(!(i instanceof EncodedVideoChunk))throw new TypeError("addVideoChunk's first argument (chunk) must be of type EncodedVideoChunk.");if(e&&typeof e!="object")throw new TypeError("addVideoChunk's second argument (meta), when provided, must be an object.");if(t!==void 0&&(!Number.isFinite(t)||t<0))throw new TypeError("addVideoChunk's third argument (timestamp), when provided, must be a non-negative real number.");let r=new Uint8Array(i.byteLength);i.copyTo(r),this.addVideoChunkRaw(r,i.type,t??i.timestamp,e)}addVideoChunkRaw(i,e,t,r){if(!(i instanceof Uint8Array))throw new TypeError("addVideoChunkRaw's first argument (data) must be an instance of Uint8Array.");if(e!=="key"&&e!=="delta")throw new TypeError("addVideoChunkRaw's second argument (type) must be either 'key' or 'delta'.");if(!Number.isFinite(t)||t<0)throw new TypeError("addVideoChunkRaw's third argument (timestamp) must be a non-negative real number.");if(r&&typeof r!="object")throw new TypeError("addVideoChunkRaw's fourth argument (meta), when provided, must be an object.");if(p(this,ve,ze).call(this),!a(this,m).video)throw new Error("No video track declared.");a(this,we)===void 0&&g(this,we,t),r&&p(this,lt,pi).call(this,r);let n=p(this,ge,Fe).call(this,i,e,t,ce);for(a(this,m).video.codec==="V_VP9"&&p(this,ct,hi).call(this,n),g(this,oe,n.timestamp);a(this,F).length>0&&a(this,F)[0].timestamp<=n.timestamp;){let s=a(this,F).shift();p(this,A,L).call(this,s,!1)}!a(this,m).audio||n.timestamp<=a(this,ue)?p(this,A,L).call(this,n,!0):a(this,O).push(n),p(this,me,Oe).call(this),p(this,Y,te).call(this)}addAudioChunk(i,e,t){if(!(i instanceof EncodedAudioChunk))throw new TypeError("addAudioChunk's first argument (chunk) must be of type EncodedAudioChunk.");if(e&&typeof e!="object")throw new TypeError("addAudioChunk's second argument (meta), when provided, must be an object.");if(t!==void 0&&(!Number.isFinite(t)||t<0))throw new TypeError("addAudioChunk's third argument (timestamp), when provided, must be a non-negative real number.");let r=new Uint8Array(i.byteLength);i.copyTo(r),this.addAudioChunkRaw(r,i.type,t??i.timestamp,e)}addAudioChunkRaw(i,e,t,r){if(!(i instanceof Uint8Array))throw new TypeError("addAudioChunkRaw's first argument (data) must be an instance of Uint8Array.");if(e!=="key"&&e!=="delta")throw new TypeError("addAudioChunkRaw's second argument (type) must be either 'key' or 'delta'.");if(!Number.isFinite(t)||t<0)throw new TypeError("addAudioChunkRaw's third argument (timestamp) must be a non-negative real number.");if(r&&typeof r!="object")throw new TypeError("addAudioChunkRaw's fourth argument (meta), when provided, must be an object.");if(p(this,ve,ze).call(this),!a(this,m).audio)throw new Error("No audio track declared.");a(this,Se)===void 0&&g(this,Se,t),r?.decoderConfig&&(a(this,m).streaming?g(this,W,p(this,le,Ee).call(this,r.decoderConfig.description)):p(this,Te,qe).call(this,a(this,W),r.decoderConfig.description));let n=p(this,ge,Fe).call(this,i,e,t,Be);for(g(this,ue,n.timestamp);a(this,O).length>0&&a(this,O)[0].timestamp<=n.timestamp;){let s=a(this,O).shift();p(this,A,L).call(this,s,!0)}!a(this,m).video||n.timestamp<=a(this,oe)?p(this,A,L).call(this,n,!a(this,m).video):a(this,F).push(n),p(this,me,Oe).call(this),p(this,Y,te).call(this)}addSubtitleChunk(i,e,t){if(typeof i!="object"||!i)throw new TypeError("addSubtitleChunk's first argument (chunk) must be an object.");if(!(i.body instanceof Uint8Array))throw new TypeError("body must be an instance of Uint8Array.");if(!Number.isFinite(i.timestamp)||i.timestamp<0)throw new TypeError("timestamp must be a non-negative real number.");if(!Number.isFinite(i.duration)||i.duration<0)throw new TypeError("duration must be a non-negative real number.");if(i.additions&&!(i.additions instanceof Uint8Array))throw new TypeError("additions, when present, must be an instance of Uint8Array.");if(typeof e!="object")throw new TypeError("addSubtitleChunk's second argument (meta) must be an object.");if(p(this,ve,ze).call(this),!a(this,m).subtitles)throw new Error("No subtitle track declared.");e?.decoderConfig&&(a(this,m).streaming?g(this,ae,p(this,le,Ee).call(this,e.decoderConfig.description)):p(this,Te,qe).call(this,a(this,ae),e.decoderConfig.description));let r=p(this,ge,Fe).call(this,i.body,"key",t??i.timestamp,Ne,i.duration,i.additions);g(this,He,r.timestamp),a(this,q).push(r),p(this,me,Oe).call(this),p(this,Y,te).call(this)}finalize(){if(a(this,Pe))throw new Error("Cannot finalize a muxer more than once.");for(;a(this,O).length>0;)p(this,A,L).call(this,a(this,O).shift(),!0);for(;a(this,F).length>0;)p(this,A,L).call(this,a(this,F).shift(),!0);for(;a(this,q).length>0&&a(this,q)[0].timestamp<=a(this,se);)p(this,A,L).call(this,a(this,q).shift(),!1);if(a(this,k)&&p(this,Ye,Bt).call(this),a(this,h).writeEBML(a(this,ne)),!a(this,m).streaming){let i=a(this,h).pos,e=a(this,h).pos-a(this,X,ie);a(this,h).seek(a(this,h).offsets.get(a(this,Ce))+4),a(this,h).writeEBMLVarInt(e,ii),a(this,ee).data=new pt(a(this,se)),a(this,h).seek(a(this,h).offsets.get(a(this,ee))),a(this,h).writeEBML(a(this,ee)),a(this,V).data[0].data[1].data=a(this,h).offsets.get(a(this,ne))-a(this,X,ie),a(this,V).data[1].data[1].data=a(this,h).offsets.get(a(this,Ue))-a(this,X,ie),a(this,V).data[2].data[1].data=a(this,h).offsets.get(a(this,de))-a(this,X,ie),a(this,h).seek(a(this,h).offsets.get(a(this,V))),a(this,h).writeEBML(a(this,V)),a(this,h).seek(i)}p(this,Y,te).call(this),a(this,h).finalize(),g(this,Pe,!0)}};m=new WeakMap;h=new WeakMap;Ce=new WeakMap;Ue=new WeakMap;V=new WeakMap;de=new WeakMap;ee=new WeakMap;Z=new WeakMap;pe=new WeakMap;W=new WeakMap;ae=new WeakMap;ne=new WeakMap;k=new WeakMap;Ae=new WeakMap;se=new WeakMap;O=new WeakMap;F=new WeakMap;q=new WeakMap;we=new WeakMap;Se=new WeakMap;oe=new WeakMap;ue=new WeakMap;He=new WeakMap;Me=new WeakMap;Pe=new WeakMap;ot=new WeakSet;ai=function(i){if(typeof i!="object")throw new TypeError("The muxer requires an options object to be passed to its constructor.");if(!(i.target instanceof Xe))throw new TypeError("The target must be provided and an instance of Target.");if(i.video){if(typeof i.video.codec!="string")throw new TypeError(`Invalid video codec: ${i.video.codec}. Must be a string.`);if(!Number.isInteger(i.video.width)||i.video.width<=0)throw new TypeError(`Invalid video width: ${i.video.width}. Must be a positive integer.`);if(!Number.isInteger(i.video.height)||i.video.height<=0)throw new TypeError(`Invalid video height: ${i.video.height}. Must be a positive integer.`);if(i.video.frameRate!==void 0&&(!Number.isFinite(i.video.frameRate)||i.video.frameRate<=0))throw new TypeError(`Invalid video frame rate: ${i.video.frameRate}. Must be a positive number.`);if(i.video.alpha!==void 0&&typeof i.video.alpha!="boolean")throw new TypeError(`Invalid video alpha: ${i.video.alpha}. Must be a boolean.`)}if(i.audio){if(typeof i.audio.codec!="string")throw new TypeError(`Invalid audio codec: ${i.audio.codec}. Must be a string.`);if(!Number.isInteger(i.audio.numberOfChannels)||i.audio.numberOfChannels<=0)throw new TypeError(`Invalid number of audio channels: ${i.audio.numberOfChannels}. Must be a positive integer.`);if(!Number.isInteger(i.audio.sampleRate)||i.audio.sampleRate<=0)throw new TypeError(`Invalid audio sample rate: ${i.audio.sampleRate}. Must be a positive integer.`);if(i.audio.bitDepth!==void 0&&(!Number.isInteger(i.audio.bitDepth)||i.audio.bitDepth<=0))throw new TypeError(`Invalid audio bit depth: ${i.audio.bitDepth}. Must be a positive integer.`)}if(i.subtitles&&typeof i.subtitles.codec!="string")throw new TypeError(`Invalid subtitles codec: ${i.subtitles.codec}. Must be a string.`);if(i.type!==void 0&&!["webm","matroska"].includes(i.type))throw new TypeError(`Invalid type: ${i.type}. Must be 'webm' or 'matroska'.`);if(i.firstTimestampBehavior&&!Li.includes(i.firstTimestampBehavior))throw new TypeError(`Invalid first timestamp behavior: ${i.firstTimestampBehavior}`);if(i.streaming!==void 0&&typeof i.streaming!="boolean")throw new TypeError(`Invalid streaming option: ${i.streaming}. Must be a boolean.`)};ut=new WeakSet;ni=function(){a(this,h)instanceof _e&&a(this,h).target.options.onHeader&&a(this,h).startTrackingWrites(),p(this,gt,si).call(this),a(this,m).streaming||p(this,bt,li).call(this),p(this,xt,ci).call(this),p(this,vt,oi).call(this),p(this,yt,ui).call(this),a(this,m).streaming||(p(this,Ke,wt).call(this),p(this,Ze,St).call(this)),p(this,Pt,di).call(this),p(this,Y,te).call(this)};gt=new WeakSet;si=function(){let i={id:440786851,data:[{id:17030,data:1},{id:17143,data:1},{id:17138,data:4},{id:17139,data:8},{id:17026,data:a(this,m).type??"webm"},{id:17031,data:2},{id:17029,data:2}]};a(this,h).writeEBML(i)};vt=new WeakSet;oi=function(){g(this,pe,{id:236,size:4,data:new Uint8Array(xe)}),g(this,W,{id:236,size:4,data:new Uint8Array(xe)}),g(this,ae,{id:236,size:4,data:new Uint8Array(xe)})};yt=new WeakSet;ui=function(){g(this,Z,{id:21936,data:[{id:21937,data:2},{id:21946,data:2},{id:21947,data:2},{id:21945,data:0}]})};bt=new WeakSet;li=function(){const i=new Uint8Array([28,83,187,107]),e=new Uint8Array([21,73,169,102]),t=new Uint8Array([22,84,174,107]);g(this,V,{id:290298740,data:[{id:19899,data:[{id:21419,data:i},{id:21420,size:5,data:0}]},{id:19899,data:[{id:21419,data:e},{id:21420,size:5,data:0}]},{id:19899,data:[{id:21419,data:t},{id:21420,size:5,data:0}]}]})};xt=new WeakSet;ci=function(){let i={id:17545,data:new pt(0)};g(this,ee,i);let e={id:357149030,data:[{id:2807729,data:1e6},{id:19840,data:Lt},{id:22337,data:Lt},a(this,m).streaming?null:i]};g(this,Ue,e)};Ke=new WeakSet;wt=function(){let i={id:374648427,data:[]};g(this,de,i),a(this,m).video&&i.data.push({id:174,data:[{id:215,data:ce},{id:29637,data:ce},{id:131,data:_i},{id:134,data:a(this,m).video.codec},a(this,pe),a(this,m).video.frameRate?{id:2352003,data:1e9/a(this,m).video.frameRate}:null,{id:224,data:[{id:176,data:a(this,m).video.width},{id:186,data:a(this,m).video.height},a(this,m).video.alpha?{id:21440,data:1}:null,a(this,Z)]}]}),a(this,m).audio&&(g(this,W,a(this,m).streaming?a(this,W)||null:{id:236,size:4,data:new Uint8Array(xe)}),i.data.push({id:174,data:[{id:215,data:Be},{id:29637,data:Be},{id:131,data:Ai},{id:134,data:a(this,m).audio.codec},a(this,W),{id:225,data:[{id:181,data:new qt(a(this,m).audio.sampleRate)},{id:159,data:a(this,m).audio.numberOfChannels},a(this,m).audio.bitDepth?{id:25188,data:a(this,m).audio.bitDepth}:null]}]})),a(this,m).subtitles&&i.data.push({id:174,data:[{id:215,data:Ne},{id:29637,data:Ne},{id:131,data:ki},{id:134,data:a(this,m).subtitles.codec},a(this,ae)]})};Ze=new WeakSet;St=function(){let i={id:408125543,size:a(this,m).streaming?-1:ii,data:[a(this,m).streaming?null:a(this,V),a(this,Ue),a(this,de)]};if(g(this,Ce,i),a(this,h).writeEBML(i),a(this,h)instanceof _e&&a(this,h).target.options.onHeader){let{data:e,start:t}=a(this,h).getTrackedWrites();a(this,h).target.options.onHeader(e,t)}};Pt=new WeakSet;di=function(){g(this,ne,{id:475249515,data:[]})};Y=new WeakSet;te=function(){a(this,h)instanceof mt&&a(this,h).flush()};X=new WeakSet;ie=function(){return a(this,h).dataOffsets.get(a(this,Ce))};lt=new WeakSet;pi=function(i){if(i.decoderConfig){if(i.decoderConfig.colorSpace){let e=i.decoderConfig.colorSpace;if(g(this,Me,e),a(this,Z).data=[{id:21937,data:{rgb:1,bt709:1,bt470bg:5,smpte170m:6}[e.matrix]},{id:21946,data:{bt709:1,smpte170m:6,"iec61966-2-1":13}[e.transfer]},{id:21947,data:{bt709:1,bt470bg:5,smpte170m:6}[e.primaries]},{id:21945,data:[1,2][Number(e.fullRange)]}],!a(this,m).streaming){let t=a(this,h).pos;a(this,h).seek(a(this,h).offsets.get(a(this,Z))),a(this,h).writeEBML(a(this,Z)),a(this,h).seek(t)}}i.decoderConfig.description&&(a(this,m).streaming?g(this,pe,p(this,le,Ee).call(this,i.decoderConfig.description)):p(this,Te,qe).call(this,a(this,pe),i.decoderConfig.description))}};ct=new WeakSet;hi=function(i){if(i.type!=="key"||!a(this,Me))return;let e=0;if(j(i.data,0,2)!==2)return;e+=2;let t=(j(i.data,e+1,e+2)<<1)+j(i.data,e+0,e+1);e+=2,t===3&&e++;let r=j(i.data,e+0,e+1);if(e++,r)return;let n=j(i.data,e+0,e+1);if(e++,n!==0)return;e+=2;let s=j(i.data,e+0,e+24);if(e+=24,s!==4817730)return;t>=2&&e++;let o={rgb:7,bt709:2,bt470bg:1,smpte170m:3}[a(this,Me).matrix];Gi(i.data,e+0,e+3,o)};me=new WeakSet;Oe=function(){let i=Math.min(a(this,m).video?a(this,oe):1/0,a(this,m).audio?a(this,ue):1/0),e=a(this,q);for(;e.length>0&&e[0].timestamp<=i;)p(this,A,L).call(this,e.shift(),!a(this,m).video&&!a(this,m).audio)};ge=new WeakSet;Fe=function(i,e,t,r,n,s){let o=p(this,Tt,fi).call(this,t,r);return{data:i,additions:s,type:e,timestamp:o,duration:n,trackNumber:r}};Tt=new WeakSet;fi=function(i,e){let t=e===ce?a(this,oe):e===Be?a(this,ue):a(this,He);if(e!==Ne){let r=e===ce?a(this,we):a(this,Se);if(a(this,m).firstTimestampBehavior==="strict"&&t===-1&&i!==0)throw new Error(`The first chunk for your media track must have a timestamp of 0 (received ${i}). Non-zero first timestamps are often caused by directly piping frames or audio data from a MediaStreamTrack into the encoder. Their timestamps are typically relative to the age of the document, which is probably what you want.

If you want to offset all timestamps of a track such that the first one is zero, set firstTimestampBehavior: 'offset' in the options.
If you want to allow non-zero first timestamps, set firstTimestampBehavior: 'permissive'.
`);a(this,m).firstTimestampBehavior==="offset"&&(i-=r)}if(i<t)throw new Error(`Timestamps must be monotonically increasing (went from ${t} to ${i}).`);if(i<0)throw new Error(`Timestamps must be non-negative (received ${i}).`);return i};A=new WeakSet;L=function(i,e){a(this,m).streaming&&!a(this,de)&&(p(this,Ke,wt).call(this),p(this,Ze,St).call(this));let t=Math.floor(i.timestamp/1e3),r=t-a(this,Ae),n=e&&i.type==="key"&&r>=1e3,s=r>=Ii;if((!a(this,k)||n||s)&&(p(this,Gt,mi).call(this,t),r=0),r<0)return;let o=new Uint8Array(4),u=new DataView(o.buffer);if(u.setUint8(0,128|i.trackNumber),u.setInt16(1,r,!1),i.duration===void 0&&!i.additions){u.setUint8(3,+(i.type==="key")<<7);let l={id:163,data:[o,i.data]};a(this,h).writeEBML(l)}else{let l=Math.floor(i.duration/1e3),f={id:160,data:[{id:161,data:[o,i.data]},i.duration!==void 0?{id:155,data:l}:null,i.additions?{id:30113,data:i.additions}:null]};a(this,h).writeEBML(f)}g(this,se,Math.max(a(this,se),t))};le=new WeakSet;Ee=function(i){return{id:25506,size:4,data:new Uint8Array(i)}};Te=new WeakSet;qe=function(i,e){let t=a(this,h).pos;a(this,h).seek(a(this,h).offsets.get(i));let r=6+e.byteLength,n=xe-r;if(n<0){let s=e.byteLength+n;e instanceof ArrayBuffer?e=e.slice(0,s):e=e.buffer.slice(0,s),n=0}i=[p(this,le,Ee).call(this,e),{id:236,size:4,data:new Uint8Array(n)}],a(this,h).writeEBML(i),a(this,h).seek(t)};Gt=new WeakSet;mi=function(i){a(this,k)&&p(this,Ye,Bt).call(this),a(this,h)instanceof _e&&a(this,h).target.options.onCluster&&a(this,h).startTrackingWrites(),g(this,k,{id:524531317,size:a(this,m).streaming?-1:ri,data:[{id:231,data:i}]}),a(this,h).writeEBML(a(this,k)),g(this,Ae,i);let e=a(this,h).offsets.get(a(this,k))-a(this,X,ie);a(this,ne).data.push({id:187,data:[{id:179,data:i},a(this,m).video?{id:183,data:[{id:247,data:ce},{id:241,data:e}]}:null,a(this,m).audio?{id:183,data:[{id:247,data:Be},{id:241,data:e}]}:null]})};Ye=new WeakSet;Bt=function(){if(!a(this,m).streaming){let i=a(this,h).pos-a(this,h).dataOffsets.get(a(this,k)),e=a(this,h).pos;a(this,h).seek(a(this,h).offsets.get(a(this,k))+4),a(this,h).writeEBMLVarInt(i,ri),a(this,h).seek(e)}if(a(this,h)instanceof _e&&a(this,h).target.options.onCluster){let{data:i,start:e}=a(this,h).getTrackedWrites();a(this,h).target.options.onCluster(i,e,a(this,Ae))}};ve=new WeakSet;ze=function(){if(a(this,Pe))throw new Error("Cannot add new video or audio chunks after the file has been finalized.")};new TextEncoder;function Vt(i){return i&-2}async function Ri(i,e){const t=Math.max(0,e),r=Number.isFinite(i.duration)&&i.duration>0&&t>i.duration?i.duration:t;if(Math.abs(i.currentTime-r)<1e-4){await new Promise(n=>requestAnimationFrame(()=>n()));return}i.currentTime=r,await new Promise((n,s)=>{const o=()=>{i.removeEventListener("seeked",o),i.removeEventListener("error",u),n()},u=()=>{i.removeEventListener("seeked",o),i.removeEventListener("error",u),s(new Error("Video seek failed"))};i.addEventListener("seeked",o,{once:!0}),i.addEventListener("error",u,{once:!0})}),await new Promise(n=>requestAnimationFrame(()=>n()))}async function Oi(i,e,t,r){const n=[{codec:"vp09.00.10.08",muxCodec:"V_VP9"},{codec:"vp8",muxCodec:"V_VP8"}];for(const{codec:s,muxCodec:o}of n){const{supported:u,config:l}=await VideoEncoder.isConfigSupported({codec:s,width:i,height:e,bitrate:t,framerate:r});if(u&&l)return{muxCodec:o,encoderConfig:l}}throw new Error("No VP9/VP8 encoder configuration is supported for this size.")}async function Fi(i,e,t){if(!("VideoEncoder"in globalThis))throw new Error("VideoEncoder is not available in this context.");if(e.readyState<HTMLMediaElement.HAVE_METADATA)throw new Error("Video metadata is not loaded yet (need HAVE_METADATA).");const r=e.videoWidth,n=e.videoHeight;if(r<1||n<1)throw new Error("Video intrinsic size is not available.");const s=Vt(r),o=Vt(n),u=t.fps??30,l=e.duration;if(!Number.isFinite(l)||l<=0)throw new Error("Video duration is not available for export.");const f=Math.min(t.maxSeconds??1/0,l),d=t.bitrate??25e5,v=Math.max(1,Math.round(u*(t.keyframeIntervalSeconds??2))),{muxCodec:y,encoderConfig:w}=await Oi(s,o,d,u),T=new Xt,P=new Vi({target:T,video:{codec:y,width:s,height:o,frameRate:u},firstTimestampBehavior:"offset"});let x;const G=new VideoEncoder({output:(I,ke)=>{P.addVideoChunk(I,ke)},error:I=>{x=I}});G.configure({...w,width:s,height:o,bitrate:d,framerate:u,latencyMode:"quality",bitrateMode:"variable"});const S=Math.round(1e6/u),M=Math.max(1,Math.ceil(f*u)),$=Math.max(0,f-.001);try{for(let I=0;I<M;I++){if(x)throw x;const ke=M<=1?0:Math.min(I/u,$);await Ri(e,ke);const Si=Math.round(ke*1e6),Pi=new VideoFrame(e,{timestamp:Si,duration:S}),It=await i.renderToOffscreenVideoFrameZeroCopy(Pi,t.getFrameOptions(),s,o);G.encode(It,{keyFrame:I%v===0}),It.close(),t.onProgress?.(I+1,M)}if(x||(await G.flush(),x))throw x}finally{G.close()}return P.finalize(),new Blob([T.buffer],{type:"video/webm"})}function je(i){return i*Math.PI/180}class zi{renderer;dom;opticalFlow;gpuFrameBusy=!1;exportBusy=!1;currentObjectUrl=null;opacity=1;posX=0;posY=0;posZ=0;scaleX=1;scaleY=1;rotXDeg=0;rotYDeg=0;rotZDeg=0;perspective=2;paramA=0;paramB=0;paramC=1;constructor(e,t,r=null){this.renderer=e,this.dom=t,this.opticalFlow=r,this.syncNumbersFromDom(),this.refreshEffectUiLabels()}syncNumbersFromDom(){const e=this.dom;this.opacity=Number(e.opacityInput.value),this.posX=Number(e.posXInput.value),this.posY=Number(e.posYInput.value),this.posZ=Number(e.posZInput.value),this.scaleX=Number(e.scaleXInput.value),this.scaleY=Number(e.scaleYInput.value),this.rotXDeg=Number(e.rotXInput.value),this.rotYDeg=Number(e.rotYInput.value),this.rotZDeg=Number(e.rotZInput.value),this.perspective=Number(e.perspectiveInput.value),this.paramA=Number(e.paramAInput.value),this.paramB=Number(e.paramBInput.value),this.paramC=Number(e.paramCInput.value)}refreshSpanLabels(){const e=this.dom;e.opacityVal.textContent=this.opacity.toFixed(2),e.posXVal.textContent=this.posX.toFixed(2),e.posYVal.textContent=this.posY.toFixed(2),e.posZVal.textContent=this.posZ.toFixed(2),e.scaleXVal.textContent=this.scaleX.toFixed(2),e.scaleYVal.textContent=this.scaleY.toFixed(2),e.rotXVal.textContent=String(Math.round(this.rotXDeg)),e.rotYVal.textContent=String(Math.round(this.rotYDeg)),e.rotZVal.textContent=String(Math.round(this.rotZDeg)),e.perspectiveVal.textContent=this.perspective.toFixed(2),e.paramAVal.textContent=this.fmtSlider(this.paramA),e.paramBVal.textContent=this.fmtSlider(this.paramB),e.paramCVal.textContent=this.fmtSlider(this.paramC)}fmtSlider(e){return Math.abs(e-Math.round(e))<1e-6?String(Math.round(e)):e.toFixed(3)}refreshEffectUiLabels(){const e=this.dom.effectSelect.value,{paramALabel:t,paramBLabel:r,paramCLabel:n,paramAInput:s,paramBInput:o,paramCInput:u}=this.dom,l=(d,v,y)=>{d.style.display=y?"none":"",v.closest("label").style.display=y?"none":""};switch(l(t,s,e==="none"||e==="invert"),l(r,o,e==="none"||e==="invert"||e==="hue-shift"||e==="brightness"||e==="contrast"||e==="saturation"||e==="pixelate"||e==="box-blur"),l(n,u,e!=="levels"),e){case"hue-shift":t.textContent="Hue shift",s.min="0",s.max="1",s.step="0.01",s.value=String(this.paramA>0?this.paramA:"0.15");break;case"brightness":t.textContent="Brightness Δ",s.min="-0.5",s.max="0.5",s.step="0.01";break;case"contrast":t.textContent="Contrast",s.min="0.25",s.max="3",s.step="0.02",s.value=s.value===""?"1":s.value;break;case"saturation":t.textContent="Saturation",s.min="0",s.max="3",s.step="0.02",s.value=s.value===""?"1":s.value;break;case"pixelate":t.textContent="Pixel size",s.min="2",s.max="80",s.step="1";break;case"box-blur":t.textContent="Radius",s.min="0",s.max="20",s.step="1",s.value=s.value===""?"5":s.value;break;case"kaleidoscope":t.textContent="Segments",s.min="2",s.max="24",s.step="1",r.textContent="Rotation",o.min="-3.15",o.max="3.15",o.step="0.05";break;case"rgb-split":t.textContent="Amount",s.min="0",s.max="0.06",s.step="0.002",r.textContent="Angle rad",o.min="0",o.max="6.29",o.step="0.05";break;case"levels":t.textContent="Input black",s.min="0",s.max="0.45",s.step="0.01",r.textContent="Input white",o.min="0.55",o.max="1",o.step="0.01",o.value=o.value===""?"1":o.value,n.textContent="Gamma",u.min="0.3",u.max="3",u.step="0.05",u.value=u.value===""?"1":u.value;break}const f=this.dom.mirrorHInput.closest(".mirror-row");f.style.display=e==="mirror"?"flex":"none",this.syncNumbersFromDom(),this.refreshSpanLabels()}layerParams(){return{opacity:this.opacity,posX:this.posX,posY:this.posY,posZ:this.posZ,scaleX:this.scaleX,scaleY:this.scaleY,rotationX:je(this.rotXDeg),rotationY:je(this.rotYDeg),rotationZ:je(this.rotZDeg),perspective:this.perspective}}effectParams(){const e=this.dom.effectSelect.value,t=Number(this.dom.paramAInput.value),r=Number(this.dom.paramBInput.value),n=Number(this.dom.paramCInput.value);switch(e){case"hue-shift":return{hueShift:t};case"brightness":return{brightnessAmt:t};case"contrast":return{contrastAmt:t};case"saturation":return{saturationAmt:t};case"pixelate":return{pixelate:t};case"kaleidoscope":return{kaleidoscopeSegments:t,kaleidoscopeRotation:r};case"mirror":return{mirrorH:this.dom.mirrorHInput.checked,mirrorV:this.dom.mirrorVInput.checked};case"rgb-split":return{rgbSplitAmount:t,rgbSplitAngle:r};case"levels":return{levelsInputBlack:t,levelsInputWhite:r,levelsGamma:n,levelsOutputBlack:0,levelsOutputWhite:1};case"box-blur":return{boxBlurRadius:t};default:return{}}}frameOptions(){const e=this.dom.outputModeSelect.value,t=this.dom.effectSelect.value;return{outputMode:e==="grid"?"grid":e==="stackedAlpha"?"stackedAlpha":"normal",effectType:t,effectParams:this.effectParams(),transformParams:this.layerParams()}}setStatus(e){this.dom.statusEl.textContent=e}setMotionReadout(e){this.dom.motionViz?.update(e)}start(){this.dom.video.loop=!0;const e=t=>{t.addEventListener("input",()=>{this.syncNumbersFromDom(),this.refreshSpanLabels()})};e(this.dom.opacityInput),e(this.dom.posXInput),e(this.dom.posYInput),e(this.dom.posZInput),e(this.dom.scaleXInput),e(this.dom.scaleYInput),e(this.dom.rotXInput),e(this.dom.rotYInput),e(this.dom.rotZInput),e(this.dom.perspectiveInput),e(this.dom.paramAInput),e(this.dom.paramBInput),e(this.dom.paramCInput),this.dom.effectSelect.addEventListener("change",()=>this.refreshEffectUiLabels()),this.dom.mirrorHInput.addEventListener("change",()=>{}),this.dom.mirrorVInput.addEventListener("change",()=>{}),this.dom.video.addEventListener("loadeddata",()=>{this.setStatus("Playing — GPU transform, effects, and output pass are live."),this.dom.video.play().catch(t=>this.setStatus(`play() failed: ${t}`))}),this.dom.fileInput.addEventListener("change",()=>this.onFileSelected()),this.dom.exportWebmBtn.addEventListener("click",()=>void this.onExportWebM()),this.refreshSpanLabels(),this.renderer.configureSurface(),this.setStatus("Choose a video file to start. Tip: checkerboard preview needs visible alpha — shrink or rotate the layer if the frame is opaque."),requestAnimationFrame(()=>this.loop())}onFileSelected(){const e=this.dom.fileInput.files?.[0];e&&(this.currentObjectUrl&&(URL.revokeObjectURL(this.currentObjectUrl),this.currentObjectUrl=null),this.renderer.releaseWorkTextures(),this.opticalFlow?.reset(),this.dom.motionViz?.reset(),this.dom.perfHud?.reset(),this.currentObjectUrl=URL.createObjectURL(e),this.dom.video.src=this.currentObjectUrl)}loop(){!this.dom.video.paused&&!this.dom.video.ended&&this.captureVideoFrame(),requestAnimationFrame(()=>this.loop())}async captureVideoFrame(){if(this.exportBusy||this.gpuFrameBusy)return;const{video:e}=this.dom;if(e.readyState<HTMLMediaElement.HAVE_CURRENT_DATA||e.videoWidth===0||e.videoHeight===0)return;let t;try{const o=Math.floor(e.currentTime*1e6);t=new VideoFrame(e,{timestamp:o})}catch(o){console.log(`new VideoFrame(video) failed (${o}). Try Chrome; some browsers need WebCodecs + compatible sources.`);return}this.gpuFrameBusy=!0,this.syncNumbersFromDom();let r=null,n;if(this.opticalFlow!=null){const o=performance.now();try{r=await createImageBitmap(t),n=performance.now()-o}catch(u){this.dom.motionViz?.setError(`createImageBitmap failed: ${u}`)}}const s=performance.now();this.renderer.renderVideoFrame(this.dom.canvas,t,this.frameOptions(),()=>{if(this.gpuFrameBusy=!1,this.dom.perfHud?.recordFrame(s,performance.now(),e.videoWidth,e.videoHeight,this.dom.canvas.width,this.dom.canvas.height,n),this.opticalFlow&&r){const o=r;this.opticalFlow.analyzeFrame(o).then(u=>this.setMotionReadout(u)).catch(u=>{this.dom.motionViz?.setError(`Analysis error: ${u}`)}).finally(()=>o.close())}},o=>this.setStatus(`importExternalTexture failed: ${o}`))}async onExportWebM(){if(this.exportBusy)return;const{video:e,exportWebmBtn:t}=this.dom;if(e.readyState<HTMLMediaElement.HAVE_METADATA){this.setStatus("Load a video first (wait for metadata).");return}if(!("VideoEncoder"in globalThis)){this.setStatus("VideoEncoder is not available in this browser.");return}if(!navigator.gpu){this.setStatus("WebGPU is required for GPU export.");return}this.exportBusy=!0,t.disabled=!0;const r=e.paused,n=e.currentTime;e.pause();try{this.syncNumbersFromDom(),this.setStatus("Starting zero-copy export…");const s=await Fi(this.renderer,e,{fps:30,getFrameOptions:()=>this.frameOptions(),onProgress:(l,f)=>{this.setStatus(`Export… ${l} / ${f} frames (GPU → WebCodecs)`)}}),o=URL.createObjectURL(s),u=document.createElement("a");u.href=o,u.download="gpu-processed-export.webm",u.rel="noopener",u.click(),URL.revokeObjectURL(o),this.setStatus(`Export done — ${(s.size/(1024*1024)).toFixed(2)} MiB WebM saved.`)}catch(s){this.setStatus(`Export failed: ${s instanceof Error?s.message:String(s)}`)}finally{e.currentTime=n,r||e.play().catch(s=>this.setStatus(`play() after export: ${s}`)),this.exportBusy=!1,t.disabled=!1}}}const Wi=.14,Di=28,Ni=140;class Hi{root;statusEl;sceneCutEl;fills;vals;sparkline;sparklineCtx=null;smTotal=0;smGlobal=0;smLocal=0;history=[];sceneCutHold=0;resizeObs=null;constructor(e){this.root=e,this.statusEl=e.querySelector("#motionStatus"),this.sceneCutEl=e.querySelector("#motionSceneCut"),this.sparkline=e.querySelector("#motionSparkline"),this.fills={total:e.querySelector('[data-flow-fill="total"]'),global:e.querySelector('[data-flow-fill="global"]'),local:e.querySelector('[data-flow-fill="local"]')},this.vals={total:e.querySelector('[data-flow-val="total"]'),global:e.querySelector('[data-flow-val="global"]'),local:e.querySelector('[data-flow-val="local"]')},this.sparklineCtx=this.sparkline.getContext("2d"),this.observeSparklineSize()}observeSparklineSize(){typeof ResizeObserver>"u"||(this.resizeObs=new ResizeObserver(()=>this.redrawSparkline()),this.resizeObs.observe(this.sparkline))}destroy(){this.resizeObs?.disconnect(),this.resizeObs=null}setWaiting(e="Waiting for video frames…"){this.statusEl.textContent=e,this.statusEl.hidden=!1,this.root.classList.add("motion-panel--idle")}setError(e){this.statusEl.textContent=e,this.statusEl.hidden=!1,this.root.classList.add("motion-panel--idle")}reset(){this.smTotal=0,this.smGlobal=0,this.smLocal=0,this.history=[],this.sceneCutHold=0,this.sceneCutEl.hidden=!0,this.fills.total.style.width="0%",this.fills.global.style.width="0%",this.fills.local.style.width="0%",this.vals.total.textContent="0%",this.vals.global.textContent="0%",this.vals.local.textContent="0%",this.redrawSparkline(),this.setWaiting("Waiting for video frames…")}hideStatus(){this.statusEl.hidden=!0,this.root.classList.remove("motion-panel--idle")}update(e){this.hideStatus();const t=Wi;this.smTotal=this.smTotal*(1-t)+e.total*t,this.smGlobal=this.smGlobal*(1-t)+e.global*t,this.smLocal=this.smLocal*(1-t)+e.local*t,e.isSceneCut?this.sceneCutHold=Di:this.sceneCutHold=Math.max(0,this.sceneCutHold-1),this.sceneCutEl.hidden=this.sceneCutHold===0;const r=u=>Math.min(100,Math.max(0,Math.round(u*100))),n=r(this.smTotal),s=r(this.smGlobal),o=r(this.smLocal);this.fills.total.style.width=`${n}%`,this.fills.global.style.width=`${s}%`,this.fills.local.style.width=`${o}%`,this.vals.total.textContent=`${n}%`,this.vals.global.textContent=`${s}%`,this.vals.local.textContent=`${o}%`,this.history.push(this.smTotal),this.history.length>Ni&&this.history.shift(),this.redrawSparkline()}redrawSparkline(){const e=this.sparklineCtx;if(!e)return;const t=this.sparkline,r=Math.min(2,window.devicePixelRatio||1),n=t.clientWidth||320,s=56,o=Math.max(1,Math.floor(n*r)),u=Math.max(1,Math.floor(s*r));(t.width!==o||t.height!==u)&&(t.width=o,t.height=u),e.setTransform(r,0,0,r,0,0);const l=n,f=s,d={t:6,r:4,b:6,l:4},v=l-d.l-d.r,y=f-d.t-d.b;e.clearRect(0,0,l,f),e.fillStyle="rgba(15, 23, 36, 0.95)",e.fillRect(0,0,l,f),e.strokeStyle="rgba(148, 163, 184, 0.15)",e.lineWidth=1;for(const S of[.25,.5,.75]){const M=d.t+y*(1-S);e.beginPath(),e.moveTo(d.l,M),e.lineTo(d.l+v,M),e.stroke()}const w=this.history;if(w.length<2){e.fillStyle="rgba(148, 163, 184, 0.5)",e.font="11px system-ui, sans-serif",e.fillText("History builds as the clip plays…",d.l,d.t+14);return}const T=w.length,P=S=>d.l+S/(T-1)*v,x=S=>d.t+y*(1-Math.min(1,Math.max(0,S))),G=e.createLinearGradient(0,d.t,0,d.t+y);G.addColorStop(0,"rgba(34, 211, 238, 0.35)"),G.addColorStop(1,"rgba(34, 211, 238, 0.02)"),e.beginPath(),e.moveTo(P(0),x(w[0]));for(let S=1;S<T;S++)e.lineTo(P(S),x(w[S]));e.lineTo(P(T-1),d.t+y),e.lineTo(P(0),d.t+y),e.closePath(),e.fillStyle=G,e.fill(),e.beginPath(),e.moveTo(P(0),x(w[0]));for(let S=1;S<T;S++)e.lineTo(P(S),x(w[S]));e.strokeStyle="rgba(34, 211, 238, 0.95)",e.lineWidth=1.5,e.stroke()}}const qi=`// Optical Flow Compute Shaders for Motion Analysis
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
`,B=160,C=90,D=3,Yi=.5,Xi=8,Ki=.6,Zi=.7;class $i{device;initialized=!1;grayscalePipeline=null;pyramidDownsamplePipeline=null;spatialGradientsPipeline=null;temporalGradientPipeline=null;lucasKanadePipeline=null;flowStatisticsPipeline=null;clearStatsPipeline=null;grayscaleLayout=null;pyramidDownsampleLayout=null;spatialGradientsLayout=null;temporalGradientLayout=null;lucasKanadeLayout=null;flowStatisticsLayout=null;clearStatsLayout=null;inputTexture=null;grayscaleTextures=[];pyramidTextures=[];gradientTextures=[];flowTextures=[];blurTempTexture=null;statsBuffer=null;stagingBuffer=null;lkParamsBuffer=null;statsParamsBuffer=null;hasPreviousFrame=!1;frameIndex=0;constructor(e){this.device=e}async initialize(){if(this.initialized)return!0;try{return await this.createPipelines(),this.createTextures(),this.createBuffers(),this.initialized=!0,!0}catch(e){return console.error("[OpticalFlowAnalyzer] Failed to initialize",e),!1}}async createPipelines(){const e=this.device.createShaderModule({code:qi});this.grayscaleLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"r32float"}}]}),this.grayscalePipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.grayscaleLayout]}),compute:{module:e,entryPoint:"grayscaleMain"}}),this.pyramidDownsampleLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"r32float"}}]}),this.pyramidDownsamplePipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.pyramidDownsampleLayout]}),compute:{module:e,entryPoint:"pyramidDownsampleMain"}}),this.spatialGradientsLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"r32float"}},{binding:2,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"r32float"}}]}),this.spatialGradientsPipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.spatialGradientsLayout]}),compute:{module:e,entryPoint:"spatialGradientsMain"}}),this.temporalGradientLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:2,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"r32float"}}]}),this.temporalGradientPipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.temporalGradientLayout]}),compute:{module:e,entryPoint:"temporalGradientMain"}}),this.lucasKanadeLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:2,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:4,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"rg32float"}},{binding:5,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}}]}),this.lucasKanadePipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.lucasKanadeLayout]}),compute:{module:e,entryPoint:"lucasKanadeMain"}}),this.flowStatisticsLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),this.flowStatisticsPipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.flowStatisticsLayout]}),compute:{module:e,entryPoint:"flowStatisticsMain"}}),this.clearStatsLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),this.clearStatsPipeline=this.device.createComputePipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.clearStatsLayout]}),compute:{module:e,entryPoint:"clearStatsMain"}})}createTextures(){this.inputTexture=this.device.createTexture({size:[B,C],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});for(let r=0;r<2;r++)this.grayscaleTextures.push(this.device.createTexture({size:[B,C],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC}));this.blurTempTexture=this.device.createTexture({size:[B,C],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING});for(let r=0;r<2;r++){const n=[];let s=B,o=C;for(let u=0;u<D;u++)n.push(this.device.createTexture({size:[s,o],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING|(u===0?GPUTextureUsage.COPY_DST:0)})),s=Math.max(1,Math.floor(s/2)),o=Math.max(1,Math.floor(o/2));this.pyramidTextures.push(n)}let e=B,t=C;for(let r=0;r<D;r++)this.gradientTextures.push({ix:this.device.createTexture({size:[e,t],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING}),iy:this.device.createTexture({size:[e,t],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING}),it:this.device.createTexture({size:[e,t],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING})}),e=Math.max(1,Math.floor(e/2)),t=Math.max(1,Math.floor(t/2));e=B,t=C;for(let r=0;r<D;r++)this.flowTextures.push(this.device.createTexture({size:[e,t],format:"rg32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING})),e=Math.max(1,Math.floor(e/2)),t=Math.max(1,Math.floor(t/2))}createBuffers(){this.statsBuffer=this.device.createBuffer({size:64,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),this.stagingBuffer=this.device.createBuffer({size:64,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),this.lkParamsBuffer=this.device.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.statsParamsBuffer=this.device.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const e=new Float32Array([Yi,0,0,0]);this.device.queue.writeBuffer(this.statsParamsBuffer,0,e)}async analyzeFrame(e){if(!this.initialized&&!await this.initialize())return{total:0,global:0,local:0,isSceneCut:!1};const t=this.frameIndex%2,r=(this.frameIndex+1)%2;this.device.queue.copyExternalImageToTexture({source:e},{texture:this.inputTexture},[B,C]);const n=this.device.createCommandEncoder();if(this.dispatchGrayscale(n,t),this.dispatchPyramid(n,t),this.hasPreviousFrame){for(let o=D-1;o>=0;o--)this.dispatchSpatialGradients(n,t,o),this.dispatchTemporalGradient(n,t,r,o),this.dispatchLucasKanade(n,o);this.dispatchClearStats(n),this.dispatchFlowStatistics(n)}this.device.queue.submit([n.finish()]);let s={total:0,global:0,local:0,isSceneCut:!1};if(this.hasPreviousFrame){const o=await this.readStats();s=this.classifyMotion(o)}return this.hasPreviousFrame=!0,this.frameIndex++,s}dispatchGrayscale(e,t){const r=this.device.createBindGroup({layout:this.grayscaleLayout,entries:[{binding:0,resource:this.inputTexture.createView()},{binding:1,resource:this.grayscaleTextures[t].createView()}]}),n=e.beginComputePass();n.setPipeline(this.grayscalePipeline),n.setBindGroup(0,r),n.dispatchWorkgroups(Math.ceil(B/8),Math.ceil(C/8)),n.end()}dispatchPyramid(e,t){e.copyTextureToTexture({texture:this.grayscaleTextures[t]},{texture:this.pyramidTextures[t][0]},[B,C]);let r=B,n=C;for(let s=1;s<D;s++){r=Math.max(1,Math.floor(r/2)),n=Math.max(1,Math.floor(n/2));const o=this.device.createBindGroup({layout:this.pyramidDownsampleLayout,entries:[{binding:0,resource:this.pyramidTextures[t][s-1].createView()},{binding:1,resource:this.pyramidTextures[t][s].createView()}]}),u=e.beginComputePass();u.setPipeline(this.pyramidDownsamplePipeline),u.setBindGroup(0,o),u.dispatchWorkgroups(Math.ceil(r/8),Math.ceil(n/8)),u.end()}}dispatchSpatialGradients(e,t,r){const n=this.getPyramidDimensions(r),s=this.device.createBindGroup({layout:this.spatialGradientsLayout,entries:[{binding:0,resource:this.pyramidTextures[t][r].createView()},{binding:1,resource:this.gradientTextures[r].ix.createView()},{binding:2,resource:this.gradientTextures[r].iy.createView()}]}),o=e.beginComputePass();o.setPipeline(this.spatialGradientsPipeline),o.setBindGroup(0,s),o.dispatchWorkgroups(Math.ceil(n.w/8),Math.ceil(n.h/8)),o.end()}dispatchTemporalGradient(e,t,r,n){const s=this.getPyramidDimensions(n),o=this.device.createBindGroup({layout:this.temporalGradientLayout,entries:[{binding:0,resource:this.pyramidTextures[t][n].createView()},{binding:1,resource:this.pyramidTextures[r][n].createView()},{binding:2,resource:this.gradientTextures[n].it.createView()}]}),u=e.beginComputePass();u.setPipeline(this.temporalGradientPipeline),u.setBindGroup(0,o),u.dispatchWorkgroups(Math.ceil(s.w/8),Math.ceil(s.h/8)),u.end()}dispatchLucasKanade(e,t){const r=this.getPyramidDimensions(t),n=2,s=.001,o=t<D-1?2:0,u=new ArrayBuffer(16),l=new DataView(u);l.setUint32(0,n,!0),l.setFloat32(4,s,!0),l.setFloat32(8,o,!0),l.setUint32(12,0,!0),this.device.queue.writeBuffer(this.lkParamsBuffer,0,u);const f=t<D-1?this.flowTextures[t+1]:this.createDummyFlowTexture(),d=this.device.createBindGroup({layout:this.lucasKanadeLayout,entries:[{binding:0,resource:this.gradientTextures[t].ix.createView()},{binding:1,resource:this.gradientTextures[t].iy.createView()},{binding:2,resource:this.gradientTextures[t].it.createView()},{binding:3,resource:{buffer:this.lkParamsBuffer}},{binding:4,resource:this.flowTextures[t].createView()},{binding:5,resource:f.createView()}]}),v=e.beginComputePass();v.setPipeline(this.lucasKanadePipeline),v.setBindGroup(0,d),v.dispatchWorkgroups(Math.ceil(r.w/8),Math.ceil(r.h/8)),v.end()}dummyFlowTexture=null;createDummyFlowTexture(){return this.dummyFlowTexture||(this.dummyFlowTexture=this.device.createTexture({size:[1,1],format:"rg32float",usage:GPUTextureUsage.TEXTURE_BINDING})),this.dummyFlowTexture}dispatchClearStats(e){const t=this.device.createBindGroup({layout:this.clearStatsLayout,entries:[{binding:0,resource:{buffer:this.statsBuffer}}]}),r=e.beginComputePass();r.setPipeline(this.clearStatsPipeline),r.setBindGroup(0,t),r.dispatchWorkgroups(1),r.end()}dispatchFlowStatistics(e){const t=this.device.createBindGroup({layout:this.flowStatisticsLayout,entries:[{binding:0,resource:this.flowTextures[0].createView()},{binding:1,resource:{buffer:this.statsBuffer}},{binding:2,resource:{buffer:this.statsParamsBuffer}}]}),r=e.beginComputePass();r.setPipeline(this.flowStatisticsPipeline),r.setBindGroup(0,t),r.dispatchWorkgroups(Math.ceil(B/8),Math.ceil(C/8)),r.end(),e.copyBufferToBuffer(this.statsBuffer,0,this.stagingBuffer,0,64)}async readStats(){await this.stagingBuffer.mapAsync(GPUMapMode.READ);const e=new Uint32Array(this.stagingBuffer.getMappedRange().slice(0));this.stagingBuffer.unmap();const t=e[0]/1e3,r=e[1]/1e3,n=new Int32Array([e[2]])[0]/1e3,s=new Int32Array([e[3]])[0]/1e3,o=e[4],u=e[5],l=e[6]/1e3,f=[];for(let M=0;M<8;M++)f.push(e[7+M]);if(o===0)return{meanMagnitude:0,magnitudeVariance:0,meanVx:0,meanVy:0,directionCoherence:0,coverageRatio:0,maxMagnitude:0};const d=t/o,y=r/o-d*d,w=n/o,T=s/o,P=Math.sqrt(w*w+T*T),x=d>.01?P/d:0,G=B*C,S=u/G;return{meanMagnitude:d,magnitudeVariance:y,meanVx:w,meanVy:T,directionCoherence:Math.min(1,x),coverageRatio:S,maxMagnitude:l}}classifyMotion(e){const t=Math.min(1,e.meanMagnitude/10),r=e.meanMagnitude>Xi&&e.coverageRatio>Zi,n=e.directionCoherence;let s,o;if(r)s=t,o=0;else if(n>Ki)s=t*n,o=t*(1-n);else{const u=Math.min(1,Math.sqrt(e.magnitudeVariance)/5);s=t*n,o=Math.max(t*(1-n),u)}return{total:t,global:Math.min(1,s),local:Math.min(1,o),isSceneCut:r}}getPyramidDimensions(e){let t=B,r=C;for(let n=0;n<e;n++)t=Math.max(1,Math.floor(t/2)),r=Math.max(1,Math.floor(r/2));return{w:t,h:r}}reset(){this.hasPreviousFrame=!1,this.frameIndex=0}destroy(){this.inputTexture?.destroy(),this.blurTempTexture?.destroy(),this.dummyFlowTexture?.destroy();for(const e of this.grayscaleTextures)e.destroy();for(const e of this.pyramidTextures)for(const t of e)t.destroy();for(const e of this.gradientTextures)e.ix.destroy(),e.iy.destroy(),e.it.destroy();for(const e of this.flowTextures)e.destroy();this.statsBuffer?.destroy(),this.stagingBuffer?.destroy(),this.lkParamsBuffer?.destroy(),this.statsParamsBuffer?.destroy(),this.initialized=!1}}class ji{els;lastGpuEnd=0;smoothedGpu=0;smoothedFps=0;smoothedPrep=0;alpha=.14;constructor(e){this.els=e}reset(){this.lastGpuEnd=0,this.smoothedGpu=0,this.smoothedFps=0,this.smoothedPrep=0,this.els.fps.textContent="—",this.els.gpuMs.textContent="—",this.els.prepMs.textContent="—",this.els.resolution.textContent="—"}recordFrame(e,t,r,n,s,o,u){const l=Math.max(0,t-e);if(this.smoothedGpu=this.smoothedGpu===0?l:this.smoothedGpu*(1-this.alpha)+l*this.alpha,this.lastGpuEnd>0){const f=t-this.lastGpuEnd;if(f>.5){const d=1e3/f;this.smoothedFps=this.smoothedFps===0?d:this.smoothedFps*(1-this.alpha)+d*this.alpha}}this.lastGpuEnd=t,u!==void 0&&u>=0?(this.smoothedPrep=this.smoothedPrep===0?u:this.smoothedPrep*(1-this.alpha)+u*this.alpha,this.els.prepMs.textContent=this.smoothedPrep<.05?"—":this.smoothedPrep.toFixed(2)):(this.smoothedPrep=0,this.els.prepMs.textContent="—"),this.els.fps.textContent=this.smoothedFps===0?"—":this.smoothedFps.toFixed(0),this.els.gpuMs.textContent=this.smoothedGpu.toFixed(2),this.els.resolution.textContent=`${s}×${o} ← ${r}×${n}`}}const Qi=`// Shared shader code for all effects
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
`,Ji=`// Hue Shift Effect Shader

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
`,er=`// Brightness Effect Shader

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
`,tr=`// Contrast Effect Shader

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
`,ir=`// Saturation Effect Shader

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
`,rr=`// Levels Effect Shader

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
`,ar=`// Pixelate Effect Shader

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
`,nr=`// Kaleidoscope Effect Shader

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
`,sr=`// Mirror Effect Shader

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
`,or=`// RGB Split (Chromatic Aberration) Effect Shader

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
`,ur=`// Invert Effect Shader

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;

@fragment
fn invertFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  return vec4f(1.0 - color.rgb, color.a);
}
`,lr=`
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
`;function cr(i){return`${Qi}
${i}`}const dr={id:"hue-shift",shader:Ji,entryPoint:"hueShiftFragment",uniformSize:16,packUniforms:(i,e,t)=>new Float32Array([i.shift??0,0,0,0])},pr={id:"brightness",shader:er,entryPoint:"brightnessFragment",uniformSize:16,packUniforms:(i,e,t)=>new Float32Array([i.amount??0,0,0,0])},hr={id:"contrast",shader:tr,entryPoint:"contrastFragment",uniformSize:16,packUniforms:(i,e,t)=>new Float32Array([i.amount??1,0,0,0])},fr={id:"saturation",shader:ir,entryPoint:"saturationFragment",uniformSize:16,packUniforms:(i,e,t)=>new Float32Array([i.amount??1,0,0,0])},mr={id:"pixelate",shader:ar,entryPoint:"pixelateFragment",uniformSize:16,packUniforms:(i,e,t)=>new Float32Array([i.size??8,e,t,0])},gr={id:"kaleidoscope",shader:nr,entryPoint:"kaleidoscopeFragment",uniformSize:16,packUniforms:(i,e,t)=>new Float32Array([i.segments??6,i.rotation??0,0,0])},vr={id:"mirror",shader:sr,entryPoint:"mirrorFragment",uniformSize:16,packUniforms:(i,e,t)=>new Float32Array([i.horizontal?1:0,i.vertical?1:0,0,0])},yr={id:"rgb-split",shader:or,entryPoint:"rgbSplitFragment",uniformSize:16,packUniforms:(i,e,t)=>new Float32Array([i.amount??.01,i.angle??0,0,0])},br={id:"invert",shader:ur,entryPoint:"invertFragment",uniformSize:0,packUniforms:()=>null},xr={id:"levels",shader:rr,entryPoint:"levelsFragment",uniformSize:32,packUniforms:(i,e,t)=>new Float32Array([i.inputBlack??0,i.inputWhite??1,i.gamma??1,i.outputBlack??0,i.outputWhite??1,0,0,0])},wr={id:"box-blur",shader:lr,entryPoint:"boxBlurFragment",uniformSize:16,packUniforms:(i,e,t)=>new Float32Array([i.radius??5,e,t,0])},Rt=new Map([["hue-shift",dr],["brightness",pr],["contrast",hr],["saturation",fr],["pixelate",mr],["kaleidoscope",gr],["mirror",vr],["rgb-split",yr],["invert",br],["levels",xr],["box-blur",wr]]);function Sr(i,e){switch(i){case"hue-shift":return{shift:e.hueShift??0};case"brightness":return{amount:e.brightnessAmt??0};case"contrast":return{amount:e.contrastAmt??1};case"saturation":return{amount:e.saturationAmt??1};case"pixelate":return{size:e.pixelate??8};case"kaleidoscope":return{segments:e.kaleidoscopeSegments??6,rotation:e.kaleidoscopeRotation??0};case"mirror":return{horizontal:!!e.mirrorH,vertical:!!e.mirrorV};case"rgb-split":return{amount:e.rgbSplitAmount??.01,angle:e.rgbSplitAngle??0};case"invert":return{};case"levels":return{inputBlack:e.levelsInputBlack??0,inputWhite:e.levelsInputWhite??1,gamma:e.levelsGamma??1,outputBlack:e.levelsOutputBlack??0,outputWhite:e.levelsOutputWhite??1};case"box-blur":return{radius:e.boxBlurRadius??5}}}function Pr(i,e){return i==="none"?[]:[{id:"demo",type:i,enabled:!0,params:Sr(i,e)}]}class $e{setOptions(e,t,r,n,s){}}const Tr="rgba8unorm";class Ct extends $e{device;pipelines=new Map;bindGroupLayouts=new Map;initialized=!1;frameOptions=null;canvasW=0;canvasH=0;constructor(e){super(),this.device=e,this.createPipelines()}static create(e){return new Ct(e)}createPipelines(){if(!this.initialized){for(const[e,t]of Rt)this.createEffectPipeline(t);this.initialized=!0}}createEffectPipeline(e){const t=cr(e.shader),r=this.device.createShaderModule({label:`simplified-effect-${e.id}`,code:t}),n=[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}}];e.uniformSize>0&&n.push({binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}});const s=this.device.createBindGroupLayout({label:`simplified-effect-${e.id}-layout`,entries:n});this.bindGroupLayouts.set(e.id,s);const o=this.device.createRenderPipeline({label:`simplified-effect-${e.id}-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[s]}),vertex:{module:r,entryPoint:"vertexMain"},fragment:{module:r,entryPoint:e.entryPoint,targets:[{format:Tr}]},primitive:{topology:"triangle-list"}});this.pipelines.set(e.id,o)}setOptions(e,t,r,n,s){this.frameOptions=e,this.canvasW=t,this.canvasH=r}gpuRender(e){const t=this.frameOptions,r=t?Pr(t.effectType,t.effectParams):[];if(r.length===0)return e.inputView;const{finalView:n}=this.applyEffects(r,e);return n}createEffectUniformData(e,t,r){const n=Rt.get(e.type);return n?n.packUniforms(e.params,t,r):null}applyEffects(e,t){const r=e.filter(f=>f.enabled),n=t.inputView,s=t.outputView;if(r.length===0)return{finalView:n,swapped:!1};let o=n,u=s,l=!1;for(const f of r){const d=this.pipelines.get(f.type),v=this.bindGroupLayouts.get(f.type);if(!d||!v){console.warn(`[EffectsPipeline] No pipeline for effect type: ${f.type}`);continue}const y=this.createEffectUniformData(f,this.canvasW,this.canvasH);this.createGpuRenderPass(t,y,o,v,u,d);const w=o;o=u,u=w,l=!l}return{finalView:o,swapped:l}}createGpuRenderPass(e,t,r,n,s,o){let u=null;t&&(u=this.device.createBuffer({size:t.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.device.queue.writeBuffer(u,0,t.buffer));const l=[{binding:0,resource:e.sampler},{binding:1,resource:r}];u&&l.push({binding:2,resource:{buffer:u}});const f=this.device.createBindGroup({layout:n,entries:l}),d=e.encoder.beginRenderPass({colorAttachments:[{view:s,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});d.setPipeline(o),d.setBindGroup(0,f),d.draw(6),d.end()}}const Gr=`
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
`;class Ut{shaderModule;device;bufferDataMap=new Map;bindingGroupLayout;label;constructor(e,t,r="none"){this.device=t,this.label=r,this.shaderModule=this.device.createShaderModule({code:e})}setBindingGroupDataDescriptor(e){this.bindingGroupLayout=this.device.createBindGroupLayout({label:`binding-group-layout-${this.label}`,entries:e})}pushBindingGroupData(e){return this.device.createBindGroup({label:`binding-group-${this.label}`,layout:this.bindingGroupLayout,entries:e})}createPipeline(e,t,r=navigator.gpu.getPreferredCanvasFormat()){return this.device.createRenderPipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.bindingGroupLayout]}),vertex:{module:this.shaderModule,entryPoint:e},fragment:{module:this.shaderModule,entryPoint:t,targets:[{format:r}]},primitive:{topology:"triangle-list"}})}setBufferDataDescriptor(e,t){const r=this.device.createBuffer(t);return this.bufferDataMap.set(e,r),r}pushBufferDataFor(e,t,r=0){const n=this.bufferDataMap.get(e);n!==void 0&&this.device.queue.writeBuffer(n,r,t)}}class Mt extends $e{outputPipeline=null;uniformBufferGridOn=null;uniformBufferGridOff=null;uniformBufferStackedAlpha=null;bindGroupCacheGridOn=new Map;bindGroupCacheGridOff=new Map;bindGroupCacheStackedAlpha=new Map;pipelineBuilder;outputWidth=0;outputHeight=0;outputMode="normal";constructor(e){super(),this.pipelineBuilder=e,this.createPipeline()}static create(e){const t=new Ut(Gr,e);return new Mt(t)}createPipeline(){const e={size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST};this.uniformBufferGridOn=this.pipelineBuilder.setBufferDataDescriptor("uniformBufferGridOn",e),this.uniformBufferGridOff=this.pipelineBuilder.setBufferDataDescriptor("uniformBufferGridOff",e),this.uniformBufferStackedAlpha=this.pipelineBuilder.setBufferDataDescriptor("uniformBufferStackedAlpha",e);const t=[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}];this.pipelineBuilder.setBindingGroupDataDescriptor(t),this.outputPipeline=this.pipelineBuilder.createPipeline("vertexMain","fragmentMain")}updateResolution(e,t){this.outputWidth=e,this.outputHeight=t,this.pipelineBuilder.pushBufferDataFor("uniformBufferGridOff",this.getBufferData(0)),this.pipelineBuilder.pushBufferDataFor("uniformBufferGridOn",this.getBufferData(1)),this.pipelineBuilder.pushBufferDataFor("uniformBufferStackedAlpha",this.getBufferData(2))}getBufferData(e){const t=new ArrayBuffer(16),r=new DataView(t);return r.setUint32(0,e,!0),r.setFloat32(4,this.outputWidth,!0),r.setFloat32(8,this.outputHeight,!0),r.setFloat32(12,0,!0),t}invalidateCache(){this.bindGroupCacheGridOn.clear(),this.bindGroupCacheGridOff.clear(),this.bindGroupCacheStackedAlpha.clear()}createOutputBindGroup(e,t,r){const n=r==="grid"?this.bindGroupCacheGridOn:r==="stackedAlpha"?this.bindGroupCacheStackedAlpha:this.bindGroupCacheGridOff,s=n.get(t);if(s)return s;const o=r==="grid"?this.uniformBufferGridOn:r==="stackedAlpha"?this.uniformBufferStackedAlpha:this.uniformBufferGridOff,u=this.pipelineBuilder.pushBindingGroupData([{binding:0,resource:e},{binding:1,resource:t},{binding:2,resource:{buffer:o}}]);return n.set(t,u),u}gpuRender(e){const t=e.inputView;if(!this.outputPipeline)return t;const r=this.createOutputBindGroup(e.sampler,t,this.outputMode),n=e.encoder.beginRenderPass({colorAttachments:[{view:e.outputView,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});return n.setPipeline(this.outputPipeline),n.setBindGroup(0,r),n.draw(6),n.end(),e.outputView}setOptions(e,t,r,n,s){super.setOptions(e,t,r,n,s),this.updateResolution(t,r),this.outputMode=e.outputMode==="grid"?"grid":e.outputMode==="stackedAlpha"?"stackedAlpha":"normal"}}const Br=`// Copy GPUExternalTexture (VideoFrame / HTMLVideoElement) into a regular rgba8unorm target.
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
`;class Et extends $e{builder;pipeline;constructor(e,t){super(),this.builder=e,this.pipeline=t}static create(e,t="rgba8unorm"){const r=new Ut(Br,e);r.setBindingGroupDataDescriptor([{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,externalTexture:{}}]);const n=r.createPipeline("vs_main","fs_main",t);return new Et(r,n)}gpuRender(e){const t=this.builder.pushBindingGroupData([{binding:0,resource:e.sampler},{binding:1,resource:e.inputView}]),r=e.encoder.beginRenderPass({colorAttachments:[{view:e.outputView,clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}]});return r.setPipeline(this.pipeline),r.setBindGroup(0,t),r.draw(6),r.end(),e.outputView}}const Cr=`
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
`,Qe=96,Ot="layerUniforms";class _t extends $e{builder;pipeline;uniformBuffer;uniformBufferData=new ArrayBuffer(Qe);uniformF32=new Float32Array(this.uniformBufferData);uniformU32=new Uint32Array(this.uniformBufferData);constructor(e,t,r){super(),this.builder=e,this.pipeline=t,this.uniformBuffer=r}writeLayerUniforms(e,t,r){const n=this.uniformF32,s=this.uniformU32,o=e.transformParams;n[0]=o.opacity,s[1]=0,n[2]=o.posX,n[3]=o.posY,n[4]=o.scaleX,n[5]=o.scaleY,n[6]=o.rotationZ,n[7]=t,n[8]=r,n[9]=0,s[10]=0,s[11]=0,n[12]=o.rotationX,n[13]=o.rotationY,n[14]=Math.max(o.perspective,.5),n[15]=0,s[16]=0,n[17]=o.posZ,n[18]=0,n[19]=1,n[20]=1,s[21]=0,n[22]=0,n[23]=0,this.builder.pushBufferDataFor(Ot,this.uniformBufferData,0)}static create(e,t="rgba8unorm"){const r=new Ut(Cr,e),n=r.setBufferDataDescriptor(Ot,{label:"layer-uniform",size:Qe,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});r.setBindingGroupDataDescriptor([{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform",minBindingSize:Qe}}]);const s=r.createPipeline("vs_main","fs_main",t);return new _t(r,s,n)}gpuRender(e){const t=this.builder.pushBindingGroupData([{binding:0,resource:e.sampler},{binding:1,resource:e.inputView},{binding:2,resource:{buffer:this.uniformBuffer}}]),r=e.encoder.beginRenderPass({colorAttachments:[{view:e.outputView,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});return r.setPipeline(this.pipeline),r.setBindGroup(0,t),r.draw(6),r.end(),e.outputView}setOptions(e,t,r,n,s){super.setOptions(e,t,r,n,s);const o=n/s,u=t/r;this.writeLayerUniforms(e,o,u)}}class Ft{device;texturePing;texturePong;ping;pong;constructor(e,t,r){const n={label:"canvas-ping",size:[t,r],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING};this.device=e,this.texturePing=this.device.createTexture(n),this.texturePong=this.device.createTexture({...n,label:"canvas-pong"}),this.ping=this.texturePing.createView(),this.pong=this.texturePong.createView()}destroy(){this.texturePing.destroy(),this.texturePong.destroy()}}function At(i){return i instanceof GPUTexture?i.createView():i}const Ur=`
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
`,Mr=`
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
`,Er=`
struct Params { len: u32, _p0: u32, _p1: u32, _p2: u32 }

@group(0) @binding(0) var<storage, read_write> buf: array<u32>;
@group(0) @binding(1) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  if (gid.x >= params.len) { return; }
  // Temporal decay: no persistence (full clear)
  buf[gid.x] = 0u;
}
`,Ie=1024,he=512;class _r{device;computePipeline;renderPipeline;computeBGL;renderBGL;accumR;accumG;accumB;accumL;computeParams;renderParams;decayPipeline;decayBGL;decayParams;constructor(e,t){this.device=e,this.initWaveform(t),this.initDecay()}initWaveform(e){const t=this.device,r=Ie*he*4;this.accumR=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.accumG=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.accumB=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.accumL=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.computeParams=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.renderParams=t.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.computeBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]});const n=t.createShaderModule({code:Ur});this.computePipeline=t.createComputePipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.computeBGL]}),compute:{module:n,entryPoint:"main"}}),this.renderBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}}]});const s=t.createShaderModule({code:Mr});this.renderPipeline=t.createRenderPipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.renderBGL]}),vertex:{module:s,entryPoint:"vs"},fragment:{module:s,entryPoint:"fs",targets:[{format:e}]}})}initDecay(){const e=this.device;this.decayBGL=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]});const t=e.createShaderModule({code:Er});this.decayPipeline=e.createComputePipeline({layout:e.createPipelineLayout({bindGroupLayouts:[this.decayBGL]}),compute:{module:t,entryPoint:"main"}}),this.decayParams=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}render(e,t,r,n,s=0){const o=this.device,u=At(e);o.queue.writeBuffer(this.computeParams,0,new Uint32Array([Ie,he,r,n]));const l=Math.sqrt(n/he)*40,f=new ArrayBuffer(32);new Float32Array(f,0,4).set([Ie,he,l,.9]),new Uint32Array(f,16,4).set([s,0,0,0]),o.queue.writeBuffer(this.renderParams,0,f);const d=o.createCommandEncoder(),v=Ie*he;o.queue.writeBuffer(this.decayParams,0,new Uint32Array([v,0,0,0]));const y=o.createBindGroup({layout:this.decayBGL,entries:[{binding:0,resource:{buffer:this.accumR}},{binding:1,resource:{buffer:this.decayParams}}]}),w=o.createBindGroup({layout:this.decayBGL,entries:[{binding:0,resource:{buffer:this.accumG}},{binding:1,resource:{buffer:this.decayParams}}]}),T=o.createBindGroup({layout:this.decayBGL,entries:[{binding:0,resource:{buffer:this.accumB}},{binding:1,resource:{buffer:this.decayParams}}]}),P=o.createBindGroup({layout:this.decayBGL,entries:[{binding:0,resource:{buffer:this.accumL}},{binding:1,resource:{buffer:this.decayParams}}]}),x=d.beginComputePass();x.setPipeline(this.decayPipeline),x.setBindGroup(0,y),x.dispatchWorkgroups(Math.ceil(v/256)),x.setBindGroup(0,w),x.dispatchWorkgroups(Math.ceil(v/256)),x.setBindGroup(0,T),x.dispatchWorkgroups(Math.ceil(v/256)),x.setBindGroup(0,P),x.dispatchWorkgroups(Math.ceil(v/256)),x.end();const G=o.createBindGroup({layout:this.computeBGL,entries:[{binding:0,resource:u},{binding:1,resource:{buffer:this.accumR}},{binding:2,resource:{buffer:this.accumG}},{binding:3,resource:{buffer:this.accumB}},{binding:4,resource:{buffer:this.computeParams}},{binding:5,resource:{buffer:this.accumL}}]}),S=d.beginComputePass();S.setPipeline(this.computePipeline),S.setBindGroup(0,G),S.dispatchWorkgroups(Math.ceil(r/16),Math.ceil(n/16)),S.end();const M=o.createBindGroup({layout:this.renderBGL,entries:[{binding:0,resource:{buffer:this.accumR}},{binding:1,resource:{buffer:this.accumG}},{binding:2,resource:{buffer:this.accumB}},{binding:3,resource:{buffer:this.renderParams}},{binding:4,resource:{buffer:this.accumL}}]}),$=d.beginRenderPass({colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.04,g:.04,b:.04,a:1}}]});$.setPipeline(this.renderPipeline),$.setBindGroup(0,M),$.draw(3),$.end(),o.queue.submit([d.finish()])}destroy(){const e=[this.accumR,this.accumG,this.accumB,this.accumL,this.computeParams,this.renderParams,this.decayParams];for(const t of e)t?.destroy()}}const Ar=`
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
`,kr=`
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
`;class Ir{device;computePipeline;renderPipeline;computeBGL;renderBGL;histR;histG;histB;histL;computeParams;renderParams;constructor(e,t){this.device=e,this.init(t)}init(e){const t=this.device,r=256*4;this.histR=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.histG=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.histB=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.histL=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.computeParams=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.renderParams=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.computeBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]});const n=t.createShaderModule({code:Ar});this.computePipeline=t.createComputePipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.computeBGL]}),compute:{module:n,entryPoint:"main"}}),this.renderBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});const s=t.createShaderModule({code:kr});this.renderPipeline=t.createRenderPipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.renderBGL]}),vertex:{module:s,entryPoint:"vs"},fragment:{module:s,entryPoint:"fs",targets:[{format:e}]}})}render(e,t,r,n,s=0){const o=this.device,u=At(e);o.queue.writeBuffer(this.computeParams,0,new Uint32Array([r,n,0,0])),o.queue.writeBuffer(this.renderParams,0,new Float32Array([r*n,s,0,0]));const l=o.createCommandEncoder();l.clearBuffer(this.histR),l.clearBuffer(this.histG),l.clearBuffer(this.histB),l.clearBuffer(this.histL);const f=o.createBindGroup({layout:this.computeBGL,entries:[{binding:0,resource:u},{binding:1,resource:{buffer:this.histR}},{binding:2,resource:{buffer:this.histG}},{binding:3,resource:{buffer:this.histB}},{binding:4,resource:{buffer:this.histL}},{binding:5,resource:{buffer:this.computeParams}}]}),d=l.beginComputePass();d.setPipeline(this.computePipeline),d.setBindGroup(0,f),d.dispatchWorkgroups(Math.ceil(r/16),Math.ceil(n/16)),d.end();const v=o.createBindGroup({layout:this.renderBGL,entries:[{binding:0,resource:{buffer:this.histR}},{binding:1,resource:{buffer:this.histG}},{binding:2,resource:{buffer:this.histB}},{binding:3,resource:{buffer:this.histL}},{binding:4,resource:{buffer:this.renderParams}}]}),y=l.beginRenderPass({colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.04,g:.04,b:.04,a:1}}]});y.setPipeline(this.renderPipeline),y.setBindGroup(0,v),y.draw(3),y.end(),o.queue.submit([l.finish()])}destroy(){const e=[this.histR,this.histG,this.histB,this.histL,this.computeParams,this.renderParams];for(const t of e)t?.destroy()}}const Lr=`
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
`,Vr=`
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
`,Q=512;class Rr{device;computePipeline;renderPipeline;computeBGL;renderBGL;accumR;accumG;accumB;computeParams;renderParams;constructor(e,t){this.device=e,this.init(t)}init(e){const t=this.device,r=Q*Q*4;this.accumR=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.accumG=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.accumB=t.createBuffer({size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.computeParams=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.renderParams=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.computeBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]});const n=t.createShaderModule({code:Lr});this.computePipeline=t.createComputePipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.computeBGL]}),compute:{module:n,entryPoint:"main"}}),this.renderBGL=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});const s=t.createShaderModule({code:Vr});this.renderPipeline=t.createRenderPipeline({layout:t.createPipelineLayout({bindGroupLayouts:[this.renderBGL]}),vertex:{module:s,entryPoint:"vs"},fragment:{module:s,entryPoint:"fs",targets:[{format:e}]}})}render(e,t,r,n){const s=this.device,o=At(e);s.queue.writeBuffer(this.computeParams,0,new Uint32Array([Q,r,n,0]));const u=Math.sqrt(n*r/(Q*Q))*18;s.queue.writeBuffer(this.renderParams,0,new Float32Array([Q,u,0,0]));const l=s.createCommandEncoder();l.clearBuffer(this.accumR),l.clearBuffer(this.accumG),l.clearBuffer(this.accumB);const f=s.createBindGroup({layout:this.computeBGL,entries:[{binding:0,resource:o},{binding:1,resource:{buffer:this.accumR}},{binding:2,resource:{buffer:this.accumG}},{binding:3,resource:{buffer:this.accumB}},{binding:4,resource:{buffer:this.computeParams}}]}),d=l.beginComputePass();d.setPipeline(this.computePipeline),d.setBindGroup(0,f),d.dispatchWorkgroups(Math.ceil(r/16),Math.ceil(n/16)),d.end();const v=s.createBindGroup({layout:this.renderBGL,entries:[{binding:0,resource:{buffer:this.accumR}},{binding:1,resource:{buffer:this.accumG}},{binding:2,resource:{buffer:this.accumB}},{binding:3,resource:{buffer:this.renderParams}}]}),y=l.beginRenderPass({colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.04,g:.04,b:.04,a:1}}]});y.setPipeline(this.renderPipeline),y.setBindGroup(0,v),y.draw(3),y.end(),s.queue.submit([l.finish()])}destroy(){const e=[this.accumR,this.accumG,this.accumB,this.computeParams,this.renderParams];for(const t of e)t?.destroy()}}class Or{waveform;histogram;vectorscope;constructor(e,t){this.waveform=new _r(e,t),this.histogram=new Ir(e,t),this.vectorscope=new Rr(e,t)}renderWaveform(e,t,r,n,s=0){this.waveform.render(e,t,r,n,s)}renderHistogram(e,t,r,n,s=0){this.histogram.render(e,t,r,n,s)}renderVectorscope(e,t,r,n){this.vectorscope.render(e,t,r,n)}destroy(){this.waveform.destroy(),this.histogram.destroy(),this.vectorscope.destroy()}}const Je="rgba8unorm";class kt{device;gpuContext;presentationFormat;sampler;effectsPipeline;outputPipeline;videoTexture=null;videoView=null;videoWidth=0;videoHeight=0;canvasWidth=0;canvasHeight=0;transformPipeline;copyPipeline;pingPongView=null;scopeRenderer;scopeContexts;exportOffscreen=null;exportGpuContext=null;exportPingPong=null;exportCanvasW=0;exportCanvasH=0;constructor(e,t,r,n,s,o,u,l,f,d){this.device=e,this.gpuContext=t,this.presentationFormat=r,this.sampler=n,this.effectsPipeline=s,this.outputPipeline=o,this.transformPipeline=l,this.copyPipeline=u,this.scopeRenderer=f,this.scopeContexts=d}static async create(e,t={}){const r=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!r)throw new Error("No WebGPU adapter");const n=await r.requestDevice(),s=e.getContext("webgpu");if(!s)throw new Error("Could not get WebGPU canvas context");const o=navigator.gpu.getPreferredCanvasFormat(),u=Ct.create(n),l=Mt.create(n),f=Et.create(n,Je),d=_t.create(n,Je),v=n.createSampler({label:"linear-clamp",magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),w=!!(t.histogram||t.waveform||t.vectorscope)?new Or(n,o):null,T=P=>{P&&P.configure({device:n,format:o,alphaMode:"premultiplied"})};return T(t.histogram??null),T(t.waveform??null),T(t.vectorscope??null),new kt(n,s,o,v,u,l,f,d,w,t)}configureSurface(){this.gpuContext.configure({device:this.device,format:this.presentationFormat,alphaMode:"premultiplied"})}releaseWorkTextures(){this.videoTexture?.destroy(),this.videoTexture=null,this.videoView=null,this.videoWidth=0,this.videoHeight=0,this.pingPongView?.destroy(),this.pingPongView=null,this.canvasWidth=0,this.canvasHeight=0,this.exportPingPong?.destroy(),this.exportPingPong=null,this.exportCanvasW=0,this.exportCanvasH=0,this.exportOffscreen=null,this.exportGpuContext=null,this.outputPipeline.invalidateCache()}ensureVideoTexture(e,t){e===this.videoWidth&&t===this.videoHeight&&this.videoTexture&&this.videoView||(this.videoTexture?.destroy(),this.videoWidth=e,this.videoHeight=t,this.videoTexture=this.device.createTexture({label:"video-rgba",size:[e,t],format:Je,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.videoView=this.videoTexture.createView())}ensurePreviewPingPong(e,t){e===this.canvasWidth&&t===this.canvasHeight||(this.pingPongView?.destroy(),this.canvasWidth=e,this.canvasHeight=t,this.pingPongView=new Ft(this.device,e,t),this.outputPipeline.invalidateCache())}ensureExportSurface(e,t){if(this.exportOffscreen||(this.exportOffscreen=new OffscreenCanvas(e,t),this.exportGpuContext=this.exportOffscreen.getContext("webgpu")),!this.exportGpuContext)throw new Error("OffscreenCanvas WebGPU context is not available");this.exportOffscreen.width=e,this.exportOffscreen.height=t,this.exportGpuContext.configure({device:this.device,format:this.presentationFormat,alphaMode:"premultiplied"})}ensureExportPingPong(e,t){e===this.exportCanvasW&&t===this.exportCanvasH&&this.exportPingPong||(this.exportPingPong?.destroy(),this.exportCanvasW=e,this.exportCanvasH=t,this.exportPingPong=new Ft(this.device,e,t),this.outputPipeline.invalidateCache())}recordRenderPasses(e,t,r,n,s,o,u,l,f){if(!this.videoView)throw new Error("Video upload texture is not allocated");const d={encoder:e,sampler:this.sampler};this.copyPipeline.setOptions(r,n,s,o,u),this.transformPipeline.setOptions(r,n,s,o,u),this.effectsPipeline.setOptions(r,n,s,o,u),this.outputPipeline.setOptions(r,n,s,o,u),this.copyPipeline.gpuRender({...d,inputView:t,outputView:this.videoView}),this.transformPipeline.gpuRender({...d,inputView:this.videoView,outputView:l.ping});const v=this.effectsPipeline.gpuRender({...d,inputView:l.ping,outputView:l.pong});return this.outputPipeline.gpuRender({...d,inputView:v,outputView:f}),v}renderVideoFrame(e,t,r,n,s){const o=t.displayWidth,u=t.displayHeight;if(o<1||u<1){t.close(),n();return}const l=e.width,f=e.height;if(l<1||f<1){t.close(),n();return}if(this.configureSurface(),this.ensureVideoTexture(o,u),this.ensurePreviewPingPong(l,f),!this.videoView||!this.pingPongView){t.close(),n();return}let d;try{d=this.device.importExternalTexture({source:t})}catch(P){s(String(P)),t.close(),n();return}const v=this.device.createCommandEncoder({label:"frame"}),y=this.recordRenderPasses(v,d,r,l,f,o,u,this.pingPongView,this.gpuContext.getCurrentTexture().createView());this.device.queue.submit([v.finish()]);const w=this.scopeRenderer;if(w){const{histogram:P,waveform:x,vectorscope:G}=this.scopeContexts;P&&w.renderHistogram(y,P,l,f,0),x&&w.renderWaveform(y,x,l,f,0),G&&w.renderVectorscope(y,G,l,f)}const T=this.device.queue.onSubmittedWorkDone?.();T?T.then(()=>{t.close(),n()}):(t.close(),n())}async renderToOffscreenVideoFrameZeroCopy(e,t,r,n){const s=e.displayWidth,o=e.displayHeight,u=e.timestamp??Math.round(performance.now()*1e3),l=e.duration;if(s<1||o<1)throw e.close(),new Error("Source VideoFrame has invalid display size");if(r<1||n<1)throw e.close(),new Error("Invalid export dimensions");if(this.ensureVideoTexture(s,o),this.ensureExportSurface(r,n),this.ensureExportPingPong(r,n),!this.videoView||!this.exportPingPong||!this.exportOffscreen||!this.exportGpuContext)throw e.close(),new Error("Export GPU resources are not ready");let f;try{f=this.device.importExternalTexture({source:e})}catch(w){throw e.close(),w}const d=this.device.createCommandEncoder({label:"export-zero-copy"});this.recordRenderPasses(d,f,t,r,n,s,o,this.exportPingPong,this.exportGpuContext.getCurrentTexture().createView()),this.device.queue.submit([d.finish()]);const v=this.device.queue.onSubmittedWorkDone?.();v&&await v,e.close();const y={timestamp:u};return l!=null&&Number.isFinite(l)&&(y.duration=l),new VideoFrame(this.exportOffscreen,y)}}const gi=document.querySelector("#status"),vi=document.querySelector("#canvas"),Fr=document.querySelector("#video"),zr=document.querySelector("#file"),Wr=document.querySelector("#exportWebm"),Dr=document.querySelector("#scopeHistogram"),Nr=document.querySelector("#scopeWaveform"),Hr=document.querySelector("#scopeVectorscope"),qr=Dr?.getContext("webgpu")??null,Yr=Nr?.getContext("webgpu")??null,Xr=Hr?.getContext("webgpu")??null,Kr=document.querySelector("#outputMode"),Zr=document.querySelector("#effectType"),$r=document.querySelector("#mirrorH"),jr=document.querySelector("#mirrorV"),Qr=document.querySelector("#paramALabel"),Jr=document.querySelector("#paramA"),ea=document.querySelector("#paramAVal"),ta=document.querySelector("#paramBLabel"),ia=document.querySelector("#paramB"),ra=document.querySelector("#paramBVal"),aa=document.querySelector("#paramCLabel"),na=document.querySelector("#paramC"),sa=document.querySelector("#paramCVal"),oa=document.querySelector("#opacity"),ua=document.querySelector("#opacityVal"),la=document.querySelector("#posX"),ca=document.querySelector("#posXVal"),da=document.querySelector("#posY"),pa=document.querySelector("#posYVal"),ha=document.querySelector("#posZ"),fa=document.querySelector("#posZVal"),ma=document.querySelector("#scaleX"),ga=document.querySelector("#scaleXVal"),va=document.querySelector("#scaleY"),ya=document.querySelector("#scaleYVal"),ba=document.querySelector("#rotX"),xa=document.querySelector("#rotXVal"),wa=document.querySelector("#rotY"),Sa=document.querySelector("#rotYVal"),Pa=document.querySelector("#rotZ"),Ta=document.querySelector("#rotZVal"),Ga=document.querySelector("#perspective"),Ba=document.querySelector("#perspectiveVal"),zt=document.querySelector("#motionPanel"),yi=zt?new Hi(zt):void 0,Wt=document.querySelector("#perfFps"),Dt=document.querySelector("#perfGpuMs"),Nt=document.querySelector("#perfPrepMs"),Ht=document.querySelector("#perfRes"),Ca=Wt&&Dt&&Nt&&Ht?new ji({fps:Wt,gpuMs:Dt,prepMs:Nt,resolution:Ht}):void 0;if(!navigator.gpu)throw gi.textContent="WebGPU is not available here. Try a recent Chromium-based browser with GPU acceleration enabled.",new Error("no webgpu");const bi=await kt.create(vi,{histogram:qr,waveform:Yr,vectorscope:Xr}),xi=new $i(bi.device),wi=await xi.initialize();wi||yi?.setError("Optical flow: GPU initialization failed (check the console).");const Ua=new zi(bi,{statusEl:gi,canvas:vi,video:Fr,fileInput:zr,exportWebmBtn:Wr,opacityInput:oa,opacityVal:ua,posXInput:la,posXVal:ca,posYInput:da,posYVal:pa,posZInput:ha,posZVal:fa,scaleXInput:ma,scaleXVal:ga,scaleYInput:va,scaleYVal:ya,rotXInput:ba,rotXVal:xa,rotYInput:wa,rotYVal:Sa,rotZInput:Pa,rotZVal:Ta,perspectiveInput:Ga,perspectiveVal:Ba,outputModeSelect:Kr,effectSelect:Zr,mirrorHInput:$r,mirrorVInput:jr,paramALabel:Qr,paramAInput:Jr,paramAVal:ea,paramBLabel:ta,paramBInput:ia,paramBVal:ra,paramCLabel:aa,paramCInput:na,paramCVal:sa,motionViz:yi,perfHud:Ca},wi?xi:null);Ua.start();
