<template>
  <div
    class="container mx-auto flex flex-col-reverse md:flex-row py-5 md:py-10 md:mt-10"
  >
    <Carousel />

    <!-- Contact form -->
    <ContactForm />

    <!-- Contact details -->
    <ContactDetails :contact="contact" />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useLocale } from "@/composables/useLocale";
import feather from "feather-icons";
import ContactForm from "@/components/contact/ContactForm.vue";
import ContactDetails from "@/components/contact/ContactDetails.vue";
import { onMounted, onUpdated } from "vue";

const store = useStore();
const locales = useLocale();
const currentLocale = locales.getCurrent();
const { contact } = store.state[currentLocale];
console.log("contact", contact);

onMounted(() => {
  feather.replace();
});
onUpdated(() => {
  feather.replace();
});
</script>
