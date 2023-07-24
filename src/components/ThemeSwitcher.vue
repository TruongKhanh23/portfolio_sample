<template>
  <a href="#" @click="toggleTheme" aria-label="Theme Switcher">
    <i
      v-if="theme === 'light'"
      data-feather="moon"
      class="text-liText-ternary-dark hover:text-gray-400 dark:text-liText-ternary-light dark:hover:text-liBorder-primary-light w-5"
    ></i>
    <i
      v-else
      data-feather="sun"
      class="text-gray-200 hover:text-gray-50 w-5"
    ></i>
  </a>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  theme: {
    type: String,
    required: true,
  },
});
const theme = computed(() => props.theme);

const emit = defineEmits(["themeChanged"]);
const router = useRouter();

function toggleTheme() {
  const newTheme = theme.value === "light" ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  emit("themeChanged", newTheme);
  router.go();
}
</script>
