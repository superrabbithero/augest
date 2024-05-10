<template>
  <div class="container">
    <p @click="closeall()" style="color:#aaa;cursor: pointer;">点击隐藏公式</p>

    <p>1.已知:基期量 A、现期量 B</p>
    <p class="gongshi" @click="show($event)">$$X=B-A\quad 、\quad R=\frac{(B-A)}{A}$$</p>
    <p>2.已知:基期量 A、增长量 X</p>
    <p class="gongshi" @click="show($event)">$$B=A+X\quad 、\quad R=\frac{X}{A}$$</p>
    <p>3.已知:现期量 B、增长量 X</p>
    <p class="gongshi" @click="show($event)">$$A=B-X\quad 、\quad R=\frac{X}{(B-X)}$$</p>
    <p>4.已知:现期量 B、增长率 R</p>
    <p class="gongshi" @click="show($event)">$$A=B/(1+R)\quad 、\quad X=B-\frac{B}{(1+R)}$$</p>
    <p>5.已知:基期量 A、增长率 R</p>
    <p class="gongshi" @click="show($event)">$$X=AR\quad 、\quad B=A+AR$$</p>
    <p>6.已知:增长率 R、增长量 X</p>
    <p class="gongshi" @click="show($event)">$$A=\frac{X}{R}\quad 、\quad B=\frac{X}{R}+X$$</p>
    <p>比值增长率:</p>
    <p class="gongshi" @click="show($event)">$$\frac{R_1-R_2}{1+R_2}$$</p>
    <p>比重差：</p>
    <p class="gongshi" @click="show($event)">$$\frac{a}{B}*(R_1-R_2)$$</p>
    <p>乘积增长率:</p>
    <p class="gongshi" @click="show($event)">$$R=R_1+R_2+R_1*R_2$$</p>
    <p>隔年增长率:</p>
    <p class="gongshi" @click="show($event)">$$R=R_1+R_2+R_1*R_2$$</p>
    <p>拉动增长率:</p>
    <p class="gongshi" @click="show($event)">$$拉动增长率=\frac{部分增量}{整体基期}$$</p>
    <p>增量贡献率:</p>
    <p class="gongshi" @click="show($event)">$$增量贡献率=\frac{部分增量}{整体增量}$$</p>
    <TheLatex2Math style="display: none;" :latex="'增量贡献率:增量贡献率=\\frac{部分增量}{整体增量}'" />

  </div>
</template>

<script>
import TheLatex2Math from './TheLatex2Math'

export default {
  name: 'ziliaofx',
  components: {
    TheLatex2Math
  },
  methods: {
    show(e){
      e.currentTarget.style.opacity = 1
    },
    closeall(){
      let els = document.getElementsByClassName("gongshi")
      for(var i=0 ; i<els.length ; i++){
        els[i].style.opacity = 0
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .gongshi {
    transition:opacity 0.5s ease-in;
    opacity: 1;
  }

</style>

