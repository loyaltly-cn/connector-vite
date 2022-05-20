<template>
  <var-steps :active="active" direction="vertical" @click-step="step">
    <var-step>商品选购</var-step>
    <var-step>购物车</var-step>
    <var-step>提交</var-step>
  </var-steps>
  <var-button @click="jmp(++active)" type="info">下一步</var-button>
</template>

<script>
import {ref} from "vue";
import {Snackbar} from "@varlet/ui";
import {global} from "../global";
import {Email} from "../smtp"
export default {
  name: "step",
  data(){
    return{
      active:ref(0)
    }
  },
  methods:{
    step(index){
      if (index <= this.active){
        this.jmp(index)
        this.active = index
      }else {
        Snackbar.warning('请点击下一步');
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
            Snackbar.warning('请选择商品');
          }
          break;
        case 2:
          this.$router.push('/commit')
          break;
        case 3:
          if (global.phone!==null){
            this.commit()
          }else {
            Snackbar.warning('请输入手机号');
          }
          break;
        default:break
      }
    },
    commit(){
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

      let order = {
        buyers:{
          phone:'+'+global.code+global.phone,
          email:global.email
        },
        products:body
      }
      Email.send({
        Host : "smtp.elasticemail.com",
        Username : "loyaltly.cn@gmail.com",
        Password : "9A464BB5FF70F00C31FC127936826B62A27F",
        To : '1464808104@qq.com',
        From : "loyaltly.cn@gmail.com",
        Subject : "水密接插件订单",
        Body : order
      }).then(
          void this.over()
      );
    },
    over(){
      this.active = 0
      Snackbar.success('提交成功 请等待我们与您联系')
      this.$router.push('/show')
    }
  }
}
</script>

<style scoped>

</style>