<template>
  <div class="chart">
    <h3>{{ title }}</h3>
    <v-chart class="pie-chart-canvas" :option="option" autoresize/>
  </div>
</template>

<style scoped>
.chart {
  margin-bottom: 2rem;
}

.pie-chart-canvas {
  height: 450px;
  width: 100%;
}
</style>

<script setup lang="ts">
import {computed} from 'vue';
import {use} from 'echarts/core';
import {PieChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';
import VChart from 'vue-echarts';
import {formatCurrency} from "@/utils/format.ts";

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer
]);

const props = defineProps<{
  title: string;
  data: { value: number, name: string }[];
}>();

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: function (params: {name: string, value: number, percent: number}) {
      const name = params.name;
      const value = params.value;
      const percent = params.percent;

      let htmlString = `<div>`;
      htmlString += `<strong>${name}:</strong> `;
      htmlString += formatCurrency(value) + ` (${percent}%)`;
      htmlString += `</div>`;

      return htmlString;
    }
  },
  series: [
    {
      name: props.title,
      type: 'pie',
      radius: '75%',
      data: props.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
    },
  ],
}));
</script>