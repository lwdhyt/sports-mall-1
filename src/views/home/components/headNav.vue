<template>
  <div class="headNav">
    <div class="pro-name">运动用品购物管理后台</div>
    <div class="info">
      <div class="log imges"><img :src="userInfo?.avatar" alt="" /></div>
      <div class="name">欢迎您{{ userInfo?.username }}</div>
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="avatar imges"><img :src="userInfo?.avatar" alt="" /></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="editPassWord">修改密码</el-dropdown-item>
          <el-dropdown-item command="loginLog">登录日志</el-dropdown-item>
          <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Details ref="detail" v-model="detailsShow"></Details>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getUserInfoByToken } from '@/api/user'
import Details from '../../system/user/components/details.vue'
export default {
  name: 'headNav',
  components: { Details },
  data() {
    return {
      userInfo: null,
      detailsShow: false
    }
  },
  computed: {},
  created() {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['Logout']),
    handleCommand(command) {
      if (command == 'info') {
        this.info()
      } else if (command == 'editPassWord') {
        this.editPassWord()
      } else if (command == 'loginLog') {
        this.loginLog()
      } else if (command == 'signOut') {
        this.signOut()
      }
    },
    info() {
      this.$refs.detail.data = this.userInfo
      this.$refs.detail.title = '个人信息'
      this.detailsShow = true
    },
    editPassWord() {},
    loginLog() {},
    async getUserInfo() {
      try {
        this.userInfo = await getUserInfoByToken().then(res => res.data)
        console.log(this.userInfo)
      } catch (error) {}
    },
    signOut() {
      this.$confirm('确认推出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.Logout().then(() => {
            window.location.reload()
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
  height: 72px;
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
}
</style>
