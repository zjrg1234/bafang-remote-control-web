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
      :buttonLeftLimit="3"
      @search="handleSearch"
      @reset="handleReset"
    />

    <div class="page art-full-height">
      <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
        <ElButton type="primary" @click="add">新增</ElButton>

        <!-- 表格 -->
        <ArtTable
          rowKey="id"
          :loading="loading"
          :data="data"
          :columns="columns"
          empty-height="360px"
          :pagination="pagination"
          @pagination:size-change="handleSizeChange"
          @pagination:current-change="handleCurrentChange"
        >
          <template #img="{ row }">
            <img :src="row.activity_image" width="30" height="30" />
          </template>
          <template #operation="{ row }">
            <div class="operation-buttons">
              <el-link type="primary" @click="handleEdit(row)">编辑</el-link>
              <span class="gray">|</span>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link"> 更多 </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="{ detail: row, type: 1 }">详情</el-dropdown-item>
                    <el-dropdown-item :command="{ detail: row, type: 2 }">{{
                      row.status == '1' ? '禁用' : '启用'
                    }}</el-dropdown-item>
                    <el-dropdown-item :command="{ detail: row, type: 3 }">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>
    <Idialog ref="dialogRef" @refresh="handleSearch" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchActList, delAct, changeActStatus } from '@/api/activity'
  import { fetchSpecialAreaList } from '@/api/common'
  import { ElMessageBox } from 'element-plus'

  import Idialog from './iDialog.vue'

  defineOptions({ name: 'ActivityNoticeManage' })

  const specialAreaList = ref([])
  const dialogRef = ref()
  // 表单搜索初始值
  const searchFormState = ref({
    activity_title: '',
    type: '',
    status: '',
    special_area: '',
    is_index: '',
    is_discover: ''
  })
  onBeforeMount(async () => {
    const res = await fetchSpecialAreaList({
      page: 1,
      size: 9999
    })
    if (res.code === 200) {
      specialAreaList.value = res.data.map((item: { agent_name: any; id: any }) => ({
        label: item.agent_name,
        value: item.id
      }))
    }
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'activity_title',
      label: '活动标题',
      labelWidth: '110px',
      type: 'input',
      props: {
        placeholder: '请输入活动标题'
      }
    },
    {
      key: 'type',
      label: '公告所属类型',
      type: 'select',
      labelWidth: '110px',
      props: {
        placeholder: '请选择公告所属类型',
        options: [
          {
            label: '平台公告',
            value: '1'
          },
          {
            label: '专区公告',
            value: '2'
          }
        ]
      }
    },
    {
      key: 'status',
      label: '状态',
      type: 'select',
      labelWidth: '110px',
      props: {
        placeholder: '请选择',
        options: [
          {
            label: '启用',
            value: '1'
          },
          {
            label: '禁用',
            value: '0'
          }
        ]
      }
    },

    {
      key: 'special_area',
      label: '专区',
      type: 'select',
      labelWidth: '110px',
      props: {
        placeholder: '请选择',
        options: specialAreaList.value
      }
    },
    {
      key: 'is_index',
      label: '是否首页显示',
      type: 'select',
      labelWidth: '110px',
      props: {
        placeholder: '请选择',
        options: [
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ]
      }
    },
    {
      key: 'is_discover',
      label: '是否发现页显示',
      type: 'select',
      labelWidth: '110px',
      props: {
        placeholder: '请选择',
        options: [
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ]
      }
    }
  ])

  const handleSearch = async () => {
    const { ...filtersParams } = searchFormState.value

    // 搜索参数赋值
    Object.assign(searchParams, { ...filtersParams })
    getData()
  }

  const handleReset = () => {
    resetSearchParams()
  }

  const add = () => {
    dialogRef.value.openDialog({
      flag: -1
    })
  }

  const {
    data,
    columns,
    loading,
    pagination,
    searchParams,
    resetSearchParams,
    handleSizeChange,
    handleCurrentChange,
    getData
  } = useTable({
    core: {
      apiFn: fetchActList,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center'
        },
        {
          prop: 'type',
          label: '公告所属类型',
          align: 'center',
          width: 100,
          formatter: (row: any) => {
            return row.type === '1' ? '平台公告' : '专区公告'
          }
        },
        {
          prop: 'special_area_name',
          align: 'center',
          label: '专区'
        },
        {
          prop: 'activity_title',
          align: 'center',

          label: '活动标题'
        },
        {
          prop: 'img',
          align: 'center',
          useSlot: true,
          width: 100,
          label: '活动标题图片'
        },
        {
          prop: 'is_index',
          align: 'center',
          label: '是否首页显示',
          width: 100,
          formatter: (row: any) => {
            return row.is_index == '1' ? '是' : '否'
          }
        },
        {
          prop: 'is_discover',
          align: 'center',
          width: 100,
          label: '是否发现页显示',
          formatter: (row: any) => {
            return row.is_discover == '1' ? '是' : '否'
          }
        },
        {
          prop: 'activity_type',
          label: '活动公告指向类型',
          align: 'center',
          width: 120,
          formatter: (row: any) => {
            return row.activity_type == '1' ? '活动公告' : '排行榜'
          }
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
          formatter: (row: any) => {
            return row.status == '1' ? '启用' : '禁用'
          }
        },
        {
          prop: 'sort',
          label: '排序号',
          align: 'center'
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          width: 80,
          useSlot: true,
          fixed: 'right'
        }
      ]
    }
  })

  const handleEdit = (row: any) => {
    dialogRef.value.openDialog({
      ...row,
      flag: 1
    })
  }
  const handleCommand = (command: any) => {
    if (command.type === 1) {
      dialogRef.value.openDialog({
        ...command.detail,
        flag: 0
      })
    } else if (command.type === 2) {
      changeActStatus({
        id: command.detail.id,
        status: command.detail.status == '1' ? '0' : '1'
      }).then((res) => {
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          getData(searchFormState.value)
        }
      })
    } else if (command.type === 3) {
      ElMessageBox.confirm('确定要删除该活动公告吗？删除后无法恢复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delAct(command.detail.id).then((res) => {
            if (res.code === 200) {
              ElMessage({
                type: 'success',
                message: '删除成功'
              })
              getData(searchFormState.value)
            }
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
</script>
