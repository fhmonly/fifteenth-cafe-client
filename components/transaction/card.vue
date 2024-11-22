<template>
    <div class="my-3 order-card">
        <div class="flex items-center justify-between p-3 font-bold text-white order-header">
            <div class="px-2 py-1 text-white rounded-md order-type bg-main">
                <span class="order-service">dine in</span>
                &nbsp;-&nbsp;
                <span class="order-payment">qris</span>
            </div>
            <div class="order-time">12 September 2024 - 04:30 pm</div>
        </div>
        <div class="order-body">
            <div class="order-details">
                <table class="w-full">
                    <tbody>
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
                            <div class="px-3 py-1 text-white rounded-md badge-success w-fit ms-auto">
                                success
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="order-total-price">
                <table class="w-full">
                    <tbody>
                        <tr>
                        <td><span>Grand Total</span></td>
                        <td>Rp. 100.000</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-center">
                <NuxtLink to="/invoice">Invoice Details</NuxtLink>
            </div>
        </div>
    </div>
</template>