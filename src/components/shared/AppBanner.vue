<template>
  <div class="mt-12 sm:mt-0 sm:mb-8 sm:min-h-screen">
    <section
      class="flex flex-col sm:justify-between justiy-center items-center sm:flex-row"
    >
      <!-- Banner left contents -->
      <div class="w-full md:w-1/3 text-left">
        <template v-if="!appBanner">
          <SkeletonLoader :rows="24" :width="'80%'" />
        </template>
        <template v-else>
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
          <div class="flex justify-center sm:block gap-2">
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
            <div
              @click="viewFile"
              class="flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 text-gray-500 hover:text-white duration-500"
            >
              <i
                data-feather="eye"
                class="ml-0 sm:ml-1 mr-2 sm:mr-3 w-5 sm:w-6 duration-100"
              ></i>
              <span class="text-sm sm:text-lg font-general-medium duration-100">
                {{ $t("home.banner.view.title") }}
              </span>
            </div>
          </div>
        </template>
      </div>

      <!-- Banner right illustration -->
      <div class="w-full md:w-2/3">
        <template v-if="!appBanner">
          <SkeletonLoader :rows="40" />
        </template>
        <template v-else>
          <img src="/img/developer.svg" alt="Developer" width="900" height="900">
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, onBeforeMount, onMounted, onUpdated, computed } from "vue";

import useModal from "@/composables/modal";
import usePdfViewerModal from "@/composables/usePdfViewerModal";
import { useLocale } from "@/composables/useLocale";

import LoadingModal from "@/components/reusable/LoadingModal.vue";

import axios from "axios";
import feather from "feather-icons";

const store = useStore();
const locales = useLocale();
const currentLocale = locales.getCurrent();
const appBanner = computed(() => store.state[currentLocale].appBanner);
const cvFile = computed(() => appBanner.value.curriculumVitae.file);
const theme = ref(null);

const pdfViewerModal = usePdfViewerModal();

const modal = useModal();
const loadingModal = modal.create({
  name: "LoadingModal",
  content: LoadingModal,
  dismissable: true,
});

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
  loadingModal.open();

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

  loadingModal.close();
}

async function viewFile() {
  loadingModal.open();

  try {
    const { url: fileUrl } = cvFile.value;
    const response = await axios.get(fileUrl, { responseType: "blob" });
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    pdfViewerModal.open({ pdfSrc: url });
  } catch (error) {
    console.error("Error downloading file:", error);
  } finally {
    loadingModal.close();
  }

  loadingModal.close();
}
</script>

<style scoped></style>
