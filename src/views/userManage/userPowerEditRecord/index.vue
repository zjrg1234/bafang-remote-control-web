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
        </ArtTable>
      </ElCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { getEditEnergyRecord } from '@/api/userManage'
  import { fetchSpecialAreaList } from '@/api/common'

  defineOptions({ name: 'UserBalanceEditRecord' })

  // 表单搜索初始值
  const searchFormState = ref({
    daterange: ['', ''],
    special_area: '',
    username: '',
    phone: '',
    operator_name: '',
    operator_account: ''
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
      key: 'special_area',
      label: '专区',
      type: 'select',
      span: 5,
      props: {
        placeholder: '请选择专区',
        options: specialAreaList.value
      }
    },
    {
      key: 'daterange',
      label: '时间',
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
      key: 'username',
      label: '用户姓名',
      type: 'input',
      labelWidth: 80,
      span: 5,
      props: {
        placeholder: '请输入昵称',
        maxlength: '20'
      }
    },
    {
      key: 'phone',
      label: '用户手机号',
      type: 'input',
      labelWidth: 90,
      props: {
        placeholder: '请输入电话'
      }
    },
    {
      key: 'operator_account',
      label: '后台操作人员账号',
      labelWidth: 130,
      type: 'input',
      props: {
        placeholder: '请输入...'
      }
    }
    // {
    //   key: 'operator_name',
    //   label: '后台操作人员姓名',
    //   labelWidth: 130,
    //   type: 'input',
    //   props: {
    //     placeholder: '请输入...'
    //   }
    // }
  ])

  const handleSearch = async () => {
    const { daterange, ...filtersParams } = searchFormState.value
    const [start_time, end_time] = Array.isArray(daterange) ? daterange : [null, null]
    // 搜索参数赋值
    Object.assign(searchParams, {
      ...filtersParams,
      start_time,
      end_time
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
      apiFn: getEditEnergyRecord,
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
          prop: 'venue',
          label: '专区',
          align: 'center'
        },
        {
          prop: 'user_name',
          label: '用户姓名',
          align: 'center'
        },
        {
          prop: 'phone',
          label: '手机号',
          width: 110,
          align: 'center'
        },
        {
          prop: 'type_name',
          label: '类型',
          align: 'center'
        },
        {
          prop: 'energy',
          label: '金额',
          align: 'center'
        },
        {
          prop: 'surplus_energy',
          label: '修改后余额',
          align: 'center'
        },
        {
          prop: 'operator_account',
          label: '后台操作人员账号',
          width: 120,
          align: 'center'
        },
        // {
        //   prop: 'operator_name',
        //   label: '后台操作人员姓名',
        //   align: 'center',
        //   width: 180
        // },
        {
          prop: 'time',
          label: '时间',
          align: 'center',
          showTooltip: true
        }
      ]
    }
  })
</script>

<style lang="scss" scoped>
  :deep(.cell) {
    padding: 0;
  }
</style>
