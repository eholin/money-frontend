<script setup lang="ts">
import type { Account, AccountSummary } from '@/types/account'
import AccountCharts from './AccountCharts.vue'
import { formatCurrency } from '@/utils/format'

defineProps<{
  account: Account
  summary: AccountSummary
}>()
</script>

<template>
  <div class="account-card">
    <h2>{{ account.name }}</h2>

    <ul class="summary">
      <li>Баланс: {{ formatCurrency(summary.balance) }}</li>
      <li>Доходы: {{ formatCurrency(summary.totalIncome) }}</li>
      <li>Расходы: {{ formatCurrency(summary.totalExpense) }}</li>
      <li>Инвестировано: {{ formatCurrency(summary.totalInvested) }}</li>
    </ul>

    <AccountCharts :monthlyData="summary.monthlyData" />
  </div>
</template>
