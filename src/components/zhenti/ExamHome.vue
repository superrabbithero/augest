<template>	
	 <div class="home-container">
    <div class="home-left col">
      <div class="card-content" v-for="paper in paperList">
        <div class="md-card-item">
          <div class="title"  @click="goto(paper.jsonFile)">{{paper.title}}</div>
          <div class="md-card-info">
            未完成
            <div class="date">
              4.4
            </div>
          </div>
        </div>
      </div>
      <pagination v-if="totalPages > 1" :totalPages="totalPages" @page-change="handlePageChange"></pagination>
    </div>
    <div class="home-right col">
      <div class="card-content">
        <calender ></calender>
      </div>
    </div>
  </div>
</template>

<script>
import calender from "@/components/Model/Calendar.vue"
export default {
  
  components: {
    calender
  },
  data(){
    return {
    	totalPages:0,
      paperList:[
        {title:'2022年江苏省公务员录用考试《行测》题（C类）（网友回忆版）',jsonFile:'/zhenti/2022_js_C'},
        {title:'2023年国家公务员录用考试《行测》题（副省级网友回忆版）',jsonFile:'/zhenti/2023_gk_fs'},
        {title:"2024年江苏省公务员录用考试《行测》题（A类）（网友回忆版）",jsonFile:'/zhenti/2024_js_A'},
        {title:"2024年江苏省公务员录用考试《行测》题（C类）（网友回忆版）",jsonFile:'/zhenti/2024_js_C'},
        {title:"2024年江苏省公务员录用考试《行测》题（B类）（网友回忆版）",jsonFile:'/zhenti/2024_js_B'},
        {title:"2024年国家公务员录用考试《行测》题（地市级网友回忆版）",jsonFile:'/zhenti/2024_gk_dj'},
        {title:"2024年国家公务员录用考试《行测》题（副省级网友回忆版）",jsonFile:'/zhenti/2024_gk_fs'},
        {title:"2024年国家公务员录用考试《行测》题（行政执法卷网友回忆版）",jsonFile:'/zhenti/2024_gk_zf'},
        {title:"2023年江苏省公务员录用考试《行测》题（A类）（网友回忆版）",jsonFile:'/zhenti/2023_js_A'},
        {title:"2023年江苏省公务员录用考试《行测》题（B类）（网友回忆版）",jsonFile:'/zhenti/2023_js_B'}]
    }
  },

  methods:{
    goto(path){
      this.$router.push(path)
    },
      
  }

}
</script>
<style scoped>
	
</style>