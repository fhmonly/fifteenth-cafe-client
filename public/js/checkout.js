document.addEventListener("DOMContentLoaded", () => {
    const orderItemsWrapper = document.querySelector(".order-items-wrapper")
    const cart = JSON.parse(localStorage.getItem("cart"))
    for (const itemName in cart) {
        if (Object.prototype.hasOwnProperty.call(cart, itemName)) {
            const itemData = cart[itemName];
            const checkoutItem = document.createElement("checkout-item");
            checkoutItem.setAttribute("data-json", JSON.stringify(itemData));
            orderItemsWrapper.appendChild(checkoutItem);
        }
    }
    const discountCountainer = document.querySelector(".discount-container")
    const discountItemAll = document.querySelector(".discount-item-count")
    const diskonList = [
        {
            id: 1,
            diskon_value: "10%",
            diskon_name: "Diskon Hari Kemerdekaan",
            diskon_type: "makanan"
        },
        {
            id: 2,
            diskon_value: "15%",
            diskon_name: "Diskon Akhir Tahun",
            diskon_type: "minuman"
        },
        {
            id: 3,
            diskon_value: "20%",
            diskon_name: "Diskon Pembelian Pertama",
            diskon_type: "minuman"
        },
        {
            id: 4,
            diskon_value: "25%",
            diskon_name: "Diskon Happy Hour",
            diskon_type: "minuman"
        },
        {
            id: 5,
            diskon_value: "5%",
            diskon_name: "Diskon Cashback",
            diskon_type: "dll"
        },
        {
            id: 6,
            diskon_value: "50%",
            diskon_name: "Diskon Flash Sale",
            diskon_type: "makanan"
        },
    ];
    discountItemAll.textContent = diskonList.length
    discountCountainer.addEventListener("click", () => {
        Swal.fire({
            html: `<modal-discount data-json='${JSON.stringify(diskonList)}'></modal-discount>`,
            showConfirmButton: false,
        })
    })
    const formFooterPay = document.querySelector(".form-footer-pay")
    const payBtn = formFooterPay.querySelector(".pay-btn")
    payBtn.addEventListener("click", () => {
        Swal.fire({
            html: "<modal-payment></modal-payment>",
            showConfirmButton: false,
        })
    })
    formFooterPay.addEventListener("update-cart", updateBills)
    formFooterPay.addEventListener("use-voucher", evt => {
        updateBillsUsingVoucher({ eventDetail: evt.detail })
    })
    updateBills()
    function updateBillsUsingVoucher({ eventDetail = {} }) {
        const voucher = document.querySelector("input.voucher");
        let { discount: discountData } = eventDetail;
        voucher.value = JSON.stringify(discountData)
        updateBills()
    }
    function updateBills() {
        const subTotal = document.querySelector("table .sub-total span");
        const ppn = document.querySelector("table .ppn span");
        const applicationFee = document.querySelector("table .application-fee span");
        const discount = document.querySelector("table .discount span");
        const bills = document.querySelector(".form-footer-pay .bills");
        const voucher = document.querySelector("input.voucher");

        if (!bills) return;

        let subTotalValue = 0;
        const ppnPercentage = 11;
        const applicationFeeValue = 2000;

        const cart = JSON.parse(localStorage.getItem("cart") || "{}");

        Object.entries(cart).forEach(item => {
            subTotalValue += (+item[1].price_menu) * +item[1].qty;
        });


        let { id, diskon_value = "0%", diskon_name, diskon_type } = JSON.parse(voucher.value || "{}")
        let discount_amount;
        if (diskon_value.includes("%")) {
            discount_amount = subTotalValue * (+diskon_value.replace("%", "")) / 100;
        } else {
            discount_amount = +diskon_value;
        }

        discount.textContent = discount_amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

        let afterDiscount = subTotalValue - discount_amount;

        const ppnValue = subTotalValue * ppnPercentage / 100;

        const billsValue = afterDiscount + ppnValue + applicationFeeValue;

        // if (discount_amount >= 1) {
        //     subTotal.textContent = `${subTotalValue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} - ${discount_amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`;
        // } else {
        // }
        subTotal.textContent = `${subTotalValue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`;
        ppn.textContent = `${ppnValue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} (${ppnPercentage}%)`;
        applicationFee.textContent = applicationFeeValue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
        bills.textContent = billsValue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

        if (Object.keys(cart).length <= 0) {
            window.location.href = "/";
        }
    }
})