/* eslint-disable no-mixed-spaces-and-tabs */
import { required } from "./rules/required.js";
import formFactory from "./helpers/formFactory";
import useForm from "@/composables/form";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
function normalizePlaceholder(text) {
  return `${t(text)}`;
}

export default function useHireMeForm() {
  const { create: createForm } = useForm();
  const layout = "hire-me-form";

  const schema = {
    formId: "hireMe",
    formType: "group",
    props: {
      class: "flex-wrap",
      layout,
    },
    fields: [
      {
        formId: "fullName",
        formType: "field",
        type: "string",
        props: {
          label: "hireMeModal.fields.name",
          placeholder() {
            return normalizePlaceholder.call(this, "fullName");
          },
          class: "w-full",
        },
        rules: [required],
      },
      {
        formId: "email",
        formType: "field",
        type: "string",
        props: {
          label: "hireMeModal.fields.email",
          placeholder() {
            return normalizePlaceholder.call(this, "email");
          },
          class: "w-full",
        },
        rules: [required],
      },
      {
        formId: "subject",
        formType: "field",
        type: "string",
        props: {
          label: "hireMeModal.fields.subject",
          placeholder() {
            return normalizePlaceholder.call(this, "subject");
          },
          class: "w-full",
        },
        rules: [required],
      },
      {
        formId: "projectCategory",
        formType: "field",
        type: "string",
        props: {
          label: "hireMeModal.fields.projectCategory",
          inputType: "select",
          options: [
            {
              name: "pleaseSelect",
              value: "",
            },
            {
              name: "Web Application",
              value: "Web Application",
            },
            {
              name: "Mobile Application",
              value: "Mobile Application",
            },
            {
              name: "API Spring boot",
              value: "API Spring boot",
            },
            {
              name: "Spring Microservice",
              value: "Spring Microservice",
            },
          ],
        },
        rules: [required],
      },
      {
        formId: "description",
        formType: "field",
        type: "string",
        props: {
          label: "hireMeModal.fields.description",
          placeholder() {
            return normalizePlaceholder.call(this, "subject");
          },
          class: "w-full",
        },
        rules: [required],
      },
    ],
  };

  const factory = formFactory({
    schema,
    assets: {
      css: ["@layouts/layouts.hire-me-form.css"],
    },
    async createForm(data) {
      const form = createForm(factory.schema);

      if (data) {
        await form.setValue(data);
      }

      return form;
    },
  });

  return factory;
}
