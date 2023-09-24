<template>
  <div class="container mx-auto mt-12">
    <div id="income">
      <a-row>
        <a-col :span="3">
          <p class="my-2 font-bold">Tổng thu nhập</p>
        </a-col>
        <a-col :span="3">
          <p class="my-2 font-bold text-right">
            {{ new Intl.NumberFormat().format(totalIncome) }}
          </p>
        </a-col>
      </a-row>
      <a-row justify="left">
        <a-col :span="6">
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
        </a-col>
      </a-row>
    </div>
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
    <a-row justify="space-around" class="bg-[#ffdddd] rounded-full">
      <a-col :span="3" class="border-r-2 border-r-[white]">
        <p class="my-2 font-bold">Hạn mức</p>
      </a-col>
      <template v-for="fund in funds" :key="fund.id">
        <a-col :span="3">
          <p class="my-2 font-bold">
            {{
              new Intl.NumberFormat().format(
                (totalIncome * fund.percentage) / 100
              )
            }}
          </p>
        </a-col>
      </template>
    </a-row>
  </div>
</template>
<script>
import { Row, Col, Table } from "ant-design-vue";
export default {
  components: { ATable: Table, ARow: Row, ACol: Col },
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
