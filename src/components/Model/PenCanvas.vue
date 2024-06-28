<template>
    <canvas v-show="show" ref="canvas"
               @pointerdown="handlePointerDown"
               @pointermove="handlePointerMove"
               @pointerup="handlePointerUp"></canvas>
    <div v-show="show" :class="{'edit-tools-fixedbox':true,'show':editTools_show}">
      <div :class="{'edit-tools-handle':true,'show':!editTools_show}" 
               @pointerdown="handleStart"
               @pointermove="handleMove"
               @pointerup="handleEnd"
               @pointerleave="handleCancel">
        <img v-show="!erasing" src="@/assets/imgs/canvastools/pen.png"/>
        <img v-show="erasing" src="@/assets/imgs/canvastools/eraser.png"/>

      </div>
      <div class="edit-tools">
        <div style="height: 100%;font-size: 18px;line-height: 50px;padding: 0 2px 0 2px;color:#252525" @click="editTools_show = false">&times;</div>
        <div class="edit-tools-group">
          <div :class="{'edit-tools-item':true,'active':!erasing}" @click="getcanvastool('pencil')">
            <img src="@/assets/imgs/canvastools/pen.png"/>
          </div>
          <div :class="{'edit-tools-item':true,'active':erasing}" @click="getcanvastool('eraser')">
            <img src="@/assets/imgs/canvastools/eraser.png"/>
          </div>
        </div>
        <div style="width:25px;display:flex;color:#252525;margin-left:15px" @click="setting_show = true">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M15 1v6H9V1h6zm-2 2h-2v2h2V3zm2 6v6H9V9h6zm-2 2h-2v2h2v-2zm2 6v6H9v-6h6zm-2 2h-2v2h2v-2z" fill="currentColor"/> </svg>
        </div>
      </div>
    </div>

    <div v-show="show && setting_show" class="canvas-setting">
      <div style="position: absolute;top: 5px;right: 5px;width: 20px;color: #ff5252;" @click="setting_show = false">
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-8 4H9V7H7v2h2v2h2v2H9v2H7v2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2v-2h2V9h2V7h-2v2h-2v2h-2V9z" fill="currentColor"/> </svg>
      </div>
      
      <div class="content-items">
        画笔大小：
        <input type="range" class="custom-range" v-model="penWidth" min="1" max="15">  {{penWidth}}
      </div>
      <div class="content-items">
        橡皮大小：
        <input type="range" class="custom-range" v-model="eraserWidth" min="5" max="30">   {{eraserWidth}}
      </div>
      <div class="content-items">
        画笔颜色：
        <div v-for="color in colorList" @click="penColor = color" class="color-item" :style="{backgroundColor:color,height: color==penColor ? '20px':'15px'}"></div>
      </div>
      <div class="content-items">
        仅触控笔：
        <div @click="switchmode()" :class="{'switch-botton':true, 'close':mode=='all touch'}"></div>
        {{mode=='only pen' ? '开' : '关' }}
      </div>
    </div>
</template>

<script>

export default {
  props:{
    show:{
      type: Boolean,
      required: true,
      default: false
    },
    width: Number,
    height: Number,
    switch: Number,
  },
  watch: {
    switch(newval, oldval){
      this.changeCanvas(newval, oldval)
      console.log(newval, oldval)
    },
    show(newval, oldval){
      if(newval){
        this.resize()
        document.body.classList.add('none-select')
      }else{
        document.body.classList.remove('none-select')
      }
    }
  },
  data(){
    return{
      log:"",
      mode:"all touch",
      isDrawing: false,
      drawData: null,
      isScroll: 0,
      context: null,
      currentPointerType: null,
      multiLastPt:{},
      offsetTop:0,
      offsetLeft:0,
      isScroll:false,
      startY:0,
      scrolltop:0,
     
      editTools_show:false,

      erasing:false,
      el:null,
      points:[],
      beginPoint:{x:0,y:0},

      penWidth: 5,
      eraserWidth: 10,
      penColor: '#f00',
      canvasWidth:0,
      canvasHeight:0,

      pressTimer:null,

      imgDataList:[],

      setting_show:false,

      colorList:['#000','#f00','#ffa500','#ff0','#90ee90','#87ceeb','#fff'],
    }
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    document.body.classList.remove('none-select')
  },
  methods: {
    changePenWidth() {
      const range = document.getElementById('penWidth-range')
      this.penWidth = parseInt(range.value)
    },
    resize(Imgdata=null){
      const canvas = this.$refs.canvas;
      let imageData = null
      if(Imgdata == null){
        imageData = this.context.getImageData(0, 0, canvas.width, canvas.height);
      }else{
        imageData = Imgdata
      }

      // 保存当前的绘图状态
      const strokeStyle = this.context.strokeStyle;
      const fillStyle = this.context.fillStyle;
      const lineWidth = this.context.lineWidth;
      const font = this.context.font;
      const textAlign = this.context.textAlign;
      const textBaseline = this.context.textBaseline;
      const globalCompositeOperation = this.context.globalCompositeOperation;
      
      canvas.width = this.el.clientWidth;
      canvas.height = this.el.clientHeight;
      this.canvasWidth = canvas.width;
      this.canvasHeight = canvas.height;
       // 清空并重置画布
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      // 恢复绘图状态
      this.context.strokeStyle = strokeStyle;
      this.context.fillStyle = fillStyle;
      this.context.lineWidth = lineWidth;
      this.context.font = font;
      this.context.textAlign = textAlign;
      this.context.textBaseline = textBaseline;
      this.context.globalCompositeOperation = globalCompositeOperation
      if(imageData != ""){
        // 恢复画布内容
        this.context.putImageData(imageData, 0, 0);
        
      }
    },
    init() {
      if (window.PointerEvent) { 
        // Pointer events are supported. 
        this.log="Pointer events are supported."
      }
      const canvas = this.$refs.canvas;
      const parent = canvas.parentElement;
      // const grandpa = parent.parentElement
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      this.canvasWidth = canvas.width
      this.canvasHeight = canvas.height
      this.el = parent
      this.offsetLeft = parent.offsetLeft
      this.offsetTop = parent.offsetTop
      this.context = canvas.getContext('2d');
      this.context.strokeStyle = this.penColor
    },
    switchmode() {
      if(this.mode == "only pen"){
        this.mode = "all touch"
      }else{
        this.mode = "only pen"
      }
    },
    handlePointerDown(event){
      this.currentPointerType = event.pointerType;
      if(this.mode == "all touch" && this.currentPointerType == 'pen'){
        this.mode = "only pen"
        this.$toast.show("检测到正在使用触控笔，开启\"only pen\"模式，可在画板设置中关闭","info")
      }
      var id = event.pointerId
      this.multiLastPt[id] = {x:event.pageX,y:event.pageY}
      if(this.mode == "only pen" && this.currentPointerType === 'pen'){
        this.scrolltop = this.el.parentElement.scrollTop;
        this.isDrawing = true;
        this.points = []
        this.points.push({x:event.pageX,y:event.pageY});
        this.beginPoint = this.points[0]
        
      }else if(this.mode == "only pen" && this.currentPointerType === 'touch'){
   
        this.isScroll = id
        this.startY = event.pageY;
        this.scrolltop = this.el.parentElement.scrollTop;
      }else if(this.mode === "all touch"){
        this.scrolltop = this.el.parentElement.scrollTop;
        if(Object.keys(this.multiLastPt).length == 2){
          this.isDrawing = false;
          this.isScroll = id
          this.startY = event.pageY;
        }else if(Object.keys(this.multiLastPt).length == 1){
          this.isDrawing = true;
          this.points = []
          this.points.push({x:event.pageX,y:event.pageY});
          this.beginPoint = this.points[0]
        }
      }
    
    },
    drawLine(startp,ctrlp,endp,cl,ct) {
      this.context.beginPath();
      this.context.moveTo((startp.x-cl),(startp.y-ct))
      this.context.quadraticCurveTo((ctrlp.x-cl),(ctrlp.y-ct),(endp.x-cl),(endp.y-ct))
      this.context.strokeStyle = this.penColor;//设置颜色
      this.context.lineCap = "round";//设置两端的形状
      this.context.stroke();// stroke() 方法来绘制线条
      this.context.closePath();
    },
    handlePointerMove(event){
      var id = event.pointerId
      if(this.isDrawing && this.multiLastPt[id]){
        if (this.mode == "only pen" && this.currentPointerType === 'pen' || this.mode === "all touch") {
          //触控笔模式，手指滑动页面
          var scrolltop = this.el.parentElement.scrollTop;
          if(!this.erasing){
            if(this.currentPointerType == 'pen'){
              this.context.lineWidth = event.pressure*(this.penWidth);//设置大小
            }else{
              this.context.lineWidth = this.penWidth;//设置大小
            }
          }else{
            this.context.lineWidth = this.eraserWidth
          }
          
          //圆滑曲线
          var endp = {x:event.pageX, y:event.pageY}
          this.points.push(endp)


          if(this.points.length > 2){
            const lastTwoPoints = this.points.slice(-2);
            const controlPoint = lastTwoPoints[0];
            const endPoint = {
                x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
                y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
            }
            var ct = this.offsetTop - scrolltop
            this.drawLine(this.beginPoint, controlPoint, endPoint, this.offsetLeft, ct);
            this.beginPoint = endPoint;
          }
        }
        
     
      }else if(this.isScroll == id){
        const y = event.pageY - this.startY;
        this.el.parentElement.scrollTop = this.scrolltop - y
      }
    },
    handlePointerUp(event){
      var id = event.pointerId
      if (this.isDrawing) {
        this.isDrawing = false;
      }
      if(this.multiLastPt[id]){
        delete this.multiLastPt[id];
      }
      if (this.isScroll){
       
        this.isScroll = null
      }
    },
    
    
    
    getcanvastool(tool){
      var ctx = this.context
      if (tool == 'pencil') {
        this.context.globalCompositeOperation = 'source-over';
        this.erasing = false

      } else if(tool == "eraser"){
        this.context.globalCompositeOperation = 'destination-out';
        this.erasing = true
      }
    },

    //处理工具栏按钮事件
    handleStart(){
      this.pressTimer = setTimeout(() => {
        // this.editTools_show = true
        this.setting_show = true
        clearTimeout(this.pressTimer)
        this.pressTimer = null
      }, 500);
    },
    handleMove(event){
      if (this.pressTimer) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
      }
    },
    handleEnd(){
      // 如果定时器还在，说明是点击事件
      if (this.pressTimer) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
        this.getcanvastool(this.erasing ? "pencil":"eraser")
      }
    },
    handleCancel(){
      if (this.pressTimer) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
      }
    },
    changeCanvas(newval,oldval){
      const canvas = this.$refs.canvas;
      let imageData = this.context.getImageData(0, 0, canvas.width, canvas.height);
      this.imgDataList[oldval] = imageData
      imageData = this.imgDataList[newval] ? this.imgDataList[newval] : ""
      var that = this
      this.$parent.$nextTick(() => {
        that.resize(imageData)
      })
      
    }
  },
};
</script>

<style scoped>
  canvas{
    display: block;
    touch-action: none;
    position: absolute;
    left: 0;
    top: 0;
  }

  .buttonbox{
    position: fixed;
    left: 0;
    z-index: 988;
  }

  .edit-tools-fixedbox{
    position: fixed;
    top: 150px;
    right:-185px;
    transition: right 0.3s ease;
  }

  .edit-tools-fixedbox.show{
    right:-40px;
  }

  .edit-tools{
    display: flex;
    height: 50px;
    background-color: #fff4ca;
    border-radius: 10px 0 0 10px;
    padding-right: 40px;
    box-shadow: var(--box-shadow);
  }


  .edit-tools-handle{
    position: absolute;
    background-color: #fff4ca;
    width: 40px;
    height: 40px;
    border-radius: 23px;
    overflow: hidden;
    left: -80px;
    top: 4px;
    border:3px solid black;
    transition: opacity 0.3s ease,transform 0.3s ease;
    opacity: 0;
    transform: scale(0);
  }


  .edit-tools-handle.show{
    opacity: 0.5;
    transform: scale(1);
  }

  .edit-tools-handle.show:hover{
    opacity: 1;
  }

  .edit-tools-handle img{
    margin-top: 7px;
    margin-left: 8px;
    width: 25px;
    -webkit-user-drag: none;
  }

  .edit-tools-group{
    height: 100%;
    display: flex;
    overflow: hidden;
  }

  .edit-tools-item {
    margin: 0 5px;
    width: 25px;
    overflow: hidden;
    transform: translateY(18px);
    transition: transform 0.3s ease;
    
/*    height: 40px;*/
/*    border: 3px solid #ffc848;*/

  }

  .edit-tools-item img{
    width: 25px;
    -webkit-user-drag: none;
  }

  .edit-tools-item.active{
    transform: translateY(10px);
  }

  .canvas-setting {
    font-family: 'HYPixel';
    font-size: 20px;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 300px;
    top: 50%;
    left: 50%;
    background-color: var(--box-bgc);
    transform: translate(-50%,-50%);
/*    border-radius: 10px;*/
    border: 3px solid;
  }

  .canvas-setting .content-items{
    margin: 10px 0;
    display: flex;
    align-items: flex-end
  }

  .switch-botton{
    margin: 0 10px;
    position: relative;
    width: 36px;
    height: 18px;
    border: 2px solid;
    background-color: var(--card-hightlight);
  }

  .switch-botton:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    background-color: var(--fontNormal);
    transition: left 0.1s ease;
  }

  .switch-botton.close:after {

    left: 20px;
  }

  .color-item {
    box-sizing: border-box;
    margin: 0 2px;
    border: 2px solid;
    width: 20px;
    transition: height 0.1s ease;
  }

  /*自定义滑动input样式*/
  .custom-range {
      -webkit-appearance: none; /* 去除默认样式 (适用于 Chrome, Safari, Opera) */
      width: 120px;
      height: 10px; /* 滑动条高度 */
      background-color: var(--card-hightlight);
      outline: none; /* 去除聚焦时的边框 */
      border: 2px solid;
      opacity: 1; /* 透明度 */
  }

  .custom-range:hover {
      opacity: 1; /* 悬停时的不透明度 */
  }

  /* 滑块样式 */
  .custom-range::-webkit-slider-thumb {
      -webkit-appearance: none; /* 去除默认样式 (适用于 Chrome, Safari, Opera) */
      appearance: none;
      width: 18px; /* 滑块宽度 */
      height: 18px; /* 滑块高度 */
      background-color: var(--fontNormal); /* 滑块颜色 */
      cursor: pointer; /* 指针样式 */
      transition: background 0.2s; /* 滑块背景颜色过渡效果 */
  }

  .custom-range::-webkit-slider-thumb:hover {
      background-color: var(--fontNormal); /* 滑块悬停时的颜色 */
}
  
</style>
