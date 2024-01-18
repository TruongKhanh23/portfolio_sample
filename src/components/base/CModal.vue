<template>
  <transition name="zoom-out" @after-leave="afterLeave">
    <div
      v-if="!destroyed"
      ref="modal"
      v-show="isActive"
      class="c-modal"
      :class="[classes.root]"
      tabindex="-1"
    >
      <COverlay
        v-if="overlay"
        @click="dismissable && hideModal()"
        :variant="overlay"
        :class="[classes.overlay]"
      />

      <div class="c-modal__content" :class="[classes.content]">
        <slot name="header" />
        <component v-if="content" :is="content" v-bind="contentAttrs" />
        <slot v-else />
        <slot name="footer" />
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onBeforeUnmount, onMounted, watch, nextTick } from "vue";
import COverlay from "@/components/base/COverlay.vue";
import { useProxiedModel } from "@/composables/proxiedModel";
import { isPressed } from "@/helpers/keys.js";
import { pick } from "@/helpers/nodes.js";
import { useVariant, genVariantProps } from "@/composables/variant";
import { computed } from "@vue/reactivity";

export default {
  name: "CModal",
  components: {
    COverlay,
  },
  props: {
    ...genVariantProps(),
    active: Boolean,
    programmatic: Boolean,
    content: {
      type: [Object, Function],
      default: null,
    },
    overlay: {
      type: [String, Boolean],
      default: "default",
    },
    dismissable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { attrs, emit }) {
    const isActive = useProxiedModel(props, "active");
    const savedScrollTop = ref(null);
    const destroyed = ref(false);
    const modal = ref(null);
    const { classes } = useVariant("CModal", props);
    const contentAttrs = computed(() => pick(attrs, ["content"])[1]);

    watch(isActive, (value) => {
      if (value) {
        destroyed.value = false;
      }

      clip();
      nextTick(() => {
        if (value && modal.value && modal.value.focus) {
          modal.value.focus();
        }
      });
    });

    function hideModal() {
      emit("close");

      // Timeout for the animation complete before destroying
      if (props.programmatic) {
        isActive.value = false;
      }
    }

    /**
     * Transition after-leave hook
     */
    function afterLeave() {
      destroyed.value = true;
    }

    function keyPress(e) {
      if (props.dismissable && isActive.value && isPressed(e, "escape")) {
        hideModal();
      }
    }

    function clip() {
      if (isActive.value) {
        document.documentElement.classList.add("is-clipped");
      } else {
        document.documentElement.classList.remove("is-clipped");
      }
    }

    onMounted(() => {
      props.programmatic && document.body.appendChild(modal.value);

      document.addEventListener("keyup", keyPress);

      if (props.programmatic) {
        isActive.value = true;
      } else if (isActive.value) {
        clip();
      }
    });

    onBeforeUnmount(() => {
      document.removeEventListener("keyup", keyPress);
      // reset scroll
      document.documentElement.classList.remove("is-clipped");
      const scrollTop = !savedScrollTop.value
        ? document.documentElement.scrollTop
        : savedScrollTop.value;
      document.body.classList.remove("is-noscroll");
      document.documentElement.scrollTop = scrollTop;
      document.body.style.top = null;
    });

    return {
      isActive,
      savedScrollTop,
      destroyed,
      modal,
      classes,
      contentAttrs,

      afterLeave,
      hideModal,
    };
  },
};
</script>

<style lang="postcss">
.is-clipped {
  overflow: hidden !important;

  .c-modal {
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
