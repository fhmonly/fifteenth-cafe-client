<script setup>
const { cartItems, showModalCheckout, cartDetails, cartItemsStatus } = useCart();
</script>

<template>
    <div class="checkout-wrapper sticky bg-main bottom-2 rounded-[7px] flex p-2 items-center mx-2"
        v-show="cartItems.length > 0" :data-is-valid="cartItems.length > 0" :data-length="cartItems.length"
        :items-status="cartItemsStatus">
        <div class="flex items-center checkout-cart grow" @click=" showModalCheckout()">
            <div class="relative flex items-center text-white checkout-icon">
                <LazyIconBiCashCoin width="22" height="22" />
                <small
                    class="rounded-badge bg-black text-[6px] min-h-0 h-fit aspect-square px-1 flex items-center absolute top-[-4px] right-[-4px]">
                    {{ cartItems?.length }}
                </small>
            </div>
            <div class="checkout-price text-[10px] ms-4 font-bold text-white">
                Total: <span>{{ cartDetails?.total }}</span>
            </div>
        </div>
        <NuxtLink to="/checkout"
            class="checkout-btn font-bold rounded-md bg-white text-black border-none ms-auto text-[10px] p-2 min-h-0 h-fit px-4 hover:opacity-90">
            Checkout
        </NuxtLink>
    </div>
</template>