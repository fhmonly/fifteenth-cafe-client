import Swal from "sweetalert2";
import LottiePlayer from "~/components/lottie-player.vue";
import CheckoutCartContainer from "~/components/modal/checkout-cart-container.vue";

let isReadyAddToCart = true;
let isUseCartInitialized = false
export function useCart() {
    const cartItems = useState("cart-items-state", () => [])
    const cartItemsStatus = useState("cart-items-status", () => "idle");
    async function fetchCartItems() {
        try {
            cartItemsStatus.value = 'pending'
            await useAuth$fetch("/api/show-cart", {
                onResponse({ response }) {
                    if (response.ok) {
                        cartItemsStatus.value = 'success'
                        cartItems.value = response._data.cartItems
                    } else {
                        cartItemsStatus.value = 'error'
                    }
                }
            })
        } catch (error) {
            cartItemsStatus.value = 'error'
        }
    }
    const cartDetails = useState("cart-details-state", () => {
        return {
            "promo": null,
            "subTotal": 0,
            "tax": 0,
            "fee": 0,
            "total": 0,
            "roundedTotal": 0,
            "rounding": 0,
        }
    });
    const cartDetailsStatus = useState("cart-details-status", () => "idle");
    async function fetchCartDetails() {
        try {
            cartDetailsStatus.value = 'pending'
            await useAuth$fetch("/api/show-cart", {
                onResponse({ response }) {
                    if (response.ok) {
                        cartDetailsStatus.value = 'success'
                        Object.entries(cartDetails.value).forEach(cartDetailsArr => {
                            cartDetails.value[cartDetailsArr[0]] = response._data[cartDetailsArr[0]]
                        });
                    } else {
                        cartDetailsStatus.value = 'error'
                    }
                }
            })
        } catch (error) {
            cartDetailsStatus.value = 'error'
        }
    }

    if (!isUseCartInitialized) {
        fetchCartDetails()
        fetchCartItems()
        isUseCartInitialized = true
    }

    function addMenuToCart(addItemToCartObj = {}) {
        if (isReadyAddToCart) {
            isReadyAddToCart = false
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
                    ...addItemToCartObj
                },
                onResponse() {
                    fetchCartItems();
                    fetchCartDetails();
                    isReadyAddToCart = true;
                    Swal.close();
                }
            })
        }
    }
    function removeItemFromCart(indexKey, closure = () => { }) {
        cartItems.value.splice(indexKey, 1)
        closure()
    }
    function showModalCheckout() {
        const [modal] = useCreateApp('div', CheckoutCartContainer);

        Swal.fire({
            showConfirmButton: false,
            didRender() {
                Swal.getHtmlContainer().appendChild(modal)
            },
        })
    }
    return {
        cartItems, cartItemsStatus, fetchCartItems,
        cartDetails, cartDetailsStatus, fetchCartDetails,
        addMenuToCart, showModalCheckout, removeItemFromCart
    }
}
