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
              <img
                :src="row.head_shot"
                alt=""
                width="30"
                height="30"
                @click="handlePreview(row.head_shot)"
              />
            </div>
          </template>
          <template #screenshot="{ row }">
            <div class="">
              <!-- {{ row.is_cancel }} -->
              <el-switch
                v-model="row.is_screenshot"
                :active-value="1"
                :inactive-value="0"
                @change="handleChange(row, $event)"
              />
            </div>
          </template>
          <template #operation="{ row }">
            <div class="operation-buttons">
              <el-link type="primary" @click="handleShowDetail(row)">详情</el-link>
              <span class="gray">|</span>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link"> 更多 </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="{ id: row.id, type: 1 }">余额记录</el-dropdown-item>
                    <el-dropdown-item :command="{ id: row.id, type: 8 }">
                      专区余额记录
                    </el-dropdown-item>
                    <el-dropdown-item :command="{ id: row.id, type: 2 }">能量记录</el-dropdown-item>
                    <el-dropdown-item
                      :command="{ id: row.id, phone_number: row.phone_number, type: 3 }"
                    >
                      修改密码</el-dropdown-item
                    >
                    <el-dropdown-item :command="{ id: row.id, balance: row.balance, type: 4 }"
                      >修改余额</el-dropdown-item
                    >
                    <el-dropdown-item :command="{ id: row.id, energy: row.energy, type: 5 }"
                      >修改能量</el-dropdown-item
                    >
                    <el-dropdown-item :command="{ id: row.id, type: 6, is_frozen: row.is_frozen }">
                      {{ row.is_frozen == 0 ? '冻结' : '解冻' }}
                    </el-dropdown-item>
                    <el-dropdown-item :command="{ id: row.id, type: 7 }">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <!--  更多里的车辆列表不做 更新排行榜不要 -->
          </template>
        </ArtTable>
      </ElCard>
    </div>

    <el-dialog v-model="dialogFormVisible" title="详情" width="600">
      <div class="content">
        <el-form :model="form" label-width="120px">
          <el-form-item label="专区：">
            <el-input v-model="form.special_area_name" disabled autocomplete="off" />
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="form.phone_number" disabled autocomplete="off" />
          </el-form-item>
          <el-form-item label="昵称：">
            <el-input v-model="form.nick_name" disabled autocomplete="off" />
          </el-form-item>
          <el-form-item label="头像：">
            <div class="demo-image__preview">
              <el-image
                style="width: 100px; height: 100px"
                :src="form.head_shot"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="[form.head_shot]"
                show-progress
                :initial-index="0"
                fit="cover"
              />
            </div>
          </el-form-item>
          <el-form-item label="余额：">
            <el-input v-model="form.balance" disabled autocomplete="off" />
          </el-form-item>
          <el-form-item label="是否实名认证：">
            <el-input value="否" disabled autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <BalanceDialog ref="balanceDialogRef" />

    <EnergyDialog ref="energyDialogRef" />

    <EditPwdDialog ref="editPwdDialogRef"></EditPwdDialog>
    <EditBalanceDialog ref="editBalanceDialogRef" @refresh="handleSearch"></EditBalanceDialog>
    <EditEnergyDialog ref="editEnergyDialogRef" @refresh="handleSearch"></EditEnergyDialog>

    <AreaBalanceDialog ref="areaBalanceDialog"></AreaBalanceDialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchList, userFreeze, userdelete, screenshot } from '@/api/userManage'
  import { fetchSpecialAreaList } from '@/api/common'
  import EditPwdDialog from '@/components/EditPwdDialog/index.vue'
  import EnergyDialog from './EnergyDialog.vue'
  import BalanceDialog from './BalanceDialog.vue'
  import EditBalanceDialog from './EditBalanceDialog.vue'
  import EditEnergyDialog from './EditEnergyDialog.vue'
  import AreaBalanceDialog from './AreaBalanceDialog.vue'

  const balanceDialogRef = ref()
  const energyDialogRef = ref()
  const editPwdDialogRef = ref()
  const editBalanceDialogRef = ref()
  const editEnergyDialogRef = ref()
  const areaBalanceDialog = ref()

  defineOptions({ name: 'UserManage' })
  const dialogFormVisible = ref(false)
  const form = ref({
    phone_number: '',
    special_area_name: '',
    nick_name: '',
    head_shot: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    balance: ''
  })

  // 表单搜索初始值
  const searchFormState = ref({
    phone_number: '',
    nick_name: '',
    daterange: ['', ''],
    special_area: '',
    is_cancel: '', // 1是0否
    is_frozen: '',
    id: ''
  })
  const specialAreaList = ref([])
  onBeforeMount(() => {
    fetchSpecialAreaList({
      page: 1,
      size: 9999
    }).then((res) => {
      specialAreaList.value = res.data.map((item: { agent_name: any; id: any }) => ({
        label: item.agent_name,
        value: item.id
      }))
    })
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'phone_number',
      label: '电话',
      type: 'input',
      span: 5,
      props: {
        placeholder: '请输入电话'
      }
    },
    {
      key: 'nick_name',
      label: '昵称',
      type: 'input',
      span: 5,

      props: {
        placeholder: '请输入昵称',
        maxlength: '20'
      }
    },
    {
      key: 'special_area',
      label: '专区',
      type: 'select',
      props: {
        placeholder: '请选择专区',
        options: specialAreaList.value
      }
    },
    {
      key: 'daterange',
      label: '注册时间',
      type: 'daterange',
      span: 7,
      props: {
        type: 'daterange',
        startPlaceholder: '请选择开始日期',
        endPlaceholder: '请选择结束日期',
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      key: 'is_frozen',
      label: '是否冻结',
      type: 'select',
      span: 5,
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
      key: 'is_cancel',
      label: '是否注销',
      type: 'select',
      span: 5,
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
      key: 'id',
      label: '用户id',
      type: 'input',
      props: {
        placeholder: '请输入用户id'
      }
    }
  ])

  const handleSearch = async () => {
    const { daterange, ...filtersParams } = searchFormState.value
    const [start_register_time, end_register_time] = Array.isArray(daterange)
      ? daterange
      : [null, null]
    // 搜索参数赋值
    Object.assign(searchParams, {
      ...filtersParams,
      start_register_time,
      end_register_time
    })
    getData()
  }

  const handleReset = () => {
    resetSearchParams()
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
          align: 'center',
          width: 50
        },
        {
          prop: 'special_area_name',
          label: '专区',
          align: 'center'
        },
        {
          prop: 'username',
          label: '用户姓名',
          align: 'center',
          width: 180
        },
        {
          prop: 'phone_number',
          label: '手机号',
          width: 120,
          align: 'center'
        },
        {
          prop: 'head_shot',
          label: '头像',
          useSlot: true,
          width: 50,
          slotName: 'head_shot'
        },
        {
          prop: 'balance',
          label: '余额',
          sortable: true,
          align: 'center'
        },
        {
          prop: 'energy',
          label: '能量',
          sortable: true,
          align: 'center'
        },
        {
          prop: 'is_real_name',
          label: '是否实名认证',
          width: 110,
          align: 'center',
          formatter: (row) => (row.is_real_name ? '是' : '否')
        },
        {
          prop: 'real_name',
          label: '真实姓名',
          align: 'center'
        },
        {
          prop: 'is_frozen',
          label: '是否冻结',
          formatter: (row) => (row.is_frozen == 1 ? '是' : '否'),
          align: 'center'
        },
        {
          prop: 'is_activation',
          label: '是否激活中',
          formatter: (row) => (row.is_activation == 1 ? '是' : '否'),
          align: 'center'
        },
        {
          prop: 'is_cancel',
          label: '是否注销',
          formatter: (row) => (row.is_cancel == 1 ? '是' : '否'),
          align: 'center'
        },
        {
          prop: 'register_time',
          label: '注册时间',
          width: 120,
          showToolTip: true
        },
        {
          prop: 'screenshot',
          label: '截图权限',
          width: 120,
          useSlot: true
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          width: 100,
          useSlot: true,
          slotName: 'operation',
          fixed: 'right'
        }
      ]
    }
  })
  // 头像预览
  const handlePreview = (url: string) => {
    // previewDialogVisible.value = true
    console.log(url)
  }

  const handleShowDetail = (row: any) => {
    dialogFormVisible.value = true
    form.value = { ...row }
  }

  const handleCommand = (command: any) => {
    if (command.type == 1) {
      balanceDialogRef.value.openDialog({
        id: command.id
      })
    } else if (command.type == 2) {
      energyDialogRef.value.openDialog({
        id: command.id
      })
    } else if (command.type == 3) {
      editPwdDialogRef.value.openDialog({
        id: command.id,
        phone_number: command.phone_number
      })
    } else if (command.type == 4) {
      editBalanceDialogRef.value.openDialog({
        id: command.id,
        balance: command.balance
      })
    } else if (command.type == 5) {
      editEnergyDialogRef.value.openDialog({
        id: command.id,
        energy: command.energy
      })
    } else if (command.type == 6) {
      userFreeze({
        id: command.id,
        frozen: command.is_frozen == 1 ? 0 : 1
      }).then((res) => {
        if (res.code === 200) {
          let msg = '冻结成功'
          if (command.is_frozen == 1) {
            msg = '解冻成功'
          }
          ElMessage.success(msg)
          handleSearch()
        } else {
          ElMessage.error(res.msg || '操作失败')
        }
      })
    } else if (command.type == 7) {
      userdelete({
        id: command.id
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success('删除成功')
          handleSearch()
        } else {
          ElMessage.error(res.msg || '操作失败')
        }
      })
    } else if (command.type == 8) {
      areaBalanceDialog.value.openDialog({
        id: command.id
      })
    }
  }

  const handleChange = (row: any, val: any) => {
    if (!row.id) return
    screenshot({
      id: row.id,
      is_screenshot: Number(val)
    })
      .then((res) => {
        console.log(res)
        if (res.code == 200) {
          let msg = val == false ? '关闭成功' : '开启成功'
          ElMessage.success(msg)
        } else {
          ElMessage.success(res.msg)
        }
      })
      .catch()
  }
</script>

<style lang="scss" scoped>
  :deep(.cell) {
    padding: 0;
  }

  .img {
    width: 30px;
    height: 30px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .operation-buttons {
    display: flex;
    align-items: baseline;
    justify-content: space-around;
  }

  .content {
    padding-right: 25px;
  }
</style>
