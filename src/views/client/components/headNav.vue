<template>
  <div class="headNav">
    <div class="pro-name">运动商品购物管理后台</div>
    <div class="search">
      <el-input v-model="searchValue" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="info">
      <div class="name">欢迎您{{ userInfo?.username }}</div>
      <el-dropdown @command="handleCommand">
        <div class="avatar imges"><img :src="userInfo?.avatar" alt="" /></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="editInfo">修改资料</el-dropdown-item>
          <el-dropdown-item command="editPassWord">修改密码</el-dropdown-item>
          <el-dropdown-item command="myCollect">我的收藏</el-dropdown-item>
          <el-dropdown-item command="orderCenter">订单中心</el-dropdown-item>
          <el-dropdown-item command="lookRecord">浏览记录</el-dropdown-item>
          <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Details ref="detail" v-model="detailsShow" @edit="edit"></Details>
    <Edit ref="edit" v-model="editShow" @refresh="getUserInfo"></Edit>
    <EditPass ref="editPass" v-model="editPassShow" @refresh="getUserInfo"></EditPass>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Details from './details.vue'
import Edit from './edit.vue'
import store from '@/store'
import EditPass from './editPassword.vue'
export default {
  name: 'headNav',
  components: { Details, Edit, EditPass },
  data() {
    return {
      detailsShow: false,
      editShow: false,
      editPassShow: false,
      searchValue: ''
    }
  },
  computed: {
    userInfo() {
      return store.getters.getUserInfo
    }
  },
  created() {},
  methods: {
    ...mapActions(['Logout', 'GetInfo']),
    handleCommand(command) {
      if (command == 'info') {
        this.info()
      } else if (command == 'editPassWord') {
        this.editPassWord()
      } else if (command == 'loginLog') {
        this.loginLog()
      } else if (command == 'signOut') {
        this.signOut()
      } else if (command == 'editInfo') {
        this.edit()
      } else if (command == 'myCollect') {
        this.$router.push('/client/collection')
      } else if (command == 'orderCenter') {
        this.$router.push('/client/orderCenter')
      } else if (command == 'lookRecord') {
        this.$router.push('/client/record')
      }
    },
    async getUserInfo() {
      this.GetInfo()
    },
    search() {
      this.$store.commit('SET_SEARCHTEXT', this.searchValue)
    },
    info() {
      this.$refs.detail.data = this.userInfo
      this.$refs.detail.title = '个人信息'
      this.detailsShow = true
    },
    edit() {
      this.$refs.edit.data = this.userInfo
      this.editShow = true
    },
    editPassWord() {
      this.$refs.editPass.data = this.userInfo
      this.editPassShow = true
    },
    loginLog() {
      this.$router.push({ name: 'systemLog', params: { username: this.userInfo.username } })
    },
    signOut() {
      this.$confirm('确认退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.Logout().then(() => {
            this.$router.push('/user/login')
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.headNav {
  width: 100%;
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .pro-name {
    margin-left: 30px;
    font-size: 25px;
    font-weight: 400;
  }
  .info {
    height: 100%;
    margin-right: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .imges {
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      border: 1px solid rgba($color: #000000, $alpha: 0.3);
      margin-left: 20px;
      overflow: hidden;
    }
    .name {
      margin-left: 20px;
    }
    .log {
      height: 50px;
    }
  }
  .search {
    width: 500px;
    display: flex;
    ::v-deep.el-input {
      border-radius: 5px 0 0 5px !important;
    }
  }
}
</style>
