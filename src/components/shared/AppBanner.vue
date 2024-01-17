<template>
  <LoadingModal :isOpen="isOpenLoadingModal" />
  <section
    v-if="appBanner"
    class="flex flex-col sm:justify-between items-center sm:flex-row mt-12 sm:mt-10"
  >
    <!-- Banner left contents -->
    <div class="w-full md:w-1/3 text-left">
      <h1
        class="font-bold text-3xl md:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
      >
        {{ appBanner.title }}
      </h1>
      <p
        class="font-general-medium mt-2 text-lg sm:text-xl xl:text-2xl text-center sm:text-left leading-none text-gray-400"
      >
        {{ appBanner.subTitle }}
      </p>
      <div class="flex justify-center sm:block">
        <div
          @click="downloadFile"
          class="flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 text-gray-500 hover:text-white duration-500"
        >
          <i
            data-feather="arrow-down-circle"
            class="ml-0 sm:ml-1 mr-2 sm:mr-3 w-5 sm:w-6 duration-100"
          ></i>
          <span class="text-sm sm:text-lg font-general-medium duration-100">
            {{ $t("home.banner.download.title") }}
          </span>
        </div>
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
import { useStore } from "vuex";
import { useLocale } from "@/composables/useLocale";
import { ref, onBeforeMount, onMounted, onUpdated, computed } from "vue";

import axios from "axios";
import feather from "feather-icons";

const isOpenLoadingModal = ref(false);

const store = useStore();
const locales = useLocale();
const currentLocale = locales.getCurrent();
const appBanner = computed(() => store.state[currentLocale].appBanner);
const cvFile = computed(() => appBanner.value.curriculumVitae.file);
const theme = ref(null);

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

async function downloadFile() {
  isOpenLoadingModal.value = true;
  document.body.style.overflow = "hidden";

  try {
    const { fileName, url: fileUrl } = cvFile.value;
    const response = await axios.get(fileUrl, { responseType: "blob" });
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading file:", error);
  }

  isOpenLoadingModal.value = false;
  document.body.style.removeProperty("overflow");
}
</script>

<style scoped></style>
