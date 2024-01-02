import * as types from "./constants";

export const storeVI = ({ commit }, vi) => {
  commit(types.STORE_VI, vi);
};
