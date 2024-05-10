<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else v-html="markdownHtml"></div>
  </div>
</template>

<script>
import axios from 'axios';
import MarkdownIt from 'markdown-it';
// import VueMarkdown from 'vue-markdown';
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';
import nginx from 'highlight.js/lib/languages/nginx';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';
import shell from 'highlight.js/lib/languages/shell'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('shell', shell);

export default {
  name: 'MarkdownViewer',
  props: {
    postname: String
  },
  components: {
    // VueMarkdown,
  },
  data() {
    return {
      isLoading: true,
      markdownHtml: '',
    };
  },
  mounted() {
    this.loadMarkdown();
  },
  methods: {
    async loadMarkdown() {
      try {
        // console.log("postname:",this.postname)

        const response = await axios.get('/_posts/'+this.postname+".md"); 
        // const response = await axios.get('@/assets/docs/'+this.postname+".md"); 

        // 如果是生产环境的话路径地址需要改变
        if(this.$constants.MY_EVN == "production"){
          response = await axios.get('https://raw.githubusercontent.com/superrabbithero/superrabbithero.github.io/main/_posts/'+this.postname+".md")
        }
        const md = new MarkdownIt({
          html: true,
          linkify: true,
          breaks: true,
          xhtmlOut: true,
          typographer: true,
          highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return (
                  '<pre class="hljs"><code>' +
                  hljs.highlight(lang, str, true).value +
                  "</code></pre>"
                );
              } catch (__) { }
            }

            return (
              '<pre class="hljs"><code>' +
              md.utils.escapeHtml(str) +
              "</code></pre>"
            );
          },
        });
        this.markdownHtml = md.render(response.data);  //response.data
        this.isLoading = false;
      } catch (error) {
        console.error('Error loading Markdown file:', error);
      }
    },
  },
};
</script>

<style>
/* 样式可以根据需要进行自定义 */
</style>