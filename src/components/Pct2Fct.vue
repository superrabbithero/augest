<template>
  <div class="container">
    <div class="game">
      <div v-show="!gamestart">
        <table class="mytable p2f" v-for="tab in 3">
          <tr v-for="col in 8">
            <td class="fct-td">
              <!-- <TheLatex2Math :latex="getfct(col-1+((tab-1)*8))" /> -->
              <div class="gongshi">$${{getfct(col-1+((tab-1)*8))}}$$</div>
            </td>
             <td class="pct-td" @click="">
              <!-- <TheLatex2Math :latex="getpct(col-1+((tab-1)*8))" /> -->
              <div class="gongshi">$${{getpct(col-1+((tab-1)*8))}}$$</div>
            </td>
          </tr>
        </table>
      </div>

      <div class="questionbox" v-show="gamestart">
        <div class="ques">
          <TheLatex2Math class="gongshi" :latex="getQu(ques)" />
        </div>
        <div class="option nocopy" v-for="(option, index) in options" @click="selectOption($event, option)" :id="`o`+option">
          <TheLatex2Math class="gongshi" :latex="String.fromCharCode(65+index)+'\.'+getOp(option)" />
        </div>
      </div>
      <div class="game-ui">
        <p v-if="pattern == 2 && gamestart">{{ ((1000-seconds)/100).toFixed(1) }} s</p>
      </div>
      <div class="game-ui" v-if="pattern == 1 && gamestart">
        <IconWrapper v-for="a in (3-wrongcount)" iconName="Like" theme="filled" :strokeWidth='2' style="color: #ff8a8a;"></IconWrapper>
        <IconWrapper v-for="a in wrongcount" iconName="Dislike" theme="outline" :strokeWidth='2'></IconWrapper>
      </div>
      <div class="game-ui" v-if="pattern == 0 && finishcount > 0 && gamestart">
        <p >本次练习：{{finishcount}},本次错误:{{wrongcount}}</p>
      </div>
      <div class="game-btn" @click="startgame">
        {{gamestart ? "结束训练" : "开始训练"}}
      </div>
      <div class="game-btn pattern" @click="selectpattern()">
        {{pattern == 0 ? "练习模式" : (pattern == 1 ? "冒险模式" : "限时模式")}}
      </div>
      <div class="game-ui">
        <div v-for="record in records.reverse()">
          {{record[0] == 0 ? "练习模式" : (record[0] == 1 ? "冒险模式" : "限时模式")}}：完成题目：{{record[1]}},   错误题目：{{record[2]}},   用时：{{(record[3]/100).toFixed(2)}}s
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import IconWrapper from './IconWrapper.vue'
import TheLatex2Math from './TheLatex2Math'
import {ref,onUnmounted} from 'vue'

export default {
  name: 'Pct2Fct',
  components:{
    IconWrapper,
    TheLatex2Math
  },
  setup() {
    const gamestart = ref(false)

    let quesflag = 0

    let canselect = false

    const ques = ref(0)

    const options = ref([])
    //模式, 默认0：练习模式，1:冒险模式 ,2:限时模式
    const pattern = ref(0)

    //记录
    const records = ref([])

    //错题
    let wronglist = []

    const fdata = ref([[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10],[1,11],[1,12],[1,13],[1,14],[1,15],[1,16],[1,17],[1,18],[1,19],[1,20],[3,8],[5,8],[7,8],[2,7],[3,7]])

    const getfct = (index) => {
      return '\\frac{'+ fdata.value[index][0]+'}{'+fdata.value[index][1]+'}'
    }

    const getpct = (index) => {
      return (fdata.value[index][0]*100/fdata.value[index][1]).toFixed(1)*100/100 + '\\%'
    }

    const getAscll = (index) => {
      return String.fromCharCode(index)
    }

    const setoptions = (index) => {
      options.value = []
      var array = []
      array.push(index)
      for(var i=0; i < 3; i++){
        var as = Math.floor(Math.random()*(24));
        if (array.indexOf(as) == -1) {
          array.push(as)
        }else{
          i--
        }
      }
      options.value = shuffleNumber(array)
    }

    const startgame = () => {
      gamestart.value = !gamestart.value
      if(gamestart.value){
        startTimer()
        wrongcount.value = 0
        finishcount.value = 0
        refreshquestion()
      }else{
        var record = [pattern.value,finishcount.value,wrongcount.value,seconds.value]
        stopTimer()
        seconds.value = 0
        records.value.push(record)
      }
    }

    const refreshquestion = (mode = 0) => {
      canselect = true
      if(mode == 0){
        quesflag = Math.round(Math.random())
        ques.value = Math.floor(Math.random()*(24))
        console.log(ques.value)
        setoptions(ques.value)
      }else{
        ques.value = wronglist.pop()
        setoptions(ques.value)
      }
        
    }



    const getQu = (index) => {
      console.log(index,quesflag)
      switch(quesflag){
        case 0 :
          return getfct(index)
        case 1 :
          return getpct(index)
      }
    }

    const getOp = (index) => {
      switch(quesflag){
        case 0 :
          return getpct(index)
        case 1 :
          return getfct(index)
      }
    }

    const wrongcount = ref(0)
    const finishcount = ref(0)

    const selectOption = (e, option) => {
      // stopTimer()
      if(canselect){
        canselect = false
        var dom = e.currentTarget
        var rightdom = document.getElementById("o"+ques.value)
        if(option == ques.value){
          dom.style.backgroundColor = '#b0ffbb'
        }else{
          wrongcount.value += 1
          rightdom.style.backgroundColor = '#b0ffbb'
          dom.style.backgroundColor = '#ffb0b0'
          wronglist.push(ques.value)
        }
        finishcount.value += 1
        if (pattern.value == 0) {
          setTimeout(function(){
            rightdom.style.backgroundColor = '#eee'
            dom.style.backgroundColor = '#eee'
            refreshquestion()
          },1500)
        }else{
          setTimeout(function(){
            rightdom.style.backgroundColor = '#eee'
            dom.style.backgroundColor = '#eee'
            if(pattern.value == 1 && wrongcount.value==3){
              //失败
              startgame()
            }else{
              refreshquestion()
            }
          },200)
        }
      }
      
    }

    function shuffleNumber(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 使用 ES6 的解构交换元素
      }
      return array;
    }

    const seconds = ref(0);
    let interval;

    const startTimer = () => {
      seconds.value = 0
      interval = setInterval(() => {
        seconds.value += 1;
        if(pattern.value == 2 && seconds.value > 1000){
          startgame()
        }
      }, 10);
    };  

    const stopTimer = () => {
      clearInterval(interval);
    };

    const selectpattern = () => {
      if(!gamestart.value){
        if(pattern.value >= 2){
          pattern.value = 0
        }else{
          pattern.value += 1
        }
      }  
    };

    onUnmounted(() => {
      clearInterval(interval); // 清除定时器，防止内存泄漏
    });



    return {
      fdata,
      getfct,
      getpct,
      gamestart,
      getAscll,
      options,
      startgame,
      ques,
      getQu,
      getOp,
      selectOption,
      seconds,
      selectpattern,
      pattern,
      wrongcount,
      finishcount,
      records
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    margin: 20px 30px;
    padding: 10px 5px ;
    border: var(--box-border);
    border-radius:12px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    background-color: var(--box-bgc);
  }

  .mytable.p2f {
    display: inline-block;
    margin: 1rem 0.5rem 0 0.5rem;
  }

  .mytable.p2f > th,td {
    padding: 10px 0;
    width: 70px;
  }

  .fct-td {
    width: 50px;
    font-weight: 500;
  }

  .questionbox{
    margin: 1rem;
    
    width: 300px;
/*    border: 1px solid #000;*/

  }
  .ques {
    padding: 1.5rem;
    font-size: 2rem;
    display: block;
  }

  .option {
    padding: 10px 7px;
    text-align: left;
    display: inline-block;
/*    transform: translateX(25%);*/
    width: calc(50% - 44px);
/*    border: 1px solid #555;*/
    height: 63px;
    background-color: #eee;
    border-radius: 8px;
    margin: 10px 14px;
    color: #363636;
  }

  /*.option:active {
    background-color: #bdddff;
  }

  @media (any-hover:hover){
    .option:hover {
      background-color: #bdddff !important;
    }
  }*/

  .game-btn {
    display: inline-block;
    margin-left: 3px;
    margin-right: 3px;
  }

  .game-btn.pattern {
    border: none;
    color: #888;
  }

  .game-ui {
    margin-left: 2rem;
    text-align: left;
  }
  .gongshi {
/*    padding: 2px 0;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  

  
</style>

