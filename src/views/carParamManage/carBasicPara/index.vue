<template>
  <div class="page art-full-height">
    <ElCard class="art-table-card" shadow="never" header="车辆基本参数" style="margin-top: 0">
      <el-form :model="form" label-width="120" style="max-width: 800px" :inline="true">
        <el-form-item label="方向左转值">
          <el-input-number v-model="form.name" controls-position="right" size="large" />
        </el-form-item>
        <el-form-item label="方向右转值">
          <el-input-number v-model="form.name" controls-position="right" size="large" />
        </el-form-item>
        <el-form-item label="方向中位">
          <el-input-number v-model="form.name" controls-position="right" size="large" />
        </el-form-item>
        <el-form-item label="油门中位">
          <el-input-number v-model="form.name" controls-position="right" size="large" />
        </el-form-item>
        <el-form-item label="方向力度">
          <el-input-number v-model="form.name" controls-position="right" size="large" />
        </el-form-item>
        <el-form-item label="油门力度">
          <el-input-number v-model="form.name" controls-position="right" size="large" />
        </el-form-item>
        <el-form-item label="喇叭音量">
          <el-input-number v-model="form.name" controls-position="right" size="large" />
        </el-form-item>
      </el-form>

      <div style="padding-left: 120px">
        <el-button type="primary" @click="onSubmit">刷新</el-button>
        <el-button>确认</el-button>
      </div>
    </ElCard>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'

  // do not use same name with ref
  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  })

  const onSubmit = () => {
    console.log('submit!')
  }
</script>
