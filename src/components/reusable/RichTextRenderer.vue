<template>
  <div>
    <div v-for="(paragraph, index) in arrayRichText" :key="index">
      <p v-if="paragraph.nodeType === 'text'">
        {{ paragraph.value }}
      </p>
      <p v-if="paragraph.nodeType === 'hyperlink'">
        <a
          :href="paragraph.data.uri"
          target="_blank"
          class="text-[blue] underline"
          >{{ paragraph.data.uri }}</a
        >
      </p>
    </div>
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
