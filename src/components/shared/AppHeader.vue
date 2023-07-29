<template>
  <nav id="nav" class="sm:container sm:mx-auto">
    <!-- Header start -->
    <div
      class="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center my-6"
    >
      <!-- Header menu links and small screen hamburger menu -->
      <div class="flex justify-between items-center px-4 sm:px-0">
        <!-- Header logos -->
        <div>
          <router-link to="/"
            ><img
              v-if="switcherTheme === 'light'"
              src="@/assets/images/logo-dark.svg"
              class="w-36"
              alt="Dark Logo"
            />
            <img
              v-else
              src="@/assets/images/logo-light.svg"
              class="w-36"
              alt="Light Logo"
            />
          </router-link>
        </div>

        <!-- Theme switcher small screen -->
        <theme-switcher
          :theme="switcherTheme"
          @themeChanged="updateTheme"
          class="block sm:hidden bg-ternary-light dark:bg-ternary-dark hover:bg-hover-light dark:hover:bg-hover-dark hover:shadow-sm px-2.5 py-2 rounded-lg"
        />

        <!-- Small screen hamburger menu -->
        <ExpandMenu :isOpen="isOpen" @action:updateIsOpen="updateIsOpen" />
      </div>

      <!-- Header links -->
      <AppHeaderLinks :showModal="showModal" :isOpen="isOpen" />

      <!-- Header right section buttons -->
      <div
        class="hidden sm:flex justify-between items-center flex-col md:flex-row"
      >
        <!-- Hire me button -->
        <div class="hidden md:block">
          <HireMeButton @action:showModal="showModal" />
        </div>

        <!-- Theme switcher large screen -->
        <theme-switcher
          :theme="switcherTheme"
          @themeChanged="updateTheme"
          class="ml-8 bg-primary-light dark:bg-ternary-dark px-3 py-2 shadow-sm rounded-xl cursor-pointer"
        />
      </div>
    </div>

    <!-- Hire me modal -->
    <HireMeModal
      :showModal="showModal"
      :modal="modal"
      :categories="categories"
      aria-modal="Hire Me Modal"
    />
  </nav>
</template>

<script setup>
import ThemeSwitcher from "../ThemeSwitcher";
import HireMeModal from "../HireMeModal.vue";
import feather from "feather-icons";
import AppHeaderLinks from "./AppHeaderLinks.vue";
import { ref, onMounted, onUpdated } from "vue";
import ExpandMenu from "@/components/shared/ExpandMenu.vue";
import HireMeButton from "@/components/reusable/HireMeButton.vue";

const isOpen = ref(false);
const modal = ref(false);
const categories = [
  {
    id: 1,
    value: "web",
    name: "Web Application",
  },
  {
    id: 2,
    value: "mobile",
    name: "Mobile Application",
  },
  {
    id: 3,
    value: "api",
    name: "API Spring boot",
  },
  {
    id: 4,
    value: "microservice",
    name: "Spring Microservice",
  },
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
  if (modal.value) {
    // Stop screen scrolling
    document
      .getElementsByTagName("html")[0]
      .classList.remove("overflow-y-hidden");
    modal.value = false;
  } else {
    document.getElementsByTagName("html")[0].classList.add("overflow-y-hidden");
    modal.value = true;
  }
}
onUpdated(() => {
  feather.replace();
});
</script>

<style scoped>
#nav a.router-link-exact-active {
  @apply text-indigo-700;
  @apply dark:text-indigo-400;
  @apply font-medium;
}
</style>
