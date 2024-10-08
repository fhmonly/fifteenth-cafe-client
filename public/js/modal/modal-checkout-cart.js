class ModalCheckoutCart extends HTMLElement {
    constructor() {
        super()
        this.template = `
            <div class="flex items-center px-3 pt-4 pb-2 h-[56px]">
                <p class="text-xl text-black font-bold ms-5">
                    Cart
                    <span class="bg-[#A91D3A] rounded-md ms-2 inline-block p-[3px] px-2 text-white font-semibold items-center aspect-square item-count">0</span>
                </p>
                <button id="closeButton" class="text-black text-2xl font-bold ms-auto" onclick="Swal.close()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="my-1 content overflow-y-auto grow scrollbar-hide">
                <div id="items-container"></div>
                <p id="noDataMessage" class="text-gray-500 text-center mt-4 hidden">No Data</p>
            </div>
        `
    }
    get cart() {
        return JSON.parse(localStorage.getItem("cart") || '{}')
    }
    connectedCallback() {
        this.innerHTML = this.template
        const cartArr = Object.entries(this.cart)
        this.querySelector(".item-count").textContent = Object.entries(this.cart).length
        if (cartArr.length >= 1) {
            let cartItemsHtml = ''
            for (const [key, value] of cartArr) {
                cartItemsHtml += `
                    <checkout-cart-item data-json='${JSON.stringify(value)}'></checkout-cart-item>
                `
            }
            this.querySelector("#items-container").innerHTML = cartItemsHtml
        }
    }
    disconnectedCallback() {
        fireCustomEventTo({
            eventName: "update-cart", targetElement: document.querySelector("checkout-cart")
        })
    }
}

customElements.define("modal-checkout-cart", ModalCheckoutCart)