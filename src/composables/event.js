import { merge } from "@/utils/collections.js";

function emitEvent(name, ...args) {
  const event = this.events[name];

  if (event) {
    const handlers = event.handlers;

    handlers.forEach((h) => h.call(this, ...args));
  }
}

function offEvent(name, handler) {
  const event = this.events[name];

  if (event) {
    const { handlers, options = {} } = event;

    if (!options.noOff) {
      if (handler) {
        handlers.splice(handlers.indexOf(handler), 1);
      } else {
        delete this.events[name];
      }
    }
  }
}

function handleEventHandlers(eventName, fn) {
  Object.keys(this.events).forEach((name) => {
    const [n] = parseName(name);

    if (n === eventName) {
      fn(name);
    }
  });
}

function parseName(name) {
  return name.split(":");
}

export function emit(target, name, ...args) {
  const [eventName, namespace] = parseName(name);

  if (namespace) {
    emitEvent.call(target, name, ...args);
  } else {
    handleEventHandlers.call(target, eventName, (n) =>
      emitEvent.call(target, n, ...args)
    );
  }

  return target;
}

export function on(target, name, handler, options) {
  const event = target.events[name] || { handlers: [] };
  const handlers = event.handlers;

  if (!handlers.includes(handler)) {
    handlers.push(handler);
  }

  if (options) {
    event.options = options;
  }

  target.events[name] = event;

  return target;
}

export function off(target, name, handler) {
  const [eventName, namespace] = parseName(name);

  if (namespace) {
    offEvent.call(target, name, handler);
  } else {
    handleEventHandlers.call(target, eventName, (n) =>
      offEvent.call(target, n, handler)
    );
  }

  return target;
}

export function create() {
  const instance = {
    emit(name, ...args) {
      return emit(this, name, ...args);
    },
    on(name, handler, options) {
      return on(this, name, handler, options);
    },
    off(name, handler) {
      return off(this, name, handler);
    },
    extend(target) {
      const extended = merge(Object.create(this), target);

      extended.super = this;

      return extended;
    },
  };

  instance.events = {};

  return instance;
}

export default function useEvent() {
  return {
    create,
    emit,
    on,
    off,
  };
}
