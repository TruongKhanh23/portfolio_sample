<template>
  <div class="container mx-auto">
    <div class="min-h-[15vh] sm:min-h-[10vh]"></div>
    <!-- Project header -->
    <ProjectHeader :singleProjectHeader="data.header || {}" />

    <!-- Project gallery -->
    <ProjectGallery
      class="min-h-[350px]"
      :projectImages="data.projectImages || []"
    />

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
import { reactive, computed, onBeforeMount, onMounted } from "vue";
import useModal from "@/composables/modal";
import { useLocale } from "@/composables/useLocale";
import { useRoute } from "vue-router";

import feather from "feather-icons";
import "@splidejs/vue-splide/css";

import ProjectHeader from "@/components/projects/ProjectHeader.vue";
import ProjectGallery from "@/components/projects/ProjectGallery.vue";
import ProjectInfo from "@/components/projects/ProjectInfo.vue";
import ProjectRelatedProjects from "@/components/projects/ProjectRelatedProjects.vue";
import LoadingModal from "@/components/reusable/LoadingModal.vue";
import { getProjectById } from "../composables/projects";

const route = useRoute();
const store = useStore();
const currentLocale = useLocale().getCurrent();
const projects = computed(() => store.state[currentLocale]?.projects || []);

const modal = useModal();
const loadingModal = modal.create({
  name: "LoadingModal",
  content: LoadingModal,
  dismissable: true,
});

const id = computed(() => {
  return route.query.id;
});
if (!id.value) {
  alert("Project ID is missing in the URL.");
}

// Reactive data object
const data = reactive({
  header: null,
  projectImages: [],
  projectInfo: null,
});

onBeforeMount(async () => {
  await loadingModal.open();
});

onMounted(async () => {
  try {
    const response = await getProjectById(id.value);
    const projectById = projects.value.find((item) => item.id === id.value);
    if (projectById) {
      Object.assign(data, projectById); // Update reactive object properties
    } else if (response) {
      data.header = response.header || {};
      data.projectImages = response.projectImages || [];
      data.projectInfo = response.projectInfo || {};
    }
  } catch (error) {
    console.error("Failed to fetch project data:", error);
  } finally {
    feather.replace();
    setTimeout(() => {
      loadingModal.close();
    }, 1500);
  }
});

const otherProjects = computed(() =>
  Array.isArray(projects.value)
    ? projects.value.filter((item) => item.id !== id.value)
    : []
);
</script>
