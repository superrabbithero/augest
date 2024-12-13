<template>
  <div :class="{'au-layout center main':true, 'dark':isDark}">
      <div class="datetime">{{datetime}}</div>

      <!-- 翻页时钟样式 -->

      <div v-if="skins == 0" class="clock-container rows center">
        <div :class="{'clock-button is-clock-btn':true,'hidden':!show_clock_btn}" v-show="isClock" @click="setting_show = !setting_show" >
          <IconWrapper iconName="SettingThree" theme="outline" strokeWidth="6" size="25"/>
        </div>
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
      <!-- 电子屏幕样式 -->

      <div v-if="skins == 1" class="rows center" style="transform: scale(0.8);">
        
        <div :class="{'clock-button is-clock-btn':true,'hidden':!show_clock_btn}" v-show="isClock" @click="setting_show = !setting_show" >
          <IconWrapper iconName="SettingThree" theme="outline" strokeWidth="6" size="25"/>
        </div>
        <DigitalDisplay :value="hours" />
        <div class="dots"><div class="dot"/><div class="dot"/></div>
        <DigitalDisplay :value="minutes" />
        <div class="dots"><div class="dot"/><div class="dot"/></div>
        <DigitalDisplay :value="seconds" />
      </div>
      <!-- 简单电子钟 -->
      <div v-if="skins == 2" class=" clock-digit-container rows center" style="transform: scale(0.8);">
        <div class="clock-card-digit">{{`${hours}:${minutes}:${seconds}`}}</div>
      </div>

      <div class="rows" v-show="!isClock">
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
          <div class="clock-button" @click="setting_show = !setting_show">
            <IconWrapper iconName="SettingThree" theme="outline" strokeWidth="6" size="25"/>
          </div>
        </div>
      </div>

      
      <!-- <div class="intervals">
        <div v-for="(interval, index) in intervals" :key="index">
          记录 {{ index + 1 }}: {{ interval }}
        </div>
        <div v-for="(item, index) in records" :key="index">
          记录 {{ index + 1 }}: {{ item }}
        </div>
      </div> -->

    <div :class="{'mask':true,'active':record_show || setting_show}" @click="sideHidden"></div>

    <div :class="{'side':true,'show':record_show || setting_show}">
      <!-- 这是侧边栏 -->
      <div class="side-container">
        <div class="side-item-card">
          <label>主题</label>
          <div class="side-content">
            <au-switch v-model="isDark"></au-switch>
          </div>
        </div>
      </div>
      <div class="side-container">
        <div class="side-item-card">
          <label>模式</label>
          <div class="side-content">
            <au-switch v-model="isClock"></au-switch>
          </div>
        </div>
      </div>
      <div class="side-container">
        <div class="side-item-card">
          <label>选择考试</label>
          <div class="side-content">
            <div class="capsule" @click="select_show = true">{{examSelected}}</div>
          </div>
        </div>
      </div>
      <div class="side-container">
        <div class="side-item-card">
          <label>皮肤</label>
          <div class="side-content">
            <div class="capsule gap" @click="skins = 0">翻页</div>
            <div class="capsule gap" @click="skins = 1">电子-浮雕</div>
            <div class="capsule" @click="skins = 2">电子-普通</div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{'side':true,'show':select_show}">
      <div class="side-item-card">
        <div class="select-title">
          <div class="icon-btn" @click="select_show = false">
            <IconWrapper iconName="Left" theme="outline" strokeWidth="6" size="20" style="transform: translateY(2px);"/>
          </div>
          <label> 选择考试 </label>
        </div>
        <div class="select-content">
          <div :class="{'select-item capsule':true,'active':examSelected == item}" v-for="(item,index) in selectItems" :key="index" @click="selectExam(index)">{{item}}</div>
        </div>
        <div class="side-item-card">
          <label> 开始时间 </label>
          <div class="select-item">{{`${examConfig.startTime%12}:00 ${examConfig.startTime > 12 ? 'p.m' : 'a.m'}`}}</div>
          <label> 限时 </label>
          <div class="select-item">{{examConfig.time == -1 ? `无限时`:`${examConfig.time}分钟`}}</div>
          <label> 模块类型 </label>
          <div class="select-item" v-for="(mod,index) in examConfig.modules" :key="index">{{mod}}</div>
        </div>
      </div>
    </div>
  </div>
    
</template>

<script>
import { ref, onMounted ,onBeforeUnmount} from 'vue';
import IconWrapper from './IconWrapper.vue';
import auSwitch from './Model/auSwitch.vue';
import DigitalDisplay from './Model/DigitalDisplay.vue';

export default {
  components:{
    IconWrapper, auSwitch,DigitalDisplay
  },
  
  setup() {
    const skins = ref(1)

    const status = ref(0)
    let startTime = 0
    let examStartTime = 0
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

    //侧边工具栏
    const record_show = ref(false)
    const setting_show = ref(false)

    //打开黑暗模式
    const isDark = ref(false)
    //打开时钟模式
    const isClock = ref(false)

    const selectItems = ref(['自由计时','江苏省考-行测','江苏省考-申论','国考行测','国考申论'])
    const examSelected = ref("自由计时")
    const select_show = ref(false)

    const show_clock_btn = ref(false)
    let show_clock_btn_timer = null

    const datetime = ref('')

    const examConfigList = [{'startTime':0,'time':-1,'modules':['自由']},
      {'startTime':9,'time':120,'modules':['政治理论','常识判断','言语理解','数学运算','判断推理','资料分析']},
      {'startTime':14,'time':150,'modules':['申论']},
      {'startTime':9,'time':120,'modules':['政治理论','常识判断','言语理解','数学运算','判断推理','资料分析']},
      {'startTime':14,'time':120,'modules':['申论']}]

    const examConfig = ref({'startTime':0,'time':-1,'modules':['自由']})


    onMounted(() => {
      // starttimer()
      getDateTime()
      document.addEventListener('click',handleClick)
    });

    onBeforeUnmount(() => {
      clearTimeout(show_clock_btn_timer)
      clearInterval(timerInterval)
      document.removeEventListener('click',handleClick)

    })

    const getDateTime = () => {
      // 获取当前日期
      const currentDate = new Date();

      // 使用 Intl.DateTimeFormat 获取英文月份
      const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);

      const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(currentDate);

      // 获取年和日
      const year = currentDate.getFullYear();
      const day = currentDate.getDate();

      // 给日期加上后缀
      const suffix = (day) => {
        if (day >= 11 && day <= 13) {
          return day + 'th'; // 处理11、12、13的特殊情况
        }
        switch (day % 10) {
          case 1: return day + 'st';
          case 2: return day + 'nd';
          case 3: return day + 'rd';
          default: return day + 'th';
        }
      };

      const formattedDay = suffix(day);

      // 输出年、英文月份、日
      datetime.value = `${weekday} ${formattedDay}, ${month} ${year}`
    }

    const handleClick = () => {
      show_clock_btn.value = true
      if(show_clock_btn_timer){
        clearTimeout(show_clock_btn_timer)
      }

      show_clock_btn_timer = setTimeout(()=>{
        show_clock_btn.value = false
      },5000)
    }

    const starttimer = ()=>{
      if(status.value != 1){
        clearInterval(timerInterval);
        console.log("start")
        startTime = Date.now() - elapsedTime;
        const now = new Date()
        //这里设置的是utc时间
        now.setHours(examConfig.value.startTime+8,0,0,0)
        examStartTime = now.getTime()
        console.log(examStartTime)
        timerInterval = setInterval(updatetimer, 1000);
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
      getDateTime()
      hours_pre.value = hours.value
      minutes_pre.value = minutes.value
      seconds_pre.value = seconds.value
      // console.log("updatetimer")
      elapsedTime = isClock.value ? Date.now() : Date.now() - startTime;
      console.log(elapsedTime)
      const time = new Date(elapsedTime + examStartTime);
      if(isClock.value){
        hours.value = String(time.getHours()).padStart(2, '0');
        minutes.value = String(time.getMinutes()).padStart(2, '0');
        seconds.value = String(time.getSeconds()).padStart(2, '0');
      }else{
        hours.value = String(time.getUTCHours()).padStart(2, '0');
        minutes.value = String(time.getUTCMinutes()).padStart(2, '0');
        seconds.value = String(time.getUTCSeconds()).padStart(2, '0');
      }
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

    const sideHidden = ()=>{
      if(select_show.value){
        select_show.value = false
      }else{
        record_show.value = false 
        setting_show.value = false
      }
    }

    const selectExam = (index) => {
      examSelected.value = selectItems.value[index]
      examConfig.value = examConfigList[index]
    }

    

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
      status,
      record_show,
      setting_show,
      isDark,
      isClock,
      sideHidden,
      selectItems,
      select_show,
      selectExam,
      examSelected,
      examConfig,
      show_clock_btn,
      datetime,
      skins
    }
  }
};
</script>

<style scoped>
  .clock-container {
    position: relative;
    padding: 0;
/*    border: var(--box-border);*/
    box-shadow: var(--clock-shadow);
    border-radius: 4vw;
    margin-top: 1rem;
    margin-bottom: calc(6vw + 1rem) !important;
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

  @media (hover:bover){
    .clock-button:hover {
      box-shadow: var(--lightBox-shadow-dark);
      background: var(--lightBox-background-dark);
  /*    transform: rotate(0deg);*/
    }
    .clock-button.none:hover{
      box-shadow: var(--lightBox-shadow);
      background: var(--lightBox-background);
      cursor: not-allowed;
    }
  }
    

   .clock-button.none{
    touch-action: none;
    cursor: not-allowed;
    box-shadow: var(--lightBox-shadow);
    background: var(--lightBox-background);
    color:var(--lightBox-color);
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

  .side {
    background-color: var(--content-bgc);
    height: calc(100vh - 2vw);
    width: 40vw;
    border-radius: 2vw 0 0 2vw;
    position: fixed;
    right: 0;
    top: 0;
    transform: translateX(100%);
    transition: 0.3s ease;
    padding: 0.6rem 1.2rem;
    z-index: 3;
  }

  .side.show {
    box-shadow: 2vw 2vw 3vw 2vw #161b1d3b;
    transform: translateX(0);
  }

  .side-container {
    width: 100%;
    margin-top: 0.4rem;
  }
  .side-item-card label{
    font-size: 0.8rem;
  }

  .side-content {
    margin-top: 0.4rem;
    display: flex;
  }

  .main{
    justify-content: center;
    background: var(--content-bgc);
    color:var(--fontNormal);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .mask{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    backdrop-filter:brightness(1)  blur(0);
/*    background-color: #000a;*/
    pointer-events: none;
    transition: 0.3s ease-in-out;
  }

  .mask.active{
    backdrop-filter:brightness(0.9) blur(8px);
    pointer-events: unset;
    opacity: 1;
    z-index: 2;
  }

  .select-content {
    display: flex;
    flex-wrap: wrap;
    margin: 0.4rem -0.4rem;
  }

  .select-content .select-item {
    margin: 0.4rem 0.4rem;
  }

  .select-content .select-item.active {
    background: #ffc848;
    color: #222;
  }
  
  .select-title {
    display: flex;
    align-items: center
  }
      

  .capsule {
/*    width: fit-content;*/
    font-weight: bolder;
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.9rem;
    box-shadow: var(--lightBox-shadow-dark);
    background: var(--lightBox-background-dark);
    color: var(--lightBox-color);
  }

  .capsule.gap {
    margin-right: 1rem;
  }

  .icon-btn {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
    box-shadow: var(--lightBox-shadow);
    background: var(--lightBox-background);
    color:var(--lightBox-color-light);
  }

  .is-clock-btn{
    position: absolute;
    top: 50%;
    right: -20px;
    transform: translate(100%, -50%);
    /* opacity: 1; */
    z-index: 1;
  }

  

  .is-clock-btn.hidden{
/*    opacity: 0;*/
    box-shadow: var(--lightBox-shadow-none);
  }

  .dots {
    width: 6vw;
    height: 18vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .dots .dot{
    width: 2.5vw;
    height: 2.5vw;
    margin: 2vw 0;
    border-radius: 50%;
    filter: drop-shadow(-0.3vw -0.3vw 0.3vw #fff) drop-shadow(0.4vw 0.4vw 0.5vw #0006);
    background: var(--content-bgc);
  }

  .datetime {
    margin-bottom: 2vw;
/*    font-family: "digital-7";*/
    font-size: 2.3vw;
/*    color: var(--content-bgc);*/
/*    filter: drop-shadow(-0.3vw -0.3vw 0.3vw #fff) drop-shadow(0.4vw 0.4vw 0.5vw #0006);*/
  }

  .clock-digit-container {
    width: 75vw;
    height: 23vw;
    border-radius: 4vw;
    background-color: #101010;
    align-items: center;
    justify-content: center;
  }

  .clock-card-digit{    
    font-family: "digital-7";
    font-size: 18vw;
    color: #c74500;
    display: flex;
    filter: drop-shadow(0 0 0.5vw #c74500);
  }


</style>