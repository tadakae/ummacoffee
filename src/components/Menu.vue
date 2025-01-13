<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const items = ref([]);
const isLoading = ref(true);
const error = ref(null);
const isModalOpen = ref(false);
const selectedItem = ref(null);
const isAnimating = ref(false);

const fetchMenuItems = async () => {
  try {
    const response = await axios.get('https://8a5d97df2ab05859.mokky.dev/items');
    items.value = response.data;
  } catch (err) {
    error.value = 'Ошибка при загрузке данных';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const openModal = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;

  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
  }, 300);
};

const closeModal = () => {
  isAnimating.value = true;
  setTimeout(() => {
    isModalOpen.value = false;
    isAnimating.value = false;
  }, 300);
};

onMounted(() => {
  fetchMenuItems();
});
</script>

<template>
  <div class="px-7">
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="menu-container mt-5 flex justify-start items-center flex-wrap gap-5">
      <div
          v-for="item in items"
          :key="item.id"
          class="menu-item border border-solid border-gray-100 bg-white w-[calc(50%-10px)] h-[250px] text-[#723b00] rounded-[20px] p-4 flex flex-col justify-center items-center text-center cursor-pointer"
          @click="openModal(item)"
      >
        <img
            :src="item.imageUrl"
            :alt="item.titlee"
            class="menu-item-image w-auto h-[120px] object-contain mb-3"
        />
        <h3 class="text-[16px] font-bold">{{ item.titlee }}</h3>
      </div>
    </div>

    <!-- Модальное окно -->
    <div
        v-if="isModalOpen"
        class="modal-overlay fixed inset-0 flex justify-center items-center"
        :class="{ 'backdrop-hidden': isAnimating }"
        @click="closeModal"
    >
      <div
          class="modal-content relative bg-white w-[90%] max-w-[500px] rounded-[20px] p-6 shadow-lg transform scale-0"
          :class="{ 'animate-modal-in': !isAnimating }"
          @click.stop
      >
        <h2 class="text-[20px] font-bold mb-4">{{ selectedItem?.titlee }}</h2>
        <p class="text-[16px] mb-4">Описание: {{ selectedItem?.description || 'Нет описания.' }}</p>
        <img :src="selectedItem?.imageUrl" alt="Картинка" class="w-full h-[200px] object-cover rounded-[10px]" />
        <button
            @click="closeModal"
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-[20px] font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  z-index: 3000;
  transition: backdrop-filter 0.3s ease-in-out;
}

.backdrop-hidden {
  backdrop-filter: blur(0);
}

@keyframes modal-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.animate-modal-in {
  animation: modal-in 0.3s ease-out forwards;
}
</style>
