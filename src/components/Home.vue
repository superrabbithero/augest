<template>
  <div class="home-container">
    <div class="home-left col">
      <div class="card-content" @click="goto('/post/更新文档')">
        <h1>更新文档</h1>
      </div>
      <div class="card-content" @click="goto('/post/vue-markdown-loader使用')">
        <h1>vue-markdown-loader使用</h1>
      </div>
      <div class="card-content" @click="goto('/post/让红色名村成为乡村振兴的红色动力')">
        <h1>让红色名村成为乡村振兴的红色动力</h1>
      </div>
    </div>
    <div class="home-right">
      <div class="card-content">
        <HealthCard></HealthCard>
      </div>
    </div>
  </div>
</template>

<script>
import HealthCard from "./HomeComponents/HealthCard.vue"

export default {
  name: "Home",
  components:{
    HealthCard,
  },
  methods:{
    goto(path){
      this.$router.push(path)
    },
  }
}

</script>

