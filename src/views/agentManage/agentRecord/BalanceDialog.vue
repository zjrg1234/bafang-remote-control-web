<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      title="余额记录"
      class="top-right-dialog"
      width="800"
      :append-to-body="true"
      @close="handleReset"
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
            <template #head_shot="{ row }">
              <div class="img">
                <img :src="row.head_shot" alt="" @click="handlePreview(row.head_shot)" />
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
  import { fetchBalanceList } from '@/api/agentManage'
  import { fetchAgentTypeList } from '@/api/common'

  defineOptions({ name: 'AgentBalanceDialog' })
  const dialogFormVisible = ref(false)

  // 表单搜索初始值
  const searchFormState = ref({
    id: '',
    type: '',
    daterange: ['', ''],
    start_time: '',
    end_time: ''
  })
  const typeList = ref()

  const openDialog = async (params: any) => {
    searchFormState.value.id = params.id

    fetchAgentTypeList({
      type: 1
    }).then((res) => {
      if (res.code === 200) {
        let arr: { label: string; value: string }[] = []
        Object.keys(res.data).forEach((item) => {
          arr.push({
            label: res.data[item],
            value: item
          })
        })
        typeList.value = arr
      }
    })

    await handleSearch()
    dialogFormVisible.value = true
  }
  defineExpose({ openDialog })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'type',
      label: '类型',
      type: 'select',
      props: {
        placeholder: '请选择类型',
        options: typeList.value
      }
    },
    {
      key: 'daterange',
      label: '日期',
      type: 'daterange',
      span: 13,
      props: {
        type: 'daterange',
        startPlaceholder: '请选择开始日期',
        endPlaceholder: '请选择结束日期',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ])

  const handleSearch = async () => {
    const { daterange, ...filtersParams } = searchFormState.value
    const [start_time, end_time] = Array.isArray(daterange) ? daterange : [null, null]

    Object.assign(searchParams, {
      ...filtersParams,
      start_time,
      end_time
    })

    getData()
  }

  const handleReset = () => {
    data.value = []
  }

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
      apiFn: fetchBalanceList,
      apiParams: {
        page: 1,
        size: 20
      },
      immediate: false,
      excludeParams: ['daterange'],
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center',
          width: 40
        },
        {
          prop: 'type_name',
          label: '类型',
          align: 'center',
          width: 40
        },
        {
          prop: 'amount',
          label: '金额',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'balance',
          label: '余额',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'make_order_no',
          label: '预约号',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'venue',
          label: '代理商场地',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'user_name',
          label: '预约用户名称',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'phone',
          label: '预约用户电话',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'time',
          label: '时间',
          align: 'center',
          showTooltip: true
        }
      ]
    }
  })
  // 头像预览
  const handlePreview = (url: string) => {
    // previewDialogVisible.value = true
    console.log(url)
  }
</script>

<style lang="scss" scoped>
  :deep(.cell) {
    padding: 0;
  }
</style>
