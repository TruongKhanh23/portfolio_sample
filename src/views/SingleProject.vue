<template>
  <LoadingModal :isOpen="isOpenLoadingModal" />
  <div class="container mx-auto mt-10 sm:mt-20">
    <!-- Project header -->
    <ProjectHeader :singleProjectHeader="data.header" />

    <!-- Project gallery -->
    <ProjectGallery :projectImages="data.projectImages" />

    <!-- Project information -->
    <ProjectInfo :projectInfo="data.projectInfo" />

    <!-- Project related projects -->
    <ProjectRelatedProjects :otherProjects="otherProjects" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from "vue";
import feather from "feather-icons";
import projects from "@/data/projects";
// Default theme
import "@splidejs/vue-splide/css";
import ProjectHeader from "@/components/projects/ProjectHeader.vue";
import ProjectGallery from "@/components/projects/ProjectGallery.vue";
import ProjectInfo from "@/components/projects/ProjectInfo.vue";
import ProjectRelatedProjects from "@/components/projects/ProjectRelatedProjects.vue";
import LoadingModal from "@/components/reusable/LoadingModal.vue";

//Open popup - no scroll
const isOpenLoadingModal = ref(true);
document.body.style.overflow = "hidden";

const id = new URLSearchParams(window.location.search).get("id");
const data = projects.find((item) => item.id === parseInt(id));
const otherProjects = projects.filter((item) => item.id !== parseInt(id));

onMounted(() => {
  feather.replace();
  //Close popup
  setTimeout(() => {
    isOpenLoadingModal.value = false;
    document.body.style.removeProperty("overflow");
  }, 1500);
});
onUpdated(() => {
  feather.replace();
});
</script>
