<script setup>
import Toggle from "@/components/Toggle.vue";
import Footer from "@/components/footer.vue";
import { computed, ref } from 'vue';

const windowWidth = ref(window.innerWidth);

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});


const isMetrics = +import.meta.env.VITE_IS_METRICS;

</script>

<template>
  <div class="flex flex-col min-h-screen overflow-hidden h-screen my-12px justify-between">
    <div class="home-container">
      <Toggle class="toggle-responsive " />
    </div>

    <footer class="main-footer">
      <Footer class="flex" />
    </footer>
  </div>
  <template v-if="isMetrics">
    <!-- Yandex.Metrika counter -->
    <component is="script">
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(99279991, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    </component>
    <noscript><div><img src="https://mc.yandex.ru/watch/99279991" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->
  </template>
</template>

<style scoped>

.main-footer{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
}
@media screen and (max-width: 550px) {
  .main-footer{
    display: none;
  }
}

.home-container{
flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.toggle-responsive{
  width: 456px;
  padding-top: 12px;
}
@media screen and (max-width: 768px) {
  .toggle-responsive{
    width: 100%;
    padding: 12px 40px;
  }
}

@media (max-width: 550px) {
  .toggle-responsive {
    width: 100%;
    margin: 0 auto;
    padding: 12px 16px;
  }
}
</style>
