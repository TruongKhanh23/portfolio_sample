import _isObject from "lodash/isObject";

const EN = "en-US";
const VI = "vi";

export function convertToLocalizeObjects(object) {
  const { fields, sys } = object;
  const name = sys.contentType.sys.id;
  const keys = Object.keys(fields);

  const vi = createLocaleObject(fields, keys, VI);
  const en = createLocaleObject(fields, keys, EN);

  return { vi: { [name]: vi }, en: { [name]: en } };
}

function createLocaleObject(fields, keys, locale) {
  const result = {};

  for (const key of keys) {
    const localizedKey = fields[key][locale] ?? fields[key][EN];
    result[key] = _isObject(localizedKey)
      ? handleFieldIsObject(localizedKey, locale)
      : localizedKey || fields[key];
  }

  return result;
}

function handleFieldIsObject(data, locale) {
  const fields = data.fields ?? data;
  const keys = Object.keys(fields);
  const result = {};

  for (const key of keys) {
    const localizedKey = fields[key][locale] ?? fields[key][EN];
    result[key] = _isObject(localizedKey)
      ? handleFieldIsObject(localizedKey, locale)
      : localizedKey || fields[key];
  }

  return result;
}
