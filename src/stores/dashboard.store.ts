import {defineStore} from 'pinia';
import {getWalletSummary} from '@/api/wallet.api';
import type {WalletSummary} from '@/types/wallet';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        loading: false,
        summary: null as WalletSummary | null,
    }),

    actions: {
        async loadSummary() {
            this.loading = true;
            try {
                this.summary = await getWalletSummary();
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        months: (state) =>
            state.summary?.monthlyData.map(m => m.month) ?? [],

        monthlyIncome: (state) =>
            state.summary?.monthlyData.map(m => m.totalIncome) ?? [],

        monthlyExpense: (state) =>
            state.summary?.monthlyData.map(m => m.totalExpense) ?? [],

        monthlyBalance: (state) =>
            state.summary?.monthlyData.map(m => m.balance) ?? [],

        monthlyInvested: (state) =>
            state.summary?.monthlyData.map(m => m.totalInvested) ?? [],

        incrementalBalance: (state) =>
            state.summary?.monthlyData.map(m => m.incrementalBalance) ?? [],

        pieChartData(): { value: number; name: string }[] {
            return this.summary?.expenseCategories.map(category => ({
                value: category?.total || 0,
                name: category.name
            })) || [];
        },

        pieChartDataSorted(): { value: number; name: string }[] {
            return this.summary?.expenseCategories
                .map(category => ({
                    value: category?.total || 0,
                    name: category.name
                }))
                .filter(item => item.value > 0)
                .sort((a, b) => b.value - a.value) || [];
        },
    },
});