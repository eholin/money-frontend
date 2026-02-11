import axios from '@/services/http.ts'
import type {FinancialCategorySummary} from "@/types/wallet.ts";

export async function fetchFinancialCategoriesIncomeAverage(): Promise<FinancialCategorySummary[]> {
    const {data} = await axios.get('/wallet/income/category-average')
    return data
}