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
import { getDatas, exports } from '@/api/system'
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
          name: '用户名称',
          key: 'username',
          value: ''
        },
        {
          type: 'input',
          name: '联系电话',
          key: 'telephone',
          value: ''
        },
        {
          type: 'input',
          name: '用户邮箱',
          key: 'email',
          value: ''
        },
        {
          type: 'select',
          name: '用户状态',
          key: 'userStatus',
          option: this.$dict.order.state,
          value: ''
        },
        {
          type: 'input',
          name: '居住地址',
          key: 'address',
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'export', name: '导出' },
        { key: 'reset', name: '重置' }
      ],
      tableRow: [
        { key: 'username', label: '用户名称' },
        { key: 'avatar', label: '用户头像' },
        { key: 'telephone', label: '联系电话' },
        { key: 'email', label: '用户邮箱' },
        { key: 'userStatus', label: '用户状态', dict: this.$dict.commodity.state },
        { key: 'address', label: '居住地址' },
        { key: 'updateTime', label: '更新时间' },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'details', name: '详情' },
            { key: 'edit', name: '编辑' },
            { key: 'upDown', name: '启用/禁用' },
            { key: 'delete', name: '删除' }
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
      this.detailsInfo = row
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
::v-deep(.avatar-uploader .el-upload) {
  border: 1px dashed rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep(.avatar-uploader .el-upload:hover) {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
