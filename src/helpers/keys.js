export const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  backspace: 8,
  escape: 27,
});

export function isPressed(e, name) {
  const keyCode = e.keyCode;

  return keyCode && keyCode === keyCodes[name];
}
