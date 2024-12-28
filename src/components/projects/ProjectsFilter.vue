<template>
  <label :for="select" class="sr-only"></label>
  <select
    @change="$emit('filter', $event.target.value)"
    :name="select"
    :id="select"
    class="font-general-medium px-4 py-2 border-1 border-gray-200 dark:border-secondary-dark rounded-lg sm:text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
  >
    <option value class="sm:text-md">
      {{ $t("home.projectsFilter.allProjects") }}
    </option>
    <option
      v-for="option in selectOptions"
      :key="option"
      :value="option"
      class="sm:text-md"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    select: {
      type: String,
      default: "projects",
    },
    selectOptions: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped></style>
