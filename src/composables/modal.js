import { getCurrentInstance } from "vue";
import { isFunction } from "lodash";
import { createVueApp } from "@/helpers/createVueApp";
import CModal from "@/components/base/CModal.vue";

let uid = 0;
export class Modal {
  constructor({ name, ...defaultAttrs } = {}, context) {
    this.name = name || `modal-${uid++}`;
    this.defaultAttrs = defaultAttrs;
    this.context = context;
    this.instance = null;
    this.app = null;
    this.active = false;
  }

  open(attrs = {}) {
    if (!this.active) {
      const propsData = {
        programmatic: true,
        ...this.defaultAttrs,
        ...attrs,
      };

      const app = createVueApp(
        CModal,
        {
          ...propsData,
          onClose: (...args) => {
            if (isFunction(propsData.onClose)) {
              propsData.onClose.call(this.instance, "close", ...args);
            }

            this.app.unmount();
            this.instance = null;
            this.app = null;
            this.active = false;
          },
        },
        this.context
      );

      this.instance = app.mount(document.createElement("div"));
      this.app = app;

      this.active = true;
    }
  }

  close() {
    if (this.instance && this.active) {
      this.instance.hideModal();
    }
  }
}

export default function useModal() {
  const { appContext } = getCurrentInstance();
  const modals = {};

  function create(options = {}) {
    const modal = new Modal(options, appContext);

    modals[modal.name] = modal;

    return modal;
  }

  function open(name, ...args) {
    const modal = modals[name];

    if (modal) {
      modal.open(...args);
    }
  }

  function close(name, ...args) {
    const modal = modals[name];

    if (modal) {
      modal.close(...args);
    }
  }

  return {
    create,
    open,
    close,
  };
}
