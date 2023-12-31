import { storeFrom } from "@/helpers/store";

import { STORE_VI } from "./constants";

const FIELDS = ["aboutMe", "appBanner", "contact", "projects"];

export default {
  [STORE_VI](state, vi) {
    storeFrom(state, vi, FIELDS);
  },
};
