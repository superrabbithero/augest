<template>
  <div class="au-container">
    <div class="au-header header clipdemo" v-if="!$route.meta.headerHidden">
      <!-- <div class="head-list"> -->
        <transition name="fade-slide">
          <div class="menu" v-if="menuisshow" ref="menu">
            <div class="menu-list">
              <div class="menu-list-title">工具</div>
              <div class="menu-item" @click="goto('/tools/bulidanswersheet')">
                <svg-icon name="file-pdf01"></svg-icon>
                答题卡生成
              </div>
              <div class="menu-item" @click="goto('/minigames')">
                <!-- <IconWrapper iconName="GameThree" theme="outline" :strokeWidth='2' /> -->
                <svg-icon name="game01"></svg-icon>
                小游戏
              </div>
              <div class="menu-item" @click="goto('/examhome')">
                <!-- <IconWrapper iconName="Pyramid" theme="outline" :strokeWidth='2' /> -->
                <svg-icon name="exams02" style="color:red"></svg-icon>
                考试模拟器
              </div>
              <div class="menu-item" @click="goto('/pixelSvgEditor')">
                <svg-icon name="art01"></svg-icon>
                像素编辑器
              </div>
              <div class="menu-item" @click="goto('/myPixelIcons')">
                <svg-icon name="pixIcon02"></svg-icon>
                我的像素图标
              </div>
              <div class="menu-item" @click="goto('/FQTManagement')">
                <svg-icon name="4quadrant02" ></svg-icon>
                四象限
              </div>
              <div class="menu-item" @click="goto('/myTools')">
                <svg-icon name="toolkit01" ></svg-icon>
                常用工具
              </div>
              <div class="menu-item" >
                <svg-icon name="roadblock11" />
                待定...
              </div>
            </div>
          </div>
        </transition>
        <div class="head-item"  @click="openmenu" id="menuicon">
          <!-- <IconWrapper iconName="ApplicationTwo" theme="filled" :strokeWidth='2' /> -->
          <svg-icon name="menu01"></svg-icon>
        </div>
        <div class="head-item home" @click="goto('/')">
          <svg-icon name="home01"></svg-icon>
        </div>
        <div class="head-item"  style="margin-left: auto;">
          <div class="pagetitle">{{$route.meta.title?$route.meta.title:decodeURIComponent($route.path).slice(6)}}</div>
        </div>
        <div class="head-item" @click="changeStyle" style="margin-left: auto;">
          <!-- <IconWrapper iconName="DarkMode" theme="outline" :strokeWidth='4' /> -->
          <svg-icon name="dark"></svg-icon>
        </div>  
      <!-- </div> -->
      
    </div>
    <div class="au-main">
      <div class="header-block" v-if="!$route.meta.headerBlockHidden"></div>
      <router-view @toggle-header="setHeaderVisibility"></router-view>
    </div>
    <div v-if="!$route.meta.footerHidden" class="au-footer footer" >
      <div class="footer-link">
      </div>
      <div class="footer-bar">
        <div>©2023 - 2024 By SuperRabbitHero</div>
        <div>
          <svg-icon name="helloworld" size=35 @click="goto('/helloworld')"></svg-icon>
          <svg-icon name="list01" @click="goto('/post/更新文档')"></svg-icon>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import IconWrapper from './components/IconWrapper.vue';

export default {
  name: 'App',
  data(){
    return{
      menuisshow:false,
      isDark:false,
      pagetitle:''
    }
  },
  components: {
    IconWrapper
  },
  mounted() {
    document.addEventListener("touchstart",function() {},false)
    
    if(localStorage.getItem('isDark')){
      this.$constants.DARK = localStorage.getItem('isDark')==='false' ? false :true
    }else{
      localStorage.setItem('isDark',this.$constants.DARK)
    }
    if(this.$constants.DARK){
      document.body.classList.add('dark')//黑夜模式时添加类名
    }
    if (process.env.NODE_ENV === 'production') {
      console.log('当前是生产环境');
    } else {
        console.log('当前是开发环境');
    }
  },
  unmounted() {
    document.removeEventListener('click',this.closemenu)
  },
  methods:{
    setHeaderVisibility(visible){
      this.headerShow = visible;
    },
    goto(path){
      this.$router.push(path)
      this.menuisshow = false
      document.documentElement.scrollTop = 0
      document.removeEventListener('click',this.closemenu)
    },
    openmenu() {
      if(!this.menuisshow){
        this.menuisshow = true
        document.addEventListener('click',this.closemenu);
      }else{
        this.menuisshow = false
        document.removeEventListener('click',this.closemenu)
      }
      
    },
    closemenu(e){
      const md = document.getElementById('menuicon')
      if(!md.contains(e.target) && !this.$refs.menu.contains(e.target)){
        if(this.menuisshow == true){
          this.menuisshow = false
          document.removeEventListener('click',this.closemenu)
        }
      }
    },

    async changeStyle(){
      this.$constants.DARK = !this.$constants.DARK//点击切换模式
      localStorage.setItem('isDark',this.$constants.DARK)
      if(this.$constants.DARK){
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
@import url('@/assets/css/hljs-atom-one.css');


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: var(--content-bgc);
  color: var(--icon-color);
  height: 100vh;
  /*display: flex;
  flex-direction: column;
  justify-content: space-between;*/
}



.header {
/*  background-color: var(--content-bgc);*/
  height: 60px;
  border-bottom: var(--box-border);
  position: fixed;
  z-index: 998;
  box-sizing: border-box;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: start;
  align-items: center;
}

.header.clipdemo{
  background-image: radial-gradient(transparent 1px, var(--content-bgc) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}

.head-list {
  width: 100%;
}



.head-item {
  display: inline-block;
  margin-right: 5px;
}

.header .head-item:last-child {
  margin-right: 0;
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
.footer {
  width: 100%;
}

.footer-link{
/*  height: 300px;*/
}

.footer-bar {
  background-color: var(--content-bgc);
  height: 80px;
  border-top: var(--box-border);

/*  position: fixed;*/
/*  z-index: 998;*/
/*  margin-top: 20px;*/
  width: 100%;
  width: fill-available;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bar > div:nth-child(2) > *{
  cursor: pointer;
  margin-left: 5px;
}
.footer-bar > div > *:hover{
  color:#ffc848;
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

code{
  border-radius: 5px;
}



</style>
