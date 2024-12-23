<template>
  <div>
    <!-- About me -->
    <div class="container mx-auto min-h-[40vh]">
      <AboutMe :bios="aboutInformation.description" />
    </div>

    <!-- About counter -->
    <AboutCounter 
      v-if="false"
      :githubStars="aboutInformation.githubStars"
      :positiveFeedback="aboutInformation.positiveFeedback"
      :yearsExperience="aboutInformation.yearsExperience"
      :projectsCompleted="aboutInformation.projectsCompleted"
      class="min-h-[40vh]"
    />

    <!-- About counter -->
    <div class="container mx-auto">
      <AboutClients :clients="aboutInformation.brandsWorkedWith" class="min-h-[40vh]"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, computed } from "vue";
import { useStore } from "vuex";

import AboutMe from "@/components/about/AboutMe";
import AboutCounter from "@/components/about/AboutCounter";
import AboutClients from "@/components/about/AboutClients";

import { useLocale } from "@/composables/useLocale";

import feather from "feather-icons";

onMounted(() => {
  feather.replace();
});
onUpdated(() => {
  feather.replace();
});

const store = useStore();
const currentLocale = useLocale().getCurrent();
const aboutInformation = computed(() => store.state[currentLocale].aboutMe)

</script>

<style scoped></style>
