<template>
  <div
    class="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark"
  >
    <p
      class="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left"
    >
      {{ $t("projects.projectInfo.otherProjects") }}
    </p>
    <Slider
      :list="otherProjects"
      :attrs="{ perPage: 4, arrows: true }"
    >
      <template #content="{ data }">
        <a
          :href="`/projects/single-project?id=${data.id}`"
          class="flex flex-col items-center justify-center text-center border shadow-lg space-y-4 rounded-lg pb-4"
        >
          <LazyImage
            :src="data.img.url"
            customClass="rounded-t-xl cursor-pointer h-[260px] w-screen"
            :alt="data.title"
          />
          <div class="px-4">
            <p class="font-general-semibold font-semibold mb-2 min-h-[48px]">
              {{ data.header.title }}
            </p>
            <span class="font-general-medium">
              {{ data.category }}
            </span>
          </div>
        </a>
      </template>
    </Slider>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  otherProjects: {
    type: Object,
    defaul: () => {},
  },
});
</script>
