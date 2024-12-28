<template>
  <div class="min-h-[10vh] sm:min-h-[15vh]"></div>

  <div class="container mx-auto flex flex-col-reverse md:flex-row">
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
import { computed, onMounted, onUpdated } from "vue";

const store = useStore();
const locales = useLocale();
const currentLocale = locales.getCurrent();
const contact = computed(() => store.state[currentLocale].contact);

onMounted(() => {
  feather.replace();
});
onUpdated(() => {
  feather.replace();
});
</script>
