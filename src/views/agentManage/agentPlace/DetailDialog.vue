<template>
  <el-dialog v-model="dialogFormVisible" title="详情" width="700">
    <el-form :model="form" label-position="right" label-width="120px">
      <el-form-item label="场地名称：">
        <el-input v-model="form.venue_name" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="代理商：">
        <el-input v-model="form.agent_name" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="营业开始时间：">
        <el-input v-model="form.start_time" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="营业结束时间：">
        <el-input v-model="form.end_time" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="介绍：">
        <el-input v-model="form.venue_introduction" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="标签：">
        <el-input v-model="form.type_name" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="押金：">
        <el-input v-model="form.deposit" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="营业状态：">
        <el-radio-group v-model="form.support_status" disabled>
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
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
  defineOptions({ name: 'AgentPlaceDetailDialog' })
  const dialogFormVisible = ref(false)

  // 表单搜索初始值
  const form = ref({
    venue_name: '',
    agent_name: '',
    desc: '',
    support_status: '',
    start_time: '',
    end_time: '',
    type_name: '',
    deposit: '',
    venue_introduction: '',
    id: ''
  })

  const handleSubmit = async () => {
    dialogFormVisible.value = false
  }

  const openDialog = (params: any) => {
    dialogFormVisible.value = true
    form.value = {
      ...params
    }
  }
  defineExpose({ openDialog })
</script>
