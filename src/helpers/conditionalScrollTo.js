import { scrollTo } from "@/utils/dom.js";

export function conditionalScrollTo(elementOrSelector, options) {
  const topBar = document.getElementById("top-bar");
  let offset = 0;

  if (topBar) {
    const isFixed = window.getComputedStyle(topBar).position === "fixed";

    if (isFixed) {
      offset -= topBar.offsetHeight;
    }
  }

  scrollTo(elementOrSelector, {
    offset,
    ...options,
  });
}
