import {defineStore} from 'pinia';
import type {FinancialCategorySummary} from "@/types/wallet.ts";
import {fetchFinancialCategoriesIncomeAverage} from "@/services/api/categories.income.average.ts";

export const useCategoriesIncomeAverageStore = defineStore('categoriesIncomeAverage', {
    state: () => ({
        loading: false,
        categoriesIncomeAverage: [] as FinancialCategorySummary[],
    }),

    actions: {
        async loadCategories() {
            this.loading = true;
            try {
                this.categoriesIncomeAverage = await fetchFinancialCategoriesIncomeAverage();
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        allCategories(): FinancialCategorySummary[] {
            return this.categoriesIncomeAverage;
        },

        incomeAverageCategoriesMap(): Map<number, FinancialCategorySummary> {
            return new Map(this.categoriesIncomeAverage.map(cat => [cat.id, cat]));
        },

        incomeAveragePieChartData(): { value: number; name: string }[] {
            return this.categoriesIncomeAverage.map(category => ({
                value: category?.total || 0,
                name: category.name
            })) || [];
        },

        incomeAveragePieChartDataSorted(): { value: number; name: string }[] {
            return this.categoriesIncomeAverage
                .map(category => ({
                    value: category?.total || 0,
                    name: category.name
                }))
                .filter(item => item.value > 0)
                .sort((a, b) => b.value - a.value) || [];
        },

        totalIncomeAverage(state): number {
            return state.categoriesIncomeAverage.reduce(
                (sum, item) => sum + (item?.total ?? 0),
                0
            )
        }
    },
});