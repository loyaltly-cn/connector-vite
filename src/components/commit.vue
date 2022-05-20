<template>
  <var-space direction="column" justify="center" class="main">
    <var-input @blur="emailFun()" placeholder="邮箱" v-model="email" >
      <template #prepend-icon>
        <span>@</span>
      </template>
    </var-input>

    <var-menu offset-x="-30" offset-y="50" alignment="top" v-model:show="show">
      <var-input @blur="phoneFun()" type="number" :placeholder="'手机号+'+currentCode" v-model="phone" >
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

<script>
import {global} from "../global";
import {list} from "../code"
export default {
  name: "commit",
  created() {
    global.list.forEach((data)=>{
      console.log(data)
    })

    this.codeList = list
  },
  data(){
    return{
      phone:null,
      email:null,
      currentCode:86,
      currentUrl:'https://country-flag.oss-cn-shanghai.aliyuncs.com/cn.webp',
      show:false,
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
    margin-top: 20%;

  }
</style>