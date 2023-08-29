<template>
  <div class="w-full md:w-1/2">
    <div
      class="leading-loose max-w-xl m-4 p-7 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
    >
      <p
        class="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8"
      >
        {{ $t("contact.form.name") }}
      </p>
      <form action="#" class="font-general-regular space-y-7">
        <template v-for="field in fieldsText" :key="field.id">
          <CFormField
            :id="field.id"
            :name="field.name"
            :required="field.required"
            :placeholder="field.placeholder"
            :ariaLabel="field.ariaLabel"
            :label="field.label"
            :inputType="field.inputType"
          />
        </template>

        <div>
          <Button
            title="Send Message"
            class="px-4 py-2.5 text-white tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg duration-500"
            type="submit"
            aria-label="Send Message"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import Button from "../reusable/Button.vue";
import CFormField from "@/components/shared/CFormField";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const fieldsText = [
  {
    id: "name",
    label: t("contact.form.fullName.label"),
    name: "name",
    required: "",
    placeholder: t("contact.form.fullName.placeholder"),
    ariaLabel: "Name",
    inputType: "string",
  },
  {
    id: "email",
    label: "Email",
    name: "email",
    required: "",
    placeholder: "Your Email",
    ariaLabel: "Email",
    inputType: "string",
  },
  {
    id: "subject",
    label: "Subject",
    name: "subject",
    required: "",
    placeholder: "Subject",
    ariaLabel: "Subject",
    inputType: "string",
  },
  {
    id: "message",
    label: "Message",
    name: "message",
    required: "",
    placeholder: "Message",
    ariaLabel: "Message",
    inputType: "textarea",
  },
];
</script>

<style lang="scss" scoped></style>
