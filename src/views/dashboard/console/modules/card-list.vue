<template>
  <ElRow :gutter="20" class="card-list">
    <ElCol v-for="(item, index) in dataList" :key="index" :sm="12" :md="6" :lg="6">
      <div class="card art-custom-card">
        <div class="card-first">
          <span class="des subtitle">{{ item.des }}</span>
          <div v-if="item.dataDesc">
            <el-tooltip class="box-item" effect="dark" :content="item.dataDesc" placement="top">
              <i class="iconfont-sys">&#xe6c9;</i>
            </el-tooltip>
          </div>
        </div>

        <ArtCountTo class="number box-title" :target="cardData[item.num]" :duration="1300" />
        <div class="change-box">
          <span class="change-text">{{ item.dayDes }} {{ item.dayNum }}</span>
        </div>
      </div>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
  const props = defineProps({
    cardData: {
      type: Object,
      default: () => ({})
    }
  })

  /**
   * 卡片统计数据列表
   * 展示总访问次数、在线访客数、点击量和新用户等核心数据指标
   */
  const dataList = computed(() => [
    {
      des: '总销售额',
      icon: '&#xe721;',
      startVal: 0,
      duration: 1000,
      num: 'total_sale',
      dayDes: '今日销售额',
      dayNum: props.cardData?.today_sale,
      dataDesc: '累计销售额，包含已经退款的订单'
    },
    {
      des: '预约次数',
      icon: '&#xe724;',
      startVal: 0,
      duration: 1000,
      num: 'total_make',
      dayDes: '今日预约次数',
      dayNum: props.cardData?.today_make,
      dataDesc: '用于预约总次数'
    },
    {
      des: '支付笔数',
      icon: '&#xe7aa;',
      startVal: 0,
      duration: 1000,
      num: 'total_payment',
      dayDes: '今日支付笔数',
      dayNum: props.cardData?.today_payment,
      dataDesc: '用户充值次数'
    },
    {
      des: '退款总额',
      icon: '&#xe82a;',
      startVal: 0,
      duration: 1000,
      num: 'total_refund',
      dayDes: '今日退款金额',
      dayNum: props.cardData?.today_refund,
      dataDesc: ''
    }
  ])
</script>

<style lang="scss" scoped>
  .card-list {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    background-color: transparent !important;

    .art-custom-card {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 140px;
      padding: 0 18px;
      list-style: none;
      transition: all 0.3s ease;

      .des {
        display: block;
        height: 14px;
        font-size: 14px;
        line-height: 14px;
      }

      .number {
        display: block;
        margin-top: 10px;
        font-size: 28px;
        font-weight: 400;
      }

      .change-box {
        display: flex;
        align-items: center;
        margin-top: 20px;
        border-top: 1px solid #f5f5f5;

        .change-text {
          display: block;
          padding-top: 10px;
          font-size: 13px;
          color: var(--art-text-gray-600);
        }

        .change {
          display: block;
          margin-left: 5px;
          font-size: 13px;
          font-weight: bold;

          &.text-success {
            color: var(--el-color-success);
          }

          &.text-danger {
            color: var(--el-color-danger);
          }
        }
      }
    }

    .card-first {
      display: flex;
      justify-content: space-between;
    }
    $icon-size: 15px;

    .iconfont-sys {
      width: $icon-size;
      height: $icon-size;
      margin: auto;
      overflow: hidden;
      font-size: $icon-size;
      line-height: $icon-size;
      color: var(--el-color-primary) !important;
      text-align: center;
    }
  }

  .dark {
    .card-list {
      .art-custom-card {
        .iconfont-sys {
          background-color: #232323 !important;
        }
      }
    }
  }

  .iconfont-sys {
    cursor: pointer;
  }
</style>
