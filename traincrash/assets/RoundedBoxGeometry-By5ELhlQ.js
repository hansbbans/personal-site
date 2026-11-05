var e=1e3,t=1001,n=1002,r=1003,i=1006,a=1008,o=1009,s=1012,c=1014,l=1015,u=1016,d=1017,f=1018,p=1020,m=1023,h=1026,g=1027,_=1028,v=1029,y=1030,b=1031,x=1033,S=2300,C=2301,w=2302,T=2303,E=2400,D=2401,O=2402,k=`srgb`,A=`srgb-linear`,j=`linear`,M=`srgb`,N=7680,P=35048,ee=2e3;function F(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function te(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function I(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function ne(){let e=I(`canvas`);return e.style.display=`block`,e}var re={};function ie(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function L(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function R(...e){e=L(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function z(...e){e=L(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function B(...e){let t=e.join(` `);t in re||(re[t]=!0,R(...e))}function ae(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var oe={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},se=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ce=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),le=1234567,ue=Math.PI/180,de=180/Math.PI;function fe(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(ce[e&255]+ce[e>>8&255]+ce[e>>16&255]+ce[e>>24&255]+`-`+ce[t&255]+ce[t>>8&255]+`-`+ce[t>>16&15|64]+ce[t>>24&255]+`-`+ce[n&63|128]+ce[n>>8&255]+`-`+ce[n>>16&255]+ce[n>>24&255]+ce[r&255]+ce[r>>8&255]+ce[r>>16&255]+ce[r>>24&255]).toLowerCase()}function V(e,t,n){return Math.max(t,Math.min(n,e))}function pe(e,t){return(e%t+t)%t}function me(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function he(e,t,n){return e===t?0:(n-e)/(t-e)}function ge(e,t,n){return(1-n)*e+n*t}function _e(e,t,n,r){return ge(e,t,1-Math.exp(-n*r))}function ve(e,t=1){return t-Math.abs(pe(e,t*2)-t)}function ye(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function be(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function xe(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Se(e,t){return e+Math.random()*(t-e)}function Ce(e){return e*(.5-Math.random())}function we(e){e!==void 0&&(le=e);let t=le+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Te(e){return e*ue}function Ee(e){return e*de}function De(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Oe(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function ke(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ae(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:R(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function je(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Me(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Ne={DEG2RAD:ue,RAD2DEG:de,generateUUID:fe,clamp:V,euclideanModulo:pe,mapLinear:me,inverseLerp:he,lerp:ge,damp:_e,pingpong:ve,smoothstep:ye,smootherstep:be,randInt:xe,randFloat:Se,randFloatSpread:Ce,seededRandom:we,degToRad:Te,radToDeg:Ee,isPowerOfTwo:De,ceilPowerOfTwo:Oe,floorPowerOfTwo:ke,setQuaternionFromProperEuler:Ae,normalize:Me,denormalize:je},H=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Pe=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:R(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(V(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ie.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ie.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Fe.copy(this).projectOnVector(e),this.sub(Fe)}reflect(e){return this.sub(Fe.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Fe=new U,Ie=new Pe,W=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return B(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Le.makeScale(e,t)),this}rotate(e){return B(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Le.makeRotation(-e)),this}translate(e,t){return B(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Le.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Le=new W,G=new W().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Re=new W().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ze(){let e={enabled:!0,workingColorSpace:A,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Ve(e.r),e.g=Ve(e.g),e.b=Ve(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=He(e.r),e.g=He(e.g),e.b=He(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?j:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return B(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return B(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[A]:{primaries:t,whitePoint:r,transfer:j,toXYZ:G,fromXYZ:Re,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:k},outputColorSpaceConfig:{drawingBufferColorSpace:k}},[k]:{primaries:t,whitePoint:r,transfer:M,toXYZ:G,fromXYZ:Re,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:k}}}),e}var Be=ze();function Ve(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function He(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ue,We=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ue===void 0&&(Ue=I(`canvas`)),Ue.width=e.width,Ue.height=e.height;let t=Ue.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ue}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=I(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ve(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ve(t[e]/255)*255):t[e]=Ve(t[e]);return{data:t,width:e.width,height:e.height}}return R(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ge=0,Ke=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ge++}),this.uuid=fe(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(qe(r[t].image)):e.push(qe(r[t]))}else e=qe(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function qe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?We.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(R(`Texture: Unable to serialize Texture.`),{})}var Je=0,Ye=new U,Xe=class r extends se{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,s=t,c=t,l=i,u=a,d=m,f=o,p=r.DEFAULT_ANISOTROPY,h=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Je++}),this.uuid=fe(),this.name=``,this.source=new Ke(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=s,this.wrapT=c,this.magFilter=l,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new W,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ye).x}get height(){return this.source.getSize(Ye).y}get depth(){return this.source.getSize(Ye).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){R(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?R(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Xe.DEFAULT_IMAGE=null,Xe.DEFAULT_MAPPING=300,Xe.DEFAULT_ANISOTROPY=1;var Ze=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this.w=V(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this.w=V(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Qe=class extends se{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:i,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t),this.textures=[];let r=new Xe({width:e,height:t,depth:n.depth}),a=n.count;for(let e=0;e<a;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:i,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ke(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},$e=class extends Qe{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},et=class extends Xe{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},tt=class extends Xe{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},K=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/nt.setFromMatrixColumn(e,0).length(),i=1/nt.setFromMatrixColumn(e,1).length(),a=1/nt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(it,e,at)}lookAt(e,t,n){let r=this.elements;return ct.subVectors(e,t),ct.lengthSq()===0&&(ct.z=1),ct.normalize(),ot.crossVectors(n,ct),ot.lengthSq()===0&&(Math.abs(n.z)===1?ct.x+=1e-4:ct.z+=1e-4,ct.normalize(),ot.crossVectors(n,ct)),ot.normalize(),st.crossVectors(ct,ot),r[0]=ot.x,r[4]=st.x,r[8]=ct.x,r[1]=ot.y,r[5]=st.y,r[9]=ct.y,r[2]=ot.z,r[6]=st.z,r[10]=ct.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],ee=r[11],F=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*ee,i[12]=a*w+o*O+s*M+c*F,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*ee,i[13]=l*w+u*O+d*M+f*F,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*ee,i[14]=p*w+m*O+h*M+g*F,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*ee,i[15]=_*w+v*O+y*M+b*F,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=nt.set(r[0],r[1],r[2]).length(),o=nt.set(r[4],r[5],r[6]).length(),s=nt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),rt.copy(this);let c=1/a,l=1/o,u=1/s;return rt.elements[0]*=c,rt.elements[1]*=c,rt.elements[2]*=c,rt.elements[4]*=l,rt.elements[5]*=l,rt.elements[6]*=l,rt.elements[8]*=u,rt.elements[9]*=u,rt.elements[10]*=u,t.setFromRotationMatrix(rt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=ee,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=ee,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},nt=new U,rt=new K,it=new U(0,0,0),at=new U(1,1,1),ot=new U,st=new U,ct=new U,lt=new K,ut=new Pe,dt=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(V(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-V(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(V(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-V(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(V(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-V(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:R(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return lt.makeRotationFromQuaternion(e),this.setFromRotationMatrix(lt,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ut.setFromEuler(this),this.setFromQuaternion(ut,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};dt.DEFAULT_ORDER=`XYZ`;var ft=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},pt=0,mt=new U,ht=new Pe,gt=new K,_t=new U,vt=new U,yt=new U,bt=new Pe,xt=new U(1,0,0),St=new U(0,1,0),Ct=new U(0,0,1),wt={type:`added`},Tt={type:`removed`},Et={type:`childadded`,child:null},Dt={type:`childremoved`,child:null},Ot=class e extends se{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pt++}),this.uuid=fe(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new dt,r=new Pe,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new K},normalMatrix:{value:new W}}),this.matrix=new K,this.matrixWorld=new K,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ft,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ht.setFromAxisAngle(e,t),this.quaternion.multiply(ht),this}rotateOnWorldAxis(e,t){return ht.setFromAxisAngle(e,t),this.quaternion.premultiply(ht),this}rotateX(e){return this.rotateOnAxis(xt,e)}rotateY(e){return this.rotateOnAxis(St,e)}rotateZ(e){return this.rotateOnAxis(Ct,e)}translateOnAxis(e,t){return mt.copy(e).applyQuaternion(this.quaternion),this.position.add(mt.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xt,e)}translateY(e){return this.translateOnAxis(St,e)}translateZ(e){return this.translateOnAxis(Ct,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?_t.copy(e):_t.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),vt.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gt.lookAt(vt,_t,this.up):gt.lookAt(_t,vt,this.up),this.quaternion.setFromRotationMatrix(gt),r&&(gt.extractRotation(r.matrixWorld),ht.setFromRotationMatrix(gt),this.quaternion.premultiply(ht.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(z(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wt),Et.child=e,this.dispatchEvent(Et),Et.child=null):z(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Tt),Dt.child=e,this.dispatchEvent(Dt),Dt.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gt.multiply(e.parent.matrixWorld)),e.applyMatrix4(gt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wt),Et.child=e,this.dispatchEvent(Et),Et.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vt,e,yt),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vt,bt,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Ot.DEFAULT_UP=new U(0,1,0),Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kt=class extends Ot{constructor(){super(),this.isGroup=!0,this.type=`Group`}},At={type:`move`},jt=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(At)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new kt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Mt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nt={h:0,s:0,l:0},Pt={h:0,s:0,l:0};function Ft(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=k){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Be.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Be.workingColorSpace){return this.r=e,this.g=t,this.b=n,Be.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Be.workingColorSpace){if(e=pe(e,1),t=V(t,0,1),n=V(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ft(i,r,e+1/3),this.g=Ft(i,r,e),this.b=Ft(i,r,e-1/3)}return Be.colorSpaceToWorking(this,r),this}setStyle(e,t=k){function n(t){t!==void 0&&parseFloat(t)<1&&R(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:R(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);R(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=k){let n=Mt[e.toLowerCase()];return n===void 0?R(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ve(e.r),this.g=Ve(e.g),this.b=Ve(e.b),this}copyLinearToSRGB(e){return this.r=He(e.r),this.g=He(e.g),this.b=He(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=k){return Be.workingToColorSpace(It.copy(this),e),Math.round(V(It.r*255,0,255))*65536+Math.round(V(It.g*255,0,255))*256+Math.round(V(It.b*255,0,255))}getHexString(e=k){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Be.workingColorSpace){Be.workingToColorSpace(It.copy(this),t);let n=It.r,r=It.g,i=It.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Be.workingColorSpace){return Be.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=k){Be.workingToColorSpace(It.copy(this),e);let t=It.r,n=It.g,r=It.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Nt),this.setHSL(Nt.h+e,Nt.s+t,Nt.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nt),e.getHSL(Pt);let n=ge(Nt.h,Pt.h,t),r=ge(Nt.s,Pt.s,t),i=ge(Nt.l,Pt.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},It=new q;q.NAMES=Mt;var Lt=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new q(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Rt=class extends Ot{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dt,this.environmentIntensity=1,this.environmentRotation=new dt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},zt=new U,Bt=new U,Vt=new U,Ht=new U,Ut=new U,Wt=new U,Gt=new U,Kt=new U,qt=new U,Jt=new U,Yt=new Ze,Xt=new Ze,Zt=new Ze,Qt=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),zt.subVectors(e,t),r.cross(zt);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){zt.subVectors(r,t),Bt.subVectors(n,t),Vt.subVectors(e,t);let a=zt.dot(zt),o=zt.dot(Bt),s=zt.dot(Vt),c=Bt.dot(Bt),l=Bt.dot(Vt),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ht)!==null&&Ht.x>=0&&Ht.y>=0&&Ht.x+Ht.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Ht)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Ht.x),s.addScaledVector(a,Ht.y),s.addScaledVector(o,Ht.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Yt.setScalar(0),Xt.setScalar(0),Zt.setScalar(0),Yt.fromBufferAttribute(e,t),Xt.fromBufferAttribute(e,n),Zt.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Yt,i.x),a.addScaledVector(Xt,i.y),a.addScaledVector(Zt,i.z),a}static isFrontFacing(e,t,n,r){return zt.subVectors(n,t),Bt.subVectors(e,t),zt.cross(Bt).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zt.subVectors(this.c,this.b),Bt.subVectors(this.a,this.b),zt.cross(Bt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Ut.subVectors(r,n),Wt.subVectors(i,n),Kt.subVectors(e,n);let s=Ut.dot(Kt),c=Wt.dot(Kt);if(s<=0&&c<=0)return t.copy(n);qt.subVectors(e,r);let l=Ut.dot(qt),u=Wt.dot(qt);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Ut,a);Jt.subVectors(e,i);let f=Ut.dot(Jt),p=Wt.dot(Jt);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Wt,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Gt.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Gt,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Ut,a).addScaledVector(Wt,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},$t=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,tn):tn.fromBufferAttribute(r,t),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),nn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),nn.copy(e.boundingBox)),nn.applyMatrix4(e.matrixWorld),this.union(nn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(un),dn.subVectors(this.max,un),rn.subVectors(e.a,un),an.subVectors(e.b,un),on.subVectors(e.c,un),sn.subVectors(an,rn),cn.subVectors(on,an),ln.subVectors(rn,on);let t=[0,-sn.z,sn.y,0,-cn.z,cn.y,0,-ln.z,ln.y,sn.z,0,-sn.x,cn.z,0,-cn.x,ln.z,0,-ln.x,-sn.y,sn.x,0,-cn.y,cn.x,0,-ln.y,ln.x,0];return!mn(t,rn,an,on,dn)||(t=[1,0,0,0,1,0,0,0,1],!mn(t,rn,an,on,dn))?!1:(fn.crossVectors(sn,cn),t=[fn.x,fn.y,fn.z],mn(t,rn,an,on,dn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(en[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),en[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),en[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),en[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),en[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),en[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),en[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),en[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(en)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},en=[new U,new U,new U,new U,new U,new U,new U,new U],tn=new U,nn=new $t,rn=new U,an=new U,on=new U,sn=new U,cn=new U,ln=new U,un=new U,dn=new U,fn=new U,pn=new U;function mn(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){pn.fromArray(e,a);let o=i.x*Math.abs(pn.x)+i.y*Math.abs(pn.y)+i.z*Math.abs(pn.z),s=t.dot(pn),c=n.dot(pn),l=r.dot(pn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var hn=gn();function gn(){let e=new ArrayBuffer(4),t=new Float32Array(e),n=new Uint32Array(e),r=new Uint32Array(512),i=new Uint32Array(512);for(let e=0;e<256;++e){let t=e-127;t<-27?(r[e]=0,r[e|256]=32768,i[e]=24,i[e|256]=24):t<-14?(r[e]=1024>>-t-14,r[e|256]=1024>>-t-14|32768,i[e]=-t-1,i[e|256]=-t-1):t<=15?(r[e]=t+15<<10,r[e|256]=t+15<<10|32768,i[e]=13,i[e|256]=13):t<128?(r[e]=31744,r[e|256]=64512,i[e]=24,i[e|256]=24):(r[e]=31744,r[e|256]=64512,i[e]=13,i[e|256]=13)}let a=new Uint32Array(2048),o=new Uint32Array(64),s=new Uint32Array(64);for(let e=1;e<1024;++e){let t=e<<13,n=0;for(;!(t&8388608);)t<<=1,n-=8388608;t&=-8388609,n+=947912704,a[e]=t|n}for(let e=1024;e<2048;++e)a[e]=939524096+(e-1024<<13);for(let e=1;e<31;++e)o[e]=e<<23;o[31]=1199570944,o[32]=2147483648;for(let e=33;e<63;++e)o[e]=2147483648+(e-32<<23);o[63]=3347054592;for(let e=1;e<64;++e)e!==32&&(s[e]=1024);return{floatView:t,uint32View:n,baseTable:r,shiftTable:i,mantissaTable:a,exponentTable:o,offsetTable:s}}function _n(e){Math.abs(e)>65504&&R(`DataUtils.toHalfFloat(): Value out of range.`),e=V(e,-65504,65504),hn.floatView[0]=e;let t=hn.uint32View[0],n=t>>23&511;return hn.baseTable[n]+((t&8388607)>>hn.shiftTable[n])}function vn(e){let t=e>>10;return hn.uint32View[0]=hn.mantissaTable[hn.offsetTable[t]+(e&1023)]+hn.exponentTable[t],hn.floatView[0]}var yn=class{static toHalfFloat(e){return _n(e)}static fromHalfFloat(e){return vn(e)}},bn=new U,xn=new H,Sn=0,Cn=class extends se{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sn++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=l,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix3(e),this.setXY(t,xn.x,xn.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix3(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix4(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyNormalMatrix(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.transformDirection(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=je(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Me(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=je(t,this.array)),t}setX(e,t){return this.normalized&&(t=Me(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=je(t,this.array)),t}setY(e,t){return this.normalized&&(t=Me(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=je(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Me(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=je(t,this.array)),t}setW(e,t){return this.normalized&&(t=Me(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Me(t,this.array),n=Me(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Me(t,this.array),n=Me(n,this.array),r=Me(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Me(t,this.array),n=Me(n,this.array),r=Me(r,this.array),i=Me(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},wn=class extends Cn{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Tn=class extends Cn{constructor(e,t,n){super(new Uint32Array(e),t,n)}},J=class extends Cn{constructor(e,t,n){super(new Float32Array(e),t,n)}},En=new $t,Dn=new U,On=new U,kn=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?En.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Dn.subVectors(e,this.center);let t=Dn.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Dn,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(On.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Dn.copy(e.center).add(On)),this.expandByPoint(Dn.copy(e.center).sub(On))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},An=0,jn=new K,Mn=new Ot,Nn=new U,Pn=new $t,Fn=new $t,In=new U,Y=class e extends se{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:An++}),this.uuid=fe(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(F(e)?Tn:wn)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new W().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return jn.makeRotationFromQuaternion(e),this.applyMatrix4(jn),this}rotateX(e){return jn.makeRotationX(e),this.applyMatrix4(jn),this}rotateY(e){return jn.makeRotationY(e),this.applyMatrix4(jn),this}rotateZ(e){return jn.makeRotationZ(e),this.applyMatrix4(jn),this}translate(e,t,n){return jn.makeTranslation(e,t,n),this.applyMatrix4(jn),this}scale(e,t,n){return jn.makeScale(e,t,n),this.applyMatrix4(jn),this}lookAt(e){return Mn.lookAt(e),Mn.updateMatrix(),this.applyMatrix4(Mn.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Nn).negate(),this.translate(Nn.x,Nn.y,Nn.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new J(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&R(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $t);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)z(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Pn.setFromBufferAttribute(n),this.morphTargetsRelative?(In.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint(In),In.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint(In)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&z(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)z(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);else if(e){let n=this.boundingSphere.center;if(Pn.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Fn.setFromBufferAttribute(n),this.morphTargetsRelative?(In.addVectors(Pn.min,Fn.min),Pn.expandByPoint(In),In.addVectors(Pn.max,Fn.max),Pn.expandByPoint(In)):(Pn.expandByPoint(Fn.min),Pn.expandByPoint(Fn.max))}Pn.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)In.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(In));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)In.fromBufferAttribute(a,t),o&&(Nn.fromBufferAttribute(e,t),In.add(Nn)),r=Math.max(r,n.distanceToSquared(In))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&z(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){z(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Cn(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let c=new U,l=new U,u=new U,d=new H,f=new H,p=new H,m=new U,h=new U;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new U,y=new U,b=new U,x=new U;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Cn(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)In.fromBufferAttribute(e,t),In.normalize(),e.setXYZ(t,In.x,In.y,In.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Cn(a,r,i)}if(this.index===null)return R(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ln=new U,Rn=new U,zn=new W,Bn=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ln.subVectors(n,t).cross(Rn.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ln),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||zn.getNormalMatrix(e),r=this.coplanarPoint(Ln).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Vn=0,Hn=class extends se{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vn++}),this.uuid=fe(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=N,this.stencilZFail=N,this.stencilZPass=N,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){R(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?R(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new q().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Bn().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Un=new U,Wn=new U,Gn=new U,Kn=new U,qn=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Un.copy(this.origin).addScaledVector(this.direction,t),Un.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Wn.copy(e).add(t).multiplyScalar(.5),Gn.copy(t).sub(e).normalize(),Kn.copy(this.origin).sub(Wn);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Gn),o=Kn.dot(this.direction),s=-Kn.dot(Gn),c=Kn.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Wn).addScaledVector(Gn,d),f}intersectSphere(e,t){if(e.radius<0)return null;Un.subVectors(e.center,this.origin);let n=Un.dot(this.direction),r=Un.dot(Un)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Un)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,ee=C/w,F=1/w,te=T-P*D,I=E-ee*D,ne=O-P*A,re=k-ee*A,ie=j-P*N,L=M-ee*N,R=ie*re-L*ne,z=te*L-I*ie,B=ne*I-re*te;if(r){if(R<0||z<0||B<0)return null}else if((R<0||z<0||B<0)&&(R>0||z>0||B>0))return null;let ae=R+z+B;if(ae===0)return null;let oe=F*(R*D+z*A+B*N);return(ae>0?oe<0:oe>0)?null:this.at(oe/ae,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Jn=class extends Hn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dt,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Yn=new K,Xn=new qn,Zn=new kn,Qn=new U,$n=new U,er=new U,tr=new U,nr=new U,rr=new U,ir=new U,ar=new U,or=class extends Ot{constructor(e=new Y,t=new Jn){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){rr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(nr.fromBufferAttribute(s,e),a?rr.addScaledVector(nr,r):rr.addScaledVector(nr.sub(t),r))}t.add(rr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Zn.copy(n.boundingSphere),Zn.applyMatrix4(i),Xn.copy(e.ray).recast(e.near),!(Zn.containsPoint(Xn.origin)===!1&&(Xn.intersectSphere(Zn,Qn)===null||Xn.origin.distanceToSquared(Qn)>(e.far-e.near)**2))&&(Yn.copy(i).invert(),Xn.copy(e.ray).applyMatrix4(Yn),(n.boundingBox===null||Xn.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Xn)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=cr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=cr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=cr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=cr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function sr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ar.copy(s),ar.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ar);return l<n.near||l>n.far?null:{distance:l,point:ar.clone(),object:e}}function cr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,$n),e.getVertexPosition(c,er),e.getVertexPosition(l,tr);let u=sr(e,t,n,r,$n,er,tr,ir);if(u){let e=new U;Qt.getBarycoord(ir,$n,er,tr,e),i&&(u.uv=Qt.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=Qt.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=Qt.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};Qt.getNormal($n,er,tr,t.normal),u.face=t,u.barycoord=e}return u}var lr=class extends Xe{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ur=class extends Cn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},dr=new K,fr=new K,pr=[],mr=new $t,hr=new K,gr=new or,_r=new kn,vr=class extends or{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ur(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,hr)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $t),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,dr),mr.copy(e.boundingBox).applyMatrix4(dr),this.boundingBox.union(mr)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new kn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,dr),_r.copy(e.boundingSphere).applyMatrix4(dr),this.boundingSphere.union(_r)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(gr.geometry=this.geometry,gr.material=this.material,gr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_r.copy(this.boundingSphere),_r.applyMatrix4(n),e.ray.intersectsSphere(_r)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,dr),fr.multiplyMatrices(n,dr),gr.matrixWorld=fr,gr.raycast(e,pr);for(let e=0,n=pr.length;e<n;e++){let n=pr[e];n.instanceId=i,n.object=this,t.push(n)}pr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ur(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new lr(new Float32Array(r*this.count),r,this.count,_,l));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},yr=new kn,br=new H(.5,.5),xr=new U,Sr=class{constructor(e=new Bn,t=new Bn,n=new Bn,r=new Bn,i=new Bn,a=new Bn){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ee,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yr)}intersectsSprite(e){return yr.center.set(0,0,0),yr.radius=.7071067811865476+br.distanceTo(e.center),yr.applyMatrix4(e.matrixWorld),this.intersectsSphere(yr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(xr.x=r.normal.x>0?e.max.x:e.min.x,xr.y=r.normal.y>0?e.max.y:e.min.y,xr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(xr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Cr=class extends Hn{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},wr=new K,Tr=new qn,Er=new kn,Dr=new U,Or=class extends Ot{constructor(e=new Y,t=new Cr){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(r),Er.radius+=i,e.ray.intersectsSphere(Er)===!1)return;wr.copy(r).invert(),Tr.copy(e.ray).applyMatrix4(wr);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Dr.fromBufferAttribute(l,n),kr(Dr,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Dr.fromBufferAttribute(l,a),kr(Dr,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function kr(e,t,n,r,i,a,o){let s=Tr.distanceSqToPoint(e);if(s<n){let n=new U;Tr.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ar=class extends Xe{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},jr=class extends Xe{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Mr=class extends Xe{constructor(e,t,n=c,i,a,o,s=r,l=r,u,d=h,f=1){if(d!==1026&&d!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:f},i,a,o,s,l,d,n,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ke(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Nr=class extends Mr{constructor(e,t=c,n=301,i,a,o=r,s=r,l,u=h){let d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,n,i,a,o,s,l,u),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Pr=class extends Xe{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Fr=class e extends Y{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new J(c,3)),this.setAttribute(`normal`,new J(l,3)),this.setAttribute(`uv`,new J(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ir=class e extends Y{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new U,l=new H;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new J(a,3)),this.setAttribute(`normal`,new J(o,3)),this.setAttribute(`uv`,new J(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Lr=class e extends Y{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new J(u,3)),this.setAttribute(`normal`,new J(d,3)),this.setAttribute(`uv`,new J(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Rr=class e extends Lr{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},zr=class e extends Y{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new J(i,3)),this.setAttribute(`normal`,new J(i.slice(),3)),this.setAttribute(`uv`,new J(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new U,r=new U,i=new U;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new U;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new U;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new U,t=new U,n=new U,r=new U,o=new H,s=new H,c=new H;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Br=class e extends zr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Vr=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){R(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new H:new U);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,r=[],i=[],a=[],o=new U,s=new K;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new U)}i[0]=new U,a[0]=new U;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(V(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(V(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Hr=class extends Vr{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new H){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ur=class extends Hr{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Wr(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Gr=new U,Kr=new U,qr=new Wr,Jr=new Wr,Yr=new Wr,Xr=class extends Vr{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new U){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Kr.subVectors(r[0],r[1]).add(r[0]),c=Kr);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Gr.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Gr),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),qr.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Jr.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Yr.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(qr.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Jr.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Yr.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(qr.calc(s),Jr.calc(s),Yr.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Zr(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Qr(e,t){let n=1-e;return n*n*t}function $r(e,t){return 2*(1-e)*e*t}function ei(e,t){return e*e*t}function ti(e,t,n,r){return Qr(e,t)+$r(e,n)+ei(e,r)}function ni(e,t){let n=1-e;return n*n*n*t}function ri(e,t){let n=1-e;return 3*n*n*e*t}function ii(e,t){return 3*(1-e)*e*e*t}function ai(e,t){return e*e*e*t}function oi(e,t,n,r,i){return ni(e,t)+ri(e,n)+ii(e,r)+ai(e,i)}var si=class extends Vr{constructor(e=new H,t=new H,n=new H,r=new H){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(oi(e,r.x,i.x,a.x,o.x),oi(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ci=class extends Vr{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(oi(e,r.x,i.x,a.x,o.x),oi(e,r.y,i.y,a.y,o.y),oi(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},li=class extends Vr{constructor(e=new H,t=new H){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ui=class extends Vr{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},di=class extends Vr{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ti(e,r.x,i.x,a.x),ti(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fi=class extends Vr{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ti(e,r.x,i.x,a.x),ti(e,r.y,i.y,a.y),ti(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},pi=class extends Vr{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new H){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Zr(o,s.x,c.x,l.x,u.x),Zr(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new H().fromArray(n))}return this}},mi=Object.freeze({__proto__:null,ArcCurve:Ur,CatmullRomCurve3:Xr,CubicBezierCurve:si,CubicBezierCurve3:ci,EllipseCurve:Hr,LineCurve:li,LineCurve3:ui,QuadraticBezierCurve:di,QuadraticBezierCurve3:fi,SplineCurve:pi}),hi=class extends Vr{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new mi[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new mi[n.type]().fromJSON(n))}return this}},gi=class extends hi{constructor(e){super(),this.type=`Path`,this.currentPoint=new H,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new li(this.currentPoint.clone(),new H(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new di(this.currentPoint.clone(),new H(e,t),new H(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new si(this.currentPoint.clone(),new H(e,t),new H(n,r),new H(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new pi([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Hr(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},_i=class extends gi{constructor(e){super(e),this.uuid=fe(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new gi().fromJSON(n))}return this}};function vi(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=yi(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Ei(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return xi(a,o,n,s,c,l,0),o}function yi(e,t,n,r,i){let a;if(i===Xi(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=qi(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=qi(i/r|0,e[i],e[i+1],a);return a&&zi(a,a.next)&&(Ji(a),a=a.next),a}function bi(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(zi(n,n.next)||Ri(n.prev,n,n.next)===0)){if(Ji(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function xi(e,t,n,r,i,a,o){if(!e)return;!o&&a&&ji(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Ci(e,r,i,a):Si(e))t.push(c.i,e.i,l.i),Ji(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=wi(bi(e),t),xi(e,t,n,r,i,a,2)):o===2&&Ti(e,t,n,r,i,a):xi(bi(e),t,n,r,i,a,1);break}}}function Si(e){let t=e.prev,n=e,r=e.next;if(Ri(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Ii(i,s,a,c,o,l,m.x,m.y)&&Ri(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ci(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Ri(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Ni(p,m,t,n,r),v=Ni(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Ii(s,u,c,d,l,f,y.x,y.y)&&Ri(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Ii(s,u,c,d,l,f,b.x,b.y)&&Ri(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Ii(s,u,c,d,l,f,y.x,y.y)&&Ri(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Ii(s,u,c,d,l,f,b.x,b.y)&&Ri(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function wi(e,t){let n=e;do{let r=n.prev,i=n.next.next;!zi(r,i)&&Bi(r,n,n.next,i)&&Wi(r,i)&&Wi(i,r)&&(t.push(r.i,n.i,i.i),Ji(n),Ji(n.next),n=e=i),n=n.next}while(n!==e);return bi(n)}function Ti(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Li(o,e)){let s=Ki(o,e);o=bi(o,o.next),s=bi(s,s.next),xi(o,t,n,r,i,a,0),xi(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Ei(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=yi(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Pi(o))}i.sort(Di);for(let e=0;e<i.length;e++)n=Oi(i[e],n);return n}function Di(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function Oi(e,t){let n=ki(e,t);if(!n)return t;let r=Ki(n,e);return bi(r,r.next),bi(n,n.next)}function ki(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(zi(e,n))return n;do{if(zi(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Fi(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Wi(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&Ai(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function Ai(e,t){return Ri(e.prev,e,t.prev)<0&&Ri(t.next,e,e.next)<0}function ji(e,t,n,r){let i=e;do i.z===0&&(i.z=Ni(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Mi(i)}function Mi(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Ni(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Pi(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Fi(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Ii(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Fi(e,t,n,r,i,a,o,s)}function Li(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Ui(e,t)&&(Wi(e,t)&&Wi(t,e)&&Gi(e,t)&&(Ri(e.prev,e,t.prev)||Ri(e,t.prev,t))||zi(e,t)&&Ri(e.prev,e,e.next)>0&&Ri(t.prev,t,t.next)>0)}function Ri(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function zi(e,t){return e.x===t.x&&e.y===t.y}function Bi(e,t,n,r){let i=Hi(Ri(e,t,n)),a=Hi(Ri(e,t,r)),o=Hi(Ri(n,r,e)),s=Hi(Ri(n,r,t));return!!(i!==a&&o!==s||i===0&&Vi(e,n,t)||a===0&&Vi(e,r,t)||o===0&&Vi(n,e,r)||s===0&&Vi(n,t,r))}function Vi(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Hi(e){return e>0?1:e<0?-1:0}function Ui(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Bi(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Wi(e,t){return Ri(e.prev,e,e.next)<0?Ri(e,t,e.next)>=0&&Ri(e,e.prev,t)>=0:Ri(e,t,e.prev)<0||Ri(e,e.next,t)<0}function Gi(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Ki(e,t){let n=Yi(e.i,e.x,e.y),r=Yi(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function qi(e,t,n,r){let i=Yi(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Ji(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Yi(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Xi(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Zi=class{static triangulate(e,t,n=2){return vi(e,t,n)}},Qi=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];$i(e),ea(n,e);let a=e.length;t.forEach($i);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,ea(n,t[e]);let o=Zi.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function $i(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function ea(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var ta=class e extends Y{constructor(e=new _i([new H(.5,.5),new H(-.5,.5),new H(-.5,-.5),new H(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new J(r,3)),this.setAttribute(`uv`,new J(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?na:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new U,b=new U,x=new U}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Qi.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Qi.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||z(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new H(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new H(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let M=[],N,P=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),P=P.concat(N)}let ee;if(p===0)ee=Qi.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);ie(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];N=M[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],N[e],a);ie(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}ee=Qi.triangulateShape(e,t)}let F=ee.length,te=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],P[e],te):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),ie(x.x,x.y,x.z)):ie(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],P[t],te):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),ie(x.x,x.y,x.z)):ie(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);ie(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],N[e],r);_?ie(i.x,i.y+g[s-1].y,g[s-1].x+n):ie(i.x,i.y,c+n)}}}I(),ne();function I(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<F;e++){let n=ee[e];L(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<F;e++){let n=ee[e];L(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<F;e++){let t=ee[e];L(t[2],t[1],t[0])}for(let e=0;e<F;e++){let t=ee[e];L(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ne(){let e=r.length/3,t=0;re(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];re(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function re(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);R(t+r+n,t+i+n,t+i+a,t+r+a)}}}function ie(e,t,n){a.push(e),a.push(t),a.push(n)}function L(e,t,i){B(e),B(t),B(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);ae(o[0]),ae(o[1]),ae(o[2])}function R(e,t,i,a){B(e),B(t),B(a),B(t),B(i),B(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);ae(s[0]),ae(s[1]),ae(s[3]),ae(s[1]),ae(s[2]),ae(s[3])}function B(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function ae(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ra(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new mi[i.type]().fromJSON(i)),new e(r,t.options)}},na={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new H(a,o),new H(s,c),new H(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new H(o,1-c),new H(l,1-d),new H(f,1-m),new H(h,1-_)]:[new H(s,1-c),new H(u,1-d),new H(p,1-m),new H(g,1-_)]}};function ra(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var ia=class e extends zr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},aa=class e extends Y{constructor(e=[new H(0,-.5),new H(.5,0),new H(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=V(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new U,d=new H,f=new U,p=new U,m=new U,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new J(a,3)),this.setAttribute(`uv`,new J(o,2)),this.setAttribute(`normal`,new J(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},oa=class e extends Y{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new J(p,3)),this.setAttribute(`normal`,new J(m,3)),this.setAttribute(`uv`,new J(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},sa=class e extends Y{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new U,p=new H;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new J(s,3)),this.setAttribute(`normal`,new J(c,3)),this.setAttribute(`uv`,new J(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ca=class e extends Y{constructor(e=new _i([new H(0,.5),new H(-.5,-.5),new H(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new J(r,3)),this.setAttribute(`normal`,new J(i,3)),this.setAttribute(`uv`,new J(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;Qi.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];Qi.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=Qi.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return la(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function la(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var ua=class e extends Y{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new U,d=new U,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new J(p,3)),this.setAttribute(`normal`,new J(m,3)),this.setAttribute(`uv`,new J(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},da=class e extends Y{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new U,f=new U,p=new U;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new J(c,3)),this.setAttribute(`normal`,new J(l,3)),this.setAttribute(`uv`,new J(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},fa=class e extends Y{constructor(e=new fi(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new U,s=new U,c=new H,l=new U,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new J(u,3)),this.setAttribute(`normal`,new J(d,3)),this.setAttribute(`uv`,new J(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new mi[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function pa(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(ha(i))i.isRenderTargetTexture?(R(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(ha(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ma(e){let t={};for(let n=0;n<e.length;n++){let r=pa(e[n]);for(let e in r)t[e]=r[e]}return t}function ha(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function ga(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function _a(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Be.workingColorSpace}var va={clone:pa,merge:ma},ya=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ba=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xa=class extends Hn{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ya,this.fragmentShader=ba,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=pa(e.uniforms),this.uniformsGroups=ga(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new q().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Ze().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new K().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Sa=class extends xa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ca=class extends Hn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new q(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},wa=class extends Ca{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new H(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return V(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new q(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new q(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new q(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ta=class extends Hn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dt,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ea=class extends Hn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Da=class extends Hn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Oa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function ka(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Aa=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ja=class extends Aa{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:E,endingEnd:E}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case D:i=e,o=2*t-n;break;case O:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case D:a=e,s=2*n-t;break;case O:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ma=class extends Aa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Na=class extends Aa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Pa=class extends Aa{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=La(n,t,g,y,r);i[p]=Fa(x,o,_,b,m)}return i}};function Fa(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Ia(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function La(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Fa(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Ia(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Ra=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Oa(t,this.TimeBufferType),this.values=Oa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Oa(e.times,Array),values:Oa(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),ka(e.settings)&&(n.settings={inTangents:Oa(e.settings.inTangents,Array),outTangents:Oa(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Na(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ma(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Pa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case S:t=this.InterpolantFactoryMethodDiscrete;break;case C:t=this.InterpolantFactoryMethodLinear;break;case w:t=this.InterpolantFactoryMethodSmooth;break;case T:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return R(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return S;case this.InterpolantFactoryMethodLinear:return C;case this.InterpolantFactoryMethodSmooth:return w;case this.InterpolantFactoryMethodBezier:return T}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;ka(this.settings)&&(za(this.settings.inTangents,e),za(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(z(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(z(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){z(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){z(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&te(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){z(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===w,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,ka(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function za(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Ra.prototype.ValueTypeName=``,Ra.prototype.TimeBufferType=Float32Array,Ra.prototype.ValueBufferType=Float32Array,Ra.prototype.DefaultInterpolation=C;var Ba=class extends Ra{constructor(e,t,n){super(e,t,n)}};Ba.prototype.ValueTypeName=`bool`,Ba.prototype.ValueBufferType=Array,Ba.prototype.DefaultInterpolation=S,Ba.prototype.InterpolantFactoryMethodLinear=void 0,Ba.prototype.InterpolantFactoryMethodSmooth=void 0;var Va=class extends Ra{constructor(e,t,n,r){super(e,t,n,r)}};Va.prototype.ValueTypeName=`color`;var Ha=class extends Ra{constructor(e,t,n,r){super(e,t,n,r)}};Ha.prototype.ValueTypeName=`number`;var Ua=class extends Aa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Pe.slerpFlat(i,0,a,c-o,a,c,s);return i}},Wa=class extends Ra{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ua(this.times,this.values,this.getValueSize(),e)}};Wa.prototype.ValueTypeName=`quaternion`,Wa.prototype.InterpolantFactoryMethodSmooth=void 0;var Ga=class extends Ra{constructor(e,t,n){super(e,t,n)}};Ga.prototype.ValueTypeName=`string`,Ga.prototype.ValueBufferType=Array,Ga.prototype.DefaultInterpolation=S,Ga.prototype.InterpolantFactoryMethodLinear=void 0,Ga.prototype.InterpolantFactoryMethodSmooth=void 0;var Ka=class extends Ra{constructor(e,t,n,r){super(e,t,n,r)}};Ka.prototype.ValueTypeName=`vector`;var qa=class extends Ot{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new q(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ja=class extends qa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.groundColor=new q(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ya=new K,Xa=new U,Za=new U,Qa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=o,this.map=null,this.mapPass=null,this.matrix=new K,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sr,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Xa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xa),Za.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Za),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Ya.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ya,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Ya)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},$a=new U,eo=new Pe,to=new U,no=class extends Ot{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new K,this.projectionMatrix=new K,this.projectionMatrixInverse=new K,this.coordinateSystem=ee,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose($a,eo,to),to.x===1&&to.y===1&&to.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($a,eo,to.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose($a,eo,to),to.x===1&&to.y===1&&to.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($a,eo,to.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ro=new U,io=new H,ao=new H,oo=class extends no{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=de*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ue*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return de*2*Math.atan(Math.tan(ue*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ro.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ro.x,ro.y).multiplyScalar(-e/ro.z),ro.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ro.x,ro.y).multiplyScalar(-e/ro.z)}getViewSize(e,t){return this.getViewBounds(e,io,ao),t.subVectors(ao,io)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ue*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},so=class extends Qa{constructor(){super(new oo(90,1,.5,500)),this.isPointLightShadow=!0}},co=class extends qa{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new so}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},lo=class extends no{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},uo=class extends Qa{constructor(){super(new lo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},fo=class extends qa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new uo}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},po=class extends Y{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},mo=-90,ho=1,go=class extends Ot{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new oo(mo,ho,e,t);r.layers=this.layers,this.add(r);let i=new oo(mo,ho,e,t);i.layers=this.layers,this.add(i);let a=new oo(mo,ho,e,t);a.layers=this.layers,this.add(a);let o=new oo(mo,ho,e,t);o.layers=this.layers,this.add(o);let s=new oo(mo,ho,e,t);s.layers=this.layers,this.add(s);let c=new oo(mo,ho,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},_o=class extends oo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},vo=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=yo.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function yo(){this._document.hidden===!1&&this.reset()}var bo=`\\[\\]\\.:\\/`,xo=RegExp(`[\\[\\]\\.:\\/]`,`g`),So=`[^\\[\\]\\.:\\/]`,Co=`[^`+bo.replace(`\\.`,``)+`]`,wo=`((?:WC+[\\/:])*)`.replace(`WC`,So),To=`(WCOD+)?`.replace(`WCOD`,Co),Eo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,So),Do=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,So),Oo=RegExp(`^`+wo+To+Eo+Do+`$`),ko=[`material`,`materials`,`bones`,`map`],Ao=class{constructor(e,t,n){let r=n||jo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},jo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(xo,``)}static parseTrackName(e){let t=Oo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);ko.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){R(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){z(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){z(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){z(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){z(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){z(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;z(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};jo.Composite=Ao,jo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},jo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},jo.prototype.GetterByBindingType=[jo.prototype._getValue_direct,jo.prototype._getValue_array,jo.prototype._getValue_arrayElement,jo.prototype._getValue_toArray],jo.prototype.SetterByBindingTypeAndVersioning=[[jo.prototype._setValue_direct,jo.prototype._setValue_direct_setNeedsUpdate,jo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[jo.prototype._setValue_array,jo.prototype._setValue_array_setNeedsUpdate,jo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[jo.prototype._setValue_arrayElement,jo.prototype._setValue_arrayElement_setNeedsUpdate,jo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[jo.prototype._setValue_fromArray,jo.prototype._setValue_fromArray_setNeedsUpdate,jo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function Mo(e,t,n,r){let i=No(r);switch(n){case 1021:return e*t;case _:return e*t/i.components*i.byteLength;case v:return e*t/i.components*i.byteLength;case y:return e*t*2/i.components*i.byteLength;case b:return e*t*2/i.components*i.byteLength;case 1022:return e*t*3/i.components*i.byteLength;case m:return e*t*4/i.components*i.byteLength;case x:return e*t*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 33778:case 33779:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 35841:case 35843:return Math.max(e,16)*Math.max(t,8)/4;case 35840:case 35842:return Math.max(e,8)*Math.max(t,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37808:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37809:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case 37810:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case 37811:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case 37812:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case 37813:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case 37814:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case 37815:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case 37816:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case 37817:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case 37818:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case 37819:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case 37820:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case 37821:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(e/4)*Math.ceil(t/4)*16;case 36283:case 36284:return Math.ceil(e/4)*Math.ceil(t/4)*8;case 36285:case 36286:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function No(e){switch(e){case o:case 1010:return{byteLength:1,components:1};case s:case 1011:case u:return{byteLength:2,components:1};case d:case f:return{byteLength:2,components:4};case c:case 1013:case l:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?R(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Po(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Fo(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Io={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},Lo={basic:{uniforms:ma([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Io.meshbasic_vert,fragmentShader:Io.meshbasic_frag},lambert:{uniforms:ma([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:Io.meshlambert_vert,fragmentShader:Io.meshlambert_frag},phong:{uniforms:ma([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Io.meshphong_vert,fragmentShader:Io.meshphong_frag},standard:{uniforms:ma([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Io.meshphysical_vert,fragmentShader:Io.meshphysical_frag},toon:{uniforms:ma([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new q(0)}}]),vertexShader:Io.meshtoon_vert,fragmentShader:Io.meshtoon_frag},matcap:{uniforms:ma([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Io.meshmatcap_vert,fragmentShader:Io.meshmatcap_frag},points:{uniforms:ma([X.points,X.fog]),vertexShader:Io.points_vert,fragmentShader:Io.points_frag},dashed:{uniforms:ma([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Io.linedashed_vert,fragmentShader:Io.linedashed_frag},depth:{uniforms:ma([X.common,X.displacementmap]),vertexShader:Io.depth_vert,fragmentShader:Io.depth_frag},normal:{uniforms:ma([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Io.meshnormal_vert,fragmentShader:Io.meshnormal_frag},sprite:{uniforms:ma([X.sprite,X.fog]),vertexShader:Io.sprite_vert,fragmentShader:Io.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Io.background_vert,fragmentShader:Io.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:Io.backgroundCube_vert,fragmentShader:Io.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Io.cube_vert,fragmentShader:Io.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Io.equirect_vert,fragmentShader:Io.equirect_frag},distance:{uniforms:ma([X.common,X.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Io.distance_vert,fragmentShader:Io.distance_frag},shadow:{uniforms:ma([X.lights,X.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:Io.shadow_vert,fragmentShader:Io.shadow_frag}};Lo.physical={uniforms:ma([Lo.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:Io.meshphysical_vert,fragmentShader:Io.meshphysical_frag};var Ro={r:0,b:0,g:0},zo=new K,Bo=new W;Bo.set(-1,0,0,0,1,0,0,0,1);function Vo(e,t,n,r,i,a){let o=new q(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new or(new Fr(1,1,1),new xa({name:`BackgroundCubeMaterial`,uniforms:pa(Lo.backgroundCube.uniforms),vertexShader:Lo.backgroundCube.vertexShader,fragmentShader:Lo.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(zo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Bo),l.material.toneMapped=Be.getTransfer(i.colorSpace)!==M,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new or(new oa(2,2),new xa({name:`BackgroundMaterial`,uniforms:pa(Lo.background.uniforms),vertexShader:Lo.background.vertexShader,fragmentShader:Lo.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Be.getTransfer(i.colorSpace)!==M,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ro,_a(e)),n.buffers.color.setClear(Ro.r,Ro.g,Ro.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Ho(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Uo(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Wo(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(R(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&R(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Go(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Bn,s=new W,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Ko=4,qo=6,Jo=20,Yo=256,Xo=new lo,Zo=new q,Qo=null,$o=0,es=0,ts=!1,ns=new U,rs=new U,is=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=ns}=i;Qo=this._renderer.getRenderTarget(),$o=this._renderer.getActiveCubeFace(),es=this._renderer.getActiveMipmapLevel(),ts=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ds(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=us(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qo,$o,es),this._renderer.xr.enabled=ts,e.scissorTest=!1,ss(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qo=this._renderer.getRenderTarget(),$o=this._renderer.getActiveCubeFace(),es=this._renderer.getActiveMipmapLevel(),ts=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:i,minFilter:i,generateMipmaps:!1,type:u,format:m,colorSpace:A,depthBuffer:!1},r=os(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=os(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=as(r)),this._blurMaterial=ls(r,e,t),this._ggxMaterial=cs(r,e,t)}return r}_compileMaterial(e){let t=new or(new Y,e);this._renderer.compile(t,Xo)}_sceneToCubeUV(e,t,n,r,i){let a=new oo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Zo),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new or(new Fr,new Jn({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Zo),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;ss(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ds()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=us());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;ss(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Xo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Ko?n-d+Ko:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,ss(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Xo),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,ss(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Xo)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];ss(t,3*l*(r>this._lodMax-Ko?r-this._lodMax+Ko:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Xo)}};function as(e){let t=[],n=[],r=e,i=e-Ko+1+qo;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?rs.set(1,r,n):e===1?rs.set(-n,1,-r):e===2?rs.set(-n,r,1):e===3?rs.set(-1,r,-n):e===4?rs.set(-n,-1,r):rs.set(n,r,-1),rs.toArray(l,(e*6+t)*3)}}let u=new Y;u.setAttribute(`position`,new Cn(c,3)),u.setAttribute(`outputDirection`,new Cn(l,3)),n.push(new or(u,null)),r>Ko&&r--}return{lodMeshes:n,sizeLods:t}}function os(e,t,n){let r=new $e(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function ss(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function cs(e,t,n){return new xa({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Yo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ls(e,t,n){return new xa({name:`SphericalGaussianBlur`,defines:{SAMPLES:Jo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:fs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function us(){return new xa({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:fs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ds(){return new xa({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function fs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ps=class extends $e{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ar(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Fr(5,5,5),a=new xa({name:`CubemapFromEquirect`,uniforms:pa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});a.uniforms.tEquirect.value=t;let o=new or(r,a),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=i),new go(1,10,this).update(e,o),t.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function ms(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new ps(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new is(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new is(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function hs(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&B(`WebGLRenderer: `+e+` extension not supported.`),t}}}function gs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Tn:wn)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function _s(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function vs(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:z(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ys(e,t,n){let r=new WeakMap,i=new Ze;function a(a,o,s){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u===void 0?0:u.length,f=r.get(o);if(f===void 0||f.count!==d){f!==void 0&&f.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],u=o.morphAttributes.color||[],p=0;e===!0&&(p=1),n===!0&&(p=2),a===!0&&(p=3);let m=o.attributes.position.count*p,h=1;m>t.maxTextureSize&&(h=Math.ceil(m/t.maxTextureSize),m=t.maxTextureSize);let g=new Float32Array(m*h*4*d),_=new et(g,m,h,d);_.type=l,_.needsUpdate=!0;let v=p*4;for(let t=0;t<d;t++){let r=s[t],o=c[t],l=u[t],d=m*h*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(l,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=l.itemSize===4?i.w:1)}}f={count:d,texture:_,size:new H(m,h)},r.set(o,f);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,f.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,f.size)}return{update:a}}function bs(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var xs={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Ss(e,t,n,r,i,a){let o=new $e(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Y;l.setAttribute(`position`,new J([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new J([0,2,0,0,2,0],2));let d=new Sa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new or(l,d),p=new lo(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new $e(t,n,{type:u,depthBuffer:!1,stencilBuffer:!1}),c=new $e(t,n,{type:u,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Be.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=xs[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),d.dispose()}}var Cs=new Xe,ws=new Mr(1,1),Ts=new et,Es=new tt,Ds=new Ar,Os=[],ks=[],As=new Float32Array(16),js=new Float32Array(9),Ms=new Float32Array(4);function Ns(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Os[i];if(a===void 0&&(a=new Float32Array(i),Os[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Ps(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Fs(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Is(e,t){let n=ks[t];n===void 0&&(n=new Int32Array(t),ks[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Ls(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Rs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ps(n,t))return;e.uniform2fv(this.addr,t),Fs(n,t)}}function zs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ps(n,t))return;e.uniform3fv(this.addr,t),Fs(n,t)}}function Bs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ps(n,t))return;e.uniform4fv(this.addr,t),Fs(n,t)}}function Vs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ps(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Fs(n,t)}else{if(Ps(n,r))return;Ms.set(r),e.uniformMatrix2fv(this.addr,!1,Ms),Fs(n,r)}}function Hs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ps(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Fs(n,t)}else{if(Ps(n,r))return;js.set(r),e.uniformMatrix3fv(this.addr,!1,js),Fs(n,r)}}function Us(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ps(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Fs(n,t)}else{if(Ps(n,r))return;As.set(r),e.uniformMatrix4fv(this.addr,!1,As),Fs(n,r)}}function Ws(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Gs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ps(n,t))return;e.uniform2iv(this.addr,t),Fs(n,t)}}function Ks(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ps(n,t))return;e.uniform3iv(this.addr,t),Fs(n,t)}}function qs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ps(n,t))return;e.uniform4iv(this.addr,t),Fs(n,t)}}function Js(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ys(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ps(n,t))return;e.uniform2uiv(this.addr,t),Fs(n,t)}}function Xs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ps(n,t))return;e.uniform3uiv(this.addr,t),Fs(n,t)}}function Zs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ps(n,t))return;e.uniform4uiv(this.addr,t),Fs(n,t)}}function Qs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(ws.compareFunction=n.isReversedDepthBuffer()?518:515,a=ws):a=Cs,n.setTexture2D(t||a,i)}function $s(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Es,i)}function ec(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Ds,i)}function tc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ts,i)}function nc(e){switch(e){case 5126:return Ls;case 35664:return Rs;case 35665:return zs;case 35666:return Bs;case 35674:return Vs;case 35675:return Hs;case 35676:return Us;case 5124:case 35670:return Ws;case 35667:case 35671:return Gs;case 35668:case 35672:return Ks;case 35669:case 35673:return qs;case 5125:return Js;case 36294:return Ys;case 36295:return Xs;case 36296:return Zs;case 35678:case 36198:case 36298:case 36306:case 35682:return Qs;case 35679:case 36299:case 36307:return $s;case 35680:case 36300:case 36308:case 36293:return ec;case 36289:case 36303:case 36311:case 36292:return tc}}function rc(e,t){e.uniform1fv(this.addr,t)}function ic(e,t){let n=Ns(t,this.size,2);e.uniform2fv(this.addr,n)}function ac(e,t){let n=Ns(t,this.size,3);e.uniform3fv(this.addr,n)}function oc(e,t){let n=Ns(t,this.size,4);e.uniform4fv(this.addr,n)}function sc(e,t){let n=Ns(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function cc(e,t){let n=Ns(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function lc(e,t){let n=Ns(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function uc(e,t){e.uniform1iv(this.addr,t)}function dc(e,t){e.uniform2iv(this.addr,t)}function fc(e,t){e.uniform3iv(this.addr,t)}function pc(e,t){e.uniform4iv(this.addr,t)}function mc(e,t){e.uniform1uiv(this.addr,t)}function hc(e,t){e.uniform2uiv(this.addr,t)}function gc(e,t){e.uniform3uiv(this.addr,t)}function _c(e,t){e.uniform4uiv(this.addr,t)}function vc(e,t,n){let r=this.cache,i=t.length,a=Is(n,i);Ps(r,a)||(e.uniform1iv(this.addr,a),Fs(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ws:Cs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function yc(e,t,n){let r=this.cache,i=t.length,a=Is(n,i);Ps(r,a)||(e.uniform1iv(this.addr,a),Fs(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Es,a[e])}function bc(e,t,n){let r=this.cache,i=t.length,a=Is(n,i);Ps(r,a)||(e.uniform1iv(this.addr,a),Fs(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Ds,a[e])}function xc(e,t,n){let r=this.cache,i=t.length,a=Is(n,i);Ps(r,a)||(e.uniform1iv(this.addr,a),Fs(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ts,a[e])}function Sc(e){switch(e){case 5126:return rc;case 35664:return ic;case 35665:return ac;case 35666:return oc;case 35674:return sc;case 35675:return cc;case 35676:return lc;case 5124:case 35670:return uc;case 35667:case 35671:return dc;case 35668:case 35672:return fc;case 35669:case 35673:return pc;case 5125:return mc;case 36294:return hc;case 36295:return gc;case 36296:return _c;case 35678:case 36198:case 36298:case 36306:case 35682:return vc;case 35679:case 36299:case 36307:return yc;case 35680:case 36300:case 36308:case 36293:return bc;case 36289:case 36303:case 36311:case 36292:return xc}}var Cc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nc(t.type)}},wc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sc(t.type)}},Tc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Ec=/(\w+)(\])?(\[|\.)?/g;function Dc(e,t){e.seq.push(t),e.map[t.id]=t}function Oc(e,t,n){let r=e.name,i=r.length;for(Ec.lastIndex=0;;){let a=Ec.exec(r),o=Ec.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Dc(n,l===void 0?new Cc(s,e,t):new wc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Tc(s),Dc(n,e)),n=e}}}var kc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Oc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ac(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var jc=37297,Mc=0;function Nc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Pc=new W;function Fc(e){Be._getMatrix(Pc,Be.workingColorSpace,e);let t=`mat3( ${Pc.elements.map(e=>e.toFixed(4))} )`;switch(Be.getTransfer(e)){case j:return[t,`LinearTransferOETF`];case M:return[t,`sRGBTransferOETF`];default:return R(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Ic(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Nc(e.getShaderSource(t),r)}return i}function Lc(e,t){let n=Fc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Rc={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function zc(e,t){let n=Rc[t];return n===void 0?(R(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Bc=new U;function Vc(){return Be.getLuminanceCoefficients(Bc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Bc.x.toFixed(4)}, ${Bc.y.toFixed(4)}, ${Bc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Hc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Gc).join(`
`)}function Uc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Wc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Gc(e){return e!==``}function Kc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function qc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Jc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yc(e){return e.replace(Jc,Zc)}var Xc=new Map;function Zc(e,t){let n=Io[t];if(n===void 0){let e=Xc.get(t);if(e!==void 0)n=Io[e],R(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Yc(n)}var Qc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $c(e){return e.replace(Qc,el)}function el(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function tl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var nl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function rl(e){return nl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var il={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function al(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:il[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var ol={302:`ENVMAP_MODE_REFRACTION`};function sl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:ol[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var cl={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function ll(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:cl[e.combine]||`ENVMAP_BLENDING_NONE`}function ul(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function dl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=rl(n),l=al(n),u=sl(n),d=ll(n),f=ul(n),p=Hc(n),m=Uc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Gc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Gc).join(`
`),_.length>0&&(_+=`
`)):(g=[tl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Gc).join(`
`),_=[tl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Io.tonemapping_pars_fragment,n.toneMapping===0?``:zc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Io.colorspace_pars_fragment,Lc(`linearToOutputTexel`,n.outputColorSpace),Vc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Gc).join(`
`)),o=Yc(o),o=Kc(o,n),o=qc(o,n),s=Yc(s),s=Kc(s,n),s=qc(s,n),o=$c(o),s=$c(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Ac(i,i.VERTEX_SHADER,y),S=Ac(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Ic(i,x,`vertex`),n=Ic(i,S,`fragment`);z(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):R(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new kc(i,h),T=Wc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,jc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Mc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var fl=0,pl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ml(e),t.set(e,n)),n}},ml=class{constructor(e){this.id=fl++,this.code=e,this.usedTimes=0}};function hl(e){return e===1030||e===37490||e===36285}function gl(e,t,n,r,i,a){let o=new ft,s=new pl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&R(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Lo[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,ee=!!i.map,F=!!i.matcap,te=!!x,I=!!i.aoMap,ne=!!i.lightMap,re=!!i.bumpMap&&i.wireframe===!1,ie=!!i.normalMap,L=!!i.displacementMap,z=!!i.emissiveMap,B=!!i.metalnessMap,ae=!!i.roughnessMap,oe=i.anisotropy>0,se=i.clearcoat>0,ce=i.dispersion>0,le=i.retroreflectivity>0,ue=i.iridescence>0,de=i.sheen>0,fe=i.transmission>0,V=oe&&!!i.anisotropyMap,pe=se&&!!i.clearcoatMap,me=se&&!!i.clearcoatNormalMap,he=se&&!!i.clearcoatRoughnessMap,ge=ue&&!!i.iridescenceMap,_e=ue&&!!i.iridescenceThicknessMap,ve=de&&!!i.sheenColorMap,ye=de&&!!i.sheenRoughnessMap,be=!!i.specularMap,xe=!!i.specularColorMap,Se=!!i.specularIntensityMap,Ce=fe&&!!i.transmissionMap,we=fe&&!!i.thicknessMap,Te=!!i.gradientMap,Ee=!!i.alphaMap,De=i.alphaTest>0,Oe=!!i.alphaHash,ke=!!i.extensions,Ae=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ae=e.toneMapping);let je={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Be.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ee,matcap:F,envMap:te,envMapMode:te&&x.mapping,envMapCubeUVHeight:S,aoMap:I,lightMap:ne,bumpMap:re,normalMap:ie,displacementMap:L,emissiveMap:z,normalMapObjectSpace:ie&&i.normalMapType===1,normalMapTangentSpace:ie&&i.normalMapType===0,packedNormalMap:ie&&i.normalMapType===0&&hl(i.normalMap.format),metalnessMap:B,roughnessMap:ae,anisotropy:oe,anisotropyMap:V,clearcoat:se,clearcoatMap:pe,clearcoatNormalMap:me,clearcoatRoughnessMap:he,dispersion:ce,retroreflection:le,iridescence:ue,iridescenceMap:ge,iridescenceThicknessMap:_e,sheen:de,sheenColorMap:ve,sheenRoughnessMap:ye,specularMap:be,specularColorMap:xe,specularIntensityMap:Se,transmission:fe,transmissionMap:Ce,thicknessMap:we,gradientMap:Te,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ee,alphaTest:De,alphaHash:Oe,combine:i.combine,mapUv:ee&&m(i.map.channel),aoMapUv:I&&m(i.aoMap.channel),lightMapUv:ne&&m(i.lightMap.channel),bumpMapUv:re&&m(i.bumpMap.channel),normalMapUv:ie&&m(i.normalMap.channel),displacementMapUv:L&&m(i.displacementMap.channel),emissiveMapUv:z&&m(i.emissiveMap.channel),metalnessMapUv:B&&m(i.metalnessMap.channel),roughnessMapUv:ae&&m(i.roughnessMap.channel),anisotropyMapUv:V&&m(i.anisotropyMap.channel),clearcoatMapUv:pe&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:me&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:ye&&m(i.sheenRoughnessMap.channel),specularMapUv:be&&m(i.specularMap.channel),specularColorMapUv:xe&&m(i.specularColorMap.channel),specularIntensityMapUv:Se&&m(i.specularIntensityMap.channel),transmissionMapUv:Ce&&m(i.transmissionMap.channel),thicknessMapUv:we&&m(i.thicknessMap.channel),alphaMapUv:Ee&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ie||oe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ee||Ee),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ie===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ae,decodeVideoTexture:ee&&i.map.isVideoTexture===!0&&Be.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:z&&i.emissiveMap.isVideoTexture===!0&&Be.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:ke&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(ke&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return je.vertexUv1s=c.has(1),je.vertexUv2s=c.has(2),je.vertexUv3s=c.has(3),c.clear(),je}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Lo[t];n=va.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new dl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function _l(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function vl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function yl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function bl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||vl),r.length>1&&r.sort(t||yl),i.length>1&&i.sort(t||yl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function xl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new bl,e.set(t,[i])):n>=r.length?(i=new bl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Sl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new U,color:new q};break;case`SpotLight`:n={position:new U,direction:new U,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new q,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new q,groundColor:new q};break;case`RectAreaLight`:n={color:new q,position:new U,halfWidth:new U,halfHeight:new U}}return e[t.id]=n,n}}}function Cl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var wl=0;function Tl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function El(e){let t=new Sl,n=Cl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new K,o=new K;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Tl);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=wl++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Dl(e){let t=new El(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Ol(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Dl(e),t.set(n,[a])):r>=i.length?(a=new Dl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var kl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Al=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,jl=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],Ml=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Nl=new K,Pl=new U,Fl=new U;function Il(e,t,n){let a=new Sr,o=new H,s=new H,d=new Ze,f=new Ea,p=new Da,m={},g=n.maxTextureSize,_={0:1,1:0,2:2},v=new xa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:kl,fragmentShader:Al}),b=v.clone();b.defines.HORIZONTAL_PASS=1;let x=new Y;x.setAttribute(`position`,new Cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new or(x,v),C=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let w=this.type;this.render=function(t,n,f){if(C.enabled===!1||C.autoUpdate===!1&&C.needsUpdate===!1||t.length===0)return;this.type===2&&(R(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let p=e.getRenderTarget(),m=e.getActiveCubeFace(),_=e.getActiveMipmapLevel(),v=e.state;v.setBlending(0),v.buffers.depth.getReversed()===!0?v.buffers.color.setClear(0,0,0,0):v.buffers.color.setClear(1,1,1,1),v.buffers.depth.setTest(!0),v.setScissorTest(!1);let b=w!==this.type;b&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let p=0,m=t.length;p<m;p++){let m=t[p],_=m.shadow;if(_===void 0){R(`WebGLShadowMap:`,m,`has no shadow.`);continue}if(_.autoUpdate===!1&&_.needsUpdate===!1)continue;o.copy(_.mapSize);let x=_.getFrameExtents();o.multiply(x),s.copy(_.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(s.x=Math.floor(g/x.x),o.x=s.x*x.x,_.mapSize.x=s.x),o.y>g&&(s.y=Math.floor(g/x.y),o.y=s.y*x.y,_.mapSize.y=s.y));let S=e.state.buffers.depth.getReversed();if(_.camera._reversedDepth=S,_.map===null||b===!0){if(_.map!==null&&(_.map.depthTexture!==null&&(_.map.depthTexture.dispose(),_.map.depthTexture=null),_.map.dispose()),this.type===3){if(m.isPointLight){R(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}_.map=new $e(o.x,o.y,{format:y,type:u,minFilter:i,magFilter:i,generateMipmaps:!1}),_.map.texture.name=m.name+`.shadowMap`,_.map.depthTexture=new Mr(o.x,o.y,l),_.map.depthTexture.name=m.name+`.shadowMapDepth`,_.map.depthTexture.format=h,_.map.depthTexture.compareFunction=null,_.map.depthTexture.minFilter=r,_.map.depthTexture.magFilter=r}else m.isPointLight?(_.map=new ps(o.x),_.map.depthTexture=new Nr(o.x,c)):(_.map=new $e(o.x,o.y),_.map.depthTexture=new Mr(o.x,o.y,c)),_.map.depthTexture.name=m.name+`.shadowMap`,_.map.depthTexture.format=h,this.type===1?(_.map.depthTexture.compareFunction=S?518:515,_.map.depthTexture.minFilter=i,_.map.depthTexture.magFilter=i):(_.map.depthTexture.compareFunction=null,_.map.depthTexture.minFilter=r,_.map.depthTexture.magFilter=r);_.camera.updateProjectionMatrix()}_.map.isWebGLCubeRenderTarget!==!0&&(_.map.width!==o.x||_.map.height!==o.y)&&_.map.setSize(o.x,o.y);let C=_.map.isWebGLCubeRenderTarget?6:_.getViewportCount();m.isPointLight!==!0&&_.updateMatrices(m,f);for(let t=0;t<C;t++){let r=_.getCamera(t);if(m.isPointLight){let e=_.camera,n=_.matrix,r=m.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Pl.setFromMatrixPosition(m.matrixWorld),e.position.copy(Pl),Fl.copy(e.position),Fl.add(jl[t]),e.up.copy(Ml[t]),e.lookAt(Fl),e.updateMatrixWorld(),n.makeTranslation(-Pl.x,-Pl.y,-Pl.z),Nl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),_._frustum.setFromProjectionMatrix(Nl,e.coordinateSystem,e.reversedDepth)}if(_.map.isWebGLCubeRenderTarget)e.setRenderTarget(_.map,t),e.clear();else{t===0&&(e.setRenderTarget(_.map),e.clear());let n=_.getViewport(t);d.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),v.viewport(d)}a=_.getFrustum(t),D(n,f,r,m,this.type)}_.isPointLightShadow!==!0&&this.type===3&&T(_,f),_.needsUpdate=!1}w=this.type,C.needsUpdate=!1,e.setRenderTarget(p,m,_)};function T(n,r){let i=t.update(S);v.defines.VSM_SAMPLES!==n.blurSamples&&(v.defines.VSM_SAMPLES=n.blurSamples,b.defines.VSM_SAMPLES=n.blurSamples,v.needsUpdate=!0,b.needsUpdate=!0),n.mapPass===null?n.mapPass=new $e(o.x,o.y,{format:y,type:u}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),v.uniforms.shadow_pass.value=n.map.depthTexture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,v,S,null),b.uniforms.shadow_pass.value=n.mapPass.texture,b.uniforms.resolution.value.set(n.map.width,n.map.height),b.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,b,S,null)}function E(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?p:f,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=m[e];r===void 0&&(r={},m[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,O)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?_[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function D(n,r,i,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(a))){n.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse,n.matrixWorld);let a=t.update(n),c=n.material;if(Array.isArray(c)){let t=a.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=E(n,d,o,s);n.onBeforeShadow(e,n,r,i,a,t,u),e.renderBufferDirect(i,null,a,t,n,u),n.onAfterShadow(e,n,r,i,a,t,u)}}}else if(c.visible){let t=E(n,c,o,s);n.onBeforeShadow(e,n,r,i,a,t,null),e.renderBufferDirect(i,null,a,t,n,null),n.onAfterShadow(e,n,r,i,a,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)D(c[e],r,i,o,s)}function O(e){e.target.removeEventListener(`dispose`,O);for(let t in m){let n=m[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Ll(e,t){function n(){let t=!1,n=new Ze,r=null,i=new Ze(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?B(e.DEPTH_TEST):ae(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=oe[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?B(e.STENCIL_TEST):ae(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,ee=e.getParameter(e.VERSION);ee.indexOf(`WebGL`)===-1?ee.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(ee)[1]),N=P>=1);let F=null,te={},I=e.getParameter(e.SCISSOR_BOX),ne=e.getParameter(e.VIEWPORT),re=new Ze().fromArray(I),ie=new Ze().fromArray(ne);function L(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let R={};R[e.TEXTURE_2D]=L(e.TEXTURE_2D,e.TEXTURE_2D,1),R[e.TEXTURE_CUBE_MAP]=L(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),R[e.TEXTURE_2D_ARRAY]=L(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),R[e.TEXTURE_3D]=L(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),B(e.DEPTH_TEST),o.setFunc(3),pe(!1),me(1),B(e.CULL_FACE),fe(0);function B(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ae(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function se(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ce(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function le(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ue={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ue[103]=e.MIN,ue[104]=e.MAX;let de={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function fe(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ae(e.BLEND),g=!1);else if(g===!1&&(B(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:z(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:z(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:z(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:z(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ue[n],ue[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(de[r],de[i],de[o],de[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function V(t,n){t.side===2?ae(e.CULL_FACE):B(e.CULL_FACE);let r=t.side===1;n&&(r=!r),pe(r),t.blending===1&&t.transparent===!1?fe(0):fe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ge(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?B(e.SAMPLE_ALPHA_TO_COVERAGE):ae(e.SAMPLE_ALPHA_TO_COVERAGE)}function pe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function me(t){t===0?ae(e.CULL_FACE):(B(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function he(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ge(t,n,r){t?(B(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ae(e.POLYGON_OFFSET_FILL)}function _e(t){t?B(e.SCISSOR_TEST):ae(e.SCISSOR_TEST)}function ve(t){t===void 0&&(t=e.TEXTURE0+M-1),F!==t&&(e.activeTexture(t),F=t)}function ye(t,n,r){r===void 0&&(r=F===null?e.TEXTURE0+M-1:F);let i=te[r];i===void 0&&(i={type:void 0,texture:void 0},te[r]=i),(i.type!==t||i.texture!==n)&&(F!==r&&(e.activeTexture(r),F=r),e.bindTexture(t,n||R[t]),i.type=t,i.texture=n)}function be(){let t=te[F];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function xe(){try{e.compressedTexImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Se(){try{e.compressedTexImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ce(){try{e.texSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function we(){try{e.texSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Te(){try{e.compressedTexSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function De(){try{e.texStorage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Oe(){try{e.texStorage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function ke(){try{e.texImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ae(){try{e.texImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function je(t){return d[t]===void 0?e.getParameter(t):d[t]}function Me(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ne(t){re.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),re.copy(t))}function H(t){ie.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ie.copy(t))}function Pe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function U(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},F=null,te={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,re.set(0,0,e.canvas.width,e.canvas.height),ie.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:B,disable:ae,bindFramebuffer:se,drawBuffers:ce,useProgram:le,setBlending:fe,setMaterial:V,setFlipSided:pe,setCullFace:me,setLineWidth:he,setPolygonOffset:ge,setScissorTest:_e,activeTexture:ve,bindTexture:ye,unbindTexture:be,compressedTexImage2D:xe,compressedTexImage3D:Se,texImage2D:ke,texImage3D:Ae,pixelStorei:Me,getParameter:je,updateUBOMapping:Pe,uniformBlockBinding:U,texStorage2D:De,texStorage3D:Oe,texSubImage2D:Ce,texSubImage3D:we,compressedTexSubImage2D:Te,compressedTexSubImage3D:Ee,scissor:Ne,viewport:H,reset:Fe}}function Rl(o,s,c,l,u,d,f){let p=s.has(`WEBGL_multisampled_render_to_texture`)?s.get(`WEBGL_multisampled_render_to_texture`):null,m=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),h=new H,_=new WeakMap,v=new Set,y,b=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function S(e,t){return x?new OffscreenCanvas(e,t):I(`canvas`)}function C(e,t,n){let r=1,i=Ae(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);y===void 0&&(y=S(n,a));let o=t?S(n,a):y;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),R(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&R(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function w(e){return e.generateMipmaps}function T(e){o.generateMipmap(e)}function E(e){return e.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?o.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function D(e,t,n,r,i,a=!1){if(e!==null){if(o[e]!==void 0)return o[e];R(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let c;r&&(c=s.get(`EXT_texture_norm16`),c||R(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=t;if(t===o.RED&&(n===o.FLOAT&&(l=o.R32F),n===o.HALF_FLOAT&&(l=o.R16F),n===o.UNSIGNED_BYTE&&(l=o.R8),n===o.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),n===o.SHORT&&c&&(l=c.R16_SNORM_EXT)),t===o.RED_INTEGER&&(n===o.UNSIGNED_BYTE&&(l=o.R8UI),n===o.UNSIGNED_SHORT&&(l=o.R16UI),n===o.UNSIGNED_INT&&(l=o.R32UI),n===o.BYTE&&(l=o.R8I),n===o.SHORT&&(l=o.R16I),n===o.INT&&(l=o.R32I)),t===o.RG&&(n===o.FLOAT&&(l=o.RG32F),n===o.HALF_FLOAT&&(l=o.RG16F),n===o.UNSIGNED_BYTE&&(l=o.RG8),n===o.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),n===o.SHORT&&c&&(l=c.RG16_SNORM_EXT)),t===o.RG_INTEGER&&(n===o.UNSIGNED_BYTE&&(l=o.RG8UI),n===o.UNSIGNED_SHORT&&(l=o.RG16UI),n===o.UNSIGNED_INT&&(l=o.RG32UI),n===o.BYTE&&(l=o.RG8I),n===o.SHORT&&(l=o.RG16I),n===o.INT&&(l=o.RG32I)),t===o.RGB_INTEGER&&(n===o.UNSIGNED_BYTE&&(l=o.RGB8UI),n===o.UNSIGNED_SHORT&&(l=o.RGB16UI),n===o.UNSIGNED_INT&&(l=o.RGB32UI),n===o.BYTE&&(l=o.RGB8I),n===o.SHORT&&(l=o.RGB16I),n===o.INT&&(l=o.RGB32I)),t===o.RGBA_INTEGER&&(n===o.UNSIGNED_BYTE&&(l=o.RGBA8UI),n===o.UNSIGNED_SHORT&&(l=o.RGBA16UI),n===o.UNSIGNED_INT&&(l=o.RGBA32UI),n===o.BYTE&&(l=o.RGBA8I),n===o.SHORT&&(l=o.RGBA16I),n===o.INT&&(l=o.RGBA32I)),t===o.RGB&&(n===o.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),n===o.SHORT&&c&&(l=c.RGB16_SNORM_EXT),n===o.UNSIGNED_INT_5_9_9_9_REV&&(l=o.RGB9_E5),n===o.UNSIGNED_INT_10F_11F_11F_REV&&(l=o.R11F_G11F_B10F)),t===o.RGBA){let e=a?j:Be.getTransfer(i);n===o.FLOAT&&(l=o.RGBA32F),n===o.HALF_FLOAT&&(l=o.RGBA16F),n===o.UNSIGNED_BYTE&&(l=e===`srgb`?o.SRGB8_ALPHA8:o.RGBA8),n===o.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),n===o.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),n===o.UNSIGNED_SHORT_4_4_4_4&&(l=o.RGBA4),n===o.UNSIGNED_SHORT_5_5_5_1&&(l=o.RGB5_A1)}return(l===o.R16F||l===o.R32F||l===o.RG16F||l===o.RG32F||l===o.RGBA16F||l===o.RGBA32F)&&s.get(`EXT_color_buffer_float`),l}function O(e,t){let n;return e?t===null||t===1014||t===1020?n=o.DEPTH24_STENCIL8:t===1015?n=o.DEPTH32F_STENCIL8:t===1012&&(n=o.DEPTH24_STENCIL8,R(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=o.DEPTH_COMPONENT24:t===1015?n=o.DEPTH_COMPONENT32F:t===1012&&(n=o.DEPTH_COMPONENT16),n}function k(e,t){return w(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function A(e){let t=e.target;t.removeEventListener(`dispose`,A),N(t),t.isVideoTexture&&_.delete(t),t.isHTMLTexture&&v.delete(t)}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),ee(t)}function N(e){let t=l.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=b.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&P(e),Object.keys(r).length===0&&b.delete(n)}l.remove(e)}function P(e){let t=l.get(e);o.deleteTexture(t.__webglTexture);let n=e.source,r=b.get(n);delete r[t.__cacheKey],f.memory.textures--}function ee(e){let t=l.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),l.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)o.deleteFramebuffer(t.__webglFramebuffer[e][n]);else o.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&o.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)o.deleteFramebuffer(t.__webglFramebuffer[e]);else o.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&o.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&o.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&o.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&o.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=l.get(n[e]);t.__webglTexture&&(o.deleteTexture(t.__webglTexture),f.memory.textures--),l.remove(n[e])}l.remove(e)}let F=0;function te(){F=0}function ne(){return F}function re(e){F=e}function ie(){let e=F;return e>=u.maxTextures&&R(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+u.maxTextures),F+=1,e}function L(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function B(e,t){let n=l.get(e);if(e.isVideoTexture&&Oe(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)R(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)R(`WebGLRenderer: Texture marked for update but image is incomplete`);else{me(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);c.bindTexture(o.TEXTURE_2D,n.__webglTexture,o.TEXTURE0+t)}function ae(e,t){let n=l.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?me(n,e,t):(e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),c.bindTexture(o.TEXTURE_2D_ARRAY,n.__webglTexture,o.TEXTURE0+t))}function oe(e,t){let n=l.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?me(n,e,t):c.bindTexture(o.TEXTURE_3D,n.__webglTexture,o.TEXTURE0+t)}function se(e,t){let n=l.get(e);e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version?he(n,e,t):c.bindTexture(o.TEXTURE_CUBE_MAP,n.__webglTexture,o.TEXTURE0+t)}let ce={[e]:o.REPEAT,[t]:o.CLAMP_TO_EDGE,[n]:o.MIRRORED_REPEAT},le={[r]:o.NEAREST,1004:o.NEAREST_MIPMAP_NEAREST,1005:o.NEAREST_MIPMAP_LINEAR,[i]:o.LINEAR,1007:o.LINEAR_MIPMAP_NEAREST,[a]:o.LINEAR_MIPMAP_LINEAR},ue={512:o.NEVER,519:o.ALWAYS,513:o.LESS,515:o.LEQUAL,514:o.EQUAL,518:o.GEQUAL,516:o.GREATER,517:o.NOTEQUAL};function de(e,t){if(t.type===1015&&s.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&R(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),o.texParameteri(e,o.TEXTURE_WRAP_S,ce[t.wrapS]),o.texParameteri(e,o.TEXTURE_WRAP_T,ce[t.wrapT]),(e===o.TEXTURE_3D||e===o.TEXTURE_2D_ARRAY)&&o.texParameteri(e,o.TEXTURE_WRAP_R,ce[t.wrapR]),o.texParameteri(e,o.TEXTURE_MAG_FILTER,le[t.magFilter]),o.texParameteri(e,o.TEXTURE_MIN_FILTER,le[t.minFilter]),t.compareFunction&&(o.texParameteri(e,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(e,o.TEXTURE_COMPARE_FUNC,ue[t.compareFunction])),s.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&s.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||l.get(t).__currentAnisotropy){let n=s.get(`EXT_texture_filter_anisotropic`);o.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,u.getMaxAnisotropy())),l.get(t).__currentAnisotropy=t.anisotropy}}}function fe(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,A));let r=t.source,i=b.get(r);i===void 0&&(i={},b.set(r,i));let a=L(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:o.createTexture(),usedTimes:0},f.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&P(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function V(e,t,n){return Math.floor(Math.floor(e/n)/t)}function pe(e,t,n,r){let i=e.updateRanges;if(i.length===0)c.texSubImage2D(o.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=V(r.start,t.width,4),c=V(n.start,t.width,4);r.start<=o+1&&s===c&&V(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let s=c.getParameter(o.UNPACK_ROW_LENGTH),l=c.getParameter(o.UNPACK_SKIP_PIXELS),u=c.getParameter(o.UNPACK_SKIP_ROWS);c.pixelStorei(o.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],s=Math.floor(a.start/4),l=Math.ceil(a.count/4),u=s%t.width,d=Math.floor(s/t.width),f=l;c.pixelStorei(o.UNPACK_SKIP_PIXELS,u),c.pixelStorei(o.UNPACK_SKIP_ROWS,d),c.texSubImage2D(o.TEXTURE_2D,0,u,d,f,1,n,r,t.data)}e.clearUpdateRanges(),c.pixelStorei(o.UNPACK_ROW_LENGTH,s),c.pixelStorei(o.UNPACK_SKIP_PIXELS,l),c.pixelStorei(o.UNPACK_SKIP_ROWS,u)}}function me(e,t,n){let r=o.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=o.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=o.TEXTURE_3D);let i=fe(e,t),a=t.source;c.bindTexture(r,e.__webglTexture,o.TEXTURE0+n);let s=l.get(a);if(a.version!==s.__version||i===!0){if(c.activeTexture(o.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=Be.getPrimaries(Be.workingColorSpace),n=t.colorSpace===``?null:Be.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?o.NONE:o.BROWSER_DEFAULT_WEBGL;c.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,t.flipY),c.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),c.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}c.pixelStorei(o.UNPACK_ALIGNMENT,t.unpackAlignment);let e=C(t.image,!1,u.maxTextureSize);e=ke(t,e);let l=d.convert(t.format,t.colorSpace),f=d.convert(t.type),p=D(t.internalFormat,l,f,t.normalized,t.colorSpace,t.isVideoTexture);de(r,t);let m,h=t.mipmaps,_=t.isVideoTexture!==!0,y=s.__version===void 0||i===!0,b=a.dataReady,x=k(t,e);if(t.isDepthTexture)p=O(t.format===g,t.type),y&&(_?c.texStorage2D(o.TEXTURE_2D,1,p,e.width,e.height):c.texImage2D(o.TEXTURE_2D,0,p,e.width,e.height,0,l,f,null));else if(t.isDataTexture){if(h.length>0){_&&y&&c.texStorage2D(o.TEXTURE_2D,x,p,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)m=h[e],_?b&&c.texSubImage2D(o.TEXTURE_2D,e,0,0,m.width,m.height,l,f,m.data):c.texImage2D(o.TEXTURE_2D,e,p,m.width,m.height,0,l,f,m.data);t.generateMipmaps=!1}else _?(y&&c.texStorage2D(o.TEXTURE_2D,x,p,e.width,e.height),b&&pe(t,e,l,f)):c.texImage2D(o.TEXTURE_2D,0,p,e.width,e.height,0,l,f,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){_&&y&&c.texStorage3D(o.TEXTURE_2D_ARRAY,x,p,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(m=h[n],t.format!==1023){if(l!==null){if(_){if(b){if(t.layerUpdates.size>0){let e=Mo(m.width,m.height,t.format,t.type);for(let r of t.layerUpdates){let t=m.data.subarray(r*e/m.data.BYTES_PER_ELEMENT,(r+1)*e/m.data.BYTES_PER_ELEMENT);c.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,n,0,0,r,m.width,m.height,1,l,t)}}else c.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,n,0,0,0,m.width,m.height,e.depth,l,m.data)}}else c.compressedTexImage3D(o.TEXTURE_2D_ARRAY,n,p,m.width,m.height,e.depth,0,m.data,0,0)}else R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?b&&c.texSubImage3D(o.TEXTURE_2D_ARRAY,n,0,0,0,m.width,m.height,e.depth,l,f,m.data):c.texImage3D(o.TEXTURE_2D_ARRAY,n,p,m.width,m.height,e.depth,0,l,f,m.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{_&&y&&c.texStorage2D(o.TEXTURE_2D,x,p,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)m=h[e],t.format===1023?_?b&&c.texSubImage2D(o.TEXTURE_2D,e,0,0,m.width,m.height,l,f,m.data):c.texImage2D(o.TEXTURE_2D,e,p,m.width,m.height,0,l,f,m.data):l===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?b&&c.compressedTexSubImage2D(o.TEXTURE_2D,e,0,0,m.width,m.height,l,m.data):c.compressedTexImage2D(o.TEXTURE_2D,e,p,m.width,m.height,0,m.data)}}else if(t.isDataArrayTexture){if(_){if(y&&c.texStorage3D(o.TEXTURE_2D_ARRAY,x,p,e.width,e.height,e.depth),b){if(t.layerUpdates.size>0){let n=Mo(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);c.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,l,f,t)}t.clearLayerUpdates()}else c.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,l,f,e.data)}}else c.texImage3D(o.TEXTURE_2D_ARRAY,0,p,e.width,e.height,e.depth,0,l,f,e.data)}else if(t.isData3DTexture)_?(y&&c.texStorage3D(o.TEXTURE_3D,x,p,e.width,e.height,e.depth),b&&c.texSubImage3D(o.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,l,f,e.data)):c.texImage3D(o.TEXTURE_3D,0,p,e.width,e.height,e.depth,0,l,f,e.data);else if(t.isFramebufferTexture){if(y){if(_)c.texStorage2D(o.TEXTURE_2D,x,p,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<x;e++)c.texImage2D(o.TEXTURE_2D,e,p,t,n,0,l,f,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in o){let n=o.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),v.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of v)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(o.texElementImage2D.length===3)o.texElementImage2D(o.TEXTURE_2D,o.RGBA8,e);else{let t=o.RGBA,n=o.RGBA,r=o.UNSIGNED_BYTE;o.texElementImage2D(o.TEXTURE_2D,0,t,n,r,e)}o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE)}}else if(h.length>0){if(_&&y){let e=Ae(h[0]);c.texStorage2D(o.TEXTURE_2D,x,p,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)m=h[e],_?b&&c.texSubImage2D(o.TEXTURE_2D,e,0,0,l,f,m):c.texImage2D(o.TEXTURE_2D,e,p,l,f,m);t.generateMipmaps=!1}else if(_){if(y){let t=Ae(e);c.texStorage2D(o.TEXTURE_2D,x,p,t.width,t.height)}b&&c.texSubImage2D(o.TEXTURE_2D,0,0,0,l,f,e)}else c.texImage2D(o.TEXTURE_2D,0,p,l,f,e);w(t)&&T(r),s.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function he(e,t,n){if(t.image.length!==6)return;let r=fe(e,t),i=t.source;c.bindTexture(o.TEXTURE_CUBE_MAP,e.__webglTexture,o.TEXTURE0+n);let a=l.get(i);if(i.version!==a.__version||r===!0){c.activeTexture(o.TEXTURE0+n);let e=Be.getPrimaries(Be.workingColorSpace),s=t.colorSpace===``?null:Be.getPrimaries(t.colorSpace),l=t.colorSpace===``||e===s?o.NONE:o.BROWSER_DEFAULT_WEBGL;c.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,t.flipY),c.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),c.pixelStorei(o.UNPACK_ALIGNMENT,t.unpackAlignment),c.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,l);let f=t.isCompressedTexture||t.image[0].isCompressedTexture,p=t.image[0]&&t.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=C(t.image[e],!0,u.maxCubemapSize):m[e]=p?t.image[e].image:t.image[e],m[e]=ke(t,m[e]);let h=m[0],g=d.convert(t.format,t.colorSpace),_=d.convert(t.type),v=D(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=k(t,h);de(o.TEXTURE_CUBE_MAP,t);let E;if(f){y&&b&&c.texStorage2D(o.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){E=m[e].mipmaps;for(let n=0;n<E.length;n++){let r=E[n];t.format===1023?y?x&&c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&c.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):c.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(E=t.mipmaps,y&&b){E.length>0&&S++;let e=Ae(m[0]);c.texStorage2D(o.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(p){y?x&&c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,m[e].width,m[e].height,g,_,m[e].data):c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,m[e].width,m[e].height,0,g,_,m[e].data);for(let t=0;t<E.length;t++){let n=E[t].image[e].image;y?x&&c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,m[e]):c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,m[e]);for(let t=0;t<E.length;t++){let n=E[t];y?x&&c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}w(t)&&T(o.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ge(e,t,n,r,i,a){let s=d.convert(n.format,n.colorSpace),u=d.convert(n.type),f=D(n.internalFormat,s,u,n.normalized,n.colorSpace),m=l.get(t),h=l.get(n);if(h.__renderTarget=t,!m.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===o.TEXTURE_3D||i===o.TEXTURE_2D_ARRAY?c.texImage3D(i,a,f,e,n,t.depth,0,s,u,null):c.texImage2D(i,a,f,e,n,0,s,u,null)}c.bindFramebuffer(o.FRAMEBUFFER,e),De(t)?p.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,r,i,h.__webglTexture,0,Ee(t)):(i===o.TEXTURE_2D||i>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,r,i,h.__webglTexture,a),c.bindFramebuffer(o.FRAMEBUFFER,null)}function _e(e,t,n){if(o.bindRenderbuffer(o.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=O(t.stencilBuffer,i),s=t.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;De(t)?p.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Ee(t),a,t.width,t.height):n?o.renderbufferStorageMultisample(o.RENDERBUFFER,Ee(t),a,t.width,t.height):o.renderbufferStorage(o.RENDERBUFFER,a,t.width,t.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,s,o.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=d.convert(i.format,i.colorSpace),s=d.convert(i.type),c=D(i.internalFormat,a,s,i.normalized,i.colorSpace);De(t)?p.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Ee(t),c,t.width,t.height):n?o.renderbufferStorageMultisample(o.RENDERBUFFER,Ee(t),c,t.width,t.height):o.renderbufferStorage(o.RENDERBUFFER,c,t.width,t.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function ve(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(c.bindFramebuffer(o.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=l.get(t.depthTexture);if(i.__renderTarget=t,i.__webglTexture&&t.depthTexture.image.width===t.width&&t.depthTexture.image.height===t.height||(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,A)),i.__webglTexture===void 0){i.__webglTexture=o.createTexture(),c.bindTexture(o.TEXTURE_CUBE_MAP,i.__webglTexture),de(o.TEXTURE_CUBE_MAP,t.depthTexture);let e=d.convert(t.depthTexture.format),n=d.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=o.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=o.DEPTH24_STENCIL8);for(let i=0;i<6;i++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else B(t.depthTexture,0);let a=i.__webglTexture,s=Ee(t),u=r?o.TEXTURE_CUBE_MAP_POSITIVE_X+n:o.TEXTURE_2D,f=t.depthTexture.format===1027?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)De(t)?p.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,f,u,a,0,s):o.framebufferTexture2D(o.FRAMEBUFFER,f,u,a,0);else if(t.depthTexture.format===1027)De(t)?p.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,f,u,a,0,s):o.framebufferTexture2D(o.FRAMEBUFFER,f,u,a,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ye(e){let t=l.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)ve(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?ve(t.__webglFramebuffer[0],e,0):ve(t.__webglFramebuffer,e,0)}}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(c.bindFramebuffer(o.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=o.createRenderbuffer(),_e(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];o.bindRenderbuffer(o.RENDERBUFFER,i),o.framebufferRenderbuffer(o.FRAMEBUFFER,r,o.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?c.bindFramebuffer(o.FRAMEBUFFER,t.__webglFramebuffer[0]):c.bindFramebuffer(o.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=o.createRenderbuffer(),_e(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,r),o.framebufferRenderbuffer(o.FRAMEBUFFER,n,o.RENDERBUFFER,r)}}c.bindFramebuffer(o.FRAMEBUFFER,null)}function be(e,t,n){let r=l.get(e);t!==void 0&&ge(r.__webglFramebuffer,e,e.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),n!==void 0&&ye(e)}function xe(e){let t=e.texture,n=l.get(e),r=l.get(t);e.addEventListener(`dispose`,M);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,s=i.length>1;if(s||(r.__webglTexture===void 0&&(r.__webglTexture=o.createTexture()),r.__version=t.version,f.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=o.createFramebuffer()}else n.__webglFramebuffer[e]=o.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=o.createFramebuffer()}else n.__webglFramebuffer=o.createFramebuffer();if(s)for(let e=0,t=i.length;e<t;e++){let t=l.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=o.createTexture(),f.memory.textures++)}if(e.samples>0&&De(e)===!1){n.__webglMultisampledFramebuffer=o.createFramebuffer(),n.__webglColorRenderbuffer=[],c.bindFramebuffer(o.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=d.convert(r.format,r.colorSpace),s=d.convert(r.type),c=D(r.internalFormat,a,s,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),l=Ee(e);o.renderbufferStorageMultisample(o.RENDERBUFFER,l,c,e.width,e.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+t,o.RENDERBUFFER,n.__webglColorRenderbuffer[t])}o.bindRenderbuffer(o.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=o.createRenderbuffer(),_e(n.__webglDepthRenderbuffer,e,!0)),c.bindFramebuffer(o.FRAMEBUFFER,null)}}if(a){c.bindTexture(o.TEXTURE_CUBE_MAP,r.__webglTexture),de(o.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)ge(n.__webglFramebuffer[r][i],e,t,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else ge(n.__webglFramebuffer[r],e,t,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);w(t)&&T(o.TEXTURE_CUBE_MAP),c.unbindTexture()}else if(s){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=l.get(r),s=o.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(s=e.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),c.bindTexture(s,a.__webglTexture),de(s,r),ge(n.__webglFramebuffer,e,r,o.COLOR_ATTACHMENT0+t,s,0),w(r)&&T(s)}c.unbindTexture()}else{let i=o.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),c.bindTexture(i,r.__webglTexture),de(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)ge(n.__webglFramebuffer[r],e,t,o.COLOR_ATTACHMENT0,i,r);else ge(n.__webglFramebuffer,e,t,o.COLOR_ATTACHMENT0,i,0);w(t)&&T(i),c.unbindTexture()}e.depthBuffer&&ye(e)}function Se(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(w(r)){let t=E(e),n=l.get(r).__webglTexture;c.bindTexture(t,n),T(t),c.unbindTexture()}}}let Ce=[],we=[];function Te(e){if(e.samples>0){if(De(e)===!1){let t=e.textures,n=e.width,r=e.height,i=o.COLOR_BUFFER_BIT,a=e.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,s=l.get(e),u=t.length>1;if(u)for(let e=0;e<t.length;e++)c.bindFramebuffer(o.FRAMEBUFFER,s.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+e,o.RENDERBUFFER,null),c.bindFramebuffer(o.FRAMEBUFFER,s.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+e,o.TEXTURE_2D,null,0);c.bindFramebuffer(o.READ_FRAMEBUFFER,s.__webglMultisampledFramebuffer);let d=e.texture.mipmaps;d&&d.length>0?c.bindFramebuffer(o.DRAW_FRAMEBUFFER,s.__webglFramebuffer[0]):c.bindFramebuffer(o.DRAW_FRAMEBUFFER,s.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=o.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=o.STENCIL_BUFFER_BIT)),u){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,s.__webglColorRenderbuffer[c]);let e=l.get(t[c]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0)}o.blitFramebuffer(0,0,n,r,0,0,n,r,i,o.NEAREST),m===!0&&(Ce.length=0,we.length=0,Ce.push(o.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(Ce.push(a),we.push(a),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,we)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,Ce))}if(c.bindFramebuffer(o.READ_FRAMEBUFFER,null),c.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),u)for(let e=0;e<t.length;e++){c.bindFramebuffer(o.FRAMEBUFFER,s.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+e,o.RENDERBUFFER,s.__webglColorRenderbuffer[e]);let n=l.get(t[e]).__webglTexture;c.bindFramebuffer(o.FRAMEBUFFER,s.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+e,o.TEXTURE_2D,n,0)}c.bindFramebuffer(o.DRAW_FRAMEBUFFER,s.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&m){let t=e.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[t])}}}function Ee(e){return Math.min(u.maxSamples,e.samples)}function De(e){let t=l.get(e);return e.samples>0&&s.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function Oe(e){let t=f.render.frame;_.get(e)!==t&&(_.set(e,t),e.update())}function ke(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Be.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&R(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):z(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ae(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(h.width=e.naturalWidth||e.width,h.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(h.width=e.displayWidth,h.height=e.displayHeight):(h.width=e.width,h.height=e.height),h}this.allocateTextureUnit=ie,this.resetTextureUnits=te,this.getTextureUnits=ne,this.setTextureUnits=re,this.setTexture2D=B,this.setTexture2DArray=ae,this.setTexture3D=oe,this.setTextureCube=se,this.rebindTextures=be,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=De,this.isReversedDepthBuffer=function(){return c.buffers.depth.getReversed()}}function zl(e,t){function n(n,r=``){let i,a=Be.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Bl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Vl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Hl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Pr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new xa({vertexShader:Bl,fragmentShader:Vl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new or(new oa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ul=class extends se{constructor(e,t){super();let n=this,r=null,i=1,a=null,s=`local-floor`,l=1,u=null,d=null,f=null,_=null,v=null,y=null,b=typeof XRWebGLBinding<`u`,x=new Hl,S={},C=t.getContextAttributes(),w=null,T=null,E=[],D=[],O=new H,k=null,A=null,j=new oo;j.viewport=new Ze;let M=new oo;M.viewport=new Ze;let N=[j,M],P=new _o,ee=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=E[e];return t===void 0&&(t=new jt,E[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=E[e];return t===void 0&&(t=new jt,E[e]=t),t.getGripSpace()},this.getHand=function(e){let t=E[e];return t===void 0&&(t=new jt,E[e]=t),t.getHandSpace()};function te(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=E[t];n!==void 0&&(n.update(e.inputSource,e.frame,u||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function I(){r.removeEventListener(`select`,te),r.removeEventListener(`selectstart`,te),r.removeEventListener(`selectend`,te),r.removeEventListener(`squeeze`,te),r.removeEventListener(`squeezestart`,te),r.removeEventListener(`squeezeend`,te),r.removeEventListener(`end`,I),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<E.length;e++){let t=D[e];t!==null&&(D[e]=null,E[e].disconnect(t))}ee=null,F=null,x.reset();for(let e in S)delete S[e];if(e.setRenderTarget(w),v=null,_=null,f=null,r=null,T=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(O.width,O.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){s=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(e){u=e},this.getBaseLayer=function(){return _===null?v:_},this.getBinding=function(){return f===null&&b&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return y},this.getSession=function(){return r},this.setSession=async function(d){if(r=d,r!==null){if(w=e.getRenderTarget(),r.addEventListener(`select`,te),r.addEventListener(`selectstart`,te),r.addEventListener(`selectend`,te),r.addEventListener(`squeeze`,te),r.addEventListener(`squeezestart`,te),r.addEventListener(`squeezeend`,te),r.addEventListener(`end`,I),r.addEventListener(`inputsourceschange`,ne),C.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(O),b&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,s=null;C.depth&&(s=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=C.stencil?g:h,a=C.stencil?p:c);let l={colorFormat:t.RGBA8,depthFormat:s,scaleFactor:i};f=this.getBinding(),_=f.createProjectionLayer(l),r.updateRenderState({layers:[_]}),e.setPixelRatio(1),e.setSize(_.textureWidth,_.textureHeight,!1),T=new $e(_.textureWidth,_.textureHeight,{format:m,type:o,depthTexture:new Mr(_.textureWidth,_.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1,storeMultisampledDepthBuffer:_.ignoreDepthValues===!1,storeMultisampledStencilBuffer:_.ignoreDepthValues===!1})}else{let n={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:i};v=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:v}),e.setPixelRatio(1),e.setSize(v.framebufferWidth,v.framebufferHeight,!1),T=new $e(v.framebufferWidth,v.framebufferHeight,{format:m,type:o,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),u=null,a=await r.requestReferenceSpace(s),se.setContext(r),se.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,E[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<E.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=E[r];i&&i.connect(n)}}let re=new U,ie=new U;function L(e,t,n){re.setFromMatrixPosition(t.matrixWorld),ie.setFromMatrixPosition(n.matrixWorld);let r=re.distanceTo(ie),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function z(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;x.texture!==null&&(x.depthNear>0&&(t=x.depthNear),x.depthFar>0&&(n=x.depthFar)),P.near=M.near=j.near=t,P.far=M.far=j.far=n,(ee!==P.near||F!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),ee=P.near,F=P.far),P.layers.mask=e.layers.mask|6,j.layers.mask=P.layers.mask&-5,M.layers.mask=P.layers.mask&-3;let i=e.parent,a=P.cameras;z(P,i);for(let e=0;e<a.length;e++)z(a[e],i);a.length===2?L(P,j,M):P.projectionMatrix.copy(j.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),B(e,P,i)};function B(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=de*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(_!==null||v!==null)return l},this.setFoveation=function(e){l=e,_!==null&&(_.fixedFoveation=e),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=e)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(P)},this.getCameraTexture=function(e){return S[e]};let ae=null;function oe(t,i){if(d=i.getViewerPose(u||a),y=i,d!==null){let t=d.views;v!==null&&(e.setRenderTargetFramebuffer(T,v.framebuffer),e.setRenderTarget(T));let i=!1;t.length!==P.cameras.length&&(P.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(v!==null)a=v.getViewport(r);else{let t=f.getViewSubImage(_,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(T,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(T))}let o=N[n];o===void 0&&(o=new oo,o.layers.enable(n),o.viewport=new Ze,N[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(P.matrix.copy(o.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),i===!0&&P.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&b){f=n.getBinding();let e=f.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&x.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&b){e.state.unbindTexture(),f=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=S[n];e||(e=new Pr,S[n]=e);let t=f.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<E.length;e++){let t=D[e],n=E[e];t!==null&&n!==void 0&&n.update(t,i,u||a)}ae&&ae(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),y=null}let se=new Po;se.setAnimationLoop(oe),this.setAnimationLoop=function(e){ae=e},this.dispose=function(){}}},Wl=new K,Gl=new W;Gl.set(-1,0,0,0,1,0,0,0,1);function Kl(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,_a(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Wl.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Gl),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function ql(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return z(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?R(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):R(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Jl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Yl=null;function Xl(){return Yl===null&&(Yl=new lr(Jl,16,16,y,u),Yl.name=`DFG_LUT`,Yl.minFilter=i,Yl.magFilter=i,Yl.wrapS=t,Yl.wrapT=t,Yl.generateMipmaps=!1,Yl.needsUpdate=!0),Yl}var Zl=class{constructor(e={}){let{canvas:t=ne(),context:n=null,depth:r=!0,stencil:i=!1,alpha:l=!1,antialias:m=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:g=!1,powerPreference:_=`default`,failIfMajorPerformanceCaveat:y=!1,reversedDepthBuffer:S=!1,outputBufferType:C=o}=e;this.isWebGLRenderer=!0;let w;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);w=n.getContextAttributes().alpha}else w=l;let T=C,E=new Set([x,b,v]),D=new Set([o,c,s,p,d,f]),O=new Uint32Array(4),A=new Int32Array(4),j=new U,M=null,N=null,P=[],F=[],te=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,re=!1,L=null,B=null,oe=null,se=null;this._outputColorSpace=k;let ce=0,le=0,ue=null,de=-1,fe=null,V=new Ze,pe=new Ze,me=null,he=new q(0),ge=0,_e=t.width,ve=t.height,ye=1,be=null,xe=null,Se=new Ze(0,0,_e,ve),Ce=new Ze(0,0,_e,ve),we=!1,Te=new Sr,Ee=!1,De=!1,Oe=new K,ke=new U,Ae=new Ze,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Me=!1;function Ne(){return ue===null?ye:1}let H=n;function Pe(e,n){return t.getContext(e,n)}let Fe,Ie,W,Le,G,Re,ze,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Qe,et,tt,nt,rt,it;try{let e={alpha:!0,depth:r,stencil:i,antialias:m,premultipliedAlpha:h,preserveDrawingBuffer:g,powerPreference:_,failIfMajorPerformanceCaveat:y};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,st,!1),t.addEventListener(`webglcontextrestored`,ct,!1),t.addEventListener(`webglcontextcreationerror`,lt,!1),H===null){let t=`webgl2`;if(H=Pe(t,e),H===null)throw Pe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}at()}catch(e){throw t.removeEventListener(`webglcontextlost`,st,!1),t.removeEventListener(`webglcontextrestored`,ct,!1),t.removeEventListener(`webglcontextcreationerror`,lt,!1),z(`WebGLRenderer: `+e.message),e}function at(){Fe=new hs(H),Fe.init(),nt=new zl(H,Fe),Ie=new Wo(H,Fe,e,nt),W=new Ll(H,Fe),Ie.reversedDepthBuffer&&S&&W.buffers.depth.setReversed(!0),B=H.createFramebuffer(),oe=H.createFramebuffer(),se=H.createFramebuffer(),Le=new vs(H),G=new _l,Re=new Rl(H,Fe,W,G,Ie,nt,Le),ze=new ms(I),Ve=new Fo(H),rt=new Ho(H,Ve),He=new gs(H,Ve,Le,rt),Ue=new bs(H,He,Ve,rt,Le),Qe=new ys(H,Ie,Re),Je=new Go(G),We=new gl(I,ze,Fe,Ie,rt,Je),Ge=new Kl(I,G),Ke=new xl,qe=new Ol(Fe),Xe=new Vo(I,ze,W,Ue,w,h),Ye=new Il(I,Ue,Ie),it=new ql(H,Le,Ie,W),et=new Uo(H,Fe,Le),tt=new _s(H,Fe,Le),Le.programs=We.programs,I.capabilities=Ie,I.extensions=Fe,I.properties=G,I.renderLists=Ke,I.shadowMap=Ye,I.state=W,I.info=Le}T!==1009&&(te=new Ss(T,t.width,t.height,m,r,i));let ot=new Ul(I,H);this.xr=ot,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(e){e!==void 0&&(ye=e,this.setSize(_e,ve,!1))},this.getSize=function(e){return e.set(_e,ve)},this.setSize=function(e,n,r=!0){ot.isPresenting?R(`WebGLRenderer: Can't change size while VR device is presenting.`):(_e=e,ve=n,t.width=Math.floor(e*ye),t.height=Math.floor(n*ye),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),te!==null&&te.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(_e*ye,ve*ye).floor()},this.setDrawingBufferSize=function(e,n,r){_e=e,ve=n,ye=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(T===1009)z(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){R(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}te.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(V)},this.getViewport=function(e){return e.copy(Se)},this.setViewport=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),W.viewport(V.copy(Se).multiplyScalar(ye).round())},this.getScissor=function(e){return e.copy(Ce)},this.setScissor=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),W.scissor(pe.copy(Ce).multiplyScalar(ye).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(e){W.setScissorTest(we=e)},this.setOpaqueSort=function(e){be=e},this.setTransparentSort=function(e){xe=e},this.getClearColor=function(e){return e.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(ue!==null){let t=ue.texture.format;e=E.has(t)}if(e){let e=ue.texture.type,t=D.has(e),n=Xe.getClearColor(),r=Xe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(O[0]=i,O[1]=a,O[2]=o,O[3]=r,H.clearBufferuiv(H.COLOR,0,O)):(A[0]=i,A[1]=a,A[2]=o,A[3]=r,H.clearBufferiv(H.COLOR,0,A))}else r|=H.COLOR_BUFFER_BIT}t&&(r|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&H.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),L=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,st,!1),t.removeEventListener(`webglcontextrestored`,ct,!1),t.removeEventListener(`webglcontextcreationerror`,lt,!1),Xe.dispose(),Ke.dispose(),qe.dispose(),G.dispose(),ze.dispose(),Ue.dispose(),rt.dispose(),it.dispose(),We.dispose(),ot.dispose(),ot.removeEventListener(`sessionstart`,gt),ot.removeEventListener(`sessionend`,_t),vt.stop()};function st(e){e.preventDefault(),ie(`WebGLRenderer: Context Lost.`),re=!0}function ct(){ie(`WebGLRenderer: Context Restored.`),re=!1;let e=Le.autoReset,t=Ye.enabled,n=Ye.autoUpdate,r=Ye.needsUpdate,i=Ye.type;at(),Le.autoReset=e,Ye.enabled=t,Ye.autoUpdate=n,Ye.needsUpdate=r,Ye.type=i}function lt(e){z(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ut(e){let t=e.target;t.removeEventListener(`dispose`,ut),dt(t)}function dt(e){ft(e),G.remove(e)}function ft(e){let t=G.get(e).programs;t!==void 0&&(t.forEach(function(e){We.releaseProgram(e)}),e.isShaderMaterial&&We.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=je);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ot(e,t,n,r,i);W.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=He.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;rt.setup(i,r,s,n,c);let h,g=et;if(c!==null&&(h=Ve.get(c),g=tt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(W.setLineWidth(r.wireframeLinewidth*Ne()),g.setMode(H.LINES)):g.setMode(H.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),W.setLineWidth(e*Ne()),i.isLineSegments?g.setMode(H.LINES):i.isLineLoop?g.setMode(H.LINE_LOOP):g.setMode(H.LINE_STRIP)}else i.isPoints?g.setMode(H.POINTS):i.isSprite&&g.setMode(H.TRIANGLES);if(i.isBatchedMesh){if(Fe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ve.get(c).bytesPerElement:1,o=G.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(H,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function pt(e,t,n,r){L!==null&&e.isNodeMaterial&&L.setObject(r,e),Ee===!0&&Je.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,wt(e,t,r),e.side=0,e.needsUpdate=!0,wt(e,t,r),e.side=2):wt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),L!==null&&L.renderStart(e,t,n),N=qe.get(n),N.init(t),F.push(N),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(N.pushLight(e),e.castShadow&&N.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(N.pushLight(e),e.castShadow&&N.pushShadow(e))}),N.setupLights(),L!==null&&L.updateLights(N.state.lightsArray),De=this.localClippingEnabled,Ee=Je.init(this.clippingPlanes,De),Ee===!0&&Je.setGlobalState(this.clippingPlanes,t),L!==null&&Ye.render(N.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];pt(o,n,t,e),r.add(o)}else pt(i,n,t,e),r.add(i)}}),N=F.pop(),L!==null&&L.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=G.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Fe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let mt=null;function ht(e){mt&&mt(e)}function gt(){vt.stop()}function _t(){vt.start()}let vt=new Po;vt.setAnimationLoop(ht),typeof self<`u`&&vt.setContext(self),this.setAnimationLoop=function(e){mt=e,ot.setAnimationLoop(e),e===null?vt.stop():vt.start()},ot.addEventListener(`sessionstart`,gt),ot.addEventListener(`sessionend`,_t),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){z(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(re===!0)return;L!==null&&L.renderStart(e,t);let n=ot.enabled===!0&&ot.isPresenting===!0,r=te!==null&&(ue===null||n)&&te.begin(I,ue);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(te===null||te.isCompositing()===!1)&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(t),t=ot.getCamera()),e.isScene===!0&&e.onBeforeRender(I,e,t,ue),N=qe.get(e,F.length),N.init(t),N.state.textureUnits=Re.getTextureUnits(),F.push(N),Oe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Te.setFromProjectionMatrix(Oe,ee,t.reversedDepth),De=this.localClippingEnabled,Ee=Je.init(this.clippingPlanes,De),M=Ke.get(e,P.length),M.init(),P.push(M),ot.enabled===!0&&ot.isPresenting===!0){let e=I.xr.getDepthSensingMesh();e!==null&&yt(e,t,-1/0,I.sortObjects)}yt(e,t,0,I.sortObjects),M.finish(),L!==null&&L.updateLights(N.state.lightsArray),I.sortObjects===!0&&M.sort(be,xe),Me=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,Me&&Xe.addToRenderList(M,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ee===!0&&Je.beginShadows();let i=N.state.shadowsArray;if(Ye.render(i,e,t),Ee===!0&&Je.endShadows(),(r&&te.hasRenderPass())===!1){let n=M.opaque,r=M.transmissive;if(N.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];xt(n,r,e,a)}Me&&Xe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];bt(M,e,n,n.viewport)}}else r.length>0&&xt(n,r,e,t),Me&&Xe.render(e),bt(M,e,t)}ue!==null&&le===0&&(Re.updateMultisampleRenderTarget(ue),Re.updateRenderTargetMipmap(ue)),r&&te.end(I),e.isScene===!0&&e.onAfterRender(I,e,t),rt.resetDefaultState(),de=-1,fe=null,F.pop(),F.length>0?(N=F[F.length-1],Re.setTextureUnits(N.state.textureUnits),Ee===!0&&Je.setGlobalState(I.clippingPlanes,N.state.camera)):N=null,P.pop(),M=P.length>0?P[P.length-1]:null,L!==null&&L.renderEnd()};function yt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)N.pushLightProbeGrid(e);else if(e.isLight)N.pushLight(e),e.castShadow&&N.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Te)){r&&Ae.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Oe);let i=Ue.update(e),a=e.material;a.visible&&M.push(e,i,a,n,Ae.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Te))){let i=Ue.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ae.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ae.copy(e.boundingSphere.center)),Ae.applyMatrix4(e.matrixWorld).applyMatrix4(Oe)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&M.push(e,i,c,n,Ae.z,s,t)}}else a.visible&&M.push(e,i,a,n,Ae.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)yt(i[e],t,n,r)}function bt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;N.setupLightsView(n),Ee===!0&&Je.setGlobalState(I.clippingPlanes,n),r&&W.viewport(V.copy(r)),i.length>0&&St(i,t,n),a.length>0&&St(a,t,n),o.length>0&&St(o,t,n),W.buffers.depth.setTest(!0),W.buffers.depth.setMask(!0),W.buffers.color.setMask(!0),W.setPolygonOffset(!1)}function xt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[r.id]===void 0){let e=Fe.has(`EXT_color_buffer_half_float`)||Fe.has(`EXT_color_buffer_float`);N.state.transmissionRenderTarget[r.id]=new $e(1,1,{generateMipmaps:!0,type:e?u:o,minFilter:a,samples:Math.max(4,Ie.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Be.workingColorSpace})}let s=N.state.transmissionRenderTarget[r.id],c=r.viewport||V;s.setSize(c.z*I.transmissionResolutionScale,c.w*I.transmissionResolutionScale);let l=I.getRenderTarget(),d=I.getActiveCubeFace(),f=I.getActiveMipmapLevel();I.setRenderTarget(s),I.getClearColor(he),ge=I.getClearAlpha(),ge<1&&I.setClearColor(16777215,.5),I.clear(),Me&&Xe.render(n);let p=I.toneMapping;I.toneMapping=0;let m=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),N.setupLightsView(r),Ee===!0&&Je.setGlobalState(I.clippingPlanes,r),St(e,n,r),Re.updateMultisampleRenderTarget(s),Re.updateRenderTargetMipmap(s),Fe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ct(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Re.updateMultisampleRenderTarget(s),Re.updateRenderTargetMipmap(s))}I.setRenderTarget(l,d,f),I.setClearColor(he,ge),m!==void 0&&(r.viewport=m),I.toneMapping=p}function St(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ct(o,t,n,s,l,c)}}function Ct(e,t,n,r,i,a){L!==null&&i.isNodeMaterial&&L.setObject(e,i),e.onBeforeRender(I,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(I,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=2):I.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(I,t,n,r,i,a)}function wt(e,t,n){t.isScene!==!0&&(t=je);let r=G.get(e),i=N.state.lights,a=N.state.shadowsArray,o=i.state.version,s=We.getParameters(e,i.state,a,t,n,N.state.lightProbeGridArray),c=We.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ut),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Et(e,s),d}else s.uniforms=We.getUniforms(e),L!==null&&e.isNodeMaterial&&L.build(e,n,s),e.onBeforeCompile(s,I),d=We.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Je.uniform),Et(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=N.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=kc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Et(e,t){let n=G.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Dt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];j.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(j))return n}return null}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=je),Re.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=ue===null?I.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Be.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(h=I.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=G.get(r),y=N.state.lights;if(Ee===!0&&(De===!0||e!==fe)){let t=e===fe&&r.id===de;Je.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Je.numPlanes||v.numIntersection!==Je.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=N.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=wt(r,t,i),L&&r.isNodeMaterial&&L.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(W.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==de&&(de=r.id,C=!0),v.needsLights){let e=Dt(N.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||fe!==e){W.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(H,`projectionMatrix`,e.projectionMatrix),T.setValue(H,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(H,ke.setFromMatrixPosition(e.matrixWorld)),Ie.logarithmicDepthBuffer&&T.setValue(H,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(H,`isOrthographic`,e.isOrthographicCamera===!0),fe!==e&&(fe=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(H,`sunShadowMap`,y.state.sunShadowMap,Re),y.state.directionalShadowMap.length>0&&T.setValue(H,`directionalShadowMap`,y.state.directionalShadowMap,Re),y.state.spotShadowMap.length>0&&T.setValue(H,`spotShadowMap`,y.state.spotShadowMap,Re),y.state.pointShadowMap.length>0&&T.setValue(H,`pointShadowMap`,y.state.pointShadowMap,Re)),i.isSkinnedMesh){T.setOptional(H,i,`bindMatrix`),T.setOptional(H,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(H,`boneTexture`,e.boneTexture,Re))}i.isBatchedMesh&&(T.setOptional(H,i,`batchingTexture`),T.setValue(H,`batchingTexture`,i._matricesTexture,Re),T.setOptional(H,i,`batchingIdTexture`),T.setValue(H,`batchingIdTexture`,i._indirectTexture,Re),T.setOptional(H,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(H,`batchingColorTexture`,i._colorsTexture,Re));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Qe.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(H,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Xl()),C){if(T.setValue(H,`toneMappingExposure`,I.toneMappingExposure),v.needsLights&&kt(E,w),a&&r.fog===!0&&Ge.refreshFogUniforms(E,a),Ge.refreshMaterialUniforms(E,r,ye,ve,N.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}kc.upload(H,Tt(v),E,Re)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(kc.upload(H,Tt(v),E,Re),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(H,`center`,i.center),T.setValue(H,`modelViewMatrix`,i.modelViewMatrix),T.setValue(H,`normalMatrix`,i.normalMatrix),T.setValue(H,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];it.update(n,x),it.bind(n,x)}}return x}function kt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ce},this.getActiveMipmapLevel=function(){return le},this.getRenderTarget=function(){return ue},this.setRenderTargetTextures=function(e,t,n){let r=G.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),G.get(e.texture).__webglTexture=t,G.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=G.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){ue=e,ce=t,le=n;let r=null,i=!1,a=!1;if(e){let o=G.get(e);if(o.__useDefaultFramebuffer!==void 0){W.bindFramebuffer(H.FRAMEBUFFER,o.__webglFramebuffer),V.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest,W.viewport(V),W.scissor(pe),W.setScissorTest(me),de=-1;return}if(o.__webglFramebuffer===void 0)Re.setupRenderTarget(e);else if(o.__hasExternalTextures)Re.rebindTextures(e,G.get(e.texture).__webglTexture,G.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&G.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Re.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=G.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Re.useMultisampledRTT(e)===!1?G.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,V.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest}else V.copy(Se).multiplyScalar(ye).floor(),pe.copy(Ce).multiplyScalar(ye).floor(),me=we;if(n!==0&&(r=B),W.bindFramebuffer(H.FRAMEBUFFER,r)&&W.drawBuffers(e,r),W.viewport(V),W.scissor(pe),W.setScissorTest(me),i){let r=G.get(e.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=G.get(e.textures[t]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=G.get(e.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,t.__webglTexture,n)}de=-1};function jt(e){let t=G.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ie.textureFormatReadable(e.format),t.__typeReadable=Ie.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=G.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){W.bindFramebuffer(H.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+s);let u=jt(o);if(u.__formatReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&H.readPixels(t,n,r,i,nt.convert(c),nt.convert(l),a)}finally{let e=ue===null?null:G.get(ue).__webglFramebuffer;W.bindFramebuffer(H.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=G.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){W.bindFramebuffer(H.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+s);let d=jt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,f),H.bufferData(H.PIXEL_PACK_BUFFER,a.byteLength,H.STREAM_READ),H.readPixels(t,n,r,i,nt.convert(l),nt.convert(u),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);let p=ue===null?null:G.get(ue).__webglFramebuffer;W.bindFramebuffer(H.FRAMEBUFFER,p);let m=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await ae(H,m,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,f),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,a),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(f),H.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Re.setTexture2D(e,0),H.copyTexSubImage2D(H.TEXTURE_2D,n,0,0,o,s,i,a),W.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=nt.convert(t.format),_=nt.convert(t.type),v;t.isData3DTexture?(Re.setTexture3D(t,0),v=H.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Re.setTexture2DArray(t,0),v=H.TEXTURE_2D_ARRAY):(Re.setTexture2D(t,0),v=H.TEXTURE_2D),W.activeTexture(H.TEXTURE0),W.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,t.flipY),W.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),W.pixelStorei(H.UNPACK_ALIGNMENT,t.unpackAlignment);let y=W.getParameter(H.UNPACK_ROW_LENGTH),b=W.getParameter(H.UNPACK_IMAGE_HEIGHT),x=W.getParameter(H.UNPACK_SKIP_PIXELS),S=W.getParameter(H.UNPACK_SKIP_ROWS),C=W.getParameter(H.UNPACK_SKIP_IMAGES);W.pixelStorei(H.UNPACK_ROW_LENGTH,h.width),W.pixelStorei(H.UNPACK_IMAGE_HEIGHT,h.height),W.pixelStorei(H.UNPACK_SKIP_PIXELS,l),W.pixelStorei(H.UNPACK_SKIP_ROWS,u),W.pixelStorei(H.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=G.get(e),r=G.get(t),h=G.get(n.__renderTarget),g=G.get(r.__renderTarget);W.bindFramebuffer(H.READ_FRAMEBUFFER,h.__webglFramebuffer),W.bindFramebuffer(H.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,G.get(e).__webglTexture,i,d+n),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,G.get(t).__webglTexture,a,m+n)),H.blitFramebuffer(l,u,o,s,f,p,o,s,H.DEPTH_BUFFER_BIT,H.NEAREST);W.bindFramebuffer(H.READ_FRAMEBUFFER,null),W.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||G.has(e)){let n=G.get(e),r=G.get(t);W.bindFramebuffer(H.READ_FRAMEBUFFER,oe),W.bindFramebuffer(H.DRAW_FRAMEBUFFER,se);for(let e=0;e<c;e++)w?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,n.__webglTexture,i),T?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,r.__webglTexture,a),i===0?T?H.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):H.copyTexSubImage2D(v,a,f,p,l,u,o,s):H.blitFramebuffer(l,u,o,s,f,p,o,s,H.COLOR_BUFFER_BIT,H.NEAREST);W.bindFramebuffer(H.READ_FRAMEBUFFER,null),W.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?H.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?H.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):H.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):H.texSubImage2D(H.TEXTURE_2D,a,f,p,o,s,g,_,h);W.pixelStorei(H.UNPACK_ROW_LENGTH,y),W.pixelStorei(H.UNPACK_IMAGE_HEIGHT,b),W.pixelStorei(H.UNPACK_SKIP_PIXELS,x),W.pixelStorei(H.UNPACK_SKIP_ROWS,S),W.pixelStorei(H.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&H.generateMipmap(v),W.unbindTexture()},this.initRenderTarget=function(e){G.get(e).__webglFramebuffer===void 0&&Re.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Re.setTextureCube(e,0):e.isData3DTexture?Re.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Re.setTexture2DArray(e,0):Re.setTexture2D(e,0),W.unbindTexture()},this.resetState=function(){ce=0,le=0,ue=null,W.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return ee}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Be._getDrawingBufferColorSpace(e),t.unpackColorSpace=Be._getUnpackColorSpace()}};function Ql(e,{radial:t=40,caps:n=!0}={}){let r=e.length,i=t,a=[],o=[],s=[],c=e[0].x,l=e[r-1].x,u=(e,t)=>{let n=e.n??2,r=Math.cos(t),i=Math.sin(t),a=2/n;return[e.x,(e.y??0)+e.h/2*Math.sign(i)*Math.abs(i)**a,(e.z??0)+e.w/2*Math.sign(r)*Math.abs(r)**a]};for(let t=0;t<r;t++)for(let n=0;n<=i;n++){let r=n/i*Math.PI*2;a.push(...u(e[t],r)),o.push(n/i,(e[t].x-c)/(l-c||1))}for(let e=0;e<r-1;e++)for(let t=0;t<i;t++){let n=e*(i+1)+t,r=n+i+1;s.push(n,r,n+1,r,r+1,n+1)}let d=new Y;if(d.setAttribute(`position`,new J(a,3)),d.setAttribute(`uv`,new J(o,2)),d.setIndex(s),d.computeVertexNormals(),!n)return d;let f=(e,t)=>{let n=new _i;for(let t=0;t<i;t++){let[,r,a]=u(e,t/i*Math.PI*2);t?n.lineTo(a,r):n.moveTo(a,r)}let r=new ca(n,1);return r.rotateY(t?-Math.PI/2:Math.PI/2),r.translate(e.x,0,0),r},p=[d];return e[0].w>.001&&e[0].h>.001&&p.push(f(e[0],!0)),e[r-1].w>.001&&e[r-1].h>.001&&p.push(f(e[r-1],!1)),$l(p)}function $l(e){let t=[],n=[],r=[],i=[],a=0;for(let o of e){let e=o.index?o:o.toNonIndexed();e.attributes.normal||e.computeVertexNormals();let s=e.attributes.position,c=e.attributes.normal,l=e.attributes.uv;for(let e=0;e<s.count;e++)t.push(s.getX(e),s.getY(e),s.getZ(e)),n.push(c.getX(e),c.getY(e),c.getZ(e)),r.push(l?l.getX(e):0,l?l.getY(e):0);if(e.index)for(let t=0;t<e.index.count;t++)i.push(e.index.getX(t)+a);else for(let e=0;e<s.count;e++)i.push(e+a);a+=s.count}let o=new Y;return o.setAttribute(`position`,new J(t,3)),o.setAttribute(`normal`,new J(n,3)),o.setAttribute(`uv`,new J(r,2)),o.setIndex(i),o}var eu=1400+2*Math.PI*130,tu=e=>e===`oval`?eu:1400,nu=[`normal`,`long`,`huge`],ru={normal:1,long:3,huge:6},iu=1e4;function au(e,t){return typeof e==`string`&&nu.includes(e)?Math.min(iu,ru[e]*t):typeof e==`number`&&Number.isFinite(e)?Math.max(t,Math.min(iu,e)):t}function ou(e,t){if(typeof e==`string`&&nu.includes(e))return e;if(typeof e!=`number`||!Number.isFinite(e))return`normal`;let n=Math.round(Math.min(iu,e));return n<=Math.round(t)?`normal`:n}function su(e){return typeof e==`string`&&nu.includes(e)||typeof e==`number`&&Number.isFinite(e)?e:`normal`}var cu=[`flat`,`hill`,`valley`],lu=[!1,!0,`oval`];function uu(e,t=null){let n=e&&typeof e==`object`?e:{},r=lu.includes(n.curves)?n.curves:!1,i=su(n.length);return typeof i==`number`&&(i=i>0?Math.min(iu,Math.round(i)):`normal`),typeof i==`number`&&t&&(i=ou(i,t(r))),{...n,hills:cu.includes(n.hills)?n.hills:`flat`,curves:r,photoId:typeof n.photoId==`string`?n.photoId:null,length:i}}function du(e){let t=e.track;return`${t.curves===`oval`?`oval`:`${t.hills}|${+!!t.curves}`}|${t.length}`}var fu=e=>e.layout?.length??e.sMax-e.sMin,pu=new WeakMap;function mu(e){let t=pu.get(e);return t===void 0&&(t=e.layout?.photo||!/\|L\d/.test(e.key??``)?1:Math.max(1,fu(e)/tu(e.layout?.curves)),pu.set(e,t)),t}var hu=-.45,gu=.5,_u=.5,vu=[`flat`,`hill`,`valley`],yu={flat:0,hill:24,valley:-18},bu=480,xu=51,Su=1/120,Cu=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function wu(e={}){let t=vu.includes(e.hills)?e.hills:`flat`,n=!!e.curves,r=au(e.length,1400),i=Math.round(r/2/gu)*gu,a=yu[t],o=e=>Math.abs(e)<bu?a*Math.cos(Math.PI*e/(2*bu))**2:0,s=e=>n?xu*Math.sin(e*Su):0,c=Math.round(2*i/gu)+1,l=new Float64Array(c),u=new Float64Array(c);for(let e=0;e<c;e++)if(l[e]=-i+e*gu,e){let t=o(l[e])-o(l[e-1]),n=s(l[e])-s(l[e-1]);u[e]=u[e-1]+Math.sqrt(gu*gu+t*t+n*n)}let d=u[(c-1)/2],f=-d,p=u[c-1]-d,m=Math.floor((p-f)/_u)+1,h=new Float64Array(m),g=new Float64Array(m),_=new Float64Array(m),v=0;for(let e=0;e<m;e++){let t=f+e*_u+d;for(;v<c-2&&u[v+1]<t;)v++;let n=(t-u[v])/(u[v+1]-u[v]||1),r=l[v]+(l[v+1]-l[v])*Math.min(1,Math.max(0,n));h[e]=r,g[e]=o(r),_[e]=s(r)}let y=e=>{let t=Math.min(m-1.0001,Math.max(0,(e-f)/_u)),n=Math.floor(t);return[n,t-n]};function b(e){let[t,n]=y(e);return[h[t]+(h[t+1]-h[t])*n,g[t]+(g[t+1]-g[t])*n,_[t]+(_[t+1]-_[t])*n]}function x(e){let t=b(e-1),n=b(e+1),r=n[0]-t[0],i=n[1]-t[1],a=n[2]-t[2],o=Math.hypot(r,i,a)||1;return[r/o,i/o,a/o]}let S=e=>x(e)[1];function C(e,t){let n=Math.abs(t-s(e));return hu+o(e)*(1-Cu(14,220,n))}let w={layout:{hills:t,curves:n,length:2*i},xHalf:i,sMin:f,sMax:p,closed:!1,point:b,tangent:x,slope:S,groundAt:C,lateral:(e,t)=>t-s(e),curve:s,height:o,key:`${t}|${+!!n}${i===700?``:`|L${Math.round(2*i)}`}`,elevated:a!==0,bounds:{minX:-i,maxX:i,minZ:n?-51:0,maxZ:n?xu:0},clearance:(e,t)=>Math.abs(t-s(e))};return w.strands=[w],w}var Tu=wu(),Eu=new U(0,1,0),Du=new U,Ou=new U,ku=new U,Au=new U,ju=new U,Mu=new K;function Nu(e,t){let n=new U(...e.point(t)),r=new U(...e.tangent(t));return{p:n,t:r,n:new U().crossVectors(r,Eu).normalize(),up:Eu}}function Pu(e,t,n=0,r=0,i=new U){let[a,o,s]=e.point(t);if(!n)return i.set(a,o+r,s);let c=e.tangent(t),l=Math.hypot(c[0],c[2])||1;return i.set(a-c[2]/l*n,o+r,s+c[0]/l*n)}function Fu(e,t,n,r,i=0){Du.set(...e.point(n)),Ou.set(...e.point(r)),ku.subVectors(Du,Ou).normalize(),Au.copy(Eu).addScaledVector(ku,-ku.dot(Eu)).normalize(),ju.crossVectors(ku,Au),Mu.makeBasis(ku,Au,ju),t.quaternion.setFromRotationMatrix(Mu),t.position.copy(Du),t.position.y+=i}function Iu(e,t){if(!t?.length)return e;let n=e.group;n.updateMatrixWorld(!0);let r=[0,...t,-1/0],i=[];for(let t=0;t<r.length-1;t++){let n=new kt;n.position.x=t?r[t]:0,i.push({obj:n,x0:t?r[t]:0,x1:t<r.length-2?r[t+1]:-e.length})}let a=new $t,o=new U;for(let t of[...n.children]){a.setFromObject(t);let n=a.isEmpty()?t.position.x:a.getCenter(o).x,s=0;for(;s<i.length-1&&n<r[s+1];)s++;let c=i[s];c.obj.add(t),t.position.x-=c.x0;for(let n of e.rods??[])n.obj===t&&(n.base.x-=c.x0)}for(let e of i)n.add(e.obj);return e.segments=i,e}function Lu(e,t,n,r,i=0){if(t.segments){t.group.position.set(0,0,0),t.group.quaternion.identity();for(let a of t.segments)Fu(e,a.obj,n+r*a.x0,n+r*a.x1,i)}else Fu(e,t.group,n,n-r*t.length,i)}var Ru=.6;function zu(e,t,n,r,i,{yOff:a=0,carYOff:o=null}={}){Lu(e,t,r,i,a);let s=r-i*(t.length+Ru);return n.forEach((t,n)=>{Lu(e,t,s,i,a+(o?o(n):0)),s-=i*(t.length+Ru)}),s}var Bu=2200,Vu=2500,Hu=new WeakMap;function Uu(e){if(Hu.has(e))return Hu.get(e);let t=null;if(mu(e)!==1){let n=e.strands[0],r=n.point(0),i=n.tangent(0),a=e.bounds,o=0,s=0;Math.abs(i[0])>=Math.abs(i[2])?o=Math.sign(i[0])||1:s=Math.sign(i[2]),t={px:r[0],pz:r[2],tx:o,tz:s,uMin:1/0,uMax:-1/0,k:e.elevated?.025:.09};for(let[e,n]of[[a.minX,a.minZ],[a.maxX,a.minZ],[a.minX,a.maxZ],[a.maxX,a.maxZ]]){let i=(e-r[0])*o+(n-r[2])*s;t.uMin=Math.min(t.uMin,i),t.uMax=Math.max(t.uMax,i)}}return Hu.set(e,t),t}function Wu(e){let t=Uu(e);return t&&[-t.tz,t.tx]}function Gu(e,t,n,r,i){if(i<=0)return i;let a=Uu(e);if(!a)return i;let o=t-a.px,s=n-a.pz,c=o*a.tx+s*a.tz;if(o*-a.tz+s*a.tx<=0)return i;let l=Q(80,420,Math.max(a.uMin-c,c-a.uMax,0)),u=a.k*Math.max(0,r-60)+1.6*Math.max(0,r-Vu);return i>u?u+(i-u)*l:i}function Ku(e,t,n,r){let i=Math.min(e.sMax,Math.max(e.sMin,t));if(Pu(e,i,n,0,r),i!==t){let n=e.tangent(i);r.x+=n[0]*(t-i),r.z+=n[2]*(t-i)}return r}function qu(e,t,n,r,i,a=null){let o=[],s=new U,c=i.strands.map(e=>e.sMax-e.sMin+(e.closed?0:240)),l=c.reduce((e,t)=>e+t,0),u=0;for(;o.length<t&&u++<t*20;){let t=e()*l,u=0;for(;u<c.length-1&&t>c[u];)t-=c[u],u++;let d=i.strands[u],f=d.sMin-(d.closed?0:120)+t,p=e()<.5?-1:1,m=n+(r-n)*e()**1.3;u===0&&p>0&&Math.abs(f)<110&&m<55||(Ku(d,f,p*m,s),i.clearance(s.x,s.z,n)<n||a&&!a(s.x,s.z)||o.push([s.x,s.z,i.groundAt(s.x,s.z)]))}return o}var Ju=(e,t)=>{let n=mu(t);return n===1?e:Math.round(e*n)};function Yu(e){if(mu(e)===1)return 0;let t=e.bounds;return Math.max(0,(t.maxX-t.minX)/2-700)}var Xu=(e,t,n)=>{let r=Yu(n);return r?Math.round(e*(t+r)/t):e},Zu=e=>{let t=e.bounds;return{cx:(t.minX+t.maxX)/2,cz:(t.minZ+t.maxZ)/2,hz:(t.maxZ-t.minZ)/2,hx:(t.maxX-t.minX)/2}},Qu=(e,t,n)=>{let r=Math.imul(e,374761393)+Math.imul(t,668265263)+Math.imul(n,1442695041);return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296};function Z(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=a*a*(3-2*a),c=o*o*(3-2*o),l=Qu(r,i,n),u=Qu(r+1,i,n),d=Qu(r,i+1,n),f=Qu(r+1,i+1,n);return l+(u-l)*s+(d-l)*c+(l-u-d+f)*s*c}var Q=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function $u(e,t,n){let r=e.bounds,i=Math.max(r.minX-t,0,t-r.maxX),a=Math.max(r.minZ-n,0,n-r.maxZ);return Math.hypot(i,a)}function ed(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Y,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=td(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=td(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function td(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Cn(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function nd(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c={},l={},u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.attributes[n];c[n]=new r.constructor(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(l[n]||(l[n]=[]),i.forEach((e,t)=>{let r=new e.array.constructor(e.count*e.itemSize);l[n][t]=new e.constructor(r,e.itemSize,e.normalized)}))}let p=t*.5,m=10**Math.log10(1/t),h=p*m;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${Math.trunc(r[d[e]](i)*m+h)},`}if(a in n)u.push(n[a]);else{for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),a=e.morphAttributes[n],u=r.itemSize,p=c[n],m=l[n];for(let e=0;e<u;e++){let t=d[e],n=f[e];if(p[n](o,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](o,a[e][t](i))}}n[a]=o,u.push(o),o++}}let g=e.clone();for(let t in e.attributes){let e=c[t];if(g.setAttribute(t,new e.constructor(e.array.slice(0,o*e.itemSize),e.itemSize,e.normalized)),t in l)for(let e=0;e<l[t].length;e++){let n=l[t][e];g.morphAttributes[t][e]=new n.constructor(n.array.slice(0,o*n.itemSize),n.itemSize,n.normalized)}}return g.setIndex(u),g}function rd(e,t=Math.PI/3){let n=e.index?e.toNonIndexed():e,r=n.attributes.position,i=r.count,a;if(r.isBufferAttribute===!0&&r.itemSize===3&&r.normalized===!1)a=r.array;else{a=new Float64Array(i*3);for(let e=0;e<i;e++)a[3*e+0]=r.getX(e),a[3*e+1]=r.getY(e),a[3*e+2]=r.getZ(e)}let o=Math.cos(t),s=(1+1e-10)*100,c=i/3,l=new Float64Array(c*3);for(let e=0;e<c;e++){let t=9*e,n=a[t+0],r=a[t+1],i=a[t+2],o=a[t+3],s=a[t+4],c=a[t+5],u=a[t+6],d=a[t+7],f=a[t+8],p=u-o,m=d-s,h=f-c,g=n-o,_=r-s,v=i-c,y=m*v-h*_,b=h*g-p*v,x=p*_-m*g,S=1/(Math.sqrt(y*y+b*b+x*x)||1);l[3*e+0]=y*S,l[3*e+1]=b*S,l[3*e+2]=x*S}let u=new Int32Array(i),d=new Float64Array(i*3),f=1;for(;f<i*2;)f<<=1;let p=f-1,m=new Int32Array(f),h=0;for(let e=0;e<i;e++){let t=3*e,n=Math.trunc(a[t+0]*s),r=Math.trunc(a[t+1]*s),i=Math.trunc(a[t+2]*s),o=(Math.imul(n,73856093)^Math.imul(r,19349663)^Math.imul(i,83492791))&p;for(;;){let t=m[o];if(t===0){let t=3*h;d[t+0]=n,d[t+1]=r,d[t+2]=i,m[o]=h+1,u[e]=h++;break}let a=3*(t-1);if(d[a+0]===n&&d[a+1]===r&&d[a+2]===i){u[e]=t-1;break}o=o+1&p}}let g=new Int32Array(h+1);for(let e=0;e<i;e++)g[u[e]+1]++;for(let e=0;e<h;e++)g[e+1]+=g[e];let _=new Int32Array(i),v=g.slice(0,h);for(let e=0;e<c;e++){let t=3*e;_[v[u[t+0]]++]=e,_[v[u[t+1]]++]=e,_[v[u[t+2]]++]=e}let y=new Float32Array(i*3);for(let e=0;e<c;e++){let t=3*e,n=l[t+0],r=l[t+1],i=l[t+2];for(let e=0;e<3;e++){let a=t+e,s=u[a],c=0,d=0,f=0;for(let e=g[s],t=g[s+1];e<t;e++){let t=3*_[e],a=l[t+0],s=l[t+1],u=l[t+2];n*a+r*s+i*u>o&&(c+=a,d+=s,f+=u)}let p=1/(Math.sqrt(c*c+d*d+f*f)||1);y[3*a+0]=c*p,y[3*a+1]=d*p,y[3*a+2]=f*p}}return n.setAttribute(`normal`,new Cn(y,3,!1)),n}var id=[4140066,8872779,12100234,8222064];function ad(e){let t=[],n=new U,r=2+Math.floor(e()*3);for(let i=0;i<r;i++){let a=new ia(.45+e()*.3,1);a.deleteAttribute(`normal`),a.deleteAttribute(`uv`),a=nd(a);let o=i/r*6.3+e(),s=i?.35+e()*.3:0,c=[e()*6,e()*6,e()*6],l=a.attributes.position;for(let t=0;t<l.count;t++){n.fromBufferAttribute(l,t);let r=1+.22*Math.sin(n.x*7+c[0])*Math.sin(n.y*6+c[1])+.15*Math.sin(n.z*9+c[2])+(e()-.5)*.45;n.multiplyScalar(r),l.setXYZ(t,n.x+Math.cos(o)*s,Math.max(-.05,n.y*.75+.4-s*.3),n.z+Math.sin(o)*s)}a.computeVertexNormals(),t.push(a)}let i=ed(t);t.forEach(e=>e.dispose());let a=i.attributes.position,o=[];for(let e=0;e<a.count;e++){let t=.45+.6*Ne.clamp(a.getY(e)/.9,0,1)*(.85+.3*Math.sin(e*12.9898)**2);o.push(t,t,t)}return i.setAttribute(`color`,new J(o,3)),i}function od(e,t=id){let n=new ia(1,3);n.deleteAttribute(`normal`),n.deleteAttribute(`uv`);let r=(t,n,r)=>Array.from({length:t},(t,i)=>({d:new U(e()-.5,e()-.5,e()-.5).normalize(),f:n*(1+i*.9)+e(),a:r/(1+i*.8),ph:e()*6.3})),i=(e,t)=>e.reduce((e,n)=>e+n.a*Math.sin(t.dot(n.d)*n.f+n.ph),0),a=r(8,1.8,.2),o=r(6,9,.025),s=r(4,2.5,1),c=r(3,6,1),l=Array.from({length:4+Math.floor(e()*3)},()=>({n:new U(e()-.5,(e()-.3)*.8,e()-.5).normalize(),d:.58+e()*.27})),u=.5+e()*.3,d=1+e()*.5,f=n.attributes.position,p=new U;for(let e=0;e<f.count;e++){p.fromBufferAttribute(f,e),p.multiplyScalar(1+i(a,p));for(let e of l){let t=p.dot(e.n)-e.d;t>0&&p.addScaledVector(e.n,-t)}p.multiplyScalar(1+i(o,p)),p.set(p.x*d,p.y*u,p.z),p.y<-.15&&(p.y=-.15+(p.y+.15)*.15),f.setXYZ(e,p.x,p.y,p.z)}n=rd(nd(n),.8);let m=n.attributes.position,h=n.attributes.normal,g=[],_=new q,[v,y,b,x]=t.map(e=>new q(e));for(let e=0;e<m.count;e++){p.fromBufferAttribute(m,e);let t=h.getY(e),n=Ne.clamp((p.y+.15)/(u+.3),0,1),r=.5+.35*i(s,p);_.copy(y).lerp(x,Ne.clamp(r-.25,0,.7)),_.lerp(v,Ne.clamp((1-n)*.9-t*.2+.25*i(c,p),0,.85)),_.lerp(b,Ne.clamp(t*n*.8-.1,0,.6));let a=.86+.28*Math.abs(Math.sin(p.x*41.3+p.z*37.9+p.y*53.1)*Math.sin(p.x*23.7-p.y*31.1));g.push(_.r*a,_.g*a,_.b*a)}return n.setAttribute(`color`,new J(g,3)),n}function sd(e=1){let t=e>>>0||1;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function cd(e){let t=document.createElement(`canvas`);return t.width=t.height=e,[t,t.getContext(`2d`)]}function ld(t,{repeat:n=1,srgb:r=!0}={}){let i=new jr(t);return i.wrapS=i.wrapT=e,i.repeat.set(n,n),i.anisotropy=8,r&&(i.colorSpace=k),i}function ud(e,t,n=5,r=4){let i=sd(t),a=new Float32Array(e*e),o=1,s=0;for(let t=0;t<n;t++){let n=r<<t,c=new Float32Array((n+1)*(n+1)).map(()=>i());for(let e=0;e<=n;e++)c[n*(n+1)+e]=c[e];for(let e=0;e<=n;e++)c[e*(n+1)+n]=c[e*(n+1)];for(let t=0;t<e;t++){let r=t/e*n,i=Math.floor(r),s=r-i,l=s*s*(3-2*s);for(let r=0;r<e;r++){let s=r/e*n,u=Math.floor(s),d=s-u,f=d*d*(3-2*d),p=i*(n+1)+u,m=c[p],h=c[p+1],g=c[p+n+1],_=c[p+n+2];a[t*e+r]+=o*((m+(h-m)*f)*(1-l)+(g+(_-g)*f)*l)}}s+=o,o*=.5}for(let e=0;e<a.length;e++)a[e]/=s;return a}var dd=new Map,fd=new WeakSet,pd=(e,t)=>{if(!dd.has(e)){let n=t();fd.add(n),dd.set(e,n)}return dd.get(e)},md=()=>pd(`grime`,()=>{let[e,t]=cd(512),n=ud(512,7,6,4),r=t.createImageData(512,512),i=sd(99);for(let e=0;e<262144;e++){let t=Math.floor(e/512),a=.06*Math.max(0,Math.sin(e%512*.21+n[e]*9))*(t/512),o=255*Math.min(1,.8+.28*n[e]-a-(i()<.002?.3:0));r.data.set([o,o*.98,o*.95,255],e*4)}return t.putImageData(r,0,0),ld(e,{repeat:1})}),hd=()=>pd(`rough`,()=>{let[e,t]=cd(256),n=ud(256,3,5,8),r=t.createImageData(256,256);for(let e=0;e<65536;e++){let t=150+105*n[e];r.data.set([t,t,t,255],e*4)}return t.putImageData(r,0,0),ld(e,{srgb:!1})}),gd=(e,t=null)=>pd(`ground-`+e,()=>{let n=1024,[r,i]=cd(n),a=ud(n,e===`toy`?11:5,7,4),o=i.createImageData(n,n),s=sd(4),c=e===`toy`?[92,180,70]:t?.a??[164,118,80],l=e===`toy`?[128,210,88]:t?.b??[186,140,98];for(let e=0;e<n*n;e++){let t=a[e],n=s()<.03?(s()-.5)*40:0;o.data.set([0,1,2].map(e=>c[e]+(l[e]-c[e])*t+n).concat(255),e*4)}return i.putImageData(o,0,0),ld(r,{repeat:40})}),_d=e=>pd(`gravel-`+e,()=>{let[t,n]=cd(512),r=sd(21);if(e===`toy`){n.fillStyle=`#9a8f86`,n.fillRect(0,0,512,512);for(let e=0;e<9e3;e++){let e=Math.floor(120+r()*90);n.fillStyle=`rgb(${e},${e-6},${e-12})`,n.beginPath(),n.ellipse(r()*512,r()*512,1.5+r()*4,1+r()*3,r()*3,0,Math.PI*2),n.fill()}return ld(t,{repeat:1})}n.fillStyle=`#26221f`,n.fillRect(0,0,512,512);let i=(e,t,i,a,o)=>{let s=[],c=5+Math.floor(r()*3),l=r()*6.3;for(let e=0;e<c;e++){let t=l+e/c*6.28+(r()-.5)*.7,n=i*(.7+r()*.45);s.push([Math.cos(t)*n,Math.sin(t)*n*.8])}for(let[r,c]of[[0,0],[512,0],[-512,0],[0,512],[0,-512]]){if(e+r<-i*2||e+r>512+i*2||t+c<-i*2||t+c>512+i*2)continue;let l=n.createLinearGradient(e+r-i,t+c-i,e+r+i,t+c+i);l.addColorStop(0,`rgb(${a+38+o},${a+34},${a+28-o})`),l.addColorStop(.55,`rgb(${a+o},${a-3},${a-8-o})`),l.addColorStop(1,`rgb(${a-40},${a-42},${a-44})`),n.fillStyle=l,n.beginPath(),s.forEach(([i,a],o)=>(o?n.lineTo:n.moveTo).call(n,e+r+i,t+c+a)),n.closePath(),n.fill()}};for(let e=0;e<4200;e++)i(r()*512,r()*512,3+r()*5,Math.floor(72+r()*52),Math.floor(r()*16));return ld(t,{repeat:1})}),vd=()=>pd(`tie`,()=>{let e=document.createElement(`canvas`);e.width=64,e.height=512;let t=e.getContext(`2d`),n=sd(12);t.fillStyle=`#5b4a3c`,t.fillRect(0,0,64,512);for(let e=0;e<64;e++){let r=60+n()*50;t.fillStyle=`rgba(${r+22},${r+12},${r},${.35+n()*.4})`,t.fillRect(e,0,1,512)}for(let e=0;e<40;e++)t.fillStyle=`rgba(150,140,128,${.06+n()*.12})`,t.fillRect(n()*64,n()*512,6+n()*20,30+n()*120);t.strokeStyle=`rgba(20,14,10,0.75)`;for(let e=0;e<9;e++){let e=n()*64,r=n()*512,i=30+n()*160;t.lineWidth=.6+n()*1.2,t.beginPath(),t.moveTo(e,r);for(let a=1;a<=6;a++)t.lineTo(e+(n()-.5)*3,r+i*a/6);t.stroke()}return ld(e)}),yd=()=>pd(`wood`,()=>{let[e,t]=cd(256),n=sd(8);t.fillStyle=`#5a3e26`,t.fillRect(0,0,256,256);for(let e=0;e<256;e+=2){let r=70+n()*40;t.fillStyle=`rgba(${r+30},${r},${r-25},0.5)`,t.fillRect(0,e,256,1+n()*2)}return ld(e)}),bd=()=>pd(`toygrain`,()=>{let[e,t]=cd(256),n=sd(21);t.fillStyle=`#ffffff`,t.fillRect(0,0,256,256);for(let e=0;e<256;e+=1){if(n()<.55)continue;let r=222+n()*26;t.fillStyle=`rgba(${r},${r-8},${r-22},${.35+n()*.4})`,t.fillRect(0,e+Math.sin(e*.13)*.5,256,1+n()*1.5)}return ld(e)}),xd=()=>pd(`puff`,()=>{let[e,n]=cd(128),r=ud(128,17,4,4),i=n.createImageData(128,128);for(let e=0;e<128;e++)for(let t=0;t<128;t++){let n=t/128-.5,a=e/128-.5,o=Math.sqrt(n*n+a*a)*2,s=Math.max(0,1-o)**1.6*(.55+.6*r[e*128+t]);i.data.set([255,255,255,Math.min(255,s*255)],(e*128+t)*4)}n.putImageData(i,0,0);let a=ld(e);return a.wrapS=a.wrapT=t,a}),Sd=()=>pd(`spark`,()=>{let[e,n]=cd(64),r=n.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,`rgba(255,255,255,1)`),r.addColorStop(.25,`rgba(255,230,160,0.9)`),r.addColorStop(1,`rgba(255,120,20,0)`),n.fillStyle=r,n.fillRect(0,0,64,64);let i=ld(e);return i.wrapS=i.wrapT=t,i}),Cd=()=>pd(`star`,()=>{let[e,n]=cd(128);n.translate(64,64),n.beginPath();for(let e=0;e<10;e++){let t=e%2?22:56,r=e/10*Math.PI*2-Math.PI/2;n.lineTo(Math.cos(r)*t,Math.sin(r)*t)}n.closePath(),n.fillStyle=`#ffe14a`,n.fill(),n.lineWidth=6,n.strokeStyle=`#ff9d00`,n.stroke();let r=ld(e);return r.wrapS=r.wrapT=t,r});function wd(e,{w:t=512,h:n=128,bg:r=`#111`,fg:i=`#f5d76e`,font:a=`bold 84px Arial Black, Impact, sans-serif`,border:o=null}={}){let s=document.createElement(`canvas`);s.width=t,s.height=n;let c=s.getContext(`2d`);r&&(c.fillStyle=r,c.fillRect(0,0,t,n)),o&&(c.strokeStyle=o,c.lineWidth=n*.08,c.strokeRect(n*.05,n*.05,t-n*.1,n-n*.1)),c.fillStyle=i,c.font=a,c.textAlign=`center`,c.textBaseline=`middle`;let l=c.measureText(e).width,u=t*.9;if(l>u){let e=parseFloat(a.match(/(\d+(?:\.\d+)?)px/)?.[1]||84);c.font=a.replace(/\d+(?:\.\d+)?px/,Math.floor(e*u/l)+`px`)}parseFloat(c.font.match(/(\d+(?:\.\d+)?)px/)?.[1]||84)>n*.8&&(c.font=c.font.replace(/\d+(?:\.\d+)?px/,Math.floor(n*.8)+`px`)),c.fillText(e,t/2,n/2+n*.04);let d=new jr(s);return d.colorSpace=k,d.anisotropy=8,d}function Td(e,t,n,r){return pd(`paint-`+e,()=>{let e=document.createElement(`canvas`);e.width=t,e.height=n,r(e.getContext(`2d`),t,n);let i=new jr(e);return i.colorSpace=k,i.anisotropy=8,i})}var Ed=4271,Dd=[Math.cos(.49),Math.sin(.49)],Od=.95;function kd(e=16,t=2){let n=new Map,r=(e,t)=>e*73856093^t*19349663;return{add(i,a,o){let s=o+t;for(let t=Math.floor((i-s)/e);t<=Math.floor((i+s)/e);t++)for(let c=Math.floor((a-s)/e);c<=Math.floor((a+s)/e);c++){let e=r(t,c),s=n.get(e);s||n.set(e,s=[]),s.push(i,a,o)}},hit(t,i,a){let o=n.get(r(Math.floor(t/e),Math.floor(i/e)));if(!o)return!1;for(let e=0;e<o.length;e+=3){let n=o[e]-t,r=o[e+1]-i,s=o[e+2]+a;if(n*n+r*r<s*s)return!0}return!1},over(t,i,a){let o=n.get(r(Math.floor(t/e),Math.floor(i/e))),s=0;if(!o)return s;for(let e=0;e<o.length;e+=3){let n=(o[e]-t)**2+(o[e+1]-i)**2,r=o[e+2]+a;n<r*r&&(s=Math.max(s,.8*(Math.sqrt(r*r-n)-a)))}return s}}}function Ad(e,t=kd(),n=null,r=()=>0){for(let i of e.sets)for(let e=0;e<i.n;e++){let a=i.cy[e]-r(i.cx[e],i.cz[e])>i.cv[e]*1.5+1;(n&&!a&&i.cv[e]<2.5?n:t).add(i.cx[e],i.cz[e],i.cv[e])}for(let n of e.meshes)for(let e of n.parts)t.add(e.c.x,e.c.z,n.cover);return t}function jd(e,t=8){let n=new Map,r=(e,t)=>e*73856093^t*19349663;for(let i of e.strands)for(let e=i.sMin;e<=i.sMax;e+=2){let[a,o,s]=i.point(e),c=r(Math.floor(a/t),Math.floor(s/t)),l=n.get(c);l||n.set(c,l=[]),l.push(a,o,s)}let i={d:1/0,y:0};return i.near=(e,a)=>{i.d=1/0;let o=Math.floor(e/t),s=Math.floor(a/t);for(let t=o-1;t<=o+1;t++)for(let o=s-1;o<=s+1;o++){let s=n.get(r(t,o));if(s)for(let t=0;t<s.length;t+=3){let n=Math.hypot(s[t]-e,s[t+2]-a);n<i.d&&(i.d=n,i.y=s[t+1])}}return i},i}function Md(e,t,n,r,i=t.groundAt,a=null){let o=[],s=new U,c=t.strands[0],l=(e,n)=>t.clearance(e,n,22)>=22&&!r.hit(e,n,1.6)&&!a?.hit(e,n,1.2)&&!o.some(t=>Math.hypot(t[0]-e,t[1]-n)<14),u=(t,n,a,s,c=e()*6.3)=>{o.push([t,n,i(t,n),a,s,c]),r.add(t,n,1.4)};for(let[t,n,r,i]of[[-14,-46,10.5,2],[30,-84,8,1],[-46,-150,11.5,3]]){if(t<c.sMin||t>c.sMax)continue;Ku(c,t,n,s);let a=c.tangent(t);l(s.x,s.z)&&u(s.x,s.z,r,i,Math.atan2(-a[2],a[0])+(e()-.5)*.5)}let d=o.length,f=(e,n)=>t.clearance(e,n,22)>=22&&!r.hit(e,n,1.6)&&!a?.hit(e,n,1.2);for(let[r,i]of qu(e,2*n,22,300,t,f)){if(o.length>=d+n)break;if(!l(r,i))continue;let t=Math.floor(e()*4);u(r,i,[6+e()*1.5,7.5+e()*2.5,8.5+e()*3,9.5+e()*2.5][t],t)}return o}var Nd=24,Pd=12,Fd={crest:new q(6714954),groove:new q(2898468),base:new q(7759438),tip:new q(9736288)};function Id(e,t){let n=[],r=[],i=[],a=new q,o=new U,s=new U,c=new U,l=new U,u=new Pe;s.set(1,0,0),e.forEach((i,d)=>{let f=e[Math.max(0,d-1)],p=e[Math.min(e.length-1,d+1)];o.set(p[0]-f[0],p[1]-f[1],p[2]-f[2]).normalize(),d===0?(s.set(0,0,1),Math.abs(o.dot(s))>.9&&s.set(1,0,0),s.addScaledVector(o,-o.dot(s)).normalize()):(u.setFromUnitVectors(l,o),s.applyQuaternion(u)),l.copy(o),c.crossVectors(o,s);for(let o=0;o<=Nd;o++){let l=o/Nd*Math.PI*2,u=Math.cos(l*Pd),f=i[3]*(1+.075*u),p=i[0]+(Math.cos(l)*s.x+Math.sin(l)*c.x)*f,m=i[1]+(Math.cos(l)*s.y+Math.sin(l)*c.y)*f,h=i[2]+(Math.cos(l)*s.z+Math.sin(l)*c.z)*f;n.push(p,m,h),a.copy(Fd.groove).lerp(Fd.crest,.5+.5*u),a.lerp(Fd.base,Ne.clamp(1-m/.9,0,1)*.85),a.lerp(Fd.tip,Ne.smoothstep(d/(e.length-1),t,1)*.6);let g=.92+.16*Math.sin(m*3.1+o*1.7)*Math.sin(m*.7+d);r.push(a.r*g,a.g*g,a.b*g)}});for(let t=0;t<e.length-1;t++)for(let e=0;e<Nd;e++){let n=t*25+e,r=n+25;i.push(n,r,n+1,n+1,r,r+1)}let d=e[e.length-1],f=(e.length-1)*25,p=n.length/3;n.push(d[0]+o.x*d[3]*.25,d[1]+o.y*d[3]*.25,d[2]+o.z*d[3]*.25),r.push(Fd.tip.r,Fd.tip.g,Fd.tip.b);for(let e=0;e<Nd;e++)i.push(f+e,p,f+e+1);let m=new Y;return m.setAttribute(`position`,new J(n,3)),m.setAttribute(`color`,new J(r,3)),m.setIndex(i),m.computeVertexNormals(),m}function Ld(e,t,n,r,i,a=9){let o=[];for(let s=0;s<=a;s++){let c=t+(r-i)*(s/a);o.push([e,c,n,i*(s===0?1.05:1)])}for(let a=1;a<=4;a++){let s=a/5*Math.PI/2;o.push([e,t+r-i+Math.sin(s)*i,n,Math.cos(s)*i])}return o}function Rd(e,t,n,r,i,a){let o=Math.cos(e),s=Math.sin(e),c=[],l=n*.4+i;c.push([o*n*.2,t-r*.2,s*n*.2,r*1.08]),c.push([o*(n*.2+i*.45),t-r*.05,s*(n*.2+i*.45),r]);for(let e=1;e<=5;e++){let n=e/5*Math.PI/2,i=r*1.4;c.push([o*(l-i+Math.sin(n)*i),t+i-Math.cos(n)*i,s*(l-i+Math.sin(n)*i),r])}let u=t+r*1.4;for(let e=1;e<=4;e++)c.push([o*l,u+(a-u-r)*(e/4),s*l,r*(1-.04*e)]);for(let e=1;e<=3;e++){let t=e/4*Math.PI/2,n=r*.84;c.push([o*l,a-n+Math.sin(t)*n,s*l,Math.cos(t)*n])}return c}function zd(e,t,n){let r=.4+e*.02,i=[Id(Ld(0,-.4,0,e+.4,r),.88)],a=[[],[[0,.45,.78]],[[.1,.42,.72],[Math.PI+.15,.55,.86]],[[.1,.36,.68],[Math.PI-.1,.5,.82],[1.7,.62,.88]]][t];for(let[t,o,s]of a){let a=r*(.62+n()*.1);i.push(Id(Rd(t+(n()-.5)*.3,e*o,r,a,.7+n()*.5,e*s),.85))}let o=ed(i);return i.forEach(e=>e.dispose()),o}function Bd(e,t,n,r,i=t.groundAt,a=[],o=null,s=jd(t)){let c=[],[l,u]=Dd,d=t.strands[0].point(0),f=t.strands.map(e=>e.sMax-e.sMin),p=f.reduce((e,t)=>e+t,0),m=0,h=0,g=0;for(;c.length<n&&m++<n*40+a.length*16;){let n,m,_=h<a.length;if(_){let e=t.strands[0],r=a[h][0]+(g%2?1:-1)*Math.ceil(g/2)*2;if(++g>16){h++,g=0;continue}if(r<e.sMin||r>e.sMax||([n,,m]=e.point(r),c.some(e=>Math.hypot(e.x-n,e.z-m)<5)))continue}else{let r=e()*p,i=0;for(;i<f.length-1&&r>f[i];)r-=f[i],i++;[n,,m]=t.strands[i].point(t.strands[i].sMin+r)}let v=!1,y=0;for(let e=-240;e<=240&&!v;e+=1.5){let t=n+l*e,a=m+u*e;r.hit(t,a,1.25)&&(v=!0);let o=s.near(t,a);o.d<6&&(y+=1.5,Math.hypot(t-d[0],a-d[2])<45&&(v=!0),o.y-i(t,a)>1.3&&(v=!0))}if(v||y>30)continue;let b=new Float32Array(481);for(let e=0;e<481;e++){let t=e*1-240,r=n+l*t,a=m+u*t,c=i(r,a),d=s.near(r,a);d.d<4&&(c=Math.max(c,d.y+.06-Math.max(0,d.d-1.1)*.3)),o&&(c+=o.over(r,a,Od)),b[e]=c}c.push({x:n,z:m,heights:b,hero:_,u0:_?a[h][1]:null}),_&&(h++,g=0)}return c}var Vd=new q(5916208),Hd=new q(9072202),Ud=new q(11769449);function Wd(e){let t=[],n=new ia(.72,1);n.deleteAttribute(`normal`),n.deleteAttribute(`uv`),n=nd(n);let r=new U,i=n.attributes.position;for(let t=0;t<i.count;t++)r.fromBufferAttribute(i,t),r.multiplyScalar(.85+e()*.3),i.setXYZ(t,r.x,r.y,r.z);n.computeVertexNormals();let a=[];for(let t=0;t<i.count;t++){let t=.8+e()*.4;a.push(Vd.r*t,Vd.g*t,Vd.b*t)}n.setAttribute(`color`,new J(a,3)),t.push(n);let o=[],s=[],c=[],l=new U,u=new U,d=new U,f=new U,p=new U,m=new U,h=[];for(let t=0;t<50;t++){l.set(e()-.5,e()-.5,e()-.5).normalize(),u.set(e()-.5,e()-.5,e()-.5).normalize().multiplyScalar(.9).add(l).normalize();let t=.55+e()*.2,n=.85+e()*.2,i=.022+e()*.02,a=.75+e()*.45,g=e()<.5;h.length=0;for(let e=0;e<=2;e++){let r=e/2;d.copy(l).lerp(u,r).normalize().multiplyScalar(t+(n-t)*r+Math.sin(r*Math.PI)*.12),h.push(d.clone())}let _=o.length/3;for(let e=0;e<=2;e++){f.copy(h[Math.min(2,e+1)]).sub(h[Math.max(0,e-1)]).normalize(),p.copy(h[e]).normalize().cross(f).normalize(),m.crossVectors(f,p);let t=i*(1-e/2*.6);for(let n=0;n<3;n++){let i=n/3*Math.PI*2;r.copy(h[e]).addScaledVector(p,Math.cos(i)*t).addScaledVector(m,Math.sin(i)*t),o.push(r.x,r.y,r.z);let c=g?Ud:Hd;s.push(c.r*a,c.g*a,c.b*a)}}for(let e=0;e<2;e++)for(let t=0;t<3;t++){let n=_+e*3+t,r=_+e*3+(t+1)%3;c.push(n,n+3,r,r,n+3,r+3)}}let g=new Y;g.setAttribute(`position`,new J(o,3)),g.setAttribute(`color`,new J(s,3)),g.setIndex(c),g.computeVertexNormals(),t.push(g);let _=ed(t);return t.forEach(e=>e.dispose()),_}var Gd=`
attribute vec4 aTwA; // anchor x, anchor z, start offset (m), speed (m/s)
attribute vec4 aTwB; // radius, heights row, seed, seed
uniform float uTime; uniform vec2 uWind; uniform sampler2D uTwH;
mat3 twAxis(vec3 a, float t) {
  float c = cos(t), s = sin(t), C = 1.0 - c;
  return mat3(c + a.x * a.x * C, a.y * a.x * C + a.z * s, a.z * a.x * C - a.y * s,
              a.x * a.y * C - a.z * s, c + a.y * a.y * C, a.z * a.y * C + a.x * s,
              a.x * a.z * C + a.y * s, a.y * a.z * C - a.x * s, c + a.z * a.z * C);
}
void twPose(out mat3 R, out vec3 P, out float K) {
  float span = ${480 .toFixed(1)};
  float ph = (aTwA.x * uWind.x + aTwA.y * uWind.y) * 0.004 + aTwB.z * 1.5;   // gusts sweep down the wind
  float d = aTwA.z + aTwA.w * (uTime + 2.6 * sin(uTime * 0.31 - ph));        // gusty: 0.2 .. 1.8 x its speed
  float u = mod(d, span);
  vec2 xz = aTwA.xy + uWind * (u - ${240 .toFixed(1)});
  float fi = u / ${1 .toFixed(1)};
  int i0 = int(fi); int row = int(aTwB.y + 0.5);
  float g = mix(texelFetch(uTwH, ivec2(i0, row), 0).r, texelFetch(uTwH, ivec2(min(i0 + 1, 480), row), 0).r, fract(fi));
  float r = aTwB.x;
  K = smoothstep(0.0, 14.0, u) * smoothstep(0.0, 14.0, span - u)
    * step(distance(vec3(xz.x, g, xz.y), cameraPosition), 700.0);        // a speck past 700 m: folded away (a long track has hundreds)
  float hopL = 2.5 + 4.0 * aTwB.w;                                             // m per hop
  float q = d / hopL;
  float big = 0.5 + 0.5 * sin(q * 0.73 + aTwB.w * 9.0);
  float hop = abs(sin(3.14159 * q)) * r * (0.15 + 1.1 * big * big);
  vec3 axis = normalize(vec3(uWind.y, 0.0, -uWind.x));
  float wob = 0.45 * sin(d * 0.11 + aTwB.z * 20.0);
  axis = normalize(vec3(axis.x * cos(wob) - axis.z * sin(wob), 0.25 * sin(d * 0.07 + aTwB.w * 7.0), axis.x * sin(wob) + axis.z * cos(wob)));
  vec3 a0 = normalize(vec3(aTwB.z - 0.5, aTwB.w - 0.5, fract(aTwB.z * 7.31) - 0.5) + 0.001);
  R = twAxis(axis, d / r * 0.9) * twAxis(a0, aTwB.z * 40.0);
  P = vec3(xz.x, g + (r * 0.93 + hop) * K, xz.y);
}`;function Kd(e,t,n){return e.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>\n${Gd}`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
mat3 twR; vec3 twP; float twK; twPose(twR, twP, twK); objectNormal = twR * objectNormal;
#define TW_POSED`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
#ifndef TW_POSED
mat3 twR; vec3 twP; float twK; twPose(twR, twP, twK);
#endif
transformed = twR * (transformed * aTwB.x * twK) + twP;`)},e.customProgramCacheKey=()=>n,e}function qd({group:e,keep:t},n,i,a){if(!i.length)return null;let o=Wd(n),s=new po;s.index=o.index;for(let e of[`position`,`normal`,`color`])s.setAttribute(e,o.attributes[e]);let c=i.length,u=new Float32Array(c*4),d=new Float32Array(c*4),f=i[0].heights.length,p=new Float32Array(f*c);i.forEach((e,t)=>{let r=3.2+n()*3,i=n(),a=n(),o=n()*2*240;e.hero&&(o=e.u0+r*2.6*Math.sin((e.x*Dd[0]+e.z*Dd[1])*.004+i*1.5)),u.set([e.x,e.z,o,r],t*4),d.set([.5+n()**1.5*.44999999999999996,t,i,a],t*4),p.set(e.heights,t*f)}),s.setAttribute(`aTwA`,new ur(u,4)),s.setAttribute(`aTwB`,new ur(d,4)),s.instanceCount=c;let m=new lr(p,f,c,_,l);m.minFilter=m.magFilter=r,m.generateMipmaps=!1,m.needsUpdate=!0,t(m);let h={uTime:a,uWind:{value:new H(Dd[0],Dd[1])},uTwH:{value:m}},g=Kd(new Ca({vertexColors:!0,roughness:1,metalness:0}),h,`desert-tumbleweed`),v=Kd(new Ea({depthPacking:3201}),h,`desert-tumbleweed-depth`);g.addEventListener(`dispose`,()=>v.dispose());let y=new or(s,g);return y.name=`tumbleweeds`,y.customDepthMaterial=v,y.frustumCulled=!1,y.castShadow=!0,y.receiveShadow=!0,e.add(t(y)),y}function Jd(e,t,n){let r=Math.sin(t*e.w1+e.p1)*e.A1,i=Math.sin(t*e.w2+e.p2)*e.A2;return n[0]=e.x+e.tx*r-e.tz*i,n[1]=e.z+e.tz*r+e.tx*i,n}function Yd(e,t,n,r=null){let i=[],a=t.strands[0],o=new U,s=e=>{for(let n=-e.A1;n<=e.A1+1e-6;n+=2*e.A1/Math.ceil(2*e.A1/6))for(let i=-e.A2;i<=e.A2+1e-6;i+=2*e.A2/Math.ceil(2*e.A2/6)){let a=e.x+e.tx*n-e.tz*i,o=e.z+e.tz*n+e.tx*i,s=t.clearance(a,o,401);if(s<104.5||s>395.5||r&&r.hit(a,o,26.5))return!1}return!0},c=(t,n,r,i,a)=>{Ku(t,n,r,o);let s=t.tangent(Math.min(t.sMax,Math.max(t.sMin,n))),c=Math.hypot(s[0],s[2])||1;return{x:o.x,z:o.z,tx:s[0]/c,tz:s[2]/c,A1:i,A2:a,w1:.021+e()*.01,w2:.033+e()*.012,p1:e()*6.3,p2:e()*6.3,height:40+e()*25,top:6+e()*3,lean:5+e()*5,seed:e()*100}},l=c(a,-10,-235,70,55);s(l)&&i.push(l);let u=0,d=t.strands.map(e=>e.sMax-e.sMin),f=d.reduce((e,t)=>e+t,0);for(;i.length<n&&u++<n*60;){let n=e()*f,r=0;for(;r<d.length-1&&n>d[r];)n-=d[r],r++;let a=t.strands[r],o=c(a,a.sMin+n,(e()<.5?-1:1)*(190+e()*110),60+e()*40,40+e()*20);s(o)&&!i.some(e=>Math.hypot(e.x-o.x,e.z-o.z)<300)&&i.push(o)}return i}var Xd=`
#ifdef USE_FOG
  uniform vec3 fogColor; uniform float fogDensity; varying float vFogDepth;
#endif`;function Zd({group:e,keep:t,updaters:n,groundY:r},i,a,o,s,c){if(!a.length)return null;let l=a.length,u=l*180,d=new po;d.setAttribute(`position`,new J([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3)),d.setIndex([0,1,2,0,2,3]);let f=new Float32Array(u*4),p=new Float32Array(u);for(let e=0;e<u;e++){let t=e%180;f.set([(t+i()*.7)/180,i(),i(),t<45?i()*.249:.25+i()*.75],e*4),p[e]=Math.floor(e/180)}d.setAttribute(`aSeed`,new ur(f,4)),d.setAttribute(`aDev`,new ur(p,1)),d.instanceCount=u;let m=a.map(e=>new Ze(e.x,r(e.x,e.z),e.z,e.seed)),h=a.map(e=>new Ze(e.height,e.top,e.lean,0)),g=new H(s.x,s.z).normalize(),_=new or(d,new xa({fog:!0,transparent:!0,depthWrite:!1,uniforms:{...va.clone(X.fog),uTime:o,uC:{value:m},uP:{value:h},uSun:{value:g},uDust:{value:new q(c[0]*1.1,c[1]*.92,c[2]*.75)}},vertexShader:`
      #define ND ${l}
      attribute vec4 aSeed; attribute float aDev;
      uniform float uTime; uniform vec4 uC[ND]; uniform vec4 uP[ND]; uniform vec2 uSun;
      varying vec2 vUv; varying float vA; varying float vShade; varying vec4 vSeed; varying float vF;
      #ifdef USE_FOG
        varying float vFogDepth;
      #endif
      void main() {
        int i = int(aDev + 0.5);
        vec4 C = uC[i], P = uP[i];
        float H = P.x;
        bool skirt = aSeed.w < 0.25;
        float rate = skirt ? 0.2 : 0.075;
        float l = fract(uTime * rate + aSeed.x);
        float h, rad, ang, size, a, f;
        if (skirt) {
          h = 0.4 + 3.5 * l * (0.5 + aSeed.z);
          f = 0.0;
          rad = (1.5 + 8.0 * sqrt(l)) * (0.6 + 0.8 * aSeed.z);
          ang = aSeed.y * 6.2832 + (1.0 / rate) * 2.2 * (l - 0.35 * l * l);
          size = 3.0 + 6.0 * l;
          a = smoothstep(0.0, 0.12, l) * (1.0 - l) * 0.32;
        } else {
          f = pow(l, 1.25);                                    // lingers low down: a dense foot, thinning up high
          h = H * f;
          rad = mix(1.0, P.y, pow(f, 1.3)) * (0.55 + 0.6 * aSeed.z);
          ang = aSeed.y * 6.2832 + (1.0 / rate) * (3.4 * l - 2.6 * pow(l, 1.85) / 1.85);   // spins fast low down, slower up high
          size = mix(5.0, 11.0, sqrt(f)) * (0.75 + 0.5 * aSeed.w);
          a = smoothstep(0.0, 0.05, l) * (1.0 - smoothstep(0.4, 1.0, f)) * mix(0.62, 0.2, sqrt(f));
        }
        float ct = uTime + C.w;
        vec2 lean = vec2(sin(ct * 0.23), cos(ct * 0.17)) * P.z * f * f + vec2(sin(ct * 0.9 + f * 5.0), cos(ct * 0.7 + f * 4.0)) * 1.2 * f; // the column bends and snakes
        vec2 off = vec2(cos(ang), sin(ang)) * rad;
        vec3 c = vec3(C.x + lean.x + off.x, C.y + h, C.z + lean.y + off.y);
        vec4 mv = viewMatrix * vec4(c, 1.0);
        float rot = aSeed.y * 6.2832 + uTime * (aSeed.z - 0.5);
        mv.xy += mat2(cos(rot), sin(rot), -sin(rot), cos(rot)) * position.xy * size;
        gl_Position = projectionMatrix * mv;
        vUv = position.xy; vSeed = aSeed; vA = a; vF = f;
        vShade = 0.5 + 0.5 * dot(normalize(off + 0.001), uSun);
        #ifdef USE_FOG
          vFogDepth = -mv.z;
        #endif
      }`,fragmentShader:`
      uniform float uTime; uniform vec3 uDust;
      varying vec2 vUv; varying float vA; varying float vShade; varying vec4 vSeed; varying float vF;
      ${Xd}
      float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
      float vn(vec2 p) {
        vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      void main() {
        vec2 p = vUv * 3.0 + vSeed.yz * 31.0;
        float n = 0.65 * vn(p + uTime * 0.3) + 0.35 * vn(p * 2.3 - uTime * 0.2);
        float d = length(vUv) * 2.0 + (n - 0.5) * 0.8;
        float a = (1.0 - smoothstep(0.25, 1.0, d)) * vA;
        if (a < 0.003) discard;
        vec3 col = uDust * (0.95 + 0.9 * vShade) * (0.85 + 0.3 * n) * mix(0.9, 1.1, vF);
        #ifdef USE_FOG
          col = mix(col, fogColor, 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth));
        #endif
        gl_FragColor = vec4(col, a);
      }`}));_.name=`dust-devils`,_.frustumCulled=!1,_.renderOrder=2,e.add(t(_));let v=[0,0];return n.push(()=>{for(let e=0;e<l;e++)Jd(a[e],o.value,v),m[e].x=v[0],m[e].z=v[1],m[e].y=r(v[0],v[1])}),_}var Qd=[[-45,-42],[-22,-78],[-2,-55],[18,-96],[40,-66],[60,-38],[-70,-60]],$d=()=>Qd.map(([e,t])=>{let n=240+t/Dd[1];return[e-(n-240)*Dd[0],n]});function ef(e,t){let{group:n,density:r,keep:i,track:a,clearView:o,updaters:s,groundY:c}=e,l=sd(Ed),u={value:0};s.push(e=>{u.value+=e});let d=kd(),f=Ad(o,kd(),d,c),p=Md(l,a,Ju(Math.round(16*r),a),f,c,d),m=new Ca({vertexColors:!0,roughness:.82,metalness:0}),h=[7,9,10,11].map((e,t)=>({h:e,geo:zd(e,t,l)})),g=new K,_=new Pe,v=new U,y=new U,b=new dt,x=new q;h.forEach(({h:e,geo:t},r)=>{let a=p.filter(e=>e[4]===r);if(!a.length){t.dispose();return}let s=new vr(t,m,a.length);a.forEach(([t,n,r,i,,a],o)=>{let c=i/e;_.setFromEuler(b.set((l()-.5)*.04,a,(l()-.5)*.04)),s.setMatrixAt(o,g.compose(y.set(t,r-.1,n),_,v.set(c,c,c))),s.setColorAt(o,x.setRGB(1,1,1).multiplyScalar(.88+l()*.22))}),s.castShadow=!0,s.receiveShadow=!0,n.add(i(s)),o.addInstanced(s)});let S=Bd(l,a,Math.min(100,Ju(Math.round(30*r),a))+Qd.length,f,c,$d(),d);qd(e,l,S,u);let C=kd(32,28);for(let e of o.meshes)for(let t of e.parts)C.add(t.c.x,t.c.z,e.cover);for(let e of p)C.add(e[0],e[1],2.5);let w=Yd(l,a,Ju(2,a),C);return Zd(e,l,w,u,t.sunDir,t.dust),{spots:p,paths:S,devils:w}}var tf={id:`desert`,sky:{exposure:.58,sunColor:16769212,sunIntensity:2.4,hemiSky:12375295,hemiGround:9071176,hemiIntensity:.5,fog:14271654,fogDensity:7e-4,sunDir:new U(.22,.5,.84),bloom:.4,bloomThreshold:12,turbidity:4,rayleigh:2.4,mieCoefficient:.0035,mieDirectionalG:.78,envIntensity:.45},ground:{a:[164,118,80],b:[186,140,98]},ballastDust:[1.55,1.15,.82],minimap:`#a8824f`,dust:[.72,.6,.45],build(e){let{group:t,r:n,density:r,keep:i,track:a,clearView:o}=e;nf(t,n,r,i,a,o),ef(e,{sunDir:this.sky.sunDir,dust:this.dust})}};function nf(e,t,n,r,i,a){let{cx:o,cz:s,hz:c}=Zu(i),l=Yu(i),u=new Ca({vertexColors:!0,roughness:.95}),d=[new q(11100221),new q(12286546),new q(9982518),new q(12880738)];for(let n=0,f=Xu(34,1300,i);n<f;n++){let i=30+t()*110,f=30+t()*90,p=new Lr(i*(.55+t()*.25),i,f,64,24),m=p.attributes.position,h=[];for(let e=0;e<m.count;e++){let r=m.getX(e),i=m.getY(e),a=m.getZ(e),o=Math.atan2(a,r),s=1+.12*Math.sin(o*5+n)+.08*Math.sin(o*11+i*.2)+(t()-.5)*.06;Math.abs(i)<f/2-.01&&(m.setX(e,r*s),m.setZ(e,a*s));let c=d[(Math.floor(Math.max(0,(i+f/2)/f)*7+.18*Math.sin(o*2+n)+n)%d.length+d.length)%d.length];h.push(c.r,c.g,c.b)}p.setAttribute(`color`,new J(h,3)),p.computeVertexNormals();let g=new or(p,u),_=n%2?1:-1;g.position.set(o+(t()-.5)*(2600+2*l),hu+f/2-2,s+_*(c+260+t()*900)),e.add(r(g)),a.addMesh(g)}let f=new K,p=new Pe,m=new U,h=new U,g=new q,_=[7304022,8224350,6646859,8815718,6054726],v=new Ca({vertexColors:!0,roughness:1}),y=Ju(Math.floor(1200*n/4),i);for(let n=0;n<4;n++){let n=new vr(ad(t),v,y);qu(t,y,7,380,i).forEach(([e,r,i],a)=>{let o=.5+t()*1.3;m.set(o*(1+t()*.4),o*(.7+t()*.3),o*(1+t()*.4)),p.setFromEuler(new dt(0,t()*6.3,0)),n.setMatrixAt(a,f.compose(h.set(e,i-.05*o,r),p,m)),n.setColorAt(a,g.set(_[Math.floor(t()*_.length)]).multiplyScalar(.85+t()*.3))}),n.castShadow=!0,n.receiveShadow=!0,e.add(r(n)),a.addInstanced(n)}rf(e,t,n,r,i,a);let b=new Ca({color:5981750,roughness:.9}),x=$l([new Lr(.12,.16,9,8).translate(0,4.5,0),new Fr(.15,.15,2.4).translate(0,8.3,0),new Fr(.15,.15,1.8).translate(0,7.6,0)]),S=i.strands[0],C=Math.floor((S.sMax-S.sMin)/45),w=new vr(x,b,C),T=0;for(let e=0;e<C;e++)Pu(S,S.sMin+20+e*45,-19,0,h),!(i.clearance(h.x,h.z,8)<8)&&(h.y=i.groundAt(h.x,h.z),w.setMatrixAt(T++,f.compose(h,p.identity(),m.set(1,1,1))));w.count=T,w.castShadow=!0,e.add(r(w)),a.addInstanced(w)}function rf(e,t,n,r,i,a){let o=Array.from({length:4},()=>od(t)),s=new Ca({vertexColors:!0,roughness:.95,metalness:0}),c=[16777215,15784132,14209740,13154472].map(e=>new q(e)),l=[];for(let[e,r,a]of qu(t,Ju(Math.floor(46*n),i),8,300,i)){let n=.7+t()**1.5*2.2;l.push([e,r,a,n]);let o=Math.floor(t()*4);for(let a=0;a<o;a++){let a=t()*6.3,o=n*(1.1+t()*1.4),s=e+Math.cos(a)*o,c=r+Math.sin(a)*o;i.clearance(s,c)<5||l.push([s,c,i.groundAt(s,c),n*(.18+t()*.35)])}}let u=new K,d=new Pe,f=new U,p=new U,m=new dt,h=o.map(()=>[]);l.forEach(e=>h[Math.floor(t()*o.length)].push(e)),o.forEach((n,i)=>{if(!h[i].length){n.dispose();return}let o=new vr(n,s,h[i].length);h[i].forEach(([e,n,r,i],a)=>{d.setFromEuler(m.set((t()-.5)*.25,t()*6.3,(t()-.5)*.25)),o.setMatrixAt(a,u.compose(p.set(e,r-i*.08,n),d,f.set(i,i*(.8+t()*.4),i))),o.setColorAt(a,c[Math.floor(t()*c.length)])}),o.castShadow=!0,o.receiveShadow=!0,e.add(r(o)),a.addInstanced(o)})}var af=1300,of=new WeakMap,sf=e=>1+.08*Math.sin(3*e+1.1)+.04*Math.sin(7*e+2.3)+.02*Math.sin(13*e+.4),cf=(e,t)=>{let n=e/170,r=t/190;return Math.hypot(n,r)/sf(Math.atan2(r,n))},lf=(e,t)=>e.lu+40+190*Math.sin(Math.max(0,t)/750),uf=e=>95+.08*Math.max(0,e),df=(e,t)=>{let n=Math.max(0,t);return e.level+22+.045*n+150*Q(450,950,n)+130*Q(1500,2600,n)},ff=2700,pf=(e,t)=>5*(1-Math.min(1,(e/t)**2));function mf(e){let t=of.get(e);if(t)return t;let n=e.strands[0],r=n.point(0),i=n.tangent(0),a=0,o=0;Math.abs(i[0])>=Math.abs(i[2])?a=Math.sign(i[0])||1:o=Math.sign(i[2]);let s=-o,c=a,l=e.bounds,u=1/0,d=-1/0,f=-1/0;for(let[e,t]of[[l.minX,l.minZ],[l.maxX,l.minZ],[l.minX,l.maxZ],[l.maxX,l.maxZ]]){let n=e-r[0],i=t-r[2],l=n*a+i*o,p=-(n*s+i*c);u=Math.min(u,l),d=Math.max(d,l),f=Math.max(f,p)}t={px:r[0],pz:r[2],tx:a,tz:o,nx:s,nz:c,uMin:u,uMax:d,wEdge:f,elev:!!e.elevated,dmax:mu(e)===1?af:Vu},t.lu=-25,t.lw=f+66+212.8*1.14;let p=1/0;for(let n=-6;n<=6;n++)for(let r=-4;r<=4;r++){let[i,a]=hf(t,t.lu+n/6*170*1.1,t.lw+r/4*190*1.1);p=Math.min(p,e.groundAt(i,a))}return t.level=p,t.ws=t.lw+190*.68,of.set(e,t),t}var hf=(e,t,n)=>[e.px+t*e.tx-n*e.nx,e.pz+t*e.tz-n*e.nz],gf=(e,t,n)=>{let r=t-e.px,i=n-e.pz;return[r*e.tx+i*e.tz,-(r*e.nx+i*e.nz)]};function _f(e,t){let n=e+180*(Z(e/650,t/650,51)-.5),r=t+180*(Z(e/650+9.3,t/650,52)-.5),i=0,a=1,o=1/950,s=1,c=0;for(let e=0;e<6;e++){let t=1-Math.abs(2*Z(n*o,r*o,60+e)-1);t=t*t*s,s=Math.min(1,t*1.8),i+=t*a,c+=a,a*=.56,o*=2.05;let l=n*.8-r*.6;r=n*.6+r*.8,n=l}return i/c}function vf(e,t,n){let r=520*(1-Math.exp(-(n-60)/520))*Q(60,210,n);if(r<=0)return 0;let i=Z(e/1700,t/1700,70)-.5,a=.3+1.15*_f(e,t)+.45*i,o=14*Q(60,120,n)*(1-Q(200,400,n))*Math.max(0,Z(e/70,t/70,74)-.55)*2.2;return r*Math.max(.12,a)+o}function yf(e,t,n,r){if(n<60)return 0;let i=mf(r),a=r.groundAt(e,t),[o,s]=gf(i,e,t),c=o-i.lu,l=s-i.lw,u=Math.abs(c)<170*2.2&&Math.abs(l)<190*2.2?cf(c,l):9,d=s>0?1-(1-Q(600,2600,s))*.68*(1-Q(330,820,Math.abs(c))):1,f=vf(e,t,n)*Q(1,1.9,u)*d;if(s<0){let e=Q(80,420,Math.max(i.uMin-o,o-i.uMax,0)),t=(i.elev?.025:.09)*(n-60)+1.6*Math.max(0,n-i.dmax);f>t&&(f=t+(f-t)*e)}let p=a+f;if(u<1.12){let e=(1-Q(1,1.12,u))*Q(60,74,n);if(e>0){let t=i.level-.6+1.6*Q(.92,1.1,u);p+=(t-p)*e}}let m=s-i.ws;if(m>-30){let n=uf(m),r=Math.abs(o-lf(i,m)),a=df(i,m);if(r<n*4){let i=Q(0,18,m),o=a+Math.min(220,Math.max(0,r-.85*n)*(.3+.6*Z(e/160,t/160,77)))*d-4,s=Q(.6*n,1*n,r)*(1-Q(1.4*n,2.6*n,r))*Q(-20,280,m)*Q(1,1.3,u);o>p&&(p+=(o-p)*s);let c=(1-Q(.8*n,1.5*n,r))*i;p+=(a+pf(r,n)-p)*c}}return p-a}function bf(e,t,n,r,i,a){for(let e=0;e<3;e++)i[e]=1+(i[e]-1)*.28;let o=1-r,s=.05*Q(0,.6,Z(e/130,n/130,22)-.5+.2)+.04*(1-Q(0,.12,o))*Q(60,300,a);i[0]*=1-s*1.1,i[1]*=1-s*.5}function xf(e,t=e){let n=document.createElement(`canvas`);return n.width=e,n.height=t,[n,n.getContext(`2d`)]}function Sf(t,{srgb:n=!0,wrap:r=!0}={}){let i=new jr(t);return r&&(i.wrapS=i.wrapT=e),i.anisotropy=8,n&&(i.colorSpace=k),i}function Cf(e,t,n,r=5,i=4,a=1){let o=sd(n),s=new Float32Array(e*t),c=1,l=0;for(let n=0;n<r;n++){let r=i<<n,u=Math.max(1,Math.round((i<<n)*a)),d=Float32Array.from({length:r*u},()=>o());for(let n=0;n<t;n++){let i=n/t*u,a=Math.floor(i),o=i-a,l=o*o*(3-2*o),f=a%u*r,p=(a+1)%u*r;for(let t=0;t<e;t++){let i=t/e*r,a=Math.floor(i),o=i-a,u=o*o*(3-2*o),m=(a+1)%r,h=d[f+a],g=d[f+m],_=d[p+a],v=d[p+m];s[n*e+t]+=c*((h+(g-h)*u)*(1-l)+(_+(v-_)*u)*l)}}l+=c,c*=.5}for(let e=0;e<s.length;e++)s[e]/=l;return s}var wf=null;function Tf(){if(wf)return wf;let e=1024,[t,n]=xf(e),r=n.createImageData(e,e),i=Cf(e,e,17,6,4),a=Cf(e,e,18,4,8),o=sd(19);for(let t=0;t<e*e;t++){let n=t%e,s=t/e|0,c=Math.sin((n+s*.35)/e*Math.PI*2*22+i[t]*9)*.5+.5,l=.5*i[t]+.35*a[t]+.15*c,u=226+24*l,d=233+19*l,f=244+11*l,p=o();if(p<.004){let e=18+o()*14;u+=e,d+=e,f+=e*.6}else if(p<.03){let e=(o()-.5)*10;u+=e,d+=e,f+=e}r.data[t*4]=u,r.data[t*4+1]=d,r.data[t*4+2]=f,r.data[t*4+3]=255}return n.putImageData(r,0,0),wf=Sf(t)}var Ef=null;function Df(){if(Ef)return Ef;let e=1024,[t,n]=xf(e),[r,i]=xf(e),a=n.createImageData(e,e),o=i.createImageData(e,e),s=Cf(e,e,31,6,4),c=Cf(e,e,32,5,3,4),l=sd(33);for(let t=0;t<e*e;t++){let n=t%e/e*2.4-1.2,r=(t/e|0)/e*2.4-1.2,i=Math.hypot(n,r)/sf(Math.atan2(r,n)),u=Math.min(1,Math.max(0,(s[t]-.45)*3.2)),d=Math.min(1,Math.max(0,(c[t]-.62+Math.max(0,i-.55)*.9)*4)),f=34+120*u,p=56+118*u,m=72+112*u;f+=(236-f)*d,p+=(241-p)*d,m+=(248-m)*d,l()<.002&&(f+=40,p+=40,m+=40),a.data.set([f,p,m,255],t*4);let h=14+80*u+(211-80*u)*d;o.data.set([h,h,h,255],t*4)}n.putImageData(a,0,0),i.putImageData(o,0,0);let u=(e,t,r,a,o,s)=>{n.beginPath(),i.beginPath(),n.moveTo(e,t),i.moveTo(e,t);for(let c=0;c<a;c++)r+=(l()-.5)*.7,e+=Math.cos(r)*7,t+=Math.sin(r)*7,n.lineTo(e,t),i.lineTo(e,t),s<3&&l()<.06&&u(e,t,r+(l()<.5?1:-1)*(.6+l()*.9),a*.45,o*.7,s+1);n.lineWidth=o,i.lineWidth=o,n.strokeStyle=`rgba(215,230,242,${.32-s*.07})`,n.stroke(),i.strokeStyle=`rgba(120,120,120,0.7)`,i.stroke()};for(let t=0;t<14;t++)u(l()*e,l()*e,l()*6.3,40+l()*70,.9+l()*1.1,0);for(let t=0;t<3;t++)u(l()*e*.3,e*(.25+l()*.5),(l()-.5)*.6,150,2.2,1);return Ef={map:Sf(t,{wrap:!1}),rough:Sf(r,{srgb:!1,wrap:!1})},Ef}var Of=null;function kf(){if(Of)return Of;let e=1024,[t,n]=xf(512,e),r=n.createImageData(512,e),i=Cf(512,e,41,6,4,2),a=Cf(512,e,42,4,16,.5),o=sd(43);for(let t=0;t<512*e;t++){let n=t%512/512,o=(t/512|0)/e,s=.5+.5*Math.sin((o+(n-.5)**2*.5)*Math.PI*2*3+i[t]*2),c=205+30*i[t]-10*s,l=222+22*i[t]-6*s,u=236+16*i[t],d=Math.max(0,Math.abs(n-.5)*2-.82)/.18,f=Math.max(0,1-Math.abs(n-.36-(i[t]-.5)*.06)/.018)*.7,p=Math.min(1,d*(.6+.6*a[t])+f*a[t]*1.2);c+=(112-c)*p,l+=(110-l)*p,u+=(108-u)*p,r.data.set([c,l,u,255],t*4)}n.putImageData(r,0,0);for(let t=0;t<120;t++){let t=o()*e,r=o()<.5?-1:1,i=.5+r*(.1+o()**.6*.38),a=.06+o()*.16,s=[];for(let e=0;e<=12;e++){let n=i+r*(e/12-.5)*a,c=(Math.abs(n-.5)*2)**2*60;s.push([n*512,t+c+(o()-.5)*3])}for(let t of[0,e,-1024])n.beginPath(),s.forEach(([e,r],i)=>i?n.lineTo(e,r+t):n.moveTo(e,r+t)),n.lineWidth=2+o()*2.5,n.strokeStyle=`rgba(40,96,150,0.85)`,n.stroke(),n.beginPath(),s.forEach(([e,r],i)=>i?n.lineTo(e,r+t+2.5):n.moveTo(e,r+t+2.5)),n.lineWidth=1.2,n.strokeStyle=`rgba(245,250,255,0.7)`,n.stroke()}return Of=Sf(t),Of}function Af(e,t,n,r,i=1,a=1){let o=sd(t),s=new Float32Array(e*e),c=1,l=0;for(let t=0;t<n;t++){let n=r*i<<t,u=r*a<<t,d=Float32Array.from({length:n*u},()=>o());for(let t=0;t<e;t++){let r=t/e*u,i=Math.floor(r),a=r-i,o=a*a*(3-2*a),l=i%u*n,f=(i+1)%u*n;for(let r=0;r<e;r++){let i=r/e*n,a=Math.floor(i),u=i-a,p=u*u*(3-2*u),m=(a+1)%n,h=d[l+a],g=d[l+m],_=d[f+a],v=d[f+m];s[t*e+r]+=c*((h+(g-h)*p)*(1-o)+(_+(v-_)*p)*o)}}l+=c,c*=.5}for(let e=0;e<s.length;e++)s[e]/=l;return s}function jf(t,n,r){let i=document.createElement(`canvas`);i.width=i.height=t;let a=i.getContext(`2d`),o=a.createImageData(t,t);n(o.data),a.putImageData(o,0,0);let s=new jr(i);return s.wrapS=s.wrapT=e,s.anisotropy=8,r&&(s.colorSpace=k),s}var Mf=null;function Nf(){if(Mf)return Mf;let e=Af(512,61,6,4),t=Af(512,62,4,16),n=Af(512,63,5,8),r=jf(512,r=>{for(let i=0;i<262144;i++){let a=i/512|0,o=.5+.5*Math.sin(a/512*Math.PI*2*9+e[i]*6),s=Math.max(0,1-Math.abs(n[i]-.5)*28),c=.55+.35*(e[i]-.5)*2+.18*(t[i]-.5)*2+.06*o-.35*s;c=Math.max(.12,Math.min(1,c)),r[i*4]=140*c+18,r[i*4+1]=144*c+20,r[i*4+2]=152*c+24,r[i*4+3]=255}},!0),i=Af(512,64,5,4),a=Af(512,65,5,8),o=Af(512,66,5,4,3,1);return Mf={rock:r,noise:jf(512,e=>{for(let t=0;t<262144;t++)e[t*4]=i[t]*255,e[t*4+1]=a[t]*255,e[t*4+2]=o[t]*255,e[t*4+3]=255},!1)}}var Pf=`
{
  vec3 sn = normalize(vSnowN);
  vec3 bw = pow(abs(sn), vec3(4.0)); bw /= (bw.x + bw.y + bw.z);
  vec4 nzA = texture2D(uSnowNoise, vSnowW.xz / 170.0);
  vec4 nzB = texture2D(uSnowNoise, vSnowW.xz / 41.0);
  // snow chutes and rock ribs run down the fall line on the side projections
  float streak = texture2D(uSnowNoise, vSnowW.zy * vec2(1.0 / 38.0, 1.0 / 120.0)).b * bw.x
               + texture2D(uSnowNoise, vSnowW.xy * vec2(1.0 / 38.0, 1.0 / 120.0)).b * bw.z + nzB.g * bw.y;
  float alt = vSnowW.y - uSnowLevel;
  float m = (1.0 - sn.y) + (nzA.r - 0.5) * 0.24 + (nzB.g - 0.5) * 0.12 + (streak - 0.5) * 0.2;
  float rockK = smoothstep(0.34, 0.385, m);                                                  // cliffs: snow slides off
  rockK = max(rockK, smoothstep(0.16, 0.2, m) * smoothstep(330.0, 520.0, alt + (nzA.r - 0.5) * 220.0)); // wind-scoured ridges
  rockK *= smoothstep(6.0, 18.0, alt);                                                        // the valley floor stays white
  rockK *= 1.0 - 0.85 * smoothstep(0.6, 0.72, streak * 0.7 + nzB.g * 0.5);                // snow-filled gullies and ledges
  vec3 rc = (texture2D(uSnowRock, vSnowW.zy / 23.0).rgb + texture2D(uSnowRock, vSnowW.zy / 67.0).rgb) * bw.x
          + (texture2D(uSnowRock, vSnowW.xz / 23.0).rgb + texture2D(uSnowRock, vSnowW.xz / 67.0).rgb) * bw.y
          + (texture2D(uSnowRock, vSnowW.xy / 23.0).rgb + texture2D(uSnowRock, vSnowW.xy / 67.0).rgb) * bw.z;
  rc *= 0.5 * (0.7 + 0.6 * nzA.g);
  diffuseColor.rgb = mix(diffuseColor.rgb, rc * vColor.rgb, rockK);
}
`;function Ff(e,t){let n=e.material,{rock:r,noise:i}=Nf();n.onBeforeCompile=e=>{e.uniforms.uSnowRock={value:r},e.uniforms.uSnowNoise={value:i},e.uniforms.uSnowLevel={value:t},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vSnowW;
varying vec3 vSnowN;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vSnowW = (modelMatrix * vec4(transformed, 1.0)).xyz;
vSnowN = normalize(mat3(modelMatrix) * objectNormal);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform sampler2D uSnowRock, uSnowNoise;
uniform float uSnowLevel;
varying vec3 vSnowW;
varying vec3 vSnowN;`).replace(`#include <color_fragment>`,`#include <color_fragment>
`+Pf)},n.customProgramCacheKey=()=>`snow-ground`,n.needsUpdate=!0}var If=hu-.85,Lf=4e3;function Rf(e,t=0){let n=Yu(e),r=[0];for(let e=1;e*Lf<=n+t;e++)r.push(e*Lf,-e*Lf);return r}var zf=new WeakMap;function Bf(e){let t=zf.get(e);if(t)return t;let n=e.bounds,r=(n.minX+n.maxX)/2,i=e.strands[0],a=Pu(i,0,34,9,new U),o=Pu(i,0,0,4.2,new U),s=o.x-a.x,c=o.z-a.z,l=Math.hypot(s,c)||1;s/=l,c/=l,c>-.3&&(s=0,c=-1);let u=(a.z-n.minZ+440)/-c,d=.17*u,f=a.x+s*u+c*d,p=n.minZ-(a.z+c*u-s*d),m=f-540,h=[[m,40,m+(f-m)/.9,40+(p-40)/.9,100,40]],g=sd(41),[_]=h;for(let t of Rf(e,600).slice(1)){let e=g()<.5?-1:1,n=.8+g()*.4,r=_[0]+t+(g()-.5)*900;h.push([r,_[1],r+e*(_[2]-_[0])*n,_[1]+(_[3]-_[1])*n,80+g()*40,32+g()*16])}let v=h.map(([e,t,n,r,i,a])=>({bx:e,bu:t,tx:n,tu:r,w:i,h:a,dx:n-e,du:r-t,l2:(n-e)**2+(r-t)**2}));return t={minZ:n.minZ,maxZ:n.maxZ,cx:r,ex:Yu(e),heads:v,lighthouse:v[0]},zf.set(e,t),t}var Vf=(e,t)=>Math.abs(e.height?.(t)??0),Hf=(e,t)=>66+4*Vf(e,t)+22*Z(t/380,.5,21)+6*Z(t/70,.5,22),Uf=e=>-(.036*e+14*Q(25,480,e));function Wf(e,t,n){let r=Math.max(0,Math.min(1,((t-e.bx)*e.dx+(n-e.bu)*e.du)/e.l2)),i=t-(e.bx+e.dx*r),a=n-(e.bu+e.du*r),o=1+.28*(Z(t/70,n/70,51)-.5)+.12*(Z(t/23,n/23,52)-.5),s=e.w*(1-.35*r)*o,c=Math.hypot(i,a);if(c>s*1.05)return[0,0];let l=e.h*(.72+.28*Math.sin(r*2.6+e.bx))*(.78+.44*Z(t/110,n/110,53))*(1+.16*(Z(t/30,n/30,54)-.5));return[Q(s*.95,s*.5,c),l*Q(s,s*.55,c)]}function Gf(e,t,n,r){if(n<60)return 0;let i=Bf(r),a=i.minZ-t,o=Hf(r,e),s=o-a,c=0,l=Vf(r,e);l>.01&&a>-80&&(c+=Q(60,60+4.5*l,n)*Q(-80,-20,a)*(hu-r.groundAt(e,t)));let u=a>o?Uf(a-o):0,d=Q(60,85,n)*Q(-30,10,a)*(1-Q(o-28,o+2,a))*1.7*Q(.35,.9,Z(e/38,t/38,23)),f=0;if(s>30){let r=Q(60,420,n)*Q(30,260,s);if(r>0){let n=.5*Z(e/240,t/240,32)+.3*Z(e/105,t/105,33)+.2*Z(e/46,t/46,34);f=r*((16+34*Z(e/650,t/650,31))*n*1.6+Q(380,1500,s)*(40+90*Z(e/800,t/800,35))+Q(1300+i.ex,2500+i.ex,Math.abs(e-i.cx))*110*Z(e/500,t/500,36))}}let p=0,m=0;for(let t of i.heads){let[n,r]=Wf(t,e,a);n>p&&(p=n),r>m&&(m=r)}return m*=Q(60,110,n),Gu(r,e,t,n,c+(u+d)*(1-p)+Math.max(f,m))}function Kf(e,t,n,r,i,a,o){let s=Bf(o).minZ-n,c=Hf(o,e)-s,l=t-If,u=Z(e/55,n/55,41),d=Z(e/15,n/15,42),f=Z(e/160,n/160,43),p=Q(3,9,l),m=Math.max(Q(15,75,c+(u-.5)*70),p),h=Math.max(Q(35,120,c+(f-.5)*80),p*Q(.35,.7,r)*Q(5,14,l)),g=1,_=1,v=1,y=m*(.55+.45*Q(.3,.7,d));g+=(.63-g)*y,_+=(.84-_)*y,v+=(.52-v)*y;let b=Z(e/34,n/34,44),x=.72+.3*d+.4*(b-.5),S=Q(.45,.75,Z(e/120,n/120,45)*.7+b*.3);g+=((.24+.24*S)*x-g)*h,_+=((.5+.1*S)*x-_)*h,v+=((.17+.06*S)*x-v)*h;let C=Math.max(Q(.93,.78,r)*Q(-2,1,l)*(1-.8*Q(9,20,l+(u-.5)*12)),Q(.62,.45,r)),w=.62+.45*d+.22*Math.sin(t*.9+u*5);g+=(.3*w-g)*C,_+=(.33*w-_)*C,v+=(.48*w-v)*C;let T=Q(.7,.05,l)*(1-h);if(g+=(.6-g)*T,_+=(.6-_)*T,v+=(.66-v)*T,l<0){let e=Q(0,-6,l);g*=.95-.35*e,_*=1-.2*e,v*=1-.1*e}i[0]*=g,i[1]*=_,i[2]*=v}var qf=6e3,Jf=2500,Yf=1500,Xf=1e3,Zf=1.08,Qf=6,$f=1.5;function ep(e,t,n,r,i){let a=Math.max(1,Math.ceil((r-n)/i)),o=(r-n)/a,s=Array.from({length:a+1},(e,t)=>n+t*o),c=(e,t,n)=>{let r=[],a=e,s=o;for(;n*(t-a)>1e-6;){if(s=Math.min(s*Zf,Qf*i),n*(t-a)<s*1.5){r.push(t);break}a+=n*s,r.push(a)}return r};return[...c(n,e,-1).reverse(),...s,...c(r,t,1)]}function tp(e,t,n=Jf){let r=qf/2,i=qf/t,a,o;if(mu(e)===1)a=Array.from({length:t+1},(e,t)=>-3e3+t*i),o=a;else{let s=e.bounds,c=(s.minX+s.maxX)/2,l=(s.minZ+s.maxZ)/2,u=Math.max(r,(s.maxX-s.minX)/2+Math.max(Jf,n)),d=Math.max(r,(s.maxZ-s.minZ)/2+Jf),f=$f*(t+1)**2;for(let e=i;a=ep(c-u,c+u,Math.max(c-u,s.minX-Yf),Math.min(c+u,s.maxX+Yf),e),o=ep(l-d,l+d,Math.max(l-d,s.minZ-Xf),Math.min(l+d,s.maxZ+Xf),e),!(a.length*o.length<=f);e*=1.1);}let s=a[0],c=a[a.length-1],l=o[0],u=o[o.length-1],d=c-s,f=u-l;return{square:mu(e)===1,seg:t,xs:a,zs:o,x0:s,x1:c,z0:l,z1:u,sizeX:d,sizeZ:f,repeatX:190*d/qf,repeatZ:190*f/qf,uv:(e,t)=>[(e-s)/d,(u-t)/f]}}function np(e){if(e.square){let t=new oa(qf,qf,e.seg,e.seg);return t.rotateX(-Math.PI/2),t}let{xs:t,zs:n}=e,r=t.length,i=n.length,a=new Float32Array(r*i*3),o=new Float32Array(r*i*2),s=new Float32Array(r*i*3);for(let c=0,l=0;c<i;c++)for(let i=0;i<r;i++,l++){a[l*3]=t[i],a[l*3+2]=n[c],s[l*3+1]=1;let[r,u]=e.uv(t[i],n[c]);o[l*2]=r,o[l*2+1]=u}let c=new Uint32Array((r-1)*(i-1)*6),l=0;for(let e=0;e<i-1;e++)for(let t=0;t<r-1;t++){let n=e*r+t,i=n+r,a=i+1,o=n+1;c[l++]=n,c[l++]=i,c[l++]=o,c[l++]=i,c[l++]=a,c[l++]=o}let u=new Y;return u.setAttribute(`position`,new Cn(a,3)),u.setAttribute(`normal`,new Cn(s,3)),u.setAttribute(`uv`,new Cn(o,2)),u.setIndex(new Cn(c,1)),u}function rp(e,t){let n=-1,r=e.length-1;for(;n<r;){let i=n+r+1>>1;e[i]<=t?n=i:r=i-1}return n}var ip=null,ap=null,op=4500,sp=12e3;function cp(){if(ip)return ip;let t=new Float32Array(262144),n=7,r=()=>(n=n*1664525+1013904223>>>0)/4294967296,i=[];for(let e=0;e<48;e++){let e=2+Math.floor(r()**1.4*22),t=1.2+(r()-.5)*(.9+e/14),n=Math.round(Math.cos(t)*e),a=Math.round(Math.sin(t)*e);(n||a)&&i.push([n,a,r()*6.283,1/Math.hypot(n,a)**1.25])}for(let e=0;e<512;e++)for(let n=0;n<512;n++){let r=0;for(let[t,a,o,s]of i)r+=s*Math.exp(Math.sin((t*n+a*e)/512*6.283+o)-1);t[e*512+n]=r}let a=document.createElement(`canvas`);a.width=a.height=512;let o=a.getContext(`2d`),s=o.createImageData(512,512),c=2.2;for(let e=0;e<512;e++)for(let n=0;n<512;n++){let r=t[e*512+(n+1)%512]-t[e*512+(n+512-1)%512],i=t[(e+1)%512*512+n]-t[(e+512-1)%512*512+n],a=-r*c,o=-i*c,l=Math.hypot(a,o,1);a/=l,o/=l,s.data.set([(a*.5+.5)*255,(o*.5+.5)*255,(1/l*.5+.5)*255,255],(e*512+n)*4)}return o.putImageData(s,0,0),ip=new jr(a),ip.wrapS=ip.wrapT=e,ip.colorSpace=``,ip.anisotropy=8,ip}function lp(){if(ap)return ap;let t=11,n=()=>(t=t*1664525+1013904223>>>0)/4294967296,r=[8,16,32].map(e=>({g:e,v:Float32Array.from({length:e*e},n)})),i=(e,t)=>{let n=0,i=1,a=0;for(let{g:o,v:s}of r){let r=e/256*o,c=t/256*o,l=Math.floor(r),u=Math.floor(c),d=r-l,f=c-u,p=d*d*(3-2*d),m=f*f*(3-2*f),h=s[u%o*o+l%o],g=s[u%o*o+(l+1)%o],_=s[(u+1)%o*o+l%o],v=s[(u+1)%o*o+(l+1)%o];n+=i*(h+(g-h)*p+(_-h)*m+(h-g-_+v)*p*m),a+=i,i*=.55}return n/a},a=document.createElement(`canvas`);a.width=a.height=256;let o=a.getContext(`2d`),s=o.createImageData(256,256);for(let e=0;e<256;e++)for(let t=0;t<256;t++){let n=i(t,e),r=1-Math.abs(n-.5)*2,a=Math.max(0,Math.min(1,r**3*1.4+n*.5-.3))*255;s.data.set([a,a,a,255],(e*256+t)*4)}return o.putImageData(s,0,0),ap=new jr(a),ap.wrapS=ap.wrapT=e,ap.colorSpace=``,ap}function up({group:e,keep:t,track:n,groundY:r,updaters:i,groundPlan:a}){let o=Bf(n),{xs:s,zs:c}=a,l=Math.max(0,rp(c,o.minZ-760)),u=Math.max(l,rp(c,o.minZ-55)),d=s.length,f=u-l+1,p=new Float32Array(d*f);for(let e=0;e<f;e++)for(let t=0;t<d;t++)p[e*d+t]=Math.min(29,If-r(s[t],c[l+e]));let m=new Uint8Array(d*f),h=[];for(let e=0;e<d;e++)p[e]>0&&(m[e]=1,h.push(e));for(;h.length;){let e=h.pop(),t=e%d,n=(e-t)/d;for(let[e,r]of[[t-1,n],[t+1,n],[t,n-1],[t,n+1]]){if(e<0||r<0||e>=d||r>=f)continue;let t=r*d+e;!m[t]&&p[t]>0&&(m[t]=1,h.push(t))}}for(let e=0;e<p.length;e++)!m[e]&&p[e]>0&&(p[e]=-2);let g=[],_=[],v=[];for(let e=0;e<f;e++)for(let t=0;t<d;t++)g.push(s[t],If,c[l+e]),_.push(p[e*d+t]);for(let e=0;e<f-1;e++)for(let t=0;t<d-1;t++){let n=e*d+t,r=n+d,i=r+1,a=n+1;Math.max(p[n],p[r],p[i],p[a])<=0||v.push(n,r,a,r,i,a)}let y=c[l],b=c[u],x=n.bounds,S=o.minZ-6500;if(mu(n)===1){let e=7e3,t=(e,t,n,r)=>{let i=g.length/3;g.push(e,If,t,e,If,r,n,If,r,n,If,t),_.push(30,30,30,30),v.push(i,i+1,i+3,i+1,i+2,i+3)};for(let n=0;n<16;n++)for(let r=0;r<8;r++){let i=-7e3+2*e*n/16,a=-7e3+2*e*(n+1)/16;t(i,S+(y-S)*r/8,a,S+(y-S)*(r+1)/8)}t(-7e3,y,a.x0,b),t(a.x1,y,e,b)}else{let e=x.minX-sp,t=x.maxX+sp,n=Math.ceil(16*(t-e)/14e3),r=[...new Set([...Array.from({length:n+1},(r,i)=>e+(t-e)*i/n),a.x0,a.x1])].sort((e,t)=>e-t),i=[...Array.from({length:9},(e,t)=>S+(y-S)*t/8),b],o=g.length/3,s=r.length;for(let e of i)for(let t of r)g.push(t,If,e),_.push(30);for(let e=0;e<i.length-1;e++)for(let t=0;t<s-1;t++){if(e===i.length-2&&r[t]>=a.x0&&r[t+1]<=a.x1)continue;let n=o+e*s+t,c=n+s;v.push(n,c,n+1,c,c+1,n+1)}}let C=new Y;C.setAttribute(`position`,new J(g,3)),C.setAttribute(`normal`,new J(Array.from({length:g.length/3},()=>[0,1,0]).flat(),3)),C.setAttribute(`depth`,new J(_,1)),C.setIndex(v);let w={value:0},T=new Ca({color:16777215,roughness:.1,metalness:0,transparent:!0,envMapIntensity:1});T.onBeforeCompile=e=>{e.uniforms.uTime=w,e.uniforms.uWaves={value:cp()},e.uniforms.uFoam={value:lp()},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float depth;
uniform float uTime;
varying float vDepth;
varying vec2 vXZ;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        float swell = 0.13 * sin(uTime * 0.75 + position.x * 0.005 + position.z * 0.002) + 0.05 * sin(uTime * 1.9 + position.x * 0.013);
        transformed.y += swell;
        // open sea: pulled in to a horizon ring round the camera, just below eye level, so it always
        // reaches the horizon inside the far plane (no strip of sky under it from high cameras)
        vec2 rel = transformed.xz - cameraPosition.xz;
        float rd = length(rel);
        if (depth > 29.5 && rd > 4800.0) { transformed.xz = cameraPosition.xz + rel * (4800.0 / rd); transformed.y = cameraPosition.y - 2.0; }
        vDepth = depth + swell;
        vXZ = position.xz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uTime;
uniform sampler2D uWaves;
uniform sampler2D uFoam;
varying float vDepth;
varying vec2 vXZ;
float gFoam;`).replace(`#include <color_fragment>`,`#include <color_fragment>
        if (vDepth < 0.0) discard;
        float dep = vDepth;
        vec3 shallow = vec3(0.16, 0.66, 0.62), mid = vec3(0.03, 0.36, 0.48), deep = vec3(0.012, 0.075, 0.16);
        vec3 wc = mix(shallow, mid, smoothstep(0.4, 3.5, dep));
        wc = mix(wc, deep, smoothstep(3.0, 13.0, dep));
        float fA = texture2D(uFoam, vXZ * 0.045 + vec2(uTime * 0.011, uTime * 0.017)).r;
        float fB = texture2D(uFoam, vXZ * 0.11 + vec2(-uTime * 0.02, uTime * 0.006)).r;
        float lace = clamp(fA * 0.7 + fB * 0.6, 0.0, 1.0);
        // swash: a bright foam fringe right at the waterline
        float edge = (1.0 - smoothstep(0.03, 0.5, dep)) * (0.55 + 0.6 * lace);
        // breakers: lines of white water rolling in from ~2.6 m deep, fading as they reach the sand
        float along = texture2D(uFoam, vXZ * 0.006 + vec2(0.31, 0.17)).r;
        float br = 0.0;
        for (int k = 0; k < 2; k++) {
          float ph = fract(uTime * 0.075 + float(k) * 0.5 + along * 0.35);
          float at = mix(2.6, 0.15, ph);
          br += exp(-pow((dep - at) / (0.12 + 0.25 * ph), 2.0)) * smoothstep(0.0, 0.15, ph) * (1.0 - 0.55 * ph);
        }
        br *= smoothstep(0.25, 0.75, lace + along * 0.5);
        // trailing streaks of spent foam in the shallows
        float spent = (1.0 - smoothstep(0.3, 2.2, dep)) * smoothstep(0.55, 0.9, lace) * 0.55;
        gFoam = clamp(edge + br + spent, 0.0, 1.0);
        diffuseColor.rgb = mix(wc, vec3(0.93, 0.96, 0.97), gFoam);
        diffuseColor.a = mix(0.28 + 0.72 * smoothstep(0.0, 2.2, dep), 1.0, gFoam);`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
 roughnessFactor = mix(roughnessFactor, 0.85, gFoam);`).replace(`#include <normal_fragment_maps>`,`
        vec2 uvA = vXZ * 0.031 + vec2(uTime * 0.021, uTime * 0.012);
        vec2 uvB = mat2(0.8, -0.6, 0.6, 0.8) * vXZ * 0.0093 + vec2(-uTime * 0.008, uTime * 0.013);
        vec2 uvC = vXZ * 0.0021 + vec2(uTime * 0.002, -uTime * 0.0015);
        float far = smoothstep(60.0, 1400.0, length(vViewPosition));
        vec2 sl = (texture2D(uWaves, uvA).xy * 2.0 - 1.0) * 0.5 * (1.0 - far) + (texture2D(uWaves, uvB).xy * 2.0 - 1.0) * 0.65 + (texture2D(uWaves, uvC).xy * 2.0 - 1.0) * 0.55;
        sl *= mix(0.45, 1.0, smoothstep(0.2, 3.0, vDepth)) * (1.0 - gFoam * 0.6) * (1.0 - 0.8 * far);
        normal = normalize((viewMatrix * vec4(normalize(vec3(sl.x * 0.42, 1.0, sl.y * 0.42)), 0.0)).xyz);`).replace(`#include <fog_fragment>`,`#ifdef USE_FOG
          float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
          // sea haze: toward the horizon the water fades into the bright sky just above it
          float haze = smoothstep(600.0, 4700.0, vFogDepth);
          gl_FragColor.rgb = mix(mix(gl_FragColor.rgb, fogColor, fogFactor), fogColor * 2.0, haze);
        #endif`)},T.customProgramCacheKey=()=>`coast-sea`;let E=new or(C,T);return E.frustumCulled=!1,E.renderOrder=1,e.add(t(E)),i.push(e=>{w.value+=e}),w}function $(e,t){let n=e.index?e.toNonIndexed():e;n!==e&&e.dispose(),n.deleteAttribute(`uv`),n.attributes.normal||n.computeVertexNormals();let r=typeof t==`function`,i=new q(r?16777215:t),a=new Float32Array(n.attributes.position.count*3),o=n.attributes.position,s=n.attributes.normal,c=new U,l=new U;for(let e=0;e<a.length;e+=3)r&&t(c.fromBufferAttribute(o,e/3),l.fromBufferAttribute(s,e/3),i),a[e]=i.r,a[e+1]=i.g,a[e+2]=i.b;return n.setAttribute(`color`,new Cn(a,3)),n}var dp=e=>{let t=ed(e);return e.forEach(e=>e.dispose()),t};function fp({group:e,keep:t,updaters:n},r,i,a,o){let s=[],c=[],l=[];c.push(new H(.01,0),new H(4.4,0),new H(4.4,1.6),new H(3.7,1.6)),l.push(0,0,0,0);for(let e=0;e<6;e++){let t=1.6+e*23.4/6,n=1.6+(e+1)*23.4/6,r=e=>3.7-(e-1.6)*.055;c.push(new H(r(t),t+.001),new H(r(n),n)),l.push(1+e%2,1+e%2)}let u=new aa(c,40),d=[new q(14210252),new q(11739676),new q(15921128)],f=new Float32Array(u.attributes.position.count*3);for(let e=0;e<u.attributes.position.count;e++){let t=d[l[e%c.length]];f.set([t.r,t.g,t.b],e*3)}u.setAttribute(`color`,new Cn(f,3)),u.deleteAttribute(`uv`),s.push(u.toNonIndexed()),u.dispose(),s.push($(new Lr(3.3,2.5,.5,40).translate(0,25.25,0),2829099)),s.push($(new da(3.2,.05,4,48).rotateX(Math.PI/2).translate(0,26.5,0),2829099));for(let e=0;e<16;e++){let t=e/16*Math.PI*2;s.push($(new Lr(.04,.04,1,4).translate(Math.cos(t)*3.2,26,Math.sin(t)*3.2),2829099))}s.push($(new Lr(1.9,1.9,.6,24).translate(0,25.8,0),11739676));for(let e=0;e<8;e++){let t=e/8*Math.PI*2;s.push($(new Fr(.12,2.6,.12).translate(Math.cos(t)*1.75,27.4,Math.sin(t)*1.75),2236962))}s.push($(new ua(2.05,24,8,0,Math.PI*2,0,Math.PI/2).scale(1,.75,1).translate(0,28.7,0),11739676)),s.push($(new Lr(.05,.12,1.4,6).translate(0,30.6,0),2236962));let p=[$(new Fr(9,4.2,6).translate(9.5,2.1,0),15723232),$(new Fr(9.6,.4,6.6).translate(9.5,.2,0),10130828)],m=new ta(new _i([new H(-3.5,0),new H(3.5,0),new H(0,2.3)]),{depth:9.8,bevelEnabled:!1}).rotateY(Math.PI/2).translate(4.6,4.2,0);p.push($(m,10694687)),p.push($(new Fr(.9,2.2,.9).translate(12,6.4,1.2),14209736));for(let e of[7,11.8])p.push($(new Fr(1.2,1.4,.1).translate(e,2.4,3.03),2964038));s.push(...p);let h=new or(dp(s),new Ca({vertexColors:!0,roughness:.6,metalness:.05}));h.position.set(r,i-.4,a),h.rotation.y=o,h.castShadow=!0,h.receiveShadow=!0,e.add(t(h));let g=new Ca({color:2240576,emissive:16769696,emissiveIntensity:3.5,roughness:.1,metalness:.3}),_=new or(new Lr(1.62,1.62,2.4,20,1,!0),g);_.position.set(r,i-.4+25+2.4,a),e.add(t(_));let v=0;return n.push(e=>{v+=e,g.emissiveIntensity=3+9*Math.max(0,Math.cos(v*1.2))**24}),h}function pp(e,t,n,r,{rad:i,h:a,islet:o}){let s=o?new ua(1,40,18,0,Math.PI*2,0,Math.PI*.62):new Lr(i*(.55+e()*.25),i,a,30,18,!1),c=s.attributes.position,l=[],u=new U,d=Math.floor(e()*1e3),f=new q(2893602),p=new q(8023132),m=new q(10785920),h=new q(5204780),g=new q;for(let e=0;e<c.count;e++){if(u.fromBufferAttribute(c,e),o){u.y=(u.y-Math.cos(Math.PI*.62))/(1-Math.cos(Math.PI*.62));let e=1+.5*(Z(u.x*2.5+7,u.z*2.5,d+4)-.5);u.set(u.x*i,u.y**.7*a*e+r,u.z*i)}else u.y+=a/2+r;let s=Math.atan2(u.z,u.x),_=(u.y-r)/a,v=1+(o?.4:.2)*(Z(s*2.2+3,_*3.5,d)-.5)+.12*(Z(s*6,_*9,d+1)-.5)+.09*Math.sin(_*22+s),y=o?v:v*(1+.25*Math.max(0,1-_*3));u.x*=y,u.z*=y,!o&&_>.98&&(u.y+=(Z(u.x/3,u.z/3,d+2)-.5)*i*.4),c.setXYZ(e,u.x+t,u.y,u.z+n);let b=u.y-If;g.copy(p).lerp(m,Math.max(0,Math.min(1,Z(s*3,_*12,d+3)*1.3-.3))),g.lerp(f,Math.max(0,Math.min(1,(2.4-b)/2.2)));let x=o?.72+.12*Z(s*4,.5,d+5):.9;_>x&&g.lerp(h,Math.min(1,(_-x)*(o?5:12))*.9),l.push(g.r,g.g,g.b)}return s.setAttribute(`color`,new J(l,3)),s.deleteAttribute(`uv`),s.computeVertexNormals(),s.index?s.toNonIndexed():s}function mp({group:e,keep:t,updaters:n},r,i,a){let o=[],s=[],c=[];for(let[e,t,n,l,u]of i){let i=Math.min(a(e,t),If-2),d=l+(If-i);o.push(pp(r,e,t,i,{rad:n,h:d,islet:u})),s.push([e,t,u?n*.98:n*1.3]),u&&c.push([e,i+d*.95,t,n])}let l=ed(o);o.forEach(e=>e.dispose());let u=new or(l,new Ca({vertexColors:!0,roughness:.9}));u.receiveShadow=!0,e.add(t(u));let d=lp().clone();d.needsUpdate=!0,d.repeat.set(3,3);let f=new Ca({color:16054522,alphaMap:d,transparent:!0,depthWrite:!1,roughness:.9,polygonOffset:!0,polygonOffsetFactor:-2});f.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying float vR;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vR = length(position.xz);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying float vR;`).replace(`#include <alphamap_fragment>`,`#include <alphamap_fragment>
 diffuseColor.a *= smoothstep(0.9, 0.99, vR) * (1.0 - smoothstep(1.0, 1.3, vR)) * 1.5;`)},f.customProgramCacheKey=()=>`coast-ring`;let p=new vr(new sa(.88,1.32,40,1).rotateX(-Math.PI/2),f,s.length),m=new K,h=new Pe,g=new U,_=new U;s.forEach(([e,t,n],i)=>p.setMatrixAt(i,m.compose(_.set(e,If+.08,t),h.setFromAxisAngle(new U(0,1,0),r()*6),g.set(n,1,n)))),p.renderOrder=2,e.add(t(p)),t(d);let v=0;return n.push(e=>{v+=e,d.offset.set(v*.01,Math.sin(v*.6)*.04)}),c}function hp(){let e=new ua(1,18,8,0,Math.PI*2,Math.PI/2,Math.PI/2).scale(4.2,1.1,1.35).translate(0,.55,0),t=e.attributes.position;for(let e=0;e<t.count;e++){let n=t.getX(e);n>0&&t.setZ(e,t.getZ(e)*(1-(n/4.2)**2*.7))}let n=[$(e,15987180),$(new Lr(1,1,.12,18).scale(4.1,1,1.3).translate(0,.6,0),11569754)];n.push($(new Fr(8.3,.12,2.65).translate(0,.3,0).scale(1,1,1),1920908)),n.push($(new Fr(1.8,.6,1.4).translate(-.6,.95,0),15262940)),n.push($(new Lr(.06,.08,10,5).translate(.5,5.6,0),13158600));let r=(e,t)=>{let n=new Y;return n.setAttribute(`position`,new J(e.flat(),3)),n.computeVertexNormals(),$(n,t)};return n.push(r([[.5,1.4,0],[-3,1.5,.15],[.5,10.3,0]],16513782),r([[.5,1.4,0],[.5,10.3,0],[-3,1.5,.15]],16513782)),n.push(r([[.6,9.6,0],[3.9,1,0],[.6,1.4,.2]],16184298),r([[.6,9.6,0],[.6,1.4,.2],[3.9,1,0]],16184298)),dp(n)}function gp({group:e,keep:t,updaters:n},r){let i=new vr(hp(),new Ca({vertexColors:!0,roughness:.55,side:2}),r.length);i.frustumCulled=!1;let a=r.map(([e,t,n],r)=>({x:e,z:t,hd:n,ph:r*1.7,v:1.6+r*.4})),o=new K,s=new Pe,c=new dt,l=new U(1,1,1),u=new U,d=0,f=()=>{a.forEach((e,t)=>{let n=Math.sin(d*.02+e.ph)*120;u.set(e.x+Math.cos(e.hd)*n,If-.15+Math.sin(d*.9+e.ph)*.18,e.z-Math.sin(e.hd)*n),c.set(Math.sin(d*.7+e.ph)*.06+.12,e.hd+(Math.cos(d*.02+e.ph)<0?Math.PI:0),Math.sin(d*1.1+e.ph)*.05,`YXZ`),i.setMatrixAt(t,o.compose(u,s.setFromEuler(c),l))}),i.instanceMatrix.needsUpdate=!0};f(),e.add(t(i)),n.push(e=>{d+=e,f()})}function _p({group:e,keep:t,updaters:n},r,i){let a=[];for(let e of[1,-1]){let t=[.15,0,0],n=[-.2,0,0],r=[.05,.1,.5*e],i=[-.22,.1,.5*e],o=[-.38,.02,1*e];a.push(t,n,r,n,i,r,r,i,o)}a.push([.35,0,0],[-.4,.02,.07],[-.4,.02,-.07]);let o=new Y;o.setAttribute(`position`,new J(a.flat(),3)),o.computeVertexNormals();let s=$(o,16053490),c=s.attributes.color;for(let e=0;e<c.count;e++)Math.abs(s.attributes.position.getZ(e))>.9&&c.setXYZ(e,.15,.15,.17);let l=new vr(s,new Ca({vertexColors:!0,roughness:.8,side:2}),i.length);l.frustumCulled=!1;let u=i.map(([e,t,n,i])=>({cx:e,cy:t,cz:n,rad:i,ph:r()*6.3,w:(.25+r()*.2)*(r()<.5?1:-1),k:1.3+r()*.4})),d=new K,f=new Pe,p=new dt,m=new U,h=new U,g=0,_=()=>{u.forEach((e,t)=>{let n=e.ph+g*e.w;h.set(e.cx+Math.cos(n)*e.rad,e.cy+Math.sin(g*.4+e.ph)*2.5,e.cz+Math.sin(n)*e.rad);let r=Math.max(0,Math.sin(g*.5+e.ph*3))>.93?Math.sin(g*14)*.35:0;p.set(-Math.sign(e.w)*.35+r*.2,-n-Math.sign(e.w)*Math.PI/2,0,`YXZ`),l.setMatrixAt(t,d.compose(h,f.setFromEuler(p),m.set(e.k,e.k*(1+r),e.k)))}),l.instanceMatrix.needsUpdate=!0};_(),e.add(t(l)),n.push(e=>{g+=e,_()})}var vp=4242,yp=24.15,bp=(e,t)=>Z(e/110,t/110,81)+(Z(e/38.5,t/38.5,82)-.5)*.35;function xp(e,t,n){let r=new ua(e,18,12),i=r.attributes.position,a=new Float32Array(i.count*3);for(let r=0;r<i.count;r++){let o=i.getX(r),s=i.getY(r),c=i.getZ(r),l=1+.035*Math.sin(o*9/e+n)*Math.sin(c*8/e+n*1.7)+.02*Math.sin(s*13/e+n*2.3);i.setXYZ(r,o*l,s*l*.94+t,c*l);let u=Math.max(0,-s/e-.55)*.18;a.set([.93-u,.95-u*.9,.99-u*.8],r*3)}return r.deleteAttribute(`uv`),r.computeVertexNormals(),r.setAttribute(`color`,new Cn(a,3)),r.toNonIndexed()}function Sp(e,t,n,r,i){let a=[],o=(e,t,n,r,i,o,s)=>{let c=new U(e,t,n),l=new U(r,i,o).clone().sub(c),u=l.length(),d=new Lr(s*.7,s,u,5).translate(0,u/2,0);d.applyQuaternion(new Pe().setFromUnitVectors(new U(0,1,0),l.normalize())).translate(e,t,n),a.push($(d,4861984))},s=t+e*r*Math.cos(i),c=n+r*Math.sin(i);return o(t,n,0,s,c,.04,.028),o(s,c,.04,s+e*.2,c+.17,.06,.016),o(s,c,.04,s+e*.24,c-.02,-.02,.014),o(t+e*r*.55*Math.cos(i),n+r*.55*Math.sin(i),.02,t+e*r*.55*Math.cos(i)+e*.1,n+r*.55*Math.sin(i)+.2,0,.013),a}function Cp(e){let t=[],n=.6,r=.44,i=.3,a=1.3568,o=1.9564;t.push(xp(n,.52,.3+e),xp(r,a,1.9+e),xp(i,o,3.1+e));let s=(e,n,r,i)=>t.push($(new ia(i,0).translate(e,n,r),1447448));s(-.1,2.0364,i*.9,.04),s(.1,2.0364,i*.9,.04);for(let e=0;e<5;e++){let t=-.55+e/4*1.1;s(Math.sin(t)*.15,1.8563999999999998+(1-Math.cos(t))*.13,i*.93-Math.abs(t)*.03,.022)}t.push($(new Rr(.05,.34,7).rotateX(Math.PI/2).translate(0,1.9464,.44),15233050));for(let e of[.24,.04,-.16])s(0,a+e,Math.sqrt(r*r-e*e)*.96,.05);s(0,.8200000000000001,Math.sqrt(n*n-.09)*.96,.055),t.push(...Sp(1,r*.85,1.4768,.78,.45),...Sp(-1,-.374,1.4368,.72,.2));let c=e?12854826:3111484;return t.push($(new da(i*.98,.075,6,18).rotateX(Math.PI/2).translate(0,o-i*.72,0),c)),t.push($(new Fr(.14,.42,.05).rotateZ(.12).rotateX(-.25).translate(.13,o-i*.72-.2,r*.72),c)),e===0?(t.push($(new Lr(.34,.34,.035,18).translate(0,2.1904,0),1710621)),t.push($(new Lr(.21,.22,.4,16).translate(0,2.3904,0),1710621)),t.push($(new Lr(.225,.225,.07,16).translate(0,2.2603999999999997,0),10690591))):(t.push($(new ua(i*1.04,16,8,0,Math.PI*2,0,Math.PI/2).scale(1,1.15,1).translate(0,2.0463999999999998,0),2774694)),t.push($(new Lr(i*1.07,i*1.07,.09,16).translate(0,2.0763999999999996,0),15921906)),t.push($(new ia(.09,1).translate(0,2.4563999999999995,0),15921906))),t.push($(new Lr(.62,.85,.12,14).translate(0,.03,0),15331062)),dp(t)}function wp(e,t,n){let r=e.strands[0],i=[],a=new U,o=new U,s=(n,r)=>{if(e.clearance(n,r,yp)<yp)return!1;let[i,a]=gf(t,n,r);if(cf(i-t.lu,a-t.lw)<1.2)return!1;let o=a-t.ws;return!(o>-60&&Math.abs(i-lf(t,o))<uf(o)*1.4)},c=[],l=[[0,0,1],[0,8,1],[0,-6,1],[0,16,1],[0,26,1]];for(let e of[0,25,-25,50,-50,80,-80])for(let[t,n]of[[0,1],[10,1],[0,-1],[10,-1]])c.push([e,t,n]);let u=(e,t,u)=>{for(let[d,f,p]of u?l:c){let c=e+d,l=p*(Math.abs(t)+f)*Math.sign(t),m=Math.min(r.sMax,Math.max(r.sMin,c)),h=r.point(m),g=r.tangent(m),_=Math.hypot(g[0],g[2])||1;if(a.set(h[0]-g[2]/_*l,0,h[2]+g[0]/_*l),!s(a.x,a.z)||!u&&bp(a.x,a.z)>.4)continue;u?o.set(u[0],0,u[1]):o.set(h[0],0,h[2]);let v=Math.atan2(o.x-a.x,o.z-a.z)+(n()-.5)*.4;return i.push([a.x,a.z,v,i.length%2]),!0}return!1},d=r.point(Math.min(r.sMax,Math.max(r.sMin,0))),f=r.tangent(0),p=Math.hypot(f[0],f[2])||1,m=[d[0]-f[2]/p*34,d[2]+f[0]/p*34];u(-30+(n()-.5)*6,-52-n()*4,m),u(34+(n()-.5)*6,-60-n()*4,m);let h=Ju(1,e),g=r.sMax-r.sMin;for(let e=0;e<h;e++){let t=r.sMin+g*((e+.7)/(h+.05))+(n()-.5)*30;Math.abs(t)<140&&(t+=180),u(t,(e%2?-1:1)*(24+n()*6),null)}return i}function Tp(e,t,n){let{group:r,keep:i,clearView:a,groundY:o,track:s}=e,c=wp(s,t,n),l=new Ca({vertexColors:!0,roughness:.85,metalness:0}),u=new K,d=new Pe,f=new U,p=new U,m=new U(0,1,0);for(let e of[0,1]){let t=c.filter(t=>t[3]===e);if(!t.length)continue;let s=new vr(Cp(e),l,t.length);t.forEach(([e,t,r],i)=>{let a=1.15+n()*.2;s.setMatrixAt(i,u.compose(p.set(e,o(e,t)-.05,t),d.setFromAxisAngle(m,r),f.set(a,a,a)))}),s.castShadow=!0,s.receiveShadow=!0,r.add(i(s)),a.addInstanced(s)}}function Ep(){let e=[],t=new ua(1,14,12).scale(.27,.46,.25).translate(0,.5,0),n=t.attributes.position,r=new Float32Array(n.count*3);for(let e=0;e<n.count;e++){let t=n.getX(e),i=n.getY(e),a=n.getZ(e)/.25-Math.abs(t/.27)*.35,o=Math.min(1,Math.max(0,(a+.05)*4))*+(i<.9),s=[.05+.88*o,.055+.88*o,.065+.9*o];if(o>.5&&i>.72){let e=Math.min(1,(i-.72)/.14);s[0]*=1-e*.1,s[2]*=1-e*.45}r.set(s,e*3)}t.deleteAttribute(`uv`),t.setAttribute(`color`,new Cn(r,3)),e.push(t.toNonIndexed()),t.dispose();let i=new ua(.15,12,10).scale(1,1.05,1.1).translate(0,.98,.03),a=i.attributes.position,o=new Float32Array(a.count*3);for(let e=0;e<a.count;e++){let t=a.getX(e),n=a.getY(e)-.98,r=a.getZ(e)-.03,i=Math.abs(t)>.08&&n<.02&&r>-.06&&r<.1;o.set(i?[.95,.62,.08]:[.04,.045,.055],e*3)}i.deleteAttribute(`uv`),i.setAttribute(`color`,new Cn(o,3)),e.push(i.toNonIndexed()),i.dispose(),e.push($(new Rr(.032,.17,6).rotateX(Math.PI/2+.25).translate(0,.95,.22),2761760)),e.push($(new Fr(.03,.025,.08).translate(0,.935,.2),14711322));for(let t of[1,-1])e.push($(new ua(1,6,6).scale(.03,.27,.09).rotateZ(t*.22).translate(t*.27,.56,-.01),723983)),e.push($(new Fr(.08,.035,.13).translate(t*.08,.018,.08),2827554));return dp(e)}function Dp(e,t,n,r){e.t+=t;let i=(n,r)=>{let i=n-e.h;i=Math.atan2(Math.sin(i),Math.cos(i)),e.h+=Math.max(-r*t,Math.min(r*t,i))},a=n=>{e.x+=Math.sin(e.h)*n*t,e.z+=Math.cos(e.h)*n*t},o=()=>Math.atan2(r.x-e.x,r.z-e.z),s=()=>Math.hypot(e.x-r.x,e.z-r.z)>r.r;if(e.mode===0){if(i(Math.atan2(e.tx-e.x,e.tz-e.z),1.4),a(.38),e.ph+=t*9,e.pitch=0,e.t>e.dur||Math.hypot(e.tx-e.x,e.tz-e.z)<.6){e.t=0;let t=n();if(t<.3&&!s())e.mode=2,e.h=n()<.5?e.h:o()+(n()-.5)*1.6;else if(t<.6)e.mode=1,e.dur=1.5+n()*3,e.face=r.face+(n()-.5)*1.4;else{let t=n()*6.283,i=n()*r.r*.7;e.tx=r.x+Math.cos(t)*i,e.tz=r.z+Math.sin(t)*i,e.dur=4+n()*6}}}else if(e.mode===1){if(i(e.face,1.2),e.t>e.dur){e.mode=0,e.t=0;let t=n()*6.283,i=n()*r.r*.7;e.tx=r.x+Math.cos(t)*i,e.tz=r.z+Math.sin(t)*i,e.dur=4+n()*6}}else if(e.mode===2){let t=Math.min(1,e.t/.45);e.pitch=Math.PI/2*t*t,a(1.2*t),t>=1&&(e.mode=3,e.t=0,e.dur=2.6+n()*1.6,e.v0=3.4+n()*1.4)}else if(e.mode===3){let n=Math.min(1,e.t/e.dur);a(e.v0*(1-n)**1.4*(s()?.4:1)),e.ph+=t*4,e.pitch=Math.PI/2,n>=1&&(e.mode=4,e.t=0)}else{let t=Math.min(1,e.t/.7);e.pitch=Math.PI/2*(1-t*t*(3-2*t)),t>=1&&(e.mode=1,e.t=0,e.dur=1+n()*2,e.face=r.face+(n()-.5)*1.4)}}function Op(e,t,n,r){let{group:i,keep:a,updaters:o,density:s}=e,c=Math.max(4,Math.round(6*s)),[l,u]=hf(t,t.lu-42,t.lw-.72*190),d={x:l,z:u,r:12,face:Math.atan2(t.nx,t.nz)},f=new vr(Ep(),new Ca({vertexColors:!0,roughness:.55,metalness:0}),c);f.castShadow=!0,f.frustumCulled=!1;let p=Array.from({length:c},(e,r)=>{let i=r/c*6.283+n(),a=2+n()*6;return{x:l+Math.cos(i)*a,z:u+Math.sin(i)*a,h:n()*6.283,mode:r===0?2:+(n()<.5),t:0,dur:1+n()*4,tx:l+(n()-.5)*16,tz:u+(n()-.5)*16,ph:n()*6.3,pitch:0,face:Math.atan2(t.nx,t.nz)+(n()-.5)*1.4,v0:4,k:1.25+n()*.25}}),m=new K,h=new Pe,g=new dt,_=new U,v=new U,y=()=>{for(let e=0;e<c;e++){let t=p[e],n=t.mode===0,i=t.mode===3,a=n?Math.sin(t.ph)*.14:i?Math.sin(t.ph)*.05:0,o=n?Math.abs(Math.cos(t.ph))*.035*t.k:0;v.set(t.x,r+o+Math.sin(t.pitch)*.24*t.k,t.z),g.set(t.pitch,t.h,a,`YXZ`),f.setMatrixAt(e,m.compose(v,h.setFromEuler(g),_.set(t.k,t.k,t.k)))}f.instanceMatrix.needsUpdate=!0};y(),i.add(a(f)),o.push(e=>{let t=Math.min(e,.1);for(let e=0;e<c;e++)Dp(p[e],t,n,d);y()})}var kp=`
uniform float uTime;
uniform vec3 uOrigin, uWind;
attribute vec4 aSeed;
varying vec2 vUv;
varying float vA;
#include <fog_pars_vertex>
void main() {
  float life = fract(uTime * 0.16 + aSeed.x);
  vec3 c = uOrigin + vec3(0.0, life * 5.5, 0.0) + uWind * pow(life, 1.4) * 5.0
         + vec3(aSeed.y - 0.5, 0.0, aSeed.z - 0.5) * (0.2 + 1.6 * life);
  float size = mix(0.35, 2.4, sqrt(life)) * (0.8 + 0.4 * aSeed.w);
  vec4 mvPosition = viewMatrix * vec4(c, 1.0);
  float a = aSeed.y * 6.283 + uTime * 0.3 * (aSeed.z - 0.5);
  mvPosition.xy += mat2(cos(a), sin(a), -sin(a), cos(a)) * position.xy * size;
  gl_Position = projectionMatrix * mvPosition;
  vUv = position.xy;
  vA = smoothstep(0.0, 0.08, life) * (1.0 - smoothstep(0.35, 1.0, life));
  #include <fog_vertex>
}`,Ap=`
varying vec2 vUv;
varying float vA;
#include <fog_pars_fragment>
void main() {
  float d = length(vUv) * 2.0;
  float a = (1.0 - smoothstep(0.25, 1.0, d)) * vA * 0.55;
  if (a < 0.004) discard;
  gl_FragColor = vec4(vec3(0.5, 0.51, 0.54) + vec3(0.12) * smoothstep(-0.5, 0.5, vUv.y), a);
  #include <fog_fragment>
}`;function jp(e,t,n,r){let i=new po;i.setAttribute(`position`,new J([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3)),i.setIndex([0,1,2,0,2,3]);let a=new Float32Array(r*4);for(let t=0;t<r;t++)a.set([(t+e()*.5)/r,e(),e(),e()],t*4);i.setAttribute(`aSeed`,new ur(a,4)),i.instanceCount=r;let o=new or(i,new xa({fog:!0,transparent:!0,depthWrite:!1,uniforms:{...va.clone(X.fog),uTime:{value:0},uOrigin:{value:t},uWind:{value:n}},vertexShader:kp,fragmentShader:Ap}));return o.frustumCulled=!1,o.renderOrder=2,o}function Mp(){let e=[],t=9382687,n=8069912,r=15263456,i=2.8,a=2.2,o=2.1;e.push($(new Fr(3,.16,2.4000000000000004).translate(0,.08,0),4864560));for(let r=0;r<9;r++){let s=-2.8/2+i/9*(r+.5),c=r%2?t:n;for(let t of[1,-1])e.push($(new Fr(i/9*.98,o,.08).translate(s,1.21,t*a/2),c))}for(let r=0;r<7;r++){let s=-2.2/2+a/7*(r+.5),c=r%2?t:n;for(let t of[1,-1])e.push($(new Fr(.08,o,a/7*.98).translate(t*i/2,1.21,s),c))}let s=new _i([new H(-2.8/2,0),new H(i/2,0),new H(0,.85)]);for(let n of[1,-1])e.push($(new ta(s,{depth:.08,bevelEnabled:!1}).translate(0,2.2600000000000002,n*a/2-.04),t));for(let t of[1,-1])for(let n of[1,-1])e.push($(new Fr(.12,o,.12).translate(t*i/2,1.21,n*a/2),r));e.push($(new Fr(.86,1.72,.06).translate(-.6,1.02,1.1500000000000001),r)),e.push($(new Fr(.7,1.6,.08).translate(-.6,.98,1.1700000000000002),3811874)),e.push($(new Fr(.66,.58,.06).translate(.62,1.4,1.1500000000000001),r)),e.push($(new Fr(.06,.58,.66).translate(1.45,1.4,0),r));let c=Math.atan2(.85,i/2),l=Math.hypot(i/2,.85)+.3;for(let t of[1,-1]){let n=new Fr(l,.1,2.7).translate(t*l/2,0,0).rotateZ(-t*c);e.push($(n.translate(0,3.1500000000000004,0),3025448));let r=new Fr(l-.05,.16,2.62).translate(t*(l-.05)/2,.11,0).rotateZ(-t*c);e.push($(r.translate(0,3.1500000000000004,0),15659768))}let u=.75,d=-.55,f=3.1100000000000003-u*Math.tan(c)-.1;e.push($(new Lr(.1,.1,1.25,10).translate(u,f+.62,d),5001043)),e.push($(new Rr(.2,.14,10).translate(u,f+1.42,d),3882304)),e.push($(new ua(1,12,6,0,Math.PI*2,0,Math.PI/2).scale(1.9,.45,.7).translate(.2,0,-2.2/2-.15),15659768)),e.push($(new ua(1,12,6,0,Math.PI*2,0,Math.PI/2).scale(.6,.35,1.4).translate(-2.8/2-.12,0,-.2),15659768));let p=dp([new oa(.52,.44).translate(.62,1.4,1.185),new oa(.52,.44).rotateY(Math.PI/2).translate(1.4849999999999999,1.4,0)].map(e=>(e.deleteAttribute(`uv`),e)));return{geo:dp(e),glass:p,pipeTop:[u,f+1.5,d]}}function Np(){let e=[];e.push($(new Ir(.42,18).rotateX(-Math.PI/2).translate(0,.05,0),793638)),e.push($(new sa(.4,.75,18,1).rotateX(-Math.PI/2).translate(0,.04,0),11846864));for(let[t,n,r]of[[.9,.3,.22],[-.7,.75,.18],[.2,-.95,.26],[-.95,-.4,.14]])e.push($(new ia(r,0).scale(1.3,.55,1).translate(t,r*.3,n),13624306));let t=new Lr(.012,.02,1.4,5).translate(0,.7,0).rotateZ(1.05).translate(1.15,.12,-.1);return e.push($(t,3942938)),e.push($(new Lr(.02,.025,.42,5).rotateZ(.2).translate(.75,.21,-.1),5914672)),e.push($(new Lr(.004,.004,.8,3).translate(-.05,.4,-.1),2236962)),e.push($(new Lr(.17,.14,.34,10).translate(1.35,.17,.55),3104666)),dp(e)}function Pp(e,t,n,r){let{group:i,keep:a,updaters:o,quality:s}=e,[c,l]=hf(t,t.lu+48,t.lw-133),u=Math.atan2(t.nx,t.nz)-.55,{geo:d,glass:f,pipeTop:p}=Mp(),m=new or(d,new Ca({vertexColors:!0,roughness:.82,metalness:0}));m.position.set(c,r,l),m.rotation.y=u,m.castShadow=!0,m.receiveShadow=!0,i.add(a(m));let h=new or(f,new Ca({color:3153936,emissive:16758880,emissiveIntensity:2.2,roughness:.3}));h.position.copy(m.position),h.rotation.y=u,i.add(a(h));let g=new or(Np(),new Ca({vertexColors:!0,roughness:.4,metalness:0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4})),_=Math.cos(u),v=Math.sin(u),y=2.6,b=2.2;g.position.set(c+y*_+b*v,r,l-y*v+b*_),g.rotation.y=u,i.add(a(g));let[x,S,C]=p,w=new U(c+x*_+C*v,r+S,l-x*v+C*_),T=Math.max(6,Math.round(14*Math.min(1,s?.particleScale??1))),E=jp(n,w,new U(.94,.12,.34).normalize(),T);i.add(a(E));let D=E.material.uniforms.uTime;o.push(e=>{D.value=(D.value+e)%3600})}function Fp(e,t){let n=sd(vp),r=t.level+.03;Tp(e,t,n),Pp(e,t,n,r),Op(e,t,n,r)}var Ip=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n],Lp=[.86,.9,.96],Rp=[.028,.06,.036],zp=[.012,.028,.018],Bp=[.09,.06,.045];function Vp(e,{tiers:t,radial:n,rings:r,under:i,trunk:a=!0}){let o=[],s=[],c=[],l=(e,t,n,r,i=1)=>(o.push(e,t,n),s.push(r[0]*i,r[1]*i,r[2]*i),o.length/3-1),u=(e,t)=>Array.from({length:e},(n,r)=>t(r,r/e*Math.PI*2)),d=(e,t)=>{let n=e.length;for(let r=0;r<n;r++){let i=(r+1)%n;c.push(e[r],t[r],e[i],e[i],t[r],t[i])}};if(a){let e=u(5,(e,t)=>l(Math.cos(t)*.03,-.06,Math.sin(t)*.03,Bp));d(u(5,(e,t)=>l(Math.cos(t)*.02,.3,Math.sin(t)*.02,Bp)),e)}let f=(e()-.5)*.03;for(let a=0;a<t;a++){let o=a/t,s=.08+.82*o**.92,p=a===t-1?1:Math.min(.97,s+.16+.1*(1-o)),m=.29*(1-(s-.05)/.99)**.8*(.86+.28*e()),h=f*s,g=e()*6.3,_=[l(h,p,0,Lp,.95+.08*e())];for(let t=1;t<=r;t++){let i=t/r,a=t===r,o=u(n,(t,n)=>{let r=t%2==0,o=.75+.35*e(),c=a?r?o:.55+.15*e():r?.92+.12*e():.82+.1*e(),u=m*i*c,d=p-(p-s)*i**1.35-(a&&r?.03*o:0)+(e()-.5)*.016*i,f=a?r?.1:.4:1-.5*i,_=e()<f?Lp:e()<.25?zp:Rp;return l(h+Math.cos(n+g)*u,d,Math.sin(n+g)*u,_,.85+.3*e())});if(_.length===1)for(let e=0;e<n;e++)c.push(_[0],o[(e+1)%n],o[e]);else d(o,_);_=o}i&&d(u(n,(e,t)=>l(h+Math.cos(t+g)*m*.2,s+(p-s)*.25,Math.sin(t+g)*m*.2,zp)),_)}let p=new Y;return p.setAttribute(`position`,new J(o,3)),p.setAttribute(`color`,new J(s,3)),p.setIndex(c),p.computeVertexNormals(),p}function Hp(e,t,n){let{group:r,r:i,density:a,keep:o,clearView:s,groundY:c,scatter:l}=e,u=new Ca({vertexColors:!0,roughness:.92,metalness:0}),d=(e,t,n)=>Z(e/n,t/n,81)+(Z(e/(n*.35),t/(n*.35),82)-.5)*.35,f=(e,t)=>{let n=c(e,t);return Math.hypot(c(e+4,t)-n,c(e,t+4)-n)/4},p=(e,r)=>!n(e,r,6)&&f(e,r)<.6&&c(e,r)-t.level<240,m=new K,h=new Pe,g=new U,_=new U,v=new dt,y=new q,b=(e,t,n,r)=>{t.forEach(([t,a,o],s)=>{let c=Q(.5,.75,d(t,a,110)),l=n+(r-n)*Math.min(1,i()*.7+c*.5),u=l*(.8+i()*.35);h.setFromEuler(v.set((i()-.5)*.05,i()*6.3,(i()-.5)*.05)),e.setMatrixAt(s,m.compose(_.set(t,o-.25,a),h,g.set(u,l,u)));let f=.88+i()*.16,p=i()*.06;e.setColorAt(s,y.setRGB(f*(1-p),f,f*(1+p*.5)))})},x=(e,t,n)=>{let r=Array.from({length:n},()=>[]);return e.forEach(e=>r[Math.floor(i()*n)].push(e)),r.map(e=>({list:e,geo:Vp(i,{...t,tiers:t.tiers+Math.floor(i()*3)-1})}))},S=(e,t)=>i()<.08+.92*Q(.45,.62,d(e,t,110)),C=l(Ju(Math.floor(150*a),e.track),20,60,(e,t)=>S(e,t)&&p(e,t)),w=l(Ju(Math.floor(420*a),e.track),60,240,(e,t)=>S(e,t)&&p(e,t));for(let{list:e,geo:t}of x(C,{tiers:10,radial:14,rings:3,under:!0},3)){if(!e.length){t.dispose();continue}let n=new vr(t,u,e.length);b(n,e,8,21),n.castShadow=!0,n.receiveShadow=!0,r.add(o(n)),s.addInstanced(n)}for(let{list:e,geo:t}of x(w,{tiers:7,radial:9,rings:2,under:!1},2)){if(!e.length){t.dispose();continue}let n=new vr(t,u,e.length);b(n,e,9,24),r.add(o(n)),s.addInstanced(n)}let T=[],E=Ju(Math.floor(1700*a),e.track),D=1350,O=e.track.bounds;for(let e=0;T.length<E&&e<E*12;e++){let e=O.minX-D+i()*(O.maxX-O.minX+2*D),n=O.minZ-D+i()*(O.maxZ-O.minZ+2*D),r=Math.max(O.minX-e,0,e-O.maxX),a=Math.max(O.minZ-n,0,n-O.maxZ),o=Math.hypot(r,a);if(o<230||o>D)continue;let[s,l]=gf(t,e,n);t.elev&&l<0&&s>t.uMin-300&&s<t.uMax+300&&o<1400||i()>Q(.42,.6,d(e,n,280))||p(e,n)&&T.push([e,n,c(e,n)])}for(let{list:e,geo:t}of x(T,{tiers:4,radial:6,rings:2,under:!1,trunk:!1},2)){if(!e.length){t.dispose();continue}let n=new vr(t,u,e.length);b(n,e,10,26),r.add(o(n))}}var Up=[3422013,7304058,10791085,9078402];function Wp(e){let t=od(e,Up),n=t.attributes.position,r=t.attributes.normal,i=t.attributes.color,a=[e()*6,e()*6];for(let e=0;e<n.count;e++){let t=n.getX(e),o=n.getY(e),s=n.getZ(e),c=.18*Math.sin(t*5+a[0])*Math.sin(s*4.3+a[1]),l=Q(.5,.75,r.getY(e)+c+o*.25);i.setXYZ(e,i.getX(e)+(.9-i.getX(e))*l,i.getY(e)+(.93-i.getY(e))*l,i.getZ(e)+(.98-i.getZ(e))*l)}return t}function Gp(e,t,n){let{group:r,r:i,density:a,keep:o,clearView:s,groundY:c,scatter:l,track:u}=e,d=Array.from({length:4},()=>Wp(i)),f=new Ca({vertexColors:!0,roughness:.9,metalness:0}),p=[],m=(e,t)=>{let n=c(e,t);return Math.hypot(c(e+3,t)-n,c(e,t+3)-n)/3>.3};for(let[e,t,r]of l(Ju(Math.floor(38*a),u),8,260,(e,t)=>!n(e,t,4)&&!m(e,t))){let a=.6+i()**1.6*2.6;p.push([e,t,r,a]);for(let r=Math.floor(i()*4);r>0;r--){let r=i()*6.3,o=a*(1.1+i()*1.5),s=e+Math.cos(r)*o,l=t+Math.sin(r)*o;u.clearance(s,l)<5||n(s,l,2)||p.push([s,l,c(s,l),a*(.2+i()*.35)])}}for(let e=0;e<16;e++){let e=i()*6.3,r=1.1+i()*.2,a=sf(e),[o,s]=hf(t,t.lu+Math.cos(e)*r*a*170,t.lw+Math.sin(e)*r*a*190),l=c(o,s);u.clearance(o,s)<8||l-t.level>5||n(o,s,1)||p.push([o,s,l,.8+i()*2.2])}for(let e=0;e<10;e++){let e=10+i()*140,n=i()<.5?-1:1,r=uf(e),[a,o]=hf(t,lf(t,e)+n*r*(1.05+i()*.3),t.ws+e);m(a,o)||p.push([a,o,c(a,o),2.5+i()*4])}let h=new K,g=new Pe,_=new U,v=new U,y=new dt,b=new q,x=d.map(()=>[]);p.forEach(e=>x[Math.floor(i()*d.length)].push(e)),d.forEach((e,t)=>{if(!x[t].length){e.dispose();return}let n=new vr(e,f,x[t].length);x[t].forEach(([e,t,r,a],o)=>{g.setFromEuler(y.set((i()-.5)*.2,i()*6.3,(i()-.5)*.2)),n.setMatrixAt(o,h.compose(v.set(e,r-a*.12,t),g,_.set(a,a*(.8+i()*.4),a)));let s=.9+i()*.15;n.setColorAt(o,b.setRGB(s,s,s*1.02))}),n.castShadow=!0,n.receiveShadow=!0,r.add(o(n)),s.addInstanced(n)})}function Kp(e,t,n){t.envMapIntensity=n,e.onBeforeRender=(e,n)=>{t.envMap!==n.environment&&(t.envMap=n.environment,t.needsUpdate=!0)}}function qp(e,t){let{group:n,keep:r}=e,i=[],a=[],o=[],s=t.level+.03,c=(e,n)=>{let[r,o]=hf(t,t.lu+e*170,t.lw+n*190);i.push(r,s,o),a.push((e+1.2)/2.4,1-(n+1.2)/2.4)};c(0,0);for(let e=1;e<=14;e++){let t=e/14*1.08;for(let e=0;e<128;e++){let n=e/128*Math.PI*2,r=sf(n)*t;c(Math.cos(n)*r,Math.sin(n)*r)}}for(let e=0;e<128;e++)o.push(0,1+(e+1)%128,1+e);for(let e=1;e<14;e++)for(let t=0;t<128;t++){let n=1+(e-1)*128+t,r=1+(e-1)*128+(t+1)%128,i=n+128,a=r+128;o.push(n,a,i,n,r,a)}let l=new Y;l.setAttribute(`position`,new J(i,3)),l.setAttribute(`uv`,new J(a,2)),l.setIndex(o),l.computeVertexNormals(),l.attributes.normal.getY(0)<0&&(l.index.array.reverse(),l.computeVertexNormals());let{map:u,rough:d}=Df(),f=new Ca({map:u,roughnessMap:d,roughness:1,metalness:0,color:14674674}),p=new or(l,f);Kp(p,f,1.25),p.receiveShadow=!0,n.add(r(p))}function Jp(e,t=.3){let n=new ia(.6,1);n.deleteAttribute(`normal`),n.deleteAttribute(`uv`),n=nd(n);let r=Array.from({length:5+Math.floor(e()*3)},()=>({n:new U(e()-.5,(e()-.5)*.9,e()-.5).normalize(),d:.32+e()*.18})),i=n.attributes.position,a=new U;for(let n=0;n<i.count;n++){a.fromBufferAttribute(i,n).multiplyScalar(1+(e()-.5)*.25);for(let e of r){let t=a.dot(e.n)-e.d;t>0&&a.addScaledVector(e.n,-t)}let o=1-t*(a.y/.6+.5);i.setXYZ(n,a.x*o,a.y+.5,a.z*o)}n=rd(n,.3);let o=n.attributes.position,s=n.attributes.normal,c=[];for(let e=0;e<o.count;e++){let t=s.getY(e),n=o.getY(e),r=Ip([.08,.3,.55],[.42,.68,.88],Math.min(1,Math.max(0,n*.7+.25*Math.sin(o.getX(e)*9+o.getZ(e)*7))));r=Ip(r,[.88,.93,.98],Q(.62,.88,t)),c.push(...r)}return n.setAttribute(`color`,new J(c,3)),n}function Yp(e,t){let{group:n,r,keep:i,groundY:a}=e,o=uf(0),s=e=>-12*(1-Math.min(1,(e/o)**2)),c=(e,n,r,i,o)=>{let s=Q(.82*r,1.08*r,Math.abs(n)),c=df(t,e)+pf(n,r)+1.1;return c+(a(i,o)-3-c)*s},l=[],u=[],d=[],f=[],p=[];for(let e=0;e<=150;e++)for(let n=0;n<=44;n++){let r=-1.08+2.16*n/44,i=s(r*o),a=i+(ff-i)*(e/150)**1.6,f=uf(a),m=r*f,[h,g]=hf(t,lf(t,a)+m,t.ws+a),_=c(a,m,f,h,g);e<3&&(_-=(3-e)/3*16*Math.max(0,Z(r*11,.5,95)-.4)*(.6+.8*Z(r*31,2.5,98))),l.push(h,_,g),u.push(r/2.16+.5,-a/240),e===0&&p.push([m,h,_,g]);let v=Q(1100,1600,a),y=Ip([.86,.92,.97],[.76,.88,1],Q(380,520,a)*(1-Q(900,1050,a)));y=Ip(y,[1.05,1.06,1.08],v);let b=.94+.12*Z(h/60,g/60,91);d.push(y[0]*b,y[1]*b,y[2]*b)}for(let e=0;e<150;e++)for(let t=0;t<44;t++){let n=e*45+t,r=n+1,i=n+44+1,a=i+1;f.push(n,r,i,r,a,i)}let m=new Y;m.setAttribute(`position`,new J(l,3)),m.setAttribute(`uv`,new J(u,2)),m.setAttribute(`color`,new J(d,3)),m.setIndex(f),m.computeVertexNormals(),m.attributes.normal.getY(22)<0&&(m.index.array.reverse(),m.computeVertexNormals());let h=new Ca({map:kf(),vertexColors:!0,roughness:.5,metalness:0}),g=new or(m,h);Kp(g,h,.8),g.receiveShadow=!0,n.add(i(g));let _=[],v=[],y=[],b=t.level-1.2;p.forEach(([e,n,r,i],a)=>{for(let a=0;a<=22;a++){let o=a/22,s=r+(b-r)*o,c=2.2*Math.sin(e*.42+Z(e/9,s/14,93)*5)+5*(Z(e/11,s/7,94)-.5)+4*(Z(e/5,s/26,96)-.5),l=-2.2*Q(.82,1,o),u=o===0?0:(c+l)*Q(0,.12,o),[d,f]=gf(t,n,i),[p,m]=hf(t,d,f-u);_.push(p,s,m);let h=Math.min(1,Math.max(0,.45+c*.14)),g=.9+.1*Math.sin(s*1.3+Z(e/30,s/4,97)*4),y=Ip([.06,.24,.46],[.5,.74,.9],h).map(e=>e*g);y=Ip(y,[.06,.2,.36],Q(.75,1,o)*.7),y=Ip(y,[.9,.94,.98],1-Q(.02,.1,o)),v.push(...y)}});for(let e=0;e<p.length-1;e++)for(let t=0;t<22;t++){let n=e*23+t,r=n+1,i=n+22+1,a=i+1;y.push(n,i,r,r,i,a)}let x=new Y;x.setAttribute(`position`,new J(_,3)),x.setAttribute(`color`,new J(v,3)),x.setIndex(y),x.computeVertexNormals();{let e=Math.floor(p.length/2)*23+11,n=x.attributes.normal;-(n.getX(e)*-t.nx+n.getZ(e)*-t.nz)<0&&(x.index.array.reverse(),x.computeVertexNormals())}let S=new Ca({vertexColors:!0,roughness:.3,metalness:0,emissive:670310,emissiveIntensity:.35}),C=new or(x,S);Kp(C,S,.9),n.add(i(C));let w=[];for(let e=0;e<300;e++){let e=420+r()*620,n=uf(e),i=(r()-.5)*1.75*n,[a,o]=hf(t,lf(t,e)+i,t.ws+e),s=6+r()**1.5*16;w.push([a,c(e,i,n,a,o)-s*.35,o,s*(.9+r()*.8),s,s*(.9+r()*.8)])}for(let e=0;e<40;e++){let e=4+r()*50,n=uf(e),i=(r()-.5)*1.6*n,[a,o]=hf(t,lf(t,e)+i,t.ws+e),s=4+r()*9;w.push([a,c(e,i,n,a,o)-s*.35,o,s*(.6+r()*.6),s,s*(.6+r()*.6)])}for(let e=0;e<34;e++){let e=(r()-.5)*2.2*o,n=-20-r()**1.5*70,[i,a]=hf(t,lf(t,0)+e,t.ws+n),[s,c]=gf(t,i,a);if(cf(s-t.lu,c-t.lw)>.92)continue;let l=1+r()**2*6;w.push([i,t.level-l*.35,a,l*(1+r()),l,l*(1+r())])}let T=new Ca({vertexColors:!0,roughness:.35,metalness:0,emissive:670310,emissiveIntensity:.25}),E=new K,D=new Pe,O=new U,k=new U,A=new dt;for(let e=0;e<2;e++){let t=w.filter((t,n)=>n%2===e),a=new vr(Jp(r,e?.3:.1),T,t.length);t.forEach(([e,t,n,i,o,s],c)=>{D.setFromEuler(A.set((r()-.5)*.5,r()*6.3,(r()-.5)*.5)),a.setMatrixAt(c,E.compose(k.set(e,t,n),D,O.set(i,o,s)))}),Kp(a,T,.9),n.add(i(a))}}var Xp=`
uniform float uTime, uScale;
uniform vec3 uCam;
attribute float aRand;
varying float vA;
void main() {
  vec3 box = vec3(64.0, 34.0, 64.0);
  vec3 p = position;
  p.y -= uTime * (0.8 + aRand * 0.7);
  p.x += uTime * 0.7 + sin(uTime * 0.6 + aRand * 40.0) * 0.8;
  p.z += uTime * 0.25 + cos(uTime * 0.45 + aRand * 23.0) * 0.7;
  p = mod(p - uCam + box * 0.5, box) - box * 0.5;          // the flakes stay put in the world, the box follows the camera
  vec4 mv = viewMatrix * vec4(uCam + p, 1.0);
  float dist = length(p);
  vA = (1.0 - smoothstep(16.0, 30.0, dist)) * smoothstep(0.6, 2.0, dist);
  gl_PointSize = clamp(uScale * (0.03 + aRand * 0.035) / -mv.z, 1.0, 12.0);
  gl_Position = projectionMatrix * mv;
}`,Zp=`
uniform float uBright;
varying float vA;
void main() {
  float a = smoothstep(0.5, 0.15, length(gl_PointCoord - 0.5)) * vA;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vec3(0.94, 0.96, 1.0) * uBright, a * 0.85);
}`;function Qp(e){let{group:t,keep:n,updaters:r,quality:i}=e,a=Math.round(2600*Math.min(1,i?.particleScale??1)),o=new Float32Array(a*3),s=new Float32Array(a);for(let e=0;e<a;e++)o[e*3]=Math.random()*64,o[e*3+1]=Math.random()*34,o[e*3+2]=Math.random()*64,s[e]=Math.random();let c=new Y;c.setAttribute(`position`,new Cn(o,3)),c.setAttribute(`aRand`,new Cn(s,1));let l=new xa({uniforms:{uTime:{value:0},uScale:{value:500},uCam:{value:new U},uBright:{value:2.2}},vertexShader:Xp,fragmentShader:Zp,transparent:!0,depthWrite:!1,fog:!1}),u=new Or(c,l);u.frustumCulled=!1,u.renderOrder=2;let d=new Ze;u.onBeforeRender=(e,t,n)=>{e.getCurrentViewport(d),l.uniforms.uCam.value.setFromMatrixPosition(n.matrixWorld),l.uniforms.uScale.value=n.projectionMatrix.elements[5]*d.w*.5,l.uniformsNeedUpdate=!0},r.push(e=>{l.uniforms.uTime.value=(l.uniforms.uTime.value+e)%3600}),t.add(n(u))}function $p(e){let{group:t,keep:n,track:r,groundUV:i}=e,a=[[2.05,.08],[2.45,.24],[2.95,.34],[3.6,.33],[4.4,.2],[5.3,.04],[6.1,-.12]],o=[],s=[],c=[],l=[],u=new U;for(let e of r.strands){let t=e.closed?e.sMin:e.sMin+1,n=e.closed?e.sMax:e.sMax-1,d=Math.floor((n-t)/2)+1;for(let f of[-1,1]){let p=-1;for(let m=0;m<d;m++){let d=Math.min(n,t+m*2),[h,g,_]=e.point(d),v=g-r.groundAt(h,_)<.75,y=o.length/3;for(let[t,n]of a){u.set(h,0,_);let a=e.tangent(d),l=Math.hypot(a[0],a[2])||1;u.x-=a[2]/l*t*f,u.z+=a[0]/l*t*f;let p=r.groundAt(u.x,u.z),m=r.clearance(u.x,u.z)<t-.6,g=.55+.9*Z(d/23+f*50,t*.15,99)+.15*Math.sin(d*.41+t),y=p+(v&&!m?n*g:-.4);o.push(u.x,y,u.z),s.push(...i(u.x,u.z));let b=.96+.06*Math.sin(d*.9+t*3);c.push(b,b,b*1.01)}if(p>=0)for(let e=0;e<a.length-1;e++){let t=p+e,n=y+e;f>0?l.push(t,t+1,n,n,t+1,n+1):l.push(t,n,t+1,n,n+1,t+1)}p=y}}}let d=new Y;d.setAttribute(`position`,new J(o,3)),d.setAttribute(`uv`,new J(s,2)),d.setAttribute(`color`,new J(c,3)),d.setIndex(l),d.computeVertexNormals();let f=new or(d,new Ca({map:Tf(),vertexColors:!0,roughness:1,metalness:0}));f.receiveShadow=!0,t.add(n(f))}function em(e){let t=mf(e.track),n=(e,n,r)=>{let[i,a]=gf(t,e,n),o=i-t.lu;if(cf(o,a-t.lw)<1.08+r/190||a>8&&a<t.lw&&Math.abs(o)<136)return!0;let s=a-t.ws;return s>-40&&Math.abs(i-lf(t,s))<uf(s)*1.25+r};Ff(e.ground,t.level),qp(e,t),Yp(e,t),Hp(e,t,n),Gp(e,t,n),$p(e),Qp(e),Fp(e,t)}var tm={id:`snow`,sky:{exposure:.28,sunColor:16773340,sunIntensity:4.2,hemiSky:11060460,hemiGround:14673648,hemiIntensity:.3,fog:12899560,fogDensity:42e-5,sunDir:new U(.55,.5,.67),bloom:.35,bloomThreshold:10,turbidity:2,rayleigh:1.6,mieCoefficient:.003,mieDirectionalG:.8,envIntensity:.25},ground:{a:[218,226,238],b:[245,248,252]},groundTexture:Tf,ballastDust:[1.9,1.95,2.05],minimap:`#c9d6e6`,dust:[.95,.97,1],lift:yf,groundColor:bf,build(e){em(e)}},nm=`
#ifdef USE_FOG
  uniform vec3 fogColor; uniform float fogDensity; varying float vFogDepth; varying float vFogH;
#endif
uniform float uFogK; uniform float uFogBase;
float fogAmount() {
#ifdef USE_FOG
  float k = uFogK + (1.0 - uFogK) * (1.0 - smoothstep(0.0, 140.0, vFogH - uFogBase));
  return 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth * k);
#else
  return 0.0;
#endif
}`,rm=`#ifdef USE_FOG
 varying float vFogDepth; varying float vFogH;
#endif
`,im=(e,t)=>`#ifdef USE_FOG\n vFogDepth = -(${e}).z; vFogH = (${t}).y;\n#endif\n`,am=`
float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * vn(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }
vec2 cells(vec2 p) {
  vec2 i = floor(p), f = fract(p); float d1 = 8.0, d2 = 8.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 r = g + vec2(h21(i + g), h21(i + g + 19.7)) - f;
    float d = dot(r, r);
    if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d;
  }
  return sqrt(vec2(d1, d2));
}`,om=.3,sm=.5,cm=4.5,lm=e=>Number.isInteger(e)?`${e}.0`:`${e}`,um=`
float erupt(float t) {
  float ph = mod(t - ${lm(3)}, ${lm(24)});
  return ${lm(om)} + ${lm(.7)} * smoothstep(0.0, ${lm(sm)}, ph) * exp(-ph / ${lm(cm)});
}`;function dm(e,t){let n=new Ze;e.onBeforeRender=(e,r,i)=>{e.getCurrentViewport(n),t.uniforms.uPx.value=n.w/(2*Math.tan(Ne.degToRad(i.fov??40)/2))}}function fm(e,{cell:t=1.6,fogK:n=1,fogBase:r=0,gain:i=1,polygonOffset:a=0}={}){return new xa({fog:!0,side:2,polygonOffset:a!==0,polygonOffsetFactor:-a,polygonOffsetUnits:-a*4,uniforms:{...va.clone(X.fog),uTime:e,uCell:{value:t},uGain:{value:i},uFogK:{value:n},uFogBase:{value:r}},vertexShader:`
      attribute vec2 lava; attribute float flow;
      varying vec2 vP; varying vec2 vLava; varying float vFlow;
      ${rm}
      void main() {
        vP = uv; vLava = lava; vFlow = flow;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vec4 mv = viewMatrix * wp;
        gl_Position = projectionMatrix * mv;
        ${im(`mv`,`wp`)}
      }`,fragmentShader:`
      uniform float uTime, uCell, uGain;
      varying vec2 vP; varying vec2 vLava; varying float vFlow;
      ${nm}
      ${am}
      void main() {
        vec2 p = vP / uCell;
        float t = uTime;
        p.y -= t * vFlow;                                   // crust plates ride the flow
        float n = fbm(p * 0.3 + vec2(t * 0.03, -t * vFlow * 0.4));
        float m = fbm(p * 0.11 - vec2(0.0, t * vFlow * 0.15) + 7.0);
        float H = clamp(vLava.x * (0.45 + 0.75 * n) * mix(0.4, 1.05, vLava.y) + (m - 0.5) * 0.25, 0.0, 1.0);
        vec2 c = cells(p + 1.2 * vec2(n - 0.5, m - 0.5));
        float gap = c.y - c.x;
        float px = length(fwidth(p));                                 // cell units per pixel: fade detail before it shimmers
        float w = 0.02 + 0.16 * H * H + px * 0.7;
        float crack = (1.0 - smoothstep(w * 0.35, w, gap)) * smoothstep(0.1, 0.35, H) * (1.0 - smoothstep(0.25, 0.6, px) * 0.6)
                    * (0.3 + 0.7 * smoothstep(0.25, 0.7, vn(p * 0.9 + 3.0 + t * 0.05)));   // some cracks glow, some have sealed
        vec2 c2 = cells(p * 3.1 + 0.8 * vec2(m, n));                 // fine fracturing on the plates
        float fine = (1.0 - smoothstep(0.0, 0.06, c2.y - c2.x)) * smoothstep(0.45, 0.8, H) * 0.6 * (1.0 - smoothstep(0.06, 0.18, px));
        float molten = smoothstep(0.72, 0.95, H + 0.18 * (n - 0.5)) * smoothstep(0.75, 0.95, vLava.x);
        float g = max(max(crack, fine), molten);
        float k = clamp(H * (0.75 + 0.35 * crack + 0.4 * molten), 0.0, 1.0);
        vec3 hot = mix(vec3(0.6, 0.04, 0.005), vec3(1.0, 0.3, 0.03), smoothstep(0.2, 0.6, k));
        hot = mix(hot, vec3(1.0, 0.62, 0.22), smoothstep(0.8, 1.0, k));
        float flick = 0.85 + 0.15 * sin(t * 2.3 + n * 17.0);
        float I = (0.8 + 2.2 * k + 3.6 * pow(k, 4.0)) * flick * uGain;
        float rough = vn(p * 2.7) * 0.7 + vn(p * 7.3) * 0.3;
        vec3 crust = vec3(0.03, 0.026, 0.024) * (0.5 + 1.0 * rough) + vec3(0.16, 0.02, 0.003) * H * H * H;   // dull red where the crust is thin
        vec3 col = mix(crust, hot * I, g);
        float f = fogAmount();
        #ifdef USE_FOG
          col = mix(col, fogColor, f);
        #endif
        gl_FragColor = vec4(col, 1.0);
      }`})}function pm(e,t,n,r,i,{count:a=64,rise:o=950,drift:s=1100,fogK:c=.45,fogBase:l=0}={}){let u=new po;u.setAttribute(`position`,new J([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3)),u.setIndex([0,1,2,0,2,3]);let d=new Float32Array(a*4);for(let e=0;e<a;e++)d.set([(e+t()*.6)/a,t(),t(),t()],e*4);u.setAttribute(`aSeed`,new ur(d,4)),u.instanceCount=a;let f=new or(u,new xa({fog:!0,transparent:!0,depthWrite:!1,uniforms:{...va.clone(X.fog),uTime:e,uOrigin:{value:n.clone()},uWind:{value:r.clone().normalize()},uSun:{value:i.clone().normalize()},uRise:{value:o},uDrift:{value:s},uFogK:{value:c},uFogBase:{value:l}},vertexShader:`
      attribute vec4 aSeed;
      uniform float uTime, uRise, uDrift; uniform vec3 uOrigin, uWind;
      varying vec2 vUv; varying float vA; varying float vLow; varying vec4 vSeed; varying vec3 vSideV; varying float vE;
      ${rm}
      ${um}
      void main() {
        float life = fract(uTime * 0.011 + aSeed.x);
        float E = erupt(uTime - life / 0.011);                       // how hard it was erupting when this puff left the vent
        float h = uRise * (1.0 - pow(1.0 - life, 1.7)) * (0.85 + 0.35 * E);   // fast out of the vent, slowing as it climbs; blasts punch higher
        vec3 jit = vec3(aSeed.y - 0.5, (aSeed.w - 0.5) * 0.4, aSeed.z - 0.5) * (50.0 + 520.0 * life);
        vec3 c = uOrigin + vec3(0.0, h, 0.0) + uWind * pow(life, 1.5) * uDrift + jit;
        float size = mix(90.0, 560.0, pow(life, 0.65)) * (0.75 + 0.5 * aSeed.w) * (0.8 + 0.5 * E);
        vec4 mv = viewMatrix * vec4(c, 1.0);
        float a = aSeed.y * 6.283 + uTime * 0.03 * (aSeed.z - 0.5);
        vec2 q = mat2(cos(a), sin(a), -sin(a), cos(a)) * position.xy;
        mv.xy += q * size;
        gl_Position = projectionMatrix * mv;
        vUv = position.xy; vSeed = aSeed;
        vA = smoothstep(0.0, 0.06, life) * (1.0 - smoothstep(0.55, 1.0, life)) * (0.75 + 0.6 * E);   // a blast throws out thick ash
        vLow = exp(-h / 170.0); vE = E;
        vSideV = (viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz;
        vec4 wp = vec4(c, 1.0);
        ${im(`mv`,`wp`)}
      }`,fragmentShader:`
      uniform float uTime; uniform vec3 uSun;
      varying vec2 vUv; varying float vA; varying float vLow; varying vec4 vSeed; varying vec3 vSideV; varying float vE;
      ${nm}
      ${am}
      void main() {
        vec2 p = vUv * 3.2 + vSeed.yz * 40.0;
        float n = fbm(p + uTime * 0.02);
        float d = length(vUv) * 2.0 + (n - 0.5) * 0.9;
        float a = min(0.97, (1.0 - smoothstep(0.3, 1.0, d)) * vA * 0.9);
        if (a < 0.004) discard;
        float up = vUv.y + (n - 0.5) * 0.5;                          // -0.5 bottom .. 0.5 top of the puff
        float sunUp = clamp(uSun.y * 2.0, 0.2, 1.0);
        vec3 col = vec3(0.026, 0.024, 0.023) * (0.7 + 0.8 * n) + vec3(0.06, 0.04, 0.028) * sunUp * smoothstep(-0.2, 0.5, up);
        col += vec3(1.0, 0.3, 0.05) * vLow * smoothstep(0.35, -0.5, up) * (0.9 + 1.6 * vLow) * (0.55 + 0.9 * vE);   // lava light from below, flaring in a blast
        #ifdef USE_FOG
          col = mix(col, fogColor, fogAmount());
        #endif
        gl_FragColor = vec4(col, a);
      }`}));return f.frustumCulled=!1,f.renderOrder=2,f}function mm(e,t,n,{color:r=16734740,strength:i=1.6,fogK:a=.45,fogBase:o=0}={}){let s=new xa({fog:!0,transparent:!0,depthWrite:!1,blending:2,uniforms:{...va.clone(X.fog),uTime:e,uColor:{value:new q(r)},uStrength:{value:i},uR:{value:n},uFogK:{value:a},uFogBase:{value:o}},vertexShader:`
      uniform float uR; varying vec2 vUv;
      ${rm}
      void main() {
        vec4 wp = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vec4 mv = viewMatrix * wp;
        mv.xy += position.xy * uR;
        gl_Position = projectionMatrix * mv;
        vUv = position.xy;
        ${im(`mv`,`wp`)}
      }`,fragmentShader:`
      uniform float uTime, uStrength; uniform vec3 uColor; varying vec2 vUv;
      ${nm}
      ${um}
      void main() {
        float d = length(vUv * 2.0);
        float g = pow(max(0.0, 1.0 - d), 2.2) * (0.9 + 0.1 * sin(uTime * 1.3) + 0.06 * sin(uTime * 4.1)) * (0.55 + 1.5 * erupt(uTime));   // flares with each blast
        vec3 col = uColor * g * uStrength * (1.0 - fogAmount());
        gl_FragColor = vec4(col, 1.0);
      }`}),c=new or(new oa(1,1),s);return c.position.copy(t),c.frustumCulled=!1,c.renderOrder=3,c}function hm(e,t,n,{spatter:r=1500,bombs:i=260,density:a=1,fogK:o=.42,fogBase:s=0,seed:c=4242}={}){r=Math.round(r*a),i=Math.round(i*a);let l=r*2+i*6,u=new Float32Array(l*3),d=new Float32Array(l*4),f=new Float32Array(l*2),p=c>>>0,m=0,h=()=>(p=p*1664525+1013904223>>>0)/4294967296,g=(e,t)=>{let n=[h(),h(),h(),h()];for(let r=0;r<t;r++,m++)d.set(n,m*4),f.set([e,r/t],m*2)};for(let e=0;e<r;e++)g(0,2);for(let e=0;e<i;e++)g(1,6);let _=new Y;_.setAttribute(`position`,new Cn(u,3)),_.setAttribute(`aSeed`,new Cn(d,4)),_.setAttribute(`aKind`,new Cn(f,2));let v=new xa({fog:!0,transparent:!0,depthWrite:!1,blending:2,uniforms:{...va.clone(X.fog),uTime:e,uVent:{value:t.clone()},uPx:{value:400},uCone:{value:new Ze(n.cx,n.cz,n.fx,n.fz)},uHeights:{value:n.heights},uConeR:{value:new Ze(n.baseY,n.rMax,n.rings,1/n.ringPow)},uFogK:{value:o},uFogBase:{value:s}},vertexShader:`
      attribute vec4 aSeed; attribute vec2 aKind;
      uniform float uTime, uPx; uniform vec3 uVent; uniform vec4 uCone; uniform vec4 uConeR; uniform sampler2D uHeights;
      varying float vA; varying float vHeat;
      ${rm}
      ${um}
      const float G = 24.0;                                    // a bit over real gravity: snappier arcs at this distance
      float h11(float x) { return fract(sin(x * 127.1 + 311.7) * 43758.5453); }
      /** The built cone's surface (breach, gullies and all), from its polar height grid. */
      float surf(vec2 xz) {
        vec2 d = xz - uCone.xy;
        float th = atan(dot(d, vec2(-uCone.w, uCone.z)), dot(d, uCone.zw));
        vec2 sz = vec2(textureSize(uHeights, 0));
        float u = fract(th / 6.2832) * (sz.x - 1.0), v = uConeR.z * pow(min(1.0, length(d) / uConeR.y), uConeR.w);
        return uConeR.x + texture(uHeights, (vec2(u, v) + 0.5) / sz).r;
      }
      void main() {
        bool bomb = aKind.x > 0.5;
        float trail = aKind.y;
        // each particle relaunches every T seconds; launch n gets its own random throw
        // spatter: this particle's top speed is fixed (aSeed.x), so its loop T always outlasts its flight
        float upMax = mix(80.0, 130.0, aSeed.x);
        float T = bomb ? 14.0 + 4.0 * aSeed.x : 2.0 * upMax / G + 1.0;
        float tt = uTime - trail * (bomb ? 0.5 : 0.07) + aSeed.y * T;
        float nL = floor(tt / T), age = tt - nL * T, tl = uTime - age;
        float E = erupt(tl);
        float h1 = h11(nL + aSeed.z * 91.0), h2 = h11(nL * 1.7 + aSeed.w * 57.0), h3 = h11(nL * 2.3 + aSeed.x * 33.0);
        float on = bomb ? step(h1, smoothstep(0.5, 0.95, E)) : step(h1, 0.25 + 0.75 * E);   // calm: a quarter of the spatter; bombs only in a blast
        float az = h2 * 6.2832;
        vec3 v;
        if (bomb) {
          float sp = mix(55.0, 100.0, h3) * (0.75 + 0.25 * E), el = mix(0.87, 1.22, h11(nL + aSeed.y * 13.0));   // 50..70 deg up
          v = vec3(cos(az) * cos(el), sin(el), sin(az) * cos(el)) * sp;
        } else {
          float up = upMax * mix(0.8, 1.0, h3) * (0.5 + 0.5 * E);   // calm: 40..65 m/s, just over the rim; a blast: up to 350 m
          v = vec3(cos(az), 0.0, sin(az)) * up * mix(0.03, 0.22, h11(nL + aSeed.y * 7.0)) + vec3(0.0, up, 0.0);
        }
        vec3 p0 = uVent + vec3(cos(az), 0.0, sin(az)) * 14.0 * h11(nL * 3.1 + aSeed.w);
        vec3 p = p0 + v * age + vec3(0.0, -0.5 * G, 0.0) * age * age;
        // landed? find when (bisection: below the cone only on the way down), and rest there, cooling
        float tUp = v.y / G, landed = 0.0;
        if (age > tUp && p.y < surf(p.xz)) {
          float a = tUp, b = age;
          for (int i = 0; i < 14; i++) {
            float m = 0.5 * (a + b); vec3 q = p0 + v * m + vec3(0.0, -0.5 * G, 0.0) * m * m;
            if (q.y < surf(q.xz)) b = m; else a = m;
          }
          landed = age - b;
          p = p0 + v * b + vec3(0.0, -0.5 * G, 0.0) * b * b;
          p.y = surf(p.xz) + 2.5;
        }
        float heat = bomb ? (1.0 - 0.25 * smoothstep(0.0, 6.0, age)) * (1.0 - smoothstep(0.0, 4.5, landed))
                          : 1.0 - 0.55 * smoothstep(0.0, 4.0, age);
        float fadeIn = smoothstep(0.0, 0.12, age);
        float alive = bomb ? (landed > 0.0 ? 1.0 - smoothstep(1.5, T * 0.6, landed) : 1.0) * (1.0 - smoothstep(T - 1.5, T, age))   // a landed bomb glows a while, gone before its relaunch
                           : (landed > 0.0 ? 1.0 - smoothstep(0.0, 0.6, landed) : 1.0);     // spatter splashes and is gone
        if (landed > 0.0 && trail > 0.0) alive = 0.0;                                      // each tail spark goes out where it lands
        vA = on * fadeIn * alive * (1.0 - trail * 0.85) * (0.75 + 0.25 * sin(uTime * 13.0 + aSeed.w * 50.0));
        vHeat = heat * (1.0 - 0.6 * trail);
        vec4 wp = vec4(p, 1.0), mv = viewMatrix * wp;
        gl_Position = vA < 0.002 ? vec4(2.0, 2.0, 2.0, 1.0) : projectionMatrix * mv;    // off-screen when hidden
        float size = (bomb ? 18.0 : 9.0) * (0.7 + 0.6 * aSeed.z) * (1.0 - 0.5 * trail);
        gl_PointSize = clamp(size * uPx / max(1.0, -mv.z), 1.0, 48.0);
        ${im(`mv`,`wp`)}
      }`,fragmentShader:`
      varying float vA; varying float vHeat;
      ${nm}
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float g = pow(max(0.0, 1.0 - d), 1.4) * vA;
        if (g < 0.01) discard;
        vec3 c = mix(vec3(0.9, 0.12, 0.02), vec3(1.0, 0.55, 0.15), smoothstep(0.3, 0.8, vHeat));
        c = mix(c, vec3(1.0, 0.85, 0.55), smoothstep(0.85, 1.0, vHeat));
        vec3 col = c * (0.8 + 9.0 * vHeat * vHeat) * g * (1.0 - fogAmount());
        gl_FragColor = vec4(col, 1.0);
      }`}),y=new Or(_,v);return y.frustumCulled=!1,y.renderOrder=3,dm(y,v),y}function gm(e,t,n,{count:r=600,rise:i=18,size:a=.35}={}){if(!t.length)return null;let o=t.reduce((e,t)=>e+t[3],0),s=new Float32Array(r*3),c=new Float32Array(r*4);for(let e=0;e<r;e++){let r=n()*o,i=0;for(;i<t.length-1&&r>t[i][3];)r-=t[i][3],i++;let[a,l,u,d]=t[i],f=n()*6.283,p=Math.sqrt(n())*d*.85;s.set([a+Math.cos(f)*p,l,u+Math.sin(f)*p],e*3),c.set([n(),n(),n(),n()],e*4)}let l=new Y;l.setAttribute(`position`,new Cn(s,3)),l.setAttribute(`aSeed`,new Cn(c,4));let u=new xa({fog:!0,transparent:!0,depthWrite:!1,blending:2,uniforms:{...va.clone(X.fog),uTime:e,uRise:{value:i},uSize:{value:a},uPx:{value:400},uFogK:{value:1},uFogBase:{value:0}},vertexShader:`
      attribute vec4 aSeed; uniform float uTime, uRise, uSize, uPx;
      varying float vA; varying float vHeat;
      ${rm}
      void main() {
        float speed = 0.08 + 0.14 * aSeed.x;
        float life = fract(uTime * speed + aSeed.y);
        float sw = uTime * (0.6 + aSeed.z) + aSeed.w * 6.283;
        vec3 p = position + vec3(sin(sw) * (0.6 + 3.0 * life), life * uRise * (0.5 + aSeed.z), cos(sw * 0.8) * (0.6 + 3.0 * life))
               + vec3(1.0, 0.0, 0.4) * life * life * 6.0;                 // a breeze leans them over
        vec4 wp = vec4(p, 1.0);
        vec4 mv = viewMatrix * wp;
        gl_Position = projectionMatrix * mv;
        vHeat = 1.0 - life;
        vA = smoothstep(0.0, 0.05, life) * (1.0 - smoothstep(0.6, 1.0, life)) * (0.6 + 0.4 * sin(uTime * 9.0 + aSeed.w * 40.0));
        gl_PointSize = clamp(uSize * (0.6 + aSeed.w) * uPx / max(1.0, -mv.z), 1.0, 7.0);
        ${im(`mv`,`wp`)}
      }`,fragmentShader:`
      varying float vA; varying float vHeat;
      ${nm}
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float g = pow(max(0.0, 1.0 - d), 1.6) * vA;
        if (g < 0.01) discard;
        vec3 col = mix(vec3(1.0, 0.22, 0.03), vec3(1.0, 0.7, 0.3), vHeat * vHeat) * (2.0 + 9.0 * vHeat) * g * (1.0 - fogAmount());
        gl_FragColor = vec4(col, 1.0);
      }`}),d=new Or(l,u);return d.frustumCulled=!1,d.renderOrder=3,dm(d,u),d}function _m(e,{glowColor:t=new q(1,.22,.04),glowGain:n=3,fogK:r=1,fogBase:i=0}={}){return e.onBeforeCompile=e=>{e.uniforms.uGlowColor={value:t.clone().multiplyScalar(n)},e.uniforms.uFogK={value:r},e.uniforms.uFogBase={value:i},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float glow; varying float vGlow; varying float vFogH;`).replace(`#include <fog_vertex>`,`#include <fog_vertex>
vGlow = glow; vFogH = (modelMatrix * vec4(transformed, 1.0)).y;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform vec3 uGlowColor; uniform float uFogK; uniform float uFogBase; varying float vGlow; varying float vFogH;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
totalEmissiveRadiance += uGlowColor * vGlow;`).replace(`#include <fog_fragment>`,`#ifdef USE_FOG
        float fk = uFogK + (1.0 - uFogK) * (1.0 - smoothstep(0.0, 140.0, vFogH - uFogBase));
        float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth * fk);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
      #endif`)},e.customProgramCacheKey=()=>`volcano-glowfog`,e}function vm(e,t,n,r,{cloud:i=1840660,sunGlow:a=16747072,lavaGlow:o=16730640,gain:s=1}={}){let c=(e,t=1)=>new q(e).multiplyScalar(t),l=new xa({transparent:!1,depthWrite:!1,fog:!1,side:1,uniforms:{uTime:e,uCloud:{value:c(i,s)},uHaze:{value:c(r,s*1.35)},uSunGlow:{value:c(a,s)},uLava:{value:c(o,s)},uV:{value:new H(t.x,t.y)},uSun:{value:n.clone().normalize()}},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = position;
        vec4 p = projectionMatrix * vec4(mat3(viewMatrix) * position, 1.0);
        gl_Position = p.xyww;                          // pinned to the far plane: behind everything
        gl_Position.z *= 0.99999;
      }`,fragmentShader:`
      uniform float uTime; uniform vec3 uCloud, uHaze, uSunGlow, uLava, uSun; uniform vec2 uV;
      varying vec3 vDir;
      ${am}
      void main() {
        vec3 d = normalize(vDir);
        float up = max(d.y, 0.0);
        vec2 p = d.xz / (up + 0.12) * 1.3 + vec2(uTime * 0.006, uTime * 0.003);   // a cloud deck overhead
        float n = mix(0.5, fbm(p) * 0.6 + fbm(p * 2.9 + 3.0) * 0.4, smoothstep(0.03, 0.16, up));   // no noise at the horizon: it would alias
        float cover = smoothstep(0.3, 0.75, n);
        float hi = smoothstep(0.0, 0.5, up);
        vec3 col = mix(uHaze, uCloud * (0.6 + 0.8 * n), smoothstep(0.02, 0.4, up));
        float sunA = max(0.0, dot(d, uSun));
        float toV = max(0.0, dot(normalize(d.xz + 1e-5), uV));
        col += uSunGlow * (pow(sunA, 5.0) * 0.5 + pow(sunA, 40.0) * 1.2) * (1.0 - 0.6 * hi) * (0.35 + 0.65 * (1.0 - cover));
        col += uSunGlow * smoothstep(0.99955, 0.9998, sunA) * 5.0 * (1.0 - 0.7 * cover * hi);   // the sun: a dull orange disc through the ash
        col += uLava * pow(toV, 8.0) * (1.0 - smoothstep(0.0, 0.3, up)) * (0.25 + 0.5 * cover) * 0.35;  // lava light on the ash
        gl_FragColor = vec4(col, 1.0);                 // opaque: the Sky shader's white-hot sun must not glare through
      }`}),u=new or(new ua(4e3,48,24),l);return u.frustumCulled=!1,u.renderOrder=10,u}var ym=120,bm=320,xm=1.06;function Sm(e,t,n,r,i){let{H:a,RB:o,RC:s,DEPTH:c}=e,l=Math.atan2(Math.sin(n-.12),Math.cos(n-.12)),u=a*(1+.05*Math.sin(3*n+1)+.035*Math.sin(7*n+2)+.02*Math.sin(13*n+4))-34*Math.exp(-((l/.2)**2)),d;if(t>=s){let e=Math.min(1,(t-s)/(o-s));d=u*(1-e)**2.05*(1+.08*Math.sin(e*9+n*2)*e),t>o&&(d-=(t-o)/(o*.06000000000000005)*60)}else{let e=t/s;d=a-c+(u-a+c)*e**5}let f=Q(s*.85,s*1.5,t)*(1-.55*Q(o*.6,o,t)),p=0;p+=14*Math.abs(Math.sin(17*n+.004*t+1.3)),p+=10*Math.abs(Math.sin(31*n-.006*t+.4)),p+=6*Math.abs(Math.sin(53*n+.009*t+2.2)),p+=4*Math.abs(Math.sin(89*n-.011*t+5.1));let m=(Z(r/110,i/110,61)-.5)*26+(Z(r/41,i/41,62)-.5)*12+(Z(r/15,i/15,63)-.5)*5;return d+f*(t<s?.35:1)*(p-22)*(.4+.6*(1-Math.min(1,Math.max(0,(t-s)/(o-s)))**.5))+m*(.3+.7*f)}var Cm=(e,t)=>e.RB*xm*(t/ym)**1.25;function wm({P:e,V:t,r:n,time:r,colorAt:a,groundTex:o,groundUV:s,sunDir:c,density:l=1}){let{cx:d,cz:f,fx:p,fz:m}=e,h=-m,g=p,v=hu,y=(e,t,n)=>{let r=Math.cos(t)*e,i=Math.sin(t)*e;return n[0]=d+p*r+h*i,n[1]=f+m*r+g*i,n},b=[0,0],x=38841,S=new Float32Array(x*3),C=new Float32Array(x*2),w=new Float32Array(x);for(let e=0;e<=ym;e++){let n=Cm(t,e);for(let r=0;r<=bm;r++){let i=r%bm/bm*Math.PI*2,a=e*321+r;y(n,i,b);let o=Sm(t,n,i,b[0],b[1]);w[a]=o,S.set([b[0],v+o,b[1]],a*3),C.set(s(b[0],b[1]),a*2)}}let T=[];for(let e=0;e<ym;e++)for(let t=0;t<bm;t++){let n=e*321+t,r=n+bm+1;T.push(n,r,n+1,r,r+1,n+1)}let E=new Y;if(E.setAttribute(`position`,new Cn(S,3)),E.setAttribute(`uv`,new Cn(C,2)),E.setIndex(T),E.computeVertexNormals(),E.attributes.normal.getY(19263)<0){for(let e=0;e<T.length;e+=3){let t=T[e+1];T[e+1]=T[e+2],T[e+2]=t}E.setIndex(T),E.computeVertexNormals()}let D=E.attributes.normal;for(let e=0;e<=ym;e++){let t=e*321,n=t+bm,r=D.getX(t)+D.getX(n),i=D.getY(t)+D.getY(n),a=D.getZ(t)+D.getZ(n),o=Math.hypot(r,i,a)||1;D.setXYZ(t,r/o,i/o,a/o),D.setXYZ(n,r/o,i/o,a/o)}let O=(e,n)=>{let r=Math.min(119.9999,ym*(Math.max(0,e)/(t.RB*xm))**.8),i=(n/(Math.PI*2)%1+1)%1*bm,a=Math.floor(r),o=Math.floor(i),s=r-a,c=i-o,l=a*321+o;return(w[l]*(1-c)+w[l+1]*c)*(1-s)+(w[l+bm+1]*(1-c)+w[l+bm+2]*c)*s},k=(e,t)=>{let n=e-d,r=t-f;return[Math.hypot(n,r),Math.atan2(n*h+r*g,n*p+r*m)]},A=[];for(let[e,r,i,a]of[[.12,.92,16,46],[.19,.55,10,26],[-.42,.7,12,34],[.62,.48,9,22],[-.95,.6,10,28]]){let o=n()*6.3,s=n()*6.3,c=[],l=t.RC*.9,u=t.RC+(t.RB-t.RC)*r;for(let t=l;t<=u;t+=7){let n=(t-l)/(u-l),r=e+(.05*Math.sin(t/130+o)+.028*Math.sin(t/43+s))*Math.min(1,n*4);y(t,r,b);let d=(i+(a-i)*n)*(.85+.3*Z(t/60,e*10,64))*(n>.93?1-(n-.93)*6:1);c.push({x:b[0],z:b[1],w:d,t:n})}A.push(c)}let j=[],M=[],N=[],P=[],ee=[];for(let e of A){let t=j.length/3,n=[[-.5,0],[-.25,.65],[0,1],[.25,.65],[.5,0]],r=0;e.forEach((t,i)=>{let a=e[Math.min(e.length-1,i+1)],o=e[Math.max(0,i-1)],s=a.x-o.x,c=a.z-o.z,l=Math.hypot(s,c)||1;s/=l,c/=l,i&&(r+=Math.hypot(t.x-e[i-1].x,t.z-e[i-1].z));for(let[e,i]of n){let n=t.x-c*e*t.w,a=t.z+s*e*t.w,[o,l]=k(n,a);j.push(n,v+O(o,l)+1.6+i*.8,a),M.push(e*t.w,r),N.push(i,1-.75*t.t**1.3),P.push(.05)}});for(let r=0;r<e.length-1;r++)for(let e=0;e<n.length-1;e++){let i=t+r*n.length+e,a=i+n.length;ee.push(i,i+1,a,a,i+1,a+1)}}let F=v+t.H-t.DEPTH+7,te=t.RC*.66;{let e=j.length/3;for(let e=0;e<=6;e++)for(let t=0;t<48;t++){let n=t/48*Math.PI*2,r=e/6*te,i=d+Math.cos(n)*r,a=f+Math.sin(n)*r;j.push(i,F,a),M.push(i-d,a-f),N.push(1-.5*(e/6)**2,1),P.push(.02)}for(let t=0;t<6;t++)for(let n=0;n<48;n++){let r=e+t*48+n,i=e+t*48+(n+1)%48,a=r+48,o=i+48;ee.push(r,a,i,i,a,o)}}let I=new Y;I.setAttribute(`position`,new J(j,3)),I.setAttribute(`uv`,new J(M,2)),I.setAttribute(`lava`,new J(N,2)),I.setAttribute(`flow`,new J(P,1)),I.setIndex(ee);let ne=new or(I,fm(r,{cell:7,fogK:.42,fogBase:v+40,gain:1.15,polygonOffset:2}));ne.frustumCulled=!1;let re=new Float32Array(x*3),ie=new Float32Array(x),L=[1,1,1],R=A.flatMap(e=>e.map(e=>e));for(let e=0;e<x;e++){let n=S[e*3],r=S[e*3+1],i=S[e*3+2],o=D.getY(e),s=Cm(t,Math.floor(e/321)),c=w[e],l=Z(n/70,i/70,3)-.5,u=Z(n/260,i/260,4)-.5,d=Z(n/140,i/140,5)-.5,f=1+l*.3+u*.36;L[0]=f*(1+d*.1),L[1]=f,L[2]=f*(1-d*.14),a(n,r,i,o,L);let p=(1+Q(.35,.9,Math.max(0,c/t.H))*Q(.55,.85,o)*(.5+Z(n/50,i/50,65))*.45)*.8;if(L[0]*=p,L[1]*=p,L[2]*=p*1.02,s<t.RC*1.4&&s>t.RC*.6){let e=Q(.55,.8,Z(n/22,i/22,66))*(1-Q(t.RC*1.05,t.RC*1.4,s));L[0]*=1+e*1.6,L[1]*=1+e*1.25,L[2]*=1-e*.3}let m=s<t.RC?Q(F+70,F,r)*.9:0;if(Math.abs(k(n,i)[1])<1.4){let e=1e9,t=0;for(let r=0;r<R.length;r+=2){let a=R[r],o=Math.hypot(a.x-n,a.z-i)-a.w*.5;o<e&&(e=o,t=1-a.t*.75)}if(e<40){let n=Math.exp(-Math.max(0,e)/14);m=Math.max(m,n*t*.45),L[0]*=1-n*.35,L[1]*=1-n*.45,L[2]*=1-n*.5}}ie[e]=m,re.set(L,e*3)}E.setAttribute(`color`,new Cn(re,3)),E.setAttribute(`glow`,new Cn(ie,1));let z=new or(E,_m(new Ca({map:o,vertexColors:!0,roughness:1,metalness:0}),{glowGain:2.2,fogK:.42,fogBase:v+40}));z.receiveShadow=!1;let B=new U(d,v+t.H-t.DEPTH*.4,f),ae=pm(r,n,B,new U(h,.05,g).multiplyScalar(-1).add(new U(-p,0,-m).multiplyScalar(.35)),c,{count:80,rise:760,drift:1500,fogK:.42,fogBase:v+40}),oe=mm(r,B.clone().setY(F+t.DEPTH*.95),t.RC*3.2,{strength:1.3,fogK:.42,fogBase:v+40}),se=new Uint16Array(x);for(let e=0;e<x;e++)se[e]=yn.toHalfFloat(w[e]);let ce=new lr(se,321,121,_,u);return ce.minFilter=ce.magFilter=i,ce.needsUpdate=!0,{objects:[z,ne,ae,oe,hm(r,new U(d,F,f),{cx:d,cz:f,fx:p,fz:m,baseY:v,heights:ce,rMax:t.RB*xm,rings:ym,ringPow:1.25},{density:l,fogK:.42,fogBase:v+40})],textures:[ce],crater:B,lakeY:F}}var Tm=`
#ifdef USE_FOG
  uniform vec3 fogColor; uniform float fogDensity; varying float vFogDepth; varying float vFogH;
#endif
uniform float uFogK; uniform float uFogBase;
float fogAmount() {
#ifdef USE_FOG
  float k = uFogK + (1.0 - uFogK) * (1.0 - smoothstep(0.0, 140.0, vFogH - uFogBase));
  return 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth * k);
#else
  return 0.0;
#endif
}`,Em=`#ifdef USE_FOG
 varying float vFogDepth; varying float vFogH;
#endif
`,Dm=(e,t)=>`#ifdef USE_FOG\n vFogDepth = -(${e}).z; vFogH = (${t}).y;\n#endif\n`,Om=`
float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
}`,km=(e,t)=>({...va.clone(X.fog),uFogK:{value:e},uFogBase:{value:t}});function Am(e,t,n=1,r=sd(4243)){let i=e.strands[0],a=new U,o=[],s=(n,i)=>e.clearance(n,i,40)<40||t(n,i,20)||o.some(e=>Math.hypot(e.x-n,e.z-i)<45)?!1:(o.push({x:n,z:i,period:5+r()*5,phase:r(),power:.75+r()*.4,angle:r()*Math.PI}),!0),c=0;for(let[e,t]of[[-45,-70],[55,-100],[-75,-140],[25,-175],[85,-210],[-20,-250]])if(Ku(i,e,t,a),s(a.x,a.z)&&++c===2)break;let l=i.sMax-i.sMin+(i.closed?0:200),u=Ju(Math.max(3,Math.round(7*n)),e);for(let e=0,t=0;e<u*30&&t<u;e++){let e=i.sMin-(i.closed?0:100)+r()*l,n=r()<.5?-1:1,o=40+260*r()**1.4;n>0&&Math.abs(e)<150&&o<130||(Ku(i,e,n*o,a),s(a.x,a.z)&&t++)}return o}var jm={H:315,RB:1150,RC:135};function Mm(e){if(e>jm.RB)return 0;let t=Math.max(0,(e-jm.RC)/(jm.RB-jm.RC));return jm.H*1.105*1.08*(1-t)**2.05+35}function Nm(e,t,n=3,r=sd(5821)){let{ax:i,az:a,fx:o,fz:s}=e,c=-s,l=o,u=(e,t)=>[i-o*e+c*t,a-s*e+l*t];return[{c:u(540,-60),R:200,alt:48,w:.08,span:30},{c:[e.cx,e.cz],R:620,alt:215,w:-.028,span:50},{c:u(1200,320),R:300,alt:110,w:-.05,span:34}].slice(0,n).map(({c:[n,i],R:a,alt:o,w:s,span:c})=>{let l=-1/0;for(let r=0;r<128;r++){let o=r/128*Math.PI*2,s=n+Math.cos(o)*a,c=i+Math.sin(o)*a;l=Math.max(l,t(s,c),hu+Mm(Math.hypot(s-e.cx,c-e.cz)))}return{x:n,y:Math.max(hu+o,l+35+9),z:i,R:a,w:s,phase:r()*Math.PI*2,span:c}})}function Pm({group:e,keep:t,density:n,track:r,groundY:i,time:a,plan:o,pools:s,nearLava:c,sunDir:l}){let u=Im(a,Nm(o,i,n<.8?2:3));u.userData.noCull=!0,e.add(t(u));let d=Am(r,c,n);for(let e of d)e.y=i(e.x,e.z);d.length&&(e.add(t(zm(d,i))),e.add(t(Hm(a,d,l))));let f=[],p=sd(6607);for(let[e,t,r,i]of s){let a=Math.max(1,Math.round((1+i/9)*n));for(let n=0;n<a;n++)f.push({x:e,y:t,z:r,rad:i,period:3.2+p()*2.6,phase:p(),size:.55+Math.min(1,i/20)*.6,seed:p()})}f.length&&(e.add(t(Gm(a,f))),e.add(t(qm(a,f,p))))}function Fm(){let e=[],t=[],n=(n,r,i,a)=>{e.push(...n,...r,...i),t.push(a,a,a)},r=[[-.17,.004,.004,0],[-.09,.016,.02,0],[-.02,.03,.036,0],[.06,.028,.032,.004],[.1,.013,.013,.012],[.16,.012,.012,.03],[.19,.022,.016,.04],[.22,.012,.009,.038],[.4,.002,.002,.028]],i=([e,t,n,r])=>[[0,r+t,e],[n,r,e],[0,r-t,e],[-n,r,e]];for(let e=0;e<r.length-1;e++){let t=i(r[e]),a=i(r[e+1]);for(let e=0;e<4;e++){let r=(e+1)%4;n(t[e],a[e],a[r],0),n(t[e],a[r],t[r],0)}}n([0,.058,.215],[0,.05,.17],[0,.11,.05],0),n([.015,-.02,-.06],[.02,-.03,-.13],[.01,-.015,-.08],0),n([-.015,-.02,-.06],[-.02,-.03,-.13],[-.01,-.015,-.08],0);let a=[.03,.005,.05],o=[.12,.01,.085],s=[.23,.01,.075],c=[.36,0,.035],l=[.5,-.005,-.05],u=[.33,0,-.02],d=[.18,0,-.05],f=[.035,0,-.065];for(let e of[1,-1]){let t=t=>[t[0]*e,t[1],t[2]];for(let[e,r,i]of[[a,s,d],[a,d,f],[s,c,u],[s,u,d],[c,l,u],[a,o,s]])n(t(e),t(r),t(i),1)}let p=new po;return p.setAttribute(`position`,new J(e,3)),p.setAttribute(`aPart`,new J(t,1)),p}function Im(e,t){let n=Fm(),r=new Float32Array(t.length*4),i=new Float32Array(t.length*4);t.forEach((e,t)=>{r.set([e.x,e.y,e.z,e.R],t*4),i.set([e.w,e.phase,e.span,(t+1)*.377],t*4)}),n.setAttribute(`aPath`,new ur(r,4)),n.setAttribute(`aFly`,new ur(i,4)),n.instanceCount=t.length;let a=new or(n,new xa({fog:!0,side:2,uniforms:{...km(.35,hu+40),uTime:e,uBody:{value:new q(.016,.012,.011)},uWing:{value:new q(.034,.016,.011)}},vertexShader:`
      attribute vec4 aPath;   // circle centre xyz, radius
      attribute vec4 aFly;    // rad/s (signed), start angle, wingspan, seed
      attribute float aPart;
      uniform float uTime;
      varying float vPart;
      ${Em}
      vec2 rot(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }
      void main() {
        float seed = aFly.w;
        // a few slow wingbeats every 8-12 s, long glides between
        float period = 8.0 + 4.0 * fract(seed * 7.13);
        float cyc = mod(uTime + seed * 31.0, period);
        float g = smoothstep(0.0, 0.5, cyc) * (1.0 - smoothstep(2.4, 3.2, cyc));
        float beat = sin(cyc * 6.6);
        float a1 = mix(0.08 + 0.04 * sin(uTime * 0.7 + seed * 5.0), 0.62 * beat, g);
        float a2 = mix(-0.15, 0.5 * sin(cyc * 6.6 - 0.9) - 0.12, g);
        vec3 p = position;
        if (aPart > 0.5) {   // shoulder at x = 0.03, wrist at 0.23: the outer wing bends on from the inner
          float ax = abs(p.x), sg = sign(p.x);
          vec2 q = ax <= 0.231 ? vec2(0.03, 0.0) + rot(vec2(ax - 0.03, p.y), a1)
                               : vec2(0.03, 0.0) + rot(vec2(0.2, 0.0), a1) + rot(vec2(ax - 0.23, p.y), a1 + a2);
          p.x = sg * q.x; p.y = q.y;
        }
        p.y -= 0.04 * beat * g;                       // the body heaves against the wings
        float th = aFly.y + uTime * aFly.x;
        vec3 out1 = vec3(cos(th), 0.0, sin(th));
        vec3 f = normalize(vec3(-sin(th), 0.0, cos(th)) * sign(aFly.x));
        vec3 X = normalize(cross(vec3(0.0, 1.0, 0.0), f));
        p.xy = rot(p.xy, sign(dot(out1, X)) * 0.3); // banked into the turn: the inside wing low
        p.yz = rot(p.yz, -0.06 + 0.1 * g);           // nose up a touch while beating
        p *= aFly.z;
        vec3 c = aPath.xyz + out1 * aPath.w + vec3(0.0, ${9 .toFixed(1)} * sin(th * 2.0 + seed * 9.0), 0.0);
        vec4 wp = vec4(c + X * p.x + vec3(0.0, p.y, 0.0) + f * p.z, 1.0);
        vec4 mv = viewMatrix * wp;
        gl_Position = projectionMatrix * mv;
        vPart = aPart;
        ${Dm(`mv`,`wp`)}
      }`,fragmentShader:`
      uniform vec3 uBody, uWing;
      varying float vPart;
      ${Tm}
      void main() {
        vec3 col = mix(uBody, uWing, vPart);
        #ifdef USE_FOG
          col = mix(col, fogColor, fogAmount());
        #endif
        gl_FragColor = vec4(col, 1.0);
      }`}));return a.frustumCulled=!1,a}var Lm=null;function Rm(){if(Lm)return Lm;let e=sd(77),t=()=>{let e=document.createElement(`canvas`);return e.width=256,e.height=128,e},n=t(),r=t(),i=n.getContext(`2d`),a=r.getContext(`2d`),o=(t,n,r,i,a,o)=>{let s=[];for(let c=0;c<=a;c++){let l=c/a;s.push([t+(r-t)*l+(e()-.5)*o*.4,n+(i-n)*l+(e()-.5)*o*Math.sin(l*Math.PI)])}return s},s=[o(26,64,230,66,14,26),o(110,62,150,22,5,14),o(160,66,196,108,5,12)],c=(e,t,n,r,i=0)=>{e.save(),e.filter=i?`blur(${i}px)`:`none`,e.strokeStyle=r,e.lineWidth=n,e.lineCap=`round`,e.lineJoin=`round`,e.beginPath(),t.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.stroke(),e.restore()};return s.forEach((e,t)=>c(i,e,t?16:30,`rgba(196,190,170,0.7)`,8)),s.forEach((e,t)=>c(i,e,t?7:13,`rgba(214,190,100,0.85)`,3)),s.forEach((e,t)=>c(i,e,t?3:6,`rgba(12,9,8,1)`)),s.forEach((e,t)=>c(a,e,t?1.2:2.5,`rgb(255,120,40)`)),a.fillStyle=`#000`,a.globalCompositeOperation=`destination-over`,a.fillRect(0,0,256,128),Lm={map:new jr(n),emissive:new jr(r)},Lm.map.colorSpace=Lm.emissive.colorSpace=k,Lm}function zm(e,t){let n=[],r=[],i=[];for(let a of e){let e=n.length/3,o=Math.cos(a.angle),s=Math.sin(a.angle);for(let e=0;e<=3;e++)for(let i=0;i<=6;i++){let c=i/6,l=e/3,u=(c-.5)*8,d=(l-.5)*4,f=a.x+o*u-s*d,p=a.z+s*u+o*d;n.push(f,t(f,p)+.05,p),r.push(c,l)}for(let t=0;t<3;t++)for(let n=0;n<6;n++){let r=e+t*7+n,a=r+6+1;i.push(r,a,r+1,r+1,a,a+1)}}let a=new Y;a.setAttribute(`position`,new J(n,3)),a.setAttribute(`uv`,new J(r,2)),a.setIndex(i),a.computeVertexNormals();let{map:o,emissive:s}=Rm(),c=new or(a,new Ca({map:o,emissiveMap:s,emissive:16734746,emissiveIntensity:2.2,roughness:.95,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4}));return c.receiveShadow=!0,c}var Bm=28,Vm=4.5;function Hm(e,t,n){let r=new po;r.setAttribute(`position`,new J([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3)),r.setIndex([0,1,2,0,2,3]);let i=t.length*Bm,a=new Float32Array(i*4),o=new Float32Array(i*4);t.forEach((e,t)=>{for(let n=0;n<Bm;n++){let r=t*Bm+n;a.set([e.x,e.y,e.z,e.power],r*4),o.set([e.period,e.phase,n/Bm,r*.6180339%1],r*4)}}),r.setAttribute(`aBase`,new ur(a,4)),r.setAttribute(`aRhy`,new ur(o,4)),r.instanceCount=i;let s=new or(r,new xa({fog:!0,transparent:!0,depthWrite:!1,uniforms:{...km(1,0),uTime:e,uSun:{value:n.clone().normalize()}},vertexShader:`
      attribute vec4 aBase;   // vent xyz, power
      attribute vec4 aRhy;    // vent period (s), vent phase, this puff's slot 0..1, seed
      uniform float uTime;
      varying vec2 vUv; varying float vA; varying float vSeed; varying float vAge;
      ${Em}
      void main() {
        const float L = ${Vm.toFixed(1)};
        float life = fract(uTime / L + aRhy.z);
        float age = life * L;
        // how hard the vent was blowing when this puff left it: a burst hisses up a column, dies
        // down to a wisp, then the next burst
        float c = fract((uTime - age) / aRhy.x + aRhy.y);
        float burst = smoothstep(0.0, 0.05, c) * (1.0 - smoothstep(0.28, 0.48, c));
        float s = max(burst, 0.1) * aBase.w;
        float v0 = 1.5 + 6.5 * burst;
        float h = v0 * 1.5 * (1.0 - exp(-age / 1.5)) + 1.6 * age;          // shot out, slowing, then drifting up
        float sd = aRhy.w * 6.283;
        vec3 jit = vec3(sin(sd), 0.0, cos(sd)) * (0.2 + 0.45 * age);
        vec3 cpos = aBase.xyz + vec3(0.0, 0.1 + h, 0.0) + jit + vec3(0.8, 0.0, 0.35) * age * age * 0.22;   // the breeze takes it
        float size = (1.6 + 1.7 * age) * (0.55 + 0.45 * s / aBase.w) * (0.85 + 0.3 * fract(aRhy.w * 7.0));
        vec4 mv = viewMatrix * vec4(cpos, 1.0);
        float a = sd + uTime * 0.2 * (fract(aRhy.w * 3.0) - 0.5);
        mv.xy += mat2(cos(a), sin(a), -sin(a), cos(a)) * position.xy * size;
        gl_Position = projectionMatrix * mv;
        vUv = position.xy; vSeed = aRhy.w; vAge = life;
        vA = s * smoothstep(0.0, 0.012, life) * (1.0 - smoothstep(0.3, 1.0, life));
        vec4 wp = vec4(cpos, 1.0);
        ${Dm(`mv`,`wp`)}
      }`,fragmentShader:`
      uniform float uTime; uniform vec3 uSun;
      varying vec2 vUv; varying float vA; varying float vSeed; varying float vAge;
      ${Tm}
      ${Om}
      void main() {
        vec2 p = vUv * 3.0 + vSeed * 40.0;
        float n = vn(p + uTime * 0.4) * 0.65 + vn(p * 2.3 - uTime * 0.3) * 0.35;
        float d = length(vUv) * 2.0 + (n - 0.5) * 0.8;
        float a = (1.0 - smoothstep(0.25, 1.0, d)) * vA * 0.75;
        if (a < 0.004) discard;
        float up = vUv.y + (n - 0.5) * 0.4;
        vec3 col = vec3(0.34, 0.32, 0.31) * (0.75 + 0.45 * n) + vec3(0.16, 0.1, 0.07) * smoothstep(-0.3, 0.5, up) * clamp(uSun.y * 2.5, 0.3, 1.0);
        col *= 1.0 - 0.25 * vAge;   // thinning out greyer
        #ifdef USE_FOG
          col = mix(col, fogColor, fogAmount());
        #endif
        gl_FragColor = vec4(col, a);
      }`}));return s.frustumCulled=!1,s.renderOrder=2,s}var Um=`
const float POP = 0.62;   // of the cycle: swelling before, the splash after
attribute vec4 aPool;     // pool centre x, lava level, z, radius
attribute vec4 aSlot;     // period (s), phase, size (m), seed
uniform float uTime;
float hb(float k, float s) { return fract(sin(k * 12.9898 + s * 78.233) * 43758.5453); }
// this cycle's bubble: centre (xyz) and full radius (w); ph = progress 0..1 through the cycle
vec4 bubble(out float ph) {
  float cyc = uTime / aSlot.x + aSlot.y;
  float k = floor(cyc); ph = fract(cyc);
  float ang = hb(k, aSlot.w) * 6.283, rr = sqrt(hb(k + 0.5, aSlot.w)) * aPool.w * 0.5;
  return vec4(aPool.x + cos(ang) * rr, aPool.y, aPool.z + sin(ang) * rr, aSlot.z * (0.65 + 0.7 * hb(k + 0.25, aSlot.w)));
}`;function Wm(e,t=1){let n=new Float32Array(e.length*t*4),r=new Float32Array(e.length*t*4);return e.forEach((e,i)=>{for(let a=0;a<t;a++)n.set([e.x,e.y,e.z,e.rad],(i*t+a)*4),r.set([e.period,e.phase,e.size,e.seed],(i*t+a)*4)}),[n,r]}function Gm(e,t){let n=new ua(1,14,6,0,Math.PI*2,0,Math.PI/2),r=new po;r.setIndex(n.index),r.setAttribute(`position`,n.attributes.position),n.deleteAttribute(`normal`),n.deleteAttribute(`uv`);let[i,a]=Wm(t);r.setAttribute(`aPool`,new ur(i,4)),r.setAttribute(`aSlot`,new ur(a,4)),r.instanceCount=t.length;let o=new xa({fog:!0,uniforms:{...km(1,0),uTime:e},vertexShader:`
      ${Um}
      varying vec3 vDir; varying float vGrow; varying float vSeed;
      ${Em}
      void main() {
        float ph; vec4 b = bubble(ph);
        float grow = smoothstep(0.0, POP, ph);
        float r = b.w * pow(grow, 0.8) * step(ph, POP);
        r *= 1.0 + 0.06 * sin(uTime * 7.0 + position.x * 5.0 + position.z * 4.0) * grow;   // the skin trembles
        vec3 p = position * vec3(r, r * (0.25 + 0.75 * grow), r);                           // a blister rising into a dome
        vec4 wp = vec4(b.xyz + p - vec3(0.0, 0.08 * b.w, 0.0), 1.0);
        vec4 mv = viewMatrix * wp;
        gl_Position = projectionMatrix * mv;
        vDir = position; vGrow = grow; vSeed = aSlot.w + floor(uTime / aSlot.x + aSlot.y) * 0.37;
        ${Dm(`mv`,`wp`)}
      }`,fragmentShader:`
      varying vec3 vDir; varying float vGrow; varying float vSeed;
      ${Tm}
      ${Om}
      vec2 cells(vec2 p) {
        vec2 i = floor(p), f = fract(p); float d1 = 8.0, d2 = 8.0;
        for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
          vec2 g = vec2(float(x), float(y));
          vec2 r = g + vec2(h21(i + g), h21(i + g + 19.7)) - f;
          float d = dot(r, r);
          if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d;
        }
        return sqrt(vec2(d1, d2));
      }
      void main() {
        // a skin of dark crust plates (they ride the dome, so they stretch as it swells) split by
        // glowing cracks that widen; a molten seam where it meets the pool; the thin top glows
        // hottest just before it bursts
        vec2 c = cells(vDir.xz * 3.2 + vSeed * 13.0);
        float top = vDir.y;
        float w = 0.05 + 0.22 * vGrow * vGrow;
        float crack = 1.0 - smoothstep(w * 0.4, w, c.y - c.x);
        float seam = 1.0 - smoothstep(0.0, 0.22, top);
        float thin = smoothstep(0.55, 1.0, top) * smoothstep(0.6, 1.0, vGrow);
        float hot = clamp(max(max(crack, seam), thin), 0.0, 1.0);
        float n = vn(vDir.xz * 7.0 + vSeed * 5.0);
        vec3 glow = mix(vec3(0.7, 0.07, 0.01), vec3(1.0, 0.32, 0.04), hot);
        float I = (1.2 + 2.6 * hot + 3.2 * thin) * (0.85 + 0.3 * n);
        vec3 crust = vec3(0.03, 0.026, 0.024) * (0.6 + 0.8 * n) + vec3(0.14, 0.02, 0.003) * vGrow * vGrow;
        vec3 col = mix(crust, glow * I, hot);
        #ifdef USE_FOG
          col = mix(col, fogColor, fogAmount());
        #endif
        gl_FragColor = vec4(col, 1.0);
      }`});n.dispose();let s=new or(r,o);return s.frustumCulled=!1,s}var Km=12;function qm(e,t,n){let r=new Y,i=t.length*Km,[a,o]=Wm(t,Km),s=new Float32Array(i*4);for(let e=0;e<i;e++)s.set([n()*Math.PI*2,n(),n(),n()],e*4);r.setAttribute(`position`,new Cn(new Float32Array(i*3),3)),r.setAttribute(`aPool`,new Cn(a,4)),r.setAttribute(`aSlot`,new Cn(o,4)),r.setAttribute(`aDrop`,new Cn(s,4));let c=new xa({fog:!0,transparent:!0,depthWrite:!1,blending:2,uniforms:{...km(1,0),uTime:e,uPx:{value:400}},vertexShader:`
      ${Um}
      attribute vec4 aDrop;   // direction angle, speed, lift, size
      uniform float uPx;
      varying float vA; varying float vHeat;
      ${Em}
      void main() {
        float ph; vec4 b = bubble(ph);
        float td = (ph - POP) * aSlot.x;            // seconds since the pop
        float R = b.w, sq = sqrt(R);
        float vh = (0.8 + 2.2 * aDrop.y) * sq, vy = (2.6 + 2.8 * aDrop.z) * sq;
        vec3 dir = vec3(cos(aDrop.x), 0.0, sin(aDrop.x));
        float y = R * 0.45 + vy * td - 4.9 * td * td;
        vec4 wp = vec4(b.xyz + dir * (R * 0.6 + vh * td) + vec3(0.0, y, 0.0), 1.0);
        vec4 mv = viewMatrix * wp;
        gl_Position = projectionMatrix * mv;
        vA = step(0.0, td) * step(-0.05, y);       // from the pop until it falls back in
        vHeat = 1.0 - clamp(td * 0.8, 0.0, 1.0);
        gl_PointSize = vA * clamp((0.14 + 0.2 * aDrop.w) * sq * uPx / max(1.0, -mv.z), 1.5, 9.0);
        ${Dm(`mv`,`wp`)}
      }`,fragmentShader:`
      varying float vA; varying float vHeat;
      ${Tm}
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float g = pow(max(0.0, 1.0 - d), 1.4) * vA;
        if (g < 0.01) discard;
        vec3 col = mix(vec3(1.0, 0.25, 0.03), vec3(1.0, 0.62, 0.2), vHeat) * (2.5 + 6.0 * vHeat) * g * (1.0 - fogAmount());
        gl_FragColor = vec4(col, 1.0);
      }`}),l=new Or(r,c);l.frustumCulled=!1,l.renderOrder=3;let u=new Ze;return l.onBeforeRender=(e,t,n)=>{e.getCurrentViewport(u),c.uniforms.uPx.value=u.w/(2*Math.tan(Ne.degToRad(n.fov??40)/2))},l}var Jm={H:315,RB:1150,RC:135,DEPTH:75},Ym=2300,Xm=new WeakMap;function Zm(e){let t=Xm.get(e);if(t)return t;let n=e.strands[0],r=Pu(n,0,0,0),i=Pu(n,0,1,0),a=i.x-r.x,o=i.z-r.z,s=Math.hypot(a,o)||1;a/=s,o/=s;let c=Ym,l=0,u=0;for(let t=0;t<40&&(l=r.x-a*c,u=r.z-o*c,!($u(e,l,u)>Jm.RB*1.06+200));t++,c+=50);let d=$m(e,n);return t={cx:l,cz:u,fx:a,fz:o,ax:r.x,az:r.z,...d},Xm.set(e,t),t}function Qm(e){let t=new Map;for(let n of e.strands)for(let e=n.sMin;e<=n.sMax;e+=3){let[r,,i]=n.point(e),a=`${Math.floor(r/60)},${Math.floor(i/60)}`;t.has(a)||t.set(a,[]),t.get(a).push(r,i)}return(e,n)=>{let r=Math.floor(e/60),i=Math.floor(n/60),a=120;for(let o=-2;o<=2;o++)for(let s=-2;s<=2;s++){let c=t.get(`${r+o},${i+s}`);if(c)for(let t=0;t<c.length;t+=2)a=Math.min(a,Math.hypot(c[t]-e,c[t+1]-n))}return a}}function $m(e,t){let n=sd(907),r=[],i=[],a=new U,o=(e,t)=>e>=-150&&e<=150&&t>0&&t<130,s=Qm(e),c=(e,t,n)=>s(e,t)>=30+n,l=(e,t,n)=>!c(e,t,n*1.25)||r.some(r=>Math.hypot(r.x-e,r.z-t)<r.rad+n+12)?!1:(r.push({x:e,z:t,rad:n}),!0),u=(e,r,s,u,d,f)=>{let p=n()*6.3,m=n()*6.3,h=[],g=Math.ceil(f/5);for(let n=0;n<=g;n++){let i=n/g,l=i*i*(3-2*i),_=e+r*f*.75*i+14*Math.sin(i*5+p),v=u+(d-u)*l+16*Math.sin(i*8.5+m)*(1-.6*i),y=4+6*i+2*Z(i*6,p,81);if(Ku(t,_,s*v,a),!c(a.x,a.z,y/2+2)||s>0&&o(_,v))break;h.push({x:a.x,z:a.z,w:y,t:i})}if(h.length<12)return;let _=h[h.length-1];(l(_.x,_.z,_.w*1.4+6)||h.length>30)&&i.push(h)};u(-260,1,-1,330,78,330),Ku(t,0,-90,a);let d=a.x,f=a.z;if(!r.some(e=>Math.hypot(e.x-d,e.z-f)<130)){for(let[e,n]of[[-30,-80],[-30,-110],[-60,-65],[30,-95]])if(Ku(t,e,n,a),l(a.x,a.z,17))break}let p=t.sMax-t.sMin;for(let r=0,i=Ju(3,e);r<i;r++){let e=r%2?1:-1;u(t.sMin+p*(.15+.7*n()),n()<.5?1:-1,e,280+n()*60,55+n()*70,260+n()*160)}let m=t.sMax-t.sMin+(t.closed?0:200);for(let r=0,i=0,s=Ju(60,e),c=Ju(9,e);r<s&&i<c;r++){let e=t.sMin-(t.closed?0:100)+n()*m,r=n()<.5?-1:1,s=50+190*n()**1.3,c=7+n()*16;r>0&&o(e,s)||(Ku(t,e,r*s,a),l(a.x,a.z,c)&&i++)}return{pools:r,rivers:i,boxes:i.map(e=>e.reduce((e,t)=>[Math.min(e[0],t.x),Math.max(e[1],t.x),Math.min(e[2],t.z),Math.max(e[3],t.z)],[1e9,-1e9,1e9,-1e9]))}}function eh(e,t,n,r=60){let i=r;for(let r of e.pools)i=Math.min(i,Math.hypot(r.x-t,r.z-n)-r.rad);return e.rivers.forEach((a,o)=>{let s=e.boxes[o];if(!(t<s[0]-r||t>s[1]+r||n<s[2]-r||n>s[3]+r))for(let e of a)i=Math.min(i,Math.hypot(e.x-t,e.z-n)-e.w/2)}),i}var th=null;function nh(){if(th)return th;let t=1024,n=document.createElement(`canvas`);n.width=n.height=t;let r=n.getContext(`2d`),i=r.createImageData(t,t),a=sd(57),o=(e,n,r)=>{let i=sd(e),a=new Float32Array(t*t),o=1,s=0;for(let e=0;e<n;e++){let n=r<<e,c=Array.from({length:n*n},()=>i());for(let e=0;e<t;e++){let r=e/t*n,i=Math.floor(r),s=r-i,l=s*s*(3-2*s),u=(i+1)%n;for(let r=0;r<t;r++){let s=r/t*n,d=Math.floor(s),f=s-d,p=f*f*(3-2*f),m=(d+1)%n,h=(c[i*n+d]*(1-p)+c[i*n+m]*p)*(1-l)+(c[u*n+d]*(1-p)+c[u*n+m]*p)*l;a[e*t+r]+=h*o}}s+=o,o*=.5}for(let e=0;e<a.length;e++)a[e]/=s;return a},s=o(5,6,8),c=o(9,3,8),l=o(13,4,4),u=o(17,3,8),d=[],f=[];for(let e=0;e<484;e++)d.push([a(),a()]),f.push(.9+a()*.2);for(let e=0;e<t;e++)for(let n=0;n<t;n++){let r=e*t+n,o=n/t*22+(l[r]-.5)*2.2,p=e/t*22+(l[(r+333*t+77)%(t*t)]-.5)*2.2,m=Math.floor(o),h=Math.floor(p),g=9,_=9,v=0;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){let n=m+t,r=h+e,i=(r%22+22)%22*22+(n%22+22)%22,a=n+d[i][0]-o,s=r+d[i][1]-p,c=a*a+s*s;c<g?(_=g,g=c,v=i):c<_&&(_=c)}let y=1-(1-Q(0,.045,Math.sqrt(_)-Math.sqrt(g)))*Q(.45,.75,u[r])*.6,b=s[r],x=24+46*b,S=22+41*b,C=21+38*b,w=Q(.6,.85,c[r]),T=Q(.38,.15,c[r]);x+=w*12,S+=w*4,C-=w*2,x+=T*14,S+=T*13,C+=T*13;let E=f[v]*y*(a()<.03?.6:1)*(a()<.008?1.5:1);i.data[r*4]=Math.min(255,x*E),i.data[r*4+1]=Math.min(255,S*E),i.data[r*4+2]=Math.min(255,C*E),i.data[r*4+3]=255}return r.putImageData(i,0,0),th=new jr(n),th.wrapS=th.wrapT=e,th.anisotropy=8,th.colorSpace=k,th}function rh(e,t,n,r){if(n<60)return 0;let i=Zm(r),a=Q(60,160,n)*((Z(e/95,t/95,11)-.5)*7+(Z(e/33,t/33,12)-.5)*1.6),o=Q(230,1e3,n),s=0;if(o>0){let n=e+(Z(e/700,t/700,31)-.5)*500,r=t+(Z(e/700,t/700,32)-.5)*500,a=1,c=1/620,l=0,u=0,d=1;for(let e=0;e<7;e++){let t=Z(n*c,r*c,20+e),i=(1-Math.abs(2*t-1))**2;l+=i*a*(.3+.7*d),u+=a,d=i,a*=.64,c*=2.13}s=o*(25+300*Q(.15,.85,Z(e/1300,t/1300,30)))*(l/u)**1.1;let f=i.cx-i.ax,p=i.cz-i.az,m=Math.hypot(f,p),h=e-i.ax,g=t-i.az,_=Math.hypot(h,g)||1,v=Q(.8,.95,(f*h+p*g)/(m*_)),y=Math.hypot(e-i.cx,t-i.cz);s*=(1-.93*v)*Q(Jm.RB*.6,Jm.RB*1.45,y)}let c=Math.hypot(e-i.cx,t-i.cz),l=34*Q(Jm.RB*2.1,Jm.RB*.85,c)*Q(60,300,n);return Gu(r,e,t,n,a+s+l)}function ih(e,t,n,r,i,a,o){let s=Zm(o),c=.62+.38*Q(.5,.93,r),l=t-hu;c*=1+.45*Q(90,260,l)*Q(.75,.95,r)*Z(e/60,n/60,74),i[0]*=c,i[1]*=c,i[2]*=c;let u=Q(.6,.85,Z(e/190,n/190,71));i[0]*=1+u*.45,i[1]*=1+u*.08,i[2]*=1-u*.12;let d=Q(.32,.12,Z(e/110,n/110,72))*(1-Q(140,300,l));if(i[0]*=1+d*.35,i[1]*=1+d*.35,i[2]*=1+d*.36,a<420){let t=eh(s,e,n,50);if(t<50){let e=Q(50,6,t),n=Q(10,0,t);i[0]*=(1+e*.5)*(1-n*.55),i[1]*=(1+e*.1)*(1-n*.6),i[2]*=(1-e*.1)*(1-n*.62)}}}var ah={exposure:.72,sunColor:16753768,sunIntensity:2.6,hemiSky:11571328,hemiGround:5910560,hemiIntensity:.8,fog:7228994,fogDensity:62e-5,sunDir:new U(-.76,.3,.58),bloom:.75,bloomThreshold:6,turbidity:9,rayleigh:1.6,mieCoefficient:.006,mieDirectionalG:.85,envIntensity:.16},oh={id:`volcano`,sky:ah,ground:{a:[40,36,34],b:[70,62,58]},groundTexture:nh,ballastDust:[.62,.57,.54],minimap:`#2e2624`,dust:[.24,.21,.2],lift:rh,groundColor:ih,build(e){sh(e)}};function sh({group:e,r:t,density:n,keep:r,track:i,clearView:a,updaters:o,groundY:s,groundUV:c}){let l=Zm(i),u={value:0};o.push(e=>{u.value+=e});let d=wm({P:l,V:Jm,r:t,time:u,groundTex:nh(),groundUV:c,sunDir:ah.sunDir,density:n,colorAt:(e,t,n,r,a)=>ih(e,t,n,r,a,$u(i,e,n),i)});for(let t of d.objects)t.userData.noCull=!0,e.add(r(t));for(let e of d.textures)r(e);let f=new H(l.cx-l.ax,l.cz-l.az).normalize();e.add(r(vm(u,f,ah.sunDir,ah.fog)));let p=ch(e,r,l,u,s),m=gm(u,p,t,{count:Math.floor(700*n),rise:12,size:.09});m&&e.add(r(m));let h=(e,t,n)=>eh(l,e,t,n+1)<n;lh(e,t,n,r,i,a,s,h),uh(e,t,n,r,i,s,h),fh(e,t,n,r,i,a,s,h),Pm({group:e,keep:r,density:n,track:i,groundY:s,time:u,plan:l,pools:p.slice(0,l.pools.length),nearLava:h,sunDir:ah.sunDir})}function ch(e,t,n,r,i){let a=[],o=[],s=[],c=[],l=[],u=[];for(let e of n.pools){let t=i(e.x,e.z);for(let n=0;n<24;n++){let r=n/12*6.283,a=e.rad*(n<12?.8:1.45);t=Math.min(t,i(e.x+Math.cos(r)*a,e.z+Math.sin(r)*a))}t+=.16;let n=a.length/3,r=e.x*.37+e.z*.11;for(let n=0;n<=7;n++)for(let i=0;i<44;i++){let l=i/44*6.283,u=1+.22*Math.sin(l*3+r)+.12*Math.sin(l*5+r*2)+.07*Math.sin(l*9+r*3),d=e.rad*u*(n/7),f=e.x+Math.cos(l)*d,p=e.z+Math.sin(l)*d,m=n/7;a.push(f,t+Q(.75,1,m)*.35,p),o.push(f-e.x,p-e.z),s.push(1-m*m,.85+.15*Math.sin(r)),c.push(.03)}for(let e=0;e<7;e++)for(let t=0;t<44;t++){let r=n+e*44+t,i=n+e*44+(t+1)%44;l.push(r,r+44,i,i,r+44,i+44)}u.push([e.x,t,e.z,e.rad])}let d=[[-.5,0],[-.28,.6],[0,1],[.28,.6],[.5,0]];for(let e of n.rivers){let t=a.length/3,n=0;e.forEach((t,r)=>{let l=e[Math.min(e.length-1,r+1)],f=e[Math.max(0,r-1)],p=l.x-f.x,m=l.z-f.z,h=Math.hypot(p,m)||1;p/=h,m/=h,r&&(n+=Math.hypot(t.x-e[r-1].x,t.z-e[r-1].z));for(let[e,r]of d){let l=t.x-m*e*t.w,u=t.z+p*e*t.w;a.push(l,i(l,u)+.22+(1-r)*.12,u),o.push(e*t.w,n),s.push(r,.95-.15*t.t),c.push(.55)}r%6==3&&u.push([t.x,i(t.x,t.z)+.2,t.z,t.w*.6])});for(let n=0;n<e.length-1;n++)for(let e=0;e<d.length-1;e++){let r=t+n*d.length+e,i=r+d.length;l.push(r,r+1,i,i,r+1,i+1)}}if(!l.length)return u;let f=new Y;f.setAttribute(`position`,new J(a,3)),f.setAttribute(`uv`,new J(o,2)),f.setAttribute(`lava`,new J(s,2)),f.setAttribute(`flow`,new J(c,1)),f.setIndex(l),f.computeBoundingSphere();let p=new or(f,fm(r,{cell:1.5,polygonOffset:1}));return e.add(t(p)),u}function lh(e,t,n,r,i,a,o,s){let c=[854794,2367518,4867394,3942946],l=Array.from({length:4},()=>od(t,c)),u=new Ca({vertexColors:!0,roughness:.94,metalness:0}),d=[16777215,15260884,13683912,12626072].map(e=>new q(e)),f=[];for(let[e,r]of qu(t,Ju(Math.floor(52*n),i),8,320,i,(e,t)=>!s(e,t,4))){let n=.7+t()**1.6*2.8;f.push([e,r,o(e,r),n]);let a=Math.floor(t()*4);for(let c=0;c<a;c++){let a=t()*6.3,c=n*(1.1+t()*1.4),l=e+Math.cos(a)*c,u=r+Math.sin(a)*c;i.clearance(l,u)<5||s(l,u,2)||f.push([l,u,o(l,u),n*(.18+t()*.35)])}}let p=new K,m=new Pe,h=new U,g=new U,_=new dt,v=l.map(()=>[]);f.forEach(e=>v[Math.floor(t()*l.length)].push(e)),l.forEach((n,i)=>{if(!v[i].length){n.dispose();return}let o=new vr(n,u,v[i].length);v[i].forEach(([e,n,r,i],a)=>{m.setFromEuler(_.set((t()-.5)*.3,t()*6.3,(t()-.5)*.3)),o.setMatrixAt(a,p.compose(g.set(e,r-i*.1,n),m,h.set(i,i*(.8+t()*.5),i))),o.setColorAt(a,d[Math.floor(t()*d.length)])}),o.castShadow=!0,o.receiveShadow=!0,e.add(r(o)),a.addInstanced(o)})}function uh(e,t,n,r,i,a,o){let s=new ia(1,0);s.deleteAttribute(`normal`),s.deleteAttribute(`uv`),s=nd(s);let c=s.attributes.position,l=new U,u=[];for(let e=0;e<c.count;e++){l.fromBufferAttribute(c,e),l.multiplyScalar(.75+t()*.5),c.setXYZ(e,l.x*1.2,Math.max(-.2,l.y*.6),l.z);let n=.012+t()*.02+Math.max(0,l.y)*.012;u.push(n*1.1,n,n*.95)}s.setAttribute(`color`,new J(u,3)),s.computeVertexNormals();let d=qu(t,Ju(Math.floor(2600*n),i),3.6,70,i,(e,t)=>!o(e,t,1.5)),f=new vr(s,new Ca({vertexColors:!0,roughness:.95,flatShading:!0}),d.length),p=new K,m=new Pe,h=new U,g=new U,_=new dt,v=new q,y=new q(1.5,.9,.7);d.forEach(([e,n],r)=>{let i=.08+t()**2.2*.45;m.setFromEuler(_.set(t()*6.3,t()*6.3,t()*6.3)),f.setMatrixAt(r,p.compose(g.set(e,a(e,n)-i*.15,n),m,h.set(i,i*(.6+t()*.5),i))),f.setColorAt(r,v.setRGB(1,1,1).multiplyScalar(.7+t()*.7).lerp(y,t()<.2?.5:0))}),f.receiveShadow=!0,e.add(r(f))}function dh(e){let t=6+e()*4,n=[];n.push(new Lr(.07,.3,t,8,8).translate(0,t/2,0));let r=3+Math.floor(e()*3);for(let i=0;i<r;i++){let r=1.2+e()*2.4,i=t*(.4+e()*.5),a=.5+e()*.6,o=e()*6.3,s=new Lr(.025,.09,r,5,2).translate(0,r/2,0);s.rotateZ(a),s.rotateY(o),s.translate(0,i,0),n.push(s)}let i=ed(n.map(e=>(e.deleteAttribute(`uv`),e)));n.forEach(e=>e.dispose());let a=i.attributes.position,o=[],s=e()*6.3,c=.15+e()*.25;for(let e=0;e<a.count;e++){let n=a.getX(e),r=a.getY(e),i=a.getZ(e),l=r/t;a.setX(e,n+Math.sin(l*2.2+s)*.35*l+c*l*l*1.5),a.setZ(e,i+Math.cos(l*1.7+s)*.25*l);let u=(.004+.005*l)*(.7+.6*Math.abs(Math.sin(n*31+r*7.7+i*23))),d=Math.sin(r*3.1+s)>.82?3:1;o.push(u*d*1.05,u*d,u*d*.95)}return i.setAttribute(`color`,new J(o,3)),i.computeVertexNormals(),i}function fh(e,t,n,r,i,a,o,s){let c=new Ca({vertexColors:!0,roughness:1}),l=qu(t,Ju(Math.floor(46*n),i),20,260,i,(e,t)=>!s(e,t,6)&&Z(e/120,t/120,91)>.42),u=new K,d=new Pe,f=new U,p=new U,m=new dt;for(let n=0;n<2;n++){let i=l.filter((e,t)=>t%2===n);if(!i.length)continue;let s=new vr(dh(t),c,i.length);i.forEach(([e,n],r)=>{let i=.7+t()*.6;d.setFromEuler(m.set((t()-.5)*.12,t()*6.3,(t()-.5)*.12)),s.setMatrixAt(r,u.compose(p.set(e,o(e,n)-.2,n),d,f.set(i,i,i)))}),s.castShadow=!0,s.receiveShadow=!0,e.add(r(s)),a.addInstanced(s)}}var ph=(e,t)=>{let n=e.attributes.position,r=new Float32Array(n.count*3);for(let e=0;e<n.count;e++){let i=t(n.getX(e),n.getY(e),n.getZ(e),e);r[e*3]=i[0],r[e*3+1]=i[1],r[e*3+2]=i[2]}return e.setAttribute(`color`,new Cn(r,3)),e};function mh(e,{blobs:t=2,height:n=1}={}){let r=[],i=new U;for(let a=0;a<t;a++){let o=new ia(.6+e()*.25,1);o.deleteAttribute(`normal`),o.deleteAttribute(`uv`),o=nd(o);let s=a/t*6.3+e(),c=a?.45+e()*.2:0,l=[e()*6,e()*6,e()*6],u=o.attributes.position;for(let t=0;t<u.count;t++)i.fromBufferAttribute(u,t),i.multiplyScalar(1+.18*Math.sin(i.x*6+l[0])*Math.sin(i.z*5+l[1])+.12*Math.sin(i.y*8+l[2])+(e()-.5)*.22),u.setXYZ(t,i.x+Math.cos(s)*c,Math.max(-.1,i.y*.8*n+.55*n-c*.25),i.z+Math.sin(s)*c);o.computeVertexNormals(),r.push(o)}let a=ed(r);return r.forEach(e=>e.dispose()),ph(a,(e,t,r,i)=>{let a=.5+.55*Math.min(1,t/(1.1*n))*(.85+.3*Math.sin(i*12.99)**2);return[a,a,a]})}function hh(e){let t=[],n=[];for(let r=0;r<16;r++){let r=e()*6.3,i=.15+e()*.45,a=.45+e()*.55,o=.035+e()*.02,s=e()*.12,c=Math.cos(r),l=Math.sin(r),u=-l*o,d=c*o,f=c*s,p=l*s,m=f+c*i*a,h=p+l*i*a;t.push(f-u,0,p-d,f+u,0,p+d,m,a,h);let g=.85+e()*.3;n.push(.07,.09,.03,.07,.09,.03,.42*g,.4*g,.17*g)}let r=new Y;r.setAttribute(`position`,new J(t,3)),r.setAttribute(`color`,new J(n,3)),r.computeVertexNormals();let i=r.attributes.normal;for(let e=0;e<i.count;e++){let t=i.getX(e)*.4,n=i.getZ(e)*.4,r=Math.hypot(t,1,n);i.setXYZ(e,t/r,1/r,n/r)}return r}function gh(e){let t=new ia(1,2);t.deleteAttribute(`normal`),t.deleteAttribute(`uv`),t=nd(t);let n=Array.from({length:6},(t,n)=>({d:new U(e()-.5,e()-.5,e()-.5).normalize(),f:1.8*(1+n*.9)+e(),a:.22/(1+n*.8),ph:e()*6.3})),r=Array.from({length:4+Math.floor(e()*3)},()=>({n:new U(e()-.5,(e()-.3)*.8,e()-.5).normalize(),d:.6+e()*.25})),i=t.attributes.position,a=new U,o=.55+e()*.3,s=1+e()*.4;for(let e=0;e<i.count;e++){a.fromBufferAttribute(i,e),a.multiplyScalar(1+n.reduce((e,t)=>e+t.a*Math.sin(a.dot(t.d)*t.f+t.ph),0));for(let e of r){let t=a.dot(e.n)-e.d;t>0&&a.addScaledVector(e.n,-t)}a.set(a.x*s,a.y*o,a.z),a.y<-.2&&(a.y=-.2+(a.y+.2)*.2),i.setXYZ(e,a.x,a.y,a.z)}t=rd(t,.9);let c=t.attributes.normal;return ph(t,(e,t,n,r)=>{let i=c.getY(r),a=Math.min(1,Math.max(0,(t+.2)/(o+.2))),s=.85+.3*Math.abs(Math.sin(e*7.1+n*5.3)*Math.sin(t*9.7-e*3.1)),l=(.05+.13*a+.06*Math.max(0,i))*s;return[l*1.05,l*.97,l*.88]})}var _h=null,vh=.8;function yh(){if(_h)return _h;let e=document.createElement(`canvas`);e.width=512,e.height=512;let t=e.getContext(`2d`),n=5,r=()=>(n=n*1664525+1013904223>>>0)/4294967296,i=399.36,a=i/2;for(let e=504;e>6;e-=4.2){let n=1-e/512,o=i*.5*Math.sin(Math.PI*Math.min(1,.08+n*.95))**.6*(.88+r()*.12);if(!(n<.07))for(let i of[-1,1]){let s=.42+r()*.12,c=a+i*o*Math.cos(s),l=e-o*Math.sin(s)*.9,u=r()<.05,d=.75+r()*.35,f=t.createLinearGradient(a,e,c,l);f.addColorStop(0,u?`#6b5a30`:`rgb(${46*d},${92*d},${30*d})`),f.addColorStop(1,u?`#8a7440`:`rgb(${110*d},${132*d},${52*d})`),t.strokeStyle=f,t.lineCap=`round`,t.lineWidth=5.5*(1-n*.4),t.beginPath(),t.moveTo(a,e),t.quadraticCurveTo(a+i*o*.55,e-o*.28,c,l),t.stroke()}}t.strokeStyle=`#7d8a3c`,t.lineWidth=7,t.beginPath(),t.moveTo(a,512),t.lineTo(a,4),t.stroke();let o=512*vh,s=102.39999999999998;t.fillStyle=`#8a7a66`,t.fillRect(o,0,s,512);for(let e=0;e<512;e+=1){let n=.85+.25*Math.sin(e*.7)*Math.sin(e*.13)+(r()-.5)*.1;t.fillStyle=`rgba(${130*n},${116*n},${98*n},0.6)`,t.fillRect(o,e,s,1)}for(let e=0;e<44;e++){let n=(e+.5)*(512/44)+(r()-.5)*2;t.fillStyle=`rgba(52,42,34,0.75)`,t.fillRect(o,n,s,2.2),t.fillStyle=`rgba(200,188,165,0.35)`,t.fillRect(o,n+2.2,s,1.4)}for(let e=0;e<400;e++)t.fillStyle=`rgba(40,32,26,${r()*.25})`,t.fillRect(o+r()*s,r()*512,2+r()*5,1);return _h=new jr(e),_h.colorSpace=k,_h.anisotropy=8,_h}function bh(e,{h:t=11,lean:n=.22,fronds:r=11,far:i=!1,rosette:a=!1}={}){let o=[],s=[],c=[],l=(e,t,n,r,i)=>(o.push(e,t,n),s.push(r,i),o.length/3-1),u=a?1:i?6:12,d=a?3:i?5:6,f=[],p=e=>n*t*e**1.7,m=e()*6.3;for(let e=0;e<=u;e++){let n=e/u;f.push(new U(p(n)+.12*Math.sin(n*5+m),t*n,.1*Math.sin(n*4+m*2)))}let h=new U,g=new U,_=new U,v=new U(0,0,1);for(let e=0;e<=u;e++){let t=e/u;h.subVectors(f[Math.min(u,e+1)],f[Math.max(0,e-1)]).normalize(),g.crossVectors(v,h).normalize(),_.crossVectors(h,g);let n=.2*(1-.3*t)+.2*Math.max(0,1-t/.07)**2+.035*Math.max(0,1-Math.abs(t-.97)/.05);for(let r=0;r<=d;r++){let i=r/d*Math.PI*2,a=Math.cos(i),o=Math.sin(i);l(f[e].x+(g.x*a+_.x*o)*n,f[e].y+(g.y*a+_.y*o)*n,f[e].z+(g.z*a+_.z*o)*n,.805+r/d*.18999999999999995,.01+t*.98)}}for(let e=0;e<u;e++)for(let t=0;t<d;t++){let n=e*(d+1)+t,r=n+d+1;c.push(n,n+1,r,r,n+1,r+1)}let y=f[u].clone(),b=i?3:5;for(let n=0;n<r;n++){let i=n/r*Math.PI*2+(e()-.5)*.5,s=n*.618%1,u=a?1.2-s*.7:.75-s*1.1+(e()-.5)*.2,d=a?.8+s*.8:.9+s*.9+e()*.3,f=(3.4+e()*1.3)*(t/11)**.35,p=.85+e()*.25,m=new U(Math.cos(i),0,Math.sin(i)),h=new U(-m.z,0,m.x),g=y.clone();for(let e=0;e<=b;e++){let t=e/b,n=u-d*t**1.4;e&&g.addScaledVector(m,f/b*Math.cos(n)).add(new U(0,f/b*Math.sin(n),0));let r=p*Math.sin(Math.PI*Math.min(1,.1+t*.92))**.6*(.5+.5*t**.3),i=.25*r,a=.02+t*.96;l(g.x-h.x*r,g.y+i,g.z-h.z*r,0,a),l(g.x,g.y,g.z,.39,a),l(g.x+h.x*r,g.y+i,g.z+h.z*r,.78,a)}let _=o.length/3-(b+1)*3;for(let e=0;e<b;e++)for(let t=0;t<2;t++){let n=_+e*3+t,r=n+3;c.push(n,r,n+1,r,r+1,n+1)}}let x=new ia(.16,0),S=x.attributes.position;for(let t=0,n=i?0:3+Math.floor(e()*2);t<n;t++){let t=e()*6.3,n=new U(y.x+Math.cos(t)*.28,y.y-.35-e()*.3,y.z+Math.sin(t)*.28),r=o.length/3;for(let e=0;e<S.count;e++)l(n.x+S.getX(e),n.y+S.getY(e),n.z+S.getZ(e),.9,.02);for(let e=0;e<S.count;e++)c.push(r+e)}x.dispose();let C=new Y;C.setAttribute(`position`,new J(o,3)),C.setAttribute(`uv`,new J(s,2)),C.setIndex(c),C.computeVertexNormals();let w=C.attributes.normal,T=(u+1)*(d+1);for(let e=T;e<w.count;e++){let t=w.getX(e),n=Math.abs(w.getY(e))+.6,r=w.getZ(e),i=Math.hypot(t,n,r);w.setXYZ(e,t/i,n/i,r/i)}return C}function xh(e){let t=new Ca({map:yh(),alphaTest:.45,side:2,roughness:.82,metalness:0});return t.onBeforeCompile=t=>{t.uniforms.uTime=e,t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uTime;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        #ifdef USE_INSTANCING
          float ph = instanceMatrix[3].x * 0.07 + instanceMatrix[3].z * 0.05;
        #else
          float ph = 0.0;
        #endif
        float sw = max(0.0, position.y - 5.0);
        transformed.x += sw * sw * 0.0016 * (sin(uTime * 1.1 + ph) + 0.4 * sin(uTime * 2.7 + ph * 1.7));
        transformed.z += sw * sw * 0.001 * sin(uTime * 0.9 + ph * 1.3);`)},t.customProgramCacheKey=()=>`coast-palm`,t}var Sh=6.5;function Ch(e){let t=e.strands[0],n=Pu(t,0,34,9,new U),r=Pu(t,0,0,4.2,new U),i=r.x-n.x,a=r.z-n.z,o=Math.hypot(i,a)||1;return i/=o,a/=o,a>-.3&&(i=0,a=-1),{x:r.x,z:r.z,cx:n.x,cy:n.y,cz:n.z,dx:i,dz:a,ax:-a,az:i}}function wh(e,t,n,r,i,a){let o=i-n,s=a-r,c=o*o+s*s||1,l=Math.max(0,Math.min(1,((e-n)*o+(t-r)*s)/c));return Math.hypot(e-n-o*l,t-r-s*l)}function Th(e,t,n=[],r=[],i=[]){let a=Ch(e),o=(e,i,a,o,s)=>{if(t(e,i)>If-a)return!1;for(let[t,r,a]of n)if(Math.hypot(e-t,i-r)<a*1.3+o)return!1;for(let[t,n,a]of r){let r=Math.cos(a)*120,o=-Math.sin(a)*120;if(wh(e,i,t-r,n-o,t+r,n+o)<s)return!1}return!0},s=(e,n,r,o)=>{for(let s of[-.6*r,0,.6*r]){let c=e+a.ax*s,l=n+a.az*s,u=c-a.cx,d=l-a.cz,f=Math.hypot(u,d),p=u/f,m=d/f;for(let e=40;e<=1500;e+=40)if(t(c+p*e,l+m*e)>If-1)return!1;for(let e=20;e<f-20;e+=20)if(t(c-p*e,l-m*e)>If+1+(a.cy-If-1)*(e/f))return!1;if(o&&Math.abs(s)<r/2)for(let[e,t]of i){let n=(e-a.cx)*p+(t-a.cz)*m;if(n>0&&n<f&&Math.hypot(a.cx+p*n-e,a.cz+m*n-t)<7)return!1}}return!0},c=(e,t,n,r,i,c,l,u,d,f)=>{for(let p=e;p<=t;p+=n)for(let e of r){let t=a.x+a.dx*p+a.ax*e,n=a.z+a.dz*p+a.az*e;if(Math.abs(e)>.22*(p+34)||!s(t,n,i,f))continue;let r=!0;for(let e=-i;e<=i&&r;e+=10)for(let i=-c;i<=c&&r;i+=c/2)r=o(t+a.ax*e+a.dx*i,n+a.az*e+a.dz*i,l,u,d);if(r)return{x:t,z:n,d:p}}return null},l=c(90,600,10,[0,20,-20,40,-40],45,12,2.5,25,30,!1)??{x:a.x+a.dx*200,z:a.z+a.dz*200,d:200},u=[0,30,-30,60,-60,90,-90,120,-120,150,-150];return{view:a,pod:l,whale:c(Math.max(240,l.d+90),900,20,u,70,25,8,40,22,!0)??c(Math.max(240,l.d+90),1200,20,u,70,25,8,40,22,!1)??{x:a.x+a.dx*600,z:a.z+a.dz*600,d:600}}}function Eh(e,t,n=()=>!1){let r=Bf(e),i=Ch(e),a=sd(977),o=(e,n)=>{let r=t(e,n);if(r<If+.6)return!1;for(let[i,a]of[[Sh,0],[-6.5,0],[0,Sh],[0,-6.5]])if(Math.abs(t(e+i,n+a)-r)>.45||t(e+i,n+a)<If+.55)return!1;return!0},s=(r,i,a)=>e.clearance(r,i,27.5)>=26.5&&o(r,i)&&t(r+a[0]*14,i+a[1]*14)>If+.3&&!n(r,i),c=[],l=Math.atan2(i.dx,i.dz);find0:for(let e=27;e<=70;e+=4)for(let t of[-7,7,-14,14,0,-22,22,-32,32,-44,44]){let n=i.x+i.dx*e+i.ax*t,r=i.z+i.dz*e+i.az*t;if(s(n,r,[i.dx,i.dz])){c.push([n,r,l]);break find0}}for(let t of Rf(e).slice(1)){let n=r.cx+t+(a()-.5)*1200;findK:for(let t=0;t<60;t++){let t=n+(a()-.5)*400,i=26+a()*Math.max(0,Hf(e,t)-40),o=r.minZ-i;if(s(t,o,[0,-1])){c.push([t,o,Math.PI+(a()-.5)*.6]);break findK}}}return c}function Dh(e,t,n){let r=new aa(e.map(([e,t])=>new H(Math.max(t,.001),e)),t);return r.rotateZ(-Math.PI/2),r.scale(1,1,n),r}function Oh(e,t){return new ta(new _i(e.map(([e,t])=>new H(e,t))),{depth:t,bevelEnabled:!1}).translate(0,0,-t/2)}var kh=(e,t,n,r)=>{let i=new q(e),a=new q(t);return(e,t,o)=>o.copy(a).lerp(i,Math.max(0,Math.min(1,(e.y-n)/(r-n))))};function Ah(){let e=kh(4016468,13620438,-.12,.16),t=[$(Dh([[-1.5,.02],[-1.38,.08],[-1,.17],[-.4,.3],[.15,.35],[.6,.31],[.92,.23],[1.08,.15],[1.2,.075],[1.42,.05],[1.5,.02],[1.52,.001]],10,.85),e)];t.push($(Oh([[-.3,.2],[.18,.2],[-.05,.42],[-.38,.62],[-.3,.42]],.05),4608605));for(let e of[1,-1]){let n=Oh([[.55,0],[.75,0],[.3,-.38]],.04).rotateX(e*.9).translate(0,-.14,e*.2);t.push($(n,5661550))}return t.push($(Oh([[-1.32,0],[-1.72,.48],[-1.62,.08],[-1.62,-.08],[-1.72,-.48]],.035).rotateX(Math.PI/2),4608605)),dp(t).scale(1.2,1.2,1.2)}function jh(){let e=kh(2896956,10133668,-.9,.5),t=[$(Dh([[-.1,.25],[.3,.35],[1.6,.62],[3.5,1.15],[6,1.65],[8.5,1.8],[10.5,1.6],[12.2,1.2],[13.2,.8],[13.6,.35],[13.75,.001]],14,.88).scale(1,.9,1),e)];t.push($(Oh([[3.6,.9],[5,.9],[4.15,1.65],[3.85,1.5]],.25),2501940));for(let e of[1,-1])t.push($(Oh([[8.6,0],[9.6,0],[6,-.4],[5.6,-.25]],.14).rotateX(e*1.15).translate(0,-.8,e*1.1),12172735));let n=new q(2304560),r=new q(14210510),i=Oh([[.15,0],[-.6,.55],[-1.6,2.3],[-2.05,2.5],[-1.55,1.1],[-1.75,.15],[-1.75,-.15],[-1.55,-1.1],[-2.05,-2.5],[-1.6,-2.3],[-.6,-.55]],.16).rotateX(Math.PI/2);return t.push($(i,(e,t,i)=>i.copy(t.y<-.5?r:n).lerp(n,t.y<-.5?Math.max(0,Math.abs(e.z)-1.9)*1.5:0))),dp(t).scale(1.5,1.5,1.5)}function Mh(e){return dp(e.map(([e,t,n,r])=>$(new ia(r,1).translate(e,t,n),16777215)))}function Nh(e,t){let n=new Ca({color:15922936,emissive:8227474,roughness:1,transparent:!0,opacity:e,depthWrite:!1,vertexColors:!0});return n.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
 diffuseColor.a *= smoothstep(0.05, 0.75, abs(dot(normal, normalize(vViewPosition))));`)},n.customProgramCacheKey=()=>t,n}function Ph(e,t){let n=new q(e),r=new q(16316144),i=new Rr(1.45,.5,12,1,!0).toNonIndexed(),a=i.attributes.position,o=new Float32Array(a.count*3);for(let e=0;e<a.count;e+=3){let t=Math.atan2(a.getZ(e)+a.getZ(e+1)+a.getZ(e+2),a.getX(e)+a.getX(e+1)+a.getX(e+2)),i=Math.floor((t+Math.PI)/(2*Math.PI)*12+.5)%2?n:r;for(let t=0;t<3;t++)o.set([i.r,i.g,i.b],(e+t)*3)}return i.deleteAttribute(`uv`),i.computeVertexNormals(),i.setAttribute(`color`,new Cn(o,3)),i.translate(0,t-.05,0),[$(new Lr(.035,.035,t+.3,5).translate(0,(t-.3)/2,0),15723748),i,$(new ua(.07,6,4).translate(0,t+.22,0),e)]}function Fh(e){let t=[];for(let n=0;n<6;n++)t.push($(new oa(.3,.9).rotateX(-Math.PI/2).translate(-.75+n*.3,.03,0),n%2?16184298:e));return t}function Ih(){let e=new q(13217404),t=(t,n,r)=>r.copy(e).multiplyScalar(.9+.1*Math.sin(t.y*40)),n=[$(new Fr(1.7,.4,1.7,1,1,1).translate(0,.2,0),t)];for(let[e,r]of[[-.75,-.75],[.75,-.75],[-.75,.75],[.75,.75]])n.push($(new Lr(.21,.28,.6,8).translate(e,.6,r),t)),n.push($(new Rr(.22,.25,8).translate(e,1.02,r),t));n.push($(new Lr(.38,.5,.85,10).translate(0,.82,0),t));for(let e=0;e<6;e++){let r=e/6*Math.PI*2;n.push($(new Fr(.14,.16,.14).translate(Math.cos(r)*.32,1.32,Math.sin(r)*.32),t))}return n.push($(new Lr(.018,.018,.8,4).translate(0,1.64,0),7031339)),n.push($(new sa(1.35,1.75,20).rotateX(-Math.PI/2).translate(0,.02,0),10257495)),n}function Lh(e){return[$(new Lr(.17,.13,.27,10,1,!0).translate(0,.135,0),e),$(new Ir(.13,10).rotateX(-Math.PI/2).translate(0,.01,0),e)]}var Rh=[14169386,3108804,15906090,2794890];function zh({group:e,keep:t,updaters:n,clearView:r,groundY:i},a){let o=new Ca({vertexColors:!0,roughness:.85,side:2}),s=$(new Y().setAttribute(`position`,new J([0,0,0,.5,-.12,0,0,-.26,0],3)),14692394);s.computeVertexNormals();let c=[],l=[],u=sd(9091),d=new K,f=new dt,p=new Pe,m=new U,h=new U(1,1,1);for(let[n,g,_]of a){let a=Math.cos(_),v=Math.sin(_),y=(e,t)=>[n+e*a+t*v,g-e*v+t*a],b=[],x=(e,t,n,r=0,a=[0,0],o=0)=>{let[s,c]=y(t,n);d.compose(m.set(s,i(s,c)-o,c),p.setFromEuler(f.set(a[0],_+r,a[1],`YXZ`)),h);for(let t of e)b.push(t.applyMatrix4(d))},S=[...Rh].sort(()=>u()-.5),C=2+ +(u()<.7);[[-2.6,-.4],[1.6,-1],[4.4,.8]].slice(0,C).forEach(([e,t],n)=>{x(Ph(S[n],2.2+u()*.3),e,t,u()*6.3,[(u()-.5)*.3,(u()-.5)*.3],.15),x(Fh(S[(n+1)%S.length]),e+.2,t-1.2+u()*.4,(u()-.5)*.4)}),x(Ih(),-.4,2.9,u()*6.3,[0,0],.05),x(Lh(S[C%S.length]),.9,3.9,0,[.15,.1]);let w=new or(dp(b),o);w.castShadow=!0,w.receiveShadow=!0,e.add(t(w)),r.addMesh(w),l.push(w);let[T,E]=y(-.4,2.9),D=new or(s,o);D.position.set(T,i(T,E)-.05+2.04,E),D.rotation.y=_,e.add(t(D)),c.push(D)}if(!a.length)return s.dispose(),o.dispose(),l;let g=0,_=c.map(e=>e.rotation.y);return n.push(e=>{g+=e;for(let e=0;e<c.length;e++)c[e].rotation.y=_[e]+.9+Math.sin(g*3.1+e)*.25+Math.sin(g*7.3+e*2)*.08}),l}var Bh=1.25,Vh=2.1,Hh=3,Uh=13,Wh=7.5,Gh=2.8,Kh=.7,qh=(1-Math.sqrt(1-.3/Gh))/2,Jh=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)};function Yh({group:e,keep:t,updaters:n},r,i){let a=sd(5150),o=3+ +(a()<.5),s=new Ca({vertexColors:!0,roughness:.35,metalness:.05}),c=new vr(Ah(),s,o),l=new vr(Mh([[0,.1,0,.55],[.35,.55,.1,.32],[-.3,.6,-.15,.3],[.05,.95,-.05,.22],[.6,.3,-.35,.2],[-.55,.35,.3,.2],[.1,1.3,.2,.12],[-.25,1.15,.3,.1]]),Nh(.85,`coast-mist-splash`),2*o);c.frustumCulled=!1,l.frustumCulled=!1,c.castShadow=!1,l.renderOrder=3;let u=Array.from({length:o},(e,t)=>({delay:t*.42+a()*.15,side:(t-(o-1)/2)*2.4+(a()-.5)*.8,back:t*1.2,k:.9+a()*.2,roll:(a()-.5)*.3})),d=new K,f=new Pe,p=new dt,m=new U,h=new U,g=new K().makeScale(0,0,0),_=11.5,v=(e,t,n,r)=>{if(r<0||r>Kh){l.setMatrixAt(e,g);return}let i=r/Kh,a=Math.sin(Math.PI*i**.55)*1.1,o=.7+.9*i;l.setMatrixAt(e,d.compose(m.set(t,If-.1,n),f.identity(),h.set(o,Math.max(a,.001),o)))},y=()=>{let e=Math.floor(_/Uh),t=_-e*Uh,n=e%2?1:-1,a=(Jh(e)-.5)*.5,s=(i.ax*Math.cos(a)+i.dx*Math.sin(a))*n,y=(i.az*Math.cos(a)+i.dz*Math.sin(a))*n,b=Hh*12.5,x=(Jh(e+7.1)-.5)*16,S=(Jh(e+3.3)-.5)*12,C=r.x+i.ax*x+i.dx*S-s*b/2,w=r.z+i.az*x+i.dz*S-y*b/2,T=Math.atan2(-y,s),E=!1;for(let e=0;e<o;e++){let n=u[e],r=t-n.delay;if(r<0){c.setMatrixAt(e,g),v(2*e,0,0,-1),v(2*e+1,0,0,-1);continue}let i=Math.min(2,Math.floor(r/Vh)),a=r-i*Vh,o=a/Bh-.1,l=i*12.5-n.back,_=C+s*l-y*n.side,b=w+y*l+s*n.side;if(o<=1.1){E=!0;let t=If-.3+Gh*(1-(2*o-1)**2),r=Math.atan2(-4*Gh*(2*o-1),Wh);c.setMatrixAt(e,d.compose(m.set(_+s*Wh*o,t,b+y*Wh*o),f.setFromEuler(p.set(n.roll*Math.sin(o*3),T,r,`YZX`)),h.set(n.k,n.k,n.k)))}else c.setMatrixAt(e,g);v(2*e,_+s*Wh*qh,b+y*Wh*qh,a-(qh+.1)*Bh),v(2*e+1,_+s*Wh*(1-qh),b+y*Wh*(1-qh),a-(1.1-qh)*Bh),a-(1.1-qh)*Bh<Kh&&(E=!0)}c.visible=l.visible=E,c.instanceMatrix.needsUpdate=!0,l.instanceMatrix.needsUpdate=!0};return y(),e.add(t(c),t(l)),n.push(e=>{_+=e,y()}),{dolphins:c,splashes:l}}var Xh=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)},Zh=15.5,Qh=3.8;function $h(e){return{y:-5.5+4.4*Xh(0,2,e)+.1*Math.sin(e*1.3)*Xh(2,3,e)*(1-Xh(7,8,e))+1.5*Xh(8,10,e)+.5*Xh(10,11.2,e)-5.6*Xh(12.8,15.5,e),pitch:.12*(1-Xh(0,2,e))-.5*Xh(8,10,e)-.9*Xh(10,11.8,e)-.1*Xh(12.8,15.5,e),s:2*Math.min(e,8)+1.2*Math.max(0,Math.min(e,10)-8)+.3*Math.max(0,e-10)}}function eg({group:e,keep:t,updaters:n},r,i){let a=sd(31337),o=new or(jh(),new Ca({vertexColors:!0,roughness:.55,side:2}));o.frustumCulled=!1,o.visible=!1;let s=Nh(0,`coast-mist-spout`),c=new or(Mh([[0,.5,0,.3],[.05,1.4,.05,.5],[.1,2.4,-.05,.75],[.2,3.4,.1,1],[.3,4.3,-.1,1.15],[-.6,4.6,.4,.9],[.9,4.7,-.3,.85],[.3,5.3,.2,.8]]),s);c.frustumCulled=!1,c.visible=!1,c.renderOrder=3,e.add(t(o),t(c));let l=16.5,u=8,d=0,f=0,p=0,m=1,h=0,g=1,_=99,v=new U,y=new U(16.2,2.3,0);return n.push(e=>{if(d+=e,d>=u){d=0,u=20+a()*10,l=0,_=-2.4,g=-g;let e=(a()-.5)*60,t=(a()-.5)*20,n=g*(.6+a()*.3);m=i.dx*Math.cos(n)+i.ax*Math.sin(n),h=i.dz*Math.cos(n)+i.az*Math.sin(n),f=r.x+i.ax*e+i.dx*t-m*10,p=r.z+i.az*e+i.dz*t-h*10}if(l+=e,_+=e,o.visible=l<Zh,o.visible){let e=$h(l);o.position.set(f+m*e.s,If+e.y,p+h*e.s),o.rotation.set(0,Math.atan2(-h,m),e.pitch,`YZX`),_<0&&(o.updateMatrix(),v.copy(y).applyMatrix4(o.matrix))}if(c.visible=_>=0&&_<Qh,c.visible){let e=_/Qh,t=Math.min(1,_/.55);c.position.set(v.x+_*.8,If+.4,v.z),c.scale.set(1+1.3*e,(.3+1.1*t)*(1+.2*e),1+1.3*e),s.opacity=.8*Math.min(1,_/.2)*(1-e)**1.3}}),{whale:o,spout:c}}function tg(e,{stacks:t=[],boats:n=[],scenery:r=[]}={}){let{track:i,groundY:a}=e,o=[],s=[],c=[];for(let e of r){if(!e.isInstancedMesh)continue;e.geometry.computeBoundingSphere(),e.geometry.computeBoundingBox();let t=e.instanceMatrix.array,n=e.geometry.boundingSphere.radius,r=e.geometry.boundingBox.max.y;for(let i=0;i<e.count;i++)n*Math.hypot(t[i*16],t[i*16+1],t[i*16+2])<1.2||(o.push(t[i*16+12]),s.push(t[i*16+14]),r*t[i*16+5]+t[i*16+13]-a(t[i*16+12],t[i*16+14])>7&&c.push([t[i*16+12],t[i*16+14]]))}let[l,,u]=i.strands[0].point(0),{view:d,pod:f,whale:p}=Th(i,a,t,n,c.filter(([e,t])=>Math.hypot(e-l,t-u)<400));return{beach:zh(e,Eh(i,a,(e,t)=>{for(let n=0;n<o.length;n++)if(Math.abs(o[n]-e)<8&&Math.abs(s[n]-t)<8)return!0;return!1})),dolphins:Yh(e,f,d),whale:eg(e,p,d),pod:f,whaleSpot:p}}var ng={id:`coast`,sky:{exposure:.52,sunColor:16773592,sunIntensity:2.8,hemiSky:9420031,hemiGround:11049588,hemiIntensity:.45,fog:14477814,fogDensity:4e-4,sunDir:new U(.38,.66,.65),bloom:.35,bloomThreshold:9,turbidity:1.3,rayleigh:.65,mieCoefficient:.0022,mieDirectionalG:.8,envIntensity:.5,clouds:.22},ground:{a:[184,162,122],b:[206,186,146]},ballastDust:[1.35,1.3,1.12],minimap:`#cdbf8e`,dust:[.86,.8,.66],lift:Gf,groundColor:Kf,groundReach:op,build(e){rg(e)}};function rg(e){let{group:t,r:n,density:r,keep:i,track:a,clearView:o,groundY:s}=e,c=Bf(a),l=e=>c.minZ-e,u=up(e),d=c.lighthouse,f=.9,p=d.bx+d.dx*f,m=c.minZ-(d.bu+d.du*f);fp(e,p,s(p,m),m,Math.atan2(-d.du,-d.dx));let h=d.tx,g=d.tu,_=c.cx,v=c.ex,y=Rf(a,600).map((e,t)=>{let n=sd(43+t),r=t%2?-1:1,i=e+(t?(n()-.5)*600:0);return([e,a,...o])=>t?[_+i+r*(e-_)+(n()-.5)*240,a*(.85+n()*.3),...o]:[e,a,...o]}),b=[[_+330,650,55,13,!0],[_+1250,830,85,20,!0],[_-1050,760,11,32,!1],[_-985,805,7,19,!1],[_+640,400,5,10,!1],[_-1500,1100,70,16,!0],[_+2e3,1e3,12,28,!1]],x=[[h+75,g+45,9,24,!1],[h+118,g+12,6,15,!1],[h+38,g+100,7,19,!1],[h+150,g+70,4,9,!1],...y.flatMap(e=>b.map(e))].map(([e,t,n,r,i])=>[e,c.minZ-t,n,r,i]),S=mp(e,n,x,s),C=[{h:11,lean:.18},{h:12.5,lean:.32},{h:9.5,lean:.1},{h:13.5,lean:.24,fronds:12}],w=C.map(()=>[]),T=C.map(()=>[]),E=a.strands[0].point(0),D=(e,t)=>Math.abs(e-E[0])<110&&t<E[2]-10&&n()<.88,O=(e,t,n)=>Z(e/90,t/90,61)*.8+Z(e/30,t/30,62)*.35>n,k=(e,t)=>s(e,t)>If+.7,A=(e,t,r,i,a)=>{let o=.75+n()*.55,s=a?Math.PI/2+(n()-.5)*1.6:n()*6.3;e[Math.floor(n()*C.length)].push([t,i,r,s,o])};for(let[t,n,i]of e.scatter(Ju(Math.floor(200*r),a),18,200,(e,t)=>l(t)>10&&l(t)<Hf(a,e)+18&&k(e,t)&&O(e,t,.45)&&!D(e,t)))A(w,t,n,i,!0);for(let[t,n,i]of e.scatter(Ju(Math.floor(160*r),a),14,220,(e,t)=>l(t)<10&&O(e,t,.62)&&!D(e,t)))A(w,t,n,i,!1);for(let e=0,t=Xu(Math.floor(700*r),1800,a);e<t;e++){let e=_+(n()-.5)*(3600+2*v),t=c.minZ-300+n()*(c.maxZ-c.minZ+1700),r=$u(a,e,t);if(r<150||r>1500||!O(e,t,.6))continue;let i=s(e,t);i<If+.7||Math.abs(s(e+6,t)-i)+Math.abs(s(e,t+6)-i)>4.5||A(T,e,t,i,l(t)>0)}for(let[e,t,r,i]of S)for(let a=0;a<3+i/25;a++){let a=n()*6.3,o=n()*i*.35;T[Math.floor(n()*4)].push([e+Math.cos(a)*o,t-1.5,r+Math.sin(a)*o,n()*6.3,.8+n()*.4])}let j=xh(u),M=new K,N=new Pe,P=new U,ee=new U,F=new q,te=new U(0,1,0);C.forEach((e,r)=>{for(let[a,s]of[[w[r],!0],[T[r],!1]]){if(!a.length)continue;let r=new vr(bh(n,{...e,far:!s}),j,a.length);a.forEach(([e,t,i,a,o],s)=>{r.setMatrixAt(s,M.compose(ee.set(e,t-.2,i),N.setFromAxisAngle(te,a),P.set(o,o*(.9+n()*.2),o))),r.setColorAt(s,F.setRGB(.85+n()*.25,.85+n()*.25,.8+n()*.2))}),r.castShadow=s,r.receiveShadow=s,t.add(i(r)),s&&o.addInstanced(r)}});let I=new Ca({vertexColors:!0,roughness:.95}),ne=(e,n,r,a,{shadow:s=!0,clear:c=!0}={})=>{if(!r.length){e.dispose();return}let l=new vr(e,n,r.length);r.forEach((e,t)=>a(l,t,e)),l.castShadow=s,l.receiveShadow=s,t.add(i(l)),c&&o.addInstanced(l)},re=(e,t,r,i)=>(a,o,[s,c,l])=>{let u=t+n()*(r-t);P.set(u*(1+n()*.4),u*i*(.8+n()*.4),u*(1+n()*.4)),a.setMatrixAt(o,M.compose(ee.set(s,l-.05*u,c),N.setFromAxisAngle(te,n()*6.3),P)),a.setColorAt(o,F.set(e[Math.floor(n()*e.length)]).multiplyScalar(.85+n()*.3))};for(let t of[7,9])ne(bh(n,{h:.5,lean:0,fronds:t,far:!0,rosette:!0}),j,e.scatter(Ju(Math.floor(260*r),a),6,260,(e,t)=>l(t)<Hf(a,e)-10&&O(e,t,.3)),(e,t,[r,i,a])=>{let o=.8+n()*.9;e.setMatrixAt(t,M.compose(ee.set(r,a-.3,i),N.setFromAxisAngle(te,n()*6.3),P.set(o,o*(.8+n()*.4),o))),e.setColorAt(t,F.setRGB(.8+n()*.3,.85+n()*.25,.75+n()*.2))});let ie=new Ca({vertexColors:!0,roughness:.9,side:2});ne(hh(n),ie,e.scatter(Ju(Math.floor(1500*r),a),4,200,(e,t)=>l(t)>-40&&l(t)<Hf(a,e)+14&&k(e,t)&&Z(e/25,t/25,63)>.35),re([16777215,15656652,14211248],.7,1.5,1),{shadow:!1,clear:!1}),ne(hh(n),ie,e.scatter(Ju(Math.floor(900*r),a),4,220,(e,t)=>l(t)<Hf(a,e)-30&&Z(e/30,t/30,65)>.4),re([8366160,7248452,9614428],.9,1.7,1),{shadow:!1,clear:!1});let L=[];for(let e=0,t=Xu(Math.floor(1400*r),2200,a),i=Xu(300*r,2200,a);e<t&&L.length<i;e++){let e=_+(n()-.5)*(4400+2*v),t=c.maxZ+150+n()*1500;if($u(a,e,t)<150||Z(e/160,t/160,64)<.42)continue;let r=s(e,t);r<If+2||L.push([e,t,r])}for(let e of c.heads)for(let t=0,i=0;t<900&&i<40*r;t++){let t=n(),r=e.bx+e.dx*t+(n()-.5)*e.w*1.6,o=c.minZ-(e.bu+e.du*t+(n()-.5)*e.w*1.6);if($u(a,r,o)<150)continue;let l=s(r,o);l<If+12||Math.hypot(r-p,o-m)<30||(i++,L.push([r,o,l]))}ne(mh(n,{blobs:2,height:1.2}),I,L,re([2244634,2837022,2046486,3495210],4,9,.75),{shadow:!1,clear:!1});let R=Array.from({length:3},()=>gh(n)),z=new Ca({vertexColors:!0,roughness:.92}),B=R.map(()=>[]);for(let e of c.heads)for(let t=0,r=0,i=e===c.lighthouse?70:35;t<1400&&r<i;t++){let t=n(),i=e.bx+e.dx*t+(n()-.5)*e.w*2.4,o=e.bu+e.du*t+(n()-.5)*e.w*2.4,l=c.minZ-o;if($u(a,i,l)<70)continue;let u=s(i,l);u<If-1.4||u>If+3||(r++,B[Math.floor(n()*3)].push([i,u,l,1.2+n()**1.5*4.5]))}for(let e of c.heads)for(let t=0,r=0,i=e===c.lighthouse?110:35;t<4e3&&r<i;t++){let t=n()*1.08,i=e.bx+e.dx*t+(n()-.5)*e.w*2.2,o=e.bu+e.du*t+(n()-.5)*e.w*2.2,l=c.minZ-o;if($u(a,i,l)<90)continue;let u=s(i,l);if(Math.hypot(s(i+5,l)-s(i-5,l),s(i,l+5)-s(i,l-5))/10<.35||u<If-3||u>If+e.h*.6)continue;r++;let d=6+n()*10*(1-(u-If)/(e.h*.9));B[Math.floor(n()*3)].push([i,u-d*.4,l,d])}for(let[t,i,o]of e.scatter(Ju(Math.floor(40*r),a),30,260,(e,t)=>l(t)>20&&k(e,t)))B[Math.floor(n()*3)].push([t,o,i,.5+n()*1.4]);let ae=new dt,oe=[11840672,11050122,10131088].map(e=>new q(e));R.forEach((e,t)=>ne(e,z,B[t],(e,t,[r,i,a,o])=>{e.setMatrixAt(t,M.compose(ee.set(r,i-o*.15,a),N.setFromEuler(ae.set((n()-.5)*.4,n()*6.3,(n()-.5)*.4)),P.set(o,o*(.7+n()*.5),o))),e.setColorAt(t,oe[Math.floor(n()*3)])},{shadow:!1}));let se=t.children.slice(),ce=[[_+170,340,.12],[_+540,780,-.2],[_-360,1050,.3],[_+1150,560,.05]],le=y.flatMap(e=>ce.map(e)).map(([e,t,n])=>[e,c.minZ-t,n]);gp(e,le);let ue=[];for(let e=0,t=Xu(16,650,a);e<t;e++){let e=_+(n()-.5)*(1300+2*v),t=Hf(a,e)+5+n()*120;ue.push([e,If+12+n()*26,c.minZ-t,14+n()*40])}_p(e,n,ue),tg(e,{stacks:x,boats:le,scenery:se})}var ig={desert:tf,snow:tm,volcano:oh,coast:ng},ag=e=>ig[e]??tf,og=new U;function sg(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;og.copy(t),og[r]=0,og.normalize();let l=.5*o/(o+s),u=1-og.angleTo(e)/c;return Math.sign(og[n])===1?u*l:s/(o+s)+l+l*(1-u)}var cg=class e extends Fr{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new U,c=new U,l=new U(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new U,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=sg(m,c,`z`,`y`,i,n),f[a+1]=1-sg(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-sg(m,c,`z`,`y`,i,n),f[a+1]=1-sg(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-sg(m,c,`x`,`z`,i,e),f[a+1]=sg(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-sg(m,c,`x`,`z`,i,e),f[a+1]=1-sg(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-sg(m,c,`x`,`y`,i,e),f[a+1]=1-sg(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=sg(m,c,`x`,`y`,i,e),f[a+1]=1-sg(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}};export{Zl as $,fa as $t,Ru as A,Ta as At,iu as B,Sa as Bt,Yu as C,po as Ct,qu as D,K as Dt,Xu as E,Ne as Et,Fu as F,gi as Ft,au as G,Rt as Gt,mu as H,sa as Ht,Pu as I,oo as It,fu as J,ca as Jt,uu as K,xa as Kt,Tu as L,oa as Lt,Nu as M,Ca as Mt,zu as N,Ot as Nt,Q as O,or as Ot,Lu as P,lo as Pt,X as Q,da as Qt,hu as R,co as Rt,Zu as S,ur as St,Ju as T,aa as Tt,tu as U,k as Ut,eu as V,e as Vt,ou as W,M as Wt,$l as X,ua as Xt,Ql as Y,kn as Yt,is as Z,vo as Zt,bd as _,Lt as _t,_d as a,Xr as at,Bu as b,Ja as bt,Td as c,Be as ct,hd as d,fo as dt,va as en,$t as et,fd as f,Br as ft,vd as g,J as gt,wd as h,ta as ht,tp as i,jr as it,Iu as j,wa as jt,Wu as k,Jn as kt,xd as l,Rr as lt,Cd as m,dt as mt,ag as n,U as nn,Cn as nt,md as o,Ir as ot,Sd as p,P as pt,du as q,_i as qt,np as r,$e as rn,Y as rt,gd as s,q as st,cg as t,H as tn,Fr as tt,sd as u,Lr as ut,yd as v,kt as vt,Z as w,vr as wt,$u as x,ia as xt,ed as y,u as yt,wu as z,Pe as zt};