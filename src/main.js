import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/app.css";
import BackToTop from "vue-backtotop";
import { makeGetComponentVariants } from "@/components/base/makeGetComponentVariants";
import VueGtag from "vue-gtag-next";

import i18n from "./setups/i18n";
import variants from "./setups/variants";
import globalComponentsRegistration from "./setups/globalComponentsRegistration";

import store from "./store";
import VueSplide from "@splidejs/vue-splide";

import initializeApp from "./initialize";
import { createMetaManager } from "vue-meta";

const feather = require("feather-icons");
feather.replace();

const app = createApp(App);

initializeApp().then(async () => {
  const i18nInstance = i18n();
  app.use(router);
  app.use(store);
  app.use(BackToTop);
  app.use(i18nInstance);
  app.use(VueSplide);
  app.use(createMetaManager());
  app.use(VueGtag, {
    property: {
      id: "G-WFBSJRSBT2", // Thay bằng ID đo lường của bạn
    },
  });

  globalComponentsRegistration(app);

  app.provide("getComponentVariants", makeGetComponentVariants({ variants }));

  app.mount("#app");
});
const appTheme = localStorage.getItem("theme");

// Check what is the active theme and change theme when user clicks on the theme button in header.
if (
  appTheme === "dark" &&
  document.querySelector("body").classList.contains("app-theme")
) {
  document.querySelector("body").classList.add("bg-primary-dark");
} else {
  document.querySelector("body").classList.add("bg-secondary-light");
}

export { app };
