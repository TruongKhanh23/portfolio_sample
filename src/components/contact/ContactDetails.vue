<template>
  <div class="w-full md:w-1/2">
    <div class="text-left max-w-xl px-4">
      <h2
        class="font-semibold text-center text-2xl text-primary-dark dark:text-primary-light mt-12 mb-8"
      >
        {{ $t("contact.title") }}
      </h2>
      <ul class="font-general-regular">
        <li class="flex flex-row" v-for="contact in contacts" :key="contact.id">
          <div>
            <i
              :data-feather="contact.icon"
              class="w-5 text-gray-500 dark:text-gray-400 mr-4"
            ></i>
          </div>
          <a
            href="#"
            class="mb-4 text-ternary-dark dark:text-ternary-light"
            :class="
              contact.icon === 'mail' || contact.icon === 'phone'
                ? 'hover:underline cursor-pointer'
                : ''
            "
            aria-label="Website and Phone"
          >
            {{ contact.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  contact: {
    type: Object,
    default: () => {},
  },
});

const contacts = computed(() => {
  const contact = props.contact;
  return [
    {
      id: 1,
      name: contact.address,
      icon: "map-pin",
    },
    {
      id: 2,
      name: contact.email,
      icon: "mail",
    },
    {
      id: 3,
      name: contact.phone,
      icon: "phone",
    },
  ];
});
</script>

<style lang="scss" scoped></style>
