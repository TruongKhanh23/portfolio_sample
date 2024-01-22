import { isEqual, merge, isFunction, isString } from "lodash";
import { useI18n } from "vue-i18n";

import { isPromise } from "@/utils/assertions.js";
import { isPlainObject } from "@/utils/assertions.js";
import { def } from "@/utils/objects.js";

export function genValueFromElements(value, elements) {
  const length = elements.length;

  for (let i = 0; i < length; i++) {
    const element = elements[i];

    if (!element.valid) {
      return null;
    }

    value[isPlainObject(value) ? element.model : element.index] = element.value;
  }

  return value;
}

export async function updateValue(elements) {
  const { _d, type } = this;
  const curValue = this.value && merge({}, this.value);

  _d.tempValue = genValueFromElements(type === "enum" ? {} : [], elements);

  await this.validate({ cascade: false });

  if (!isEqual(this.value, curValue)) {
    this.emit("changed", this.value, curValue, this);
  }
}

export function addFieldOrGroup(item, changedHandler, validatedHandler, done) {
  item
    .on("changed:formy", (...args) => changedHandler.apply(this, args), {
      noOff: true,
    })
    .on("validated:formy", () => validatedHandler.call(this), { noOff: true });

  const tempEventName = `validated:__${this.htmlName}`;

  this.on(tempEventName, () => {
    this.emit(`${this.formType}added`, item).off(tempEventName);

    done();
  });
}

export async function resetItems(items = []) {
  this.cleanUp();

  this.validation.reset();

  await Promise.all(items.map(async (item) => await item.reset()));
}

export async function clearItems(items = []) {
  this.cleanUp();

  await Promise.all(items.map(async (item) => await item.clear()));
}

export async function validateItems({ cascade = true } = {}, items) {
  this.emit("validate", this);

  const _d = this._d;
  const value = _d.tempValue || this.value;

  if (cascade) {
    await Promise.all(items.map(async (group) => await group.validate()));
  }

  await this.validation.validate(value, this.props, this);

  _d.value = this.valid ? value : null;
  _d.tempValue = null;

  this.emit("validated", this);

  return this.valid;
}

export function genHtmlName(Element, ancestors) {
  const keysPath = ancestors
    ? ancestors.reduce(
        (acc, fe) =>
          "index" in fe ? [...acc, "" + fe.index] : [...acc, fe.formId],
        []
      )
    : [];
  const [root, ...rest] = [
    ...keysPath,
    "index" in Element ? "" + Element.index : Element.formId,
  ];
  const htmlName = rest ? `${root}[${rest.join("][")}]` : root;

  return Element.type === "set" ? `${htmlName}[]` : htmlName;
}

export function genProps(element, source, properties, ...args) {
const { t } = useI18n();

  for (const key in properties) {
    const prop = properties[key];
    const newSource = isPlainObject(prop)
      ? {}
      : Array.isArray(prop)
      ? []
      : null;

    if (newSource) {
      source[key] = genProps(element, newSource, prop, ...args);
    } else if (isFunction(prop)) {
      element._d.asyncProps = element._d.asyncProps || {
        values: {},
        asigned: {},
      };

      def(source, key, {
        get: () => {
          const asyncProps = element._d.asyncProps;
          const asyncValue = asyncProps.values[key];
          let result;

          if (asyncValue && !asyncProps.asigned[key]) {
            result = asyncValue;

            delete asyncProps.asigned[key];
          } else {
            result = prop.call(element, element, ...args);
          }

          if (isPromise(result)) {
            result.then((value) => {
              // Trigger Vue re-render
              asyncProps.values[key] = value;
              asyncProps.asigned[key] = false;
            });
          }

          return result;
        },
      });
    } else {
      source[key] = isString(prop) ? t(prop, element, ...args) : prop;
    }
  }

  return source;
}

const PROXY_KEYS = {
  PLAIN: "__f_plain",
};

export const proxyMap = new WeakMap();

export function toPlain(proxied) {
  const raw = proxied && proxied[PROXY_KEYS.PLAIN];

  return raw ? toPlain(raw) : proxied;
}

export function proxify(obj) {
  const proxy = new Proxy(obj, {
    get(target, key, receiver) {
      if (key === PROXY_KEYS.PLAIN && proxyMap.get(target)) {
        return target;
      }

      const res = Reflect.get(target, key, receiver);

      if (isFunction(res)) {
        return (...args) => {
          return res.call(target, receiver, ...args);
        };
      }

      return res;
    },
  });

  proxyMap.set(obj, proxy);

  return proxy;
}
