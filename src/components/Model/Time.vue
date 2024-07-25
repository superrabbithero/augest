<template>
  <div>{{timer}}</div>
</template>

<script>
export default {
  data(){
    return{
      startTime:0,
      elapsedTime:0,
      timerInterval:null,
      timer:"00:00:00",
      status:0
    }
  },
  unmounted(){
    clearInterval(this.timerInterval);
  },
  methods: {
    startTimer(){
      if(this.status != 1){
        clearInterval(this.timerInterval);
        console.log("start")
        this.startTime = Date.now() - this.elapsedTime;
        this.timerInterval = setInterval(this.updateTimer, 1000);
        this.status = 1
      }
        
    },
    resetTimer(){
      if(this.status != 0){
        clearInterval(this.timerInterval);
        this.timerInterval = null
        this.elapsedTime = 0;
        this.$parent.timer = "00:00:00"
        this.timer = "00:00:00";
        this.status = 0
      }
    },
    pause(){
      if(this.status == 1){
        clearInterval(this.timerInterval);
        this.status = 2
      }
    },
    updateTimer() {
      this.elapsedTime = Date.now() - this.startTime;
      const time = new Date(this.elapsedTime);
      const hours = String(time.getUTCHours()).padStart(2, '0');
      const minutes = String(time.getUTCMinutes()).padStart(2, '0');
      const seconds = String(time.getUTCSeconds()).padStart(2, '0');
      this.timer = `${hours}:${minutes}:${seconds}`;
      this.$parent.timer = this.timer
    }
  }
};
</script>

<style scoped>
  div{
    display: inline-block;
  }
</style>