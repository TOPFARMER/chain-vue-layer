parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"SRd1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const i=require("../utils/actor"),e=require("../utils/process-file.js");var s={name:"signInForm",data:()=>({rePassword:void 0,rePublicKey:void 0,sign_up_step:1,actor:void 0,isVaildPublicKey:void 0,user:{email:void 0,password:void 0,role:void 0,publicKey:void 0,name:void 0,sex:void 0,tel:void 0,institution:void 0,faculty:void 0,grade:void 0,c1ass:void 0,intro:"暂无"}}),methods:{forwardStep:function(){this.sign_up_step<5&&(this.sign_up_step++,4===this.sign_up_step&&this.genKeyPair())},backwardStep:function(){if(this.sign_up_step>1)return this.sign_up_step--},sendThisToMe:function(i,s){e.quickDownload(i,s)},genKeyPair:function(){this.actor=new i,this.user.publicKey=this.actor.account,this.sendThisToMe(this.actor.genSecret(),`key-${this.actor.account.substring(0,8)}.json`)},handleDragOver:function(i){e.handleDragOver(i)},handleDrop:function(i){e.handleFileDropOn(i).then(i=>{console.log(i),this.rePublicKey=i.publicKey,this.checkPublicKey()})},checkPwd:function(){},checkPublicKey:function(){this.rePublicKey===this.user.publicKey?this.isVaildPublicKey=!0:this.isVaildPublicKey=!1},sendToFeathers(){}}};exports.default=s;
(function(){var e=exports.default||module.exports;"function"==typeof e&&(e=e.options),Object.assign(e,{render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"signInForm"}},[s("div",{staticClass:"switchingPage"},[s("transition",{attrs:{name:"fade",mode:"out-in"}},[1===e.sign_up_step?s("div",{key:e.sign_up_step,staticClass:"sexAndRole"},[s("h5",[s("strong",[e._v("您的身份是？")])]),e._v(" "),s("div",{staticClass:"role"},[s("label",{staticClass:"label-inline",attrs:{for:"teacher"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.role,expression:"user.role"}],attrs:{id:"teacher",type:"radio",name:"role",value:"teacher"},domProps:{checked:e._q(e.user.role,"teacher")},on:{change:function(t){return e.$set(e.user,"role","teacher")}}}),e._v(" 教师 ")]),e._v(" "),s("label",{staticClass:"label-inline",attrs:{for:"student"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.role,expression:"user.role"}],attrs:{id:"student",type:"radio",name:"role",value:"student"},domProps:{checked:e._q(e.user.role,"student")},on:{change:function(t){return e.$set(e.user,"role","student")}}}),e._v(" 学生 ")])]),e._v(" "),s("h5",[s("strong",[e._v("您的性别是？")])]),e._v(" "),s("div",{staticClass:"sex"},[s("label",{staticClass:"label-inline",attrs:{for:"male"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.sex,expression:"user.sex"}],attrs:{id:"male",type:"radio",name:"sex",value:"male"},domProps:{checked:e._q(e.user.sex,"male")},on:{change:function(t){return e.$set(e.user,"sex","male")}}}),e._v(" 男 ")]),e._v(" "),s("label",{staticClass:"label-inline",attrs:{for:"female"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.sex,expression:"user.sex"}],attrs:{id:"female",type:"radio",name:"sex",value:"female"},domProps:{checked:e._q(e.user.sex,"female")},on:{change:function(t){return e.$set(e.user,"sex","female")}}}),e._v(" 女 ")])])]):2===e.sign_up_step?s("form",{key:e.sign_up_step,staticClass:"personalInfo"},[s("h5",[s("strong",[e._v("填写您的个人信息：")])]),e._v(" "),"student"===e.user.role?s("fieldset",[s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.name,expression:"user.name",modifiers:{lazy:!0}}],attrs:{type:"text",placeholder:"姓名"},domProps:{value:e.user.name},on:{change:function(t){return e.$set(e.user,"name",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.tel,expression:"user.tel",modifiers:{lazy:!0}}],attrs:{type:"tel",placeholder:"电话"},domProps:{value:e.user.tel},on:{change:function(t){return e.$set(e.user,"tel",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.institution,expression:"user.institution",modifiers:{lazy:!0}}],attrs:{type:"text",placeholder:"院校"},domProps:{value:e.user.institution},on:{change:function(t){return e.$set(e.user,"institution",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.faculty,expression:"user.faculty",modifiers:{lazy:!0}}],attrs:{type:"text",placeholder:"学院"},domProps:{value:e.user.faculty},on:{change:function(t){return e.$set(e.user,"faculty",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.grade,expression:"user.grade",modifiers:{lazy:!0}}],attrs:{type:"number",placeholder:"年级"},domProps:{value:e.user.grade},on:{change:function(t){return e.$set(e.user,"grade",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.c1ass,expression:"user.c1ass",modifiers:{lazy:!0}}],attrs:{type:"number",placeholder:"班级"},domProps:{value:e.user.c1ass},on:{change:function(t){return e.$set(e.user,"c1ass",t.target.value)}}})]):"teacher"===e.user.role?s("fieldset",[s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.name,expression:"user.name",modifiers:{lazy:!0}}],attrs:{type:"text",placeholder:"姓名"},domProps:{value:e.user.name},on:{change:function(t){return e.$set(e.user,"name",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.tel,expression:"user.tel",modifiers:{lazy:!0}}],attrs:{type:"tel",placeholder:"电话"},domProps:{value:e.user.tel},on:{change:function(t){return e.$set(e.user,"tel",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.institution,expression:"user.institution",modifiers:{lazy:!0}}],attrs:{type:"text",placeholder:"院校"},domProps:{value:e.user.institution},on:{change:function(t){return e.$set(e.user,"institution",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.faculty,expression:"user.faculty",modifiers:{lazy:!0}}],attrs:{type:"text",placeholder:"学院"},domProps:{value:e.user.faculty},on:{change:function(t){return e.$set(e.user,"faculty",t.target.value)}}})]):e._e()]):3===e.sign_up_step?s("form",{key:e.sign_up_step,staticClass:"keyInfo"},[s("h5",[s("strong",[e._v("填写您的注册邮箱以及密码：")])]),e._v(" "),s("fieldset",[s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.email,expression:"user.email",modifiers:{lazy:!0}}],attrs:{type:"email",placeholder:"注册邮箱"},domProps:{value:e.user.email},on:{change:function(t){return e.$set(e.user,"email",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.user.password,expression:"user.password",modifiers:{lazy:!0}}],attrs:{type:"password",placeholder:"注册密码"},domProps:{value:e.user.password},on:{change:function(t){return e.$set(e.user,"password",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.rePassword,expression:"rePassword",modifiers:{lazy:!0}}],attrs:{type:"password",placeholder:"重复输入密码"},domProps:{value:e.rePassword},on:{change:function(t){e.rePassword=t.target.value}}})])]):4===e.sign_up_step?s("div",{key:e.sign_up_step,staticClass:"genKeyPair"},[s("h5",[s("strong",[e._v("已极速为您生成密钥对！")])]),e._v(" "),s("img",{staticClass:"key",attrs:{src:"/key.a7ed2343.png",alt:"密钥"}}),e._v(" "),s("p",[e._v(" 别担心，这一切都将在您的本地生成 "),s("br"),e._v("服务器不会知道您的私人密钥 ")]),e._v(" "),s("p",{staticClass:"regenerate"},[e._v(" 没有收到密钥？ 👉 "),s("a",{on:{click:function(t){e.sendThisToMe(e.actor.genSecret(),"key-"+e.actor.account.substring(0,8)+".json")}}},[e._v("重新生成")])])]):s("div",{staticClass:"checkKeyPair"},[s("h5",[s("strong",[e._v("还差一步，即可开启")])]),e._v(" "),s("p",[e._v(" 我们需要确认你是否收到了正确的密钥 "),s("br"),e._v("别担心，确认工作仍在您本地进行 "),s("br"),e._v("服务器不会知道您的私人密钥 "),s("br"),e._v("同时请妥善保管您的密钥 ")]),e._v(" "),s("p",{staticClass:"regenerate"},[e._v(" 以后每次签名确认，都须经过这种方式 "),s("br"),e._v("请把文件拖拽到下方位置 ")]),e._v(" "),s("div",{attrs:{id:"check_key_drop_zone"},on:{dragover:function(t){return t.stopPropagation(),t.preventDefault(),e.handleDragOver(t)},drop:function(t){return t.stopPropagation(),t.preventDefault(),e.handleDrop(t)}}},[e._v("请把密钥文件拖拽到此处")])])])],1),e._v(" "),s("div",{staticClass:"stepBtn"},[s("p",{directives:[{name:"show",rawName:"v-show",value:!1===e.isVaildPublicKey,expression:"isVaildPublicKey === false"}],staticClass:"regenerate"},[e._v(" 密钥文件有误，请重新拖曳 "),s("br"),e._v("或试试👇 ")]),e._v(" "),s("a",{directives:[{name:"show",rawName:"v-show",value:2===e.sign_up_step||3===e.sign_up_step,expression:"sign_up_step === 2 || sign_up_step === 3"}],staticClass:"button button-clear",attrs:{type:"button"},on:{click:function(t){return e.backwardStep()}}},[e._v("上一步")]),e._v(" "),s("a",{directives:[{name:"show",rawName:"v-show",value:5!==e.sign_up_step,expression:"sign_up_step !== 5"}],staticClass:"button button-clear",attrs:{type:"button"},on:{click:function(t){return e.forwardStep()}}},[e._v("下一步")]),e._v(" "),s("a",{directives:[{name:"show",rawName:"v-show",value:5===e.sign_up_step&&!0!==e.isVaildPublicKey,expression:"sign_up_step === 5 && (isVaildPublicKey !== true)"}],staticClass:"button button-clear",attrs:{type:"button"},on:{click:function(t){return e.backwardStep()}}},[e._v("重新生成")]),e._v(" "),s("a",{directives:[{name:"show",rawName:"v-show",value:5===e.sign_up_step&&!0===e.isVaildPublicKey,expression:"sign_up_step === 5 && (isVaildPublicKey === true)"}],staticClass:"button button-outline",attrs:{type:"button"},on:{click:function(t){return e.register()}}},[e._v("大功告成")])])])},staticRenderFns:[],_compiled:!0,_scopeId:"data-v-47afe4",functional:void 0});})();
},{"../utils/actor":"gBGC","../utils/process-file.js":"zUKb","./../assets/key.png":[["key.a7ed2343.png","cJkP"],"cJkP"]}],"Bh1I":[function(require,module,exports) {
var t=null;function e(){return t||(t=n()),t}function n(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);if(t)return r(t[0])}return"/"}function r(t){return(""+t).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^\/]+$/,"$1")+"/"}exports.getBundleURL=e,exports.getBaseURL=r;
},{}],"z1Am":[function(require,module,exports) {
var r=require("./bundle-url").getBundleURL;function e(r){Array.isArray(r)||(r=[r]);var e=r[r.length-1];try{return Promise.resolve(require(e))}catch(n){if("MODULE_NOT_FOUND"===n.code)return new s(function(n,i){t(r.slice(0,-1)).then(function(){return require(e)}).then(n,i)});throw n}}function t(r){return Promise.all(r.map(u))}var n={};function i(r,e){n[r]=e}module.exports=exports=e,exports.load=t,exports.register=i;var o={};function u(e){var t;if(Array.isArray(e)&&(t=e[1],e=e[0]),o[e])return o[e];var i=(e.substring(e.lastIndexOf(".")+1,e.length)||e).toLowerCase(),u=n[i];return u?o[e]=u(r()+e).then(function(r){return r&&module.bundle.register(t,r),r}).catch(function(r){throw delete o[e],r}):void 0}function s(r){this.executor=r,this.promise=null}s.prototype.then=function(r,e){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.then(r,e)},s.prototype.catch=function(r){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.catch(r)};
},{"./bundle-url":"Bh1I"}],0:[function(require,module,exports) {
var b=require("z1Am");b.load([]).then(function(){require("SRd1");});
},{}]},{},[0], null)