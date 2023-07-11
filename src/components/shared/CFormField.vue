<template>
  <div>
    <label
      class="block text-lg text-primary-dark dark:text-primary-light mb-2"
      for="name"
      >{{ label }}</label
    >
    <input v-if="inputType === 'string'"
      class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
      :id="id"
      :name="name"
      type="text"
      :required="required"
      :placeholder="placeHolder"
      :aria-label="ariaLabel"
    />
    <textarea v-else-if="inputType === 'textarea'"
      class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
      :id="id"
      :name="name"
      cols="14"
      rows="6"
      :aria-label="ariaLabel"
    ></textarea>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  id: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeHolder: {
    type: String,
    default: "",
  },
  ariaLabel: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "",
  }
});
</script>
