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
          <Prediction />
        </div>
        <div v-else key="form" class="">
          <Form />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Prediction from "@/components/Prediction.vue";
import Form from "@/components/Form.vue";

const isToggled = ref(true);
const isMobile = ref(false);

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
  el.style.display = 'none'; // Скрываем элемент перед анимацией
};

const enter = (el, done) => {
  el.style.display = ''; // Убираем display: none
  el.offsetHeight; // Принудительное перерисовывание
  el.style.opacity = 0; // Начальное состояние
  el.style.transition = 'opacity 0.5s ease'; // Устанавливаем переход
  requestAnimationFrame(() => {
    el.style.opacity = 1; // Конечное состояние
    done(); // Завершаем анимацию
  });
};

const leave = (el, done) => {
  el.style.transition = 'opacity 0.5s ease'; // Устанавливаем переход
  el.style.opacity = 1; // Начальное состояние
  requestAnimationFrame(() => {
    el.style.opacity = 0; // Конечное состояние
    setTimeout(() => {
      el.style.display = 'none'; // Скрываем элемент после анимации
      done(); // Завершаем анимацию
    }, 500); // Должно совпадать с длительностью анимации
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