<template>
  <el-dialog
    title="商品详情"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="600px"
    :before-close="close"
    center
    ><Exhibition ref="exhibition" :formArr="formArr" :data="data"></Exhibition>
  </el-dialog>
</template>
<script>
import Exhibition from '@/components/exhibition'
export default {
  components: { Exhibition },
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
        { type: 'text', label: '商品名称', prop: 'productName' },
        { type: 'text', label: '品牌商', prop: 'brandingBusiness' },
        { type: 'img', label: '商品主图', prop: 'sysFile', url: 'filePath' },
        { type: 'imgs', label: '商品展示图', prop: 'sysFileList', url: 'filePath' },
        { type: 'text', label: '商品分类', prop: 'productType' },
        { type: 'text', label: '进价', prop: 'purchasingPrice' },
        { type: 'text', label: '原价', prop: 'originalPrice' },
        { type: 'text', label: '促销价', prop: 'promotionPrice' },
        { type: 'text', label: '排序', prop: 'sortNum' }
      ],
      data: null
    }
  },
  watch: {
    fatherShow(val) {
      if (!val) {
        this.$refs.exhibition.resetForm()
      } else {
        this.$nextTick(() => {
          this.$refs.exhibition.echoData()
        })
      }
      this.childShow = val
    }
  },
  computed: {},
  methods: {
    close() {
      this.$emit('shoChange', false)
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
