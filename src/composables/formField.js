import { useI18n } from "vue-i18n";
import { isFunction, isString, isUndefined, toString } from "lodash";

import { isNumeric } from "@/utils/assertions.js";

import useFormElement from "./formElement.js";
import dayjs from "dayjs";

const { t } = useI18n();

const FORM_TYPE = "field";
const FIELD_TYPES = {
  FIELD_TYPE_STRING: "string",
  FIELD_TYPE_NUMBER: "number",
  FIELD_TYPE_BOOLEAN: "boolean",
  FIELD_TYPE_DATE: "date",
};
const casts = {
  string(value) {
    return value !== null ? toString(value) : null;
  },
  number(value) {
    return isNumeric(value) ? +value : null;
  },
  boolean(value) {
    return !!(value === true || value === "true");
  },
  date(value) {
    const date = new Date(value);

    return !isNaN(date.getTime()) ? date : null;
  },
};

const FORMATERS = {
  date(format, field) {
    return dayjs(field.value).format(format);
  },
};

export function format(format, type = "string") {
  const _formatter = FORMATERS[type];
  let result = null;
  const formatting = isFunction(format) ? format.call(this, this) : format;

  if (isString(formatting)) {
    result = t(formatting, this);

    if (_formatter) {
      result = _formatter(result, this);
    }
  }

  return result;
}

export function accept(schema) {
  const { type: schemaType, formId } = schema;
  const type = schemaType
    ? FIELD_TYPES[`FIELD_TYPE_${schemaType.toUpperCase()}`]
    : "string";

  if (!type) {
    throw new Error(`Invalid "type" (formId: ${formId})`);
  }

  return schema;
}

export async function setFieldtRaw(target, value) {
  await setFieldValue(target, value);
}

export async function setFieldValue(target, value) {
  const _d = target._d;
  const curRaw = _d.raw || "";

  _d.raw = !isUndefined(value) ? toString(value) : curRaw;

  const raw = _d.raw;

  await target.validate();

  if (raw !== curRaw) {
    target.emit("changed", raw, curRaw, target);
  }

  return target.value;
}

export function cast(type, value) {
  return casts[type](value);
}

export function setCheckedValue(target, checkedValue) {
  target._d.checkedValue = checkedValue;
}

export async function resetField(target) {
  target.cleanUp();

  target.validation.reset();

  await target.setRaw(target.default !== null ? target.default : "");
}

export async function clearField(target) {
  target.cleanUp();

  await target.setValue("");
}

export async function validateField(target) {
  const _d = target._d;

  target.emit("validate", target);

  await target.validation.validate(
    cast(target.type, target.raw),
    target.props,
    target
  );

  _d.formatted = _d.schema.format
    ? format.call(target, _d.schema.format, target.type)
    : null;

  target.emit("validated", target);

  return target.valid;
}

export default function useFormField() {
  const { create: createElement } = useFormElement();

  function create(schema, parent) {
    accept(schema);

    const elementInstance = createElement(schema, parent);

    const { value, default: defu } = schema;

    const hasDefault = !isUndefined(defu);

    const instance = elementInstance.extend({
      formType: FORM_TYPE,
      default: hasDefault ? defu : null,
      get type() {
        return this._d.schema.type || "string";
      },
      get formatted() {
        return this._d.formatted;
      },
      set raw(value) {
        this.setRaw(value);
      },
      get raw() {
        return this._d.raw;
      },
      get value() {
        return this.valid ? cast(this.type, this.raw) : null;
      },
      set value(value) {
        this.setValue(value);
      },
      get checked() {
        const { checkedValue } = this._d;

        if (this.type === FIELD_TYPES.FIELD_TYPE_BOOLEAN) {
          return this.value;
        }

        return (
          !isUndefined(checkedValue) && toString(this.value) === checkedValue
        );
      },
      setRaw(value) {
        return setFieldtRaw(this, value);
      },
      setValue(value) {
        return setFieldValue(this, value);
      },
      setCheckedValue(checkedValue) {
        return setCheckedValue(this, checkedValue);
      },
      async reset() {
        await resetField(this);
      },
      async clear() {
        clearField(this);
      },
      validate() {
        return validateField(this);
      },
    });

    instance.setCheckedValue(schema.checkedValue);
    instance
      .setValue(!isUndefined(value) ? value : defu)
      .then(() => instance.emit("created", instance));

    return instance;
  }

  return {
    create,
    FORM_TYPE: FORM_TYPE,
    ...FIELD_TYPES,
  };
}
