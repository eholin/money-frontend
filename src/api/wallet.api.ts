import { http } from './http';
import type { WalletSummary } from '@/types/wallet';

export const getWalletSummary = async (): Promise<WalletSummary> => {
    const { data } = await http.get('/wallet/summary');
    return data;
};