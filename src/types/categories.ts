import type {FinancialCategorySummary} from "@/types/wallet.ts";

export interface CategoryMonthlySummary {
    month: string,
    categoriesMonthlyData: FinancialCategorySummary[]
}