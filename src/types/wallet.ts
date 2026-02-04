export interface MonthlyWalletData {
    month: string;
    balance: number;
    totalIncome: number;
    totalExpense: number;
    totalInvested: number;
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
