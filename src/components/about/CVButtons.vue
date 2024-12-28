<!-- CVButtons.vue -->
<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center gap-4">
      <button
        @click="downloadFile"
        aria-label="Download CV"
        class="flex justify-center items-center w-full sm:mb-0 text-lg border dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-white focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 hover:text-white transition-colors duration-500"
      >
        <span class="text-sm sm:text-lg font-general-medium duration-100">
          {{ $t("home.banner.download.title") }}
        </span>
      </button>
      <button
        @click="viewFile"
        aria-label="View CV"
        class="flex justify-center items-center w-full p-2 sm:mb-0 text-lg border dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-white focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 hover:text-white duration-500"
      >
        <span class="text-sm sm:text-lg font-general-medium duration-100">
          {{ $t("home.banner.view.title") }}
        </span>
      </button>
    </div>
    <button
      @click="freeConsultant"
      aria-label="View CV"
      class="flex justify-center items-center w-full text-lg border dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-indigo-500 focus:ring-1 focus:ring-indigo-900 text-white duration-500"
    >
      <span class="text-sm sm:text-lg font-semibold duration-100 uppercase">
        {{ $t("home.banner.freeConsultant") }}
      </span>
    </button>
  </div>
</template>

<script setup>
import axios from "axios";
import usePdfViewerModal from "@/composables/usePdfViewerModal";
import useModal from "@/composables/modal";
import LoadingModal from "@/components/reusable/LoadingModal.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useLocale } from "@/composables/useLocale";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const locales = useLocale();
const currentLocale = locales.getCurrent();
const appBanner = computed(() => store.state[currentLocale].appBanner);
const cvFile = computed(() => appBanner.value.curriculumVitae.file);

const modal = useModal();
const pdfViewerModal = usePdfViewerModal();
const loadingModal = modal.create({
  name: "LoadingModal",
  content: LoadingModal,
  dismissable: true,
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
  } finally {
    loadingModal.close();
  }
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
}

function freeConsultant() {
  router.push("/contact");
}
</script>
