import _isObject from "lodash/isObject";

const EN = "en-US";
const VI = "vi";
const excludeFields = ["fields", "metadata", "sys"]

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
    if(_isObject(localizedKey)) {
      if(getArrayType(localizedKey) === "strings") {
        result[key] = localizedKey
      } else {
        result[key] = handleFieldIsObject(localizedKey, locale)
      }
    } else {
      result[key] = localizedKey || fields[key]
    }
  }

  return result;
}

function handleFieldIsObject(data, locale) {
  const fields = data.fields ?? data;

  const keys = Object.keys(fields);
  const result = {};

  for (const key of keys) {
    const localizedKey = fields[key][locale] ?? fields[key][EN] ?? fields[key];
    if(_isObject(localizedKey)) {
      if(getArrayType(localizedKey) === "strings") {
        result[key] = localizedKey
      } else {
        result[key] = handleFieldIsObject(localizedKey, locale)
      }
    } else {
      result[key] = localizedKey || fields[key];
    }
  }

  return removeKeys(result);
}

function removeKeys(obj) {
  //Check if obj is not object or null, return object
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // Loop keys in object
  for (const key in obj) {
    // if key is one of these "fields", "metadata", hoặc "sys", delete that key
    if (excludeFields.includes(key)) {
      delete obj[key];
    } else {
      // if key is an object, call removeKeys again
      if (typeof obj[key] === 'object') {
        removeKeys(obj[key]);
      }
    }
  }

  return obj;
}

function getArrayType(arr) {
  if (!Array.isArray(arr)) {
    return "Not an array";
  }

  for (const element of arr) {
    if (typeof element !== 'string' && typeof element !== 'object') {
      return "mixed";
    }

    if (typeof element === 'object' && !Array.isArray(element)) {
      return "Object with nested properties";
    }
  }

  if (arr.every(element => typeof element === 'string')) {
    return "strings";
  }

  if (arr.every(element => typeof element === 'object' && !Array.isArray(element))) {
    return "objects";
  }

  return "mixed";
}