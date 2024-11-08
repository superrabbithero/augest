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
								<svg-icon :name="currentAnalysisData.like?'like02-fill':'like02'" size="24" :fill="currentAnalysisData.like?'#ffc848':''" @click="currentAnalysisData.like = !currentAnalysisData.like"></svg-icon>
								<svg-icon :fill="currentAnalysisData.mistake?'#f96635':''" name="mistakes" size="24"  @click="currentAnalysisData.mistake = !currentAnalysisData.mistake"></svg-icon>
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
								<div class="analysis-tag" v-for="[key,value] in Object.entries(currentAnalysisData.knowledges)">{{ value }}</div>
								<svg-icon v-if="!tag_editing" name="letter-plus01" size="20" @click="modal_show.knowledge_show = !modal_show.knowledge_show"></svg-icon>
								<input v-else v-model="addTagName" type="text" />
								<svg-icon v-show="tag_editing" name="correct01" size="20" @click="addTag()"></svg-icon>
								<svg-icon v-show="tag_editing" name="error01" size="20" @click="tag_editing=false;addTagName=''"></svg-icon>
							</div>
							<div class="analysis-item" style="justify-content: space-between;">
								<div class="analysis-item">
									<label>我的解析：</label>
									<svg-icon :class="{'active':edited}" name="canvas02" size="20" @click="edited = !edited,tempAnalysisContent = currentAnalysisData.content"></svg-icon>
								</div>
								<div class="analysis-item" v-show="edited">
									<button @click="formatText('bold')" class="icon-button edit-button"><svg-icon name="blod02" size="20"></svg-icon></button>
									<button @click="formatText('underline')" class="icon-button edit-button"><svg-icon  name="underline01" size="20"></svg-icon></button>
									<button @click="formatText('italic')" class="icon-button edit-button"><svg-icon name="italic01" size="20"></svg-icon></button>
									<button @click="formatText('insertUnorderedList')" class="icon-button edit-button"><svg-icon name="insertlist01" size="20"></svg-icon></button>
									<button @click="formatText('insertOrderedList')" class="icon-button edit-button"><svg-icon name="insert-order-list01" size="20"></svg-icon></button>
									<!-- <button @click="highlightText">高亮引用</button> -->
								</div>
							</div>
							<div class="analysis-item">
								<div contenteditable="true" :innerHTML="tempAnalysisContent" v-if="edited" class="analysis-edit" @input="updateAnalysisContent" rows="10">
								</div>

								<div v-else class="analysis-content" v-html="currentAnalysisData.content?currentAnalysisData.content:'暂无解析'">

								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
			<div :class="{'right':true,'hidden':!right_show}">
				<div class="right-bar" @click="right_show = !right_show">
					<svg-icon size="14" name="arrow-up" @click.stop @click="preQuestion"></svg-icon>
					第
					<span style="margin: 5px 0;font-size: 12px">{{currentNum}}</span>
					题
					<svg-icon size="14" name="arrow-down" @click.stop @click="nextQuestion"></svg-icon>
				</div>
				<div class="answercard" style="flex: 1;">
					<div class="fillcard">
						<div v-for="(type,index) in questionTypeList" style="width: 100%">
							<div class="type-title">
								<label class="type">{{type}}</label>
								<span class="accuracy" style="font-size: 14px;">{{accuracyList[index]?accuracyList[index]+'%':'未作答'}}</span>
							</div>
							<div class="circle-groups">
								<div v-for="(num,i) in fillcardNum[index]" class="circle-groups-item">
									<div :class="{'circle':true,'active':num.num == currentNum,'mistake':AnalysisData[num.num-1].mistake,'liked':AnalysisData[num.num-1].like}" @click="showQuestion(index,i,num.num)">{{num.num}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<my-model :show="modal_show.knowledge_show" :modeless="false" :modalKey="'knowledge_show'">
		<TreeSelect :treeData="treeData" :selectedMap="currentAnalysisData.knowledges"/>
	</my-model>
</template>

<script>
	import TreeSelect from '@/components/Model/TreeSelect.vue';

	export default {
		data(){
			return {
				currentQuestion:null,
				currentNum:1,
				jsonData:null,
				questions:[],
				questionTypeList:['常识判断','言语理解','数学运算','判推推理','资料分析'],
				accuracyList:[],
				currQTypeIndex:0,
				fillcardNum:[[],[],[],[],[]],
				currentFillcardNumIndex:[],
				letter:["A","B","C","D"],
				answers:null,
				AnalysisData:[],
				tempAnalysisContent:"",
				currentAnalysisData:{
					questionNum:1,
					answer:"",
					mineAnswer:"",
					knowledges:{},
					like:false,
					mistake:false,
					content:"暂无解析",
				},
				currentAnalysisChanged:false,
				edited:false,
				right_show:false,
				tag_editing:false,
				addTagName:'',
				modal_show:{
					knowledge_show:false
				},
				//知识点树形结构
				treeData:[
				{
					"id":1,
					"name": "政治理论",
					"children": []
				},
				{
					"id":2,
					"name": "常识判断",
					"children": []
				},
				{
					"id":3,
					"name": "言语理解",
					"children": []
				},
				{
					"id":4,
					"name": "数学运算",
					"children": []
				},
				{
					"id":5,
					"name": "判断推理",
					"children": [
					{
						"id":6,
						"name": "图形推理",
						"children": []
					},
					{
						"id":7,
						"name": "定义判断",
						"children": []
					},
					{
						"id":8,
						"name": "朴素逻辑",
						"children": []
					},
					{
						"id":9,
						"name": "增强削弱",
						"children": []
					},
					{
						"id":10,
						"name": "排列组合",
						"children": []
					}
					]
				},
				{
					"id":11,
					"name": "资料分析",
					"children": [
					{
						"id":12,
						"name": "普通增长",
						"children": []
					},
					{
						"id":13,
						"name": "比值",
						"children": []
					},
					{
						"id":14,
						"name": "大小比较",
						"children": []
					},
					{
						"id":15,
						"name": "年均增长",
						"children": []
					},
					{
						"id":16,
						"name": "速算技巧",
						"children": [
						{
							"id":17,
							"name": "多项加法",
							"children": []
						},
						{
							"id":18,
							"name": "错位法",
							"children": []
						},
						{
							"id":19,
							"name": "假设分配",
							"children": []
						}
						]
					}
					]
				}
				]
			}
		},
		components: {
			TreeSelect
		},
		mounted(){
			this.loadJsonData().then(data => {

			}).catch(error => {
				console.log(error)

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
			//获得知识点(树形数据节点id的最大值用于增加节点)
			getMaxId(nodes) {
				let maxId = 0;
				nodes.forEach(node => {
					maxId = Math.max(maxId, node.id);
					if (node.children && node.children.length > 0) {
						const childMaxId = getMaxId(node.children);
						maxId = Math.max(maxId, childMaxId);
					}
				});
				return maxId;
			},
			//增加节点
			addNode(parentNode, newNode) {
				const newId = getMaxId(treeData) + 1; // 获取新的 id
				newNode.id = newId; // 设置新节点的 id
				parentNode.children.push(newNode); // 将新节点添加到父节点的 children 中
			},
			//通过id修改节点名称
			updateNodeName(nodes=this.treeData, id, newName) {
				for (const node of nodes) {
					if (node.id === id) {
						node.name = newName; // 修改节点的 name
						return true; // 找到并修改，返回 true
					}
					if (node.children && node.children.length > 0) {
						const found = updateNodeName(node.children, id, newName); 
						// 递归查找子节点
						if (found) {
						  return true; // 如果在子节点中找到，返回 true
						}
					}
				}
				return false; // 未找到，返回 false
			},

			formatText(command) {
				document.execCommand(command, false, null);
			},
			highlightText() {
				document.execCommand('backColor', false, 'yellow'); // 高亮为黄色
			},
			updateAnalysisContent(event){
				const content = event.target.innerHTML.replace(/<br>\s*<\/?br>/g, '').trim();
				this.currentAnalysisData.content = content == '<br>' ? '' : content
			},
			preQuestion(){
				let type = this.currentFillcardNumIndex[0]
				let i = this.currentFillcardNumIndex[1]
				let num = this.currentFillcardNumIndex[2]
				// console.log(type,i,num)
				if(i > 0){
					this.showQuestion(type,i-1,num-1)
				}else if(type > 0){
					this.showQuestion(type-1,this.fillcardNum[type-1].length-1,num-1)
				}
			},
			nextQuestion(){
				let type = this.currentFillcardNumIndex[0]
				let i = this.currentFillcardNumIndex[1]
				let num = this.currentFillcardNumIndex[2]
				// console.log(type,i,num,this.fillcardNum[type].length)
				if(i < this.fillcardNum[type].length-1){
					this.showQuestion(type,i+1,num+1)
				}else if(type < 4){
					this.showQuestion(type+1,0,num+1)
				}
			},
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
			// console.log(this.answers)
				this.answers = JSON.parse(sessionStorage.getItem("currentAnswers"));
			// console.log(this.answers)
				// console.log("获取的解析文件：",this.AnalysisData)
				if(this.answers == null || this.answers.name != `${this.$route.params.papername}`){
					return
				}

				for (let i = 0; i < 5; i++) {
					var keys = Object.keys(this.answers.answerJson[i])
					keys.forEach(key => {
						if(this.answers.answerJson[i][key]){
							count ++
							const answer = this.answers.answerJson[i][key]
			// console.log(answer)
							const data = {
								questionNum:count,
								answer:answer.answer,
								mineAnswer:answer.mine,
								knowledges:{},
								like:false,
								mistake:answer.answer != answer.mine && answer.mine != '',
								content:"",
							};
							if(this.AnalysisData[count-1] && this.AnalysisData[count-1].questionNum == count){
								if(answer.mine != ''){
									this.AnalysisData[count-1].mineAnswer = answer.mine
								}
							}else{
								this.AnalysisData.push(data)
							}
						}
					})
				}
				// console.log("初始化后的解析文件：",this.AnalysisData)
			},
			showQuestion(type,i,num){
				const index = this.fillcardNum[type][i].index
			// console.log("showQuestion",type,i,num)
				this.currentFillcardNumIndex = [type,i,num]
				if(this.currentAnalysisChanged){
					this.AnalysisData[Number(this.currentNum)-1] = this.currentAnalysisData
					this.currentAnalysisChanged = false
				}
			// console.log(type,index)
				this.currentQuestion = this.questions[type][index]
				this.currentNum = num
				this.currentAnalysisData = this.AnalysisData[Number(this.currentNum)-1]
				//用于将object转为map
				// this.currentAnalysisData.knowledges = new Map(Object.entries(this.currentAnalysisData.knowledges))
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
				const jsonData = this.jsonData
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
				this.initAnalysisDataJson()
			// this.initAccuracy()
			},
			initAccuracy(){
				for(var i=0; i<5;i++){
					let right = 0;
					let wrong = 0;
					let none = 0;
					this.fillcardNum[i].forEach(num => {
						const aData = this.AnalysisData[num.num-1]
						if(aData.mineAnswer == ""){
							none++
						}else if(aData.mineAnswer != aData.answer){
							wrong++
						}else{
							right++
						}
					})
			// console.log(`${this.questionTypeList[i]}中正确${right}个，错误${wrong}个，未作答${none}个`)
					if(right == 0 && wrong == 0){
						this.accuracyList[i] = null
					}else{
						this.accuracyList[i] = (100*right/(right+wrong+none)).toFixed(1)
					}
				}
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
					const jsonPath2 = `/json/zhenti/${this.$route.params.papername}.json`;

					const response2 = await fetch(jsonPath2);
					if (!response2.ok) {
						throw new Error('Network response2 was not ok');
					}
					this.jsonData = await response2.json();

					const jsonPath = `/json/zhenti/${this.$route.params.papername}_analysis.json`;
			// console.log(jsonPath);
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
	.type-title{
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		font-family: SmileySans-Oblique;
		align-items: flex-end
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
		background-color: var(--box-hightlight);
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
	font-family: SmileySans-Oblique;
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

.circle-groups-item .circle.active,.circle-groups-item .circle.active:hover{
	outline: 3px solid var(--main-color);
	text-decoration: underline;
/*border: 1px solid #8cb9c0;
background-color: #8cb9c0;
color: #fff;*/
}

.circle-groups-item .circle.liked,.circle-groups-item .circle.liked:hover{
	border: 1px solid #ffc848;
	background-color: #ffc848;
	color: #fff;
}

.circle-groups-item .circle.mistake,.circle-groups-item .circle.mistake:hover{
	border: 1px solid #f96635;
	background-color: #f96635;
	color: #fff;
}



.circle-groups-item .circle:hover{
	outline: 2px solid var(--main-color);
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
/*	padding-right: 8px;*/
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
	display: flex;
	flex-direction: column;
	align-items: center;
}

.right.hidden .answercard{
	opacity: 1;
}

.right-bar {
	height: 100%;
	width: 1.2rem;
	position: absolute;
	z-index: 1;
	background-color: var(--box-bgc);
	font-size: 0.8rem;
	text-align: center;
	padding-left: 2px;
	opacity: 0;
	transition-delay: 0s;
/*		transition: opacity 0.3s ease;*/
}

.left,.right{
	height: calc(-151px + 100vh);
	overflow: auto;
}

.analysis {
	margin-right: 8px;
	padding: 8px;
	border: var(--box-border);
	border-radius: 8px;
}

.analysis-item label, .analysis-item .analysis-answer{
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

.analysis-item .active{
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

.analysis-edit:focus {
	outline: none;
}

.analysis-edit,.analysis-content{
	border: 2px solid transparent;
	box-sizing: border-box;
	border-radius: 5px;
	padding: 5px 10px;
	background-color: var(--color-canvas-subtle);
	flex: 1;
}
.analysis-edit{
	border: 2px solid var(--main-color);
	min-height: 5rem;

}

.edit-button:not(:last-child):after{
	content: "";
	width: 0;
	border-left: var(--box-border);
	margin: 0 5px;
}

</style>