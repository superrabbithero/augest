<template>
  <div class="au-layout">
    <!-- <div class="rows center"> -->
      <div class="clock-container rows center">
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
    <!-- </div> -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  
  setup() {
    

    onMounted(() => {
      
    });


    

    

    return {
    };
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