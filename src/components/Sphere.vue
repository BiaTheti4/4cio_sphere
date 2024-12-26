<script setup>
const isAndroid = /android/i.test(navigator.userAgent);
const isWindows = /windows|win32/i.test(navigator.userAgent);
let isWebm = isAndroid || isWindows
</script>

<template>
  <div class="video-container">
    <video autoplay loop muted playsinline>
      <source v-if="isWebm" src="/3d-glassy-spheric-vortex-of-pastel-light.webm" type="video/mp4"/>
      <source v-else src="/3d-glassy-spheric-vortex-of-pastel-light.mov" type="video/mp4"/>
      Ваш браузер не поддерживает воспроизведение видео.
    </video>
  </div>
</template>

<style scoped>
.video-container{
}
</style>