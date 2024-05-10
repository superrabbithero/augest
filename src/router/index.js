import {Vue} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import HelloWorld from "../components/HelloWorld";
import Home from "@/components/Home";
import BulidAnswerSheet from "@/components/BulidAnswerSheet";
import MiniGames from "@/components/MiniGames"
import SchulteTable from "@/components/SchulteTable"
import Turtle from "@/components/Turtle"
import Post from "@/components/Post"
import Pct2Fct from "@/components/Pct2Fct"
import Ziliaofx from "@/components/ziliaofx"
import GifEdit from "@/components/page/GifEdit"



const routes = [
    {
        path: '/helloword',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/',
        name: 'Augest',
        component: Home
    },
    {
        path: '/tools/bulidanswersheet',
        name: 'BulidAnswerSheet',
        component: BulidAnswerSheet,
        meta:{
            title: '答题卡生成'
        }
    },
    {
        path: '/minigames',
        name: 'MiniGames',
        component: MiniGames,
        meta:{
            title: '小游戏'
        }
    },
    {
        path: '/minigames/schultetable',
        name: 'SchulteTable',
        component: SchulteTable,
        meta:{
            title: '舒尔特表'
        }
    },
    {
        path: '/minigames/turtle',
        name: 'Turtle',
        component: Turtle,
        meta:{
            title: '叠乌龟'
        }
    },
    {
        path: '/post/:postname',
        name: 'Post',
        component: Post
    },
    {
        path: '/minigames/pct2fct',
        name: 'Pct2Fct',
        component: Pct2Fct,
        meta:{
            title: '百化分'
        }
    },
    {
        path: '/minigames/ziliaofx',
        name: 'ziliaofx',
        component: Ziliaofx,
        meta:{
            title: '资料分析公式'
        }
    },
    {
        path: '/gifedit',
        name: 'gifedit',
        component: GifEdit,
        meta:{
            title: 'GIF动图编辑'
        }
    }

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

