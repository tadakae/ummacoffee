<template>
  <div>
    <Header></Header>
    <MainContainer></MainContainer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MainContainer from "@/components/MainContainer.vue";

export default {
  components: {
    MainContainer,
    Header
  },
  setup() {

    return {}
  }
}
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}
</style>