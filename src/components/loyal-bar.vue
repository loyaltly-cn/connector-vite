<template>
  <div>
    <var-app-bar title-position="center" :color="obj.color" :text-color="obj.textColor">

      <template #default>
        <p class="specification" @click="preview()">{{ text.title }}</p>
      </template>

      <template #left>
        <var-image src="https://rovmaker.oss-cn-shanghai.aliyuncs.com/connector/img/logo.png" />
      </template>
      <template #right>
        <var-space>
          <var-icon @click="toggleTheme()" :name="obj.icon" size="30" />
          <var-select @change="switchLanguage()" :line="false" :hint="false" placeholder="中文" offset-y="40" style="width:80px" v-model="select_language">
            <var-option label="中文" />
            <var-option label="English" />
          </var-select>
        </var-space>
      </template>
    </var-app-bar>
  </div>
</template>

<script>

import {ImagePreview} from "@varlet/ui";
import dark from '@varlet/ui/es/themes/dark'
import { StyleProvider } from '@varlet/ui'
import {global} from "../global";
import {en, zn} from "../language";

export default {
  name: "loyal-bar",
  data(){
    return{
      currentTheme:null,
      obj:{
        color:'#ffffff',
        textColor:'#000000',
        icon:'white-balance-sunny',
      },
      show:false,
      select_language:'中文',
      text:null
    }
  },
  async created() {
    this.theme_init()
    this.language_init()
    this.parseUrl()
  },
  methods:{
    parseUrl(){
      let url = location.href
      if (url.slice(-2) ==='en'){
        this.select_language = 'English'
        this.switchLanguage()
      }
   },
    language_init(){
      let language = localStorage.getItem('language')
      if (language){
        this.select_language = 'English'
        global.currentLanguage = en
      }else {
        global.currentLanguage = zn
      }
      this.text = global.currentLanguage
    },
    theme_init(){
      let theme = localStorage.getItem('theme')
      if (!theme){
        this.toggleTheme()
      }
    },
    preview(){
      ImagePreview('https://rovmaker.oss-cn-shanghai.aliyuncs.com/connector/img/specification.jpg')
    },
    toggleTheme(){
      if (this.currentTheme){
        this.currentTheme = null
        this.obj.color = '#ffffff'
        this.obj.textColor='#000000'
        this.obj.icon = 'white-balance-sunny'
        localStorage.setItem('theme','theme')
      }else {
        this.currentTheme = dark
        this.obj.color = '#303030'
        this.obj.textColor='#ffffff'
        this.obj.icon = 'weather-night'
        localStorage.removeItem('theme')
      }
      StyleProvider(this.currentTheme)
    },
    switchLanguage(){
      if (this.select_language === '中文'){
        global.currentLanguage = zn
        localStorage.removeItem('language')
        console.log('zn')
      }else if (this.select_language === 'English'){
        console.log('en')
        global.currentLanguage = en
        localStorage.setItem('language','en')
      }
      this.text = global.currentLanguage
      console.log(global.currentLanguage)
      // this.$router.push(this.$judgeRouter(global.currentRouter))
    }
  }
}
</script>

<style >
  .specification{
    color: cornflowerblue;
    text-decoration:underline;
  }
  body {
    transition: background-color .25s;
    color: var(--color-text);
    background-color: var(--color-body);
  }
</style>