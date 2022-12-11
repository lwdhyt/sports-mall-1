<template>
  <el-menu
    :default-active="editableTabsValue"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    :router="true"
    active-text-color="#ffd04b"
  >
    <template v-for="item in menuList">
      <el-submenu v-if="item.children" :index="item.path">
        <template slot="title"> <Icon></Icon>{{ item.meta.title }} </template>
        <el-menu-item
          v-for="itemc in item.children"
          :key="itemc.path"
          :index="itemc.path"
          @click="selectMenu(itemc)"
          :route="itemc.path"
          >{{ itemc.meta.title }}</el-menu-item
        >
      </el-submenu>

      <el-menu-item v-else :index="item.path" @click="selectMenu(item)" :route="item.path">
        <template slot="title"> <Icon></Icon>{{ item.meta.title }} </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { menuList } from '@/config/menu'
export default {
  data() {
    return {
      menuList: menuList
    }
  },
  computed: {
    editableTabsValue() {
      return this.$route.path
    }
  },
  methods: {
    selectMenu(item) {
      this.$store.commit('addTab', item)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep(.el-submenu .el-menu-item) {
  padding-left: 50px !important;
}
</style>
