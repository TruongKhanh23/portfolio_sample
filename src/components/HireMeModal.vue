<template>
  <transition name="fade">
    <div v-show="modal" class="font-general-regular fixed inset-0 z-30">
      <!-- Modal body background as backdrop -->
      <div
        v-show="modal"
        @click="showModal()"
        class="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20"
      ></div>
      <!-- Modal content -->
      <main class="flex flex-col items-center justify-center h-full w-full">
        <transition name="fade-up-down">
          <div v-show="modal" class="modal-wrapper flex items-center z-30">
            <div
              class="modal max-w-md mx-5 xl:max-w-xl lg:max-w-xl md:max-w-xl bg-secondary-light dark:bg-primary-dark max-h-screen shadow-lg flex-row rounded-lg relative"
            >
              <div
                class="modal-header flex justify-between gap-10 p-5 border-b border-ternary-light dark:border-ternary-dark"
              >
                <h5 class="text-primary-dark dark:text-primary-light text-xl">
                  {{ $t("hireMeModal.title") }}
                </h5>
                <button
                  class="px-4 text-primary-dark dark:text-primary-light"
                  @click="showModal()"
                >
                  <i data-feather="x"></i>
                </button>
              </div>
              <div
                class="p-5 w-full h-full modal-footer mt-2 sm:mt-0 py-5 px-8 border0-t text-right"
              >
                <form
                  @submit.prevent="submitForm"
                  class="max-w-xl m-4 text-left"
                >
                  <template v-for="field in fields" :key="field.id">
                    <div class="mt-6">
                      <input
                        v-if="field.inputType === 'string'"
                        class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
                        :id="field.id"
                        :name="field.name"
                        :required="field.required"
                        :placeholder="field.placeholder"
                        :ariaLabel="field.ariaLabel"
                        :label="field.label"
                        v-model="formData[field.id]"
                      />
                      <textarea
                        v-else-if="field.inputType === 'textarea'"
                        class="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
                        :id="field.id"
                        :name="field.name"
                        :required="field.required"
                        :placeholder="field.placeholder"
                        :ariaLabel="field.ariaLabel"
                        :label="field.label"
                        cols="14"
                        rows="6"
                        v-model="formData[field.id]"
                      ></textarea>
                      <select
                        v-else-if="field.inputType === 'select'"
                        class="w-full px-5 py-2 border-1 border-gray-200 dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                        :id="field.id"
                        :name="field.name"
                        :required="field.required"
                        :placeholder="field.placeholder"
                        :ariaLabel="field.ariaLabel"
                        :label="field.label"
                        type="text"
                        v-model="formData[field.id]"
                      >
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

                  <div
                    class="w-full h-full mt-2 sm:mt-0 py-5 border0-t text-right flex justify-between"
                  >
                    <!-- Left-aligned button -->
                    <Button
                      :title="$t('hireMeModal.sendRequest')"
                      class="px-4 sm:px-6 py-2 sm:py-2.5 text-white bg-indigo-500 hover:bg-ternary-dark rounded-md focus:ring-1 focus:ring-indigo-900 duration-500"
                      type="submit"
                      :aria-label="$t('hireMeModal.sendRequest')"
                    />

                    <!-- Right-aligned button -->
                    <Button
                      :title="$t('hireMeModal.close')"
                      class="px-4 sm:px-6 py-2 sm:py-2.5 text-white bg-gray-600 hover:bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-900 duration-500"
                      @click="showModal()"
                      :aria-label="$t('hireMeModal.close')"
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
import { defineProps, onMounted, onUpdated } from "vue";
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
