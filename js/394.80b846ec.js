"use strict";(self["webpackChunkaugest"]=self["webpackChunkaugest"]||[]).push([[394],{9241:function(e,t,s){s.d(t,{Z:function(){return d}});var a=s(9812),r=s(5893);const i={class:"select-box",ref:"selectBox"},l=["onClick"];function o(e,t,s,o,n,c){const p=(0,a.up)("svg-icon");return(0,a.wg)(),(0,a.iD)("div",i,[(0,a._)("div",{class:(0,r.C_)({"input-area":!0,active:n.selectShow}),onClick:t[0]||(t[0]=(...e)=>c.openSelect&&c.openSelect(...e))},[(0,a.Uk)((0,r.zw)(s.dataList[n.currIndex])+" ",1),(0,a.Wm)(p,{name:"arrow-down",size:"16",class:(0,r.C_)({icon:!0,show:n.selectShow})},null,8,["class"])],2),(0,a._)("div",{class:(0,r.C_)({"select-item-group":!0,show:n.selectShow}),ref:"options"},[(0,a._)("div",{class:(0,r.C_)({options:!0,show:n.selectShow})},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(s.dataList,((e,t)=>((0,a.wg)(),(0,a.iD)("div",{class:(0,r.C_)({"select-item":!0,active:t==n.currIndex}),onClick:e=>c.changeIndex(t)},(0,r.zw)(e),11,l)))),256))],2)],2)],512)}var n={props:{dataList:{type:Array,required:!0}},data(){return{selectShow:!1,currIndex:0}},mounted(){},unmounted(){document.removeEventListener("click",this.closeSelect)},methods:{openSelect(){this.selectShow?(this.selectShow=!1,document.removeEventListener("click",this.closeSelect)):(this.selectShow=!0,document.addEventListener("click",this.closeSelect))},closeSelect(){this.$refs.selectBox.contains(event.target)||(this.selectShow=!1,document.removeEventListener("click",this.closeSelect))},changeIndex(e){this.currIndex=e,this.selectShow=!1,document.removeEventListener("click",this.closeSelect),this.$emit("change",this.currIndex)}}},c=s(8998);const p=(0,c.Z)(n,[["render",o],["__scopeId","data-v-2ee630a8"]]);var d=p},992:function(e,t,s){s.r(t),s.d(t,{default:function(){return j}});var a=s(9812),r=s(5893);const i=e=>((0,a.dD)("data-v-f0febbc2"),e=e(),(0,a.Cn)(),e),l={class:"au-layout"},o={class:"rows start gutter-l"},n={class:"cols xs12 sm12 md8 lg9 xl10 list"},c={class:"filter-content"},p={class:"card-content"},d={class:"md-card-item"},h=["onClick"],y={class:"md-card-info"},u=["onClick"],v={key:1,class:"tag"},f=i((()=>(0,a._)("div",{class:"date"}," 4.4 ",-1))),g={class:"cols sm-hidden md4 lg3 xl2 list"},m={class:"card-content"};function w(e,t,s,i,w,C){const P=(0,a.up)("au-select"),k=(0,a.up)("pagination"),L=(0,a.up)("calender");return(0,a.wg)(),(0,a.iD)("div",l,[(0,a._)("div",o,[(0,a._)("div",n,[(0,a._)("div",c,[(0,a.Wm)(P,{class:"filter-select",dataList:w.years,onChange:C.changeYear},null,8,["dataList","onChange"]),(0,a.Wm)(P,{class:"filter-select",dataList:Object.keys(w.paperType),onChange:C.changeProv},null,8,["dataList","onChange"]),(0,a.Wm)(P,{class:"filter-select",dataList:w.paperType[w.filterParam.prov],onChange:C.changeType},null,8,["dataList","onChange"])]),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(w.filteredPaperList,(e=>((0,a.wg)(),(0,a.iD)("div",p,[(0,a._)("div",d,[(0,a._)("div",{class:"title",onClick:t=>C.goto(`/zhenti/${e.year}_${e.prov}_${e.type}`)},(0,r.zw)(e.title),9,h),(0,a._)("div",y,[e.finished?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"tag analysis",onClick:t=>C.goto(`/zhenti/analysis/${e.year}_${e.prov}_${e.type}`)},"查看解析",8,u)):((0,a.wg)(),(0,a.iD)("div",v)),f])])])))),256)),w.totalPages>1?((0,a.wg)(),(0,a.j4)(k,{key:0,totalPages:w.totalPages,onPageChange:C.handlePageChange},null,8,["totalPages","onPageChange"])):(0,a.kq)("",!0)]),(0,a._)("div",g,[(0,a._)("div",m,[(0,a.Wm)(L)])])])])}s(7658);var C=s(6086),P=s(8316),k=s(3438),L=s(9241),_={components:{calender:C.Z,auSelect:L.Z},data(){return{totalPages:0,paperList:[{title:"2022年江苏省公务员录用考试《行测》题（C类）（网友回忆版）",year:2022,prov:"js",type:"C"},{title:"2023年国家公务员录用考试《行测》题（副省级网友回忆版）",year:2023,prov:"gk",type:"fs"},{title:"2024年江苏省公务员录用考试《行测》题（A类）（网友回忆版）",year:2024,prov:"js",type:"A"},{title:"2024年江苏省公务员录用考试《行测》题（C类）（网友回忆版）",year:2024,prov:"js",type:"C",time:[-1,2400,-1,3452,2080],finished:!0},{title:"2024年江苏省公务员录用考试《行测》题（B类）（网友回忆版）",year:2024,prov:"js",type:"B",time:[900,1200,600,2700,1800],finished:!0},{title:"2024年国家公务员录用考试《行测》题（地市级网友回忆版）",year:2024,prov:"gk",type:"dj"},{title:"2024年国家公务员录用考试《行测》题（副省级网友回忆版）",year:2024,prov:"gk",type:"fs"},{title:"2024年国家公务员录用考试《行测》题（行政执法卷网友回忆版）",year:2024,prov:"gk",type:"zf",finished:!0},{title:"2023年江苏省公务员录用考试《行测》题（A类）（网友回忆版）",year:2023,prov:"js",type:"A"},{title:"2023年江苏省公务员录用考试《行测》题（B类）（网友回忆版）",year:2023,prov:"js",type:"B"},{title:"2023年国家公务员录用考试《行测》题（行政执法卷网友回忆版）",year:2023,prov:"gk",type:"zf",finished:!0},{title:"2022年国家公务员录用考试《行测》题（行政执法卷网友回忆版）",year:2022,prov:"gk",type:"zf",finished:!0}],paperType:{"全部":["全部"],"国考":["全部","副省级","地市级","行政执法"],"江苏省考":["全部","A类","B类","C类"]},years:["全部",2022,2023,2024],filterMap:{"国考":"gk","江苏省考":"js","副省级":"fs","地市级":"dj","行政执法":"zf","A类":"A","B类":"B","C类":"C"},filterParam:{year:"全部",prov:"全部",type:"全部"},filteredPaperList:[]}},mounted(){this.paperList.sort(((e,t)=>{if(t.year!==e.year)return t.year-e.year;let s=e.prov.localeCompare(t.prov);return 0!==s?s:e.type.localeCompare(t.type)})),this.filteredPaperList=this.paperList},methods:{changeYear(e){this.filterParam.year=this.years[e],this.filterPaperList()},changeProv(e){this.filterParam.prov=Object.keys(this.paperType)[e],this.filterPaperList()},changeType(e){this.filterParam.type=this.paperType[this.filterParam.prov][e],this.filterPaperList()},filterPaperList(){const e="全部"!=this.filterParam.year?this.filterParam.year:null,t="全部"!=this.filterParam.prov?this.filterMap[this.filterParam.prov]:null,s="全部"!=this.filterParam.type?this.filterMap[this.filterParam.type]:null;console.log(e,t,s),this.filteredPaperList=this.paperList.filter((a=>{const r=!e||a.year===e,i=!t||a.prov===t,l=!s||a.type===s;return r&&i&&l}))},goto(e){this.$router.push(e)},handlePageChange(){},async fetchJson(){try{const e=(0,P.JU)(k.db,"jsonfiles","exampaper"),t=await(0,P.QT)(e);t.exists()?this.paperList=t.data().paperList:console.log("No such document!")}catch(e){console.error("Error fetching document:",e)}},async saveJson(){const e=this.paperList;try{await(0,P.pl)((0,P.JU)(k.db,"jsonfiles","exampaper"),{paperList:e}),console.log("Document successfully written!")}catch(t){console.error("Error writing document:",t)}}}},S=s(8998);const x=(0,S.Z)(_,[["render",w],["__scopeId","data-v-f0febbc2"]]);var j=x}}]);
//# sourceMappingURL=394.80b846ec.js.map