<template>
  <div class="collect flex-col-box">
    <SearchFrom
      ref="search"
      :fromData="fromData"
      :btnArr="btnArr"
      @btnClick="operation"
    ></SearchFrom>
    <Table
      :tableRow="tableRow"
      :tableData="tableData"
      :loading="loading"
      @operateEvent="operateEvent"
      class="flex-fill"
    ></Table>
    <Pagination ref="page" :total="total" class="flex-bot"></Pagination>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getDatas, exports } from '@/api/collect'
import { downloadFile } from '@/utils'
export default {
  name: 'collect',
  components: { SearchFrom, Table, Pagination },
  data() {
    return {
      fromData: [
        {
          type: 'date',
          name: '收藏时间',
          key: ['updateStartTime', 'updateEndTime'],
          value: []
        },
        {
          type: 'input',
          name: '商品名称',
          key: 'productName',
          value: ''
        },
        {
          type: 'input',
          name: '商品分类',
          key: 'productTypeId',
          value: ''
        },
        {
          type: 'input',
          name: '收藏人',
          key: 'username',
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'export', name: '导出' },
        { key: 'reset', name: '重置' }
      ],
      tableRow: [
        { key: 'productName', label: '商品名称' },
        { key: 'productType', label: '商品分类' },
        { key: 'username', label: '收藏人' },
        { key: 'createTime', label: '收藏时间' },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'delete', name: '删除' },
            { key: 'hidden', name: '隐藏' }
          ]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    operation(key) {
      if (key == 'query') {
        this.query()
      } else if (key == 'reset') {
        this.reset()
      } else if (key == 'export') {
        this.export()
      }
    },
    query() {
      this.queryParam = this.$refs.search.getValue()
      this.$refs.page.resetPageNum()
      this.getdata()
    },
    reset() {
      this.$refs.search.reset()
    },
    async export() {
      try {
        const res = await exports({})
        downloadFile(res, '收藏信息')
      } catch (error) {}
    },
    operateEvent(data) {
      console.log(data)
    },

    async getdata() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getDatas(this.queryParam, paging)
        this.tableData = res.data.records
        this.total = res.data.total
        this.loading = false
      } catch (error) {}
    }
  }
}
</script>
<style lang="scss" scoped>
.flex-col-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  .flex-fill {
    margin: 30px 0;
  }
  .flex-bot {
    margin-bottom: 30px;
    display: flex;
    justify-content: right;
  }
}
</style>
