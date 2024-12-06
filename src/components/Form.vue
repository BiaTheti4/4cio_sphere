<template>
  <div class=" flex flex-col items-center justify-center">
    <div class="text-center">
      <div class="font-bold text-[64px] text-nowrap">План мероприятий</div>
      <div class="text-[28px] mt-2 font-bold">2025 год <span class="underline decoration-wavy decoration-purple-600">вместе</span> с клубом 4CIO</div>
    </div>
    <form @submit.prevent="submitForm" >
      <div class="mt-6 p-4 bg-violet-100 rounded-2xl shadow-md  flex flex-col justify-between h-[435px] w-[574px]">
        <div class=" text-left">
          <label for="firstName" class="block  font-medium text-[#4F4A5A] text-[16px]">Имя</label>
          <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              placeholder="Иван"
              required
              class="border p-2 w-full rounded-lg"
          />
        </div>
        <div class="text-left">
          <label for="lastName" class="block  font-medium text-[#4F4A5A] text-[16px]">Фамилия</label>
          <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              placeholder="Иванов"
              required
              class="border p-2 w-full rounded-lg"
          />
        </div>
        <div class=" text-left text-[16px]">
          <label for="company" class="block  font-medium text-[#4F4A5A] text-[16px]]">Компания</label>
          <input
              id="company"
              v-model="formData.company"
              type="text"
              placeholder="Технология"
              required
              class="border p-2 w-full rounded-lg"
          />
        </div>
        <div class="text-left text-[16px]">
          <label for="position" class="block  font-medium text-[#4F4A5A] text-[16px]">Должность</label>
          <input
              id="position"
              v-model="formData.position"
              type="text"
              placeholder="Директор по развитию"
              required
              class="border p-2 w-[542px] h-[48px] rounded-lg"
          />
        </div>
        <div class="text-left text-[16px]">
          <label for="email" class="block  font-medium text-[#4F4A5A] text-[16px]">E-mail</label>
          <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="mail@example.ru"
              required
              class="border p-2 w-full rounded-lg"
          />
        </div>
      </div>
      <div>
        <button type="submit" class="rounded-2xl text-white bg-violet-500 h-[56px] w-full font-bold mt-2" >
          Получить план
        </button>
        <div class="text-sm text-gray-600 p-2 text-center mt-2 w-[435px] text-nowrap">
          Нажимая на кнопку, вы соглашаетесь на обработку своих <span class="underline">персональных данных</span>.
        </div>
      </div>
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
/* Дополнительные стили */
</style>
