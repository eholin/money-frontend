import axios from '@/services/http'
import type { Account, AccountSummary } from '@/types/account'

export async function fetchAccounts(): Promise<Account[]> {
    const { data } = await axios.get('/accounts')
    return data
}

export async function fetchAccountSummary(
    accountId: number
): Promise<AccountSummary> {
    const { data } = await axios.get(`/accounts/${accountId}/summary`)
    return data
}
