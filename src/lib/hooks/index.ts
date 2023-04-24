import currency from "currency.js"

export const FormatNumber = (value: number) => {
    return currency(value, { symbol: '', precision: 0 }).format()
}