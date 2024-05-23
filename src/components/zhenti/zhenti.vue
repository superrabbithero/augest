<template>	
	<div class="header" style="background: none;justify-content: flex-end;pointer-events: none;border:none">
		<div class="head-item" v-show="pencanvas_show">			
        	00:00
		</div>
		<div class="head-item" v-show="pencanvas_show" @click="pencanvas_show=!pencanvas_show" style="pointer-events:auto">			
      <IconWrapper iconName="PauseOne" theme="outline" :strokeWidth='4' />
		</div>
		<div class="head-item" v-show="!pencanvas_show" @click="pencanvas_show=!pencanvas_show" style="pointer-events:auto">
			<IconWrapper iconName="Play" theme="outline" :strokeWidth='4' />
		</div>  
		<div class="head-item" style="width:22px">
			
		</div>  
  </div>
  <div class="exampaperbox">
	  <div class="exampaperbox-left">
	  	<div class="answercard">
		  	<div class="bottonbox">
		  	</div>
		  	<div class="fillcard">
		  		<!-- <div v-for="index of 20" class="rect-groups">
		  			<span>{{index}}.</span>
		  			<div class="rect"></div>
		  			<div class="rect"></div>
		  			<div class="rect"></div>
		  			<div class="rect"></div>
		  		</div> -->
		  		<div  v-for="index of 20" class="circle-groups">
		  			<div :class="{'circle':true,'answered':stuAnswerList[index-1],'current':index-1 == currentNum}" @click="currentNum = index-1">{{index}}</div>
		  		</div>
		  		<div class="fill-option">
		  			<div v-for="(item, index) in ['A','B','C','D']" :class="{'item':true,'selected':stuAnswerList[currentNum] && stuAnswerList[currentNum] == item}" @click="answer(item)">{{item}}</div>
		  			{{currentNum}}
		  		</div>
		  	</div>
		  </div>
	  </div>
	  <div class="exampaperbox-right">
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

export default {
  components: {
  	pencanvas
  },
  data(){
    return {
      jsonData,
      letters:['A.','B.','C.','D.'],
	  	pencanvas_show:false,
	  	stuAnswerList:[],
	  	currentNum:0,
	  	questionCount:20
    }
  },
  mounted(){
  },
  methods:{
      answer(item){
      	var count = this.questionCount
      	if(this.currentNum <= 19){
      		this.stuAnswerList[this.currentNum] = item
      		while(this.stuAnswerList[this.currentNum]){
      			if(this.currentNum >= 19){
      					this.currentNum = 0
      					while(this.stuAnswerList[this.currentNum]){
      						// if(this.currentNum >= 19){
      						// 	break
      						// }else{
      							this.currentNum++
      						// }
      					}
      				
      			}else{
      				this.currentNum++
      			}
      		}
      	}else{
      		this.currentNum = 19
      	}
      	console.log(this.stuAnswerList)
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
	}
	.exampaperbox-right{
		overflow: auto;
		flex-basis: 80%;
		border-left: var(--box-border);
	}
	.answercard-{
		padding: 10px 30px;
	}

	.fillcard {
		display: flex;
		flex-wrap: wrap
	}
	.rect-groups{
	}
	.rect-groups>span{
		width: 20px;
		display: inline-block;
	}
	.rect-groups .rect{
		display: inline-block;
		width: 20px;
		height: 10px;
		border: 1px solid #000;
		margin-left: 5px;
	}
	.circle-groups {
			flex-basis: 20%;
	}
	.circle-groups .circle{
		width: 30px;
		height: 30px;
		border-radius: 16px;
		line-height: 30px;
		text-align: center;
		border: 1px solid #000;
		margin: 5px;
	}
	.circle-groups .circle.answered{
		background-color: green;
	}

	.circle-groups .circle.current{
		border:1px solid red;
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
		background-color: #ddd;
		padding: 3px;
		margin:5px 5px;
	}

	.fill-option .item.selected {
		background-color: red;
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
/*		flex-shrink: 0;*/
/*		flex-basis: 55%;*/
	}
</style>