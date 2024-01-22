<template>
  <div class="c-tag-group">
    <CTag
      v-for="(option, i) in computedOptions"
      :class="[option.class]"
      :key="option.value"
      :label="option.label"
      :modelValue="option.active"
      @click="(e) => onClick(option, i)"
    />
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

import { genVariantProps } from "@/composables/variant";
import { useProxiedModel } from "@/composables/proxiedModel";

function isEqual(a, b) {
  return String(a) === String(b);
}

export default defineComponent({
  name: "CTagGroup",
  emits: ["update:modelValue", "change"],
  props: {
    ...genVariantProps(),
    options: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    modelValue: null,
  },
  setup(props) {
    const model = useProxiedModel(props, "modelValue");
    const computedOptions = computed(() => {
      return props.options.map((option, i) => {
        let active = false;

        if (props.multiple) {
          active =
            Array.isArray(model.value) && isEqual(model.value[i], option.value);
        } else {
          active = isEqual(model.value, option.value);
        }
        return {
          ...option,
          active,
        };
      });
    });

    function onClick(option, index) {
      if (props.multiple) {
        let modelValue = model.value;
        if (!modelValue) {
          modelValue = model.value = [];
        }

        if (isEqual(modelValue[index], option.value)) {
          modelValue[index] = undefined;
        } else {
          modelValue[index] = option.value;
        }
      } else {
        model.value = option.value;
      }
    }

    return {
      computedOptions,
      onClick,
    };
  },
});
</script>
