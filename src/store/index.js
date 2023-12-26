import { createStore } from "vuex";

import createStorage from "./storage";

import state from "./state.js";
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
import aboutMe from "./aboutMe";

const dataStorage = createStorage({
  paths: ["aboutMe"],
  exclude: ["aboutMe.title"],
});

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    aboutMe,
  },
  plugins: [dataStorage],
});

export default store;
