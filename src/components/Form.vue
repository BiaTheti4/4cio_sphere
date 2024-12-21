<template>
  <div class="main-container">
    <div v-if="!formSubmitted" class="text-block">
      <div class="heading-large">План мероприятий</div>
      <div class="heading-small">
        2025 год <span class="underline decoration-wavy decoration-purple-600">вместе</span> с клубом 4CIO
      </div>
    </div>


    <div v-if="submitError" class="error-block text-red-700">
      При отправке формы произошла ошибка. Попробуйте снова
    </div>


    <div v-if="formSubmitted" class="success-block">
      <div class="flex flex-col items-center justify-center text-center">
          <img alt="" :src="test" class="w-[96px] h-[96px]"  />
          <span class="first-success-block">План мероприятий</span>
          <span class="second-success-block">отправлен</span>
          <span class="third-success-block">проверьте указанную почту</span>
      </div>
    </div>


    <form v-else @submit.prevent="submitForm" class="w-full max-w-[574px]">
      <div class="form-container">

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
import success from "@/assets/success.svg"
import test from "@/assets/Vector.png"

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
const submitError = ref(false);
const formSubmitted = ref(false);


const fields = [
  { id: "first_name", model: "first_name", label: "Имя", type: "text", placeholder: "Иван" },
  { id: "last_name", model: "last_name", label: "Фамилия", type: "text", placeholder: "Иванов" },
  { id: "company", model: "company", label: "Компания", type: "text", placeholder: "Технология" },
  { id: "jobTitle", model: "jobTitle", label: "Должность", type: "text", placeholder: "Директор по развитию" },
  { id: "email", model: "email", label: "E-mail", type: "email", placeholder: "mail@example.ru" },
];

const submitForm = async () => {
  errors.value = {};
  submitError.value = false;
  loading.value = true;

  try {
    const response = await axios.post(apiServer, formData.value);
    if (response.status === 200) {
      console.log("Успешно отправлено:", formData.value);
      formSubmitted.value = true;
    }
  } catch (error) {
    formSubmitted.value = true;
    // submitError.value = true;

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
.success-block{
  vertical-align: middle;
}
.first-success-block{
font-size:64px ;
  font-weight: 500;
}
.second-success-block{
  font-size:64px ;
  font-weight: 500;
}
.third-success-block{
  font-size: 18px;
  font-weight: 400;
}
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px 0 4px 0;
  align-items: center;
  width: 100%;
}

.error-block {
  font-size: 16px;
  line-height: 22px;
  padding: 16px;
  text-wrap: nowrap;
  width: 100%;
  margin: 0 auto;
  background-color: #FFF0F0;
  border-radius: 24px;

}


.text-block {
margin-bottom: 5%;

}
.heading-large {
  font-size: 64px;
  font-weight: bold;
  text-wrap: nowrap;
  text-align: center;
}

.heading-small {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}

.form-container {
  padding: 1rem;
  background-color: #ede9fe;
  border-radius: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.label {
  font-size: 1rem;
  font-weight: 500;
  color: #4f4a5a;
}

.input {
  border: 1px solid #ccc;
  padding: 0.75rem;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1rem;
}

.submit-button {
  margin-top: 1rem;
  background-color: #8b5cf6;
  color: #fff;
  font-size: 1.25rem;
  font-weight: bold;
  height: 3.5rem;
  border-radius: 0.75rem;
  width: 100%;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #7c3aed;
}

.agreement-text {
  font-size: 0.875rem;
  color: #4b5563;
  text-align: center;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .first-success-block{
    font-size:44px ;
    font-weight: 500;
  }
  .second-success-block{
    font-size:44px ;
    font-weight: 500;
  }
  .third-success-block{
    font-size: 16px;
    font-weight: 400;
  }
  .heading-large {
    font-size: 44px;
  }
  .heading-small {
    font-size: 18px;
  }
  .form-container {
    padding: 0.75rem;
  }

  .submit-button {
    height: 3rem;
    font-size: 1rem;
  }

  .agreement-text {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .first-success-block{
    font-size:32px ;
    font-weight: 500;
  }
  .second-success-block{
    font-size:32px ;
    font-weight: 500;
  }
  .third-success-block{
    font-size: 16px;
    font-weight: 400;
  }
  .heading-large {
    font-size: 32px;
  }
  .heading-small {
    font-size: 16px;
  }
  .error-block {
    text-wrap: auto;
  }
  .form-container {
    padding: 0.5rem;
    gap: 0.75rem;
  }

  .label {
    font-size: 0.875rem;
  }

  .input {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .submit-button {
    height: 2.75rem;
    font-size: 0.875rem;
  }
}
</style>
