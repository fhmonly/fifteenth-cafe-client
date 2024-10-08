if (!customElements.get("modal-add-cart")) {
    class ModalAddCart extends HTMLElement {
        constructor() {
            super()
            this.template = `
            <div class="bg-white rounded-lg shadow-sm text-left">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold text-black">Detail Order</h2>
                    <button id="closeButton" class="text-gray-600 text-2xl" onclick="Swal.close();">&times;</button>
                </div>
                <div class="flex items-center">
                    <img src="https://via.placeholder.com/100" alt="Luwak Coffee"
                        class="rounded-lg w-24 h-24 object-cover mr-4 ">
                    <div>
                        <h3 class="font-semibold text-lg text-black">__menu-name__</h3>
                        <p class="text-gray-600 text-start">__menu-price__</p>
                        <div class="mt-2">
                            <button id="decrement" class="bg-main text-white px-2 rounded">-</button>
                            <input id="quantity" type="number"no-btn class="w-10 text-md border rounded text-center bg-black text-white mx-[.2px]" value="1"
                                min="1">
                            <button id="increment" class="bg-main text-white px-2 rounded">+</button>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center items-center mt-4 bg-black w-full h-10 rounded-md">
                    <p class="text-white font-semibold text-md me-2">Take away</p>
                    <input type="checkbox" class="toggle take-away" checked="checked"/>
                </div>

                <div class="mt-4 ">
                    <textarea class="w-full p-2 bg-gray-100 rounded border-gray-600 focus:ring focus:ring-opacity-50 resize-none" rows="2"
                        placeholder="Anything we should know?"></textarea>
                </div>

                <div class="flex justify-between items-center mt-4">
                    <button class="flex items-center text-white px-4 py-2 rounded-lg bg-main gap-2 confirm-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart4"
                            viewBox="0 0 16 16">
                            <path
                                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                        </svg>
                        <p class="font-bold">Add to Cart</p>
                    </button>
                    <button class="flex items-center text-bg-main px-4 py-2 rounded-lg gap-2 " onclick="Swal.close()">
                        <p>Cancel</p>
                    </button>
                </div>
            </div>
            `;
            this._dataMenu = {}
            this.addCartLoadingAnimation = `
        <div class="bg-white  rounded-lg p-10 flex flex-col justify-center items-center">
            <dotlottie-player src="/assets/json/animation-cart.json" background="transparent" speed="1" loop autoplay
                style="height: 140px;">
            </dotlottie-player>
            <div class="text-black font-bold text-xl mt-4">Add to Cart</div>
        </div>
        `
        }
        get dataMenu() {
            return this._dataMenu
        }
        set dataMenu(newValue) {
            this._dataMenu = newValue
            this.connectedCallback()
            return this
        }
        connectedCallback() {
            this.innerHTML = ''
            this.template = this.template.replace("__menu-name__", this.dataMenu.nama)
            this.template = this.template.replace("__menu-price__", (+this.dataMenu.price_menu).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }))
            this.innerHTML = this.template
            this.addEvent()
        }
        addEvent() {
            const modal = this
            const decrementButton = this.querySelector("#decrement");
            const incrementButton = this.querySelector("#increment");
            const quantityInput = this.querySelector("#quantity");
            const confirmBtn = this.querySelector(".confirm-button")

            let quantity = parseInt(quantityInput.value);

            incrementButton.addEventListener("click", () => {
                quantityInput.value = quantity += 1;
            });

            decrementButton.addEventListener("click", () => {
                if (quantity > 1) {
                    quantityInput.value = quantity -= 1;
                }
            });

            quantityInput.addEventListener("input", () => {
                quantityInput.value =
                    (parseInt(quantityInput.value) >= 1 && value) || 1;
            });

            confirmBtn.addEventListener("click", () => {
                const cart = JSON.parse(localStorage.getItem("cart") || "{}")
                cart[this.dataMenu.id] = this.dataMenu
                cart[this.dataMenu.id]["is_take_away"] = this.querySelector(".toggle.take-away").value
                cart[this.dataMenu.id]["qty"] = this.querySelector("input#quantity").value
                cart[this.dataMenu.id]["notes"] = this.querySelector("textarea").value
                localStorage.setItem("cart", JSON.stringify(cart))
                Swal.clickConfirm()
                Swal.fire({
                    showConfirmButton: false,
                    html: modal.addCartLoadingAnimation
                })
                setTimeout(() => {
                    Swal.close()
                    fireCustomEventTo({
                        eventName: "update-cart",
                        targetElement: document.querySelector("checkout-cart")
                    })
                }, 2000);
            })
        }
    }

    customElements.define("modal-add-cart", ModalAddCart)
}