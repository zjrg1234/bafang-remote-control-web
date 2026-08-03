<template>
  <div class="card art-custom-card">
    <div class="card-header">
      <div class="title">
        <h4 class="box-title">预约数据</h4>
      </div>
    </div>
    <ArtBarChart
      class="chart"
      barWidth="50%"
      height="19rem"
      :showAxisLine="false"
      :data="data"
      :xAxisData="dateData"
    />
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      data?: any[]
      dateData?: string[]
    }>(),
    {
      data: () => [],
      dateData: () => []
    }
  )
</script>

<style lang="scss" scoped>
  .card {
    box-sizing: border-box;
    width: 100%;
    height: 343px;
    padding: 16px;
    padding-top: 0;

    .chart {
      box-sizing: border-box;
      width: 100%;
      height: 220px;
      padding: 10px;
      border-radius: calc(var(--custom-radius) / 2 + 4px) !important;
    }

    .text {
      margin-left: 3px;

      h3 {
        margin-top: 20px;
        font-size: 18px;
        font-weight: 500;
      }

      p {
        margin-top: 5px;
        font-size: 14px;

        &:last-of-type {
          height: 42px;
          margin-top: 5px;
        }
      }
    }
  }

  .dark {
    .card {
      .chart {
        background: none;
      }
    }
  }

  @media screen and (max-width: $device-phone) {
    .dark {
      .card {
        .chart {
          padding: 15px 0 0 !important;
        }
      }
    }
  }
</style>
