<template>
  <div class="card art-custom-card">
    <div class="card-header">
      <div class="title">
        <h4 class="box-title">用户支付排行</h4>
      </div>
    </div>
    <ArtTable
      class="table"
      :data="tableData"
      style="width: 100%"
      size="large"
      :border="false"
      :show-header="false"
      :stripe="false"
      :header-cell-style="{ background: 'transparent' }"
    >
      <template #default>
        <ElTableColumn label="" prop="avatar">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span class="num">{{ scope.$index + 1 }}</span>
              <span class="name">{{ scope.row.username }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="" width="150">
          <template #default="scope">
            <div class="tr">
              {{ scope.row.num }}
            </div>
          </template>
        </ElTableColumn>
      </template>
    </ArtTable>
  </div>
</template>

<script setup lang="ts">
  interface UserTableItem {
    username: string
    province: string
    sex: 0 | 1
    age: number
    num: number
    pro: number
  }

  const ANIMATION_DELAY = 100

  /**
   * 新用户表格数据
   * 包含用户基本信息和完成进度
   */
  const tableData = reactive<UserTableItem[]>([
    {
      username: '中小鱼',
      province: '北京',
      sex: 0,
      age: 22,
      num: 60,
      pro: 0
    },
    {
      username: '何小荷',
      province: '深圳',
      sex: 1,
      age: 21,
      num: 20,
      pro: 0
    },
    {
      username: '誶誶淰',
      province: '上海',
      sex: 1,
      age: 23,
      num: 60,
      pro: 0
    },
    {
      username: '发呆草',
      province: '长沙',
      sex: 0,
      age: 28,
      num: 50,
      pro: 0
    },
    {
      username: '甜筒',
      province: '浙江',
      sex: 1,
      age: 26,
      num: 70,
      pro: 0
    },
    {
      username: '冷月呆呆',
      province: '湖北',
      sex: 1,
      age: 25,
      num: 90,
      pro: 0
    }
  ])

  /**
   * 添加进度条动画效果
   * 延迟后将进度值从 0 更新到目标百分比，触发动画
   */
  const addAnimation = (): void => {
    setTimeout(() => {
      tableData.forEach((item) => {
        item.pro = item.num
      })
    }, ANIMATION_DELAY)
  }

  onMounted(() => {
    addAnimation()
  })
</script>

<style lang="scss"></style>

<style lang="scss" scoped>
  .card {
    width: 100%;
    height: 340px;
    overflow: hidden;

    .card-header {
      padding-left: 25px !important;
    }

    :deep(.el-table__body tr:last-child td) {
      border-bottom: none !important;
    }

    :deep(.el-table__inner-wrapper::before) {
      background-color: transparent;
      border: none;
    }

    :deep(.el-table) {
      margin-top: 0;
    }

    .user-name {
      margin-left: 10px;
    }
  }

  .tr {
    text-align: right;
  }
</style>
