<template>
  <span class="output">$${{latex}}$$</span>

</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  name: 'TheLate2Math',
  props:{
    latex:{
      type:String,
      required:true
    }
  },
  setup(props) {
    const myFormula = ref("$$"+props.latex+"$$") //自己指定公式，也可以动态输入
    
    //渲染函数，调用时会渲染指定节点elements，如果没有指定节点，渲染页面上所有公式
    //elements可以是一个DOM节点的数组(注意getXXXsByYYY的结果是collection，必须手动转为数组才行)
    const TypeSet = async function (elements) {
      console.log(window.MathJax,"//window.MathJax")
      // console.log(elements)
      if (!window.MathJax) {
        return
      }
      // console.log(window.MathJax)
      // window.MathJax.startup.promise = 
      window.MathJax.startup.promise
      .then(() => {
        return window.MathJax.typesetPromise(elements)
      })
      .catch((err) => console.log('Typeset failed: ' + err.message))
      
      return window.MathJax.startup.promise
    }
    
    //onMounted的时候必须调用
    onMounted(()=>{
      TypeSet()
      //这里写自己的onMounted内容
    })
    
    watch(()=> props.latex,
    (newValue)=>{
      //直接调用TypeSet()也可以，但是会重新渲染页面所有公式
      TypeSet([document.getElementsByClassName("output")])
    })
    
    return {
      myFormula,
    }
  }
}

</script>
