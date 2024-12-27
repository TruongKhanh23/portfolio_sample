<template>
  <div
    class="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark"
  >
    <p
      class="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left"
    >
      {{ $t("projects.projectInfo.otherProjects") }}
    </p>
    <Slider
      :list="otherProjects"
      :attrs="{ perPage: perPage, arrows: true }"
    >
      <template #content="{ data }">
        <a
          :href="`/projects/single-project?id=${data.id}`"
          class="flex flex-col items-center justify-center text-center border shadow-lg space-y-4 rounded-lg pb-4"
        >
          <LazyImage
            :src="data.img.url"
            customClass="rounded-t-xl cursor-pointer h-[260px] w-screen"
            :alt="data.title"
          />
          <div class="px-4">
            <p class="font-general-semibold font-semibold mb-2 min-h-[48px]">
              {{ data.header.title }}
            </p>
            <span class="font-general-medium">
              {{ data.category }}
            </span>
          </div>
        </a>
      </template>
    </Slider>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted } from "vue";

defineProps({
  otherProjects: {
    type: Object,
    default: () => ({}),
  },
});

const isMobile = ref(false);
const perPage = ref(4);

// Kiểm tra xem người dùng có đang dùng thiết bị di động hay không
const checkIsMobile = () => {
  if (window.innerWidth <= 768) {
    isMobile.value = true;
    perPage.value = 1;  // Mobile: chỉ hiển thị 1 project mỗi lần
  } else {
    isMobile.value = false;
    perPage.value = 4;  // Không phải mobile: hiển thị 4 project mỗi lần
  }
};

// Gọi checkIsMobile khi component được mount
onMounted(() => {
  checkIsMobile();
  // Thêm sự kiện để cập nhật khi thay đổi kích thước màn hình
  window.addEventListener("resize", checkIsMobile);
});

// Đảm bảo dọn dẹp sự kiện khi component bị hủy
onUnmounted(() => {
  window.removeEventListener("resize", checkIsMobile);
});
</script>
