<template>
  <div class="container mx-auto mt-10 sm:mt-20">
    <!-- Project header -->
    <ProjectHeader :singleProjectHeader="data.header" />

    <!-- Project gallery -->
    <ProjectGallery :projectImages="data.projectImages" />

    <!-- Project information -->
    <ProjectInfo :projectInfo="data.projectInfo" />

    <!-- Project related projects -->
    <ProjectRelatedProjects v-if="otherProjects.length > 0" :otherProjects="otherProjects" />
  </div>
</template>

<script setup>
import { useStore } from "vuex"
import { onBeforeMount, onMounted, onUpdated } from "vue";

import useModal from "@/composables/modal"
import { useLocale } from "@/composables/useLocale";

import feather from "feather-icons";
// Default theme
import "@splidejs/vue-splide/css";

import ProjectHeader from "@/components/projects/ProjectHeader.vue";
import ProjectGallery from "@/components/projects/ProjectGallery.vue";
import ProjectInfo from "@/components/projects/ProjectInfo.vue";
import ProjectRelatedProjects from "@/components/projects/ProjectRelatedProjects.vue";
import LoadingModal from "@/components/reusable/LoadingModal.vue"

const store = useStore();
const locales = useLocale();
const currentLocale = locales.getCurrent();
const { projects } = store.state[currentLocale];

//Open popup - no scroll
const modal = useModal()
const loadingModal = modal.create({
  name: "LoadingModal",
  content: LoadingModal,
  dismissable: true,
})
onBeforeMount(async () => {
  loadingModal.open()
})

const id = new URLSearchParams(window.location.search).get("id");
const data = projects.find((item) => item.id === id);
console.log("data", data);

const otherProjects = projects.filter((item) => item.id !== id);

onMounted(() => {
  feather.replace();
  //Close popup
  setTimeout(() => {
    loadingModal.close()
  }, 1500);
});
onUpdated(() => {
  feather.replace();
});
</script>
