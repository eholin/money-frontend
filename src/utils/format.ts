export function formatCurrency(
    value: number,
    currency = 'RUB',
    locale = 'ru-RU'
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    }).format(value)
}