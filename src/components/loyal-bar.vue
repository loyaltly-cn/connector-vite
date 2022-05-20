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
        <var-space  justify="space-around" :size="[0,50]">
          <var-icon @click="toggleTheme()" :name="obj.icon" size="30" />
          <div @mouseover="show=true">
            <var-icon name="translate" size="30"/>
            <var-icon name="menu-down" />
            <var-menu offset-x="-60" offset-y="20" v-model:show="show">
              <template #menu>
                <div>
                  <var-button @click="language()" type="info">中 &nbsp;&nbsp;&nbsp;&nbsp;文</var-button>
                  <var-button  @click="language()">English</var-button>
                </div>
              </template>
            </var-menu>
          </div>
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
      show:false
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