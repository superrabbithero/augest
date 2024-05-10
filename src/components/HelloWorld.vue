<template>
  <div class="hello">
    <h1>hello, world</h1>
    <TheLatex2Math :latex="'\\frac{1}{2}'" />
    <JsonModel :json-data="jsonData"></JsonModel>
  </div>
  <button @click="showToast">展示toast</button>
  <button @click="testapi">测试api</button>
  <md-loader :mdFileName="'更新文档'"></md-loader>
</template>

<script>
import TheLatex2Math from './TheLatex2Math'
import JsonModel from './Model/JsonModel.vue'
import {login, getanswercard} from "@/assets/js/xueceapi.js"

export default {
  name: 'HelloWorld',
  components: {
    TheLatex2Math,
    JsonModel
  },
  data(){
    return {
      jsonData: { "name": "John", "age": { "name": "John", "age": 30 } },
      toastType: 0
    }
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
      
    }
      
  }

}
</script>


