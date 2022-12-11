<template>
  <div class="login">
    <p class="title">运动用品购物网站</p>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-link class="zc" @click="goSingUp">注册</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions(['Login']),
    goSingUp() {
      this.$router.push('/user/signUp')
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.Login(this.ruleForm).then(res => {
            if (res.data.code == 200) {
              this.$router.push('/homePage')
              this.$message.success('登录成功')
              console.log(this.$store.getters.getToken)
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 800px;
}
.demo-ruleForm {
  width: 400px;
  position: relative;
  .zc {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
.title {
  font-size: 60px;
  line-height: 200px;
  font-weight: 700;
}
</style>
