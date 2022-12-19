<template>
  <div class="commodity-info flex-col-box">
    <SearchFrom
      ref="search"
      :formData="formData"
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
    <!-- <Details ref="detail" v-model="detailsShow"></Details> -->
    <!-- <Edit ref="edit" v-model="editShow" @refresh="getData"></Edit> -->
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getRecirds, removeViewRecord } from '@/api/client'
// import Details from './components/details.vue'
// import Edit from './components/edit.vue'
export default {
  name: 'commodity-info',
  // Details, Edit
  components: { SearchFrom, Table, Pagination },
  data() {
    return {
      formData: [
        {
          type: 'input',
          name: '商品名称',
          key: 'productName',
          value: ''
        }
      ],
      btnArr: [{ key: 'query', name: '查询' }],
      tableRow: [
        { key: 'productName', label: '商品名称' },
        { key: 'sysFilePath', label: '商品主图', type: 'imger' },
        { key: 'updateTime', label: '浏览时间' },
        {
          key: 'operate',
          label: '操作',
          fixed: 'right',
          btn: [
            { key: 'details', name: '详情' },
            { key: 'delete', name: '删除' }
          ]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false,
      editShow: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    operation(key) {
      if (key == 'query') {
        this.query()
      }
    },
    query() {
      this.queryParam = this.$refs.search.getValue()
      this.$refs.page.resetPageNum()
      this.getData()
    },
    operateEvent(data) {
      if (data.key == 'details') {
        this.goDetails(data.row)
      } else if (data.key == 'delete') {
        this.delete(data.row)
      }
    },
    dataHandel(row) {
      const newRow = JSON.parse(JSON.stringify(row))
      newRow.sysFilePath = newRow.sysFile.filePath
      newRow.sysFileListPath = []
      newRow.sysFileList?.forEach(item => {
        newRow.sysFileListPath.push(item.filePath)
      })
      return newRow
    },
    goDetails(row) {
      this.$refs.detail.data = this.dataHandel(row)
      this.detailsShow = true
    },
    delete(row) {
      this.$confirm(`确认删除此商品？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeViewRecord(row.id).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getRecirds(this.queryParam, paging)
        this.tableData = res.data.records
        this.tableData.map(item => {
          this.$set(item, 'sysFilePath', item.sysFile.filePath)
        })
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
