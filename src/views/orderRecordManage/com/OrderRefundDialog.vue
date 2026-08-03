<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="退款记录" class="top-right-dialog" width="600">
      <div class="page art-full-height">
        <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
          <!-- <el-button type="primary" @click="handleAdd">新增</el-button> -->
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
              <el-button type="primary" v-if="row.status != 1" @click="handleRefund(row)"
                >撤销</el-button
              >
            </template>
          </ArtTable>
        </ElCard>
      </div>
      <el-dialog v-model="innerVisible" width="500" title="新增" append-to-body>
        <div>
          <el-form :model="form" label-position="right" label-width="100px">
            <el-form-item label="支付总额：">
              <el-input v-model="addObj.payment_amount" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="可退款金额：">
              <el-input v-model="addObj.payment_amount" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="退款金额：">
              <el-input
                v-model="form.refund_amount"
                autocomplete="off"
                type="number"
                placeholder="请输入退款金额"
              />
            </el-form-item>
            <el-form-item label="退款原因：">
              <el-radio-group v-model="form.refund_cause" @change="handleChange">
                <el-radio v-for="item in tuikuanOptions" :label="item.label" :key="item.value">
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手动回复：" v-if="form.refund_cause == '其他'">
              <el-input v-model="form.platform_reply" autocomplete="off" />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确认</el-button>
          </div>
        </template>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { getRefundRecord, handleOrderAppeal } from '@/api/orderManage'
  import { tuikuanOptions } from '@/config/constant'

  defineOptions({ name: 'OrderRefundDialog' })
  const dialogFormVisible = ref(false)
  const innerVisible = ref(false)
  // 表单搜索初始值
  const searchFormState = ref({
    id: ''
  })
  const form = ref({
    refund_amount: '',
    refund_cause: '',
    platform_reply: ''
  })
  const addObj = ref({
    payment_amount: '',
    type: '',
    appeal_status: ''
  })

  const openDialog = (params: any) => {
    dialogFormVisible.value = true
    searchFormState.value.id = params.id
    addObj.value.payment_amount = params.payment_amount
    addObj.value.type = params.payment_type
    addObj.value.appeal_status = params.appeal_status
    handleSearch()
  }
  defineExpose({ openDialog })

  const handleSearch = async () => {
    Object.assign(searchParams, { ...searchFormState.value })
    getData()
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
      apiFn: getRefundRecord,
      apiParams: {
        page: 1,
        size: 999
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
          prop: 'amount',
          label: '退款金额',
          align: 'center'
        },
        {
          prop: 'refund_cause',
          label: '原因',
          align: 'center'
        },
        {
          prop: 'time',
          label: '时间',
          align: 'center',
          width: 130,
          showTooltip: true
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
          formatter: (row: any) => {
            return row.status == 1 ? '成功' : '失败'
          }
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          useSlot: true
        }
      ]
    }
  })

  // const handleAdd = () => {
  //   innerVisible.value = true
  // }

  const handleChange = (val: any) => {
    console.log(val)
    form.value.refund_cause = val
  }
  const handleCancel = () => {
    form.value.refund_amount = ''
    form.value.platform_reply = ''
    form.value.refund_cause = ''
    innerVisible.value = false
  }
  const handleSubmit = async () => {
    if (!form.value.refund_amount) {
      ElMessage.error('请输入退款金额')
      return
    }
    if (!form.value.refund_cause) {
      ElMessage.error('请选择退款原因')
      return
    }
    if (form.value.refund_cause == '其他' && !form.value.platform_reply) {
      ElMessage.error('请输入退款原因')
      return
    }
    if (form.value.refund_amount > addObj.value.payment_amount) {
      ElMessage.error('退款金额不能大于支付金额')
      return
    }
    const res = await handleOrderAppeal({
      id: searchFormState.value.id,
      refund_amount: form.value.refund_amount,
      refund_cause: form.value.refund_cause == '其他' ? '' : form.value.refund_cause,
      platform_reply: form.value.platform_reply,
      appeal_status: addObj.value.appeal_status,
      type: addObj.value.type
    })
    console.log(res, '==')
    innerVisible.value = false
  }

  const handleRefund = (row: any) => {
    console.log(row)
  }
</script>

<style lang="scss" scoped>
  :deep(.cell) {
    padding: 0;
  }
</style>
