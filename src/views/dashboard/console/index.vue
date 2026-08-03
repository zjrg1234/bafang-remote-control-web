<template>
  <div class="console">
    <CardList v-if="loading" :cardData="cardData"></CardList>

    <ElRow :gutter="20">
      <ElCol :sm="24" :md="24" :lg="18">
        <ActiveUser :data="chartState.data" :dateData="chartState.dateData" />
      </ElCol>
      <!-- <ElCol :sm="6" :md="6" :lg="6">
        <NewUser />
      </ElCol> -->
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  import CardList from './modules/card-list.vue'
  import ActiveUser from './modules/active-user.vue'
  // import NewUser from './modules/new-user.vue'
  import { fetchDashboardData } from '@/api/dashboard'
  import { useCommon } from '@/composables/useCommon'

  defineOptions({ name: 'Console' })

  useCommon().scrollToTop()
  let cardData = reactive({
    total_sale: 0,
    today_sale: 0,
    total_make: 0,
    today_make: 0
  })

  // let dateDataVal = reactive([] as any) // 活跃用户数据
  // let dateData = reactive([] as any) // 活跃用户日期
  const loading = ref(false)

  const chartState = reactive({
    data: [] as number[],
    dateData: [] as string[]
  })

  onMounted(() => {
    fetchDashboardData().then((res) => {
      Object.assign(cardData, res.data)

      const dateDataVal: string[] = []
      const dataVal: number[] = []
      Object.keys(res.data.month_num)
        .reverse()
        .forEach((key) => {
          dateDataVal.push(key)
          dataVal.push(Number(res.data.month_num[key]))
        })
      chartState.dateData = dateDataVal
      chartState.data = dataVal
      loading.value = true
    })
  })
</script>

<style lang="scss" scoped>
  @use './style';
</style>
