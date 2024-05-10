<template>
  <div class="container">
    <div class="game" style="position:relative;">
      <div class="turtles">
        <div class="time" v-show="turtle >= 0">{{time}}</div>
        <div class="turtle-list">
          <div class="turtle-item">5</div>
          <div class="turtle-item">4</div>
          <div class="turtle-item">3</div>
          <div class="turtle-item">2</div>
          <div class="turtle-item">1</div>
        </div>
        <div class="turtle-game">
          <div :class="{'turtle': true, 'new5':turtle==8}"  style="z-index: 10; animation-duration: 1s;" v-show="turtle >= 8">
            <img :class="{'autoscale':turtle==8}" id="turtle5" src="@/assets/game-img/turtle/turtle.png" style="width:200px;" />
          </div>
          <div :class="{'turtle': true, 'new4':turtle==6}" style="z-index: 9; animation-duration: 1s;" v-show="turtle >= 6">
            <img :class="{'autoscale':turtle==6}" id="turtle4"  src="@/assets/game-img/turtle/turtle.png" style="width:200px;" />
          </div>
          <div :class="{'turtle': true, 'new3':turtle==4}" style="z-index: 8;" v-show="turtle >= 4">
            <img :class="{'autoscale':turtle==4}" id="turtle3" src="@/assets/game-img/turtle/turtle.png" style="width:200px;" />
          </div>
          <div :class="{'turtle': true, 'new2':turtle==2}" style="z-index: 7;" v-show="turtle >= 2">
            <img :class="{'autoscale':turtle==2}" id="turtle2" src="@/assets/game-img/turtle/turtle.png" style="width:200px;" />
          </div>
          <div :class="{'turtle': true, 'new1':turtle==0}" style="z-index: 6;" v-show="turtle >= 0">
            <img :class="{'autoscale':turtle==0}" id="turtle1" src="@/assets/game-img/turtle/turtle.png" style="width:200px;" />
          </div>
          <div class="turtle basic" style="z-index: 5;">
            <img src="@/assets/game-img/turtle/turtle.png" style="width:200px;" />
          </div>
        </div>
      </div>
      <div class="gamecover" @click="start">
        <div v-if="turtle == -1" class="game-title">不能比下面的乌龟大哦</div>
        <div v-if="gamestatus==-1">输了</div>
        <div v-if="gamestatus==1">Win!</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: "Turtle",
  setup() {
    const turtle = ref(-1)
    let falling = false
    let maxwidth = 200
    const gamestatus = ref(0)
    const time = ref(10)


    function start() {
      // console.log(turtle.value)
      if( gamestatus.value!=0 ){
        gamestatus.value = 0
        turtle.value = -1
        maxwidth = 200
        return
      }
      if(!falling){
        if(turtle.value == -1){
          turtle.value = 0
          startTimer()
        }else{
          stopTimer()
          turtle.value++
          //开始下落
          falling = true

          setTimeout(function () {
            var turtleN = (turtle.value + 1)/2
            // console.log("当前下落的是turtle:",turtleN)
            // console.log("当前下落的乌龟元素class为：",document.getElementById("turtle" + turtleN).classList)
            // console.log("当前下落的乌龟元素的宽度为：",document.getElementById("turtle" + turtleN).getBoundingClientRect().width)
            var newWidth = document.getElementById("turtle" + turtleN).getBoundingClientRect().width
            if(newWidth <= maxwidth){
              maxwidth = newWidth
              turtle.value++
              if(turtle.value >= 9){ //9
                gamestatus.value = 1
              }else{
                startTimer()
              }
            }else{
              console.log("game over!")
              gamestatus.value = -1
            }
            //结束下落
            falling = false
          },1000)
          
        }
      }
    }

    let interval;
    const startTimer = () => {
      time.value = 10
      interval = setInterval(() => {
        time.value -= 1;
        if(time.value <= 0){
          start()
        }
      }, 1000);
    };

    const stopTimer = () => {
      clearInterval(interval);
    };

    onUnmounted(() => {
      clearInterval(interval); // 清除定时器，防止内存泄漏
    });

    return {
      turtle,
      start,
      gamestatus,
      time
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 20px 30px;
    border: var(--box-border);
    border-radius:12px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    background-color: var(--box-bgc);
    overflow: hidden;
  }

  .game {
    background-color: #fff;
    width: 350px;
    height: 500px;
  }
  .game > *{
    color: #363636!important;
  }

  .turtles{
    height: 100%;
  }

  .turtle-game{
    display: flex;
    flex-direction: column;
    justify-content: end;
/*    background-color: #bbb;*/
    height: 100%;
  }

  .turtle-list{
    position: absolute;
    display: flex;
    flex-direction: column;
  }

  .turtle-item{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #363636;
    margin-bottom: 2px;
  }

  .turtle {
/*    margin-bottom: -5px;*/
/*    transform: translateY(-100%);*/
/*    background-image: url("../assets/game-img/turtle/turtle.png");*/
/*    background-size:100% 100%;*/
    margin-bottom: -40px;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    background: none;
/*    height: 100px;*/
/*    border-radius: 50%;*/
/*    border:1px solid #363636;*/
/*    transition: margin-bottom 1s ease-in;*/
    transition:transform 0.5s ease-in;
    transform: translateY(0);

    
    position: relative;
  }

  .new1{
/*    margin-bottom: calc(100% - 40px);*/
    transform: translateY(calc(-350px));
  }
  .new2{
    transform: translateY(calc(-300px));
  }
  .new3{
    transform: translateY(calc(-250px));
  }
  .new4{
    transform: translateY(calc(-200px));
  }
  .new5{
    transform: translateY(calc(-200px));
  }

  .turtle > img{
    animation-name: scaleAnimate; 
    animation-duration: 2s; 
    animation-iteration-count: infinite; 
    animation-timing-function: linear;
    animation-play-state: paused;
  }

  .autoscale{
    animation-play-state: running!important;
  }

  @keyframes scaleAnimate{
    0% {transform:scale(1.0);}
    25% {transform:scale(1.5);}
    50% {transform:scale(1.0);}
    75% {transform:scale(0.5);}
    100% {transform:scale(1.0);}
  }



  .basic{
/*    transform: translateY(0);*/
    margin-bottom: -5px;
    transform:scale(1.0);
  }

  .gamecover{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 50;
    padding: 100px 0;
  }

  .time{
    width: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    position: absolute;
    right: 0;
    padding: 5px;
    border: 1px solid #363636 ;
    border-radius: 50%;
  }



  
</style>

