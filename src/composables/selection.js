import { ref, computed, watch } from "vue";
import { useProxiedModel } from "@/composables/proxiedModel";
import { useVariant, genModifierClasses } from "@/composables/variant";
import { propsFactory } from "@/helpers/propsFactory.js";
import { filterInputAttrs } from "@/helpers/nodes.js";

export const genSelectionProps = propsFactory({
  disabled: Boolean,
  readonly: Boolean,
  modelValue: null,
  label: String,
  id: String,
  checkedValue: null,
});

let uid = 0;

export default function useSelection(
  props,
  { attrs, emit },
  { idPrefix = "input-selection", componentName, name } = {}
) {
  const modelValue = useProxiedModel(props, "modelValue");
  const isDisabled = computed(() => props.disabled);
  const checkedValue = computed(() =>
    props.checkedValue !== undefined ? props.checkedValue : true
  );
  const modifierClasses = computed(() => genModifierClasses(name, props));
  const isActive = computed({
    get() {
      return modelValue.value === checkedValue.value;
    },
    set(val) {
      modelValue.value = val ? checkedValue.value : false;
    },
  });
  const isFocused = ref(false);
  const computedId = computed(() => {
    return props.id || `${idPrefix}-${uid++}`;
  });
  const computedAttrs = computed(() => {
    const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);

    return {
      rootAttrs,
      inputAttrs,
    };
  });
  const { classes, assets } = useVariant(componentName, props);

  function onFocus(e) {
    isFocused.value = true;

    emit("focus", e);
  }

  function onBlur(e) {
    isFocused.value = false;

    emit("blur", e);
  }

  watch(
    () => props.modelValue,
    (value) => {
      if (value !== modelValue.value) {
        modelValue.value = value;
      }
    }
  );

  return {
    modelValue,
    computedId,
    isFocused,
    isDisabled,
    isActive,
    computedAttrs,
    onBlur,
    onFocus,
    modifierClasses,
    classes,
    assets,
  };
}
