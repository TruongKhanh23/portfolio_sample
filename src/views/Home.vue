<template>
  <div class="container mx-auto">
    <!-- Banner -->
    <AppBanner class="mb-5 sm:mb-8" />

    <!-- Projects -->
    <ProjectsGrid />

    <!-- Load more projects button -->
    <div class="mt-10 sm:mt-20 flex justify-center">
      <router-link
        to="/projects"
        class="font-general-medium flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300"
        :aria-label="$t('home.projectsGrid.moreProjects')"
      >
        <Button :title="$t('home.projectsGrid.moreProjects')" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppBanner from "@/components/shared/AppBanner";
import ProjectsGrid from "@/components/projects/ProjectsGrid.vue";
import Button from "@/components/reusable/Button.vue";
import * as contentful from "contentful";

const post = ref(null);

const client = contentful.createClient({
  space: "c6ogknoey4wh",
  environment: "master", // defaults to 'master' if not set
  accessToken: "XNu6t2LDvPJd43iOzlLmYXklaD85PimLxUrl72k4Hoo",
});

client.withAllLocales
  .getEntry("2fh7DboJhjWwcRmWfZnC5R")
  .then((entry) => {
    post.value = entry;
    console.log("post.value", post.value);
  })
  .catch(console.error);
</script>

<style scoped></style>
