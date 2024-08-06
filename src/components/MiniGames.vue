<template>
<div class="minig-container">
    <div class="box-ratio" @click="goto('/minigames/schultetable')">
      <div class="box-content">
        <div class="content-title">舒尔特表</div>
        <p>由俄国心理学家 Georg Schulte 设计的，旨在增强个体的注意力和视觉搜索能力。</p>
      </div>
    </div>
    <div class="box-ratio">
      <div class="box-content" @click="goto('/minigames/turtle')">
        <div class="content-title">叠乌龟</div>
        <p>有空再做...</p>
      </div>
    </div>
    <div class="box-ratio">
      <div class="box-content" @click="goto('/minigames/pct2fct')">
        <div class="content-title">百分化</div>
        <p>有空再做...</p>
      </div>
    </div>
    <div class="box-ratio">
      <div class="box-content" @click="goto('/minigames/ziliaofx')">
        <div class="content-title">资料分析公式</div>
        <p>有空再做...</p>
      </div>
    </div>
    <div class="box-ratio">
      <div class="box-content" @click="goto('/gameDemo')">
        <div class="content-title">GAME DEMO</div>
        <p>有空再做...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniGimes",
  methods:{
    goto(path){
      this.$router.push(path)
    },
  }
}
</script>

<style scoped>
  /* 默认3个div一行 */
  .minig-container {
    padding: 20px 20px;
    display: flex;
    flex-wrap: wrap;
  }

  .box-ratio {
    margin: 0 10px 20px 10px;
    border: var(--box-border);
    background: var(--box-bgc);
    width: calc(25% - 22px);
    border-radius:12px;
    position: relative;
  }

  @media (any-hover:hover){
    .box-ratio:hover {
      border-color: #425aef;
      cursor: pointer;
    }
  }

  .box-ratio:active {
    border-color: #425aef;
    cursor: pointer;
  }
  

  .box-ratio::before {
    content:"";
    display: block;
    padding-top:66.6666%;
  }

  .box-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    text-align: center;
    padding: 20px 50px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .box-content > p{
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .content-title {
    font-family: SmileySans-Oblique;
    font-size: 1.5rem;
  }


 

  @media (max-width: 1660px) {
    .box-ratio {
      width: calc(33.3333% - 22px);
    }
  }

  @media (max-width: 768px) {
    .box-ratio {
      width: calc(50% - 22px);
    }
  }

  @media (max-width: 480px) {
    .box-ratio {
      width: calc(100% - 22px);
    }
  }

</style>

