<template>
  <my-model :show="modal_show.linkxuecemodal_show" :dragable="true" :modalKey="'linkxuecemodal_show'">
    <!-- 自动填涂 -->
    <div class="modal-content">
      <div class="modal-line">
        <label>环境：</label>
        <input type="radio" id="option1" name="env" value="1" v-model="env">
        <label for="option1">test1</label>
        <input type="radio" id="option2" name="env" value="2" v-model="env" checked>
        <label for="option2">test2</label>
      </div>
      <div class="modal-line">
        <label>类型：</label>
        <input type="radio" id="option3" name="papertype" value="0" v-model="papertype" checked>
        <label for="option3">考试</label>
        <input type="radio" id="option4" name="papertype" value="1" v-model="papertype">
        <label for="option4">作业</label>
      </div>
      <div class="modal-line">
        <label>考试/作业id：</label>
        <input type="text" v-model="paperid" />
        <button @click="linktoXuece()">关联</button>
      </div>
      <div class="modal-line" v-show="pdfUrl">
        <button @click="downloadPDF()">下载并导入</button>
      </div>
    </div>
  </my-model>

  <my-model :show="modal_show.json_show" :dragable="true" :modalKey="'json_show'">
    <!-- json-view -->
    <div class="modal-content" >
     <json-model :json-data="cutParamJson"></json-model>
    </div>
    <textarea v-model="cutParamJsonStr"/>
    <button @click="formattedJsonStr">生成Json</button>
  </my-model>

  <my-model :show="modal_show.fill_show" :dragable="true" :modalKey="'fill_show'">
    <div class="au-layout">
      <div class="rows gutter-l" >
        <div class="cols s12">
          <input type="radio" name="fillError" id="noError" value="0" v-model="fillError">
          <label for="noError">自定义</label>
        </div>
      </div>
      <div class="rows gutter-l" v-show="fillError == 0">
        <div class="cols s3">
          <input type="checkbox" id="ticketNum" v-model="fillNum">
          <label for="ticketNum">准考证</label>
        </div>
        <div class="cols s3">
          <input type="checkbox" id="obj-q" v-model="fillObj">
          <label for="obj-q">客观题</label>
        </div>
        <div class="cols s3">
          <au-select :dataList="['A','AB','ABC','ABCD']" @change="changeOptionOffset"></au-select>
        </div>
        <div class="cols s3">
          <input type="checkbox" id="subj-q" v-model="fillSubj">
          <label for="subj-q">主观题</label>
        </div>
      </div>
      <div class="rows gutter-l" >
        <div class="cols s6">
          <input type="radio" name="fillError" id="ticketNumberError" value="1" v-model="fillError">
          <label for="ticknumberError">准考证异常</label>
        </div>
        <div class="cols s6">
          <input type="radio" name="fillError" id="positionError" value="2" v-model="fillError">
          <label for="positionError">识别点异常</label>
        </div>
      </div>
      <div class="rows gutter-l" >
        <div class="cols s6">
          <input type="radio" name="fillError" id="objError" value="3" v-model="fillError">
          <label for="objError">客观题异常</label>
        </div>
        <div class="cols s6">
          <input type="radio" name="fillError" id="subjError" value="4" v-model="fillError">
          <label for="subjError">主观题异常</label>
        </div>
      </div>
      <div class="rows gutter-l end">
        <div class="cols">
          <button @click="fillAnswerCard()">填涂</button>
        </div>
      </div>
    </div>
  </my-model>


  <div class="sheetview">
    <div class="sheeteditor" :style="{ height:clientHeight + 'px'}">
      <input type="file" ref="uploadpdf" @change="handleFileChange" accept=".pdf" style="display: none;">
      <div v-if="!canvasVisible" class="cover">
        <div class="cover-title">答 题 卡 生 成</div>
        <div class="start-btn" @click="clickuploadpdf">点 击 上 传</div>
        <div class="start-btn" @click="modal_show.linkxuecemodal_show=!modal_show.linkxuecemodal_show" style="margin-top: 20px;">关 联 试 卷</div>
      </div>
      <div v-if="canvasVisible"  >
        <div @click="clickuploadpdf" class="filenameview">
          <file-pdf-one theme="filled" size="22" :strokeWidth="1"/>
          <div class="filename">{{filename}}</div>
        </div>

        <!-- 识别点编辑按钮 -->
        
        <div class="cutparameditbox">
          <focus-one @click="showCutParam()" theme="outline" size="22" :strokeWidth="1"/>
        </div>
        <div class="cutparameditbox">
          <link-three @click="modal_show.linkxuecemodal_show=!modal_show.linkxuecemodal_show" theme="outline" size="22" :strokeWidth="2"/>
        </div>
        <div class="cutparameditbox" v-show="cutParamJson" @click="modal_show.json_show=!modal_show.json_show">
          <div class="filename">JSON</div>
        </div>
        <div class="cutparameditbox" v-show="cutParamJson" @click="modal_show.fill_show=!modal_show.fill_show">
          <div class="filename">填涂</div>
        </div>
      </div>

      <div v-if="canvasVisible" class="canvasbox" :style="{ height:clientHeight - 40 + 'px'}" ref="canvasbox">
        <canvas class="sheet-canvas" @mousedown="MoDown($event)" @mousemove="MoMove($event)" @mouseup="MoUp" v-for="pageIndex in pdfPages " :id="'canvas'+pageIndex" :key="pageIndex" v-show="pageIndex == pageNum" ref="pdfcanvas">
        </canvas>

         <!-- 识别点展示 -->
        <div ref="cutparampage" class="cutpage" v-show="cutparamshow">
          <div ref="cutparampanel" class="cutpage-panel" v-if="cutParamJson">
            <div class="cutpage-section" v-show="pageNum%2===1"
            :style="{ width:cutParamJson.studentIdRect ? (cutDivScale*cutParamJson.studentIdRect.width + 'px') : '0',
                      height:cutParamJson.studentIdRect ? (cutDivScale*cutParamJson.studentIdRect.height + 'px') : '0',
                      top:cutParamJson.studentIdRect ? (cutDivScale*cutParamJson.studentIdRect.y + 'px') : '0',
                      left:cutParamJson.studentIdRect ? (cutDivScale*cutParamJson.studentIdRect.x + 'px') : '0'}"></div>
            <div class="cutpage-section"  v-for="section in cutParamJson.section" v-show="section.pageNumber == pageNum"
            :style="{ width:cutDivScale*section.rect.width + 'px',
                      height:cutDivScale*section.rect.height + 'px',
                      top:cutDivScale*section.rect.y + 'px',
                      left:cutDivScale*section.rect.x + 'px'}">
              <div class="cutpage-section sub" v-for="subsection in section.subsections" :style="{ width:'1px',height:'1px',
                      top:cutDivScale*subsection.y + 'px',
                      left:cutDivScale*subsection.x + 'px'}">
              </div>
            </div>
          </div>
        </div>

        <div class="dragged-image" v-for="(image, index) in images" v-show="image" :key="index"  @mousedown="dragimgdown($event)"  @mouseup="dragimgup" :ref="`image-${index}`">
          <img  draggable="false" :src="image" width="150" />
          <check-one theme="outline" size="22" fill="#7ed321" :strokeWidth="2" style="position: absolute;right: -11px;top: -9px;" @click="darwimg(index)" @mousedown.prevent="$event.stopPropagation()" @mouseup="$event.stopPropagation()"/>
          <close-one theme="outline" size="22" fill="#d0021b" :strokeWidth="2" style="position: absolute;right: -11px;top: 24px;" @click="delimg(index)" @mousedown.prevent="$event.stopPropagation()" @mouseup="$event.stopPropagation()"/>
          <sliding-horizontal theme="outline" size="22" fill="#555" :strokeWidth="2" style="position: absolute;right: -11px;bottom: -9px;" @mousedown.prevent="resizeImgStart($event,index)" @mousemove="$event.stopPropagation()" @mouseup="stopResize"/>
        </div>

        <edit-tools-box v-if="canvasVisible"></edit-tools-box>
      </div>
    </div>            
  </div>
</template>



<script>
import * as pdfjsLib from "pdfjs-dist";
import {ApplicationTwo,Pencil,Undo,RectangleOne,LeftOne,RightOne,FilePdfOne,CloseOne,CheckOne,SlidingHorizontal,FocusOne,LinkThree} from '@icon-park/vue-next';
import EditToolsBox from "@/components/EditToolsBox.vue";
import key from 'keymaster'
import {login, getanswercard} from "@/assets/js/xueceapi.js"
import auSelect from "./Model/auSelect.vue"



export default {
  data() {
    return {
      images: [],
      data_style:"move",
      canvasVisible: false,
      pdfDoc: null,
      pageNum: 1,
      penColor: "#000",
      hlpenColor: "#000",
      penWidth: 4,
      hlpenWidth: 20,
      penClick: false,
      startAxisX: 0,
      startAxisY: 0,
      controlPointX: 0,
      controlPointY: 0,
      points:[],
      beginPoint:{x:0,y:0},
      history: [],
      historys: [],
      canvas: null,
      ctx: null,
      undo: false,
      pdfPages: 0,
      scaleCount: 0.8,
      widthTemp: 0,
      heightTemp: 0,
      // h : window.innerHeight,
      clientHeight: document.documentElement.clientHeight - 145,

      // 控制小手拖动
      draged : false,
      disx: 0,
      disy: 0,
      // 同步所有图片的拖动位置
      canvasX: 0,
      canvasY: 0,

      //回显pdffilename
      filename: '',

      //拖拽图片
      draggedImageDom: null,

      //识别点信息
      cutparamshow:false,
      anchorxy:{x:0,y:0},
      // cutParamJson:null,
      cutParamJsonStr:"",
      cutParamJson:{"pageSize":{"width":1588,"height":1123},"anchorSize":{"width":26,"height":13},"panelSize":{"width":1492,"height":1044},"singlePagePartition":2,"section":[{"sectionType":"ClassId","pageNumber":1,"rect":{"x":480,"y":81,"width":247,"height":46},"subsections":[{"x":27,"y":5.9,"rows":2,"columns":1,"rowGroupSize":999,"positions":10,"cellWidth":18.7,"cellHeight":10.2,"cellGapWidth":3.3,"rowGapHeight":12.8,"columnGapWidth":0,"rowGroupGapHeight":0,"totalSequences":2,"sequenceOption":"HorizontalFirst"}]},{"sectionType":"StudentId","pageNumber":1,"rect":{"x":480,"y":127,"width":247,"height":46},"subsections":[{"x":27,"y":5.9,"rows":2,"columns":1,"rowGroupSize":999,"positions":10,"cellWidth":18.7,"cellHeight":10.2,"cellGapWidth":3.3,"rowGapHeight":12.8,"columnGapWidth":0,"rowGroupGapHeight":0,"totalSequences":2,"sequenceOption":"HorizontalFirst"}]},{"sectionType":"MultiChoice","pageNumber":1,"seqArr":[1,2,3,4],"multiSelect":[true,true,false,false],"rect":{"x":0,"y":187,"width":734,"height":587},"subsections":[{"x":40,"y":38,"cellWidth":12,"cellHeight":12,"sequenceOption":"FreeStyle","blankCell":true,"freeStyleCellGroups":[[{"x":0,"y":0},{"x":0,"y":40},{"x":0,"y":68},{"x":0,"y":91}]]},{"x":40,"y":174,"cellWidth":12,"cellHeight":12,"sequenceOption":"FreeStyle","blankCell":true,"freeStyleCellGroups":[[{"x":0,"y":0},{"x":0,"y":30},{"x":0,"y":58},{"x":0,"y":81}]]},{"x":40,"y":300,"cellWidth":12,"cellHeight":12,"sequenceOption":"FreeStyle","blankCell":true,"freeStyleCellGroups":[[{"x":0,"y":0},{"x":0,"y":23},{"x":0,"y":45},{"x":0,"y":68}]]},{"x":40,"y":473,"cellWidth":12,"cellHeight":12,"sequenceOption":"FreeStyle","blankCell":true,"freeStyleCellGroups":[[{"x":0,"y":0},{"x":0,"y":23},{"x":0,"y":45},{"x":0,"y":68}]]}],"sectionNumber":1},{"sectionType":"Checkbox","pageNumber":1,"seqArr":[5,5,5,6],"rect":{"x":0,"y":773,"width":734,"height":228},"subsections":[{"markLines":[[{"x":213,"y":26,"width":165,"height":18},{"x":174,"y":112,"width":162,"height":18},{"x":474,"y":112,"width":165,"height":18},{"x":446,"y":190,"width":147,"height":18}]]}],"sectionNumber":2},{"sectionType":"ScoreBox","pageNumber":1,"seqArr":[7],"rect":{"x":758,"y":31,"width":734,"height":446},"subsections":[{"x":618,"y":424,"rows":1,"columns":1,"positions":3,"cellWidth":32,"cellHeight":22,"cellGapWidth":10,"columnGapWidth":10}],"sectionNumber":3},{"sectionType":"MultiChoice","pageNumber":1,"seqArr":[8,9,10],"multiSelect":[false,false,true],"rect":{"x":758,"y":478,"width":734,"height":524},"subsections":[{"x":40,"y":41,"cellWidth":12,"cellHeight":12,"sequenceOption":"FreeStyle","blankCell":true,"freeStyleCellGroups":[[{"x":0,"y":0},{"x":0,"y":34},{"x":0,"y":69},{"x":0,"y":104}]]},{"x":40,"y":216,"cellWidth":12,"cellHeight":12,"sequenceOption":"FreeStyle","blankCell":true,"freeStyleCellGroups":[[{"x":0,"y":0},{"x":0,"y":27},{"x":0,"y":53},{"x":0,"y":79}]]},{"x":40,"y":376,"cellWidth":12,"cellHeight":12,"sequenceOption":"FreeStyle","blankCell":true,"freeStyleCellGroups":[[{"x":0,"y":0},{"x":0,"y":27},{"x":0,"y":55},{"x":0,"y":81}]]}],"sectionNumber":4},{"sectionType":"ScoreBox","pageNumber":2,"seqArr":[11],"rect":{"x":0,"y":31,"width":734,"height":458},"subsections":[{"x":618,"y":436,"rows":1,"columns":1,"positions":3,"cellWidth":32,"cellHeight":22,"cellGapWidth":10,"columnGapWidth":10}],"sectionNumber":5},{"sectionType":"Checkbox","pageNumber":2,"seqArr":[12,12],"rect":{"x":0,"y":489,"width":734,"height":512},"subsections":[{"x":660,"y":490,"rows":1,"columns":2,"positions":1,"cellWidth":32,"cellHeight":22,"cellGapWidth":10,"columnGapWidth":10}],"questionType":"QANDA","sectionNumber":6},{"sectionType":"Checkbox","pageNumber":2,"seqArr":[13,13,13],"rect":{"x":758,"y":31,"width":734,"height":402},"subsections":[{"x":618,"y":380,"rows":1,"columns":3,"positions":1,"cellWidth":32,"cellHeight":22,"cellGapWidth":10,"columnGapWidth":10}],"questionType":"QANDA","sectionNumber":7},{"sectionType":"Checkbox","pageNumber":2,"seqArr":[14,14],"rect":{"x":758,"y":433,"width":734,"height":568},"subsections":[{"x":660,"y":546,"rows":1,"columns":2,"positions":1,"cellWidth":32,"cellHeight":22,"cellGapWidth":10,"columnGapWidth":10}],"questionType":"QANDA","sectionNumber":8}],"studentIdBarcode":false,"firstBoxRect":{"x":544,"y":1016,"width":20,"height":20},"totalPageCount":2}
,
      pdfUrl:null,
      cutDivScale:1,
      //关联xuece考试作业先相关参数
      
      papertype:0,
      paperid:18079,
      env:1,

      //模态框
      modal_show:{
        json_show:false,
        fill_show:false,
        linkxuecemodal_show:false,
      },

      //填涂选项
      fillObj:true,
      fillSubj:true,
      fillNum:true,
      fillError:0,

      //条形码图片地址
      barcode_url:null,

      //填图客观题时，0为A,1为B类推
      optionOffset:[0]
    };
  },
  components: {
    Pencil,
    Undo,
    RectangleOne,
    LeftOne,
    RightOne,
    EditToolsBox,
    FilePdfOne,
    CloseOne,
    CheckOne,
    SlidingHorizontal,
    FocusOne,
    LinkThree,
    auSelect
  },
  mounted() {
    window.onresize = () => {
        this.clientHeight = document.documentElement.clientHeight - 145;
    }
    

    // //禁止空格控制滚动条
    // document.onkeydown = function(event) {
    //   var e = window.event || event;
    //   // console.log(e)
    //   if(e.keyCode === 32)
    //     return false
    // }


    const that = this
    key('⌘+z, ctrl+z',function(){
      that.retrue()
    })

    key('⌘+s, ctrl+s',function(){
      that.saveEditedImage()
    })

  },
  
  methods: {
    formattedJsonStr(){
      try{
        this.cutParamJson = JSON.parse(this.cutParamJsonStr)
        this.cutParamJsonStr = JSON.stringify(this.cutParamJson, null, 4);
      }catch(error){
        this.cutParamJson = {"code":"error","msg":error}
      }
    },
    changeOptionOffset(index){
      console.log(index)
      switch(index){
        case 0: this.optionOffset = [0];break;
        case 1: this.optionOffset = [0,1];break;
        case 2: this.optionOffset = [0,1,2];break;
        case 3: this.optionOffset = [0,1,2,3];break;
      }
    },
    watermark(text){
      for(var i=1 ; i <= this.pdfPages ; i++){
        const canvas = document.getElementById("canvas"+i)
        const ctx = canvas.getContext("2d");
        ctx.font = `bold ${canvas.height / 20}px arial`;
        ctx.fillStyle = 'rgba(255, 0, 0, .1)';
        // ctx.textBaseline = 'bottom';
        ctx.transform(1, 0.5, -0.5, 1, 0, -canvas.height / 2);

        let txt = text+" ";
        const txtHeight = canvas.height / 15;
        txt = Array(Math.ceil(canvas.width / ctx.measureText(txt).width) * 2).join(txt);
        for (let i = 0; i < Math.ceil(canvas.height / txtHeight) * 2; i++) {
          ctx.fillText(txt, 0, i * txtHeight);
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.addHistoy(i,canvas)
        // console.log(i)
      }
    },
    
    resizeImgStart(e, index){
      e.stopPropagation()
      const imgElem = this.$refs[`image-${index}`][0]
      this.draggedImageDom = imgElem.querySelector('img')
      this.disx = e.pageX;
      this.disy = this.draggedImageDom.width
      window.addEventListener('mousemove', this.imgResize);
      window.addEventListener('mouseup', this.stopResize);
    },

    imgResize(e){
      if(this.draggedImageDom){
        this.draggedImageDom.width = this.disy + e.pageX - this.disx
      }
    },

    stopResize(e){
      e.stopPropagation()
      this.disx = 0;
      this.disy = 0;
      this.draggedImageDom = null;

      window.removeEventListener('mousemove', this.imgResize);
      window.removeEventListener('mouseup', this.stopResize);
    },


    darwimg(index){
      const imgElem = this.$refs[`image-${index}`][0]
      const img = imgElem.querySelector('img')
      // console.log(img.width)
      var x = imgElem.offsetLeft
      var y = imgElem.offsetTop
      this.drop(img,x,y)
      this.delimg(index)
    },

    delimg(index){
      this.images[index] = null;
      // console.log(this.images)
    },

    dragimgdown(e){
      const el = e.currentTarget
      this.draggedImageDom = el
      el.left = 0
      el.top = 0
      window.addEventListener('mousemove',this.dragimgmove)
      this.disx = e.pageX - el.offsetLeft
      this.disy = e.pageY - el.offsetTop

      // console.log(el.style.left)
    },

    dragimgmove(e) {
      // var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
      if(this.draggedImageDom){
        const el = this.draggedImageDom
        // console.log(el)
        // console.log(el.offsetLeft, el.offsetTop)
        // console.log(disx,disy)
        const ctx = this.ctx;
        // console.log(stopAxisX,stopAxisY)
        el.style.left = e.pageX - this.disx + 'px';
        el.style.top = e.pageY - this.disy + 'px';
      }      
    },

    dragimgup(){
      const el = this.draggedImageDom
      window.removeEventListener('mousemove',this.dragimgmove)
      this.draggedImageDom = null
    },


    

    drop(img,stopAxisX,stopAxisY) {

      
      const canvas = this.canvas;
      const el = this.$refs.canvasbox
      const ctx = this.ctx;
      // console.log(stopAxisX,stopAxisY)
      var scrolltop = el.scrollTop;
      var scrollleft = el.scrollLeft;
      // console.log(scrolltop,scrollleft)
      
      const cl = canvas.offsetLeft
      const ct = canvas.offsetTop

      const x = stopAxisX - cl + 22;
      const y = stopAxisY - ct + 22;

      // console.log(x,y,img.width)

      ctx.drawImage(img, x/this.scaleCount, y/this.scaleCount, img.width/this.scaleCount, img.height/this.scaleCount);

    },

    clickuploadpdf() {
      this.$refs.uploadpdf.click()
      
    },
    handleFileChange() {
      this.loadPDF()
    },

    async loadPDF(event) {
      // NOTE: 这一步要特别注意，网上很多关于pdfjs的使用教程里漏了这一步，会出现workerSrc未定义的错误
      pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry')
      // pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.mjs'
      

      const uploadpdf = this.$refs.uploadpdf
      const file = uploadpdf.files[0];
      if (file) {
        this.filename = file.name
        this.historys = []
        if(this.filename.split('.').slice(-1)[0].toLowerCase()=='pdf'){
          const reader = new FileReader();
          this.canvasVisible = true
          reader.onload = async (e) => {
            const loadingTask = pdfjsLib.getDocument({ data: e.target.result });
            loadingTask.promise.then((pdf) => {
              this.pdfDoc = pdf
              this.pdfPages = this.pdfDoc.numPages
              this.$nextTick(() => {
                // this.initPages()
                this.renderPage(this.pageNum)
              })
            })
          };
          reader.readAsArrayBuffer(file);
        }else{
          
          this.canvasVisible = true
          const reader = new FileReader();
          reader.onload = (e) => {
            this.pdfPages = 1
            const img = new Image();
            this.$nextTick(() => {
              this.historys.push([])
              const canvas = document.getElementById('canvas1');
              console.log(canvas)
              this.canvas = canvas;
              const ctx = canvas.getContext("2d");
              // 设置canvas宽高为图片宽高
              this.widthTemp = img.width
              this.canvas.width = img.width;
              this.canvas.style.width = img.width * this.scaleCount + 'px'
              this.heightTemp = img.height
              this.canvas.height = img.height;
              this.canvas.style.height = img.height * this.scaleCount + 'px'
              this.ctx = ctx
              img.onload = () => {
                // 清除之前的内容
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                // 绘制图像到画布
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
              };
            })
            
            img.src = e.target.result;
          };

          reader.readAsDataURL(file);
        }
        
      }
    },

   

    nextPage() {
      if(this.pageNum < this.pdfPages)
        this.pageNum++;
        this.canvas = document.getElementById("canvas"+this.pageNum);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.style.left = this.canvasX;
        this.canvas.style.top = this.canvasY;

        // this.addHistoy();
    },
    prePage() {
      if(this.pageNum > 1)
        this.pageNum--;
        this.canvas = document.getElementById("canvas"+this.pageNum);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.style.left = this.canvasX;
        this.canvas.style.top = this.canvasY;
        // this.addHistoy();
    },

    renderPage(num) {
      this.historys.push([])
      var canvasId = 'canvas' + num
      const canvas = document.getElementById(canvasId);
      this.canvas = canvas;
      const ctx = canvas.getContext("2d");
      this.ctx = ctx
      const page = this.pdfDoc.getPage(num);
      page.then((page) => {
        var width1 = page.getViewport({ scale: 1.0 }).width;
        //简单判断纸张大小
        var myscale = 3068/width1
        if (width1 < page.getViewport({ scale: 1.0 }).height){
          //A4
          myscale = 1654/width1
        }
        const viewport = page.getViewport({ scale: myscale });
        this.canvas.style.height = viewport.height * this.scaleCount + "px";
        this.heightTemp = viewport.height
        this.canvas.height = viewport.height;
        this.canvas.style.width = viewport.width * this.scaleCount + "px";
        this.widthTemp = viewport.width
        this.canvas.width = viewport.width
        
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        page.render(renderContext).promise.then(() => {
          this.canvasVisible = true;
          this.historys[num-1].push({
            data: this.ctx.getImageData(0, 0, canvas.width, canvas.height)
          })
          if(num < this.pdfPages){
            this.renderPage(num + 1);
          }else{
            this.canvas = document.getElementById("canvas1");
            this.ctx = this.canvas.getContext("2d");
            // console.log('初始化比例：',this.scaleCount)
            this.canvasX = this.canvas.style.left
            this.canvasY = this.canvas.style.top
          }
        });
      });
      
    },
    saveEditedImage(text=none) {

      if(text){
        this.watermark(text)
      }
      var date = new Date()
      for(var i=1 ; i <= this.pdfPages ; i++){
        const canvas = document.getElementById("canvas"+i)
        const ctx = canvas.getContext("2d")
        const editedImage = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = editedImage;
  
        link.download = date.getTime() +"("+i+").jpg";
        link.click();
        if(text){
          var history = this.historys[i-1];
          history.pop();
          ctx.putImageData(history[history.length - 1]['data'], 0, 0);
        }   
      }
    },
    MoDown(event){
      // console.log(this.data_style)
      if(this.data_style == 'move'){
        this.draged = true
        const el = this.canvas
        el.style.cursor='grabbing'
        this.disx = event.pageX - el.offsetLeft
        this.disy = event.pageY - el.offsetTop
      }else{
        this.points = []
        this.points.push({x:event.pageX,y:event.pageY});
        this.beginPoint = this.points[0]
        this.penClick = true;
        this.controlPointX = 0;
        this.controlPointY = 0
        this.startAxisX = event.pageX;
        this.startAxisY = event.pageY;
        const el = this.$refs.canvasbox
        // console.log(el.offsetLeft,el.offsetTop)
        // console.log(event.pageX,event.pageY)
      }
    },
    MoUp(){     
      if(this.data_style == 'move'){
        this.draged = false
        this.canvas.style.cursor='grab'
        this.canvasX = this.canvas.style.left
        this.canvasY = this.canvas.style.top
      }else{
        this.penClick = false;
        this.addHistoy()
      }
    },
    drawLine(startp,ctrlp,endp,cl,ct) {
      this.ctx.beginPath();
      this.ctx.moveTo((startp.x-cl)/this.scaleCount,(startp.y-ct)/this.scaleCount)
      this.ctx.quadraticCurveTo((ctrlp.x-cl)/this.scaleCount,(ctrlp.y-ct)/this.scaleCount,(endp.x-cl)/this.scaleCount,(endp.y-ct)/this.scaleCount)
      this.ctx.strokeStyle = this.penColor;//设置颜色
      this.ctx.lineWidth = this.penWidth;//设置大小
      this.ctx.lineCap = "round";//设置两端的形状
      this.ctx.stroke();// stroke() 方法来绘制线条
      this.ctx.closePath();

    },
    MoMove(event){
      if(this.data_style == 'move'){
          if(this.draged == true){
          const el = this.canvas
          const pg = this.$refs.cutparampage
          // console.log(el.offsetLeft, el.offsetTop)
          // console.log(disx,disy)
          pg.style.left = el.style.left = event.pageX - this.disx + 'px';
          pg.style.top = el.style.top = event.pageY - this.disy + 'px';
        }
      }else{
        if(!this.penClick) return;
        const canvas = this.canvas;
        const el = this.$refs.canvasbox
        const ctx = this.ctx;
        const stopAxisX = event.pageX;
        const stopAxisY = event.pageY;
        var scrolltop = el.scrollTop;
        var scrollleft = el.scrollLeft;
        const cl = el.offsetLeft + canvas.offsetLeft - scrollleft;
        const ct = el.offsetTop + canvas.offsetTop - scrolltop;
        
        if(this.data_style == 'pencil'){    
          var endp = {x:stopAxisX, y:stopAxisY}
          this.points.push(endp)

          if(this.points.length > 2){
            const lastTwoPoints = this.points.slice(-2);
            const controlPoint = lastTwoPoints[0];
            const endPoint = {
                x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
                y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
            }
            this.drawLine(this.beginPoint, controlPoint, endPoint, cl, ct);
            this.beginPoint = endPoint;
          }
        }else if(this.data_style == 'rect'){
          //创建路径

          // ctx.clearRect(0,0,canvas.width,canvas.height);
          ctx.beginPath();
          //设置矩形填充颜色
          ctx.fillStyle="#000";
          //绘制矩形
          this.showLastHistory()
          ctx.fillRect((this.startAxisX-cl)/this.scaleCount,(this.startAxisY - ct)/this.scaleCount,(stopAxisX-cl-this.startAxisX+cl)/this.scaleCount,(stopAxisY - ct-this.startAxisY + ct)/this.scaleCount);
          //关闭路径
          ctx.closePath();
        }else if(this.data_style == 'highlight'){
          
          ctx.beginPath();
          this.showLastHistory()
          ctx.moveTo((this.startAxisX - cl)/this.scaleCount, (this.startAxisY - ct)/this.scaleCount);//moveTo(x,y) 定义线条开始坐标

          ctx.lineTo((stopAxisX-cl)/this.scaleCount,(this.startAxisY - ct)/this.scaleCount );//lineTo(x,y) 定义线条结束坐标

          ctx.strokeStyle = this.hlpenColor;//设置颜色
          ctx.lineWidth = this.hlpenWidth;//设置大小
          ctx.lineCap = "butt";//设置两端的形状 context.lineCap="butt|round|square";
          ctx.stroke();// stroke() 方法来绘制线条
          ctx.closePath();
        }
      }
      

    },
    
    retrue(){
      var history = this.historys[this.pageNum-1];
      
      if(history && history.length > 1){
        
        history.pop();
        this.showLastHistory();
      }
      this.undo = false
    },
    addHistoy(pageNum=this.pageNum, canvas=this.canvas) {
      var ctx = canvas.getContext("2d")
      this.historys[pageNum-1].push({
        data: ctx.getImageData(0, 0, canvas.width, canvas.height)
      })
    },
    showLastHistory() {
      var history = this.historys[this.pageNum-1];
      this.ctx.putImageData(history[history.length - 1]['data'], 0, 0)
    },
    // pdf放大
    scaleD() {
      if (this.scaleCount == 2.0) {
        return
      }
      this.scaleCount =  parseFloat(this.scaleCount) + 0.1
      this.scaleCount = parseFloat(this.scaleCount).toFixed(1)
      // console.log(this.canvas.style.width)
      // console.log('放大：'+ this.scaleCount)
      this.$refs.pdfcanvas.forEach(item => {
        var widthTemp = this.widthTemp * parseFloat(this.scaleCount)
        var heightTemp = this.heightTemp * parseFloat(this.scaleCount)
        item.style.width = widthTemp + 'px'
        item.style.height = heightTemp + 'px'
      })
    },
    // pdf缩小
    scaleX() {
      if (this.scaleCount == 0.1) {
        return
      }
      this.scaleCount =  parseFloat(this.scaleCount) - 0.1
      this.scaleCount = parseFloat(this.scaleCount).toFixed(1)
      this.$refs.pdfcanvas.forEach(item => {
        var widthTemp = this.widthTemp * parseFloat(this.scaleCount)
        var heightTemp = this.heightTemp * parseFloat(this.scaleCount)
        // console.log('缩小后的宽高：',widthTemp,heightTemp)
        item.style.width = widthTemp + 'px'
        item.style.height = heightTemp + 'px'
      })
      // console.log('缩小'+this.scaleCount)
    },

    //在画布中添加图片
    addimge(image) {
      let ctx = this.ctx;
      ctx.drawImage(image,0,0);
    },

    showCutParam() {
      
      if(this.cutParamJson == null){
        this.modal_show.linkxuecemodal_show = true
        // console.log(this.linkxuecemodal_show)
        return
      }
      if (this.cutparamshow) {
        this.cutparamshow = false;
      }else {
        this.findfirstanchor()
        var json = this.cutParamJson
        // console.log(json.pageSize.width,json.pageSize.height)
        var widthTemp = this.widthTemp * parseFloat(this.scaleCount)
        var heightTemp = this.heightTemp * parseFloat(this.scaleCount)
        var item = this.$refs.cutparampage
        item.style.width = widthTemp + 'px'
        item.style.height = heightTemp + 'px'

        var panel = this.$refs.cutparampanel

        // this.cutDivScale = widthTemp/json.pageSize.width

        widthTemp = this.cutDivScale*json.panelSize.width
        heightTemp = this.cutDivScale*json.panelSize.height


        panel.style.width = widthTemp + 'px'
        panel.style.height = heightTemp + 'px'
        panel.style.marginTop = (this.anchorxy.y-3)*this.scaleCount + 'px'
        panel.style.marginLeft = (this.anchorxy.x-3)*this.scaleCount + 'px'
        this.cutparamshow = true
      }
    },


    findfirstanchor(){
      
      if(this.cutParamJson.pageSize.width){
        var widthTemp = this.widthTemp * parseFloat(this.scaleCount)
        this.cutDivScale = widthTemp/this.cutParamJson.pageSize.width
      }     
      var ctx = this.ctx
      var canvas = this.canvas

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Find first black rectangle
      let blackRectangleFound = false;
      let minX = canvas.width;
      let minY = canvas.height;
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          if (r === 0 && g === 0 && b === 0) { // Black color
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            blackRectangleFound = true;
            break;
          }
        }
        if (blackRectangleFound) break;
      }

      if (blackRectangleFound) {
        this.anchorxy = {x:minX,y:minY}
        // console.log(minX,minY)
      } else {
        this.anchorxy = {x:0,y:0}
        console.log('No black rectangle found.');
      }
    },

    linktoXuece(){
      // console.log(this.env,this.papertype,this.paperid)
      var that = this
      getanswercard(this.env,this.papertype,this.paperid).then(data => {
        that.cutParamJson = JSON.parse(data[0])
        that.pdfUrl = data[1]
      }).catch(error => {
        that.$toast.show(error,'error');
      })
    },

    downloadPDF(){
      // console.log("******下载pdf:"+this.pdfUrl)
      fetch(this.pdfUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.pdfUrl.split("/").pop());
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          console.error('文件下载失败', error)
        });
    },


    fillAnswerCard(){
      console.log(this.anchorxy)
      if(!(this.anchorxy.x || this.anchorxy.x)){
        this.findfirstanchor()
      }
      console.log(this.anchorxy)
      let anchorxy = this.anchorxy
      let scale = this.cutDivScale/this.scaleCount
      let pageNum = 0
      let canvas = null
      let ctx = null
      var pdfPages = this.pdfPages
      var that = this
      var stuIdX = null
      var stuIdY = null

      if(this.cutParamJson.studentIdRect){
        stuIdX = this.anchorxy.x + this.cutParamJson.studentIdRect.x*scale
        stuIdY = this.anchorxy.y + this.cutParamJson.studentIdRect.y*scale
      }else{
        stuIdX = this.anchorxy.x + this.cutParamJson.section[0].rect.x*scale
        stuIdY = this.anchorxy.y + this.cutParamJson.section[0].rect.y*scale
      } 
          
      if(this.cutParamJson){
        const optionOffset = this.optionOffset
        this.cutParamJson.section.forEach(function(Eachsection, index) {
          if(pageNum != Eachsection.pageNumber && Eachsection.pageNumber <= pdfPages){
            if(canvas && ctx){
              ctx.closePath();
              that.addHistoy(pageNum,canvas)
            }
            pageNum = Eachsection.pageNumber
            canvas = document.getElementById("canvas"+pageNum)
            ctx = canvas.getContext("2d")
            // console.log("111"+that.barcode_url,stuIdX,stuIdY)
            if((that.barcode_url && pageNum%2==1) && (((that.fillNum&&that.fillError==0))||(that.fillError!=1&&that.fillError!=0))){
              that.darwCodebar(ctx,stuIdX,stuIdY)
            }
            //设置矩形填充颜色
            ctx.fillStyle="#000";
            ctx.strokeStyle = "red"
            ctx.lineWidth = 2
          }
          if(Eachsection.sectionType.includes("Choice") && (((that.fillObj&&that.fillError==0))||(that.fillError!=3&&that.fillError!=0))){
            var sectionx = Eachsection.rect.x
            var sectiony = Eachsection.rect.y
            const that = this          
            Eachsection.subsections.forEach(function(subsection,index){    
              
              var endx = subsection.cellWidth*scale
              var endy = subsection.cellHeight*scale
              var startx = anchorxy.x + (sectionx+subsection.x)*scale
              var starty = anchorxy.y + (sectiony+subsection.y)*scale
              //客观题横向
              if(subsection.sequenceOption == "HorizontalFirst"){
                var widthgap = subsection.positions*(subsection.cellWidth + subsection.cellGapWidth)-subsection.cellGapWidth+subsection.columnGapWidth
                for(var i = 0; i < subsection.totalSequences; i++){
                  
                  var nstartx = startx + i%subsection.columns*widthgap*scale 
                  var nstarty = starty + Math.floor(i/subsection.columns)*(subsection.cellHeight+subsection.rowGapHeight)*scale
                  optionOffset.forEach(offset=>{
                    ctx.beginPath()
                    ctx.fillRect(nstartx + offset*(subsection.cellWidth+subsection.cellGapWidth)*scale,nstarty,endx,endy)
                  })
                  
                }
                //客观题竖向
              }else if(subsection.sequenceOption == "VerticalGroupVerticalFirst"){
                for(var i = 0; i < subsection.totalSequences; i++){
                  var nstarty = starty + i*(subsection.cellHeight+subsection.rowGapHeight)*scale
                  optionOffset.forEach(offset=>{
                    ctx.beginPath()
                    ctx.fillRect(startx + offset*(subsection.cellWidth+subsection.cellGapWidth)*scale,nstarty,endx,endy)
                  })
                }
              }else if(subsection.sequenceOption == "FreeStyle"){
                subsection.freeStyleCellGroups.forEach(freeStyleCellGroup=>{
                  optionOffset.forEach(offset=>{
                    var nstartx = startx + freeStyleCellGroup[offset].x*scale
                    var nstarty = starty + freeStyleCellGroup[offset].y*scale
                    // console.log("do",nstartx,nstarty)
                    ctx.beginPath()
                    ctx.fillRect(nstartx,nstarty,endx,endy)
                  })
                })
                
              }
            })
          }else if(Eachsection.sectionType.includes("ScoreBox") && (((that.fillSubj&&that.fillError==0))||(that.fillError!=4&&that.fillError!=0))){
            //填涂主观题
            var score = [1,3,0]
            var sectionx = Eachsection.rect.x
            
            var cellwidth = Eachsection.rect.width/19
            // console.log("sectionNum:"+Eachsection.sectionNumber+"'s cellwidth is "+cellwidth)
            var subsection = Eachsection.subsections[0]
            var startY = anchorxy.y + (Eachsection.rect.y - subsection.cellHeight)*scale
            var endY = startY + 3*subsection.cellHeight*scale
            var tensX = null
            var oneX = null

            // 默认满分
            var fullscore = Math.floor(Math.abs(subsection.maxIntegerScore));
            score = [Math.floor(fullscore / 10),fullscore%10,0]
            console.log(score)
            if(subsection.maxIntegerScore <= subsection.maxSingleBoxScore){
              oneX = anchorxy.x + ((17.5-10*score[0]-score[1])*cellwidth+sectionx)*scale
            }else{
              tensX = score[0] == 0 ? null : anchorxy.x + ((7.5-score[0])*cellwidth+sectionx)*scale
              oneX = anchorxy.x + ((17.5-score[1])*cellwidth+sectionx)*scale
            }
            var halfX = score[2] == 0 ? null : anchorxy.x + (Eachsection.rect.width-cellwidth/2+sectionx)*scale
            if(tensX){
              ctx.beginPath()
              ctx.moveTo(tensX,startY)
              ctx.lineTo(tensX,endY)
              ctx.stroke()
            }
            if(halfX){
              ctx.beginPath()
              ctx.moveTo(halfX,startY)
              ctx.lineTo(halfX,endY)
              ctx.stroke()
            }
            if(oneX){
              ctx.beginPath()
              ctx.moveTo(oneX,startY)
              ctx.lineTo(oneX,endY)
              ctx.stroke()
            }
          }
        })
        that.addHistoy(pageNum,canvas)
      }else{
        console.log("未绑定试卷识别Json")
      }
    },

    darwCodebar(ctx,x,y){
      var img = new Image()
      console.log(this.barcode_url,x,y)
      img.onload = function(){
        ctx.drawImage(img,x,y)
      }
      img.src = this.barcode_url
    },

  },


  

};
</script>

<style>
.sheetview {
  margin: 20px 30px;
  padding: 10px 20px ;
  background-color: var(--box-bgc);
  border: var(--box-border);
  border-radius:12px;

}

.canvasbox {
  position: relative;
  width: 100%;
  overflow: auto;
  background-color: var(--canvas-bgc);
  border: var(--box-border);
}

.sheet-canvas{
  position: absolute;
  box-shadow: var(--box-shadow);
}

.filenameview{
  display: inline-block;
  width: fit-content;
  margin-bottom: 5px;
  cursor: pointer;
}

.filename { 
  margin-left: 5px;
  display: inline-block;
  vertical-align: 3px;
  font-family: auto;
  font-weight: 200;
}

.cutparameditbox {
  display: inline-block;
  float: right;
  margin-left: 15px;
  cursor: pointer;
}

/*封面设计*/
.cover {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: var(--canvas-bgc);
}


.cover-title {
  font-family: SmileySans-Oblique;
  text-align: center;
  width: 100%;
  font-size: 100px;
  margin-bottom: 30px;
}

.start-btn {
  height: 70px;
  padding: 0 25px;
  font-size: 35px;
  border: 3px solid #3e3e3e;
  border-radius: 10px;
  line-height: 70px;
  cursor: pointer;
  font-family: SmileySans-Oblique;
  transition: background-color 0.3s ease, color 0.3s ease;
/*  color: #3e3e3e;*/
}



@media (any-hover:hover){
  .start-btn:hover {
    background-color: #3e3e3e;
    color: #fff;
  }
}
.start-btn:active {
  background-color: #3e3e3e;
  color: #fff;
}

.dragged-image {
  padding: 20px;
  position: absolute;
  width: fit-content;
  left: 50%;
  top: 50%;
  border: 2px solid #ddd;
}

.cutpage{
  border: 1px solid red;
  background: none;
  position: absolute;
  pointer-events: none;
}

.cutpage-panel{
  border: 1px solid red;
  background: none;
  position:relative;
}

.cutpage-section{
  border: 1px solid red;
  background: none;
  position: absolute;
}


</style>