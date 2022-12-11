<template>
  <div class="commodity-info flex-col-box">
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
    <Details v-model="detailsShow" :data="detailsInfo"></Details>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getDatas, exports, getDetails } from '@/api/commodity'
import { downloadFile } from '@/utils'
import Details from './components/details.vue'
export default {
  name: 'commodity-info',
  components: { SearchFrom, Table, Pagination, Details },
  data() {
    return {
      fromData: [
        {
          type: 'date',
          name: '更新时间',
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
          name: '品牌商',
          key: 'brandingBusiness',
          value: ''
        },
        {
          type: 'select',
          name: '商品状态',
          key: 'productStatus',
          option: this.$dict.order.state,
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'export', name: '导出' },
        { key: 'reset', name: '重置' },
        { key: 'add', name: '新增商品' }
      ],
      tableRow: [
        { key: 'productName', label: '商品名称' },
        { key: 'productType', label: '商品分类' },
        { key: 'brandingBusiness', label: '品牌商' },
        { key: 'productStatus', label: '商品状态', dict: this.$dict.commodity.state },
        { key: 'originalPrice', label: '原价' },
        { key: 'promotionPrice', label: '促销价' },
        { key: 'updateTime', label: '更新时间' },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'details', name: '详情' },
            { key: 'edit', name: '编辑' },
            { key: 'upDown', name: '上架/下架' },
            { key: 'delete', name: '删除' },
            { key: 'sell', name: '推荐' }
          ]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false,
      detailsInfo: {}
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
        downloadFile(res, '订单信息')
      } catch (error) {}
    },
    operateEvent(data) {
      console.log(data)
      if (data.key == 'details') {
        this.goDetails(data.row)
      }
    },
    async goDetails(row) {
      try {
        this.detailsInfo = await getDetails(row.id)
      } catch (error) {
        this.detailsInfo = row
      }
      this.detailsShow = true
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
