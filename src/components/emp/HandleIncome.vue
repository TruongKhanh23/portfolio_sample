<template>
  <div class="px-4">
    <a-table
      :columns="columns"
      :data-source="data"
      :rowClassName="backgroundColor"
    >
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
  setup() {
    const typeColor = {
      necessity: "#ffabab",
      freedom: "#63b5ff",
      enjoy: "#76de82",
      education: "#97a2ff",
      giving: "#c0c0c0",
      longTermSaving: "#f9a484",
    };
    function backgroundColor(record) {
      const type = record.type;
      if (Object.prototype.hasOwnProperty.call(typeColor, type)) {
        return `bg-[${typeColor[type]}]`;
      }
    }
    return { typeColor, backgroundColor };
  },
};
</script>
