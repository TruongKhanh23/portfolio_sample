import useForm from "@/composables/form";
import { conditionalScrollTo } from "@/helpers/conditionalScrollTo.js";
import { getElement } from "@/utils/dom.js";

const rdir = /@(.+)\/(.+).css/;

const imports = {
  // Vite will turn `../../assets/css/layouts/${name}.css` to `../../assets/css/layouts/*.css` then create new chunk based on the file name
  layouts: (name) => import(`../../assets/css/layouts/${name}.css`),
};

export function shake(form, { wrapper, target = "" } = {}) {
  form.shake();

  if (!form.valid) {
    setTimeout(() => {
      const error = document.querySelector(
        `#form-${form.formId} .c-message--error`
      );
      const field = error
        ? target
          ? getElement(target)
          : error.closest(".c-form-field")
        : null;

      if (field) {
        conditionalScrollTo(field, {
          wrapper,
        });
      }
    });
  }
}

export default function formFactory(configs) {
  const { create: createForm } = useForm();

  const factory = {
    shake,
    assets: {
      css: [],
    },
    async loadAssets() {
      const { css } = factory.assets;

      if (css.length) {
        await Promise.all(
          css.map((p = "") => {
            if (p) {
              const match = p.match(rdir);

              if (match) {
                const [, dir, fileName] = match;

                return imports[dir](fileName);
              }

              return import(`../../assets/css/layouts/${p}.css`);
            }

            return null;
          })
        );
      }
    },
    async createForm(data) {
      const form = createForm(factory.schema);

      if (data) {
        await form.setValue(data);
      }

      return form;
    },
    async init(data) {
      await factory.loadAssets();
      const form = await factory.createForm(data);

      return form;
    },
    ...configs,
  };

  return factory;
}
