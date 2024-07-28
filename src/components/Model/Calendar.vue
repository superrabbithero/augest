<template>
    <div  ref="calendar">
      <div v-if="type == 'input'" class="input-container">
        <input v-model="selectedDate"  type="text" />
        <svg-icon name="calendar" class="input-icon" size="18" @click="openCalendar()"></svg-icon>
      </div>
      <div :class="{'calendar-container':true,'input':type == 'input','show':show}" style="max-width: 400px;">
          <div class="cows title" >
            <svg-icon name="arrow-left" @click="pre()" :size="type == 'input'?16:25"></svg-icon>
            <div style="font-family: SmileySans-Oblique;" @click="viewType = viewType ? viewType-1 : 0">
              {{ calendarTitle }}
            </div>
            <svg-icon name="arrow-right" @click="next()" :size="type == 'input'?16:25"></svg-icon>
          </div>
          <div v-if="viewType == 2" class="cows" style=" border-bottom: var(--box-border);">
            <div v-for="day of 7" class="date">
                  <div class="content title">
                    {{weekTitle[day-1]}}
                  </div>   
              </div>
          </div>
          <div v-if="viewType == 2" class="cows">
              <div v-for="(date, index) in currentDates" :class="{'date':true,'notCur': notCurClass(index) , 'today':todayClass(date)}" @click="selectDate(index)">
                  <div  class="content">
                      {{ date }}
                  </div>
              </div>
          </div>
          <div v-else-if="viewType == 1"  class="cows">
              <div v-for="index of 16" :class="{'date':true,'month':true,'notCur': notCurClass(index-1) , 'today':todayClass(index)}" @click="toMonth(index)">
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
          <div v-if="type == 'input'" class="rows">
            <button class="input-button" @click="selectDate(-1)">今天</button>
          </div>
      </div>
    </div>
    
    
  </template>
  
  <script>
  export default {
    props: {
      language:{
        type: String,
        default: `EN`
      },
      type: {
        type: String,
        default: "calendar"
      }
    },
    computed:{
      calendarTitle(){
        if(this.viewType == 2){
          return `${this.monthTitle[this.currentMonth]} ${this.currentYear}`
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
    data(){
      return{
        monthTitle:["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."],
        monthTitleEN:["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."],
        monthTitleEN:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一","十二"],
        weekTitle:["S","M","T","W","T","F","S"],
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
        viewType:2,
        show:true,
        selectedDate:`yyyy/mm/dd`
      }
    },
    mounted(){
        if(this.language == 'CN'){
          this.monthTitle = this.monthTitleEN
          this.weekTitle = this.weekDayCN
        }
        if(this.type == 'input'){
          this.show = false
        }
        this.init()
    },
    unmounted(){
      document.removeEventListener('click',this.closeCalendar)
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
        this.currentMonth = (month-1)%12
        this.currentYear += Math.floor((month-1)/12)
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
      },
      openCalendar(){
        if(!this.show){
          this.show = true
          document.addEventListener('click',this.closeCalendar)
        }else{
          this.show = false
          document.removeEventListener('click',this.closeCalendar)
        }
          
        
      },
      closeCalendar(e){
        if(!this.$refs.calendar.contains(e.target)){
          this.show = false
          document.removeEventListener('click',this.closeCalendar)
        }
      },
      selectDate(index){
        if(index == -1){
          this.init()
          const date = this.today
          this.selectedDate = `${date.getYear()+1900}/${(date.getMonth()+1)>10?'':0}${date.getMonth()+1}/${date.getDate()>10?'':0}${date.getDate()}`
          return
        }
        let month = this.currentMonth
        if(index<this.firstIndex) month-=1
        else if(index > this.lastIndex) month+=1
        const date = new Date(this.currentYear,month,this.currentDates[index])
        this.selectedDate = `${date.getYear()+1900}/${(date.getMonth()+1)>10?'':0}${date.getMonth()+1}/${date.getDate()>10?'':0}${date.getDate()}`
        if(this.show){
          this.show = false
          document.removeEventListener('click',this.closeCalendar)
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
    font-size: 25px!important;
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
  }

  .date.month{
    width: calc(25% - 10px);
    padding-top:calc(25% - 10px);
  }

  .date .content{
    user-select: none;
    font-size:clamp(0.7rem, 0.648rem + 1.14vw, 1rem);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
/*    border: var(--box-border);*/
  }


  .notCur .content{
    color: var(--font-lowlight);
  }

  .today .content{
    background-color: var(--main-color);
    border: 2px solid var(--main-color);
  }

  .content.title{
    border: none!important;
    pointer-events: none;
  }

  .calendar-container{
    width: 100%;
  }

  
  

  @media(any-hover:hover){
    .content:hover{
      background-color: var(--white-highlight);
    }
    .today .content:hover{
      background-color: var(--main-color);
      box-shadow:0px 0px 0px 2px var(--box-bgc) inset;
      border: 2px solid var(--main-color);
    }
    .input-button:hover{
      color:var(--main-color)
    }
  }

/*  input样式*/
  .calendar-container.input {
    position: absolute;
    width: 220px;
    opacity: 0;
    z-index: 9;
    padding: 5px;
    border:var(--box-border);
    background-color: var(--box-bgc);
    border-radius: 5px;
    pointer-events: none;
    transform: translateY(10%);
    transition: 0.3s;
  }
  .input .cows.title{
    font-size: 16px!important;
  }
  .input .content{
    font-size: 12px!important;
  }

  .input .content{
    border-radius: 50%;
  }

  .input.show{
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .input-container{
    position: relative;
  }

  .input-icon{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
  }
  input {
    width: calc(100% - 12px);
  }

  .input-button{
    padding: 2px 3px;
    font-size: 12px;
    border: none;
  }
 
  </style>