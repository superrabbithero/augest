<template>
    <div class="markdown-body" ref="markdownRef">
        <component :is="markdownContent" />
    </div>
</template>
<script>
import 'github-markdown-css';
import 'highlight.js'
import 'highlightjs-line-numbers.js';
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
            headings:[]
        }
    },

    updated(){
        var that = this
        console.log(that.$refs.markdownRef.innerHTML)  
        var mkStr = that.$refs.markdownRef.innerHTML

        const regex = /<h3>(.*?)<\/h3>/g;
        let match;
        while ((match = regex.exec(mkStr)) !== null) {
          that.headings.push(match[1]);
}
        console.log(that.headings)
    },
    created() {
        var that = this
        import('@/assets/docs/' + this.mdFileName + '.md').then( async module => {
            const markdownContent = module.default; // 获取默认导出的组件
            
            that.markdownContent = markdownContent;
        })

        
        
    }
}
</script>

<style>
    .markdown-body {
       color:var(--fontnormal);
       background-color: var(--box-bgc);
    }

    .markdown-body body {
       background-color: var(--box-bgc);
    }

    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>