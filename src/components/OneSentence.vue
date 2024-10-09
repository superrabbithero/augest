<template>
  <div class="waterfall-container" @scroll="handleScroll" ref="container" :style="{margin:'0 -7px',height:containerHeight+'px'}" >
    <div v-for="(sentence, index) in items" 
      class="waterfall-item" 
      :key="index"
      ref="items" 
      :style="{top: sentence.top+'px',left:sentence.left+'px'}">
      <div class="sentence-card">
        <div class="content">
          {{sentence.content}}
        </div>
        <div class="from">
          ——{{sentence.from}} {{sentence.by}}
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="finished" class="finished">已加载全部内容</div>
  </div>
</template>

<script>
import sentences from "@/assets/json/sentences.json"
import _ from 'lodash';

export default {
  data(){
    return{
      sentences: sentences.sentences,

      items: [],  // 当前加载的数据项
      page: 1,  // 当前页码
      limit: 15,  // 每次加载的数量
      loading: false,  // 是否在加载中
      finished: false,  // 是否加载完所有数据

      columnHeights:[],
      columnWidth:300,
      columnCount:0,
      containerHeight:0
    }
  },
  mounted(){
    this.loadMore()
    // this.$nextTick(this.calculateLayout);
    window.addEventListener("resize", this.calculateLayout);
    document.addEventListener("scroll", this.handleScroll);
  },
  unmounted(){
    window.removeEventListener("resize", this.calculateLayout);
    document.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 使用 lodash 节流

    handleScroll: _.throttle(function() {
      // 滚动事件逻辑
    }, 300),
    calculateLayout() {
      this.columnWidth = this.$refs.items[0].offsetWidth-1
      const containerWidth = this.$refs.items[0].offsetParent.offsetWidth;
      this.columnCount = Math.floor(containerWidth / this.columnWidth);
      this.columnHeights = Array(this.columnCount).fill(0);

      this.items.forEach((sentence, index) => {
        const minHeight = Math.min(...this.columnHeights);
        const minIndex = this.columnHeights.indexOf(minHeight);

        this.items[index] = {
          ...sentence,
          top: minHeight+14,
          left: minIndex * this.columnWidth,
        };

        const itemHeight = this.$refs.items[index].offsetHeight;
        this.columnHeights[minIndex] += itemHeight+14;
      });
      this.containerHeight = Math.max(...this.columnHeights);
    },
    // 加载数据
    loadMore() {
      if (this.loading || this.finished) return;

      this.loading = true;

      // 模拟异步数据请求
      setTimeout(() => {
        const start = (this.page - 1) * this.limit;
        const end = this.page * this.limit;
        const newItems = this.sentences.slice(start, end);

        if (newItems.length > 0) {
          this.items.push(...newItems); // 将新加载的项目添加到现有 items 中
          this.page++;

          // 等待下一次 DOM 更新后计算布局
          this.$nextTick(() => {
            this.calculateLayout();
          });
        }

        // 如果加载的数据少于每页的 limit，说明数据加载完了
        if (newItems.length < this.limit || end >= this.sentences.length) {
          this.finished = true;
        }

        this.loading = false;
      }, 1000);  // 模拟加载时间
    },
    // 滚动事件处理
    handleScroll() {
      const container = this.$refs.container;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;

      console.log("监听handleScroll")

      // 检查是否接近底部 (容差设置为20px)
      if (scrollTop + containerHeight >= scrollHeight - 20) {
        this.loadMore();
      }
    },
  }
};
</script>

<style scoped>
.waterfall-container{
  position: relative;
}



.gallery {
  column-count:3;
  column-gap: 10px;
}

.waterfall-item {
  box-sizing: border-box;
  position: absolute;
  padding: 0 7px;
}

.sentence-card {
  width: 100%;
  background-color: var(--box-bgc);
  padding: 1rem;
  border: var(--box-border);
  border-radius: 8px;
  box-sizing: border-box;
}
.sentence-card .content{
  font-family: SmileySans-Oblique;
}
.sentence-card .from{
  margin-top: 0.8rem;
  text-align: end;
  font-size: 0.9rem;
}
/*xs<768*/
 @media (max-width: 500px){.waterfall-item{width: 100%;}} 
/*sm>=768px*/
 @media (min-width: 500px) {.waterfall-item{width: 50%;}} 
/*md>=992px*/
 @media (min-width: 768px) {.waterfall-item{width: 33.33%;}} 
/*lg>=1200px*/
 @media (min-width: 1200px) {.waterfall-item{width: 25%;}} 
/*xl>=1920px*/
/* @media (min-width: 1920px) {.sentence-card{width: 25%;}} */

.loading {
  position: absolute;
  bottom: 0;
  text-align: center;
  padding: 16px;
}
.finished {
  position: absolute;
  bottom: 0;
  text-align: center;
  padding: 16px;
  color: #888;
}
</style>