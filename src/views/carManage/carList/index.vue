<template>
  <div>
    <ArtSearchBar
      ref="searchBarRef"
      v-model="searchFormState"
      :items="searchItems"
      :is-expand="true"
      :show-expand="false"
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
          <template #vehicleImage="{ row }">
            <ElImage
              :src="row.vehicle_image"
              style="width: 30px; height: 30px"
              fit="fill"
              :preview-src-list="[row.vehicle_image]"
            />
          </template>
          <template #operation="{ row }">
            <div class="operation-buttons">
              <el-link type="info" @click="handleDetail(row)">详情</el-link>
              <span class="gray">|</span>
              <el-link type="danger" @click="handleDelete(row)">删除</el-link>
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>

    <CarDetailDialog ref="carDetailDialogRef" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchCarList, delCar } from '@/api/carManage'
  import { ElMessageBox } from 'element-plus'
  import CarDetailDialog from '@/components/CarDetailDialog/index.vue'

  defineOptions({ name: 'CarManagerChild' })

  const carDetailDialogRef = ref()

  // 表单搜索初始值
  const searchFormState = ref({
    name: '',
    binding_state: '',
    phone: '',
    vehicle_state: '',
    receiver_name: '',
    vehicle_type: ''
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'name',
      label: '车辆名称',
      type: 'input',
      props: {
        placeholder: '请输入车辆名称'
      }
    },
    {
      key: 'binding_state',
      label: '绑定状态',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: [
          { label: '未绑定', value: '0' },
          { label: '遥控器', value: '1' },
          { label: 'APP', value: '2' }
        ]
      }
    },
    {
      key: 'phone',
      label: '所属人电话',
      type: 'input',
      labelWidth: 100,
      props: {
        placeholder: '请输入所属人电话'
      }
    },
    {
      key: 'vehicle_state',
      label: '车辆状态',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: [
          { label: '在线', value: '1' },
          { label: '发射机离线', value: '2' },
          { label: '接收机离线', value: '3' }
        ]
      }
    },
    {
      key: 'receiver_name',
      label: '接收机',
      type: 'input',
      props: {
        placeholder: '请输入接收机'
      }
    },
    {
      key: 'vehicle_type',
      label: '车辆类型',
      type: 'select',
      props: {
        placeholder: '请选择车辆类型',
        options: [
          { label: '遥控车', value: '10' },
          { label: '挖机', value: '20' },
          { label: '铲车', value: '30' }
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
      apiFn: fetchCarList,
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
          prop: 'vehicle_name',
          label: '车辆名称',
          align: 'center'
        },
        {
          prop: 'venue_name',
          label: '所属人',
          align: 'center'
        },
        {
          prop: 'vehicle_type',
          label: '车辆类型',
          align: 'center',
          formatter: (row: any) => {
            if (row.vehicle_type === 10) {
              return '遥控车'
            } else if (row.vehicle_type === 20) {
              return '挖机'
            } else if (row.vehicle_type === 30) {
              return '铲车'
            }
          }
        },
        // {
        //   prop: 'carChildType',
        //   label: '车辆子类型'
        // },
        {
          prop: 'vehicleImage',
          label: '车辆主图',
          useSlot: true,
          align: 'center'
        },
        {
          prop: 'vehicle_state',
          label: '车辆状态',
          align: 'center',
          formatter: (row: any) => {
            if (row.vehicle_state === 0) {
              return '离线'
            } else if (row.vehicle_state === 2) {
              return '发射机在线'
            } else if (row.vehicle_state === 1) {
              return '接收机在线'
            } else {
              return '-'
            }
          }
        },
        {
          prop: 'vehicle_battery',
          label: '电量',
          align: 'center'
        },
        {
          prop: 'binding_name',
          label: '绑定状态',
          align: 'center'
        },
        {
          prop: 'created_at',
          label: '创建时间',
          align: 'center',
          width: 160
        },
        {
          prop: 'operation',
          label: '操作',
          width: 80,
          useSlot: true,
          fixed: 'right',
          align: 'center'
        }
      ]
    }
  })

  const handleDetail = (row: any) => {
    console.log(row)
    carDetailDialogRef.value.openDialog(row.id)
  }

  const handleDelete = (row: any) => {
    ElMessageBox.confirm('确认删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 确认删除，执行删除操作
      delCar({ id: row.id }).then(() => {
        ElMessage.success('删除成功')
        getData()
      })
    })
  }
</script>

<style lang="scss" scoped></style>
