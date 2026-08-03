<template>
  <el-dialog v-model="dialogFormVisible" title="修改能量" width="600">
    <el-form :model="form" label-position="right" label-width="100px">
      <el-form-item label="原来的能量：">
        <el-input v-model="form.old_energy" disabled autocomplete="off" />
      </el-form-item>

      <el-form-item label="增加的能量：">
        <el-input
          v-model="form.energy"
          autocomplete="off"
          placeholder="请输入增加的能量"
          type="number"
        />
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
  import { editEnergy } from '@/api/userManage'
  import { useUserStore } from '@/store/modules/user'

  defineOptions({ name: 'EditEnergyDialog' })

  const userStore = useUserStore()
  const userInfo = computed(() => userStore.getUserInfo)
  const dialogFormVisible = ref(false)

  // 表单搜索初始值
  const form = ref({
    old_energy: '',
    energy: '',
    id: ''
  })
  const emit = defineEmits(['refresh'])
  const handleSubmit = async () => {
    if (!form.value.energy) {
      ElMessage.error('请输入增加的能量')
      return
    }
    const res = await editEnergy({ ...form.value, operator_account: userInfo.value.userName })
    if (res.code === 200) {
      ElMessage.success('修改成功')
      emit('refresh')
    } else {
      ElMessage.error(res.msg || '修改失败')
    }
    dialogFormVisible.value = false
  }

  const openDialog = (params: any) => {
    console.log(params)
    dialogFormVisible.value = true
    form.value = {
      ...params,
      old_energy: params.energy || '',
      energy: ''
    }
  }
  defineExpose({ openDialog })
</script>
