<template>
  <div class="container mx-auto min-h-screen">
    <!-- Banner -->
    <AppBanner class="mt-6 sm:mt-0" />

    <!-- Projects -->
    <ProjectsGrid class="min-h-screen" />

    <!-- Load more projects button -->
    <div class="mt-10 sm:mt-20 flex justify-center">
      <router-link
        to="/projects"
        class="flex items-center justify-center px-10 py-5 rounded-lg shadow-lg bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-900 text-white text-lg sm:text-xl font-semibold duration-300"
        :aria-label="$t('home.projectsGrid.moreProjects')"
        style="min-width: 48px; min-height: 48px; line-height: 1.5"
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
