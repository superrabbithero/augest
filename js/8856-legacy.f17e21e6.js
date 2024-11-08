"use strict";(self["webpackChunkaugest"]=self["webpackChunkaugest"]||[]).push([[8856],{58856:function(l,n,u){u.r(n),u.d(n,{default:function(){return o}});var e=u(19812),t=(0,e._)("html",null,[(0,e._)("head"),(0,e._)("body",null,[(0,e._)("h3",null,"将rect转为path"),(0,e._)("h4",null,"问题描述"),(0,e._)("p",null,[(0,e.Uk)("最开始保存的svg的方式是通过"),(0,e._)("code",null,"<rect>"),(0,e.Uk)("标签将每一个像素点绘制成一个个正方形。这样会遇到两个问题：")]),(0,e._)("pre",null,[(0,e._)("code",{"v-pre":""},"1. 文本体太长，大部分情况下占用的空间是path的数倍。\n2. 矩形和矩形之间在一定的分辨率下会有空隙，效果不如path好\n")]),(0,e._)("h4",null,"基本思路"),(0,e._)("p",null,"第一步就是将图像描边，找到所有色块的边缘。我将每个正方形的四个边存到一个容器里，容器里如果已经存有相同边时说明这两条边实际上是两个颜色相同的矩形的邻边，则移除。遍历完成之后，容器里就是图片边缘的所有线段，长度为1个单位。"),(0,e._)("p",null,"第二步就是将线段首尾相连，找到每个闭合的路径就好了(BFS算法)。"),(0,e._)("p",null,[(0,e.Uk)("这里又需要解决一个问题，我斗胆取名为"),(0,e._)("code",null,'"甜甜圈问题"'),(0,e.Uk)("，如何用一个小路径在一个大路径中扣出一个空白区域呢？")]),(0,e._)("pre",null,[(0,e._)("code",{"v-pre":""},'<path d="M30 30h90v90h-90zM60 60v30h30v-30z" fill="currentColor"/>\n')]),(0,e._)("p",null,[(0,e._)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 150 150",width:"100",height:"100"},[(0,e._)("path",{d:"M30 30h90v90h-90zM60 60v30h30v-30z",fill:"currentColor"})])]),(0,e._)("p",null,[(0,e.Uk)("其实很简单，在同一个"),(0,e._)("code",null,"<path>"),(0,e.Uk)('里定义顺时针和逆时针两个不同的闭合路径，再填充颜色，就能绘制出空心的"甜甜圈"了！(不知道这个是不是众所周知的基本知识，网上找了很多参考都没这个直接)')]),(0,e._)("p",null,"所以说改进一下上面的第一步，将正方形的四个边以向量的形式存进去，通过向量的颜色和坐标判断是否为同一个向量，这样遍历完成之后获得的路径也是有方向的。")])],-1),h=[t];function r(l,n){return(0,e.wg)(),(0,e.iD)("section",null,h)}var _=u(48998);const p={},c=(0,_.Z)(p,[["render",r]]);var o=c}}]);
//# sourceMappingURL=8856-legacy.f17e21e6.js.map