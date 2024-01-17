<template>
  <Button
    :class="
      'text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300' &&
      additionalClass
    "
    :title="$t('navigator.hireMe')"
    class="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
    @click="showModal()"
    aria-label="Hire Me Button"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  additionalClass: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["action:showModal"]);
function showModal() {
  emit("action:showModal");
}
</script>
