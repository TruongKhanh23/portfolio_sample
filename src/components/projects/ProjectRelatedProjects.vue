<template>
  <div
    class="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark"
  >
    <p
      class="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left"
    >
      {{ $t("projects.projectInfo.otherProjects") }}
    </p>
    <Slider :list="otherProjects" :attrs="{ perPage: 4, arrows: otherProjects.length > 4 }">
      <template #content="{ data }">
        <LazyImage
          :src="data.img.url"
          customClass="rounded-xl cursor-pointer h-[90vw] w-screen md:h-full md:w-auto"
          :alt="data.title"
        />
      </template>
    </Slider>
  </div>
</template>

<script>
export default {
  props: {
    otherProjects: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
