<template>
    <img
      :src="observerTriggered ? src : placeholder"
      :alt="alt"
      :class="customClass"
      ref="image"
      loading="lazy"
    />
  </template>
  
  <script>
  export default {
    props: {
      src: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: "https://via.placeholder.com/450", // Placeholder image
      },
      alt: {
        type: String,
        default: "",
      },
      customClass: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        observerTriggered: false,
      };
    },
    mounted() {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.observerTriggered = true;
            observer.unobserve(this.$refs.image);
          }
        },
        { rootMargin: "50px" }
      );
  
      observer.observe(this.$refs.image);
    },
  };
  </script>
  