<template>
  <div class="text-center">
    <div class="font-bold text-5xl">План мероприятий</div>
    <div class="text-2xl">2025 год вместе с клубом 4CIO</div>
    <form @submit.prevent="submitForm" class="mt-4 p-4 bg-violet-100 rounded-lg shadow-md w-1/2 mx-auto ">
      <input v-model="formData.firstName" type="text" placeholder="Имя" required class="border p-2  w-full mb-4" />
      <input v-model="formData.lastName" type="text" placeholder="Фамилия" required class="border p-2  w-full mb-4" />
      <input v-model="formData.company" type="text" placeholder="Компания" required class="border p-2  w-full mb-4" />
      <input v-model="formData.position" type="text" placeholder="Должность" required class="border p-2  w-full mb-4"  />
      <input v-model="formData.email" type="email" placeholder="E-mail" required class="border p-2  w-full mb-4" />
      <button type="submit" class="rounded-2xl text-white bg-violet-500 h-[56px] w-full font-bold">
        Получить план
      </button>
    </form>
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
