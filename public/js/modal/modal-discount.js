const rawTemplate = `
        <div class="relative flex items-center mb-4 bg-[#A91D3A] rounded-t-sm p-3 justify-center">
            <button id="closeButton" class="absolute left-3 text-white text-2xl font-bold" onclick="Swal.close()">
                <svg class="stroke-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
            </button>
            <h2 class="text-xl text-white font-semibold">Discount</h2>
        </div>
        <div class="px-4 mb-4">
            <div class="flex">
                <input type="text" id="redeemCode" placeholder="Enter Redeem Code"
                    class="flex-grow border-2 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#A91D3A]">
                <button id="searchButton"
                    class="ml-2 bg-[#A91D3A] text-white px-4 py-2 rounded-md hover:bg-[#86162e] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="m-4 content overflow-y-auto max-h-[200px] scrollbar-hide">
            <div id="itemsContainer">
                
            </div>
            <p id="noDataMessage" class="text-gray-500 text-center mt-4 hidden">No Data</p>
        </div>
`

class ModalDiscount extends HTMLElement {
    constructor() {
        super()
        this.discounts = ""
    }
    connectedCallback() {
        this.template = rawTemplate
        this.discounts = JSON.parse(this.getAttribute("data-json"))
        this.removeAttribute("data-json")
        this.innerHTML = this.template
        this.renderDiscount()
        this.addEvent()
    }
    renderDiscount() {
        const itemsContainer = this.querySelector('#itemsContainer');
        for (const discount of this.discounts) {
            const discountItem = document.createElement("discount-item")
            discountItem.setAttribute("data-json", JSON.stringify(discount))
            itemsContainer.appendChild(discountItem)
        }
    }
    addEvent() {
        const itemsContainer = this.querySelector('#itemsContainer');
        const noDataMessage = this.querySelector('#noDataMessage');
        const searchButton = this.querySelector('#searchButton');
        const redeemCodeInput = this.querySelector('#redeemCode');

        const itemsExist = itemsContainer.children.length > 0;
        if (!itemsExist) {
            noDataMessage.classList.remove('hidden');
        }

        searchButton.addEventListener('click', () => {
            const redeemCode = redeemCodeInput.value;
            if (redeemCode) {
                alert(`Searching for: ${redeemCode}`);
            } else {
                alert('Please enter a redeem code.');
            }
        });
    }
}

customElements.define("modal-discount", ModalDiscount)