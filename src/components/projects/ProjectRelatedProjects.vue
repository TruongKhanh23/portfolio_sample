<template>
  <div
    class="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark"
  >
    <p
      class="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left"
    >
      {{ $t("projects.projectInfo.otherProjects") }}
    </p>
    <Slider :list="otherProjects" :attrs="{ perPage: 4, arrows: true }">
      <template #content="{ data }">
        <ProjectSingle
          :key="data.id"
          :project="data"
        />
      </template>
    </Slider>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ProjectSingle from "./ProjectSingle.vue";

defineProps({
  otherProjects: {
    type: Object,
    defaul: () => {},
  },
});
</script>
