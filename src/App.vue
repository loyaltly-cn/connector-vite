<script setup>
import LoyalBar from "./components/loyal-bar.vue";
import Step from './components/step.vue'
</script>

<template>
  <var-sticky offset-top="5">
    <loyal-bar/>
  </var-sticky>

  <var-row>
    <var-col span="20"  class="view">
      <router-view/>
    </var-col>
    <var-col span="4" class="step" >
      <step/>
    </var-col>
  </var-row>
</template>

<style scoped>
  .step{
    /*width: 100%;*/
    position: fixed;
    margin-left: 77%;
    margin-top: 2%;
  }
  .view{
    margin-top: 1%;
  }
</style>