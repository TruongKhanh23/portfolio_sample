<template>
  <div class="flex flex-col">
    <div
      v-for="n in rows"
      :key="n"
      class="w-full h-4 bg-gray-200 animate-pulse"
      :class="{
        'rounded-t border-t border-gray-300': n === 1 && rows > 1, // Hàng đầu tiên, có border-top (nếu có nhiều hàng)
        'rounded-b border-b border-gray-300': n === rows && rows > 1, // Hàng cuối cùng, có border-bottom
        'rounded border border-gray-300': rows === 1, // Nếu chỉ một hàng, border cả 4 góc
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
  props: {
    rows: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped></style>
