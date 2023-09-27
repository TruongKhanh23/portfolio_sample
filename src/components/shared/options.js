import { ref } from "vue";
import { isClient } from "@vueuse/shared";

export const options = ref({
title: "VueUse",
text: "Collection of essential Vue Composition Utilities!",
url: isClient ? location.href : "",
});
