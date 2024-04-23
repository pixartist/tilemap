/*!
 * @pixi/tilemap - v6.0.1
 * Compiled Tue, 23 Apr 2024 12:54:27 UTC
 *
 * @pixi/tilemap is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 * 
 * Copyright 2024, Ivan Popelyshev, All Rights Reserved
 */this.PIXI=this.PIXI||{},this.PIXI.tilemap=function(w,u){"use strict";const C={TEXTURES_PER_TILEMAP:16,TEXTILE_SCALE_MODE:"linear",use32bitIndex:!1},fe=C;var he=Object.defineProperty,de=(i,e,t)=>e in i?he(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,E=(i,e,t)=>(de(i,typeof e!="symbol"?e+"":e,t),t);const D=class G extends u.Geometry{constructor(e){const t=new u.Buffer({data:new Float32Array(2),label:"tilemap-buffer",usage:u.BufferUsage.VERTEX|u.BufferUsage.COPY_DST,shrinkToFit:!1}),r=G.stride;super({indexBuffer:e,attributes:{aVertexPosition:{buffer:t,format:"float32x2",stride:r,offset:0},aTextureCoord:{buffer:t,format:"float32x2",stride:r,offset:2*4},aFrame:{buffer:t,format:"float32x4",stride:r,offset:4*4},aAnim:{buffer:t,format:"float32x2",stride:r,offset:8*4},aTextureId:{buffer:t,format:"sint32",stride:r,offset:10*4},aAnimDivisor:{buffer:t,format:"float32",stride:r,offset:11*4},aColMul:{buffer:t,format:"float32x4",stride:r,offset:12*4}}}),E(this,"lastTimeAccess",0),E(this,"vertSize",G.vertSize),E(this,"vertPerQuad",G.vertPerQuad),E(this,"stride",G.stride),E(this,"buf"),this.buf=t}};E(D,"vertSize",13),E(D,"vertPerQuad",4),E(D,"stride",D.vertSize*4);let oe=D;var ce=Object.defineProperty,me=(i,e,t)=>e in i?ce(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,B=(i,e,t)=>(me(i,typeof e!="symbol"?e+"":e,t),t);class Y{constructor(){B(this,"pipe_uniforms",new u.UniformGroup({u_proj_trans:{value:new u.Matrix,type:"mat3x3<f32>"},u_anim_frame:{value:new Float32Array(2),type:"vec2<f32>"}}))}}class k{constructor(e,t){B(this,"renderer"),B(this,"tileAnim",[0,0]),B(this,"ibLen",0),B(this,"indexBuffer",null),B(this,"shader",null),B(this,"adaptor"),this.renderer=e,this.adaptor=t,this.adaptor.init(),this.indexBuffer=new u.Buffer({data:new Uint16Array([0,1,2,0,2,3]),label:"index-tilemap-buffer",usage:u.BufferUsage.INDEX|u.BufferUsage.COPY_DST}),this.checkIndexBuffer(2e3)}start(){}createVb(){if(!this.indexBuffer)throw new Error("Index buffer is not initialized");const e=new oe(this.indexBuffer);return e.lastTimeAccess=Date.now(),e}getShader(){return this.shader}destroy(){this.shader=null}checkIndexBuffer(e){if(!this.indexBuffer)throw new Error("Index buffer is not initialized");const t=e*6;if(t<=this.ibLen)return;let r=t;for(;r<t;)r<<=1;this.ibLen=t,this.indexBuffer.data=pe(e,C.use32bitIndex?new Uint32Array(t):new Uint16Array(t))}destroyRenderable(e){var t;(t=e.vb)==null||t.destroy(!0),e.vb=null}addRenderable(e,t){const r=this.renderer.renderPipes.batch;if(e.updateBuffer(this),e.checkValid(),e.getTileset().update(),e.is_valid){if(!t)throw new Error("Instruction set is not initialized");r.break(t),t.add(e._instruction)}}updateRenderable(e,t){e.updateBuffer(this),e.getTileset().update()}validateRenderable(e){return e.checkValid()}execute({tilemap:e}){if(!e.isRenderable)return;e.state.blendMode=e.groupBlendMode;const{pipe_uniforms:t}=this.adaptor,r=t.uniforms.u_proj_trans,n=this.renderer.globalUniforms._activeUniforms.at(-1).uniforms;let a=this.tileAnim;const{u_anim_frame:l}=t.uniforms;n.uProjectionMatrix.copyTo(r).append(n.uWorldTransformMatrix).append(e.worldTransform),e.compositeParent&&(a=e.parent.tileAnim||a),l[0]=a[0],l[1]=a[1],t.update(),this.adaptor.execute(this,e)}}B(k,"extension",{type:[u.ExtensionType.WebGLPipes,u.ExtensionType.WebGPUPipes],name:"tilemap"});function pe(i,e){const t=i*6;if(e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,n=0;r<t;r+=6,n+=4)e[r+0]=n+0,e[r+1]=n+1,e[r+2]=n+2,e[r+3]=n+0,e[r+4]=n+2,e[r+5]=n+3;return e}var ve=Object.defineProperty,Te=(i,e,t)=>e in i?ve(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,P=(i,e,t)=>(Te(i,typeof e!="symbol"?e+"":e,t),t);class O{constructor(e){P(this,"max_textures"),P(this,"arr",[]),P(this,"count",0),P(this,"dirty",!1),P(this,"dirty_gpu",!1),P(this,"bind_group",null),P(this,"bind_group_resources",{}),P(this,"tex_sizes",null),P(this,"null_color",new Float32Array([0,0,0,.5])),P(this,"tex_buf",null),this.max_textures=e,this.tex_sizes=new Float32Array(this.max_textures*4+4),this.tex_buf=new u.Buffer({usage:u.BufferUsage.UNIFORM|u.BufferUsage.COPY_DST})}get length(){return this.count}push(e){this.arr[this.count++]=e,this.dirty=!0}at(e){return this.arr[e]}update(){if(!this.dirty)return;this.dirty=!1,this.dirty_gpu=!0;const{tex_sizes:e,arr:t,count:r,max_textures:n,null_color:a}=this;if(!e)throw new Error("Texture sizes buffer is not initialized");for(let l=0;l<r;l++){const f=t[l];f&&(e[l*4]=f.pixelWidth,e[l*4+1]=f.pixelHeight,e[l*4+2]=1/f.pixelWidth,e[l*4+3]=1/f.pixelHeight)}e[n*4]=a[0],e[n*4+1]=a[1],e[n*4+2]=a[2],e[n*4+3]=a[3]}markDirty(){this.dirty=!0}getBindGroup(){if(this.update(),!this.dirty_gpu)return this.bind_group;const{bind_group_resources:e,max_textures:t,arr:r,count:n}=this;let a=0;e[a++]=new u.UniformGroup({u_texture_size:{value:this.tex_sizes,type:"vec4<f32>",size:t},u_null_color:{value:this.null_color,type:"vec4<f32>"}});for(let l=0;l<t;l++){const f=(l<n?r[l]:null)||u.Texture.EMPTY.source;e[a++]=f.source,e[a++]=f.style}return this.bind_group||(this.bind_group=new u.BindGroup(e)),this.bind_group}static generate_gpu_textures(e){const t=[];t.push("struct TextureArrayFields {"),t.push(`    u_texture_size: array<vec4f, ${e}>,`),t.push("    u_null_color: vec4f"),t.push("}"),t.push("@group(1) @binding(0) var<uniform> taf: TextureArrayFields;");for(let r=0;r<e;r++)t.push(`@group(1) @binding(${r*2+1}) var u_texture_${r}: texture_2d<f32>;`),t.push(`@group(1) @binding(${r*2+2}) var u_sampler_${r}: sampler;`);t.push("fn sampleMultiTexture(texture_id: i32, uv: vec2f, dx: vec2f, dy: vec2f) -> vec4f {"),t.push("switch texture_id {");for(let r=0;r<e;r++)t.push(`  case ${r}: { return textureSampleGrad(u_texture_${r}, u_sampler_${r}, uv, dx, dy); }`);return t.push("  default: { return taf.u_null_color; }"),t.push("} }"),t.join(`
`)}static generate_gl_textures(e){const t=[];t.push(`uniform vec4 u_texture_size[${e+1}];`),t.push(`uniform sampler2D u_textures[${e}];`),t.push("uniform vec4 u_null_color;"),t.push("vec4 sampleMultiTexture(float texture_id, vec2 uv) {"),t.push(`if(texture_id < -0.5) return u_texture_size[${e}];`);for(let r=0;r<e;r++)t.push(`if(texture_id < ${r}.5) return texture(u_textures[${r}], uv * u_texture_size[${r}].zw);`);return t.push(`return u_texture_size[${e}];`),t.push("}"),t.join(`
`)}static gl_gen_resources(e){const t=[];for(let n=0;n<e;n++)t[n]=n;const r=[];for(let n=0;n<e;n++)r.push(2048),r.push(2048),r.push(1/2048),r.push(1/2048);return{u_textures:{value:t,type:"i32",size:e},u_texture_size:{value:r,type:"vec4<f32>",size:e}}}}var _e=Object.defineProperty,ge=(i,e,t)=>e in i?_e(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,W=(i,e,t)=>(ge(i,typeof e!="symbol"?e+"":e,t),t);const be=`
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
`,xe=`
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
`;class ae extends Y{constructor(){super(...arguments),W(this,"_shader",null),W(this,"max_textures",C.TEXTURES_PER_TILEMAP)}destroy(){var e;(e=this._shader)==null||e.destroy(!0),this._shader=null}execute(e,t){const r=e.renderer,n=this._shader,a=t.getTileset(),l=n==null?void 0:n.resources.texture_uniforms;l.uniforms.u_texture_size!==a.tex_sizes&&(l.uniforms.u_texture_size=a.tex_sizes,l.update());for(let f=0;f<a.length;f++)r.texture.bind(a.arr[f],f);if(n){if(!t.vb)throw new Error("Tilemap vertex buffer is not initialized");r.encoder.draw({geometry:t.vb,shader:n,state:t.state,size:t.rects_count*6})}else throw new Error("Shader is not initialized")}init(){this._shader=new u.Shader({glProgram:u.GlProgram.from({vertex:be,fragment:xe.replace("//include_textures",O.generate_gl_textures(this.max_textures))}),resources:{texture_uniforms:new u.UniformGroup(O.gl_gen_resources(this.max_textures),{isStatic:!0}),pipe_uniforms:this.pipe_uniforms.uniformStructures}})}}W(ae,"extension",{type:[u.ExtensionType.WebGLPipesAdaptor],name:"tilemap"});var ye=Object.defineProperty,Ae=(i,e,t)=>e in i?ye(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,L=(i,e,t)=>(Ae(i,typeof e!="symbol"?e+"":e,t),t);const Ie=`
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
`,Pe=`
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
`;class ue extends Y{constructor(){super(...arguments),L(this,"_shader",null),L(this,"max_textures",C.TEXTURES_PER_TILEMAP),L(this,"bind_group",null)}destroy(){var e;(e=this._shader)==null||e.destroy(!0),this._shader=null}execute(e,t){const r=e.renderer,n=this._shader;if(n){const a=t.getTileset().getBindGroup(),l=this.bind_group;if(!a||!l)throw new Error("Tileset or self bind group is not initialized");if(n.groups[0]=r.globalUniforms.bindGroup,n.groups[1]=a,n.groups[2]=l,!t.vb)throw new Error("Tilemap vertex buffer is not initialized");r.encoder.draw({geometry:t.vb,shader:n,state:t.state,size:t.rects_count*6})}else throw new Error("Shader or bind group is not initialized")}init(){this._shader=new u.Shader({gpuProgram:u.GpuProgram.from({vertex:{source:Ie,entryPoint:"mainVert"},fragment:{source:Pe.replace("//include_textures",O.generate_gpu_textures(this.max_textures))}})}),this.bind_group=new u.BindGroup({ut:this.pipe_uniforms})}}L(ue,"extension",{type:[u.ExtensionType.WebGPUPipesAdaptor],name:"tilemap"});var we=Object.defineProperty,Ce=(i,e,t)=>e in i?we(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,p=(i,e,t)=>(Ce(i,typeof e!="symbol"?e+"":e,t),t),le=(i=>(i[i.U=0]="U",i[i.V=1]="V",i[i.X=2]="X",i[i.Y=3]="Y",i[i.TILE_WIDTH=4]="TILE_WIDTH",i[i.TILE_HEIGHT=5]="TILE_HEIGHT",i[i.ROTATE=6]="ROTATE",i[i.ANIM_X=7]="ANIM_X",i[i.ANIM_Y=8]="ANIM_Y",i[i.TEXTURE_INDEX=9]="TEXTURE_INDEX",i[i.ANIM_COUNT_X=10]="ANIM_COUNT_X",i[i.ANIM_COUNT_Y=11]="ANIM_COUNT_Y",i[i.ANIM_DIVISOR=12]="ANIM_DIVISOR",i[i.COL_R=13]="COL_R",i[i.COL_G=14]="COL_G",i[i.COL_B=15]="COL_B",i[i.COL_A=16]="COL_A",i))(le||{});const T=Object.keys(le).length/2;class H extends u.Container{constructor(e){super(),p(this,"shadowColor",new Float32Array([0,0,0,.5])),p(this,"state",u.State.for2d()),p(this,"is_valid",!1),p(this,"renderPipeId","tilemap"),p(this,"canBundle",!0),p(this,"_instruction",{renderPipeId:"tilemap",tilemap:this}),p(this,"tileAnim",null),p(this,"rects_count",0),p(this,"compositeParent",!1),p(this,"tileset",new O(C.TEXTURES_PER_TILEMAP)),p(this,"tilemapBounds",new u.Bounds),p(this,"hasAnimatedTile",!1),p(this,"pointsBuf",[]),p(this,"vbId",0),p(this,"vb",null),p(this,"vbBuffer",null),p(this,"vbArray",null),p(this,"vbInts",null),this.setTileset(e)}checkValid(){const e=this.tileset.count>0&&this.pointsBuf.length>0,t=this.is_valid!==e;return this.is_valid=e,t!==e}getTileset(){return this.tileset}setTileset(e=[]){var t,r;let n=this.tileset;if(e instanceof O)this.tileset=e,this.didViewUpdate=!0;else if(e instanceof u.TextureSource){if(n.count===1&&n.arr[0]===e)return this;n=this.tileset=new O(C.TEXTURES_PER_TILEMAP),n.push(e),this.didViewUpdate=!0}else{if(e.length===n.count){let a=!0;for(let l=0;l<e.length;l++)if(((t=e[l])==null?void 0:t.source)!==n.arr[l]){a=!1;break}if(a)return this}n=this.tileset=new O(C.TEXTURES_PER_TILEMAP);for(let a=0;a<e.length;a++)n.push((r=e[a])==null?void 0:r.source);this.didViewUpdate=!0}return this}clear(){return this.pointsBuf.length=0,this.rects_count=0,this.tilemapBounds.clear(),this.hasAnimatedTile=!1,this}tile(e,t,r,n={}){var a,l,f,s;this.didViewUpdate=!0;let c,o=-1,x=!1;if(typeof e=="number")o=e,x=!0,c=this.tileset.arr[o];else{let y;typeof e=="string"?y=u.Texture.from(e):y=e;const U=this.tileset;for(let M=0;M<U.count;M++)if(U.arr[M]===y.source){o=M;break}"frame"in y&&(n.u=(a=n.u)!=null?a:y.frame.x,n.v=(l=n.v)!=null?l:y.frame.y,n.tileWidth=(f=n.tileWidth)!=null?f:y.orig.width,n.tileHeight=(s=n.tileHeight)!=null?s:y.orig.height),c=y.source}if(!x&&!c)return console.error("The tile texture was not found in the tilemap tileset."),this;const{u:h=0,v:A=0,tileWidth:I=c.width,tileHeight:_=c.height,animX:g=0,animY:v=0,rotate:b=0,animCountX:m=1024,animCountY:Q=1024,animDivisor:Z=1,colR:q=1,colG:J=1,colB:R=1,colA:F=1}=n,d=this.pointsBuf;return this.hasAnimatedTile=this.hasAnimatedTile||g>0||v>0,d.push(h),d.push(A),d.push(t),d.push(r),d.push(I),d.push(_),d.push(b),d.push(g|0),d.push(v|0),d.push(o),d.push(m),d.push(Q),d.push(Z),d.push(q),d.push(J),d.push(R),d.push(F),this.tilemapBounds.addFrame(t,r,t+I,r+_),this}tileRotate(e){const t=this.pointsBuf;t[t.length-(T-9)]=e}tileAnimX(e,t){const r=this.pointsBuf;r[r.length-(T-7)]=e,r[r.length-(T-10)]=t}tileAnimY(e,t){const r=this.pointsBuf;r[r.length-(T-8)]=e,r[r.length-(T-11)]=t}tileAnimDivisor(e){const t=this.pointsBuf;t[t.length-(T-12)]=e}tileR(e){const t=this.pointsBuf;t[t.length-(T-13)]=e}tileG(e){const t=this.pointsBuf;t[t.length-(T-14)]=e}tileB(e){const t=this.pointsBuf;t[t.length-(T-15)]=e}tileA(e){const t=this.pointsBuf;t[t.length-(T-16)]=e}destroyVb(){this.vb&&(this.vb.destroy(),this.vb=null)}updateBuffer(e){const t=this.pointsBuf,r=t.length/T;let n=this.vb;if(this.tileset.count===0||r===0||this.rects_count===r&&n)return;this.rects_count=r,n||(n=e.createVb(),this.vb=n,this.vbId=n.id,this.vbBuffer=null);const a=r*n.vertPerQuad;e.checkIndexBuffer(r);const l=n.getBuffer("aVertexPosition"),f=n.stride*a;if(!this.vbBuffer||this.vbBuffer.byteLength<f){let h=n.stride;for(;h<f;)h*=2;this.vbBuffer=new ArrayBuffer(h),this.vbArray=new Float32Array(this.vbBuffer),this.vbInts=new Uint32Array(this.vbBuffer)}const s=this.vbArray,c=this.vbInts;let o=0,x=0;for(let h=0;h<t.length;h+=T){this.compositeParent&&(x=t[h+9]);const A=t[h+2],I=t[h+3],_=t[h+4],g=t[h+5],v=t[h+0],b=t[h+1];let m=t[h+6];const Q=t[h+7],Z=t[h+8],q=t[h+10]||1024,J=t[h+11]||1024,R=Q+q*2048,F=Z+J*2048,d=t[h+12],y=t[h+13],U=t[h+14],M=t[h+15],V=t[h+16];let K,j,ee,te,re,ie,se,ne;if(m===0)K=v,j=b,ee=v+_,te=b,re=v+_,ie=b+g,se=v,ne=b+g;else{let X=_/2,z=g/2;m%4!==0&&(X=g/2,z=_/2);const $=v+X,N=b+z;m=u.groupD8.add(m,u.groupD8.NW),K=$+X*u.groupD8.uX(m),j=N+z*u.groupD8.uY(m),m=u.groupD8.add(m,2),ee=$+X*u.groupD8.uX(m),te=N+z*u.groupD8.uY(m),m=u.groupD8.add(m,2),re=$+X*u.groupD8.uX(m),ie=N+z*u.groupD8.uY(m),m=u.groupD8.add(m,2),se=$+X*u.groupD8.uX(m),ne=N+z*u.groupD8.uY(m)}if(s&&c)s[o++]=A,s[o++]=I,s[o++]=K,s[o++]=j,s[o++]=v+.5,s[o++]=b+.5,s[o++]=v+_-.5,s[o++]=b+g-.5,s[o++]=R,s[o++]=F,c[o++]=x,s[o++]=d,s[o++]=y,s[o++]=U,s[o++]=M,s[o++]=V,s[o++]=A+_,s[o++]=I,s[o++]=ee,s[o++]=te,s[o++]=v+.5,s[o++]=b+.5,s[o++]=v+_-.5,s[o++]=b+g-.5,s[o++]=R,s[o++]=F,c[o++]=x,s[o++]=d,s[o++]=y,s[o++]=U,s[o++]=M,s[o++]=V,s[o++]=A+_,s[o++]=I+g,s[o++]=re,s[o++]=ie,s[o++]=v+.5,s[o++]=b+.5,s[o++]=v+_-.5,s[o++]=b+g-.5,s[o++]=R,s[o++]=F,c[o++]=x,s[o++]=d,s[o++]=y,s[o++]=U,s[o++]=M,s[o++]=V,s[o++]=A,s[o++]=I+g,s[o++]=se,s[o++]=ne,s[o++]=v+.5,s[o++]=b+.5,s[o++]=v+_-.5,s[o++]=b+g-.5,s[o++]=R,s[o++]=F,c[o++]=x,s[o++]=d,s[o++]=y,s[o++]=U,s[o++]=M,s[o++]=V;else throw new Error("Buffer is not initialized")}l.data=s!=null?s:new Float32Array}isModified(e){return!!(this.rects_count*T!==this.pointsBuf.length||e&&this.hasAnimatedTile)}clearModify(){this.rects_count=this.pointsBuf.length/T}addBounds(e){const t=this.tilemapBounds;e.addFrame(t.minX,t.minY,t.maxX,t.maxY)}get bounds(){return this.tilemapBounds}destroy(e){super.destroy(e),this.destroyVb()}addFrame(e,t,r,n,a){return this.tile(e,t,r,{animX:n,animY:a}),!0}addRect(e,t,r,n,a,l,f,s=0,c=0,o=0,x=1024,h=1024,A=1,I=1,_=1,g=1,v=1){return this.tile(e,n,a,{u:t,v:r,tileWidth:l,tileHeight:f,animX:s,animY:c,rotate:o,animCountX:x,animCountY:h,animDivisor:A,colR:I,colG:_,colB:g,colA:v})}}var Me=Object.defineProperty,Ee=(i,e,t)=>e in i?Me(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,S=(i,e,t)=>(Ee(i,typeof e!="symbol"?e+"":e,t),t);class Be extends u.Container{constructor(e){super(),S(this,"texturesPerTilemap"),S(this,"tileAnim",null),S(this,"lastModifiedTilemap",null),S(this,"modificationMarker",0),S(this,"setBitmaps",this.tileset),this.texturesPerTilemap=C.TEXTURES_PER_TILEMAP,this.tileset(e)}tileset(e){e||(e=[]);const t=this.texturesPerTilemap,r=this.children.length,n=Math.ceil(e.length/t);for(let a=0;a<Math.min(r,n);a++)this.children[a].setTileset(e.slice(a*t,(a+1)*t));for(let a=r;a<n;a++){const l=new H(e.slice(a*t,(a+1)*t));l.compositeParent=!0,this.addChild(l)}return this}clear(){for(let e=0;e<this.children.length;e++)this.children[e].clear();return this.modificationMarker=0,this}tileRotate(e){return this.lastModifiedTilemap&&this.lastModifiedTilemap.tileRotate(e),this}tileAnimX(e,t){return this.lastModifiedTilemap&&this.lastModifiedTilemap.tileAnimX(e,t),this}tileAnimY(e,t){return this.lastModifiedTilemap&&this.lastModifiedTilemap.tileAnimY(e,t),this}tileAnimDivisor(e){return this.lastModifiedTilemap&&this.lastModifiedTilemap.tileAnimDivisor(e),this}tile(e,t,r,n={}){let a=null;const l=this.children;if(this.lastModifiedTilemap=null,typeof e=="number"){const f=e/this.texturesPerTilemap>>0;let s=0;if(a=l[f],a)s=e%this.texturesPerTilemap;else{if(a=l[0],!a)return this;s=0}a.tile(s,t,r,n)}else{typeof e=="string"&&(e=u.Texture.from(e));for(let f=0;f<l.length;f++){const s=l[f],c=s.getTileset().arr;for(let o=0;o<c.length;o++)if(c[o]===e.source){a=s;break}if(a)break}if(!a){for(let f=l.length-1;f>=0;f--){const s=l[f];if(s.getTileset().count<this.texturesPerTilemap){a=s,s.getTileset().push(e.source);break}}a||(a=new H(e.source),a.compositeParent=!0,this.addChild(a))}a.tile(e,t,r,n)}return this.lastModifiedTilemap=a,this}isModified(e){const t=this.children;if(this.modificationMarker!==t.length)return!0;for(let r=0;r<t.length;r++)if(t[r].isModified(e))return!0;return!1}clearModify(){const e=this.children;this.modificationMarker=e.length;for(let t=0;t<e.length;t++)e[t].clearModify()}addFrame(e,t,r,n,a,l,f,s,c,o,x,h){return this.tile(e,t,r,{animX:n,animY:a,animCountX:l,animCountY:f,animDivisor:s,colR:c,colG:o,colB:x,colA:h})}addRect(e,t,r,n,a,l,f,s,c,o,x,h){const A=e/this.texturesPerTilemap>>0,I=e%this.texturesPerTilemap;return this.children[A]&&this.children[A].getTileset().count>0?(this.lastModifiedTilemap=this.children[A],this.lastModifiedTilemap.addRect(I,t,r,n,a,l,f,s,c,o,x,h)):this.lastModifiedTilemap=null,this}get texPerChild(){return this.texturesPerTilemap}}return u.extensions.add(k),u.extensions.add(ae),u.extensions.add(ue),w.CompositeTilemap=Be,w.Constant=fe,w.POINT_STRUCT_SIZE=T,w.Tilemap=H,w.TilemapAdaptor=Y,w.TilemapGeometry=oe,w.TilemapPipe=k,w.settings=C,w}({},PIXI);
//# sourceMappingURL=pixi-tilemap.js.map
