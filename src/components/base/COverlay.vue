<template>
  <JFlex class="c-overlay" :class="[classes.root]" />
</template>

<script>
import { useVariant, genVariantProps } from "@/composables/variant";

export default {
  name: "COverlay",
  props: {
    ...genVariantProps(),
  },
  setup(props) {
    const { classes } = useVariant("COverlay", props);

    return {
      classes,
    };
  },
};
</script>
