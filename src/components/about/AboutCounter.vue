<template>
  <div class="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm">
    <!-- About me counters -->
    <div
      class="font-general-regular container mx-auto py-20 block sm:flex sm:justify-between sm:items-center"
    >
      <!-- Sử dụng v-for để lặp qua mảng các thông số cần đếm -->
      <div
        v-for="(counterItem, index) in counterItems"
        :key="index"
        class="mb-20 sm:mb-0"
      >
        <span
          class="font-general-medium text-4xl font-bold text-secondary-dark dark:text-secondary-light mb-2"
          >{{ counterItem.endAmount }}</span
        >
        <span class="block text-md text-ternary-dark dark:text-ternary-light">
          {{ $t(counterItem.translationKey) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"

const props = defineProps({
  githubStars: {
    type: Number,
    default: 0
  },
  positiveFeedback: {
    type: Number,
    default: 0
  },
  projectsCompleted: {
    type: Number,
    default: 0
  },
  yearsExperience: {
    type: Number,
    default: 0
  },
})
const counterItems = [
  { endAmount: props.yearsExperience, suffix: "", translationKey: "about.counter.experience" },
  { endAmount: props.githubStars, suffix: "", translationKey: "about.counter.github" },
  { endAmount: props.positiveFeedback, suffix: "%", translationKey: "about.counter.feedback" },
  { endAmount: props.projectsCompleted, suffix: "", translationKey: "about.counter.projects" },
];
</script>
