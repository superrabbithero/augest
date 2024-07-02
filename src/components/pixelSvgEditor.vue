<template>
  <div class="tool-setting-bar">
    <div class="right"></div>
    <div class="left">
      <div class="icon-item" style="padding:2px;width:26px;height: 26px;">
        <img src="@/assets/pixel-icon/size-setting.png"/>
        <div class="size-setting">
          画布大小：
          <div class="size">
            <input type="number" v-model="rows" @change="validateNumber">
            <span>x</span>
            <input type="number" v-model="cols" @change="validateNumber">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="work-area">
    <div class="left">
      <div class="tools-bar">
      <div class="tool-item" @click="tool = 1"><img src="@/assets/pixel-icon/pen.png"/></div>
      <div class="tool-item" @click="tool = 2"><img src="@/assets/pixel-icon/erase.png"/></div>
      <div class="tool-item" @click="tool = 3"><img src="@/assets/pixel-icon/line.png"/></div>
      <div class="tool-item" @click="tool = 4"><img src="@/assets/pixel-icon/rect.png"/></div>
      <div class="tool-item" @click="tool = 5"><img src="@/assets/pixel-icon/circle.png"/></div>
      <div class="tool-item" @click="tool = 6"><img src="@/assets/pixel-icon/filled.png"/></div>
      <div class="tool-item" @click="clearAll"><img src="@/assets/pixel-icon/delete.png"/></div>
      <!-- <div class="tool-item" @click="tool = 7">吸管</div> -->
      <div class="tool-item">
        <input type="color" v-model="currentColor">
      </div>
    </div>
    </div>
    <div class="right">
      <div class="drawing-area">
        <canvas class="canvas-grid" ref="canvas_grid" :width="width" :height="height"></canvas>
        <canvas :width="width" :height="height" ref="canvas"
                  @pointerdown="handlePointerDown"
                  @pointermove="handlePointerMove"
                  @pointerup="handlePointerUp"
                  @pointerleave="handlePointerLeave"
                  ></canvas>
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
      return this.rows*this.gridSize;;
    },
  },
  data() {
    return {
      tool:1,
      rows:10,
      cols:12,
      gridSize:30,
      currentColor:'#000',
      colorIndex:0,
      isDrawing: false,
      pixels: [],
      endPoints:{x:0,y:0},
      ctx:null,
      historys:[],
      log:"",
      shiftdown:false
    };
  },
  mounted() {
    this.init()
    this.drawGrid()
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  },
  methods: {
    drawGrid() {
      const canvas = this.$refs.canvas_grid
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, this.width, this.height);
      if(true){
        for (let i = 0; i < this.rows; i++){
          for (let j = 0; j < this.cols; j++){
            ctx.fillStyle = (i+j)%2 ? "#fff" : '#d9d9d9'
            ctx.fillRect(j * this.gridSize, i * this.gridSize,this.gridSize,this.gridSize)
          }
        }
      }else{
        ctx.strokeStyle = '#d9d9d9';
        for (let i = 0; i <= this.rows; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * this.gridSize);
          ctx.lineTo(this.width, i * this.gridSize);
          ctx.stroke();
        }
        for (let i = 0; i <= this.cols; i++) {
          ctx.beginPath();
          ctx.moveTo(i * this.gridSize, 0);
          ctx.lineTo(i * this.gridSize, this.height);
          ctx.stroke();
        }
      }
    },
    switchColor(point){
      const color = this.getColorAtPixel(point)
      const currentColor = 'rgba('+color.r+','+color.g+','+color.b+','+color.a+')'
      if(currentColor != 'rgba(0,0,0,0)'){
        this.currentColor = currentColor
      }
      console.log(this.currentColor)
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
        this.ctx.fillStyle = this.currentColor
        this.fillArea(this.endPoints);
        this.addHistoy()
      }else if(this.tool == 7){
        this.switchColor(this.endPoints)
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
        }
      }else{
        if(this.tool != 6 && this.tool != 7){
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
      this.ctx.strokeStyle = this.currentColor
      this.ctx.lineWidth = this.gridSize
      if(this.shiftdown){
        this.ctx.strokeRect(start.x+this.gridSize/2,start.y+this.gridSize/2,end.x-start.x,end.x-start.x)
      }else{
        this.ctx.strokeRect(start.x+this.gridSize/2,start.y+this.gridSize/2,end.x-start.x,end.y-start.y)
      }
    },
    //椭圆BH算法https://blog.csdn.net/myf_666/article/details/128167392
     drawPixelEllipse(start, end) {
      const rx = Math.abs((end.x - start.x) / this.gridSize);
      const ry = this.shiftdown ? rx : Math.abs((end.y - start.y) / this.gridSize);
      const xc = start.x/ this.gridSize
      const yc = start.y/ this.gridSize

      this.log = "xc:"+xc+"yc:"+yc+"rx:"+rx

      let x = 0;
      let y = ry;
      let d1 = ry * ry - rx * rx * ry + 0.25 * rx * rx;
      let dx = 2 * ry * ry * x;
      let dy = 2 * rx * rx * y;

      while (dx < dy) {
        this.drawEllipsePoints(xc, yc, x, y);
        if (d1 < 0) {
          dx += 2 * ry * ry;
          d1 += dx + ry * ry;
        } else {
          y--;
          dx += 2 * ry * ry;
          dy -= 2 * rx * rx;
          d1 += dx - dy + ry * ry;
        }
        x++
      }

      let d2 = ry * ry * (x + 0.5) * (x + 0.5) + rx * rx * (y - 1) * (y - 1) - rx * rx * ry * ry;
      while (y >= 0) {
        this.drawEllipsePoints(xc, yc, x, y);
        if (d2 < 0) {
          d2+=ry*ry*(2*x+2)+rx*rx*(-2*y+3)
          x++
        } else {
          d2+=rx*rx*(-2*y+3)
        }
        y--
      }
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
      
      while (stack.length) {
        const { x, y } = stack.pop();
        const currentColor = this.getColorAtPixel({ x, y });

        if (this.colorsMatch(currentColor, targetColor)) {
          this.drawPixel({x,y})

          if (x > 0) stack.push({ x: x - this.gridSize, y });
          if (x < width - this.gridSize) stack.push({ x: x + this.gridSize, y });
          if (y > 0) stack.push({ x, y: y - this.gridSize });
          if (y < height - this.gridSize) stack.push({ x, y: y + this.gridSize });
        }
      }
    },
    getColorAtPixel(point) {
      const { data } = this.ctx.getImageData(point.x, point.y, 1, 1);
      return { r: data[0], g: data[1], b: data[2], a: data[3] };
    },
    hexToArgb(hex) {
      let a = 255, r = 0, g = 0, b = 0;
      console.log(hex)
      if (hex.length === 9) { // #AARRGGBB
        a = parseInt(hex.slice(1, 3), 16);
        r = parseInt(hex.slice(3, 5), 16);
        g = parseInt(hex.slice(5, 7), 16);
        b = parseInt(hex.slice(7, 9), 16);
      } else if (hex.length === 7) { // #RRGGBB
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
      } else if (hex.length === 5) { // #ARGB
        a = parseInt(hex.slice(1, 2).repeat(2), 16);
        r = parseInt(hex.slice(2, 3).repeat(2), 16);
        g = parseInt(hex.slice(3, 4).repeat(2), 16);
        b = parseInt(hex.slice(4, 5).repeat(2), 16);
      } else if (hex.length === 4) { // #RGB
        r = parseInt(hex.slice(1, 2).repeat(2), 16);
        g = parseInt(hex.slice(2, 3).repeat(2), 16);
        b = parseInt(hex.slice(3, 4).repeat(2), 16);
      }
      return { a, r, g, b };
    },
    colorsMatch(color1, color2) {
      return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
    },


    drawEllipsePoints(xc, yc, x, y) {
      this.drawPixel({ x: (xc + x) * this.gridSize, y: (yc + y) * this.gridSize });
      this.drawPixel({ x: (xc - x) * this.gridSize, y: (yc + y) * this.gridSize });
      this.drawPixel({ x: (xc + x) * this.gridSize, y: (yc - y) * this.gridSize });
      this.drawPixel({ x: (xc - x) * this.gridSize, y: (yc - y) * this.gridSize });
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
    },
    validateNumber(event){
      var input = event.target
      if(input.value % 1 !== 0 || input.value <= 0){
        input.value = Math.max(Math.floor(input.value), 1)
      }
      this.drawGrid() 
    }
  },
};
</script>

<style>
.drawing-area {
  border: 0.5px solid #d9d9d9;
  position: absolute;
  width: fit-content;
  font-size: 0;
/*  margin: 0 auto;*/
  height: fit-content;
    left: 50%;
  transform: translateX(-50%);

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
  width: 80px;
  height: fit-content;
  
}
.tool-item{
  display: flex;
  padding: 5px
}
.tool-item:hover{
  background-color: #eee
}
.tool-item img{
  width: 30px;
  height: 30px;
}

.tool-setting-bar {
  height: 30px;
  border-bottom: var(--box-border);
  display: flex;
  justify-content: space-between
}
.work-area{
  display: flex;
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 91px);
}

.work-area .right{
  flex: 1;
  position: relative;
  overflow: auto;
  border-left: var(--box-border)
}

.work-area > div{
  padding: 5px;
}

.icon-item {
  position: relative;
  padding:2px;
  width:26px;
  height: 26px;
}

.icon-item:hover {
  background-color: #eee;
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
}

.size-setting .size{
  display: flex;
  width: 140px;
}

.size-setting .size > input {
  width: 40px;
}
</style>
