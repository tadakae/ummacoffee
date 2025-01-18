<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Автоматически определяем активный роут
const activeRoute = computed(() => route.path);

function navigateTo(route) {
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
  transition: background-color 0.3s ease;
}

.container.active {
  background-color: #1f2b27; /* Цвет для активного состояния */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Добавляем тень */
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
