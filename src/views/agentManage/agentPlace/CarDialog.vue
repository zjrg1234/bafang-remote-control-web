<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      title="场地车辆"
      class="top-right-dialog"
      width="800"
      :append-to-body="true"
    >
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
            <template #image="{ row }">
              <div class="img">
                <img
                  :src="row.vehicle_image"
                  style="width: 30px; height: 30px"
                  alt=""
                  @click="handlePreview(row.vehicle_image)"
                />
              </div>
            </template>
          </ArtTable>
        </ElCard>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { getCarList } from '@/api/agentManage'

  defineOptions({ name: 'AgentBalanceDialog' })
  const dialogFormVisible = ref(false)

  // 表单搜索初始值
  const searchFormState = ref({
    id: '',
    name: ''
  })

  const openDialog = (params: any) => {
    dialogFormVisible.value = true
    searchFormState.value.id = params.id
    handleSearch()
  }
  defineExpose({ openDialog })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'name',
      label: '车辆名称',
      type: 'input',
      props: {
        placeholder: '请输入车辆名称'
      }
    }
  ])

  const handleSearch = async () => {
    const { ...filtersParams } = searchFormState.value
    // 搜索参数赋值
    Object.assign(searchParams, {
      ...filtersParams
    })

    getData()
  }

  const handleReset = () => {}

  const {
    data,
    columns,
    loading,
    searchParams,
    pagination,
    handleSizeChange,
    handleCurrentChange,
    getData
  } = useTable({
    core: {
      apiFn: getCarList,
      apiParams: {
        page: 1,
        size: 20
      },
      immediate: false,
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center',
          width: 50
        },
        {
          prop: 'vehicle_name',
          label: '车辆名称',
          align: 'center'
        },
        {
          prop: 'image',
          label: '车辆主图',
          useSlot: true,
          align: 'center'
        },
        {
          prop: 'vehicle_battery',
          label: '电量',
          align: 'center'
        },
        {
          prop: 'top_speed',
          label: '视频清晰度',
          align: 'center'
        },
        {
          prop: 'created_at',
          label: '创建时间',
          align: 'center',
          width: 150
        }
      ]
    }
  })

  const handlePreview = (url: string) => {
    window.open(url)
  }
</script>
