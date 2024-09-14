import {Vue} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'



const routes = [
    {
        path: '/helloworld',
        name: 'HelloWorld',
        component: () => import("@/components/HelloWorld"),
        meta:{
            title: 'HelloWorld'
        }
    },
    {
        path: '/',
        name: 'Augest主页',
        component: () => import("@/components/Home")
    },
    {
        path: '/tools/bulidanswersheet',
        name: '答题卡生成',
        component: () => import("@/components/BulidAnswerSheet"),
        meta:{
            title: '答题卡生成',
            footerHidden: true
        }
    },
    {
        path: '/minigames',
        name: '小游戏',
        component: () => import("@/components/MiniGames"),
        meta:{
            title: '小游戏'
        }
    },
    {
        path: '/minigames/schultetable',
        name: '舒尔特表',
        component: () => import("@/components/SchulteTable"),
        meta:{
            title: '舒尔特表'
        }
    },
    {
        path: '/minigames/turtle',
        name: '不能比下面的乌龟大哦',
        component: () => import("@/components/Turtle"),
        meta:{
            title: '叠乌龟'
        }
    },
    {
        path: '/post/:postname',
        name: 'Blog',
        component: () => import("@/components/Post"),
    },
    {
        path: '/minigames/pct2fct',
        name: '百化分',
        component: () => import("@/components/Pct2Fct"),
        meta:{
            title: '百化分'
        }
    },
    {
        path: '/minigames/ziliaofx',
        name: '资料分析公式',
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
        name: '真题',
        component: () => import("@/components/zhenti/zhenti"),
        meta:{
            title: '真题',
            footerHidden: true
        }
    },
    {
        path: '/examhome',
        name: '考试模拟器',
        component: () => import("@/components/zhenti/ExamHome"),
        meta:{
            title: '考试模拟器'
        }
    },
    {
        path: '/pixelSvgEditor',
        name: '像素图标编辑器',
        component: () => import("@/components/pixelSvgEditor"),
        meta:{
            title: '像素图标编辑器',
            footerHidden: true
        }
    },
    {
        path: '/myPixelIcons',
        name: '我的像素图标',
        component: () => import("@/components/myPixelIcons"),
        meta:{
            title: '我的像素图标',
        }
    },
    {
        path: '/FQTManagement',
        name: '四象限法则',
        component: () => import("@/components/FQTManagement"),
        meta:{
            title: '四象限法则',
            footerHidden: true
        }
    },
    {
        path: '/gameDemo',
        name: 'gameDemo',
        component: () => import("@/components/gameDemo/gameDemo"),
        meta:{
            title: 'gameDemo',
            footerHidden: true
        }
    },
    {
        path: '/minigames/theTurtleFamily',
        name: 'theTurtleFamily',
        component: () => import("@/components/gameDemo/theTurtleFamily"),
        meta:{
            title: '乌龟家族',
            footerHidden: true
        }
    },
    {
        path: '/myTools',
        name: 'MyTools',
        component: () => import("@/components/MyTools"),
        meta:{
            title: '我的工具箱'
        }
    },
    {
        path: '/myTools/json',
        name: 'Json格式化',
        component: () => import("@/components/myTools/ToolJson"),
        meta:{
            title: 'Json格式化'
        }
    },
    {
        path: '/myColorPalette',
        name: '调色盘',
        component: () => import("@/components/myTools/MyColorPalette"),
        meta:{
            title: '调色盘'
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

