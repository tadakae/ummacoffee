<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Убедитесь, что Axios установлен (npm install axios)

const items = ref([]);
const isLoading = ref(true); // Флаг загрузки
const error = ref(null); // Обработка ошибок

// Функция для загрузки данных
const fetchMenuItems = async () => {
  try {
    const response = await axios.get('https://8a5d97df2ab05859.mokky.dev/items');
    items.value = response.data; // Сохраняем данные
  } catch (err) {
    error.value = 'Ошибка при загрузке данных';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  fetchMenuItems();
});
</script>

<template>
  <div>
    <h1>Меню</h1>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="menu-container flex justify-center items-center flex-wrap gap-5">
      <div v-for="item in items" :key="item.id" class="menu-item w-[150px] h-[200px] text-[#723b00] rounded-[20px] p-4 text-start relative">
        <img :src="item.imageUrl" :alt="item.titlee" class="menu-item-image w-full h-20 " />
        <h3 class="text-[16px] my-[10px]">{{ item.titlee }}</h3>
        <p class="text-[14px] text-[#4c2700] font-bold absolute bottom-[16px]">{{ item.price }} ₸</p>
      </div>
    </div>
  </div>
</template>
<!--ee7c00-->
<!--723b00-->
<style scoped>
.menu-item {
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
}
</style>
