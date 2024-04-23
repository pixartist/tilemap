/*!
 * @pixi/tilemap - v6.0.1
 * Compiled Tue, 23 Apr 2024 12:54:27 UTC
 *
 * @pixi/tilemap is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 * 
 * Copyright 2024, Ivan Popelyshev, All Rights Reserved
 */import{Geometry as xe,Buffer as re,BufferUsage as X,UniformGroup as se,Matrix as Te,ExtensionType as Y,Texture as ne,BindGroup as fe,Shader as de,GlProgram as be,GpuProgram as ge,Container as ce,State as ye,Bounds as Ae,TextureSource as we,groupD8 as y,extensions as oe}from"pixi.js";const M={TEXTURES_PER_TILEMAP:16,TEXTILE_SCALE_MODE:"linear",use32bitIndex:!1},Ce=M;var Pe=Object.defineProperty,Me=(r,e,t)=>e in r?Pe(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,I=(r,e,t)=>(Me(r,typeof e!="symbol"?e+"":e,t),t);const S=class L extends xe{constructor(e){const t=new re({data:new Float32Array(2),label:"tilemap-buffer",usage:X.VERTEX|X.COPY_DST,shrinkToFit:!1}),i=L.stride;super({indexBuffer:e,attributes:{aVertexPosition:{buffer:t,format:"float32x2",stride:i,offset:0},aTextureCoord:{buffer:t,format:"float32x2",stride:i,offset:2*4},aFrame:{buffer:t,format:"float32x4",stride:i,offset:4*4},aAnim:{buffer:t,format:"float32x2",stride:i,offset:8*4},aTextureId:{buffer:t,format:"sint32",stride:i,offset:10*4},aAnimDivisor:{buffer:t,format:"float32",stride:i,offset:11*4},aColMul:{buffer:t,format:"float32x4",stride:i,offset:12*4}}}),I(this,"lastTimeAccess",0),I(this,"vertSize",L.vertSize),I(this,"vertPerQuad",L.vertPerQuad),I(this,"stride",L.stride),I(this,"buf"),this.buf=t}};I(S,"vertSize",13),I(S,"vertPerQuad",4),I(S,"stride",S.vertSize*4);let me=S;var Ie=Object.defineProperty,Ee=(r,e,t)=>e in r?Ie(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,E=(r,e,t)=>(Ee(r,typeof e!="symbol"?e+"":e,t),t);class ae{constructor(){E(this,"pipe_uniforms",new se({u_proj_trans:{value:new Te,type:"mat3x3<f32>"},u_anim_frame:{value:new Float32Array(2),type:"vec2<f32>"}}))}}class ue{constructor(e,t){E(this,"renderer"),E(this,"tileAnim",[0,0]),E(this,"ibLen",0),E(this,"indexBuffer",null),E(this,"shader",null),E(this,"adaptor"),this.renderer=e,this.adaptor=t,this.adaptor.init(),this.indexBuffer=new re({data:new Uint16Array([0,1,2,0,2,3]),label:"index-tilemap-buffer",usage:X.INDEX|X.COPY_DST}),this.checkIndexBuffer(2e3)}start(){}createVb(){if(!this.indexBuffer)throw new Error("Index buffer is not initialized");const e=new me(this.indexBuffer);return e.lastTimeAccess=Date.now(),e}getShader(){return this.shader}destroy(){this.shader=null}checkIndexBuffer(e){if(!this.indexBuffer)throw new Error("Index buffer is not initialized");const t=e*6;if(t<=this.ibLen)return;let i=t;for(;i<t;)i<<=1;this.ibLen=t,this.indexBuffer.data=Be(e,M.use32bitIndex?new Uint32Array(t):new Uint16Array(t))}destroyRenderable(e){var t;(t=e.vb)==null||t.destroy(!0),e.vb=null}addRenderable(e,t){const i=this.renderer.renderPipes.batch;if(e.updateBuffer(this),e.checkValid(),e.getTileset().update(),e.is_valid){if(!t)throw new Error("Instruction set is not initialized");i.break(t),t.add(e._instruction)}}updateRenderable(e,t){e.updateBuffer(this),e.getTileset().update()}validateRenderable(e){return e.checkValid()}execute({tilemap:e}){if(!e.isRenderable)return;e.state.blendMode=e.groupBlendMode;const{pipe_uniforms:t}=this.adaptor,i=t.uniforms.u_proj_trans,n=this.renderer.globalUniforms._activeUniforms.at(-1).uniforms;let a=this.tileAnim;const{u_anim_frame:u}=t.uniforms;n.uProjectionMatrix.copyTo(i).append(n.uWorldTransformMatrix).append(e.worldTransform),e.compositeParent&&(a=e.parent.tileAnim||a),u[0]=a[0],u[1]=a[1],t.update(),this.adaptor.execute(this,e)}}E(ue,"extension",{type:[Y.WebGLPipes,Y.WebGPUPipes],name:"tilemap"});function Be(r,e){const t=r*6;if(e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let i=0,n=0;i<t;i+=6,n+=4)e[i+0]=n+0,e[i+1]=n+1,e[i+2]=n+2,e[i+3]=n+0,e[i+4]=n+2,e[i+5]=n+3;return e}var Oe=Object.defineProperty,Fe=(r,e,t)=>e in r?Oe(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,C=(r,e,t)=>(Fe(r,typeof e!="symbol"?e+"":e,t),t);class O{constructor(e){C(this,"max_textures"),C(this,"arr",[]),C(this,"count",0),C(this,"dirty",!1),C(this,"dirty_gpu",!1),C(this,"bind_group",null),C(this,"bind_group_resources",{}),C(this,"tex_sizes",null),C(this,"null_color",new Float32Array([0,0,0,.5])),C(this,"tex_buf",null),this.max_textures=e,this.tex_sizes=new Float32Array(this.max_textures*4+4),this.tex_buf=new re({usage:X.UNIFORM|X.COPY_DST})}get length(){return this.count}push(e){this.arr[this.count++]=e,this.dirty=!0}at(e){return this.arr[e]}update(){if(!this.dirty)return;this.dirty=!1,this.dirty_gpu=!0;const{tex_sizes:e,arr:t,count:i,max_textures:n,null_color:a}=this;if(!e)throw new Error("Texture sizes buffer is not initialized");for(let u=0;u<i;u++){const l=t[u];l&&(e[u*4]=l.pixelWidth,e[u*4+1]=l.pixelHeight,e[u*4+2]=1/l.pixelWidth,e[u*4+3]=1/l.pixelHeight)}e[n*4]=a[0],e[n*4+1]=a[1],e[n*4+2]=a[2],e[n*4+3]=a[3]}markDirty(){this.dirty=!0}getBindGroup(){if(this.update(),!this.dirty_gpu)return this.bind_group;const{bind_group_resources:e,max_textures:t,arr:i,count:n}=this;let a=0;e[a++]=new se({u_texture_size:{value:this.tex_sizes,type:"vec4<f32>",size:t},u_null_color:{value:this.null_color,type:"vec4<f32>"}});for(let u=0;u<t;u++){const l=(u<n?i[u]:null)||ne.EMPTY.source;e[a++]=l.source,e[a++]=l.style}return this.bind_group||(this.bind_group=new fe(e)),this.bind_group}static generate_gpu_textures(e){const t=[];t.push("struct TextureArrayFields {"),t.push(`    u_texture_size: array<vec4f, ${e}>,`),t.push("    u_null_color: vec4f"),t.push("}"),t.push("@group(1) @binding(0) var<uniform> taf: TextureArrayFields;");for(let i=0;i<e;i++)t.push(`@group(1) @binding(${i*2+1}) var u_texture_${i}: texture_2d<f32>;`),t.push(`@group(1) @binding(${i*2+2}) var u_sampler_${i}: sampler;`);t.push("fn sampleMultiTexture(texture_id: i32, uv: vec2f, dx: vec2f, dy: vec2f) -> vec4f {"),t.push("switch texture_id {");for(let i=0;i<e;i++)t.push(`  case ${i}: { return textureSampleGrad(u_texture_${i}, u_sampler_${i}, uv, dx, dy); }`);return t.push("  default: { return taf.u_null_color; }"),t.push("} }"),t.join(`
`)}static generate_gl_textures(e){const t=[];t.push(`uniform vec4 u_texture_size[${e+1}];`),t.push(`uniform sampler2D u_textures[${e}];`),t.push("uniform vec4 u_null_color;"),t.push("vec4 sampleMultiTexture(float texture_id, vec2 uv) {"),t.push(`if(texture_id < -0.5) return u_texture_size[${e}];`);for(let i=0;i<e;i++)t.push(`if(texture_id < ${i}.5) return texture(u_textures[${i}], uv * u_texture_size[${i}].zw);`);return t.push(`return u_texture_size[${e}];`),t.push("}"),t.join(`
`)}static gl_gen_resources(e){const t=[];for(let n=0;n<e;n++)t[n]=n;const i=[];for(let n=0;n<e;n++)i.push(2048),i.push(2048),i.push(1/2048),i.push(1/2048);return{u_textures:{value:t,type:"i32",size:e},u_texture_size:{value:i,type:"vec4<f32>",size:e}}}}var Re=Object.defineProperty,ze=(r,e,t)=>e in r?Re(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,le=(r,e,t)=>(ze(r,typeof e!="symbol"?e+"":e,t),t);const Ue=`
in vec2 aVertexPosition;
in vec2 aTextureCoord;
in vec4 aFrame;
in vec2 aAnim;
in float aAnimDivisor;
in float aTextureId;
in vec4 aColMul;

uniform mat3 u_proj_trans;
uniform vec2 u_anim_frame;

out vec2 vTextureCoord;
out float vTextureId;
out vec4 vFrame;
out vec4 vColMul;

void main(void)
{
  gl_Position = vec4((u_proj_trans * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
  vec2 animCount = floor((aAnim + 0.5) / 2048.0);
  vec2 animFrameOffset = aAnim - animCount * 2048.0;
  vec2 currentFrame = floor(u_anim_frame / aAnimDivisor);
  vec2 loop_num = floor((currentFrame + 0.5) / animCount);
  vec2 animOffset = animFrameOffset * floor(currentFrame - loop_num * animCount);

  vTextureCoord = aTextureCoord + animOffset;
  vFrame = aFrame + vec4(animOffset, animOffset);
  vTextureId = aTextureId;
  vColMul = aColMul;
}
`,Xe=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
in vec2 vTextureCoord;
in vec4 vFrame;
in float vTextureId;
in vec4 vColMul;

//include_textures

void main(void)
{
  float textureId = floor(vTextureId + 0.5);
  vec2 textureCoord = clamp(vTextureCoord, vFrame.xy, vFrame.zw);
  vec4 color = sampleMultiTexture(textureId, textureCoord);
  finalColor = color * vColMul;
}
`;class pe extends ae{constructor(){super(...arguments),le(this,"_shader",null),le(this,"max_textures",M.TEXTURES_PER_TILEMAP)}destroy(){var e;(e=this._shader)==null||e.destroy(!0),this._shader=null}execute(e,t){const i=e.renderer,n=this._shader,a=t.getTileset(),u=n==null?void 0:n.resources.texture_uniforms;u.uniforms.u_texture_size!==a.tex_sizes&&(u.uniforms.u_texture_size=a.tex_sizes,u.update());for(let l=0;l<a.length;l++)i.texture.bind(a.arr[l],l);if(n){if(!t.vb)throw new Error("Tilemap vertex buffer is not initialized");i.encoder.draw({geometry:t.vb,shader:n,state:t.state,size:t.rects_count*6})}else throw new Error("Shader is not initialized")}init(){this._shader=new de({glProgram:be.from({vertex:Ue,fragment:Xe.replace("//include_textures",O.generate_gl_textures(this.max_textures))}),resources:{texture_uniforms:new se(O.gl_gen_resources(this.max_textures),{isStatic:!0}),pipe_uniforms:this.pipe_uniforms.uniformStructures}})}}le(pe,"extension",{type:[Y.WebGLPipesAdaptor],name:"tilemap"});var Se=Object.defineProperty,Ge=(r,e,t)=>e in r?Se(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,N=(r,e,t)=>(Ge(r,typeof e!="symbol"?e+"":e,t),t);const Le=`
struct GlobalUniforms {
  uProjectionMatrix:mat3x3f,
  uWorldTransformMatrix:mat3x3f,
  uWorldColorAlpha: vec4f,
  uResolution: vec2f,
}

struct TilemapUniforms {
  u_proj_trans:mat3x3f,
  u_anim_frame:vec2f
}

@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
@group(2) @binding(0) var<uniform> loc: TilemapUniforms;

struct VSOutput {
  @builtin(position) vPosition: vec4f,
  @location(0) @interpolate(flat) vTextureId : i32,
  @location(1) vTextureCoord : vec2f,
  @location(2) @interpolate(flat) vFrame : vec4f,
  @location(3) vColMul : vec4f
};

@vertex
fn mainVert(
   @location(6) aVertexPosition: vec2f,
   @location(4) aTextureCoord: vec2f,
   @location(3) aFrame: vec4f,
   @location(1) aAnim: vec2f,
   @location(2) aAnimDivisor: f32,
   @location(5) aTextureId: i32,
   @location(0) aColMul: vec4f,
 ) -> VSOutput {

  var vPosition = vec4((loc.u_proj_trans * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
  var animCount = floor((aAnim + 0.5) / 2048.0);
  var animFrameOffset = aAnim - animCount * 2048.0;
  var currentFrame = floor(loc.u_anim_frame / aAnimDivisor);
  var loop_num = floor((currentFrame + 0.5) / animCount);
  var animOffset = animFrameOffset * floor(currentFrame - loop_num * animCount);
  var vTextureCoord = aTextureCoord + animOffset;
  var vFrame = aFrame + vec4(animOffset, animOffset);

  return VSOutput(vPosition, aTextureId, vTextureCoord, vFrame, aColMul);
};
`,Ve=`
//include_textures

@fragment
fn mainFrag(
  @location(0) @interpolate(flat) vTextureId : i32,
  @location(1) vTextureCoord : vec2f,
  @location(2) @interpolate(flat) vFrame : vec4f,
  @location(3) vColMul : vec4f,
  ) -> @location(0) vec4f {
  var textureCoord = clamp(vTextureCoord, vFrame.xy, vFrame.zw);
  var uv = textureCoord * taf.u_texture_size[vTextureId].zw;
  var dx = dpdx(uv);
  var dy = dpdy(uv);
  var color = sampleMultiTexture(vTextureId, uv, dx, dy);
  return color * vColMul;
};
`;class ve extends ae{constructor(){super(...arguments),N(this,"_shader",null),N(this,"max_textures",M.TEXTURES_PER_TILEMAP),N(this,"bind_group",null)}destroy(){var e;(e=this._shader)==null||e.destroy(!0),this._shader=null}execute(e,t){const i=e.renderer,n=this._shader;if(n){const a=t.getTileset().getBindGroup(),u=this.bind_group;if(!a||!u)throw new Error("Tileset or self bind group is not initialized");if(n.groups[0]=i.globalUniforms.bindGroup,n.groups[1]=a,n.groups[2]=u,!t.vb)throw new Error("Tilemap vertex buffer is not initialized");i.encoder.draw({geometry:t.vb,shader:n,state:t.state,size:t.rects_count*6})}else throw new Error("Shader or bind group is not initialized")}init(){this._shader=new de({gpuProgram:ge.from({vertex:{source:Le,entryPoint:"mainVert"},fragment:{source:Ve.replace("//include_textures",O.generate_gpu_textures(this.max_textures))}})}),this.bind_group=new fe({ut:this.pipe_uniforms})}}N(ve,"extension",{type:[Y.WebGPUPipesAdaptor],name:"tilemap"});var De=Object.defineProperty,$e=(r,e,t)=>e in r?De(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,p=(r,e,t)=>($e(r,typeof e!="symbol"?e+"":e,t),t),_e=(r=>(r[r.U=0]="U",r[r.V=1]="V",r[r.X=2]="X",r[r.Y=3]="Y",r[r.TILE_WIDTH=4]="TILE_WIDTH",r[r.TILE_HEIGHT=5]="TILE_HEIGHT",r[r.ROTATE=6]="ROTATE",r[r.ANIM_X=7]="ANIM_X",r[r.ANIM_Y=8]="ANIM_Y",r[r.TEXTURE_INDEX=9]="TEXTURE_INDEX",r[r.ANIM_COUNT_X=10]="ANIM_COUNT_X",r[r.ANIM_COUNT_Y=11]="ANIM_COUNT_Y",r[r.ANIM_DIVISOR=12]="ANIM_DIVISOR",r[r.COL_R=13]="COL_R",r[r.COL_G=14]="COL_G",r[r.COL_B=15]="COL_B",r[r.COL_A=16]="COL_A",r))(_e||{});const T=Object.keys(_e).length/2;class he extends ce{constructor(e){super(),p(this,"shadowColor",new Float32Array([0,0,0,.5])),p(this,"state",ye.for2d()),p(this,"is_valid",!1),p(this,"renderPipeId","tilemap"),p(this,"canBundle",!0),p(this,"_instruction",{renderPipeId:"tilemap",tilemap:this}),p(this,"tileAnim",null),p(this,"rects_count",0),p(this,"compositeParent",!1),p(this,"tileset",new O(M.TEXTURES_PER_TILEMAP)),p(this,"tilemapBounds",new Ae),p(this,"hasAnimatedTile",!1),p(this,"pointsBuf",[]),p(this,"vbId",0),p(this,"vb",null),p(this,"vbBuffer",null),p(this,"vbArray",null),p(this,"vbInts",null),this.setTileset(e)}checkValid(){const e=this.tileset.count>0&&this.pointsBuf.length>0,t=this.is_valid!==e;return this.is_valid=e,t!==e}getTileset(){return this.tileset}setTileset(e=[]){var t,i;let n=this.tileset;if(e instanceof O)this.tileset=e,this.didViewUpdate=!0;else if(e instanceof we){if(n.count===1&&n.arr[0]===e)return this;n=this.tileset=new O(M.TEXTURES_PER_TILEMAP),n.push(e),this.didViewUpdate=!0}else{if(e.length===n.count){let a=!0;for(let u=0;u<e.length;u++)if(((t=e[u])==null?void 0:t.source)!==n.arr[u]){a=!1;break}if(a)return this}n=this.tileset=new O(M.TEXTURES_PER_TILEMAP);for(let a=0;a<e.length;a++)n.push((i=e[a])==null?void 0:i.source);this.didViewUpdate=!0}return this}clear(){return this.pointsBuf.length=0,this.rects_count=0,this.tilemapBounds.clear(),this.hasAnimatedTile=!1,this}tile(e,t,i,n={}){var a,u,l,s;this.didViewUpdate=!0;let d,o=-1,b=!1;if(typeof e=="number")o=e,b=!0,d=this.tileset.arr[o];else{let g;typeof e=="string"?g=ne.from(e):g=e;const B=this.tileset;for(let P=0;P<B.count;P++)if(B.arr[P]===g.source){o=P;break}"frame"in g&&(n.u=(a=n.u)!=null?a:g.frame.x,n.v=(u=n.v)!=null?u:g.frame.y,n.tileWidth=(l=n.tileWidth)!=null?l:g.orig.width,n.tileHeight=(s=n.tileHeight)!=null?s:g.orig.height),d=g.source}if(!b&&!d)return console.error("The tile texture was not found in the tilemap tileset."),this;const{u:h=0,v:A=0,tileWidth:w=d.width,tileHeight:v=d.height,animX:_=0,animY:m=0,rotate:x=0,animCountX:c=1024,animCountY:k=1024,animDivisor:j=1,colR:W=1,colG:H=1,colB:F=1,colA:R=1}=n,f=this.pointsBuf;return this.hasAnimatedTile=this.hasAnimatedTile||_>0||m>0,f.push(h),f.push(A),f.push(t),f.push(i),f.push(w),f.push(v),f.push(x),f.push(_|0),f.push(m|0),f.push(o),f.push(c),f.push(k),f.push(j),f.push(W),f.push(H),f.push(F),f.push(R),this.tilemapBounds.addFrame(t,i,t+w,i+v),this}tileRotate(e){const t=this.pointsBuf;t[t.length-(T-9)]=e}tileAnimX(e,t){const i=this.pointsBuf;i[i.length-(T-7)]=e,i[i.length-(T-10)]=t}tileAnimY(e,t){const i=this.pointsBuf;i[i.length-(T-8)]=e,i[i.length-(T-11)]=t}tileAnimDivisor(e){const t=this.pointsBuf;t[t.length-(T-12)]=e}tileR(e){const t=this.pointsBuf;t[t.length-(T-13)]=e}tileG(e){const t=this.pointsBuf;t[t.length-(T-14)]=e}tileB(e){const t=this.pointsBuf;t[t.length-(T-15)]=e}tileA(e){const t=this.pointsBuf;t[t.length-(T-16)]=e}destroyVb(){this.vb&&(this.vb.destroy(),this.vb=null)}updateBuffer(e){const t=this.pointsBuf,i=t.length/T;let n=this.vb;if(this.tileset.count===0||i===0||this.rects_count===i&&n)return;this.rects_count=i,n||(n=e.createVb(),this.vb=n,this.vbId=n.id,this.vbBuffer=null);const a=i*n.vertPerQuad;e.checkIndexBuffer(i);const u=n.getBuffer("aVertexPosition"),l=n.stride*a;if(!this.vbBuffer||this.vbBuffer.byteLength<l){let h=n.stride;for(;h<l;)h*=2;this.vbBuffer=new ArrayBuffer(h),this.vbArray=new Float32Array(this.vbBuffer),this.vbInts=new Uint32Array(this.vbBuffer)}const s=this.vbArray,d=this.vbInts;let o=0,b=0;for(let h=0;h<t.length;h+=T){this.compositeParent&&(b=t[h+9]);const A=t[h+2],w=t[h+3],v=t[h+4],_=t[h+5],m=t[h+0],x=t[h+1];let c=t[h+6];const k=t[h+7],j=t[h+8],W=t[h+10]||1024,H=t[h+11]||1024,F=k+W*2048,R=j+H*2048,f=t[h+12],g=t[h+13],B=t[h+14],P=t[h+15],V=t[h+16];let Q,Z,q,J,K,ee,te,ie;if(c===0)Q=m,Z=x,q=m+v,J=x,K=m+v,ee=x+_,te=m,ie=x+_;else{let z=v/2,U=_/2;c%4!==0&&(z=_/2,U=v/2);const D=m+z,$=x+U;c=y.add(c,y.NW),Q=D+z*y.uX(c),Z=$+U*y.uY(c),c=y.add(c,2),q=D+z*y.uX(c),J=$+U*y.uY(c),c=y.add(c,2),K=D+z*y.uX(c),ee=$+U*y.uY(c),c=y.add(c,2),te=D+z*y.uX(c),ie=$+U*y.uY(c)}if(s&&d)s[o++]=A,s[o++]=w,s[o++]=Q,s[o++]=Z,s[o++]=m+.5,s[o++]=x+.5,s[o++]=m+v-.5,s[o++]=x+_-.5,s[o++]=F,s[o++]=R,d[o++]=b,s[o++]=f,s[o++]=g,s[o++]=B,s[o++]=P,s[o++]=V,s[o++]=A+v,s[o++]=w,s[o++]=q,s[o++]=J,s[o++]=m+.5,s[o++]=x+.5,s[o++]=m+v-.5,s[o++]=x+_-.5,s[o++]=F,s[o++]=R,d[o++]=b,s[o++]=f,s[o++]=g,s[o++]=B,s[o++]=P,s[o++]=V,s[o++]=A+v,s[o++]=w+_,s[o++]=K,s[o++]=ee,s[o++]=m+.5,s[o++]=x+.5,s[o++]=m+v-.5,s[o++]=x+_-.5,s[o++]=F,s[o++]=R,d[o++]=b,s[o++]=f,s[o++]=g,s[o++]=B,s[o++]=P,s[o++]=V,s[o++]=A,s[o++]=w+_,s[o++]=te,s[o++]=ie,s[o++]=m+.5,s[o++]=x+.5,s[o++]=m+v-.5,s[o++]=x+_-.5,s[o++]=F,s[o++]=R,d[o++]=b,s[o++]=f,s[o++]=g,s[o++]=B,s[o++]=P,s[o++]=V;else throw new Error("Buffer is not initialized")}u.data=s!=null?s:new Float32Array}isModified(e){return!!(this.rects_count*T!==this.pointsBuf.length||e&&this.hasAnimatedTile)}clearModify(){this.rects_count=this.pointsBuf.length/T}addBounds(e){const t=this.tilemapBounds;e.addFrame(t.minX,t.minY,t.maxX,t.maxY)}get bounds(){return this.tilemapBounds}destroy(e){super.destroy(e),this.destroyVb()}addFrame(e,t,i,n,a){return this.tile(e,t,i,{animX:n,animY:a}),!0}addRect(e,t,i,n,a,u,l,s=0,d=0,o=0,b=1024,h=1024,A=1,w=1,v=1,_=1,m=1){return this.tile(e,n,a,{u:t,v:i,tileWidth:u,tileHeight:l,animX:s,animY:d,rotate:o,animCountX:b,animCountY:h,animDivisor:A,colR:w,colG:v,colB:_,colA:m})}}var Ye=Object.defineProperty,Ne=(r,e,t)=>e in r?Ye(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,G=(r,e,t)=>(Ne(r,typeof e!="symbol"?e+"":e,t),t);class ke extends ce{constructor(e){super(),G(this,"texturesPerTilemap"),G(this,"tileAnim",null),G(this,"lastModifiedTilemap",null),G(this,"modificationMarker",0),G(this,"setBitmaps",this.tileset),this.texturesPerTilemap=M.TEXTURES_PER_TILEMAP,this.tileset(e)}tileset(e){e||(e=[]);const t=this.texturesPerTilemap,i=this.children.length,n=Math.ceil(e.length/t);for(let a=0;a<Math.min(i,n);a++)this.children[a].setTileset(e.slice(a*t,(a+1)*t));for(let a=i;a<n;a++){const u=new he(e.slice(a*t,(a+1)*t));u.compositeParent=!0,this.addChild(u)}return this}clear(){for(let e=0;e<this.children.length;e++)this.children[e].clear();return this.modificationMarker=0,this}tileRotate(e){return this.lastModifiedTilemap&&this.lastModifiedTilemap.tileRotate(e),this}tileAnimX(e,t){return this.lastModifiedTilemap&&this.lastModifiedTilemap.tileAnimX(e,t),this}tileAnimY(e,t){return this.lastModifiedTilemap&&this.lastModifiedTilemap.tileAnimY(e,t),this}tileAnimDivisor(e){return this.lastModifiedTilemap&&this.lastModifiedTilemap.tileAnimDivisor(e),this}tile(e,t,i,n={}){let a=null;const u=this.children;if(this.lastModifiedTilemap=null,typeof e=="number"){const l=e/this.texturesPerTilemap>>0;let s=0;if(a=u[l],a)s=e%this.texturesPerTilemap;else{if(a=u[0],!a)return this;s=0}a.tile(s,t,i,n)}else{typeof e=="string"&&(e=ne.from(e));for(let l=0;l<u.length;l++){const s=u[l],d=s.getTileset().arr;for(let o=0;o<d.length;o++)if(d[o]===e.source){a=s;break}if(a)break}if(!a){for(let l=u.length-1;l>=0;l--){const s=u[l];if(s.getTileset().count<this.texturesPerTilemap){a=s,s.getTileset().push(e.source);break}}a||(a=new he(e.source),a.compositeParent=!0,this.addChild(a))}a.tile(e,t,i,n)}return this.lastModifiedTilemap=a,this}isModified(e){const t=this.children;if(this.modificationMarker!==t.length)return!0;for(let i=0;i<t.length;i++)if(t[i].isModified(e))return!0;return!1}clearModify(){const e=this.children;this.modificationMarker=e.length;for(let t=0;t<e.length;t++)e[t].clearModify()}addFrame(e,t,i,n,a,u,l,s,d,o,b,h){return this.tile(e,t,i,{animX:n,animY:a,animCountX:u,animCountY:l,animDivisor:s,colR:d,colG:o,colB:b,colA:h})}addRect(e,t,i,n,a,u,l,s,d,o,b,h){const A=e/this.texturesPerTilemap>>0,w=e%this.texturesPerTilemap;return this.children[A]&&this.children[A].getTileset().count>0?(this.lastModifiedTilemap=this.children[A],this.lastModifiedTilemap.addRect(w,t,i,n,a,u,l,s,d,o,b,h)):this.lastModifiedTilemap=null,this}get texPerChild(){return this.texturesPerTilemap}}oe.add(ue),oe.add(pe),oe.add(ve);export{ke as CompositeTilemap,Ce as Constant,T as POINT_STRUCT_SIZE,he as Tilemap,ae as TilemapAdaptor,me as TilemapGeometry,ue as TilemapPipe,M as settings};
//# sourceMappingURL=pixi-tilemap.mjs.map
