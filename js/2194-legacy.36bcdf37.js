"use strict";(self["webpackChunkaugest"]=self["webpackChunkaugest"]||[]).push([[2194],{6131:function(t,e,s){s.d(e,{yU:function(){return r}});s(68309),s(41539),s(21703),s(38862),s(47941);var n={name:"markethuang:xctest",pwd:"c34dd995a8132605764a9347dae6e8ca"},o=["","https://xqdsj-stagingtest1.xuece.cn/","https://xqdsj-stagingtest2.xuece.cn/"],a="",i=19;function c(t){var e=o[t]+"api/usercenter/nnauth/user/login?username="+n.name+"&encryptpwd="+n.pwd+"&clienttype=BROWSER&clientversion=1.25.7&systemversion=chrome122.0.0.0";return new Promise((function(t,s){fetch(e).then((function(t){if(!t.ok)throw new Error("Network response was not ok");return t.json()})).then((function(e){a=e.data.authtoken,i=e.data.user.schoolId;var s=JSON.stringify({token:a,schoolId:i});l("xuecelogin",s,30),t(!0)})).catch((function(t){console.error("There was a problem with your fetch operation:",t),s(t)}))}))}function r(t,e,s){var n=o[t]+"api/examcenter/teacher/answercard/editinfo?exampaperId="+s;1==e&&(n=o[t]+"api/classworkcenter/teacher/classwork/answercard/get?classworkId="+s);var a=u("xuecelogin"),i=null;return a?i=JSON.parse(a):c(t).then(i=JSON.parse(a)).catch((function(t){console.error("There was a problem with your fetch operation:",t)})),new Promise((function(o,a){fetch(n,{method:"GET",headers:{Authtoken:i.token,"Xc-App-User-Schoolid":i.schoolId}}).then((function(t){if(!t.ok)throw new Error("Network response was not ok");return console.log(t),t.json()})).then((function(n){if("AUTH_EXPIRED"==n.code)c(t).then(r(t,e,s)).catch((function(t){throw new Error(t)}));else{if("ERROR"==n.code||"FAILURE"==n.code)throw new Error("未找到考试或作业");var a="",i="";1==e?(a=n.data[0].answercard.cutParamJsonStr,i=n.data[0].answercard.pdfUrl):(a=n.data.cutparamJsonstr2,i=n.data.pdfUrl),o([a,i])}})).catch((function(t){a(t)}))}))}function l(t,e,s){var n=new Date;n.setTime(n.getTime()+24*s*60*60*1e3);var o="expires="+n.toUTCString();document.cookie=t+"="+e+";"+o+";path=/"}function u(t){for(var e=t+"=",s=decodeURIComponent(document.cookie),n=s.split(";"),o=0;o<n.length;o++){var a=n[o];while(" "===a.charAt(0))a=a.substring(1);if(0===a.indexOf(e))return a.substring(e.length,a.length)}return""}},37150:function(t,e,s){s.r(e),s.d(e,{default:function(){return Tt}});var n=s(19812),o=s(44220),a=s(55893),i=function(t){return(0,n.dD)("data-v-64e15ca4"),t=t(),(0,n.Cn)(),t},c={class:"container left",style:{height:"auto"}},r=i((function(){return(0,n._)("h5",null,"基本布局",-1)})),l=i((function(){return(0,n._)("div",{class:"au-layout demo"},[(0,n._)("div",{class:"au-container"},[(0,n._)("div",{class:"au-header demo",style:{height:"4rem"}},"Header"),(0,n._)("div",{class:"au-main demo",style:{height:"12rem"}},"Main"),(0,n._)("div",{class:"au-footer demo",style:{height:"4rem"}},"Footer")])],-1)})),u=i((function(){return(0,n._)("h5",null,"12列布局",-1)})),d={class:"au-layout demo"},h=i((function(){return(0,n._)("div",{class:"rows"},[(0,n._)("div",{class:"cols s12"},[(0,n._)("div",{class:"demo"})])],-1)})),m=i((function(){return(0,n._)("div",{class:"rows"},[(0,n._)("div",{class:"cols s6"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s6"},[(0,n._)("div",{class:"demo"})])],-1)})),f={class:"rows"},p={class:"cols s4"},v=i((function(){return(0,n._)("div",{class:"demo"},null,-1)})),_=[v],g={class:"rows"},w={class:"cols s3"},y=i((function(){return(0,n._)("div",{class:"demo"},null,-1)})),x=[y],k={class:"rows"},P={class:"cols s2"},C=i((function(){return(0,n._)("div",{class:"demo"},null,-1)})),W=[C],S={class:"rows"},b={class:"cols s1"},D=i((function(){return(0,n._)("div",{class:"demo"},null,-1)})),T=[D],M=i((function(){return(0,n._)("h5",null,"列偏移",-1)})),L=i((function(){return(0,n._)("div",{class:"au-layout demo"},[(0,n._)("div",{class:"rows"},[(0,n._)("div",{class:"cols s3 offset3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3 offset3"},[(0,n._)("div",{class:"demo"})])]),(0,n._)("div",{class:"rows"},[(0,n._)("div",{class:"cols s4 offset1"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s4 offset1"},[(0,n._)("div",{class:"demo"})])])],-1)})),E=i((function(){return(0,n._)("h5",null,"分栏间隔",-1)})),$={class:"au-layout demo"},J=i((function(){return(0,n._)("div",{class:"rows gutter-l"},[(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})])],-1)})),I=i((function(){return(0,n._)("div",{class:"rows gutter-l"},[(0,n._)("div",{class:"cols s3 offset3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3 offset3"},[(0,n._)("div",{class:"demo"})])],-1)})),Z=i((function(){return(0,n._)("div",{class:"rows gutter-s"},[(0,n._)("div",{class:"cols s2"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s2"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s4"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s4"},[(0,n._)("div",{class:"demo"})])],-1)})),z=i((function(){return(0,n._)("div",{class:"rows gutter-s"},[(0,n._)("div",{class:"cols s4 offset1"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3 offset3"},[(0,n._)("div",{class:"demo"})])],-1)})),H={class:"rows gutter-s"},N={class:"cols s1"},U=i((function(){return(0,n._)("div",{class:"demo"},null,-1)})),j=[U],q=i((function(){return(0,n._)("h5",null,"对齐方式",-1)})),Y=i((function(){return(0,n._)("div",{class:"au-layout demo"},[(0,n._)("div",{class:"rows start"},[(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})])]),(0,n._)("div",{class:"rows center"},[(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})])]),(0,n._)("div",{class:"rows end"},[(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})])]),(0,n._)("div",{class:"rows space-between"},[(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})])]),(0,n._)("div",{class:"rows space-around"},[(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})])]),(0,n._)("div",{class:"rows space-evenly"},[(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})]),(0,n._)("div",{class:"cols s3"},[(0,n._)("div",{class:"demo"})])])],-1)})),R={class:"content"},B=i((function(){return(0,n._)("h5",null,"calender",-1)})),K={class:"content"},A=i((function(){return(0,n._)("h5",null,"input",-1)})),O={class:"content"},V={class:"content"},F=i((function(){return(0,n._)("h5",null,"select",-1)})),X={class:"content"},G=i((function(){return(0,n._)("h5",null,"input",-1)})),Q=i((function(){return(0,n._)("div",{class:"content"},[(0,n._)("input",{type:"text",value:"text",placeholder:"placeholder"}),(0,n._)("input",{type:"password",value:"password"})],-1)})),tt={class:"content"},et=i((function(){return(0,n._)("div",{class:"content"},[(0,n._)("input",{type:"button",value:"button"}),(0,n._)("input",{type:"button",class:"fill",value:"fill"}),(0,n._)("input",{type:"button",class:"circle",value:"circle"}),(0,n._)("input",{type:"button",class:"circle fill",value:"circle fill"})],-1)})),st=i((function(){return(0,n._)("div",{class:"content"},[(0,n._)("input",{type:"range",min:"0",max:"100",value:"20"})],-1)})),nt=i((function(){return(0,n._)("div",{class:"content"},[(0,n._)("input",{type:"checkbox",checked:""}),(0,n._)("input",{type:"checkbox"}),(0,n._)("input",{type:"checkbox",class:"circle",checked:""}),(0,n._)("input",{type:"checkbox",class:"circle"})],-1)})),ot=i((function(){return(0,n._)("div",{class:"content"},[(0,n._)("input",{type:"radio",name:"test",checked:""}),(0,n._)("input",{type:"radio",name:"test"}),(0,n._)("input",{type:"radio",name:"test"})],-1)})),at=i((function(){return(0,n._)("div",{class:"content"},[(0,n._)("input",{type:"date"}),(0,n._)("input",{type:"month"}),(0,n._)("input",{type:"time"}),(0,n._)("input",{type:"datetime-local",style:{width:"150px"}})],-1)})),it=i((function(){return(0,n._)("h5",null,"button",-1)})),ct=i((function(){return(0,n._)("div",{class:"content"},[(0,n._)("button",null,"button"),(0,n._)("button",{class:"fill"},"button"),(0,n._)("button",{class:"circle"},"circle"),(0,n._)("button",{class:"circle fill"},"circle fill")],-1)})),rt=i((function(){return(0,n._)("h5",null,"textarea",-1)})),lt=i((function(){return(0,n._)("div",{class:"content"},[(0,n._)("textarea",{placeholder:"这是一个textarea...",cols:"30",rows:"5"})],-1)})),ut=i((function(){return(0,n._)("h5",null,"Slider",-1)})),dt={class:"content",style:{width:"200px"}};function ht(t,e,s,i,v,y){var C=(0,n.up)("cpt-view"),D=(0,n.up)("highlightjs"),U=(0,n.up)("TheLatex2Math"),ht=(0,n.up)("JsonModel"),mt=(0,n.up)("pagination"),ft=(0,n.up)("md-loader"),pt=(0,n.up)("timer"),vt=(0,n.up)("svg-icon"),_t=(0,n.up)("calender"),gt=(0,n.up)("au-select"),wt=(0,n.up)("au-slider");return(0,n.wg)(),(0,n.iD)("div",c,[(0,n.Wm)(C,{name:"Container布局"},{default:(0,n.w5)((function(){return[r,l]})),_:1}),(0,n.Wm)(C,{name:"Layout"},{default:(0,n.w5)((function(){return[u,(0,n._)("div",d,[h,m,(0,n._)("div",f,[((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(3,(function(t){return(0,n._)("div",p,_)})),64))]),(0,n._)("div",g,[((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(4,(function(t){return(0,n._)("div",w,x)})),64))]),(0,n._)("div",k,[((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(6,(function(t){return(0,n._)("div",P,W)})),64))]),(0,n._)("div",S,[((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(12,(function(t){return(0,n._)("div",b,T)})),64))])]),M,L,E,(0,n._)("div",$,[J,I,Z,z,(0,n._)("div",H,[((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(12,(function(t){return(0,n._)("div",N,j)})),64))])]),q,Y]})),_:1}),(0,n.Wm)(C,{name:"公式组件"},{default:(0,n.w5)((function(){return[(0,n.Wm)(D,{language:"html",code:"<TheLatex2Math :latex=\"'E = MC^{2}'\" />"}),(0,n.Wm)(U,{latex:"E = MC^{2}"})]})),_:1}),(0,n.Wm)(C,{name:"Json组件"},{default:(0,n.w5)((function(){return[(0,n.Wm)(D,{language:"html",code:'<JsonModel json-data="jsonData"></JsonModel>'}),(0,n.Wm)(ht,{jsonData:v.jsonData},null,8,["jsonData"])]})),_:1}),(0,n.Wm)(C,{name:"Toast"},{default:(0,n.w5)((function(){return[(0,n.Wm)(D,{language:"javascript",code:"this.$toast.show('Hello, world!','info');"}),(0,n.wy)((0,n._)("input",{type:"text",placeholder:"请输入消息文本","onUpdate:modelValue":e[0]||(e[0]=function(t){return v.toastMsg=t})},null,512),[[o.nr,v.toastMsg]]),(0,n._)("input",{type:"button",value:"展示toast",onClick:e[1]||(e[1]=function(){return y.showToast&&y.showToast.apply(y,arguments)})})]})),_:1}),(0,n.Wm)(C,{name:"分页控件"},{default:(0,n.w5)((function(){return[(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[2]||(e[2]=function(t){return v.totalPages=t}),type:"text"},null,512),[[o.nr,v.totalPages]]),(0,n.Wm)(mt,{class:"left",totalPages:v.totalPages},null,8,["totalPages"])]})),_:1}),(0,n.Wm)(C,{name:"Markdown Loader"},{default:(0,n.w5)((function(){return[(0,n.Wm)(ft,{mdFileName:"更新文档"})]})),_:1}),(0,n.Wm)(C,{name:"计时器"},{default:(0,n.w5)((function(){return[(0,n._)("div",R,[(0,n.Wm)(pt,{ref:"helloworldtimer"},null,512),(0,n._)("button",{onClick:e[3]||(e[3]=function(){var t;return v.helloworldtimer.startTimer&&(t=v.helloworldtimer).startTimer.apply(t,arguments)}),class:"circle"},[(0,n.Wm)(vt,{name:"play01",size:"16"})]),(0,n._)("button",{onClick:e[4]||(e[4]=function(){var t;return v.helloworldtimer.pause&&(t=v.helloworldtimer).pause.apply(t,arguments)}),class:"circle fill"},[(0,n.Wm)(vt,{name:"pause01",size:"16"})]),(0,n._)("button",{onClick:e[5]||(e[5]=function(){var t;return v.helloworldtimer.resetTimer&&(t=v.helloworldtimer).resetTimer.apply(t,arguments)}),class:"circle fill"},[(0,n.Wm)(vt,{name:"stop01",size:"16"})])])]})),_:1}),(0,n.Wm)(C,{name:"日历"},{default:(0,n.w5)((function(){return[B,(0,n._)("div",K,[(0,n.Wm)(_t,{language:"EN",style:{width:"100%"}})]),A,(0,n.Wm)(D,{language:"html",code:'<calender language="EN" type="input" ></calender>'}),(0,n._)("div",O,[(0,n.Wm)(_t,{language:"EN",type:"input",style:{width:"150px"}})]),(0,n.Wm)(D,{language:"html",code:'<calender language="EN" type="datetime" ></calender>'}),(0,n._)("div",V,[(0,n.Wm)(_t,{language:"EN",type:"datetime",style:{width:"150px"}})])]})),_:1}),(0,n.Wm)(C,{name:"Select"},{default:(0,n.w5)((function(){return[F,(0,n._)("div",X,[(0,n.Wm)(gt,{dataList:v.selectList},null,8,["dataList"])])]})),_:1}),(0,n.Wm)(C,{name:"表单样式"},{default:(0,n.w5)((function(){return[G,Q,(0,n._)("div",tt,[(0,n.wy)((0,n._)("input",{type:"color","onUpdate:modelValue":e[6]||(e[6]=function(t){return v.mainColor=t})},null,512),[[o.nr,v.mainColor]])]),et,st,nt,ot,at,it,ct,rt,lt]})),_:1}),(0,n.Wm)(C,{name:"Slider"},{default:(0,n.w5)((function(){return[ut,(0,n._)("div",null,(0,a.zw)(v.sliderData),1),(0,n._)("div",dt,[(0,n.Wm)(wt,{data:v.sliderData,step:5,onChange:y.setSliderData},null,8,["data","onChange"])])]})),_:1})])}var mt=s(76451),ft=s(81557),pt=s(8502),vt=(s(6131),s(97183)),_t=s(64626),gt=(s(68309),{style:{padding:"0 5px 8px 5px"}});function wt(t,e,s,o,i,c){var r=(0,n.up)("svg-icon");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("h4",{onClick:e[0]||(e[0]=function(t){return c.openContent()})},[(0,n.Uk)((0,a.zw)(s.name)+" ",1),(0,n.Wm)(r,{class:"component-botton",name:"arrow-right",size:"16"})]),(0,n._)("div",{class:(0,a.C_)({"component-content":!0,close:!i.show}),ref:"content"},[(0,n._)("div",gt,[(0,n.WI)(t.$slots,"default",{},void 0,!0)])],2)],64)}var yt={props:{name:{type:String,required:!0},defaultShow:{type:Boolean,default:!1}},data:function(){return{show:!1,height:0}},mounted:function(){this.show=this.defaultShow,this.show||(this.$refs.content.style.height="0px")},methods:{openContent:function(){this.show=!this.show;var t=this.$refs.content;if(this.show){this.height=this.$refs.content.firstChild.clientHeight+8;var e=this.height+"px";t.style.height=e,setTimeout((function(){t.style.overflow="unset"}),300)}else t.style.height="0px",t.style.overflow="hidden"}}},xt=s(48998);const kt=(0,xt.Z)(yt,[["render",wt],["__scopeId","data-v-7490aec2"]]);var Pt=kt,Ct=s(46086),Wt=s(79241),St=s(10300),bt={name:"HelloWorld",components:{TheLatex2Math:mt.Z,JsonModel:ft.Z,pagination:pt.Z,pencanvas:vt.Z,timer:_t.Z,cptView:Pt,calender:Ct.Z,auSelect:Wt.Z,auSlider:St.Z},data:function(){return{jsonData:{name:"John",age:{name:"John",age:30}},toastType:0,mainColor:"#ffc848",totalPages:6,helloworldtimer:null,htmlcontent:'<span class="output">$$\\frac{1}{2}$$</span><span class="output">$$\\sqrt{3}$$</span>',selectList:["item 1","item 2","item 3","item 4","item 5","item 6","item 7"],toastMsg:null,sliderData:20}},watch:{mainColor:function(t,e){document.documentElement.style.setProperty("--main-color",t)}},mounted:function(){this.helloworldtimer=this.$refs.helloworldtimer,this.TypeSet([document.getElementsByClassName("output")])},methods:{showToast:function(){var t=["success","info","warn","error"];null==this.toastMsg&&(this.toastMsg="Hello World!This is a message."),this.$toast.show(this.toastMsg,t[this.toastType]),console.log(t[this.toastType]),this.toastType=this.toastType>2?0:++this.toastType},TypeSet:function(t){if(window.MathJax)return window.MathJax.startup.promise.then((function(){return window.MathJax.typesetPromise(t)})).catch((function(t){return console.log("Typeset failed: "+t.message)})),window.MathJax.startup.promise;console.log("no window.MathJax")},setSliderData:function(t){this.sliderData=t}}};const Dt=(0,xt.Z)(bt,[["render",ht],["__scopeId","data-v-64e15ca4"]]);var Tt=Dt},8502:function(t,e,s){s.d(e,{Z:function(){return d}});var n=s(19812),o=s(55893),a={class:"page-box",ref:"pageBox"},i=["onClick"];function c(t,e,s,c,r,l){var u=(0,n.up)("svg-icon");return(0,n.wg)(),(0,n.iD)("div",a,[(0,n.Wm)(u,{onClick:e[0]||(e[0]=function(t){return l.pre()}),name:"arrow-left",fill:"#ffc848",size:"34"}),r.currentPage>3&&s.totalPages>10?((0,n.wg)(),(0,n.iD)("div",{key:0,class:"page-item",onClick:e[1]||(e[1]=function(t){return l.toPage(1)})},"1")):(0,n.kq)("",!0),r.currentPage>4&&s.totalPages>10?((0,n.wg)(),(0,n.iD)("div",{key:1,class:"page-item more",onClick:e[2]||(e[2]=function(t){return l.pre(5)})},[(0,n.Wm)(u,{name:"more"})])):(0,n.kq)("",!0),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.currentList,(function(t){return(0,n.wg)(),(0,n.iD)("div",{class:(0,o.C_)({"page-item":!0,active:t==r.currentPage}),onClick:function(e){return l.toPage(t)}},(0,o.zw)(t),11,i)})),256)),r.currentPage<s.totalPages-3&&s.totalPages>10?((0,n.wg)(),(0,n.iD)("div",{key:2,class:"page-item more",onClick:e[3]||(e[3]=function(t){return l.next(5)})},[(0,n.Wm)(u,{name:"more"})])):(0,n.kq)("",!0),r.currentPage<s.totalPages-2&&s.totalPages>10?((0,n.wg)(),(0,n.iD)("div",{key:3,class:"page-item",onClick:e[4]||(e[4]=function(t){return l.toPage(s.totalPages)})},(0,o.zw)(s.totalPages),1)):(0,n.kq)("",!0),(0,n.Wm)(u,{onClick:e[5]||(e[5]=function(t){return l.next()}),name:"arrow-right",fill:"#ffc848",size:"34"})],512)}s(9653),s(57658);var r={props:{totalPages:{type:Number,required:!0}},data:function(){return{currentPage:1,currentList:[]}},mounted:function(){if(this.totalPages>10)this.currentList=[1,2,3,4,5];else for(var t=1;t<=this.totalPages;t++)this.currentList.push(t)},methods:{pre:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.currentPage>t&&(this.currentPage-=t,this.$emit("page-change",this.currentPage)),this.totalPages>10&&this.refreshlist()},next:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.currentPage<this.totalPages+1-t&&(this.currentPage+=t,this.$emit("page-change",this.currentPage)),this.totalPages>10&&this.refreshlist()},toPage:function(t){this.currentPage!=t&&(this.currentPage=t,this.$emit("page-change",this.currentPage)),this.totalPages>10&&this.refreshlist()},refreshlist:function(){if(this.currentList=[],this.totalPages-this.currentPage<2)for(var t=this.totalPages-4;t<=this.totalPages;t++)this.currentList.push(t);else if(this.currentPage<=3)this.currentList=[1,2,3,4,5];else for(t=this.currentPage-2;t<=this.currentPage+2;t++)this.currentList.push(t)}}},l=s(48998);const u=(0,l.Z)(r,[["render",c],["__scopeId","data-v-00c15e6e"]]);var d=u},79241:function(t,e,s){s.d(e,{Z:function(){return d}});var n=s(19812),o=s(55893),a={class:"select-box",ref:"selectBox"},i=["onClick"];function c(t,e,s,c,r,l){var u=(0,n.up)("svg-icon");return(0,n.wg)(),(0,n.iD)("div",a,[(0,n._)("div",{class:(0,o.C_)({"input-area":!0,active:r.selectShow}),onClick:e[0]||(e[0]=function(){return l.openSelect&&l.openSelect.apply(l,arguments)})},[(0,n.Uk)((0,o.zw)(s.dataList[r.currIndex])+" ",1),(0,n.Wm)(u,{name:"arrow-down",size:"16",class:(0,o.C_)({icon:!0,show:r.selectShow})},null,8,["class"])],2),(0,n._)("div",{class:(0,o.C_)({"select-item-group":!0,show:r.selectShow}),ref:"options"},[(0,n._)("div",{class:(0,o.C_)({options:!0,show:r.selectShow})},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.dataList,(function(t,e){return(0,n.wg)(),(0,n.iD)("div",{class:(0,o.C_)({"select-item":!0,active:e==r.currIndex}),onClick:function(t){return l.changeIndex(e)}},(0,o.zw)(t),11,i)})),256))],2)],2)],512)}var r={props:{dataList:{type:Array,required:!0}},data:function(){return{selectShow:!1,currIndex:0}},mounted:function(){},unmounted:function(){document.removeEventListener("click",this.closeSelect)},methods:{openSelect:function(){this.selectShow?(this.selectShow=!1,document.removeEventListener("click",this.closeSelect)):(this.selectShow=!0,document.addEventListener("click",this.closeSelect))},closeSelect:function(){this.$refs.selectBox.contains(event.target)||(this.selectShow=!1,document.removeEventListener("click",this.closeSelect))},changeIndex:function(t){this.currIndex=t,this.selectShow=!1,document.removeEventListener("click",this.closeSelect),this.$emit("change",this.currIndex)}}},l=s(48998);const u=(0,l.Z)(r,[["render",c],["__scopeId","data-v-2ee630a8"]]);var d=u},76451:function(t,e,s){s.d(e,{Z:function(){return h}});var n=s(19812),o=s(55893),a={class:"output"};function i(t,e,s,i,c,r){return(0,n.wg)(),(0,n.iD)("span",a,"$$"+(0,o.zw)(s.latex)+"$$",1)}var c=s(80543),r=s(81448),l={name:"TheLate2Math",props:{latex:{type:String,required:!0}},setup:function(t){var e=function(){var t=(0,r.Z)((0,c.Z)().mark((function t(e){return(0,c.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(console.log(window.MathJax,"//window.MathJax"),window.MathJax){t.next=3;break}return t.abrupt("return");case 3:return window.MathJax.startup.promise.then((function(){return window.MathJax.typesetPromise(e)})).catch((function(t){return console.log("Typeset failed: "+t.message)})),t.abrupt("return",window.MathJax.startup.promise);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,n.bv)((function(){e()})),(0,n.YP)((function(){return t.latex}),(function(){e([document.getElementsByClassName("output")])})),{}}},u=s(48998);const d=(0,u.Z)(l,[["render",i]]);var h=d}}]);
//# sourceMappingURL=2194-legacy.36bcdf37.js.map