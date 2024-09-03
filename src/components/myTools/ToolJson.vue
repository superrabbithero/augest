<template>
  <div class="au-resize">
    <div class="left" ref="left">
      <div class="au-layout" style="margin: 1rem 0 0 1rem;height: 100%;">
        <div class="rows">
          <div class="cols s12">
            <textarea class="resize" style="width:100%;" rows="20" v-model="JsonStr"></textarea> 
          </div>
        </div>
        <div class="rows gutter-l end">
          <div class="cols">
            <button @click="StringToJson">仅解析为Json对象</button>
          </div>
          <div class="cols">
            <button @click="formattedJsonStr" class="fill">美化并解析</button>
          </div>
        </div>
      </div>
      <div class="resize-bar" @pointerdown="resizePointDownHandler">
      </div>
    </div>
    <div class="right">
      <div class="au-layout" style="margin: 1rem 0 0 0;">
        <div class="rows">
          <div class="cols s12">
            <json-model :jsonData="jsonData" width="100%"></json-model>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import JsonModel from '../Model/JsonModel.vue'

export default {
  name: "Home",
  components:{
    JsonModel
  },
  data(){
    return {
      JsonStr:null,
      jsonData:{},
      startPoint:{x:0,y:0},
      startLeftWidth:0
    }
  },
  mounted(){
  },
  unmounted(){
    document.removeEventListener("pointermove",this.resizePointMoveHandler)
    document.removeEventListener("pointerup",this.resizePointUpHandler)
  },
  methods:{
    StringToJson(){
      try{
        this.jsonData = JSON.parse(this.JsonStr)
      }catch(error){
        this.jsonData = {"code":"error","msg":error}
      }
    },
    formattedJsonStr(){
      try{
        this.jsonData = JSON.parse(this.JsonStr)
        this.JsonStr = JSON.stringify(this.jsonData, null, 4);
      }catch(error){
        this.jsonData = {"code":"error","msg":error}
      }
    },
    resizePointDownHandler(event){
      this.startPoint = {x:event.pageX,y:event.pageY}
      this.startLeftWidth = this.$refs.left.clientWidth
      console.log(this.startLeftWidth,this.$refs.left.parentElement.clientWidth)
      document.body.style.cursor = 'col-resize';
      document.addEventListener("pointermove",this.resizePointMoveHandler)
      document.addEventListener("pointerup",this.resizePointUpHandler)
    },
    resizePointMoveHandler(event){
      const point = {x:event.pageX,y:event.pageY}
      const deltaX = point.x - this.startPoint.x
      const leftWidth = this.startLeftWidth + deltaX
      this.$refs.left.style.width = `${leftWidth}px`
    },
    resizePointUpHandler(){
      document.body.style.cursor = 'default';
      document.removeEventListener("pointermove",this.resizePointMoveHandler)
      document.removeEventListener("pointerup",this.resizePointUpHandler)
    }
  }
}

</script>

<style scoped>
  .au-resize {
    touch-action: none;
    margin:0;
    height: 100%;
/*    white-space: nowrap;*/
    display: flex;
  }
  .au-resize >*{
    white-space: wrap;
  }
  .au-resize .resize-bar{
    position: absolute;
    right: -5px;
    top: 0;
    bottom: 0;
    width: 10px;
    cursor: col-resize;
  }
  .au-resize .left,.au-resize .right{
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .au-resize .left {
    min-width: 20%;
    max-width: 80%;
    width: 50%; /* 初始宽度 */
    border-right: var(--box-border);
    flex: 0 0 auto; /* 左侧宽度固定 */
  }

  .au-resize .right {
    flex: 1; /* 右侧占据剩余宽度 */
  }
</style>