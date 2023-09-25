<template>
  <a-tabs v-model:activeKey="activeKey" centered>
    <a-tab-pane key="1" tab="Thu nhập">
      <div class="px-4 min-h-[300px]">
        <p class="my-2 font-bold">
          Tổng thu nhập: {{ new Intl.NumberFormat().format(totalIncome) }}
        </p>
        <a-table :columns="columns" :data-source="data">
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
              <a>{{ text }}</a>
            </template>
            <template v-if="column.dataIndex === 'amount'">
              <a>{{ new Intl.NumberFormat().format(text) }}</a>
            </template>
          </template>
        </a-table>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Nợ" force-render>
      <div class="min-h-[300px]">Nợ</div>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { Table, TabPane, Tabs } from "ant-design-vue";
export default {
  components: {
    ATable: Table,
    ATabPane: TabPane,
    ATabs: Tabs,
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
    totalIncome: {
      type: String,
      require: true,
    },
  },
};
</script>
