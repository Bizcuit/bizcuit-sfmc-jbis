(function(t){function e(e){for(var n,o,c=e[0],r=e[1],l=e[2],d=0,f=[];d<c.length;d++)o=c[d],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&f.push(s[o][0]),s[o]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);u&&u(e);while(f.length)f.shift()();return a.push.apply(a,l||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],n=!0,c=1;c<i.length;c++){var r=i[c];0!==s[r]&&(n=!1)}n&&(a.splice(e--,1),t=o(o.s=i[0]))}return t}var n={},s={app:0},a=[];function o(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=n,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=r;a.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var n=i("85ec"),s=i.n(n);s.a},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[t._m(0),"is_setup"==t.ui.currentTab?i("div",[i("div",{staticClass:"columns"},[i("div",{staticClass:"column"},[i("field",{attrs:{label:"Account and region",type:"text",placeholder:"EG: cumulus.germany-2",value:t.config.is_account},on:{"update:value":function(e){return t.$set(t.config,"is_account",e)}}})],1),i("div",{staticClass:"column"},[i("field",{attrs:{label:"Dataset",type:"text",placeholder:"EG: engage",value:t.config.is_dataset},on:{"update:value":function(e){return t.$set(t.config,"is_dataset",e)}}})],1)]),i("div",{staticClass:"columns"},[i("div",{staticClass:"column"},[i("field",{attrs:{label:"UserID field",type:"select",placeholder:"EG: abcdef",value:t.config.is_userid_field,options:["SubscriberKey","Email"]},on:{"update:value":function(e){return t.$set(t.config,"is_userid_field",e)}}})],1),i("div",{staticClass:"column"},[i("field",{attrs:{label:"IS Authentication Config (optional)",type:"text",placeholder:"EG: abcdef",value:t.config.is_token},on:{"update:value":function(e){return t.$set(t.config,"is_token",e)}}})],1)]),i("div",{staticClass:"columns"},[i("div",{staticClass:"column"},[i("field",{attrs:{label:"IS Action",type:"text",placeholder:"EG: JB_ACTION",value:t.config.is_action},on:{"update:value":function(e){return t.$set(t.config,"is_action",e)}}})],1),i("div",{staticClass:"column"},[i("field",{attrs:{label:"IS Campaign Name",type:"text",placeholder:"EG: JB_CAMPAIGN",value:t.config.is_campaign},on:{"update:value":function(e){return t.$set(t.config,"is_campaign",e)}}})],1),i("div",{staticClass:"column is-one-quarter"},[i("label",{staticClass:"label is-small"},[t._v("Test configuration")]),i("a",{staticClass:"button is-info is-small is-fullwidth",on:{click:function(e){return t.sendTestAction()}}},[t._v("Send Action")])])])]):t._e(),t._m(1),i("div",{staticClass:"tags mt-3"},[i("span",{staticClass:"tag is-link",domProps:{innerHTML:t._s("{{Interaction."+(t.activity?t.activity.key:"")+".segments}}")}}),i("span",{staticClass:"tag is-link",domProps:{innerHTML:t._s("{{Interaction."+(t.activity?t.activity.key:"")+".userGroup}}")}}),i("span",{staticClass:"tag is-link",domProps:{innerHTML:t._s("{{Interaction."+(t.activity?t.activity.key:"")+".recommendations}}")}}),i("span",{staticClass:"tag is-link",domProps:{innerHTML:t._s("{{Interaction."+(t.activity?t.activity.key:"")+".experience}}")}}),i("span",{staticClass:"tag is-link",domProps:{innerHTML:t._s("{{Interaction."+(t.activity?t.activity.key:"")+".attribute}}")}}),i("span",{staticClass:"tag is-link",domProps:{innerHTML:t._s("{{Interaction."+(t.activity?t.activity.key:"")+".attribute2}}")}}),i("span",{staticClass:"tag is-link",domProps:{innerHTML:t._s("{{Interaction."+(t.activity?t.activity.key:"")+".attribute3}}")}})])])},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h3",{staticClass:"is-size-6 mb-3"},[i("strong",[t._v("Configuration:")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h3",{staticClass:"is-size-6 mt-5"},[i("strong",[t._v("Output substitution strings:")])])}],o=(i("c740"),i("d3b7"),i("498a"),i("b85c")),c=i("4c4c"),r=i.n(c),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"field"},[t.label?i("label",{staticClass:"label is-small"},[t._v(t._s(t.label))]):t._e(),i("div",{staticClass:"control"},["select"==t.type?i("div",{staticClass:"select is-small is-fullwidth"},[i("select",{on:{change:function(e){return t.$emit("update:value",e.target.value)}}},t._l(t.options,(function(e){return i("option",{key:e,domProps:{value:e,selected:e==t.value}},[t._v(t._s(e))])})),0)]):i("input",{staticClass:"input is-small",attrs:{type:"text",placeholder:t.placeholder},domProps:{value:t.value},on:{change:function(e){return t.$emit("update:value",e.target.value)}}})])])},u=[],d={name:"Field",props:{label:String,placeholder:String,value:String,type:String,options:Array}},f=d,v=i("2877"),p=Object(v["a"])(f,l,u,!1,null,"cfad9b64",null),g=p.exports,h={name:"App",data:function(){return{connection:null,activity:null,testUserId:"",config:{is_account:"",is_dataset:"",is_token:"",is_userid_field:"",is_action:"",is_campaign:"",is_custom_payload:""},ui:{currentTab:"is_setup",currentTabIndex:0,steps:[{label:"IS Setup",key:"is_setup",active:!1}]}}},methods:{init:function(t){this.activity=t,this.getArgumentValues(t),console.log("INIT",this.activity)},sendTestAction:function(){var t=window.prompt("Which UserId (SubscriberKey / EmailAddress) would you like to use for this test? Leave empty for default values","test_jbis@test.test");fetch("/actions/execute",{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify({inArguments:[{contactKey:t||"test_jbis"},{emailAddress:t||"test_jbis@test.test"},{is_account:this.config.is_account},{is_dataset:this.config.is_dataset},{is_token:this.config.is_token},{is_userid_field:this.config.is_userid_field},{is_action:this.config.is_action},{is_campaign:this.config.is_campaign}]})}).then((function(t){return t.json()})).then((function(t){var e="Status - "+t.status;for(var i in t)"status"!==i&&t[i]&&(e+="\n===============\n"+i+" = "+t[i]);alert(e.trim())})).catch((function(t){alert("ERROR: "+t.message)}))},saveAndClose:function(){var t;void 0!==(null===this||void 0===this||null===(t=this.activity)||void 0===t?void 0:t.metaData)&&(this.setArgumentValues(),this.activity.metaData.isConfigured=!0,this.connection.trigger("updateActivity",this.activity),this.connection.trigger("requestInspectorClose"))},getArgumentValues:function(t){var e,i,n,s;if(void 0!==(null===t||void 0===t||null===(e=t.arguments)||void 0===e||null===(i=e.execute)||void 0===i?void 0:i.inArguments)){var a,c=Object(o["a"])(null===t||void 0===t||null===(n=t.arguments)||void 0===n||null===(s=n.execute)||void 0===s?void 0:s.inArguments);try{for(c.s();!(a=c.n()).done;){var r=a.value;for(var l in r)void 0!==this.config[l]&&(this.config[l]=r[l])}}catch(u){c.e(u)}finally{c.f()}}},setArgumentValues:function(){var t,e,i,n,s,a;if(void 0!==(null===this||void 0===this||null===(t=this.activity)||void 0===t||null===(e=t.arguments)||void 0===e||null===(i=e.execute)||void 0===i?void 0:i.inArguments)){var c,r=Object(o["a"])(null===this||void 0===this||null===(n=this.activity)||void 0===n||null===(s=n.arguments)||void 0===s||null===(a=s.execute)||void 0===a?void 0:a.inArguments);try{for(r.s();!(c=r.n()).done;){var l=c.value;for(var u in l)void 0!==this.config[u]&&(l[u]=this.config[u])}}catch(d){r.e(d)}finally{r.f()}}},toggleCurrentTab:function(t){this.ui.currentTabIndex+=t,this.ui.currentTabIndex<0&&(this.ui.currentTabIndex=0),this.ui.currentTabIndex>=this.ui.steps.length?this.saveAndClose():this.ui.currentTab=this.ui.steps[this.ui.currentTabIndex].key},log:function(t){console.log("LOG",t)}},mounted:function(){var t=this;this.connection=new r.a.Session,this.connection.on("initActivity",this.init),this.connection.on("requestedTokens",this.log),this.connection.on("requestEndpoints",this.log),this.connection.trigger("ready"),this.connection.trigger("requestTokens"),this.connection.trigger("requestEndpoints"),this.connection.on("clickedNext",(function(){t.toggleCurrentTab(1),t.connection.trigger("nextStep")})),this.connection.on("clickedBack",(function(){t.toggleCurrentTab(-1),t.connection.trigger("prevStep")})),this.connection.on("gotoStep",(function(e){t.ui.currentTab=e.key,t.ui.currentTabIndex=t.ui.steps.findIndex((function(t){return t.key==e.key}))})),window.addEventListener("message",(function(t){console.log("Message received: ",t)}))},components:{Field:g}},m=h,y=(i("034f"),Object(v["a"])(m,s,a,!1,null,null,null)),_=y.exports;i("b383"),n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(_)}}).$mount("#app")},"85ec":function(t,e,i){},b383:function(t,e,i){}});
//# sourceMappingURL=app.js.map