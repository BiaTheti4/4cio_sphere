<template>
  <div>
    <div
        class="toggle-main"
        :class="{
        'w-[456px] h-[62px]': !isMobile,
        'w-full h-[50px]': isMobile,
      }"

    >
      <button
          @click="isToggled = true"
          :class="buttonClass(isToggled)"
          :style="{
          width: isMobile ? '50%' : '224px',
          height: isMobile ? '40px' : '54px',
          fontSize: isMobile ? '14px' : '16px',
        }"
      >
        Предсказание
      </button>

      <button
          @click="isToggled = false"
          :class="buttonClass(!isToggled)"
          :style="{
          width: isMobile ? '50%' : '224px',
          height: isMobile ? '40px' : '54px',
          fontSize: isMobile ? '14px' : '16px',
        }"
      >
        План
      </button>
    </div>

    <div class="main-block relative">
      <transition
          name="fade"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
      >
        <div v-if="isToggled" key="prediction" class="">
          <Prediction/>
        </div>
        <div v-else key="form" class="">
          <Form/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import Prediction from "@/components/Prediction.vue";
import Form from "@/components/Form.vue";

const isToggled = ref(true);
const isMobile = ref(false);


const params = new URLSearchParams(window.location.search);
isToggled.value = params.get('isForm') !== '1'


const updateResponsiveFlags = () => {
  isMobile.value = window.innerWidth <= 550;
};

onMounted(() => {
  updateResponsiveFlags();
  window.addEventListener('resize', updateResponsiveFlags);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateResponsiveFlags);
});

const buttonClass = (isActive) => [
  'px-4 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out',
  isActive ? 'bg-white text-violet-600' : 'text-black',
];

// Анимационные методы
const beforeEnter = (el) => {
  el.style.display = 'none';
};

const enter = (el, done) => {
  el.style.display = '';
  el.offsetHeight;
  el.style.opacity = 0;
  el.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    el.style.opacity = 1;
    done();
  });
};

const leave = (el, done) => {
  el.style.transition = 'opacity 0.5s ease';
  el.style.opacity = 1;
  requestAnimationFrame(() => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.display = 'none';
      done();
    }, 500);
  });
};
</script>

<style scoped>
.toggle-main {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 4px;
  margin-bottom: 32px;
  border-radius: 64px;
  margin-left: auto;
  margin-right: auto;
  background-color: #EFECFB;
}

@media screen and (min-width: 1440px) and (max-height: 900px) {
  .toggle-main {
    margin-bottom: 18px;
  }

}

@media screen and (max-width: 550px) {
  .toggle-main {
    margin-bottom: 24px;
  }
}

@media screen and (max-width: 768px) {
  .main-block {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

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

</style>