<template>
  <div>
    <!-- About me -->
    <div class="container mx-auto">
      <AboutMe :bios="bios"/>
    </div>

    <!-- About counter -->
    <AboutCounter :githubStars="githubStars" :positiveFeedback="positiveFeedback" :yearsExperience="yearsExperience" :projectsCompleted="projectsCompleted"/>

    <!-- About counter -->
    <div class="container mx-auto">
      <AboutClients />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated } from "vue";
import { useStore } from "vuex";

import AboutMe from "@/components/about/AboutMe";
import AboutCounter from "@/components/about/AboutCounter";
import AboutClients from "@/components/about/AboutClients";

import { useLocale } from "@/composables/useLocale";
import { getBios } from "@/composables/aboutMe";

import feather from "feather-icons";

onMounted(() => {
  feather.replace();
});
onUpdated(() => {
  feather.replace();
});

const store = useStore();
const currentLocale = useLocale().getCurrent();

const { description, githubStars, positiveFeedback, yearsExperience, projectsCompleted } = store.state[currentLocale].aboutMe;
const bios = getBios(description);
</script>

<style scoped></style>
