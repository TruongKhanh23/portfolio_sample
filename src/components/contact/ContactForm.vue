<template>
  <div class="w-full md:w-1/2">
    <div
      class="leading-loose max-w-xl m-4 sm:p-7 sm:bg-secondary-light sm:dark:bg-secondary-dark sm:rounded-xl sm:shadow-xl text-left"
    >
      <p
        class="font-semibold text-center text-primary-dark dark:text-primary-light text-2xl mb-8"
      >
        {{ $t("contact.form.name") }}
      </p>
      <form
        @submit.prevent="submitForm"
        class="font-general-regular space-y-4"
        id="contact-form"
      >
        <template v-for="field in fieldsText" :key="field.id">
          <input
            v-if="field.inputType === 'string'"
            class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
            :id="field.id"
            :name="field.name"
            type="text"
            :required="field.required"
            :placeholder="field.placeholder"
            :aria-label="field.ariaLabel"
            v-model="formData[field.id]"
          />
          <input
            v-if="field.inputType === 'number'"
            class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
            :id="field.id"
            :name="field.name"
            type="text"
            :required="field.required"
            :placeholder="field.placeholder"
            :aria-label="field.ariaLabel"
            v-model="formData[field.id]"
            @input="validatePhoneNumber(field.id)"
            @keydown="restrictNonNumericInput"
            maxlength="10"
          />
          <textarea
            v-else-if="field.inputType === 'textarea'"
            class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
            :id="field.id"
            :name="field.name"
            cols="14"
            rows="4"
            :required="field.required"
            :placeholder="field.placeholder"
            :aria-label="field.ariaLabel"
            v-model="formData[field.id]"
          ></textarea>
        </template>

        <div class="flex items-center justify-center">
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
import useEmail from "@/composables/useEmail";

const { t } = useI18n();
const { formData, submitForm } = useEmail();

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
    id: "phoneNumber",
    label: t("contact.form.phoneNumber.label"),
    name: "phoneNumber",
    required: "",
    placeholder: t("contact.form.phoneNumber.placeholder"),
    ariaLabel: "Phone Number",
    inputType: "number",
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

// Chặn các ký tự không phải số khi gõ phím
const restrictNonNumericInput = (event) => {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "ArrowLeft",
    "ArrowRight", // Phím điều hướng
    "Delete",
    "Enter", // Xóa và xuống dòng
  ];
  // Cho phép các phím số (0-9) và các phím điều hướng
  if (
    !allowedKeys.includes(event.key) && // Không thuộc các phím cho phép
    !/^\d$/.test(event.key) // Không phải ký tự số
  ) {
    event.preventDefault();
  }
};

// Validate số điện thoại khi người dùng nhập
const validatePhoneNumber = (fieldId) => {
  const phone = formData[fieldId];
  // Loại bỏ toàn bộ ký tự không phải số
  const cleanedPhone = phone.replace(/\D/g, "");
  // Giới hạn số ký tự là 10
  formData[fieldId] = cleanedPhone.slice(0, 10);
};
</script>

<style lang="scss" scoped></style>
