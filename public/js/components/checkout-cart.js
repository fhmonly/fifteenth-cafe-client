class CheckoutCart extends HTMLElement {
    get cart() {
        return JSON.parse(localStorage.getItem("cart") || '{}')
    }
    constructor() {
        super()
        this.checkoutRoute
        this.template = `
            <div class="checkout-wrapper sticky bg-main bottom-2 rounded-[7px] p-2 flex items-center mx-2">
                <div class="checkout-cart flex items-center grow">
                    <div class="checkout-icon flex items-center relative text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-cash-coin w-[22px]" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
                            <path
                                d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                            <path
                                d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                            <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                        </svg>
                        <small
                            class="rounded-badge bg-black text-[6px] min-h-0 h-fit aspect-square px-1 flex items-center absolute top-[-4px] right-[-4px]">0</small>
                    </div>
                    <div class="checkout-price text-[10px] ms-4 font-bold text-white">
                        Total: <span>0</span>
                    </div>
                </div>
                <a href="__checkout-route__"
                    class="checkout-btn font-bold rounded-md bg-white text-black border-none ms-auto text-[10px] p-2 min-h-0 h-fit px-4 hover:opacity-90">
                    Checkout
                </a>
            </div>
        `
    }
    connectedCallback() {
        this.template = this.template.replace("__checkout-route__", this.getAttribute("href"))
        this.innerHTML = this.template
        this.updateAllData()
        this.onWrapperClick()
        this.addEventListener("update-cart", this.updateAllData)
    }
    updateAllData() {
        this.querySelector(".checkout-icon small").textContent = Object.entries(this.cart).length
        let priceTotal = 0
        Object.entries(this.cart).forEach(item => {
            priceTotal += (+item[1].price_menu) * +item[1].qty
        })
        this.querySelector(".checkout-price span").textContent = (+priceTotal).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
        if (Object.entries(this.cart).length <= 0) {
            this.classList.add("hidden")
        } else {
            this.classList.remove("hidden")
        }
    }
    onWrapperClick() {
        const checkoutCart = this.querySelector(".checkout-wrapper .checkout-cart");
        checkoutCart.addEventListener("click", () => {
            Swal.fire({
                showConfirmButton: false,
                html: "<modal-checkout-cart></modal-checkout-cart>",
            })
        });
    }
}
customElements.define("checkout-cart", CheckoutCart)