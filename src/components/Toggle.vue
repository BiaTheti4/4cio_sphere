<template>
  <div class="flex items-center justify-center p-2 rounded-full shadow-lg w-max mx-auto bg-violet-100 ">
    <button
        @click="isToggled = true"
        :class="[
        'px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 w-64',
        isToggled
          ? 'bg-white text-violet-500'
          : 'text-black'
      ]"
    >
      Предсказание
    </button>

    <button
        @click="isToggled = false"
        :class="[
        'px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 w-64',
        !isToggled
          ? 'bg-white text-violet-500'
          : 'text-black'
      ]"
    >
      Планы
    </button>
  </div>

  <!-- Содержимое -->
  <div class="mt-6 text-center">
    <span v-if="isToggled">
    <h2 class="text-lg font-bold text-gray-800">
      Шар предсказаний
    </h2>
      <h4>
        Какой ваш новый 2025 год?
      </h4>
    </span>
    <span v-else>
    <h2 class="text-lg font-bold text-gray-800">
     залупа
    </h2>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isToggled: true, // Состояние переключателя
    };
  },
};
</script>

<style scoped>
button {
  will-change: background-color, box-shadow;
}
</style>
