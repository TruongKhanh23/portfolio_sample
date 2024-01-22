import { classesFactory, classify } from "@/composables/variant";

const DISABLED = "bg-c0-300 border-c0-400 text-c0-400";
const INPUT =
  "flex justify-center items-center rounded-full border absolute left-0 top-0";

const MODIFIERS = {};

const ELEMENT = {
  colors: {
    primary: {
      input() {
        const { isActive, isDisabled } = this;

        return classify(INPUT, {
          "bg-[#ffffff] border-c0-800": !isActive && !isDisabled,
          "bg-[#ffffff] border-indigo-500 text-indigo-500": isActive,
          [DISABLED]: isDisabled,
        });
      },
      focus: "shadow-outline",
      label: "pl-2 pl-8",
    },
    box: {
      root() {
        const { isActive, isDisabled } = this;

        return classify({
          "bg-[#ffffff] border border-c12-600 rounded p-3":
            !isActive && !isDisabled,
          "bg-c12-400 border border-c12-500 rounded p-3": isActive,
        });
      },
      input() {
        const { isActive, isDisabled } = this;

        return classify(INPUT, {
          "bg-[#ffffff] border-c0-800": !isActive && !isDisabled,
          "bg-[#ffffff] border-indigo-500 text-indigo-500": isActive,
          [DISABLED]: isDisabled,
        });
      },
      focus: "shadow-outline",
      label: "pl-2 pl-8",
    },
  },
  sizes: {
    default: {
      input: "w-5 h-5 mt-0.5",
      nativeInput: "w-5 h-5 mt-0.5",
    },
  },
  modifiers: MODIFIERS,
};

const ASSETS = {
  sizes: {
    default: {
      iconWidth: "10",
      iconHeight: "10",
    },
  },
};

const classes = classesFactory("", ELEMENT, ASSETS);

export default {
  default: "primary",
  primary: {
    el: classes.element(["primary", "default"]),
    assets: classes.assets([null, "default"]),
  },
  box: {
    el: classes.element(["box", "default"]),
    assets: classes.assets([null, "default"]),
  },
};
