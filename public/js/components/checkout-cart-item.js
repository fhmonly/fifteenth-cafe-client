class CartItem extends HTMLElement {
    constructor() {
        super();
        this.template = `
    <div class="mx-2 mb-2 rounded-lg overflow-hidden flex items-center  p-4 bg-white text-left shadow-lg">
        <img
            class="w-[68px] aspect-square rounded-md"
            src="__image-src__"
            alt="__item-name__"
        />
        <div class="ml-4 flex-1">
            <div class="text-black font-bold text-base">__item-name__</div>
            <p class="text-gray-600 text-sm">__item-price__</p>
    
            <div class="flex justify-start items-center mt-2">
                <button
                    id="decrement"
                    class="bg-[#A91D3A] text-white px-2 rounded aspect-square h-[29px]"
                >
                    -
                </button>
                <input
                    id="quantity"
                    type="number"
                    class="w-10 text-md text-center border rounded bg-transparent no-btn"
                    value="__item-qty__"
                    min="1"
                />
                <button
                    id="increment"
                    class="bg-[#A91D3A] text-white px-2 rounded aspect-square h-[29px]"
                >
                    +
                </button>
            </div>
        </div>
    
        <div class="flex mt-auto ml-4 space-x-2 top-">
            <button class="p-2 bg-green-500 rounded-md text-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                    />
                    <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                </svg>
            </button>
            <button class="p-2 bg-red-600 rounded-md text-white delete-item">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                    />
                    <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                    />
                </svg>
            </button>
        </div>
    </div>
    `;
        this.deleteModalTemplate = `
    <div
        class="bg-white rounded-lg p-10 flex flex-col justify-center items-center"
    >
        <dotlottie-player
            src="/assets/json/animation-delete.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            style="height: 140px;"
        >
        </dotlottie-player>
        <div class="text-black font-bold text-xl mt-2">Delete this Item</div>
        <div class="text-black font-base text-xs mt-1">
            Are you sure to delete this item ?
            <div class="flex justify-between mt-5">
                <div
                    class="bg-[#A91D3A] text-white font-bold py-2 px-5 rounded-[6px]"
                 onclick="Swal.clickConfirm()">
                    Delete
                </div>
                <div
                    id="cancelButton"
                    class="bg-slate-500 font-bold py-2 px-5  rounded-[6px]  text-white font-base my-auto" onclick="Swal.clickCancel()"
                >
                    Cancel
                </div>
            </div>
        </div>
    </div>
`;
        this.itemData = {}
    }
    get cart() {
        return JSON.parse(localStorage.getItem("cart") || '{}')
    }
    connectedCallback() {
        this.itemData = JSON.parse(this.getAttribute("data-json"))
        this.render();
    }
    render() {
        this.template = this.template.replaceAll("__item-name__", this.itemData.nama)
        this.template = this.template.replaceAll("__image-src__", this.itemData.image || "/assets/img/no-image.png")
        this.template = this.template.replaceAll("__item-qty__", this.itemData.qty)
        this.template = this.template.replaceAll("__item-price__", (+this.itemData.price_menu).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }))
        this.innerHTML = this.template;
        this.addEvent();
    }
    addEvent() {
        const cartItem = this
        const decrementButton = this.querySelector("#decrement");
        const incrementButton = this.querySelector("#increment");
        const quantityInput = this.querySelector("#quantity");

        let quantity = parseInt(quantityInput.value);

        incrementButton.addEventListener("click", () => {
            const newValue = quantity += 1
            quantityInput.value = newValue;
            updateItemQtyInsideCart(newValue)
        });

        decrementButton.addEventListener("click", () => {
            if (quantity > 1) {
                const newValue = quantity -= 1
                quantityInput.value = newValue
                updateItemQtyInsideCart(newValue)
            } else {
                showModalRemoveItemFromCart()
            }
        });

        quantityInput.addEventListener("input", (event) => {
            const value = event.target.value || ''
            if (value !== "" && +value === 0) {
                showModalRemoveItemFromCart();
            }
            updateItemQtyInsideCart(value)
        });

        quantityInput.addEventListener("wheel", (event) => {
            const value = event.target.value || ''
            if (value !== "" && +value === 0) {
                showModalRemoveItemFromCart();
            }
            updateItemQtyInsideCart(value)
        });

        quantityInput.addEventListener("change", (event) => {
            const value = event.target.value || ''
            if (value !== "" && +value === 0) {
                showModalRemoveItemFromCart();
            }
            updateItemQtyInsideCart(value)
        });

        this.querySelector(".delete-item").addEventListener(
            "click",
            showModalRemoveItemFromCart
        );

        const number = this.getAttribute("item-number");
        function showModalRemoveItemFromCart() {
            Swal.fire({
                html: cartItem.deleteModalTemplate,
                showConfirmButton: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    removeItemFromCart()
                    fireCustomEventTo({
                        eventName: "update-cart", targetElement: document.querySelector("checkout-cart")
                    })
                }
                if (Object.entries(cartItem.cart).length >= 1) {
                    Swal.fire({
                        showConfirmButton: false,
                        html: "<modal-checkout-cart></modal-checkout-cart>",
                    })
                }
            });
        }
        function updateItemQtyInsideCart(newValue) {
            const newObj = cartItem.cart
            newObj[cartItem.itemData.id].qty = newValue
            localStorage.setItem("cart", JSON.stringify(newObj))
        }
        function removeItemFromCart() {
            const newObj = cartItem.cart
            delete newObj[cartItem.itemData.id]
            localStorage.setItem("cart", JSON.stringify(newObj))
        }
    }
}
customElements.define("checkout-cart-item", CartItem);
