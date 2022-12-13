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
        <el-input
          v-model="ruleForm[item.prop]"
          :placeholder="'请输入' + item.label"
          clearable
        ></el-input>
      </template>

      <template v-if="item.type == 'password'">
        <el-input
          show-password
          clearable
          v-model="ruleForm[item.prop]"
          :placeholder="'请输入' + item.label"
        ></el-input>
      </template>
      <template v-else-if="item.type == 'upload'">
        <el-upload
          class="avatar-uploader"
          :action="upLoadFileUrl"
          :show-file-list="false"
          :before-upload="file => beforeUpload(file, item.prop)"
        >
          <img v-if="ruleForm[item.prop]" :src="ruleForm[item.prop]" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </template>
      <template v-else-if="item.type == 'radio'">
        <el-radio-group v-model="ruleForm[item.prop]">
          <el-radio v-for="rad in item.dict" :key="rad.val" :label="rad.val">{{
            rad.text
          }}</el-radio>
        </el-radio-group>
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
    },
    // 回显数据
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
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
            if (item.check != 'orPass') {
              check = [{ required: true, trigger: 'blur', validator: checkGroup[item.check] }]
            } else {
              check = [
                {
                  required: true,
                  trigger: 'blur',
                  validator: (rule, value, callback) =>
                    this.validatePass(rule, value, callback, item.link)
                }
              ]
            }
          } else if (item.type == 'address') {
            check = [{ required: true, trigger: 'blur' }]
          } else {
            check = [{ required: true, message: '请输入' + item.label, trigger: 'blur' }]
          }
          this.$set(this.rules, item.prop, check)
        }
      })
    },
    validatePass(rule, value, callback, link) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm[link]) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    // 回显
    echoData() {
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = this.data?.[key]
      })
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
        this.ruleForm[prop] = res.data?.fileUrl
      })
      return false
    },
    async checkFrom() {
      let valid = await this.$refs.ruleForm.validate()
      this.$refs.distpicker && (valid = await this.$refs.distpicker.validate())
      return valid
    },
    getData() {
      const params = {}
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] && (params[key] = this.ruleForm[key])
      })
      return params
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = ''
      })
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
</style>
