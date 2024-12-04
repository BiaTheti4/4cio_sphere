<script setup>
import Sphere from './Sphere.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="font-bold text-5xl">Шар предсказаний</div>
    <div class="text-2xl">Какой ваш новый 2025 год?</div>
    <Sphere class="size-2/6"></Sphere>
    <button class="rounded-2xl text-white bg-violet-500 h-[56px] w-[328px] font-bold">
      Испытать удачу
    </button>
  </div>
</template>

<style scoped>

</style>