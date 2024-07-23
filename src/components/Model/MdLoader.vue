<template>
    <div class="markdown-body" ref="markdownRef">
        <component :is="markdownContent" />
    </div>
</template>
<script>

// import 'highlight.js'
// import 'highlightjs-line-numbers.js';
export default {
    props:{
        mdFileName:{
            type:String,
            required:true
        }
    },
    data() {
        return {
            markdownContent: null,
        }
    },

    updated(){
        
        this.findMarkdownHeadings();
        this.TypeSet([document.getElementsByClassName("output")])
        
    },
    mounted(){
        
    },
    created() {
        var that = this
        import('@/assets/docs/' + this.mdFileName + '.md').then( async module => {
            const markdownContent = module.default; // 获取默认导出的组件
            
            that.markdownContent = markdownContent;
        })

        
        
    },
    methods: {
    findMarkdownHeadings() {
      // 选择class为'markdown-body'下所有的h1-6元素
      const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6');

      // 转换成数组
      this.$parent.headingsList = Array.from(headings).map(element => {
        return {
          level: parseInt(element.tagName[1]), // 提取标题级别
          content: element.textContent.trim(),// 提取标题内容
          ele:element 
        };
      });
    },
    TypeSet(elements){
      if (!window.MathJax) {
        console.log('no window.MathJax')
        return
      }
      // window.MathJax.startup.promise = 
      window.MathJax.startup.promise
      .then(() => {
        return window.MathJax.typesetPromise(elements)
      })
      .catch((err) => console.log('Typeset failed: ' + err.message))
      
      return window.MathJax.startup.promise
    }
  }
}
</script>

<style>

    @import url('@/assets/css/github-markdown.css');
    
    .markdown-body {
       color:var(--fontnormal);
       background-color: var(--box-bgc);
       width: -webkit-fill-available;
    }

    .markdown-body body {
       background-color: var(--box-bgc);
    }

    /* @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    } */
</style>