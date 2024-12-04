<template>
  <div>
    <LazyImage
      :src="client.file.url"
      :alt="client.title"
      customClass="w-64 py-5 px-10 border border-ternary-light dark:border-ternary-dark shadow-sm rounded-lg mb-8 cursor-pointer dark:bg-secondary-light"
    />
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
}
</script>

<style lang="scss" scoped></style>
