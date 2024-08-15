<template>
    <h4 @click="openContent()">{{name}}
      <svg-icon class="component-botton" name="arrow-right" size="16"></svg-icon>
    </h4>
    <div :class="{'component-content':true,'close':!show }" ref="content">
      <div style="padding: 0 5px 8px 5px;">
        <slot></slot>
      </div>
    </div> 
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    defaultShow: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      show: false,
      height:0
    }
  },
  mounted(){
    this.show = this.defaultShow
    if(!this.show)
      this.$refs.content.style.height = "0px"
  },

  methods:{
    openContent(){
      this.show = !this.show
      const contentEl = this.$refs.content
      if(this.show){
        this.height = this.$refs.content.firstChild.clientHeight+8
        const value = this.height + "px" 
        contentEl.style.height = value
        setTimeout(()=>{
          contentEl.style.overflow = 'unset'
        },300)
      }else{
        contentEl.style.height = "0px"
        contentEl.style.overflow = 'hidden'
      }
    }
  
  }

}
</script>

<style scoped>
  .component-content {
    width: 100%;
    border-bottom: var(--box-border);
    overflow: hidden;
    transition: height 0.3s ease;
  }
  .component-content.close {
/*    transition-delay: 1s;*/
/*    overflow: hidden;*/
  }

  h4 {
    flex: 0 0 auto;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .component-botton{
    margin-left: 5px;
    transition: transform 0.1s ease;
  }

  .open {
    transform: rotate(90deg);
  }
</style>


