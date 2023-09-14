<template>
  <div>
    <!-- Project heading and meta info -->
    <p
      class="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7"
    >
      {{ singleProjectHeader.title }}
    </p>
    
    <div class="flex flex-col">
      <div class="flex items-center mb-4">
        <i
          data-feather="tag"
          class="w-4 h-4 text-ternary-dark dark:text-ternary-light"
        ></i>
        <span
          class="font-general-medium ml-2 leading-none text-primary-dark dark:text-primary-light"
        >
          <template v-for="(item, index) in singleProjectHeader.tags" :key="index">
            <a-tag :color="colors[index]">{{ item }}</a-tag>
          </template>
        </span>
      </div>
      <div class="flex items-center mr-10">
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
  setup() {
    const colors = ["pink", "red", "orange", "green", "cyan", "blue", "purple"];
    return { colors } ;
  },
};
</script>
