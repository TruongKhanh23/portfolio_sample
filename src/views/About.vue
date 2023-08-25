<template>
  <div>
    <div class="container mx-auto">This is page of About</div>
    <div class="container mx-auto">
      <AboutMe />
    </div>
    <!-- About counter -->
		<AboutCounter />
  </div>
</template>
<script setup>
import AboutMe from "@/components/about/AboutMe";
import AboutCounter from '@/components/about/AboutCounter';

</script>
<style scoped></style>
