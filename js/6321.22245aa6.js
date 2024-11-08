"use strict";(self["webpackChunkaugest"]=self["webpackChunkaugest"]||[]).push([[6321],{593:function(e,t,a){a.r(t),a.d(t,{default:function(){return K}});var n=a(9812),s=a(5893),i=a(4220);const l={class:"line-content-center"},o=(0,n._)("label",null,"日期：",-1),r={class:"line-content-center"},d=(0,n._)("label",null,"期限：",-1),m={class:"line-content-center"},u=(0,n._)("label",null,"不重复",-1),g=(0,n._)("label",null,null,-1),c=(0,n._)("label",null,"每天",-1),h=(0,n._)("label",null,"每周",-1),p=(0,n._)("label",null,"每月",-1),D=(0,n._)("label",null,"每年",-1),f=(0,n._)("label",null,"艾宾豪斯记忆法",-1),w={class:"line-content-center"},y={class:"line-content-center"},M=(0,n._)("label",null,"紧急",-1),v=(0,n._)("label",null,"重要",-1),k={class:"line-content-center left"},_={class:"card-content main-content",style:{"text-align":"left"},ref:"fqtMain"},b={class:"calendar-list"},C=["onClick"],x={key:0,class:"date"},N={key:1,class:"date"},W={key:2,class:"date"},I={key:3,class:"date"},L=["id"],$=["onClick"],U=["onPointerdown"],F=["id"],V={class:"list-item",style:{display:"flex","justify-content":"center"}},E={class:"axes x"},T=(0,n._)("div",{style:{"background-color":"#F96635"}},"重要",-1),S=[T],Y={class:"axes y"},z=(0,n._)("div",{style:{"background-color":"#f9A822"}},"紧急",-1),P=[z];function j(e,t,a,T,z,j){const B=(0,n.up)("calender"),q=(0,n.up)("svg-icon"),A=(0,n.up)("my-model");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(A,{show:z.modal_show.addPlanShow,modalKey:"addPlanShow"},{default:(0,n.w5)((()=>[(0,n._)("div",l,[o,(0,n.Wm)(B,{language:"EN",type:"input",style:{width:"150px"},class:"form-input",modelValue:z.management.date,"onUpdate:modelValue":t[0]||(t[0]=e=>z.management.date=e)},null,8,["modelValue"]),(0,n.Wm)(q,{class:(0,s.C_)({"text-button":!0,action:j.compareDate(z.management.date)}),name:"today",size:"16",onClick:t[1]||(t[1]=e=>j.getManagementDate())},null,8,["class"]),(0,n.Wm)(q,{class:(0,s.C_)({"text-button":!0,action:j.compareDate(z.management.date,1)}),name:"tomorrow",size:"16",onClick:t[2]||(t[2]=e=>j.getManagementDate(1))},null,8,["class"])]),(0,n._)("div",r,[d,(0,n.Wm)(B,{language:"EN",type:"datetime",style:{width:"150px"},class:"form-input",modelValue:z.management.deadline,"onUpdate:modelValue":t[3]||(t[3]=e=>z.management.deadline=e)},null,8,["modelValue"]),(0,n.Wm)(q,{class:"text-button",name:"delete02",size:"16",onClick:t[4]||(t[4]=e=>z.management.deadline=null)})]),(0,n._)("div",m,[(0,n.wy)((0,n._)("input",{class:"form-input",type:"radio",name:"repeat",value:"0","onUpdate:modelValue":t[5]||(t[5]=e=>z.management.repeat=e)},null,512),[[i.G2,z.management.repeat]]),u,g,(0,n.wy)((0,n._)("input",{class:"form-input",type:"radio",name:"repeat",value:"1","onUpdate:modelValue":t[6]||(t[6]=e=>z.management.repeat=e),checked:""},null,512),[[i.G2,z.management.repeat]]),c,(0,n.wy)((0,n._)("input",{class:"form-input",type:"radio",name:"repeat",value:"7","onUpdate:modelValue":t[7]||(t[7]=e=>z.management.repeat=e)},null,512),[[i.G2,z.management.repeat]]),h,(0,n.wy)((0,n._)("input",{class:"form-input",type:"radio",name:"repeat",value:"30","onUpdate:modelValue":t[8]||(t[8]=e=>z.management.repeat=e)},null,512),[[i.G2,z.management.repeat]]),p,(0,n.wy)((0,n._)("input",{class:"form-input",type:"radio",name:"repeat",value:"-1","onUpdate:modelValue":t[9]||(t[9]=e=>z.management.repeat=e)},null,512),[[i.G2,z.management.repeat]]),D,(0,n.wy)((0,n._)("input",{class:"form-input",type:"radio",name:"repeat",value:"-2","onUpdate:modelValue":t[10]||(t[10]=e=>z.management.repeat=e)},null,512),[[i.G2,z.management.repeat]]),f]),(0,n._)("div",w,[(0,n.wy)((0,n._)("textarea",{placeholder:"做什么呢...",rows:"5","onUpdate:modelValue":t[11]||(t[11]=e=>z.management.content=e)},null,512),[[i.nr,z.management.content]])]),(0,n._)("div",y,[M,(0,n.wy)((0,n._)("input",{type:"checkbox",class:"circle form-input","onUpdate:modelValue":t[12]||(t[12]=e=>z.management.urgent=e),checked:""},null,512),[[i.e8,z.management.urgent]]),v,(0,n.wy)((0,n._)("input",{type:"checkbox",class:"circle form-input","onUpdate:modelValue":t[13]||(t[13]=e=>z.management.important=e)},null,512),[[i.e8,z.management.important]])]),(0,n._)("div",k,[(0,n._)("button",{class:"fill",onClick:t[14]||(t[14]=e=>j.addManagement())},(0,s.zw)(z.updateIndex?"修改计划":"新增计划"),1)])])),_:1},8,["show"]),(0,n._)("div",_,[(0,n._)("div",b,[(0,n.Wm)(q,{name:"arrow-left",className:"date-item",onClick:j.preWeek},null,8,["onClick"]),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(z.currentWeek,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e,class:"date-item",onClick:t=>j.toDate(j.getFormattedDate(e))},[j.getFormattedDate(e)==j.getFormattedDate(z.today)?((0,n.wg)(),(0,n.iD)("div",x,[(0,n.Wm)(q,{name:"today"})])):j.getFormattedDate(e)==j.getFormattedDate(z.today,1)?((0,n.wg)(),(0,n.iD)("div",N,[(0,n.Wm)(q,{name:"tomorrow"})])):j.getFormattedDate(e)==j.getFormattedDate(z.today,-1)?((0,n.wg)(),(0,n.iD)("div",W,[(0,n.Wm)(q,{name:"yesterday"})])):((0,n.wg)(),(0,n.iD)("div",I,(0,s.zw)(e.getDate()),1))],8,C)))),128)),(0,n.Wm)(q,{name:"arrow-right",className:"date-item",onClick:j.nextWeek},null,8,["onClick"]),(0,n.Wm)(q,{name:"letter-plus01",className:"date-item",onClick:t[15]||(t[15]=e=>j.showAddPlan())}),(0,n.Wm)(q,{name:"refresh02",class:"update-icon",className:"date-item",onClick:t[16]||(t[16]=e=>j.getCurManagementData(z.currentDate))}),(0,n.Wm)(q,{name:"upload01",className:"date-item",onClick:j.saveJson},null,8,["onClick"])]),(0,n.Uk)(" "+(0,s.zw)(z.currentDate)+" ",1),(0,n._)("div",{class:(0,s.C_)({"quadrant-container":!0,draging:z.draged})},[(0,n.wy)((0,n._)("div",{class:(0,s.C_)(j.dragedManagementClass),ref:"dragedManagement"},[(0,n.Wm)(q,{name:"dot01",size:"16",className:"dot",style:(0,s.j5)(j.dragedDotColor)},null,8,["style"]),(0,n.Uk)(" "+(0,s.zw)(z.dragedManagement?z.dragedManagement.content:""),1)],2),[[i.F8,z.draged]]),((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(4,(e=>(0,n._)("div",{class:"quadrant-box",id:`quadrantList${e}`},[(0,n._)("div",{class:(0,s.C_)(["quadrant-list"]),onClick:t=>j.showAddPlan(e)},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(z.currentManagementList[e-1],(a=>((0,n.wg)(),(0,n.iD)("div",{class:(0,s.C_)(["list-item","item-"+(e-1)]),onClick:t[19]||(t[19]=(0,i.iM)((()=>{}),["stop"])),onPointerdown:e=>j.listItemDown(e,a)},[(0,n._)("div",{class:"content",style:(0,s.j5)({textDecoration:j.itemFinished(a)?"line-through":"none"})},[(0,n.Wm)(q,{name:"dot01",size:"16",className:"dot",style:(0,s.j5)({color:z.fourColors[e-1]})},null,8,["style"]),(0,n.Uk)(" "+(0,s.zw)(a.content),1)],4),(0,n._)("div",{id:`planIndex${a.index}`,class:"line-content-center"},[(0,n.Wm)(q,{name:"flag01",size:"16",className:"dot",style:(0,s.j5)({color:z.fourColors[e-1]}),onClick:[t[17]||(t[17]=(0,i.iM)((()=>{}),["stop"])),e=>j.finishItem(a)]},null,8,["style","onClick"]),(0,n.Wm)(q,{name:"delete02",size:"16",className:"dot",style:(0,s.j5)({color:z.fourColors[e-1]}),onClick:[t[18]||(t[18]=(0,i.iM)((()=>{}),["stop"])),e=>j.deleteItem(a)]},null,8,["style","onClick"])],8,F)],42,U)))),256)),(0,n.wy)((0,n._)("div",V,[(0,n._)("div",{class:(0,s.C_)(["list-add-button-"+(e-1)])},"+",2)],512),[[i.F8,!1]])],8,$)],8,L))),64)),(0,n.wy)((0,n._)("div",E,S,512),[[i.F8,!0]]),(0,n.wy)((0,n._)("div",Y,P,512),[[i.F8,!0]])],2)],512)],64)}a(7658);var B=a(6086),q=a(8316),A=a(3438),G={computed:{compareDate(){return(e,t=0)=>{if(e){const a=e.split("/"),n=new Date(Number(a[0]),Number(a[1])-1,Number(a[2])),s=new Date;return s.setDate(s.getDate()+t),`${n.getYear()}${n.getMonth()}${n.getDate()}`==`${s.getYear()}${s.getMonth()}${s.getDate()}`}return!1}},dragedManagementClass(){let e={"list-item":!0,draged:this.draged};const t=[2,0,3,1];if(this.dragedManagement){const a=this.dragedManagement.urgent?1:0,n=this.dragedManagement.important?1:0,s=t[2*n+a],i=`item-${s}`;e[i]=!0}return e},dragedDotColor(){const e=[2,0,3,1];if(this.dragedManagement){const t=this.dragedManagement.urgent?1:0,a=this.dragedManagement.important?1:0,n=e[2*a+t];return{color:this.fourColors[n]}}},itemFinished(){return e=>e.finishedDate.includes(this.currentDate)}},components:{calender:B.Z},data(){return{fourColors:["#f9A822","#F96635","#2bbaa5","#93d3a2"],currentWeek:[],today:null,currentDate:null,currentManagementList:[[],[],[],[]],modal_show:{addPlanShow:!1},management:{date:null,deadline:null,repeat:0,content:"",urgent:!1,important:!1,repeatDate:[],finishedDate:[]},managementList:[],updateIndex:null,dragedManagement:null,draged:!1,drag2Index:null,pressTimer:null,disx:null,disy:null,ifNeedSave:!1}},mounted(){this.fetchJson(),console.log(this.managementList),this.getWeekDate(),this.toDate(this.getFormattedDate(this.today)),window.addEventListener("beforeunload",this.handleBeforeUnload)},unmounted(){window.removeEventListener("beforeunload",this.handleBeforeUnload)},methods:{listItemDown(e,t){const a=`planIndex${t.index}`,n=document.getElementById(a);n.contains(e.target)||(document.addEventListener("pointerup",this.listItemUp),document.addEventListener("pointermove",this.listItemMove),this.dragedManagement=t,this.pressTimer=setTimeout((()=>{this.draged=!0;const t=e.target;this.disx=e.pageX-t.offsetLeft,this.disy=e.pageY-t.offsetTop;const a=this.$refs.dragedManagement;a.style.left=e.pageX-this.disx+"px",a.style.top=e.pageY-this.disy+"px",clearTimeout(this.pressTimer),this.pressTimer=null}),500))},listItemMove(){if(this.draged){const e=document.getElementById("quadrantList4").getBoundingClientRect(),t=e.left,a=e.top;let n=4;event.clientX<t?n=event.clientY<a?1:3:event.clientY<a&&(n=2),this.drag2Index=n;const s=this.$refs.dragedManagement;s.style.left=event.pageX-this.disx+"px",s.style.top=event.pageY-this.disy+"px"}},listItemUp(e){if(this.pressTimer&&(clearTimeout(this.pressTimer),this.showAddPlan(this.dragedManagement),this.updateIndex=this.dragedManagement.index,this.dragedManagement=null),null!=this.dragedManagement){switch(this.drag2Index){case 1:this.dragedManagement.urgent=!0,this.dragedManagement.important=!1;break;case 2:this.dragedManagement.urgent=!0,this.dragedManagement.important=!0;break;case 3:this.dragedManagement.urgent=!1,this.dragedManagement.important=!1;break;case 4:this.dragedManagement.urgent=!1,this.dragedManagement.important=!0;break}this.updateManagement(this.dragedManagement)}this.draged=!1,this.dragedManagement=null,this.drag2Index=null,this.getCurManagementData(this.currentDate),document.removeEventListener("pointerup",this.listItemUp),document.removeEventListener("pointermove",this.listItemMove)},deleteItem(e){this.deleteManagement(e),this.getCurManagementData(this.currentDate)},finishItem(e){let t=null;e.finishedDate.forEach(((e,a)=>{this.currentDate!=e||(t=a)})),console.log(t),null==t?e.finishedDate.push(this.currentDate):e.finishedDate.splice(t,1),this.updateManagement(e),this.getCurManagementData(this.currentDate)},updateManagement(e){const t=e.index;delete e.index,this.managementList[t]=e,this.ifNeedSave=!0},deleteManagement(e){const t=e.index;this.managementList.splice(t,1),this.ifNeedSave=!0},toDate(e){this.getCurManagementData(e),this.currentDate=e},compare2Date(e,t){const a=new Date(e.split("T")[0]),n=new Date(t.split("T")[0]),s=a.getTime(),i=n.getTime();return s<i?-1:s>i?1:0},daysBetween(e,t){let a=e.split("/");const n=new Date(Number(a[0]),Number(a[1])-1,Number(a[2]));a=t.split("/");const s=new Date(Number(a[0]),Number(a[1])-1,Number(a[2])),i=864e5;return Math.round(Math.abs((n-s)/i))},getCurManagementData(e){this.currentManagementList=[[],[],[],[]],this.managementList.forEach(((t,a)=>{if(0==this.compare2Date(e,t.date))this.pushCurManagement(a,t);else if(1==this.compare2Date(e,t.date)){const n=Number(t.repeat);n>0&&this.daysBetween(e,t.date)%n==0?this.pushCurManagement(a,t):-1==n?e.split("/")[1]==t.date.split("/")[1]&&e.split("/")[2]==t.date.split("/")[2]&&this.pushCurManagement(a,t):-2==n&&t.repeatDate.includes(e)&&this.pushCurManagement(a,t)}}))},pushCurManagement(e,t){const a=[2,0,3,1],n=t.urgent?1:0,s=t.important?1:0;t.index=e,this.currentManagementList[a[2*s+n]].push(t)},getDate(e){const t=e.split("/"),a=new Date(Number(t[0]),Number(t[1])-1,Number(t[2]));return a},getFormattedDate(e,t=null){const a=new Date(e);t&&a.setDate(a.getDate()+t);const n=a.getFullYear(),s=a.getMonth()+1,i=a.getDate();return`${n}/${s}/${i}`},initManagementDate(){this.updateIndex=null,this.management={date:null,deadline:null,repeat:0,content:"",urgent:!1,important:!1,repeatDate:[],finishedDate:[]}},addManagement(){const e=this.management;if(e.date&&e.content){if(-2==e.repeat){const t=this.getDate(e.date),a=[0,1,3,7,14,29,59];e.repeatDate=[],a.forEach((a=>{e.repeatDate.push(this.getFormattedDate(t,a))}))}this.updateIndex?(this.managementList[this.updateIndex]=this.management,this.$toast.show("修改成功","success"),this.updateIndex=null,this.modal_show.addPlanShow=!1):(this.managementList.push(this.management),this.$toast.show("添加成功","success"),this.modal_show.addPlanShow=!1)}else this.$toast.show("时间或内容不得为空","error");console.log(this.managementList),this.ifNeedSave=!0},getManagementDate(e=0){const t=new Date;t.setDate(t.getDate()+e),this.management.date=`${t.getYear()+1900}/${t.getMonth()+1>10?"":0}${t.getMonth()+1}/${t.getDate()>10?"":0}${t.getDate()}`},showAddPlan(e=null){if(!this.draged){if(null==e)this.initManagementDate();else if([1,2,3,4].includes(e))switch(this.initManagementDate(),e){case 1:this.management.urgent=!0,this.management.important=!1;break;case 2:this.management.urgent=!0,this.management.important=!0;break;case 3:this.management.urgent=!1,this.management.important=!1;break;case 4:this.management.urgent=!1,this.management.important=!0;break}else this.management=e;this.modal_show.addPlanShow=!0}},preWeek(){const e=new Date(this.currentWeek[0]);e.setDate(e.getDate()-7),this.getWeekDate(e)},nextWeek(){const e=new Date(this.currentWeek[0]);e.setDate(e.getDate()+7),this.getWeekDate(e)},getWeekDate(e=null){const t=(e,t)=>{const a=new Date(e);return a.setDate(a.getDate()-t),a};this.today=new Date,e=e?new Date(e):t(this.today,this.today.getDay());for(var a=0;a<7;a++)this.currentWeek[a]=t(e,-a)},async fetchJson(){try{const e=(0,q.JU)(A.db,"jsonfiles","managementjson"),t=await(0,q.QT)(e);t.exists()?(this.managementList=t.data().tasks,this.getCurManagementData(this.currentDate),console.log("Document data:",this.jsonData)):console.log("No such document!")}catch(e){console.error("Error fetching document:",e)}},async saveJson(){const e=this.managementList;try{await(0,q.pl)((0,q.JU)(A.db,"jsonfiles","managementjson"),{tasks:e}),this.ifNeedSave=!1,console.log("Document successfully written!")}catch(t){console.error("Error writing document:",t)}},handleBeforeUnload(e){if(this.ifNeedSave){const t="你有未保存的更改，是否保存并离开";return e.returnValue=t,t}},confirmLeave(e,t,a){if(this.ifNeedSave){const e=window.confirm("你有未保存的更改，确定要离开吗？");e?a():a(!1)}else a()}},beforeRouteLeave(e,t,a){this.confirmLeave(e,t,a)}},J=a(8998);const H=(0,J.Z)(G,[["render",j]]);var K=H}}]);
//# sourceMappingURL=6321.22245aa6.js.map