export function useUtils() {
    return {
        toLocaleCurrency(value) {
            return (+value || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
        },
        getAgeFromDate(date) {
            const dateNow = new Date();
            const birthDate = new Date(date);

            let age = dateNow.getFullYear() - birthDate.getFullYear();

            const monthNow = dateNow.getMonth();
            const birthMonth = birthDate.getMonth();
            const dayNow = dateNow.getDate();
            const birthDay = birthDate.getDate();

            if (
                monthNow < birthMonth ||
                (monthNow === birthMonth && dayNow < birthDay)
            ) {
                age--;
            }

            return age;
        }
    }
}