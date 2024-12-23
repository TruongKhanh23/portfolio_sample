<template>
  <div class="mt-12">
    <template v-if="!projectImages[0]">
      <SkeletonLoader :rows="18" />
    </template>
    <template v-else>
      <Slider :list="projectImages" :attrs="{ perPage: 3 }">
        <template #content="{ data }">
          <template v-if="!data.url">
            <SkeletonLoader :rows="18" />
          </template>
          <template v-else>
            <LazyImage
              :src="data.url"
              customClass="rounded-xl cursor-pointer h-[350px] w-screen"
              alt="preview"
            />
          </template>
        </template>
      </Slider>
    </template>
  </div>
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
