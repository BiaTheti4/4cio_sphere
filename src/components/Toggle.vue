<template>
  <div>
    <!-- Контейнер переключателя -->
    <div
        class="flex items-center justify-start p-1 rounded-full shadow-lg mx-auto bg-violet-100"
        :class="{
        'w-[456px] h-[62px]': !isMobile,
        'w-full h-[50px]': isMobile,
      }"
    >
      <!-- Кнопка "Предсказание" -->
      <button
          @click="isToggled = true"
          :class="buttonClass(isToggled)"
          :style="{
          width: isMobile ? '50%' : '224px',
          height: isMobile ? '40px' : '54px',
          fontSize: isMobile ? '14px' : '16px',
        }"
      >
        Предсказание
      </button>

      <!-- Кнопка "Планы" -->
      <button
          @click="isToggled = false"
          :class="buttonClass(!isToggled)"
          :style="{
          width: isMobile ? '50%' : '224px',
          height: isMobile ? '40px' : '54px',
          fontSize: isMobile ? '14px' : '16px',
        }"
      >
        План
      </button>
    </div>

    <!-- Контент переключателя -->
    <div class="relative">
      <transition name="fade">
        <div v-if="isToggled" key="prediction" class="">
          <Prediction/>
        </div>
        <div v-else key="form" class="">
          <Form/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import Prediction from "@/components/Prediction.vue";
import Form from "@/components/Form.vue";

const isToggled = ref(true);

// Адаптивность
const isMobile = ref(false);

const updateResponsiveFlags = () => {
  isMobile.value = window.innerWidth <= 550;
};

onMounted(() => {
  updateResponsiveFlags();
  window.addEventListener('resize', updateResponsiveFlags);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateResponsiveFlags);
});

// Классы кнопок
const buttonClass = (isActive) => [
  'px-4 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out',
  isActive ? 'bg-white text-violet-600 shadow-md' : 'text-black',
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
  width: 100%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

button {
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}
</style>
