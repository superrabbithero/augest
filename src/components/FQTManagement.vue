<template>
  <my-model :show="modal_show.addPlanShow" modalKey="addPlanShow">
    <div class="line-content-center">
      <label>日期：</label>
      <calender language="EN" type="input" style="width: 150px;" class="form-input" v-model="management.date"></calender>
      <svg-icon :class="{'text-button':true,'action':compareDate(management.date)}" name="today" size="16" @click="getManagementDate()"></svg-icon>
      <svg-icon :class="{'text-button':true,'action':compareDate(management.date,1)}" name="tomorrow" size="16" @click="getManagementDate(1)"></svg-icon>
    </div>
    <div class="line-content-center">
      <label>期限：</label>
      <calender language="EN" type="datetime" style="width: 150px;" class="form-input" v-model="management.deadline"></calender>
      <svg-icon class="text-button" name="delete02" size="16" @click="management.deadline=null"></svg-icon>
    </div>
    <div class="line-content-center">
      <input class="form-input" type="radio" name="repeat" value="0" v-model="management.repeat"/>
      <label>不重复</label>
      <label></label>
      <input class="form-input" type="radio" name="repeat" value="1" v-model="management.repeat" checked/>
      <label>每天</label>
      <input class="form-input" type="radio" name="repeat" value="7" v-model="management.repeat"/>
      <label>每周</label>
      <input class="form-input" type="radio" name="repeat" value="30" v-model="management.repeat"/>
      <label>每月</label>
      <input class="form-input" type="radio" name="repeat" value="-1" v-model="management.repeat"/>
      <label>每年</label>
      <input class="form-input" type="radio" name="repeat" value="-2" v-model="management.repeat"/>
      <label>艾宾豪斯记忆法</label>
    </div>
    <div class="line-content-center">
      <textarea placeholder="做什么呢..." rows="5" v-model="management.content"></textarea>
    </div>
    <div class="line-content-center">
      <label>紧急</label>
      <input  type="checkbox" class="circle form-input" v-model="management.urgent" checked/>
      <label>重要</label>
      <input type="checkbox" class="circle form-input" v-model="management.important"/>
    </div>
    <div class="line-content-center left">
      <button class="fill" @click="addManagement()">{{ updateIndex ? '修改计划' : '新增计划' }}</button>
    </div>
    
  </my-model>
	<div class="card-content main-content" style="text-align: left;" ref="fqtMain">
		<div class="calendar-list">
      <svg-icon name="arrow-left"  className="date-item" @click="preWeek"></svg-icon>
			<div v-for="date in currentWeek" :key="date" class="date-item" @click="toDate(getFormattedDate(date))">  
        <div v-if="getFormattedDate(date) == getFormattedDate(today)" class="date">     
          <svg-icon name="today"></svg-icon>
        </div>
        <div v-else-if="getFormattedDate(date) == getFormattedDate(today, 1)" class="date"> 
          <svg-icon name="tomorrow"></svg-icon>
        </div>
        <div v-else-if="getFormattedDate(date) == getFormattedDate(today, -1)" class="date"> 
          <svg-icon name="yesterday"></svg-icon>
        </div>
        <div v-else class="date">
          {{date.getDate()}}
        </div>
      </div>
      <svg-icon name="arrow-right" className="date-item" @click="nextWeek"></svg-icon>
      <svg-icon name="letter-plus01" className="date-item" @click="showAddPlan()"></svg-icon>
      <svg-icon name="refresh02" class="update-icon" className="date-item" @click="getCurManagementData(currentDate)"></svg-icon>
      <svg-icon name="upload01" className="date-item" @click="saveJson"></svg-icon>
		</div>
    {{currentDate}}
    <div :class="{'quadrant-container':true,'draging':draged}">
    <div v-show="draged" :class="dragedManagementClass" ref="dragedManagement">
      <svg-icon name="dot01" size="16" className="dot" :style="dragedDotColor"></svg-icon>
      {{dragedManagement ? dragedManagement.content : ""}}
    </div>
      <div v-for="index in 4" class="quadrant-box" :id = "`quadrantList${index}`">
        <div :class="[`quadrant-list`]" @click="showAddPlan(index)">
          <div :class="[`list-item`,`item-${index-1}`]" v-for="plan in currentManagementList[index-1]" @click.stop @pointerdown="listItemDown($event,plan)">
            <div class="content" :style="{textDecoration:itemFinished(plan) ? 'line-through':'none'}">
              <svg-icon name="dot01" size="16" className="dot" :style="{color:fourColors[index-1]}"></svg-icon>
              {{plan.content}}
            </div>
            <div :id="`planIndex${plan.index}`" class="line-content-center">
              <!-- <input type="checkbox" class="circle" :style="{color:fourColors[index-1]}"> -->
              <svg-icon name="flag01" size="16" className="dot" :style="{color:fourColors[index-1]}" @click.stop @click="finishItem(plan)"></svg-icon>
              <svg-icon name="delete02" size="16" className="dot" :style="{color:fourColors[index-1]}" @click.stop @click="deleteItem(plan)"></svg-icon>
              
            </div>
          </div>
          <div v-show="false" class="list-item" style="display:flex; justify-content: center;">
            <div :class="[`list-add-button-${index-1}`]">+</div>
          </div>
        </div>
      </div>
      <div v-show="true" class="axes x">
        <div style="background-color: #F96635;">重要</div>
      </div>
      <div v-show="true" class="axes y">
        <div style="background-color: #f9A822;">紧急</div>
      </div>
        
    </div>
  </div>
</template>

<script>
import calender from "./Model/Calendar.vue"
// import managementList from "@/assets/json/managementList.json"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/assets/js/firebase.js";  // 引入已初始化的 storage 实例

export default {
  computed:{
    compareDate(){  
      return (date1,n = 0)=>{
        if(date1){
          const strList = date1.split('/')
          const a = new Date(Number(strList[0]),Number(strList[1])-1,Number(strList[2]))
          const date = new Date()
          date.setDate(date.getDate() + n)
          return `${a.getYear()}${a.getMonth()}${a.getDate()}` == `${date.getYear()}${date.getMonth()}${date.getDate()}`
        }else{
          return false
        }
      }
    },
    dragedManagementClass(){
      let classList = {
          'list-item':true,
          'draged':this.draged,
        }
      const indexList =[2,0,3,1]
      if(this.dragedManagement){
        const u = this.dragedManagement.urgent ? 1 : 0
        const i = this.dragedManagement.important ? 1 : 0
        const index = indexList[2*i+u]
        const classname = `item-${index}`
        classList[classname] = true
      }
      return classList
    },
    dragedDotColor(){
      const indexList =[2,0,3,1]
      if(this.dragedManagement){
        const u = this.dragedManagement.urgent ? 1 : 0
        const i = this.dragedManagement.important ? 1 : 0
        const index = indexList[2*i+u]
        return {color:this.fourColors[index]}
      }
    },
    itemFinished(){
      return (management)=>{
        return management.finishedDate.includes(this.currentDate)
      }
    }
  },
  components: {
    calender
  },
  data(){
    return{
      fourColors:['#f9A822','#F96635','#2bbaa5','#93d3a2'],
    	currentWeek : [],
      today : null,
      currentDate: null,
      currentManagementList:[
        [],[],[],[]
      ],
      modal_show:{
        addPlanShow:false,
      },
      management:{
        date:null,
        deadline:null,
        repeat:0,
        content:"",
        urgent:false,
        important:false,
        repeatDate:[],
        finishedDate:[]
      },
      managementList:[],
      updateIndex:null,
      dragedManagement:null,
      draged:false,
      drag2Index:null,
      pressTimer:null,
      disx:null,
      disy:null,
      ifNeedSave:false
    }
  },
  mounted(){
    this.fetchJson()
    console.log(this.managementList)
  	this.getWeekDate()
    this.toDate(this.getFormattedDate(this.today))
    // 添加监听器，当页面即将关闭时触发
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  unmounted(){
    // 移除监听器，防止内存泄漏
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  methods: {
    //计划列表点击、长按事件
    listItemDown(event , management){
      const refN = `planIndex${management.index}`
      const el =  document.getElementById(refN)
      if(el.contains(event.target)){
        return
      }
      document.addEventListener('pointerup',this.listItemUp)
      document.addEventListener('pointermove',this.listItemMove)
      this.dragedManagement = management
      this.pressTimer = setTimeout(() => {
          this.draged = true
          const el = event.target
          this.disx = event.pageX - el.offsetLeft
          this.disy = event.pageY - el.offsetTop
          const dragedEl = this.$refs.dragedManagement
          // dragedEl.style.backgroundColor = this.myColors[this.dragedColorIndex]
          dragedEl.style.left = `${event.pageX - this.disx}px`
          dragedEl.style.top = `${event.pageY - this.disy}px`
          // document.addEventListener("click",this.offColorToolsEdit)
          clearTimeout(this.pressTimer)
          this.pressTimer = null
        }, 500);
    },
    listItemMove(){
      if(this.draged){
        const el4th = document.getElementById(`quadrantList4`).getBoundingClientRect()
        const left = el4th.left
        const top = el4th.top
        // event.pageX
        let index = 4
        if(event.clientX < left){
          if(event.clientY < top){
            index = 1
          }else{
            index = 3
          }
        }else if(event.clientY < top){
          index = 2
        }
        this.drag2Index = index
        const dragedEl = this.$refs.dragedManagement
        dragedEl.style.left = `${event.pageX - this.disx}px`
        dragedEl.style.top = `${event.pageY - this.disy}px`
      }
    },
    listItemUp(event){
      if (this.pressTimer) {
        //如果计时器还在说明是点击事件
        clearTimeout(this.pressTimer);
        this.showAddPlan(this.dragedManagement)
        this.updateIndex = this.dragedManagement.index
        this.dragedManagement = null
      }
      if(this.dragedManagement != null){
        //修改紧急重要程度
        switch(this.drag2Index){
          case 1:
            this.dragedManagement.urgent = true
            this.dragedManagement.important = false
            break
          case 2:
            this.dragedManagement.urgent = true
            this.dragedManagement.important = true
            break
          case 3:
            this.dragedManagement.urgent = false
            this.dragedManagement.important = false
            break
          case 4:
            this.dragedManagement.urgent = false
            this.dragedManagement.important = true
            break
        }
        // console.log(this.dragedManagement.index)
        this.updateManagement(this.dragedManagement)
      }
      this.draged = false
      this.dragedManagement = null
      this.drag2Index = null
      this.getCurManagementData(this.currentDate)
      document.removeEventListener('pointerup',this.listItemUp)
      document.removeEventListener('pointermove',this.listItemMove)
    },
    deleteItem(management){
      this.deleteManagement(management)
      this.getCurManagementData(this.currentDate)
    },
    finishItem(management){
      // console.log(management.finishedDate,this.currentDate)
      let index = null
      management.finishedDate.forEach((date,i)=>{
        if(this.currentDate == date){
          index = i
          return
        }
      })
      console.log(index)
      if(index == null){
        management.finishedDate.push(this.currentDate)
      }else{
        management.finishedDate.splice(index,1)
      }
      this.updateManagement(management)
      this.getCurManagementData(this.currentDate)
    },
    updateManagement(management){
      const index = management.index
      delete management.index
      this.managementList[index] = management
      this.ifNeedSave = true
    },
    deleteManagement(management){
      const index = management.index
      this.managementList.splice(index,1)
      this.ifNeedSave = true
    },
    toDate(date){
      this.getCurManagementData(date)
      this.currentDate = date
    },
    compare2Date(date1,date2){
        const a = new Date(date1.split("T")[0])
        const b = new Date(date2.split("T")[0])

        const time1 = a.getTime();
        const time2 = b.getTime();
        if (time1 < time2) {
          return -1;
        } else if (time1 > time2) {
          return 1;
        } else {
          return 0;
        }
    },
    daysBetween(date1, date2) {
      let strList = date1.split('/')
      const a = new Date(Number(strList[0]),Number(strList[1])-1,Number(strList[2]))
      strList = date2.split('/')
      const b = new Date(Number(strList[0]),Number(strList[1])-1,Number(strList[2]))
      const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
      return Math.round(Math.abs((a - b) / oneDay));
    },
    getCurManagementData(date){
      this.currentManagementList = [[],[],[],[]]
      this.managementList.forEach(((management, index)=>{
        if(this.compare2Date(date,management.date) == 0){
          this.pushCurManagement(index, management)
        }else if(this.compare2Date(date,management.date) == 1){
          const repeat = Number(management.repeat)
          if(repeat > 0 && this.daysBetween(date,management.date)%repeat == 0){
            this.pushCurManagement(index, management)
          }else if(repeat == -1){
            if(date.split("/")[1] == management.date.split("/")[1] && date.split("/")[2] == management.date.split("/")[2]){
              this.pushCurManagement(index, management)
            }
          }else if(repeat == -2){
            if(management.repeatDate.includes(date)){
              this.pushCurManagement(index, management)
            }
          }
        }
      }))
    },
    pushCurManagement(index, management){
      const indexList =[2,0,3,1]
      const u = management.urgent ? 1 : 0
      const i = management.important ? 1 : 0
      management.index = index
      this.currentManagementList[indexList[2*i+u]].push(management)
    },
    getDate(strDate){
      const strList = strDate.split('/')
      const date = new Date(Number(strList[0]),Number(strList[1])-1,Number(strList[2]))
      return date
    },
    getFormattedDate(date, n=null) {
      const today = new Date(date);
      if(n){
        today.setDate(today.getDate() + n)
      }
      const year = today.getFullYear();
      const month = today.getMonth() + 1; // 月份从0开始，需要加1
      const day = today.getDate();

      return `${year}/${month}/${day}`;
    },
    initManagementDate(){
      this.updateIndex = null
      this.management = {
        date:null,
        deadline:null,
        repeat:0,
        content:"",
        urgent:false,
        important:false,
        repeatDate:[],
        finishedDate:[]
      }
    },
    addManagement(){
      const data = this.management
      if(data.date && data.content){
        if(data.repeat == -2){
          const date = this.getDate(data.date)
          const repeatList = [0,1,3,7,14,29,59]
          data.repeatDate = []
          repeatList.forEach((n)=>{
            data.repeatDate.push(this.getFormattedDate(date,n))
          })
        }
        if(this.updateIndex){
          this.managementList[this.updateIndex] = this.management
          this.$toast.show('修改成功','success')
          this.updateIndex = null
          this.modal_show.addPlanShow = false 

        }else{
          this.managementList.push(this.management)
          this.$toast.show('添加成功','success')
          this.modal_show.addPlanShow = false 
        }
       
      }else{
        this.$toast.show('时间或内容不得为空','error') 
      }
      console.log(this.managementList)
      this.ifNeedSave = true
    },
    getManagementDate(n = 0){
      const date = new Date()
      date.setDate(date.getDate() + n)

      this.management.date = `${date.getYear()+1900}/${(date.getMonth()+1)>10?'':0}${date.getMonth()+1}/${date.getDate()>10?'':0}${date.getDate()}`;
    },
    showAddPlan(management=null){
      if(this.draged){
        return
      }
      // console.log(management)
      if(management==null){
        this.initManagementDate()
      }else if([1,2,3,4].includes(management)){
        this.initManagementDate()
        switch(management){
          case 1:
            this.management.urgent = true
            this.management.important = false
            break
          case 2:
            this.management.urgent = true
            this.management.important = true
            break
          case 3:
            this.management.urgent = false
            this.management.important = false
            break
          case 4:
            this.management.urgent = false
            this.management.important = true
            break
        }
      }else{
        this.management = management
      }
      this.modal_show.addPlanShow = true
    },
    preWeek(){
      const firstDay = new Date(this.currentWeek[0])
      firstDay.setDate(firstDay.getDate() - 7)
      this.getWeekDate(firstDay)
    },
    nextWeek(){
      const firstDay = new Date(this.currentWeek[0])
      firstDay.setDate(firstDay.getDate() + 7)
      this.getWeekDate(firstDay)
    },
   
    getWeekDate(firstDay = null){
      const getDateNDaysAgo = (date, n) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - n);
        return newDate;
      }
      this.today = new Date()
      firstDay = firstDay ? new Date(firstDay) : getDateNDaysAgo(this.today, this.today.getDay())
      for(var i=0; i<7 ; i++){
        this.currentWeek[i] = getDateNDaysAgo(firstDay, -i)
      }
    },
    //firebase数据存储
    async fetchJson() {
      try {
        // 假设 JSON 文件存储在 Firestore 的一个集合中，叫做 "jsonFiles"
        const docRef = doc(db, "jsonfiles", "managementjson");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.managementList = docSnap.data().tasks;
          this.getCurManagementData(this.currentDate)
          console.log("Document data:", this.jsonData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    },
    async saveJson() {
      const jsonDataArray = this.managementList

      try {
        // 假设你要更新/写入 Firestore 集合中的文档
        await setDoc(doc(db, "jsonfiles", "managementjson"), { tasks:jsonDataArray });
        this.ifNeedSave = false
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document:", error);
      }
    },
    handleBeforeUnload(event){
      if(this.ifNeedSave){
        // 在这里你可以处理关闭标签页时的逻辑，例如保存状态或提示用户
        const confirmationMessage = "你有未保存的更改，是否保存并离开";

        // 设置这个消息会让浏览器显示一个确认对话框
        event.returnValue = confirmationMessage;  // 标准兼容做法
        return confirmationMessage;  // 对某些旧版浏览器的支持
      }
    },
    confirmLeave(to, from, next) {
      if (this.ifNeedSave) {
        const answer = window.confirm("你有未保存的更改，确定要离开吗？");
        if (answer) {
          next(); // 允许导航离开
        } else {
          next(false); // 阻止导航
        }
      } else {
        next(); // 如果没有未保存的更改，直接离开
      }
    }

  },
  beforeRouteLeave(to, from, next) {
    this.confirmLeave(to, from, next);
  }
};
</script>

<style>
.main-content{
/*	width: calc(100% - 80px);*/
	height: calc(100vh - 120px);
}

.calendar-list {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none
}

.date-item {
  width: 35px;
  height: 35px;
  display: flex;
	align-items: center;
  justify-content: center;
  flex-direction: column;
  
  font-size: 12px;
}

.quadrant-container {
  width: 100%;
  height: calc(100% - 35px);
  display: flex;
  flex-wrap: wrap;
  position: relative;
  user-select: none;
}
.quadrant-container.draging {
/*  opacity: 0.5;*/
/*  pointer-events: none;*/
  user-select: none;
}
.quadrant-box {
  box-sizing: border-box;
  width: 50%;
  height: 50%;
  padding: 10px;
/*  border: var(--box-border);*/
}
.quadrant-list {
  height: calc( 100% - 12px);
  padding: 5px;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  touch-action: none;
}

.quadrant-list.item-0:active {
  outline: 2px solid #f9A82230;
}
.quadrant-list.item-1:active {
  outline: 2px solid #F9663530;
}
.quadrant-list.item-2:active {
  outline: 2px solid #2bbaa530;
}
.quadrant-list.item-3:active {
  outline: 2px solid #93d3a230;
}



.quadrant-container .list-item{
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between
}  



.list-add-button-0 {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid #f9A822;
  color: #f9A822;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
.axes{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
/*  background-color: var(--fontNormal);*/
  display: flex;
}
/*#f9A822','#F96635','#2bbaa5','#93d3a2'*/
.axes.x{
  height: 3px;
  width: calc(100% - 10px);
  flex-direction: row-reverse;
  align-items: center;
  background: linear-gradient(90deg, #0000,#F96635)
}
.axes.y{
  height: calc(100% - 20px);
  width: 3px;
  justify-content: center;
  background: linear-gradient(0deg, #0000 , #f9A822)
}

.axes div{
  width: fit-content;
  height: fit-content;
  color: #fff;
  border-radius: 4px;
  padding: 0px 4px 2px 4px;
}

.line-content-center{
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.line-content-center.left{
  justify-content: end;
}

.line-content-center label{
  height: 20px;
  line-height: 20px;
}

.line-content-center textarea {
  width: 100%;
}

.form-input {
  margin-left: 10px;
  margin-right: 10px;
}

.text-button{
  margin:0 10px;
}

.text-button.action{
  color: var(--main-color);
}

@media(any-hover:hover){
  .text-button:hover{
    color: var(--main-color);
  }

  .quadrant-container .list-item.item-0:hover{
    background-color: #f9A82230;
  }  
  .quadrant-container .list-item.item-1:hover{
    background-color: #F9663530;
  }  
  .quadrant-container .list-item.item-2:hover{
    background-color: #2bbaa530;
  }  
  .quadrant-container .list-item.item-3:hover{
    background-color: #93d3a230;
  }  
}

.list-item.draged {
  position: absolute;
  pointer-events: none;
}

.list-item.draged.item-0{
  background-color: #f9A82230;
}  
.list-item.draged.item-1{
  background-color: #F9663530;
}  
.list-item.draged.item-2{
  background-color: #2bbaa530;
}  
.list-item.draged.item-3{
  background-color: #93d3a230;
}  

.update-icon{
  transition: transform 1s;

}

.update-icon:active{
  transform: rotate(-360deg);
  transition: transform 0s;
}

</style>