<template>
  <Slider class="mt-12" :list="projectImages" :attrs="{ perPage: 3 }">
    <template #content="{ data }">
      <img :src="data.url" class="rounded-xl cursor-pointer h-[90vw] w-screen md:h-full md:w-auto" />
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
