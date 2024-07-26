<template>
    <div class="calendar-container" style="max-width: 400px;">
        <div class="cows title" >
          <svg-icon name="arrow-left" @click="pre()" size="25"></svg-icon>
          <div style="font-family: SmileySans-Oblique;font-size: 25px;" @click="viewType = viewType ? viewType-1 : 0">
            {{ calendarTitle }}
          </div>
          <svg-icon name="arrow-right" @click="next()" size="25"></svg-icon>
        </div>
        <div v-if="viewType == 2" class="cows" style=" border-bottom: var(--box-border);">
          <div v-for="day of 7" class="date">
                <div class="content title">
                  {{weekDayEN[day-1]}}
                </div>   
            </div>
        </div>
        <div v-if="viewType == 2" class="cows">
            <div v-for="(date, index) in currentDates" :class="{'date':true,'notCur': notCurClass(index) , 'today':todayClass(date)}">
                <div  class="content">
                    {{ date }}
                </div>
            </div>
        </div>
        <div v-else-if="viewType == 1"  class="cows">
            <div v-for="index of 16" :class="{'date':true,'month':true,'notCur': notCurClass(index-1) , 'today':todayClass(index)}" @click="toMonth((index-1)%12)+1">
                <div  class="content">
                    {{ (index-1)%12+1 }}
                </div>
            </div>
        </div>
        <div v-else  class="cows">
            <div v-for="year of current16Years" :class="{'date':true,'month':true,'notCur': notCurClass(year) , 'today':todayClass(year)}" @click="toYear(year)">
                <div class="content">
                    {{ year }}
                </div>
            </div>
        </div>
    </div>
    
    
  </template>
  
  <script>
  export default {
    computed:{
      calendarTitle(){
        if(this.viewType == 2){
          return `${this.monthTitleEN[this.currentMonth]} ${this.currentYear}`
        }else if(this.viewType == 1){
          return `${this.currentYear}`
        }else{
          return `${Math.floor(this.currentYear/10)*10}-${Math.floor(this.currentYear/10)*10+9}`
        }
      },
      todayClass(){
        return (number)=>{
          const toYear = this.today.getYear()+1900
          if(toYear == number){
            return true
          }
          const toMonth = this.today.getMonth()
          if(toYear == this.currentYear && toMonth == number-1 && this.viewType == 1)
            return true

          if(toYear == this.currentYear && toMonth == this.currentMonth && number == this.today.getDate())
            return true
          return false
        }
      },
      notCurClass(){
        return (num)=>{
          if(this.viewType == 2 && (num < this.firstIndex || num > this.lastIndex))
            return true
          if(this.viewType == 1 && num >= 12)
            return true
          if(this.viewType == 0 && (num < Math.floor(this.currentYear/10)*10 ||num > Math.floor(this.currentYear/10)*10+9))
            return true
          return false
        }
      }
    },

    props: {
    
    },
    data(){
      return{
        monthTitleEN:["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."],
        monthTitleCN:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一","十二"],
        weekDayCN:["日","一","二","三","四","五","六"],
        weekDayEN:["S","M","T","W","T","F","S"],
        currentDates:[],
        currentMonth:null,
        currentYear:null,
        current16Years:[],
        today:null,
        firstIndex:0,
        lastIndex:0,
        todayIndex:null,
        viewType:2
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
        this.get16Years()
      },
      getDates(year=this.currentYear,month=this.currentMonth){
        const preLastDate = new Date(year, month, 0)
        const firstDate = new Date(year, month, 1)
        const lastDate = new Date(year, month+1, 0)
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
            this.currentDates[i]=date
        }
      },
      get16Years(year = this.currentYear){
        
        const first10Year = Math.floor(year/10)*10
        const index = (first10Year-1900)%4
        console.log(index, first10Year)
        const firstYear = first10Year - index
        for (let i = 0; i < 16; i++) {
          this.current16Years[i] = firstYear + i
        }
      },
      changeMonth(i){
        this.todayIndex = null
        const deltaMonth = this.currentMonth + i
        this.currentMonth = (deltaMonth)%12>=0 ? (deltaMonth)%12 : 11
        this.currentYear = (deltaMonth)%12>=0 ? this.currentYear + Math.floor(deltaMonth/12) : this.currentYear - 1 + Math.ceil(deltaMonth/12)

        this.getDates()
      },
      toYear(year){
        this.currentYear = year
        this.viewType = 1
      },
      toMonth(month){
        this.currentMonth = month
        this.viewType = 2
        this.getDates()
      },
      pre(){
        if(this.viewType == 2){
          this.changeMonth(-1)
        }else if(this.viewType == 1){
          this.currentYear--
        }else{
          this.currentYear -= 10
          this.get16Years()
        }
      },
      next(){
        if(this.viewType == 2){
          this.changeMonth(1)
        }else if(this.viewType == 1){
          this.currentYear++
        }else{
          this.currentYear += 10
          this.get16Years()
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .cows{
    font-size: 0;
  }
  .cows.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
  }

  .date{
    width: calc(14.2% - 8px);
    padding-top:calc(14.2% - 8px);
    margin: 8px 4px 0 4px;
    display: inline-block;
    position: relative;
    font-size: 1rem;
  }

  .date.month{
    width: calc(25% - 10px);
    padding-top:calc(25% - 10px);
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

/*  .month*/

  .notCur .content{
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