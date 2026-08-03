<template>
  <el-dialog v-model="dialogFormVisible" title="详情" width="700">
    <el-form :model="form" label-position="right" label-width="120px">
      <el-form-item label="场地名称：">
        <el-input v-model="form.venue_name" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="预约号：">
        <el-input v-model="form.order_no" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="车辆：">
        <el-input v-model="form.vehicle_name" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="预约状态：">
        <el-input v-model="form.reservation_status" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="驾驶开始时间：">
        <el-input v-model="form.start_time" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="驾驶结束时间：">
        <el-input v-model="form.end_time" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="计费方式：">
        <el-input v-model="form.billing_method" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="计费规则：">
        <el-input v-model="form.billing_rules" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="支付类型：">
        <el-input v-model="form.payment_type" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="支付金额：">
        <el-input v-model="form.payment_amount" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-input v-model="form.order_time" disabled autocomplete="off" />
      </el-form-item>
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
  import {
    ORDER_STATUS_OPTIONS,
    APPEAL_STATUS_OPTIONS,
    BILLING_TYPE_OPTIONS,
    PAYMENT_TYPE_OPTIONS
  } from './constant'

  defineOptions({ name: 'OrderRecordDetailDialog' })

  const dialogFormVisible = ref(false)

  // 表单搜索初始值
  const form = ref({
    user_name: '', //用户
    order_no: '', //预约号
    phone: '', //手机
    venue_id: 1, //场地id
    venue_name: '', //场地名称
    vehicle_id: 12, //车辆ID
    vehicle_name: '', //车辆名称
    payment_type: 1, //支付类型  1电池 2能量
    reservation_status: 2, //预约状态 1已预约 2待使用 3使用中 4已完成 5已取消
    payment_amount: 10, //金额
    start_time: '', //开始时间
    end_time: '', //结束时间
    order_time: '', //订单生成时间
    billing_method: 0, //计费方式0按时间 1按次
    appeal_status: 0, //申诉状态 0未申请 1待处理 2已处理
    billing_rules: '', //计费规则
    special_area: 1,
    special_area_name: '' //专区
  })

  const handleSubmit = async () => {
    dialogFormVisible.value = false
  }

  const openDialog = (params: any) => {
    dialogFormVisible.value = true
    form.value = {
      ...params,
      reservation_status:
        ORDER_STATUS_OPTIONS.find((item: any) => item.value === params.reservation_status)?.label ||
        '-',
      billing_method:
        BILLING_TYPE_OPTIONS.find((item: any) => item.value === params.billing_method)?.label ||
        '-',
      payment_type:
        PAYMENT_TYPE_OPTIONS.find((item: any) => item.value === params.payment_type)?.label || '-',
      appeal_status:
        APPEAL_STATUS_OPTIONS.find((item: any) => item.value === params.appeal_status)?.label || '-'
    }
  }
  defineExpose({ openDialog })
</script>
