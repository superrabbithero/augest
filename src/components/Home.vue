<template>
  <div class="home-container">
    <div class="home-left col">
      <div class="home-title">
        <div v-if="currentTag">
          <IconWrapper  iconName="PoundSign" fill="#ffc848" theme="outline" :strokeWidth='2' size="25" />{{currentTag}} <sup>{{tagIndexJson[currentTag].length}}</sup></div>
        <div v-else style="display:flex;align-items: center;">
          <!-- <IconWrapper  iconName="DocumentFolder" fill="#ffc848" theme="outline" :strokeWidth='2' size="25" /> -->
          <svg-icon name="book01" fill="#ffc848" size="30"></svg-icon>  
          <div>文章  <sup>{{docsListJson.length}}</sup></div>
        </div>
      </div>
      <div v-for="(docfile, index) in filteredJson" class="card-content">
        <div class="md-card-item">
          <div class="title"  @click="goto(docfile.path)">{{docfile.title}}</div>
          <div class="md-card-info">
            <div class="tags">
              <div class="tags-item" @click="goTagList(tag)" v-for="tag in docfile.tags">
                <IconWrapper  iconName="PoundSign" theme="outline" :strokeWidth='2' size="16" />
                {{tag}}
              </div>
            </div>
            <div class="date">
              {{docfile.date}}
            </div>
          </div>
        </div>
      </div>
      <pagination v-if="totalPages > 1" :totalPages="totalPages" @page-change="handlePageChange"></pagination>
    </div>
    <div class="home-right col">
      <div class="card-content">
        <HealthCard></HealthCard>
      </div>
      <div class="card-content tagbox">
        <div v-for="tag in tags" :class="{'tagItem':true,'active':tag == currentTag}" @click="goTagList(tag)">{{tag}} <sup>{{tagIndexJson[tag].length}}</sup></div>
      </div>
    </div>
  </div>
</template>

<script>
import HealthCard from "./HomeComponents/HealthCard.vue"
import docsListJson from "@/assets/json/docsList.json"
import tagIndexJson from "@/assets/json/tagIndex.json"
import pagination from './Model/Pagination.vue'

export default {
  name: "Home",
  components:{
    HealthCard,
    pagination
  },
  data(){
    return {
      docsListJson,
      tagIndexJson,
      filteredJson:null,
      tags:[],
      currentTag:null,
      pageSize:10,
      keyword:null,
      totalPages:0
    }
  },
  mounted(){
    this.filteredJson = this.searchPosts().results
    this.getTagsList()
  },
  methods:{
    goto(path){
      this.$router.push(path)
    },
    handlePageChange(page){
      this.filteredJson = this.searchPosts(page).results
    },
    searchPosts(pageNumber=1){
      // 过滤出包含关键字的标题
      var pageSize = this.pageSize
      var keyword = this.keyword

      const filteredPosts = keyword ? docsListJson.filter(post => post.title.includes(keyword)) : docsListJson;

      // 计算总页数
      const totalPages = Math.ceil(filteredPosts.length / pageSize);
      this.totalPages = totalPages

      // 根据页数和每页大小计算起始索引
      const startIndex = (pageNumber - 1) * pageSize;

      // 获取当前页的数据
      const currentPageData = filteredPosts.slice(startIndex, startIndex + pageSize);

      return {
          totalPages: totalPages,
          currentPage: pageNumber,
          pageSize: pageSize,
          totalResults: filteredPosts.length,
          results: currentPageData
      };
    },
    getTagsList(){
      this.tags = Object.keys(tagIndexJson)
    },
    goTagList(tag){
      if(this.currentTag != tag){
        this.currentTag = tag
        this.filteredJson = tagIndexJson[this.currentTag]
        this.totalPages = Math.ceil(this.filteredJson.length / this.pageSize)

      }else{
        this.currentTag = null
        this.filteredJson = this.searchPosts().results
      }
      

    }
  }
}

</script>

<style>
.tagbox{
  display: flex;
  flex-wrap: wrap;
}

.tagItem{
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
  transition:background-color 0.3s ease,color 0.3s ease,
}
.tagItem:hover, .tagItem.active{
  background-color: var(--box-hightlight);
  color: #ffc848;
}
.tagItem sup{
  color: #aeaeae;
}

.md-card-info {
  display: flex;
  justify-content: space-between
}
.md-card-info .tags{
  display: flex;
}

.md-card-info .date{
  font-size: 14px;

}

.md-card-info .tags .tags-item{
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  margin: 0 5px;
  height: 16px;
  line-height: 16px;
  transition:color 0.3s ease,
}
.md-card-item .title{
  margin-left: 5px;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 24px;
  font-family: SmileySans-Oblique;
  transition:color 0.3s ease,
}

.md-card-item .title:hover,.md-card-info .tags .tags-item:hover{
  color: #ffc848;
}

.home-title{
  margin: 20px 30px 0 30px;
  font-size: 25px;
  font-family: SmileySans-Oblique;
}

.home-title sup{
  color: #888888;
}

</style>
