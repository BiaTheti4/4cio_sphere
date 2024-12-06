<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="font-bold text-[36px] tablet:text-[48px] desktop:text-[64px] text-nowrap">Шар предсказаний</div>
    <div class="font-bold text-[20px] tablet:text-[24px] desktop:text-[28px] text-nowrap">
      Какой ваш <span class="underline decoration-wavy decoration-purple-600">новый</span> 2025 год?
    </div>

    <Sphere
        class="sphere transition-all duration-500 ease-in-out cursor-pointer"
        :style="sphereStyle"
        @click="getRandomPrediction"
    ></Sphere>

    <transition name="fade" appear>
      <div class="absolute -right-[82%] top-[23%]" v-if="!hasClicked">
        <svg
            width="330"
            height="68"
            viewBox="0 0 330 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <text x="20" y="30" font-family="Roboto, sans-serif" font-size="16px" fill="#000">
            <tspan x="20" dy="0">А вам уже повезло! План мероприятий</tspan>
            <tspan x="20" dy="20"
            >Клуба 4CIO на следующий год <a class="underline">уже тут</a></tspan
            >
          </text>
        </svg>
      </div>
    </transition>

    <transition name="slide-fade">
      <div
          v-show="!isLoading && selectedPrediction"
          class="relative mt-6"
      >
        <!-- Первый блок -->
        <div
            class="absolute bg-violet-200 rounded-lg -top-4 left-1/2 transform -translate-x-1/2 z-0"
            :class="{
          'w-[296px] h-[152px]': isMobile,
          'w-[516px] h-[152px]': isTablet,
          'w-[542px] h-[152px]': isDesktop
        }"
        ></div>

        <!-- Второй блок -->
        <div
            class="relative bg-violet-100 rounded-lg flex items-center justify-center text-black z-10"
            :class="{
          'w-[328px] h-[152px] text-base': isMobile,
          'w-[548px] h-[152px] text-lg': isTablet,
          'w-[574px] h-[168px] text-xl': isDesktop
        }"
        >
          {{ selectedPrediction }}
        </div>
      </div>
    </transition>


    <button
        @click="getRandomPrediction"
        class="rounded-2xl text-white bg-violet-500 h-[56px] font-bold mt-6 flex items-center justify-center transition-all duration-300 ease-in-out"
        :class="{
        'w-[328px]': !hasClicked,
        'w-[574px]': hasClicked
      }"
    >
      <div v-if="isLoading">
        <img :src="loadingGif" class="w-[24px] mr-[3px]" alt="Загрузка..." />
      </div>
      {{ isLoading ? 'Смотрю в будущее...' : (hasClicked ? 'Еще раз' : 'Испытать удачу') }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Sphere from './Sphere.vue';
import loadingGif from '../assets/loading.gif';

const isMobile = computed(() => window.innerWidth <= 360);
const isTablet = computed(() => window.innerWidth > 360 && window.innerWidth <= 768);
const isDesktop = computed(() => window.innerWidth > 768);

window.addEventListener('resize', () => {
  // Обновление реактивных данных при изменении размера окна
  isMobile.value = window.innerWidth <= 360;
  isTablet.value = window.innerWidth > 360 && window.innerWidth <= 768;
  isDesktop.value = window.innerWidth > 768;
});

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

// Логика расчета размера шара
const sphereStyle = computed(() => {
  if (isLoading.value) {
    return getResponsiveSize(); // Размер при загрузке
  }

  if (hasClicked.value) {
    return getSmallSize(); // Размер при выбранном предсказании
  }

  return getResponsiveSize(); // Изначальный размер
});

// Адаптивные размеры шара
const getResponsiveSize = () => {
  const width = window.innerWidth;
  if (width >= 1440) {
    return {
      width: '574px',
      height: '574px'
    };
  }
  if (width >= 768) {
    return {
      width: '508px',
      height: '508px'
    };
  }
  return {
    width: '328px',
    height: '328px'
  };
};

// Уменьшенные размеры шара, когда предсказание выбрано
const getSmallSize = () => {
  const width = window.innerWidth;
  if (width >= 1440) {
    return {
      width: '328px',
      height: '328px'
    };
  }
  if (width >= 768) {
    return {
      width: '328px',
      height: '328px'
    };
  }
  return {
    width: '260px',
    height: '260px'
  };
};

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
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.5, 0.5, 0.8, 0.5);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
