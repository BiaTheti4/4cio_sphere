<template>
  <div class="flex flex-col items-center justify-center text-center">
    <!-- Первая надпись -->
    <div class="font-bold text-nowrap" :class="textSizeClass">
      Шар предсказаний
    </div>

    <!-- Вторая надпись -->
    <div class="font-bold text-nowrap" :class="subTextSizeClass">
      Какой ваш <span class="underline decoration-wavy decoration-purple-600">новый</span> 2025 год?
    </div>

    <Sphere
        class="sphere transition-all duration-500 ease-in-out cursor-pointer"
        :style="sphereStyle"
        @click="getRandomPrediction"
    ></Sphere>

    <!-- Облако для ПК -->
    <div>
      <transition name="fade" appear>
        <div class="absolute top-[23%] -right-[82%]" v-if="!hasClicked && isDesktop">
          <svg width="330" height="68" viewBox="0 0 330 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG content -->
          </svg>
        </div>
      </transition>

      <!-- Облако для планшета и мобилки -->
      <transition name="fade" appear>
        <div
            class="absolute top-[110%] -right-[0%]"
            v-if="!hasClicked && (isMobile || isTablet)"
        >
          <svg
              :width="isMobile ? 273 : 324"
              :height="isMobile ? 52 : 66"
              viewBox="0 0 324 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <!-- SVG content -->
          </svg>
        </div>
      </transition>
    </div>

    <transition name="slide-fade">
      <div v-show="!isLoading && selectedPrediction" class="relative mt-[8px]">
        <!-- Первый блок -->
        <div
            class="absolute bg-violet-200 rounded-2xl -top-4 left-1/2 transform -translate-x-1/2 z-0"
            :class="predictionBoxClass"
        ></div>

        <!-- Второй блок -->
        <div
            class="relative bg-violet-100 rounded-2xl flex items-center justify-center text-black z-10 mb-[5%]"
            :class="predictionTextClass"
        >
          {{ selectedPrediction }}
        </div>
      </div>
    </transition>

    <button
        @click="getRandomPrediction"
        class="rounded-2xl text-white bg-violet-500 font-bold flex items-center justify-center transition-all duration-300 ease-in-out h-[56px] mx-[5%]"
        :class="buttonClass"
    >
      <div v-if="isLoading">
        <img :src="loadingGif" class="w-[24px] mr-[3px]" alt="Загрузка..." />
      </div>
      {{ isLoading ? 'Смотрю в будущее...' : hasClicked ? 'Еще раз' : 'Испытать удачу' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Sphere from './Sphere.vue';
import loadingGif from '../assets/loading.gif';

const windowWidth = ref(window.innerWidth);

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});

const isMobile = computed(() => windowWidth.value <= 550);
const isTablet = computed(() => windowWidth.value > 550 && windowWidth.value <= 768);
const isDesktop = computed(() => windowWidth.value > 768);

const textSizeClass = computed(() => {
  if (isMobile.value) return 'text-[32px]';
  if (isTablet.value) return 'text-[44px]';
  return 'text-[64px]';
});

const subTextSizeClass = computed(() => {
  if (isMobile.value) return 'text-[16px]';
  if (isTablet.value) return 'text-[18px]';
  return 'text-[28px]';
});

const predictionBoxClass = computed(() => {
  if (isMobile.value) return 'w-[90%] h-[152px]';
  if (isTablet.value) return 'w-[516px] h-[152px]';
  return 'w-[542px] h-[152px]';
});

const predictionTextClass = computed(() => {
  if (isMobile.value) return 'w-[100%] h-[152px] text-base';
  if (isTablet.value) return 'w-[548px] h-[152px] text-lg';
  return 'w-[574px] h-[168px] text-xl';
});

const buttonClass = computed(() => {
  if (isMobile.value) return 'w-[100%]';
  if (isTablet.value) return 'w-[548px]';
  return 'w-[574px]';
});

const predictions = [
  '2025 год принесёт множество возможностей для реализации ИИ-проектов.',
  'Новый год станет для вас годом инноваций и технологического развития.',
  // Add more predictions here
];

const selectedPrediction = ref('');
const isLoading = ref(false);
const hasClicked = ref(false);

const sphereStyle = computed(() => {
  if (isLoading.value) {
    return { width: '100%', height: '100%' };
  }
  if (hasClicked.value) {
    return { width: '328px', height: '328px' };
  }
  return { width: isMobile.value ? '100%' : isTablet.value ? '508px' : '574px', height: isMobile.value ? '100%' : isTablet.value ? '508px' : '574px' };
});

const getRandomPrediction = () => {
  hasClicked.value = true;
  isLoading.value = true;
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * predictions.length);
    selectedPrediction.value = predictions[randomIndex];
    isLoading.value = false;
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
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
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
