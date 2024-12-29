<template>
  <div class="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
    <div>
      <!-- Project heading and meta info -->
      <div
        class="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mb-4 min-h-[20px]"
      >
        <template v-if="!singleProjectHeader.title">
          <SkeletonLoader :rows="3" :width="'50%'" />
        </template>
        <template v-else>
          <p>{{ singleProjectHeader.title }}</p>
        </template>
      </div>

      <div class="flex flex-col min-h-[20px] space-y-4">
        <template v-if="!singleProjectHeader.tags">
          <SkeletonLoader :rows="2" :width="'25%'" />
        </template>
        <template v-else>
          <div class="flex items-center">
            <div>
              <i
                data-feather="tag"
                class="w-4 h-4 text-ternary-dark dark:text-ternary-light"
              ></i>
            </div>

            <div
              class="flex flex-wrap gap-2 ml-2 text-primary-dark dark:text-white"
            >
              <template v-for="item in singleProjectHeader.tags" :key="item">
                <span
                  class="inline-block rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {{ item }}
                </span>
              </template>
            </div>
          </div>
        </template>

        <template v-if="!singleProjectHeader.date">
          <SkeletonLoader :rows="2" :width="'25%'" />
        </template>
        <template v-else>
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
        </template>
      </div>
    </div>
    <a
      class="text-primary-light dark:text-primary-dark bg-indigo-500 dark:bg-primary-light rounded-lg w-full sm:w-32 h-[40%] font-semibold p-3 cursor-pointer"
      :href="singleProjectHeader.demo"
      target="_blank"
    >
      DEMO
    </a>
  </div>
</template>

<script>
export default {
  props: {
    singleProjectHeader: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
