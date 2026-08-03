<template>
  <el-dialog v-model="dialogFormVisible" title="详情" width="700">
    <el-form :model="form" label-position="right" label-width="120px">
      <el-form-item label="退款原因：">
        <span>{{ form.refund_cause1 }}</span>
      </el-form-item>
      <el-form-item label="退款状态：">
        <el-radio-group v-model="form.appeal_status" @change="handleAppealStatusChange">
          <el-radio label="0" :value="1">待处理</el-radio>
          <el-radio label="1" :value="2">已处理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="退款选项：">
        <el-radio-group v-model="form.payment_type">
          <el-radio label="0" :value="1">电池 </el-radio>
          <el-radio label="1" :value="2">能量 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="平台回复信息：">
        <el-radio-group v-model="form.platform_reply" @change="handlePlatformReplyChange">
          <el-radio v-for="item in platformReplyInfoRea" :label="item.label" :key="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手动回复：" v-if="form.platform_reply == '其他'">
        <el-input v-model="form.platform_reply2" placeholder="请输入平台回复信息" />
      </el-form-item>
      <!-- <div v-if="form.appeal_status == 2"> -->
      <el-form-item label="支付总额：">
        <span>{{ form.amount }}</span>
      </el-form-item>
      <el-form-item label="可退款金额：">
        <span>{{ form.refundable_amount }}</span>
      </el-form-item>
      <el-form-item label="退款金额：">
        <el-input v-model="form.refund_amount2" placeholder="请输入退款金额" />
      </el-form-item>
      <el-form-item label="退款原因：">
        <el-radio-group v-model="form.refund_cause">
          <el-radio
            v-for="item in tuikuanOptionsRea"
            @click.prevent="handleToggleRefundCause(item.label)"
            :label="item.label"
            :key="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手动回复：" v-if="form.refund_cause == '其他'">
        <el-input v-model="form.refund_cause2" placeholder="请输入退款原因" />
      </el-form-item>
      <!-- </div> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { platformReplyInfo, tuikuanOptions } from '@/config/constant'
  import { handleOrderAppeal } from '@/api/orderManage'

  defineOptions({ name: 'AppeaInfoDialog' })

  const dialogFormVisible = ref(false)

  const platformReplyInfoRea = platformReplyInfo
  const tuikuanOptionsRea = tuikuanOptions

  // 表单搜索初始值
  const form = ref({
    payment_type: '',
    id: '1',
    user_name: '', //用户名称
    order_no: '', //预约号
    phone: '', //手机号
    venue_id: 1, //场地id
    venue_name: '',
    vehicle_id: 1, //车辆id
    vehicle_name: '',
    reservation_status: 2, //预约状态
    amount: 10, //金额
    time: '', //时间
    billing_method: 0, //计费方式0按时间 1按次
    appeal_status: 1, //申诉状态 0未申请 1待处理 2已处理
    refund_type: 0, //退款 0未退 1 已退
    refund_cause: '', //申诉原因
    platform_reply: '', //平台回复
    image: '', //申诉图片
    refund_amount2: '',
    platform_reply2: '',
    refund_cause2: '',
    refund_cause1: '',
    refundable_amount: ''
  })

  const handleSubmit = async () => {
    if (!form.value.payment_type) {
      ElMessage.error('请选择退款选项')
      return
    }
    if (form.value.refund_type == 1) {
      if (form.value.refund_cause == '其他' && !form.value.refund_cause2) {
        ElMessage.error('请输入退款原因')
        return
      }
      if (form.value.refund_cause != '' && !form.value.refund_amount2) {
        ElMessage.error('请输入退款金额')
        return
      }
    }

    handleOrderAppeal({
      id: form.value.id,
      type: form.value.payment_type,
      refund_type: form.value.refund_type,
      appeal_status: form.value.appeal_status,
      refund_amount: form.value.refund_amount2 || '',
      refund_cause: form.value.refund_cause || form.value.refund_cause2 || '',
      platform_reply: form.value.platform_reply || form.value.platform_reply2
    }).then((res) => {
      if (res.code == 200) {
        ElMessage.success('处理成功')
        dialogFormVisible.value = false
      } else {
        ElMessage.error(res.msg)
      }
    })

    dialogFormVisible.value = false
  }

  const openDialog = (params: any) => {
    dialogFormVisible.value = true
    form.value = {
      ...params,
      refund_cause1: params.refund_cause || '-',
      refund_amount2: '',
      platform_reply2: '',
      refund_cause2: ''
    }
    // 待处理的话 给已处理
    if (params.appeal_status == 1) {
      form.value.appeal_status = 2

      form.value.platform_reply = '已退款稍后到'
    }
  }
  defineExpose({ openDialog })

  const handleAppealStatusChange = (val: any) => {
    form.value.appeal_status = val
  }

  const handlePlatformReplyChange = (val: any) => {
    console.log(val)
  }

  const handleToggleRefundCause = (val: any) => {
    if (form.value.refund_cause === val) {
      // 如果点击的是当前已选中的项，则取消选中（置为空字符串）
      form.value.refund_cause = ''
    } else {
      // 否则正常选中该项
      form.value.refund_cause = val
    }
  }
</script>
