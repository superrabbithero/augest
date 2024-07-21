<template>
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
		</div>
    <div class="list-container">
      <div v-for="index of 4" class="quadrant ">
        {{ today }}{{ currentWeek[0] }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
    	currentWeek : [],
      today : null,
    }
  },
  mounted(){
  	this.getWeekDate()
  },
  methods: {
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




</style>