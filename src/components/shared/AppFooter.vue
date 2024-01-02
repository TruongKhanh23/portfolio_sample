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

      <button
        @click="handleShare()"
        class="max-w-[200px] px-4 py-2.5 text-white tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg duration-500"
      >
        {{ "KH Share" }}
      </button>

      <!-- Footer copyright -->
      <FooterCopyright />
    </div>
  </div>
</template>

<script setup>
import feather from "feather-icons";
import FooterCopyright from "./FooterCopyright.vue";
import { onMounted, onUpdated } from "vue";
import { useShare } from "@vueuse/core";

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

const { share } = useShare();

const handleShare = async () => {
  share({
    title: "Bảo hiểm Ichi An Tâm",
    url: "https://daiichi-life-uat.quote.hk/product/MicroInsurance/MPF101?referralInfo=pmm%2Bd2kdoaLoVAeL69gQcD0BW7%2FADCog2FBtvOctbgQ%2BdEtEFlqjVtWFkdh7r0gmZCuW1u0KbYmgMRijiogqQWeMqa6ZdAiW7gMvF9%2F8T%2FRjn3FJ1vspYMVQ%2BLMIIzw9",
  });
};
</script>

<style scoped></style>
