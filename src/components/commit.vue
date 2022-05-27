<template>

  <var-col span="2"></var-col>

  <var-col span="15" offset="2" >

    <var-space align="center" direction="column" class="main">
      <p>{{text.commit.alert}}</p>

      <var-input @blur="nameFun()" :placeholder="text.commit.name" v-model="name" >
        <template #prepend-icon>
          <var-icon name="https://rovmaker.oss-cn-shanghai.aliyuncs.com/connector/img/name.png" />
        </template>
      </var-input>

      <var-input @blur="emailFun()" :placeholder="text.commit.email" v-model="email" >
        <template #prepend-icon>
          <var-icon name="https://rovmaker.oss-cn-shanghai.aliyuncs.com/connector/img/email.png" />
        </template>
      </var-input>

      <var-menu offset-x="-30" offset-y="50" alignment="top" v-model:show="show">
        <var-input @blur="phoneFun()" type="number" :placeholder="text.commit.phone+'+'+currentCode" v-model="phone" >
          <template #prepend-icon>
            <var-image fit="contain" @click="show=true" :src="currentUrl" />
          </template>
        </var-input>
        <template #menu>
          <var-space direction="column">
            <var-cell  @click="selectCode(item)" v-for="(item,index) in codeList">
              <var-col>
                <var-image fit="contain"  @click="show=true" :src="item.url" />{{item.name}}+{{item.code}}
              </var-col>
            </var-cell>
          </var-space>
        </template>
      </var-menu>

    </var-space>
  </var-col>

</template>

<script>
import {global} from "../global";
import {list} from "../code"
import {Snackbar} from "@varlet/ui";
import '@varlet/ui/es/styles/elevation.css'

Snackbar.allowMultiple(true)
export default {
  name: "commit",
  created() {
    // global.list.forEach((data)=>{
    //   console.log(data)
    // })
    this.codeList = list
    global.currentRouter = 2

    this.text = global.currentLanguage
    setInterval(()=>{
      if (global.currentLanguage.language !== this.current_language){
        this.current_language = global.currentLanguage.language
        this.text = global.currentLanguage
      }
    },100)
  },
  data(){
    return{
      text:{},
      phone:null,
      email:null,
      currentCode:86,
      currentUrl:'https://country-flag.oss-cn-shanghai.aliyuncs.com/cn.webp',
      show:false,
      snckShow:true,
      codeList:[],
      name:null,
      emailFun:()=>{
        global.email = this.email
      },
      phoneFun:()=>{
        global.code = this.currentCode
        global.phone = this.phone
      },
      nameFun:()=>{
        global.name = this.name
      }
    }
  },
  methods:{
    selectCode(obj){
      this.currentUrl = obj.url
      this.currentCode = obj.code
      this.show = false
    }
  }

}
</script>

<style scoped>
  .main{
    margin-top: 1%;
    border:1px solid #c8c8c8;
    width: 100%;
    height: 110%;
    -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
    -moz-box-shadow:0px 3px 3px #c8c8c8 ;
    box-shadow:0px 3px 3px #c8c8c8 ;
  }
</style>