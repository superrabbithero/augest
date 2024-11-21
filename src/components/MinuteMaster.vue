<template>
  <div class="au-layout center">
      <div class="clock-container rows center">
        <div class="clock-card">
          <div class="clock-item">
            <div class="timer-rect">
              <div class="timer">{{hours}}</div>
            </div>
            <div class="name">HOURS</div>
          </div>
        </div>
        <div class="clock-card">
          <div class="clock-item">
            <div class="timer-rect">
              <div class="timer">{{minutes}}</div>
            </div>
            <div class="name">MINUTES</div>
          </div>
        </div>
        <div class="clock-card">
          <div class="clock-item">
            <div class="timer-rect">
              <div class="timer">{{seconds}}</div>
            </div>
            <div class="name">SECONDS</div>
          </div>
        </div>
      </div>
      <div class="clock-button" @click="starttimer">开始</div>
      <div class="clock-button" @click="pause">暂停</div>
      <div class="clock-button" @click="resettimer">重置</div>
      <div class="clock-button" @click="recordTime">记录时间</div>
      <div class="intervals">
        <div v-for="(interval, index) in intervals" :key="index">
          记录 {{ index + 1 }}: {{ interval }}
        </div>
        <div v-for="(item, index) in records" :key="index">
          记录 {{ index + 1 }}: {{ item }}
        </div>
      </div>
  </div>
</template>

<script>
import { ref, onMounted ,onBeforeUnmount} from 'vue';

export default {
  
  setup() {
    let status = 0
    let startTime = 0
    let elapsedTime = 0
    let timerInterval = null
    const hours = ref("00")
    const minutes = ref("00")
    const seconds = ref("00")

    const recordedTimes = ref([]); // 记录的时间点
    const intervals = ref([]);    // 时间段记录
    const records = ref([])


    onMounted(() => {
      
    });

    onBeforeUnmount(() => {
      clearInterval(timerInterval)
    })

    const starttimer = ()=>{
      if(status != 1){
        clearInterval(timerInterval);
        console.log("start")
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updatetimer, 1000);
        console.log('status=1')
        status = 1
      }
    }

    const resettimer = ()=>{
      if(status != 0){
        clearInterval(timerInterval);
        timerInterval = null
        elapsedTime = 0;
        hours.value = "00"
        minutes.value = "00"
        seconds.value = "00"
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
      hours.value = String(time.getUTCHours()).padStart(2, '0');
      minutes.value = String(time.getUTCMinutes()).padStart(2, '0');
      seconds.value = String(time.getUTCSeconds()).padStart(2, '0');
      
    }

    const recordTime = () => {
      records.value.push(`${hours.value}:${minutes.value}:${seconds.value}`)
      const currentTime = Date.now(); // 当前时间
      if (recordedTimes.value.length === 0) {
        // 第一次记录，与开始时间比较
        const initialInterval = currentTime - startTime;
        intervals.value.push(formatTime(initialInterval));
      } else {
        // 计算与上一次记录的时间段
        const lastRecordedTime = recordedTimes.value[recordedTimes.value.length - 1];
        const interval = currentTime - lastRecordedTime;
        intervals.value.push(formatTime(interval));
      }
      // 添加当前时间到记录数组中
      recordedTimes.value.push(currentTime);
    };

    // 格式化时间段为 xx:xx:xx
    const formatTime = (milliseconds) => {
      const time = new Date(milliseconds);
      const hours = String(time.getUTCHours()).padStart(2, '0');
      const minutes = String(time.getUTCMinutes()).padStart(2, '0');
      const seconds = String(time.getUTCSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    

    return {
      starttimer,
      resettimer,
      pause,
      updatetimer,
      hours,
      minutes,
      seconds,
      recordTime,
      records,
      intervals
    }
  }
};
</script>

<style scoped>
  .clock-container {
    padding: 0;
/*    border: var(--box-border);*/
    box-shadow: inset 2px 2px 10px 0px #a2a2a2, inset -4px -4px 4px 0 #fff;
    border-radius: 4vw;
    margin-top: 1rem;
    margin-bottom: calc(6vw + 1rem);
    background-color: var(--box-darker);
  }

  .clock-container.fullscreen {
    height: calc(100vh - 160px);
  }

  .clock-card {
    flex-shrink: 0;
    position: relative;
    width: 23vw;
    padding-top: 23vw;
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
    text-align: center;

    font-variant-numeric: tabular-nums;
    font-family: fantasy;

    background-color: var(--content-bgc);
    border-radius: 2vw;
    font-size: 15vw;

    font-variant-numeric: tabular-nums;
    transition: all 0.2s ease-in-out; /* 添加过渡效果 */

    box-shadow: inset 2px 2px 2px 0px #fff, 2px 2px 4px 2px #a2a2a2;
  }
  .clock-item .name{
    position: absolute;
    font-size: 3vw;

    transform: translateY(16vw);
  }

  .au-layout.center {
    align-items: center;
  }

  @media (min-width: 768px) {}
</style>