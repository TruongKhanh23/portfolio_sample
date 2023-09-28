<template>
  <div class="px-4">
    <a-table
      :columns="columns"
      :data-source="data"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'amount'">
          <a>{{ new Intl.NumberFormat().format(text) }}</a>
        </template>
        <template v-if="column.dataIndex === 'type'">
          <a-tag :color="tagColor(text)">{{ text }}</a-tag>
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
    const tagTypeColor = {
      necessity: "pink",
      freedom: "blue",
      enjoy: "green",
      education: "purple",
      giving: "default",
      longTermSaving: "orange",
    }
    function tagColor(type){
      console.log("went tag", type)
      if(Object.prototype.hasOwnProperty.call(tagTypeColor, type)) {
        console.log("tagTypeColor[type]", tagTypeColor[type]);
        return tagTypeColor[type]
      }
    }
    return { tagColor };
  },
};
</script>
