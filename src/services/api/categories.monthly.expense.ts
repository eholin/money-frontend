import axios from '@/services/http.ts'
import type {CategoryMonthlySummary} from "@/types/categories.ts";

export async function fetchCategoriesMonthlyExpense(): Promise<CategoryMonthlySummary[]> {
    const {data} = await axios.get('/wallet/expense/category-monthly')
    return data
}