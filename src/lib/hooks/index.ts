export const FormatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value)
}