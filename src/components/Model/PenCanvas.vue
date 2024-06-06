<template>
  
    <div class="buttonbox">
      <button   @click="switchmode">模式：{{mode}}</button>
      <button   @click="resize()">resize</button>
      <h4>{{canvasWidth}} x {{canvasHeight}}</h4>
    </div>
    <canvas ref="canvas" 
               @pointerdown="handlePointerDown"
               @pointermove="handlePointerMove"
               @pointerup="handlePointerUp"></canvas>
    <div :class="{'edit-tools-fixedbox':true,'show':editTools_show}">
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
     
      editTools_show:false,

      erasing:false,
      el:null,
      points:[],
      beginPoint:{x:0,y:0},

      penWidth: 5,
      canvasWidth:0,
      canvasHeight:0,

      pressTimer:null
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
    resize(Imgdata){
        
        const canvas = this.$refs.canvas;
        const imageData = this.context.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = this.el.clientWidth;
        canvas.height = this.el.clientHeight;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
         // 清空并重置画布
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        // this.context.scale(scaleFactor, scaleFactor);

        // 恢复画布内容
        this.context.putImageData(imageData, 0, 0);

    },
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
      this.canvasWidth = canvas.width
      this.canvasHeight = canvas.height
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
    
    
    
    getcanvastool(tool){
      var ctx = this.context
      if (tool == 'pencil') {
        this.context.globalCompositeOperation = 'source-over';
        this.context.lineWidth = 1;
        this.erasing = false

      } else if(tool == "eraser"){
        this.context.globalCompositeOperation = 'destination-out';
        this.context.lineWidth = 20; // Set the eraser size
        this.erasing = true
      }
    },

    //处理工具栏按钮事件
    handleStart(){
      this.pressTimer = setTimeout(() => {
        this.editTools_show = true
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
    padding-right: 50px;
    box-shadow: var(--box-shadow);
  }


  .edit-tools-handle{
    position: absolute;
    background-color: #fff4ca;
    width: 40px;
    height: 40px;
    border-radius: 23px;
    overflow: hidden;
    left: -110px;
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

  
</style>
