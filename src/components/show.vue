<template>
  <var-col span="2"
  >
    <var-tabs
        class="tabs-example-vertical"
        elevation
        layout-direction="vertical"
        v-model:active="active"
    >
      <var-space>
        <var-tab @click="showAll()" name="information">{{text.all_product}}</var-tab>
        <var-tab v-if="text.language === '中文'" @click="change(item)" v-for="(item,index) in spcList">{{item.name}}</var-tab>
        <var-tab v-else-if="text.language === 'English'" @click="change(item)" v-for="(item,index) in spcList">{{item.en}}</var-tab>
      </var-space>

    </var-tabs>
  </var-col>
  <var-col span="20">
    <var-space direction="column" class="cell" justify="end">
      <var-cell v-for="(item,index) in cellList" :border="true" >
        <template #default>
          <var-space>
            <var-image @click="preview(item.url)" fit="none" :src="item.url" />
          </var-space>
        </template>
        <template #desc>
          <p v-if="text.language === '中文'">{{item.name}}</p>
          <p v-else-if="text.language === 'English'">{{item.en}}</p>
        </template>
        <template #extra>
          <var-icon v-ripple="{ color: '#2979ff' }" @click="add(item)" name="plus-circle-outline" :size="30"/>
        </template>
      </var-cell>
    </var-space>
  </var-col>

</template>

<script>
import {ref} from "vue";
import {global} from "../global";
import {ImagePreview, Snackbar} from "@varlet/ui";
Snackbar.allowMultiple(true)
export default {
  name: "show",
  data(){
    return{
      active:ref(0),
      spcList:[],
      cellList:[],
      productList:[],
      text:{}
    }
  },
  async created(){
    this.language()
    await this.getSpc()
    await this.getProduct()
    this.cellList = this.productList
    global.currentRouter = 0
  },
  methods:{
    language(){
      this.text = global.currentLanguage
      setInterval(()=>{
        if (global.currentLanguage.language !== this.current_language){
          this.current_language = global.currentLanguage.language
          this.text = global.currentLanguage
        }
      },100)
    },
    async getSpc(){
      let res = await this.$http({
        url:'spcs',
        method:'get',
        data:{}
      })
      let that = this
      res.data.forEach((data)=>{
        that.spcList.push(data)
      })
    },
    async getProduct(){
      let res = await this.$http({
        url:'products',
        method:'get',
        data:{}
      })
      this.productList = res.data
    },
    change(obj){
      let that = this
      this.cellList = []
      this.productList.forEach((data)=>{
        if (obj.id === data.sid){
          that.cellList.push(data)
        }
      })
    },
    showAll(){
      this.cellList = this.productList
    },
    preview(url){
      ImagePreview(url)
    },
    add(obj){
      global.list.push(obj)
      Snackbar.success('ok');
    }
  }
}
</script>

<style scoped>
.tabs-example-vertical {
  width: 6% !important;
  height: 24% !important;
  position: fixed;
}

.cell{
  width: 100%;
}
</style>