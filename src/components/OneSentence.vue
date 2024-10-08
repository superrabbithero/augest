<template>
  <div class="gallery" style="margin:0 -0.2rem" >
    <div v-for="sentence in sentences" class="sentence-card">
      <div class="content">
        {{sentence.content}}
      </div>
      <div class="from">
        ——{{sentence.from}} {{sentence.by}}
      </div>
    </div>
  </div>
</template>

<script>
import sentences from "@/assets/json/sentences.json"

export default {
  data(){
    return{
      sentences: sentences.sentences
    }
  },
  unmounted(){
  },
  methods: {
  }
};
</script>

<style scoped>
.gallery {
  column-count:3;
  column-gap: 10px;
}
.sentence-card {
  width: 100%;
  background-color: var(--box-bgc);
  padding: 1rem;
  border: var(--box-border);
  border-radius: 8px;
  box-sizing: border-box;
}
.sentence-card .content{
  font-family: SmileySans-Oblique;
}
.sentence-card .from{
  margin-top: 0.8rem;
  text-align: end;
  font-size: 0.9rem;
}
/*xs<768*/
/* @media (max-width: 500px){.sentence-card{width: 100%;}} */
/*sm>=768px*/
/* @media (min-width: 500px) {.sentence-card{width: 50%;}} */
/*md>=992px*/
/* @media (min-width: 768px) {.sentence-card{width: 33.33%;}} */
/*lg>=1200px*/
/* @media (min-width: 1200px) {.sentence-card{width: 25%;}} */
/*xl>=1920px*/
/* @media (min-width: 1920px) {.sentence-card{width: 25%;}} */
</style>