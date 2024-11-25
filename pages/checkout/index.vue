<script setup>
const { cartDetails, cartItems, cartItemsStatus } = useCart();
const { toLocaleCurrency } = useUtils();
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <AppHeader>
            <template #left_content>
                <NuxtLink to="/" class="text-white">
                    <IconBiArrowLeftSquareFill />
                </NuxtLink>
            </template>
        </AppHeader>
        <form action="" class="flex flex-col h-full grow">
            <div class="p-3 order-container grow">
                <div class="flex items-center justify-between px-4 py-3 bg-black order-header rounded-t-md">
                    <p class="text-[14px] font-bold text-white">Order Type</p>
                    <p
                        class="flex items-center justify-center p-2 bg-main font-bold text-[9px] text-white rounded-md order-type">
                        Dine In
                    </p>
                </div>
                <div class="py-2 bg-white order-items-wrapper rounded-b-md">
                    <div id="items-container" v-if="cartItemsStatus === 'success'">
                        <CheckoutOrderedItem v-for="(item, key) in cartItems" :key="item.id" :item="item"
                            :itemIndex="key" />
                    </div>
                    <p class="px-5 mt-4 text-center text-gray-500"
                        v-if="cartItemsStatus === 'success' && !cartItems.length >= 1">
                        Keranjang kosong, silahkan pilih menu terlebih dahulu.
                    </p>
                    <p class="mt-4 text-center text-gray-500 " v-if="cartItemsStatus !== 'success'">
                        Loading...</p>
                </div>
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
                                    <td class="text-right sub-total"><span>
                                            {{ toLocaleCurrency(cartDetails?.subTotal) }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span class="inline-block py-[1px]">PPN 10%</span></td>
                                    <td class="text-right ppn"><span>{{ toLocaleCurrency(cartDetails?.tax) }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span class="inline-block py-[1px]">Application</span></td>
                                    <td class="text-right application-fee"><span>{{
                                        toLocaleCurrency(cartDetails?.rounding) }}</span></td>
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
                class="sticky bottom-0 flex items-center w-full p-4 text-white justify-stretch bg-main font-bold text-[11px] form-footer-pay mt-auto">
                <div class="flex items-center grow gap-x-2">
                    <IconBiCart4 width="26" height="26" />
                    <span class="bills">
                        {{ toLocaleCurrency(cartDetails?.rounding) }}
                    </span>
                </div>
                <button class="p-2 bg-black rounded-md px-7 pay-btn" type="button">Pay</button>
            </div>
        </form>
    </div>
</template>
<style>
body {
    background-color: var(--grey-color);
}
</style>