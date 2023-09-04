<template>
  <section
    class="flex flex-col sm:justify-between items-center sm:flex-row mt-12 sm:mt-10"
  >
    <!-- Banner left contents -->
    <div class="w-full md:w-1/3 text-left">
      <h1
        class="font-bold text-3xl md:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
      >
        {{ $t("home.banner.title") }}
      </h1>
      <p
        class="font-general-medium mt-2 text-lg sm:text-xl xl:text-2xl text-center sm:text-left leading-none text-gray-400"
      >
        {{ $t("home.banner.subTitle") }}
      </p>
      <div class="flex justify-center sm:block">
        <a
          :href="`/files/${cvFileName}`"
          :download="cvFileName"
          target="_blank"
          class="flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 text-gray-500 hover:text-white duration-500"
          aria-label="Download Resume"
        >
          <i
            data-feather="arrow-down-circle"
            class="ml-0 sm:ml-1 mr-2 sm:mr-3 w-5 sm:w-6 duration-100"
          ></i>
          <span class="text-sm sm:text-lg font-general-medium duration-100">
            {{ $t("home.banner.download.title") }}
          </span>
        </a>
      </div>
    </div>

    <!-- Banner right illustration -->
    <div class="w-full md:w-2/3 text-right float-right">
      <img
        v-if="theme === 'light'"
        src="@/assets/images/developer.svg"
        alt="Developer"
      />
      <img v-else src="@/assets/images/developer.svg" alt="Developer" />
    </div>
  </section>
</template>

<script setup>
import feather from "feather-icons";
import { ref, onBeforeMount, onMounted, onUpdated } from "vue";

const theme = ref(null);
const cvFileName = "Stoman-Resume.pdf";

// onBeforeMount = created
onBeforeMount(() => {
  theme.value = localStorage.getItem("theme") || "light";
});

onMounted(() => {
  feather.replace();
  theme.value = localStorage.getItem("theme") || "light";
});

onUpdated(() => {
  feather.replace();
});
</script>

<style scoped></style>
