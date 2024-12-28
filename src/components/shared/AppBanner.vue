<!-- Parent Component Update -->
<template>
  <div
    class="flex flex-col sm:flex-row gap-8 justify-start sm:justify-center items-center min-h-screen py-6"
  >
    <div class="w-full md:w-2/5 text-left space-y-4">
      <template v-if="!appBanner">
        <SkeletonLoader
          :rows="24"
          :width="'100%'"
          :height="'300px'"
          class="h-64"
        />
      </template>
      <template v-else>
        <h1
          class="font-bold text-3xl md:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
        >
          {{ appBanner.title }}
        </h1>

        <RichTextRenderer
          class="text-center sm:text-left"
          :content="appBanner.subTitle"
        />
      </template>
      <template v-if="!appBanner">
        <SkeletonLoader
          :rows="24"
          :width="'100%'"
          :height="'150px'"
          class="h-32"
        />
      </template>
      <template v-else>
        <CVButtons />
      </template>
    </div>

    <!-- Banner right illustration -->
    <div class="w-full md:w-3/5">
      <template v-if="!appBanner">
        <SkeletonLoader :rows="40" :width="'100%'" />
      </template>
      <template v-else>
        <img
          src="/img/banner.png"
          alt="Developer"
          class="block max-w-full h-auto object-cover"
          loading="lazy"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useLocale } from "@/composables/useLocale";
import CVButtons from "@/components/about/CVButtons.vue";

const store = useStore();
const locales = useLocale();
const currentLocale = locales.getCurrent();
const appBanner = computed(() => store.state[currentLocale].appBanner);
</script>
