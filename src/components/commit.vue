<template>
<!--  {{text.commit.alert}}-->
  <var-col span="3" offset="9">
    <var-card
    :description="text.commit.alert"
    :ripple="true"
    />
  </var-col>
  <var-col offset="1">
    <var-card class="card">
      <template #description>
        <var-space direction="column" justify="center" class="main">
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
      </template>
    </var-card>
  </var-col>

<!--  <var-snackbar content="snack" v-model:show="snckShow" position="center" type="info" :duration="9999999999" >  </var-snackbar>-->
</template>

<script>
import {global} from "../global";
import {list} from "../code"
import {Snackbar} from "@varlet/ui";
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
      emailFun:()=>{
        global.email = this.email
      },
      phoneFun:()=>{
        global.code = this.currentCode
        global.phone = this.phone
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
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .card{
    width: 15%;
  }
</style>