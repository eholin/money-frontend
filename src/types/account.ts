export interface Account {
    id: number
    name: string
    currency: string
}

export interface MonthlySummary {
    month: string
    balance: number
    incrementalBalance: number
    totalIncome: number
    totalExpense: number
    totalInvested: number
}

export interface AccountSummary {
    currency: string
    balance: number
    totalIncome: number
    totalExpense: number
    totalInvested: number
    startDate: string
    monthlyData: MonthlySummary[]
}