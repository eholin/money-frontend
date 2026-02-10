import axios from '@/services/http.ts'
import type {CategoryMonthlySummary} from "@/types/categories.ts";

export async function fetchCategoriesMonthlyIncome(): Promise<CategoryMonthlySummary[]> {
    const {data} = await axios.get('/wallet/income/category-monthly')
    return data
}