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
        <ElButton type="primary" @click="add">新增</ElButton>

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
              <el-link type="primary" @click="edit(row)">编辑</el-link>
              <span class="gray">|</span>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link"> 更多 </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="{ detail: row, type: 1 }">详情</el-dropdown-item>
                    <el-dropdown-item :command="{ id: row.id, type: 2 }">余额记录</el-dropdown-item>
                    <el-dropdown-item
                      :command="{ id: row.id, phone_number: row.phone_number, type: 3 }"
                    >
                      修改密码
                    </el-dropdown-item>
                    <el-dropdown-item :command="{ id: row.id, type: 8 }">修改余额</el-dropdown-item>
                    <el-dropdown-item :command="{ detail: row, type: 4 }">{{
                      row.is_frozen == 1 ? '解冻' : '冻结'
                    }}</el-dropdown-item>
                    <el-dropdown-item :command="{ id: row.id, type: 5, kind: row.support_status }">
                      {{ row.support_status == 1 ? '下架' : '上架' }}
                    </el-dropdown-item>
                    <el-dropdown-item :command="{ id: row.id, type: 6 }">删除</el-dropdown-item>
                    <el-dropdown-item :command="{ id: row.id, type: 7 }">
                      更新昨日营业额
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <!--  更多里的车辆列表不做 更新排行榜不要 -->
          </template>
        </ArtTable>
      </ElCard>
    </div>

    <EditPwdDialog ref="editPwdDialogRef" />
    <BalanceDialog ref="balanceDialogRef" />
    <iDialog ref="iDialogRef" @refresh="handleSearch" />
    <EditBalanceDialog ref="editBalanceDialog"></EditBalanceDialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import {
    fetchList,
    agentFreeze,
    agentUpdateYesterdayTurnover,
    agentTakeDown,
    agentDelete
  } from '@/api/agentManage'

  defineOptions({ name: 'AgentRecord' })
  import EditPwdDialog from '@/components/EditPwdDialog/index.vue'
  import BalanceDialog from './BalanceDialog.vue'
  import EditBalanceDialog from './EditBalance.vue'
  import iDialog from './iDialog.vue'
  const iDialogRef = ref()
  const editPwdDialogRef = ref()
  const balanceDialogRef = ref()
  const editBalanceDialog = ref()
  // import { useRoute } from 'vue-router'
  // const route = useRoute()
  // console.log(route.query)
  // console.log(window.location.href)
  // 表单搜索初始值
  const searchFormState = ref({
    phone_number: '',
    agent_name: '',
    is_cancel: ''
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'phone_number',
      label: '手机号',
      type: 'input',
      props: {
        placeholder: '请输入手机号',
        maxlength: '11'
      }
    },
    {
      key: 'agent_name',
      label: '昵称',
      type: 'input',
      props: {
        placeholder: '请输入昵称'
      }
    },
    {
      key: 'is_cancel',
      label: '是否注销',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 0 }
        ]
      }
    }
  ])

  onMounted(() => {})

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
      apiFn: fetchList,
      apiParams: {
        page: 1,
        size: 20
      },
      excludeParams: ['daterange'],
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          width: 60,
          align: 'center'
        },
        {
          prop: 'agent_name',
          label: '代理商姓名',
          width: 100,
          align: 'center'
        },
        {
          prop: 'level',
          label: '等级',
          align: 'center'
        },
        {
          prop: 'superior_agent_name',
          label: '上级代理商',
          width: 100,
          align: 'center'
        },
        {
          prop: 'phone_number',
          label: '手机号',
          align: 'center',
          width: 90
        },
        {
          prop: 'balance',
          label: '余额',
          align: 'center'
        },
        {
          prop: 'withdrawal_amount',
          label: '冻结的金额',
          width: 100,
          align: 'center'
        },
        {
          prop: 'venue_quantity',
          label: '场地数量',
          align: 'center'
        },
        {
          prop: 'create_site_quantity',
          label: '可创建场地总数',
          align: 'center',
          width: 100
        },
        {
          prop: 'is_support',
          label: '是否自营',
          align: 'center',
          formatter: (row) => {
            return row.is_support === 1 ? '是' : '否'
          }
        },
        {
          prop: 'first_handling_fee',
          label: '代理商手续费',
          width: 100,
          align: 'center'
        },
        {
          prop: 'company_handling_fee',
          label: '公司手续费',
          align: 'center'
        },
        {
          prop: 'register_time',
          label: '注册时间',
          width: 150,
          align: 'center'
        },
        {
          prop: 'review_status',
          label: '审核状态',
          align: 'center',
          formatter: (row) => {
            return row.review_status === 1 ? '审核通过' : '待审核'
          }
        },
        {
          prop: 'support_status',
          label: '营业状态',
          align: 'center',
          formatter: (row) => {
            return row.support_status == 1 ? '已营业' : '营业'
          }
        },
        {
          prop: 'is_frozen',
          label: '是否冻结',
          align: 'center',
          formatter: (row) => {
            return row.is_frozen === 1 ? '是' : '否'
          }
        },
        {
          prop: 'is_cancel',
          label: '是否注销',
          align: 'center',
          formatter: (row) => {
            return row.is_cancel === 1 ? '是' : '否'
          }
        },
        {
          prop: 'sorting',
          label: '排序号',
          align: 'center'
        },
        {
          prop: 'yesterday_turnover',
          label: '昨日营业额',
          align: 'center',
          width: 100
        },
        {
          prop: 'operation',
          label: '操作',
          width: 100,
          useSlot: true,
          fixed: 'right',
          align: 'center'
        }
      ]
    }
  })

  const edit = (row: any) => {
    iDialogRef.value.openDialog({
      flag: 1,
      ...row
    })
  }
  const add = () => {
    iDialogRef.value.openDialog({
      flag: -1
    })
  }

  const handleCommand = (command: any) => {
    if (command.type == 1) {
      iDialogRef.value.openDialog({
        ...command.detail,
        flag: 0
      })
    } else if (command.type == 2) {
      balanceDialogRef.value.openDialog({
        id: command.id
      })
    } else if (command.type == 3) {
      editPwdDialogRef.value.openDialog({ ...command, type: 1 })
    } else if (command.type == 4) {
      agentFreeze({
        id: command.detail.id,
        frozen: command.detail.is_frozen == 1 ? 0 : 1
      }).then((res) => {
        if (res.code === 200) {
          if (command.detail.is_frozen == 1) {
            ElMessage.success('解冻成功')
          } else {
            ElMessage.success('冻结成功')
          }
          handleSearch()
        } else {
          ElMessage.error(res.msg || '操作失败')
        }
      })
    } else if (command.type == 5) {
      // type 传1上架 2下架
      let msg = '上架成功'
      if (command.kind == 1) {
        msg = '下架成功'
      }
      agentTakeDown({
        id: command.id,
        type: command.kind == 1 ? 2 : 1
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success(msg)
          handleSearch()
        } else {
          ElMessage.error(res.msg || '操作失败')
        }
      })
    } else if (command.type == 6) {
      agentDelete({
        id: command.id
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success('删除成功')
          handleSearch()
        } else {
          ElMessage.error(res.msg || '操作失败')
        }
      })
    } else if (command.type == 7) {
      agentUpdateYesterdayTurnover({
        id: command.id
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success('更新成功')
          handleSearch()
        } else {
          ElMessage.error(res.msg || '操作失败')
        }
      })
    } else if (command.type == 8) {
      editBalanceDialog.value.openDialog({
        id: command.id
      })
    }
  }
</script>

<style lang="scss" scoped>
  :deep(.cell) {
    padding: 0;
  }

  .content {
    padding-right: 100px;
  }
</style>
