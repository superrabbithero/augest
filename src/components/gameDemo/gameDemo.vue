<template>
  <div class="container">
    <canvas ref="mainCanvas" width="720" height="480" :class="{'game-canvas':true, 'gridsytle':showGrid}" ></canvas>
    <div class="button-groups">
      <div class="button-item">
        <label>显示网格：</label>
        <input type="checkbox" v-model="showGrid">
      </div>
      <div class="button-item">
        <label>动画控制：</label>
        <button class="fill" @click="startAnimate">开始</button>
        <button class="fill">停止</button>{{animateId}}
      </div>
      <div class="button-item">
        <label>测试方法的按钮：</label>
        <button class="fill" @click="test">test</button>
      </div>
    </div>
  </div>
</template>

<script>
import drawingPng from '@/assets/game-img/test/drawing.png'
export default {

  data(){
    return {
      showGrid:true,
      mainGameData:[],
      animateId:0,
      maincanvas:null,
      ctx:null,
      srcMap:{},
      objectMap:{},
      srcPath:'@/assets/game-img/test/'
    }
  },
  created(){
    this.objectMap = new Map()
    this.srcMap = new Map()
  },
  mounted(){
    this.init()
  },
  methods:{
    test(){
      this.pushObject(1,'drawing.svg',{x:50,y:50})
      console.log(this.objectMap)
      console.log(this.srcMap)
    },
    init(){
      this.maincanvas = this.$refs.mainCanvas;
      this.ctx = this.maincanvas.getContext('2d');
      this.ctx.lineWidth = 1
    },
    pushObject(id,url,position){
      if(this.srcMap.has(url)){
        this.objectMap.set(id,{url,position})
      }else{
        this.getImage(url).then((rs)=>{
          console.log(rs)
          this.objectMap.set(id,{url,position})
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    deleteObject(id){
      this.objectMap.delete(id)
    },
    startAnimate(){
      if(this.animateId == 0){
        this.animateId = requestAnimationFrame(this.updateMainCanvasAnimate)
      }
    },
    updateMainCanvasAnimate(){
      this.ctx.clearRect(0,0,720,480)
      this.objectMap.forEach((value, key) => {
        this.ctx.drawImage(this.srcMap.get(value.url),value.position.x,value.position.y)
      })
      this.animateId = requestAnimationFrame(this.updateMainCanvasAnimate)
    },
    async getImage(url) {
      if(url.split('.').slice(-1)[0] == 'svg'){
        // 加载SVG图像
        const svgResponse = await fetch(require(`@/assets/game-img/test/${url}`));
        const svgText = await svgResponse.text();
        const svgDoc = new DOMParser().parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const svgImg = new Image();
        const that = this
        svgImg.onload = function() {
          that.srcMap.set(url, svgImg); // 在指定位置绘制SVG图像
          URL.revokeObjectURL(svgUrl);
        };
        svgImg.src = svgUrl;
      }else{
        // 加载PNG图像
        const pngImg = new Image();
        const that = this
        pngImg.onload = function() {
          that.srcMap.set(url, pngImg) // 在指定位置绘制PNG图像
        };
        pngImg.src = require(`@/assets/game-img/test/${url}`); 

        // 假设你的PNG文件在assets目录中
      }
    }
  },
}
  
</script>

<style scoped>
  .container{
    height: calc(100vh - 125px);
  }

  .game-canvas{
    border: var(--box-border);
    width: 720px;
    height: 480px;
    
  }

  .gridsytle{
    background: linear-gradient(
        -45deg,
        #d9d9d9 25%,
        transparent 25%,
        transparent 75%,
        #d9d9d9 75%,
        #d9d9d9 100%
      ),
      linear-gradient(
        -45deg,
        #d9d9d9 25%,
        transparent 25%,
        transparent 75%,
        #d9d9d9 75%,
        #d9d9d9 100%
      );
    background-size: 10px 10px;
    background-position: 0px 0px, 5px 5px;
    background-color: white;
  }

  .button-groups {
    display: flex;
  }

  .button-item{
    margin: 10px;
    display: flex;
    align-items: center;
  }
  .button-item button{
    margin-right:10px;
  }
</style>

