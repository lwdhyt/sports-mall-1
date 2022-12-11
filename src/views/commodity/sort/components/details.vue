<template>
  <el-dialog
    title="订单详情"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="80%"
    :before-close="close"
    center
  >
    <div class="col-item">
      <span class="label">订单编号:</span><span class="value">{{ data.orderNum }}</span>
    </div>
    <div class="col-item">
      <span class="label">商品名称:</span
      ><span class="value">{{ data?.orderProduct?.productName }}</span>
    </div>
    <div class="col-item">
      <span class="label">商品主图:</span>
      <div class="imges">
        <img :src="data?.orderProduct?.sysFile?.filePath" alt="" />
      </div>
      <span class="label">商品展示图:</span>
      <div class="imges">
        <img :src="data?.orderProduct?.sysFileList?.filePath" alt="" />
      </div>
    </div>
    <div class="col-item">
      <span class="label">商品分类:</span
      ><span class="value">{{ data?.orderProduct?.productType }}</span>
    </div>
    <div class="col-item">
      <span class="label">订单总价:</span><span class="value">{{ data?.moneyTotal }}</span>
    </div>
    <div class="col-item">
      <span class="label">优惠后总价:</span><span class="value">{{ data?.saleMoneyTotal }}</span>
    </div>
    <div class="col-item">
      <span class="label">下单时间:</span><span class="value">{{ data?.orderTime }}</span>
    </div>
    <div class="col-item">
      <span class="label">配送地址:</span><span class="value">{{ data?.address }}</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  model: {
    prop: 'fatherShow',
    event: 'shoChange'
  },
  props: {
    fatherShow: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      childShow: this.fatherShow
    }
  },
  watch: {
    fatherShow(val) {
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
.col-item {
  font-size: 20px;
  line-height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .label {
    display: inline-block;
    width: 150px;
    text-align: right;
    margin-right: 30px;
  }
  .imges {
    width: 250px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba($color: #000000, $alpha: 0.3);
    display: inline-block;
    margin: 20px 10px 20px 0;
    img {
      max-height: 100%;
      max-width: 100%;
    }
  }
}
</style>
