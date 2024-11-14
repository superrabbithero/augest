<template>
    <canvas v-show="show" ref="canvas"
               @pointerdown="handlePointerDown"
               @pointermove="handlePointerMove"
               @pointerup="handlePointerUp">
                
    </canvas>
    <div v-show="show" :class="{'edit-tools-box':true, 'active':editToolsActive || modal_show.setting_show}" ref="dragToolsBar" @pointerover="handleToolsBarFocus" @pointerleave="handleToolsBarOut">

      <div :class="{'edit-tools-item':true,'active':!erasing}" @click="getcanvastool('pencil')">
        <svg-icon name="pencilStub01"  size="20"></svg-icon>
      </div>
      <div :class="{'edit-tools-item':true,'active':erasing}" @click="getcanvastool('eraser')">
        <svg-icon name="eraser02" size="20"></svg-icon>
      </div>
      <div class="divider-line"></div>
      <div class="edit-tools-item" @click="modal_show.setting_show = !modal_show.setting_show">
        <svg-icon name="setting02" size="20"></svg-icon>
      </div>
      <div class="edit-tools-drag" @pointerdown="dragdown($event)"  @mouseup="dragup">
        <svg-icon style="user-select: none;" name="drag01" size="20"></svg-icon>
      </div>
    </div>

    <my-model :show="show && modal_show.setting_show" :modeless="true" :modalKey="'setting_show'">
      <div class="content-items">
        <label>画笔大小：</label>
        <input type="range" class="custom-range" v-model="penWidth" min="1" max="15">  {{penWidth}}
      </div>
      <div class="content-items">
        <label>橡皮大小：</label>
        <input type="range" class="custom-range" v-model="eraserWidth" min="5" max="30">   {{eraserWidth}}
      </div>
      <div class="content-items">
        <label>画笔颜色：</label>
        <div v-for="color in colorList" @click="penColor = color" class="color-item" :style="{backgroundColor:color,height: color==penColor ? '20px':'15px'}"></div>
      </div>
      <div class="content-items">
        <label>仅触控笔：</label>
        <div @click="switchmode()" :class="{'switch-botton':true, 'close':mode=='all touch'}"></div>
        {{mode=='only pen' ? '开' : '关' }}
      </div>
    </my-model>
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

      imgDataList:[],

      // modal_show.setting_show:false,

      modal_show:{
        setting_show:false,
      },

      colorList:['#000','#f00','#ffa500','#ff0','#90ee90','#87ceeb','#fff'],
      dragToolsBar:null ,//工具栏
      disx:0,
      disy:0,
      editToolsActive:false,
      pressTimer:null,
      pressTimerNum:0,
    }
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    document.body.classList.remove('none-select')
    document.removeEventListener('pointermove', this.dragmove)
    document.removeEventListener('pointerup', this.dragup)
  },
  methods: {
    dragdown(e){
      if(!this.dragToolsBar){
        this.dragToolsBar = this.$refs.dragToolsBar
        document.addEventListener('pointermove', this.dragmove)
        document.addEventListener('pointerup', this.dragup)
        this.disx = e.pageX - this.dragToolsBar.offsetLeft
        this.disy = e.pageY - this.dragToolsBar.offsetTop
        this.dragToolsBar.style.right = 'unset'
        this.dragToolsBar.style.left = e.pageX - this.disx + 'px';
        this.dragToolsBar.style.top = e.pageY - this.disy + 'px';
      }
      
      
    },

    dragmove(e){
      if(this.dragToolsBar){
        this.dragToolsBar.style.left = e.pageX - this.disx + 'px';
        this.dragToolsBar.style.top = e.pageY - this.disy + 'px';
      } 
    },

    dragup(){
      this.dragToolsBar = null
      document.removeEventListener('pointermove', this.dragmove)
    },

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
      if(this.dragToolsBar)
        return
      this.currentPointerType = event.pointerType;
      if(this.mode == "all touch" && this.currentPointerType == 'pen'){
        this.mode = "only pen"
        this.$toast.show(`检测到正在使用触控笔，开启"仅触控笔"模式，可在画板设置中关闭`,"info")
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
      if(this.dragToolsBar)
        return
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
      if(this.dragToolsBar)
        return
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
      console.log("click")
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
    // handleStart(){
    //   console.log("start")
    //   this.pressTimer = setTimeout(() => {
    //     // this.editTools_show = true
    //     this.modal_show.setting_show = true
    //     clearTimeout(this.pressTimer)
    //     this.pressTimer = null
    //   }, 500);
    // },
    // handleMove(event){
    //   if (this.pressTimer) {
    //     clearTimeout(this.pressTimer);
    //     this.pressTimer = null;
    //   }
    // },
    // handleEnd(){
    //   // 如果定时器还在，说明是点击事件
    //   console.log("end")
    //   if (this.pressTimer) {
    //     clearTimeout(this.pressTimer);
    //     this.pressTimer = null;
    //     this.getcanvastool(this.erasing ? "pencil":"eraser")
    //   }
    // },
    // handleCancel(){
    //   if (this.pressTimer) {
    //     clearTimeout(this.pressTimer);
    //     this.pressTimer = null;
    //   }
    // },
    //控制toolsbar点击后展示，不操作后3s隐藏
    handleToolsBarFocus(){
      console.log("---------focus")
      this.editToolsActive = true
      this.pressTimerNum = 0
      clearInterval(this.pressTimer)
      this.pressTimer = null
      
    },

    handleToolsBarOut(){
      this.pressTimerNum = 0
      clearInterval(this.pressTimer)
      this.pressTimer = null
      this.pressTimer = setInterval(() => {
        this.pressTimerNum += 1
        if(this.pressTimerNum >= 5){
          this.editToolsActive = false
          this.pressTimerNum = 0
          clearInterval(this.pressTimer)
          this.pressTimer = null
        }
      }, 1000);
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
  canvas {
    display: block;
    touch-action: none;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
  }

  .buttonbox{
    position: fixed;
    left: 0;
    z-index: 988;
  }

  /* .edit-tools-fixedbox{
    position: fixed;
    z-index: 2;
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
  } */

  .edit-tools-item, .edit-tools-drag {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
    cursor: pointer;
  }

  .edit-tools-drag {
    width: unset;
    opacity: 0.5;
  }

  


  .edit-tools-item img{
    width: 25px;
    -webkit-user-drag: none;
  }

  .edit-tools-item:hover{
/*    box-shadow: inset 1px 1px 4px 0px rgb(158 158 158 / 20%), inset -10px -13px 14px 1px rgba(255, 255, 255, 0.9);*/
    /* background: linear-gradient(45deg, #c2d9ed 0%, rgba(255, 255, 255, 1) 100%); */
    background: var(--button-highlight);

  }

  .edit-tools-item.active {
    background: #ffc848;
    box-shadow: inset 2px 2px 4px 0px #8c6509, inset -1px -1px 6px 0px #fff;
    color: #363636;
  }
  
  .content-items{
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
      width: 120px;
      transform: translateY(5px);
  }

  /* 工具栏2.0样式 */
  .edit-tools-box {
    display: flex;
    position: fixed;
    right:20px;
    border-radius: 14px;
    border: var(--box-border);
    z-index: 999;
    background: var(--box-bgc);
    padding: 6px 4px;
    box-shadow: unset;
    opacity: 0.5;
    touch-action: none;
  }

  .edit-tools-box.active {
    opacity: 1;
    box-shadow: var(--box-shadow);
  }

  /*.edit-tools-box:hover {
    box-shadow: var(--box-shadow);
    opacity: 1;
  }*/

  .divider-line {
    width: 0;
    border-left: var(--box-border);
    margin: 0 5px;
  }
</style>
