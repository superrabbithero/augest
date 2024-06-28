<template>	
	 <div class="home-container">
    <div class="home-left col">
      <div class="card-content">
        <div class="md-card-item">
          <div class="title"  @click="goto('/zhenti/2022_js_C')">2022年江苏省公务员录用考试《行测》题（C类）（网友回忆版）</div>
          <div class="md-card-info">
            <div class="date">
              2026-6-25
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="md-card-item">
          <div class="title"  @click="goto('/zhenti/2023_gk_fs')">2023年国家公务员录用考试《行测》题（副省级网友回忆版）</div>
          <div class="md-card-info">
            <div class="date">
              2026-6-27
            </div>
          </div>
        </div>
      </div>
      <pagination v-if="totalPages > 1" :totalPages="totalPages" @page-change="handlePageChange"></pagination>
    </div>
    <div class="home-right col">
      <div class="card-content">
        日历
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data(){
    return {
    	totalPages:0
    }
  },

  methods:{
    goto(path){
      this.$router.push(path)
    },
      
  }

}
</script>
<style scoped>
	
</style>