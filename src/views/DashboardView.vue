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
          title="Ежемесячные доходы и расходы"
          :labels="months"
          :income="monthlyIncome"
          :expense="monthlyExpense"
          currency="₽"
      />

      <MonthlyCategoriesStackedBarChart
          title="Ежемесячные доходы по категориям"
          :data="allCategoriesMonthlyIncome"
          :priority="CATEGORY_PRIORITY_INCOME"
      />

      <MonthlyCategoriesStackedBarChart
          title="Ежемесячные расходы по категориям"
          :data="allCategoriesMonthlyExpense"
          :priority="CATEGORY_PRIORITY_EXPENSE"
      />

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
      <p>Доходы в среднем в месяц: {{ totalIncomeAverage.toLocaleString() }}</p>
      <p>Расходы в среднем в месяц: {{ totalExpenseAverage.toLocaleString() }}</p>
      <p>Баланс в среднем в месяц: {{ (totalIncomeAverage - totalExpenseAverage).toLocaleString() }}</p>

      <CategoriesPieChart
          title="Расходы по категориям"
          currency="₽"
          :data="expensePieChartDataSorted"
      />

      <CategoriesPieChart
          title="Расходы по категориям (в среднем в месяц)"
          currency="₽"
          :data="expenseAveragePieChartDataSorted"
      />

      <CategoriesPieChart
          title="Доходы по категориям"
          currency="₽"
          :data="incomePieChartDataSorted"
      />

      <CategoriesPieChart
          title="Доходы по категориям (в среднем в месяц)"
          currency="₽"
          :data="incomeAveragePieChartDataSorted"
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
import {useCategoriesStore} from "@/stores/categories.store.ts";
import {useCategoriesExpenseStore} from "@/stores/categories.expense.store.ts";
import {useCategoriesIncomeStore} from "@/stores/categories.income.store.ts";
import {useCategoriesMonthlyIncomeStore} from "@/stores/categories.monthly.income.store.ts";
import {useCategoriesMonthlyExpenseStore} from "@/stores/categories.monthly.expense.store.ts";
import {useCategoriesIncomeAverageStore} from "@/stores/categories.income.average.store.ts";
import {useCategoriesExpenseAverageStore} from "@/stores/categories.expense.average.store.ts";
import MonthlyBarChart from '@/components/MonthlyBarChart.vue';
import MonthlyStackedBarChart from '@/components/charts/MonthlyStackedBarChart.vue';
import CategoriesPieChart from "@/components/charts/CategoriesPieChart.vue";
import MonthlyCategoriesStackedBarChart from "@/components/charts/MonthlyCategoriesStackedBarChart.vue";

const store = useDashboardStore();
const categories = useCategoriesStore();
const categoriesExpenseStore = useCategoriesExpenseStore();
const categoriesIncomeStore = useCategoriesIncomeStore();
const categoriesIncomeAverageStore = useCategoriesIncomeAverageStore();
const categoriesExpenseAverageStore = useCategoriesExpenseAverageStore();
const categoriesMonthlyIncomeStore = useCategoriesMonthlyIncomeStore();
const categoriesMonthlyExpenseStore = useCategoriesMonthlyExpenseStore();
const {
  summary,
  months,
  monthlyIncome,
  monthlyExpense,
  monthlyBalance,
  incrementalBalance
} = storeToRefs(store);

const {incomePieChartDataSorted} = storeToRefs(categoriesIncomeStore);
const {expensePieChartDataSorted} = storeToRefs(categoriesExpenseStore);
const {
  totalIncomeAverage,
  incomeAveragePieChartDataSorted
} = storeToRefs(categoriesIncomeAverageStore);
const {
  totalExpenseAverage,
  expenseAveragePieChartDataSorted
} = storeToRefs(categoriesExpenseAverageStore);
const {allCategoriesMonthlyIncome} = storeToRefs(categoriesMonthlyIncomeStore);
const {allCategoriesMonthlyExpense} = storeToRefs(categoriesMonthlyExpenseStore);

const CATEGORY_PRIORITY_INCOME: Record<number, number> = {
  5: 1,   // Доход — всегда снизу
  22: 2,  // Проценты
  3: 3,   // Кэшбек
  37: 4,  // Вывод с брокерского счета
}

const CATEGORY_PRIORITY_EXPENSE: Record<number, number> = {
  36: 1,   // Ипотека — всегда снизу
  18: 2,  // Супермаркеты
  9: 3,   // Маркетплейсы
  7: 4,  // ЖКХ
  34: 5, // Кафе и рестораны
}

onMounted(() => {
  store.loadSummary();
  categories.loadCategories();
  categoriesExpenseStore.loadCategories();
  categoriesIncomeStore.loadCategories();
  categoriesIncomeAverageStore.loadCategories();
  categoriesExpenseAverageStore.loadCategories();
  categoriesMonthlyIncomeStore.loadCategoriesMonthly();
  categoriesMonthlyExpenseStore.loadCategoriesMonthly();
});

</script>