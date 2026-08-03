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
          <template #id="{ $index }">
            {{ $index + 1 }}
          </template>
        </ArtTable>
      </ElCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchRefundList } from '@/api/financeManage'

  defineOptions({ name: 'RefundRecord' })
  // 表单搜索初始值
  const searchFormState = ref({
    refund_type: '',
    user_name: '',
    phone: '',
    order_no: ''
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'user_name',
      label: '用户',
      type: 'input',
      labelWidth: 100,
      props: {
        placeholder: '请输入用户昵称'
      }
    },
    {
      key: 'phone',
      label: '车主',
      type: 'input',
      labelWidth: 100,
      props: {
        placeholder: '请输入车主电话'
      }
    },
    {
      key: 'refund_type',
      label: '退款状态',
      type: 'select',
      props: {
        placeholder: '请选择退款状态',
        options: [
          {
            label: '已添加',
            value: '1'
          },
          {
            label: '已撤销',
            value: '2'
          }
        ]
      }
    },
    {
      key: 'order_no',
      label: '预约号',
      type: 'input',
      labelWidth: 100,
      props: {
        placeholder: '请输入预约号'
      }
    }
  ])

  const handleSearch = async () => {
    const { ...filtersParams } = searchFormState.value

    // 搜索参数赋值
    Object.assign(searchParams, {
      ...filtersParams
    }) // 设置完成时间

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
      apiFn: fetchRefundList,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center',
          useSlot: true
        },
        {
          prop: 'user_name',
          label: '用户',
          align: 'center'
        },
        {
          prop: 'phone',
          label: '车主',
          align: 'center'
        },
        {
          prop: 'vehicle_name',
          label: '车辆名称',
          align: 'center'
        },
        {
          prop: 'order_no',
          label: '预约编号',
          align: 'center'
        },
        {
          prop: 'refund_amount',
          label: '退款金额',
          align: 'center',
          sortable: true
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
          showTooltip: true
        },
        {
          prop: 'refund_type',
          label: '状态',
          align: 'center',
          formatter: (row) => {
            return row.refund_type === 1 ? '已添加' : '已撤销'
          }
        }
      ]
    }
  })
</script>
