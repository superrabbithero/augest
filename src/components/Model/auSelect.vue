<template>
  <div class="select-box" ref="selectBox">
    <div :class="{'input-area':true,'active':selectShow}" @click="openSelect">
      {{dataList[currIndex]}}
      <svg-icon name="arrow-down" size="16" :class="{'icon':true,'show':selectShow}" ></svg-icon>
    </div>
    <div :class="{'select-item-group':true,'show':selectShow}" ref="options">
      <div :class="{'options':true,'show':selectShow}">
        <div :class="{'select-item':true,'active':index == currIndex}" v-for="(item,index) in dataList" @click="changeIndex(index)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList:{
      type: Array,
      required: true
    },
  },
  data(){
    return{
      selectShow:false,
      currIndex:0
    }
  },
  mounted(){

  },
  unmounted(){
    document.removeEventListener('click',this.closeSelect)
  },
  methods: {
    openSelect(){
      if(!this.selectShow){
        this.selectShow = true
        document.addEventListener('click',this.closeSelect)
      }else{
        this.selectShow = false
        document.removeEventListener('click',this.closeSelect)
      }
    },
    closeSelect(){
      if(!this.$refs.selectBox.contains(event.target)){
        this.selectShow = false
        document.removeEventListener('click',this.closeSelect)
      }
    },
    changeIndex(index){
      this.currIndex = index
      this.selectShow = false
      document.removeEventListener('click',this.closeSelect)
      this.$emit('change', this.currIndex);
    }
  }  
};
</script>

<style scoped>
  .select-box {
    width: 100%;
    position: relative;
  }
  .input-area {
    border: var(--box-border);
    padding: 0 5px;
    font-size: 15px;
    border-radius: 5px;
    height: 28px;
    line-height: 28px;
  }
  .input-area.active{
    outline: 2px solid var(--main-color);
  }

  .icon {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%) ;
    transition: transform 0.3s ease;
  }

  .icon.show{
    transform: translateY(-50%) rotate(180deg);
  }
  .select-item-group{
    padding: 4px 0;
    top: 36px;
    position: absolute;
    z-index: 999;
    width: 100%;
    background-color: var(--box-bgc);
    font-size: 15px;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
  }

  .select-item-group.show{
    pointer-events: auto;
    box-shadow: var(--box-shadow);
    opacity: 1;
  }
  .options {
    overflow: auto;
    max-height: 0px;
    transition: max-height 0.1s ease;
  }
  .options.show {
    max-height: 140px;
  }

  .select-item{
    padding: 4px 5px;
  }

  .select-item.active{
    color: var(--main-color);
  }

  @media(any-hover:hover){
    .select-item:hover{
      background-color: var(--white-highlight);
    }
    .input-area:hover{
      outline: 2px solid var(--main-color);
    }
  }
</style>