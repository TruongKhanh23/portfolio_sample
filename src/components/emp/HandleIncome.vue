<template>
  <div class="px-4">
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'amount'">
          <a>{{ new Intl.NumberFormat().format(text) }}</a>
        </template>
        <template v-if="column.dataIndex === 'type'">
          <a-tag color="blue">{{ text }}</a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
import { Table, Tag } from "ant-design-vue";
export default {
  components: {
    ATag: Tag,
    ATable: Table,
  },
  props: {
    columns: {
      type: Object,
      require: true,
    },
    data: {
      type: Object,
      require: true,
    },
  },
};
</script>
