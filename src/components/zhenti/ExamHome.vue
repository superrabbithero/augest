<template>	
	 <div class="au-layout">
    <div class="rows start gutter-l">
      <div class="cols xs12 sm12 md8 lg9 xl10 list">
        <div class='filter-content'>
          <au-select class='filter-select' :dataList="years" @change="changeYear"></au-select>
          <au-select class='filter-select' :dataList="Object.keys(paperType)" @change="changeProv"></au-select>
          <au-select class='filter-select' :dataList="paperType[filterParam.prov]" @change="changeType"></au-select>
        </div>
        <div class="card-content" v-for="paper in filteredPaperList">
          <div class="md-card-item">
            <div class="title"  @click="goto(`/zhenti/${paper.year}_${paper.prov}_${paper.type}`)">{{paper.title}}</div>
            <div class="md-card-info">
              <div v-if="paper.finished" class="tag analysis" @click="goto(`/zhenti/analysis/${paper.year}_${paper.prov}_${paper.type}`)">查看解析</div>
              <div v-else class="tag"></div>
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
import auSelect from "@/components/Model/auSelect.vue"

export default {
  
  components: {
    calender,
    auSelect
  },
  data(){
    return {
    	totalPages:0,
      paperList:[
        {title:'2022年江苏省公务员录用考试《行测》题（C类）（网友回忆版）',year:2022,prov:'js',type:'C'},
        {title:'2023年国家公务员录用考试《行测》题（副省级网友回忆版）',year:2023,prov:'gk',type:'fs'},
        {title:"2024年江苏省公务员录用考试《行测》题（A类）（网友回忆版）",year:2024,prov:'js',type:'A'},
        {title:"2024年江苏省公务员录用考试《行测》题（C类）（网友回忆版）",year:2024,prov:'js',type:'C',time:[-1,2400,-1,3452,2080],finished:true},
        {title:"2024年江苏省公务员录用考试《行测》题（B类）（网友回忆版）",year:2024,prov:'js',type:'B'},
        {title:"2024年国家公务员录用考试《行测》题（地市级网友回忆版）",year:2024,prov:'gk',type:'dj'},
        {title:"2024年国家公务员录用考试《行测》题（副省级网友回忆版）",year:2024,prov:'gk',type:'fs'},
        {title:"2024年国家公务员录用考试《行测》题（行政执法卷网友回忆版）",year:2024,prov:'gk',type:'zf',finished:true},
        {title:"2023年江苏省公务员录用考试《行测》题（A类）（网友回忆版）",year:2023,prov:'js',type:'A'},
        {title:"2023年江苏省公务员录用考试《行测》题（B类）（网友回忆版）",year:2023,prov:'js',type:'B'},
        {title:"2023年国家公务员录用考试《行测》题（行政执法卷网友回忆版）",year:2023,prov:'gk',type:'zf',finished:true},
        {title:"2022年国家公务员录用考试《行测》题（行政执法卷网友回忆版）",year:2022,prov:'gk',type:'zf',finished:true}],

      paperType:{'全部':['全部'],'国考':['全部','副省级','地市级','行政执法'],'江苏省考':['全部','A类','B类','C类']},
      years:['全部',2022,2023,2024],
      filterMap:{'国考':'gk','江苏省考':'js','副省级':'fs','地市级':'dj','行政执法':'zf','A类':'A','B类':'B','C类':'C'},
      filterParam:{year:'全部',prov:'全部',type:'全部'},
      filteredPaperList:[]
    }
  },
  mounted(){
    this.paperList.sort((a, b) => {
      // 先按照年份倒序排序
      if (b.year !== a.year) {
          return b.year - a.year;
      }
      // 再按照prov的字母顺序排序
      let provComparison = a.prov.localeCompare(b.prov);
      if (provComparison !== 0) {
          return provComparison;
      }
      // 最后按照type的字母顺序排序
      return a.type.localeCompare(b.type);
    });
    this.filteredPaperList = this.paperList
  },
  methods:{
    changeYear(index){
      this.filterParam.year = this.years[index]
      this.filterPaperList()
    },
    changeProv(index){
      this.filterParam.prov = Object.keys(this.paperType)[index]
      this.filterPaperList()
    },
    changeType(index){
      this.filterParam.type = this.paperType[this.filterParam.prov][index]
      this.filterPaperList()
    },
    filterPaperList() {
      const year = this.filterParam.year != '全部' ? this.filterParam.year : null
      const prov = this.filterParam.prov != '全部' ? this.filterMap[this.filterParam.prov] : null
      const type = this.filterParam.type != '全部' ? this.filterMap[this.filterParam.type] : null
      console.log(year,prov,type)
      this.filteredPaperList = this.paperList.filter(paper => {
            // 如果year存在，筛选year相等的
        const matchYear = year ? paper.year === year : true;
            // 如果prov存在，筛选prov相等的
        const matchProv = prov ? paper.prov === prov : true;
            // 如果type存在，筛选type相等的
        const matchType = type ? paper.type === type : true;
            // 只有当所有条件都满足时，才保留该项
        return matchYear && matchProv && matchType;
      });
    },
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

.tag {
  font-size: 14px;
  height: 20px;
  /* border: 1px solid; */
  padding:2px 5px;
  line-height: 20px;
  font-weight: 100;
  border-radius: 3px;
/*  box-sizing: border-box;*/

}

.tag.analysis{
  cursor: pointer;
  background-color: #93d3a230;
}

.tag.analysis:hover{
  background-color: #93d3a250;
}

.filter-content {
  display: flex;
  margin-top: 10px;
}

.filter-select {
  background-color: var(--box-bgc);
  width: 100px;
  margin-right: 10px;
}
</style>