<template>
  <div>
    <var-app-bar title-position="center" :color="obj.color" :text-color="obj.textColor">

      <template #default>
        <p class="specification" @click="preview()">规格参数</p>
      </template>

      <template #left>
        <var-image src="https://rovmaker.oss-cn-shanghai.aliyuncs.com/connector/img/logo.png" />
      </template>
      <template #right>
        <var-space>
          <var-icon @click="toggleTheme()" :name="obj.icon" size="30" />
          <var-select :line="false" :hint="false" placeholder="中文" offset-y="40" style="width:80px" v-model="currentLanguage">
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
      currentLanguage:'中文'
    }
  },
  created() {
    let theme = localStorage.getItem('theme')
    if (!theme){
      this.toggleTheme()
    }
  },
  methods:{
    language(){

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