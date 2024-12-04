<template>
  <Slider class="mt-12" :list="projectImages" :attrs="{ perPage: 3 }">
    <template #content="{ data }">
      <template v-if="!data.url">
        <SkeletonLoader :rows="18" />
      </template>
      <template v-else>
        <LazyImage
          :src="data.url"
          customClass="rounded-xl cursor-pointer h-[90vw] w-screen md:h-full md:w-auto"
          alt="preview"
        />
      </template>
    </template>
  </Slider>
</template>

<script>
export default {
  props: {
    projectImages: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
