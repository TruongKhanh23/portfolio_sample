<template>
  <input
    v-if="inputType === 'string'"
    class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
    :id="id"
    :name="name"
    type="text"
    :required="required"
    :placeholder="placeHolder"
    :aria-label="ariaLabel"
  />
  <textarea
    v-else-if="inputType === 'textarea'"
    class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
    :id="id"
    :name="name"
    cols="14"
    rows="6"
    :aria-label="ariaLabel"
  ></textarea>
  <select
    v-else-if="inputType === 'select'"
    class="w-full px-5 py-2 border-1 border-gray-200 dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
    :id="id"
    :name="name"
    type="text"
    :required="required"
    :aria-label="ariaLabel"
  >
    <option v-for="option in options" :key="option.id" :value="option.value">
      {{ option.name }}
    </option>
  </select>
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
  },
  options: {
    type: Array,
    default: () => [],
  },
});
</script>
