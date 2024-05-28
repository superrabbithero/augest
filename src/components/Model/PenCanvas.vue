<template>
  
    <div class="buttonbox">
      <button   @click="switchmode">模式：{{mode}}</button>
      <button   @click="inverPathColor">反色</button>
      <h5>{{touchcount}}</h5>
    </div>
    <canvas ref="canvas" 
               @pointerdown="handlePointerDown"
               @pointermove="handlePointerMove"
               @pointerup="handlePointerUp"></canvas>
    <div :class="{'edit-tools':true,'active':erasing}" >
      <IconWrapper @click="erase()" iconName="ClearFormat" theme="outline" :strokeWidth='4' fill="#ffc848" size="30" />
    </div>
</template>

<script>

export default {
  data(){
    return{
      log:"",
      mode:"all touch",
      isDrawing: false,
<<<<<<< HEAD
      
=======
      isScroll:0,
>>>>>>> 47c191fb1d5315fa6760950f3dd6222ba6a06fb6
      context: null,
      currentPointerType: null,
      multiLastPt:{},
      offsetTop:0,
      offsetLeft:0,
      isScroll:false,
      startY:0,
      scrolltop:0,
      // 用于实现触碰惯性滚动
      velocity: 0,
      lastMoveTime: 0,
      lastY: 0,
      animationFrameId: null,
      erasing:false,
      el:null,
      touchcount:0
    }
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
  methods: {
    init() {
      if (window.PointerEvent) { 
        // Pointer events are supported. 
        this.log="Pointer events are supported. "
      }
      const canvas = this.$refs.canvas;
      const parent = canvas.parentElement;
      // const grandpa = parent.parentElement
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      this.el = parent
      this.offsetLeft = parent.offsetLeft
      this.offsetTop = parent.offsetTop
      this.context = canvas.getContext('2d');
      this.context.strokeStyle = "red"
      document.body.classList.add('none-select')

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
      var id = event.pointerId
      this.multiLastPt[id] = {x:event.pageX,y:event.pageY}
      if(this.mode == "only pen" && this.currentPointerType === 'pen'){
        this.scrolltop = this.el.parentElement.scrollTop;
        this.isDrawing = true;
        this.context.beginPath();
        
      }else if(this.mode == "only pen" && this.currentPointerType === 'touch'){
<<<<<<< HEAD
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
        }
        this.isScroll = true
        this.startY = event.clientY;
        this.scrolltop = this.el.parentElement.scrollTop;
        //实现触摸滚动
        this.lastMoveTime = Date.now();
        this.lastY = event.clientY;
        //实现惯性滚动
=======
        this.isScroll = id
        this.startY = event.pageY;
        this.scrolltop = this.el.parentElement.scrollTop;
      }else if(this.mode === "all touch"){
        this.scrolltop = this.el.parentElement.scrollTop;
        this.touchcount = Object.keys(this.multiLastPt).length
        if(Object.keys(this.multiLastPt).length == 2){
          this.isDrawing = false;
          this.isScroll = id
          this.startY = event.pageY;
        }else{
          this.isDrawing = true;
          this.context.beginPath();
        }
>>>>>>> 47c191fb1d5315fa6760950f3dd6222ba6a06fb6
      }
    
    },
    handlePointerMove(event){
      var id = event.pointerId
      if(this.isDrawing && this.multiLastPt[id]){
        if (this.mode == "only pen" && this.currentPointerType === 'pen' || this.mode === "all touch") {
          //触控笔模式，手指滑动页面
          var scrolltop = this.el.parentElement.scrollTop;
          this.context.moveTo(this.multiLastPt[id].x - this.offsetLeft, this.multiLastPt[id].y - this.offsetTop + scrolltop);
          this.context.lineTo(event.pageX - this.offsetLeft, event.pageY - this.offsetTop + scrolltop);
          this.context.stroke();
          this.multiLastPt[id] = {x:event.pageX,y:event.pageY}
        }
<<<<<<< HEAD
      }else if(this.isScroll){
        const currentY = event.clientY;
        const deltaY = currentY - this.startY
        this.el.parentElement.scrollTop = this.scrolltop - deltaY
        //实现触摸滚动
        const currentTime = Date.now();
        const timeElapsed = currentTime - this.lastMoveTime;

        if (timeElapsed > 0.1) {
          this.velocity = (currentY - this.lastY) / timeElapsed;

          this.lastMoveTime = currentTime;
          this.lastY = currentY;
        }
=======
      }else if(this.isScroll == id){
        const y = event.pageY - this.startY;
        this.el.parentElement.scrollTop = this.scrolltop - y
>>>>>>> 47c191fb1d5315fa6760950f3dd6222ba6a06fb6
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
<<<<<<< HEAD
        const currentY = event.clientY;
        const currentTime = Date.now();
        const timeElapsed = currentTime - this.lastMoveTime;

        if (timeElapsed > 0.1) {
          this.velocity = (currentY - this.lastY) / timeElapsed;

          this.lastMoveTime = currentTime;
          this.lastY = currentY;
        }
        this.stopScroll()
=======
        this.isScroll = null
>>>>>>> 47c191fb1d5315fa6760950f3dd6222ba6a06fb6
      }
    },
    stopScroll() {
      this.isScroll = false;
      // 开始惯性滚动
      
      this.startInertiaScroll();
    },
    startInertiaScroll() {
      const deceleration = 0.03; // 滑动的减速度，可以根据需要调整
      let that = this
      const step = () => {
        if (Math.abs(this.velocity) > 0.01) {
          that.el.parentElement.scrollTop -= that.velocity * 16;
          that.velocity *= (1 - deceleration);
          that.animationFrameId = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(that.animationFrameId);
          that.animationFrameId = null;
        }
      };
      this.animationFrameId = requestAnimationFrame(step);
    },
    inverPathColor(){
      // Get the current canvas image data
      const imageData = this.context.getImageData(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      const data = imageData.data;

      // Invert colors
      for (let i = 0; i < data.length; i += 4) {
        // If the pixel is black (0,0,0), change it to white (255,255,255)
        if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
      }
      this.context.putImageData(imageData, 0, 0);
    },
    erase(){
      var ctx = this.context
      if (this.erasing) {
        this.context.globalCompositeOperation = 'source-over';
        this.context.lineWidth = 1;
        // this.context.strokeStyle = 'red'; // Set the drawing color
      } else {
        this.context.globalCompositeOperation = 'destination-out';
        this.context.lineWidth = 20; // Set the eraser size
      }
      this.erasing = !this.erasing
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
    right: 0;
    z-index: 988;
  }

  .edit-tools {
    width: 40px;
    height: 40px;
    border: 3px solid #ffc848;
    border-radius: 23px;
    display: flex;
    position: fixed;
    top: 150px;
    right:40px;
    justify-content: center;
    align-items: center;
  }
  .edit-tools.active{
    background-color: #123456;
  }
  
</style>
