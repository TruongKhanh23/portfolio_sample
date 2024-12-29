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
            v-if="contact.icon === 'mail'"
            @click.prevent="handleEmailClick(contact.name)"
            class="mb-4 text-ternary-dark dark:text-ternary-light hover:underline cursor-pointer"
            aria-label="Email"
          >
            {{ contact.name }}
          </a>
          <a
            v-else
            :href="getHref(contact)"
            class="mb-4 text-ternary-dark dark:text-ternary-light"
            :class="{
              'hover:underline cursor-pointer': contact.icon === 'phone',
            }"
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
    default: () => ({}),
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

// Hàm để tạo href phù hợp với loại liên kết
const getHref = (contact) => {
  if (contact.icon === "phone") {
    return `tel:${contact.name}`;
  } else {
    return "#";
  }
};

// Hàm xử lý click vào email
const handleEmailClick = (email) => {
  if (isMobileDevice()) {
    // Trên thiết bị di động, mở ứng dụng Gmail
    window.location.href = `mailto:${email}`;
  } else {
    // Trên máy tính, mở Gmail trong tab mới
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(gmailUrl, "_blank");
  }
};

// Hàm nhận diện thiết bị di động
const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};
</script>

<style lang="scss" scoped></style>
