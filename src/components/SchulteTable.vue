<template>
  <div class="container">
    <div class="game">
      <p v-if="seconds">{{ (seconds/100).toFixed(2) }} s</p>
      <p style="color: #999;" v-else>点击"1"后开始计时</p>
      <table class="schult-table">
        <tr v-for="row in size">
          <td v-for="col in size" @click="selectnumber($event, (row - 1) * size + col - 1)" :class="(numbers[(row - 1) * size + col - 1])<(start) ? 'click-right':''">
            {{ numbers[(row - 1) * size + col - 1] }}
          </td>
        </tr>
      </table>
      <div v-if="start != 1" class="game-btn" @click="restart">
        重 置
      </div>
      <p style="color: #999;" v-if="record != -1">本机记录: {{(record/100).toFixed(2)}} s</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: "SchulteTable",
  setup() {
    const numbers = ref([])
    const size = ref(5)
    const start = ref(1)
    const record = ref(-1)

    onMounted(() => {
      // 你的初始化逻辑
      initNumber()
      if(localStorage.getItem('schulteTableRecord')){
        record.value = localStorage.getItem('schulteTableRecord')
      }
    });

    function initNumber() {
      var length = size.value*size.value
      const array = Array.from({ length: length }, (_, i) => i + 1);
      numbers.value = shuffleNumber(array);
      // console.log(numbers.value)
    }

    //Fisher-Yates（或 Knuth）洗牌算法
    function shuffleNumber(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 使用 ES6 的解构交换元素
      }
      return array;
    }

    function selectnumber(e, index) {    
      // console.log(numbers.value[index],start.value ) 
      if (start.value == numbers.value[index]) {
        if(start.value == 1){
          startTimer()
        }else if(start.value == size.value *size.value){
          setrecord()
          stopTimer()
        }

        // e.currentTarget.classList.add('click-right')
        start.value++
      }else{
        // e.currentTarget.classList.add('click-wrong')
      }
    }

    const seconds = ref(0);
    let interval;

    const startTimer = () => {
      interval = setInterval(() => {
        seconds.value += 1;
      }, 10);
    };  

    const stopTimer = () => {
      clearInterval(interval);
    };

    function restart(){
      start.value = 1;
      seconds.value = 0;
      stopTimer()
      initNumber();
    }

    const setrecord = () =>{
      if(seconds.value < record.value || record.value == -1){
        record.value = seconds.value
        localStorage.setItem('schulteTableRecord',seconds.value)
      }
    }

    onUnmounted(() => {
      clearInterval(interval); // 清除定时器，防止内存泄漏
    });

    return {
      numbers,
      size,
      selectnumber,
      seconds,
      start,
      restart,
      record
    }

  }
}
</script>

<style scoped>
  /* 默认3个div一行 */
  .container {
    margin: 20px 30px;
    padding: 10px 20px ;
    border: var(--box-border);
    border-radius:12px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    background-color: var(--box-bgc);
  }

  .schult-table {
    border-collapse: collapse; /* 合并边框 */
    user-select: none;       /* 标准语法 */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none;    /* Firefox */
    -ms-user-select: none;     /* IE/Edge */
  }

  .schult-table > th, td {
    padding: 20px; /* 单元格内边距 */
    border: var(--box-border); /* 单元格边框 */
    text-align: center; /* 文字左对齐 */
  }

  .click-right {
    background-color: rgb(241, 249, 240);
    color: #363636;
  }

  
</style>

