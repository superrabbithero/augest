<template>
  <div class="container left" style="height: auto;">
    <cpt-view name="Container布局">
      <h5>基本布局</h5>
      <div class="au-layout demo">
        <div class="au-container">
          <div class="au-header demo" style="height:4rem">Header</div>
          <div class="au-main demo" style="height: 12rem;">Main</div>
          <div class="au-footer demo" style="height:4rem">Footer</div>
        </div>
      </div>
    </cpt-view>
    <cpt-view name="Layout">
      <h5>12列布局</h5>
      <div class="au-layout demo">
        <div class="rows">
          <div class="cols s12"><div class="demo"></div></div>
        </div>
        <div class="rows">
          <div class="cols s6"><div class="demo"></div></div>
          <div class="cols s6"><div class="demo"></div></div>
        </div>
        <div class="rows">
          <div v-for="i in 3" class="cols s4"><div class="demo"></div></div>
        </div>
        <div class="rows">
          <div v-for="i in 4" class="cols s3"><div class="demo"></div></div>
        </div>
        <div class="rows">
          <div v-for="i in 6" class="cols s2"><div class="demo"></div></div>
        </div>
        <div class="rows">
          <div v-for="i in 12" class="cols s1"><div class="demo"></div></div>
        </div>
      </div>
      <h5>列偏移</h5>
      <div class="au-layout demo">
        <div class="rows">
          <div class="cols s3 offset3"><div class="demo"></div></div>
          <div class="cols s3 offset3"><div class="demo"></div></div>
        </div>
        <div class="rows">
          <div class="cols s4 offset1"><div class="demo"></div></div>
          <div class="cols s4 offset1"><div class="demo"></div></div>
        </div>
      </div>
      <h5>分栏间隔</h5>
      <div class="au-layout demo">
        <div class="rows gutter-l">
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
        </div>
        <div class="rows gutter-l">
          <div class="cols s3 offset3"><div class="demo"></div></div>
          <div class="cols s3 offset3"><div class="demo"></div></div>
        </div>
        <div class="rows gutter-s">
          <div class="cols s2"><div class="demo"></div></div>
          <div class="cols s2"><div class="demo"></div></div>
          <div class="cols s4"><div class="demo"></div></div>
          <div class="cols s4"><div class="demo"></div></div>
        </div>
        <div class="rows gutter-s">
          <div class="cols s4 offset1"><div class="demo"></div></div>
          <div class="cols s3 offset3"><div class="demo"></div></div>
        </div>
        <div class="rows gutter-s">
          <div v-for="item in 12" class="cols s1"><div class="demo"></div></div>
        </div>
      </div>
      <h5>对齐方式</h5>
      <div class="au-layout demo">
        <div class="rows start">
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
        </div>
        <div class="rows center">
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
        </div>
        <div class="rows end">
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
        </div>
        <div class="rows space-between">
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
        </div>
        <div class="rows space-around">
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
        </div>
        <div class="rows space-evenly">
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
          <div class="cols s3"><div class="demo"></div></div>
        </div>
      </div>
    </cpt-view>
    <cpt-view name="公式组件">
      <highlightjs language="html" code="<TheLatex2Math :latex=&quot;'E = MC^{2}'&quot; />"></highlightjs>
      <TheLatex2Math :latex="'E = MC^{2}'" />
    </cpt-view>
    
    <cpt-view name="Json组件">
      <highlightjs language="html" code="<JsonModel json-data=&quot;jsonData&quot;></JsonModel>"></highlightjs>
      <JsonModel :jsonData="jsonData"></JsonModel>
    </cpt-view>

    <cpt-view name="Toast">
      <highlightjs language="javascript" code="this.$toast.show('Hello, world!','info');"></highlightjs>
      <input type="text" placeholder="请输入消息文本" v-model="toastMsg"/>
      <input  type="button" value="展示toast" @click="showToast" />
    </cpt-view>

    <cpt-view name="分页控件">
      <input v-model="totalPages" type="text"/>
      <pagination class="left" :totalPages="totalPages"></pagination>
    </cpt-view>

    <cpt-view name="Markdown Loader">
      <md-loader :mdFileName="'更新文档'"></md-loader>
    </cpt-view>

    <cpt-view name="计时器">
      <div class="content">
        <timer ref="helloworldtimer"></timer>
        <button @click="helloworldtimer.startTimer" class="circle">
          <svg-icon name="play01" size="16"></svg-icon>
        </button>
        <button @click="helloworldtimer.pause" class="circle fill">
          <svg-icon name="pause01" size="16"></svg-icon>
        </button>
        <button @click="helloworldtimer.resetTimer" class="circle fill">
          <svg-icon name="stop01" size="16"></svg-icon>
        </button>
      </div>
    </cpt-view>

    <cpt-view name="日历">
      <h5>calender</h5>
      <div class="content">
        <calender language="EN" style="width: 100%;"></calender>
      </div>
      <h5>input</h5>
      <highlightjs language="html" code="<calender language=&quot;EN&quot; type=&quot;input&quot; ></calender>"></highlightjs>
      <div class="content">
        <calender language="EN" type="input" style="width: 150px;"></calender>
      </div>
      <highlightjs language="html" code="<calender language=&quot;EN&quot; type=&quot;datetime&quot; ></calender>"></highlightjs>
      <div class="content">
        <calender language="EN" type="datetime" style="width: 150px;"></calender>
      </div>
    </cpt-view>

    <cpt-view name="Select" >
      <h5>select</h5>
      <div class="content">
        <au-select :dataList="selectList"></au-select>
      </div>
    </cpt-view>
    
    <cpt-view name="表单样式">
      <h5>input</h5>
      <div class="content">
        <input type="text" value="text" placeholder="placeholder" />
        <input type="password" value="password"/>
      </div>
      <div class="content">
        <input type="color" v-model="mainColor"/>
      </div>
      <div class="content">
        <input type="button" value="button" />
        <input type="button" class="fill" value="fill" />
        <input type="button" class="circle" value="circle" />
        <input type="button" class="circle fill" value="circle fill" />

      </div>
      <div class="content">
        <input type="range" min="0" max="100" value="20" />
      </div>
      <div class="content">
        <input type="checkbox" checked/>
        <input type="checkbox"/>
        <input type="checkbox" class="circle" checked/>
        <input type="checkbox" class="circle"/>
      </div>
      <div class="content">
        <input type="radio" name="test" checked/>
        <input type="radio" name="test" />
        <input type="radio" name="test" />
      </div>
      <div class="content">
        <input type="date"/>
        <input type="month"/>
        <input type="time" />
        <input type="datetime-local" style="width:150px" />
      </div>
      <h5>button</h5>
      <div class="content">
        <button>button</button>
        <button class="fill">button</button>
        <button class="circle">circle</button>
        <button class="circle fill" >circle fill</button>
      </div>
      <h5>textarea</h5>
      <div class="content">
        <textarea placeholder="这是一个textarea..." cols="30" rows="5"></textarea>
      </div>
    </cpt-view>

    <cpt-view name="Slider" >
      <h5>Slider</h5>
      <div>{{sliderData}}</div>
      <div class="content" style="width:200px">
        <au-slider v-model="sliderData" :step="1"></au-slider>
      </div>
      <div class="content" style="width:200px">
        <au-slider v-model="sliderData" :step="1"></au-slider>
      </div>
    </cpt-view>

    <cpt-view name="Switch" >
      <h5>Switch</h5>
      <div>{{switchData}}</div>
      <div class="content">
        <au-switch v-model="switchData" size="big"></au-switch>
      </div>
      <div class="content">
        <au-switch v-model="switchData"></au-switch>
      </div>
      <div class="content">
        <au-switch v-model="switchData" size="small"></au-switch>
      </div>
    </cpt-view>

    <cpt-view name="Draged">
      <div style="width:100%;height: 400px;border: var(--box-border);position: relative;">
        <auDraged>
          <div style="width:200px">
            这是一个可拖拽组件
          </div>
        </auDraged>
      </div>
    </cpt-view>
  </div>
    
  
  
</template>

<script>
import TheLatex2Math from './TheLatex2Math'
import JsonModel from './Model/JsonModel.vue'
import pagination from './Model/Pagination.vue'
import {login, getanswercard} from "@/assets/js/xueceapi.js"
import pencanvas from "./Model/PenCanvas.vue"
import timer from "./Model/Time.vue"
import cptView from "./Model/ComponentView.vue"
import calender from "./Model/Calendar.vue"
import auSelect from "./Model/auSelect.vue"
import auSlider from "./Model/auSlider.vue"
import auSwitch from "./Model/auSwitch.vue"
import auDraged from "./Model/auDraged.vue"

import { ref } from 'vue';

export default {
  name: 'HelloWorld',
  components: {
    TheLatex2Math,
    JsonModel,
    pagination,
    pencanvas,
    timer,
    cptView,
    calender,
    auSelect,
    auSlider,
    auSwitch,
    auDraged
  },
  data(){
    return {
      jsonData: { "name": "John", "age": { "name": "John", "age": 30 } },
      toastType: 0,
      mainColor: '#ffc848',
      totalPages:6,
      helloworldtimer: null,
      htmlcontent:"<span class=\"output\">$$\\frac{1}{2}$$</span><span class=\"output\">$$\\sqrt{3}$$</span>",
      selectList:["item 1","item 2","item 3","item 4","item 5","item 6","item 7"],
      toastMsg:null,
      sliderData:20,
      switchData:false
    }
  },
  watch:{
    mainColor(newVal, oldVal){
      document.documentElement.style.setProperty('--main-color', newVal);
    }
  },
  mounted(){
    this.helloworldtimer = this.$refs.helloworldtimer
    this.TypeSet([document.getElementsByClassName("output")])
  },

  methods:{
    showToast(){
      var toastTypeStr = ['success','info','warn','error']
      if(this.toastMsg == null)
        this.toastMsg = "Hello World!This is a message."
      this.$toast.show(this.toastMsg,toastTypeStr[this.toastType]);
      
      console.log(toastTypeStr[this.toastType])
      this.toastType = this.toastType>2 ? 0 : ++this.toastType
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

    setSliderData(data){
      this.sliderData = data
    }
  },

}
</script>

<style scoped>
  

  h4 {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .component-botton{
    margin-left: 5px;
    transition: transform 0.1s ease;
  }

  .open {
    transform: rotate(90deg);
  }

  .content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .content > *{
    margin:0 10px 10px 0;
  }

</style>


