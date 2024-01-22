<template>
  <div>Hello</div>
  <transition name="fade">
    <div class="font-general-regular fixed inset-0 z-30">
      <!-- Modal body background as backdrop -->
      <main class="flex flex-col items-center justify-center h-full w-full">
        <transition name="fade-up-down">
          <div class="modal-wrapper flex items-center z-30">
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
                class="p-5 w-full h-full modal-footer mt-2 sm:mt-0 py-5 px-8 border0-t"
              >
                <div>Form Here</div>
                <CFormGroup :group="hireMeForm" />

                <div
                  class="w-full h-full mt-2 sm:mt-0 py-5 border0-t text-right flex justify-between"
                >
                  <!-- Left-aligned button -->
                  <Button
                    :title="$t('hireMeModal.sendRequest')"
                    class="px-4 sm:px-6 py-2 sm:py-2.5 text-white bg-indigo-500 hover:bg-ternary-dark rounded-md focus:ring-1 focus:ring-indigo-900 duration-500"
                    @click="submit()"
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
              </div>
            </div>
          </div>
        </transition>
      </main>
    </div>
  </transition>
</template>

<script>
import feather from "feather-icons";
import { ref, onMounted, onUpdated } from "vue";
import { CFormGroup } from "@/components/core/form/CFormGroup.vue";

import useHireMeForm from "@/forms/hireMe";

export default {
  components: {
    CFormGroup,
  },
  props: {
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
  },
  setup() {
    const hireMeForm = ref(null);
    const { init, shake } = useHireMeForm();
    init().then((form) => {
      hireMeForm.value = form;
      console.log("hireMeForm.value", hireMeForm.value);
    });
    function submit() {
      shake(hireMeForm.value);
    }

    onMounted(() => {
      feather.replace();
    });
    onUpdated(() => {
      feather.replace();
    });
    return { hireMeForm, submit };
  },
};
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
