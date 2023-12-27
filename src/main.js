import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/app.css";
import BackToTop from "vue-backtotop";
import i18n from "./setups/i18n";
import store from "./store";
import VueSplide from "@splidejs/vue-splide";

const feather = require("feather-icons");
feather.replace();

const i18nInstance = i18n();

createApp(App)
  .use(router)
  .use(store)
  .use(BackToTop)
  .use(i18nInstance)
  .use(VueSplide)
  .mount("#app");

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
