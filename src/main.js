import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/app.css";
import BackToTop from "vue-backtotop";

import i18n from "./setups/i18n";
import globalComponentsRegistration from "./setups/globalComponentsRegistration"

import store from "./store";
import VueSplide from "@splidejs/vue-splide";

import initializeApp from "./initialize"

const feather = require("feather-icons");
feather.replace();

const app = createApp(App)

initializeApp().then(async () => {
  const i18nInstance = i18n()
  app.use(router)
  app.use(store)
  app.use(BackToTop)
  app.use(i18nInstance)
  app.use(VueSplide)

  globalComponentsRegistration(app)

  app.mount("#app");

})
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

export { app }