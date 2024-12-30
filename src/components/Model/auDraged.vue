<template>
  <div :class="{'au-draged':true,'dragging':dragedel,'row':style == 1||style == 3}" ref="modal">     
    <div :class="{'draged-bar':true,'draged':dragable}" @pointerdown="dragdown($event)"  @pointerup="dragup">
      <div class="draged-bar-handle"></div>
    </div>
    <div class="modal-slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default({
  props:{
    modalKey: {
      type: String,
      required: true
    },
    dragable: {
      type: Boolean,
      required: false,
      default: true
    },
    modeless: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data(){
    return{
      draged: false,
      dragedel: null,
      disx: 0,
      disy: 0,
      left: 0,
      top:0,
      style:0 //1、2、3、4代表上右下左
    }
  },

  methods:{
    dragdown(e) {
      if(this.dragable){
        this.dragedel = this.$refs.modal
        
        this.disx = e.pageX - this.dragedel.offsetLeft
        this.disy = e.pageY - this.dragedel.offsetTop
        document.addEventListener('pointermove', this.dragmove)

      }
    },
    dragup() {
      if(this.top < 50){
        this.dragedel.style.top = '0px';
        this.style = 1
      }

      if(this.left < 50){
        this.dragedel.style.left = '0px';
        this.style = 4
      }

      const maxLeft = this.dragedel.parentElement.clientWidth - this.dragedel.clientWidth
      const maxTop = this.dragedel.parentElement.clientHeight - this.dragedel.clientHeight

      if(this.top > maxTop - 50){
        this.dragedel.style.top = 'unset';
        this.dragedel.style.bottom = '0';
        this.style = 3
      }

      if(this.left > maxLeft - 50){
        this.dragedel.style.left = 'unset';
        this.dragedel.style.right = '0';
        this.style = 2
      }

      this.dragedel = null
      document.removeEventListener('pointermove',this.dragmove)
    },
    dragmove(e) {
      // var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
      if(this.dragedel){
        this.dragedel.style.bottom = 'unset';
        this.dragedel.style.right = 'unset'
        this.left = e.pageX - this.disx
        this.top = e.pageY - this.disy
        this.dragedel.style.left = this.left + 'px';
        this.dragedel.style.top = this.top + 'px';
      }      
    }
  }
})


</script>

<style scoped>

.modal-slot{
  overflow: hidden;
}


.draged-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.2rem;
}

.draged-bar.draged:active {
    background-color: var(--modal-bgc-bar);
}

.au-draged {
  background: var(--modal-bgc);
  position: absolute;
  box-shadow: 0px 0px 0px 0 #0002;
  transition: box-shadow 0.1s ease-in-out;
  border-radius: 0.5rem;
  overflow: hidden;
  touch-action: none;
  z-index:10;
  display: flex;
  flex-direction: column;
}

.au-draged.row{
  flex-direction: row-reverse
}

.au-draged.row .draged-bar {
  width: 1.2rem;
  height: auto;
}



.au-draged.dragging {
  box-shadow: 2px 2px 5px 2px #0002;
}

.draged-bar-handle {
  height: 4px;
  border-radius: 2px;
  background-color: #0004;
  width: 60%;
}

.au-draged.row .draged-bar .draged-bar-handle{
  height: 60%;
  width: 4px;
}




</style>