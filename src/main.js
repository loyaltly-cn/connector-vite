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
const url = 'https://api.bj-jiuqi.com/connectorApi/'

app.config.globalProperties.$http = async (param) =>{
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