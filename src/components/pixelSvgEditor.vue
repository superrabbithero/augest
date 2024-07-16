<template>
  <div class="tool-setting-bar">
    <div class="left">
      <div class="tool-option">
        <input type="color" v-model="currentColor">
      </div>
      <div class="tool-option">
        <div class="label" style="width: 91px">画笔大小({{penSize}}):</div>
        <input type="range" v-model="penSize" min="1" max="20">
      </div>

    </div>
    <div class="right">
      <div class="tool-option">
        {{selectRectAnimateId}}
      </div>
      <div class="icon-item" @click="undo">
        <svg-icon name="undo01"></svg-icon>
      </div>
      <div class="icon-item-box">
        <div class="icon-item" @click="dropDown('sizeSettingShow')">
          <svg-icon name="canvas01"></svg-icon>
        </div>
        <div :class="{'size-setting':true,'show':dropDownBoxShow.sizeSettingShow} " >
          画布大小：
          <div class="size">
            <input type="number" v-model="rows"  >
            <span>x</span>
            <input type="number" v-model="cols"  >
          </div>
        </div>
      </div>

      <div class="icon-item-box">
        <div class="icon-item" @click="dropDown('downloadShow')">
          <svg-icon name="download01"></svg-icon>
        </div>
        <div :class="{'size-setting':true,'show':dropDownBoxShow.downloadShow} " >
          <div class="drop-down-option" @click="saveAsSvg">保存成 svg</div>
          <div class="drop-down-option" @click="copySvgCode">复制 svg 代码</div>
          <div class="drop-down-option">保存成 png</div>
        </div>
      </div>
        
    </div>
  </div>
  <div class="work-area">
    <div class="left">
      <div class="tools-bar">
        <div :class="{'tool-item':true,'active':tool == 1}" @click="switchTool(1)">
          <svg-icon name="pencil" className="tool-item-svg"></svg-icon>
        </div>
        <div :class="{'tool-item':true,'active':tool == 2}" @click="switchTool(2)">
          <svg-icon name="eraser" className="tool-item-svg"></svg-icon>
        </div>
        <div :class="{'tool-item':true,'active':tool == 3}" @click="switchTool(3)">
          <svg-icon name="line" className="tool-item-svg"></svg-icon> 
        </div>
        <div :class="{'tool-item':true,'active':tool == 4}" @click="switchTool(4)">
          <svg-icon name="rect" className="tool-item-svg"></svg-icon>
        </div>
        <div :class="{'tool-item':true,'active':tool == 5}" @click="switchTool(5)">
          <svg-icon name="circle" className="tool-item-svg"></svg-icon>
        </div>
        <div :class="{'tool-item':true,'active':tool == 6}" @click="switchTool(6)">
          <svg-icon name="paintBuckets" className="tool-item-svg"></svg-icon>
        </div>
        <div :class="{'tool-item':true,'active':tool == 7}" @click="switchTool(7)">
          <svg-icon name="select" className="tool-item-svg"></svg-icon>
        </div>
        <div class="tool-item" @click="clearAll">
          <svg-icon name="delete02" className="tool-item-svg"></svg-icon>
        </div>
      </div>
    </div>
    <div class="middle" @pointerdown="handlePointerDown"
                        @pointermove="handlePointerMove"
                        @pointerup="handlePointerUp" ref="realViewport" @wheel="zoomWheel">
      <div style="position: absolute;left: 1rem">{{coordinate}}</div>
      <div class="drawing-area" >
        <canvas :width="width" :height="height"  class="gridsytle" :style="canvasStyle" ref="canvas">
          
        </canvas>
      </div>
    </div>
    <div class="right">
      <div class="overview" @pointermove="dragViewportMove" @pointerup="dragViewportUp" @wheel="zoomWheel">
        <canvas class="gridsytle" ref="canvas_overview" :style="overviewStyle" :width="overviewSize.width" :height="overviewSize.height"></canvas>
        <div class="viewport" ref="viewport" @pointerdown="dragViewportDown"></div>
      </div>
      <div class="overview-tools">
        <div class="icon-item" @click="zoomIn">
          <svg-icon name="zoomIn"></svg-icon>
        </div>
        <div class="icon-item" @click="zoomOut">
          <svg-icon name="zoomOut"></svg-icon>
        </div>
        <input type="range" style="width: 80px;" min="10" max="100" v-model="scaleCount" @input="resizeViewport">
        <div class="icon-item" @click="zoomFit">
          <svg-icon name="fit01"></svg-icon>
        </div>
      </div>
      <div class="color-tools">
        <div v-for="(color,index) in myColors" class="color-item" :style="{backgroundColor:color}" 
              @pointerdown="handleStart(event,index)"
              @pointermove="handleMove(event,index)"
              @pointerup="handleEnd(event,index)"
              >{{index}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    width() {
      return this.cols*this.gridSize;
    },
    height() {
      return this.rows*this.gridSize;
    },
    overviewSize() {
      let width = 180
      let height = width/this.cols*this.rows
      if(height > 140){
        height = 140
        width = height/this.rows*this.cols
      }
      return {width,height}
    },
    overviewStyle(){
      const size = this.overviewSize.width/this.cols
      return {
           // 背景大小必须小于盒子的大小 
          backgroundSize: `${2*size}px ${2*size}px`,
          // 第二种渐变的偏移必须为为背景大小的一半 
          backgroundPosition: `0 0 , ${size}px ${size}px`
      }
    },
    canvasStyle(){
      
      const scale = this.scaleCount/100
      const size = this.gridSize*scale
      return {
           // 背景大小必须小于盒子的大小 
          width:`${this.width*scale}px`,
          height:`${this.height*scale}px`,
          backgroundSize: `${2*size}px ${2*size}px`,
          // 第二种渐变的偏移必须为为背景大小的一半 
          backgroundPosition: `0 0 , ${size}px ${size}px`
      }
    },
 },
  data() {
    return {
      tool:1,
      rows:15,
      cols:15,
      gridSize:100,
      coordinate:'x:0,y:0',
      currentColor:'#000',
      bkgColor:"#fff",
      myColors:['#000','#fff','#f44336','#e91e63','#3f51b5','#00bcd4','#4caf50','#ffeb3b'],
      colorIndex:0,
      isDrawing: false,
      pixels: [],
      endPoints:{x:0,y:0},
      maincanvas:null,
      ctx:null,
      ovCtx:null,
      historys:[],
      log:"",
      shiftdown:false,
      dropDownBoxShow:{
        sizeSettingShow:false,
        downloadShow:false
      },
      penSize:1,
      scaleCount:30,
      minScaleCount:30,
      viewport:null,
      disx:0,
      disy:0,
      selectedRect:{x:0,y:0,width:0,height:0},
      offscreenCanvas:null,
      selectedImgData:null,
      selectedBgData:null,
      isDragingSelectRect:false,
      selectRectAnimateId:0,
      pressTimer:null
    };
  },
  mounted() {
    this.init()
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.$refs.realViewport.addEventListener('scroll', this.viewportScroll);

  },
  unmounted(){
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    if(this.$refs.realViewport){
      this.$refs.realViewport.removeEventListener('scroll', this.viewportScroll);
    }
  },
  methods: {

    //颜色卡片长按事件
    handleStart(event,index){
      this.pressTimer = setTimeout(() => {
        this.setting_show = true
        clearTimeout(this.pressTimer)
        this.pressTimer = null
      }, 500);
    },
    handleMove(event,index){
      if (this.pressTimer) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
      }
    },
    handleEnd(event,index){
      // 如果定时器还在，说明是点击事件
      if (this.pressTimer) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
        this.selectColor(index)
      }
    },
    selectColor(index){
      this.currentColor = this.myColors[index]
    },
    switchTool(index){
      if(this.tool!= index){
        if(this.tool == 7){
          this.selectedImgData = null
          this.selectedRect = {x:0,y:0,width:0,height:0}
          cancelAnimationFrame(this.selectRectAnimateId)
          this.selectRectAnimateId = 0
          this.showLastHistory()
        }
        if(index == 7){
          this.selectedBgData = this.ctx.getImageData(0,0,this.width,this.height)
        }
        this.tool = index
      }
    },
    updateOverview(){
      this.ovCtx.clearRect(0,0,this.overviewSize.width,this.overviewSize.height)
      this.ovCtx.drawImage(
        this.maincanvas,
        0,0,this.width,this.height,
        0,0,this.overviewSize.width,this.overviewSize.height
      )
    },
    dropDown(keyname){
      const keys = Object.keys(this.dropDownBoxShow)
      if(this.dropDownBoxShow[keyname]){
        keys.forEach(key => {
          this.dropDownBoxShow[key] = false
        })
      }else{
        keys.forEach(key => {
          this.dropDownBoxShow[key] = false
        })
        this.dropDownBoxShow[keyname] = true
      }
    },
    switchColor(point){
      const color = this.getColorAtPixel(point)
      const currentColor = 'rgba('+color.r+','+color.g+','+color.b+','+color.a+')'
      if(currentColor != 'rgba(0,0,0,0)'){
        this.currentColor = currentColor
      }
    },
    handleKeyDown(event) {
      if (event.key === 'Shift') {
        this.shiftdown = true;
      }
    },
    handleKeyUp(event) {
      if (event.key === 'Shift') {
        this.shiftdown = false;
      }
    },
    init(){
      if (window.PointerEvent) { 
        // Pointer events are supported. 
        this.log="Pointer events are supported."
      }
      this.maincanvas = this.$refs.canvas;
      const overview = this.$refs.canvas_overview
      this.ctx = this.maincanvas.getContext('2d');
      this.ctx.lineWidth = 5
      this.ovCtx = overview.getContext('2d')
      this.addHistory()
      this.resizeViewport()
      this.getMinScale()
      this.scaleCount = this.minScaleCount
      this.offscreenCanvas = document.createElement('canvas');
    },
    getMinScale(){
      const realViewport = this.$refs.realViewport
      let width = realViewport.clientWidth
      let height = width/this.cols*this.rows
      if(height > realViewport.clientHeight){
        height = realViewport.clientHeight
        width = height/this.rows*this.cols
      }
      this.minScaleCount = Math.floor(100*width/this.width)
      this.log = this.minScaleCount
    },
    
    handlePointerDown(event){
      
      this.endPoints = this.getPoint({x:event.clientX,y:event.clientY})

      if(this.tool == 2) {
        this.isDrawing = true
        this.clearPixel(this.endPoints)
      }else if(this.tool < 6) {
        this.isDrawing = true
        this.drawPixel(this.endPoints)
      }else if(this.tool == 6){
        this.ctx.fillStyle = this.currentColor
        this.fillArea(this.endPoints);
        this.addHistory()
      }else if(this.tool == 7){
        this.ctx.beginPath()
        this.ctx.rect(this.selectedRect.x,this.selectedRect.y,this.selectedRect.width,this.selectedRect.height)
        this.ctx.closePath()
        const isPointInPath = this.ctx.isPointInPath(this.endPoints.x,this.endPoints.y)
        if(isPointInPath){
          //开始拖拽
          if(!this.selectedImgData){
            this.showLastHistory()
            this.selectedImgData = this.ctx.getImageData(this.selectedRect.x,this.selectedRect.y,this.selectedRect.width,this.selectedRect.height)
            this.offscreenCanvas.width = this.selectedRect.width;
            this.offscreenCanvas.height = this.selectedRect.height;
            const offscreenCtx = this.offscreenCanvas.getContext('2d');
            this.showLastHistory()
            this.ctx.clearRect(this.selectedRect.x,this.selectedRect.y,this.selectedRect.width,this.selectedRect.height)
            this.selectedBgData = this.ctx.getImageData(0,0,this.width,this.height)
            offscreenCtx.putImageData(this.selectedImgData,0,0)
             
          }else{
            //如果已经选了图像了则不用重新绘制区域图片
            this.ctx.putImageData(this.selectedBgData,0,0)
          }
          this.disx = this.endPoints.x - this.selectedRect.x
          this.disy = this.endPoints.y - this.selectedRect.y
          
          this.isDragingSelectRect = true
          
          this.ctx.drawImage(this.offscreenCanvas, this.selectedRect.x-1, this.selectedRect.y-1)
        }else{
          //选择新的区域
          this.showLastHistory()

          if(this.selectRectAnimateId == 0){
            this.selectRectAnimateId = requestAnimationFrame(this.dashedRectAnimate)
          }
          // this.newSelected = true
          this.selectedImgData = null
          this.selectedRect = {x:0,y:0,width:0,height:0}
          this.selectedBgData = this.ctx.getImageData(0,0,this.width,this.height)
          
          //选择区域
          this.isDrawing = true
        }
      }
    },

    handlePointerMove(event){
      this.ctx.fillStyle = this.currentColor
      this.ctx.strokeStyle = this.currentColor
      const currPoint = this.getPoint({x:event.clientX,y:event.clientY})
      if(this.isDrawing){
        if(this.tool == 1){
          this.drawLine(this.endPoints, currPoint)
          this.endPoints = currPoint
        }else if(this.tool == 2){
          this.clearPixel(currPoint)
        }else if(this.tool == 3){
          this.showLastHistory()
          this.drawLine(this.endPoints, currPoint)
        }else if(this.tool == 4){
          this.showLastHistory()
          this.drawRect(this.endPoints, currPoint)
        }else if(this.tool == 5){
          this.showLastHistory()
          this.drawPixelEllipse(this.endPoints, currPoint)
        }else if(this.tool == 7){
          this.showLastHistory()
          this.select(this.endPoints, currPoint)
        }
      }else{
        if(this.tool == 7 && this.isDragingSelectRect){
          // this.ctx.putImageData(this.selectedBgData, 0, 0)
          this.selectedRect.x = currPoint.x-this.disx
          this.selectedRect.y = currPoint.y-this.disy
          // window.cancelAnimationFrame(this.selectRectAnimateId)
          // this.ctx.drawImage(this.offscreenCanvas,this.selectedRect.x-1, this.selectedRect.y-1)
          
        }else if(this.tool < 6 ){
          this.showLastHistory()
          this.overMove(currPoint)
        }
      }
    },
    select(start,end){
      const x = Math.min(start.x,end.x)
      const y = Math.min(start.y,end.y)
      const width = Math.abs(end.x-start.x)+this.gridSize
      const height = Math.abs(end.y-start.y)+this.gridSize
      this.selectedRect = {x, y, width, height}
    },
    drawDashedRect(){
      this.ctx.lineDashOffset = (this.ctx.lineDashOffset+1)%100
      this.ctx.setLineDash([0])
      this.ctx.strokeStyle = "#fff"
      this.ctx.strokeRect(this.selectedRect.x-5,this.selectedRect.y-5, this.selectedRect.width+10, this.selectedRect.height+10)
      this.ctx.setLineDash([50])
      this.ctx.strokeStyle = "#000"
      this.ctx.strokeRect(this.selectedRect.x-5,this.selectedRect.y-5, this.selectedRect.width+10, this.selectedRect.height+10)
      this.ctx.fillStyle = "rgba(0,0,0,0.3)"
      this.ctx.fillRect(this.selectedRect.x,this.selectedRect.y, this.selectedRect.width, this.selectedRect.height)
      this.ctx.fillStyle = this.currentColor
    },
    dashedRectAnimate(){
      this.ctx.putImageData(this.selectedBgData,0,0)
      if(this.selectedRect.width*this.selectedRect.height != 0 ){
        this.drawDashedRect()
      }
      if(this.selectedImgData){
        this.ctx.drawImage(this.offscreenCanvas,this.selectedRect.x, this.selectedRect.y)
      }
      this.selectRectAnimateId = requestAnimationFrame(this.dashedRectAnimate)
    },
    selectSave(){
      this.ctx.putImageData(this.selectedBgData,0,0)
      this.ctx.drawImage(
        this.offscreenCanvas,
        0,0,this.selectedRect.width, this.selectedRect.height,
        this.selectedRect.x,this.selectedRect.y,this.selectedRect.width, this.selectedRect.height)
      this.addHistory()
      
    },
    handlePointerUp(){
      if(this.isDrawing){
        this.isDrawing = false
        if(this.tool == 7){
          //选择区域结束判断选择区域,如果长或宽小于0则关闭选择动画，取消选择
          if(this.selectedRect.width*this.selectedRect.height == 0){
            cancelAnimationFrame(this.selectRectAnimateId)
            this.selectRectAnimateId = 0
            this.selectedRect = {x:0,y:0,width:0,height:0}
            this.selectedImgData = null
          }
        }else{
          this.addHistory()
        }
      }
      if(this.isDragingSelectRect){
        this.isDragingSelectRect = false
        this.selectSave()
        // this.dashedRectAnimate()
      }
      
    },
    drawPixel(point, size=this.penSize){
      this.ctx.fillStyle = this.currentColor
      const x = point.x/this.gridSize - Math.floor(size/2)
      const y = point.y/this.gridSize - Math.floor(size/2)
      this.ctx.fillRect(this.gridSize*x,this.gridSize*y,this.gridSize*size,this.gridSize*size)
    },
    overMove(point){
      this.ctx.fillStyle = 'rgba(0,0,0,0.3)'
      const size = this.penSize
      const x = point.x/this.gridSize - Math.floor(size/2)
      const y = point.y/this.gridSize - Math.floor(size/2)
      this.ctx.fillRect(this.gridSize*x,this.gridSize*y,this.gridSize*size,this.gridSize*size)
    },
    clearPixel(point){
      const size = this.penSize
      const x = point.x/this.gridSize - Math.floor(size/2)
      const y = point.y/this.gridSize - Math.floor(size/2)
      this.ctx.clearRect(this.gridSize*x,this.gridSize*y,this.gridSize*size,this.gridSize*size)
    },
    // 直线BH算法https://blog.csdn.net/myf_666/article/details/128164135
    drawLine(start,end){
      let x = start.x
      let y = start.y
      let dx = Math.abs(end.x - start.x)
      let dy = Math.abs(end.y - start.y)
      let sx = (start.x < end.x)? this.gridSize : -this.gridSize
      let sy = (start.y < end.y)? this.gridSize : -this.gridSize
      let err = dx - dy
      while(true){
        this.drawPixel({x,y})
        if(x === end.x && y === end.y) break
        let e2 = 2 * err;
        if(e2 > -dy){
          err -= dy;
          x += sx;
        }
        if(e2 < dx){
          err += dx;
          y += sy
        }
      }
    },
    
    drawRect(start,end){
      let rightUp, leftDown;

      if (this.shiftdown) {
        // 计算水平和垂直距离
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;

        // 选择较小的距离作为正方形的边长
        const sideLength = Math.min(Math.abs(deltaX), Math.abs(deltaY));

        // 根据方向调整 end 点的位置
        if (deltaX > 0 && deltaY > 0) {
          end = { x: start.x + sideLength, y: start.y + sideLength };
        } else if (deltaX > 0 && deltaY < 0) {
          end = { x: start.x + sideLength, y: start.y - sideLength };
        } else if (deltaX < 0 && deltaY > 0) {
          end = { x: start.x - sideLength, y: start.y + sideLength };
        } else {
          end = { x: start.x - sideLength, y: start.y - sideLength };
        }
      }

      rightUp = { x: end.x, y: start.y };
      leftDown = { x: start.x, y: end.y };

      this.drawLine(start, rightUp);
      this.drawLine(leftDown, end);
      this.drawLine(start, leftDown);
      this.drawLine(rightUp, end);
      
    },
    //椭圆BH算法https://www.cnblogs.com/fortunely/p/17681502.html
     drawPixelEllipse(start, end) {
      const xc = (start.x + end.x) / 2 / this.gridSize + 0.5
      const rx = Math.abs((end.x - start.x) / this.gridSize / 2);
      const drx = end.y>start.y ? rx : -rx
      const yc = this.shiftdown ? start.y/this.gridSize + drx + 0.5 : (start.y + end.y) / 2 / this.gridSize + 0.5
      const ry = this.shiftdown ? rx : Math.abs((end.y - start.y) / this.gridSize / 2);

      let x = rx%1 ? 0.5 : 0;
      let y = ry;
      let d1 = Math.ceil(ry * ry - rx * rx * ry + 0.25 * rx * rx);
      let dx = 2 * ry * ry * x;
      let dy = 2 * rx * rx * y;
      this.drawEllipsePoints(xc, yc, x, y)

      while (dx < dy) {
        x++
        dx += 2 * ry * ry;
        if (d1 <= 0) {
          d1 += dx + ry * ry;
        } else {
          y--;
          dy -= 2 * rx * rx;
          d1 += dx - dy + ry * ry;
        }
        
        this.drawEllipsePoints(xc, yc, x, y)
      }

      let d2 = Math.ceil(ry * ry * (x + 0.5) * (x + 0.5) + rx * rx * (y - 1) * (y - 1) - rx * rx * ry * ry);
      while (y > 0) {
        y--
        dy -= 2 * rx * rx
        if (d2 <= 0) {
          x++
          dx += 2 *ry*ry
          d2 += ry*ry - dy + dx
          
        } else {
          d2 += rx * rx - dy
        }
        this.drawEllipsePoints(xc, yc, x, y)
      }
    },
    drawEllipsePoints(xc, yc, x, y) {
      xc -= 0.5
      yc -= 0.5
      this.drawPixel({ x: (xc + x) * this.gridSize, y: (yc - y) * this.gridSize });
      this.drawPixel({ x: (xc - x) * this.gridSize, y: (yc - y) * this.gridSize });
      this.drawPixel({ x: (xc - x) * this.gridSize, y: (yc + y) * this.gridSize });
      this.drawPixel({ x: (xc + x) * this.gridSize, y: (yc + y) * this.gridSize });
    },
    // 在你的像素画板中实现一个填充功能（类似于“油漆桶”工具），你需要用到一种称为“洪水填充”（Flood Fill）算法。这个算法将会递归地或使用队列填充相同颜色的相邻像素。为了避免递归深度过深导致栈溢出，我们可以使用队列来实现非递归的广度优先搜索（BFS）填充算法。
    fillArea(startPoint) {
      const targetColor = this.getColorAtPixel(startPoint);
      const fillColor = this.hexToArgb(this.ctx.fillStyle);

      if (this.colorsMatch(targetColor, fillColor)) {
        return; // 避免填充相同颜色的区域
      }

      const stack = [startPoint];
      const { width, height } = this.$refs.canvas;
      const visited = new Set();

      const key = (x, y) => `${x},${y}`;
      
      while (stack.length) {
        const { x, y } = stack.pop();
        const currentColor = this.getColorAtPixel({ x, y });

        if (!visited.has(key(x, y)) && this.colorsMatch(currentColor, targetColor)) {
          this.drawPixel({ x, y }, 1);
          visited.add(key(x, y));

          if (x > 0) stack.push({ x: x - this.gridSize, y });
          if (x < width - this.gridSize) stack.push({ x: x + this.gridSize, y });
          if (y > 0) stack.push({ x, y: y - this.gridSize });
          if (y < height - this.gridSize) stack.push({ x, y: y + this.gridSize });

        }
      }
    },
    getColorAtPixel(point) {
      const { data } = this.ctx.getImageData(point.x, point.y, 1, 1);
      return data.slice(0, 4);
    },
    hexToArgb(hex) {
      if (hex[0] === '#') hex = hex.slice(1);
      const bigint = parseInt(hex, 16);
      if (hex.length === 8) {
        return [(bigint >> 24) & 255, (bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
      } else if (hex.length === 6) {
        return [255, (bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
      } else if (hex.length === 4) {
        return [(bigint >> 12) & 15 * 17, (bigint >> 8) & 15 * 17, (bigint >> 4) & 15 * 17, bigint & 15 * 17];
      } else if (hex.length === 3) {
        return [255, (bigint >> 8) & 15 * 17, (bigint >> 4) & 15 * 17, bigint & 15 * 17];
      }
      return [0, 0, 0, 0]; // 默认返回透明黑色
    },
    colorsMatch(color1, color2) {
      return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
    },
    clearAll(){
      this.selectedRect = {x:0,y:0,width:0,height:0}
      this.selectedImgData = null
      this.ctx.clearRect(0,0,this.width,this.height)
      cancelAnimationFrame(this.selectRectAnimateId)
      this.selectRectAnimateId = 0
      this.addHistory()
    },
    isRectEqual(rect1, rect2) {
      return rect1.x === rect2.x &&
             rect1.y === rect2.y &&
             rect1.width === rect2.width &&
             rect1.height === rect2.height;
    },
    getPoint(point){
      const scale = this.scaleCount/100
      const rect = this.$refs.canvas.getBoundingClientRect();
      const x = Math.floor((point.x - rect.left) / this.gridSize/scale)*this.gridSize
      const y = Math.floor((point.y - rect.top) / this.gridSize/scale)*this.gridSize
      this.coordinate = `x:${x / this.gridSize},y:${y / this.gridSize}`
      return {x,y}
    },
    showLastHistory() {
      const history = this.historys
      // this.ctx.putImageData(history[history.length - 1]['data'], 0, 0)
      const imageData = history[history.length - 1]['data']
      this.ctx.putImageData(imageData, 0, 0)
      // const scaledImage = this.ctx.getImageData(0, 0, imageData.width, imageData.height);
      // this.ctx.clearRect(0,0,this.width,this.height)
      // this.ctx.drawImage(this.maincanvas, 0, 0, imageData.width, imageData.height, 0, 0, this.width, this.height);
    },
    addHistory() {
      this.historys.push({
        data: this.ctx.getImageData(0, 0, this.width, this.height)
      })
      this.updateOverview()
    },
    undo(){
      var history = this.historys;
      
      if(history && history.length > 1){
        history.pop();
        this.showLastHistory();
        this.updateOverview()
      }

      //清空选择区域
      this.selectedImgData = null
      this.selectedRect = {x:0,y:0,width:0,height:0}
      cancelAnimationFrame(this.selectRectAnimateId)
      this.selectRectAnimateId = 0
    },
    getSvgContent(filled=false){
      const width = this.width;
      const height = this.height;
      const imageData = this.ctx.getImageData(0, 0, width, height)

      //解析像素数据，gpt生成代码
      const pixels = imageData.data;

      let pixelData = [];
      for (let y = 0; y < height; y+=this.gridSize) {
        for (let x = 0; x < width; x+=this.gridSize) {
          const index = (y * width + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const a = pixels[index + 3];

          // 只保存非透明像素
          if (a > 0) {
            pixelData.push({ x:x*0.3, y:y*0.3, r, g, b, a });
          }
        } 
      }
    
      //生成svg文件,gpt生成代码
      let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width*0.3} ${height*0.3}">`;
      
      pixelData.forEach(pixel => {
        let color = `rgba(${pixel.r},${pixel.g},${pixel.b},${pixel.a})`
        if(color =='rgb(0,0,0,0)'){
          color = "currentColor"
        }
        svgContent += `<rect x="${pixel.x}" y="${pixel.y}" width="30" height="30" fill="${color}" />`;
      });

      svgContent += '</svg>';
      return svgContent
      
    },
    copySvgCode(){
      const content = this.getSvgContent()
      this.copyToClipboard(content)
    },
    saveAsSvg(){
      const svgContent = this.getSvgContent()
      //保存svg文件
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      this.saveImage(url)
    },
    saveImage(url){
      const link = document.createElement('a');
      link.href = url;
      link.download = 'drawing.svg';
      link.click();

      URL.revokeObjectURL(url);
    },
    async copyToClipboard(content) {
      try {
        await navigator.clipboard.writeText(content);
        this.$toast.show('复制成功','success')
      } catch (err) {
        this.$toast.show(err,'error')
      }
    },
    dragViewportDown(e){
      this.$refs.realViewport.removeEventListener('scroll', this.viewportScroll);
      this.viewport = this.$refs.viewport
      this.disx = e.pageX - this.viewport.offsetLeft
      this.disy = e.pageY - this.viewport.offsetTop
      this.resizeViewport()
    },
    dragViewportMove(e){
      if(this.viewport){
        const overview = this.$refs.canvas_overview
        const realViewport = this.$refs.realViewport
        const scale = overview.clientWidth/this.maincanvas.clientWidth

        var left = e.pageX - this.disx
        var top = e.pageY - this.disy
        const leftmax = overview.offsetLeft +  overview.clientWidth - this.viewport.clientWidth - 2
        const topmax = overview.offsetTop + this.viewport.parentElement.clientHeight - this.viewport.clientHeight - 2
        left = Math.max(overview.offsetLeft, Math.min(left, leftmax));
        top = Math.max(overview.offsetTop, Math.min(top, topmax));
        this.viewport.style.left = left + 'px';
        this.viewport.style.top = top + 'px';
        this.log = `${overview.offsetLeft}`
        const scrollLeft = (left - overview.offsetLeft)/scale
        const scrollTop = (top - overview.offsetTop)/scale
        realViewport.scrollTop = scrollTop
        realViewport.scrollLeft = scrollLeft
      }
    },
    dragViewportUp(){
      this.$refs.realViewport.addEventListener('scroll', this.viewportScroll);
      if(this.viewport)
        this.viewport=null
    },
    viewportScroll(){
      this.log = `${this.$refs.realViewport.scrollTop},${this.$refs.realViewport.scrollLeft}`
      this.resizeViewport()
    },
    zoomWheel(event){
      event.preventDefault()
      const deltaY = event.deltaY
      if(deltaY < 0){
        var scale = Number(this.scaleCount) + 1
        this.scaleCount = Math.min(scale,100)
      }else{
        var scale = Number(this.scaleCount) - 1
        this.scaleCount = Math.max(scale,10)
      }
      this.resizeViewport()
    },
    zoomIn(){
      var scale = Number(this.scaleCount) + 10
      this.scaleCount = Math.min(scale,100)
      this.resizeViewport()
    },
    zoomOut(){
      var scale = Number(this.scaleCount) - 10
      this.scaleCount = Math.max(scale,10)
      this.resizeViewport()
    },
    zoomFit(){
      this.getMinScale()
      this.scaleCount = this.minScaleCount
      this.resizeViewport()
    },
    resizeViewport(){
      //设置viewport大小
      const overview = this.$refs.canvas_overview
      const realViewport = this.$refs.realViewport
      const scale = overview.clientWidth/this.maincanvas.clientWidth
      this.$nextTick(()=>{
        const viewportWidth = realViewport.clientWidth*scale
        const viewportHeight = realViewport.clientHeight*scale
        this.$refs.viewport.style.width = `${Math.floor(Math.min(viewportWidth,overview.clientWidth))}px`
        this.$refs.viewport.style.height = `${Math.floor(Math.min(viewportHeight,overview.clientHeight)-1)}px`
        const viewportTop = this.$refs.canvas_overview.offsetTop + this.$refs.realViewport.scrollTop*scale
        const viewportLeft = this.$refs.canvas_overview.offsetLeft + this.$refs.realViewport.scrollLeft*scale
        this.$refs.viewport.style.top = `${viewportTop}px`
        this.$refs.viewport.style.left = `${viewportLeft}px`
      })
    },
  },
};
</script>

<style>
.drawing-area {
  border: 0.5px solid #d9d9d9;
  width: fit-content;
  font-size: 0;

  height: fit-content;
}
canvas {
  position: relative;
  z-index: 1;
  touch-action: none;
}
.canvas-grid {
  position: absolute;
  top: 0;
  left: 0;
}
.tools-bar {
  display: flex;
  flex-wrap: wrap;
  width: 84px;
  height: fit-content;
  
}
.tool-item{
  width: 30px;
  height: 30px;
  display: flex;
  padding: 5px;
  margin: 1px;
  border-radius: 5px;
}

.tool-item-svg {
  width: 30px !important;
  height: 30px !important;
}

.tool-item:hover , .tool-item.active{
  background-color: var(--white-highlight);
}
.tool-item img{
  width: 30px;
  height: 30px;
}

.tool-setting-bar {
  height: 30px;
  border-bottom: var(--box-border);
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
}
.tool-setting-bar > div{
  display: flex;
  height: 100%
}
.work-area{
  display: flex;
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 91px);
}

.work-area .middle{
  flex: 1;
  position: relative;
  display: flex;
  justify-content: space-around;
  overflow: auto;
  border-left: var(--box-border);
  user-select: none;
  padding: 0;
}

.work-area .right{
  border-left: var(--box-border);
  width: 180px
}

.overview {
  width: 180px;
  height: 140px;
  background-color: var(--canvas-bgc);
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}



.viewport{
  position: absolute;
  width: 20px;
  height: 30px;
  background-color: transparent;
  border: 1px solid #425aef;
  box-shadow: 0 0 0 5000px rgba(0, 0, 0, 0.3); /* 创建透明区域 */
  z-index: 2;
}

.overview-tools{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.work-area > div{
  padding: 5px;
}

.icon-item-box{
  position: relative;
}


.icon-item {
  padding:2px;
  width:26px;
  height: 26px;
}

.icon-item:hover {
  background-color: var(--white-highlight);
}

.size-setting {
  position: absolute;
  background-color: var(--box-bgc);
  border: var(--box-border);
  right: 0;
  top: 30px;
  border-radius: 8px;
  padding: 8px;
  z-index: 999;
  opacity: 0;
  transform: translateY(15%);
  transition: opacity 0.5s ease,transform 0.5s ease;
  pointer-events: none;

}

.size-setting.show{
  pointer-events: all;
  opacity: 1;
  transform: translateY(0)
}

.size-setting .size{
  display: flex;
  width: 140px;
  align-items: center;
}

.size-setting .size > input {
  width: 40px;
}

.tool-option {
  height: 100%;
  display: flex;
  align-items: center;
  margin: 2px;
}

.tool-option .label{
  font-size: 15px;
  line-height: 15px;
}

.tool-option input[type='range']{
  width: 90px;
  height: 15px;
}

.drop-down-option{
  width: 120px;
  padding: 5px;
  cursor: pointer;
}

.drop-down-option:hover{
  background-color: var(--white-highlight)
}

.gridsytle{
  background: linear-gradient(
      -45deg,
      #d9d9d9 25%,
      transparent 25%,
      transparent 75%,
      #d9d9d9 75%,
      #d9d9d9 100%
    ),
    linear-gradient(
      -45deg,
      #d9d9d9 25%,
      transparent 25%,
      transparent 75%,
      #d9d9d9 75%,
      #d9d9d9 100%
    );
  background-color: white;
}

.color-tools {
  display: flex;
  flex-wrap: wrap
  
}


.color-item {
  width: 30px;
  height: 30px;
  /* margin: 1px; */
  /* box-shadow: inset 1px 1px 0px 1px rgb(110, 110, 110); */
}

.color-item.active {
  box-shadow: inset 0px 0px 0px 2px rgb(255, 255, 255);
}

.color-item:hover {
  box-shadow: inset 0px 0px 0px 2px rgba(255, 255, 255, 0.8);
}


</style>
