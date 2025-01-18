<script setup>
// Здесь вы можете добавить дополнительные настройки, если нужно
</script>

<template>
  <div class="main-container">
    <!-- Заголовок страницы -->
    <header class="header">
      <h1>Біз сізді жүрек жылуымен және сапалы кофе дәмімен қарсы аламыз</h1>
    </header>

    <!-- Адрес кофейни -->
    <section class="address-section">
      <h2>Бізді табыңыз:</h2>
      <p>Мекенжайы: Алматы қаласы, Абая көшесі, 25</p>
      <p>Жұмыс уақыты: Дүйсенбі - Жексенбі, 08:00 - 22:00</p>
    </section>

    <!-- Контакты -->
    <section class="contact-section">
      <h2>Байланыс:</h2>
      <p>Телефон: +7 (701) 123-45-67</p>
      <p>Email: coffee@mysite.kz</p>
    </section>
  </div>
</template>

<style scoped>
/* Основные стили */
.main-container {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f5f5f5; /* Светло-серый фон */
  color: #405147; /* Основной цвет текста */
  line-height: 1.6;
}

/* Стили для заголовка */
.header h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #405147; /* Основной цвет */
  background-color: #ffffff; /* Белый фон */
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Легкая тень */
}

/* Секции */
.address-section, .contact-section {
  margin: 20px 0;
  background-color: #ffffff; /* Белый фон */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Легкая тень */
}

/* Заголовки секций */
h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #405147;
}

/* Текст */
p {
  font-size: 1rem;
  color: #405147;
}
</style>
