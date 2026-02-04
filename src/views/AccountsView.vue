<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchAccounts, fetchAccountSummary } from '@/services/accountsApi'
import AccountCard from '@/components/accounts/AccountCard.vue'
import type { Account, AccountSummary } from '@/types/account'

const accounts = ref<Account[]>([])
const summaries = ref<Record<number, AccountSummary>>({})
const loading = ref(true)

onMounted(async () => {
  accounts.value = await fetchAccounts() ?? null

  await Promise.all(
      accounts.value.map(async account => {
        summaries.value[account.id] =
            await fetchAccountSummary(account.id) ?? null
      })
  )

  loading.value = false
})
</script>

<template>
  <div>
    <h1>Счета</h1>

    <div v-if="loading">Загрузка...</div>

    <div v-else class="accounts-grid">
      <template v-for="account in accounts" :key="account.id">
        <AccountCard
            v-if="summaries[account.id]"
            :account="account"
            :summary="summaries[account.id]!"
        />
      </template>
    </div>
  </div>
</template>