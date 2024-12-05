<template>
  <div>
    <div class="flex items-center justify-start p-1 rounded-full shadow-lg w-[456px] h-[62px] mx-auto bg-violet-100">
      <button
          @click="isToggled = true"
          :class="buttonClass(isToggled)"
          class="w-[224px] h-[54px]"
      >
        Предсказание
      </button>
      <button
          @click="isToggled = false"
          :class="buttonClass(!isToggled)"
          class="w-[224px] h-[54px]"
      >
        Планы
      </button>
    </div>

    <!-- Фиксированный блок для содержимого -->
    <div class="relative mt-6">
      <transition name="fade">
        <div v-if="isToggled" key="prediction" class="absolute w-full">
          <Prediction />
        </div>
        <div v-else key="form" class="absolute w-full">
          <Form />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Prediction from "@/components/Prediction.vue";
import Form from "@/components/Form.vue";

const isToggled = ref(true);

const buttonClass = (isActive) => [
  'px-6 py-2 rounded-full font-semibold text-sm ', // Общий стиль для кнопок
  isActive ? 'bg-white text-violet-600' : 'text-black',
  isActive ? 'translate-x-0' : 'translate-x-[2px]' // Чуть-чуть сдвигаем
];
</script>

<style scoped>
/* Анимация плавного появления/исчезновения */
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

/* Плавная смена цветов и теней для кнопок */
button {
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}
</style>














