export interface MonthlyWalletData {
    month: string;
    balance: number;
    incrementalBalance: number;
    totalIncome: number;
    totalExpense: number;
    totalInvested: number;
}

export interface FinancialCategorySummary {
    '@id': string;
    '@type': string;
    id: number;
    name: string,
    currency: string;
    total: number;
}

export interface WalletSummary {
    currency: string;
    balance: number;
    totalIncome: number;
    totalExpense: number;
    totalInvested: number;
    startDate: string;
    monthlyData: MonthlyWalletData[];
}
