"use strict";(self["webpackChunkaugest"]=self["webpackChunkaugest"]||[]).push([[5713],{6338:function(t,e,s){s.d(e,{Z:function(){return P}});var i=s(9812),o=s(4220),l=s(5893);const n=t=>((0,i.dD)("data-v-eebb7ae8"),t=t(),(0,i.Cn)(),t),a=n((()=>(0,i._)("div",{class:"divider-line"},null,-1))),r={class:"tools-setting-container"},h={class:"content-items"},d=n((()=>(0,i._)("label",null,"画笔大小：",-1))),c={class:"content-items"},u=n((()=>(0,i._)("label",null,"橡皮大小：",-1))),p={class:"content-items"},m=n((()=>(0,i._)("label",null,"画笔颜色：",-1))),v=["onClick"],g={class:"content-items"},f=n((()=>(0,i._)("label",null,"仅触控笔：",-1)));function T(t,e,s,n,T,w){const x=(0,i.up)("svg-icon"),y=(0,i.up)("au-slider"),_=(0,i.up)("au-switch"),b=(0,i.up)("my-model");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.wy)((0,i._)("canvas",{ref:"canvas",onPointerdown:e[0]||(e[0]=(...t)=>w.handlePointerDown&&w.handlePointerDown(...t)),onPointermove:e[1]||(e[1]=(...t)=>w.handlePointerMove&&w.handlePointerMove(...t)),onPointerup:e[2]||(e[2]=(...t)=>w.handlePointerUp&&w.handlePointerUp(...t))},null,544),[[o.F8,s.show]]),(0,i.wy)((0,i._)("div",{class:(0,l.C_)({"edit-tools-box":!0,active:T.editToolsActive||T.modal_show.setting_show}),ref:"dragToolsBar",onPointerover:e[8]||(e[8]=(...t)=>w.handleToolsBarFocus&&w.handleToolsBarFocus(...t)),onPointerleave:e[9]||(e[9]=(...t)=>w.handleToolsBarOut&&w.handleToolsBarOut(...t))},[(0,i._)("div",{class:(0,l.C_)({"edit-tools-item":!0,active:!T.erasing}),onClick:e[3]||(e[3]=t=>w.getcanvastool("pencil"))},[(0,i.Wm)(x,{name:"pencilStub01",size:"20"})],2),(0,i._)("div",{class:(0,l.C_)({"edit-tools-item":!0,active:T.erasing}),onClick:e[4]||(e[4]=t=>w.getcanvastool("eraser"))},[(0,i.Wm)(x,{name:"eraser02",size:"20"})],2),a,(0,i._)("div",{class:"edit-tools-item",onClick:e[5]||(e[5]=t=>T.modal_show.setting_show=!T.modal_show.setting_show)},[(0,i.Wm)(x,{name:"setting02",size:"20"})]),(0,i._)("div",{class:"edit-tools-drag",onPointerdown:e[6]||(e[6]=t=>w.dragdown(t)),onMouseup:e[7]||(e[7]=(...t)=>w.dragup&&w.dragup(...t))},[(0,i.Wm)(x,{style:{"user-select":"none"},name:"drag01",size:"20"})],32)],34),[[o.F8,s.show]]),(0,i.Wm)(b,{show:s.show&&T.modal_show.setting_show,modeless:!0,modalKey:"setting_show"},{default:(0,i.w5)((()=>[(0,i._)("div",r,[(0,i._)("div",h,[d,(0,i.Wm)(y,{modelValue:T.penWidth,"onUpdate:modelValue":e[10]||(e[10]=t=>T.penWidth=t),style:{width:"150px"},max:20},null,8,["modelValue"]),(0,i.Uk)(" "+(0,l.zw)(T.penWidth),1)]),(0,i._)("div",c,[u,(0,i.Wm)(y,{modelValue:T.eraserWidth,"onUpdate:modelValue":e[11]||(e[11]=t=>T.eraserWidth=t),style:{width:"150px"}},null,8,["modelValue"]),(0,i.Uk)((0,l.zw)(T.eraserWidth),1)]),(0,i._)("div",p,[m,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(T.colorList,(t=>((0,i.wg)(),(0,i.iD)("div",{onClick:e=>T.penColor=t,class:"color-item",style:(0,l.j5)({backgroundColor:t,height:t==T.penColor?"20px":"15px"})},null,12,v)))),256))]),(0,i._)("div",g,[f,(0,i.Wm)(_,{modelValue:T.mode,"onUpdate:modelValue":e[12]||(e[12]=t=>T.mode=t)},null,8,["modelValue"]),(0,i.Uk)(" "+(0,l.zw)(T.mode?"开":"关"),1)])])])),_:1},8,["show"])],64)}s(7658);var w=s(5992),x=s(1217),y={props:{show:{type:Boolean,required:!0,default:!1},width:Number,height:Number,switch:Number},components:{auSlider:w.Z,auSwitch:x.Z},watch:{switch(t,e){this.changeCanvas(t,e),console.log(t,e)},show(t,e){t?(this.resize(),document.body.classList.add("none-select")):document.body.classList.remove("none-select")}},data(){return{log:"",mode:!1,isDrawing:!1,drawData:null,isScroll:0,context:null,currentPointerType:null,multiLastPt:{},offsetTop:0,offsetLeft:0,isScroll:!1,startY:0,scrolltop:0,editTools_show:!1,erasing:!1,el:null,points:[],beginPoint:{x:0,y:0},penWidth:5,eraserWidth:40,penColor:"#f00",canvasWidth:0,canvasHeight:0,imgDataList:[],modal_show:{setting_show:!1},colorList:["#000","#f00","#ffa500","#ff0","#90ee90","#87ceeb","#fff"],dragToolsBar:null,disx:0,disy:0,editToolsActive:!1,pressTimer:null,pressTimerNum:0}},mounted(){this.init()},beforeUnmount(){document.body.classList.remove("none-select"),document.removeEventListener("pointermove",this.dragmove),document.removeEventListener("pointerup",this.dragup)},methods:{dragdown(t){this.dragToolsBar||(this.dragToolsBar=this.$refs.dragToolsBar,document.addEventListener("pointermove",this.dragmove),document.addEventListener("pointerup",this.dragup),this.disx=t.pageX-this.dragToolsBar.offsetLeft,this.disy=t.pageY-this.dragToolsBar.offsetTop,this.dragToolsBar.style.right="unset",this.dragToolsBar.style.left=t.pageX-this.disx+"px",this.dragToolsBar.style.top=t.pageY-this.disy+"px")},dragmove(t){this.dragToolsBar&&(this.dragToolsBar.style.left=t.pageX-this.disx+"px",this.dragToolsBar.style.top=t.pageY-this.disy+"px")},dragup(){this.dragToolsBar=null,document.removeEventListener("pointermove",this.dragmove)},resize(t=null){const e=this.$refs.canvas;let s=null;s=null==t?this.context.getImageData(0,0,e.width,e.height):t;const i=this.context.strokeStyle,o=this.context.fillStyle,l=this.context.lineWidth,n=this.context.font,a=this.context.textAlign,r=this.context.textBaseline,h=this.context.globalCompositeOperation;e.width=this.el.clientWidth,e.height=this.el.clientHeight,this.canvasWidth=e.width,this.canvasHeight=e.height,this.context.clearRect(0,0,e.width,e.height),this.context.strokeStyle=i,this.context.fillStyle=o,this.context.lineWidth=l,this.context.font=n,this.context.textAlign=a,this.context.textBaseline=r,this.context.globalCompositeOperation=h,""!=s&&this.context.putImageData(s,0,0)},init(){window.PointerEvent&&(this.log="Pointer events are supported.");const t=this.$refs.canvas,e=t.parentElement;t.width=e.clientWidth,t.height=e.clientHeight,this.canvasWidth=t.width,this.canvasHeight=t.height,this.el=e,this.offsetLeft=e.offsetLeft,this.offsetTop=e.offsetTop,this.context=t.getContext("2d"),this.context.strokeStyle=this.penColor},switchmode(){1==this.mode?this.mode=!1:this.mode=!0},handlePointerDown(t){if(!this.dragToolsBar){this.currentPointerType=t.pointerType,0==this.mode&&"pen"==this.currentPointerType&&(this.mode=!0,this.$toast.show('检测到正在使用触控笔，开启"仅触控笔"模式，可在画板设置中关闭',"info"));var e=t.pointerId;this.multiLastPt[e]={x:t.pageX,y:t.pageY},1==this.mode&&"pen"===this.currentPointerType?(this.scrolltop=this.el.parentElement.scrollTop,this.isDrawing=!0,this.points=[],this.points.push({x:t.pageX,y:t.pageY}),this.beginPoint=this.points[0]):1==this.mode&&"touch"===this.currentPointerType?(this.isScroll=e,this.startY=t.pageY,this.scrolltop=this.el.parentElement.scrollTop):!1===this.mode&&(this.scrolltop=this.el.parentElement.scrollTop,2==Object.keys(this.multiLastPt).length?(this.isDrawing=!1,this.isScroll=e,this.startY=t.pageY):1==Object.keys(this.multiLastPt).length&&(this.isDrawing=!0,this.points=[],this.points.push({x:t.pageX,y:t.pageY}),this.beginPoint=this.points[0]))}},drawLine(t,e,s,i,o){this.context.beginPath(),this.context.moveTo(t.x-i,t.y-o),this.context.quadraticCurveTo(e.x-i,e.y-o,s.x-i,s.y-o),this.context.strokeStyle=this.penColor,this.context.lineCap="round",this.context.stroke(),this.context.closePath()},handlePointerMove(t){if(!this.dragToolsBar){var e=t.pointerId;if(this.isDrawing&&this.multiLastPt[e]){if(1==this.mode&&"pen"===this.currentPointerType||!1===this.mode){var s=this.el.parentElement.scrollTop;this.erasing?this.context.lineWidth=this.eraserWidth:"pen"==this.currentPointerType?this.context.lineWidth=t.pressure*this.penWidth:this.context.lineWidth=this.penWidth;var i={x:t.pageX,y:t.pageY};if(this.points.push(i),this.points.length>2){const t=this.points.slice(-2),e=t[0],i={x:(t[0].x+t[1].x)/2,y:(t[0].y+t[1].y)/2};var o=this.offsetTop-s;this.drawLine(this.beginPoint,e,i,this.offsetLeft,o),this.beginPoint=i}}}else if(this.isScroll==e){const e=t.pageY-this.startY;this.el.parentElement.scrollTop=this.scrolltop-e}}},handlePointerUp(t){if(!this.dragToolsBar){var e=t.pointerId;this.isDrawing&&(this.isDrawing=!1),this.multiLastPt[e]&&delete this.multiLastPt[e],this.isScroll&&(this.isScroll=null)}},getcanvastool(t){console.log("click");this.context;"pencil"==t?(this.context.globalCompositeOperation="source-over",this.erasing=!1):"eraser"==t&&(this.context.globalCompositeOperation="destination-out",this.erasing=!0)},handleToolsBarFocus(){console.log("---------focus"),this.editToolsActive=!0,this.pressTimerNum=0,clearInterval(this.pressTimer),this.pressTimer=null},handleToolsBarOut(){this.pressTimerNum=0,clearInterval(this.pressTimer),this.pressTimer=null,this.pressTimer=setInterval((()=>{this.pressTimerNum+=1,this.pressTimerNum>=5&&(this.editToolsActive=!1,this.pressTimerNum=0,clearInterval(this.pressTimer),this.pressTimer=null)}),1e3)},changeCanvas(t,e){const s=this.$refs.canvas;let i=this.context.getImageData(0,0,s.width,s.height);this.imgDataList[e]=i,i=this.imgDataList[t]?this.imgDataList[t]:"";var o=this;this.$parent.$nextTick((()=>{o.resize(i)}))}}},_=s(8998);const b=(0,_.Z)(y,[["render",T],["__scopeId","data-v-eebb7ae8"]]);var P=b},4626:function(t,e,s){s.d(e,{Z:function(){return h}});var i=s(9812),o=s(5893);function l(t,e,s,l,n,a){return(0,i.wg)(),(0,i.iD)("div",null,(0,o.zw)(n.timer),1)}var n={data(){return{startTime:0,elapsedTime:0,timerInterval:null,timer:"00:00:00",status:0}},unmounted(){clearInterval(this.timerInterval)},methods:{startTimer(){1!=this.status&&(clearInterval(this.timerInterval),console.log("start"),this.startTime=Date.now()-this.elapsedTime,this.timerInterval=setInterval(this.updateTimer,1e3),this.status=1)},resetTimer(){0!=this.status&&(clearInterval(this.timerInterval),this.timerInterval=null,this.elapsedTime=0,this.$parent.timer="00:00:00",this.timer="00:00:00",this.status=0)},pause(){1==this.status&&(clearInterval(this.timerInterval),this.status=2)},updateTimer(){this.elapsedTime=Date.now()-this.startTime;const t=new Date(this.elapsedTime),e=String(t.getUTCHours()).padStart(2,"0"),s=String(t.getUTCMinutes()).padStart(2,"0"),i=String(t.getUTCSeconds()).padStart(2,"0");this.timer=`${e}:${s}:${i}`,this.$parent.timer=this.timer}}},a=s(8998);const r=(0,a.Z)(n,[["render",l],["__scopeId","data-v-03acfd1c"]]);var h=r},5992:function(t,e,s){s.d(e,{Z:function(){return u}});var i=s(9812);const o={class:"au-slider-container"},l={class:"au-slider-track",ref:"track"},n={class:"au-slider-runnable-track",ref:"process"};function a(t,e,s,a,r,h){return(0,i.wg)(),(0,i.iD)("div",o,[(0,i._)("div",{class:"au-slider-track-box",onPointerdown:e[0]||(e[0]=(...t)=>a.handleTrackStart&&a.handleTrackStart(...t))},[(0,i._)("div",l,[(0,i._)("div",n,null,512)],512)],32),(0,i._)("div",{class:"au-slider-thumb",ref:"thumb",onPointerdown:e[1]||(e[1]=(...t)=>a.handleThumbStart&&a.handleThumbStart(...t))},null,544)])}var r=s(521),h={props:{modelValue:{type:Number,required:!0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},vertical:{type:Boolean,default:!1}},setup(t,{emit:e}){const s=(0,r.iH)(null),o=(0,r.iH)(null);let l=!1;const n=(0,r.iH)(null),a=(0,r.iH)(0),h=(0,r.iH)(0),d=(0,r.iH)(t.modelValue);console.log(`setup:${d.value}`);const c=(0,r.iH)(0);(0,i.bv)((()=>{s.value=document.querySelector(".au-slider-track"),console.log("onMounted"),console.log(s.value),console.log(o.value),console.log(n.value),c.value=s.value.clientWidth/t.max*t.step,console.log(`setup:step_px.value=${s.value.clientWidth}/${t.max}*${t.step}`),console.log(`setup:step_px.value=${c.value}`);const e=Math.floor(d.value/t.step)*c.value;console.log(`left:${e}`),n.value.style.width=`${e}px`,o.value.style.left=`${e}px`,console.log(`onMounted:${d.value}`)})),(0,i.Jd)((()=>{document.removeEventListener("pointermove",m),document.removeEventListener("pointerup",v)}));const u=t=>{t.preventDefault(),l||(l=!0,a.value=t.pageX-o.value.offsetLeft,h.value=t.pageY-o.value.offsetTop,document.addEventListener("pointermove",m),document.addEventListener("pointerup",v))},p=s=>{if(console.log(`handleTrackStart-1:${d.value}`),!l){l=!0,console.log(`left_steped = Math.floor(${s.offsetX}/${c.value})*${c.value}`);const i=Math.floor(s.offsetX/c.value)*c.value;console.log(`left_steped:${i}`);const r=Math.min(Math.max(i,0),o.value.parentElement.clientWidth-20);n.value.style.width=`${r}px`,o.value.style.left=`${r}px`,console.log(`handleTrackStart-2:${d.value}`),console.log(`Math.ceil(${t.min} + ${r}/${c.value})*${t.step};`),d.value=Math.ceil(t.min+r/c.value)*t.step,console.log(`handleTrackStart-3:${d.value}`),e("update:modelValue",d.value),a.value=s.pageX-o.value.offsetLeft,h.value=s.pageY-o.value.offsetTop,document.addEventListener("pointermove",m),document.addEventListener("pointerup",v)}},m=s=>{if(s.preventDefault(),l)if(t.vertical){const t=Math.min(Math.max(s.pageY-h.value,0),o.value.parentElement.clientHeight-20);n.value.style.height=`${t}px`,o.value.style.top=`${t}px`}else{const i=Math.floor((s.pageX-a.value)/c.value)*c.value,l=Math.min(Math.max(i,0),o.value.parentElement.clientWidth-20);n.value.style.width=`${l}px`,o.value.style.left=`${l}px`,d.value=Math.ceil(t.min+l/c.value)*t.step,e("update:modelValue",d.value)}},v=()=>{l=!1,document.removeEventListener("pointermove",m),document.removeEventListener("pointerup",v)};return{thumb:o,process:n,modelValue:d,handleTrackStart:p,handleThumbStart:u}}},d=s(8998);const c=(0,d.Z)(h,[["render",a],["__scopeId","data-v-0dea4dfc"]]);var u=c},1217:function(t,e,s){s.d(e,{Z:function(){return u}});var i=s(9812),o=s(5893);const l=t=>((0,i.dD)("data-v-c3dbe66a"),t=t(),(0,i.Cn)(),t),n=l((()=>(0,i._)("div",{class:"switch-handle"},null,-1))),a=[n];function r(t,e,s,l,n,r){return(0,i.wg)(),(0,i.iD)("div",{class:(0,o.C_)(["switch",{"switch-on":s.modelValue}]),onClick:e[0]||(e[0]=(...t)=>r.toggle&&r.toggle(...t))},a,2)}var h={name:"Switch",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue"],methods:{toggle(){this.$emit("update:modelValue",!this.modelValue)}}},d=s(8998);const c=(0,d.Z)(h,[["render",r],["__scopeId","data-v-c3dbe66a"]]);var u=c}}]);
//# sourceMappingURL=5713.5993c438.js.map