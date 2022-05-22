<script setup>
import LoyalBar from "./components/loyal-bar.vue";
import Step from './components/step.vue'
</script>

<template>
  <var-sticky offset-top="10">
    <loyal-bar/>
  </var-sticky>

  <div class="main">
    <var-space  justify="center" :size="[20, 20]">
      <var-space justify="center "><router-view/></var-space>
      <var-space  direction="column" justify="right" >
        <var-sticky offset-top="100"><step/></var-sticky>
      </var-space>
    </var-space>

  </div>

</template>


<style scoped>
.main{
  margin-top: 5%;
}

.select{
  width: 100px;
}

</style>