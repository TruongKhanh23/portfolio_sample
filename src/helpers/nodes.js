export function pick(obj, paths) {
  const found = Object.create(null);
  const rest = Object.create(null);

  for (const key in obj) {
    if (
      paths.some((path) =>
        path instanceof RegExp ? path.test(key) : path === key
      )
    ) {
      found[key] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  }

  return [found, rest];
}

/**
 * Filter attributes that should be applied to
 * the root element of a an input component. Remaining
 * attributes should be passed to the <input> element inside.
 */
export function filterInputAttrs(attrs) {
  return pick(attrs, ["class", "style", "id", /^data-/]);
}
