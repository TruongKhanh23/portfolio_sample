<template>
  <div>
    <p v-for="(paragraph, index) in arrayRichText" :key="index">
      <span v-if="paragraph.nodeType === 'text'">
        {{ paragraph.value }}
      </span>
      <span v-if="paragraph.nodeType === 'hyperlink'">
        <a
          :href="paragraph.data.uri"
          target="_blank"
          class="text-[blue] underline"
          >{{ paragraph.data.uri }}</a
        >
      </span>
    </p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  arrayRichText: {
    type: Array,
    default: () => [],
  },
});
</script>
