<script setup>
useSeoMeta({
    titleTemplate: "",
    title: "Transaction",
});
const { data: trxData, status: trxStatus } = useAuthFetch('/api/order-history');
const { toLocaleCurrency } = useUtils();
const historyMode = ref('pending');
const historyData = computed(() => {
    return (trxData.value?.data || []).filter(history => {
        return history?.payment_status === historyMode.value
    })
});
</script>
<template>
    <div>
        <AppHeader>
            <template #left_content>
                <NuxtLink to="/">
                    <IconBiArrowLeftSquareFill />
                </NuxtLink>
            </template>
        </AppHeader>
        <div class="flex flex-col px-5 mt-2 bg-white grow">
            <div class="sticky top-0 flex justify-around text-xs font-bold text-black bg-white tab-wrapper"
                active-tab="process-tab">
                <div class="process-tab w-[49%] text-center py-3" @click="() => historyMode = 'pending'" :class="{
                    'border-b-2 border-blue-600': historyMode === 'pending'
                }">
                    <span>Process</span>
                </div>
                <div class="done-tab w-[49%] text-center py-3" @click="() => historyMode = 'success'" :class="{
                    'border-b-2 border-blue-600': historyMode === 'success'
                }">
                    <span>Done</span>
                </div>
            </div>
            <div class="content-wrapper">
                <div class="my-3 order-card" v-for="invoice in historyData" :key="invoice.code_transaction">
                    <div
                        class="flex items-center justify-between p-3 py-4 font-semibold text-white bg-black rounded-t-lg order-header">
                        <div class="px-2 py-1 text-white rounded-md order-type bg-main">
                            <span class="capitalize order-service">{{ invoice.order_type_food }}</span>
                            &nbsp;-&nbsp;
                            <span class="order-payment">{{ invoice.payment_method }}</span>
                        </div>
                        <div class="order-time">
                            {{ $dayjs(invoice.created_at).format('DD MMM YYYY | hh:mm') }}
                        </div>
                    </div>
                    <div class="order-body rounded-md rounded-t-none border-main border-[1px] border-t-0 text-black">
                        <div class="order-details">
                            <table class="w-full">
                                <tbody>
                                    <tr>
                                        <td><span>Table</span></td>
                                        <td class="table-number">{{ invoice.no_table }}</td>
                                    </tr>
                                    <tr>
                                        <td><span>Invoice Number</span></td>
                                        <td class="truncate invoice-number">
                                            {{ invoice.code_transaction.substring(0, 10) }}##
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>Total Order</span></td>
                                        <td class="total-order">{{ invoice.total_item }}</td>
                                    </tr>
                                    <tr>
                                        <td><span>Payment Status</span></td>
                                        <td class="payment-status">
                                            <div class="px-3 py-1 text-white rounded-md w-fit ms-auto" :class="{
                                                'bg-green-500': invoice.payment_status === 'success',
                                                'bg-yellow-500': invoice.payment_status === 'pending',
                                            }">
                                                {{ invoice.payment_status }}
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
                                        <td>{{ toLocaleCurrency(invoice.total_amount) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="flex justify-center">
                            <NuxtLink :to="`/invoice/${invoice.code_transaction}`">Invoice Details</NuxtLink>
                        </div>
                    </div>
                </div>
                <p v-if="trxStatus !== 'success' && historyData.length < 1" class="p-3 py-10 text-center">Loading...</p>
                <p v-if="trxStatus === 'success' && historyData.length < 1" class="p-3 py-10 text-center">
                    Riwayat transaksi kosong.
                </p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.order-body table tr td:nth-child(even) {
    text-align: end;
    font-weight: 700;
}

.order-body table tr td span {
    display: inline-block;
    padding: 0.5rem 0;
}

.order-body>[class*="order-"] {
    padding: 0.5rem 1rem;
}

.order-body .order-total-price {
    border-top: 1px solid #a91d3a;
}

.order-body a {
    border: 1px solid #a91d3a;
    color: #a91d3a;
    border-radius: 6px;
    margin-bottom: 1rem;
    padding: 0.5rem 0;
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
    text-align: center;
}
</style>