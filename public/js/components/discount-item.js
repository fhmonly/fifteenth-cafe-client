class DiscountItem extends HTMLElement {
    constructor() {
        super()
        this.template = `
            <div class="my-3 flex border-2 border-[#A91D3A] rounded-md py- text-start font-bold text-white">
                <span class="bg-[#A91D3A] p-[10px] rounded-l-[2px]">
                    <p class="mx-3 text-xs">Diskon</p>
                    <p class="mx-3 text-3xl">__discount-value__</p>
                </span>
                <div class="ms-5 my-auto">
                    <p class="text-black font-bold text-l">__discount-name__</p>
                    <p class="text-black font-medium text-xs">__discount-type__</p>
                </div>
            </div>
        `
        this.discount = ""
    }
    connectedCallback() {
        this.discount = JSON.parse(this.getAttribute("data-json"));
        this.template = this.template
            .replace("__discount-value__", this.discount.diskon_value)
            .replace("__discount-name__", this.discount.diskon_name)
            .replace("__discount-type__", this.discount.diskon_type);
        this.innerHTML = this.template;
        this.addEventListener("click", () => {
            Swal.clickConfirm()
            fireCustomEventTo({
                eventName: "use-voucher",
                targetElement: document.querySelector(".form-footer-pay"),
                eventDetail: {
                    discount: this.discount
                }
            })
        })
    }
}

customElements.define("discount-item", DiscountItem)