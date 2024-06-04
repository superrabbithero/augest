<template>
  <div class="hello">
    <h1>组件展示及测试界面</h1>
  </div>
  <button @click="latx_show=!latx_show">公式</button>
  
  <button @click="json_show=!json_show">Json展示</button>
  <button @click="showToast">展示toast</button>
  <button @click="testapi">测试api</button>
  <button @click="page_show = !page_show">分页控件</button>
  <button @click="md_show = !md_show">markdown展示</button>

  <TheLatex2Math v-if="latx_show" :latex="'\\frac{1}{2}'" />
  <JsonModel v-if="json_show" :json-data="jsonData"></JsonModel>
  <md-loader v-if="md_show" :mdFileName="'更新文档'"></md-loader>
  <div  v-if="page_show">
    <input v-model="totalPages" type="text"/>
    <pagination :totalPages="totalPages"></pagination>
  </div>
  <button @click="helloworldtimer.startTimer">start</button>
  <button @click="helloworldtimer.resetTimer">reset</button>
  <timer ref="helloworldtimer"></timer>
  <div v-html="htmlcontent"></div>
  <!-- <pencanvas></pencanvas> -->
  
</template>

<script>
import TheLatex2Math from './TheLatex2Math'
import JsonModel from './Model/JsonModel.vue'
import pagination from './Model/Pagination.vue'
import {login, getanswercard} from "@/assets/js/xueceapi.js"
import pencanvas from "./Model/PenCanvas.vue"
import timer from "./Model/Time.vue"

export default {
  name: 'HelloWorld',
  components: {
    TheLatex2Math,
    JsonModel,
    pagination,
    pencanvas,
    timer
  },
  data(){
    return {
      jsonData: { "name": "John", "age": { "name": "John", "age": 30 } },
      toastType: 0,
      page_show:false,
      md_show:false,
      latx_show:false,
      json_show:false,
      totalPages:6,
      helloworldtimer: null,
      htmlcontent:"<span class=\"output\">$$\\frac{1}{2}$$</span><span class=\"output\">$$\\sqrt{3}$$</span>"
    }
  },
  mounted(){
    this.helloworldtimer = this.$refs.helloworldtimer
    this.TypeSet([document.getElementsByClassName("output")])
  },

  methods:{
    showToast(){
      var toastTypeStr = ['success','info','warn','error']
      this.$toast.show('Hello, world!',toastTypeStr[this.toastType]);
      console.log(toastTypeStr[this.toastType])
      this.toastType = this.toastType>2 ? 0 : ++this.toastType
    },

    testapi(){
      var that = this
      getanswercard(2,0,11617).then(data => {
        that.jsonData = JSON.parse(data[0])
        console.log(this.jsonData)
      }).catch(error => {
        that.$toast.show(error,'error');
      })
      
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
    }
      
  }

}
</script>


