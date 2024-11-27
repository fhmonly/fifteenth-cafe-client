<script setup>
const paymentMethod = usePaymentMethod();
</script>
<template>
    <div class="bg-white rounded-lg">
        <div class="relative flex items-center mb-4 bg-[#A91D3A] rounded-t-sm p-3 justify-center">
            <button id="closeButton" class="absolute text-2xl font-bold text-white left-3" onclick="Swal.close()">
                <IconBiArrowLeft class="stroke-3" />
            </button>
            <h2 class="text-xl font-semibold text-white">Payment Method</h2>
        </div>

        <div class="flex flex-col px-6 my-4 gap-y-2">
            <div class="relative flex mt-2 button-pay">
                <div
                    class="absolute top-0 left-3 right-50 mx-auto bg-white text-black text-center rounded-md w-[60px] h-[60px] flex items-center justify-center outline outline-2 outline-[#A91D3A] z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                        class="bi bi-cash-coin" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
                        <path
                            d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                        <path
                            d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                    </svg>
                </div>

                <div class="bg-[#A91D3A] rounded-md p-3 text-center text-sl font-bold text-white mt-5 grow">
                    <p>Cash</p>
                </div>
            </div>

            <div class="relative flex my-2 button-pay">
                <div
                    class="absolute top-0 left-3 right-50 mx-auto bg-white text-black text-center rounded-md w-[60px] h-[60px] flex items-center justify-center outline outline-2 outline-[#A91D3A] z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                        class="bi bi-qr-code-scan" viewBox="0 0 16 16">
                        <path
                            d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z" />
                        <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
                        <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
                        <path
                            d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z" />
                        <path d="M12 9h2V8h-2z" />
                    </svg>
                </div>

                <div class="bg-[#A91D3A] rounded-md p-3 text-center text-sl font-bold text-white mt-5 grow">
                    <p>QRIS</p>
                </div>
            </div>
        </div>
    </div>
</template>