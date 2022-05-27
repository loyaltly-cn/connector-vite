<template>
  <var-col span="1"></var-col>
  <var-col span="15" offset="3" class="main">
    <var-space direction="column" size="large" class="cell">
      <var-cell >
        <template #default>
          <var-space justify="end">
            <var-chip :plain="true" type="warning" >
              {{ text.shopping.aggregate.cycle }}
              <template #right>
                <var-icon @mouseover="show=true" @mouseout="show=false" name="help-circle-outline" />
              </template>
            </var-chip>
            <var-chip :plain="true" type="warning" >{{ text.shopping.aggregate.total_price }}{{this.allPrice}} {{text.shopping.aggregate.sign}}</var-chip>
          </var-space>
        </template>
      </var-cell>
      <var-cell v-for="(item,index) in list" :border="true">
        <template #default>
          <var-space justify="space-between">
            <var-image @click="preview(item.url)" fit="none" :src="item.url" />
            <var-space>
              <var-space  v-if="item.sid !== 2 && item.sid !== 4" justify="end">
                <var-col :offset="12">
                  <var-space direction="column">
                    <p></p>
                    <var-image  width="60%" :ripple="true" fit="scale-down" :src="item.coreIcon" />
                  </var-space>
                </var-col>
                <var-space direction="column" size="large" justify="end">
                  <var-col  :offset="8"> <var-badge type="info" :value="text.shopping.counter_text.core" /> </var-col>
                  <var-counter lazy-change @increment="add(index,'core')" @decrement="cut(index,'core')" color="#28a7e1" min="2" max="8" v-model="item.core"/>
                </var-space>
              </var-space>
              <var-space v-if="item.sid === 1 || item.sid === 5 ">
                <var-space direction="column" size="large" justify="center">
                  <var-col  :offset="8"> <var-badge type="info" :value="text.shopping.counter_text.length" /> </var-col>
                  <var-counter lazy-change @increment="add(index,'length')" @decrement="cut(index,'length')" color="#28a7e1" min="1" v-model="item.length"/>
                </var-space>
              </var-space>

              <var-space direction="column" size="large" justify="center">
                <var-col :offset="8"> <var-badge type="info" :value="text.shopping.counter_text.quantity" /> </var-col>
                <var-counter lazy-change @increment="add(index,'quantity')" @decrement="cut(index,'quantity')" color="#28a7e1" min="1" v-model="item.quantity"/>
              </var-space>
              <var-space direction="column" size="large" justify="center">
                <var-col :offset="7"> <var-badge type="info" :value="text.shopping.counter_text.price" /> </var-col>
                <var-chip type="info" :plain="true">{{ item.price }} $</var-chip>
              </var-space>
            </var-space>
          </var-space>
        </template>

        <template #desc>
          <p v-if="text.language === '中文'">{{item.name}}</p>
          <p v-else-if="text.language === 'English'">{{item.en}}</p>
        </template>
        <template #extra>
          <var-icon  v-ripple="{ color: '#ee0707' }" color="#EE0707FF" @click="del(index)" name="close-circle-outline" :size="30"/>
        </template>
      </var-cell >
    </var-space>
  </var-col>
  <var-snackbar v-model:show="show" type="warning"> {{text.hint.delivery_prompt}} </var-snackbar>
</template>

<script>
import {global} from "../global";
import {ImagePreview, Snackbar} from "@varlet/ui";
import {ref} from "vue";

let svgUrl = 'https://rovmaker.oss-cn-shanghai.aliyuncs.com/connector/img/core/'

export default {
  name: "shopping",
  data(){
    return{
      list:[],
      coreList:[],
      allPrice:0,
      show:false,
      text:{}
    }
  },
  async created() {
    if (!global.list.length){
      this.$router.push('/show')
    }
    this.language()
    let that = this
    let res = await this.$http({
      url:'cores',
      method:'get',
      data:{}
    })
    this.coreList = res.data
    global.list.forEach((data)=>{
      data.coreIcon = 'https://rovmaker.oss-cn-shanghai.aliyuncs.com/connector/img/core/2.svg'
      data.core = 2
      data.length = 1
      data.quantity = 1
      that.coreList.forEach((core)=>{
        if (core.coreNumber ===2 && core.pid === data.id){
          data.corePrice = core.price
        }
        data.price = (data.corePrice+data.length*60)*data.quantity
      })
      this.list.push(data)
      this.calculateAllPrice()
    })
    global.currentRouter = 1
  },
  mounted() {
    window.onbeforeunload = (e)=>{
      e.returnValue = 'back'
    }
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
    del(index){
      this.list = JSON.parse(JSON.stringify(this.list))
      this.list.splice(index,1)
      global.list = this.list
      if (!this.list.length){
        this.$router.push('/show')
      }else {
        Snackbar.success('ok');
      }
    },
    preview(url){
      ImagePreview(url)
    },
    add(index,type){
      this.list = JSON.parse(JSON.stringify(this.list))
      let sid = this.list[index].sid
      switch (type){
        case 'core':
          if ( sid !== 2 && sid !== 4 && this.list[index].core === 6){
            this.list[index].core+=2
          }else {
            this.list[index].core++
          }
          this.updateCorePrice(index)
          this.list[index].coreIcon = svgUrl+this.list[index].core+'.svg'
          break
        case 'length':
          this.list[index].length++
          break
        case 'quantity':
          this.list[index].quantity++
          break
        default:break
      }
      this.calculateUnilinePrice(index)

    },
    cut(index,type){
      this.list = JSON.parse(JSON.stringify(this.list))
      let sid = this.list[index].sid
      switch (type){
        case 'core':
          if ( sid!== 2 && sid!== 4 && this.list[index].core === 8){
            this.list[index].core-=2
          }else {
            this.list[index].core--
          }
          this.updateCorePrice(index)
          this.list[index].coreIcon = svgUrl+this.list[index].core+'.svg'
          break
        case 'length':
          this.list[index].length--
          break
        case 'quantity':
          this.list[index].quantity--
          break
        default:break
      }

      this.calculateUnilinePrice(index)
    },
    updateCorePrice(index){
      let id = this.list[index].id
      let that = this
      let core = this.list[index].core
      this.coreList.forEach((data)=>{
        if (id === data.pid && core === data.coreNumber){
          that.list[index].corePrice = data.price
        }
      })
    },
    calculateUnilinePrice(index){
      let obj = this.list[index]
      obj.price = parseFloat((obj.corePrice + (obj.length * 60)) * obj.quantity).toFixed(2)
      this.list[index].price = obj.price
      this.calculateAllPrice()
    },
    calculateAllPrice(){
      let all = 0
      this.list.forEach((data)=>{
        all+=parseFloat(data.price)
      })
      all = parseFloat(all).toFixed(2)
      this.allPrice = all
      global.list = this.list
      ref(this.allPrice)
      global.currentAllPrice = this.allPrice
    }
  }
}
</script>

<style scoped>
  .cell{
    width: 100%;
  }
</style>