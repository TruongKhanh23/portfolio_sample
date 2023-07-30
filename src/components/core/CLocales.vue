<template>
  <div class="c-locales">
    <template v-for="(locale, i) in locales.list" :key="locale">
      <a
        :href="locales.getLinkToChange(locale)"
        class="px-3 text-sm font-bold uppercase"
        :class="[
          locales.getCurrent() === locale
            ? textColors.activeText
            : textColors.inActiveText,
        ]"
      >
        {{ locale }}
      </a>

      <span
        v-if="i !== locales.list.length - 1"
        class="pointer-events-none text-c0-600"
        >|</span
      >
    </template>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { useLocale } from "@/composables/useLocale";

const props = defineProps({
  footer: {
    type: Boolean,
    default: false,
  },
});
const locales = useLocale();
const textColors = ref({
  activeText: props.footer ? "text-cWhite" : "text-c1-500",
  inActiveText: props.footer ? "text-c1-200" : "text-c0-600",
});
</script>
