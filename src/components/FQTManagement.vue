<template>
  <my-model :show="modal_show.addPlanShow" modalKey="addPlanShow">
    <div>我计划（今天、明天、日历）开始，</div>
    <div>在（什么时间）之前</div>
    <div>每天、艾宾豪斯记忆法</div>
    <div>完成(什么)任务</div>
    
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

export default {
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
    }
  },
  mounted(){
  	this.getWeekDate()
  },
  methods: {
    showAddPlan(){
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
    getFormattedDate(date, n=null) {
      const today = new Date(date);
      if(n){
        today.setDate(today.getDate() + n)
      }
      const year = today.getFullYear();
      const month = today.getMonth() + 1; // 月份从0开始，需要加1
      const day = today.getDate();

      return `${year}-${month}-${day}`;
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



</style>