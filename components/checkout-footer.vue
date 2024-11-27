<script setup>
const { cartItems, showModalCheckout, cartDetails, cartItemsStatus } = useCart();
const { toLocaleCurrency } = useUtils();
</script>

<template>
    <div class="sticky bottom-0 w-full p-2">
        <div class="flex items-center p-1 px-3 text-white rounded-md pe-2 bg-main" v-show="cartItems.length > 0">
            <span class="flex items-center grow gap-x-2" @click=" showModalCheckout()">
                <div class="relative inline-flex py-2 pr-2">
                    <IconBiCashCoin width="24" height="24" />
                    <div
                        class="absolute top-0 right-0 flex items-center justify-center w-auto h-4 text-xs bg-black rounded-full aspect-square min-w-2 shrink-0">
                        {{ cartItems?.length }}
                    </div>
                </div>
                <span class="font-medium">
                    Total : <span>{{ toLocaleCurrency(cartDetails?.subTotal) }}</span>
                </span>
            </span>
            <NuxtLink to="/checkout" class="inline-block h-full p-2 px-4 font-bold text-black bg-white rounded-md">
                Checkout
            </NuxtLink>
        </div>
    </div>
</template>