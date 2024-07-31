import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// icon-park
import '@icon-park/vue-next/styles/index.css'
// import MathJax from './assets/MathJax.js'
import JsonModel from './components/Model/JsonModel.vue'
import MyModel from './components/Model/MyModel.vue'
import {MY_EVN} from './assets/js/constants.js'
import Toast from './components/Model/Toast.vue';
import MdLoader from './components/Model/MdLoader.vue';
import IconWrapper from './components/IconWrapper.vue';
import "@/icons"
import SvgIcon from "./components/Model/svgIcon.vue"

import hljs from "highlight.js/lib/core";
// import javascript from "highlight.js/lib/languages/javascript"; //引入语言
// hljs.registerLanguage("javascript", javascript);
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/stackoverflow-light.css";
import "highlight.js/lib/common";



// 插件
const ToastPlugin = {
  install(app) {
    app.config.globalProperties.$toast = {
      show(message, type) {

        const toast = document.createElement('div');
        const vm = createApp(Toast, {
        	type,
        	message
        }).mount(toast);

        document.body.appendChild(toast);

        setTimeout(() => {
          document.body.removeChild(toast)
        }, 3600);
      }
    };
  }
};


const app = createApp(App)
app
	.use(router)
	.use(ToastPlugin)
  // .use(hljsVuePlugin)
app
	.component('json-model', JsonModel)
	.component('my-model', MyModel)
	.component('toast',Toast)
	.component('md-loader',MdLoader)
  .component('IconWrapper',IconWrapper)
  .component('svg-icon',SvgIcon)
  .component('highlightjs', hljsVuePlugin.component)
// app.config.globalProperties.$MathJax = MathJax

// 将常量挂载到应用程序的全局配置中
app.config.globalProperties.$constants = {
  MY_EVN,
  DARK:false,
};


const vm = app.mount('#app')

