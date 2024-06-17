<template>	
  <div class="exampaperbox">
	  <div class="exampaperbox-left" ref="left">
	  	<div class="answercard" style="flex: 1;">
	  		<div class="buttonbox">
	  			<timer ref="examtimer" class="examtimer"></timer>
	  		</div>
		  	<div class="buttonbox">
		  		<div class="button-items">
			  		<div class="button-item" v-show="examstatus!=1" @click="examstart()">
			  			<IconWrapper iconName="PlayOne" theme="outline" :strokeWidth='1' />
			  		</div>
			  		<div class="button-item" v-show="examstatus==1" @click="exampause()">
			  			<IconWrapper iconName="Pause" theme="outline" :strokeWidth='1' />
			  		</div>
			  		<div class="button-item" v-show="examstatus!=0" @click="examstop()">
			  			<IconWrapper iconName="SquareSmall" theme="outline" :strokeWidth='1' />
			  		</div>
			  		<div class="button-item" @click="pencanvas_show=!pencanvas_show">
			  			<IconWrapper iconName="HandPaintedPlate" theme="outline" :strokeWidth='1' />
			  		</div>
			  	</div>
		  	</div>
		  	
		  	<div class="fillcard">
		  		<ul class="fill-type" style="flex-basis: 100%;">
		  			<li v-for="(type,index) in questionTypeList" :class="{'active':currQTypeIndex == index}" @click="switchType(index)">{{type}}</li>
		  		</ul>
	  			<div v-for="(answerGroup,index) in answers" class="circle-groups" v-show="currQTypeIndex == index">
		  			<div v-for="(key,index) in Object.keys(answerGroup)" class="circle-groups-item">
		  				<div :class="{'circle':true,'answered':answerGroup[key].mine,'current':key == currentNum}" @click="rollTo(key)">{{key}}</div>
		  			</div>
		  		</div>
		  		<div class="fill-option">
		  			<div v-for="(item, index) in ['A','B','C','D']" :class="{'item':true,'selected':stuAnswerList[currentNum] == item}" @click="answer(item)">{{item}}</div>
		  		</div>
		  	</div>
		  </div>
	  </div>
	  <div :class="{'exampaperbox-expand':true,'off':!exampaperbox_expand}" @click="exampaperboxExpand()"></div>

	  <div class="exampaperbox-right" ref="right">
			<div class="exampaper" style="position:relative;" >
				<pencanvas v-if="pencanvas_show"></pencanvas>
				<h3 v-for="(title, index) in ['一、常识判断', '二、言语理解', '三、数量关系', '四、推理判断', '五、资料分析']" 
      v-show="currQTypeIndex == index">{{ title }}</h3>
				<div v-for="(questionsgroup,index) in questions" v-show="currQTypeIndex == index">
					<div :class="{'question':true,'active':!question.sub_questions && question.no==currentNum}" v-for="(question,index) in questionsgroup" @click="currentNum = !question.sub_questions?parseInt(question.no):currentNum">
						<div class="question_content">
							<span v-if="!question.sub_questions" :id="'ques_'+question.no">{{question.no}}.</span>
							<div v-html="' '+question.content"></div>
						</div>
						<div v-if="question.options" class="question_options">
							<div class="question_options_group">
								<div :class="{ 'option':true, 'answered': stuAnswerList[parseInt(question.no)] == 'A'}" @click="answerthis(parseInt(question.no),'A')" v-html="'A.' + question.options[0]">
								</div>
								<div :class="{ 'option':true, 'answered': stuAnswerList[parseInt(question.no)] == 'B'}" @click="answerthis(parseInt(question.no),'B')" v-html="'B.' + question.options[1]"></div>
							</div>
							<div class="question_options_group">
								<div :class="{ 'option':true, 'answered': stuAnswerList[parseInt(question.no)] == 'C'}" @click="answerthis(parseInt(question.no),'C')" v-html="'C.' + question.options[2]"></div>
								<div :class="{ 'option':true, 'answered': stuAnswerList[parseInt(question.no)] == 'D'}" @click="answerthis(parseInt(question.no),'D')" v-html="'D.' + question.options[3]"></div>
							</div>
						</div>
						<div v-for="question in question.sub_questions" :class="{'question':true,'active':question.no==currentNum}" @click="currentNum = parseInt(question.no)">
							<div class="question_content">
								<span :id="'ques_'+question.no">{{question.no}}. </span>
								<div v-html="' '+question.content"></div>
							</div>
							<div class="question_options">
								<div class="question_options_group">
									<div :class="{ 'option':true, 'answered': stuAnswerList[parseInt(question.no)] == 'A'}" @click="answerthis(parseInt(question.no),'A')" v-html="'A.' + question.options[0]"></div>
									<div :class="{ 'option':true, 'answered': stuAnswerList[parseInt(question.no)] == 'B'}" @click="answerthis(parseInt(question.no),'B')" v-html="'B.' + question.options[1]"></div>
								</div>
								<div class="question_options_group">
									<div :class="{ 'option':true, 'answered': stuAnswerList[parseInt(question.no)] == 'C'}" @click="answerthis(parseInt(question.no),'C')" v-html="'C.' + question.options[2]"></div>
									<div :class="{ 'option':true, 'answered': stuAnswerList[parseInt(question.no)] == 'D'}" @click="answerthis(parseInt(question.no),'D')" v-html="'D.' + question.options[3]"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="exampaperbox-bottom" ref="bottom">
			<div :style="{lineHeight: '10px', padding: '0 10px',fontSize: '30px',transform: 'rotate(90deg)'+(exampaperbox_expand?'':' scaleX(-1)'), position: 'absolute',top:'-10px'}" @click="exampaperbox_expand=!exampaperbox_expand">
				&rsaquo;
			</div>
			<div class="fillcard" >
	  		<ul class="fill-type" style="flex-basis: 100%;">
	  			<li v-for="(type,index) in questionTypeList" :class="{'active':currQTypeIndex == index}" @click="switchType(index)">{{type}}</li>
	  		</ul>
  			<div v-for="(answerGroup,index) in answers" class="circle-groups" v-show="exampaperbox_expand && currQTypeIndex == index">
	  			<div v-for="(key,index) in Object.keys(answerGroup)" class="circle-groups-item">
	  				<div :class="{'circle':true,'answered':answerGroup[key].mine,'current':key == currentNum}" @click="rollTo(key)">{{key}}</div>
	  			</div>
	  		</div>
		  </div>
		</div>
	</div>
</template>

<script>
// import TheLatex2Math from './TheLatex2Math'
import jsonData from "@/assets/json/2022_js_C.json"
import pencanvas from "../Model/PenCanvas.vue"
import timer from "../Model/Time.vue"

export default {
  components: {
  	pencanvas,
  	timer
  },
  data(){
    return {
      jsonData,
      questions:[],
      letters:['A.','B.','C.','D.'],
	  	pencanvas_show:false,
	  	stuAnswerList:[],
	  	currentNum:1,
	  	questionCount:20,
	  	questionTypeList:['常识','言语','数学','判推','资料'],
	  	currQTypeIndex:0,
	  	exampaperbox_expand:true,
	  	examtimer:null,
	  	examstatus:0,
	  	answers:[{},{},{},{},{}],
    }
  },
  mounted(){
  	this.init()
    this.TypeSet([document.getElementsByClassName("output")])
  },
  methods:{
  	init(){
  		this.examtimer = this.$refs.examtimer
  		this.questions = [
      	this.jsonData.questions_1,
        this.jsonData.questions_2,
        this.jsonData.questions_3,
        this.jsonData.questions_4,
        this.jsonData.questions_5
        ]
  		var questionNum = 1
	  	for (let i = 1; i <= 5; i++) {
			  jsonData[`questions_${i}`].forEach(question => {
			    if (question.answer) {
			      this.answers[i - 1][questionNum] = {answer:question.answer,mine:''};
			      questionNum++;
			    }
			    if (question.sub_questions){
			    	question.sub_questions.forEach(subQ => {
			    		if (subQ.answer) {
					      this.answers[i - 1][questionNum] = {answer:subQ.answer,mine:''};
					      questionNum++;
					    }
			    	})
			    }
			  });
			}
	  	// console.log(this.answers)
  	},
    answer(item){
    	var count = Object.keys(this.answers[this.currQTypeIndex]).length
    	const answers = this.answers[this.currQTypeIndex]

    	answers[this.currentNum].mine = item
    	this.stuAnswerList[this.currentNum] = item
    	if(answers[this.currentNum + 1]){
    		this.currentNum++
    		this.rollTo(this.currentNum)
    	}else if(this.answers[this.currQTypeIndex+1]){
    		this.switchType(this.currQTypeIndex+1)
    	}else{
    		alert('最后一道题了');
    	}
    	
    	// this.stuAnswerList[this.currentNum] = item

    	// let nextNum = (this.currentNum + 1) % count
    	// while( nextNum != this.currentNum){
    	// 	if(!this.stuAnswerList[nextNum]){
    	// 		this.currentNum = nextNum;
    	// 		break
    	// 	}
    	// 	nextNum = (nextNum + 1) % count
    	// }

    	// if (this.stuAnswerList[this.currentNum]) {
          // alert('所有题目都设置完了！');
      //     return;
      // }
    },
    exampaperboxExpand(){
    	if(this.exampaperbox_expand){
    		this.exampaperbox_expand=false
    		this.$refs.left.style.flexBasis = '0'
    		this.$refs.right.style.flexBasis = '100%'
    	}else{
    		this.exampaperbox_expand=true
    		this.$refs.left.style.flexBasis = '20%'
    		this.$refs.right.style.flexBasis = '80%'
    	}
    },
    examstart(){
    	if(this.examstatus != 1){
    		this.examstatus = 1
    		this.examtimer.startTimer()
    	}    	
    },
    examstop(){
    	if(this.examstatus != 0){
    		this.examstatus = 0
    		this.examtimer.resetTimer()
    	} 
    },
    exampause(){
    	if(this.examstatus == 1){
    		this.examstatus = 2
    		this.examtimer.pause()
    	} 
    },
    rollTo(num){
    	this.currentNum = parseInt(num)
    	const el = document.getElementById('ques_'+num)
    	var offsetTop = el.offsetTop - this.$refs.right.scrollTop
    	// this.$refs.right.scrollTop = offsetTop
    	this.$refs.right.scrollBy({
        top: offsetTop, // 偏移量
        behavior: 'smooth' // 平滑滚动
        });
    },
    switchType(index){
    	this.currQTypeIndex = index;
    	this.currentNum = parseInt(Object.keys(this.answers[index])[0])
    	this.$refs.right.scrollTop = 0
    },

    answerthis(no,item){
    	if(this.currentNum == no){
    		const answers = this.answers[this.currQTypeIndex]
	    	answers[no].mine = item
	    	this.stuAnswerList[no] = item
    	}
    	
    },

    TypeSet(elements){
      if (!window.MathJax) {
        console.log('no window.MathJax')
        return
      }
      // window.MathJax.startup.promise = 
      window.MathJax.startup.promise
      .then(() => {
        return window.MathJax.typesetPromise(elements)
      })
      .catch((err) => console.log('Typeset failed: ' + err.message))
      
      return window.MathJax.startup.promise
    }
  }
}
</script>
<style scoped>
	.exampaperbox-expand{
		width: 5px;
		cursor: col-resize;
	}
	.exampaperbox-expand:hover{
		width: 5px;
	}

	.exampaperbox{
		width: 100%;
		display: flex;
		overflow: hidden;
		height: calc(100vh - 61px);
	}
	.exampaperbox-left{
		flex-basis: 20%;
		max-width: 240px;
		display: flex;
		overflow: hidden;
		transition: flex-basis 0.3s ease
	}
	.exampaperbox-right{
		overflow: auto;
		flex-basis: 80%;
		flex-grow: 1;
		border-left: var(--box-border);
		transition: flex-basis 0.3s ease

	}

	.exampaperbox-bottom{
/*		background-color: var(--content-bgc);*/
		width: 100%;
		bottom: 0;
		position: relative;
	}
	.exampaperbox-bottom .fillcard{
		width: 100%;
		top: 0;
	}

	.exampaperbox-bottom .fillcard .circle-groups-item{
		width: calc(10% - 10px);
		padding-top: calc(10% - 10px);
		margin: 5px;
		box-sizing: border-box;
		position: relative;
	}

	.answercard{
		padding: 10px 10px;
	}

	.fillcard {
		min-width: 150px;
		display: flex;
		flex-wrap: wrap
	}
	
	.circle-groups {
		flex-basis: 100%;
		background-color: var(--box-hightlight);
		border-radius:0 0 5px 5px;
		padding: 5px;
		border: 1px solid #8cb9c0;
		display: flex;
		flex-wrap: wrap;
	}
	.circle-groups-item{
		width: calc(20% - 10px);
		padding-top: calc(20% - 10px);
		margin: 5px;
		box-sizing: border-box;
		position: relative;
/*		display: inline-block;*/

	}

	.circle-groups-item .circle{
		position: absolute;
		top: 0;
    left: 0;
    right: 0;
    bottom: 0;

		align-items: center;	
		width: 100%;
		height: 100%;
/*		border-radius: 50%;*/
		border: 1px solid #8cb9c0;
/*		line-height: 100%;*/
		color: #8cb9c0;
		display: flex;
		align-items: center;
    justify-content: center;
	}
	.circle-groups-item .circle.answered{
		background-color: #91b5a9;
		border: 1px solid #91b5a9;
		color: #fff;
	}

	.circle-groups-item .circle.current{
		background-color: #edca7f;
		border: 1px solid #edca7f;
		box-shadow: inset 0 0 0 1px white;
		color: #fff;
	}

	.fill-option {
		margin: 10px 0;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around

	}
	.fill-option .item {
		flex: 1;
		text-align: center;
		background-color: var(--card-hightlight);
		border: 2px solid var(--card-hightlight);
		border-radius: 5px;
		padding: 3px;
		margin:5px 5px;
	}

	.fill-option .item.selected {
		background-color: #7892b5;
		border: 2px solid #7892b5;
		color: #fff;
	}

	.fill-option .item:focus {
		background-color: #7892b5;
		border: 2px solid #7892b5;
		color: #fff;
	}

	.fill-option .item:hover {
		background-color: #7892b5;
		border: 2px solid #7892b5;
		color: #fff;
	}

	.exampaper{
		padding: 0 10px;
	}

	.exampaper h3{
		padding: 0 8px;
	}
	.question{
		margin-bottom: 30px;
		border: 1px solid var(--content-bgc);
		text-align: left;
		display: flex;
		flex-direction: column;
		line-height: 1.5rem;
		padding: 8px;
		border-radius: 10px;
	}

	.question.active{
/*		background-color: var(--card-hightlight);*/
		border: 1px solid #edca7f;
	}
	
	.question_content{
		white-space: pre-wrap;
		display: flex;
	}
	.question_content img{
		width: 100%;
	}
	.question_options{
		display: flex;
		flex-wrap: wrap;
    justify-content: space-between;
		margin-top: 10px;
		white-space: pre-wrap;
		padding-left: 1rem;
	}
	.question_options_group{
		flex-grow: 1;
		min-width: 50%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	}

	.option {
		min-width: 50%;
		box-sizing: border-box;
		padding: 0.5rem 10px;
		border-radius: 10px;
		cursor: pointer;
	}

	.option:hover {

	}

	.option.answered{
/*		background-color: #7892b5*/
		color: #f67280;
/*		color: #91b5a9;*/
	}


	.fill-type{
		display: flex;
		justify-content: space-between;
		padding: 0;
		margin-bottom: -1px;
		z-index: 888;
	}

	.fill-type li{
		flex:1;
		text-align: center;
		font-size: 15px;
		overflow: hidden;
		height: 18px;
		display: block;
		padding: 5px 0;
	}

	.fill-type li.active{
		background-color: var(--box-hightlight);
		border-radius:5px 5px 0 0;
		border: 1px solid #8cb9c0;
		border-bottom: none;

	}

	.buttonbox {
		display: flex;
		justify-content: center;
    align-items: center;
    
	}
	.buttonbox .button-items{
		border: var(--box-border);
    border-radius: 5px;
	}
	.button-items .button-item {
		display: inline-block;
		padding: 2px 10px;
		border-left: var(--box-border);
	}
	.button-items .button-item:first-child {
		border: none;
	}
	.examtimer {
		padding: 5px ;
	}

	@media (max-width:460px){
		.exampaperbox{
			flex-direction: column;
			height: calc(100svh - 61px);
		}
		.exampaperbox-left , .exampaperbox-expand{
			display: none;
		}
		.exampaperbox-right{
			overflow: auto;
/*			flex-basis: 100%;*/
			flex-grow: 1;

		}
		.question {
/*			filter:blur(2px);*/
		}
		.question.active{
			background-color: var(--card-hightlight);
/*			filter:blur(0);*/
		}
		.circle-groups{
			height: 100px;
			overflow: auto;
			align-content: flex-start;
		}
	}
	@media (min-width:461px){
		.exampaperbox-bottom{
			display: none;
		}
	}
	
</style>