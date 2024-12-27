<!-- Parent Component Update -->
<template>
  <div class="mt-12 sm:mt-0 sm:mb-8 sm:min-h-screen min-h-[500px]">
    <section
      class="flex flex-col sm:justify-between justify-center items-center sm:flex-row gap-8"
    >
      <!-- Banner left contents -->
      <div class="w-full md:w-1/3 text-left space-y-4">
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

          <RichTextRenderer :content="appBanner.subTitle" />
        </template>
        <CVButtons />
      </div>

      <!-- Banner right illustration -->
      <div class="w-full md:w-2/3">
        <template v-if="!appBanner">
          <SkeletonLoader :rows="40" :height="'300px'" />
        </template>
        <template v-else>
          <img
            src="/img/developer.svg"
            alt="Developer"
            class="block max-w-full h-auto object-cover"
            loading="lazy"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useLocale } from "@/composables/useLocale";
import CVButtons from "@/components/about/CVButtons.vue"

const store = useStore();
const locales = useLocale();
const currentLocale = locales.getCurrent();
const appBanner = computed(() => store.state[currentLocale].appBanner);
</script>
