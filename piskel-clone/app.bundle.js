!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=2)}([function(e,t,n){e.exports=function(e){function t(s){if(n[s])return n[s].exports;var r=n[s]={exports:{},id:s,loaded:!1};return e[s].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var s,r,i={}.hasOwnProperty,o=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};s=n(1).EventEmitter,n(2),r=function(e){function t(e){var t,s,r;for(s in this.running=!1,this.options={},this.frames=[],this.groups=new Map,this.freeWorkers=[],this.activeWorkers=[],this.setOptions(e),n)r=n[s],null==(t=this.options)[s]&&(t[s]=r)}var n,s;return function(e,t){function n(){this.constructor=e}for(var s in t)i.call(t,s)&&(e[s]=t[s]);n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype}(t,e),n={workerScript:"gif.worker.js",workers:2,repeat:0,background:"#fff",quality:10,width:null,height:null,transparent:null,debug:!1},s={delay:500,copy:!1},t.prototype.setOption=function(e,t){if(this.options[e]=t,null!=this._canvas&&("width"===e||"height"===e))return this._canvas[e]=t},t.prototype.setOptions=function(e){var t,n,s;for(t in n=[],e)i.call(e,t)&&(s=e[t],n.push(this.setOption(t,s)));return n},t.prototype.addFrame=function(e,t){var n,r,i;for(i in null==t&&(t={}),(n={}).transparent=this.options.transparent,s)n[i]=t[i]||s[i];if(null==this.options.width&&this.setOption("width",e.width),null==this.options.height&&this.setOption("height",e.height),"undefined"!=typeof ImageData&&null!==ImageData&&e instanceof ImageData)n.data=e.data;else if("undefined"!=typeof CanvasRenderingContext2D&&null!==CanvasRenderingContext2D&&e instanceof CanvasRenderingContext2D||"undefined"!=typeof WebGLRenderingContext&&null!==WebGLRenderingContext&&e instanceof WebGLRenderingContext)t.copy?n.data=this.getContextData(e):n.context=e;else{if(null==e.childNodes)throw new Error("Invalid image");t.copy?n.data=this.getImageData(e):n.image=e}return(r=this.frames.length)>0&&n.data&&(this.groups.has(n.data)?this.groups.get(n.data).push(r):this.groups.set(n.data,[r])),this.frames.push(n)},t.prototype.render=function(){var e,t,n;if(this.running)throw new Error("Already running");if(null==this.options.width||null==this.options.height)throw new Error("Width and height must be set prior to rendering");if(this.running=!0,this.nextFrame=0,this.finishedFrames=0,this.imageParts=function(){var e,t,n;for(n=[],e=0,t=this.frames.length;0<=t?e<t:e>t;0<=t?++e:--e)n.push(null);return n}.call(this),t=this.spawnWorkers(),!0===this.options.globalPalette)this.renderNextFrame();else for(e=0,n=t;0<=n?e<n:e>n;0<=n?++e:--e)this.renderNextFrame();return this.emit("start"),this.emit("progress",0)},t.prototype.abort=function(){for(var e;null!=(e=this.activeWorkers.shift());)this.log("killing active worker"),e.terminate();return this.running=!1,this.emit("abort")},t.prototype.spawnWorkers=function(){var e,t,n;return e=Math.min(this.options.workers,this.frames.length),function(){n=[];for(var s=t=this.freeWorkers.length;t<=e?s<e:s>e;t<=e?s++:s--)n.push(s);return n}.apply(this).forEach(function(e){return function(t){var n;return e.log("spawning worker "+t),(n=new Worker(e.options.workerScript)).onmessage=function(t){return e.activeWorkers.splice(e.activeWorkers.indexOf(n),1),e.freeWorkers.push(n),e.frameFinished(t.data,!1)},e.freeWorkers.push(n)}}(this)),e},t.prototype.frameFinished=function(e,t){var n,s,r,i;if(this.finishedFrames++,t?(n=this.frames.indexOf(e),s=this.groups.get(e.data)[0],this.log("frame "+(n+1)+" is duplicate of "+s+" - "+this.activeWorkers.length+" active"),this.imageParts[n]={indexOfFirstInGroup:s}):(this.log("frame "+(e.index+1)+" finished - "+this.activeWorkers.length+" active"),this.emit("progress",this.finishedFrames/this.frames.length),this.imageParts[e.index]=e),!0===this.options.globalPalette&&!t&&(this.options.globalPalette=e.globalPalette,this.log("global palette analyzed"),this.frames.length>2))for(r=1,i=this.freeWorkers.length;1<=i?r<i:r>i;1<=i?++r:--r)this.renderNextFrame();return o.call(this.imageParts,null)>=0?this.renderNextFrame():this.finishRendering()},t.prototype.finishRendering=function(){var e,t,n,s,r,i,o,a,c,l,u,d,p,m,h,f,v,g,y,_;for(v=this.imageParts,r=i=0,l=v.length;i<l;r=++i)(t=v[r]).indexOfFirstInGroup&&(this.imageParts[r]=this.imageParts[t.indexOfFirstInGroup]);for(c=0,g=this.imageParts,o=0,u=g.length;o<u;o++)t=g[o],c+=(t.data.length-1)*t.pageSize+t.cursor;for(c+=t.pageSize-t.cursor,this.log("rendering finished - filesize "+Math.round(c/1e3)+"kb"),e=new Uint8Array(c),h=0,y=this.imageParts,a=0,d=y.length;a<d;a++)for(t=y[a],_=t.data,n=m=0,p=_.length;m<p;n=++m)f=_[n],e.set(f,h),h+=n===t.data.length-1?t.cursor:t.pageSize;return s=new Blob([e],{type:"image/gif"}),this.emit("finished",s,e)},t.prototype.renderNextFrame=function(){var e,t,n,s;if(0===this.freeWorkers.length)throw new Error("No free workers");if(!(this.nextFrame>=this.frames.length))return e=this.frames[this.nextFrame++],(t=this.frames.indexOf(e))>0&&this.groups.has(e.data)&&this.groups.get(e.data)[0]!==t?void setTimeout(function(t){return function(){return t.frameFinished(e,!0)}}(this),0):(s=this.freeWorkers.shift(),n=this.getTask(e),this.log("starting frame "+(n.index+1)+" of "+this.frames.length),this.activeWorkers.push(s),s.postMessage(n))},t.prototype.getContextData=function(e){return e.getImageData(0,0,this.options.width,this.options.height).data},t.prototype.getImageData=function(e){var t;return null==this._canvas&&(this._canvas=document.createElement("canvas"),this._canvas.width=this.options.width,this._canvas.height=this.options.height),(t=this._canvas.getContext("2d")).setFill=this.options.background,t.fillRect(0,0,this.options.width,this.options.height),t.drawImage(e,0,0),this.getContextData(t)},t.prototype.getTask=function(e){var t,n;if(t=this.frames.indexOf(e),n={index:t,last:t===this.frames.length-1,delay:e.delay,transparent:e.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,dither:this.options.dither,globalPalette:this.options.globalPalette,repeat:this.options.repeat,canTransfer:!0},null!=e.data)n.data=e.data;else if(null!=e.context)n.data=this.getContextData(e.context);else{if(null==e.image)throw new Error("Invalid frame");n.data=this.getImageData(e.image)}return n},t.prototype.log=function(e){if(this.options.debug)return console.log(e)},t}(s),e.exports=r},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function s(e){return"function"==typeof e}function r(e){return"object"==typeof e&&null!==e}function i(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!function(e){return"number"==typeof e}(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,o,a,c,l;if(this._events||(this._events={}),"error"===e&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var u=new Error('Uncaught, unspecified "error" event. ('+t+")");throw u.context=t,u}if(i(n=this._events[e]))return!1;if(s(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),n.apply(this,a)}else if(r(n))for(a=Array.prototype.slice.call(arguments,1),l=n.slice(),o=l.length,c=0;c<o;c++)l[c].apply(this,a);return!0},n.prototype.addListener=function(e,t){var o;if(!s(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,s(t.listener)?t.listener:t),this._events[e]?r(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,r(this._events[e])&&!this._events[e].warned&&(o=i(this._maxListeners)?n.defaultMaxListeners:this._maxListeners)&&o>0&&this._events[e].length>o&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!s(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,i,o,a;if(!s(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],o=n.length,i=-1,n===t||s(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(r(n)){for(a=o;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){i=a;break}if(i<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(s(n=this._events[e]))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){return this._events&&this._events[e]?s(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(s(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t){var n,s,r,i,o;o=navigator.userAgent.toLowerCase(),i=navigator.platform.toLowerCase(),n=o.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,"unknown",0],r="ie"===n[1]&&document.documentMode,(s={name:"version"===n[1]?n[3]:n[1],version:r||parseFloat("opera"===n[1]&&n[4]?n[4]:n[2]),platform:{name:o.match(/ip(?:ad|od|hone)/)?"ios":(o.match(/(?:webos|android)/)||i.match(/mac|win|linux/)||["other"])[0]}})[s.name]=!0,s[s.name+parseInt(s.version,10)]=!0,s.platform[s.platform.name]=!0,e.exports=s}])},function(e,t,n){e.exports=function(){return new Worker(n.p+"gif.worker.js")}},function(e,t,n){"use strict";function s(e,t){e.classList.toggle(t)}function r(e,t){e[t]=!e[t]}n.r(t);class i{constructor(e){this.props=e}static create(){const e=document.createElement("header"),t=document.createElement("div"),n=document.createElement("button"),s=document.createElement("button"),r=document.createElement("h1");return t.classList.add("wrapper"),n.classList.add("btn","btn_menu"),s.classList.add("btn","btn_options"),r.innerText="Piskel Clone",n.innerHTML='<div class="line line_1"></div><div class="line line_2"></div><div class="line line_3"></div>',s.innerHTML='<div class="dot dot_1"></div><div class="dot dot_2"></div><div class="dot dot_3"></div>',t.appendChild(n),t.appendChild(r),t.appendChild(s),e.appendChild(t),e}render(){const{props:e}=this,t=i.create();t.addEventListener("click",function(e){const{target:t}=e;t.closest(".btn_menu")&&(s(t.closest(".btn_menu"),"open"),r(this,"isMenuOpen")),t.closest(".btn_options")&&(s(t.closest(".btn_options"),"open"),r(this,"isOptionsOpen"))}.bind(e),!1),document.body.appendChild(t)}}var o=n(0),a=n.n(o);class c{static toggleVisibleToGif(e){const t=document.querySelector(".preview__to-gif");0===e?t.classList.remove("show"):t.classList.add("show")}static createButton(){const e=document.createElement("button");return e.innerText="get GIF",e.classList.add("preview__to-gif"),e}}var l=n(1),u=n.n(l);function d(e,t){const n=t,s=+e.value;var r;n.selectedFPS=s,r=s,document.querySelector(".preview__fps-view").innerText=`FPS: ${r}`}function p(e){const t=e;if(function(){for(;window.intAnimPrev>0;)window.clearTimeout(window.intAnimPrev),window.intAnimPrev-=1}(),0===t.animationFrames.length)return void document.querySelector(".preview__animation").style.setProperty("background-image",'url("")');const n=t.animationFrames[t.frameOnPreview];var s;s=n,document.querySelector(".preview__animation").style.setProperty("background-image",`url("${s}")`),!function(e){return e.frameOnPreview+1>e.animationFrames.length-1}(t)?t.frameOnPreview+=1:t.frameOnPreview=0;const r=1e3/t.selectedFPS;window.intAnimPrev=setTimeout(p,r,t)}function m(e){const{target:t}=e,n=e.type,s=this;switch(n){case"input":d(t.closest(".preview__fps-control"),s);break;case"click":if(t.closest(".preview__fullscreen")&&function(){const e=document.querySelector(".preview__animation");e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}(),t.closest(".preview__to-gif")){const e=document.querySelectorAll(".frame__canvas"),t=new u.a,n=function(e){let t=0;return e.forEach(e=>{const n=e.querySelector("canvas").width;t<n&&(t=n)}),t}(e);if(t){const t=new a.a({workers:2,quality:10,width:n,height:n});e.forEach(e=>{let r=e.querySelector("canvas");r.width<n&&(r=function(e,t){const n=function(e){const t=e.getContext("2d"),n=e.getAttribute("height");return t.getImageData(0,0,n,n)}(e),s=document.createElement("canvas");return s.setAttribute("width",t),s.setAttribute("height",t),s.getContext("2d").putImageData(n,0,0),s}(r,n));let i=r.getContext("2d").getImageData(0,0,n,n);i=function(e){const t=e;for(let e=3;e<t.data.length;e+=4)0===t.data[e]&&(t.data[e-1]=255,t.data[e-2]=255,t.data[e-3]=255,t.data[e]=255);return t}(i),t.addFrame(i,{delay:1e3/s.selectedFPS})}),t.on("finished",e=>{const t=document.createElement("a"),n=URL.createObjectURL(e);t.setAttribute("href",n),t.setAttribute("download","download"),document.body.appendChild(t),t.click()}),t.render()}}}}class h{constructor(e){this.props=e}static create(e){const t=e.selectedFPS,n=document.createElement("div"),s=document.createElement("div"),r=document.createElement("input"),i=document.createElement("span"),o=document.createElement("div"),a=document.createElement("button"),l=c.createButton();return i.innerText=`FPS: ${t}`,r.setAttribute("type","range"),r.setAttribute("min","1"),r.setAttribute("max","24"),r.setAttribute("step","1"),r.value=t,n.classList.add("preview"),s.classList.add("preview__settings"),r.classList.add("preview__fps-control"),i.classList.add("preview__fps-view"),o.classList.add("preview__animation"),a.classList.add("preview__fullscreen"),s.appendChild(i),s.appendChild(r),n.appendChild(a),n.appendChild(l),n.appendChild(o),n.appendChild(s),n}static createAnimationFrames(e,t="rebuild"){const n=e,s=[],r=document.querySelectorAll(".canvas-list li"),i=document.querySelector(".canvas-list li.active");if(!i)return n.animationFrames.length=0,void c.toggleVisibleToGif(n.animationFrames.length);const o=i.firstChild;"add"===t?n.animationFrames.push(o.toDataURL()):"rebuild"===t&&(r.forEach(e=>{const t=e.firstChild;s.push(t.toDataURL())}),function(e){e.animationFrames.length=0}(e),n.animationFrames=s),c.toggleVisibleToGif(n.animationFrames.length)}static startAnimationPreview(e){const t=1e3/e.selectedFPS;window.intAnimPrev=setTimeout(p,t,e)}render(){const{props:e}=this,t=h.create(e);t.addEventListener("input",m.bind(e)),t.addEventListener("click",m.bind(e)),document.body.appendChild(t)}}function f(e){const t=e.getAttribute("height");e.getContext("2d").clearRect(0,0,t,t)}function v(e,t){const n=t,s=+e.value;var r;n.canvasState.penSize=s,r=s,document.querySelector(".pen-size_view").innerHTML=`<b>Pen size:</b> ${r}`}function g(e,t){const{selectedTools:n}=window.player;var s;n[t]||(function(e){const t=e;Object.keys(t).forEach(e=>{t[e]=!1})}(n),function(){const e=document.querySelector(".tool.active");e&&e.classList.remove("active")}()),s="active",e.classList.toggle(s),function(e,t){e[t]=!e[t]}(n,t)}function y(e){const t=this,{target:n,type:s}=e;if(n.closest(".tool_paint-bucket")&&g(n.closest(".tool_paint-bucket"),"bucket"),n.closest(".tool_color-picker")&&g(n.closest(".tool_color-picker"),"colorPicker"),n.closest(".tool_move")&&g(n.closest(".tool_move"),"move"),n.closest(".tool_lighten-darken")&&g(n.closest(".tool_lighten-darken"),"lightenDarken"),n.closest(".tool_pen")&&g(n.closest(".tool_pen"),"pen"),n.closest(".tool_eraser")&&g(n.closest(".tool_eraser"),"eraser"),n.closest(".tool_line")&&g(n.closest(".tool_line"),"line"),n.closest(".tool_clean")){if(!document.querySelector(".frame"))return;const e="Данное действие очищает весь холст. Вы уверены что хотите это сделать?";if(window.confirm(e)){const e=document.querySelector(".canvas-list__item.active canvas"),n=document.querySelector(".frame.active canvas");f(e),f(n),h.createAnimationFrames(t)}}if(n.closest(".tool_ellipse")&&g(n.closest(".tool_ellipse"),"ellipse"),n.closest(".tool_ellipse__paint")&&g(n.closest(".tool_ellipse__paint"),"ellipsePaint"),n.closest(".tool_rectangle")&&g(n.closest(".tool_rectangle"),"rectangle"),n.closest(".tool_rectangle__paint")&&g(n.closest(".tool_rectangle__paint"),"rectanglePaint"),"input"===s&&n.closest(".tool_pen-size input")){v(n.closest(".tool_pen-size input"),t)}if(n.closest(".color")&&(n.classList.add("selecting-color"),document.querySelector(".tool_colors-select input").click()),n.closest(".change-color")&&function(e){const t=e,n=document.querySelector(".color_primary"),s=document.querySelector(".color_secondary"),r=getComputedStyle(n).backgroundColor,i=getComputedStyle(s).backgroundColor;n.style.backgroundColor=i,s.style.backgroundColor=r,t.canvasState.currentColor=i}(t),"change"===s&&n.closest(".tool_colors-select input")){const t=e.target.value;_.setColor(t)}}class _{constructor(e){this.props=e}static create(){const e=document.createElement("div"),t=document.createElement("button"),n=document.createElement("button"),s=document.createElement("button"),r=document.createElement("button"),i=document.createElement("div"),o=document.createElement("button"),a=document.createElement("button"),c=document.createElement("div"),l=document.createElement("button"),u=document.createElement("button"),d=document.createElement("button"),p=document.createElement("button"),m=document.createElement("button"),h=document.createElement("button"),f=document.createElement("hr");return i.innerHTML='<span class="pen-size_view"><b>Pen size:</b> 1</span><input type="range" max="5" min="1" step="1" value="1">',c.innerHTML='<div class="color color_primary"></div><div class="color color_secondary"></div><button class="change-color" title="shortcut: Y"></button><input type="color">',t.setAttribute("title",'shortcut: ""'),n.setAttribute("title",'shortcut: "Z"'),s.setAttribute("title",'shortcut: "M"'),r.setAttribute("title",'shortcut: "P"'),o.setAttribute("title",'shortcut: "E"'),a.setAttribute("title",'shortcut: "X"'),l.setAttribute("title",'shortcut: "Q"'),u.setAttribute("title",'shortcut: "W"'),d.setAttribute("title",'shortcut: "A"'),p.setAttribute("title",'shortcut: "S"'),m.setAttribute("title",'shortcut: "L"'),h.setAttribute("title",'shortcut: "C"'),e.classList.add("tools"),t.classList.add("tool","tool_paint-bucket"),n.classList.add("tool","tool_color-picker"),s.classList.add("tool","tool_move"),a.classList.add("tool","tool_lighten-darken"),r.classList.add("tool","tool_pen"),i.classList.add("tool","tool_pen-size","outside"),o.classList.add("tool","tool_eraser"),m.classList.add("tool","tool_line"),h.classList.add("tool","tool_clean"),l.classList.add("tool","tool_ellipse"),u.classList.add("tool","tool_ellipse__paint"),d.classList.add("tool","tool_rectangle"),p.classList.add("tool","tool_rectangle__paint"),c.classList.add("tool","tool_colors-select","outside"),e.appendChild(i),e.appendChild(r),e.appendChild(m),e.appendChild(h),e.appendChild(o),e.appendChild(l),e.appendChild(u),e.appendChild(d),e.appendChild(p),e.appendChild(f),e.appendChild(a),e.appendChild(s),e.appendChild(t),e.appendChild(n),e.appendChild(c),e}render(){const{props:e}=this,t=_.create();t.addEventListener("click",y.bind(e),!1),t.addEventListener("input",y.bind(e),!1),t.addEventListener("change",y.bind(e),!1),document.body.appendChild(t)}static setColor(e){const t=window.player,n=document.querySelector(".selecting-color")||document.querySelector(".color_primary");n.style.backgroundColor=e,n.classList.remove("selecting-color"),n.classList.contains("color_primary")&&(t.canvasState.currentColor=e)}}class b{constructor(e){this.props=e}static createFrameShadow(){const e=document.createElement("li");return e.classList.add("frame","frame_shadow"),e}static create(e){const t=document.createElement("li"),n=document.createElement("div"),s=document.createElement("button"),r=document.createElement("button"),i=document.createElement("div"),o=document.createElement("div"),a=document.createElement("canvas");return s.setAttribute("title",'shortcut: "R"'),r.setAttribute("title",'shortcut: "V"'),a.setAttribute("width","32"),a.setAttribute("height","32"),n.innerHTML=`<span>${e}</span>`,t.setAttribute("data-number",e),t.classList.add("frame"),n.classList.add("frame__number"),s.classList.add("frame__remove"),r.classList.add("frame__copy"),i.classList.add("frame__move"),o.classList.add("frame__canvas"),o.appendChild(a),t.appendChild(n),t.appendChild(s),t.appendChild(r),t.appendChild(i),t.appendChild(o),t}render(){const{countFrames:e}=this.props,t=b.create(e+1),n=document.querySelector(".btn_new-frame");document.querySelector(".frames").insertBefore(t,n)}}class w{static setCorrectSize(e){const t=e.getAttribute("height"),n=e.parentNode.querySelector(".canvas-options_size select"),s=n.querySelector('[selected="true"]'),r=n.querySelector(`[value="${t}"]`);s.setAttribute("selected","false"),r.setAttribute("selected","true")}static drawCoordinates(e,t){const n=document.querySelector(".canvas-list__item.active"),s=n.querySelector(".coordinate__x"),r=n.querySelector(".coordinate__y");s.innerText=e,r.innerText=t}static create(){const e=document.createElement("div"),t=document.createElement("div"),n=document.createElement("div"),s=document.createElement("select");return t.innerHTML='<b>Coordinates:</b> <span>[X: <span class="coordinate__x">0</span>, Y: <span class="coordinate__y">0</span>]</span>',n.innerHTML="<b>Canvas size:</b> ",s.innerHTML='<option value="32" selected="true">32x32</option><option value="64">64x64</option><option value="128">128x128</option>',e.classList.add("canvas-options"),t.classList.add("canvas-options_coordinates"),n.classList.add("canvas-options_size"),n.appendChild(s),e.appendChild(t),e.appendChild(n),e}}function S(e){const t=function(e){const{selectedTools:t,canvasState:n}=window.player,s=document.createElement("div"),r=e.clientHeight,i=e.getAttribute("height");let o=!1,{penSize:a}=n;const c=["bucket","colorPicker","move","ellipse","ellipsePaint","rectangle","rectanglePaint"];Object.entries(t).forEach(e=>{c.includes(e[0])&&!o&&!0===e[1]&&(o=!0)}),o&&(a=0);const l=r/i*a;return s.classList.add("cursor"),s.style.setProperty("height",`${l}px`),s.style.setProperty("width",`${l}px`),s}(e);document.querySelector(".canvas-list__item.active").appendChild(t)}function x(e,t){e.setAttribute("width",t),e.setAttribute("height",t)}function C(e){const t=e.getContext("2d"),n=e.getAttribute("height");return t.getImageData(0,0,n,n)}function L(e,t){document.querySelector(`${t}.active`).querySelector("canvas").getContext("2d").putImageData(e,0,0)}function k(e){const{target:t,type:n}=e,s=this,{selectedTools:r}=s;switch(n){case"click":if(!t.closest("canvas"))break;if(r.colorPicker){const e=function(e){const t=e.getContext("2d"),n=document.querySelector(".canvas-list__item.active"),s=n.querySelector(".coordinate__x").innerText,r=n.querySelector(".coordinate__y").innerText,i=t.getImageData(s,r,1,1).data;let o="";return i.forEach(e=>{const t=Number(e).toString(16);o+="0"===t?"00":t}),`#${0==+o?"ffffffff":o}`}(t);_.setColor(e)}break;case"mousedown":{if(!t.closest("canvas"))break;const{pen:e,line:n,eraser:i,ellipse:o,rectangle:a,ellipsePaint:c,rectanglePaint:l,move:u,lightenDarken:d}=r,p={x:null,y:null,canvasImage:C(t)},m=document.querySelector(".canvas-list__item.active");if(p.x=+m.querySelector(".coordinate__x").innerText,p.y=+m.querySelector(".coordinate__y").innerText,(a||o||n)&&(p.x-=.5,p.y-=.5),e||n||i||o||a||c||l||u||d){s.canvasState.isDraw=!0,t.closest("canvas").onmousemove=e=>{!function(e,t){const{canvasState:n,selectedTools:s,pressButtons:r}=window.player,i=e.target,o=i.getContext("2d"),a={x:0,y:0,scale:0},c=i.getAttribute("width"),l=i.offsetWidth;if(a.scale=l/c,a.x=Math.ceil(e.offsetX/a.scale),a.y=Math.ceil(e.offsetY/a.scale),s.lightenDarken){o.beginPath(),a.x-=1,a.y-=0;const e=o.getImageData(a.x,a.y,n.penSize,n.penSize);e.data.forEach((t,s)=>{let i=null;"shift"===r?(i=-Math.round(7/n.penSize),0===t&&(i=0)):(i=Math.round(7/n.penSize),255===t&&(i=0)),(s+1)%4!=0&&(e.data[s]=t+i)}),o.clearRect(a.x,a.y,n.penSize,n.penSize),o.putImageData(e,a.x,a.y)}if(s.move){o.beginPath(),o.clearRect(0,0,c,c);const e=a.x-t.x-(a.x,t.x,1),n=a.y-t.y-(a.y<t.y?-.5:-1);o.putImageData(t.canvasImage,e,n)}if(s.eraser&&(o.beginPath(),a.x-=1,a.y-=0,o.fillStyle=n.currentColor,o.clearRect(a.x,a.y,n.penSize,n.penSize)),s.pen&&(o.beginPath(),o.fillStyle=n.currentColor,a.x-=1,a.y-=0,o.fillRect(a.x,a.y,n.penSize,n.penSize)),s.line&&(o.clearRect(0,0,c,c),o.putImageData(t.canvasImage,0,0),o.beginPath(),a.x-=.5,a.y-=.5,o.fillStyle="#00000000",o.strokeStyle=n.currentColor,o.lineWidth=n.penSize,o.moveTo(t.x,t.y),o.lineTo(a.x+1,a.y+1),o.stroke()),s.ellipse||s.ellipsePaint){o.beginPath(),o.clearRect(0,0,c,c),o.putImageData(t.canvasImage,0,0),s.ellipse&&(a.x-=.5,a.y-=.5);const e=((a.x-t.x)**2+(a.y-t.y)**2)**.5,i="shift"===r?e:Math.abs(a.x-t.x);let l="shift"===r?i:Math.abs(a.y-t.y);s.ellipse&&(o.fillStyle="#00000000",o.strokeStyle=n.currentColor,o.lineWidth=n.penSize,o.ellipse(t.x,t.y,i,l,0,2*Math.PI,!1),o.stroke()),s.ellipsePaint&&(o.fillStyle=n.currentColor,o.lineWidth=0,"shift"!==r&&(l=a.y<t.y?l:l+1),o.ellipse(t.x,t.y,i,l,0,2*Math.PI,!1))}if(s.rectangle||s.rectanglePaint){o.beginPath(),o.clearRect(0,0,c,c),o.putImageData(t.canvasImage,0,0),s.rectangle&&(a.x-=.5,a.y-=.5);let e=a.y-t.y,i=a.x-t.x;s.rectangle&&("shift"===r&&(i=a.x<t.x?-e:e,i=a.y<t.y?-i:i),o.fillStyle="#00000000",o.strokeStyle=n.currentColor,o.lineWidth=n.penSize,o.rect(t.x,t.y,i,e),o.stroke()),s.rectanglePaint&&(e=a.y<t.y?e:e+1,i=a.x<t.x?i-1:i,"shift"===r&&(i=a.x<t.x?-e:e,i=a.y<t.y?-i:i),o.fillStyle=n.currentColor,o.lineWidth=0,o.rect(t.x,t.y,i,e))}o.fill()}(e,p)}}break}case"mousemove":if(!t.closest("canvas"))break;!function(e){const t=e.target.closest(".canvas-list"),n=getComputedStyle(t),s=e.target.clientHeight,r=e.target.getAttribute("height"),i=parseInt(n.left,10),o=parseInt(n.top,10),a=s/r;let c=Math.ceil((e.clientX-i)/a)-1,l=Math.ceil((e.clientY-o)/a)-1;c<0?c=0:c>r-1&&(c=r-1),l<0?l=0:l>r-1&&(l=r-1),w.drawCoordinates(c,l)}(e),function(e){const t=document.querySelector(".cursor"),n={x:0,y:0,scale:0};n.x=e.offsetX,n.y=e.offsetY,t.style.top=`${n.y}px`,t.style.left=`${n.x}px`}(e);break;case"mouseover":if(!t.closest("canvas"))break;S(t);break;case"mouseout":case"mouseup":{if(t.closest("canvas")&&"mouseout"===n&&function(){const e=document.querySelector(".cursor");e&&e.parentNode.removeChild(e)}(),!s.canvasState.isDraw)break;const e=document.querySelector(".canvas-list__item.active canvas");e.onmousemove=null,L(C(e),".frame"),h.createAnimationFrames(s),h.startAnimationPreview(s),window.getSelection&&(window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges()),s.canvasState.isDraw=!1;break}case"change":!function(e){const t=e.closest(".canvas-list__item"),n=t.getAttribute("data-canvas-number"),s=document.querySelector(`.frame[data-number='${n}']`),r=t.querySelector("canvas"),i=s.querySelector("canvas"),o=C(r);x(i,e.value),x(r,e.value),L(o,".frame"),L(o,".canvas-list__item")}(t),h.createAnimationFrames(s),h.startAnimationPreview(s)}}class E{constructor(e){this.props=e}static create(e){const t=document.createElement("canvas"),n=w.create(),s=document.createElement("li");return s.classList.add("canvas-list__item"),x(t,32),s.setAttribute("data-canvas-number",e),s.appendChild(t),s.appendChild(n),s}static renderCanvasWrapper(e){const t=document.createElement("ul");t.classList.add("canvas-list"),t.addEventListener("mousedown",k.bind(e),!1),t.addEventListener("mousemove",k.bind(e),!1),t.addEventListener("mouseup",k.bind(e),!1),t.addEventListener("mouseout",k.bind(e),!1),t.addEventListener("mouseover",k.bind(e),!1),t.addEventListener("click",k.bind(e),!1),t.addEventListener("change",k.bind(e),!1),document.body.appendChild(t)}static copyCanvas(e,t){const n=e.getAttribute("height"),s=e.getContext("2d").getImageData(0,0,n,n);t.getContext("2d").putImageData(s,0,0),L(s,".frame")}static setCanvasCorrectNumb(){document.querySelectorAll(".canvas-list__item")&&document.querySelectorAll(".canvas-list__item").forEach((e,t)=>{e.setAttribute("data-canvas-number",t+1)})}render(){const{props:e}=this,t=E.create(e.countFrames);document.querySelector(".canvas-list").appendChild(t)}}function A(e){return 0===e}function P(){document.querySelectorAll(".frame")&&document.querySelectorAll(".frame").forEach((e,t)=>{e.querySelector(".frame__number span").innerText=t+1,e.setAttribute("data-number",t+1)})}function q(e,t){const n=t;"add"===e&&(n.countFrames+=1),"remove"===e&&(A(n.countFrames)?n.countFrames=0:n.countFrames-=1)}function F(e,t){document.querySelector(t).removeChild(e)}function T(e,t){const n=e.cloneNode(!0),s=e.nextSibling;document.querySelector(t).insertBefore(n,s)}function z(e){const t=document.querySelector(`${e}.active`);t&&t.classList.remove("active")}function D(e,t){const n=+e.getAttribute("data-number");z(".frame"),e.classList.add("active"),function(e,t){t.currentFrame=e}(n,t)}function I(e,t){!function(e){new b(e).render()}(t),q("add",t),D(e.previousSibling,t)}function M(){const e=document.querySelector(".frame.active");if(!e)return;const t=e.getAttribute("data-number"),n=document.querySelector(`[data-canvas-number='${t}']`);z(".canvas-list__item"),n.classList.add("active")}function O(e,t){const n=document.querySelector(".canvas-list"),s=document.querySelector(`[data-canvas-number='${e}']`),r=document.querySelector(`[data-canvas-number='${t}']`),i=n.removeChild(s);n.insertBefore(i,r)}function R(e,t,n){const s=t,r=s.getAttribute("data-start-y"),i=+e.clientY-+r,o=function(e,t){const n=t.previousSibling?t.previousSibling:null,s=t.nextSibling.nextSibling.classList.contains("frame")?t.nextSibling.nextSibling:null;return e.includes(n)?n:e.includes(s)?s:null}(document.elementsFromPoint(e.clientX,e.clientY),t);o&&function(e,t){const n=e.parentNode,s=document.querySelector(".frame_shadow");if(t===e.previousSibling){const e=n.removeChild(t),r=e.getAttribute("data-number"),i=s.nextSibling.getAttribute("data-number");n.insertBefore(e,s.nextSibling),O(r,i)}else{const s=n.removeChild(t),r=s.getAttribute("data-number"),i=e.getAttribute("data-number");n.insertBefore(s,e),O(r,i)}}(s,o),s.style.top=`${n+i}px`}function W(e){const t=document.querySelector(".draggable"),n=window.player;!function(e){const t=e.target.closest(".frames");t.onmousemove=null,t.removeEventListener("mouseleave",W),t.removeEventListener("mouseup",W)}(e),function(){const e=document.querySelector(".frame_shadow");e.parentNode.removeChild(e)}(),t.setAttribute("style",""),t.classList.remove("draggable"),P(),E.setCanvasCorrectNumb(),h.createAnimationFrames(n)}function $(e){const{target:t}=e,n=this,s=e.type;if(t.closest(".btn_new-frame")&&"click"===s&&(I(t.closest(".btn_new-frame"),n),new E(n).render(),M(),h.createAnimationFrames(n,"add")),t.closest(".frame__remove")&&"click"===s)return function(e,t){const n=t,s=e.previousSibling,r=e.nextSibling;if(F(e,".frames"),q("remove",n),P(),e.classList.contains("active")){const e=s||r;e&&!A(n.countFrames)&&D(e,n)}else D(document.querySelector(".frame.active"),n);A(n.countFrames)&&(n.currentFrame=null)}(t.closest(".frame"),n),function(e){const t=e.getAttribute("data-number");F(document.querySelector(`[data-canvas-number='${t}']`),".canvas-list"),E.setCanvasCorrectNumb()}(t.closest(".frame")),M(),void h.createAnimationFrames(n);if(t.closest(".frame__copy")&&"click"===s)return function(e,t){T(e,".frames"),q("add",t),P(),D(e.nextSibling,t)}(t.closest(".frame"),n),function(e){const t=e.getAttribute("data-number"),n=document.querySelector(`[data-canvas-number='${t}']`),s=document.querySelector(`[data-canvas-number='${t}']`).firstChild;T(n,".canvas-list");const r=document.querySelectorAll(`[data-canvas-number='${t}']`)[1].firstChild;w.setCorrectSize(r),E.copyCanvas(s,r),E.setCanvasCorrectNumb()}(t.closest(".frame")),M(),void h.createAnimationFrames(n);if(t.closest(".frame")&&"click"===s&&(D(t.closest(".frame"),n),M()),t.closest(".frame__move")&&"mousedown"===s){const n=t.closest(".frame"),s=t.closest(".frames");!function(e){const t=b.createFrameShadow(),n=e.nextSibling;e.parentNode.insertBefore(t,n)}(n),function(e){const t=e,n=t.parentNode,s=window.getComputedStyle(n),r=t.getBoundingClientRect().top-parseInt(s.top,10)+n.scrollTop||0;t.style.setProperty("top",`${r}px`)}(n);const r=parseInt(n.style.top,10);n.classList.add("draggable"),n.setAttribute("data-start-y",e.clientY),s.onmousemove=e=>{R(e,n,r)},s.addEventListener("mouseleave",W),s.addEventListener("mouseup",W)}}class N{constructor(e){this.props=e}static create(){const e=document.createElement("ul"),t=document.createElement("button");return e.classList.add("frames"),t.classList.add("btn_new-frame"),t.setAttribute("title",'shortcut: "F"'),t.innerHTML='<div class="icon"></div><span>Add new frame</span>',e.appendChild(t),e}render(){const{props:e}=this,t=N.create();t.addEventListener("click",$.bind(e)),t.addEventListener("mousedown",$.bind(e)),document.body.appendChild(t)}}function B(e){".up"!==e&&".down"!==e||function(e){const t=document.querySelector(".tool_pen-size input"),n=document.querySelector(".pen-size_view");".up"===e&&t.stepUp(1),".down"===e&&t.stepDown(1),n.innerHTML=`<b>Pen size:</b> ${t.value}`,window.player.canvasState.penSize=t.value}(e),document.querySelector(e)&&document.querySelector(e).click()}function j(e){const t=this;if("keydown"===e.type){const n=e.key.toLowerCase();t.pressButtons!==n&&(t.pressButtons=n)}if("keyup"===e.type&&(t.pressButtons=null),"keypress"===e.type){B(function(e){const t=window.player.shortcuts;let n=null;return Object.entries(t).forEach(t=>{const s=t[1];s[0]===e&&(n=s[1])}),n}(e.key.toUpperCase()))}}n(3);const H=new class{constructor(){this.selectedTools={bucket:!1,colorPicker:!1,move:!1,lightenDarken:!1,pen:!1,eraser:!1,line:!1,ellipse:!1,ellipsePaint:!1,rectangle:!1,rectanglePaint:!1},this.canvasState={isDraw:!1,penSize:1,currentColor:"#000000"},this.pressButtons=null,this.isMenuOpen=!1,this.isOptionsOpen=!1,this.animationFrames=[],this.currentFrame=null,this.countFrames=0,this.selectedFPS=4,this.frameOnPreview=0,this.shortcuts={penSizeUp:["+",".up"],penSizeDown:["-",".down"],addFrame:["F",".btn_new-frame"],removeFrame:["R",".frame__remove"],copyFrame:["V",".frame__copy"],pen:["P",".tool_pen"],line:["L",".tool_line"],clean:["C",".tool_clean"],eraser:["E",".tool_eraser"],ellipse:["Q",".tool_ellipse"],ellipsePaint:["W",".tool_ellipse__paint"],rectangle:["A",".tool_rectangle"],rectanglePaint:["S",".tool_rectangle__paint"],move:["M",".tool_move"],colorPicker:["X",".tool_lighten-darken"],lightenDarken:["Z",".tool_color-picker"],swapColor:["Y",".change-color"]}}render(){const e=new i(this),t=new _(this),n=new N(this),s=new h(this);e.render(),t.render(),n.render(),E.renderCanvasWrapper(this),s.render(),document.addEventListener("keydown",j.bind(this)),document.addEventListener("keyup",j.bind(this)),document.addEventListener("keypress",j.bind(this))}};window.player=H,H.render()},function(e,t){}]);
//# sourceMappingURL=app.bundle.js.map