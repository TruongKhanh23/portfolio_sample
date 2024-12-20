<template>
  <div class="block sm:flex gap-0 sm:gap-10 mt-14">
    <!-- Single project left section details -->
    <div class="w-full sm:w-1/3 text-left min-h-[400px]">
      <!-- Single project client details -->
      <div class="mb-7">
        <p
          class="text-2xl text-secondary-dark dark:text-secondary-light mb-2 font-bold"
        >
          {{ $t("projects.projectInfo.aboutClient") }}
        </p>
        <RichTextRenderer class="min-h-[100px]" :content="processedCompanyInfos" />
      </div>

      <!-- Single project objectives -->
      <div class="mb-7">
        <p
          class="text-2xl text-secondary-dark dark:text-secondary-light mb-2 font-bold"
        >
          {{ $t("projects.projectInfo.objective") }}
        </p>
        <RichTextRenderer class="min-h-[100px]" :content="processedObjectivesDetails" />
      </div>

      <!-- Single project technologies -->
      <div class="mb-7">
        <p
          class="text-2xl text-secondary-dark dark:text-secondary-light mb-2 font-bold"
        >
          {{ $t("projects.projectInfo.toolTechnology") }}
        </p>
        <p class="text-primary-dark dark:text-ternary-light min-h-[20px]">
          {{ projectInfo.technologies?.join(", ") }}
        </p>
      </div>

      <!-- Single project social sharing -->
      <div v-if="socialNetwork">
        <p
          class="text-2xl text-secondary-dark dark:text-secondary-light mb-2 font-bold"
        >
          {{ $t("projects.projectInfo.sharing") }}
        </p>
        <div class="flex items-center gap-3 mt-5">
          <a
            v-for="social in socialNetwork"
            :key="social.id"
            :href="social.url"
            target="__blank"
            aria-label="Share Project"
            class="bg-ternary-light dark:bg-ternary-dark text-gray-400 hover:text-primary-dark dark:hover:text-primary-light p-2 rounded-lg shadow-sm duration-500"
          >
            <i :data-feather="social.icon" class="w-4 lg:w-5 h-4 lg:h-5"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Single project right section details -->
    <div class="w-full sm:w-2/3 text-left mt-10 sm:mt-0">
      <p
        class="text-2xl text-secondary-dark dark:text-secondary-light mb-2 font-bold"
      >
        {{ $t("projects.projectInfo.challenge") }}
      </p>
      <RichTextRenderer :content="processedProjectDetails" />
    </div>
  </div>
</template>

<script setup>
import feather from "feather-icons";
import { defineProps, onMounted, onUpdated, computed, toRefs } from "vue";

import getSocialNetworks from "@/helpers/socialNetwork";

const props = defineProps({
  projectInfo: {
    type: Object,
    default: () => ({}),
  },
});

const { projectInfo } = toRefs(props);

const socialNetwork = getSocialNetworks(projectInfo.value.socialNetwork);

// Helper to wrap content in nodeType "document"
const wrapInDocument = (content) => ({
  nodeType: "document",
  content,
});

// Process data for RichTextRenderer
const processedCompanyInfos = computed(() => {
  return wrapInDocument(projectInfo.value.companyInfos);
});

const processedObjectivesDetails = computed(() =>
  wrapInDocument(projectInfo.value.objectivesDetails)
);

const processedProjectDetails = computed(() => {
  return wrapInDocument(projectInfo.value.projectDetails);
});

onMounted(() => {
  feather.replace();
});
onUpdated(() => {
  feather.replace();
});
</script>
