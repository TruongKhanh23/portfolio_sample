<template>
  <div>
    <!-- About me -->
    <div class="container mx-auto">
      <AboutMe />
    </div>

    <!-- About counter -->
    <AboutCounter />

    <!-- About counter -->
    <div class="container mx-auto">
      <AboutClients />
    </div>
  </div>
</template>

<script setup>
import AboutMe from '@/components/about/AboutMe'
import AboutCounter from '@/components/about/AboutCounter'
import AboutClients from '@/components/about/AboutClients'
import feather from 'feather-icons'
import { onMounted, onUpdated } from 'vue'

onMounted(() => {
  feather.replace()
})
onUpdated(() => {
  feather.replace()
})
</script>

<style scoped></style>
