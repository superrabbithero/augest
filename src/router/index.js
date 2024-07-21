import {Vue} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'



const routes = [
    {
        path: '/helloword',
        name: 'HelloWorld',
        component: () => import("@/components/HelloWorld")
    },
    {
        path: '/',
        name: 'Augest',
        component: () => import("@/components/Home")
    },
    {
        path: '/tools/bulidanswersheet',
        name: 'BulidAnswerSheet',
        component: () => import("@/components/BulidAnswerSheet"),
        meta:{
            title: '答题卡生成',
            footerHidden: true
        }
    },
    {
        path: '/minigames',
        name: 'MiniGames',
        component: () => import("@/components/MiniGames"),
        meta:{
            title: '小游戏'
        }
    },
    {
        path: '/minigames/schultetable',
        name: 'SchulteTable',
        component: () => import("@/components/SchulteTable"),
        meta:{
            title: '舒尔特表'
        }
    },
    {
        path: '/minigames/turtle',
        name: 'Turtle',
        component: () => import("@/components/Turtle"),
        meta:{
            title: '叠乌龟'
        }
    },
    {
        path: '/post/:postname',
        name: 'Post',
        component: () => import("@/components/Post"),
    },
    {
        path: '/minigames/pct2fct',
        name: 'Pct2Fct',
        component: () => import("@/components/Pct2Fct"),
        meta:{
            title: '百化分'
        }
    },
    {
        path: '/minigames/ziliaofx',
        name: 'ziliaofx',
        component: () => import("@/components/ziliaofx"),
        meta:{
            title: '资料分析公式'
        }
    },
    {
        path: '/gifedit',
        name: 'gifedit',
        component: () => import("@/components/page/GifEdit"),
        meta:{
            title: 'GIF动图编辑'
        }
    },
    {
        path: '/zhenti/:papername',
        name: 'zhenti',
        component: () => import("@/components/zhenti/zhenti"),
        meta:{
            title: '真题',
            footerHidden: true
        }
    },
    {
        path: '/examhome',
        name: 'examhome',
        component: () => import("@/components/zhenti/ExamHome"),
        meta:{
            title: '考试模拟器'
        }
    },
    {
        path: '/pixelSvgEditor',
        name: 'pixelSvgEditor',
        component: () => import("@/components/pixelSvgEditor"),
        meta:{
            title: '像素图标编辑器',
            footerHidden: true
        }
    },
    {
        path: '/myPixelIcons',
        name: 'myPixelIcons',
        component: () => import("@/components/myPixelIcons"),
        meta:{
            title: '我的像素图标',
        }
    },
    {
        path: '/FQTManagement',
        name: 'FQTManagement',
        component: () => import("@/components/FQTManagement"),
        meta:{
            title: '四象限法则',
            footerHidden: true
        }
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  window.document.title = to.name
  next()
})

export default router

