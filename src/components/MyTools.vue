<template>
  <div class="au-layout" style="margin:0 -0.5rem" >
    <div class="rows">
      <div v-for="toolPage in toolPages" class="cols s4">
        <div class="tool-card-box">
          <div class="tool-card">
            <div class="tool-content" @click="goto(toolPage.path)">
              {{toolPage.name}}
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
            path:'/myTools/Json'
          },
          {
            name:'格式化Json',
            path:'/myTools/Json'
          },
          {
            name:'格式化Json',
            path:'/myTools/Json'
          },
          {
            name:'格式化Json',
            path:'/myTools/Json'
          }
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
    border: var(--box-border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tool-content:hover{
    outline: 1px solid #425aef;
  }

</style>