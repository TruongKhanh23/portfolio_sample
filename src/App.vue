<template>
  <div :class="appTheme" class="pt-0.5">
    <!-- App header -->
    <AppHeader />

    <!-- Render active component contents with vue transition -->
    <transition name="fade" mode="out-in">
      <CLayout>
        <router-view :theme="appTheme" />
      </CLayout>
    </transition>

    <!-- Scroll to top -->
    <back-to-top
      visibleoffset="500"
      right="30px"
      bottom="20px"
      class="shadow-lg"
    >
      <i data-feather="chevron-up"></i>
    </back-to-top>

    <!-- App footer -->
    <AppFooter :socials="socialNetworks || []" />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, watch, onMounted, onUpdated, computed } from "vue";

import { useLocale } from "@/composables/useLocale";
import {
  getProjects,
  convertProjectStructure,
} from "@/composables/projects/index.js";

import AppHeader from "./components/shared/AppHeader";
import AppFooter from "./components/shared/AppFooter";

import getSocialNetworks from "@/helpers/socialNetwork";
import {
  convertToLocalizeObjects,
  convertAppBannerObject,
} from "@/helpers/locale.js";

import * as contentful from "contentful";
import feather from "feather-icons";

const appTheme = localStorage.getItem("theme");
onMounted(() => {
  feather.replace();
});
onUpdated(() => {
  feather.replace();
});

const store = useStore();
const currentLocale = useLocale().getCurrent();

const aboutMe = ref(null);
const appBanner = ref(null);
const contact = ref(null);
const projects = ref({ en: null, vi: null });

const socialNetworks = computed(() => {
  if (!aboutMe.value) return [];
  const aboutInformation = convertToLocalizeObjects(aboutMe.value);
  if (!aboutInformation[currentLocale]?.aboutMe?.socialNetwork) return [];
  return getSocialNetworks(
    aboutInformation[currentLocale].aboutMe.socialNetwork
  );
});

watch(aboutMe, async () => {
  if (!aboutMe.value) return;
  const { en, vi } = convertToLocalizeObjects(aboutMe.value);
  store.dispatch("vi/storeVI", { aboutMe: vi.aboutMe });
  store.dispatch("en/storeEN", { aboutMe: en.aboutMe });
});

watch(appBanner, async () => {
  if (!appBanner.value) return;

  const { en, vi } = convertAppBannerObject(appBanner.value);

  store.dispatch("vi/storeVI", { appBanner: vi.homeBanner });
  store.dispatch("en/storeEN", { appBanner: en.homeBanner });
});

watch(contact, async () => {
  if (!contact.value) return;
  const { en, vi } = convertToLocalizeObjects(contact.value);
  store.dispatch("vi/storeVI", { contact: vi.contact });
  store.dispatch("en/storeEN", { contact: en.contact });
});

const client = contentful.createClient({
  space: window.envConfig.CONTENTFUL_SPACE_ID,
  environment: window.envConfig.ENVIRONMENT, // defaults to 'master' if not set
  accessToken: window.envConfig.CONTENTFUL_ACCESS_TOKEN,
});

client.withAllLocales
  .getEntry("6RjynuD3zNFdoYx9vBlce9")
  .then((entry) => {
    aboutMe.value = entry || null;
  })
  .catch((error) => {
    console.error("Error fetching aboutMe:", error);
    aboutMe.value = null;
  });

client.withAllLocales
  .getEntry("1LHHUKyPvPcQGE6iNZm4lP")
  .then((entry) => {
    appBanner.value = entry || null;
  })
  .catch((error) => {
    console.error("Error fetching appBanner:", error);
    appBanner.value = null;
  });

client.withAllLocales
  .getEntry("66XHlAPt38GVlchYvQAdf4")
  .then((entry) => {
    contact.value = entry || null;
  })
  .catch((error) => {
    console.error("Error fetching contact:", error);
    contact.value = null;
  });

// Get Projects
onMounted(async () => {
  try {
    const viProjects = await getProjects("vi");
    const enProjects = await getProjects("en-US");

    if (viProjects) {
      projects.value.vi = viProjects;
      store.dispatch("vi/storeVI", {
        projects: convertProjectStructure(viProjects),
      });
    }

    if (enProjects) {
      projects.value.en = enProjects;
      store.dispatch("en/storeEN", {
        projects: convertProjectStructure(enProjects),
      });
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
});
</script>

<style>
#app {
  font-family: "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "'Noto Sans'", "sans-serif",
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.vue-back-to-top {
  @apply p-2 bg-indigo-500 hover:bg-indigo-600 text-white transition
        duration-500
        ease-in-out
        transform
        hover:-translate-y-1 hover:scale-110;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
}

.fade-enter-active {
  animation: coming 0.4s;
  animation-delay: 0.2s;
  opacity: 0;
}

.fade-leave-active {
  animation: going 0.4s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-10px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
