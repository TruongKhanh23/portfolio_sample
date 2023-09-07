<template>
  <div class="block sm:flex gap-0 sm:gap-10 mt-14">
    <!-- Single project left section details -->
    <div class="w-full sm:w-1/3 text-left">
      <!-- Single project client details -->
      <div class="mb-7">
        <p class="text-2xl text-secondary-dark dark:text-secondary-light mb-2">
          {{ $t("projects.projectInfo.aboutClient") }}
        </p>
        <ul class="leading-loose">
          <li
            v-for="info in projectInfo.companyInfos"
            :key="info"
            class="font-general-regular text-ternary-dark dark:text-ternary-light"
          >
            <span v-html="info"></span>
          </li>
        </ul>
      </div>

      <!-- Single project objectives -->
      <div class="mb-7">
        <p class="text-2xl text-ternary-dark dark:text-ternary-light mb-2">
          {{ $t("projects.projectInfo.objective") }}
        </p>
        <p class="text-primary-dark dark:text-ternary-light">
          {{ projectInfo.objectivesDetails }}
        </p>
      </div>

      <!-- Single project technologies -->
      <div class="mb-7">
        <p class="text-2xl text-ternary-dark dark:text-ternary-light mb-2">
          {{ $t("projects.projectInfo.toolTechnology") }}
        </p>
        <p class="text-primary-dark dark:text-ternary-light">
          {{ projectInfo.technologies[0].techs.join(", ") }}
        </p>
      </div>

      <!-- Single project social sharing -->
      <div>
        <p class="text-2xl text-ternary-dark dark:text-ternary-light mb-2">
          {{ $t("projects.projectInfo.sharing") }}
        </p>
        <div class="flex items-center gap-3 mt-5">
          <a
            v-for="social in socialSharings"
            :key="social.id"
            :href="social.url"
            target="__blank"
            aria-label="Share Project"
            class="bg-ternary-light dark:bg-ternary-dark text-gray-400 hover:text-primary-dark dark:hover:text-primary-light p-2 rounded-lg shadow-sm duration-500"
          >
            <i :data-feather="social.icon" class="w-4 lg:w-5 h-4 lg:h-5"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Single project right section details -->
    <div class="w-full sm:w-2/3 text-left mt-10 sm:mt-0">
      <p
        class="font-general-medium text-primary-dark dark:text-primary-light text-2xl font-bold mb-7"
      >
        {{ $t("projects.projectInfo.challenge") }}
      </p>
      <p
        v-for="projectDetail in projectInfo.projectDetails"
        :key="projectDetail"
        class="mb-5 text-lg text-ternary-dark dark:text-ternary-light"
      >
        {{ projectDetail }}
      </p>
    </div>
  </div>
</template>

<script setup>
import feather from "feather-icons";
import { defineProps, onMounted, onUpdated } from "vue";

const socialSharings = [
  {
    id: 1,
    name: "Twitter",
    icon: "twitter",
    url: "https://twitter.com/ChhinghorDev",
  },
  {
    id: 2,
    name: "Instagram",
    icon: "instagram",
    url: "https://www.instagram.com/seavhorrr",
  },
  {
    id: 3,
    name: "Facebook",
    icon: "facebook",
    url: "https://facebook.com/stom.sharow",
  },
  {
    id: 4,
    name: "LinkedIn",
    icon: "linkedin",
    url: "https://www.linkedin.com/in/ching-hor-bb7bb415b/",
  },
  {
    id: 5,
    name: "Youtube",
    icon: "youtube",
    url: "https://www.youtube.com/channel/UCSS-bVfkA2CWiAJJjJnUaaQ",
  },
];
defineProps({
  projectInfo: {
    type: Object,
    default: () => {},
  },
});

onMounted(() => {
  feather.replace();
});
onUpdated(() => {
  feather.replace();
});
</script>
