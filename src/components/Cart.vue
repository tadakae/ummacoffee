<script setup>
import { ref } from 'vue';

const cartItems = ref([]);
</script>


<template>
  <div>
    <h1>Корзина</h1>
    <div v-if="cartItems.length === 0">Корзина пуста</div>
    <div v-else>
      <div
          v-for="(item, index) in cartItems"
          :key="index"
          class="cart-item border border-solid border-gray-100 bg-white rounded-[10px] p-4 mb-2 shadow"
      >
        <h3 class="text-[16px] font-bold">{{ item.titlee }}</h3>
        <p class="text-[14px]">Описание: {{ item.description || 'Нет описания.' }}</p>
        <img :src="item.imageUrl" alt="Картинка" class="w-full h-[150px] object-cover rounded-[10px]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

h1 {
  font-size: 24px;
  color: #405147;
  margin-bottom: 20px;
}
</style>
