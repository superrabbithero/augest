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
        <button class="fill" @click="stopAnimate">停止</button>
      </div>
      <div class="button-item">
        <label>测试方法的按钮：</label>
        <button class="fill" @click="test">test</button>
      </div>
      <div class="button-item">
        <label>方向：</label>
        <div class="dir-contorl">
          <div style="margin-bottom: 10px;">
            <button @click="startJump"><svg-icon name="arrow-up"></svg-icon></button>
          </div>
          <div>
            <button @pointerdown="startMove(-1)" @pointerup="stopMove" @pointerleave="stopMove"><svg-icon name="arrow-left"></svg-icon></button>  
            <button><svg-icon name="arrow-down"></svg-icon></button>      
            <button @pointerdown="startMove(1)" @pointerup="stopMove" @pointerleave="stopMove"><svg-icon name="arrow-right"></svg-icon></button>
          </div>
        </div>
      </div>
      <div class="button-item log">
        速度：{{ Math.abs(moveV.toFixed(2)) }}
      </div>
    </div>
  </div>
</template>

<script>
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
      srcPath:'@/assets/game-img/test/',
      startX:null,
      startY:null,
      jumpTime:null,
      moveTime:null,
      moveV:0,
      moveDir:0
    }
  },
  created(){
    this.objectMap = new Map()
    this.srcMap = new Map()
  },
  mounted(){
    this.init()
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  },
  unmounted(){
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods:{
    test(){
      this.pushObject('user','drawing.svg',{x:50,y:320})
      console.log(this.objectMap)
      console.log(this.srcMap)
    },
    
    handleKeyDown(event){
      console.log(`down:${event.key}`)
      switch(event.key){
        case ' ': 
          this.startJump();
          break;
        case 'ArrowRight': 
          if(this.moveDir != 1)
            this.startMove(1) ;
          break;
        case 'ArrowLeft':
          if(this.moveDir != -1) 
            this.startMove(-1) ;
          break;
      }
    },
    handleKeyUp(event){
      console.log(`up:${event.key}`)
      switch(event.key){
        case 'ArrowRight': 
          this.stopMove() ;
          break;
        case 'ArrowLeft': 
          this.stopMove() ;
          break;
      }
    },
    init(){
      this.maincanvas = this.$refs.mainCanvas;
      this.ctx = this.maincanvas.getContext('2d');
      this.ctx.lineWidth = 1
    },
    startMove(dir){
      this.moveTime = new Date().getTime()
      this.moveDir = dir
      console.log(this.moveTime, this.moveDir)
    },
    stopMove(){
      this.moveDir = 0
      console.log(this.moveTime, this.moveDir)
    },

    move(){
      const starta = this.jumpTime ? 0 : 0.05
      const fa = this.jumpTime ? 0.001 : 0.01
      const maxV = 5
      if(this.moveTime){
        const t = ((new Date().getTime()-this.moveTime))/100
        if(this.moveDir > 0){
          this.moveV = this.moveV + this.moveDir*(starta - fa)*t
          this.moveV = Math.min(this.moveV,maxV)
          let userObject = this.objectMap.get("user")
          userObject.position.x += this.moveV
          this.objectMap.set('user', userObject)
        }else if(this.moveDir < 0){
          this.moveV = this.moveV + this.moveDir*(starta - fa)*t
          this.moveV = Math.max(this.moveV,-maxV)
          let userObject = this.objectMap.get("user")
          userObject.position.x += this.moveV
          
          this.objectMap.set('user', userObject)
        }else{
          if(this.moveV > 0){
            this.moveV -= fa*t
            if(this.moveV < 0){
              this.moveTime = null
              this.moveV = 0
            }else{
              let userObject = this.objectMap.get("user")
              userObject.position.x += this.moveV
              this.objectMap.set('user', userObject)
            }
          }else{
            this.moveV += fa*t
            if(this.moveV > 0){
              this.moveTime = null
              this.moveV = 0
            }else{
              let userObject = this.objectMap.get("user")
              userObject.position.x += this.moveV
              this.objectMap.set('user', userObject)
            }
          }
        }
        

      }
      
      
    },
    startJump(){
      if(!this.jumpTime){
        this.startY = this.objectMap.get("user").position.y
        this.jumpTime = new Date().getTime()
      }
    },

    jump(){
      const v = -100 //跳跃初速度
      const a = 10 //重力加速度
      let userObject = this.objectMap.get("user")
      const y1 = this.startY
      const t = ((new Date().getTime()-this.jumpTime))/100
      const y = y1 + v*t + a * t * t
      if(y > y1){
        userObject.position.y = y1
        this.objectMap.set('user', userObject)
        this.jumpTime = null
      }else{
        userObject.position.y = y
        this.objectMap.set('user', userObject)
      }
    },

    pushObject(id,url,position){
      if(this.srcMap.has(url)){
        this.objectMap.set(id,{url,position})
      }else{
        this.getImage(url).then((rs)=>{
          // console.log(rs)
          this.objectMap.set(id,{url,position})
        }).catch((err)=>{
          // console.log(err)
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
    stopAnimate(){
      cancelAnimationFrame(this.animateId)
      this.animateId = 0
    },
    updateMainCanvasAnimate(){
      this.ctx.clearRect(0,0,720,480)
      if(this.jumpTime){
        this.jump()
      }
      this.move()
      this.objectMap.forEach((value, key) => {
        this.ctx.drawImage(this.srcMap.get(value.url),value.position.x,value.position.y,160,160)
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
    },

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
    width: 720px;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
  }

  .button-item{
    margin: 10px;
    display: flex;
    align-items: center;
  }
  .button-item.log{
    width: 100%;
  }
  .button-item button{
    margin-right:10px;
  }

  .dir-contorl button{
    padding: 5px;
  }
</style>

