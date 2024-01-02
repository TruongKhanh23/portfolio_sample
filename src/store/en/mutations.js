import { storeFrom } from "@/helpers/store";

import { STORE_EN } from "./constants";

const FIELDS = ["aboutMe", "appBanner", "contact", "projects"];

export default {
  [STORE_EN](state, en) {
    storeFrom(state, en, FIELDS);
  },
};
