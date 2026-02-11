<template>
  <div class="chart">
    <h3>{{ title }}</h3>
    <v-chart class="chart-canvas" :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  margin-bottom: 2rem;
}

.chart-canvas {
  height: 350px;
  width: 100%;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import {formatCurrency} from "@/utils/format.ts";

use([
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  CanvasRenderer,
]);

const props = defineProps<{
  title: string;
  labels: string[];
  values: number[];
}>();

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
  xAxis: {
    type: 'category',
    data: props.labels,
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value: number) => formatCurrency(value),
    },
  },
  series: [
    {
      type: 'bar',
      data: props.values,
      name: props.title,
    },
  ],
}));
</script>