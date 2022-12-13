<template>
  <div class="headNav">
    <div class="pro-name">xxx运动商城</div>
    <div class="info">
      <div class="log imges"><img src="@/assets/icon/home.png" alt="" /></div>
      <div class="name">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎你<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="avatar imges"><img src="@/assets/icon/home.png" alt="" /></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getUserInfoByToken } from '@/api/user'
export default {
  name: 'headNav',
  data() {
    return {}
  },
  computed: {},
  created() {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['Logout']),
    handleCommand(command) {
      if (command == 'signOut') {
        this.signOut()
      }
    },
    async getUserInfo() {
      try {
        const res = await getUserInfoByToken()
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
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-height: 100%;
        max-width: 100%;
      }
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid rgba($color: #000000, $alpha: 0.3);
      margin-left: 20px;
      overflow: hidden;
    }
    .name {
      cursor: pointer;
      margin-left: 20px;
    }
    .log {
      height: 50px;
    }
  }
}
</style>
