import { classesFactory, classify } from "@/composables/variant";

const DISABLED = "bg-c0-300 border-c0-400 text-c0-400";
const INNER = "flex justify-center items-center rounded border";

const MODIFIERS = {};

const ELEMENT = {
  colors: {
    primary: {
      inner() {
        const { isActive, isDisabled } = this;

        return classify(INNER, {
          "bg-white border-indigo-500 text-indigo-500": !isActive && !isDisabled,
          "bg-indigo-500 border-indigo-500 text-cWhite": isActive,
          [DISABLED]: isDisabled,
        });
      },
    },
  },
  sizes: {
    default: {
      inner: "py-2 px-3 text-md",
    },
  },
  modifiers: MODIFIERS,
};

const ASSETS = {};

const classes = classesFactory("", ELEMENT, ASSETS);

export default {
  default: "primary",
  primary: {
    el: classes.element(["primary", "default"]),
  },
};
