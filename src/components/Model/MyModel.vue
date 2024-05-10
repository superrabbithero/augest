<template>
  <transition name="modal-slide">
    <div class="modal" ref="modal" style="width:400px;min-height: 300px;" v-show="show">     
      <div class="modal-bar" @mousedown="dragdown($event)"  @mouseup="dragup">
        <div class="modal-close" @click="close()">
        </div>
      </div>
      <slot></slot>
    </div>
</transition>
</template>

<script>
export default({
  props:{
    show: {
      type: Boolean,
      required: true
    },
    modalKey: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      draged: false,
      dragedel: null,
      disx: 0,
      disy: 0,
    }
  },

  methods:{
    dragdown(e) {
      this.dragedel = this.$refs.modal
      document.addEventListener('mousemove', this.dragmove)
      this.disx = e.pageX - this.dragedel.offsetLeft
      this.disy = e.pageY - this.dragedel.offsetTop
    },
    dragup() {
      this.dragedel = null
      document.removeEventListener('mousemove',this.dragmove)
    },
    dragmove(e) {
      // var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
      if(this.dragedel){
        this.dragedel.style.left = e.pageX - this.disx + 'px';
        this.dragedel.style.top = e.pageY - this.disy + 'px';
      }      
    },
    close() {
      console.log(this.modalKey)
      this.$parent.modal_show[this.modalKey] = false
    }
  }
})


</script>

<style>
.modal-slide-enter-active, .modal-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.modal-slide-enter-from, .modal-slide-leave-to /* .modal-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translate(-50%,-50%) translateY(1em);
/*  transform: translateY(1em);*/
}
.modal-slide-enter-to, .modal-slide-leave-from /* .modal-slide-enter-active in <2.1.8 */ {
  opacity: 1;
/*  transform: translate(-50%,-50%);*/
/*  transform: translateY(0);*/
}
</style>