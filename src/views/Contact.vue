<template>
  <div
    class="container mx-auto flex flex-col-reverse md:flex-row sm:py-10 min-h-screen"
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

onMounted(() => {
  feather.replace();
});
onUpdated(() => {
  feather.replace();
});
</script>
