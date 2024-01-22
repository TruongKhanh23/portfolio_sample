// Determine if an element is an HTML element
export const isElement = (el) => !!(el && el.nodeType === Node.ELEMENT_NODE);

export function getElement(elementOrSelector) {
  return isElement(elementOrSelector)
    ? elementOrSelector
    : document.querySelector(elementOrSelector);
}

export function offset(elementOrSelector) {
  const element = getElement(elementOrSelector);
  const rect = element.getBoundingClientRect();

  const top = rect.top + window.scrollY;
  const left = rect.left + window.scrollX;

  return {
    top,
    left,
  };
}

export function scrollTo(elementOrSelector, { wrapper, offset: os = 0 } = {}) {
  const element = getElement(elementOrSelector);

  if (element) {
    const { top } = offset(element);

    (wrapper || window).scrollTo({
      top: top + os,
      behavior: "smooth",
    });
  }
}
