<template>
  <div class="au-resize">
    <div class="left">
      <div class="post-content" style="text-align: left;">
        <md-loader :mdFileName="postname"  ref="markdownRef"></md-loader>
      </div>
    </div>
    <div class="right">
      <!-- <div class="card-content box-fixed mobile-none"> -->
      <div class="menu-content">
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

<style scoped>


.markdown-menu-item{
  overflow: hidden;
/*  height: 28px;*/
  line-height: 28px;
  padding: 10px 10px;
  border-radius: 5px;
  filter:blur(2px);
  cursor: pointer;
  transition: font-size 0.3s ease, background-color 0.3s ease, filter 0.3s ease;
  white-space: nowrap;
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

.post-content, .menu-content{
  padding: 10px 10px;
  margin-top: 10px;
  background-color: var(--box-bgc);
  border: var(--box-border);
  border-radius: 12px;
}

.menu-content {
  box-sizing: border-box;
  position: sticky;
  top: 70px;
}

.au-resize {
/*    touch-action: none;*/
    margin:0;
    height: 100%;
    display: flex;
  }
  .au-resize >*{
    white-space: wrap;
  }
  .au-resize .left,.au-resize .right{
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .au-resize .left {
    width: 75%; /* 初始宽度 */
    flex: 0 0 auto; /* 左侧宽度固定 */
    transition: 0.5s;
  }

  .au-resize .right {
    flex: 1;
    margin-left: 10px;
    transition: 0.5s;
  }

  @media (max-width: 1200px){
    .au-resize .left {
      width: 100%; /* 初始宽度 */
      flex: 0 0 auto; /* 左侧宽度固定 */
      transition: 0.5s;
    }
    .au-resize .right {
      flex: 1;
      width: 0px;
      margin-left: 10px;
      transition: 0.5s;
      overflow: hidden;
    }

  }

</style>