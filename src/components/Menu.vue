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
    <div v-else class="menu-container">
      <div v-for="item in items" :key="item.id" class="menu-item">
        <img :src="item.imageUrl" :alt="item.titlee" class="menu-item-image" />
        <h3>{{ item.titlee }}</h3>
        <p>{{ item.price }} ₸</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.menu-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  text-align: center;
  background-color: #f9f9f9;
}

.menu-item-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

h3 {
  font-size: 16px;
  margin: 10px 0;
}

p {
  font-size: 14px;
  color: #555;
}
</style>
