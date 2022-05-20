<template>
  <var-space justify="space-around">
    <var-sticky offset-top="100">
      <var-tabs
          class="tabs-example-vertical"
          elevation
          layout-direction="vertical"
          v-model:active="active"
      >
        <var-tab @click="showAll()">所有产品</var-tab>
        <var-tab @click="change(item)" v-for="(item,index) in spcList">{{item.name}}</var-tab>
      </var-tabs>
    </var-sticky>

    <var-space direction="column" class="cell">
      <var-cell v-for="(item,index) in cellList" :border="true">
        <template #default>
          <var-space>
            <var-image @click="preview(item.url)" fit="none" :src="item.url" />
          </var-space>
        </template>
        <template #desc>
          <p>{{item.name}}</p>
        </template>
        <template #extra>
          <var-icon v-ripple="{ color: '#2979ff' }" @click="add(item)" name="plus-circle-outline" :size="30"/>
        </template>
      </var-cell>
    </var-space>

  </var-space>
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
    }
  },
  async created(){
    await this.getSpc()
    await this.getProduct()
    this.cellList = this.productList
  },
  methods:{
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
  width: 120% !important;
  height: 200px !important;
}

.cell{
  width: 1100px;
}

</style>