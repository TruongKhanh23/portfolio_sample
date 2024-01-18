<template>
  <component :is="as" :class="variantCls.root" v-bind="$attrs">
    <slot />
  </component>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "JText",
  props: {
    variant: {
      type: String,
      default: "default",
    },

    as: {
      type: String,
      default: () => "p",
    },
  },

  computed: {
    variantCls() {
      return (
        this.getComponentVariants({
          componentName: "JText",
          variant: this.variant,
        })?.el ?? {}
      );
    },
  },
};
</script>
