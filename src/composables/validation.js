import { findIndex, isNumber, isPlainObject } from "lodash";
import { create as createEvent } from "./event";
import { create as createRule } from "./rule";

export function addRule(target, ruleOrSchema, { at } = {}) {
  const rule = createRule(ruleOrSchema, target);
  const name = rule.name;

  if (name in target) {
    throw new Error(`Dupplicated rule: ${name}`);
  }

  const index = isNumber(at) ? at : target.rules.length;

  target.rules.splice(index, 0, rule);

  target[name] = rule;

  return rule;
}

export function removeRule(target, remove) {
  const index = findIndex(target.rules, ({ name }) => {
    const n = isPlainObject(remove) ? remove.name : remove;

    return name === n;
  });

  const [removed] = index !== -1 ? target.rules.splice(index, 1) : [];

  delete target[removed.name];

  target.emit("add", target, removed);

  return removed;
}

export function resetValidation(target) {
  target.rules.forEach((rule) => rule.reset());
}

export async function validate(target, value, ...args) {
  target.emit("validate", target);

  if (target.rules) {
    await Promise.all(
      target.rules.map(async (rule) => await rule.validate(value, ...args))
    );
  }

  target.emit("validated", target);

  return target;
}

export function create(rules = [], context = null) {
  const eventInstance = createEvent();

  const instance = eventInstance.extend({
    get valid() {
      return !this.rules.some((rule) => !rule.valid);
    },
    get errors() {
      if (this.valid) {
        return null;
      }

      const errors = this.rules
        .map((rule) => rule.error)
        .filter((error) => error);

      return errors.length ? errors : null;
    },
    addRule(ruleOrSchema, options) {
      return addRule(this, ruleOrSchema, options);
    },
    removeRule(remove) {
      return removeRule(this, remove);
    },
    validate(value, ...args) {
      return validate(this, value, ...args);
    },
    reset() {
      resetValidation(this);
    },
  });

  Object.assign(instance, {
    rules: [],
    context,
  });

  rules.forEach((rule) => instance.addRule(rule));

  return instance;
}

export default function useValidation() {
  return {
    create,
  };
}
