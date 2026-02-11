import axios from '@/services/http.ts'
import type {FinancialCategorySummary} from "@/types/wallet.ts";

export async function fetchFinancialCategoriesExpenseAverage(): Promise<FinancialCategorySummary[]> {
    const {data} = await axios.get('/wallet/expense/category-average')
    return data
}