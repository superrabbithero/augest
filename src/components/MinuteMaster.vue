<template>
  <div class="au-layout center">
      <div class="clock-container rows center">
        <div class="clock-card">
          <div class="clock-item">
            <div class="timer-rect">
              <div class="timer">
                <div class="paper-turning-container">
                  <div :class="{'paper-turning-bac':true,'turning':turning[0]}">
                    <div class="paper down">{{hours_pre}}</div>
                    <div class="paper up">{{hours}}</div>
                  </div>
                </div>
                <div class="paper-turning-container">
                  <div :class="{'paper-turning':true,'turning':turning[0]}">
                    <div class="paper up">{{hours_pre}}</div>
                    <div class="paper down">{{hours}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="name">HOURS</div>
          </div>
        </div>
        <div class="clock-card">
          <div class="clock-item">
            <div class="timer-rect">
              <div class="timer">
                <div class="paper-turning-container">
                  <div :class="{'paper-turning-bac':true,'turning':turning[1]}">
                    <div class="paper down">{{minutes_pre}}</div>
                    <div class="paper up">{{minutes}}</div>
                  </div>
                </div>
                <div class="paper-turning-container">
                  <div :class="{'paper-turning':true,'turning':turning[1]}">
                    <div class="paper up">{{minutes_pre}}</div>
                    <div class="paper down">{{minutes}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="name">MINUTES</div>
          </div>
        </div>
        <div class="clock-card">
          <div class="clock-item">
            <div class="timer-rect">
              <div class="timer">
                <div class="paper-turning-container">
                  <div :class="{'paper-turning-bac':true,'turning':turning[2]}">
                    <div class="paper down">{{seconds_pre}}</div>
                    <div class="paper up">{{seconds}}</div>
                  </div>
                </div>
                <div class="paper-turning-container">
                  <div :class="{'paper-turning':true,'turning':turning[2]}">
                    <div class="paper up">{{seconds_pre}}</div>
                    <div class="paper down">{{seconds}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="name">SECONDS</div>
          </div>
        </div>
      </div>

      <div class="rows left">
        <div class="cols">
          <div  :class="{'clock-button':true,'active':status!=0,'turning':status==1}" @click="starttimer">
            <IconWrapper v-if="status!=1" iconName="PlayOne" theme="filled" size="40"/>
            <IconWrapper v-else iconName="Pause" theme="outline" size="30" strokeWidth="6"/>
          </div>
        </div>
        <div class="cols">
          <div :class="{'clock-button':true,'none':status==0}" @click="resettimer">
            <IconWrapper iconName="SquareSmall" theme="filled" size="36"/>
          </div>
        </div>
        <div class="cols">
          <div :class="{'clock-button record-btn':true,'none':status!=1}" @click="recordTime">
            记录时间
          </div>
        </div>
        <div class="cols">
          <div class="clock-button">
            <IconWrapper iconName="SettingThree" theme="outline" strokeWidth="6" size="25"/>
          </div>
        </div>
      </div>

      
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
import IconWrapper from './IconWrapper.vue';

export default {
  components:{
    IconWrapper
  },
  
  setup() {
    const status = ref(0)
    let startTime = 0
    let elapsedTime = 0
    let timerInterval = null
    const hours = ref("00")
    const minutes = ref("00")
    const seconds = ref("00")

    const hours_pre = ref("00")
    const minutes_pre = ref("00")
    const seconds_pre = ref("00")

    const recordedTimes = ref([]); // 记录的时间点
    const intervals = ref([]);    // 时间段记录
    const records = ref([])
    const turning = ref([false,false,false])


    onMounted(() => {
      
    });

    onBeforeUnmount(() => {
      clearInterval(timerInterval)
    })

    const starttimer = ()=>{
      if(status.value != 1){
        clearInterval(timerInterval);
        console.log("start")
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updatetimer, 1000);
        console.log('status.value=1')
        status.value = 1
      }else{
        pause()
      }
    }

    const resettimer = ()=>{
      if(status.value != 0){
        clearInterval(timerInterval);
        timerInterval = null
        elapsedTime = 0;
        hours.value = "00"
        minutes.value = "00"
        seconds.value = "00"
        hours_pre.value = "00"
        minutes_pre.value = "00"
        seconds_pre.value = "00"
        status.value = 0
      }
    }

    const pause = () => {
      if(status.value == 1){
        clearInterval(timerInterval);
        status.value = 2
      }
    }

    const updatetimer = () => {
      hours_pre.value = hours.value
      minutes_pre.value = minutes.value
      seconds_pre.value = seconds.value
      console.log("updatetimer")
      elapsedTime = Date.now() - startTime;
      const time = new Date(elapsedTime);
      hours.value = String(time.getUTCHours()).padStart(2, '0');
      minutes.value = String(time.getUTCMinutes()).padStart(2, '0');
      seconds.value = String(time.getUTCSeconds()).padStart(2, '0');
      turning.value = [hours_pre.value != hours.value,
        minutes_pre.value != minutes.value,
        seconds_pre.value != seconds.value]
      setTimeout(() => {
        hours_pre.value = hours.value
        minutes_pre.value = minutes.value
        seconds_pre.value = seconds.value
        turning.value = [false,false,false]
      }, 500); 
      
    }

    const recordTime = () => {
      if(status.value!=1){
        return
      }
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
      intervals,
      turning,
      seconds_pre,
      minutes_pre,
      hours_pre,
      status
    }
  }
};
</script>

<style scoped>
  .clock-container {
    padding: 0;
/*    border: var(--box-border);*/
    box-shadow: var(--clock-shadow);
    border-radius: 4vw;
    margin-top: 1rem;
    margin-bottom: calc(6vw + 1rem);
    background-color: var(--content-bgc);
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
  }
  .timer-rect .timer{
    background-color: var(--content-bgc);
    border-radius: 2vw;
    font-size: 13vw;
    line-height: 18.4vw;
    /* box-shadow: -0.4vw -0.4vw 0.5vw 0 #fafbff,0.4vw 0.4vw 0.5vw 0 #161b1d3b; */
    justify-content: flex-start;
    font-weight: bolder;
  }
  .clock-item .name{
    position: absolute;
    font-size: 2.3vw;
    transform: translateY(16vw);
  }

  .au-layout.center {
    align-items: center;
  }

  .timer .paper{
    width: 18.4vw;
    height: 9vw;
    box-sizing: border-box;
    line-height: 18.4vw;
    display: flex;
    justify-content: center;
    overflow: hidden;
    background-color: var(--content-bgc);
    
  }

  .paper.down{
    align-items: flex-end;

  }

  .paper-turning-container {
    position: absolute;
    width: 18.4vw;
    height: 18.4vw;
    top: 0;
    border-radius: 2vw;
    /* overflow: hidden; */
    perspective: 50vw;
  }



  .paper-turning.turning {
    
    animation: turning  0.5s ease-in-out;
    animation-fill-mode: forwards;

  }

  .paper-turning.turning .paper.up{
    
    animation: turning-paper  0.5s ease-in-out;
    animation-fill-mode: forwards;

  }

  .paper-turning-bac.turning .paper.down {
    animation: turning-paper  0.8s ease-in-out;
    animation-fill-mode: forwards;
  }

/*  改做动画效果*/
  @keyframes turning {
    from {
      transform: rotateX(0);
    }

    to {
      transform: rotateX(-180deg);
    }
  }

  @keyframes turning-paper {
    0% {
      background-color: var(--content-bgc);
    }

    20% {
      background-color: var(--content-bgc);
    }

    100% {
      background-color: #000
    }
  }

  .paper-turning {
    width: 18.4vw;
    height: 9.2vw;
    position: relative;
    transform-origin: 9.2vw 9.2vw;
    transform-style: preserve-3d;
    
  }

  .paper-turning-bac {
    width: 18.4vw;
    height: 18.4vw;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    border-radius: 2vw;
    /* background-color: var(--box-darker) */
  }

  .paper-turning .paper{
    background-color: var(--content-bgc);
    position: absolute;
    width: 18.4vw;
    height: 9vw;
    overflow:hidden;
    backface-visibility: hidden; 
    perspective-origin: top;
    box-shadow: none !important;
    /* box-shadow: inset 1px 1px 0px 0px #333333; */
  }

  .paper.down {
    border-radius: 0 0 2vw 2vw;
    box-shadow: var(--timer-shadow-down);
    /* box-shadow: inset 1px 1px 0px 0px #333333; */
    /* border:0.1vw solid #000;
    border-top: none; */
  }

  .paper.up {
    border-radius: 2vw 2vw 0 0;
    box-shadow: var(--timer-shadow-up);
    /* box-shadow: inset 1px 1px 0px 0px #333333; */
    /* border:0.1vw solid #000;
    border-bottom: none; */
  }

  .paper-turning .paper.down{
    transform: rotateX(180deg);
  }

  .paper-turning .paper.up{
    backface-visibility: hidden; 
    transform: rotateX(0deg);
  }

  

  .clock-button {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.4rem;
/*    background-color: var(--content-bgc);*/
    /* box-shadow:  0px 0px 0px 1px #161b1d3b; */
/*    box-shadow: var(--clock-button-shadow-close);*/
    /*transform: rotate(180deg);
    transition: transform 1s;*/
/*    transition: box-shadow 0.1s ease-in-out;*/

    box-shadow: var(--lightBox-shadow-light);
    background: var(--lightBox-background-light);
    color:var(--lightBox-color-light);
    transition: 0.3s;
  }

  .record-btn {
    width: 8rem;
    border-radius: 0.8rem;
    /* box-shadow:  inset -2px -2px 2px 0 #fafbff, inset 2px 2px 2px 0 #161b1d3b; */
  }

  .clock-button:hover {
    box-shadow: var(--lightBox-shadow-dark);
    background: var(--lightBox-background-dark);
/*    transform: rotate(0deg);*/
  }

   .clock-button.none{
    touch-action: none;
    cursor: not-allowed;
    box-shadow: var(--lightBox-shadow);
    background: var(--lightBox-background);
    color:var(--lightBox-color);
  }

  .clock-button.none:hover{
    box-shadow: var(--lightBox-shadow);
    background: var(--lightBox-background);
    cursor: not-allowed;
  }

  .clock-button.turning {
    animation: breathe-lighting  4s infinite;
    animation-fill-mode: forwards;
  }

/*  改做动画效果*/
  @keyframes breathe-lighting {
    0% {
      box-shadow: var(--lightBox-shadow-light);
      background: var(--lightBox-background-light);
    }

    50% {
      box-shadow: var(--lightBox-shadow-lighter);
      background: var(--lightBox-background-lighter);
      transform: scale(1.1);
    }

    100% {
      box-shadow: var(--lightBox-shadow-light);
      background: var(--lightBox-background-light);
    }
  }

 

  .clock-button.active{
/*    box-shadow:  inset -2px -2px 2px 0 #fafbff, inset 2px 2px 2px 0 #161b1d3b;*/
  }

  @media (min-width: 768px) {}
</style>