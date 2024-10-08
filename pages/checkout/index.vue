<template>
    <AppHeader>
        <template #left_content>
            <NuxtLink to="/" class="text-white">
                <IconBiArrowLeftSquareFill />
            </NuxtLink>
        </template>
    </AppHeader>
    <section class="min-h-full">
        <form action="">
            <div class="p-3 order-container">
                <div class="flex items-center justify-between px-4 py-3 bg-black order-header rounded-t-md">
                    <p class="text-[14px] font-bold text-white">Order Type</p>
                    <p
                        class="flex items-center justify-center p-2 bg-main font-bold text-[9px] text-white rounded-md order-type">
                        Take Away</p>
                </div>
                <div class="py-2 bg-white order-items-wrapper rounded-b-md"></div>
                <button class="w-full p-2 mt-3 font-bold text-white bg-green-500 rounded-md text-[14px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="inline-block mt-[-3px] me-2 bi bi-cart4" viewBox="0 0 16 16">
                        <path
                            d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                    </svg>
                    <span>Add Another</span>
                </button>

                <div class="flex items-center justify-between px-4 py-3 mt-3 rounded-md use-point-wrapper bg-main">
                    <p class="inline-block font-bold text-white text-[13px]">Use 1000 point</p>
                    <input type="checkbox" class="scale-[.8] toggle take-away" checked />
                </div>

                <div class="p-2 mt-3 bg-white rounded-md">
                    <p
                        class="border-[1.2px] font-medium p-2 rounded-md discount-container text-bg-main flex justify-between items-center">
                        <span><span class="discount-item-count">0</span>&nbsp;Discount Available</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                            <path
                                d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                        </svg>
                    </p>
                    <input type="text" hidden class="voucher">
                </div>

                <div class="mt-3">
                    <div class="p-3 px-4 font-bold text-white bg-main rounded-t-md">
                        <p>Detail Payment</p>
                    </div>
                    <div class="p-3 px-4 bg-white rounded-b-md">
                        <table class="w-full">
                            <tbody>
                                <tr class="font-bold">
                                    <td><span class="inline-block py-[1px]">Sub total</span></td>
                                    <td class="text-right sub-total"><span>0</span></td>
                                </tr>
                                <tr>
                                    <td><span class="inline-block py-[1px]">PPN 10%</span></td>
                                    <td class="text-right ppn"><span>0</span></td>
                                </tr>
                                <tr>
                                    <td><span class="inline-block py-[1px]">Application</span></td>
                                    <td class="text-right application-fee"><span>0</span></td>
                                </tr>
                                <tr>
                                    <td><span class="inline-block py-[1px]">Discount</span></td>
                                    <td class="text-right discount"><span>0</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div
                class="sticky bottom-0 flex items-center w-full p-4 text-white justify-stretch bg-main font-bold text-[11px] form-footer-pay">
                <div class="grow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                        class="inline-block mt-[-3px] me-2 bi bi-cart4" viewBox="0 0 16 16">
                        <path
                            d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                    </svg>
                    <span class="bills">Rp. 0</span>
                </div>
                <button class="p-2 bg-black rounded-md px-7 pay-btn" type="button">Pay</button>
            </div>
        </form>
    </section>
</template>
<style>
body {
    background-color: var(--grey-color);
}
</style>