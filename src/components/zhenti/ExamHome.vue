<template>	
	 <div class="home-container">
    <div class="home-left col">
      <div class="card-content">
        <div class="md-card-item">
          <div class="title"  @click="goto('/zhenti')">zhenti</div>
          <div class="md-card-info">
            <div class="date">
              12312312
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