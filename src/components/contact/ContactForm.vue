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
      <form @submit.prevent="submitForm" class="font-general-regular space-y-7">
        <template v-for="field in fieldsText" :key="field.id">
          <input
            v-if="field.inputType === 'string'"
            class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
            :id="field.id"
            :name="field.name"
            type="text"
            :required="required"
            :placeholder="field.placeholder"
            :aria-label="field.ariaLabel"
            v-model="formData[field.id]"
          />
          <textarea
            v-else-if="field.inputType === 'textarea'"
            class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
            :id="field.id"
            :name="field.name"
            cols="14"
            rows="6"
            :placeholder="field.placeholder"
            :aria-label="field.ariaLabel"
            v-model="formData[field.id]"
          ></textarea>
        </template>

        <div>
          <Button
            :title="t('contact.form.button')"
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
import { useI18n } from "vue-i18n";
import { ref } from "vue";

import LoadingModal from "@/components/reusable/LoadingModal.vue";

import useModal from "@/composables/modal";

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
    label: t("contact.form.email.label"),
    name: "email",
    required: "",
    placeholder: t("contact.form.email.placeholder"),
    ariaLabel: "Email",
    inputType: "string",
  },
  {
    id: "subject",
    label: t("contact.form.subject.label"),
    name: "subject",
    required: "",
    placeholder: t("contact.form.subject.placeholder"),
    ariaLabel: "Subject",
    inputType: "string",
  },
  {
    id: "message",
    label: t("contact.form.message.label"),
    name: "message",
    required: "",
    placeholder: t("contact.form.message.placeholder"),
    ariaLabel: "Message",
    inputType: "textarea",
  },
];

const modal = useModal();
const loadingModal = modal.create({
  name: "LoadingModal",
  content: LoadingModal,
  dismissable: true,
});

const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const submitForm = async () => {
  loadingModal.open();
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: window.envConfig.WEB3FORM_ACCESS_KEY,
        name: formData.value.name,
        email: formData.value.email,
        subject: formData.value.subject,
        message: formData.value.message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      loadingModal.close();
      alert(result.message);
    }
  } catch (error) {
      loadingModal.close();
      alert(`Error occured: ${error}`)
  }
};
</script>

<style lang="scss" scoped></style>
