<template>
<div class="au-layout">
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
							<svg-icon name="export01" size="24"></svg-icon>
						</div>
						<div class="analysis-item">
							<label>正确答案：</label>
							<div class="analysis-answer">{{currentAnalysisData.answer}}</div>
						</div>
						<div class="analysis-item">
							<label>知 识 点：</label>
							<div class="analysis-tag" v-for="knowledge in currentAnalysisData.knowledges">要点{{ knowledge }}</div>
							<svg-icon name="letter-plus01" size="20"></svg-icon>
						</div>
						<div class="analysis-item" style="flex-direction: column;">
							<label>我的解析：</label>
							<textarea v-if="edited" class="analysis-edit" v-model="currentAnalysisData.content" rows="10"></textarea>
							<div v-else class="analysis-content">{{currentAnalysisData.content}}</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="answercard" style="flex: 1;">
				<div class="fillcard">
					<div v-for="(type,index) in questionTypeList" style="width: 100%">
						{{type}}
						<div class="circle-groups">
							<div v-for="num in fillcardNum[index]" class="circle-groups-item">
								<div class="circle" @click="showQuestion(index,num.index,num.num)">{{num.num}}</div>
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
	  	questionTypeList:['常识','言语','数学','判推','资料'],
	  	currQTypeIndex:0,
	  	fillcardNum:[[],[],[],[],[]],
	  	letter:["A","B","C","D"],
		currentAnalysisData:{
			questionNum:1,
			answer:"",
			knowledges:[],
			like:false,
			mistake:false,
			content:"暂无解析"
		},
		edited:false
    }
  },
  mounted(){
	console.log('mounted')
  	this.loadJsonData().then(data => {
			console.log("init")
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
	showQuestion(type,index, num){
		console.log(type,index)
		this.currentQuestion = this.questions[type][index]
		this.currentNum = num
		this.$nextTick(()=>{
			this.TypeSet([document.getElementsByClassName("output")])
		})
	},
  	confirmLeave(to, from, next){
  		if (this.examstatus != 0) {
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
      if(this.examstatus != 0){
        // 在这里你可以处理关闭标签页时的逻辑
        const confirmationMessage = "考试进程中，直接离开会丢失当前草稿和答题内容";

        // 设置这个消息会让浏览器显示一个确认对话框
        event.returnValue = confirmationMessage;  // 标准兼容做法
        return confirmationMessage;  // 对某些旧版浏览器的支持
      }
    },
  	init(){
  		this.questions = [
      	this.jsonData.questions_1,
        this.jsonData.questions_2,
        this.jsonData.questions_3,
        this.jsonData.questions_4,
        this.jsonData.questions_5
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
		console.log(this.fillcardNum)
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
    			const jsonPath = `/json/zhenti/${this.$route.params.papername}.json`;
		      console.log(jsonPath);

		      const response = await fetch(jsonPath);
		      if (!response.ok) {
		        throw new Error('Network response was not ok');
		      }
		      this.jsonData = await response.json();
	      } catch (error) {
	        console.error('Failed to load JSON data:', error);
	      }
    }
  }
}
</script>
<style scoped>
.answercard{
		padding: 10px 10px;
	}

	.fillcard {
		width: 100%;
		display: flex;
		flex-wrap: wrap
	}
	
	.circle-groups {
		flex-basis: 100%;
		border-radius:0 0 5px 5px;
		padding: 5px;
		display: flex;
		flex-wrap: wrap;
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
		border: 1px solid #8cb9c0;
/*		line-height: 100%;*/
		color: #8cb9c0;
		display: flex;
		align-items: center;
    justify-content: center;
    cursor: pointer;
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
		/* padding-left: 1rem; */
		flex-direction: column;
	}
	.question_options_group{
		flex-grow: 1;
		min-width: 50%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
	}

	.option {
		min-width: 50%;
		box-sizing: border-box;
		padding: 0.5rem 10px;
		border-radius: 10px;
		cursor: pointer;
	}
	.left {
		/* width: calc(100% - 300px); */
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex:1;
		padding-right: 8px;
	}
	.right {
		flex:0 0 auto;
		width: 250px;
		overflow-x:hidden;
		border-left: var(--box-border);
		height: calc(-175px + 100vh);
		overflow-y: auto;
		box-sizing: border-box;
	}

	.right.hidden {
		width: 0;
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
		text-align:justify
	}
	.analysis-item label:after{
		display:inline-block;
		width: 100%;
		content:""
	}

	.analysis-item{
		display: flex;
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
</style>