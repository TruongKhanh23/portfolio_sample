<template>
  <div>
    <!-- Project heading and meta info -->
    <div
      class="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-4 min-h-[20px]"
    >
      <p v-if="singleProjectHeader">{{ singleProjectHeader.title }}</p>
    </div>

    <div class="flex flex-col min-h-[20px] space-y-4">
      <div v-if="singleProjectHeader.tags" class="flex items-center">
        <i
          data-feather="tag"
          class="w-4 h-4 text-ternary-dark dark:text-ternary-light"
        ></i>
        <span
          class="font-general-medium ml-2 leading-none text-primary-dark dark:text-primary-light"
        >
          <template v-for="item in singleProjectHeader.tags" :key="item">
            <a-tag>{{ item }}</a-tag>
          </template>
        </span>
      </div>
      <div class="flex mr-10 min-h-[5px]">
        <div v-if="singleProjectHeader.date" class="flex justify-center">
          <i
            data-feather="clock"
            class="w-4 h-4 text-ternary-dark dark:text-ternary-light"
          ></i>
          <span
            class="font-general-medium ml-2 leading-none text-primary-dark dark:text-primary-light"
          >
            {{ singleProjectHeader.date }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tag } from "ant-design-vue";

export default {
  components: { ATag: Tag },
  props: {
    singleProjectHeader: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
