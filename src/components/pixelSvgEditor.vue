<template>
  <input type="text" v-model="rows">x
  <input type="text" v-model="cols">
  <div class="drawing-area">
    <canvas :width="width" :height="height" ref="canvas"
              @pointerdown="handlePointerDown"
              @pointermove="handlePointerMove"
              @pointerup="handlePointerUp"
              @pointerleave="handlePointerLeave"
              ></canvas>
    <div class="rect" v-for="x in rows*cols" :style="{top:((x-1)%rows)*gridSize+'px',left:(Math.floor((x-1)/rows)*gridSize+'px'),position:'absolute', width:gridSize+'px',height:gridSize+'px',backgroundColor:(((x-1)%rows)+Math.floor((x-1)/rows))%2==0 ? '#fff' : '#eee'}">
    </div>
  </div>
 
  <div class="tools-bar">
    <button @click="tool = 1">画笔</button>
    <button @click="tool = 2">橡皮</button>
    <button @click="tool = 3">直线</button>
    <button @click="tool = 4">矩形</button>
    <button @click="tool = 5">圆形</button>
    <button @click="filled = !filled">{{filled ? "填充" : "不填充"}}</button>
    <button @click="tool = 6">填充</button>
    <button @click="clearAll">删除</button>
  </div>
</template>

<script>
export default {
  computed: {
    width() {
      return this.cols*this.gridSize;
    },
    height() {
      return this.rows*this.gridSize;;
    },
  },
  data() {
    return {
      tool:1,
      rows:30,
      cols:30,
      gridSize:10,
      currentColor:'#252525',
      isDrawing: false,
      pixels: [],
      endPoints:{x:0,y:0},
      ctx:null,
      historys:[],
      filled:false,
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      if (window.PointerEvent) { 
        // Pointer events are supported. 
        this.log="Pointer events are supported."
      }
      const canvas = this.$refs.canvas;
      this.ctx = canvas.getContext('2d');
      this.addHistoy()
    },
    handlePointerDown(event){
      this.isDrawing = true
      this.endPoints = this.getPoint({x:event.clientX,y:event.clientY})
      if(this.tool == 1) this.drawPixel(this.endPoints)
      else if(this.tool == 2) this.clearPixel(this.endPoints)
      else if(this.tool == 6){
        this.isDrawing = false
        console.log(this.tool)
        this.ctx.fill()
      }
      
    },
    handlePointerMove(event){
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
          this.drawCircle(this.endPoints, currPoint);
        }
      }else{
        if(true){
          this.showLastHistory()
          this.drawPixel(currPoint)
        }
      }
    },
    handlePointerUp(){
      if(this.isDrawing){
        this.isDrawing = false
        this.addHistoy()
      }
      
    },
    handlePointerLeave(){
      if(this.isDrawing == false)
        this.showLastHistory()
    },
    drawPixel(point){
      this.ctx.fillRect(point.x,point.y,this.gridSize,this.gridSize)
    },
    clearPixel(point){
      this.ctx.clearRect(point.x,point.y,this.gridSize,this.gridSize)
    },
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
      
      if(this.filled){
        this.ctx.fillRect(start.x,start.y,end.x-start.x+this.gridSize,end.y-start.y+this.gridSize)
      }else{
        this.ctx.lineWidth = this.gridSize
        this.ctx.strokeRect(start.x+this.gridSize/2,start.y+this.gridSize/2,end.x-start.x,end.y-start.y)
      }
    },
    drawCircle(start, end) {
      const radius = Math.sqrt(Math.pow((end.x - start.x) / this.gridSize, 2) + Math.pow((end.y - start.y) / this.gridSize, 2));
      const centerX = Math.floor(start.x / this.gridSize);
      const centerY = Math.floor(start.y / this.gridSize);

      let x = Math.floor(radius);
      let y = 0;
      let decisionOver2 = 1 - x;

      while (x >= y) {
        this.drawCirclePoints(centerX, centerY, x, y);
        y++;
        if (decisionOver2 <= 0) {
          decisionOver2 += 2 * y + 1;
        } else {
          x--;
          decisionOver2 += 2 * (y - x) + 1;
        }
      }
    },
    drawCirclePoints(cx, cy, x, y) {
      this.drawPixel({ x: (cx + x) * this.gridSize, y: (cy + y) * this.gridSize });
      this.drawPixel({ x: (cx - x) * this.gridSize, y: (cy + y) * this.gridSize });
      this.drawPixel({ x: (cx + x) * this.gridSize, y: (cy - y) * this.gridSize });
      this.drawPixel({ x: (cx - x) * this.gridSize, y: (cy - y) * this.gridSize });
      this.drawPixel({ x: (cx + y) * this.gridSize, y: (cy + x) * this.gridSize });
      this.drawPixel({ x: (cx - y) * this.gridSize, y: (cy + x) * this.gridSize });
      this.drawPixel({ x: (cx + y) * this.gridSize, y: (cy - x) * this.gridSize });
      this.drawPixel({ x: (cx - y) * this.gridSize, y: (cy - x) * this.gridSize });
    },
    clearAll(){
      this.ctx.clearRect(0,0,this.width,this.height)
      this.addHistoy()
    },
    getPoint(point){
      const rect = this.$refs.canvas.getBoundingClientRect();
      const x = Math.floor((point.x - rect.left) / this.gridSize)*this.gridSize
      const y = Math.floor((point.y - rect.top) / this.gridSize)*this.gridSize
      return {x,y}
    },
    showLastHistory() {
      const history = this.historys
      this.ctx.putImageData(history[history.length - 1]['data'], 0, 0)
    },
    addHistoy() {
      this.historys.push({
        data: this.ctx.getImageData(0, 0, this.width, this.height)
      })
    }
  },
};
</script>

<style>
.drawing-area {
  border: 0.5px solid #000;
  position: relative;
  width: fit-content;
  font-size: 0;
  margin: 0 auto;
}
canvas {
  position: relative;
  z-index: 1;
  touch-action: none;
}
.rect {
  box-sizing: border-box;
  pointer-events: none;
}

</style>
