import axios from '@/services/http.ts'
import type {FinancialCategorySummary} from "@/types/wallet.ts";

export async function fetchFinancialCategoriesExpense(): Promise<FinancialCategorySummary[]> {
    const {data} = await axios.get('/wallet/expense/category-summary')
    return data
}