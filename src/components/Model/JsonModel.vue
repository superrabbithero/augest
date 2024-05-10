<template>
  <div>
    <vue-json-pretty :data="jsonData" :showLength="true" :showLine="true" :showSelectController="false" :virtual="true" :deep="1"></vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css'

export default {
  props:{
    jsonData: {
      type: Object,
      required: true
    }
  },
  components: {
    VueJsonPretty
  },
}
</script>
