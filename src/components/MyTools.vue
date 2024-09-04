<template>
  <div class="au-layout" style="margin:0 -0.5rem" >
    <div class="rows">
      <div v-for="toolPage in toolPages" class="cols xs12 sm6 md4">
        <div class="tool-card-box">
          <div class="tool-card">
            <div class="tool-content font-SmileySans" @click="goto(toolPage.path)" >
              <img class="tool-content-background" :src="toolPage.imgUrl"/>
              <div class="card-text">{{toolPage.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      toolPages:[
          {
            name:'格式化Json',
            path:'/myTools/Json',
            imgUrl:require('@/assets/imgs/background-imgs/jsonToolBcg.jpg')
          },
          {
            name:'像素艺术编辑器',
            path:'/pixelSvgEditor',
            imgUrl:require('@/assets/imgs/background-imgs/pixelEditBcg.jpg')
          },
          {
            name:'四象限计划表',
            path:'/FQTManagement',
            imgUrl:require('@/assets/imgs/background-imgs/fqtmanagementBcg.jpg')
          },
          {
            name:'答题卡生成',
            path:'/tools/bulidanswersheet',
            imgUrl:require('@/assets/imgs/background-imgs/bulidanswersheetBcg.jpg')
          },
        ]
    }
  },
  unmounted(){
  },
  methods: {
    goto(path){
      this.$router.push(path)
    },
  }
};
</script>

<style scoped>
  .tool-card-box{
    width: 100%;
    padding-top: 75%;
    position: relative;
  }

  .tool-card{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0.5rem;
    
  }

  .tool-content{
    height: 100%;
/*    border: var(--box-border);*/
    background: var(--box-bgc);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: 0.3s;
  }

  

  @media(any-hover){
    .tool-content:hover {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }
    .tool-content:hover img.tool-content-background{
      transform: scale(1.05);
    }
    .tool-content:hover .card-text{
      transform: scale(1.2);
      backdrop-filter: blur(6px);
    }
  }

  img.tool-content-background{
    position: absolute;
    transition: 0.3s;
    z-index: 0;
  }

  .card-text {
    cursor: pointer;
    z-index: 1;
    padding: 0.8rem 2rem;
    border: 4px double #fff;
    border-radius: 5px;
    color: #fff;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    transition: 0.3s;
  }

</style>