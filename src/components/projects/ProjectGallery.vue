<template>
  <Slider class="mt-12" :list="projectImages" :attrs="{ perPage: 3 }">
    <template #content="{ data }">
      <img :src="data" class="rounded-xl cursor-pointer" />
    </template>
  </Slider>
</template>

<script>
import Slider from "@/components/reusable/Slider.vue";

export default {
  components: {
    Slider,
  },
  props: {
    projectImages: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
