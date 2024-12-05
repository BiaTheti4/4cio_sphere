<script setup>
import Toggle from "@/components/Toggle.vue";
import Footer from "@/components/footer.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Основной контент -->
    <section class="flex-grow flex flex-col items-center justify-start mx-10 pt-3 space-y-12">
      <Toggle />
    </section>
    <!-- Футер -->
    <footer class="py-4 flex justify-center">
      <Footer />  <!-- Используй компонент Footer здесь -->
    </footer>
  </div>
</template>

<style scoped>
/* Можно добавить стили для дополнительного форматирования */
</style>
