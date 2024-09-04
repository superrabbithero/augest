<template>
  <div class="au-layout" style="margin:0 -0.5rem" >
    <div class="rows">
      <div v-for="colorPalette in colorPaletteList" class="cols xs12 sm6 md4">
        <div class="tool-card-box">
          <div class="tool-card">
            <div class="tool-content">
              <div v-for="color in colorPalette.colors" class="color-item" :style="{backgroundColor:`#${color}`}">
                {{`#${color}`}}
              </div>
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
      colorPaletteList:[
          {
            name:'黑白灰',
            colors:['b1b2b9','272e36','f0e9e6','9095a1','5b5d62','191f25'],
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
    border: var(--box-border);
    background: var(--box-bgc);
    border-radius: 8px;
    font-size: 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .color-item {
    height: 3rem;
    transform: translateY(-50%);
  }


</style>