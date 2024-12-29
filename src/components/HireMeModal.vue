<template>
  <transition name="fade">
    <div v-show="modal" class="fixed inset-0 z-30 font-general-regular">
      <!-- Modal body background as backdrop -->
      <div
        v-show="modal"
        @click="showModal()"
        class="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-20"
      ></div>
      <!-- Modal content -->
      <main class="flex items-center justify-center w-full h-full">
        <transition name="fade-up-down">
          <div v-show="modal" class="flex items-center z-30 modal-wrapper">
            <div
              class="relative flex-row max-w-md mx-5 bg-secondary-light dark:bg-primary-dark shadow-lg rounded-lg xl:max-w-xl"
            >
              <!-- Modal Header -->
              <div
                class="flex justify-end p-5 border-b border-ternary-light dark:border-ternary-dark"
              >
                <button
                  @click="$emit('close')"
                  class="px-4 text-primary-dark dark:text-primary-light"
                >
                  <i data-feather="x"></i>
                </button>
              </div>

              <!-- Modal Content -->
              <div class="w-full h-full px-8">
                <h5 class="text-xl text-primary-dark dark:text-primary-light">
                  {{ $t("hireMeModal.title") }}
                </h5>
                <form @submit.prevent="submitForm" class="max-w-xl text-left">
                  <template v-for="field in fields" :key="field.id">
                    <div class="mt-6">
                      <!-- Input Fields -->
                      <input
                        v-if="field.inputType === 'string'"
                        class="w-full px-5 py-2 border rounded-md shadow-sm text-md border-gray-300 dark:border-primary-dark bg-ternary-light dark:bg-ternary-dark text-primary-dark dark:text-secondary-light"
                        v-bind="field"
                        v-model="formData[field.id]"
                      />
                      <!-- Textarea -->
                      <textarea
                        v-else-if="field.inputType === 'textarea'"
                        class="w-full px-5 py-2 border rounded-md shadow-sm text-md border-gray-300 dark:border-primary-dark bg-ternary-light dark:bg-ternary-dark text-primary-dark dark:text-secondary-light"
                        cols="14"
                        rows="6"
                        v-bind="field"
                        v-model="formData[field.id]"
                      ></textarea>
                      <!-- Select -->
                      <select
                        v-else-if="field.inputType === 'select'"
                        class="w-full px-5 py-2 border rounded-md text-md border-gray-200 dark:border-secondary-dark bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                        v-model="formData[field.id]"
                      >
                        <option value="" disabled>
                          {{ field.placeholder }}
                        </option>
                        <option
                          v-for="option in field.options"
                          :key="option.id"
                          :value="option.name"
                        >
                          {{ option.name }}
                        </option>
                      </select>
                    </div>
                  </template>

                  <!-- Buttons -->
                  <div class="flex justify-center py-5 mt-2">
                    <Button
                      :title="$t('hireMeModal.sendRequest')"
                      class="px-4 sm:px-6 py-2 sm:py-2.5 text-white bg-indigo-500 hover:bg-ternary-dark rounded-md focus:ring-1 focus:ring-indigo-900 duration-500"
                      type="submit"
                      :aria-label="$t('hireMeModal.sendRequest')"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </transition>
      </main>
    </div>
  </transition>
</template>

<script setup>
import feather from "feather-icons";
import Button from "./reusable/Button.vue";
import { defineProps, onMounted, onUpdated, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import useEmail from "@/composables/useEmail";

const { t } = useI18n();
const { formData, submitForm } = useEmail();

const props = defineProps({
  showModal: {
    type: Function,
    default: () => () => {},
  },
  modal: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const fields = [
  {
    id: "name",
    label: "Full Name",
    name: "name",
    required: "",
    placeholder: t("hireMeModal.fields.name"),
    ariaLabel: "Name",
    inputType: "string",
  },
  {
    id: "email",
    label: "Email",
    name: "email",
    required: "",
    placeholder: t("hireMeModal.fields.email"),
    ariaLabel: "Email",
    inputType: "string",
  },
  {
    id: "subject",
    label: "Subject",
    name: "subject",
    required: "",
    placeholder: t("hireMeModal.fields.subject"),
    ariaLabel: "Subject",
    inputType: "string",
  },
  {
    id: "projectCategory",
    label: "Project Category",
    name: "Project Category",
    required: "",
    placeholder: "Project Category",
    ariaLabel: "Project Category",
    inputType: "select",
    options: props.categories,
  },
  {
    id: "projectDescription",
    label: "Project Description",
    name: "Project Description",
    required: "",
    placeholder: t("hireMeModal.fields.description"),
    ariaLabel: "Project Description",
    inputType: "textarea",
  },
];

defineEmits(["close"]);

onMounted(() => {
  feather.replace();
});
onUpdated(() => {
  feather.replace();
});
</script>

<style scoped>
.modal-body {
  max-height: 500px;
}
.bg-gray-800-opacity {
  background-color: #2d374850;
}
.fade-up-down-enter-active {
  transition: all 0.3s ease;
}
.fade-up-down-leave-active {
  transition: all 0.3s ease;
}
.fade-up-down-enter {
  transform: translateY(10%);
  opacity: 0;
}
.fade-up-down-leave-to {
  transform: translateY(10%);
  opacity: 0;
}

.fade-enter-active {
  -webkit-transition: opacity 2s;
  transition: opacity 0.3s;
}
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
