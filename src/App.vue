<template>
  <div class="header">
    <!-- <div class="head-list"> -->
      <div class="head-item"  @click="openmenu" id="menuicon">
        <IconWrapper iconName="ApplicationTwo" theme="filled" :strokeWidth='2' />
      </div>
      <div class="head-item home" @click="goto('/')">
        <!-- <span class="logo">{{environment}}</span> -->
        <IconWrapper iconName="Home" theme="outline" :strokeWidth='4' />
      </div>
      <div class="head-item"  style="margin-left: auto;">
        <div class="pagetitle">{{$route.meta.title?$route.meta.title:decodeURIComponent($route.path).slice(6)}}</div>
      </div>
      <div class="head-item" @click="changeStyle" style="margin-left: auto;">
        <IconWrapper iconName="DarkMode" theme="outline" :strokeWidth='4' />
      </div>  
    <!-- </div> -->
    <transition name="fade-slide">
      <div class="menu" v-if="menuisshow" ref="menu">
        <div class="menu-list">
          <div class="menu-list-title">工具</div>
          <div class="menu-item">
            <IconWrapper iconName="ApplicationOne" theme="outline" :strokeWidth='2' />
            app管理
          </div>
          <div class="menu-item" @click="goto('/tools/bulidanswersheet')">
            <IconWrapper iconName="PhoneOne" theme="outline" :strokeWidth='2' />
            答题卡生成
          </div>
          <div class="menu-item" @click="goto('/minigames')">
            <IconWrapper iconName="GameThree" theme="outline" :strokeWidth='2' />
            小游戏
          </div>
          <div class="menu-item" @click="goto('/examhome')">
            <IconWrapper iconName="Pyramid" theme="outline" :strokeWidth='2' />
            考试模拟器
          </div>
          <div class="menu-item" >
            <IconWrapper iconName="RoadCone" theme="outline" :strokeWidth='2' />
            待定...
          </div>
        </div>
      </div>
    </transition>
  </div>
  <div class="header-block"></div>
  <router-view></router-view>
  <div v-if="$route.meta.title != '真题'" class="footer">
    <div class="footer-link">
    </div>
    <div class="footer-bar">
      <div>©2023 - 2024 By SuperRabbitHero</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import IconWrapper from './components/IconWrapper.vue';

export default {
  name: 'App',
  data(){
    return{
      menuisshow:false,
      isDark:false,
      pagetitle:'',
    }
  },
  components: {
    IconWrapper
  },
  computed: {

    iconColor() {
      if(this.isDark){
        const darkModeElement = document.querySelector('.dark');
        return getComputedStyle(darkModeElement).getPropertyValue('--icon-color').trim();
      }else{
        return getComputedStyle(document.documentElement).getPropertyValue('--icon-color').trim()
      }
    }
  },

  mounted() {
    document.addEventListener("touchstart",function() {},false)
    
    if(localStorage.getItem('isDark')){
      this.isDark = localStorage.getItem('isDark')==='false' ? false :true
    }else{
      localStorage.setItem('isDark',this.isDark)
    }
    console.log('mounted',this.isDark)
    if(this.isDark){
      document.body.classList.add('dark')//黑夜模式时添加类名
    }
  },
  unmounted() {
    document.removeEventListener('click',this.closemenu)
    console.log('销毁')
  },
  methods:{
    goto(path){
      this.$router.push(path)
      this.menuisshow = false
      document.removeEventListener('click',this.closemenu)
      console.log('销毁')
    },
    openmenu() {
      if(!this.menuisshow){
        this.menuisshow = true
        document.addEventListener('click',this.closemenu);
        console.log('添加成功')
      }else{
        this.menuisshow = false
        document.removeEventListener('click',this.closemenu)
        console.log('销毁')
      }
      
    },
    closemenu(e){
      const md = document.getElementById('menuicon')
      if(!md.contains(e.target) && !this.$refs.menu.contains(e.target)){
        if(this.menuisshow == true){
          this.menuisshow = false
          document.removeEventListener('click',this.closemenu)
          console.log('销毁')
        }
      }
    },

    changeStyle(){
      this.isDark = !this.isDark//点击切换模式
      localStorage.setItem('isDark',this.isDark)
      console.log(localStorage.getItem('isDark'))
      console.log(this.isDark)
      if(this.isDark){
        document.body.classList.add('dark')//黑夜模式时添加类名
      }else{
        document.body.classList.remove('dark')//白天删除类名
      }
    },
  }
}
</script>


<style>

@import url('@/assets/fonts/index.css');
@import url('@/assets/css/index.css');


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: var(--content-bgc);
  color: var(--icon-color);
}




.header {
  background-color: var(--content-bgc);
  height: 60px;
  border-bottom: var(--box-border);
  position: fixed;
  z-index: 998;
  width: 100%;
  width: -moz-available;          
  /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available;  
  /* Mozilla-based browsers will ignore this. */
  width: fill-available;
  top: 0;
  left: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 30px;
}

.head-list {
  width: 100%;
}

.head-item {
  display: inline-block;
  margin-right: 5px;
}

.header-block {
  height: 60px;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter-from, .fade-slide-leave-to /* .fade-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(1em);
}
.fade-slide-enter-to, .fade-slide-leave-from /* .fade-slide-enter-active in <2.1.8 */ {
  opacity: 1;
  transform: translateY(0);
}

.menu{
  position: absolute;
  width: 342px;
  top:55px;
  border: var(--box-border);
  border-radius:12px;
  padding: 15px 0;
  background-color: var(--content-bgc);
}

@media (any-hover:hover){
  .menu:hover {
    border-color: #425aef;
  }
  .menu-item:hover {
    background-color: #425aef;
    color: #fff;
  }
}

.menu-item:active {
  background-color: #425aef;
  color: #fff;
}


.menu-list-title {
  font-size: 12px;
  margin: 0 10px;
  padding: 0 5px;
}

.menu-item {
  display: flex;
  justify-content: start;
  align-items: center;
  float: left;
  width: 141px;
  font-size: 16px;
  line-height: 30px;
  height: 30px;
  margin: 5px 10px;
  padding: 5px;
  border-radius:10px;
  cursor: pointer;
}

.menu-item > :first-child {
  margin-right: 6px;
}

.pagetitle{
  font-size: 1.25rem;
  font-family: SmileySans-Oblique;
}
.footer-link{
  height: 300px;
}

.footer-bar {
  background-color: var(--content-bgc);
  height: 80px;
  border-top: var(--box-border);

/*  position: fixed;*/
/*  z-index: 998;*/
  margin-top: 20px;
  width: 100%;
  width: fill-available;
  bottom: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 30px;
}


/*.logo {
  font-size: 20px;
  font-family: cursive;
  font-weight: 400;
  vertical-align: 1px;
}

.head-item.home:hover >.logo{
  display: none;
}

.homeicon {
  display: none!important;
}

.head-item.home:hover > .homeicon{
  display: inline-block!important;
}*/


</style>
