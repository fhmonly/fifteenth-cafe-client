<script setup>
import Swal from 'sweetalert2';

const { cartItems, cartItemsStatus } = useCart();

</script>
<template>
    <div>
        <div class="flex items-center px-3 pt-4 pb-2 h-[56px]">
            <p class="text-xl font-bold text-black ms-5">
                Cart
                <span
                    class="bg-[#A91D3A] rounded-md ms-2 inline-block p-[3px] px-2 text-white font-semibold items-center aspect-square item-count">{{
                        cartItems.length }}</span>
            </p>
            <button id="closeButton" class="text-2xl font-bold text-black ms-auto" onclick="Swal.close()">
                <IconBiX width="25" height="25" />
            </button>
        </div>
        <div class="my-1 overflow-y-auto content grow scrollbar-hide">
            <div id="items-container" v-if="cartItemsStatus === 'success'">
                <LazyModalCheckoutCartItem v-for="item in cartItems" :key="item.id" :item="item" />
            </div>
            <p class="px-5 mt-4 text-center text-gray-500"
                v-if="cartItemsStatus === 'success' && !cartItems.length >= 1">
                Keranjang kosong, silahkan pilih menu terlebih dahulu.
            </p>
            <p class="mt-4 text-center text-gray-500 " v-if="cartItemsStatus !== 'success'">
                Loading...</p>
        </div>
    </div>
</template>