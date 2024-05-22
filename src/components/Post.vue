<template>
  <div class="home-container">
    <div class="home-left">
      <div class="card-content" style="text-align: left;">
        <md-loader :mdFileName="postname"  ref="markdownRef"></md-loader>
      </div>
    </div>
    <div class="home-right">
      <div class="card-content box-fixed mobile-none">
        <div class="card-title">
          <IconWrapper  iconName="Bill" theme="outline" :strokeWidth='4' size="20" />
          <h3 style="padding:0;margin:0 5px">目 录</h3>
        </div>
        <div class="markdown-menu">
          <div v-for="(heading, index) in headingsList" :key="heading.content" :class="{'markdown-menu-item':true,'active':index === targetIndex}" @click="scrollToHeading(heading.ele)">
              {{ heading.content }}
          </div>
      </div>
      </div>
    </div>
  </div>
  
</template>

<script>

export default {
  data(){
    return {
      postname:this.$route.params.postname,
      headingsList:[],
      targetIndex:0,
      scrollHandler: this.handleScroll
    }
  },
  mounted() {
    this.postname = this.$route.params.postname
    //监听滚动=>目录
    window.addEventListener('scroll', this.scrollHandler)
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.scrollHandler); // 在离开当前路由前移除滚动事件监听器
    next(); // 继续导航
  },
  methods:{
    scrollToHeading(targetElement,index) {
      if (targetElement) {
        this.targetIndex = index
        const offset = targetElement.getBoundingClientRect().top - 61;

        // console.log(offset)

        // 滚动到目标元素
        window.scrollBy({
        top: offset, // 偏移量
        behavior: 'smooth' // 平滑滚动
        });
      }
    },
    handleScroll(){
      var that = this
      const currentScrollPos = window.scrollY
      // console.log('gundong')
      that.headingsList.forEach((heading,index) => {
        const elemTop = heading.ele.offsetTop - 100
        if (elemTop <= currentScrollPos){
          that.targetIndex = index
        }
      })
    },
  }
};
</script>

<style>



.markdown-menu-item{
  overflow: hidden;
/*  height: 28px;*/
  line-height: 28px;
  padding: 10px 10px;
  border-radius: 5px;
  filter:blur(2px);
  cursor: pointer;
  transition: font-size 0.3s ease, background-color 0.3s ease, filter 0.3s ease;
}

.markdown-menu-item.active{
  filter: blur(0);
  color: #ffc848;
  font-size: 20px;
  font-weight: 900;
}

.markdown-menu-item:hover{
  background-color: var(--box-hightlight);
  color: #ffc848;
  /* filter: blur(0); */
}

.markdown-menu:hover .markdown-menu-item {
  filter: blur(0);
}

.card-title{
  display: flex;
  font-size: 20px;
  font-family: SmileySans-Oblique;
  align-items: center
}
</style>