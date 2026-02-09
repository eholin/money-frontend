import {defineStore} from 'pinia';
import type {FinancialCategory} from "@/types/financial-category";
import {fetchFinancialCategories} from "@/services/financial-categoriesApi";

export const useCategoriesStore = defineStore('categories', {
    state: () => ({
        loading: false,
        categories: [] as FinancialCategory[],
    }),

    actions: {
        async loadCategories() {
            this.loading = true;
            try {
                this.categories = await fetchFinancialCategories();
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        allCategories(): FinancialCategory[] {
            return this.categories;
        },

        // Мапа категорий по ID (настоящая Map)
        categoriesMap(): Map<number, FinancialCategory> {
            return new Map(this.categories.map(cat => [cat.id, cat]));
        },

        // Получить категорию по ID
        getCategoryById() {
            return (id: number) => {
                return this.categoriesMap.get(id) || null;
            };
        },

        // Получить имя категории по ID
        getCategoryNameById() {
            return (id: number) => {
                return this.categoriesMap.get(id)?.name || '';
            };
        },

        categoryNames(): string[] {
            return this.categories.map(cat => cat.name);
        },
    },
});