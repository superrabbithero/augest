<template>	
	<div class="container left" style="position:relative;">
		<pencanvas></pencanvas>
		<h3>一、常识判断</h3>
		<div class="question" v-for="(question,index) in jsonData.questions_1">
			<div class="question_content">{{question.content}}</div>
			<div class="question_options">
				<div class="question_options_group">
					<div class="option">A. {{question.options[0]}}</div>
					<div class="option">B. {{question.options[1]}}</div>
				</div>
				<div class="question_options_group">
					<div class="option">C. {{question.options[2]}}</div>
					<div class="option">D. {{question.options[3]}}</div>
				</div>
			</div>
		</div>
		<h3>二、言语理解</h3>
		<div class="question" v-for="(question,index) in jsonData.questions_2">
			<div class="question_content">{{question.content}}</div>
			<div class="question_options">
				<div class="question_options_group">
					<div class="option">A. {{question.options[0]}}</div>
					<div class="option">B. {{question.options[1]}}</div>
				</div>
				<div class="question_options_group">
					<div class="option">C. {{question.options[2]}}</div>
					<div class="option">D. {{question.options[3]}}</div>
				</div>
			</div>
		</div>
		<h3>三、数量关系</h3>
		<div class="question" v-for="(question,index) in jsonData.questions_3">
			<div class="question_content">{{question.content}}</div>
			<div class="question_options">
				<div class="question_options_group">
					<div class="option">A. {{question.options[0]}}</div>
					<div class="option">B. {{question.options[1]}}</div>
				</div>
				<div class="question_options_group">
					<div class="option">C. {{question.options[2]}}</div>
					<div class="option">D. {{question.options[3]}}</div>
				</div>
			</div>
		</div>
		<h3>四、推理判断</h3>
		<div class="question" v-for="(question,index) in jsonData.questions_4">
			<div class="question_content">{{question.content}}</div>
			<div v-if="question.options" class="question_options">
				<div class="question_options_group">
					<div class="option">A. {{question.options[0]}}</div>
					<div class="option">B. {{question.options[1]}}</div>
				</div>
				<div class="question_options_group">
					<div class="option">C. {{question.options[2]}}</div>
					<div class="option">D. {{question.options[3]}}</div>
				</div>
			</div>
			<div v-for="question in question.sub_questions" class="question">
				<div class="question_content">{{question.content}}</div>
				<div class="question_options_group">
					<div class="option">A. {{question.options[0]}}</div>
					<div class="option">B. {{question.options[1]}}</div>
				</div>
				<div class="question_options_group">
					<div class="option">C. {{question.options[2]}}</div>
					<div class="option">D. {{question.options[3]}}</div>
				</div>
			</div>
		</div>
		<h3>五、资料分析</h3>
		<div class="question" v-for="(question,index) in jsonData.questions_5">
			<div class="question_content">{{question.content}}</div>
			<div v-for="question in question.sub_questions" class="question">
				<div class="question_content">{{question.content}}</div>
				<div class="question_options_group">
					<div class="option">A. {{question.options[0]}}</div>
					<div class="option">B. {{question.options[1]}}</div>
				</div>
				<div class="question_options_group">
					<div class="option">C. {{question.options[2]}}</div>
					<div class="option">D. {{question.options[3]}}</div>
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
      letters:['A.','B.','C.','D.']
    }
  },

  methods:{
    
      
  }

}
</script>
<style scoped>
	.question{
		margin-top: 10px;
		text-align: left;
		display: flex;
		flex-direction: column;

	}
	.question_content, .question_options{
		display: flex;
		flex-wrap: wrap;
    	justify-content: space-between;
		margin-top: 5px;
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