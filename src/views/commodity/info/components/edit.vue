<template>
  <el-dialog
    :title="pupType + '商品'"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="600px"
    :before-close="close"
    center
    ><FormLists ref="formlists" :formArr="formArr" :data="data"></FormLists>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确 认</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import FormLists from '@/components/formLists'
import { saveCommodityInfo } from '@/api/commodity'
import { getTypeTree } from '@/api/system'
export default {
  components: { FormLists },
  model: {
    prop: 'fatherShow',
    event: 'shoChange'
  },
  props: {
    fatherShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      childShow: this.fatherShow,
      formArr: [
        { type: 'input', label: '商品名称', prop: 'productName', req: true },
        { type: 'input', label: '品牌商', prop: 'brandingBusiness', req: true },
        { type: 'upImg', label: '商品主图', prop: 'sysFilePath' },
        { type: 'upImgList', label: '商品展示图', prop: 'sysFileListPath' },
        {
          type: 'radioTree',
          label: '商品分类',
          prop: 'productTypeId',
          treeData: [],
          value: 'id',
          name: 'name',
          req: true
        },
        { type: 'input', label: '进价', prop: 'purchasingPrice', req: true },
        { type: 'input', label: '原价', prop: 'originalPrice', req: true },
        { type: 'input', label: '促销价', prop: 'promotionPrice', req: true },
        { type: 'input', label: '排序', prop: 'sortNum', req: true }
      ],
      data: null
    }
  },
  watch: {
    fatherShow(val) {
      if (!val) {
        this.$refs.formlists.resetForm()
      } else {
        this.getTreeData()
        // 数据处理
        this.$nextTick(() => {
          this.$refs.formlists.echoData()
        })
      }
      this.childShow = val
    }
  },
  computed: {
    pupType() {
      return this.data ? '编辑' : '新增'
    }
  },
  methods: {
    close() {
      this.$emit('shoChange', false)
    },
    async getTreeData() {
      try {
        const res = await getTypeTree()
        const treeData = res.data
        this.formArr.find(item => item.prop == 'productTypeId').treeData = treeData
      } catch (error) {}
    },
    async confirm() {
      // try {
      const valid = await this.$refs.formlists.checkFrom()
      if (valid) {
        const params = this.dataHandel()
        const res = await saveCommodityInfo(params)
        if (res.code == 200) {
          this.$message.success(this.pupType + '成功')
          this.close()
          this.$emit('refresh')
        } else {
          this.$message.error(res.msg)
        }
      }
      // } catch (error) {}
    },
    dataHandel() {
      const params = this.$refs.formlists.getData()
      this.data && (params.id = this.data.id)
      params.productTypeId = params.productTypeId?.[params.productTypeId.length - 1]
      params.sysFile = {}
      params.sysFileList = []
      params.sysFile.filePath = params.sysFilePath
      params.sysFileListPath.forEach(item => {
        params.sysFileList.push({ filePath: item })
      })
      return params
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.el-dialog__wrapper {
  position: absolute !important;
}
::v-deep.v-modal {
  position: absolute !important;
}
</style>
