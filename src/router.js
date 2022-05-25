import {createRouter, createWebHashHistory} from "vue-router"
import show from './components/show.vue'
import shopping from "./components/shopping.vue";
import commit from "./components/commit.vue";
const routes =[
    {
        path:'/',
        redirect:'/show'
    },
    {
        path: '/show',
        component:show
    },
    {
        path: '/shopping',
        component:shopping
    },
    {
        path: '/commit',
        component:commit
    }

]

export const router = createRouter({
    history:createWebHashHistory('/connector/'),
    routes:routes
})