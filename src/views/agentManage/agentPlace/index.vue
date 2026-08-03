<template>
  <div>
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
          :loading="loading"
          :data="data"
          :columns="columns"
          :pagination="pagination"
          @pagination:size-change="handleSizeChange"
          @pagination:current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <div class="operation-buttons">
              <el-link type="primary" @click="details(row)">详情</el-link>
              <span class="gray">|</span>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link"> 更多 </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="{ id: row.id, type: 1 }">场地车辆</el-dropdown-item>
                    <el-dropdown-item
                      :command="{ id: row.id, status: row.support_status, type: 2 }"
                      >{{ row.support_status === 0 ? '上架' : '下架' }}</el-dropdown-item
                    >
                    <el-dropdown-item :command="{ id: row.id, type: 3, venue_name: row.venue_name }"
                      >修改排序</el-dropdown-item
                    >
                    <el-dropdown-item :command="{ id: row.id, type: 4 }">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <!--  更多里的车辆列表不做 更新排行榜不要 -->
          </template>
        </ArtTable>
      </ElCard>
    </div>

    <DetailDialog ref="detailDialogRef" />
    <EditSortDialog ref="editSortDialogRef" />
    <CarDialog ref="carDialogRef"></CarDialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchVenueList, fetchList, venueDelete, venueTakeDown } from '@/api/agentManage'
  import DetailDialog from './DetailDialog.vue'
  import EditSortDialog from './EditSortDialog.vue'
  import CarDialog from './CarDialog.vue'

  defineOptions({ name: 'AgentPlace' })

  const detailDialogRef = ref()
  const editSortDialogRef = ref()
  const carDialogRef = ref()

  const searchFormState = ref({
    venue_name: '',
    agent_id: '',
    labels: ''
  })

  const agentName = ref([])
  onBeforeMount(() => {
    fetchList({
      page: 1,
      size: 999
    }).then((res) => {
      if (res.code === 200) {
        agentName.value = res.data.content.map((item: { agent_name: any; id: any }) => ({
          label: item.agent_name,
          value: item.id
        }))
      }
    })
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'venue_name',
      label: '场地名称',
      type: 'input',
      props: {
        placeholder: '请输入场地名称',
        maxlength: '11'
      }
    },
    {
      key: 'agent_id',
      label: '代理商',
      type: 'select',
      props: {
        placeholder: '请选择代理商',
        options: agentName.value
      }
    },
    {
      key: 'labels',
      label: '标签',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: [
          {
            label: '遥控车',
            value: 1
          },
          {
            label: '遥控船',
            value: 2
          },
          {
            label: '工程车',
            value: 3
          }
        ]
      }
    }
  ])

  const handleSearch = async () => {
    const { ...filtersParams } = searchFormState.value
    Object.assign(searchParams, { ...filtersParams })
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
      apiFn: fetchVenueList,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          width: 100,
          align: 'center'
        },
        {
          prop: 'venue_name',
          label: '场地名称',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'agent_name',
          label: '代理商',
          align: 'center'
        },
        {
          prop: 'start_time',
          label: '营业开始时间',
          align: 'center',
          width: 150
        },
        {
          prop: 'end_time',
          label: '营业结束时间',
          align: 'center',
          width: 150
        },
        {
          prop: 'type_name',
          label: '标签',
          align: 'center'
        },
        {
          prop: 'deposit',
          label: '押金',
          align: 'center'
        },
        {
          prop: 'vehicles_number',
          label: '车辆数',
          align: 'center'
        },
        {
          prop: 'online_vehicle_number',
          label: '在线车辆数',
          align: 'center'
        },
        {
          prop: 'support_status',
          label: '营业状态',
          align: 'center',
          formatter: (row: { support_status: any }) => {
            return row.support_status === 1 ? '已营业' : '未营业'
          }
        },
        {
          prop: 'created_at',
          label: '创建时间',
          align: 'center',
          width: 150
        },
        {
          prop: 'operation',
          label: '操作',
          width: 90,
          useSlot: true,
          fixed: 'right',
          align: 'center'
        }
      ]
    }
  })

  const details = (row: any) => {
    detailDialogRef.value.openDialog(row)
  }

  const handleCommand = (command: any) => {
    if (command.type == 1) {
      carDialogRef.value.openDialog({ id: command.id })
    } else if (command.type == 2) {
      let type = 1
      let msg = '上架'
      if (command.status != 0) {
        type = 2
        msg = '下架'
      }
      venueTakeDown({
        id: command.id,
        type
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success(msg + '成功')
          handleSearch()
        } else {
          ElMessage.error(res.msg || '操作失败')
        }
      })
    } else if (command.type == 3) {
      editSortDialogRef.value.openDialog(command)
    } else if (command.type == 4) {
      venueDelete({
        id: command.id
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success('删除成功')
          handleSearch()
        } else {
          ElMessage.error(res.msg || '操作失败')
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  :deep(.cell) {
    padding: 0;
  }
</style>
