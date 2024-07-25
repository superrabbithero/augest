<template>
    <div class="calendar-container" style="max-width: 400px;">
        <div class="cows" >
          <svg-icon name="arrow-left" @click="toMonth(-1)" size="25"></svg-icon>
          <div style="font-family: SmileySans-Oblique;font-size: 25px;">
            {{ monthTitle[currentMonth] }},{{ currentYear }}
          </div>
          <svg-icon name="arrow-right" @click="toMonth(+1)" size="25"></svg-icon>
        </div>
        <div class="cows" style=" border-bottom: var(--box-border);">
          <div v-for="day of 7" class="date">
                <div class="content title">
                  {{weekDayEn[day-1]}}
                </div>   
            </div>
        </div>
        <div v-for="index of 6" class="cows">
            <div v-for="day of 7" :class="{'date':true,'notCurMon': (index-1)*7+day-1<firstIndex || (index-1)*7+day-1 > lastIndex , 'today':(index-1)*7+day-1 == todayIndex}">
                <div  class="content">
                    {{ currentDates[(index-1)*7+day-1] }}
                </div>
                
            </div>
        </div>
    </div>
    
    
  </template>
  
  <script>
  export default {
    props: {
    
    },
    data(){
      return{
        monthTitle:["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."],
        weekDayChinese:["日","一","二","三","四","五","六"],
        weekDayEn:["S","M","T","W","T","F","S"],
        currentDates:[],
        currentMonth:null,
        currentYear:null,
        today:null,
        firstIndex:0,
        lastIndex:0,
        todayIndex:null,
      }
    },
    mounted(){
        this.init()
    },
    methods: {
      init(){
        this.today = new Date()
        this.currentMonth = this.today.getMonth()
        this.currentYear = 1900 + this.today.getYear()
        this.getDates(this.currentYear, this.currentMonth)
      },
      getDates(year=this.currentYear,month=this.currentMonth){
        const preLastDate = new Date(year, month, 0)
        const firstDate = new Date(year, month, 1)
        const lastDate = new Date(year, month, 0)
        console.log(firstDate.getDay())
        for(var i=0 ; i < 42; i++){
            let date = i-firstDate.getDay()+1
            if(date == 1){
              this.firstIndex = i
            }else if(date == lastDate.getDate()){
              this.lastIndex = i
            }else if(date == this.today.getDate() && this.currentMonth == this.today.getMonth() && this.currentYear == this.today.getYear()+1900){
              this.todayIndex = i
            }
            else if(date > lastDate.getDate()){
              date -= lastDate.getDate()
            }else if(date < 1){
              date += preLastDate.getDate()
            }
            console.log(date)
            this.currentDates[i]=date
        }
      },
      toMonth(i){
        this.todayIndex = null
        const deltaMonth = this.currentMonth + i
        this.currentMonth = (deltaMonth)%12>=0 ? (deltaMonth)%12 : 11
        this.currentYear = (deltaMonth)%12>=0 ? this.currentYear + Math.floor(deltaMonth/12) : this.currentYear - 1 + Math.ceil(deltaMonth/12)

        this.getDates()
        console.log(this.currentDates)
      }
    }
  };
  </script>
  
  <style scoped>
  .cows{
    display: flex;
    justify-content: space-between;
    align-items: center
  }

  .cows .date{
    width: calc(14.6% - 10px);
    padding-top:calc(14.6% - 10px);
    margin: 5px;
    
    position: relative;
  }

  .date .content{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: var(--box-border);
  }

  .notCurMon .content{
    background-color: #eee;
  }

  .today .content{
    background-color: var(--main-color);
  }

  .content.title{
    border: none!important;
  }

  .calendar-container{
    width: 100%;
  }
  </style>