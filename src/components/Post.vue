<template>
  <div class="container" style="text-align: left;">
    <md-loader :mdFileName="postname"  ref="markdownRef"></md-loader>
  </div>
</template>

<script>

export default {
  data(){
    return {
      postname:this.$route.params.postname
    }
  },
  mounted() {
    // console.log(this.$route.params.postname)
    // console.log(this.$refs.markdownRef.outerHTML)
    this.postname = this.$route.params.postname
  },
};
</script>