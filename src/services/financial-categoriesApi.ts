import axios from '@/services/http'
import type {FinancialCategory} from "@/types/financial-category.ts";

export async function fetchFinancialCategories(): Promise<FinancialCategory[]> {
    const {data} = await axios.get('/financial_categories')
    return data
}