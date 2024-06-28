<template>
  <input type="text" v-model="rows">x
  <input type="text" v-model="cols">
  <canvas :width="width" :height="width" class="drawing-area" ref="canvas"
              @pointerdown="handlePointerDown"
              @pointermove="handlePointerMove"
              @pointerup="handlePointerUp"></canvas>
  <div class="tools-bar">
    <button @click="tool = 1">画笔</button>
    <button @click="tool = 2">橡皮</button>
    <button @click="tool = 3">直线</button>
    <button @click="tool = 4">矩形</button>
    <button @click="tool = 5">圆形</button>
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
      rows:10,
      cols:10,
      gridSize:20,
      currentColor:'#252525',
      isDrawing: false,
      pixels: [],
      endPoints:{x:0,y:0},
      ctx:null
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
    },
    handlePointerDown(event){
      this.isDrawing = true
      this.endPoints = this.getPoint({x:event.clientX,y:event.clientY})
      if(this.tool == 1) this.drawPixel(this.endPoints)
      else if(this.tool == 2) this.clearPixel(this.endPoints)
      
    },
    handlePointerMove(event){
      const end = this.getPoint({x:event.clientX,y:event.clientY})
      if(this.isDrawing){
        if(this.tool == 1){
          this.drawPixel(end)
        }else if(this.tool == 2){
          this.clearPixel(end)
        }
        
      }
    },
    handlePointerUp(){
      this.isDrawing = false
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
    getPoint(point){
      const rect = this.$refs.canvas.getBoundingClientRect();
      const x = Math.floor((point.x - rect.left) / this.gridSize)*this.gridSize
      const y = Math.floor((point.y - rect.top) / this.gridSize)*this.gridSize
      return {x,y}
    }
  },
};
</script>

<style>
.drawing-area {
  border: 1px solid #000;
  display: block;
  margin: 0 auto;
}
</style>
