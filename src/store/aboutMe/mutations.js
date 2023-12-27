import { storeFrom } from "@/helpers/store";

import { STORE_ABOUT_ME } from "./constants";

const FIELDS = [
  "title",
  "description",
  "githubStars",
  "yearsExperience",
  "positiveFeedback",
  "projectsCompleted",
];

export default {
  [STORE_ABOUT_ME](state, aboutMe) {
    storeFrom(state, aboutMe, FIELDS);
  },
};
