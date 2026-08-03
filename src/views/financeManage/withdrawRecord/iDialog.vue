<template>
  <el-dialog v-model="dialogFormVisible" :title="flag == 0 ? '详情' : '编辑'" width="700">
    <el-form :model="form" label-position="right" label-width="120px">
      <el-form-item label="提现用户：">
        <el-input v-model="form.agent_name" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="提现金额：">
        <el-input v-model="form.withdraw_amount" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="提现后余额：">
        <el-input v-model="form.balance" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="提现账号类型：">
        <el-radio-group v-model="form.withdraw_type" disabled>
          <el-radio
            v-for="item in type"
            :key="item.value"
            :label="item.value"
            :value="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收款人姓名：">
        <el-input v-model="form.withdraw_name" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="银行：">
        <el-input v-model="form.bank" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="银行卡号：">
        <el-input v-model="form.bank_number" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="审核状态：">
        <el-radio-group v-model="form.status" :disabled="!flag">
          <el-radio
            v-for="item in status"
            :key="item.value"
            :label="item.value"
            :value="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
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
  import { PAYMENT_METHOD, AUDIT_STATUS } from '@/config/constant'
  import { withdrawAudit } from '@/api/financeManage'
  defineOptions({ name: 'WithdrawRecordDetailDialog' })
  const dialogFormVisible = ref(false)

  const type = ref(PAYMENT_METHOD)
  const status = ref(AUDIT_STATUS)

  const flag = ref(0)

  // 表单搜索初始值
  const form = ref({
    id: '',
    agent_name: '测试',
    withdraw_type: 1, //提现类型：1微信，支付宝，3银行卡，4momo 固定写死
    withdraw_amount: '', //提现金额
    balance: '', //提现后余额
    status: 1, //状态0：待审核1：审核通过 2未通过
    withdraw_name: '', //提现名字
    withdraw_account: '', //账号
    bank: '', //银行
    bank_number: '' //银行卡号
  })
  const emit = defineEmits(['refresh'])
  const handleSubmit = async () => {
    if (flag.value === 0) {
      dialogFormVisible.value = false
      return
    }
    const params = {
      id: form.value.id,
      status: form.value.status
    }
    const res = await withdrawAudit(params)
    if (res.code === 0) {
      ElMessage.success('操作成功')
      emit('refresh')
    } else {
      ElMessage.error(res.msg || '操作失败')
    }
    dialogFormVisible.value = false
  }

  const openDialog = (params: any) => {
    dialogFormVisible.value = true
    form.value = {
      ...params.row
    }
    flag.value = params.flag
  }
  defineExpose({ openDialog })
</script>
