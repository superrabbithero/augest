<template>
  <div class="modal" id="autocreate_modal" style="width:400px;height: 300px;" v-show="autocreate_show || codebar_show">
    
    <div class="modal-bar" @mousedown="dragdown($event,'autocreate_modal')"  @mouseup="dragup">
      <div class="modal-close" @click="autocreate_show = codebar_show = false"></div>
    </div>
    <!-- 自动填涂 -->
    <div class="modal-content" v-show="autocreate_show">
      <div class="modal-line">
        <label>班级填涂：</label>
        <IconWrapper iconName="AddOne" theme="outline" :strokeWidth='1' size="18" />
      </div>
      <canvas id="canvas-classno" v-show="false"/>
      <div class="modal-line">
        <label>学号填涂：</label>
        <IconWrapper iconName="AddOne" theme="outline" :strokeWidth='1' size="18" />
      </div>
      <canvas id="canvas-stuno" v-show="false"/>
    </div>

    <!-- 生成条形码 -->
    <div class="modal-content" v-show="codebar_show">
      <div class="modal-line center line14">
        <label>准考证号：</label>
        <input v-model="barcodeData" type="text"/>
        <button @click="generateBarcode">生成</button>
      </div>
      <div class="modal-line center">
        <img v-show="barcode_url" :src="barcode_url" @click="selectimg($event)"/>
      </div>
      <div v-show="false">
        <svg ref="barcode" ></svg>
      </div>
      <canvas id="canvas-codebar" v-show="false"/>
    </div>

  </div>
  <div  class="touch-toolsbox">
    <div class="toolsbox" ref="toolsbox" id="toolsbox">
      <div class="edit-group">
        <div id="move" :class="[type=='move'?'edit-item active':'edit-item']" @click="switchtools($event)">
          <move-one theme="outline" size="25" fill="#eee" :strokeWidth="1"/>
        </div>
        <div id="pencil" :class="[type=='pencil'?'edit-item active':'edit-item']" @click="switchtools($event)">
          <pencil theme="outline" size="25" fill="#eee" :strokeWidth="1"/>
          <div v-if="type=='pencil'" class="text-editbox">
            <div class="color-item black" @click="getPenColor($event,'#000')"></div>
            <div class="color-item red" @click="getPenColor($event,'#f00')"></div>
            <div class="color-item orange" @click="getPenColor($event,'#ffa500')"></div>
            <div class="color-item yellow" @click="getPenColor($event,'#ff0')"></div>
            <div class="color-item green" @click="getPenColor($event,'#90ee90')"></div>
            <div class="color-item blue" @click="getPenColor($event,'#87ceeb')"></div>
            <div class="color-item white" @click="getPenColor($event,'#fff')"></div>
            <input type="range" value="2" max="15" @change="changePenWidth" id="penWidth-range">
          </div>
        </div>
        <div id="highlight" :class="[type=='highlight'?'edit-item active':'edit-item']" @click="switchtools($event)">
          <high-light theme="outline" size="25" fill="#eee" :strokeWidth="1"/>
        </div>
        <div id="rect" :class="[type=='rect'?'edit-item active':'edit-item']" @click="switchtools($event)">
          <rectangle-one theme="outline" size="25" fill="#eee" :strokeWidth="1"/>
        </div>
        <div id="pic" :class="[type=='pic'?'edit-item active':'edit-item']" @click="switchtools($event)">
          <picture-one theme="outline" size="25" fill="#eee" :strokeWidth="1"/>
          <div v-if="type=='pic'" class="pic-editbox">
            <div class="pics"> 
              <img src="sheeteditorimg\img1.jpg" @click="selectimg($event)"/>
              <img src="sheeteditorimg\img2.jpg" @click="selectimg($event)"/>
              <img src="sheeteditorimg\img1.png" @click="selectimg($event)"/>
              <img src="sheeteditorimg\img1.jpg" @click="selectimg($event)"/>
            </div>
          </div>
        </div>
        <!-- <div id="mark" :class="[type=='mark'?'edit-item active':'edit-item']" @click="switchtools($event)">
          <text-style theme="outline" size="25" fill="#eee" :strokeWidth="1"/>
          <div v-if="type=='mark'" class="text-editbox">
            <input id="watermark-text" type="text" value="水印" />
            <button @click="watermark()" >创建水印</button>
          </div>
        </div> -->
        <!-- <div id="text" :class="[type=='text'?'edit-item active':'edit-item']" @click="switchtools($event)" style="display:none">
          <text-style theme="outline" size="25" fill="#eee" :strokeWidth="1"/>
          <div v-if="type=='text'" class="text-editbox">
            <div class="color-item black active" @click="getTextColor($event,'#000')"></div>
            <div class="color-item red" @click="getTextColor($event,'#f00')"></div>
            <div class="color-item orange" @click="getTextColor($event,'#ffa500')"></div>
            <div class="color-item yellow" @click="getTextColor($event,'#ff0')"></div>
            <div class="color-item green" @click="getTextColor($event,'#90ee90')"></div>
            <div class="color-item blue" @click="getTextColor($event,'#87ceeb')"></div>

            <input type="text" value="宋体" />
            <input type="text" value="25" />
          </div>
        </div> -->
        <div class="edit-item" @click="$parent.retrue">
          <undo theme="outline" size="25" fill="#eee" :strokeWidth="1"/>
        </div>
      </div>
      <div class="edit-group zoom" v-if="$parent.canvasVisible">
        <div class="edit-item" @click="$parent.scaleD">
          <zoom-in theme="outline" size="25" fill="#eee" :strokeWidth="1" />
        </div>
        <div class="edit-item" @click="$parent.scaleX">
          <zoom-out theme="outline" size="25" fill="#eee" :strokeWidth="1" />
        </div>
        <div class="word-view">
          {{parseInt($parent.scaleCount*100)}}%
        </div>
      </div>
      <div class="edit-group pag" v-if="$parent.canvasVisible">
        <div class="edit-item" @click="$parent.prePage">
          <left theme="outline" size="25" fill="#eee" :strokeWidth="1" />
        </div>
        <div class="word-view">
          {{$parent.pageNum}} / {{$parent.pdfPages}}
        </div>
        <div class="edit-item"  @click="$parent.nextPage">
          <right theme="outline" size="25" fill="#eee" :strokeWidth="1"/>
        </div>
      </div>
      <div class="edit-group">
        <div class="edit-item dld" @click="$parent.saveEditedImage(watermarktext)">
          <download theme="outline" size="25" fill="#eee" :strokeWidth="1"/>
        </div>
        <input type="text" id="download-add-watermark" :class="{'edit-input d-watermark':true,'wmshow':watermarktext}" placeholder="默认无水印" v-model="watermarktext"/>
        <div class="edit-item" v-show="false" @click="autocreate_show=!autocreate_show">
          <IconWrapper  iconName="RobotTwo" theme="outline" :strokeWidth='1' defaultColor="#eee" size="25" />
        </div>
        <div class="edit-item" @click="codebar_show=!codebar_show">
          <IconWrapper iconName="PayCodeTwo" theme="outline" :strokeWidth='1' defaultColor="#eee" size="25" />
        </div>
        <div class="edit-item" @click="canvas2fullscreen">
          <IconWrapper v-if="fullscreen" iconName="OffScreen" theme="filled" :strokeWidth='1' defaultColor="#eee" size="25" />
          <IconWrapper v-else iconName="FullScreen" theme="filled" :strokeWidth='1' defaultColor="#eee" size="25" />
        </div>
        
      </div>  
      <div class="box-drag" @mousedown="dragdown($event,'toolsbox')"  @mouseup="dragup">
        <drag theme="outline" size="25" fill="#aaa" :strokeWidth="1"/>
      </div>
    </div>
  </div>
  <div class="textinput" style="display:none">
    <textarea id="edit-textarea">
    </textarea>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ZoomIn,ZoomOut,Pencil,Undo,RectangleOne,MoveOne,HighLight,Left,Right,Drag,Download,TextStyle,PictureOne} from '@icon-park/vue-next';

import IconWrapper from '@/components/IconWrapper.vue';
import JsBarcode from 'jsbarcode';

export default defineComponent ({
  data(){
    return{
      type: "move",
      tmptype: "",
      draged: false,
      dragedel: null,
      disx: 0,
      disy: 0,
      textColor: "#000",
      draggedImage: null,
      fullscreen: false,
      watermarktext: "",
      barcodeData:"",
      autocreate_show:false,
      codebar_show:false,
      barcode_url:null
    }
  },
  components: {
    ZoomIn,
    ZoomOut,
    Pencil,
    Undo,
    RectangleOne,
    MoveOne,
    HighLight,
    Left,
    Right,
    Drag,
    Download,
    TextStyle,
    PictureOne,
    IconWrapper
  },

  watch: {
    type: function(newval, oldval) {
      if(oldval=='pic' && newval != 'move'){
        console.log('还有贴图没有绘制，确认后未保存的贴图将丢失!')
        this.$parent.images = []
      }
    }
  },

  mounted() {
    // const that = this
    // document.addEventListener('keydown', that.handleWatchEnter);
    // document.addEventListener('keyup', that.handleWatchOut);
  },


  methods: {

    // watermark(){
    //   const text = document.getElementById('watermark-text').value
    //   // console.log(text)
    //   this.$parent.watermark(text)
    // },
    handleWatchEnter(e) {
      if(e.repeat){
        return
      }
      // var key = window.event ? e.keyCode : e.which;
      // // console.log(key);
      // if (key === 32  ) {
      //   // 这里执行相应的行为动作
      //   if(this.$parent.penClick){
      //     this.$parent.MoUp()
      //   }
      //   this.tmptype = this.type
      //   this.gettoolsbystring('move')
      // }
    },

    handleWatchOut(e) {
      var key = window.event ? e.keyCode : e.which;
      if (key === 32  ) {
        this.type = this.tmptype
        this.gettoolsbystring(this.type)
      }
    },

    switchtools(e) {
      const type = e.currentTarget.id;
      this.gettoolsbystring(type)
      
    },

    gettoolsbystring(type) {
      this.type = type;
      this.$parent.data_style = type;
      if(type == 'move'){
        this.$parent.canvas.style.cursor='grab'
      }else if(this.type == 'highlight'){
        this.$parent.canvas.style.cursor='text'
      }else{
        this.$parent.canvas.style.cursor='auto'
      }
      if(this.$parent.penClick){
        this.$parent.MoUp()
      }
    },

    dragdown(e,id) {
      this.dragedel = document.getElementById(id)
      document.addEventListener('mousemove', this.dragmove)
      this.disx = e.pageX - this.dragedel.offsetLeft
      this.disy = e.pageY - this.dragedel.offsetTop
    },
    dragup() {
      this.dragedel = null
      document.removeEventListener('mousemove',this.dragmove)
    },
    dragmove(e) {
      // var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
      if(this.dragedel){
        this.dragedel.style.left = e.pageX - this.disx + 'px';
        this.dragedel.style.top = e.pageY - this.disy + 'px';
      }      
    },

    getTextColor(e,color) {
      let colorItems = document.querySelectorAll('.color-item');
      let item = e.currentTarget
      colorItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      this.textColor = color
      let texta = document.getElementById("edit-textarea");
      texta.style.color = this.textColor
    },
    getPenColor(e,color) {
      let colorItems = document.querySelectorAll('.color-item');
      let item = e.currentTarget
      colorItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      this.$parent.penColor = color
      
    },

    changePenWidth() {
      const range = document.getElementById('penWidth-range')
      console.log(range.value)
      this.$parent.penWidth = parseInt(range.value)
    },

    selectimg(e) {
      var image = e.currentTarget
      console.log(image.src)
      // console.log(this.$parent.images)
      this.$parent.images.push(image.src)
      // console.log(this.$parent.images)
    },

    canvas2fullscreen() {
      const canvasbox = this.$parent.$refs.canvasbox
      console.log(this.fullscreen)
      if(document.fullscreenElement){
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // 针对 Chrome, Safari 和 Opera
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {  // 针对 Firefox
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {     // 针对 IE
            document.msExitFullscreen();
        }
      }else{
        if (canvasbox.requestFullscreen) {
            canvasbox.requestFullscreen();
        } else if (canvasbox.webkitRequestFullScreen) { // 针对 Chrome, Safari 和 Opera
            canvasbox.webkitRequestFullScreen();
        } else if (canvasbox.mozRequestFullScreen) {    // 针对 Firefox
            canvasbox.mozRequestFullScreen();
        } else if (canvasbox.msRequestFullscreen) {     // 针对 IE
            canvasbox.msRequestFullscreen();
        }
      }

      this.fullscreen = !this.fullscreen
    },

    generateBarcode() {
      JsBarcode(this.$refs.barcode, this.barcodeData,{
        height:100,//条码高度为100像素
        fontSize:18,
        fontOptions:'bold',//blod/italic/blod italic
        font:'Courier New'
      });

      // 获取生成的SVG元素
      const svg = this.$refs.barcode;

      // 创建Blob对象
      const svgBlob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });

      // 创建临时URL
      const tempUrl = URL.createObjectURL(svgBlob);

      this.barcode_url = tempUrl
      this.$parent.barcode_url = tempUrl

      // 在控制台打印临时URL，用于调试
      console.log('临时URL:', tempUrl);
    }

    
  }

})
</script>

<style scoped>

.touch-toolsbox {
  position: fixed; 
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
/*  pointer-events: none;*/
}

.toolsbox{
  position: absolute;
  background-color: #333;
  margin-bottom: 16px;
  padding: 8px 30px 8px 18px;
  border-radius: 8px;
}

.edit-group {
  display: inline-block;
}



.edit-item {
  display: inline-block;
  padding: 5px 6px;
  margin: 0 2px;
  border-radius: 4px;
  pointer-events: auto;
}

.edit-input{
  background-color: #444;
  color: #aaa;
  border: none;
  font-weight: 100;
  font-family: auto;
  vertical-align: 5px;
  padding: 5px 6px;
  border-radius: 4px;
}

.edit-input:focus{
  background-color: #eee;
  color: #888;
  font-weight: normal;
  outline: none;
}

.d-watermark{
  box-sizing: border-box;
  width: 0px;
  padding: 5px 0;
  opacity: 0;
  transition:width 1s, padding 1s, opacity 1s;
}

.dld:hover + input,.d-watermark:hover,.d-watermark:focus{
  width: 5rem;
  padding: 5px 6px;
  opacity: 1;
/*  display: inline-block !important;*/
}

.wmshow{
  width: 5rem;
  padding: 5px 6px;
  opacity: 1;
}


@media (any-hover:hover){
  .edit-item:hover {
    background-color: #444;
  }
  .color-item:hover {
  /*  border: 2px solid #fff;*/
  transform: scale(1.2);
  }
}
.edit-item:active {
  background-color: #444;
}

.color-item:active {
  /*  border: 2px solid #fff;*/
  transform: scale(1.2);
}

.edit-item:active {
  background-color: #555;
}

.edit-item.active {
  background-color: #444;
}

.word-view {
  -moz-user-select : none;
  -khtml-user-select : none;
  user-select: none;
  display: inline-block;
  color: #aaa;
  font-weight: 100;
  font-family: auto;
  vertical-align: 5px;
  padding: 5px 6px;
}

.edit-group.pag {
  display: inline-block;
}

.box-drag {
  position: absolute;
  height: 25px;
  width: 25px;
  padding-top:5px ;
  right: 2px;
  top: 8px;
  pointer-events: auto;
}

.textinput {
  position: absolute;
  top:300px;
  left: 300px;
  border: 2px dashed #333;
  background-color: rgba(255,255,255,0);
}

#edit-textarea {
  font-size: 1rem;
  letter-spacing: 1px;
  padding: 10px;
  color: #f00;
  max-width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: none;
  background-color: rgba(255,255,255,0);
  height: fit-content;
  overflow: auto;
}

.text-editbox {
  position: absolute;
  display: flex;
  flex-flow:row wrap;
/*  flex-direction: column;*/
  justify-content: center;
/*  align-items: center;*/
/*  height: 30px;*/
  top: -28px;
  padding: 8px 8px;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 5px;
}

.text-editbox > input {
  display: inline-block;
  background-color: #444;
  border: none;
  height: 14px;
  width: 40px;
  margin: 0 5px;
  color: #aaa;
  font-weight: 100;
  font-family: auto;
}

.text-editbox > input[type="range"] {
  display: inline-block;
  background-color: #444;
  height: auto;
  border: none;
  width: 80px;
  margin: 0 5px;
  color: #aaa;
}

.color-item {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-right: 6px;
  transition: transform 0.3s ease;  /* 添加过渡效果 */
  cursor: pointer; 
}



.color-item.active {
/*  border: 2px solid #fff;*/
transform: scale(1.2);
}

.color-item.black {
  background-color: #000;
}

.color-item.red{
  background-color: #ff0000;
}

.color-item.orange{
  background-color: #ffa500;
}

.color-item.yellow{
  background-color: #ff0;
}

.color-item.green{
  background-color: #90ee90;
}

.color-item.blue{
  background-color: #87ceeb;
}

.color-item.white{
  background-color: #fff;
}

.pic-editbox {
  position: absolute;
  display: flex;
  flex-flow:row wrap;
/*  flex-direction: column;*/
  justify-content: center;
/*  align-items: center;*/
/*  height: 30px;*/
  width: 120%;
  height: 80px;
  top: -95px;
  left: -10%;
  padding: 10px 0px;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 5px;
  
}

.pics{
  overflow-x: auto ;
  white-space: nowrap;
}

.pics > img{
  background-color: white;
  width:  80px;
  height: 80px;
  display: inline-block;
  object-fit: cover;
  margin: 0 8px;
}






</style>

