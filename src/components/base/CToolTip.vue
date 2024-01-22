<template>
  <JBox
    v-bind="$attrs"
    @mouseover="hoverControl.icon.over"
    @mouseleave="hoverControl.icon.leave"
  >
    <CIcon
      ref="iconRef"
      :icon="icon"
      class="relative z-70"
      :width="sizeString"
      :height="sizeString"
    />
  </JBox>
  <teleport to="#layer5">
    <transition
      enterFromClass="opacity-0"
      enterActiveClass="transition duration-200 ease-ease-in"
      leaveActiveClass="transition duration-200 ease-ease-out"
      leaveToClass="opacity-0"
    >
      <JBox
        v-if="shouldShowBubble"
        ref="bubbleRef"
        class="fixed top-0 left-0 z-70"
        :style="computedBubbleStyle"
        @mouseover="hoverControl.bubble.over"
        @mouseleave="hoverControl.bubble.leave"
      >
        <JBox
          class="max-w-lg p-3 bg-c0-900 text-cWhite"
          :class="bubbleCls"
          :style="bubbleStyle"
        >
          <JText v-html="bubbleTextHTML" />
        </JBox>
      </JBox>
    </transition>
  </teleport>
</template>

<script>
import { ref, reactive, computed, watch } from "vue";
/* eslint-disable */
import _values from "lodash/values";
import _debounce from "lodash/debounce";
import _isObject from "lodash/isObject";
import _cloneDeep from "lodash/cloneDeep";
export default {
  name: "CToolTip",
  props: {
    message: { type: String, default: "" },
    icon: {
      type: String,
      default: "Info",
    },
    bubbleCls: {
      type: String,
      default: "",
    },
    bubbleStyle: {
      type: String,
      default: "",
    },
    bubbleTextHTML: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "24",
    },
  },

  setup(props) {
    const gapPadding = 10;
    const windowPadding = 10;

    const iconRef = ref(null);
    const bubbleRef = ref(null);
    const iconPosition = ref({});
    const sizeString = computed(() => `${props.size}px`);

    const isHover = reactive({
      icon: false,
      bubble: false,
    });
    const hoverControl = {
      icon: {
        over: () => (isHover.icon = true),
        leave: _debounce(() => (isHover.icon = false), 50),
      },
      bubble: {
        over: () => (isHover.bubble = true),
        leave: _debounce(() => (isHover.bubble = false), 50),
      },
    };

    const shouldShowBubble = computed(() => hasAnyTrueValue(isHover));
    const computedBubbleStyle = computed(() => {
      const bubblePosition =
        bubbleRef.value?.$el?.getBoundingClientRect?.() ?? {};
      const { bottom: iB, left: iL } = iconPosition.value;
      const { right: bR } = bubblePosition;

      const isAtRight = window.innerWidth - bR <= windowPadding;
      return {
        top: `${iB - windowPadding / 2}px`,
        left: isAtRight ? null : `${iL - windowPadding}px`,
        right: isAtRight ? "0px" : null,
        "padding-top": `${gapPadding}px`,
        "margin-left": `${windowPadding}px`,
        "margin-right": `${windowPadding}px`,
      };
    });

    const hasAnyTrueValue = (obj) =>
      _isObject(obj) && Object.values(obj).some((val) => val);
    const calcIconPosition = () =>
      (iconPosition.value =
        iconRef.value?.$el?.getBoundingClientRect?.() ?? {});
    const debounceCalcIconPosition = _debounce(calcIconPosition, 10);

    watch(
      () => _cloneDeep(isHover),
      (newVal, oldVal) => {
        const isHover = hasAnyTrueValue(newVal);
        const wasHover = hasAnyTrueValue(oldVal);

        if ((isHover && wasHover) || (!isHover && !wasHover)) return;
        if (!wasHover && isHover) {
          calcIconPosition();
          addEventListener("scroll", debounceCalcIconPosition);
        }
        if (wasHover && !isHover) {
          removeEventListener("scroll", debounceCalcIconPosition);
        }
      },
      { deep: true }
    );

    return {
      iconRef,
      bubbleRef,
      isHover,
      hoverControl,
      shouldShowBubble,
      computedBubbleStyle,
      sizeString,
    };
  },
};
</script>

