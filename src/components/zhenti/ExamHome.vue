<template>	
	 <div class="au-layout">
    <div class="rows start gutter-l">
      <div class="cols xs12 sm12 md8 lg9 xl10 list">
        <div class="card-content" v-for="paper in paperList">
          <div class="md-card-item">
            <div class="title"  @click="goto(`/zhenti/${paper.year}_${paper.prov}_${paper.type}`)">{{paper.title}}</div>
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
      <div class="cols sm-hidden md4 lg3 xl2 list">
        <div class="card-content">
          <calender ></calender>
        </div>
      </div>
    </div>
      
  </div>
</template>

<script>
import calender from "@/components/Model/Calendar.vue"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/assets/js/firebase.js";  // 引入已初始化的 storage 实例

export default {
  
  components: {
    calender
  },
  data(){
    return {
    	totalPages:0,
      paperList:[
        {title:'2022年江苏省公务员录用考试《行测》题（C类）（网友回忆版）',year:2022,prov:'js',type:'C'},
        {title:'2023年国家公务员录用考试《行测》题（副省级网友回忆版）',year:2023,prov:'gk',type:'fs'},
        {title:"2024年江苏省公务员录用考试《行测》题（A类）（网友回忆版）",year:2024,prov:'js',type:'A'},
        {title:"2024年江苏省公务员录用考试《行测》题（C类）（网友回忆版）",year:2024,prov:'js',type:'C'},
        {title:"2024年江苏省公务员录用考试《行测》题（B类）（网友回忆版）",year:2024,prov:'js',type:'B'},
        {title:"2024年国家公务员录用考试《行测》题（地市级网友回忆版）",year:2024,prov:'gk',type:'dj'},
        {title:"2024年国家公务员录用考试《行测》题（副省级网友回忆版）",year:2024,prov:'gk',type:'fs'},
        {title:"2024年国家公务员录用考试《行测》题（行政执法卷网友回忆版）",year:2024,prov:'gk',type:'zf'},
        {title:"2023年江苏省公务员录用考试《行测》题（A类）（网友回忆版）",year:2023,prov:'js',type:'A'},
        {title:"2023年江苏省公务员录用考试《行测》题（B类）（网友回忆版）",year:2023,prov:'js',type:'B'}]
    }
  },
  mounted(){
    // this.saveJson()
  },
  methods:{
    goto(path){
      this.$router.push(path)
    },
    handlePageChange(){

    },
    //firebase数据存储
    async fetchJson() {
      try {
        // 假设 JSON 文件存储在 Firestore 的一个集合中，叫做 "jsonFiles"
        const docRef = doc(db, "jsonfiles", "exampaper");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.paperList = docSnap.data().paperList;
          // this.getCurManagementData(this.currentDate)
          // console.log("Document data:", this.jsonData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    },
    async saveJson() {
      const jsonDataArray = this.paperList

      try {
        // 假设你要更新/写入 Firestore 集合中的文档
        await setDoc(doc(db, "jsonfiles", "exampaper"), { paperList:jsonDataArray });
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document:", error);
      }
    },
  }
}
</script>
<style scoped>
.list {
  flex-direction: column!important;
  align-items: normal!important;
}
</style>