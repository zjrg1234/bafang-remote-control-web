<template>
  <el-dialog v-model="dialogFormVisible" title="修改排序" width="500">
    <el-form :model="form" label-position="right" label-width="100px">
      <el-form-item label="场地名称：">
        <el-input v-model="form.venue_name" disabled autocomplete="off" />
      </el-form-item>

      <el-form-item label="排序：">
        <el-input v-model="form.sort" autocomplete="off" placeholder="请输入排序" />
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
  import { venueSort } from '@/api/agentManage'

  defineOptions({ name: 'AgentPlaceEditSortDialog' })
  const dialogFormVisible = ref(false)

  // 表单搜索初始值
  const form = ref({
    venue_name: '',
    sort: '',
    id: ''
  })

  const handleSubmit = async () => {
    const res = await venueSort(form.value)
    if (res.code === 200) {
      ElMessage.success('修改成功')
    } else {
      ElMessage.error(res.msg || '修改失败')
    }
    dialogFormVisible.value = false
  }

  const openDialog = (params: any) => {
    console.log(params)
    dialogFormVisible.value = true
    form.value = {
      ...params
    }
  }
  defineExpose({ openDialog })
</script>
