<template>
  <div v-if="aboutInformation">
    <!-- About me -->
    <div class="container mx-auto">
      <AboutMe :bios="aboutInformation.description.content" />
    </div>

    <!-- About counter -->
    <AboutCounter
      v-if="false"
      :githubStars="aboutInformation.githubStars"
      :positiveFeedback="aboutInformation.positiveFeedback"
      :yearsExperience="aboutInformation.yearsExperience"
      :projectsCompleted="aboutInformation.projectsCompleted"
    />

    <!-- About counter -->
    <div v-if="aboutInformation.brandsWorkedWith" class="container mx-auto">
      <AboutClients :clients="aboutInformation.brandsWorkedWith"/>
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
