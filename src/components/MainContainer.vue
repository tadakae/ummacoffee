<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const activeRoute = ref(''); // Активный роут
const router = useRouter();

function navigateTo(route) {
  activeRoute.value = route;
  router.push(route);
}
</script>

<template>
  <div class="mainCon">
    <div class="container" :class="{ active: activeRoute === '/' }" @click="navigateTo('/')">
      <div>
        <b>Главная</b>
      </div>
    </div>
    <div class="container" :class="{ active: activeRoute === '/menu' }" @click="navigateTo('/menu')">
      <div>
        <b>Меню</b>
      </div>
    </div>
    <div class="container" :class="{ active: activeRoute === '/cart' }" @click="navigateTo('/cart')">
      <div>
        <b>Корзина</b>
      </div>
    </div>
  </div>

  <router-view />
</template>

<style scoped>
.container {
  background-color: #405147;
  width: fit-content;
  margin-left: 10px;
  margin-top: 15px;
  border-radius: 45px;
  height: 25px;
  cursor: pointer;
}

b {
  color: white;
  font-size: 13px;
  margin-left: 12px;
  margin-right: 12px;
}

.mainCon {
  display: flex;
}
</style>