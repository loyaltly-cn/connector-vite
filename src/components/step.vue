<template>
  <var-space direction="column" class="main">
    <var-steps :active="active" direction="vertical" @click-step="step">
      <var-step>{{ text.step.select }}</var-step>
      <var-step>{{ text.step.shopping }}</var-step>
      <var-step>{{ text.step.commit }}</var-step>
    </var-steps>
    <var-button @click="jmp(++active)" type="info">{{ text.step.next }}</var-button>
  </var-space>
</template>

<script>
import {ref} from "vue";
import {Snackbar} from "@varlet/ui";
import {global} from "../global";
import {Email} from "../smtp"
import {zn as text} from "../language";
export default {
  name: "step",
  data(){
    return{
      active:ref(0),
      current_language:'',
      text:{}
    }
  },
  created() {
    this.text = global.currentLanguage
    setInterval(()=>{
      if (global.currentLanguage.language !== this.current_language){
       this.current_language = global.currentLanguage.language
        this.text = global.currentLanguage
      }
    },100)
  },
  methods:{
    step(index){
      if (index <= this.active){
        this.jmp(index)
        this.active = index
      }else {
        Snackbar.warning(global.currentLanguage.hint.step_next);
      }
    },
    jmp(index){
      switch (index){
        case 0:
          this.$router.push('/show')
          break
        case 1:
          if (global.list.length){
            this.$router.push('/shopping')
          }else {
            this.active--
            // console.log(global.currentLanguage.hint.select_product)
            Snackbar.warning(global.currentLanguage.hint.select_product);
          }
          break;
        case 2:
          this.$router.push('/commit')
          break;
        case 3:
          if (global.phone!==null){
            this.commit()
          }else {
            Snackbar.warning(global.currentLanguage.hint.phone);
          }
          break;
        default:break
      }
    },
    async commit(){
      let body = []
      global.list.forEach((data)=>{
        let product = {
          name:data.name,
          core:data.core,
          length:data.length,
          quantity:data.quantity
        }
        body.push(product)
      })

      let buyer = {
        phone:'+'+global.code+global.phone,
        email:global.email
      }


      let obj = new URLSearchParams()
      obj.append('data',JSON.stringify(body))
      obj.append('timeStamp',new Date().getTime().toString())
      obj.append('phoneNumber','+'+global.code+global.phone)
      obj.append('email',global.email)

      let res = await this.$http({
        url:'orders',
        method:'post',
        data:obj
      })

      if (res.code){
        Email.send({
          Host : "smtp.elasticemail.com",
          Username : "loyaltly.cn@gmail.com",
          Password : "9A464BB5FF70F00C31FC127936826B62A27F",
          To : 'jimmy@rovmaker.org',
          From : "loyaltly.cn@gmail.com",
          Subject : "水密接插件订单",
          Body : '客户邮箱:'+buyer.email+'  电话'+buyer.phone
        }).then(
            void this.over()
        );
      }

    },
    over(){
      this.active = 0
      Snackbar.success(global.currentLanguage.commit.over)
      this.$router.push('/show')
    }
  }
}
</script>

<style scoped>
  .main{
    width: 100%;
  }
</style>