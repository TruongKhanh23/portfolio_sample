import { isPlainObject } from "lodash";

export function merge(target, ...sources) {
  return sources.reduce((acc, source) => {
    const keys = Object.keys(source || []);

    keys.forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(source, key);
      const item = descriptor.value;

      if (isPlainObject(item)) {
        acc[key] = merge({}, acc[key], item);
      } else if (Array.isArray(item)) {
        acc[key] = merge([], acc[key], item);
      } else {
        Object.defineProperty(acc, key, descriptor || item);
      }
    });

    return acc;
  }, target);
}
