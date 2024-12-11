<script setup>
import Toggle from "@/components/Toggle.vue";
import Footer from "@/components/footer.vue";
import { computed, ref } from 'vue';

const windowWidth = ref(window.innerWidth);

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});

// Вычисляемое свойство для определения мобильного устройства
const isMobile = computed(() => windowWidth.value <= 768);
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-hidden h-screen my-12px ">
    <div class="flex-grow flex flex-col items-center justify-start">
      <Toggle class="toggle-responsive pt-[13px]" />
    </div>

    <footer v-if="!isMobile" class="flex justify-center mb-2 pt-">
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
/* Базовые стили */
.toggle-responsive {
  width: 456px; /* стандартная ширина */
}

/* Адаптивность */
@media (max-width: 550px) {
  .toggle-responsive {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
