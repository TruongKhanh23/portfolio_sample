export function propsFactory(props) {
  return (defaults) => {
    return Object.keys(props).reduce((obj, prop) => {
      const isObjectDefinition =
        typeof props[prop] === "object" &&
        props[prop] != null &&
        !Array.isArray(props[prop]);
      const definition = isObjectDefinition
        ? props[prop]
        : { type: props[prop] };

      if (defaults && prop in defaults) {
        obj[prop] = {
          ...definition,
          default: defaults[prop],
        };
      } else {
        obj[prop] = definition;
      }

      return obj;
    }, {});
  };
}
