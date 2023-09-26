<template>
  <div class="container mx-auto">
    <div
      class="pt-20 sm:pt-30 pb-8 mt-20 border-t-2 border-primary-light dark:border-secondary-dark"
    >
      <!-- Footer social links -->
      <div class="flex flex-col justify-center items-center mb-12 sm:mb-20">
        <p
          class="font-general-semibold text-3xl sm:text-4xl font-semibold text-primary-dark dark:text-primary-light mb-5"
        >
          {{ $t("footer.title") }}
        </p>
        <ul class="flex gap-4 sm:gap-8">
          <a
            v-for="social in socials"
            :key="social.id"
            :href="social.url"
            target="__blank"
            class="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-4 duration-500"
          >
            <i :data-feather="social.icon" class="w-5 sm:w-8 h-5 sm:h-8"></i>
          </a>
        </ul>
      </div>

      <div class="flex flex-col justify-center items-center my-4">
        <button :disabled="!isSupported" @click="clickedButton('sop')" class="max-w-[200px] mb-2 px-4 py-2.5 text-white tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg duration-500">
          {{
            isSupported ? "Dai-ichi On Share" : "Web share is not supported in your browser"
          }}
        </button>
        <button :disabled="!isSupported" @click="clickedButton('kh')" class="max-w-[200px] px-4 py-2.5 text-white tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg duration-500">
          {{
            isSupported ? "KH Share" : "Web share is not supported in your browser"
          }}
        </button>
      </div>

      <!-- Footer copyright -->
      <FooterCopyright />
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import FooterCopyright from "./FooterCopyright.vue";
import { ref, onMounted, onUpdated } from "vue";
import { isClient } from "@vueuse/shared";
import { useShare } from "@vueuse/core";

export default {
  components: { FooterCopyright },
  setup() {
    const socials = [
      {
        id: 1,
        name: "GitHub",
        icon: "github",
        url: "https://github.com/lengchhinghor",
      },
      {
        id: 2,
        name: "Twitter",
        icon: "twitter",
        url: "https://twitter.com/ChhinghorDev",
      },
      {
        id: 3,
        name: "Medium",
        icon: "book",
        url: "https://medium.com/@lengchhinghor",
      },
      {
        id: 4,
        name: "Instagram",
        icon: "instagram",
        url: "https://www.instagram.com/seavhorrr",
      },
    ];
    onMounted(() => {
      feather.replace();
    });
    onUpdated(() => {
      feather.replace();
    });

    const options = ref(null)

    const sopOptions = ref({
      title: "Dai-ichi On",
      text: "Bảo hiểm trực tuyến | Dai-ichi Life Việt Nam",
      url: isClient ? "https://e.dai-ichi-life.com.vn/product/criticalIllness/KCP104?lang=vi" : "",
    });
    const khoptions = ref({
      title: "KH Dai-ichi Connect",
      text: "Cổng thông tin khách hàng | Dai-ichi Life Việt Nam",
      url: isClient ? "https://kh.dai-ichi-life.com.vn/" : "",
    })

    function clickedButton (type) {
      options.value = type === "sop" ? sopOptions.value : khoptions.value
      startShare()
    }

    const { share, isSupported } = useShare(options);

    function startShare() {
      return share().catch((err) => err);
    }
    
    return { share, isSupported, options, socials, clickedButton };
  },
};
</script>

<style scoped></style>
