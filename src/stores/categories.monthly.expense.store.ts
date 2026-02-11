import {defineStore} from "pinia";
import type {CategoryMonthlySummary} from "@/types/categories.ts";
import {fetchCategoriesMonthlyExpense} from "@/services/api/categories.monthly.expense.ts";

export const useCategoriesMonthlyExpenseStore = defineStore('categoriesMonthlyExpense', {
    state: () => ({
        loading: false,
        categoriesMonthlyExpense: [] as CategoryMonthlySummary[],
    }),

    actions: {
        async loadCategoriesMonthly() {
            this.loading = true;
            try {
                this.categoriesMonthlyExpense = await fetchCategoriesMonthlyExpense();
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        allCategoriesMonthlyExpense(): CategoryMonthlySummary[] {
            return this.categoriesMonthlyExpense;
        },

        categoriesExpenseMonths: (state) =>
            state.categoriesMonthlyExpense.map(m => m.month) ?? [],

    },
});