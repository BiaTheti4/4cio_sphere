<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scaleС=1.0, user-scalable=no">
  <div class="main-container">

    <div v-if="!formSubmitted" class="text-block">
      <div class="heading-large">План мероприятий</div>
      <div class="heading-small">
        2025 год <span class="underline decoration-wavy decoration-purple-600">вместе</span> с Клубом 4CIO
      </div>
    </div>


    <div v-if="submitError && !isMobile" class="error-block text-red-700">
      При отправке формы произошла ошибка. Попробуйте снова
    </div>

    <div v-if="isMobile&&submitError" class="error-block-mobile text-red-700">
      При отправке формы произошла ошибка. Попробуйте снова
    </div>
    <div v-if="formSubmitted" class="success-block">
      <div class="flex flex-col items-center justify-center text-center">
        <img alt="" :src="test" class="w-[96px] h-[96px]"/>
        <span class="first-success-block">В ближайшее время  вы получите план мероприятий  на указанную почту</span>
      </div>
    </div>


    <form v-else @submit.prevent="submitForm" class="main-form ">
      <div class="form-container">

        <div v-for="(field, index) in fields" :key="index" class="text-left">
          <div class="input-block">
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
          </div>
          <div v-if="errors[field.model]" class="error-text">{{ errors[field.model] }}</div>
        </div>
      </div>


      <div class="button-container">
        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? "Отправка..." : "Получить план" }}
        </button>
        <div class="agreement-text">
          Нажимая на кнопку, вы соглашаетесь на обработку своих <a href="https://4cio.ru/policy" target="_blank"
                                                                   class="underline">персональных данных</a>.
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import axios from "axios";
import success from "@/assets/Vector.png"
import test from "@/assets/Vector.png"

const apiServer = import.meta.env.VITE_API_SERVER;

const formData = ref({
  first_name: "",
  last_name: "",
  company: "",
  jobtitle: "",
  email: "",
});
const windowWidth = ref(window.innerWidth);

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});
const isMobile = computed(() => windowWidth.value <= 450);
const isTablet = computed(() => windowWidth.value > 450 && windowWidth.value <= 1200);
const isDesktop = computed(() => windowWidth.value > 1200);

const errors = ref({});
const loading = ref(false);
const submitError = ref(false);
const formSubmitted = ref(false);
const textSizeClass = computed(() => {
  if (isMobile.value) return 'text-[32px]';
  if (isTablet.value) return 'text-[44px]';
  return 'text-[64px]';
});


const fields = [
  {id: "first_name", model: "first_name", label: "Имя", type: "text", placeholder: "Иван"},
  {id: "last_name", model: "last_name", label: "Фамилия", type: "text", placeholder: "Иванов"},
  {id: "company", model: "company", label: "Компания", type: "text", placeholder: "Технология"},
  {id: "jobtitle", model: "jobtitle", label: "Должность", type: "text", placeholder: "Директор по развитию"},
  {id: "email", model: "email", label: "E-mail", type: "email", placeholder: "mail@example.ru"},
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
    // formSubmitted.value = true;
    submitError.value = true;

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
.text-block {
  gap: 8px;
  font-weight: bold;
  margin-bottom: 102px;
  display: flex;
  flex-direction: column;
}
.button-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.main-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.success-block {
  line-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 70vh;
  width: 800px;
}

@media  screen and (min-width: 1300px) and (max-width: 1500px) and (min-height: 800px) and (max-height: 900px) {
.text-block{
  margin-bottom: 50px;
}
}

@media screen and (max-width: 820px) {
  .success-block {
    width: 100%;
  }
}

.first-success-block {
  letter-spacing: -3px;
  font-size: 64px;
  font-weight: bold;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px 0 4px 0;
  align-items: center;
  width: 100%;
}

.error-block-mobile {
  font-size: 16px;
  line-height: 22px;
  padding: 16px;
  text-wrap: auto;
  width: 100%;
  margin: 0 auto;
  background-color: #FFF0F0;
  border-radius: 24px;
  margin-bottom: 8px;
}

.error-block {
  top: 150px;
  position: absolute;
  font-size: 16px;
  line-height: 22px;
  padding: 16px;
  text-wrap: nowrap;
  width: 100%;
  margin: 0 auto;
  background-color: #FFF0F0;
  border-radius: 24px;
}

@media screen and (max-width: 550px) {
  .error-block {
    text-wrap: auto;
    top: 95px;

  }

  .text-block {
    gap: 8px;
    font-weight: bold;
    margin-bottom: 32px;
  }
}

  .heading-large {
    letter-spacing: -3px;
    font-size: 64px;
    line-height: 64px;
    text-wrap: nowrap;
    text-align: center;
  }

  .heading-small {
    font-size: 28px;
    line-height: 30px;
    text-align: center;
  }

  .form-container {
    width: 100%;
    height: 100%;
    padding: 16px;
    background-color: #ede9fe;
    border-radius: 24px;
    display: flex;
    gap: 8px;
    flex-direction: column;

  }

  .input {
    border: none;
    padding: 12px 16px 12px 16px;
    border-radius: 8px;
    width: 100%;
    font-size: 16px;
    height: 44px;
  }

  .input:focus-visible {
    outline: 2px solid #8453D4
  }

  .input:hover {

  }

  input:valid {
    background: #FFFFFF;

  }

  .input-invalid {
    border: 2px solid #DF070B
  }

  .label {
    font-size: 16px;
    font-weight: 400;
    color: #4f4a5a;
  }


  .submit-button {

    color: #fff;
    font-size: 18px;
    font-weight: 600;
    height: 56px;
    line-height: 21px;
    border-radius: 16px;
    width: 100%;
    background: linear-gradient(90deg, #8453D4 0%, #8656D5 20%, #8657D6 40%, #8B61D9 60%, #8F68DC 80%, #9472E0 100%);
  }

  .submit-button:hover {
    background: #9472E0;
  }

  .agreement-text {
    font-size: 0.875rem;
    color: #938EA2;
    text-align: left;
  }

  @media (max-width: 768px) {
    .first-success-block {
      font-size: 44px;
      font-weight: bold;
    }
    .text-block {
      gap: 8px;
      font-weight: bold;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
    }
    .error-block {
      top: 125px;
      font-size: 14px;
    }

    .second-success-block {
      font-size: 44px;
      font-weight: 500;
    }

    .third-success-block {
      font-size: 16px;
      font-weight: 400;
    }
.main-container{
  position: relative;
}
    .heading-large {
      font-size: 44px;
      line-height: 44px;

    }

    .heading-small {
      font-size: 18px;
      line-height: 21px;
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

  @media (max-width: 400px) {
    .heading-large {
      font-size: 36px;
      line-height: 44px;

    }
    .text-block {
      margin-bottom: 5px;
    }
    .heading-small {
      font-size: 18px;
      line-height: 21px;
    }
  }

</style>
