import { findIndex, isNumber, isUndefined } from "lodash";

import {
  addFieldOrGroup,
  clearItems,
  resetItems,
  updateValue,
  validateItems,
} from "@/helpers/elements.js";
import { isPlainObject } from "@/utils/assertions.js";

import useFormElement from "./formElement.js";
import useFormField from "./formField.js";

const FORM_TYPE = "group";
const TYPE = "enum";

function genFieldProp(fieldOrModel) {
  return `$${isPlainObject(fieldOrModel) ? fieldOrModel.model : fieldOrModel}`;
}

const elements = [useForm(), useFormField()];

export function genField(schema, parent, ...args) {
  const element = elements.find(
    (element) => element.FORM_TYPE === schema.formType
  );
  const { formId } = schema;

  if (!element) {
    throw new Error(
      `"formType" is not defined or supported (formId: ${formId})`
    );
  }

  return element.create(schema, parent, ...args);
}

async function updateGroupValue() {
  await updateValue.call(this, this.fields);
}

function accept(schema) {
  const { fields, formId } = schema;

  if (!Array.isArray(fields)) {
    throw new Error(`"fields" must be an array. (formId: ${formId})`);
  }

  return schema;
}

export async function setFormValue(target, obj) {
  if (!isPlainObject(obj)) {
    throw new Error("Invalid value, Group value must be an object");
  }

  await Promise.all(
    Object.keys(obj).map(async (model) => {
      const field = target[genFieldProp(model)];

      if (field) {
        await field.setValue(obj[model]);
      }
    })
  );

  return target.value;
}

export function shakeForm(target, { cascade = true } = {}) {
  target.super.shake();

  if (cascade) {
    target.fields.forEach((field) => field.shake());
  }
}

export function isValidForm(target) {
  return target.super.isValid() && !target.fields.some((field) => !field.valid);
}

export async function resetForm(target) {
  await resetItems.call(target, target.fields);
}

export async function clearForm(target) {
  await clearItems.call(target, target.fields);
}

export async function addField(target, schema, { at } = {}) {
  return new Promise((resolve) => {
    const field = genField(schema, target);
    const prop = genFieldProp(field);

    if (prop in target) {
      throw new Error(`Dupplicated model: ${field.model}`);
    }

    addFieldOrGroup.call(
      target,
      field,
      (...args) => target.emit("fieldchanged", ...args),
      () => updateGroupValue.call(target),
      () => resolve(field)
    );

    target[prop] = field;

    target.fields.splice(isNumber(at) ? at : target.fields.length, 0, field);
  });
}

export async function removeField(target, elementOrId) {
  const formId = isPlainObject(elementOrId) ? elementOrId.formId : elementOrId;
  const index = findIndex(target.fields, (field) => field.formId === formId);
  let removed = null;

  if (index !== -1) {
    // eslint-disable-next-line no-extra-semi
    [removed] = target.fields.splice(index, 1);

    delete target[genFieldProp(removed)];

    await updateGroupValue.call(target);

    target.emit("fieldremoved", removed, target);
  }

  return removed;
}

export function validateForm(target, options = {}) {
  return validateItems.call(target, options, target.fields);
}

export default function useForm() {
  const { create: createElement } = useFormElement();

  function create(schema, parent) {
    accept(schema);

    const elementInstance = createElement(schema, parent);

    const { value } = schema;

    const instance = elementInstance.extend({
      type: TYPE,
      formType: FORM_TYPE,
      get value() {
        return this.valid ? this._d.value : null;
      },
      setValue(obj) {
        return setFormValue(this, obj);
      },
      shake(options) {
        shakeForm(this, options);
      },
      isValid() {
        return isValidForm(this);
      },
      async reset() {
        await resetForm(this);
      },
      async clear() {
        await clearForm(this);
      },
      addField(schema, options) {
        return addField(this, schema, options);
      },
      removeField(elementOrId) {
        return removeField(this, elementOrId);
      },
      validate(options) {
        return validateForm(this, options);
      },
    });

    Object.assign(instance, {
      fields: [],
    });

    Promise.all(
      schema.fields.map(async (field) => await instance.addField(field))
    ).then(() => {
      instance
        .setValue(!isUndefined(value) ? value : {})
        .then(() => instance.emit("created", instance));
    });

    return instance;
  }

  return {
    create,
    FORM_TYPE,
    TYPE,
  };
}
