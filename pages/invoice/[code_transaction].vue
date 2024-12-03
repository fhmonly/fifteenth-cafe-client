<script setup>
const route = useRoute();
useSeoMeta({
    title: `Invoice ${route.params.code_transaction}`,
});
const { toLocaleCurrency } = useUtils()
const invoice = ref(null);
const invoiceStatus = ref('pending');
async function fetchInvoice() {
    invoiceStatus.value = 'pending'
    try {
        await useAuth$fetch(`/api/invoice/${route.params.code_transaction}`, {
            onResponse({ response }) {
                if (response.ok) {
                    invoiceStatus.value = 'success'
                    invoice.value = response._data.data
                } else {
                    invoiceStatus.value = 'error'
                }
            }
        })
    } catch (error) {
        invoiceStatus.value = 'error'
    }
}

onMounted(() => {
    fetchInvoice()
    async function DOMShot() {
        const html2canvas = (await import('html2canvas')).default;
        const { saveAs } = await import('file-saver');

        const invoiceElem = () => document.querySelector('#invoice-paper');
        const downloadBtn = document.querySelector("#download-invoice");
        window.invoiceElem = invoiceElem()

        downloadBtn.addEventListener('click', () => {
            if (invoiceStatus.value === 'success') {
                html2canvas(invoiceElem(), { scale: 2 })
                    .then((canvas) => {
                        canvas.toBlob((blob) => {
                            saveAs(blob, `INVOICE-${invoice.value.code_transaction}.png`);
                        });
                    })
                    .catch((error) => {
                        console.error('Error saat menangkap elemen:', error);
                    });
            }
        });
    }
    DOMShot()
});
</script>

<template>
    <div>
        <AppHeader>
            <template #left_content>
                <NuxtLink to="/transaction">
                    <IconBiArrowLeftSquareFill />
                </NuxtLink>
            </template>
        </AppHeader>
        <div id="invoice-paper" class="px-4 pb-10 mb-2 text-black bg-white invoice-struct grow"
            v-if="invoiceStatus === 'success'">
            <div>
                <div class="mt-10 mb-5 fifteenth-logo">
                    <h2 class="flex justify-center font-bold text-center">
                        <span href="javascript:void(0)" class="text-3xl">Fifteen</span>
                        <sup class="text-xs font-semibold">TH</sup>
                    </h2>
                </div>
                <div class="cafe-detail text-center text-[12px] font-extrabold">
                    <p class="my-3">Fifteen Cafe by Mark Design</p>
                    <p class="mx-auto font-normal">Jl. Lombok No.15, Ngagel, Kec. Wonokromo, Surabaya, Jawa Timur 60246
                    </p>
                    <div class="divide h-[1px] w-full bg-[#D9D9D9] mt-7"></div>
                </div>
                <table class="text-[10px] mt-4 invoice-1 w-full">
                    <tbody>
                        <tr class="font-bold">
                            <td>Pelanggan</td>
                            <td>Tanggal Order</td>
                        </tr>
                        <tr>
                            <td><span>{{ invoice.name_customer }}</span></td>
                            <td><span>{{ $dayjs(invoice.created_at).format('DD MMM YYYY | hh:mm') }}</span></td>
                        </tr>
                        <tr class="font-bold">
                            <td>Tipe Order</td>
                            <td>Meja</td>
                        </tr>
                        <tr>
                            <td><span class="capitalize">{{ invoice.order_type_food }}</span></td>
                            <td><span>{{ invoice.no_table }}</span></td>
                        </tr>
                        <tr class="font-bold">
                            <td>Tipe Transaksi</td>
                            <td>Kode Transaksi</td>
                        </tr>
                        <tr>
                            <td><span>{{ invoice.payment_method }}</span></td>
                            <td><span>{{ invoice.code_transaction }}</span></td>
                        </tr>
                        <tr class="font-bold">
                            <td>Waktu Bayar</td>
                            <td>Status Pembayaran</td>
                        </tr>
                        <tr>
                            <td><span>{{ $dayjs(invoice.payment_date).format('DD MMM YYYY | hh:mm') }}</span></td>
                            <td><span>{{ invoice.payment_status }}</span></td>
                        </tr>
                        <tr class="text-center">
                            <td colspan="2">Silahkan perluhatkan nota ini ke kasir untuk konfirmasi transaksi pembayaran
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="dt-wrapper text-[10px]">
                    <h3 class="mt-3 font-bold">Detail Transaksi</h3>
                    <table class="w-full invoice-2">
                        <tbody>
                            <tr class="font-bold" v-for="(cart, index) in invoice.shop_carts" :key="index">
                                <td class="">X{{ cart.qty }}</td>
                                <td>{{ cart.menu_name }}</td>
                                <td class="font-normal text-end"><span>{{ toLocaleCurrency(cart.total_price) }}</span>
                                </td>
                            </tr>
                            <tr class="font-bold total-price">
                                <td colspan="2" class="text-end">
                                    <span class="inline-block px-2">Sub Total</span>
                                </td>
                                <td class="font-normal text-end"><span>{{ toLocaleCurrency(invoice.sub_total) }}</span>
                                </td>
                            </tr>
                            <tr class="">
                                <td colspan="2" class="text-end">
                                    <span class="inline-block px-2">Tax</span>
                                </td>
                                <td class="font-normal text-end"><span>{{ toLocaleCurrency(invoice.tax) }}</span></td>
                            </tr>
                            <tr class="">
                                <td colspan="2" class="text-end">
                                    <span class="inline-block px-2">Used points</span>
                                </td>
                                <td class="font-normal text-end">
                                    <span>
                                        {{ invoice.points_used || 0 }}
                                    </span>
                                </td>
                            </tr>
                            <tr class="">
                                <td colspan="2" class="text-end">
                                    <span class="inline-block px-2">Discount</span>
                                </td>
                                <td class="font-normal text-end">
                                    <span>
                                        {{ toLocaleCurrency(invoice.discount_amount) }}
                                    </span>
                                </td>
                            </tr>
                            <tr class="font-bold">
                                <td colspan="2" class="text-end">
                                    <span class="inline-block px-2">Total</span>
                                </td>
                                <td class="font-normal text-end"><span>{{ toLocaleCurrency(invoice.total_amount)
                                        }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-else class="flex items-center justify-center px-4 mb-2 text-black invoice-struct grow">
            <p class="text-center">Loading...</p>
        </div>
        <div class="px-4 mb-4">
            <button type="button"
                class="sticky w-full p-4 mt-auto text-white border-none rounded-md btn bg-main bottom-2"
                id="download-invoice">Download</button>
        </div>
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