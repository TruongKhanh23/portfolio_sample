<template>
  <div class="block sm:flex sm:gap-10 mt-10 sm:mt-20">
    <!-- About profile image -->
    <div class="w-full sm:w-1/4 mb-7 sm:mb-0">
      <img src="@/assets/images/author.png" class="rounded-xl w-96" alt="" />
    </div>

    <!-- About details -->
    <div class="w-full sm:w-3/4 text-left">
      <template v-for="bio in bios" :key="bio">
        <RichTextRenderer :arrayRichText="bio.content" class="font-general-regular mb-4 text-ternakry-dark dark:text-ternary-light text-lg tracking-wider"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  bios: {
    type: Array,
    default: () => []
  }
})
</script>
