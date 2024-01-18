<template>
  <JFlex class="flex-col h-12 items-center justify-center">
    <JSpinner variant="secondary" type="dots" class="mr-2" :delay="0" />
    <JText class="mt-2"> {{ message || $t("core.loading") }} </JText>
  </JFlex>
</template>

<script>
export default {
  name: "LoadingModal",
  props: {
    message: { type: String },
  },
};
</script>
<style scoped>
/* Dots spinner */

.spinner-dots-item {
  animation: bouncedelay 1.4s infinite ease-in-out both;
}

.spinner-dots-bounce1 {
  animation-delay: -0.32s;
}

.spinner-dots-bounce2 {
  animation-delay: -0.16s;
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* circle spinner */
.circle-spinner {
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
