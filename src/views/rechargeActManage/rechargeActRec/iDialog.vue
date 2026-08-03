<template>
  <el-dialog v-model="dialogVisible" title="详情" width="600">
    <div>
      <el-form ref="formRef" :model="formData" label-width="120px" label-position="right">
        <el-form-item label="活动记录ID:">
          <el-input v-model="formData.activity_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="专区:">
          <el-input v-model="formData.special_area_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名称:">
          <el-input v-model="formData.user_name" disabled></el-input>
        </el-form-item>

        <el-form-item label="用户电话:">
          <el-input v-model="formData.phone_number" disabled></el-input>
        </el-form-item>

        <el-form-item label="充值金额:">
          <el-input v-model="formData.amount" disabled></el-input>
        </el-form-item>

        <el-form-item label="赠送能量:">
          <el-input v-model="formData.send_money" disabled></el-input>
        </el-form-item>

        <el-form-item label="限制次数:">
          <el-input v-model="formData.num" disabled></el-input>
          <p :style="{ color: 'red' }">注：0为无限制</p>
        </el-form-item>

        <el-form-item label="充值活动ID:">
          <el-input v-model="formData.id" disabled></el-input>
        </el-form-item>

        <el-form-item label="支付记录ID:">
          <el-input v-model="formData.pay_id" disabled></el-input>
        </el-form-item>

        <el-form-item label="能量记录ID:">
          <el-input v-model="formData.energy_id" disabled></el-input>
        </el-form-item>

        <!-- <el-form-item label="备注:">
          <el-input v-model="formData.remark" placeholder="备注"></el-input>
        </el-form-item> -->
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  defineOptions({ name: 'RechargeActRecDialog' })

  const dialogVisible = ref(false)
  const formData = ref({
    activity_id: '',
    special_area_name: '',
    user_name: '',
    phone_number: '',
    amount: '',
    send_money: '',
    num: '',
    time: '',
    id: '',
    pay_id: '',
    energy_id: ''
  })

  const openDialog = (row: any) => {
    dialogVisible.value = true

    formData.value = row
  }

  defineExpose({
    openDialog
  })
</script>

<style lang="scss" scoped>
  :deep(.el-form-item--default) {
    margin-bottom: 15px !important;
  }

  :deep(.el-icon.avatar-uploader-icon) {
    width: 100px !important;
    height: 100px !important;
  }
</style>
