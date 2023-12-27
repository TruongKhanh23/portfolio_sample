/* eslint-disable no-mixed-spaces-and-tabs */
import { isPlainObject } from "@/utils/assertions.js";
import merge from "deepmerge";
import { omit, get, set } from "lodash";

export default function createStorage(options) {
  options = options || {};

  const storage = window && window.localStorage;
  const key = options.key || "vuex";

  function getState(key, storage) {
    const value = storage.getItem(key);

    try {
      return typeof value === "string"
        ? JSON.parse(value)
        : typeof value === "object"
        ? value
        : undefined;
      // eslint-disable-next-line no-empty
    } catch (err) {}

    return undefined;
  }

  return function (store) {
    const savedState = getState(key, storage);

    if (isPlainObject(savedState)) {
      store.replaceState(merge(store.state, savedState));
    }

    store.subscribe(function (mutation, state) {
      const { reducer, paths } = options;
      let value = reducer
        ? reducer(state, options.paths)
        : paths.reduce((acc, path) => set(acc, path, get(state, path)), {});

      if (options.exclude) {
        value = omit(value, options.exclude);
      }
      storage.setItem(key, JSON.stringify(value));
    });
  };
}
