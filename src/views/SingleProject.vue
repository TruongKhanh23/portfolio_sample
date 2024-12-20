<template>
  <div class="container mx-auto mt-10 sm:mt-20">
    <!-- Project header -->
    <ProjectHeader :singleProjectHeader="data.header || {}" />

    <!-- Project gallery -->
    <ProjectGallery :projectImages="data.projectImages || []" />

    <!-- Project information -->
    <ProjectInfo :projectInfo="data.projectInfo || {}" />

    <!-- Project related projects -->
    <ProjectRelatedProjects
      v-if="otherProjects.length > 0"
      :otherProjects="otherProjects || []"
    />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, onBeforeMount, onMounted } from "vue";

import useModal from "@/composables/modal";
import { useLocale } from "@/composables/useLocale";

import feather from "feather-icons";
// Default theme
import "@splidejs/vue-splide/css";

import ProjectHeader from "@/components/projects/ProjectHeader.vue";
import ProjectGallery from "@/components/projects/ProjectGallery.vue";
import ProjectInfo from "@/components/projects/ProjectInfo.vue";
import ProjectRelatedProjects from "@/components/projects/ProjectRelatedProjects.vue";
import LoadingModal from "@/components/reusable/LoadingModal.vue";
import { getProjectById } from "../composables/projects";

const store = useStore();
const currentLocale = useLocale().getCurrent();
const projects = store.state[currentLocale]?.projects || [];

const modal = useModal();
const loadingModal = modal.create({
  name: "LoadingModal",
  content: LoadingModal,
  dismissable: true,
});

const id = new URLSearchParams(window.location.search).get("id");
if (!id) {
  console.error("Project ID is missing in the URL.");
}
const data = ref(
  projects.find((item) => item.id === id) ?? {
    header: null,
    projectImages: [],
    projectInfo: null,
  }
);

onBeforeMount(async () => {
  await loadingModal.open();
});

onMounted(async () => {
  try {
    const response = await getProjectById(id);
    const projectById = projects.find((item) => item.id === id);
    if (projectById) {
      data.value = projectById;
    } else {
      data.value = {
        header: response.header || {},
        projectImages: response.projectImages || [],
        projectInfo: response.projectInfo || {},
      };
    }
  } catch (error) {
    console.error("Failed to fetch project data:", error);
  }

  feather.replace();
  setTimeout(() => {
    loadingModal.close();
  }, 1500);
});

const otherProjects = Array.isArray(projects)
  ? projects.filter((item) => item.id !== id)
  : [];
</script>
