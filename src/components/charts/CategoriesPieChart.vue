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

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer
]);

const props = defineProps<{
  title: string;
  data: [{ value: number, name: string }];
}>();

const currency = '₽';

// Функция форматирования чисел в валюту
const formatCurrency = (value: number) => {
  return value.toLocaleString('ru-RU', {minimumFractionDigits: 2}) + ' ' + currency;
};

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
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