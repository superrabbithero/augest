<template>
  <div class="au-layout">
    <div class="rows start gutter-l">
      <div class="cols sm12 md8 lg9 xl10 list">
        <div class="home-title">
          <div v-if="currentTag">
            <svg-icon name="letter-hashtag01" size="25" fill="#ffc848"></svg-icon>{{currentTag}} <sup>{{tagIndexJson[currentTag].length}}</sup></div>
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
                  <svg-icon name="letter-hashtag01" size="16" fill="#ffc848"></svg-icon>
                  {{tag}}
                </div>
              </div>
              <div class="date">
                {{formatDate(docfile.date)}}
              </div>
            </div>
          </div>
        </div>
        <pagination v-if="totalPages > 1" :totalPages="totalPages" @page-change="handlePageChange"></pagination>
      </div>
      <div class="cols sm12 md4 lg3 xl2 list">
        <div class="card-content" style="align-items: center;">
          <div class="card-item">
            <div class="avatar">
              <img src="@/assets/imgs/avatar.webp">
            </div>
          </div>
          <div class="one-sentence" @click="getRandomSentence">
            {{sentence.content}}
          </div>
        </div>
        <div class="card-content">
          <HealthCard></HealthCard>
        </div>
        <div class="card-content tagbox" style="flex-direction: row;">
          <div v-for="tag in tags" :class="{'tagItem':true,'active':tag == currentTag}" @click="goTagList(tag)">{{tag}} <sup>{{tagIndexJson[tag].length}}</sup></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HealthCard from "./HomeComponents/HealthCard.vue"
import docsListJson from "@/assets/json/docsList.json"
import tagIndexJson from "@/assets/json/tagIndex.json"
import pagination from './Model/Pagination.vue'
import sentences from "@/assets/json/sentences.json"

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
      totalPages:0,
      today:null,
      sentence:"一句话"
    }
  },
  computed:{
    formatDate(){
      return (datetimeStr)=>{
        console.log(datetimeStr)
        const date = new Date(datetimeStr)
        if(date.getFullYear() === this.today.getFullYear){
          const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
          return formattedDate
        }else{
          const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          return formattedDate
        }
      }
    }
  },
  mounted(){
    this.filteredJson = this.searchPosts().results
    this.getTagsList()
    this.today = new Date()
    this.getRandomSentence()
  },
  methods:{
    getRandomSentence(){
      let index = Math.floor(Math.random()*sentences.sentences.length)
      while(this.sentence === sentences.sentences[index]){
        index = Math.floor(Math.random()*sentences.sentences.length)
      }
      this.sentence = sentences.sentences[index]
    },
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
  justify-content: space-between;
  margin-top: 10px;
}
.md-card-info .tags{
  display: flex;
}

.md-card-info .date{
  display: flex;
  align-items: center;
  font-size: 16px;
  height: 16px;
  line-height: 16px;
  color: #ffc848a6;
  font-family: GoodfonT-NET-XS04;
}

.md-card-info .tags .tags-item{
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
  height: 16px;
  line-height: 16px;
  transition:color 0.3s ease,
}
.md-card-item .title{
  /*margin-left: 5px;
  margin-bottom: 8px;*/
  cursor: pointer;
  display: inline-block;
  font-size: 1.3rem;
  font-family: SmileySans-Oblique;
  transition: color 0.3s ease;
}

.md-card-item .title:hover, .md-card-info .tags .tags-item:hover{
  color: #ffc848;
}

.home-title{
  margin-top: 20px;
  font-size: 25px;
  font-family: SmileySans-Oblique;
}

.home-title sup{
  color: #888888;
}

.list {
  flex-direction: column!important;
  align-items: normal!important;
}
.card-item {
  display: flex;
  justify-content: center;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
}
.avatar img{
  position: absolute;
  max-width: 200%;
  width: 180px;
  left: -60px;
  top:0;
}

.one-sentence{
  max-height: 10px;
  margin: 0.5rem 0;
  max-width: 80%;
  width: fit-content;
  text-align: center;
  padding: 10px 12px;
  font-size: 14px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: 0.5s;
  border-bottom: 2px solid #ffc848;
}

.one-sentence:hover{
  border-radius: 8px;
  background-color: #ffc848;
  white-space: normal;
  max-height: 50px;
}

</style>
