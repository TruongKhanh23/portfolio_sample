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
        <input
          v-if="isSupported"
          class="max-w-[300px] my-2 w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
          v-model="options.text"
          type="text"
          placeholder="Note"
        />
        <button :disabled="!isSupported" @click="startShare" class="max-w-[100px] px-4 py-2.5 text-white tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg duration-500">
          {{
            isSupported ? "Share" : "Web share is not supported in your browser"
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

    const options = ref({
      title: "VueUse",
      text: "Collection of essential Vue Composition Utilities!",
      url: isClient ? location.href : "",
    });

    const { share, isSupported } = useShare(options);

    function startShare() {
      return share().catch((err) => err);
    }
    return { startShare, share, isSupported, options, socials };
  },
};
</script>

<style scoped></style>
