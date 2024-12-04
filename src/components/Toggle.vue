<template>
  <div>
    <div class="flex items-center justify-center p-2 rounded-full shadow-lg w-max mx-auto bg-violet-100 ">
      <button @click="isToggled = true" :class="buttonClass(isToggled)">
        Предсказание
      </button>
      <button @click="isToggled = false" :class="buttonClass(!isToggled)">
        Планы
      </button>
    </div>

    <div class="mt-6">
      <Prediction v-if="isToggled" />
      <Form v-else />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Prediction from "@/components/Prediction.vue";
import Form from "@/components/Form.vue";

const isToggled = ref(true);

const buttonClass = (isActive) => [
  'px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 w-64',
  isActive ? 'bg-white text-violet-400' : 'text-black'
];
</script>

<style scoped>
/* Стили для Toggle.vue */
</style>
