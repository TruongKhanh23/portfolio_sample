<template>
  <div>
    <div>
      <!-- Circle spinner -->
      <div>
      <!-- Dots spinner -->
        <div :class="variantCls.dots">
          <div
            class="spinner-dots-item spinner-dots-bounce1"
            :class="variantCls.dotsItem"
          ></div>
          <div
            class="spinner-dots-item spinner-dots-bounce2"
            :class="variantCls.dotsItem"
          ></div>
          <div
            class="spinner-dots-item spinner-dots-bounce3"
            :class="variantCls.dotsItem"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "default",
    },
    type: {
      required: false,
      default: "circle",
      validator(val) {
        console.log("val validator", val);
        return ["circle", "dots"].includes(val);
      },
    },
    delay: {
      type: Number,
      required: false,
      default: 400,
    },
  },

  data() {
    return {
      isVisible: true,
    };
  },

  computed: {
    variantCls() {
      return (
        this.getComponentVariants({
          componentName: "JSpinner",
          variant: this.variant,
        })?.el ?? {}
      );
    },
  },

  mounted() {
    setTimeout(() => (this.isVisible = true), this.delay);
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
