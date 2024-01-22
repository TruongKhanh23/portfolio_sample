export default {
  default: "primary",
  primary: {
    description: "You can describe what it is",
    el: {
      root: "bg-cWhite text-c0-900 rounded-lg leading-tight border border-c0-300 px-5 appearance-none w-full h-10 placeholder-c0-500 focus:outline-none focus:border-c1-500",
    },
  },
  "primary-lg": {
    el: {
      root: "bg-cWhite shadow text-c0-900 text-lg rounded-lg leading-tight border border-c0-300 px-5 appearance-none w-full h-12 placeholder-c0-500 focus:outline-none focus:border-c1-500",
    },
  },
  warning: {
    el: {
      root: "bg-cWhite text-c0-900 rounded-lg leading-tight border border-c0-300 px-5 appearance-none w-full h-10 placeholder-c0-500 focus:outline-none focus:border-cWarning-500",
    },
  },
  disabled: {
    el: {
      root: "bg-c0-100 text-c0-300 rounded-lg leading-tight border border-c0-400 px-5 appearance-none w-full h-10 placeholder-c0-300 focus:outline-none focus:border-c0-400",
    },
  },
  "primary-1": {
    el: {
      root: "bg-cTransparent text-cBlack leading-tight appearance-none w-full pb-2 lg:text-left text-center h-10 placeholder-cBlack focus:outline-none  underline",
    },
  },
  "label-medium": {
    el: {
      root: "h-14 px-3 py-4 text-c0-900 bg-cWhite w-full border border-c5-200  rounded text-base focus:border-c1-500 font-normal focus:outline-none appearance-none leading-tight",
    },
  },
};
