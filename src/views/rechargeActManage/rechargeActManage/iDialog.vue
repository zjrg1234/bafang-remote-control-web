<template>
  <el-dialog v-model="dialogVisible" :title="txt" width="600">
    <div>
      <el-form
        ref="formRef"
        :model="formData"
        label-width="120px"
        label-position="right"
        :rules="rules"
      >
        <el-form-item label="充值金额" prop="payment_amount">
          <el-input v-model="formData.payment_amount" placeholder="请输入充值金额"></el-input>
        </el-form-item>
        <el-form-item label="赠送能量" prop="send_energy">
          <el-input v-model="formData.send_energy" placeholder="请输入赠送能量"></el-input>
        </el-form-item>
        <el-form-item label="限制次数" prop="num">
          <el-input v-model="formData.num" placeholder="请输入限制次数（0表示不限制）"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio label="1" :value="1">启用</el-radio>
            <el-radio label="0" :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序号" prop="sort">
          <el-input v-model="formData.sort" placeholder="请输入排序号"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="confirm(formRef)"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { addRechargeAct, editRechargeAct } from '@/api/rechargeActManage'
  import { ElButton, ElRadioGroup, type FormInstance, type FormRules } from 'element-plus'
  defineOptions({ name: 'RechargeActManageIDialog' })

  const formRef = ref<FormInstance>()
  const rules = computed<FormRules>(() => ({
    payment_amount: [{ required: true, message: '请输入充值金额', trigger: 'blur' }],
    send_energy: [{ required: true, message: '请输入赠送能量', trigger: 'blur' }],
    num: [{ required: true, message: '请输入限制次数', trigger: 'blur' }],
    type: [{ required: true, message: '请选择状态', trigger: 'blur' }],
    sort: [{ required: true, message: '请输入排序号', trigger: 'blur' }]
  }))
  const txt = computed(() => {
    return flag.value == 0 ? '查看' : flag.value == 1 ? '编辑' : '添加'
  })

  // -1 add 0 view 1 edit
  const flag = ref(-1)
  const dialogVisible = ref(false)
  const formData = ref({
    id: 0,
    payment_amount: '',
    send_energy: '',
    num: '',
    type: 1,
    sort: '',
    remark: ''
  })

  const confirm = (formRef: FormInstance | undefined) => {
    if (flag.value == 0) {
      dialogVisible.value = false
      resetForm()
      return
    }

    formRef?.validate().then(() => {
      if (formData.value.id) {
        editRechargeAct(formData.value)
          .then(() => {
            ElMessage.success('编辑成功')
            resetForm()
            emit('refresh')
          })
          .catch(() => {
            ElMessage.error('编辑失败')
          })
      } else {
        addRechargeAct(formData.value)
          .then(() => {
            ElMessage.success('添加成功')
            resetForm()
            emit('refresh')
          })
          .catch(() => {
            ElMessage.error('添加失败')
          })
      }
    })
  }

  const emit = defineEmits(['refresh'])
  const openDialog = (row: any) => {
    dialogVisible.value = true
    formRef.value?.resetFields()
    flag.value = row.flag
    if (flag.value == 0 || flag.value == 1) {
      formData.value = row
    }
  }
  const resetForm = () => {
    dialogVisible.value = false
    formData.value = {
      id: 0,
      payment_amount: '',
      send_energy: '',
      num: '',
      type: 1,
      sort: '',
      remark: ''
    }
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
