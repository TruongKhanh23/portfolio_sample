import { createStore } from "vuex";

import createStorage from "./storage";

import state from "./state.js";
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
import en from "./en";
import vi from "./vi";

const dataStorage = createStorage({
  paths: ["en", "vi"],
  exclude: [],
});

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    en,
    vi,
  },
  plugins: [dataStorage],
});

export default store;
