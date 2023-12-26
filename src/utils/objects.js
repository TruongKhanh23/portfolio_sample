export function def(obj, key, descriptor) {
  return Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    ...descriptor,
  });
}

export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
