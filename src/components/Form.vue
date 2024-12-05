<template>
  <div class="text-center">
    <div class="font-bold text-[64px]">План мероприятий</div>
    <div class="text-[28px]">2025 год вместе с клубом 4CIO</div>
    <form @submit.prevent="submitForm" class="mb-4 mt-2 p-4 bg-violet-100 rounded-lg shadow-md h-[574] w-[435] mx-auto">
      <div class="mb-4 text-left">
        <label for="firstName" class="block text-sm font-medium text-gray-700">Имя</label>
        <input
            id="firstName"
            v-model="formData.firstName"
            type="text"
            placeholder="Иван"
            required
            class="border p-2 w-full rounded-lg"
        />
      </div>
      <div class="mb-4 text-left">
        <label for="lastName" class="block text-sm font-medium text-gray-700">Фамилия</label>
        <input
            id="lastName"
            v-model="formData.lastName"
            type="text"
            placeholder="Иванов"
            required
            class="border p-2 w-full rounded-lg"
        />
      </div>
      <div class="mb-4 text-left">
        <label for="company" class="block text-sm font-medium text-gray-700">Компания</label>
        <input
            id="company"
            v-model="formData.company"
            type="text"
            placeholder="Технология"
            required
            class="border p-2 w-full rounded-lg"
        />
      </div>
      <div class="mb-4 text-left">
        <label for="position" class="block text-sm font-medium text-gray-700">Должность</label>
        <input
            id="position"
            v-model="formData.position"
            type="text"
            placeholder="Директор по развитию"
            required
            class="border p-2 w-full rounded-lg"
        />
      </div>
      <div class="mb-4 text-left">
        <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
        <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="mail@example.ru"
            required
            class="border p-2 w-full rounded-lg"
        />
      </div>

    </form>
    <button type="submit" class="rounded-2xl text-white bg-violet-500 h-[56px] w-full font-bold">
      Получить план
    </button>
    <div class="text-sm text-gray-600 p-2">
      Нажимая на кнопку, вы соглашаетесь на обработку своих <span class="underline">персональных данных</span>.
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const formData = ref({
  firstName: '',
  lastName: '',
  company: '',
  position: '',
  email: ''
});

const submitForm = () => {
  console.log('Форма отправлена:', formData.value);
  // Очистка формы после отправки
  formData.value = {
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    email: ''
  };
};
</script>

<style scoped>
/* Стили для Plans.vue */
</style>
