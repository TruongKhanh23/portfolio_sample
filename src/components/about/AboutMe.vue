<template>
  <div class="block sm:flex sm:gap-10 mt-10 sm:mt-20">
    <!-- About profile image -->
    <div class="w-full sm:w-1/4 mb-7 sm:mb-0">
      <img src="@/assets/images/author.png" class="rounded-xl w-96" alt="" />
    </div>

    <!-- About details -->
    <div class="w-full sm:w-3/4 text-left">
      <template v-for="bio in bios" :key="bio">
        <p
          class="font-general-regular mb-4 text-ternakry-dark dark:text-ternary-light text-lg tracking-wider"
        >
          <i18n-t :keypath="bio"></i18n-t>
        </p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const bios = computed(() => [...Array(2)].map((_, i) => `about.bios[${i}]`));
</script>
