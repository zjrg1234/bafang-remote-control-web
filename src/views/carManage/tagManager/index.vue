<template>
  <div class="tag-manager">
    <ArtSearchBar
      ref="searchBarRef"
      v-model="searchFormState"
      :items="searchItems"
      :is-expand="false"
      :show-expand="true"
      :show-reset-button="true"
      :show-search-button="true"
      :disabled-search-button="false"
      @search="handleSearch"
      @reset="handleReset"
    />

    <div class="page art-full-height">
      <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
        <ElButton type="primary" @click="add">新增</ElButton>
        <!-- 表格 -->
        <ArtTable
          rowKey="id"
          :show-table-header="false"
          :loading="loading"
          :data="data"
          :columns="columns"
          :pagination="pagination"
          @pagination:size-change="handleSizeChange"
          @pagination:current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <div class="operation-buttons">
              <ArtButtonTable type="view" :row="row" />
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>

    <el-dialog v-model="dialogFormVisible" title="新增" width="500">
      <el-form :model="form" ref="ruleFormRef" :rules="rules">
        <el-form-item label="标签名称" :label-width="120" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否自营" :label-width="120" prop="delivery">
          <el-radio-group v-model="form.delivery">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" :label-width="120" prop="status_text">
          <el-radio-group v-model="form.status_text">
            <el-radio label="1">禁用</el-radio>
            <el-radio label="0">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" :label-width="120">
          <el-input v-model="form.sort" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchList } from '@/api/userManage'
  import type { FormInstance, FormRules } from 'element-plus'

  defineOptions({ name: 'TagManager' })

  import { useRoute } from 'vue-router'
  const dialogFormVisible = ref(false)

  interface RuleForm {
    name: string
    delivery: boolean
    status_text: string
    sort: string
  }

  const ruleFormRef = ref<FormInstance>()

  const form = reactive<RuleForm>({
    name: '',
    delivery: false,
    status_text: '0',
    sort: ''
  })

  const rules = reactive<FormRules<RuleForm>>({
    name: [
      { required: true, message: '请输入标签名称', trigger: 'blur' }
      //{ min: 3, max: 5, message: '标签名称长度为3-5个字符', trigger: 'blur' }
    ],
    delivery: [{ required: true, message: '请选择是否自营', trigger: 'change' }],
    status_text: [{ required: true, message: '请选择状态', trigger: 'change' }]
  })

  const route = useRoute()
  console.log(route.query)
  console.log(window.location.href)
  // 表单搜索初始值
  const searchFormState = ref({
    daterange: ['', '']
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'tag',
      label: '标签名称',
      type: 'input',
      props: {
        placeholder: '请输入标签名称',
        maxlength: '12'
      }
    }
  ])

  onMounted(() => {})

  /**
   * 新增
   */
  const add = () => {
    dialogFormVisible.value = true
  }
  /**
   * 取消
   */
  const cancel = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  /**
   * 确认
   */
  const confirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const handleSearch = async () => {
    const { daterange, ...filtersParams } = searchFormState.value
    const [startTime, endTime] = Array.isArray(daterange) ? daterange : [null, null]

    Object.assign(searchFormState, { ...filtersParams, startTime, endTime })
    getData()
  }

  const handleReset = () => {}

  const { data, columns, loading, pagination, handleSizeChange, handleCurrentChange, getData } =
    useTable({
      core: {
        apiFn: fetchList,
        apiParams: {
          page: 1,
          size: 20
        },
        columnsFactory: () => [
          {
            prop: 'id',
            label: '#',
            width: 50
          },
          {
            prop: 'tagName',
            label: '标签名称'
          },
          {
            prop: 'isSelf',
            label: '是否自营'
          },
          {
            prop: 'status_dictText',
            label: '状态'
          },
          {
            prop: 'createTime',
            label: '创建时间'
          },
          {
            prop: 'operation',
            label: '操作',
            width: 120,
            useSlot: true,
            fixed: 'right'
          }
        ]
      }
    })
</script>
