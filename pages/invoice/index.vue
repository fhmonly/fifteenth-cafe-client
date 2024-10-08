<script setup>
useSeoMeta({
    title: "Invoice",
})
</script>

<template>
    <AppHeader>
        <template #left_content>
            <NuxtLink to="/transaction" class="text-white ps-2">
                <IconBiArrowLeftSquareFill />
            </NuxtLink>
        </template>
    </AppHeader>
    <div class="px-4 mb-2 text-black invoice-struct">
        <div class="my-10 fifteenth-logo">
            <h1 class="flex justify-center text-center">
                <span class="fifteenth-logo">Fifteen</span>
                <sup>TH</sup>
            </h1>
        </div>
        <div class="cafe-detail text-center text-[12px] font-extrabold">
            <p class="my-3">Fifteen Cafe by Mark Design</p>
            <p class="mx-auto font-normal">Jl. Lombok No.15, Ngagel, Kec. Wonokromo, Surabaya, Jawa Timur 60246</p>
            <div class="divide h-[1px] w-full bg-[#D9D9D9] mt-7"></div>
        </div>
        <table class="text-[10px] mt-4 invoice-1">
            <tbody>
                <tr class="font-bold">
                    <td>Pelanggan</td>
                    <td>Tanggal Order</td>
                </tr>
                <tr>
                    <td><span>Mulyono</span></td>
                    <td><span>23 September 2024 - 22:30 AM</span></td>
                </tr>
                <tr class="font-bold">
                    <td>Tipe Order</td>
                    <td>Meja</td>
                </tr>
                <tr>
                    <td><span>Dine in</span></td>
                    <td><span>12</span></td>
                </tr>
                <tr class="font-bold">
                    <td>Tipe Transaksi</td>
                    <td>Kode Transaksi</td>
                </tr>
                <tr>
                    <td><span>QRIS</span></td>
                    <td><span>SAFASHSJS61SB</span></td>
                </tr>
                <tr class="font-bold">
                    <td>Waktu Transaksi</td>
                    <td>Status Order</td>
                </tr>
                <tr>
                    <td><span>23 September 2024 - 22:30 AM</span></td>
                    <td><span>Sukses</span></td>
                </tr>
                <tr class="text-center">
                    <td colspan="2">Silahkan perluhatkan nota ini ke kasir untuk konfirmasi transaksi pembayaran</td>
                </tr>
            </tbody>
        </table>
        <div class="dt-wrapper text-[10px]">
            <h3 class="mt-3 font-bold">Detail Transaksi</h3>
            <table class="w-full invoice-2">
                <tbody>
                    <tr class="font-bold">
                        <td class="">X2</td>
                        <td>Kopi Luwak</td>
                        <td class="font-normal text-end"><span>Rp. 300.000</span></td>
                    </tr>
                    <tr class="font-bold">
                        <td>X2</td>
                        <td>Vietnam Drip</td>
                        <td class="font-normal text-end"><span>Rp. 300.000</span></td>
                    </tr>
                    <tr class="font-bold total-price">
                        <td colspan="2" class="text-end">
                            <span class="inline-block px-2">Total</span>
                        </td>
                        <td class="font-normal text-end"><span>Rp. 300.000</span></td>
                    </tr>
                    <tr class="">
                        <td colspan="2" class="text-end">
                            <span class="inline-block px-2">Sub Total</span>
                        </td>
                        <td class="font-normal text-end"><span>Rp. 300.000</span></td>
                    </tr>
                    <tr class="">
                        <td colspan="2" class="text-end">
                            <span class="inline-block px-2">Tax</span>
                        </td>
                        <td class="font-normal text-end"><span>Rp. 300.000</span></td>
                    </tr>
                    <tr class="">
                        <td colspan="2" class="text-end">
                            <span class="inline-block px-2">Rounding</span>
                        </td>
                        <td class="font-normal text-end"><span>Rp. 300.000</span></td>
                    </tr>
                    <tr class="font-bold">
                        <td colspan="2" class="text-end">
                            <span class="inline-block px-2">Total Keseluruhan</span>
                        </td>
                        <td class="font-normal text-end"><span>Rp. 300.000</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button type="button" class="sticky w-full mt-4 text-white border-none btn bg-main bottom-2">Download</button>
    </div>
</template>
<style>
header {
    position: sticky;
    top: 0;
}

.invoice-struct table.invoice-1 tr td:nth-child(even) {
    text-align: end;
}

.invoice-struct table.invoice-1 tr td span {
    padding-bottom: 1rem;
    padding-top: .5rem;
    display: inline-block;
}

.invoice-struct table.invoice-2 tr td span {
    padding-top: .25rem;
    padding-bottom: .5rem;
    display: inline-block;
}

.invoice-2 td:last-child {
    width: 0;
    min-width: fit-content;
    white-space: nowrap
}

.invoice-struct table.invoice-2 tr.total-price {
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
}

.invoice-struct table.invoice-2 tr.total-price td span {
    padding-top: .34rem;
    padding-bottom: .34rem;
}

.dt-wrapper h3 {
    border: 1.5px solid #D9D9D9;
    border-left: none;
    border-right: none;
    padding: .5rem 0;
}
</style>