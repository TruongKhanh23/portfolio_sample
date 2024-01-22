/* eslint-disable require-atomic-updates */
import { reactive } from "vue";
import { isFunction, isString } from "lodash";
import { create as createEvent } from "./event";
import { isPlainObject } from "@/utils/assertions.js";
import { useI18n } from "vue-i18n";

export function setRuleMessage(target, message = null) {
  target.message = message;
}

export function resetRule(target) {
  target._d.error = null;
  target._d.valid = true;
}

export async function validateRule(target, value, props, ...args) {
  const { t } = useI18n();

  target.emit("validate", target);

  let error = null;
  let valid = true;
  let result = true;
  const _props = props || (target.context && target.context.props) || {};

  if (isFunction(target._d.validator)) {
    result = await target._d.validator.call(target, value, _props, ...args);

    if (result === false || isString(result)) {
      error =
        result || isFunction(target.message)
          ? target.message(...args)
          : t(target.message, target, ...args);
      valid = false;
    }
  }

  target._d.error = error;
  target._d.valid = valid;

  target.emit("validated", target);

  return target;
}

export function create(rule, container = null) {
  console.log("went here");
  const eventInstance = createEvent();
  const internalData = reactive({
    error: null,
    valid: true,
    validator: isFunction(rule)
      ? rule
      : isPlainObject(rule)
      ? rule.validator
      : null,
  });

  const instance = eventInstance.extend({
    get valid() {
      return internalData.valid;
    },
    get error() {
      return internalData.error;
    },
    name: rule?.name || Date.now() || "",
    message: isPlainObject(rule) ? rule.message : null,
    get context() {
      return this.container ? this.container.context : null;
    },
    setMessage(message) {
      setRuleMessage(this, message);
    },
    reset() {
      resetRule(this);
    },
    validate(value, props, ...args) {
      return validateRule(this, value, props, ...args);
    },
  });

  Object.assign(instance, {
    _d: internalData,
    container,
  });

  return instance;
}

export default function useRule() {
  return {
    create,
  };
}
