<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="font-bold text-[64px]">Шар предсказаний</div>
    <div class="text-[28px] mb-4">Какой ваш новый 2025 год?</div>

    <!-- Сфера с динамическим размером -->
    <Sphere
        :style="{
        width: isLoading ? '574px' : (selectedPrediction ? '328px' : '574px'),
        height: isLoading ? '574px' : (selectedPrediction ? '328px' : '574px')
      }"
        class="sphere transition-all duration-500 ease-in-out cursor-pointer"
        :class="{ 'small': selectedPrediction || isLoading, 'large': !selectedPrediction && !isLoading }"
        @click="getRandomPrediction"
    ></Sphere>

    <div v-if="!isLoading && selectedPrediction" class="relative mt-6">
      <div
          class="absolute bg-violet-200 w-[542px] h-[152px] rounded-lg -top-4 left-1/2 transform -translate-x-1/2 z-0"
      ></div>
      <div
          class="relative bg-violet-100 w-[574px] h-[152px] rounded-lg flex items-center justify-center text-xl text-black z-10"
      >
        {{ selectedPrediction }}
      </div>
    </div>

    <button
        @click="getRandomPrediction"
        :style="{
        width: hasClicked ? '574px' : '328px',
        transition: 'width 0.3s'
      }"
        class="rounded-2xl text-white bg-violet-500 h-[56px] font-bold mt-6 flex items-center justify-center"
    >
      <svg
          v-if="isLoading"
          aria-hidden="true"
          class="inline w-5 h-5 text-gray-200 animate-spin dark:text-white-600 fill-purple-300 mr-2"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
        />
        <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
        />
      </svg>
      {{ isLoading ? 'Смотрю в будущее...' : (hasClicked ? 'Еще раз' : 'Испытать удачу') }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sphere from './Sphere.vue';

const predictions = [
  "2025 год принесёт множество возможностей для реализации ИИ-проектов.",
  "Новый год станет для вас годом инноваций и технологического развития.",
  "Угрозы кибератак будут расти, и ваша роль в защите данных станет критически важной.",
  "Ваша способность собирать и анализировать данные станет ключом к успешным решениям.",
  "Конкуренция со стороны новых компаний будет расти.",
  "Искусственный интеллект станет неотъемлемой частью ваших бизнес-процессов.",
  "Блокчейн начнёт находить применение не только в финансовом секторе.",
  "Методологии управления проектами будут адаптироваться к быстро меняющимся условиям рынка.",
  "Сотрудничество с инновационными стартапами станет стратегическим преимуществом.",
  "Потребность в специалистах с новыми навыками будет расти."
];

const selectedPrediction = ref('');
const isLoading = ref(false);
const hasClicked = ref(false);

const getRandomPrediction = () => {
  isLoading.value = true; // Начинаем процесс загрузки предсказания
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * predictions.length);
    selectedPrediction.value = predictions[randomIndex]; // Обновляем предсказание
    isLoading.value = false; // Завершаем процесс загрузки
    hasClicked.value = true; // Отмечаем, что кнопка была нажата
  }, 2000); // Задержка для симуляции выбора предсказания
};
</script>

<style scoped>
/* Стили для компонента (если нужно) */
</style>
