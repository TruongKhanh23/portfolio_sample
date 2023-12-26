import { isNullOrUndefined, isPlainObject } from "@/utils/assertions.js";
import { hasOwn } from "@/utils/objects.js";

export function storeFrom(state, data, list) {
  list.forEach((path) => {
    const [name, ...rest] = path.split(".");
    const value = data[name];

    if (isPlainObject(value)) {
      state[name] = state[name] || {};

      // recursive here to cleanup empty values like null, undefined
      storeFrom(state[name], value, rest.length ? rest : Object.keys(value));
    } else if (!isNullOrUndefined(value)) {
      state[name] = value;

      // if value is null, delete current key from store
    } else if (value === null && hasOwn(state, name)) {
      delete state[name];
    }
  });
}
