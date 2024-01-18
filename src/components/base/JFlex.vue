<template>
  <component :is="as" :class="variantCls.root" v-bind="$attrs">
    <slot />
  </component>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "JFlex",
  props: {
    variant: {
      type: String,
      default: "default",
    },

    as: {
      type: String,
      default: () => "div",
    },
  },

  computed: {
    variantCls() {
      return (
        this.getComponentVariants({
          componentName: "JFlex",
          variant: this.variant,
        })?.el ?? {}
      );
    },
  },
};
</script>
