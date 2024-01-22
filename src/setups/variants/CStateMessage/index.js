const types = {
  success: "text-cSuccess-500",
  info: "text-cBlack-500",
  warning: "text-cWarning",
  error: "text-cError",
};

const sizes = {
  default: "text-sm",
  sm: "text-xs",
};

export default {
  default: "_default",
  _default: {
    el: {
      icon: "mr-2",
      types,
      sizes,
    },
    assets: {
      iconWidth: "13.33",
      iconHeight: "13.33",
    },
  },
  banner: {
    el: {
      icon: "mr-3",
      ...types,
    },
    assets: {
      iconWidth: "16.67",
      iconHeight: "16.67",
    },
  },
};
