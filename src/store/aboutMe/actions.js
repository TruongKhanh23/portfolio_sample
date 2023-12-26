import * as types from "./constants";

export const storeAboutMe = ({ commit }, aboutMe) => {
  commit(types.STORE_ABOUT_ME, aboutMe);
};
