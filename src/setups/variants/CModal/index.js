import { classesFactory } from "@/composables/variant"

const MODIFIERS = {
  "rounded-lg": {
    content: "rounded-lg",
  },
}

const ELEMENT = {
  colors: {
    primary: {
      content: "bg-[#ffffff] relative",
    },
    transparent: {
      content: "relative",
    },
  },
  sizes: {
    default: {
      content: "w-full m-auto lg:max-w-5xl p-2 md:p-6 mx-3 md:mx-0",
    },
    md: {
      content: "w-full m-auto lg:max-w-3xl p-2 md:p-6 mx-3 md:mx-0",
    },
    xs: {
      content: "w-full m-auto lg:max-w-lg p-2 md:p-6",
    },
    sm: {
      content: "w-full m-auto lg:max-w-xl p-2 md:p-6",
    },
    auto: {
      content: "m-auto lg:max-w-xl p-2 md:p-6",
    },
    full: {
      content: "w-full max-w-full h-full",
    },
  },
  modifiers: MODIFIERS,
}

const classes = classesFactory("fixed z-50 flex items-center justify-center inset-0", ELEMENT)

export default {
  default: "primary",
  primary: {
    el: classes.element(["primary", "md", "rounded-lg"]),
  },
  "primary-xs": {
    el: classes.element(["primary", "xs", "rounded-lg"]),
  },
  "primary-sm": {
    el: classes.element(["primary", "sm", "rounded-lg"]),
  },
  "primary-lg": {
    el: classes.element(["primary", "lg", "rounded-lg"]),
  },
  "primary-auto": {
    el: classes.element(["primary", "auto", "rounded-lg"]),
  },
  transparent: {
    el: classes.element(["transparent", "auto", "rounded-lg"]),
  },
  full: {
    el: classes.element(["primary", "full"]),
  },
}
