<script setup lang="ts">
import {computed} from 'vue'
import MonthlyBarChart from '@/components/MonthlyBarChart.vue'
import type {MonthlySummary} from '@/types/account'
import MonthlyStackedBarChart from "@/components/MonthlyStackedBarChart.vue";

const props = defineProps<{
  monthlyData: MonthlySummary[]
}>()

const months = computed(() =>
    props.monthlyData.map(m => m.month) ?? []
)

const income = computed(() =>
    props.monthlyData.map(m => m.totalIncome) ?? []
)

const expense = computed(() =>
    props.monthlyData.map(m => m.totalExpense) ?? []
)

const balance = computed(() =>
    props.monthlyData.map(m => m.balance) ?? []
)

const incrementalBalance = computed(() =>
    props.monthlyData.map(m => m.incrementalBalance) ?? []
)
</script>

<template>
  <MonthlyStackedBarChart
      title="Monthly Income vs Expense"
      :labels="months"
      :income="income"
      :expense="expense"
      currency="₽"
  />

  <MonthlyBarChart
      title="Monthly balance"
      :labels="months"
      :values="balance"
      currency="₽"
  />

  <MonthlyBarChart
      title="Incremental balance"
      :labels="months"
      :values="incrementalBalance"
      currency="₽"
  />
</template>