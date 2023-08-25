<template>
  <div
    class="container mx-auto flex flex-col-reverse md:flex-row py-5 md:py-10 md:mt-10"
  >
  <Carousel/>

    <!-- Contact form -->
    <ContactForm />

    <!-- Contact details -->
    <ContactDetails :contacts="contacts" />
  </div>
</template>

<script setup>
import feather from "feather-icons";
import ContactForm from "@/components/contact/ContactForm.vue";
import ContactDetails from "@/components/contact/ContactDetails.vue";
import { onMounted, onUpdated } from "vue";

const contacts = [
  {
    id: 1,
    name: "Sangkat Teukthla, Sen Sok, Cambodia",
    icon: "map-pin",
  },
  {
    id: 2,
    name: "lengchhinghor@gmail.com",
    icon: "mail",
  },
  {
    id: 3,
    name: "+855 16839143",
    icon: "phone",
  },
];
onMounted(() => {
  feather.replace();
})
onUpdated(() => {
  feather.replace();
})
</script>
