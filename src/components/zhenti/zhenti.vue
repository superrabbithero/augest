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
	<div class="container left" style="position:relative;">
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
	  pencanvas_show:false
    }
  },

  methods:{
    
      
  }

}
</script>
<style scoped>
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