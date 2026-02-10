<template>
  <div class="chart">
    <h3>{{ title }}</h3>
    <v-chart class="monthly-categories-chart-canvas" :option="option" autoresize/>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {use} from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';
import VChart from 'vue-echarts';
import type {CategoryMonthlySummary} from "@/types/categories.ts";

use([
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  CanvasRenderer,
]);

const props = defineProps<{
  title: string;
  data: CategoryMonthlySummary[]
}>();


const option = computed(() => buildStackedBarOption(props.data))

function buildStackedBarOption(source: CategoryMonthlySummary[]) {
  const months = source.map(m => m.month)

  const CATEGORY_PRIORITY: Record<number, number> = {
    5: 1,   // Доход — всегда снизу
    22: 2,  // Проценты
    3: 3,   // Кэшбек
    37: 4,  // Вывод с брокерского счета
  }

  // categoryId → series
  const seriesMap = new Map<number, any>()

  source.forEach((month, monthIndex) => {
    month.categoriesMonthlyData.forEach(category => {
      if (!seriesMap.has(category.id)) {
        seriesMap.set(category.id, {
          categoryId: category.id,
          name: category.name,
          type: 'bar',
          stack: 'income',
          emphasis: { focus: 'series' },
          data: Array(source.length).fill(0),
        })
      }

      seriesMap.get(category.id).data[monthIndex] = category.total
    })
  })

  const series = Array.from(seriesMap.values())

  series.sort((a, b) => {
    const pa = CATEGORY_PRIORITY[a.categoryId] ?? 999
    const pb = CATEGORY_PRIORITY[b.categoryId] ?? 999
    return pa - pb
  })


  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any[]) => {
        if (!Array.isArray(params) || params.length === 0) {
          return ''
        }

        const total = params.reduce(
            (sum, p) => sum + (Number(p.value) || 0),
            0
        )

        const format = (value: number) =>
            new Intl.NumberFormat('ru-RU', {
              style: 'currency',
              currency: 'RUB',
            }).format(value)

        return `
      <strong>${params[0].axisValue}</strong><br/>
      ${params
            .map(
                p =>
                    `${p.marker} ${p.seriesName}: ${format(Number(p.value) || 0)}`
            )
            .join('<br/>')}
      <br/><strong>Итого: ${format(total)}</strong>
    `
      },
    },
    legend: {
      top: 0,
    },
    grid: {
      left: 60,
      right: 20,
      bottom: 40,
    },
    xAxis: {
      type: 'category',
      data: months,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) =>
            new Intl.NumberFormat('ru-RU', {
              notation: 'compact',
            }).format(value),
      },
    },
    series: series,
  }
}
</script>

<style scoped>
.chart {
  margin-bottom: 2rem;
}

.monthly-categories-chart-canvas {
  height: 500px;
  width: 100%;
}
</style>