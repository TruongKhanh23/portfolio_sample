<template>
  <a-row justify="space-around">
    <a-col :span="3">
      <p class="my-2 font-bold"></p>
    </a-col>
    <template v-for="fund in funds" :key="fund.id">
      <a-col :span="3">
        <div class="flex justify-center items-center">
          <img :src="fund.src" class="w-16 h-16" />
        </div>
        <h3 class="font-bold my-2">{{ fund.wallet }}</h3>
        <div
          class="font-bold h-12 flex justify-center items-center rounded-lg text-white"
          :class="fund.classColor"
        >
          {{ fund.name }}
        </div>
        <p class="my-2 font-bold">{{ fund.percentage }}%</p>
      </a-col>
    </template>
  </a-row>
</template>
<script>
import { Row, Col } from "ant-design-vue";
export default {
  components: {
    ARow: Row,
    ACol: Col,
  },
  props: {
    funds: {
      type: Object,
      require: true,
    },
  },
};
</script>
