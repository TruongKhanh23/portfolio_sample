<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-opacity-80 bg-[#000000]"
  >
    <div
      class="h-24 w-[700px] flex flex-col items-center justify-center rounded-lg bg-[#ffffff] mx-4 md-0"
    >
      <div class="text-xl"><LoadingOutlined /></div>
      <p class="text-lg font-bold mt-2">Đang tải...</p>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
</script>
