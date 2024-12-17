<template>
  <div class="main-container">
    <!-- Заголовок -->
    <div class="text-block">
      <div class="heading-large mb-2">План мероприятий</div>
      <div class="heading-small mb-[10vh]">
        2025 год <span class="underline decoration-wavy decoration-purple-600">вместе</span> с клубом 4CIO
      </div>
    </div>

    <!-- Блок ошибки -->
    <div v-if="submitError" class="error-block text-red-700">
      При отправке формы произошла ошибка. Попробуйте снова
    </div>

    <!-- Успешное сообщение -->
    <div v-if="formSubmitted" class="success-block text-green-700">
      <div class="success-message">

      </div>
    </div>

    <!-- Форма -->
    <form v-else @submit.prevent="submitForm" class="w-full max-w-[574px]">
      <div class="form-container">
        <!-- Поля формы -->
        <div v-for="(field, index) in fields" :key="index" class="text-left">
          <label :for="field.id" class="label">{{ field.label }}</label>
          <input
              :id="field.id"
              v-model="formData[field.model]"
              :type="field.type"
              :placeholder="field.placeholder"
              :class="{ 'input-error': errors[field.model] }"
              required
              class="input"
          />
          <div v-if="errors[field.model]" class="error-text">{{ errors[field.model] }}</div>
        </div>
      </div>

      <!-- Кнопка и текст соглашения -->
      <div>
        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? "Отправка..." : "Получить план" }}
        </button>
        <div class="agreement-text">
          Нажимая на кнопку, вы соглашаетесь на обработку своих <span class="underline">персональных данных</span>.
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const apiServer = import.meta.env.VITE_API_SERVER;

const formData = ref({
  first_name: "",
  last_name: "",
  company: "",
  jobTitle: "",
  email: "",
});

const errors = ref({});
const loading = ref(false);
const submitError = ref(false); // Переменная для отображения ошибки
const formSubmitted = ref(false); // Переменная для успешной отправки формы

// Поля формы для итерации
const fields = [
  { id: "first_name", model: "first_name", label: "Имя", type: "text", placeholder: "Иван" },
  { id: "last_name", model: "last_name", label: "Фамилия", type: "text", placeholder: "Иванов" },
  { id: "company", model: "company", label: "Компания", type: "text", placeholder: "Технология" },
  { id: "jobTitle", model: "jobTitle", label: "Должность", type: "text", placeholder: "Директор по развитию" },
  { id: "email", model: "email", label: "E-mail", type: "email", placeholder: "mail@example.ru" },
];

const submitForm = async () => {
  errors.value = {};
  submitError.value = false; // Сброс ошибки при новой попытке отправки
  loading.value = true;

  try {
    // Отправка данных на сервер
    const response = await axios.post(apiServer, formData.value);

    if (response.status === 200) {
      console.log("Успешно отправлено:", formData.value);
      formSubmitted.value = true; // Устанавливаем флаг успешной отправки
    }
  } catch (error) {
    submitError.value = true; // В случае ошибки отображаем блок ошибки
    formSubmitted.value = true;
    if (error.response && error.response.status === 422) {
      const validationErrors = error.response.data.errors || {};
      errors.value = mapValidationErrors(validationErrors);
    } else {
      console.error("Произошла ошибка:", error.message);
    }
  } finally {
    loading.value = false;
  }
};

const mapValidationErrors = (validationErrors) => {
  const mappedErrors = {};
  for (const field in validationErrors) {
    if (validationErrors[field].length > 0) {
      mappedErrors[field] = validationErrors[field][0];
    }
  }
  return mappedErrors;
};
</script>

<style scoped>
.success-block {
  font-size: 18px;
  line-height: 24px;
  padding: 16px;
  background-color: #f0fff4;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 16px;
}

.success-message {
  font-weight: bold;
  color: #38a169;
}
</style>
