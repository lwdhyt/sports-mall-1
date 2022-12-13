<template>
  <div class="pictureManage">
    <el-form class="form" ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item class="from-item" label="排序" prop="sortNum">
        <el-input class="from-inp" placeholder="请输入" v-model="form.sortNum"></el-input>
      </el-form-item>
      <el-form-item label="选择文件" prop="filePath">
        <el-upload
          class="imger-uploader"
          :action="upLoadFileUrl"
          :show-file-list="false"
          :before-upload="file => beforeUpload(file)"
        >
          <div class="imger" v-if="form.filePath">
            <img v-if="form.filePath" :src="form.filePath" />
          </div>
          <i v-else class="el-icon-plus imger-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="addImg">新 增</el-button>
        <el-button type="primary" size="mini" @click="operation = true" v-if="!operation"
          >选 择</el-button
        >
        <template v-else>
          <el-button type="primary" size="mini" @click="deleteImgs">删 除</el-button>
          <el-button type="primary" size="mini" @click="checkAll">全 选</el-button>
          <el-button size="mini" @click="cancel">取 消</el-button>
        </template>
      </el-form-item>
    </el-form>
    <div class="imgBox">
      <el-checkbox-group v-model="checkList">
        <div class="item-box">
          <div class="img-item" v-for="img in imgArr" :key="img.id">
            <el-image class="img" :src="img.filePath" :preview-src-list="srcList"> </el-image>
            <el-checkbox v-show="operation" class="checkBox" :label="img.id"><br /></el-checkbox>
          </div>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { uploadFiles } from '@/api/public'
import { getPictures, addPicture, deleteImg } from '@/api/pictureManage'
export default {
  name: 'pictureManage',
  data() {
    return {
      upLoadFileUrl: process.env.VUE_APP_BASE_URL + '/api/sysFiles/fileUpload',
      imgArr: '',
      form: {
        sortNum: '',
        filePath: ''
      },
      rules: {
        filePath: [{ required: true, message: '请选择添加图片', trigger: 'blur' }]
      },
      checkList: [],
      operation: false
    }
  },
  components: {},
  computed: {
    srcList() {
      return this.imgArr.map(item => {
        return item.filePath
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    cancel() {
      this.checkList = []
      this.operation = false
    },
    checkAll() {
      if (this.checkList.length == this.imgArr?.length) {
        this.checkList = []
      } else {
        this.checkList = this.imgArr?.map(item => {
          return item.id
        })
      }
    },
    deleteImgs() {
      const delArr = []
      this.checkList?.forEach(item => {
        delArr.push(deleteImg(item))
      })
      Promise.all(delArr).then(res => {
        const tol = res.length
        const suc = res.filter(r => r.code == 200).length
        this.$message.success(`成功删除${suc}张,删除失败${tol - suc}张`)
        this.getData()
      })
    },
    beforeUpload(file) {
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
        this.form.filePath = res.data?.fileUrl
      })
      return false
    },
    addImg() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addPicture(this.form).then(res => {
            if (res.code == 200) {
              this.$message.success('添加成功')
              this.$refs.form.resetFields()
              this.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    async getData() {
      try {
        const res = await getPictures()
        this.imgArr = res.data
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 400px;
}
::v-deep(.imger-uploader .el-upload) {
  border: 1px dashed rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep(.imger-uploader .el-upload:hover) {
  border-color: #409eff;
}
.imger-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.imger {
  width: 200px;
  height: 150px;
  background-color: #000;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-height: 100%;
    max-width: 100%;
  }
}
.pictureManage {
  display: flex;
  height: 100%;
  flex-direction: column;
  .imgBox {
    flex: 1;
    border: 1px solid #ebeef5;
    margin-bottom: 60px;
    overflow: auto;

    .item-box {
      display: flex;
      flex-wrap: wrap;
      .img-item {
        width: 30%;
        margin: 10px 10px 20px;
        position: relative;
        .img {
          width: 100%;
          padding-top: 50%;
          position: relative;
        }
        .checkBox {
          position: absolute;
          left: 20px;
          top: 20px;
        }
      }
    }
  }
}
::v-deep .el-image__error,
::v-deep .el-image__inner,
::v-deep .el-image__placeholder {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
}
</style>
