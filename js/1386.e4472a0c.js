"use strict";(self["webpackChunkaugest"]=self["webpackChunkaugest"]||[]).push([[1386],{6131:function(e,t,s){s.d(t,{yU:function(){return c}});const a={name:"markethuang:xctest",pwd:"c34dd995a8132605764a9347dae6e8ca"},l=["","https://xuece-xqdsj-stagingtest1.unisolution.cn/","https://xuece-xqdsj-stagingtest2.unisolution.cn/"];let o="",i=19;function n(e){var t=l[e]+"api/usercenter/nnauth/user/login?username="+a.name+"&encryptpwd="+a.pwd+"&clienttype=BROWSER&clientversion=1.25.7&systemversion=chrome122.0.0.0";return new Promise(((e,s)=>{fetch(t).then((e=>{if(!e.ok)throw new Error("Network response was not ok");return e.json()})).then((t=>{o=t.data.authtoken,i=t.data.user.schoolId;const s=JSON.stringify({token:o,schoolId:i});d("xuecelogin",s,30),e(!0)})).catch((e=>{console.error("There was a problem with your fetch operation:",e),s(e)}))}))}function c(e,t,s){var a=l[e]+"api/examcenter/teacher/answercard/editinfo?exampaperId="+s;1==t&&(a=l[e]+"api/classworkcenter/teacher/classwork/answercard/get?classworkId="+s);const o=r("xuecelogin");var i=null;return o?i=JSON.parse(o):n(e).then(i=JSON.parse(o)).catch((e=>{console.error("There was a problem with your fetch operation:",e)})),new Promise(((l,o)=>{fetch(a,{method:"GET",headers:{Authtoken:i.token,"Xc-App-User-Schoolid":i.schoolId}}).then((e=>{if(!e.ok)throw new Error("Network response was not ok");return console.log(e),e.json()})).then((a=>{if("AUTH_EXPIRED"==a.code)n(e).then(c(e,t,s)).catch((e=>{throw new Error(e)}));else{if("ERROR"==a.code||"FAILURE"==a.code)throw new Error("未找到考试或作业");var o="",i="";1==t?(o=a.data[0].answercard.cutParamJsonStr,i=a.data[0].answercard.pdfUrl):(o=a.data.cutparamJsonstr2,i=a.data.pdfUrl),l([o,i])}})).catch((e=>{o(e)}))}))}function d(e,t,s){const a=new Date;a.setTime(a.getTime()+24*s*60*60*1e3);const l="expires="+a.toUTCString();document.cookie=e+"="+t+";"+l+";path=/"}function r(e){const t=e+"=",s=decodeURIComponent(document.cookie),a=s.split(";");for(let l=0;l<a.length;l++){let e=a[l];while(" "===e.charAt(0))e=e.substring(1);if(0===e.indexOf(t))return e.substring(t.length,e.length)}return""}},5294:function(e,t,s){s.r(t),s.d(t,{default:function(){return Ue}});var a=s(9812),l=s(4220),o=s(5893);const i=e=>((0,a.dD)("data-v-be23d930"),e=e(),(0,a.Cn)(),e),n={class:"container left",style:{height:"auto"}},c=i((()=>(0,a._)("h5",null,"基本布局",-1))),d=i((()=>(0,a._)("div",{class:"au-layout demo"},[(0,a._)("div",{class:"au-container"},[(0,a._)("div",{class:"au-header demo",style:{height:"4rem"}},"Header"),(0,a._)("div",{class:"au-main demo",style:{height:"12rem"}},"Main"),(0,a._)("div",{class:"au-footer demo",style:{height:"4rem"}},"Footer")])],-1))),r=i((()=>(0,a._)("h5",null,"12列布局",-1))),u={class:"au-layout demo"},h=i((()=>(0,a._)("div",{class:"rows"},[(0,a._)("div",{class:"cols s12"},[(0,a._)("div",{class:"demo"})])],-1))),m=i((()=>(0,a._)("div",{class:"rows"},[(0,a._)("div",{class:"cols s6"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s6"},[(0,a._)("div",{class:"demo"})])],-1))),p={class:"rows"},v={class:"cols s4"},g=i((()=>(0,a._)("div",{class:"demo"},null,-1))),_=[g],w={class:"rows"},f={class:"cols s3"},y=i((()=>(0,a._)("div",{class:"demo"},null,-1))),x=[y],k={class:"rows"},P={class:"cols s2"},W=i((()=>(0,a._)("div",{class:"demo"},null,-1))),b=[W],D={class:"rows"},C={class:"cols s1"},S=i((()=>(0,a._)("div",{class:"demo"},null,-1))),T=[S],L=i((()=>(0,a._)("h5",null,"列偏移",-1))),E=i((()=>(0,a._)("div",{class:"au-layout demo"},[(0,a._)("div",{class:"rows"},[(0,a._)("div",{class:"cols s3 offset3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3 offset3"},[(0,a._)("div",{class:"demo"})])]),(0,a._)("div",{class:"rows"},[(0,a._)("div",{class:"cols s4 offset1"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s4 offset1"},[(0,a._)("div",{class:"demo"})])])],-1))),M=i((()=>(0,a._)("h5",null,"分栏间隔",-1))),$={class:"au-layout demo"},J=i((()=>(0,a._)("div",{class:"rows gutter-l"},[(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})])],-1))),I=i((()=>(0,a._)("div",{class:"rows gutter-l"},[(0,a._)("div",{class:"cols s3 offset3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3 offset3"},[(0,a._)("div",{class:"demo"})])],-1))),Z=i((()=>(0,a._)("div",{class:"rows gutter-s"},[(0,a._)("div",{class:"cols s2"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s2"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s4"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s4"},[(0,a._)("div",{class:"demo"})])],-1))),V=i((()=>(0,a._)("div",{class:"rows gutter-s"},[(0,a._)("div",{class:"cols s4 offset1"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3 offset3"},[(0,a._)("div",{class:"demo"})])],-1))),U={class:"rows gutter-s"},z={class:"cols s1"},H=i((()=>(0,a._)("div",{class:"demo"},null,-1))),q=[H],N=i((()=>(0,a._)("h5",null,"对齐方式",-1))),j=i((()=>(0,a._)("div",{class:"au-layout demo"},[(0,a._)("div",{class:"rows start"},[(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})])]),(0,a._)("div",{class:"rows center"},[(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})])]),(0,a._)("div",{class:"rows end"},[(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})])]),(0,a._)("div",{class:"rows space-between"},[(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})])]),(0,a._)("div",{class:"rows space-around"},[(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})])]),(0,a._)("div",{class:"rows space-evenly"},[(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})]),(0,a._)("div",{class:"cols s3"},[(0,a._)("div",{class:"demo"})])])],-1))),Y={class:"content"},B=i((()=>(0,a._)("h5",null,"calender",-1))),K={class:"content"},R=i((()=>(0,a._)("h5",null,"input",-1))),A={class:"content"},O={class:"content"},X=i((()=>(0,a._)("h5",null,"select",-1))),F={class:"content"},G=i((()=>(0,a._)("h5",null,"input",-1))),Q=i((()=>(0,a._)("div",{class:"content"},[(0,a._)("input",{type:"text",value:"text",placeholder:"placeholder"}),(0,a._)("input",{type:"password",value:"password"})],-1))),ee={class:"content"},te=i((()=>(0,a._)("div",{class:"content"},[(0,a._)("input",{type:"button",value:"button"}),(0,a._)("input",{type:"button",class:"fill",value:"fill"}),(0,a._)("input",{type:"button",class:"circle",value:"circle"}),(0,a._)("input",{type:"button",class:"circle fill",value:"circle fill"})],-1))),se=i((()=>(0,a._)("div",{class:"content"},[(0,a._)("input",{type:"range",min:"0",max:"100",value:"20"})],-1))),ae=i((()=>(0,a._)("div",{class:"content"},[(0,a._)("input",{type:"checkbox",checked:""}),(0,a._)("input",{type:"checkbox"}),(0,a._)("input",{type:"checkbox",class:"circle",checked:""}),(0,a._)("input",{type:"checkbox",class:"circle"})],-1))),le=i((()=>(0,a._)("div",{class:"content"},[(0,a._)("input",{type:"radio",name:"test",checked:""}),(0,a._)("input",{type:"radio",name:"test"}),(0,a._)("input",{type:"radio",name:"test"})],-1))),oe=i((()=>(0,a._)("div",{class:"content"},[(0,a._)("input",{type:"date"}),(0,a._)("input",{type:"month"}),(0,a._)("input",{type:"time"}),(0,a._)("input",{type:"datetime-local",style:{width:"150px"}})],-1))),ie=i((()=>(0,a._)("h5",null,"button",-1))),ne=i((()=>(0,a._)("div",{class:"content"},[(0,a._)("button",null,"button"),(0,a._)("button",{class:"fill"},"button"),(0,a._)("button",{class:"circle"},"circle"),(0,a._)("button",{class:"circle fill"},"circle fill")],-1))),ce=i((()=>(0,a._)("h5",null,"textarea",-1))),de=i((()=>(0,a._)("div",{class:"content"},[(0,a._)("textarea",{placeholder:"这是一个textarea...",cols:"30",rows:"5"})],-1))),re=i((()=>(0,a._)("h5",null,"Slider",-1))),ue={class:"content",style:{width:"200px"}},he={class:"content",style:{width:"200px"}},me=i((()=>(0,a._)("h5",null,"Switch",-1))),pe={class:"content"},ve={class:"content"},ge={class:"content"},_e={style:{width:"100%",height:"400px",border:"var(--box-border)",position:"relative"}},we=i((()=>(0,a._)("div",{style:{width:"200px"}}," 这是一个可拖拽组件 ",-1)));function fe(e,t,s,i,g,y){const W=(0,a.up)("cpt-view"),S=(0,a.up)("highlightjs"),H=(0,a.up)("TheLatex2Math"),fe=(0,a.up)("JsonModel"),ye=(0,a.up)("pagination"),xe=(0,a.up)("md-loader"),ke=(0,a.up)("timer"),Pe=(0,a.up)("svg-icon"),We=(0,a.up)("calender"),be=(0,a.up)("au-select"),De=(0,a.up)("au-slider"),Ce=(0,a.up)("au-switch"),Se=(0,a.up)("auDraged");return(0,a.wg)(),(0,a.iD)("div",n,[(0,a.Wm)(W,{name:"Container布局"},{default:(0,a.w5)((()=>[c,d])),_:1}),(0,a.Wm)(W,{name:"Layout"},{default:(0,a.w5)((()=>[r,(0,a._)("div",u,[h,m,(0,a._)("div",p,[((0,a.wg)(),(0,a.iD)(a.HY,null,(0,a.Ko)(3,(e=>(0,a._)("div",v,_))),64))]),(0,a._)("div",w,[((0,a.wg)(),(0,a.iD)(a.HY,null,(0,a.Ko)(4,(e=>(0,a._)("div",f,x))),64))]),(0,a._)("div",k,[((0,a.wg)(),(0,a.iD)(a.HY,null,(0,a.Ko)(6,(e=>(0,a._)("div",P,b))),64))]),(0,a._)("div",D,[((0,a.wg)(),(0,a.iD)(a.HY,null,(0,a.Ko)(12,(e=>(0,a._)("div",C,T))),64))])]),L,E,M,(0,a._)("div",$,[J,I,Z,V,(0,a._)("div",U,[((0,a.wg)(),(0,a.iD)(a.HY,null,(0,a.Ko)(12,(e=>(0,a._)("div",z,q))),64))])]),N,j])),_:1}),(0,a.Wm)(W,{name:"公式组件"},{default:(0,a.w5)((()=>[(0,a.Wm)(S,{language:"html",code:"<TheLatex2Math :latex=\"'E = MC^{2}'\" />"}),(0,a.Wm)(H,{latex:"E = MC^{2}"})])),_:1}),(0,a.Wm)(W,{name:"Json组件"},{default:(0,a.w5)((()=>[(0,a.Wm)(S,{language:"html",code:'<JsonModel json-data="jsonData"></JsonModel>'}),(0,a.Wm)(fe,{jsonData:g.jsonData},null,8,["jsonData"])])),_:1}),(0,a.Wm)(W,{name:"Toast"},{default:(0,a.w5)((()=>[(0,a.Wm)(S,{language:"javascript",code:"this.$toast.show('Hello, world!','info');"}),(0,a.wy)((0,a._)("input",{type:"text",placeholder:"请输入消息文本","onUpdate:modelValue":t[0]||(t[0]=e=>g.toastMsg=e)},null,512),[[l.nr,g.toastMsg]]),(0,a._)("input",{type:"button",value:"展示toast",onClick:t[1]||(t[1]=(...e)=>y.showToast&&y.showToast(...e))})])),_:1}),(0,a.Wm)(W,{name:"分页控件"},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":t[2]||(t[2]=e=>g.totalPages=e),type:"text"},null,512),[[l.nr,g.totalPages]]),(0,a.Wm)(ye,{class:"left",totalPages:g.totalPages},null,8,["totalPages"])])),_:1}),(0,a.Wm)(W,{name:"Markdown Loader"},{default:(0,a.w5)((()=>[(0,a.Wm)(xe,{mdFileName:"更新文档"})])),_:1}),(0,a.Wm)(W,{name:"计时器"},{default:(0,a.w5)((()=>[(0,a._)("div",Y,[(0,a.Wm)(ke,{ref:"helloworldtimer"},null,512),(0,a._)("button",{onClick:t[3]||(t[3]=(...e)=>g.helloworldtimer.startTimer&&g.helloworldtimer.startTimer(...e)),class:"circle"},[(0,a.Wm)(Pe,{name:"play01",size:"16"})]),(0,a._)("button",{onClick:t[4]||(t[4]=(...e)=>g.helloworldtimer.pause&&g.helloworldtimer.pause(...e)),class:"circle fill"},[(0,a.Wm)(Pe,{name:"pause01",size:"16"})]),(0,a._)("button",{onClick:t[5]||(t[5]=(...e)=>g.helloworldtimer.resetTimer&&g.helloworldtimer.resetTimer(...e)),class:"circle fill"},[(0,a.Wm)(Pe,{name:"stop01",size:"16"})])])])),_:1}),(0,a.Wm)(W,{name:"日历"},{default:(0,a.w5)((()=>[B,(0,a._)("div",K,[(0,a.Wm)(We,{language:"EN",style:{width:"100%"}})]),R,(0,a.Wm)(S,{language:"html",code:'<calender language="EN" type="input" ></calender>'}),(0,a._)("div",A,[(0,a.Wm)(We,{language:"EN",type:"input",style:{width:"150px"}})]),(0,a.Wm)(S,{language:"html",code:'<calender language="EN" type="datetime" ></calender>'}),(0,a._)("div",O,[(0,a.Wm)(We,{language:"EN",type:"datetime",style:{width:"150px"}})])])),_:1}),(0,a.Wm)(W,{name:"Select"},{default:(0,a.w5)((()=>[X,(0,a._)("div",F,[(0,a.Wm)(be,{dataList:g.selectList},null,8,["dataList"])])])),_:1}),(0,a.Wm)(W,{name:"表单样式"},{default:(0,a.w5)((()=>[G,Q,(0,a._)("div",ee,[(0,a.wy)((0,a._)("input",{type:"color","onUpdate:modelValue":t[6]||(t[6]=e=>g.mainColor=e)},null,512),[[l.nr,g.mainColor]])]),te,se,ae,le,oe,ie,ne,ce,de])),_:1}),(0,a.Wm)(W,{name:"Slider"},{default:(0,a.w5)((()=>[re,(0,a._)("div",null,(0,o.zw)(g.sliderData),1),(0,a._)("div",ue,[(0,a.Wm)(De,{modelValue:g.sliderData,"onUpdate:modelValue":t[7]||(t[7]=e=>g.sliderData=e),step:1},null,8,["modelValue"])]),(0,a._)("div",he,[(0,a.Wm)(De,{modelValue:g.sliderData,"onUpdate:modelValue":t[8]||(t[8]=e=>g.sliderData=e),step:1},null,8,["modelValue"])])])),_:1}),(0,a.Wm)(W,{name:"Switch"},{default:(0,a.w5)((()=>[me,(0,a._)("div",null,(0,o.zw)(g.switchData),1),(0,a._)("div",pe,[(0,a.Wm)(Ce,{modelValue:g.switchData,"onUpdate:modelValue":t[9]||(t[9]=e=>g.switchData=e),size:"big"},null,8,["modelValue"])]),(0,a._)("div",ve,[(0,a.Wm)(Ce,{modelValue:g.switchData,"onUpdate:modelValue":t[10]||(t[10]=e=>g.switchData=e)},null,8,["modelValue"])]),(0,a._)("div",ge,[(0,a.Wm)(Ce,{modelValue:g.switchData,"onUpdate:modelValue":t[11]||(t[11]=e=>g.switchData=e),size:"small"},null,8,["modelValue"])])])),_:1}),(0,a.Wm)(W,{name:"Draged"},{default:(0,a.w5)((()=>[(0,a._)("div",_e,[(0,a.Wm)(Se,null,{default:(0,a.w5)((()=>[we])),_:1})])])),_:1})])}var ye=s(6451),xe=s(1557),ke=s(8502),Pe=(s(6131),s(6338)),We=s(4626);const be={style:{padding:"0 5px 8px 5px"}};function De(e,t,s,l,i,n){const c=(0,a.up)("svg-icon");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("h4",{onClick:t[0]||(t[0]=e=>n.openContent())},[(0,a.Uk)((0,o.zw)(s.name)+" ",1),(0,a.Wm)(c,{class:"component-botton",name:"arrow-right",size:"16"})]),(0,a._)("div",{class:(0,o.C_)({"component-content":!0,close:!i.show}),ref:"content"},[(0,a._)("div",be,[(0,a.WI)(e.$slots,"default",{},void 0,!0)])],2)],64)}var Ce={props:{name:{type:String,required:!0},defaultShow:{type:Boolean,default:!1}},data(){return{show:!1,height:0}},mounted(){this.show=this.defaultShow,this.show||(this.$refs.content.style.height="0px")},methods:{openContent(){this.show=!this.show;const e=this.$refs.content;if(this.show){this.height=this.$refs.content.firstChild.clientHeight+8;const t=this.height+"px";e.style.height=t,setTimeout((()=>{e.style.overflow="unset"}),300)}else e.style.height="0px",e.style.overflow="hidden"}}},Se=s(8998);const Te=(0,Se.Z)(Ce,[["render",De],["__scopeId","data-v-7490aec2"]]);var Le=Te,Ee=s(6086),Me=s(9241),$e=s(140),Je=s(6769),Ie=s(4903),Ze={name:"HelloWorld",components:{TheLatex2Math:ye.Z,JsonModel:xe.Z,pagination:ke.Z,pencanvas:Pe.Z,timer:We.Z,cptView:Le,calender:Ee.Z,auSelect:Me.Z,auSlider:$e.Z,auSwitch:Je.Z,auDraged:Ie.Z},data(){return{jsonData:{name:"John",age:{name:"John",age:30}},toastType:0,mainColor:"#ffc848",totalPages:6,helloworldtimer:null,htmlcontent:'<span class="output">$$\\frac{1}{2}$$</span><span class="output">$$\\sqrt{3}$$</span>',selectList:["item 1","item 2","item 3","item 4","item 5","item 6","item 7"],toastMsg:null,sliderData:20,switchData:!1}},watch:{mainColor(e,t){document.documentElement.style.setProperty("--main-color",e)}},mounted(){this.helloworldtimer=this.$refs.helloworldtimer,this.TypeSet([document.getElementsByClassName("output")])},methods:{showToast(){var e=["success","info","warn","error"];null==this.toastMsg&&(this.toastMsg="Hello World!This is a message."),this.$toast.show(this.toastMsg,e[this.toastType]),console.log(e[this.toastType]),this.toastType=this.toastType>2?0:++this.toastType},TypeSet(e){if(window.MathJax)return window.MathJax.startup.promise.then((()=>window.MathJax.typesetPromise(e))).catch((e=>console.log("Typeset failed: "+e.message))),window.MathJax.startup.promise;console.log("no window.MathJax")},setSliderData(e){this.sliderData=e}}};const Ve=(0,Se.Z)(Ze,[["render",fe],["__scopeId","data-v-be23d930"]]);var Ue=Ve},8502:function(e,t,s){s.d(t,{Z:function(){return u}});var a=s(9812),l=s(5893);const o={class:"page-box",ref:"pageBox"},i=["onClick"];function n(e,t,s,n,c,d){const r=(0,a.up)("svg-icon");return(0,a.wg)(),(0,a.iD)("div",o,[(0,a.Wm)(r,{onClick:t[0]||(t[0]=e=>d.pre()),name:"arrow-left",fill:"#ffc848",size:"34"}),c.currentPage>3&&s.totalPages>10?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"page-item",onClick:t[1]||(t[1]=e=>d.toPage(1))},"1")):(0,a.kq)("",!0),c.currentPage>4&&s.totalPages>10?((0,a.wg)(),(0,a.iD)("div",{key:1,class:"page-item more",onClick:t[2]||(t[2]=e=>d.pre(5))},[(0,a.Wm)(r,{name:"more"})])):(0,a.kq)("",!0),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.currentList,(e=>((0,a.wg)(),(0,a.iD)("div",{class:(0,l.C_)({"page-item":!0,active:e==c.currentPage}),onClick:t=>d.toPage(e)},(0,l.zw)(e),11,i)))),256)),c.currentPage<s.totalPages-3&&s.totalPages>10?((0,a.wg)(),(0,a.iD)("div",{key:2,class:"page-item more",onClick:t[3]||(t[3]=e=>d.next(5))},[(0,a.Wm)(r,{name:"more"})])):(0,a.kq)("",!0),c.currentPage<s.totalPages-2&&s.totalPages>10?((0,a.wg)(),(0,a.iD)("div",{key:3,class:"page-item",onClick:t[4]||(t[4]=e=>d.toPage(s.totalPages))},(0,l.zw)(s.totalPages),1)):(0,a.kq)("",!0),(0,a.Wm)(r,{onClick:t[5]||(t[5]=e=>d.next()),name:"arrow-right",fill:"#ffc848",size:"34"})],512)}s(7658);var c={props:{totalPages:{type:Number,required:!0}},data(){return{currentPage:1,currentList:[]}},mounted(){if(this.totalPages>10)this.currentList=[1,2,3,4,5];else for(var e=1;e<=this.totalPages;e++)this.currentList.push(e)},methods:{pre(e=1){this.currentPage>e&&(this.currentPage-=e,this.$emit("page-change",this.currentPage)),this.totalPages>10&&this.refreshlist()},next(e=1){this.currentPage<this.totalPages+1-e&&(this.currentPage+=e,this.$emit("page-change",this.currentPage)),this.totalPages>10&&this.refreshlist()},toPage(e){this.currentPage!=e&&(this.currentPage=e,this.$emit("page-change",this.currentPage)),this.totalPages>10&&this.refreshlist()},refreshlist(){if(this.currentList=[],this.totalPages-this.currentPage<2)for(var e=this.totalPages-4;e<=this.totalPages;e++)this.currentList.push(e);else if(this.currentPage<=3)this.currentList=[1,2,3,4,5];else for(e=this.currentPage-2;e<=this.currentPage+2;e++)this.currentList.push(e)}}},d=s(8998);const r=(0,d.Z)(c,[["render",n],["__scopeId","data-v-00c15e6e"]]);var u=r},4903:function(e,t,s){s.d(t,{Z:function(){return m}});var a=s(9812),l=s(5893);const o=e=>((0,a.dD)("data-v-548b4f26"),e=e(),(0,a.Cn)(),e),i=o((()=>(0,a._)("div",{class:"draged-bar-handle"},null,-1))),n=[i],c={class:"modal-slot"};function d(e,t,s,o,i,d){return(0,a.wg)(),(0,a.iD)("div",{class:(0,l.C_)({"au-draged":!0,dragging:i.dragedel,row:1==i.style||3==i.style}),ref:"modal"},[(0,a._)("div",{class:(0,l.C_)({"draged-bar":!0,draged:s.dragable}),onPointerdown:t[0]||(t[0]=e=>d.dragdown(e)),onPointerup:t[1]||(t[1]=(...e)=>d.dragup&&d.dragup(...e))},n,34),(0,a._)("div",c,[(0,a.WI)(e.$slots,"default",{},void 0,!0)])],2)}var r={props:{modalKey:{type:String,required:!0},dragable:{type:Boolean,required:!1,default:!0},modeless:{type:Boolean,required:!1,default:!0}},data(){return{draged:!1,dragedel:null,disx:0,disy:0,left:0,top:0,style:0}},methods:{dragdown(e){this.dragable&&(this.dragedel=this.$refs.modal,this.disx=e.pageX-this.dragedel.offsetLeft,this.disy=e.pageY-this.dragedel.offsetTop,document.addEventListener("pointermove",this.dragmove))},dragup(){this.top<50&&(this.dragedel.style.top="0px",this.style=1),this.left<50&&(this.dragedel.style.left="0px",this.style=4);const e=this.dragedel.parentElement.clientWidth-this.dragedel.clientWidth,t=this.dragedel.parentElement.clientHeight-this.dragedel.clientHeight;this.top>t-50&&(this.dragedel.style.top="unset",this.dragedel.style.bottom="0",this.style=3),this.left>e-50&&(this.dragedel.style.left="unset",this.dragedel.style.right="0",this.style=2),this.dragedel=null,document.removeEventListener("pointermove",this.dragmove)},dragmove(e){this.dragedel&&(this.dragedel.style.bottom="unset",this.dragedel.style.right="unset",this.left=e.pageX-this.disx,this.top=e.pageY-this.disy,this.dragedel.style.left=this.left+"px",this.dragedel.style.top=this.top+"px")}}},u=s(8998);const h=(0,u.Z)(r,[["render",d],["__scopeId","data-v-548b4f26"]]);var m=h},9241:function(e,t,s){s.d(t,{Z:function(){return u}});var a=s(9812),l=s(5893);const o={class:"select-box",ref:"selectBox"},i=["onClick"];function n(e,t,s,n,c,d){const r=(0,a.up)("svg-icon");return(0,a.wg)(),(0,a.iD)("div",o,[(0,a._)("div",{class:(0,l.C_)({"input-area":!0,active:c.selectShow}),onClick:t[0]||(t[0]=(...e)=>d.openSelect&&d.openSelect(...e))},[(0,a.Uk)((0,l.zw)(s.dataList[c.currIndex])+" ",1),(0,a.Wm)(r,{name:"arrow-down",size:"16",class:(0,l.C_)({icon:!0,show:c.selectShow})},null,8,["class"])],2),(0,a._)("div",{class:(0,l.C_)({"select-item-group":!0,show:c.selectShow}),ref:"options"},[(0,a._)("div",{class:(0,l.C_)({options:!0,show:c.selectShow})},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(s.dataList,((e,t)=>((0,a.wg)(),(0,a.iD)("div",{class:(0,l.C_)({"select-item":!0,active:t==c.currIndex}),onClick:e=>d.changeIndex(t)},(0,l.zw)(e),11,i)))),256))],2)],2)],512)}var c={props:{dataList:{type:Array,required:!0}},data(){return{selectShow:!1,currIndex:0}},mounted(){},unmounted(){document.removeEventListener("click",this.closeSelect)},methods:{openSelect(){this.selectShow?(this.selectShow=!1,document.removeEventListener("click",this.closeSelect)):(this.selectShow=!0,document.addEventListener("click",this.closeSelect))},closeSelect(){this.$refs.selectBox.contains(event.target)||(this.selectShow=!1,document.removeEventListener("click",this.closeSelect))},changeIndex(e){this.currIndex=e,this.selectShow=!1,document.removeEventListener("click",this.closeSelect),this.$emit("change",this.currIndex)}}},d=s(8998);const r=(0,d.Z)(c,[["render",n],["__scopeId","data-v-2ee630a8"]]);var u=r},6451:function(e,t,s){s.d(t,{Z:function(){return r}});var a=s(9812),l=s(5893);const o={class:"output"};function i(e,t,s,i,n,c){return(0,a.wg)(),(0,a.iD)("span",o,"$$"+(0,l.zw)(s.latex)+"$$",1)}var n={name:"TheLate2Math",props:{latex:{type:String,required:!0}},setup(e){const t=async function(e){if(console.log(window.MathJax,"//window.MathJax"),window.MathJax)return window.MathJax.startup.promise.then((()=>window.MathJax.typesetPromise(e))).catch((e=>console.log("Typeset failed: "+e.message))),window.MathJax.startup.promise};return(0,a.bv)((()=>{t()})),(0,a.YP)((()=>e.latex),(()=>{t([document.getElementsByClassName("output")])})),{}}},c=s(8998);const d=(0,c.Z)(n,[["render",i]]);var r=d}}]);
//# sourceMappingURL=1386.e4472a0c.js.map