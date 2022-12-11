<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    :label-width="labelWidth + 'px'"
    :style="{ width: width + 'px' }"
  >
    <el-form-item v-for="item in formArr" :key="item.prop" :label="item.label" :prop="item.prop">
      <template v-if="item.type == 'input'">
        <el-input v-model="ruleForm[item.prop]"></el-input>
      </template>

      <!-- :on-success="(res, file) => handleSuccess(res, file, item.prop)" -->
      <template v-else-if="item.type == 'upload'">
        <el-upload
          class="avatar-uploader"
          :action="upLoadFileUrl"
          :show-file-list="false"
          :before-upload="file => beforeUpload(file, item.prop)"
        >
          <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </template>

      <template v-else-if="item.type == 'address'">
        <Distpicker ref="distpicker" v-model="ruleForm[item.prop]"></Distpicker>
      </template>
    </el-form-item>
  </el-form>
</template>
<script>
import { checkGroup } from '@/utils'
import Distpicker from '@/components/distpicker'
import { uploadFiles } from '@/api/public'

export default {
  components: { Distpicker },
  name: 'formList',
  props: {
    // 表单类型列表
    formArr: {
      type: Array,
      default: () => []
    },
    // 表单整体宽度
    width: {
      type: Number,
      default: 500
    },
    // label宽度
    labelWidth: {
      type: Number,
      default: 100
    }
  },
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
      ruleForm: {},
      rules: {},
      upLoadFileUrl: process.env.VUE_APP_BASE_URL + '/api/sysFiles/fileUpload'
    }
  },
  created() {
    this.addFromField()
  },
  methods: {
    // 添加字段及校验
    addFromField() {
      this.formArr.forEach(item => {
        this.$set(this.ruleForm, item.prop, '')
        if (item.req) {
          let check = []
          if (item.check) {
            check = [{ required: true, trigger: 'blur', validator: checkGroup[item.check] }]
          } else if (item.type == 'address') {
            check = [{ required: true, trigger: 'blur' }]
          } else {
            check = [{ required: true, message: '请输入' + item.label, trigger: 'blur' }]
          }
          this.$set(this.rules, item.prop, check)
        }
      })
    },
    handleSuccess(res, file, prop) {
      this.ruleForm[prop] = URL.createObjectURL(file.raw)
    },
    beforeUpload(file, prop) {
      var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!testmsg) {
        this.$message.error('上传图片格式不对!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      const formData = new FormData()
      formData.append('multipartFile', file)
      uploadFiles(formData).then(res => {
        this.ruleForm[prop] = res.data
        console.log('this.ruleForm[prop]', this.ruleForm[prop])
      })
      return false
    },
    checkFrom() {
      this.$refs.ruleForm.validate(valid => {
        if (this.$refs.distpicker.validate()) return
        if (valid) {
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
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
::v-deep .el-form-item__content {
  line-height: 0;
}
</style>
