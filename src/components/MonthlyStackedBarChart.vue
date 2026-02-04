<template>
  <div class="chart">
    <h3>{{ title }}</h3>
    <v-chart class="chart-canvas" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

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
  labels: string[];
  income: number[];
  expense: number[];
  currency?: string; // по умолчанию RUB
}>();

const currency = props.currency || '₽';

// Функция форматирования чисел в валюту
const formatCurrency = (value: number) => {
  return value.toLocaleString('ru-RU', { minimumFractionDigits: 2 }) + ' ' + currency;
};

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: (params: any) => {
      // params — массив серий для одной категории
      return params
          .map(
              (p: any) =>
                  `<div>${p.seriesName}: <strong>${formatCurrency(p.data)}</strong></div>`
          )
          .join('');
    },
  },
  legend: { data: ['Income', 'Expense'] },
  xAxis: {
    type: 'category',
    data: props.labels,
    axisLabel: {
      rotate: 45,
      formatter: (value: string) => value,
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value: number) => formatCurrency(value),
    },
  },
  series: [
    {
      name: 'Income',
      type: 'bar',
      stack: 'total',
      data: props.income,
      itemStyle: { color: '#4caf50' },
    },
    {
      name: 'Expense',
      type: 'bar',
      stack: 'total',
      data: props.expense,
      itemStyle: { color: '#f44336' },
    },
  ],
}));
</script>

<style scoped>
.chart {
  margin-bottom: 2rem;
}

.chart-canvas {
  height: 350px;
  width: 100%;
}
</style>