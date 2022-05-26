import { createApp } from 'vue'
import App from './App.vue'
import {router} from "./router";
import Varlet from '@varlet/ui'
import axios from "axios";
import VueAxios from "vue-axios";
import '@varlet/ui/es/style.js'
import '@varlet/touch-emulator'

const app = createApp(App)

app.use(router)
app.use(VueAxios,axios)
app.use(Varlet)

app.mount('#app')

// const url = 'http://localhost:8006/'
const url = 'https://rovmaker.loyaltly.cn/connectorApi/'

app.config.globalProperties.$judgeRouter = (code) =>{
    let url = ''
    switch (code){
        case 0:
            url = 'show'
            break
        case 1:
            url = 'shopping'
            break
        case 2:
            url = 'commit'
            break
        default:break
    }
    console.log(url)
    return url
}



app.config.globalProperties.$http = async (param) =>{
    console.log(param.data)
    let res = await axios({
        url:url+param.url,
        method:param.method,
        data:param.data
    })
    return res.data
}

app.config.globalProperties.$judgeIcon = (icon) =>{
    if (icon === 'plus-circle-outline'){
        return true
    }else {
        return false
    }
}