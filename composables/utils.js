export function useUtils() {
    return {
        toLocaleCurrency(value) {
            return (+value || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
        }
    }
}