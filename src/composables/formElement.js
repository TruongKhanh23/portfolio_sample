import { reactive } from "vue";
import { isString } from "lodash";

import { create as createEvent } from "./event.js";
import { create as createValidation } from "./validation.js";
import { genHtmlName, genProps } from "@/helpers/elements.js";
import { merge } from "@/utils/collections.js";

function genElementAncestors(elem) {
  const path = [];

  let parent = elem.parent;

  while (parent) {
    path.unshift(parent);
    parent = parent.parent;
  }

  return path.length ? path : null;
}

export function accept(schema) {
  // eslint-disable-next-line no-extra-semi
  ["formId"].forEach((prop) => {
    if (!prop) {
      throw new Error(`${prop} is not defined`);
    }
  });

  return schema;
}

export function create(schema, parent) {
  accept(schema);

  const eventInstance = createEvent();
  const internalData = reactive({
    invalidated: false,
    shaked: false,
    data: {},
    schema,
  });

  const instance = eventInstance.extend({
    parent: parent || null,
    props: {},
    get data() {
      return internalData.data;
    },
    get shaked() {
      return internalData.shaked;
    },
    get model() {
      return internalData.schema.model || this.formId;
    },
    get validation() {
      return internalData.validation;
    },
    get error() {
      const { shaked, invalidated } = internalData;
      const {
        validation: { errors },
      } = this;

      if (!shaked || this.valid) {
        return null;
      }

      return invalidated === true
        ? null
        : isString(invalidated)
        ? invalidated
        : errors
        ? errors[0]
        : null;
    },
    get formId() {
      return internalData.schema.formId;
    },
    get htmlName() {
      return genHtmlName(this, internalData.ancestors);
    },
    get valid() {
      return this.isValid(this);
    },
    shake() {
      internalData.shaked = true;
    },
    cleanUp() {
      internalData.shaked = false;
      internalData.invalidated = false;
    },
    invalidate(message) {
      internalData.invalidated = message || true;
    },
    addProps(props, ...args) {
      return genProps(this, this.props, props, ...args);
    },
    isValid() {
      return !internalData.invalidated && this.validation.valid;
    },
    extend(target) {
      const extended = merge(Object.create(this), target);
      const { props = {}, on = {}, rules = [] } = schema;

      extended.super = this;

      Object.assign(this, {
        _d: internalData,
      });

      internalData.ancestors = genElementAncestors(extended);
      internalData.validation = createValidation(rules, extended);

      extended.addProps(props);

      Object.keys(on).map((name) => this.on(name, on[name]));

      return extended;
    },
  });

  return instance;
}

export default function useFormElement() {
  return {
    create,
  };
}
