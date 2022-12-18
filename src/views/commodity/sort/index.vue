<template>
  <div class="commodity-sort">
    <div class="top-btn">
      <el-button size="mini" type="primary" @click="add">新增商品分类</el-button>
    </div>
    <TreeTable
      :treeRow="treeRow"
      :treeData="treeData"
      :loading="loading"
      @operateEvent="operateEvent"
    ></TreeTable>
    <EidtAdd ref="editAdd" v-model="editAddShow" @refresh="getData"></EidtAdd>
  </div>
</template>

<script>
import TreeTable from '@/components/treeTable/index.vue'
import { getTypeTree } from '@/api/system'
import { deleteCommodityType } from '@/api/commodity'
import EidtAdd from './components/eidtAdd.vue'
export default {
  name: 'commodity-sort',
  components: { TreeTable, EidtAdd },
  data() {
    return {
      treeRow: [
        { key: 'name', label: '类型' },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'edit', name: '编辑' },
            { key: 'delete', name: '删除' },
            { key: 'addPeer', name: '添加同级菜单' },
            { key: 'addSub', name: '添加子级菜单' }
          ]
        }
      ],
      treeData: [],
      loading: false,
      editAddShow: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        this.loading = true
        const res = await getTypeTree()
        this.treeData = res.data
        this.loading = false
      } catch (error) {}
    },
    operateEvent(data) {
      this[data.key](data.row)
    },
    add() {
      this.$refs.editAdd.data = null
      this.$refs.editAdd.treeData = this.treeData
      this.editAddShow = true
    },
    edit(row) {
      this.$refs.editAdd.data = row
      this.$refs.editAdd.treeData = this.treeData
      this.editAddShow = true
    },
    delete(row) {
      this.$confirm(`确认删除此商品？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCommodityType(row.id).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    addPeer(row) {
      this.$refs.editAdd.data = { pid: row.pid }
      this.$refs.editAdd.treeData = this.treeData
      this.editAddShow = true
    },
    addSub(row) {
      this.$refs.editAdd.data = { pid: row.id }
      this.$refs.editAdd.treeData = this.treeData
      this.editAddShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
.top-btn {
  margin-bottom: 30px;
}
</style>
