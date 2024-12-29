<template>
  <div>
    <Button
      :class="
        'text-md font-semibold bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300' &&
        additionalClass
      "
      :title="$t('navigator.hireMe')"
      class="text-md font-semibold bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
      @click="toggleModal"
      aria-label="Hire Me Button"
    />
    <!-- Embed HireMeModal -->
    <HireMeModal
      :modal="isModalOpen"
      :categories="categories"
      @close="toggleModal"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import HireMeModal from "@/components/HireMeModal.vue";

const isModalOpen = ref(false);

const categories = [
  { id: 1, value: "web", name: "Web Application" },
  { id: 2, value: "mobile", name: "Mobile Application" },
  { id: 3, value: "api", name: "API Spring boot" },
  { id: 4, value: "microservice", name: "Spring Microservice" },
];

function toggleModal() {
  isModalOpen.value = !isModalOpen.value;
}
</script>
