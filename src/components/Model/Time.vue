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
      timer:"00:00:00"
    }
  },
  unmounted(){
    clearInterval(this.timerInterval);
  },
  methods: {
    startTimer(){
      if(!this.timerInterval){
        console.log("start")
        this.startTime = Date.now() - this.elapsedTime;
        this.timerInterval = setInterval(this.updateTimer, 1000);
      }
    },
    resetTimer(){
      clearInterval(this.timerInterval);
      this.timerInterval = null
      this.elapsedTime = 0;
      this.$parent.timer = "00:00:00"
      this.timer = "00:00:00";
    },
    pause(){
      clearInterval(this.timerInterval);
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