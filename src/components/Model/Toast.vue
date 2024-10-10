<template>
  <transition name="toast-slide">
    <div v-if="visible" ref="toastRef" class="toast">
      <div :class="[type,'dot']"></div>
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    type: String, //error,warn,success,info
    message: String,
  },
  mounted(){
    var that = this
    that.visible = true
    setTimeout(() => {
      that.visible = false
    }, 3000);
  },
  data(){
    return{
      visible:false
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 7px 15px;
  font-size: 16px;
  line-height: 20px;
  /* height: 20px; */
  border-radius: 15px;
  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 999;
  border: var(--box-border);
  color: var(--fontNormal);
  background-color: var(--content-bgc);
}

.toast > .dot{
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 7px;
}

.toast > .error{
  background-color: red;
}

.toast > .warn{
  background-color: orange;
}

.toast > .info{
  background-color: lightskyblue;
}

.toast > .success{
  background-color: mediumseagreen;
}


.toast-slide-enter-active, .toast-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.toast-slide-enter-from, .toast-slide-leave-to /* .toast-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(-50%) translateY(-1em);
}
.toast-slide-enter-to, .toast-slide-leave-from /* .toast-slide-enter-active in <2.1.8 */ {
  opacity: 1;
}


</style>