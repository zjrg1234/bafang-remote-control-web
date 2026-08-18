<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="车辆详情"
    width="750px"
    :close-on-click-modal="false"
    append-to-body
    destroy-on-close
  >
    <el-scrollbar max-height="70vh">
      <!-- 1. 基础信息板块 -->
      <div class="section-block">
        <div class="section-title">
          <el-icon><User /></el-icon>
          <span>基础信息</span>
        </div>
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="用户姓名">
            <el-link type="primary" v-if="form.user_name">{{ form.user_name }}</el-link>
            <span v-else>-</span>
          </el-descriptions-item>
          <el-descriptions-item label="用户电话">
            <div class="copyable-text" @click="copyText(form.phone)">
              {{ form.phone || '-' }}
              <el-icon v-if="form.phone"><DocumentCopy /></el-icon>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="车辆名称" :span="2">
            {{ form.vehicle_name || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="车辆状态">
            <el-tag :type="getVehicleStatusType(form.vehicle_status)" effect="plain" size="small">
              {{ form.vehicle_status || '-' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="绑定状态">
            <el-tag :type="form.bind_status === '已绑定' ? 'success' : 'info'" size="small">
              {{ form.bind_status || '-' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="绑定时间">
            {{ form.bind_time || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="接收机">
            {{ form.receiver_id || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="APP发射机">
            <span class="mono-font">{{ form.app_transmitter || '-' }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <!-- 2. 硬件设备板块 -->
      <div class="section-block">
        <div class="section-title">
          <el-icon><Monitor /></el-icon>
          <span>硬件设备</span>
        </div>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-card shadow="never" class="hardware-card">
              <template #header>
                <div class="card-header">
                  <span>方向盘</span>
                  <el-icon><Connection /></el-icon>
                </div>
              </template>
              <div class="hardware-value">{{ form.steering_wheel || '-' }}</div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="never" class="hardware-card">
              <template #header>
                <div class="card-header">
                  <span>遥控器</span>
                  <el-icon><VideoCamera /></el-icon>
                </div>
              </template>
              <div class="hardware-value">{{ form.remoter || '-' }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 3. 行驶与操作数据 -->
      <div class="section-block">
        <div class="section-title">
          <el-icon><Odometer /></el-icon>
          <span>行驶与调试数据</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="statistic-item">
              <div class="label">最高时速</div>
              <div class="value"> {{ form.top_speed || '0' }} <span class="unit">km/h</span> </div>
            </div>
          </el-col>
          <el-col :span="16">
            <el-descriptions :column="2" size="small" border>
              <el-descriptions-item label="方向中位微调">{{
                form.steering_wheel_tuning || '-'
              }}</el-descriptions-item>
              <el-descriptions-item label="油门中位微调">{{
                form.throttle_tuning || '-'
              }}</el-descriptions-item>
              <el-descriptions-item label="方向力度调整">{{
                form.steering_wheel_force || '-'
              }}</el-descriptions-item>
              <el-descriptions-item label="油门力度调整">{{
                form.throttle_force || '-'
              }}</el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
        <div class="mix-control-row">
          <span class="label">混控状态:</span>
          <el-switch v-model="form.mix_control_status" disabled class="mt-2" />
        </div>
      </div>

      <!-- 4. 视频数据 -->
      <div class="section-block">
        <div class="section-title">
          <el-icon><VideoPlay /></el-icon>
          <span>视频与扩展</span>
        </div>
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="车辆特点">
            {{ form.vehicle_features || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="视频清晰度">
            <el-tag type="warning" size="small" effect="plain">{{
              form.video_quality || '-'
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="前摄序列号">
            <div class="copyable-text" @click="copyText(form.front_camera)">
              {{ form.front_camera || '-' }}
              <el-icon v-if="form.front_camera"><DocumentCopy /></el-icon>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="后摄位置">
            {{ form.rear_camera_position || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="后摄序列号" :span="2">
            <div class="copyable-text" @click="copyText(form.rear_camera)">
              {{ form.rear_camera || '-' }}
              <el-icon v-if="form.rear_camera"><DocumentCopy /></el-icon>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-scrollbar>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import {
    User,
    DocumentCopy,
    Monitor,
    Connection,
    VideoCamera,
    Odometer,
    VideoPlay
  } from '@element-plus/icons-vue'
  import { fetchCarDetail } from '@/api/common'

  defineOptions({ name: 'CarDetailDialog' })

  const dialogFormVisible = ref(false)
  const form = ref<any>({})

  // 状态颜色映射
  const getVehicleStatusType = (status: string) => {
    if (!status) return 'info'
    const s = status.toLowerCase()
    if (s.includes('在线') || s.includes('正常')) return 'success'
    if (s.includes('离线') || s.includes('故障')) return 'danger'
    if (s.includes('警告')) return 'warning'
    return 'info'
  }

  // 复制文本功能
  const copyText = (text: string) => {
    if (!text) return
    navigator.clipboard.writeText(text).then(() => {
      ElMessage.success('已复制到剪贴板')
    })
  }

  const handleSubmit = async () => {
    // 这里可以添加编辑保存逻辑，如果是纯详情页面，通常只是关闭
    dialogFormVisible.value = false
  }

  const openDialog = (params: any) => {
    // 重置表单
    form.value = {}

    fetchCarDetail({ id: params }).then((res: { code: number; data: any }) => {
      if (res.code == 200) {
        form.value = { ...res.data }
        dialogFormVisible.value = true
      }
    })
  }

  defineExpose({ openDialog })
</script>

<style lang="scss" scoped>
  // 通用板块样式
  .section-block {
    margin-bottom: 20px;

    .section-title {
      display: flex;
      align-items: center;
      padding-left: 4px;
      margin-bottom: 12px;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      border-left: 4px solid #409eff; // 左侧蓝色装饰条

      .el-icon {
        margin-right: 6px;
        color: #409eff;
      }
    }
  }

  // 可复制文本样式
  .copyable-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #606266;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }

    .el-icon {
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.2s;
    }

    &:hover .el-icon {
      opacity: 1;
    }
  }

  // 等宽字体，用于序列号
  .mono-font {
    font-family: Consolas, Monaco, monospace;
  }

  // 硬件卡片样式
  .hardware-card {
    :deep(.el-card__header) {
      padding: 10px 15px;
      background-color: #f5f7fa;
      border-bottom: 1px solid #ebeef5;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-weight: bold;
      color: #606266;
    }

    .hardware-value {
      padding: 10px 0;
      font-size: 16px;
      font-weight: 500;
      color: #303133;
      text-align: center;
    }
  }

  // 统计数值样式
  .statistic-item {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 15px;
    text-align: center;
    background: #f5f7fa;
    border-radius: 4px;

    .label {
      margin-bottom: 5px;
      font-size: 13px;
      color: #909399;
    }

    .value {
      font-size: 24px;
      font-weight: bold;
      color: #409eff;

      .unit {
        margin-left: 2px;
        font-size: 12px;
        font-weight: normal;
        color: #909399;
      }
    }
  }

  // 混控状态行
  .mix-control-row {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    margin-top: 15px;
    background: #fdf6ec; // 轻微的背景色提示
    border: 1px solid #faecd8;
    border-radius: 4px;

    .label {
      margin-right: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #e6a23c;
    }
  }

  // 滚动条优化
  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }
</style>
