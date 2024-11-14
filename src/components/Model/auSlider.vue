<template>
  
  <div class="au-slider-container" @pointerdown="handleThumbStart">
    <!-- <div class="log">{{log}}</div> -->
    <div class="au-slider-track">
      <div class="au-slider-runnable-track" ref="process"></div>
    </div>
    <div class="au-slider-thumb" ref="thumb"></div>
  </div>
</template>

<script >
export default {
  props: {
    value:{
      type: Number,
      required: true
    },
    min:{
      type: Number,
      default: 0
    },
    max:{
      type: Number,
      default: 100
    },
    step:{
      type: Number,
      default: 1
    },
    vertical:{
      type: Boolean,
      default: false
    }

  },
  data(){
    return{
      disx:0,
      disy:0,
      thumb:null,
      process:null,
      log:''
    }
  },
  mounted(){

  },
  unmounted(){
    document.removeEventListener('pointermove', this.handleThumbMove)
    document.removeEventListener('pointerup', this.handleThumbUp)
  },
  methods: {
    handleThumbStart(e){
      if(!this.thumb){
        this.thumb = this.$refs.thumb
        this.process = this.$refs.process
        this.disx = e.pageX - this.thumb.offsetLeft
        this.disy = e.pageY - this.thumb.offsetTop
        document.addEventListener('pointermove', this.handleThumbMove)
        document.addEventListener('pointerup', this.handleThumbUp)
      }
    },
    handleThumbMove(e){
      if(this.thumb){
        if(this.vertical){
          const top = Math.min(Math.max(e.pageY - this.disy,0),this.thumb.parentElement.clientHeight - 20 )
          this.process.style.height = top + 'px'
          this.thumb.style.top = top + 'px';
        }else{
          const left = Math.min(Math.max(e.pageX - this.disx,0),this.thumb.parentElement.clientWidth - 20 )
          this.process.style.width = left + 'px'
          this.thumb.style.left = left + 'px';
        }
        this.log =   `${this.thumb.style.left},${this.thumb.parentElement.clientWidth}` 
      } 
    },
    handleThumbUp(){
      this.thumb = null
      document.removeEventListener('pointermove', this.handleThumbMove)
      document.removeEventListener('pointerup', this.handleThumbUp)
    }
  }  
};


</script>
<style scoped>
.log{
  position: absolute;
  width: 50px;
  left: -50px;
}
/*容器*/
.au-slider-container{
  position: relative;
  background-color: transparent;
  width: 150px;
  height: 30px;
}

/*轨道*/
.au-slider-track{
  position: absolute;
  height: 6px;
  border-radius: 3px;
  width: calc(100% - 20px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--card-hightlight);
  overflow: hidden;
}
.au-slider-runnable-track {
  position: absolute;
  height: 100%;
  background-color: #ffc848;
  width: 0;
  left: 0;
}
/*滑块*/
.au-slider-thumb{
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 50%;
  border-radius: 50%;
  transform: translateY(-50%);
  background-color: #ffc848;
  touch-action: none;

}
</style>
