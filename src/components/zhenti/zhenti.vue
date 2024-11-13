<template>
	<div class="header" style="background:var(--content-bgc);">
		<div class="head-item" @click="goback" id="menuicon">
			<svg-icon name="arrow-left"></svg-icon>
		</div>
		<div class="head-item"  style="margin-left: auto;">
			<div v-show="examstatus==0" @click="examstart()"  class="pagetitle" style="cursor: pointer;">开始考试</div>
			<div v-show="examstatus>0" @click="exampause()" class="examtimer" style="cursor: pointer;">
				<div class="buttonbox">
					<timer ref="examtimer" class="examtimer"></timer>
				</div>
			</div>
		</div>
		<div class="head-item"  style="margin-left: auto;">
			<button class="button-item" v-show="examstatus!=0" @click="openReport()">交卷</button>
			<!-- <svg-icon class="button-item" @click="" name="edit01"></svg-icon> -->
			
			<svg-icon :class="{'button-item':true,'active':pencanvas_show}"  @click="showPenCanvas" name="edit01"></svg-icon>
			<svg-icon :class="{'button-item':true,'active':!exampaperbox_expand}" @click="exampaperboxExpand" name="answerCard"></svg-icon>
			<!-- <svg-icon class="button-item" @click="gotoAnalysis" name="bulb02"></svg-icon> -->
			<svg-icon :class="{'button-item':true,'active':fontSizeBigger}"  @click="fontSizeBigger = !fontSizeBigger" name="font-size01" size="23"></svg-icon>
			<svg-icon class="button-item" @click="changeStyle" name="dark"></svg-icon>
		</div>   
	</div>
	<div :class="{'pause-screen':true,'show':examstatus==2}">
		<IconWrapper class="pause" iconName="Play" @click="examstart()" theme="filled" :size='100'/>
	</div>
	<div class="exampaperbox">
		<div :class="{'exampaperbox-left':true,'expand':exampaperbox_expand}" ref="left">
			<div class="answercard" style="flex: 1;">
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

		<div class="exampaperbox-right" ref="right">
			<div :class="{'exampaper':true, 'fontsize-bigger':fontSizeBigger}">
				<pencanvas :show="pencanvas_show" :switch="currQTypeIndex"></pencanvas>
				<h3 v-for="(title, index) in ['一、常识判断', '二、言语理解', '三、数量关系', '四、推理判断', '五、资料分析']" 
				v-show="currQTypeIndex == index">{{ title }}</h3>
				<div v-for="(questionsgroup,index) in questions" v-show="currQTypeIndex == index">
					<div :class="{'question':true,'active':!pencanvas_show && !question.sub_questions && question.no==currentNum}" v-for="(question,index) in questionsgroup" @click="currentNum = !question.sub_questions?parseInt(question.no):currentNum">
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
						<div v-for="question in question.sub_questions" :class="{'question':true,'active':!pencanvas_show && question.no==currentNum}" @click="currentNum = parseInt(question.no)">
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
	<my-model :show="modal_show.report_show" :modeless="false" :modalKey="'report_show'">
		<!-- json-view -->
		<div class="report step1" v-show="report_step == 1">
			<div class="report-content center" v-if="isFinished">
				已完成所有题目，用时{{timer}}确认结束考试？
			</div>
			<div class="report-content center" v-else>
				还有题目未完成，是否确认结束考试？
			</div>
			<div class="report-content center">
				<div class="button" @click="modal_show.report_show = false">取消</div>
				<div class="button" @click="examstop()">确认</div>
			</div>
		</div>
		<div class="report step2" v-show="report_step == 2">
			<div class="report-content">
				正确率：{{correctness}}%
			</div>
			<div class="report-content">
				交卷时间：{{reportDataJson.datetime}}
			</div>
			<div class="report-content">
				用时:{{reportDataJson.time}}
			</div>
			<div class="report-content center">
				<div class="button" @click="gotoAnalysis">前往解析</div>
			</div>
			<div class="fillcard">
				<ul class="fill-type" style="flex-basis: 100%;">
					<li v-for="(type,index) in questionTypeList" :class="{'active':currQTypeIndex == index}" @click="switchType(index)">{{type}}</li>
				</ul>
				<div v-for="(answerGroup,index) in answers" class="circle-groups" v-show="currQTypeIndex == index">
					<div v-for="(key,index) in Object.keys(answerGroup)" class="circle-groups-item">
						<div :class="{'circle':true,'right':answerGroup[key].mine == answerGroup[key].answer,'wrong':answerGroup[key].mine && answerGroup[key].mine != answerGroup[key].answer,'current':key == currentNum}" @click="rollTo(key)">{{key}}</div>
					</div>
				</div>
			</div>
		</div>

	</my-model>
	
</template>

<script>
// import TheLatex2Math from './TheLatex2Math'
// import jsonData from "@/assets/json/2022_js_C.json"
import pencanvas from "../Model/PenCanvas.vue"
import timer from "../Model/Time.vue"

export default {
	components: {
		pencanvas,
		timer
	},
	computed:{
		correctness(){
			var correctCount = 0
			this.reportDataJson.correctCount.forEach(item => {
				correctCount += item
			})
			return (correctCount/this.questionCount*100).toFixed(2)
		},
		isFinished(){
			for(let i=1;i < this.questionCount; i++){
				if(!this.stuAnswerList[i]){
					return false
				}
			}
			return true
		}
	},
	data(){
		return {
			papername:this.$route.params.papername+'.json',
			jsonData:null,
			questions:[],
			letters:['A.','B.','C.','D.'],
			pencanvas_show:false,
			stuAnswerList:[],
			currentNum:1,
			questionCount:null,
			questionTypeList:['常识','言语','数学','判推','资料'],
			currQTypeIndex:0,
			exampaperbox_expand:true,
			examtimer:null,
			timer:"00:00:00",
			examstatus:0,  //0：停止，1:进行中，2：暂停
			answers:[{},{},{},{},{}],
			canvasWidth:0,
			canvasHeight:0,
			modal_show:{
				report_show:false
			},
			report_step:1,
			reportDataJson:{"correctCount":[],"totalCount":[],"time":"00:00:00","datetime":null},
			fontSizeBigger:false
		}
	},
	mounted(){
		this.loadJsonData().then(data => {
			this.init()
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
		gotoAnalysis(){
			// console.log(toString(this.answers))
			sessionStorage.setItem("currentAnswers", JSON.stringify({"name":`${this.$route.params.papername}`,"answerJson":this.answers}));
			sessionStorage.setItem("currentQuestions", JSON.stringify(this.jsonData));
			this.$router.push(`/zhenti/analysis/${this.$route.params.papername}`)
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
    async changeStyle(){
      this.$constants.DARK = !this.$constants.DARK//点击切换模式
      localStorage.setItem('isDark',this.$constants.DARK)
      if(this.$constants.DARK){
        document.body.classList.add('dark')//黑夜模式时添加类名
      }else{
        document.body.classList.remove('dark')//白天删除类名
      }
    },
    goback(){
    	this.$router.back()
    },
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
    		this.jsonData[`questions_${i}`].forEach(question => {
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
    	this.questionCount = questionNum
	  	// console.log(this.answers)
    },
    answer(item){
    	if(this.examstatus == 1){
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
    	}else{
    		this.$toast.show('考试还没有开始','warn')
    	}
    	
    	
    },
    exampaperboxExpand(){
    	this.exampaperbox_expand = !this.exampaperbox_expand
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
    		this.reportDataJson.time = this.timer
    		this.examtimer.resetTimer()
    		this.reportDataJson.datetime = new Date().toLocaleString()

    		
    		for (let i = 0; i < 5; i++) {
    			var count = 0
    			var keys = Object.keys(this.answers[i])
    			keys.forEach(key => {
    				if(this.answers[i][key].answer == this.answers[i][key].mine){
    					count++
    				}
    			})
    			this.reportDataJson.correctCount[i] = count
    			this.reportDataJson.totalCount[i] = keys.length
    		} 
    		this.report_step = 2
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
    		if(this.examstatus == 1){
    			const answers = this.answers[this.currQTypeIndex]
    			answers[no].mine = item
    			this.stuAnswerList[no] = item
    		}
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
    },

    async loadJsonData() {
    	try {
    		const repoName = process.env.NODE_ENV === 'production' ? '/augest':''
    		const jsonPath = `${repoName}/json/zhenti/${this.$route.params.papername}.json`;
    		
    		console.log(jsonPath);

    		const response = await fetch(jsonPath);
    		if (!response.ok) {
    			throw new Error('Network response was not ok');
    		}
    		this.jsonData = await response.json();
    		console.log(JSON.stringify(this.jsonData))
    	} catch (error) {
    		console.error('Failed to load JSON data:', error);
    	}
    },

    openReport(){
    	if(!this.modal_show.report_show){
    		this.report_step = 1
    		this.modal_show.report_show = true
    	}
    },

    showPenCanvas(){
			// console.log(this.$parent.$refs.appHeader)
    	this.pencanvas_show=!this.pencanvas_show
			// if(this.pencanvas_show || this.examstatus != 0){
			// 	this.toggleHeader(false)
			// }else{
			// 	this.toggleHeader(true)
			// }
			// console.log(this.$parent.headerShow)
    },
    toggleHeader(visible) {
    	this.$emit('toggle-header', visible);
    }
  }
}
</script>
<style scoped>
	

.exampaperbox{
/*		width: 100%;*/
	margin: 0 -30px;
	display: flex;
	overflow: hidden;
	height: calc(100vh - 61px);
	line-height: 1.5rem;
}
.exampaperbox-left{
	background-color: var(--content-bgc);
	border-radius: 0 0 14px 14px;
	position: absolute;
	right: 10px;
	padding: 10px;
	width: 280px;
	display: flex;
	transition: transform 0.3s ease;
	z-index: 2;
	border: var(--box-border);

}

.exampaperbox-left.expand {
	transform: translateY(-100%);
}

.exampaperbox-right{
	overflow: auto;
	flex-basis: 100%;
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

.exampaperbox-bottom .fillcard .circle-groups-item,.report .fillcard .circle-groups-item{
	width: calc(10% - 6px);
	padding-top: calc(10% - 6px);
	margin: 3px;
	box-sizing: border-box;
	position: relative;
}

.answercard{
/*	padding: 10px 10px;*/
}

.fillcard {
	font-family: SmileySans-Oblique;
	min-width: 150px;
	display: flex;
	flex-wrap: wrap
}

.circle-groups {

	
	flex-basis: 100%;
	background-color: var(--box-hightlight);
	border-radius:0 0 5px 5px;
	padding: 5px;
/*	border: 1px solid #8cb9c0;*/
	display: flex;
	flex-wrap: wrap;
}
.circle-groups-item{
	width: calc(20% - 8px);
	padding-top: calc(20% - 8px);
	margin: 4px;
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
	box-sizing: border-box;
	align-items: center;	
	width: 100%;
	height: 100%;
		border-radius: 4px;
/*border: 1px solid #8cb9c0;*/
/*		line-height: 100%;*/
/*color: #8cb9c0;*/
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
background-color: var(--button-highlight);
}
.circle-groups-item .circle.answered{
	background-color: #91b5a9;
	border: 1px solid #91b5a9;
	color: #fff;
}

.circle-groups-item .circle.right{
	background-color: #8cb9c0;
	border: 1px solid #8cb9c0;
	color: #fff;
}

.circle-groups-item .circle.wrong{
	background-color: #E56E2E;
	border: 1px solid #E56E2E;
	color: #fff;
}

.exampaperbox-left .circle-groups-item .circle.current,.exampaperbox-bottom .circle-groups-item .circle.current{
/*	background-color: #edca7f;*/
	outline: 3px solid var(--main-color);
/*	box-shadow: inset 0 0 0 1px white;*/
/*	color: #fff;*/
}

.report .circle-groups-item .circle.current{
	box-shadow: inset 0 0 0 1px white;
/*		color: #fff;*/
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
	cursor: pointer;
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
	position:relative;
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
	margin: 0 0 0.8rem 0;

/*	margin-bottom: -1px;*/
/*	z-index: 888;*/
}

.fill-type li{
	user-select: none;
	cursor: pointer;
	flex:1;
	text-align: center;
	font-size: 15px;
	overflow: hidden;
	height: 18px;
	display: block;
	padding: 5px 0;
	border-radius: 0.5rem;
/*	transition: background-color 0.1s ease-in;*/
}

.fill-type li.active{
	background-color: #f76477;
  
  color: #eeeeee;

}

.buttonbox {
	display: flex;
	justify-content: center;
	align-items: center;
}

.buttonbox.top .button-items {
	background-color: var(--content-bgc);
	transition: opacity 0.3s ease;
	opacity: 0.5;
}

.buttonbox.top:hover .button-items {
	opacity: 1;
}

.buttonbox .button-items{
	display: flex;
	border: var(--box-border);
	border-radius: 5px;
}
.button-items .button-item {
	display: flex;
	padding: 5px 10px;
	border-left: var(--box-border);
	background-color: var(--card-hightlight);
	cursor: pointer;

}

.button-items .button-item svg{
	width: 18px;
}
.button-items .button-item:first-child {
	border: none;
}
.examtimer {
	text-align: center;
	width:95px;
	padding: 5px ;
	font-size: 1.5rem;
	font-family: 'GoodfonT-NET-XS03';
}

@media (max-width:460px){
	.exampaperbox{
		flex-direction: column;
		height: calc(100svh - 61px);
	}
	.exampaperbox-left{
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

.pause-screen {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	backdrop-filter: blur(5px);
	display: none;
	justify-content: center;
	align-items: center;
}

.pause-screen .pause {
	filter: drop-shadow(var(--box-shadow));

}

.pause-screen.show {
	display: flex;
}

.report {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.report-content {
	display: flex;
	width: 100%;
	margin-bottom: 2rem;
}

.report-content.center{
	justify-content: space-evenly
}

.report-content .button{
	background-color: var(--card-hightlight);
	padding: 5px 20px;
	border-radius: 6px;
	cursor: pointer;
}

.head-item .button-item{
	margin-left: 7px;
}

.button-item.active {
	color:var(--main-color)
}

.fontsize-bigger{
	font-size: 1.5rem;
	line-height: 2rem;
}


</style>