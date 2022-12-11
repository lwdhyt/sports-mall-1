<template>
  <el-table
    :data="tableData"
    :border="true"
    v-loading="loading"
    style="width: 100%"
    height="250"
    :cell-style="{ 'text-align': 'center' }"
    :header-cell-style="{ 'text-align': 'center' }"
  >
    <el-table-column fixed label="#" type="index" width="50"> </el-table-column>
    <template v-for="item in tableRow">
      <el-table-column
        v-if="item.key == 'operate'"
        fixed="right"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="btn in item.btn"
            :key="btn.key"
            @click.native.prevent="operateEvent(scope.row, btn.key)"
            type="text"
            size="small"
          >
            {{ btn.name }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :label="item.label"
        :fixed="item.fixed"
        :width="item.width"
        :prop="item.key"
      >
        <template slot-scope="scope">
          <span>{{
            item.dict
              ? item.dict.find(dic => dic.val == scope.row[item.key]).text
              : scope.row[item.key]
          }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableRow: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    operateEvent(row, key) {
      this.$emit('operateEvent', { row, key })
    }
  }
}
</script>
<style lang="scss" scoped></style>
