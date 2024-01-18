import { computed, getCurrentInstance, ref } from "vue";

export function useProxiedModel(
  props,
  prop,
  { transformIn = (v) => v, transformOut = (v) => v } = {}
) {
  const vm = getCurrentInstance();

  const isPropDefined = computed(() => {
    return (
      typeof props[prop] !== "undefined" &&
      Object.prototype.hasOwnProperty.call(vm?.vnode.props, prop)
    );
  });

  const internal = ref(props[prop]);

  return computed({
    get() {
      if (isPropDefined.value) return transformIn(props[prop]);
      return internal.value;
    },
    set(newValue) {
      internal.value = newValue;

      if (vm) {
        vm.emit(`update:${prop}`, transformOut(newValue));
      }
    },
  });
}
