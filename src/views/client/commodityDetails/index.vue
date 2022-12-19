<template>
  <Exhibition ref="exhibition" :formArr="formArr" :data="data"></Exhibition>
</template>
<script>
import Exhibition from '@/components/exhibition'
import router from '@/router'
export default {
  components: { Exhibition },
  data() {
    return {
      childShow: this.fatherShow,
      formArr: [
        { type: 'text', label: '商品名称', prop: 'productName' },
        { type: 'text', label: '品牌商', prop: 'brandingBusiness' },
        { type: 'img', label: '商品主图', prop: 'sysFilePath' },
        { type: 'imgs', label: '商品展示图', prop: 'sysFileListPath' },
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
  computed: {
    id() {
      return this.$route.query.id
    }
  },
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
