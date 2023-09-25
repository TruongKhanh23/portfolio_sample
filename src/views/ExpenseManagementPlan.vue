<template>
  <div class="container mx-auto mt-12">
    <!-- Funds -->
    <Funds :funds="funds" />
    <!-- Limitation -->
    <Limitation :funds="funds" :totalIncome="totalIncome" />
    <!-- Details expense -->
    <a-row class="my-4">
      <!-- Estimate expense -->
      <a-col :span="7" class="bg-[lightgrey]"
        >Dự chi - Chi tiêu thiết yếu</a-col
      >
      <!-- Total income & debt -->
      <a-col :span="10">
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane key="1" tab="Thu nhập">
            <div class="px-4 min-h-[300px]">
              <p class="my-2 font-bold">Tổng thu nhập: {{ new Intl.NumberFormat().format(totalIncome) }}</p>
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
      </a-col>
      <!-- Checklist handle income -->
      <a-col :span="7" class="bg-[lightgrey]">Danh sách xử lý thu nhập</a-col>
    </a-row>
  </div>
</template>
<script>
import { Row, Col, Table, TabPane, Tabs } from "ant-design-vue";
import Funds from "@/components/emp/Funds.vue"
import Limitation from "@/components/emp/Limitation.vue"
export default {
  components: {
    ATable: Table,
    ARow: Row,
    ACol: Col,
    ATabPane: TabPane,
    ATabs: Tabs,
    Funds,
    Limitation,
  },
  setup() {
    const columns = [
      {
        title: "Nguồn thu nhập",
        dataIndex: "source",
        key: "source",
        width: 200,
      },
      {
        title: "Số tiền",
        dataIndex: "amount",
        key: "amount",
      },
    ];
    const data = [
      {
        key: "1",
        source: "Lương",
        amount: 13500000,
      },
      {
        key: "2",
        source: "Ba cho",
        amount: 2000000,
      },
      {
        key: "3",
        source: "Mẹ cho",
        amount: 4500000,
      },
    ];
    const totalIncome = calculateTotalAmount(data);

    function calculateTotalAmount(data) {
      let totalAmount = 0;

      for (let i = 0; i < data.length; i++) {
        totalAmount += data[i].amount;
      }

      return totalAmount;
    }
    const funds = [
      {
        id: "1",
        src: require("@/assets/images/tools/momo.svg"),
        percentage: 72.5,
        wallet: "Túi thần tài",
        name: "Nhu cầu thiết yếu",
        classColor: "bg-[#ffabab]",
      },
      {
        id: "2",
        src: require("@/assets/images/tools/momo.svg"),
        percentage: 3,
        wallet: "Qũy nhóm",
        name: "Tự do tài chính",
        classColor: "bg-[#63b5ff]",
      },
      {
        id: "3",
        src: require("@/assets/images/tools/vnpay.png"),
        percentage: 3,
        wallet: "Ví chính",
        name: "Giáo dục đào tạo",
        classColor: "bg-[#97a2ff]",
      },
      {
        id: "4",
        src: require("@/assets/images/tools/momo.svg"),
        percentage: 7.5,
        wallet: "Ví chính",
        name: "Hưởng thụ",
        classColor: "bg-[#76de82]",
      },
      {
        id: "5",
        src: require("@/assets/images/tools/zalopay.png"),
        percentage: 3,
        wallet: "Ví chính",
        name: "Cho đi",
        classColor: "bg-[#c0c0c0]",
      },
      {
        id: "6",
        src: require("@/assets/images/tools/zalopay.png"),
        percentage: 11,
        wallet: "Tài khoản tích lũy",
        name: "Tiết kiệm dài hạn",
        classColor: "bg-[#f9a484]",
      },
    ];
    return { columns, data, funds, totalIncome };
  },
};
</script>
