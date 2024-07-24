<template>
  <div class="container left">
    <cpt-view name="公式组件">
      <TheLatex2Math :latex="'E = MC^{2}'" />
    </cpt-view>
    
    <cpt-view name="Json组件">
      <JsonModel :json-data="jsonData"></JsonModel>
    </cpt-view>

    <cpt-view name="Toast">
      <button @click="showToast">展示toast</button>
    </cpt-view>

    <cpt-view name="分页控件">
      <input v-model="totalPages" type="text"/>
      <pagination :totalPages="totalPages"></pagination>
    </cpt-view>

    <cpt-view name="Markdown Loader">
      <md-loader :mdFileName="'更新文档'"></md-loader>
    </cpt-view>

    <cpt-view name="计时器">
      <button @click="helloworldtimer.startTimer">start</button>
      <button @click="helloworldtimer.resetTimer">reset</button>
      <timer ref="helloworldtimer"></timer>
    </cpt-view>
    
    <cpt-view name="表单样式">
      <h5>input</h5>
      <div class="content">
        <input type="text" value="text" />
        <input type="password" value="password"/>
      </div>
      <div class="content">
        <input type="color" value="#ffc848" />
      </div>
      <div class="content">
        <input type="button" class="submit" value="submit" />
      </div>
      <div class="content">
        <input type="range" min="0" max="10" value="5" />
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

export default {
  name: 'HelloWorld',
  components: {
    TheLatex2Math,
    JsonModel,
    pagination,
    pencanvas,
    timer,
    cptView
  },
  data(){
    return {
      jsonData: { "name": "John", "age": { "name": "John", "age": 30 } },
      toastType: 0,
      
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

  .content > input{
    margin:0 10px 10px 0;
  }
</style>


