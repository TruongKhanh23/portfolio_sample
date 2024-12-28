<template>
  <!-- Projects grid -->
  <section v-if="projects">
    <!-- Projects grid title -->
    <div class="text-center">
      <h2
        class="font-general-semibold text-2xl sm:text-5xl font-semibold mb-2 text-ternary-dark dark:text-ternary-light"
      >
        {{ $t("home.projectsGrid.title") }}
      </h2>
    </div>

    <!-- Filter and search projects -->
    <div class="mt-6 sm:mt-6">
      <h3
        class="font-general-regular text-center text-secondary-dark dark:text-ternary-light text-md sm:text-xl font-normal mb-4"
      >
        {{ $t("home.projectsGrid.subTitle") }}
      </h3>
      <div
        class="flex flex-col md:flex-row md:justify-between border-b border-primary-light dark:border-secondary-dark gap-2"
      >
        <div class="flex flex-col md:flex-row md:justify-between gap-2">
          <span
            class="hidden sm:block bg-primary-light dark:bg-ternary-dark p-4 shadow-sm rounded-xl cursor-pointer"
          >
            <i
              data-feather="search"
              class="text-ternary-dark dark:text-ternary-light"
            ></i>
          </span>
          <input
            v-model="searchProject"
            class="font-general-medium pl-3 pr-4 sm:px-4 py-3 border-1 border-gray-200 dark:border-secondary-dark rounded-lg text-sm sm:text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
            id="name"
            name="name"
            type="search"
            required
            :placeholder="$t('home.projectsGrid.searchProjects')"
            aria-label="Name"
          />
        </div>
        <ProjectsFilter
          :selectOptions="selectOptions"
          @filter="selectedCategory = $event"
        />
      </div>
    </div>

    <!-- Projects grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
      <ProjectSingle
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

import { useLocale } from "@/composables/useLocale";

import ProjectsFilter from "./ProjectsFilter.vue";
import ProjectSingle from "./ProjectSingle.vue";

import feather from "feather-icons";

const store = useStore();
const locales = useLocale();
const currentLocale = locales.getCurrent();

const selectedCategory = ref(null);
const searchProject = ref(null);

const projects = computed(() => {
  let allProjects = store.state[currentLocale].projects;
  if (selectedCategory.value) {
    return filterProjectsByCategory(allProjects);
  } else if (searchProject.value) {
    return filterProjectsBySearch(searchProject, allProjects);
  }
  return allProjects;
});

const selectOptions = computed(() => {
  let allProjects = store.state[currentLocale].projects;
  return extractCategories(allProjects);
});

function extractCategories(projects) {
  const categories = [];

  projects.forEach((project) => {
    const { category } = project;
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });

  return categories;
}

function filterProjectsByCategory(projects) {
  return projects.filter((item) => {
    let category =
      item.category.charAt(0).toUpperCase() + item.category.slice(1);
    return category.includes(selectedCategory.value);
  });
}

function filterProjectsBySearch(searchProject, projects) {
  let project = new RegExp(searchProject.value, "i");
  return projects.filter((el) => el.header.title.match(project));
}

onMounted(() => {
  feather.replace();
});
</script>

<style scoped></style>
