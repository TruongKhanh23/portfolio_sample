<template>
  <div
    class="c-form-field"
    :class="[
      internalField.props.class,
      modifier && `c-form-field--${modifier}`,
      computedStatus && `c-form-field--${computedStatus}`,
    ]"
  >
    <JBox class="mb-1 inline-block w-full">
      <JFlex>
        <label
          v-if="internalField.props.label"
          :labelFor="computedId"
          class="font-medium"
        >
          {{ internalField.props.label }}
        </label>
        <CToolTip
          v-if="internalField.props?.helpText"
          :bubbleTextHTML="internalField.props?.helpText"
          class="ml-2"
        />
      </JFlex>
      <div v-if="internalField.props?.description">
        <JText variant="label-sm">{{ internalField.props?.description }}</JText>
      </div>
    </JBox>

    <div class="c-form-field__input mb-1">
      <slot v-if="$slots.default" />
      <CTagGroup
        class="w-full"
        v-else-if="internalField.props.inputType === 'tag-group'"
        :class="[internalField.props.inputClass]"
        :options="internalField.props.options"
        v-model="internalField.raw"
        v-bind="getInputProps(internalField.props)"
      />
      <div
        v-else-if="internalField.props.inputType === 'select'"
        class="c-select-field"
        :class="[internalField.props.inputClass]"
      >
        <JSelect
          v-bind="getInputProps(internalField.props)"
          :id="id"
          v-model="internalField.raw"
          :options="
            Array.isArray(internalField.props.options)
              ? internalField.props.options
              : []
          "
          :allowSelectNothing="false"
        />
      </div>
      <div
        v-else-if="internalField.props.inputType === 'textarea'"
        class="c-textarea-field"
        :class="[internalField.props.inputClass]"
      >
        <JInputLongText
          v-bind="getInputProps(internalField.props)"
          :id="id"
          v-model="internalField.raw"
          :rows="internalField.props.rows"
        />
      </div>
      <div
        v-else
        class="c-text-field"
        :class="[internalField.props.inputClass]"
      >
        <JInputText
          v-bind="getInputProps(internalField.props)"
          :id="id"
          v-model="internalField.raw"
        />
      </div>
    </div>

    <CStateMessage :type="computedStatus" style="min-height: 16px">
      <slot name="message" v-if="$slots.message" />
      <template v-else-if="computedMessage">
        {{ computedMessage }}
      </template>
    </CStateMessage>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useI18n } from "vue-i18n";
import { omit } from "lodash";
import { pick } from "@/helpers/nodes.js";

const { t } = useI18n();
function getValidationMessage(field) {
  console.log("went here");
  if (isInvalidatedField(field)) {
    // handle error from invalidate()
    if (field.error && field.validation.valid) {
      return field.error;
    }

    const rules = field.validation.rules;

    for (let i = 0, length = rules.length; i < length; i++) {
      const rule = rules[i];

      if (!rule.valid) {
        let data = {};
        data = field.props;
        return rule.error || t(`validation.${rule.name}`, data);
      }
    }
  }

  return "";
}

function isInvalidatedField(field) {
  return field.shaked && !field.valid;
}

function getInputProps(props, omits = []) {
  const [, inputProps] = pick(props, [
    "class",
    "style",
    "id",
    "label",
    "inputType",
  ]);

  return omits.length ? omit(inputProps, omits) : inputProps;
}

const STATUSES = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};
let _uid = 0;

export default {
  name: "CFormField",
  props: {
    field: {
      type: Object,
      require: true,
    },
    status: {
      type: String,
      validator: (val) => Object.keys(STATUSES).includes(val),
    },
    message: String,
    idPrefix: {
      type: String,
      default: "field-",
    },
    id: String,
    modifier: String,
  },
  setup(props) {
    const { t } = useI18n();
    const internalField = computed(() => props.field);
    const computedId = computed(
      () =>
        props.id ||
        internalField.value.props.id ||
        `${props.idPrefix}-${_uid++}`
    );
    const computedMessage = computed(
      () => props.message || getValidationMessage(internalField.value, t)
    );
    const computedStatus = computed(
      () =>
        props.status ||
        (isInvalidatedField(internalField.value) ? STATUSES.error : "")
    );

    return {
      computedId,
      computedStatus,
      computedMessage,
      internalField,
      getInputProps,
    };
  },
};
</script>
<style>
.c-form-field--error {
  .c-date-field,
  .c-text-field {
    input {
      @apply border-2 border-[red];
    }
  }
  .c-select-field {
    select {
      @apply border-2 border-[red];
    }
  }
}
</style>
