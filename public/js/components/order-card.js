class OrderCard extends HTMLElement {
    constructor() {
        super();
        this._orderJson = {};
        this.template = `
            <div class="order-card my-3">
                <div class="order-header flex justify-between p-3 items-center font-bold text-white">
                    <div class="order-type bg-main px-2 py-1 rounded-md text-white">
                        <span class="order-service">dine in</span>
                        &nbsp;-&nbsp;
                        <span class="order-payment">qris</span>
                    </div>
                    <div class="order-time">12 September 2024 - 04:30 pm</div>
                </div>
                <div class="order-body">
                    <div class="order-details">
                        <table class="w-full">
                            <tr>
                                <td><span>Table</span></td>
                                <td class="table-number">12</td>
                            </tr>
                            <tr>
                                <td><span>Invoice Number</span></td>
                                <td class="invoice-number">yttrghdwj98</td>
                            </tr>
                            <tr>
                                <td><span>Total Order</span></td>
                                <td class="total-order">1</td>
                            </tr>
                            <tr>
                                <td><span>Payment Status</span></td>
                                <td class="payment-status">
                                    <div class="badge-success text-white w-fit px-3 py-1 rounded-md ms-auto">
                                        success
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="order-total-price">
                        <table class="w-full">
                            <tr>
                                <td><span>Grand Total</span></td>
                                <td>Rp. 100.000</td>
                            </tr>
                        </table>
                    </div>
                    <div class="flex justify-center">
                        <a href="/invoice">Invoice Details</a>
                    </div>
                </div>
            </div>
        `;
    }

    set orderJson(json) {
        this._orderJson = JSON.parse(json);
        this.render();
    }

    get orderJson() {
        return this._orderJson;
    }

    render() {
        this.innerHTML = this.template;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ["order-json"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "order-json") this.orderJson = newValue;
    }
}

customElements.define("order-card", OrderCard);
