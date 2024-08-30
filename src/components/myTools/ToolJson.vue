<template>
  <div class="au-layout" style="margin: 1rem 0 0 0;">
    <div class="rows">
      <div class="cols s12">
        <textarea class="resize" style="width:100%" v-model="JsonStr"></textarea> 
      </div>
    </div>
    <div class="rows gutter-l end">
      <div class="cols">
        <button @click="formattedJsonStr">Json美化</button>
      </div>
      <div class="cols">
        <button @click="StringToJson">仅解析为Json对象</button>
      </div>
    </div>
    <div class="rows">
      <div class="cols s12">
        <json-model :jsonData="jsonData" width="100%"></json-model>
      </div>
    </div>
  </div>  
</template>

<script>
import JsonModel from '../Model/JsonModel.vue'

export default {
  name: "Home",
  components:{
    JsonModel
  },
  data(){
    return {
      JsonStr:null,
      jsonData:{}
    }
  },
  mounted(){
  },
  methods:{
    StringToJson(){
      try{
        this.jsonData = JSON.parse(this.JsonStr)
      }catch(error){
        this.jsonData = {"code":"error","msg":error}
      }
    },
    formattedJsonStr(){
      try{
        this.jsonData = JSON.parse(this.JsonStr)
        this.JsonStr = JSON.stringify(this.jsonData, null, 4);
      }catch(error){
        this.jsonData = {"code":"error","msg":error}
      }

    }
  }
}

</script>