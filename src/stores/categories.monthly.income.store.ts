import {defineStore} from "pinia";
import {fetchCategoriesMonthlyIncome} from "@/services/api/categories.monthly.income.ts";
import type {CategoryMonthlySummary} from "@/types/categories.ts";

export const useCategoriesMonthlyIncomeStore = defineStore('categoriesMonthlyIncome', {
    state: () => ({
        loading: false,
        categoriesMonthlyIncome: [] as CategoryMonthlySummary[],
    }),

    actions: {
        async loadCategoriesMonthly() {
            this.loading = true;
            try {
                this.categoriesMonthlyIncome = await fetchCategoriesMonthlyIncome();
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        allCategoriesMonthlyIncome(): CategoryMonthlySummary[] {
            return this.categoriesMonthlyIncome;
        },

        categoriesIncomeMonths: (state) =>
            state.categoriesMonthlyIncome.map(m => m.month) ?? [],

    },
});