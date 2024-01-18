import { computed, getCurrentInstance, inject } from "vue";
import { isFunction, isString } from "lodash";
import { isPlainObject } from "@/utils/assertions.js";
import { def } from "@/utils/objects.js"
import { propsFactory } from "@/helpers/propsFactory.js";

export const genVariantProps = propsFactory({
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  modifier: String,
});

export function propertize(app, source, properties, ...args) {
  for (const key in properties) {
    const prop = properties[key];
    const newSource = isPlainObject(prop)
      ? {}
      : Array.isArray(prop)
      ? []
      : null;

    if (newSource) {
      source[key] = propertize(app, newSource, prop, ...args);
    } else if (isFunction(prop)) {
      def(source, key, {
        get: () =>
          prop.call(app.setupState, app.props, app.setupContext, ...args),
      });
    } else {
      source[key] = prop;
    }
  }

  return source;
}

export function useVariant(name, props, variants) {
  const app = getCurrentInstance();
  const getComponentVariants = inject("getComponentVariants");
  const componentVariants = computed(() => {
    return (
      getComponentVariants({
        componentName: name,
        // TODO: distinct to color, size, modifiter
        variant: props.variant,
        variantsDefinition: variants,
      }) || {}
    );
  });

  const classes = computed(() =>
    propertize(app, {}, componentVariants.value.el || {})
  );
  const assets = computed(() =>
    propertize(app, {}, componentVariants.value.assets || {})
  );

  return {
    classes,
    assets,
  };
}

function combine(obj, ...targets) {
  targets.forEach((target) => {
    if (target) {
      Object.keys(target).forEach((key) => {
        const value = obj[key];
        // [string, function]
        const arr = [
          ...(Array.isArray(value) ? value : [value]),
          target[key],
        ].filter((item) => item);
        const hasStringOnly = !arr.some((item) => !isString(item));

        obj[key] = hasStringOnly ? arr.join(" ") : arr;
      });
    }
  });

  return obj;
}

export function classesFactory(base, element, assets) {
  return {
    element([color, size, ...mods], override = {}) {
      const sizes = override.sizes || element.sizes || {};
      const colors = override.colors || element.colors || {};
      const modifiers = override.modifiers || element.modifiers || {};
      const combined = combine(
        {
          root: base,
        },
        colors[color],
        sizes[size],
        ...mods.map((mod) => modifiers[mod])
      );

      return combined;
    },
    assets([color, size, ...mods], override = {}) {
      const sizes = override.sizes || assets.sizes || {};
      const colors = override.colors || assets.colors || {};
      const modifiers = override.modifiers || assets.modifiers || {};
      const combined = combine(
        {
          root: base,
        },
        colors[color],
        sizes[size],
        ...mods.map((mod) => modifiers[mod])
      );

      return combined;
    },
  };
}

export function classify(...args) {
  const arr = args.reduce((acc, item) => {
    if (isString(item)) {
      acc.push(item);
    } else if (isPlainObject(item)) {
      Object.keys(item).forEach((classes) => {
        const value = item[classes];

        if (value === true) {
          acc.push(classes);
        }
      });
    }

    return acc;
  }, []);

  return arr.join(" ");
}

export function genModifierClasses(name, props) {
  return ["variant", "size", "modifier"].map(
    (type) => name && props[type] && `c-${name}--${props[type]}`
  );
}
