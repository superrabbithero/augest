<template>
  <my-model :show="modal_show.newFileModalShow" :modeless="false" modalKey="newFileModalShow">
    <div class="center-h">
      <label>画布大小：</label>
      <div class="size">
        <input type="text" v-model="newFileForm.rows"  >
        <span>x</span>
        <input type="text" v-model="newFileForm.cols"  >
      </div>
    </div>
    <div class="center-h" style="align-items: flex-end">
      <label>画布预设：</label>
      <div v-for="size in [64,32,16,13,11]" @click="newFileForm.rows = size,newFileForm.cols = size" :style="{width: `${size}px`,height: `${size}px`,fontSize: `${size*0.5}px`,border: `1px solid var(--fontNormal)`,marginRight: `4px`,cursor: `pointer`}">
        {{size}}<sup>2</sup>
      </div>
    </div>
    <div class="center-h"> 
      <label>网格大小:</label>
      <input type="text" v-model="newFileForm.gridSize"  >
    </div>
    <div class="center-h">
      <label>导出网格大小:</label>
      <input type="text" v-model="newFileForm.outputSize"  >
    </div>
    <div class="center-h left">
      <button class="fill" @click="newFile()">新  建</button>
    </div>
  </my-model>
  <div class="tool-setting-bar">
    <div class="left">
      <div class="tool-option" @click="modal_show.newFileModalShow = true">
        <svg-icon name="file-create01"></svg-icon>
      </div>
      <div class="tool-option">
        <div class="label" style="width: 91px">画笔大小({{penSize}}):</div>
        <input type="range" style="color: currentColor" v-model="penSize" min="1" max="20">
      </div>
    </div>
    <div class="right">
      <div class="icon-item" @click="gifToolsShow=!gifToolsShow">
        <svg-icon name="file-gif"></svg-icon>
      </div>
      <div class="icon-item" @click="toolsShow=!toolsShow">
        <svg-icon name="phone"></svg-icon>
      </div>
      <div class="icon-item" @click="undo">
        <svg-icon name="undo01"></svg-icon>
      </div>
      <div class="icon-item-box"  @click="dropDown($event,'sizeSettingShow')">
        <div class="icon-item">
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

      <div class="icon-item-box" @click="dropDown($event,'downloadShow')">
        <div class="icon-item" >
          <svg-icon name="download01"></svg-icon>
        </div>
        <div :class="{'size-setting':true,'show':dropDownBoxShow.downloadShow} " >
          <div class="drop-down-option" @click="saveAsSvg">保存成 svg</div>
          <div class="drop-down-option" @click="copySvgCode">复制 svg 代码</div>
          <div class="drop-down-option" @click="saveAsPng">保存成 png</div>
          <div class="drop-down-option" @click="saveAsGif">保存成 gif</div>
        </div>
      </div>
        
    </div>
  </div>
  <div class="work-area">
    <div style="display: flex;flex-grow: 1;overflow: hidden;">
      <auDraged>

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
          <div class="tool-item" @click="openFileInput">
            <svg-icon name="picture-add" className="tool-item-svg"></svg-icon>
            <!-- 文件上传按钮 -->
            <input v-show="false" type="file" id="fileInput" @change="importImg" accept="image/*">
          </div>
          <div class="tool-item-fullscreen">
            <div class="color back" :style="{backgroundColor:bkgColor}" @click="[currentColor,bkgColor] = [bkgColor,currentColor]"></div>
            <div class="color front" :style="{backgroundColor:currentColor}">
              <input type="color" class="colorInput-hidden" ref="addColor1" @change="addColor($event)">
            </div>
          </div>
        </div>
      </auDraged>
      <div class="middle" 
                          @pointermove="handlePointerMove"
                          @pointerup="handlePointerUp" ref="realViewport" @wheel="zoomWheel">
        <div style="position: absolute;left: 1rem">{{coordinate}}</div>
          <div class="drawing-area" @pointerdown="handlePointerDown">
            <canvas :width="width" :height="height"  class="gridstyle" :style="canvasStyle" ref="canvas">
              
            </canvas>
          </div>
        
      </div>
      <div class="right" v-show="toolsShow">
        <div class="overview" @pointermove="dragViewportMove" @pointerup="dragViewportUp" @wheel="zoomWheel">
          <canvas class="gridstyle" ref="canvas_overview" :style="overviewStyle" :width="overviewSize.width" :height="overviewSize.height"></canvas>
          <div class="viewport" ref="viewport" @pointerdown="dragViewportDown"></div>
        </div>
        <div class="overview-tools">
          <div class="icon-item" @click="zoomIn">
            <svg-icon name="zoomIn11-1"></svg-icon>
          </div>
          <div class="icon-item" @click="zoomOut">
            <svg-icon name="zoomOut11-1"></svg-icon>
          </div>
          <input type="range" style="width: 80px; color: currentColor;" min="10" max="100" v-model="scaleCount" @input="resizeViewport">
          <div class="icon-item" @click="zoomFit">
            <svg-icon name="zoomFit11-1"></svg-icon>
          </div>
        </div>
        <au-select :dataList="['默认','Pixel-8']" @change="changeMyColor" style="margin-bottom: 5px;"></au-select>
        <div class="color-tools" ref="colorTools" @pointermove="handleMove($event,index)">
          <div class="color-item draged" v-show="dragedColorIndex != null" ref="dragedColor"></div>
          <div v-for="(color,index) in myColors" class="color-item" ref="colorItem" :style="{backgroundColor:color}" 
                @pointerdown="handleStart($event,index)"
                @pointerup="handleEnd($event,index)"
                ></div>
          <div class="color-item">+
            <input type="color" class="colorInput-hidden" ref="addColor2" @change="addColor($event)">
          </div>
          <div :class="{'color-item delete':true,'show':dragedColorIndex!=null }" @pointerup="handleEnd(event,-1)">
            <svg-icon name="delete02" className="color-item-svg"></svg-icon>
          </div>
        </div>
        <div class="color-tools">
          融合阈值：<input type="number" min="0" max="100" step="10" v-model="threshold" />
          <button @click="imgToPixel">像素转换</button>
          <button @click="adjustImg">像素融合</button>
        </div>
      </div>
    </div>
    <div :class="{'gif-tools-box':true,'show':gifToolsShow}">
      <div class="gif-tools" style="justify-content: center">
        <svg-icon class="gif-tools-item" name="replay02" @click="gifImageDataIndex=0,startAnimate()"></svg-icon>
        <!-- <svg-icon name="play01" @click="startAnimate"></svg-icon> -->
        <svg-icon class="gif-tools-item" name="pause01" @click="stopAnimate"></svg-icon>
        <!-- <svg-icon class="gif-tools-item" name="play-slower01" @click="changeSpeed(-1)"></svg-icon>
        <svg-icon class="gif-tools-item" name="play-faster01" @click="changeSpeed(1)"></svg-icon> -->
        <div class="gif-tools-item has-icon-button" style="position: relative;" @click="changeSpeed(1)">
          <svg-icon name="film11-1" ></svg-icon>
          <label class="fps-label">{{`${animateFps[animateFpsIndex]}`}}</label>
        </div>
        <svg-icon class="gif-tools-item" @click="pushGifImgList()" name="letter-plus01"></svg-icon>
        <svg-icon class="gif-tools-item" @click="deleteGifImgList()" name="letter-minus01"></svg-icon>
        <button class="gif-tools-item" @click="saveGifNPngToFolder(gifImageDataList)">导出</button>
      </div>
      <div class="gif-tools" style="height:80px">
        
        <canvas ref="gifCanvas" :width="100*cols/rows" height="100" v-for="index in gifImageDataList.length" :class="{'gifCanvas':true,'currentGifCanvas':index-1 == gifImageDataIndex}" @click="putGifImage2MainCanvas(index-1)"></canvas>

        <div class="addcanvas" @click="pushGifImgList()" v-show="gifImageDataList.length==0">+</div>
      </div>
    </div>
  </div>
</template>

<script>
import GIF from 'gif.js'
import auSelect from "./Model/auSelect.vue"
import auDraged from "./Model/auDraged.vue"

export default {
  data() {
    return {
      tool:1,
      rows:11,
      cols:11,
      gridSize:100,
      outputSize:30,
      coordinate:'x:0,y:0',
      currentColor:'#000001',
      bkgColor:"#fff",
      // colorToolsEdited:false,
      myColors:['#000001','#ffffff','#F96635','#f9A822','#FAEC86','#93d3a2','#2bbaa5','#008080'],
      defaultColors:['#000001','#ffffff','#F96635','#f9A822','#FAEC86','#93d3a2','#2bbaa5','#008080'],
      pix8Colors:['#000001','#ffffff',"#202952","#762b52","#398557",'#a1573e','#605750','#c4c3c8','#fef1eb','#eb3452','#f1a73c','#fcee5a','#67e055','#57a8f7','#807498','#ee7dab','#f6cdb1'],
      colorIndex:0,
      dragedColorIndex:null,
      isDrawing: false,
      pixels: [],
      endPoints:{x:0,y:0},
      maincanvas:null,
      ctx:null,
      ovCtx:null,
      historys:[],
      log:"",
      shiftdown:false,
      dropDownBox:null,
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
      pressTimer:null,
      toolsShow:true,
      modal_show:{
        newFileModalShow:false,
      },
      newFileForm:{
        cols:13,
        rows:13,
        gridSize:100,
        outputSize:30
      },
      gifToolsShow:false,
      gifImageDataList:[],
      animateId:0,
      gifImageDataIndex:-1,
      animateStartTime:null,
      animateFps:[3,4,5,10,30,60],
      animateFpsIndex:0,
      animateSpeed:300,
      imgToPixelTools:false,
      threshold:0, //min0,max100 
      // imgToPixelColorList
      imgPointList:[[]]
    };
  },
  components:{
    auSelect,auDraged
  },
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
    // document.removeEventListener('click', this.offColorToolsEdit)
    document.removeEventListener('click',this.closeDropDownBox)
  },
  methods: {
    changeMyColor(index){
      if(index == 0){
        this.myColors = this.defaultColors
      }else if(index == 1){
        this.myColors = this.pix8Colors
      }
    },
    newFile(){
      this.cols = Math.floor(this.newFileForm.cols)
      this.gridSize = Math.floor(this.newFileForm.gridSize)
      this.rows = Math.floor(this.newFileForm.rows)
      this.outputSize = Math.floor(this.newFileForm.outputSize)
      this.historys = []
      this.clearAll()
      if(this.modal_show.newFileModalShow){
        this.modal_show.newFileModalShow = false
      }
    },
    //颜色卡片长按事件
    handleStart(event,index){
        
        this.pressTimer = setTimeout(() => {
          // this.colorToolsEdited = true
          this.dragedColorIndex = index
          const el = event.target
          this.disx = event.pageX - el.offsetLeft
          this.disy = event.pageY - el.offsetTop
          const dragedEl = this.$refs.dragedColor
          dragedEl.style.backgroundColor = this.myColors[this.dragedColorIndex]
          dragedEl.style.left = `${event.pageX - this.disx}px`
          dragedEl.style.top = `${event.pageY - this.disy}px`
          // document.addEventListener("click",this.offColorToolsEdit)
          clearTimeout(this.pressTimer)
          this.pressTimer = null
        }, 500);
    },
    handleMove(event,index){
      if (this.pressTimer) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
      }
      if(this.dragedColorIndex != null){
        const dragedEl = this.$refs.dragedColor
        dragedEl.style.backgroundColor = this.myColors[this.dragedColorIndex]
        dragedEl.style.left = `${event.pageX - this.disx}px`
        dragedEl.style.top = `${event.pageY - this.disy}px`
      }
    },
    handleEnd(event,index){
      // 如果定时器还在，说明是点击事件
      if (this.pressTimer) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
        this.selectColor(index)
      }
      if(this.dragedColorIndex != null){
        if(index == -1){
          this.myColors.splice(this.dragedColorIndex,1)
          this.dragedColorIndex = null
        }else{
          const colorTem = this.myColors[index]
          this.myColors[index] = this.myColors[this.dragedColorIndex]
          this.myColors[this.dragedColorIndex] = colorTem
          this.dragedColorIndex = null
        }
      }
    },
    selectColor(index){
      this.currentColor = this.myColors[index]
    },
    addColor(event){
      const colorDom = event.currentTarget
      const colorValue = colorDom.value
      if(!this.myColors.includes(colorValue)){
        this.myColors.push(colorValue)
      }
      this.currentColor = colorValue
      
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
    dropDown(event, keyname){
      this.dropDownBox = event.target
      const keys = Object.keys(this.dropDownBoxShow)
      keys.forEach(key => {
        this.dropDownBoxShow[key] = false
      })
      this.dropDownBoxShow[keyname] = true
      document.addEventListener('click',this.closeDropDownBox)
    },
    closeDropDownBox(e){
      if(!this.dropDownBox.contains(e.target)){
        const keys = Object.keys(this.dropDownBoxShow)
        keys.forEach(key => {
          this.dropDownBoxShow[key] = false
        })
        document.removeEventListener('click',this.closeDropDownBox)
      }
    },
    // switchColor(point){
    //   const color = this.getColorAtPixel(point)
    //   const currentColor = 'rgba('+color.r+','+color.g+','+color.b+','+color.a+')'
    //   if(currentColor != 'rgba(0,0,0,0)'){
    //     this.currentColor = currentColor
    //   }
    // },
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

      // this.ctx.imageSmoothingEnabled = true;
      this.ctx.lineWidth = 1
      // this.ctx.strokeRect(10.5,10.5,9,9)
      this.ovCtx = overview.getContext('2d')
      this.addHistory()
      this.resizeViewport()
      this.getMinScale()
      this.scaleCount = this.minScaleCount
      this.offscreenCanvas = document.createElement('canvas');
    },
    getMinScale(){
      const realViewport = this.$refs.realViewport
      let width = realViewport.clientWidth - 5
      let height = width/this.cols*this.rows
      if(height > realViewport.clientHeight){
        height = realViewport.clientHeight - 2
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
      this.imgPointList = [[]]
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
    drawPixel(point, size=this.penSize, color = this.currentColor){
      this.ctx.fillStyle = color
      const x = point.x/this.gridSize - Math.floor(size/2)
      const y = point.y/this.gridSize - Math.floor(size/2)
      this.ctx.fillRect(this.gridSize*x,this.gridSize*y,this.gridSize*size,this.gridSize*size)
      // this.ctx.font = "40px serif"
      // this.ctx.fillStyle = "#ffffff"
      // this.ctx.fillText(`${(x+y*this.cols)*30}`,this.gridSize*x,this.gridSize*y+30)
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
      const imageData = history[history.length - 1]['data']
      this.ctx.putImageData(imageData, 0, 0)
    },
    addHistory() {
      this.historys.push({
        data: this.ctx.getImageData(0, 0, this.width, this.height)
      })
      this.updateOverview()
      if(this.gifImageDataList.length > 0)
        this.updateGifImage(this.gifImageDataIndex)
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
    getPixelVector(pixel){
      const pixelSize = this.outputSize
      const color = `rgba(${pixel.r},${pixel.g},${pixel.b},${pixel.a})`
      const x1 = {x:pixel.x, y:pixel.y}
      const x2 = {x:pixel.x + pixelSize, y:pixel.y}
      const x3 = {x:pixel.x + pixelSize, y:pixel.y + pixelSize}
      const x4 = {x:pixel.x, y:pixel.y + pixelSize}
      const point2Num = (x,y)=>{
        return x + y*this.cols
      }
      //定义了正方形的4个边向量[向量起点，向量终点，向量右边的颜色]
      return [[point2Num(x1.x,x1.y),point2Num(x2.x,x2.y),color],
              [point2Num(x2.x,x2.y),point2Num(x3.x,x3.y),color],
              [point2Num(x3.x,x3.y),point2Num(x4.x,x4.y),color],
              [point2Num(x4.x,x4.y),point2Num(x1.x,x1.y),color]]
    },
    getpathContent(pixelData){
      let pathLists = [] 
      //这三个list的index代表同一条路径的集合、开始点、结束点

      let pointWithNextPoints  = new Map()
      pixelData.forEach(pixel => {
        // console.log(pixel)
        const pixelVectors = this.getPixelVector(pixel)
        //生成一个单向的相邻点的map
        pixelVectors.forEach(vector => {
          // console.log(`开始添加向量：（${vector[0]},${vector[1]}）`)
          if(pointWithNextPoints.has(vector[0])){
            if(pointWithNextPoints.has(vector[1])){
              // console.log(`${vector[0]},${vector[1]}=======>${vector[1]},${vector[0]}`)
              let nextPoints = pointWithNextPoints.get(vector[1])
              
              // nextPoints.forEach(nextpoint=>{
              //   console.log(nextpoint)
              // })
              let findSameVector = null
              for(var i=0; i < nextPoints.length ; i++){
                // console.log(`${nextPoints[i]},${vector[0]},${vector[2]}`)
                // console.log(nextPoints[i][0] == vector[0] && nextPoints[i][1] == vector[2])
                if(nextPoints[i][0] == vector[0] && nextPoints[i][1] == vector[2]){
                  findSameVector = nextPoints.splice(i,1)
                  // console.log("存在同一条线，不添加")
                  if(nextPoints.length > 0){
                    pointWithNextPoints.set(vector[1],nextPoints)
                    // console.log("删除已经存在的线段")
                  }else{
                    pointWithNextPoints.delete(vector[1])
                    // console.log("删除已经存在的线段,起始点没有相邻点，删除起始点")
                  }
                  
                  break;
                }
              }

              if(findSameVector == null){
                let newValue = pointWithNextPoints.get(vector[0]).push([vector[1],vector[2]])
                pointWithNextPoints[vector[0], newValue]
                // console.log("添加成功")
              }
            }else{
              let newValue = pointWithNextPoints.get(vector[0]).push([vector[1],vector[2]])
              pointWithNextPoints[vector[0], newValue]
              // console.log("添加成功")
            }
          }else{
            pointWithNextPoints.set(vector[0], [[vector[1],vector[2]]])
            // console.log("添加成功")
          }
        })
      });
      // console.log(pointWithNextPoints)
      // for(const [key,value] of pointWithNextPoints){
      //   console.log(key+":")
      //   value.forEach(v => {
      //     console.log(`point:${v[0]},color:${v[1]}`)
      //   })
      //   console.log("=============================")
      // }
      //遍历pointWithNextPoints得到路径

      const findPath = (point,path=null, color=null)=>{
        // console.log(`findPath(\n${point},\n${path},\n${color})`)
        if(pointWithNextPoints.has(point)){
          let nextPoints = pointWithNextPoints.get(point)
          if(color == null){
            let nextPoint = nextPoints.splice(0,1)[0]
            pointWithNextPoints.set(point,nextPoints)
            if(nextPoints.length <= 0){
              pointWithNextPoints.delete(point)
              // console.log(`这个点是路径起始点，且只有一个继点，移除${point}`)
            }
            path = [point,nextPoint[0]]
            findPath(nextPoint[0], path, nextPoint[1])
          }else{
            let nextPoints = pointWithNextPoints.get(point)
            let nextPoint = null
            for(var i=0 ; i < nextPoints.length ; i++){
              if(nextPoints[i][1] == color){

                nextPoint = nextPoints.splice(i, 1)[0]
                pointWithNextPoints.set(point,nextPoints)
                if(nextPoints.length <= 0){
                  pointWithNextPoints.delete(point)
                  // console.log(`这个点的继点被全部匹配完了，移除${point}`)
                }
                break
              }
            }
            if(nextPoint){
              path.push(nextPoint[0])
              findPath(nextPoint[0], path, nextPoint[1])
            }else{
              path.push(color)
              // console.log(`map里有thispoint:${point},当时相同颜色:${color}没有可以找的点`)
              pathLists.push(path)
              if(pointWithNextPoints.size > 0){
                const newkey = pointWithNextPoints.keys().next().value
                const newstart = pointWithNextPoints.get(newkey)[0]

                findPath(newstart[0])
              }else{
                return
              }
            }
          }
        }else{
          if(color){
            path.push(color)
            pathLists.push(path)
            // console.log(`map里找不到thispoint:${point}了`)
            if(pointWithNextPoints.size > 0){
              const newkey = pointWithNextPoints.keys().next().value
              const newstart = pointWithNextPoints.get(newkey)[0]
              // console.log(`**********newstart[0]:${newstart[0]}`)
              findPath(newstart[0])
            }else{
              return
            }
          }
          return
        }
        
      }
      const start = pointWithNextPoints.keys().next().value
      // console.log(`start:${start}-----------`)
      findPath(start)
      let pathContent = ``
      let colorWithPath = new Map() //保存颜色-路径的映射，用于合并相同颜色的路径
      const num2Point = (num)=>{
        const x = num%(this.cols*30)
        return {x,y:Math.floor((num-x)/this.cols)}
      }

      pathLists.forEach((pathList)=>{
        // console.log(pathList)
        let p1 = num2Point(pathList[0])
        // console.log(pathList[0],p1)
        let step = {direction:"M",step:0}
        let path = `M${p1.x} ${p1.y}`
        for(var i=1; i<pathList.length-1 ;i++){
          let p2 = num2Point(pathList[i])
          // console.log(p2)
          if(p1.x == p2.x){
            if(step.direction == "v"){
              step.step += (p2.y - p1.y)
              // console.log(`1:::::::::${step.direction},${step.step}`)
            }else{
              if(step.step != 0){
                path += `${step.direction}${step.step}`
              }
              step.direction = "v"
              step.step = (p2.y - p1.y)
              // console.log(`2:::::::::${step.direction},${step.step}`)
            }
          }else{
            if(step.direction == "h"){
              step.step += (p2.x - p1.x)
              // console.log(`3:::::::::${step.direction},${step.step}`)
            }else{
              if(step.step != 0){
                path += `${step.direction}${step.step}`
                
              }
              step.direction = "h"
              step.step = (p2.x - p1.x)
              // console.log(`${p2.y},${p1.y},${p2.y-p1.y}`)
              // console.log(`4:::::::::${step.direction},${step.step}`)
            }
          }
          p1.x = p2.x
          p1.y = p2.y
          // console.log(`step:"${step.direction}",${step.step}`)
        }
        path += "z"
        const colorKey = pathList[pathList.length-1]
        if(colorWithPath.has(colorKey)){
          let newValue = colorWithPath.get(colorKey)
          newValue.push(path) 
          colorWithPath.set(colorKey, newValue)
        }else{
          colorWithPath.set(colorKey, [path])
        }
      })
      for(var [key,value] of colorWithPath){
        let colorPath = `<path d="`
        value.forEach((path)=>{
          // console.log(key,path)
          colorPath += path
        })
        colorPath += `" fill="${key=='rgba(0,0,0,255)' || key=='rgba(0,0,1,255)' ?'currentColor':key}"/>`
        pathContent += colorPath
      }
      console.log(pathContent)
      return pathContent
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
            pixelData.push({ x:x/this.gridSize*this.outputSize, y:y/this.gridSize*this.outputSize, r, g, b, a });
          }
        } 
      }
    
      //生成svg文件,gpt生成代码
      let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.cols*this.outputSize} ${this.rows*this.outputSize}">`;
      
      if(false){
        pixelData.forEach(pixel => {
          let color = `rgba(${pixel.r},${pixel.g},${pixel.b},${pixel.a})`
          if(color =='rgba(0,0,1,255)' || color == 'rgba(0,0,0,255)'){
            color = "currentColor"
          }
          svgContent += `<rect x="${pixel.x}" y="${pixel.y}" width="${this.outputSize}" height="${this.outputSize}" fill="${color}" />`;
        });
      }else{
        svgContent += this.getpathContent(pixelData)
      }
      

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
      const link = document.createElement('a');
      link.href = url;
      link.download = 'drawing.svg';
      link.click();
      URL.revokeObjectURL(url);
    },
    saveAsPng(){
      const link = document.createElement('a');
      const url =  this.maincanvas.toDataURL("image/png");
      link.href = url;
      link.download = 'drawing.png';
      link.click();
      URL.revokeObjectURL(url);
    },
    saveAsGif(){

      if(this.gifImageDataIndex == -1){
        this.$toast.show('没有创建gif图片数据序列','error')
        return
      }

      // 假设你已经有一个数组保存了所有的 ImageData 对象
      const imageDataArray = this.gifImageDataList


      // 创建一个 GIF 对象
      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: `${process.env.NODE_ENV == 'development' ? 'http://192.168.0.119:8080/':'augest/'}js/gifjs/gif.worker.js`,
        transparent: 'rgba(0,0,0,0)',
      });

      console.log(gif)

      // 遍历 ImageData 数组，并将每个 ImageData 添加为一帧
      imageDataArray.forEach(imageData => {
        gif.addFrame(imageData, {delay: Math.floor(this.animateSpeed)});
      });

      // 生成并导出 GIF
      gif.on('finished', function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.gif';
        a.click();
        URL.revokeObjectURL(url);
      });

      gif.render();

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
    pushGifImgList(){
      const imageData= this.ctx.getImageData(0, 0, this.width, this.height)
      this.gifImageDataList.splice(this.gifImageDataIndex,0,imageData)
      this.gifImageDataIndex++
      const that = this
      this.$nextTick(()=>{
        for(var i = that.gifImageDataList.length-1 ; i > that.gifImageDataIndex ; i--){
          const canvas = that.$refs.gifCanvas[i]
          const canvasBefore = that.$refs.gifCanvas[i-1]
          const ctx = canvas.getContext("2d")
          ctx.clearRect(0,0,100*that.cols/that.rows,100)
          ctx.drawImage(canvasBefore,0,0)
        }
        const canvas = that.$refs.gifCanvas[that.gifImageDataIndex]
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0,0,100*that.cols/that.rows,100)
        ctx.drawImage(
          that.maincanvas,
          0,0,that.width,that.height,
          0,0,100*that.cols/that.rows,100
        )
      })
    },
    deleteGifImgList(){
      for(var i = this.gifImageDataIndex ; i < this.gifImageDataList.length-1 ; i++){
        const canvas = this.$refs.gifCanvas[i]
        const canvasNext = this.$refs.gifCanvas[i+1]
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0,0,100*this.cols/this.rows,100)
        ctx.drawImage(canvasNext,0,0)
      }
      this.gifImageDataList.splice(this.gifImageDataIndex,1)
      if(this.gifImageDataIndex >= this.gifImageDataList.length){
        this.gifImageDataIndex = this.gifImageDataList.length-1
      }else if(this.gifImageDataList.length < 1){
        this.gifImageDataIndex = -1
      }
    },
    startAnimate(){
      if(this.animateId == 0){
        if(this.gifImageDataList.length > 0){
          this.animateStartTime = new Date().getTime()
          this.animateId = requestAnimationFrame(this.updateMainCanvasAnimate)
        }
      }
    },
    stopAnimate(){
      cancelAnimationFrame(this.animateId)
      this.animateId = 0
    },
    updateMainCanvasAnimate(){
      this.ctx.clearRect(0,0,this.width,this.height)
      const data = this.gifImageDataList[this.gifImageDataIndex]
      this.ctx.putImageData(data,0,0)
      const nowTime = new Date().getTime()
      const deltaTime = nowTime - this.animateStartTime
      if(deltaTime > this.animateSpeed){
        this.animateStartTime = nowTime
        this.gifImageDataIndex = (this.gifImageDataIndex+1)%(this.gifImageDataList.length)
      }
      
      this.animateId = requestAnimationFrame(this.updateMainCanvasAnimate)
    },
    putGifImage2MainCanvas(index){
      this.stopAnimate()
      this.gifImageDataIndex = index
      const data = this.gifImageDataList[this.gifImageDataIndex]
      this.ctx.putImageData(data,0,0)
      this.addHistory()
    },
    updateGifImage(index){
      const imageData= this.ctx.getImageData(0, 0, this.width, this.height)
      this.gifImageDataList[index] = imageData
      const that = this
      this.$nextTick(()=>{
        const canvas = that.$refs.gifCanvas[index]
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0,0,100*this.cols/this.rows,100)
        ctx.drawImage(
          that.maincanvas,
          0,0,this.width,this.height,
          0,0,100*this.cols/this.rows,100
        )
      })
    },
    changeSpeed(num){
      this.animateFpsIndex = ((this.animateFpsIndex+num)<0 ? 5 : this.animateFpsIndex+num)%6
      this.animateSpeed = 1000/this.animateFps[this.animateFpsIndex]
    },
    async saveGifNPngToFolder(imageDataArray) {
        if(imageDataArray.length < 1){
          this.$toast.show('没有可以导出的帧','error')
          return
        }
        //利用 Canvas 元素将 ImageData 转换为图像的 Blob 对象。
        const imageDataToBlob = (imageData) => {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                canvas.width = imageData.width;
                canvas.height = imageData.height;

                const ctx = canvas.getContext('2d');
                ctx.putImageData(imageData, 0, 0);

                canvas.toBlob((blob) => {
                    resolve(blob);
                });
            });
        }
        try {
            // 请求选择文件夹的权限
            const dirHandle = await window.showDirectoryPicker();

            // 遍历图片并保存到文件夹
            for (let i = 0; i < imageDataArray.length; i++) {
                const imageData = imageDataArray[i];
                const blob = await imageDataToBlob(imageData);

                // 创建文件名（可根据需要调整）
                const fileName = `image_${i + 1}.png`;

                // 在指定文件夹中创建文件
                const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });

                // 写入 Blob 到文件
                const writable = await fileHandle.createWritable();
                await writable.write(blob);
                await writable.close();
            }
            
            console.log("图片已保存到文件夹中");
        } catch (err) {
            console.error("保存图片时出错：", err);
        }
    },
    openFileInput(){
      document.getElementById('fileInput').click()
    },
    importImg(){
      const file = event.target.files[0];
      const that = this
      if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();

          // 当文件读取完成时
          reader.onload = function(e) {
              const img = new Image();
              img.src = e.target.result;

              // 在图像加载完成后绘制到canvas上
              img.onload = function() {
                  that.selectedImgData = null
                  that.selectedRect = {x:0,y:0,width:0,height:0}
                  that.selectedBgData = that.ctx.getImageData(0,0,that.width,that.height)

                  that.offscreenCanvas = document.createElement('canvas');
                  const height = Math.floor(that.height/that.gridSize)*that.gridSize
                  const width = Math.floor(that.height/img.height*img.width/that.gridSize)*that.gridSize
                  that.offscreenCanvas.width = width
                  that.offscreenCanvas.height = height
                  
                  const ctx = that.offscreenCanvas.getContext('2d');
                  ctx.drawImage(img, 0, 0,img.width,img.height,0,0,width,height);
                  that.selectedImgData = ctx.getImageData(0,0,width,height)
                  // that.ctx.drawImage(that.offscreenCanvas,0,0)
                  if(that.selectRectAnimateId == 0){
                    that.selectRectAnimateId = requestAnimationFrame(that.dashedRectAnimate)
                  }
                  that.selectedRect={x:0,y:0,width,height}
                  that.tool = 7
                  // that.addHistory()
              }
          }

          // 读取文件为Data URL
          reader.readAsDataURL(file);
      } else {
          alert('请选择一个有效的图像文件。');
      }
    },
    imgToPixel(){

      if(this.offscreenCanvas){
        const width = this.offscreenCanvas.width;
        const height = this.offscreenCanvas.height; 
        const ctx = this.offscreenCanvas.getContext("2d")
        const imageData = ctx.getImageData(0, 0, width, height)

        //解析像素数据，gpt生成代码
        const pixels = imageData.data;
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;
        let count = 0
        for (let y = 0; y < height; y+=this.gridSize) {
          for (let x = 0; x < width; x+=this.gridSize) {
            for(let i = 0;i < this.gridSize;i++){
              for(let j = 0;j < this.gridSize;j++){
                const index = ((y+i) * width + x+j) * 4;
                r += pixels[index];
                g += pixels[index + 1];
                b += pixels[index + 2];
                a += pixels[index + 3];
                count++
              }
            }
            r = Math.floor(r/count)
            g = Math.floor(g/count)
            b = Math.floor(b/count)
            a = Math.floor(a/count)
            ctx.clearRect(x,y,this.gridSize,this.gridSize)
            ctx.fillStyle = `rgba(${r},${g},${b},${a})`
            ctx.fillRect(x,y,this.gridSize,this.gridSize)
            const y1 = Math.floor(y/this.gridSize)
            const x1 = Math.floor(x/this.gridSize)
            if(!this.imgPointList[y1])
              this.imgPointList[y1] = []
            this.imgPointList[y1][x1]=[r,g,b,a]
            r = 0;
            g = 0;
            b = 0;
            a = 0;
            count = 0
          } 
        }
      }
    },
    adjustImg(){
      if(this.offscreenCanvas){
        const ctx = this.offscreenCanvas.getContext('2d')
        const result = this.processColors()
        for(var y=0;y<result.length;y++){
          for(var x=0;x<result[y].length;x++){
            // console.log(result[y][x])
            const [r,g,b,a] = result[y][x]
            ctx.fillStyle = `rgba(${r},${g},${b},${a})`
            ctx.fillRect(x*this.gridSize,y*this.gridSize,this.gridSize,this.gridSize)
          }
        }
      }
      
    },
    processColors(colorArray = this.imgPointList, threshold = this.threshold){
      const colorList = []
      const colorDistance = (rgba1,rgba2)=>{
        const [r1, g1, b1, a1] = rgba1;
        const [r2, g2, b2, a2] = rgba2;
        return Math.sqrt(
          Math.pow(r1 - r2, 2) +
          Math.pow(g1 - g2, 2) +
          Math.pow(b1 - b2, 2) +
          Math.pow((a1 * 255) - (a2 * 255), 2)
        );
      }
      const averageColor = (rgba1, rgba2)=>{
        const [r1, g1, b1, a1] = rgba1;
        const [r2, g2, b2, a2] = rgba2;
        return [
          Math.round((r1 + r2) / 2),
          Math.round((g1 + g2) / 2),
          Math.round((b1 + b2) / 2),
          Math.round((a1 + a2) / 2)
        ];
      }
      console.log(colorArray)
      const rows = colorArray.length;
      const cols = colorArray[0].length;

      // Create a new array to store the processed colors
      const resultArray = JSON.parse(JSON.stringify(colorArray));

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const currColor = colorArray[i][j]
          let findFlag = false
          for(let x=0; x<colorList.length; x++){

            const color = colorList[x]

            if(colorDistance(color, currColor) < threshold){
              const average = averageColor(color, currColor)
              resultArray[i][j] = x
              console.log(resultArray[i][j])
              colorList[x] = average
              console.log(`find:${findFlag}`)
              findFlag = x
              break
            }
          }
          
          console.log(findFlag)
          if(findFlag == false){
            resultArray[i][j] = colorList.length
            colorList.push(currColor)
          }
        }
      }
      console.log(colorList)
      console.log(resultArray)
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            resultArray[i][j] = colorList[resultArray[i][j]]
          }
      }

      return resultArray;
    },
  },
};
</script>

<style scoped>
.drawing-area {
/*  border: 0.5px solid #d9d9d9;*/
/*  width: 100%;*/
  font-size: 0;
  height: 100%;
}
canvas, .addcanvas {
  position: relative;
  z-index: 1;
  touch-action: none;
  border: 1px solid var(--canvas-grid-gray);
}
.canvas-grid {
  position: absolute;
  top: 0;
  left: 0;
}


.tools-bar {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  padding-bottom: 1rem;
  width: 84px;
  height: fit-content;
}

.row .tools-bar{
  flex-direction: column;
  height: 84px;
  width: auto;
  padding-bottom: 0.5rem;
}

.tool-item{
  width: 30px;
  height: 30px;
  display: flex;
  padding: 5px;
  margin: 1px;
  border-radius: 5px;
}

.tool-item-fullscreen{
  width: 84px;
  height: 40px;
  padding: 5px;
  margin: 1px;
  margin-top: 20px;
  border-radius:5px;
  position: relative;
}

.tool-item-fullscreen .color{
  width: 30px;
  height: 30px;
  top:50%;
  left: 50%;
  position: absolute;
  border: 2px solid var(--fontNormal);
}
.tool-item-fullscreen .color.front{
  transform: translate(calc(-50% - 8px),calc(-50% - 8px));
}

.tool-item-fullscreen .color.back{
  transform: translate(calc(-50% + 8px),calc(-50% + 8px));
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
  margin: 0 -30px;
  display: flex;
  flex-direction: column;
/*  width: calc(100% + 60px);*/
  overflow: hidden;
  height: calc(100vh - 91px);
  position: relative;

}

.work-area > div{
  padding: 0 5px;
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

.gridstyle{
  background: linear-gradient(
      -45deg,
      var(--canvas-grid-gray) 25%,
      transparent 25%,
      transparent 75%,
      var(--canvas-grid-gray) 75%,
      var(--canvas-grid-gray) 100%
    ),
    linear-gradient(
      -45deg,
      var(--canvas-grid-gray) 25%,
      transparent 25%,
      transparent 75%,
      var(--canvas-grid-gray) 75%,
      var(--canvas-grid-gray) 100%
    );
  background-color: var(--canvas-grid-bgc);
}

.color-tools {
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  position: relative;
}


.color-item {
  width: 28px;
  height: 28px;
  margin: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  position: relative;
  box-shadow: inset 0px 0px 0px 1px var(--fontNormal)
}

.color-item-svg {
  width: 20px !important;
}

.color-item.active {
  box-shadow: inset 0px 0px 0px 2px rgb(255, 255, 255);
}

.color-item:hover {
  box-shadow: inset 0px 0px 0px 2px var(--fontNormal);
}

.color-item.delete {
  width:100%;
  height: 50px;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: auto;
}

.color-item.delete.show{
  opacity: 1;
}

.color-item.delete:hover , .color-item.draged:hover{
  box-shadow:none;
}

.color-item.draged {
  opacity: 0.5;
  position: absolute;
  z-index: 99;
  pointer-events: none;
  box-shadow: inset 0px 0px 0px 2px var(--fontNormal)
}

.colorInput-hidden {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
/*  display: none;*/

}

.gif-tools-box {
  background: var(--modal-bgc);
  position: fixed;
  width: 100%;
/*  height: 100px;*/
  bottom: 0;
  z-index: 9;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.3s ease;
  transform: translateY(100%);
  opacity: 0;
  padding: 10px!important;
}

.gif-tools-box.show {
  opacity: 1;
  transform: translateY(0);
}

.gif-tools{
  width: 100%;
  display: flex;
  align-items: center;
  overflow: auto;
  padding: 2px 0;
}
.gif-tools > canvas,.addcanvas{
  margin: 0 5px;
  height: 60px;
}

.gifCanvas {
  background:var(--canvas-grid-bgc);
}

.currentGifCanvas {
  outline:2px solid var(--main-color);
}

.addcanvas{
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}

.gif-tools-item {
  margin: 0 0.8rem;
}

.fps-label {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  color: var(--modal-bgc);
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: unset;
  font-weight: 900;
  user-select: none;
}

</style>
