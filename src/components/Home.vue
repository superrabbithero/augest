<template>
  <div class="home-container">
    <div class="home-left">
      <div class="card-content" @click="goto('/post/更新文档')">
        <h1>更新文档</h1>
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

<style scoped>
.home-container {
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  display: flex;
}

.home-left{
  flex:0 0 75%;
}

.home-right{
  flex:0 0 25%;
}

.card-content{
  padding: 10px 20px;
  margin: 20px 30px;
  background-color: var(--box-bgc);
  border: var(--box-border);
  border-radius:12px;
}

.home-right > .card-content{
  margin-left: -10px;
}

@media (max-width: 1000px) {
  .home-container {
    flex-direction: column;
  }

  .home-left{
    flex:1;
  }

  .home-right{
    flex:1;
  }

  .home-right > .card-content{
    margin-left: 30px;
    margin-top:0;
  }
}
</style>

