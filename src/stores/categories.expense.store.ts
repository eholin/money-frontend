import {defineStore} from 'pinia';
import {fetchFinancialCategoriesExpense} from "@/services/api/categories.expense.ts";
import type {FinancialCategorySummary} from "@/types/wallet.ts";

export const useCategoriesExpenseStore = defineStore('categoriesExpense', {
    state: () => ({
        loading: false,
        categoriesExpense: [] as FinancialCategorySummary[],
    }),

    actions: {
        async loadCategories() {
            this.loading = true;
            try {
                this.categoriesExpense = await fetchFinancialCategoriesExpense();
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        allCategories(): FinancialCategorySummary[] {
            return this.categoriesExpense;
        },

        categoriesMap(): Map<number, FinancialCategorySummary> {
            return new Map(this.categoriesExpense.map(cat => [cat.id, cat]));
        },

        expensePieChartData(): { value: number; name: string }[] {
            return this.categoriesExpense.map(category => ({
                value: category?.total || 0,
                name: category.name
            })) || [];
        },

        expensePieChartDataSorted(): { value: number; name: string }[] {
            return this.categoriesExpense
                .map(category => ({
                    value: category?.total || 0,
                    name: category.name
                }))
                .filter(item => item.value > 0)
                .sort((a, b) => b.value - a.value) || [];
        },
    },
});