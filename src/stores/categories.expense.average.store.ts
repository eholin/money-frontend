import {defineStore} from 'pinia';
import type {FinancialCategorySummary} from "@/types/wallet.ts";
import {fetchFinancialCategoriesExpenseAverage} from "@/services/api/categories.expense.average.ts";

export const useCategoriesExpenseAverageStore = defineStore('categoriesExpenseAverage', {
    state: () => ({
        loading: false,
        categoriesExpenseAverage: [] as FinancialCategorySummary[],
    }),

    actions: {
        async loadCategories() {
            this.loading = true;
            try {
                this.categoriesExpenseAverage = await fetchFinancialCategoriesExpenseAverage();
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        allCategories(): FinancialCategorySummary[] {
            return this.categoriesExpenseAverage;
        },

        expenseAverageCategoriesMap(): Map<number, FinancialCategorySummary> {
            return new Map(this.categoriesExpenseAverage.map(cat => [cat.id, cat]));
        },

        expenseAveragePieChartData(): { value: number; name: string }[] {
            return this.categoriesExpenseAverage.map(category => ({
                value: category?.total || 0,
                name: category.name
            })) || [];
        },

        expenseAveragePieChartDataSorted(): { value: number; name: string }[] {
            return this.categoriesExpenseAverage
                .map(category => ({
                    value: category?.total || 0,
                    name: category.name
                }))
                .filter(item => item.value > 0)
                .sort((a, b) => b.value - a.value) || [];
        },

        totalExpenseAverage(state): number {
            return state.categoriesExpenseAverage.reduce(
                (sum, item) => sum + (item?.total ?? 0),
                0
            )
        }
    },
});