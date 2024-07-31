<template>
  <my-model :show="modal_show.addPlanShow" modalKey="addPlanShow">
    <div class="line-content-center">
      <label>日期：</label>
      <calender language="EN" type="input" style="width: 150px;" class="form-input" v-model="management.date"></calender>
      <svg-icon :class="{'text-button':true,'action':compareDate(management.date)}" name="today" size="16" @click="getManagementDate()"></svg-icon>
      <svg-icon :class="{'text-button':true,'action':compareDate(management.date,1)}" name="tomorrow" size="16" @click="getManagementDate(1)"></svg-icon>
    </div>
    <div class="line-content-center">
      <label>截止时间:</label>
      <input type="datetime-local" style="width:150px" v-model="management.deadline"/>
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
      <button class="fill" @click="addManagement()">确定</button>
    </div>
    
  </my-model>
	<div class="card-content main-content" style="text-align: left;">
		<div class="calendar-list">
      <svg-icon name="arrow-left"  className="date-item" @click="preWeek"></svg-icon>
			<div v-for="date in currentWeek" :key="date" class="date-item">  
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
      <svg-icon name="plus01" className="date-item" @click="showAddPlan()"></svg-icon>
		</div>
    <div class="quadrant-container">
      <div v-for="index in 4" class="quadrant-box">
        <div class="quadrant-list" >
          <div :class="[`list-item`,`item-${index-1}`]" v-for="plan in currentManagementList[index-1]">
            <svg-icon name="dot01" size="16" className="dot" :style="{color:fourColors[index-1]}"></svg-icon>
            {{plan}}
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

export default {
  computed:{
    compareDate(){
        return (date1,n = 0)=>{
          if(date1){
            const strList = date1.split('/')
            const a = new Date(strList[0],Number(strList[1])-1,strList[2])
            const date = new Date()
            date.setDate(date.getDate() + n)
            return `${a.getYear()}${a.getMonth()}${a.getDate()}` == `${date.getYear()}${date.getMonth()}${date.getDate()}`
          }else{
            return false
          }
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
      currentManagementList:[
        ["在像素编辑器中添加gif动图","设计一个像素宠物，然后做一个宠物组件","完成一个四象限任务管理功能，然后把这个页面移植过去"],["编写1.29测试用例"],[],[]
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
    }
  },
  mounted(){
  	this.getWeekDate()
  },
  methods: {
    getDate(strDate){
      const strList = strDate.split('/')
      const date = new Date(strList[0],Number(strList[1])-1,strList[2])
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
        this.managementList.push(this.management)
        this.$toast.show('添加成功','success')
        this.modal_show.addPlanShow = false 
      }else{
        this.$toast.show('时间或内容不得为空','error') 
      }
      

    },
    getManagementDate(n = 0){
      const date = new Date()
      date.setDate(date.getDate() + n)

      this.management.date = `${date.getYear()+1900}/${(date.getMonth()+1)>10?'':0}${date.getMonth()+1}/${date.getDate()>10?'':0}${date.getDate()}`;
    },
    showAddPlan(){
      this.initManagementDate()
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
      console.log(`firstDay:${firstDay.getDate()}`)
      for(var i=0; i<7 ; i++){
        this.currentWeek[i] = getDateNDaysAgo(firstDay, -i)
      }
    }
  }
};
</script>

<style>
.main-content{
	width: calc(100% - 80px);
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
/*  border: var(--box-border);*/
  padding: 5px;
  border-radius: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
}


.quadrant-list .list-item{
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
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

  .quadrant-list .list-item.item-0:hover{
    background-color: #f9A82230;
  }  
  .quadrant-list .list-item.item-1:hover{
    background-color: #F9663530;
  }  
  .quadrant-list .list-item.item-2:hover{
    background-color: #2bbaa530;
  }  
  .quadrant-list .list-item.item-3:hover{
    background-color: #93d3a230;
  }  

}

</style>