<template>
  <div class="container mx-auto min-h-screen">
    <!-- Banner -->
    <AppBanner class="mb-5 sm:mb-8 min-h-[90vh]" />

    <!-- Projects -->
    <ProjectsGrid class="min-h-screen" />

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

<script>
import AppBanner from "@/components/shared/AppBanner";
import ProjectsGrid from "@/components/projects/ProjectsGrid.vue";

export default {
  components: {
    AppBanner,
    ProjectsGrid,
  },
  metaInfo: {
    title: "Portofolio - Trương Nguyễn Khánh",
    meta: [
      {
        name: "description",
        content:
          "This is a portfolio website of Trương Nguyễn Khánh, you can see who he is, who he does and know more about him.",
      },
      {
        name: "keywords",
        content:
          "Trương Nguyễn Khánh, Trương Nguyễn Khánh UEF, Trương Nguyễn Khánh Dai-ichi, Truong Nguyen Khanh UEF, truong nguyen khanh, truongnguyenkhanh, khanhtn, khanhtn online, khanhtn.online",
      },
      {
        property: "og:title",
        content: "Portfolio - Trương Nguyễn Khánh",
      },
      {
        property: "og:description",
        content:
          "This is a portfolio website of Trương Nguyễn Khánh, you can see who he is, who he does and know more about him.",
      },
      {
        property: "og:image",
        content: "/author.png",
      },
      {
        property: "og:url",
        content: "https://khanhtn.online/",
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: "https://khanhtn.online/",
      },
    ],
  },
};
</script>

<style scoped></style>
