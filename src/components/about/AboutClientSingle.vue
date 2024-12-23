<template>
  <div>
    <template v-if="!client.file.url">
      <SkeletonLoader :rows="16" :width="'50%'" />
    </template>
    <template v-else>
      <LazyImage
        :src="client.file.url"
        :alt="client.title"
        customClass="w-60 py-5 px-10 border border-ternary-light dark:border-ternary-dark shadow-lg rounded-lg mb-8 cursor-pointer dark:bg-secondary-light"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    client: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped></style>
