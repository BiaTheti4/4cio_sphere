<script setup>
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
</script>

<template>
  <div class="video-container">
    <img v-if="isSafari" src="/3d-glassy-spheric-vortex-of-pastel-light.gif" alt="Анимация"/>
    <video v-else autoplay loop muted playsinline>
      <source src="/3d-glassy-spheric-vortex-of-pastel-light.webm" type="video/webm"/>
      Ваш браузер не поддерживает воспроизведение видео.
    </video>
  </div>
</template>

<style scoped>
.video-container {
  position: relative;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>