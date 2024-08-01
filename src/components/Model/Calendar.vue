<template>
    <div  ref="calendar">
      <div v-if="type == 'input'" class="input-container">
        <input :value="selectedDate ? selectedDate.split('T')[0] : 'yyyy/mm/dd'" type="text" @input="$emit('update:modelValue', $event.target.value)">
        <svg-icon name="calendar" class="input-icon" size="18" @click="openCalendar()"></svg-icon>
      </div>
      <div v-else-if="type == 'datetime'" class="input-container">
        <input :value="selectedDate ? selectedDate.split('T').join(' '):'yyyy/mm/dd --:--'" type="text" @input="$emit('update:modelValue', $event.target.value)">
        <svg-icon name="calendar-datetime" class="input-icon" size="18" @click="openCalendar()"></svg-icon>
      </div>
      <div ref="calendarContainer" :class="{'calendar-container':true,'input':type != 'calendar','show':show}">
        <div class="date-select">
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
          <div v-if="type != 'calendar'" class="cows title">
            <button class="input-button" @click="selectDate(-1)">今天</button>
            <button v-if="type == 'datetime'" class="input-button" @click="selectNowTime($event)">现在</button>
          </div>
        </div>
        <div v-if="type == 'datetime'" class="time-select" >
          <div class="time-scroll" @wheel="wheelHourEvent" @pointerdown="hourDownHandler">
            <div v-for="hour in 24" class="time hour" ref="hour">
              {{hour > 10 ? hour-1 :'0'+ (hour-1)}}
            </div>
          </div>
          <div class="time-scroll" @wheel="wheelMinEvent" @pointerdown="minDownHandler">
            <div v-for="min in 60" class="time min" ref="min">
              {{min > 10 ? min-1 :'0'+ (min-1)}}
            </div>
          </div>    
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
      },
      modelValue:[String,Number] //实现v-model
    },
    watch:{
      modelValue(val){
        this.selectedDate = val
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
      },
      
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
        show:false,
        selectedDate: this.modelValue,
        log:"",
        timeHeight:null,
        selectedTime: "--:--",
        startTime:null,
        downPointer:null
      }
    },
    mounted(){
        if(this.language == 'CN'){
          this.monthTitle = this.monthTitleEN
          this.weekTitle = this.weekDayCN
        }
        if(this.type == 'calendar'){
          this.show = true
        }
        this.init()
    },
    unmounted(){
      document.removeEventListener('click',this.closeCalendar)
    },
    methods: {
      minDownHandler(e){
        this.downPointer = {x:e.pageX,y:e.pageY}
        this.startTime = this.selectedTime
        document.addEventListener('pointermove',this.minMoveHandler)
        document.addEventListener('pointerup',this.timeUpHandler)
      },
      minMoveHandler(e){
        if(this.downPointer){
          const deltaY = e.pageY - this.downPointer.y
          let i = Math.floor(Math.abs(deltaY)/this.timeHeight)
          const target = Number(this.startTime.split(':')[1]) + (deltaY < 0 ? i : -i)
          this.wheelMinEvent(e,target)
        }
      },
      hourDownHandler(e){
        this.downPointer = {x:e.pageX,y:e.pageY}
        this.startTime = this.selectedTime
        document.addEventListener('pointermove',this.hourMoveHandler)
        document.addEventListener('pointerup',this.timeUpHandler)
      },
      hourMoveHandler(e){
        if(this.downPointer){
          const deltaY = e.pageY - this.downPointer.y
          let i = Math.floor(Math.abs(deltaY)/this.timeHeight)
          const target = Number(this.startTime.split(':')[0]) + (deltaY < 0 ? i : -i)
          this.wheelHourEvent(e,target)
        }
      },
      timeUpHandler(){
        if(this.downPointer){
          this.downPointer = null
          document.removeEventListener('pointermove',this.minMoveHandler)
          document.removeEventListener('pointermove',this.hourMoveHandler)
          document.removeEventListener('pointerup',this.timeUpHandler)
        }
      },
      wheelHourEvent(event, target = null){
        event.preventDefault()
        let i = target!=null ? target - Number(this.selectedTime.split(':')[0]) : 1
        let deltaY = target ? (i>0 ? 100 : -100) : event.deltaY
        i = Math.abs(i)
        while(i--){
          this.$refs.hour.forEach((hourEl, index)=>{
            let top = Number(hourEl.style.top.split('px')[0])+(deltaY==100 ? -this.timeHeight:this.timeHeight)
            if(top < -this.timeHeight){
              top = this.timeHeight * 22
            }else if(top > this.timeHeight * 22){
              top = -this.timeHeight
            }
            hourEl.style.top = `${top}px`
            if(top == 3*this.timeHeight){
              hourEl.style.backgroundColor = "var(--main-color)"
              let time = this.selectedTime.split(':')
              time[0] = hourEl.innerText
              this.selectedTime = time.join(':');
              let datetime = this.selectedDate.split("T")
              datetime[1] = this.selectedTime
              this.selectedDate = datetime.join("T")
              this.changeHandler(this.selectedDate)
            }else{
              hourEl.style.backgroundColor = "transparent"
            }
          })
        }
          
      },
      wheelMinEvent(e,target = null){
        event.preventDefault()
        let i = target!=null ? target - Number(this.selectedTime.split(':')[1]) : 1
        let deltaY = target ? (i>0 ? 100 : -100) : event.deltaY
        i = Math.abs(i)
        while(i--){
          this.$refs.min.forEach((minEl, index)=>{
            let top = Number(minEl.style.top.split('px')[0])+(deltaY==100 ? -this.timeHeight:this.timeHeight)
            if(top < -this.timeHeight){
              top = this.timeHeight * 58
            }else if(top > this.timeHeight * 58){
              top = -this.timeHeight
            }
            minEl.style.top = `${top}px`
            if(top == 3*this.timeHeight){
              minEl.style.backgroundColor = "var(--main-color)"
              let time = this.selectedTime.split(':')
              time[1] = minEl.innerText
              this.selectedTime = time.join(':');
              let datetime = this.selectedDate.split("T")
              datetime[1] = this.selectedTime
              this.selectedDate = datetime.join("T")
              this.changeHandler(this.selectedDate)
            }else{
              minEl.style.backgroundColor = "transparent"
            }
          })
        }
          
      },
      selectNowTime(e){
        this.selectDate(-1)
        const now = new Date()
        this.wheelHourEvent(e,now.getHours())
        this.wheelMinEvent(e,now.getMinutes())
      },
      changeHandler(val){
        this.$emit('update:modelValue', val)
      },
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
        const el = this.$refs.calendarContainer
        el.style.top=null
        const elHeight = el.clientHeight
        const inputRect = this.$refs.calendar.getBoundingClientRect()
        let offsetTop = this.$refs.calendar.offsetTop
        const offsetBottom = window.innerHeight - inputRect.bottom
        if(offsetBottom > elHeight){
          offsetTop += inputRect.height
        }else{
          offsetTop -= elHeight
        }
        if(!this.show){
          this.show = true
          document.addEventListener('click',this.closeCalendar)
        }else{
          this.show = false
          
          document.removeEventListener('click',this.closeCalendar)
        }
        el.style.top=offsetTop+"px"
        if(this.type == 'datetime' && !this.timeHeight ){
          this.timeHeight = this.$refs.hour[0].clientHeight
          this.$refs.hour.forEach((hourEl, index)=>{
            hourEl.style.top = `${(index-1)*this.timeHeight}px`
            if(index == 4){
            hourEl.style.backgroundColor = "var(--main-color)"
            let time = this.selectedTime.split(':')
            time[0] = hourEl.innerText
            this.selectedTime = time.join(':');
            }
          })
          this.$refs.min.forEach((minEl, index)=>{
            minEl.style.top = `${(index-1)*this.timeHeight}px`
            if(index == 4){
            minEl.style.backgroundColor = "var(--main-color)"
            let time = this.selectedTime.split(':')
            time[1] = minEl.innerText
            this.selectedTime = time.join(':');
            this.selectedDate = this.selectedDate ? this.selectedDate : "yyyy/mm/ddT00:00"
            let datetime = this.selectedDate.split("T")
              datetime[1] = this.selectedTime
              this.selectedDate = datetime.join("T")
            }
          })
        }
        
      },
      closeCalendar(e){
        if(!this.$refs.calendar.contains(e.target)){
          this.show = false
          document.removeEventListener('click',this.closeCalendar)
        }
      },
      selectDate(index){
        this.selectedDate = this.selectedDate ? this.selectedDate : "yyyy/mm/ddT00:00"
        if(index == -1){
          this.init()
          const date = this.today
          let datetime = this.selectedDate.split("T")
          datetime[0] = `${date.getYear()+1900}/${(date.getMonth()+1)>10?'':0}${date.getMonth()+1}/${date.getDate()>10?'':0}${date.getDate()}`
          this.selectedDate = datetime.join("T")
          return
        }
        let month = this.currentMonth
        if(index<this.firstIndex) month-=1
        else if(index > this.lastIndex) month+=1
        const date = new Date(this.currentYear,month,this.currentDates[index])
        let datetime = this.selectedDate.split("T")
          datetime[0] = `${date.getYear()+1900}/${(date.getMonth()+1)>10?'':0}${date.getMonth()+1}/${date.getDate()>10?'':0}${date.getDate()}`
          this.selectedDate = datetime.join("T")
        if(this.show){
          this.show = false
          document.removeEventListener('click',this.closeCalendar)
        }
        this.changeHandler(this.selectedDate)
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
    max-width: 400px;
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
/*    height: 280px;*/
    opacity: 0;
    z-index: 9;
    padding: 0;
    border:var(--box-border);
    background-color: var(--box-bgc);
    border-radius: 5px;
    pointer-events: none;
    transform: translateY(10%);
    transition: 0.3s;
    display: flex;
    width: fit-content;
  }

  .calendar-container.input .date-select {
    padding: 5px;
    width: 220px;
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
  .calendar-container.input .time-select{
    padding: 5px;
    border-left: var(--box-border);
    display: flex;
  }

  .time-scroll{
    position: relative;
    width: 42px;
    height: 100%;
    overflow: hidden;
    touch-action: none;
/*    pointer-events: none;*/
/*    border: var(--box-border);*/
  }

  .time-scroll .time{
    position: absolute;
    padding: 5px 5px;
    font-size: 20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    cursor: pointer;
  }
 
  </style>