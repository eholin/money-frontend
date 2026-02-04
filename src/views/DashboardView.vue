<template>
  <div class="dashboard">
    <h1>Wallet summary</h1>

    <div v-if="summary" class="summary">
      <p>Currency: {{ summary.currency }}</p>
      <p>Balance: {{ summary.balance.toLocaleString() }}</p>
      <p>Total income: {{ summary.totalIncome.toLocaleString() }}</p>
      <p>Total expense: {{ summary.totalExpense.toLocaleString() }}</p>
      <p>Total invested: {{ summary.totalInvested.toLocaleString() }}</p>
    </div>

    <MonthlyStackedBarChart
        title="Monthly Income vs Expense"
        :labels="months"
        :income="monthlyIncome"
        :expense="monthlyExpense"
        currency="₽"
    />

    <MonthlyBarChart
        title="Monthly income"
        :labels="months"
        :values="monthlyIncome"
        currency="₽"
    />

    <MonthlyBarChart
        title="Monthly expense"
        :labels="months"
        :values="monthlyExpense"
        currency="₽"
    />

    <MonthlyBarChart
        title="Monthly balance"
        :labels="months"
        :values="monthlyBalance"
        currency="₽"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard.store';
import MonthlyBarChart from '@/components/MonthlyBarChart.vue';
import MonthlyStackedBarChart from '@/components/MonthlyStackedBarChart.vue';

const store = useDashboardStore();
const {
  summary,
  months,
  monthlyIncome,
  monthlyExpense,
  monthlyBalance,
} = storeToRefs(store);

onMounted(() => {
  store.loadSummary();
});
</script>