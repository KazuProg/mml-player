/*! For license information please see mml-player.js.LICENSE.txt */
var MMLPlayer;(()=>{var e={7:e=>{"use strict";var t,n="object"==typeof Reflect?Reflect:null,r=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var i=Number.isNaN||function(e){return e!=e};function o(){o.init.call(this)}e.exports=o,e.exports.once=function(e,t){return new Promise((function(n,r){function i(n){e.removeListener(t,o),r(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",i),n([].slice.call(arguments))}m(e,t,o,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&m(e,"error",t,{once:!0})}(e,i)}))},o.EventEmitter=o,o.prototype._events=void 0,o.prototype._eventsCount=0,o.prototype._maxListeners=void 0;var s=10;function a(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?o.defaultMaxListeners:e._maxListeners}function u(e,t,n,r){var i,o,s,u;if(a(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(i=c(e))>0&&s.length>i&&!s.warned){s.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=s.length,u=l,console&&console.warn&&console.warn(u)}return e}function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=l.bind(r);return i.listener=n,r.wrapFn=i,i}function p(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(i):f(i,i.length)}function d(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function m(e,t,n,r){if("function"==typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function i(o){r.once&&e.removeEventListener(t,i),n(o)}))}}Object.defineProperty(o,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||i(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),o.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},o.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||i(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},o.prototype.getMaxListeners=function(){return c(this)},o.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var c=o[e];if(void 0===c)return!1;if("function"==typeof c)r(c,this,t);else{var u=c.length,l=f(c,u);for(n=0;n<u;++n)r(l[n],this,t)}return!0},o.prototype.addListener=function(e,t){return u(this,e,t,!1)},o.prototype.on=o.prototype.addListener,o.prototype.prependListener=function(e,t){return u(this,e,t,!0)},o.prototype.once=function(e,t){return a(t),this.on(e,h(this,e,t)),this},o.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,h(this,e,t)),this},o.prototype.removeListener=function(e,t){var n,r,i,o,s;if(a(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},o.prototype.off=o.prototype.removeListener,o.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,o=Object.keys(n);for(r=0;r<o.length;++r)"removeListener"!==(i=o[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},o.prototype.listeners=function(e){return p(this,e,!0)},o.prototype.rawListeners=function(e){return p(this,e,!1)},o.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):d.call(e,t)},o.prototype.listenerCount=d,o.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}},213:(e,t,n)=>{e.exports=n(485)},962:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r="undefined"!=typeof Symbol?Symbol.iterator:"Symbol(Symbol.iterator)",i=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._iter=t,this._interval=+n,this._currentTime=0,this._iterItem=null,this._done=!1}return n(e,[{key:"next",value:function(){var e=this._currentTime+this._interval;if(this._done)return{done:!0,value:[]};for(var t=[],n=void 0;null!==(n=this._next(e));)t.push(n);return this._currentTime=e,{done:!1,value:t}}},{key:r,value:function(){return this}},{key:"_next",value:function(e){if(this._iterItem)return this._nextIterItem(e);var t=this._iter.next();return t.done?(this._done=!0,null):(this._iterItem=t.value,this._nextIterItem(e))}},{key:"_nextIterItem",value:function(e){if(e<=this._iterItem.time)return null;var t=this._iterItem;return this._iterItem=null,t}}]),e}();t.default=i,e.exports=t.default},485:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i=(r=n(962))&&r.__esModule?r:{default:r};t.default=i.default,e.exports=t.default},228:e=>{"use strict";var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,i){for(var o,s,a=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),c=1;c<arguments.length;c++){for(var u in o=Object(arguments[c]))n.call(o,u)&&(a[u]=o[u]);if(t){s=t(o);for(var l=0;l<s.length;l++)r.call(o,s[l])&&(a[s[l]]=o[s[l]])}}return a}},911:(e,t,n)=>{e.exports=n(167).default},184:(e,t,n)=>{"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(7),o=c(n(250)),s=c(n(266)),a=c(n(228));function c(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,Object.getPrototypeOf(t).call(this));return n.scheduler?(r._scheduler=n.scheduler,r._ownScheduler=!1):(r._scheduler=new s.default(n),r._ownScheduler=!0),r._tracks=e.map((function(e,t){return new o.default(e,r._scheduler.interval,t)})),r._startTime=-1,r._stopTime=-1,r._timerId=0,r._state="suspended",r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"start",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]?this._scheduler.currentTime:arguments[0];-1===this._startTime?(this._startTime=t,this._ownScheduler&&this._scheduler.start(),this._timerId=this._scheduler.insert(t,(function(n){e._state="running",e.emit("statechange",{type:"statechange",playbackTime:t,state:e._state}),e._process(n.playbackTime)}))):-1!==this._startTime&&n.g.console.warn("Failed to execute 'start' on SeqEmitter: cannot call start more than once.")}},{key:"stop",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]?this._scheduler.currentTime:arguments[0];-1!==this._startTime&&-1===this._stopTime?(this._stopTime=t,this._scheduler.insert(t,(function(){e._state="closed",e.emit("statechange",{type:"statechange",playbackTime:t,state:e._state}),e._ownScheduler&&e._scheduler.stop(),e._scheduler.remove(e._timerId),e._timerId=0}))):(-1===this._startTime&&n.g.console.warn("Failed to execute 'stop' on SeqEmitter: cannot call stop without calling start first."),-1!==this._stopTime&&n.g.console.warn("Failed to execute 'stop' on SeqEmitter: cannot call stop more than once."))}},{key:"_process",value:function(e){var t=this;if(this._tracks.forEach((function(e){var n=e.next();t._emitEvent(n.value,e.trackNumber)})),this._tracks=this._tracks.filter((function(e){return!e.done})),0===this._tracks.length)this.emit("end:all",{type:"end:all",playbackTime:e});else{var n=e+this._scheduler.interval;this._timerId=this._scheduler.insert(n,(function(e){t._process(e.playbackTime)}))}}},{key:"_emitEvent",value:function(e,t){var n=this;e.forEach((function(e){var r=e.type,i=n._startTime+e.time;"string"==typeof r&&n.emit(r,(0,a.default)({playbackTime:i,trackNumber:t},e))}))}},{key:"scheduler",get:function(){return this._scheduler}},{key:"state",get:function(){return this._state}}]),t}(i.EventEmitter);t.default=u},250:(e,t,n)=>{"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function e(t,n,r){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,n,r)}if("value"in i)return i.value;var s=i.get;return void 0!==s?s.call(r):void 0};Object.defineProperty(t,"__esModule",{value:!0});var o,s=function(e){function t(e,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var i=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,Object.getPrototypeOf(t).call(this,e,n));return i.trackNumber=r,i.done=!1,i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"next",value:function(){if(this.done)return{done:!0,value:[]};var e=i(Object.getPrototypeOf(t.prototype),"next",this).call(this);return this.done=e.done,e}}]),t}(((o=n(213))&&o.__esModule?o:{default:o}).default);t.default=s},167:(e,t,n)=>{"use strict";var r,i=(r=n(184))&&r.__esModule?r:{default:r};t.default=i.default},266:(e,t,n)=>{e.exports=n(814)},935:(e,t,n)=>{"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(7),o=n(972),s=n(960),a=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),e=e||{};var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return r.context=o(e.context,s),r.interval=o(e.interval,.025),r.aheadTime=o(e.aheadTime,.1),r.timerAPI=o(e.timerAPI,n.g),r.playbackTime=r.currentTime,r._timerId=0,r._schedId=0,r._scheds=[],r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"start",value:function(e,t){var n=this.process.bind(this);return 0===this._timerId?(this._timerId=this.timerAPI.setInterval(n,1e3*this.interval),this.emit("start"),e&&(this.insert(this.context.currentTime,e,t),n())):e&&this.insert(this.context.currentTime,e,t),this}},{key:"stop",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return 0!==this._timerId&&(this.timerAPI.clearInterval(this._timerId),this._timerId=0,this.emit("stop")),e&&this._scheds.splice(0),this}},{key:"insert",value:function(e,t,n){var r=++this._schedId,i={id:r,time:e,callback:t,args:n},o=this._scheds;if(0===o.length||o[o.length-1].time<=e)o.push(i);else for(var s=0,a=o.length;s<a;s++)if(e<o[s].time){o.splice(s,0,i);break}return r}},{key:"nextTick",value:function(e,t,n){return"function"==typeof e&&(n=t,t=e,e=this.playbackTime),this.insert(e+this.aheadTime,t,n)}},{key:"remove",value:function(e){var t=this._scheds;if("number"==typeof e)for(var n=0,r=t.length;n<r;n++)if(e===t[n].id){t.splice(n,1);break}return e}},{key:"removeAll",value:function(){this._scheds.splice(0)}},{key:"process",value:function(){var e=this.context.currentTime,t=e+this.aheadTime;this._process(e,t)}},{key:"_process",value:function(e,t){var n=this._scheds,r=e;for(this.playbackTime=r,this.emit("process",{playbackTime:r});n.length&&n[0].time<t;){var i=n.shift(),o=i.time,s=i.args;this.playbackTime=o,i.callback({playbackTime:o,args:s})}this.playbackTime=r,this.emit("processed",{playbackTime:r})}},{key:"state",get:function(){return 0!==this._timerId?"running":"suspended"}},{key:"currentTime",get:function(){return this.context.currentTime}},{key:"events",get:function(){return this._scheds.slice()}}]),t}(i.EventEmitter);e.exports=a},960:e=>{"use strict";e.exports={get currentTime(){return Date.now()/1e3}}},814:(e,t,n)=>{"use strict";e.exports=n(935)},972:e=>{"use strict";e.exports=function(e,t){return void 0!==e?e:t}},583:e=>{e.exports={tempo:120,octave:4,length:4,velocity:100,quantize:75,loopCount:2}},132:(e,t,n)=>{"use strict";const r=n(753),i=n(583),o=n(861),s="undefined"!=typeof Symbol?Symbol.iterator:"@@iterator";class a{constructor(e){this.source=e,this._commands=new o(e).parse(),this._commandIndex=0,this._processedTime=0,this._iterator=null,this._octave=i.octave,this._noteLength=[i.length],this._velocity=i.velocity,this._quantize=i.quantize,this._tempo=i.tempo,this._infiniteLoopIndex=-1,this._loopStack=[],this._done=!1}hasNext(){return this._commandIndex<this._commands.length}next(){if(this._done)return{done:!0,value:null};if(this._iterator){const e=this._iterator.next();if(!e.done)return e}const e=this._forward(!0);return c(e)?(this._iterator=this[e.type](e),this.next()):(this._done=!0,{done:!1,value:{type:"end",time:this._processedTime}})}[s](){return this}_forward(e){for(;this.hasNext()&&!c(this._commands[this._commandIndex]);){const e=this._commands[this._commandIndex++];this[e.type](e)}return e&&!this.hasNext()&&-1!==this._infiniteLoopIndex?(this._commandIndex=this._infiniteLoopIndex,this._forward(!1)):this._commands[this._commandIndex++]||{}}_calcDuration(e){null===e[0]&&(e=this._noteLength.concat(e.slice(1)));let t=null,n=0;return(e=e.map((e=>{switch(e){case null:e=t;break;case 0:e=n*=2;break;default:t=n=e}const r=null!==e?e:i.length;return 60/this._tempo*(4/r)}))).reduce(((e,t)=>e+t),0)}_calcNoteNumber(e){return e+12*this._octave+12}[r.Note](e){const t=this._processedTime,n=this._calcDuration(e.noteLength),r=e.noteNumbers.map((e=>this._calcNoteNumber(e))),i=this._quantize,o=this._velocity;return this._processedTime=this._processedTime+n,function(e){let t=0;return{next:()=>t<e.length?{done:!1,value:e[t++]}:{done:!0}}}(r.map((e=>({type:"note",time:t,duration:n,noteNumber:e,velocity:o,quantize:i}))))}[r.Rest](e){const t=this._calcDuration(e.noteLength);this._processedTime=this._processedTime+t}[r.Octave](e){this._octave=null!==e.value?e.value:i.octave}[r.OctaveShift](e){const t=null!==e.value?e.value:1;this._octave+=t*e.direction}[r.NoteLength](e){const t=e.noteLength.map((e=>null!==e?e:i.length));this._noteLength=t}[r.NoteVelocity](e){this._velocity=null!==e.value?e.value:i.velocity}[r.NoteQuantize](e){this._quantize=null!==e.value?e.value:i.quantize}[r.Tempo](e){this._tempo=null!==e.value?e.value:i.tempo}[r.InfiniteLoop](){this._infiniteLoopIndex=this._commandIndex}[r.LoopBegin](e){const t=null!==e.value?e.value:i.loopCount,n=this._commandIndex;this._loopStack.push({loopCount:t,loopTopIndex:n,loopOutIndex:-1})}[r.LoopExit](){const e=this._loopStack[this._loopStack.length-1];let t=this._commandIndex;e.loopCount<=1&&-1!==e.loopOutIndex&&(t=e.loopOutIndex),this._commandIndex=t}[r.LoopEnd](){const e=this._loopStack[this._loopStack.length-1];let t=this._commandIndex;-1===e.loopOutIndex&&(e.loopOutIndex=this._commandIndex),e.loopCount-=1,0<e.loopCount?t=e.loopTopIndex:this._loopStack.pop(),this._commandIndex=t}}function c(e){return e.type===r.Note||e.type===r.Rest}e.exports=a},861:(e,t,n)=>{"use strict";const r=n(753),i=n(842),o={c:0,d:2,e:4,f:5,g:7,a:9,b:11};e.exports=class{constructor(e){this.scanner=new i(e),this.ignoreError=!0}parse(){let e=[];return this._readUntil(";",(()=>{e=e.concat(this.advance())})),e=e.filter((e=>null!=e)),e}advance(){switch(this.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":return this.readNote();case"[":return this.readChord();case"r":return this.readRest();case"o":return this.readOctave();case">":return this.readOctaveShift(1);case"<":return this.readOctaveShift(-1);case"`":return this._readOctaveShiftOnce(1);case'"':return this._readOctaveShiftOnce(-1);case"l":return this.readNoteLength();case"q":return this.readNoteQuantize();case"v":return this.readNoteVelocity();case"t":return this.readTempo();case"$":return this.readInfiniteLoop();case"/":return this.readLoop()}return this._parseError(),null}readNote(e=0){return{type:r.Note,noteNumbers:[this._readNoteNumber(e)],noteLength:this._readLength()}}readChord(){this.scanner.expect("[");const e=[];let t=0,n=0;return this._readUntil("]",(()=>{switch(this.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":e.push(this._readNoteNumber(t+n)),n=0;break;case">":this.scanner.next(),t+=12;break;case"<":this.scanner.next(),t-=12;break;case"`":this.scanner.next(),n+=12;break;case'"':this.scanner.next(),n-=12;break;default:this._parseError()}})),this.scanner.expect("]"),{type:r.Note,noteNumbers:e,noteLength:this._readLength()}}readRest(){return this.scanner.expect("r"),{type:r.Rest,noteLength:this._readLength()}}readOctave(){return this.scanner.expect("o"),{type:r.Octave,value:this._readArgument(/\d+/)}}readOctaveShift(e){return this.scanner.expect(/<|>/),{type:r.OctaveShift,direction:0|e,value:this._readArgument(/\d+/)}}readNoteLength(){return this.scanner.expect("l"),{type:r.NoteLength,noteLength:this._readLength()}}readNoteQuantize(){return this.scanner.expect("q"),{type:r.NoteQuantize,value:this._readArgument(/\d+/)}}readNoteVelocity(){return this.scanner.expect("v"),{type:r.NoteVelocity,value:this._readArgument(/\d+/)}}readTempo(){return this.scanner.expect("t"),{type:r.Tempo,value:this._readArgument(/\d+(\.\d+)?/)}}readInfiniteLoop(){return this.scanner.expect("$"),{type:r.InfiniteLoop}}readLoop(){this.scanner.expect("/"),this.scanner.expect(":");const e={type:r.LoopBegin},t={type:r.LoopEnd};let n=[];return n=n.concat(e),this._readUntil(/[|:]/,(()=>{n=n.concat(this.advance())})),n=n.concat(this._readLoopExit()),this.scanner.expect(":"),this.scanner.expect("/"),e.value=this._readArgument(/\d+/)||null,n=n.concat(t),n}_readUntil(e,t){for(;this.scanner.hasNext()&&(this.scanner.forward(),this.scanner.hasNext()&&!this.scanner.match(e));)t()}_readArgument(e){const t=this.scanner.scan(e);return null!==t?+t:null}_readOctaveShiftOnce(e,t=0){switch(this.scanner.expect(/`|"/),t+=e,this.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":return this.readNote(12*t);case"`":return this._readOctaveShiftOnce(1,t);case'"':return this._readOctaveShiftOnce(-1,t);default:this._parseError()}}_readNoteNumber(e){return o[this.scanner.next()]+this._readAccidental()+e}_readAccidental(){return this.scanner.match("+")||this.scanner.match("#")?1*this.scanner.scan(/(\+|#)+/).length:this.scanner.match("-")?-1*this.scanner.scan(/\-+/).length:0}_readDot(){const e=(this.scanner.scan(/\.+/)||"").length,t=new Array(e);for(let n=0;n<e;n++)t[n]=0;return t}_readLength(){let e=[];e=e.concat(this._readArgument(/\d+/)),e=e.concat(this._readDot());const t=this._readTie();return t&&(e=e.concat(t)),e}_readTie(){return this.scanner.forward(),this.scanner.match("^")?(this.scanner.next(),this._readLength()):null}_readLoopExit(){let e=[];if(this.scanner.match("|")){this.scanner.next();const t={type:r.LoopExit};e=e.concat(t),this._readUntil(":",(()=>{e=e.concat(this.advance())}))}return e}_parseError(){this.ignoreError?(console.warn(`Unexpected token: ${this.scanner.next()}`),this._readArgument(/\d+/)):this.scanner.throwUnexpectedToken()}}},842:e=>{"use strict";e.exports=class{constructor(e){this.source=e,this.index=0}hasNext(){return this.index<this.source.length}peek(){return this.source.charAt(this.index)||""}next(){return this.source.charAt(this.index++)||""}forward(){for(;this.hasNext()&&this.match(/\s/);)this.index+=1}match(e){return e instanceof RegExp?e.test(this.peek()):this.peek()===e}expect(e){this.match(e)||this.throwUnexpectedToken(),this.index+=1}scan(e){const t=this.source.substr(this.index);let n=null;if(e instanceof RegExp){const r=e.exec(t);r&&0===r.index&&(n=r[0])}else t.substr(0,e.length)===e&&(n=e);return n&&(this.index+=n.length),n}throwUnexpectedToken(){const e=this.peek()||"ILLEGAL";throw new SyntaxError(`Unexpected token: ${e}`)}}},753:e=>{e.exports={Note:"Note",Rest:"Rest",Octave:"Octave",OctaveShift:"OctaveShift",NoteLength:"NoteLength",NoteVelocity:"NoteVelocity",NoteQuantize:"NoteQuantize",Tempo:"Tempo",InfiniteLoop:"InfiniteLoop",LoopBegin:"LoopBegin",LoopExit:"LoopExit",LoopEnd:"LoopEnd"}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};(()=>{"use strict";n.d(r,{default:()=>u});var e=n(911),t=n.n(e),i=n(132),o=n.n(i);class s extends(t()){constructor(e,t={}){t.reverseOctave&&(e=function(e){return e.replace(/[<>]/g,(e=>"<"===e?">":"<"))}(e));let n=e.replace(/(\/\/.*)/g,"").split(";");n=n.filter((e=>!!e.trim())),n=n.map((e=>new(o())(e,t))),super(n,t)}}window.AudioContext=window.AudioContext||window.webkitAudioContext;const a=new AudioContext;function c(){a.resume(),removeEventListener("click",c),removeEventListener("touchend",c),removeEventListener("keydown",c)}addEventListener("click",c),addEventListener("touchend",c),addEventListener("keydown",c);const u=class{onNote=null;#e=null;#t=null;constructor(e=null){this.#e="string"==typeof e?e:null}play(e=null){let t="string"==typeof e?e:this.#e;null!=t?(this.#t=new s(t,{context:a}),this.#t.on("note",(e=>this.#n(e))),this.#t.on("end:all",(()=>this.stop())),this.#t.start()):console.error("Failed to execute 'play' on MMLPlayer: mml is null.")}stop(){null!=this.#t?("running"==this.#t.state&&this.#t.stop(),this.#t=null):console.warn("Failed to execute 'stop' on MMLPlayer: cannot call stop without calling play first.")}#n(e){if("running"!=a.state)return void console.error("Failed to play sound on MMLPlayer: AudioContext is not ready.");const t=e.playbackTime,n=t+e.duration*(e.quantize/100),r=n+.1,i=e.velocity/128,o=a.createOscillator(),s=a.createGain();var c;o.frequency.value=(c=e.noteNumber,440*Math.pow(2,(c-69)/12)),o.start(t),o.stop(r),o.connect(s),s.gain.setValueAtTime(i,t),s.gain.setValueAtTime(i,n),s.gain.exponentialRampToValueAtTime(.001,r),s.connect(a.destination),"function"==typeof this.onNote&&this.onNote(e)}}})(),MMLPlayer=r.default})();