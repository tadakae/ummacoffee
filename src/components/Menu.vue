<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const items = ref([]);
const isLoading = ref(true);
const error = ref(null);
const isModalOpen = ref(false);
const selectedItem = ref(null);
const isAnimating = ref(false);
const cartItems = ref([]); // Хранение выбранных элементов корзины
const filteredItems = ref([]); // Отфильтрованные элементы для отображения
const categories = ref([]); // Категории
const selectedCategory = ref(''); // Выбранная категория
const categoryNames = {
  "Hot_coffee": "Горячий кофе",
  "Ice_coffee": "Холодный кофе",
  "Tea": "Чай",
  "Limonade": "Лимонад",
  "Coctail": "Коктейль",
  "Smoozi": "Смузи"
};

const fetchMenuItems = async () => {
  try {
    const response = await axios.get('https://8a5d97df2ab05859.mokky.dev/items');
    const rawData = response.data;

    if (Array.isArray(rawData) && rawData.length > 0) {
      const flatItems = [];
      const categoryNames = [];

      // Перебираем категории и добавляем к элементам поле `category`
      Object.entries(rawData[0]).forEach(([categoryName, itemsInCategory]) => {
        if (Array.isArray(itemsInCategory)) {
          itemsInCategory.forEach((item) => {
            flatItems.push({ ...item, category: categoryName }); // Добавляем категорию к объекту
          });
          categoryNames.push(categoryName); // Собираем названия категорий
        }
      });

      items.value = flatItems;
      categories.value = categoryNames;

      // Изначально показываем все элементы
      filteredItems.value = flatItems;
    } else {
      error.value = 'Некорректный формат данных';
    }
  } catch (err) {
    error.value = 'Ошибка при загрузке данных';
    console.error('Ошибка:', err);
  } finally {
    isLoading.value = false;
  }
};

const filterItems = (category) => {
  if (selectedCategory.value === category) {
    // Если текущая категория уже выбрана, сбрасываем фильтр
    selectedCategory.value = '';
    filteredItems.value = items.value;
  } else {
    // Иначе применяем фильтр по категории
    selectedCategory.value = category;
    filteredItems.value = items.value.filter((item) => item.category === category);
  }
};

const openModal = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;

  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
  }, 10);
};

const closeModal = () => {
  isAnimating.value = true;
  setTimeout(() => {
    isModalOpen.value = false;
    isAnimating.value = false;
  }, 300);
};

// Добавление выбранного элемента в корзину
const addToCart = () => {
  if (selectedItem.value) {
    cartItems.value.push({ ...selectedItem.value }); // Копируем элемент в корзину
    closeModal();
  }
};

onMounted(() => {
  fetchMenuItems();
});
</script>


<template>
  <div class="px-3">
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="menu-main mt-3">
      <div class="menu-tab flex items-center gap-3 px-2 overflow-x-auto scroll-smooth h-[35px]">
        <div v-for="category in categories" :key="category" class="tab-item transition border-[#405147] border" @click="filterItems(category)"
             :class="[selectedCategory === category ? 'bg-white text-[#405147]' : 'bg-[#405147] text-white']">
          <span>{{ categoryNames[category] || category }}</span>
        </div>
      </div>
      <div class="menu-list mt-3 flex justify-start items-center flex-wrap gap-5">
        <div
            v-for="item in filteredItems"
            :key="item.id"
            class="menu-item border border-solid border-gray-100 bg-white w-[calc(50%-10px)] h-[250px] text-[#723b00] rounded-[20px] p-4 flex flex-col justify-center items-center text-center cursor-pointer"
            @click="openModal(item)"
        >
          <img
              :src="item.imageUrl"
              :alt="item.title"
              class="menu-item-image w-auto h-[120px] object-contain mb-3"
          />
          <h3 class="text-[16px] font-bold">{{ item.title }}</h3>
        </div>
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
        <div class="flex justify-between mt-4">
          <button
              @click="addToCart"
              class="bg-green-500 text-white px-4 py-2 rounded-[10px] hover:bg-green-600"
          >
            В корзину
          </button>
          <button
              @click="closeModal"
              class="text-gray-500 hover:text-gray-800 text-[20px] font-bold"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>

<!--    &lt;!&ndash; Отображение корзины &ndash;&gt;-->
<!--    <div class="cart mt-8">-->
<!--      <h2 class="text-[20px] font-bold mb-4">Корзина</h2>-->
<!--      <div v-if="cartItems.length === 0">Корзина пуста</div>-->
<!--      <div v-else>-->
<!--        <div-->
<!--            v-for="(item, index) in cartItems"-->
<!--            :key="index"-->
<!--            class="cart-item border border-solid border-gray-100 bg-white w-full text-[#723b00] rounded-[10px] p-4 mb-2"-->
<!--        >-->
<!--          <h3 class="text-[16px] font-bold">{{ item.titlee }}</h3>-->
<!--          <p class="text-[14px]">Описание: {{ item.description || 'Нет описания.' }}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>


<style scoped>
.menu-tab {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.menu-tab::-webkit-scrollbar {
  display: none;
}

.tab-item {
  width: fit-content;
  border-radius: 40px;
  padding: 2px 12px;
  font-size: 16px;
  user-select: none;
  white-space: nowrap;
  display: inline-block;
  box-sizing: border-box;
}

.menu-item {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Добавляем лёгкую тень */
  transition: box-shadow 0.3s ease; /* Плавный переход при наведении */
}

.menu-item:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Увеличенная тень при наведении */
}

/* Остальные стили остаются как есть */
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  z-index: 3000;
  transition: backdrop-filter 0.1s ease-in-out;
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
.cart {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}

.cart-item {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.9;
}
</style>
