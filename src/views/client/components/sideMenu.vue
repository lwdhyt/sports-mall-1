<template>
  <div class="type-menu">
    <div class="title">商品分类：</div>
    <el-tree
      :data="treeData"
      :props="defaultProps"
      :show-checkbox="true"
      :check-on-click-node="true"
      :check-strictly="true"
      node-key="id"
      @check="treeCheck"
      :default-expand-all="true"
      ref="treeForm"
    >
    </el-tree>
  </div>
</template>
<script>
import { getSortTree } from '@/api/client'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id'
      },
      treeData: []
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        this.treeData = await getSortTree().then(res => res.data)
      } catch (error) {}
    },
    treeCheck: function (node, list) {
      if (list.checkedKeys.length == 2) {
        this.$refs.treeForm.setCheckedKeys([node.id])
      }
      this.$store.commit('SET_PRODUCTTYPE', node.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.type-menu {
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 12px rgb(98 107 181 / 25%);
  padding: 20px 30px;
  box-sizing: border-box;
  .title {
    margin-bottom: 30px;
  }
}
</style>
