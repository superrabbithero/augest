<template>
  
    <div class="buttonbox">
      <button   @click="switchmode">模式：{{mode}}</button>
      <button   @click="inverPathColor">反色</button>
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
      isScroll:false,
      context: null,
      currentPointerType: null,
      multiLastPt:{},
      offsetTop:0,
      offsetLeft:0,
      startY:0,
      scrolltop:0,
      erasing:false,
      el:null
    }
  },
  mounted() {
    this.init()
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
      if(this.mode == "only pen" && this.currentPointerType === 'pen' || this.mode === "all touch"){
        this.scrolltop = this.el.parentElement.scrollTop;
        this.isDrawing = true;
        this.context.beginPath();
        
      }else if(this.mode == "only pen" && this.currentPointerType === 'touch'){
        this.isScroll = true
        this.startY = event.pageY - this.el.parentElement.scrollTop;;
      }
    
    },
    handlePointerMove(event){
      var id = event.pointerId
      if(this.isDrawing && this.multiLastPt[id]){
        if (this.mode == "only pen" && this.currentPointerType === 'pen' || this.mode === "all touch") {
          var scrolltop = this.el.parentElement.scrollTop;
          this.context.moveTo(this.multiLastPt[id].x - this.offsetLeft, this.multiLastPt[id].y - this.offsetTop + scrolltop);
          this.context.lineTo(event.pageX - this.offsetLeft, event.pageY - this.offsetTop + scrolltop);
          this.context.stroke();
          this.multiLastPt[id] = {x:event.pageX,y:event.pageY}
        }
      }else if(this.isScroll){
        let scrolltop1 = this.el.parentElement.scrollTop;
        const y = event.pageY - this.el.parentElement.scrollTop;
        const walkY = (y - this.startY) * 3;
        this.el.parentElement.scrollTop = scrolltop1 - walkY
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
        this.isScroll = false
      }
      
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
    position: absolute;
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
