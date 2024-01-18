<template>
    <div>
      <JSpinner
        v-if="loaders.gettingPdf.loading"
        variant="secondary"
        type="dots"
        class="w-full h-screen flex items-center justify-center"
      />
  
      <VuePdfEmbed :source="pdfSrc" @loaded="handleDocumentLoaded" />
  
      <div class="fixed bottom-2 left-0 w-full text-center">
        <div
          class="inline-flex items-center justify-center rounded-full w-[58px] h-[58px] cursor-pointer bg-indigo-500"
          @click="$emit('closeModal')"
        >
          <JIcon icon="X" width="40" height="40" stroke="white" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue"
  import VuePdfEmbed from "vue-pdf-embed"
  
  import useLoading from "@/composables/loading"
  
  defineProps({
    // It can be URL or Byte Array
    pdfSrc: {
      type: [String, Array],
    },
  })
  defineEmits(["closeModal"])
  
  const { loaders, addLoader } = useLoading()
  addLoader("gettingPdf")
  
  loaders.gettingPdf.start()
  
  const handleDocumentLoaded = () => {
    loaders.gettingPdf.end()
  }
  </script>
  