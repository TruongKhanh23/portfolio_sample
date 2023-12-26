const _toString = Object.prototype.toString;

export function isUndefined(value) {
  return value === undefined;
}

export function isPromise(promise) {
  return (
    promise &&
    typeof promise.then === "function" &&
    _toString.call(promise) === "[object Promise]"
  );
}

export function isNumeric(value) {
  const val = String(value);

  return val.length > 0 && !isNaN(+val);
}

export function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

export function isPlainObject(value) {
  return _toString.call(value) === "[object Object]";
}
