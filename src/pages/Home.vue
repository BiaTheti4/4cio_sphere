<script setup>
import Toggle from "@/components/Toggle.vue";
import Footer from "@/components/footer.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-hidden h-screen">
    <div class="flex-grow flex flex-col items-center justify-start mx-10 pt-3 ">
      <Toggle />
    </div>

    <footer class=" flex justify-center mb-2">
      <Footer />
    </footer>
  </div>
</template>

<style scoped>

</style>
