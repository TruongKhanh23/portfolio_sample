<template>
  <!-- Header links -->
  <div
    :class="isOpen ? 'block' : 'hidden'"
    class="m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none"
  >
    <template v-for="link in links" :key="link.name">
      <router-link
        :to="link.link"
        class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2"
        :aria-label="link.name"
        >{{ $t(link.name) }}</router-link
      >
    </template>
    <div class="sm:hidden text-left">
      <CLocales />
    </div>
    <div
      class="border-t-2 pt-3 sm:pt-0 sm:border-t-0 border-primary-light dark:border-secondary-dark"
    >
      <HireMeButton :class="'sm:hidden block text-left mt-2'" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import HireMeButton from "@/components/reusable/HireMeButton.vue";
import CLocales from "@/components/core/CLocales.vue"

defineProps({
  showModal: {
    type: Function,
    default: () => () => {},
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const links = [
  {
    name: "navigator.projects",
    link: "/projects",
  },
  {
    name: "navigator.about",
    link: "/about",
  },
  {
    name: "navigator.contact",
    link: "/contact",
  },
];
</script>

<style lang="scss" scoped></style>
