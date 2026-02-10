<template>
  <div class="dashboard-grid">
    <div class="dashboard col">
      <h2>Общая информация по счетам</h2>

      <div v-if="summary" class="summary">
        <p>Валюта: {{ summary.currency }}</p>
        <p>Баланс: {{ summary.balance.toLocaleString() }}</p>
        <p>Всего доход: {{ summary.totalIncome.toLocaleString() }}</p>
        <p>Всего траты: {{ summary.totalExpense.toLocaleString() }}</p>
        <p>Всего инвестировано: {{ summary.totalInvested.toLocaleString() }}</p>
      </div>

      <MonthlyStackedBarChart
          title="Monthly Income vs Expense"
          :labels="months"
          :income="monthlyIncome"
          :expense="monthlyExpense"
          currency="₽"
      />

      <MonthlyCategoriesStackedBarChart
          title="Ежемесячный доход по категориям"
          :data="allCategoriesMonthlyIncome"
      />

      <p>{{ JSON.stringify(allCategoriesMonthlyIncome) }}</p>
      <p>{{ JSON.stringify(categoriesIncomeMonths) }}</p>

      <!--
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
      -->

      <MonthlyBarChart
          title="Monthly balance"
          :labels="months"
          :values="monthlyBalance"
          currency="₽"
      />

      <MonthlyBarChart
          title="Incremental balance"
          :labels="months"
          :values="incrementalBalance"
          currency="₽"
      />
    </div>

    <div class="dashboard col">
      <h2>Доходы и расходы по категориям</h2>
      <CategoriesPieChart
          title="Расходы по категориям"
          currency="₽"
          :data="pieChartDataSorted"
      />

      <CategoriesPieChart
          title="Доходы по категориям"
          currency="₽"
          :data="incomePieChartDataSorted"
      />

    </div>
  </div>
</template>

<style scoped>
.col {
  width: 49%;
}

.dashboard-grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.chart-canvas {
  height: 350px;
  width: 100%;
}

</style>
<script setup lang="ts">
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import {useDashboardStore} from '@/stores/dashboard.store';
import MonthlyBarChart from '@/components/MonthlyBarChart.vue';
import MonthlyStackedBarChart from '@/components/charts/MonthlyStackedBarChart.vue';
import {useCategoriesStore} from "@/stores/categories.store.ts";
import CategoriesPieChart from "@/components/charts/CategoriesPieChart.vue";
import {useCategoriesExpenseStore} from "@/stores/categories.expense.store.ts";
import {useCategoriesIncomeStore} from "@/stores/categories.income.store.ts";
import {useCategoriesMonthlyIncomeStore} from "@/stores/categories.monthly.income.store.ts";
import MonthlyCategoriesStackedBarChart from "@/components/charts/MonthlyCategoriesStackedBarChart.vue";

const store = useDashboardStore();
const categories = useCategoriesStore();
const categoriesExpenseStore = useCategoriesExpenseStore();
const categoriesIncomeStore = useCategoriesIncomeStore();
const categoriesMonthlyIncomeStore = useCategoriesMonthlyIncomeStore();
const {
  summary,
  months,
  monthlyIncome,
  monthlyExpense,
  monthlyBalance,
  incrementalBalance,
  pieChartData,
  pieChartDataSorted
} = storeToRefs(store);

const {allCategories} = storeToRefs(categories);

const {
  incomePieChartData,
  incomePieChartDataSorted
} = storeToRefs(categoriesIncomeStore);

const {
  categoriesIncomeMonths,
  allCategoriesMonthlyIncome
} = storeToRefs(categoriesMonthlyIncomeStore);

onMounted(() => {
  store.loadSummary();
  categories.loadCategories();
  categoriesExpenseStore.loadCategories();
  categoriesIncomeStore.loadCategories();
  categoriesMonthlyIncomeStore.loadCategoriesMonthly();
});

</script>