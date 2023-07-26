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
                  {{ title }}
                </h5>
                <button
                  class="px-4 text-primary-dark dark:text-primary-light"
                  @click="showModal()"
                >
                  <i data-feather="x"></i>
                </button>
              </div>
              <div class="modal-body p-5 w-full h-full">
                <form class="max-w-xl m-4 text-left">
                  <template v-for="field in fields" :key="field.id">
                    <div class="mt-6">
                      <CFormField
                        :id="field.id"
                        :name="field.name"
                        :required="field.required"
                        :placeholder="field.placeholder"
                        :ariaLabel="field.ariaLabel"
                        :label="field.label"
                        :inputType="field.inputType"
                        :options="field.options"
                      />
                    </div>
                  </template>

                  <div class="mt-6 pb-4 sm:pb-1">
                    <Button
                      title="Send Request"
                      class="px-4 sm:px-6 py-2 sm:py-2.5 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-900 duration-500"
                      type="submit"
                      aria-label="Submit Request"
                    />
                  </div>
                </form>
              </div>
              <div
                class="modal-footer mt-2 sm:mt-0 py-5 px-8 border0-t text-right"
              >
                <Button
                  title="Close"
                  class="px-4 sm:px-6 py-2 bg-gray-600 text-primary-light hover:bg-ternary-dark dark:bg-gray-200 dark:text-secondary-dark dark:hover:bg-primary-light rounded-md focus:ring-1 focus:ring-indigo-900 duration-500"
                  @click="showModal()"
                  aria-label="Close Modal"
                />
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
import CFormField from "@/components/shared/CFormField";

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

const title = "What project are you looking for?";

const fields = [
  {
    id: "name",
    label: "Full Name",
    name: "name",
    required: "",
    placeholder: "Your Name",
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
    placeholder: "Project Description",
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
@media screen and (max-width: 768px) {
  .modal-body {
    max-height: 400px;
  }
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
