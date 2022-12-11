<template>
  <div class="signUp">
    <p class="title">用户注册</p>
    <el-steps style="width: 80%" :active="active" finish-status="success">
      <el-step title="基本信息"> </el-step>
      <el-step title="密码"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <div class="from-box">
      <el-form
        v-show="!active"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="ruleForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <Distpicker ref="distpicker" v-model="ruleForm.address"></Distpicker>
        </el-form-item>
      </el-form>
      <el-form
        v-show="active == 1"
        :model="passForm"
        :rules="passRules"
        ref="passForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="password">
          <el-input v-model="passForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="passForm.repassword"></el-input>
        </el-form-item>
      </el-form>
      <div class="fin flex-center" v-if="active === 2">
        注册成功<el-link>(去登录{{ countDown }})</el-link>
      </div>
    </div>
    <div class="bottom-btn">
      <el-button type="primary" @click="submitForm" v-if="active < 2">提交</el-button>
      <el-button type="primary" @click="active--" v-if="active && active < 2">上一步</el-button>
      <el-button type="primary" @click="goLogin" v-if="active === 2">去登录</el-button>
    </div>
  </div>
</template>
<script>
import { checkPhone, checkEmail } from '@/utils'
import { mapActions } from 'vuex'
import { signUp } from '@/api/user'
import Distpicker from '@/components/distpicker'

export default {
  components: { Distpicker },
  name: 'signUp',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      countDown: 5,
      ruleForm: {
        avatar: '',
        username: '',
        telephone: '',
        email: '',
        address: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        telephone: [{ required: true, trigger: 'blur', validator: checkPhone }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, trigger: 'blur', validator: checkEmail }]
      },
      passForm: {
        password: '',
        repassword: ''
      },
      passRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern:
              /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/,
            message: '数字、小写，大写字母、特殊符号 至少三种，长8 - 30',
            trigger: 'blur'
          }
        ],
        repassword: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.ruleForm.avatar = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!testmsg) {
        this.$message.error('上传图片格式不对!')
        return
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return testmsg && isLt5M
    },
    submitForm() {
      const formName = this.active ? 'passForm' : 'ruleForm'
      this.$refs[formName].validate(valid => {
        if (this.$refs.distpicker.validate()) return
        if (valid) {
          if (this.active) {
            signUp({ ...this.ruleForm, ...this.passForm }).then(res => {
              if (res.data.code == 200) {
                this.active++
                const timer = window.setInterval(() => {
                  this.countDown--
                  if (!this.countDown) {
                    this.goLogin()
                    clearInterval(timer)
                  }
                }, 1000)
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.active++
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goLogin() {
      this.$router.push('/user/login')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.signUp {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.demo-ruleForm {
  width: 500px;
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
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.from-box {
  height: 500px;
}
.fin {
  height: 100%;
}
</style>
