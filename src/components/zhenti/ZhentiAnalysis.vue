<template>
	<div class="au-layout" style="border-left:var(--box-border);border-right:var(--box-border);height: calc(-151px + 100vh);position: relative;background: var(--box-bgc);">
		<div class="rows start">
			<div class="left" ref="right">
				<div class="exampaper">
					<!-- <pencanvas :show="pencanvas_show" :switch="currQTypeIndex"></pencanvas> -->
					<div v-if="currentQuestion">
						<div class="question">
							<div class="question_content">
								<span v-if="!currentQuestion.sub_questions" :id="'ques_'+currentQuestion.no">{{currentQuestion.no}}.</span>
								<div v-html="' '+currentQuestion.content"></div>
							</div>
							<div v-if="currentQuestion.options" class="question_options">
								<div class="option" v-for="(option,index) in currentQuestion.options" v-html="letter[index]+'.' + option"></div>
							</div>
							<div v-for="question in currentQuestion.sub_questions" class="question" v-show="question.no == currentNum">
								<div class="question_content">
									<span :id="'ques_'+question.no">{{question.no}}. </span>
									<div v-html="' '+question.content"></div>
								</div>
								<div class="question_options">
									<div class="option" v-for="(option,index) in question.options" v-html="letter[index]+'.' + option"></div>
								</div>
							</div>
						</div>
						<div class="analysis">
							<div class="analysis-item action">
								<svg-icon :name="currentAnalysisData.like?'like02-fill':'like02'" size="24" :fill="currentAnalysisData.like?'#f96635':''" @click="currentAnalysisData.like = !currentAnalysisData.like"></svg-icon>
								<svg-icon :fill="currentAnalysisData.mistake?'#93d3a2':''" name="mistakes" size="24"  @click="currentAnalysisData.mistake = !currentAnalysisData.mistake"></svg-icon>
								<svg-icon :class="{'active':edited}" name="canvas02" size="24" @click="edited = !edited"></svg-icon>
								<svg-icon name="export01" size="24" @click="exportAnalysisDataJson"></svg-icon>
							</div>
							<div class="analysis-item">
								<label>正确答案：</label>
								<div class="analysis-answer">{{currentAnalysisData.answer}}</div>
							</div>
							<div class="analysis-item">
								<label>我的答案：</label>
								<div class="analysis-answer">{{currentAnalysisData.mineAnswer}}</div>
							</div>
							<div class="analysis-item">
								<label>知 识 点：</label>
								<div class="analysis-tag" v-for="knowledge in currentAnalysisData.knowledges">{{ knowledge }}</div>
								<svg-icon v-if="!tag_editing" name="letter-plus01" size="20" @click="tag_editing = true"></svg-icon>
								<input v-else v-model="addTagName" type="text" />
								<svg-icon v-show="tag_editing" name="correct01" size="20" @click="addTag()"></svg-icon>
								<svg-icon v-show="tag_editing" name="error01" size="20" @click="tag_editing=false;addTagName=''"></svg-icon>
							</div>
							<div class="analysis-item" style="flex-direction: column;align-items: flex-start;">
								<label>我的解析：</label>
								<textarea v-if="edited" class="analysis-edit" v-model="currentAnalysisData.content" rows="10"></textarea>
								<div v-else class="analysis-content">{{currentAnalysisData.content?currentAnalysisData.content:'暂无解析'}}</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			<div :class="{'right':true,'hidden':!right_show}">
				<div class="right-bar" @click="right_show = !right_show">第<font size="1">{{currentNum}}</font>题</div>
				<div class="answercard" style="flex: 1;">
					<div class="fillcard">
						<div v-for="(type,index) in questionTypeList" style="width: 100%">
							<label class="type">{{type}}</label>
							<div class="circle-groups">
								<div v-for="num in fillcardNum[index]" class="circle-groups-item">
									<div :class="{'circle':true,'active':num.num == currentNum,'mistake':AnalysisData[num.num-1].mistake}" @click="showQuestion(index,num.index,num.num)">{{num.num}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data(){
			return {
				currentQuestion:null,
				currentNum:1,
				jsonData:null,
				questions:[],
				questionTypeList:['常识判断','言语理解','数学运算','判推推理','资料分析'],
				currQTypeIndex:0,
				fillcardNum:[[],[],[],[],[]],
				letter:["A","B","C","D"],
				answers:null,
				AnalysisData:[],
				currentAnalysisData:{
					questionNum:1,
					answer:"",
					mineAnswer:"",
					knowledges:[],
					like:false,
					mistake:false,
					content:"暂无解析",
				},
				currentAnalysisChanged:false,
				edited:false,
				right_show:true,
				tag_editing:false,
				addTagName:''
			}
		},
		mounted(){
			console.log('mounted')
			this.loadJsonData().then(data => {
				
			}).catch(error => {
				console.log(error)
				this.initAnalysisDataJson()
			}).finally(()=>{
				this.init()
				this.showQuestion(0,0,1)
				this.TypeSet([document.getElementsByClassName("output")])
			})
  	// 添加监听器，当页面即将关闭时触发
			window.addEventListener("beforeunload", this.handleBeforeUnload);
		},
		unmounted(){
		// this.toggleHeader(true)
  	// 移除监听器，防止内存泄漏
			window.removeEventListener("beforeunload", this.handleBeforeUnload);
		},
		beforeRouteLeave(to, from, next) {
			this.confirmLeave(to, from, next);
		},
		methods:{
			addTag(){
				this.currentAnalysisData.knowledges.push(this.addTagName)
				this.tag_editing = false
				this.addTagName = ''
			},
			exportAnalysisDataJson(){
				console.log(JSON.stringify(this.AnalysisData));
			},
			initAnalysisDataJson(){
				let count = 0
				console.log(this.answers)
				for (let i = 0; i < 5; i++) {
					var keys = Object.keys(this.answers[i])
    			keys.forEach(key => {
    				if(this.answers[i][key]){
	    				count ++
	    				const answer = this.answers[i][key]
	    				// console.log(answer)
	    				const data = {
								questionNum:count,
								answer:answer.answer,
								mineAnswer:answer.mine,
								knowledges:[],
								like:false,
								mistake:answer.answer != answer.mine,
								content:"",
							};
							if(this.AnalysisData[count-1] && this.AnAnalysisData[count-1].questionNum == count){
								if(answer.mine){
									this.AnalysisData[count-1].mineAnswer = answer.mine
								}
							}else{
								this.AnalysisData.push(data)
							}
	    			}
    			})
	    	}
			},
			showQuestion(type,index,num){
				if(this.currentAnalysisChanged){
					this.AnalysisData[Number(this.currentNum)-1] = this.currentAnalysisData
					this.currentAnalysisChanged = false
				}
				console.log(type,index)
				this.currentQuestion = this.questions[type][index]
				this.currentNum = num
				this.currentAnalysisData = this.AnalysisData[Number(this.currentNum)-1]
				this.$nextTick(()=>{
					this.TypeSet([document.getElementsByClassName("output")])
				})
			},
			confirmLeave(to, from, next){
				if (false) {
					const answer = window.confirm("考试进程中，直接离开会丢失当前草稿和答题内容");
					if (answer) {
          next(); // 允许导航离开
        } else {
          next(false); // 阻止导航
        }
      } else {
        next(); // 如果没有未保存的更改，直接离开
      }
    },
    handleBeforeUnload(event){
    	if(false){
        // 在这里你可以处理关闭标签页时的逻辑
    		const confirmationMessage = "考试进程中，直接离开会丢失当前草稿和答题内容";

        // 设置这个消息会让浏览器显示一个确认对话框
        event.returnValue = confirmationMessage;  // 标准兼容做法
        return confirmationMessage;  // 对某些旧版浏览器的支持
      }
    },
    init(){
    	const jsonData = JSON.parse(sessionStorage.getItem("currentQuestions"))
    	this.questions = [
    		jsonData.questions_1,
    		jsonData.questions_2,
    		jsonData.questions_3,
    		jsonData.questions_4,
    		jsonData.questions_5
    		]
    	for (let i = 0; i < 5; i++) {
    		this.questions[i].forEach((question,index) => {
    			if (question.sub_questions){
    				question.sub_questions.forEach(subQ => {
    					this.fillcardNum[i].push({num:subQ.no,index:index})
    				})
    			}else{
    				this.fillcardNum[i].push({num:question.no,index:index})
    			}
    		});
    	}
    	this.answers = JSON.parse(sessionStorage.getItem("currentAnswers"));
    	// this.initAnalysisDataJson()
    },
    
    switchType(index){
    	this.currQTypeIndex = index;
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
    },

    async loadJsonData() {
    	try {
    		const jsonPath = `/json/zhenti/${this.$route.params.papername}_analysis.json`;
    		console.log(jsonPath);

    		const response = await fetch(jsonPath);
    		if (!response.ok) {
    			throw new Error('Network response was not ok');
    		}else{
    			this.AnalysisData = await response.json();
    		}
    		
    	} catch (error) {
    		console.error('Failed to load JSON data:', error);
    	}
    }
  }
}
</script>
<style scoped>
	label.type {
		font-family: SmileySans-Oblique;
		padding-left: 10px;
	}

	.answercard{
		width: 219px;
		padding: 10px 10px;
	}

	.fillcard {
		width: 100%;
		display: flex;
		flex-wrap: wrap
	}
	
	.circle-groups {
		flex-basis: 100%;
		border-radius:5px;
		padding: 5px;
		display: flex;
		flex-wrap: wrap;
		margin: 10px 0;
	}

	.circle-groups:hover {
		outline: 1px solid var(--main-color);
	}

	.sub-circle-groups {
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
	border-radius: 50%;
	border: var(--box-border);
/*		line-height: 100%;*/
/*		color: #8cb9c0;*/
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
font-size: 80%;
}

.circle-groups-item .circle.active,.circle-groups-item .circle.active:hover{
	border: 1px solid #8cb9c0;
	background-color: #8cb9c0;
/*		line-height: 100%;*/
color: #fff;
}

.circle-groups-item .circle.mistake,.circle-groups-item .circle.mistake:hover{
	border: 1px solid #f96635;
	background-color: #f96635;
/*		line-height: 100%;*/
color: #fff;
}

.circle-groups-item .circle:hover{
	border: 1px solid #8cb9c0;
	color: #8cb9c0;
}

.question{
/*		margin-bottom: 30px;*/
/*border: 1px solid var(--content-bgc);*/
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


.option {
	min-width: 50%;
	box-sizing: border-box;
	padding: 0.5rem 10px;
	border-radius: 10px;
}
.left {
	/* width: calc(100% - 300px); */
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	flex:1;
	padding-right: 8px;
	overflow-y: auto;
}
.right {
	flex:0 0 auto;
	width: 250px;
	overflow-x:hidden;
	border-left: var(--box-border);
/*		height: calc(-175px + 100vh);*/
overflow-y: auto;
box-sizing: border-box;
transition: 0.3s ease;
}

.right.hidden {
	width: 1.2rem;
	overflow: hidden;
}

.right.hidden .right-bar{
	opacity: 1;
	transition-delay: 0.3s;
	transition: opacity 0.8s ease-in-out;
	cursor: pointer;
}

.right-bar {
	height: 100%;
	width: 1.2rem;
	position: absolute;
	font-size: 0.8rem;
	text-align: center;
	padding-left: 2px;
	opacity: 0;
	transition-delay: 0s;
/*    transition: opacity 0.3s ease;*/
}

.left,.right{
	height: calc(-151px + 100vh);
	overflow: auto;
}

.analysis {
	padding: 8px;
	border: var(--box-border);
	border-radius: 8px;
}

.analysis-item label{
	width: 5rem;
	font-family: SmileySans-Oblique;
	text-align:justify;
	line-height: 2rem;
  height: 2rem;
}
.analysis-item label:after{
	display:inline-block;
	width: 100%;
	content:""
}

.analysis-item{
	display: flex;
	align-items: center;
}

.analysis-item.action{
	justify-content: flex-end;
}
.analysis-item.action > *{
	margin-left: 8px
}

.analysis-item.action .active{
	color:var(--main-color)
}

.analysis-tag{
	height: 25px;
	border-radius: 5px;
	background-color: var(--white-highlight);
	line-height: 25px;
	font-size: 14px;
	padding: 0 8px;
	margin-right: 5px;
}
</style>