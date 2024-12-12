<template>
  <div class="flex flex-col items-center justify-center px-4">
    <div class="text-block">
      <div class="heading-large mb-2">План мероприятий</div>
      <div class="heading-small mb-[110px]">
        2025 год <span class="underline decoration-wavy decoration-purple-600">вместе</span> с клубом 4CIO
      </div>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-container">
        <div class="text-left">
          <label for="firstName" class="label">Имя</label>
          <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              placeholder="Иван"
              required
              class="input"
          />
        </div>
        <div class="text-left">
          <label for="lastName" class="label">Фамилия</label>
          <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              placeholder="Иванов"
              required
              class="input"
          />
        </div>
        <div class="text-left">
          <label for="company" class="label">Компания</label>
          <input
              id="company"
              v-model="formData.company"
              type="text"
              placeholder="Технология"
              required
              class="input"
          />
        </div>
        <div class="text-left">
          <label for="position" class="label">Должность</label>
          <input
              id="position"
              v-model="formData.position"
              type="text"
              placeholder="Директор по развитию"
              required
              class="input"
          />
        </div>
        <div class="text-left">
          <label for="email" class="label">E-mail</label>
          <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="mail@example.ru"
              required
              class="input"
          />
        </div>
      </div>
      <div>
        <button type="submit" class="submit-button">
          Получить план
        </button>
        <div class="agreement-text">
          Нажимая на кнопку, вы соглашаетесь на обработку своих <span class="underline">персональных данных</span>.
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const formData = ref({
  firstName: '',
  lastName: '',
  company: '',
  position: '',
  email: '',
});

const submitForm = () => {
  console.log('Форма отправлена:', formData.value);
  formData.value = {
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    email: '',
  };
};
</script>

<style scoped>
/* Базовые стили */
.heading-large {
  font-size: 64px;
  font-weight: bold;
  text-wrap: nowrap;
}

.heading-small {
  font-size: 28px;
  font-weight: bold;
}

.form-container {

  padding: 1rem;
  background-color: #ede9fe;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 574px;
  width: 100%;
}

.label {
  font-size: 16px;
  font-weight: 500;
  color: #4f4a5a;
}

.input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
}

.submit-button {
  margin-top: 1rem;
  background-color: #8b5cf6;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  height: 3.5rem;
  border-radius: 1rem;
  width: 100%;
}

.agreement-text {
  font-size: 0.875rem;
  color: #4b5563;
  text-align: center;

}

/* Адаптивность */
@media (max-width: 620px) {
  .text-block {
    text-align: center;
  }

  .heading-large {
    font-size: 32px;
  }

  .heading-small {
    font-size: 18px;
  }

  .form-container {
    padding: 0.5rem;
    width: 100%;

  }

  .submit-button {
    height: 3rem;
  }

  .agreement-text {
    font-size: 0.75rem;
  }
}

@media (min-width: 620px) {
  .text-block {
    text-align: center;
  }

  .heading-large {
    font-size: 32px;
  }

  .heading-small {
    font-size: 18px;
  }

  .form-container {

    width: 574px;
    height: 527px;

  }

  .submit-button {
    height: 3rem;
  }

  .agreement-text {
    font-size: 0.75rem;
  }
}
</style>
