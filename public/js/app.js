(function(t){function e(e){for(var i,a,l=e[0],c=e[1],u=e[2],d=0,v=[];d<l.length;d++)a=l[d],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&v.push(s[a][0]),s[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);r&&r(e);while(v.length)v.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,l=1;l<n.length;l++){var c=n[l];0!==s[c]&&(i=!1)}i&&(o.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},s={app:0},o=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var r=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0085":function(t,e,n){},"0510":function(t,e,n){"use strict";n("0085")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23"),s={id:"app"},o=Object(i["e"])("h3",{class:"is-size-6 mb-3"},[Object(i["e"])("strong",null,"Configuration:")],-1),a={key:0},l={class:"columns"},c={class:"column"},u={class:"column"},r={class:"columns"},d={class:"column"},v={class:"column"},f={class:"columns"},p={class:"column is-half"},b=Object(i["e"])("h3",{class:"is-size-6 mt-5 mb-5"},[Object(i["e"])("strong",null,"Activity Output:")],-1),h={class:"is-flex is-flex-wrap-wrap"},m=["innerHTML"],g=Object(i["e"])("span",{class:"tag is-white"},"=",-1),y={class:"tag is-link is-light"};function O(t,e,n,O,j,_){var A=Object(i["j"])("field");return Object(i["h"])(),Object(i["d"])("div",s,[o,"is_setup"==t.ui.currentTab?(Object(i["h"])(),Object(i["d"])("div",a,[Object(i["e"])("div",l,[Object(i["e"])("div",c,[Object(i["f"])(A,{label:"Dataset",type:"select",modelValue:t.config.is_dataset,"onUpdate:modelValue":e[0]||(e[0]=function(e){return t.config.is_dataset=e}),options:t.datasets},null,8,["modelValue","options"])]),Object(i["e"])("div",u,[Object(i["f"])(A,{label:"IS Action",type:"text",placeholder:"EG: JBIS_Action",modelValue:t.config.is_action,"onUpdate:modelValue":e[1]||(e[1]=function(e){return t.config.is_action=e})},null,8,["modelValue"])])]),Object(i["e"])("div",r,[Object(i["e"])("div",d,[Object(i["f"])(A,{label:"IS Identity Attribute",type:"text",placeholder:"EG: sfmcContactKey",modelValue:t.config.is_identity_attribute_name,"onUpdate:modelValue":e[2]||(e[2]=function(e){return t.config.is_identity_attribute_name=e})},null,8,["modelValue"])]),Object(i["e"])("div",v,[Object(i["f"])(A,{label:"UserID field",type:"select",modelValue:t.config.is_identity_attribute_value,"onUpdate:modelValue":e[3]||(e[3]=function(e){return t.config.is_identity_attribute_value=e}),options:{"{{Contact.Key}}":"SubscriberKey","{{InteractionDefaults.Email}}":"Email"}},null,8,["modelValue","options"])])]),Object(i["e"])("div",f,[Object(i["e"])("div",p,[Object(i["e"])("a",{class:Object(i["g"])([t.ui.isTesting?"is-loading":"","button is-info is-small is-fullwidth"]),onClick:e[4]||(e[4]=function(t){return _.sendTestAction()})},"Validate Activity and update Output Parameters",2)])])])):Object(i["c"])("",!0),b,Object(i["e"])("div",h,[(Object(i["h"])(!0),Object(i["d"])(i["a"],null,Object(i["i"])(t.outputArguments,(function(e){var n;return Object(i["h"])(),Object(i["d"])("div",{class:"tile is-6 mb-4",key:e},[Object(i["e"])("span",{class:"tag is-link",innerHTML:"{{Interaction."+((null===(n=t.activity)||void 0===n?void 0:n.key)||"")+"."+e+"}}"},null,8,m),g,Object(i["e"])("span",y,Object(i["k"])(t.testData[e]||"NO VALUE"),1)])})),128))])])}var j=n("b85c"),_=(n("d3b7"),n("e9c4"),n("b64b"),n("4c4c")),A=n.n(_),k={class:"field"},w={key:0,class:"label is-small"},V={class:"control"},x={key:0,class:"select is-small is-fullwidth"},T=["value","selected"],S=["placeholder","value"],I=["placeholder","value"];function C(t,e,n,s,o,a){return Object(i["h"])(),Object(i["d"])("div",k,[n.label?(Object(i["h"])(),Object(i["d"])("label",w,Object(i["k"])(n.label),1)):Object(i["c"])("",!0),Object(i["e"])("div",V,["select"==n.type?(Object(i["h"])(),Object(i["d"])("div",x,[Object(i["e"])("select",{onChange:e[0]||(e[0]=function(e){return t.$emit("update:modelValue",e.target.value)})},[(Object(i["h"])(!0),Object(i["d"])(i["a"],null,Object(i["i"])(n.options,(function(t,e){return Object(i["h"])(),Object(i["d"])("option",{key:e,value:e,selected:e==n.modelValue},Object(i["k"])(t),9,T)})),128))],32)])):"password"==n.type?(Object(i["h"])(),Object(i["d"])("input",{key:1,class:"input is-small",type:"password",placeholder:n.placeholder,value:n.modelValue,onInput:e[1]||(e[1]=function(e){return t.$emit("update:modelValue",e.target.value)})},null,40,S)):(Object(i["h"])(),Object(i["d"])("input",{key:2,class:"input is-small",type:"text",placeholder:n.placeholder,value:n.modelValue,onInput:e[2]||(e[2]=function(e){return t.$emit("update:modelValue",e.target.value)})},null,40,I))])])}var P={name:"Field",props:{label:String,placeholder:String,modelValue:String,type:String,options:Array}},D=n("6b0d"),U=n.n(D);const E=U()(P,[["render",C]]);var J=E,M={name:"App",data:function(){return{connection:null,activity:null,token:null,datasets:{},outputArguments:[],testData:{},testUserId:"",config:{is_dataset:"",is_action:"",is_identity_attribute_name:"",is_identity_attribute_value:""},ui:{currentTab:"is_setup",currentTabIndex:0,isTesting:!1,steps:[{label:"IS Setup",key:"is_setup",active:!1}]}}},methods:{init:function(t){this.activity=t,this.getArgumentValues(t),this.readActivityOutputArguments(t)},getDatasets:function(t){var e=this;this.getToken().then((function(){fetch("/utils/datasets",{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify(t)}).then((function(t){return t.json()})).then((function(t){e.datasets=t}))}))},sendTestAction:function(){var t=this;this.ui.isTesting=!0;var e=window.prompt('Which UserId (SubscriberKey / EmailAddress) would you like to use for this test? Click "Cancel" to use default values',"test_jbis@test.test");fetch("/actions/execute",{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify({inArguments:[{is_dataset:this.config.is_dataset},{is_action:this.config.is_action},{is_identity_attribute_name:this.config.is_identity_attribute_name},{is_identity_attribute_value:e||"test_jbis@test.test"}]})}).then((function(t){return t.json()})).then((function(e){return t.updateActivityOutputArguments(e),t.testData=e,e})).catch((function(t){alert("ERROR: "+t.message)})).finally((function(){t.ui.isTesting=!1}))},readActivityOutputArguments:function(t){var e,n;if(void 0!==(null===t||void 0===t||null===(e=t.arguments)||void 0===e||null===(n=e.execute)||void 0===n?void 0:n.outArguments)){var i,s=Object(j["a"])(t.arguments.execute.outArguments);try{for(s.s();!(i=s.n()).done;){var o=i.value;o&&Object.keys(o).length>0&&this.outputArguments.push(Object.keys(o)[0])}}catch(a){s.e(a)}finally{s.f()}}},updateActivityOutputArguments:function(t){var e;if(void 0!==(null===this||void 0===this||null===(e=this.activity)||void 0===e?void 0:e.metaData)){var n=this.activity.arguments.execute.outArguments=[],i=this.activity.schema.arguments.execute.outArguments=[];for(var s in this.outputArguments=[],t){var o={},a={};o[s]="",a[s]={dataType:"Text",direction:"out",access:"visible"},n.push(o),i.push(a),this.outputArguments.push(s)}}},saveAndClose:function(){var t;void 0!==(null===this||void 0===this||null===(t=this.activity)||void 0===t?void 0:t.metaData)&&(this.setArgumentValues(),this.activity.metaData.isConfigured=!0,this.connection.trigger("updateActivity",this.activity),this.connection.trigger("requestInspectorClose"))},getArgumentValues:function(t){var e,n,i,s;if(void 0!==(null===t||void 0===t||null===(e=t.arguments)||void 0===e||null===(n=e.execute)||void 0===n?void 0:n.inArguments)){var o,a=Object(j["a"])(null===t||void 0===t||null===(i=t.arguments)||void 0===i||null===(s=i.execute)||void 0===s?void 0:s.inArguments);try{for(a.s();!(o=a.n()).done;){var l=o.value;for(var c in l)void 0!==this.config[c]&&(this.config[c]=l[c])}}catch(u){a.e(u)}finally{a.f()}}},setArgumentValues:function(){var t,e,n,i,s,o;if(void 0!==(null===this||void 0===this||null===(t=this.activity)||void 0===t||null===(e=t.arguments)||void 0===e||null===(n=e.execute)||void 0===n?void 0:n.inArguments)){var a,l=Object(j["a"])(null===this||void 0===this||null===(i=this.activity)||void 0===i||null===(s=i.arguments)||void 0===s||null===(o=s.execute)||void 0===o?void 0:o.inArguments);try{for(l.s();!(a=l.n()).done;){var c=a.value;for(var u in c)void 0!==this.config[u]&&(c[u]=this.config[u])}}catch(r){l.e(r)}finally{l.f()}}},log:function(t){console.log("LOG",JSON.stringify(t,null,2))},getToken:function(){var t=this;return new Promise((function(e){var n=(new Date).getTime();if(t.token&&t.token.expires>n)e(t.token);else{t.token=null,t.connection.trigger("requestTokens");var i=setInterval((function(){t.token&&(clearInterval(i),e(t.token))}),100)}}))}},mounted:function(){var t=this;this.getDatasets(),this.connection=new A.a.Session,this.connection.on("initActivity",this.init),this.connection.trigger("ready"),this.connection.on("requestedTokens",(function(e){t.token=e})),this.connection.on("clickedNext",(function(){t.saveAndClose()}))},components:{Field:J}};n("0510");const N=U()(M,[["render",O]]);var K=N;n("b383"),Object(i["b"])(K).mount("#app")},b383:function(t,e,n){}});
//# sourceMappingURL=app.js.map