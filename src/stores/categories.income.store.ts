import {defineStore} from 'pinia';
import type {FinancialCategorySummary} from "@/types/wallet.ts";
import {fetchFinancialCategoriesIncome} from "@/services/api/categories.income.ts";

export const useCategoriesIncomeStore = defineStore('categoriesIncome', {
    state: () => ({
        loading: false,
        categoriesIncome: [] as FinancialCategorySummary[],
    }),

    actions: {
        async loadCategories() {
            this.loading = true;
            try {
                this.categoriesIncome = await fetchFinancialCategoriesIncome();
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        allCategories(): FinancialCategorySummary[] {
            return this.categoriesIncome;
        },

        incomeCategoriesMap(): Map<number, FinancialCategorySummary> {
            return new Map(this.categoriesIncome.map(cat => [cat.id, cat]));
        },

        incomePieChartData(): { value: number; name: string }[] {
            return this.categoriesIncome.map(category => ({
                value: category?.total || 0,
                name: category.name
            })) || [];
        },

        incomePieChartDataSorted(): { value: number; name: string }[] {
            return this.categoriesIncome
                .map(category => ({
                    value: category?.total || 0,
                    name: category.name
                }))
                .filter(item => item.value > 0)
                .sort((a, b) => b.value - a.value) || [];
        },
    },
});