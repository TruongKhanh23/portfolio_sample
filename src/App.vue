<template>
  <div :class="appTheme" class="pt-0.5">
    <!-- App header -->
    <AppHeader />

    <!-- Render active component contents with vue transition -->
    <transition name="fade" mode="out-in">
      <router-view :theme="appTheme" />
    </transition>

    <!-- Scroll to top -->
    <back-to-top
      visibleoffset="500"
      right="30px"
      bottom="20px"
      class="shadow-lg"
    >
      <i data-feather="chevron-up"></i>
    </back-to-top>

    <!-- App footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";

import feather from "feather-icons";
import AppHeader from "./components/shared/AppHeader";
import AppFooter from "./components/shared/AppFooter";
import { onMounted, onUpdated } from "vue";

const appTheme = localStorage.getItem("theme");
onMounted(() => {
  feather.replace();
});
onUpdated(() => {
  feather.replace();
});

import { convertAboutMeToLocalizedObjects } from "@/composables/aboutMe"

import * as contentful from "contentful";

const store = useStore();

const aboutMe = ref(null);

watch(aboutMe, async () => {
  const { en, vi } = convertAboutMeToLocalizedObjects(aboutMe.value.fields)
  store.dispatch("vi/storeVI", { aboutMe: vi});
  store.dispatch("en/storeEN", { aboutMe: en});
});

const client = contentful.createClient({
  space: "c6ogknoey4wh",
  environment: "master", // defaults to 'master' if not set
  accessToken: "XNu6t2LDvPJd43iOzlLmYXklaD85PimLxUrl72k4Hoo",
});

client.withAllLocales
  .getEntry("6RjynuD3zNFdoYx9vBlce9")
  .then((entry) => {
    aboutMe.value = entry;
  })
  .catch(console.error);
</script>

<style>
#app {
  font-family: "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial",
		"'Noto Sans'", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.vue-back-to-top {
  @apply p-2 bg-indigo-500 hover:bg-indigo-600 text-white transition
        duration-500
        ease-in-out
        transform
        hover:-translate-y-1 hover:scale-110;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
}

.fade-enter-active {
  animation: coming 0.4s;
  animation-delay: 0.2s;
  opacity: 0;
}

.fade-leave-active {
  animation: going 0.4s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-10px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
