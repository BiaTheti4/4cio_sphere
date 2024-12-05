<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="font-bold text-[64px] text-nowrap">Шар предсказаний</div>
    <div class="font-bold text-[28px]  text-nowrap">Какой ваш новый 2025 год?</div>

    <Sphere
        :style="{
        width: isLoading ? '540px' : (selectedPrediction ? '328px' : '540px'),
        height: isLoading ? '540px' : (selectedPrediction ? '328px' : '540px')
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
      <div v-if="isLoading">
        <img :src="loadingGif" class="w-[24px] mr-[3px]" alt="Загрузка..."/>
      </div>
      {{ isLoading ? 'Смотрю в будущее...' : (hasClicked ? 'Еще раз' : 'Испытать удачу') }}
    </button>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Sphere from './Sphere.vue';
import loadingGif from '../assets/loading.gif';

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
  hasClicked.value = true;
  isLoading.value = true;
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * predictions.length);
    selectedPrediction.value = predictions[randomIndex];
    isLoading.value = false;
    hasClicked.value = true;
  }, 2000);
};
</script>

<style scoped>
.prediction-animation {
  animation: slideIn 0.5s ease-out 1.5s forwards;
}

@keyframes slideIn {
  from {
    transform: translateY(5px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
