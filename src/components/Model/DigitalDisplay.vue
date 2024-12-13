<template>
  <div class="digital-display">
    <div class="digital-number" v-for="(digit, index) in digits" :key="index">
      <div class="digit">
        <div :class="['segment',{ 'on': getSegments(digit)[0] }]" style="top:0px;left:0px;transform: translateY(-1.5vw);z-index: ;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300">
            <path d="M 0 150 L 150 300 L 750 300 L 900 150 L 750 0 L 150 0 L 0 150" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment vertical', { 'on': getSegments(digit)[1] }]" style="top:0px;right:0px;transform: translateX(1.5vw);z-index:">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900">
            <path d="M 150 0 L 300 150 L 300 750 L 150 900 L 0 750 L 0 150 L 150 0" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment vertical', { 'on': getSegments(digit)[2] }]" style="bottom:0px;right:0px;transform: translateX(1.5vw)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900">
            <path d="M 150 0 L 300 150 L 300 750 L 150 900 L 0 750 L 0 150 L 150 0" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment',{ 'on': getSegments(digit)[3] }]" style="bottom:0px;left:0px;transform: translateY(1.5vw)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300">
            <path d="M 0 150 L 150 300 L 750 300 L 900 150 L 750 0 L 150 0 L 0 150" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment vertical', { 'on': getSegments(digit)[4] }]" style="bottom:0px;left:0px;transform: translateX(-1.5vw)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900">
            <path d="M 150 0 L 300 150 L 300 750 L 150 900 L 0 750 L 0 150 L 150 0" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment vertical', { 'on': getSegments(digit)[5] }]" style="top:0px;left:0px;transform: translateX(-1.5vw)" >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900">
            <path d="M 150 0 L 300 150 L 300 750 L 150 900 L 0 750 L 0 150 L 150 0" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment',{ 'on': getSegments(digit)[6] }]" style="top:50%;left:0px;transform: translateY(-50%);">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300">
            <path d="M 0 150 L 150 300 L 750 300 L 900 150 L 750 0 L 150 0 L 0 150" 
                  fill="currentColor"/>
          </svg>
        </div>
      </div>
      <div class="digit shadow">
        <div :class="['segment',{ 'on': getSegments(digit)[0] }]" style="top:0px;left:0px;transform: translateY(-1.5vw);z-index: 1;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300">
            <path d="M 0 150 L 150 300 L 750 300 L 900 150 L 750 0 L 150 0 L 0 150" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment vertical', { 'on': getSegments(digit)[1] }]" style="top:0px;right:0px;transform: translateX(1.5vw);">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900">
            <path d="M 150 0 L 300 150 L 300 750 L 150 900 L 0 750 L 0 150 L 150 0" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment vertical', { 'on': getSegments(digit)[2] }]" style="bottom:0px;right:0px;transform: translateX(1.5vw)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900">
            <path d="M 150 0 L 300 150 L 300 750 L 150 900 L 0 750 L 0 150 L 150 0" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment',{ 'on': getSegments(digit)[3] }]" style="bottom:0px;left:0px;transform: translateY(1.5vw)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300">
            <path d="M 0 150 L 150 300 L 750 300 L 900 150 L 750 0 L 150 0 L 0 150" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment vertical', { 'on': getSegments(digit)[4] }]" style="bottom:0px;left:0px;transform: translateX(-1.5vw)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900">
            <path d="M 150 0 L 300 150 L 300 750 L 150 900 L 0 750 L 0 150 L 150 0" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment vertical', { 'on': getSegments(digit)[5] }]" style="top:0px;left:0px;transform: translateX(-1.5vw);z-index:2" >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 900">
            <path d="M 150 0 L 300 150 L 300 750 L 150 900 L 0 750 L 0 150 L 150 0" 
                  fill="currentColor"/>
          </svg>
        </div>
        <div :class="['segment',{ 'on': getSegments(digit)[6] }]" style="top:50%;left:0px;transform: translateY(-50%); ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300">
            <path d="M 0 150 L 150 300 L 750 300 L 900 150 L 750 0 L 150 0 L 0 150" 
                  fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    digits() {
      // 确保传入的数字是字符串，并且填充为6位数
      console.log(this.value.toString().split(''))
      return this.value.toString().split('');
    }
  },
  methods: {
    getSegments(digit) {
      // 每个数字对应的7段显示
      const segmentMap = [
        [true, true, true, true, true, true, false], // 0
        [false, true, true, false, false, false, false], // 1
        [true, true, false, true, true, false, true], // 2
        [true, true, true, true, false, false, true], // 3
        [false, true, true, false, false, true, true], // 4
        [true, false, true, true, false, true, true], // 5
        [true, false, true, true, true, true, true], // 6
        [true, true, true, false, false, false, false], // 7
        [true, true, true, true, true, true, true], // 8
        [true, true, true, true, false, true, true], // 9
      ];

      // 将 digit 转为数字类型，确保正确获取 segment
      const digitNumber = parseInt(digit, 10);
      return segmentMap[digitNumber] || [false, false, false, false, false, false, false]; // 默认返回全灭
    }
  }
};
</script>

<style scoped>
.digital-display {
  display: flex;
  justify-content: space-around;
  font-size: 40px;
}

.digital-number{
  position: relative;
  width:9vw;
  height: 18vw;
  margin: 0 2vw;
}

.digit {
  position: absolute;
  width:9vw;
  height: 18vw;
  z-index: 2;
}

.digit.shadow{
  width:9vw;
  height: 18vw;
  z-index: 1;
}

.segment {
  box-sizing: border-box;
  font-size: 10px;
  text-align: center;
  position: absolute;
  width: 9vw;
  height: 3vw;
  color: var(--content-bgc);
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.8s ease-in-out;
  opacity: 0;
}

.shadow .segment {
/*  filter: drop-shadow(1px 1px 2px #0008);*/
/*  transition: 1s ease-in-out;*/
}

.segment svg {
  width: 95%;
/*  height: 100%;*/
}

.segment.vertical {
  width: 3vw;
  height: 9vw;

}

.segment.on  {
/*  color:red;*/
/*  filter: drop-shadow(-4px -4px 5px #fff);*/
  opacity: 1;
}

.shadow .segment.on  {
/*  color:red;*/
  filter: drop-shadow(-0.3vw -0.3vw 0.3vw #fff) drop-shadow(0.4vw 0.4vw 0.5vw #0006);
}

</style>
