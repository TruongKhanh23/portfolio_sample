<template>
  <div class="block sm:flex sm:gap-10 mt-10 sm:mt-20">
    <!-- About profile image -->
    <div class="w-full sm:w-1/4 mb-7 sm:mb-0">
      <template v-if="!bios.content && !author">
        <SkeletonLoader :rows="16" />
      </template>
      <template v-else>
        <LazyImage :src="author" class="rounded-xl w-96" alt="" />
      </template>
    </div>

    <!-- About details -->
    <div class="w-full sm:w-3/4 text-left">
      <template v-if="!bios.content && !author">
        <SkeletonLoader :rows="16" />
      </template>
      <template v-else>
        <RichTextRenderer :content="bios" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import author from "@/assets/images/author.png";

defineProps({
  bios: {
    type: Object,
    default: () => ({}),
  },
});
</script>
