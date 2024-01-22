<template>
  <div>{{ propsGroup ?? "acb" }}</div>
  <JFlex
    v-if="group"
    class="c-form-group"
    :id="`form-${group.formId}`"
    :class="[
      group.props.class,
      group.props.layout && `l-${group.props.layout}`,
      modifier && `c-form-group--${modifier}`,
      ,
    ]"
  >
    <h4
      v-if="group.props.heading"
      class="w-full mb-6 text-lg font-semibold c-form-group__heading"
    >
      {{ group.props.heading }}
    </h4>

    <slot>
      <template v-for="field in group.fields" :key="field.formId">
        <slot
          v-if="$slots[field.htmlName]"
          :name="field.htmlName"
          :field="field"
          :modifier="field.formId"
        />
        <CFormGroup
          v-else-if="field.formType === 'group'"
          :group="field"
          :modifier="field.formId"
          @touched="onTouched"
        />
        <CFormField
          v-else-if="!isHiddenField(field)"
          :field="field"
          :modifier="field.formId"
          :status="field?.props.status"
          :message="field?.props.message"
        />
      </template>
    </slot>
  </JFlex>
</template>

<script>
import { onBeforeUnmount, computed } from "vue";
import { useI18n } from "vue-i18n";
import { onBeforeRouteLeave } from "vue-router";

import CFormField from "./CFormField.vue";

function isHiddenField(field) {
  return field.props.inputType === "hidden";
}

export default {
  name: "CFormGroup",
  emits: ["changed", "touched"],
  components: { CFormField },
  props: {
    modifier: String,
    group: {
      type: Object,
      require: true,
    },
    alertOnUnSaved: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    let isTouched = false;

    const propsGroup = computed(() => {
      console.log("props.group", props.group);
      return props.group
    })

    function onUnload(event) {
      event.preventDefault();
      event.returnValue = ""; // Chrome requires returnValue to be set to something
    }

    function onTouched() {
      if (!isTouched) {
        isTouched = true;

        if (props.alertOnUnSaved) {
          window.addEventListener("beforeunload", onUnload);
        }

        emit("touched");
      }
    }

    props.group
      .on("changed", (...args) => emit("changed", ...args))
      .on("fieldchanged", onTouched);

    onBeforeUnmount(() => {
      if (props.alertOnUnSaved) {
        window.removeEventListener("beforeunload", onUnload);
      }
    });

    if (props.alertOnUnSaved) {
      onBeforeRouteLeave((to, from, next) => {
        if (isTouched && !props.group.valid) {
          const result = window.confirm(t("unSavedMessage"));

          if (result) {
            isTouched = false;

            next();
          }
        } else {
          next();
        }
      });
    }

    return {
      isHiddenField,
      onTouched,
      propsGroup,
    };
  },
};
</script>
