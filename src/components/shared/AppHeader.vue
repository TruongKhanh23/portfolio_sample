<template>
  <div
    id="nav"
    class="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-primary-dark shadow-sm sm:container sm:mx-auto"
  >
    <!-- Header start -->
    <div
      class="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center py-4 px-4 sm:px-0"
    >
      <!-- Header menu links and small screen hamburger menu -->
      <div class="flex justify-between items-center">
        <!-- Theme switcher small screen -->
        <theme-switcher
          :theme="switcherTheme"
          @themeChanged="updateTheme"
          class="block sm:hidden bg-ternary-light dark:bg-ternary-dark hover:bg-hover-light dark:hover:bg-hover-dark hover:shadow-sm px-2.5 py-2 rounded-lg"
        />
        <!-- Header logos -->
        <div>
          <router-link to="/">
            <img
              :class="{ hidden: switcherTheme !== 'light' }"
              src="@/assets/images/logo-light-new.svg"
              alt="Light Logo"
              class="transition-opacity duration-300"
              width="144"
              height="36"
            />
            <img
              :class="{ hidden: switcherTheme === 'light' }"
              src="@/assets/images/logo-dark-new.svg"
              alt="Dark Logo"
              class="transition-opacity duration-300"
              width="144"
              height="36"
            />
          </router-link>
        </div>

        <!-- Small screen hamburger menu -->
        <ExpandMenu :isOpen="isOpen" @action:updateIsOpen="updateIsOpen" />
      </div>

      <!-- Header links -->
      <AppHeaderLinks
        :showModal="showModal"
        :isOpen="isOpen"
        @action:updateIsOpen="updateIsOpen"
      />

      <!-- Header right section buttons -->
      <div
        class="hidden sm:flex justify-between items-center flex-col md:flex-row"
      >
        <!-- Hire me button -->
        <div class="hidden sm:block">
          <HireMeButton @action:showModal="showModal" />
        </div>

        <!-- Theme switcher large screen -->
        <theme-switcher
          :theme="switcherTheme"
          @themeChanged="updateTheme"
          class="ml-8 bg-primary-light dark:bg-ternary-dark px-3 py-2 shadow-sm rounded-xl cursor-pointer"
        />
        <CLocales />
      </div>
    </div>

    <!-- Hire me modal -->
    <HireMeModal
      :showModal="showModal"
      :modal="modal"
      :categories="categories"
      aria-modal="Hire Me Modal"
    />
  </div>
</template>

<script setup>
import ThemeSwitcher from "../ThemeSwitcher";
import HireMeModal from "../HireMeModal.vue";
import feather from "feather-icons";
import AppHeaderLinks from "./AppHeaderLinks.vue";
import { ref, onMounted, onUpdated } from "vue";
import ExpandMenu from "@/components/shared/ExpandMenu.vue";
import HireMeButton from "@/components/reusable/HireMeButton.vue";
import CLocales from "@/components/core/CLocales.vue";

const isOpen = ref(false);
const modal = ref(false);
const categories = [
  { id: 1, value: "web", name: "Web Application" },
  { id: 2, value: "mobile", name: "Mobile Application" },
  { id: 3, value: "api", name: "API Spring boot" },
  { id: 4, value: "microservice", name: "Spring Microservice" },
];
const switcherTheme = ref(localStorage.getItem("theme") || "light");
onMounted(() => {
  feather.replace();
  switcherTheme.value = localStorage.getItem("theme") || "light";
});

const updateIsOpen = async (value) => {
  isOpen.value = value;
};
function updateTheme(theme) {
  switcherTheme.value = theme;
}
function showModal() {
  modal.value = !modal.value;
}
onUpdated(() => {
  feather.replace();
});

const preloadImages = () => {
  const images = [
    require("@/assets/images/logo-light-new.svg"),
    require("@/assets/images/logo-dark-new.svg"),
  ];
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};
onMounted(() => {
  preloadImages();
  feather.replace();
  switcherTheme.value = localStorage.getItem("theme") || "light";
});
</script>

<style scoped>
#nav a.router-link-exact-active {
  @apply text-indigo-700;
  @apply dark:text-indigo-400;
  @apply font-medium;
}

.transition-opacity {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}
</style>
