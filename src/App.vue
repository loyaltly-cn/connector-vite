<script setup>
import LoyalBar from "./components/loyal-bar.vue";
import Step from './components/step.vue'
</script>

<template>
  <var-sticky offset-top="5">
    <loyal-bar/>
  </var-sticky>

  <var-row>
    <var-col class="view" span="22"
              offset="1"
             :xs="{offset:0}"
    >
      <router-view/>
    </var-col>
    <var-col class="step" span="2"
            offset="19">
      <step/>
    </var-col>
  </var-row>
</template>

<style scoped>
  .step{
    position: fixed;
    margin-top: 2%;
  }
  .view{
    margin-top: 1%;
  }
</style>