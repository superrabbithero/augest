<template>
  
    <div class="buttonbox">
      <button   @click="switchmode">模式：{{mode}}</button>
    </div>
    <canvas ref="canvas" 
               @pointerdown="handlePointerDown"
               @pointermove="handlePointerMove"
               @pointerup="handlePointerUp"></canvas>
    <div class="edit-tools" >
      <div :class="{'edit-tools-item':true,'active':erasing}" >
        <IconWrapper @click="erase()" iconName="ClearFormat" theme="outline" :strokeWidth='4' fill="#ffc848" size="30" />
      </div>
    </div>
</template>

<script>

export default {
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
     
      erasing:false,
      el:null,
      points:[],
      beginPoint:{x:0,y:0},

      penWidth: 5
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
          console.log(this.points)
        }
      }
    
    },
    drawLine(startp,ctrlp,endp,cl,ct) {
      this.context.beginPath();
      this.context.moveTo((startp.x-cl),(startp.y-ct))
      this.context.quadraticCurveTo((ctrlp.x-cl),(ctrlp.y-ct),(endp.x-cl),(endp.y-ct))
      // this.context.strokeStyle = this.penColor;//设置颜色
      // this.context.lineWidth = this.penWidth;//设置大小
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
              this.context.lineWidth = event.pressure*this.penWidth;//设置大小
            }else{
              this.context.lineWidth = this.penWidth/5;//设置大小
            }
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
  .edit-tools{
    position: fixed;
    background-color: var(--box-bgc);
    border-radius: 20px 0 0 20px;
    padding-right: 50px;
    top: 150px;
    right:-75px;
    transition: right 0.3s ease;
    box-shadow: var(--box-shadow)
  }

  .edit-tools:hover{
    position: fixed;
    
    top: 150px;
    right:0px;
  }

  .edit-tools-item {
    width: 40px;
    height: 40px;
/*    border: 3px solid #ffc848;*/
    border-radius: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edit-tools-item.active{
    background-color: #123456;
  }
  
</style>
