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
		  			<li v-for="(type,index) in questionTypeList" :class="{'active':currQTypeIndex == index}" @click="currQTypeIndex=index">{{type}}</li>
		  		</ul>
		  		<div class="circle-groups">
		  			<div v-for="index of 20" class="circle-groups-item">
		  				<div :class="{'circle':true,'answered':stuAnswerList[index-1],'current':index-1 == currentNum}" @click="currentNum = index-1">{{index}}</div>
		  			</div>
		  		</div>
		  		<div class="fill-option">
		  			<div v-for="(item, index) in ['A','B','C','D']" :class="{'item':true,'selected':stuAnswerList[currentNum] && stuAnswerList[currentNum] == item}" @click="answer(item)">{{item}}</div>
		  		</div>
		  	</div>
		  </div>
	  </div>
	  <div class="exampaperbox-expand" style="width: 10px; background-color: grey;" @click="exampaperboxExpand()"></div>
	  <div class="exampaperbox-right" ref="right">
			<div class="exampaper" style="position:relative;">
				<pencanvas v-if="pencanvas_show"></pencanvas>
				<h3>一、常识判断</h3>
				<div class="question" v-for="(question,index) in jsonData.questions_1">
					<div class="question_content" v-html="question.content"></div>
					<div v-if="question.options" class="question_options">
						<div class="question_options_group">
							<div class="option" v-html="'A.' + question.options[0]"></div>
							<div class="option" v-html="'B.' + question.options[1]"></div>
						</div>
						<div class="question_options_group">
							<div class="option" v-html="'C.' + question.options[2]"></div>
							<div class="option" v-html="'D.' + question.options[3]"></div>
						</div>
					</div>
					<div v-for="question in question.sub_questions" class="question">
						<div class="question_content" v-html="question.content"></div>
						<div class="question_options_group">
							<div class="option" v-html="'A.' + question.options[0]"></div>
							<div class="option" v-html="'B.' + question.options[1]"></div>
						</div>
						<div class="question_options_group">
							<div class="option" v-html="'C.' + question.options[2]"></div>
							<div class="option" v-html="'D.' + question.options[3]"></div>
						</div>
					</div>
				</div>
				<h3>二、言语理解</h3>
				<div class="question" v-for="(question,index) in jsonData.questions_2">
					<div class="question_content" v-html="question.content"></div>
					<div v-if="question.options" class="question_options">
						<div class="question_options_group">
							<div class="option" v-html="'A.' + question.options[0]"></div>
							<div class="option" v-html="'B.' + question.options[1]"></div>
						</div>
						<div class="question_options_group">
							<div class="option" v-html="'C.' + question.options[2]"></div>
							<div class="option" v-html="'D.' + question.options[3]"></div>
						</div>
					</div>
					<div v-for="question in question.sub_questions" class="question">
						<div class="question_content" v-html="question.content"></div>
						<div class="question_options_group">
							<div class="option" v-html="'A.' + question.options[0]"></div>
							<div class="option" v-html="'B.' + question.options[1]"></div>
						</div>
						<div class="question_options_group">
							<div class="option" v-html="'C.' + question.options[2]"></div>
							<div class="option" v-html="'D.' + question.options[3]"></div>
						</div>
					</div>
				</div>
				<h3>三、数量关系</h3>
				<div class="question" v-for="(question,index) in jsonData.questions_3">
					<div class="question_content" v-html="question.content"></div>
					<div v-if="question.options" class="question_options">
						<div class="question_options_group">
							<div class="option" v-html="'A.' + question.options[0]"></div>
							<div class="option" v-html="'B.' + question.options[1]"></div>
						</div>
						<div class="question_options_group">
							<div class="option" v-html="'C.' + question.options[2]"></div>
							<div class="option" v-html="'D.' + question.options[3]"></div>
						</div>
					</div>
					<div v-for="question in question.sub_questions" class="question">
						<div class="question_content" v-html="question.content"></div>
						<div class="question_options_group">
							<div class="option" v-html="'A.' + question.options[0]"></div>
							<div class="option" v-html="'B.' + question.options[1]"></div>
						</div>
						<div class="question_options_group">
							<div class="option" v-html="'C.' + question.options[2]"></div>
							<div class="option" v-html="'D.' + question.options[3]"></div>
						</div>
					</div>
				</div>
				<h3>四、推理判断</h3>
				<div class="question" v-for="(question,index) in jsonData.questions_4">
					<div class="question_content" v-html="question.content"></div>
					<div v-if="question.options" class="question_options">
						<div class="question_options_group">
							<div class="option" v-html="'A.' + question.options[0]"></div>
							<div class="option" v-html="'B.' + question.options[1]"></div>
						</div>
						<div class="question_options_group">
							<div class="option" v-html="'C.' + question.options[2]"></div>
							<div class="option" v-html="'D.' + question.options[3]"></div>
						</div>
					</div>
					<div v-for="question in question.sub_questions" class="question">
						<div class="question_content" v-html="question.content"></div>
						<div class="question_options_group">
							<div class="option" v-html="'A.' + question.options[0]"></div>
							<div class="option" v-html="'B.' + question.options[1]"></div>
						</div>
						<div class="question_options_group">
							<div class="option" v-html="'C.' + question.options[2]"></div>
							<div class="option" v-html="'D.' + question.options[3]"></div>
						</div>
					</div>
				</div>
				<h3>五、资料分析</h3>
				<div class="question" v-for="(question,index) in jsonData.questions_5">
					<div class="question_content" v-html="question.content"></div>
					<div v-if="question.options" class="question_options">
						<div class="question_options_group">
							<div class="option" v-html="'A.' + question.options[0]"></div>
							<div class="option" v-html="'B.' + question.options[1]"></div>
						</div>
						<div class="question_options_group">
							<div class="option" v-html="'C.' + question.options[2]"></div>
							<div class="option" v-html="'D.' + question.options[3]"></div>
						</div>
					</div>
					<div v-for="question in question.sub_questions" class="question">
						<div class="question_content" v-html="question.content"></div>
						<div class="question_options_group">
							<div class="option" v-html="'A.' + question.options[0]"></div>
							<div class="option" v-html="'B.' + question.options[1]"></div>
						</div>
						<div class="question_options_group">
							<div class="option" v-html="'C.' + question.options[2]"></div>
							<div class="option" v-html="'D.' + question.options[3]"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import TheLatex2Math from './TheLatex2Math'
import jsonData from "@/assets/json/2022_js_C_test.json"
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
      letters:['A.','B.','C.','D.'],
	  	pencanvas_show:false,
	  	stuAnswerList:[],
	  	currentNum:0,
	  	questionCount:20,
	  	questionTypeList:['常识','言语','数学','判推','资料'],
	  	currQTypeIndex:0,
	  	exampaperbox_expand:false,
	  	examtimer:null,
	  	examstatus:0
    }
  },
  mounted(){
  	this.examtimer = this.$refs.examtimer
  },
  methods:{
      answer(item){
      	var count = this.questionCount
      	
      	this.stuAnswerList[this.currentNum] = item

      	let nextNum = (this.currentNum + 1) % count
      	while( nextNum != this.currentNum){
      		if(!this.stuAnswerList[nextNum]){
      			this.currentNum = nextNum;
      			break
      		}
      		nextNum = (nextNum + 1) % count
      	}

      	// if (this.stuAnswerList[this.currentNum]) {
            // alert('所有题目都设置完了！');
        //     return;
        // }
      	console.log(this.currentNum)
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
      }
  }

}
</script>
<style scoped>
	.exampaperbox{
		display: flex;
		height: calc(100vh - 61px);
	}
	.exampaperbox-left{
		flex-basis: 20%;
		display: flex;
		overflow: hidden;
		transition: flex-basis 0.3s ease
	}
	.exampaperbox-right{
		overflow: auto;
		flex-basis: 80%;
		border-left: var(--box-border);
		transition: flex-basis 0.3s ease
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
		
		padding: 0 1rem;
	}
	.question{
		margin-bottom: 30px;
		text-align: left;
		display: flex;
		flex-direction: column;
		width: 100%;

	}
	.question_content{
		white-space: pre-wrap;
	}
	.question_options{
		display: flex;
		flex-wrap: wrap;
    justify-content: space-between;
		margin-top: 10px;
		white-space: pre-wrap;
	}
	.question_options_group{
		flex-grow: 1;
/*		flex-shrink: 0;*/
/*		flex-basis: 50%;*/
		display: flex;
		flex-wrap: wrap;
	}
	.option {
		flex-grow: 1;
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
</style>