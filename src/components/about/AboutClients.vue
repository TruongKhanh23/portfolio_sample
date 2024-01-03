<template>
  <div class="mt-10 sm:mt-20">
    <p
      class="font-general-medium text-2xl sm:text-3xl text-primary-dark dark:text-primary-light"
    >
      {{ $t("about.clients.title") }}
    </p>
    <div class="grid grid-cols-2 sm:grid-cols-4 mt-10 sm:mt-14 gap-2">
      <AboutClientSingle
        v-for="client in clients"
        :key="client.title"
        :client="client"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"
import AboutClientSingle from './AboutClientSingle.vue'

defineProps({
  clients: {
    type: Array,
    default: () => []
  }
})

</script>
