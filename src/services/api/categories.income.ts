import axios from '@/services/http.ts'
import type {FinancialCategorySummary} from "@/types/wallet.ts";

export async function fetchFinancialCategoriesIncome(): Promise<FinancialCategorySummary[]> {
    const {data} = await axios.get('/wallet/income/category-summary')
    return data
}