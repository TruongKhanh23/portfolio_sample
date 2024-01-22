<template>
  <JFlex
    v-if="active"
    class="c-state-message items-center"
    :class="[
      classes.root,
      type && classes.types[type],
      size && classes.sizes[size],
      type && `c-message--${type}`,
    ]"
  >
    <template v-if="$slots.default || text">
      <span v-if="$slots.before || computedIcon" :class="[classes.icon]">
        <slot v-if="$slots.before" name="before" />
        <CIcon
          v-else-if="computedIcon"
          :icon="computedIcon"
          :width="assets.iconWidth"
          :height="assets.iconHeight"
        />
      </span>

      <slot v-if="$slots.default" />
      <JText v-else>{{ text }}</JText>
    </template>
  </JFlex>
</template>

<script>
import { computed } from "vue";
import { useVariant } from "@/composables/variant";

const supportTypes = {
  success: "Check",
  info: "Info",
  warning: "Warning",
  error: "Error",
};

const supportSizes = {
  default: "",
  sm: "sm",
};

export default {
  name: "CStateMessage",
  props: {
    text: String,
    size: {
      type: String,
      default: "default",
      validator: (val) => !val || Object.keys(supportSizes).includes(val),
    },
    type: {
      type: String,
      validator: (val) => !val || Object.keys(supportTypes).includes(val),
    },
    icon: {
      type: [Boolean, String],
      default: null,
    },
    variant: {
      type: String,
      default: "default",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const computedIcon = computed(() => {
      if (props.icon === false) return undefined;
      if (!props.type) return props.icon;

      return props.icon || supportTypes[props.type];
    });
    const { classes, assets } = useVariant("CStateMessage", props);

    return {
      computedIcon,
      classes,
      assets,
    };
  },
};
</script>
