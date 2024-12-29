<template>
  <div class="mt-10 sm:mt-20">
    <p
      class="font-general-medium text-2xl sm:text-3xl text-primary-dark dark:text-primary-light"
    >
      {{ $t("about.clients.title") }}
    </p>
    <div class="mt-8">
      <template v-if="!clients[0].title">
        <SkeletonLoader :rows="16" />
      </template>
      <template v-else>
        <div
          class="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-8"
        >
          <AboutClientSingle
            v-for="client in clients"
            :key="client.title"
            :client="client"
            class="sm:flex-grow-0 sm:flex-shrink-0 sm:basis-[calc(20%-1rem)] sm:max-w-[calc(20%-1rem)]"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import AboutClientSingle from "./AboutClientSingle.vue";

defineProps({
  clients: {
    type: Array,
    default: () => [],
  },
});
</script>
