import * as actions from "./actions";
import mutations from "./mutations";
import state from "./state";
import getters from "./getters";

export * from "./constants";

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
