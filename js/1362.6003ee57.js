"use strict";(self["webpackChunkaugest"]=self["webpackChunkaugest"]||[]).push([[1362],{9988:function(t,e,i){i.d(e,{Z:function(){return E}});var s=i(9812),n=i(4220),o=i(5893),l=i.p+"img/pen.fe268fe1.png",a=i.p+"img/eraser.5178d610.png";const h=t=>((0,s.dD)("data-v-679dd5f0"),t=t(),(0,s.Cn)(),t),r={src:l},c={src:a},d={class:"edit-tools"},p={class:"edit-tools-group"},m=h((()=>(0,s._)("img",{draggable:"false",src:l},null,-1))),g=[m],u=h((()=>(0,s._)("img",{draggable:"false",src:a},null,-1))),v=[u],w=h((()=>(0,s._)("svg",{fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},[(0,s._)("path",{d:"M15 1v6H9V1h6zm-2 2h-2v2h2V3zm2 6v6H9V9h6zm-2 2h-2v2h2v-2zm2 6v6H9v-6h6zm-2 2h-2v2h2v-2z",fill:"currentColor"})],-1))),x=[w],f={class:"edit-tools-box"},T=h((()=>(0,s._)("div",{class:"divider-line"},null,-1))),_={class:"edit-tools-item"},y={class:"content-items"},P=h((()=>(0,s._)("label",null,"画笔大小：",-1))),C={class:"content-items"},b=h((()=>(0,s._)("label",null,"橡皮大小：",-1))),W={class:"content-items"},D=h((()=>(0,s._)("label",null,"画笔颜色：",-1))),k=["onClick"],S={class:"content-items"},I=h((()=>(0,s._)("label",null,"仅触控笔：",-1)));function L(t,e,i,l,a,h){const m=(0,s.up)("svg-icon"),u=(0,s.up)("my-model");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.wy)((0,s._)("canvas",{ref:"canvas",onPointerdown:e[0]||(e[0]=(...t)=>h.handlePointerDown&&h.handlePointerDown(...t)),onPointermove:e[1]||(e[1]=(...t)=>h.handlePointerMove&&h.handlePointerMove(...t)),onPointerup:e[2]||(e[2]=(...t)=>h.handlePointerUp&&h.handlePointerUp(...t))},null,544),[[n.F8,i.show]]),(0,s.wy)((0,s._)("div",{class:(0,o.C_)({"edit-tools-fixedbox":!0,show:a.editTools_show})},[(0,s._)("div",{class:(0,o.C_)({"edit-tools-handle":!0,show:!a.editTools_show}),onPointerdown:e[3]||(e[3]=(...t)=>h.handleStart&&h.handleStart(...t)),onPointermove:e[4]||(e[4]=(...t)=>h.handleMove&&h.handleMove(...t)),onPointerup:e[5]||(e[5]=(...t)=>h.handleEnd&&h.handleEnd(...t)),onPointerleave:e[6]||(e[6]=(...t)=>h.handleCancel&&h.handleCancel(...t))},[(0,s.wy)((0,s._)("img",r,null,512),[[n.F8,!a.erasing]]),(0,s.wy)((0,s._)("img",c,null,512),[[n.F8,a.erasing]])],34),(0,s._)("div",d,[(0,s._)("div",{style:{height:"100%","font-size":"18px","line-height":"50px",padding:"0 2px 0 2px",color:"#252525"},onClick:e[7]||(e[7]=t=>a.editTools_show=!1)},"×"),(0,s._)("div",p,[(0,s._)("div",{class:(0,o.C_)({"edit-tools-item":!0,active:!a.erasing}),onClick:e[8]||(e[8]=t=>h.getcanvastool("pencil"))},g,2),(0,s._)("div",{class:(0,o.C_)({"edit-tools-item":!0,active:a.erasing}),onClick:e[9]||(e[9]=t=>h.getcanvastool("eraser"))},v,2)]),(0,s._)("div",{style:{width:"25px",display:"flex",color:"#252525","margin-left":"15px"},onClick:e[10]||(e[10]=t=>a.modal_show.setting_show=!0)},x)])],2),[[n.F8,i.show]]),(0,s.wy)((0,s._)("div",f,[(0,s._)("div",{class:(0,o.C_)({"edit-tools-item":!0,active:!a.erasing})},[(0,s.Wm)(m,{name:"pencilStub01",size:"20"})],2),(0,s._)("div",{class:(0,o.C_)({"edit-tools-item":!0,active:a.erasing})},[(0,s.Wm)(m,{name:"eraser02",size:"20"})],2),T,(0,s._)("div",_,[(0,s.Wm)(m,{name:"setting02",size:"20"})])],512),[[n.F8,i.show]]),(0,s.Wm)(u,{show:i.show&&a.modal_show.setting_show,modeless:!0,modalKey:"setting_show"},{default:(0,s.w5)((()=>[(0,s._)("div",y,[P,(0,s.wy)((0,s._)("input",{type:"range",class:"custom-range","onUpdate:modelValue":e[11]||(e[11]=t=>a.penWidth=t),min:"1",max:"15"},null,512),[[n.nr,a.penWidth]]),(0,s.Uk)(" "+(0,o.zw)(a.penWidth),1)]),(0,s._)("div",C,[b,(0,s.wy)((0,s._)("input",{type:"range",class:"custom-range","onUpdate:modelValue":e[12]||(e[12]=t=>a.eraserWidth=t),min:"5",max:"30"},null,512),[[n.nr,a.eraserWidth]]),(0,s.Uk)(" "+(0,o.zw)(a.eraserWidth),1)]),(0,s._)("div",W,[D,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.colorList,(t=>((0,s.wg)(),(0,s.iD)("div",{onClick:e=>a.penColor=t,class:"color-item",style:(0,o.j5)({backgroundColor:t,height:t==a.penColor?"20px":"15px"})},null,12,k)))),256))]),(0,s._)("div",S,[I,(0,s._)("div",{onClick:e[13]||(e[13]=t=>h.switchmode()),class:(0,o.C_)({"switch-botton":!0,close:"all touch"==a.mode})},null,2),(0,s.Uk)(" "+(0,o.zw)("only pen"==a.mode?"开":"关"),1)])])),_:1},8,["show"])],64)}i(7658);var z={props:{show:{type:Boolean,required:!0,default:!1},width:Number,height:Number,switch:Number},watch:{switch(t,e){this.changeCanvas(t,e),console.log(t,e)},show(t,e){t?(this.resize(),document.body.classList.add("none-select")):document.body.classList.remove("none-select")}},data(){return{log:"",mode:"all touch",isDrawing:!1,drawData:null,isScroll:0,context:null,currentPointerType:null,multiLastPt:{},offsetTop:0,offsetLeft:0,isScroll:!1,startY:0,scrolltop:0,editTools_show:!1,erasing:!1,el:null,points:[],beginPoint:{x:0,y:0},penWidth:5,eraserWidth:10,penColor:"#f00",canvasWidth:0,canvasHeight:0,pressTimer:null,imgDataList:[],modal_show:{setting_show:!1},colorList:["#000","#f00","#ffa500","#ff0","#90ee90","#87ceeb","#fff"]}},mounted(){this.init()},beforeUnmount(){document.body.classList.remove("none-select")},methods:{changePenWidth(){const t=document.getElementById("penWidth-range");this.penWidth=parseInt(t.value)},resize(t=null){const e=this.$refs.canvas;let i=null;i=null==t?this.context.getImageData(0,0,e.width,e.height):t;const s=this.context.strokeStyle,n=this.context.fillStyle,o=this.context.lineWidth,l=this.context.font,a=this.context.textAlign,h=this.context.textBaseline,r=this.context.globalCompositeOperation;e.width=this.el.clientWidth,e.height=this.el.clientHeight,this.canvasWidth=e.width,this.canvasHeight=e.height,this.context.clearRect(0,0,e.width,e.height),this.context.strokeStyle=s,this.context.fillStyle=n,this.context.lineWidth=o,this.context.font=l,this.context.textAlign=a,this.context.textBaseline=h,this.context.globalCompositeOperation=r,""!=i&&this.context.putImageData(i,0,0)},init(){window.PointerEvent&&(this.log="Pointer events are supported.");const t=this.$refs.canvas,e=t.parentElement;t.width=e.clientWidth,t.height=e.clientHeight,this.canvasWidth=t.width,this.canvasHeight=t.height,this.el=e,this.offsetLeft=e.offsetLeft,this.offsetTop=e.offsetTop,this.context=t.getContext("2d"),this.context.strokeStyle=this.penColor},switchmode(){"only pen"==this.mode?this.mode="all touch":this.mode="only pen"},handlePointerDown(t){this.currentPointerType=t.pointerType,"all touch"==this.mode&&"pen"==this.currentPointerType&&(this.mode="only pen",this.$toast.show('检测到正在使用触控笔，开启"仅触控笔"模式，可在画板设置中关闭',"info"));var e=t.pointerId;this.multiLastPt[e]={x:t.pageX,y:t.pageY},"only pen"==this.mode&&"pen"===this.currentPointerType?(this.scrolltop=this.el.parentElement.scrollTop,this.isDrawing=!0,this.points=[],this.points.push({x:t.pageX,y:t.pageY}),this.beginPoint=this.points[0]):"only pen"==this.mode&&"touch"===this.currentPointerType?(this.isScroll=e,this.startY=t.pageY,this.scrolltop=this.el.parentElement.scrollTop):"all touch"===this.mode&&(this.scrolltop=this.el.parentElement.scrollTop,2==Object.keys(this.multiLastPt).length?(this.isDrawing=!1,this.isScroll=e,this.startY=t.pageY):1==Object.keys(this.multiLastPt).length&&(this.isDrawing=!0,this.points=[],this.points.push({x:t.pageX,y:t.pageY}),this.beginPoint=this.points[0]))},drawLine(t,e,i,s,n){this.context.beginPath(),this.context.moveTo(t.x-s,t.y-n),this.context.quadraticCurveTo(e.x-s,e.y-n,i.x-s,i.y-n),this.context.strokeStyle=this.penColor,this.context.lineCap="round",this.context.stroke(),this.context.closePath()},handlePointerMove(t){var e=t.pointerId;if(this.isDrawing&&this.multiLastPt[e]){if("only pen"==this.mode&&"pen"===this.currentPointerType||"all touch"===this.mode){var i=this.el.parentElement.scrollTop;this.erasing?this.context.lineWidth=this.eraserWidth:"pen"==this.currentPointerType?this.context.lineWidth=t.pressure*this.penWidth:this.context.lineWidth=this.penWidth;var s={x:t.pageX,y:t.pageY};if(this.points.push(s),this.points.length>2){const t=this.points.slice(-2),e=t[0],s={x:(t[0].x+t[1].x)/2,y:(t[0].y+t[1].y)/2};var n=this.offsetTop-i;this.drawLine(this.beginPoint,e,s,this.offsetLeft,n),this.beginPoint=s}}}else if(this.isScroll==e){const e=t.pageY-this.startY;this.el.parentElement.scrollTop=this.scrolltop-e}},handlePointerUp(t){var e=t.pointerId;this.isDrawing&&(this.isDrawing=!1),this.multiLastPt[e]&&delete this.multiLastPt[e],this.isScroll&&(this.isScroll=null)},getcanvastool(t){console.log("click");this.context;"pencil"==t?(this.context.globalCompositeOperation="source-over",this.erasing=!1):"eraser"==t&&(this.context.globalCompositeOperation="destination-out",this.erasing=!0)},handleStart(){console.log("start"),this.pressTimer=setTimeout((()=>{this.modal_show.setting_show=!0,clearTimeout(this.pressTimer),this.pressTimer=null}),500)},handleMove(t){this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null)},handleEnd(){console.log("end"),this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null,this.getcanvastool(this.erasing?"pencil":"eraser"))},handleCancel(){this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null)},changeCanvas(t,e){const i=this.$refs.canvas;let s=this.context.getImageData(0,0,i.width,i.height);this.imgDataList[e]=s,s=this.imgDataList[t]?this.imgDataList[t]:"";var n=this;this.$parent.$nextTick((()=>{n.resize(s)}))}}},Y=i(8998);const U=(0,Y.Z)(z,[["render",L],["__scopeId","data-v-679dd5f0"]]);var E=U},4626:function(t,e,i){i.d(e,{Z:function(){return r}});var s=i(9812),n=i(5893);function o(t,e,i,o,l,a){return(0,s.wg)(),(0,s.iD)("div",null,(0,n.zw)(l.timer),1)}var l={data(){return{startTime:0,elapsedTime:0,timerInterval:null,timer:"00:00:00",status:0}},unmounted(){clearInterval(this.timerInterval)},methods:{startTimer(){1!=this.status&&(clearInterval(this.timerInterval),console.log("start"),this.startTime=Date.now()-this.elapsedTime,this.timerInterval=setInterval(this.updateTimer,1e3),this.status=1)},resetTimer(){0!=this.status&&(clearInterval(this.timerInterval),this.timerInterval=null,this.elapsedTime=0,this.$parent.timer="00:00:00",this.timer="00:00:00",this.status=0)},pause(){1==this.status&&(clearInterval(this.timerInterval),this.status=2)},updateTimer(){this.elapsedTime=Date.now()-this.startTime;const t=new Date(this.elapsedTime),e=String(t.getUTCHours()).padStart(2,"0"),i=String(t.getUTCMinutes()).padStart(2,"0"),s=String(t.getUTCSeconds()).padStart(2,"0");this.timer=`${e}:${i}:${s}`,this.$parent.timer=this.timer}}},a=i(8998);const h=(0,a.Z)(l,[["render",o],["__scopeId","data-v-03acfd1c"]]);var r=h}}]);
//# sourceMappingURL=1362.6003ee57.js.map