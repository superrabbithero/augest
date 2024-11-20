<template>
  <div class="au-layout">
      <div class="clock-container rows center">
        {{ timer }}
        <div class="clock-card">
          <div class="clock-item">
            <div class="timer-rect">
              <div class="timer">00</div>
            </div>
            <div class="name">HOURS</div>
          </div>
        </div>
        <div class="clock-card">
          <div class="clock-item">
            <div class="timer-rect">
              <div class="timer">00</div>
            </div>
            <div class="name">MINUTES</div>
          </div>
        </div>
        <div class="clock-card">
          <div class="clock-item">
            <div class="timer-rect">
              <div class="timer">00</div>
            </div>
            <div class="name">SECONDS</div>
          </div>
        </div>
      </div>
      <div class="clock-button" @click="starttimer">开始</div>
      <div class="clock-button" @click="pause">暂停</div>
      <div class="clock-button" @click="resettimer">重置</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  
  setup() {
    let status = 0
    let startTime = 0
    let elapsedTime = 0
    let timerInterval = 0
    const timer = ref("00:00:00")

    onMounted(() => {
      
    });

    const starttimer = ()=>{
      if(status != 1){
        clearInterval(timerInterval);
        console.log("start")
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updatetimer(), 1000);
        status = 1
      }
    }

    const resettimer = ()=>{
      if(status != 0){
        clearInterval(timerInterval);
        timerInterval = null
        elapsedTime = 0;
        timer.value = "00:00:00";
        status = 0
      }
    }

    const pause = () => {
      if(status == 1){
        clearInterval(timerInterval);
        status = 2
      }
    }

    const updatetimer = () => {
      console.log("updatetimer")
      elapsedTime = Date.now() - startTime;
      const time = new Date(elapsedTime);
      const hours = String(time.getUTCHours()).padStart(2, '0');
      const minutes = String(time.getUTCMinutes()).padStart(2, '0');
      const seconds = String(time.getUTCSeconds()).padStart(2, '0');
      timer.value = `${hours}:${minutes}:${seconds}`;
    }
    

    return {
      starttimer,
      resettimer,
      pause,
      updatetimer,
      timer
    }
  }
};
</script>

<style scoped>
  .clock-container.fullscreen {
    height: calc(100vh - 160px);
  }

  .clock-card {
    flex-shrink: 0;
    position: relative;
    width: 23vw;
    padding-top: 30vw;
    user-select: none;
/*    border: var(--box-border);*/
  }
  .clock-item,.timer-rect .timer{
    position: absolute;
    left: 0;right: 0;top: 0;bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .timer-rect {
    position: relative;
    width: 80%;
    padding-top: 80%;
/*    border: var(--box-border);*/
/*    margin-bottom: 20%;*/
  }
  .timer-rect .timer{
    font-size: 15vw;
  }
  .clock-item .name{
    font-size: 3vw;
  }

  @media (min-width: 768px) {}
</style>