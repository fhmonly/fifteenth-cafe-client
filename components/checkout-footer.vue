<script setup>
import Swal from 'sweetalert2';
import LottiePlayer from './lottie-player.vue';
import CheckoutCartContainer from './modal/checkout-cart-container.vue';

const { data: cartData, status: cartLoadingStatus, refresh: refreshCart } = useAuthFetch('/api/show-cart');
const isCartNotEmpty = computed(() => cartData.value?.cartItems.length >= 1)

const { addToCartData, addToCartStatus, refreshAddToCartState, cartItems, cartItemsStatus } = useCart()

async function addToCart(dataObj = {}) {
    const [modal] = useCreateApp("div", LottiePlayer, {
        src: '/json/animation-cart.json'
    })
    modal.classList.add(...'flex flex-col items-center justify-center p-10 bg-white rounded-lg'.split(' '))
    const textElem = document.createElement("div")
    textElem.classList.add(...'mt-4 text-xl font-bold text-black'.split(' '))
    textElem.textContent = 'Add to Cart'
    modal.appendChild(textElem)
    Swal.fire({
        allowOutsideClick: false,
        showConfirmButton: false,
        didRender() {
            Swal.getHtmlContainer().appendChild(modal)
        }
    })
    useAuth$fetch(`/api/add-to-cart`, {
        method: 'POST',
        body: {
            ...dataObj
        },
        onResponse({ response }) {
            refreshCart();
            Swal.close();
        }
    })
}
watch(cartLoadingStatus, (newCartLoadingStatus) => {
    if (newCartLoadingStatus === 'success') {
        cartItems.value = cartData.value.cartItems
        cartItemsStatus.value = newCartLoadingStatus
    }
})
watch(cartItemsStatus, (newCartItemsStatus) => {
    if (newCartItemsStatus === 'to-be-refresh') {
        refreshCart()
    }
})
watch(addToCartStatus, (newAddToCartStatus) => {
    if (newAddToCartStatus === 'update') {
        addToCart(addToCartData.value).then(() => refreshAddToCartState())
    }
});

function showModalCheckout() {
    const [modal] = useCreateApp('div', CheckoutCartContainer);

    Swal.fire({
        showConfirmButton: false,
        didRender() {
            Swal.getHtmlContainer().appendChild(modal)
        }
    })
}
</script>

<template>
    <div class="checkout-wrapper sticky bg-main bottom-2 rounded-[7px] flex p-2 items-center mx-2"
        v-show="isCartNotEmpty">
        <div class="flex items-center checkout-cart grow" @click=" showModalCheckout()">
            <div class="relative flex items-center text-white checkout-icon">
                <LazyIconBiCashCoin width="22" height="22" />
                <small
                    class="rounded-badge bg-black text-[6px] min-h-0 h-fit aspect-square px-1 flex items-center absolute top-[-4px] right-[-4px]">
                    {{ cartData?.cartItems?.length }}
                </small>
            </div>
            <div class="checkout-price text-[10px] ms-4 font-bold text-white">
                Total: <span>{{ cartData?.total }}</span>
            </div>
        </div>
        <NuxtLink to="/checkout"
            class="checkout-btn font-bold rounded-md bg-white text-black border-none ms-auto text-[10px] p-2 min-h-0 h-fit px-4 hover:opacity-90">
            Checkout
        </NuxtLink>
    </div>
</template>