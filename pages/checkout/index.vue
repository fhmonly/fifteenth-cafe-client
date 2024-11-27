<script setup>
import ModalDiscount from '@/components/modal/discount.vue';
import Swal from 'sweetalert2';

const { cartItems, cartItemsStatus, fetchAvailablePromo, currentPromo, availablePromo } = useCart();
const { toLocaleCurrency } = useUtils();
const { data: userData } = useUserData()
const availablePaymentMethod = ref(null);
const cartDetails = ref(null);
const cartDetailsStatus = ref('idle');
const config = useRuntimeConfig()
const router = useRouter();
async function fetchPaymentMethod() {
    await useAuth$fetch('/api/payment-method', {
        onResponse({ response }) {
            availablePaymentMethod.value = response._data.data
        }
    })
}

function showDiscountModal() {
    if (availablePromo.value.length >= 1) {
        const [modal] = useCreateApp('div', ModalDiscount)
        Swal.fire({
            showConfirmButton: false,
            didRender() {
                Swal.getHtmlContainer().appendChild(modal)
            },
            didDestroy() {
                fetchCartDetails()
            }
        })
    }
}

const isUsingPoint = ref(false);

function fetchCartDetails() {
    cartDetailsStatus.value = 'pending'
    $fetch('/api/show-cart-invoice', {
        baseURL: config.public.apiURL,
        method: 'POST',
        credentials: 'include',
        body: {
            'selected_promo_id': currentPromo.value?.id,
            'use_points': isUsingPoint.value,
        },
        onResponseError: async ({ response }) => {
            if (response.status !== 200) {
                const data = response._data || {};
                const qrStatus = data['qr-status'];

                if (qrStatus === 'unscan') {
                    await router.push('/scan-qr');
                }

                if (data['error'] === 'invalid_promo') {
                    Swal.fire({
                        icon: 'error',
                        text: data['message'],
                        confirmButtonColor: 'var(--bg-main)'
                    })
                }
                cartDetailsStatus.value = 'error'
                console.error('Fetch error:', data.message || 'Unknown error');
            }
        },
        onResponse({ response }) {
            if (response.ok) {
                cartDetailsStatus.value = 'success'
                cartDetails.value = response._data
            }
        }
    })
}
function makeTransaction(form) {
    const formData = new FormData(form)
    Swal.fire({
        confirmButtonColor: 'var(--bg-main)',
        icon: 'question',
        title: 'Konfirmasi',
        text: 'Buat pesanan sekarang?',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Iya',
        allowOutsideClick: false
    }).then(result => {
        if (result.isConfirmed) {
            $fetch('/api/checkout', {
                baseURL: config.public.apiURL,
                credentials: 'include',
                method: 'POST',
                body: {
                    'selected_promo_id': currentPromo.value?.id,
                    'name_customer': formData.get('name_customer'),
                    'wa_number': formData.get('wa_number'),
                    'use_points': isUsingPoint.value,
                    'payment_id': formData.get('payment_id'),
                },
                onResponseError: async ({ response }) => {
                    if (response.status !== 200) {
                        const data = response._data || {};
                        const qrStatus = data['qr-status'];

                        if (qrStatus === 'unscan') {
                            await router.push('/scan-qr');
                        }

                        if (data['error'] === 'invalid_promo') {
                            Swal.fire({
                                icon: 'error',
                                text: data['message'],
                                confirmButtonColor: 'var(--bg-main)'
                            })
                        }

                        console.error('Fetch error:', data.message || 'Unknown error');
                    }
                },
                onResponse({ response }) {
                    if (response['code_transaction']) {
                        router.push(`/invoice/${response['code_transaction']}`)
                    }
                }
            })
        }
    })
}

onMounted(() => {
    currentPromo.value = null;
    fetchAvailablePromo();
    fetchPaymentMethod();
});

</script>
<template>
    <div class="flex flex-col min-h-screen">
        <AppHeader>
            <template #left_content>
                <NuxtLink to="/" class="text-white">
                    <IconBiArrowLeftSquareFill />
                </NuxtLink>
            </template>
        </AppHeader>
        <form action="" class="flex flex-col h-full grow" @submit="($event) => {
            $event.preventDefault()
            makeTransaction($event.target)
        }">
            <div class="p-3 order-container grow">
                <div class="mb-3 bg-white rounded-md">
                    <div class="p-3 px-4 font-bold text-white bg-main rounded-t-md">
                        <p>Customer Data</p>
                    </div>
                    <div class="p-4 customer-info">
                        <div class="pt-3 mb-2 wrapper">
                            <input type="text" id="fth_customer-name"
                                class="w-full border-dark border-[1px] rounded-md h-10 placeholder:opacity-0"
                                placeholder="Masukkan nama" name="name_customer" :value="userData?.data?.name_customer"
                                required>
                            <label for="fth_customer-name">
                                Customer Name :
                            </label>
                        </div>
                        <div class="pt-3 mb-2 wrapper">
                            <input type="text" id="fth_customer-phone"
                                class="w-full border-dark border-[1px] rounded-md h-10 placeholder:opacity-0"
                                placeholder="Masukkan nomer hp" name="wa_number" :value="waNumber"
                                pattern="^(08|628)\d{9,11}$" required>
                            <label for="fth_customer-phone">
                                Phone Number :
                            </label>
                        </div>
                        <p class="text-xs font-light text-gray-500 ms-2">Contoh: 6281##### atau 081#####</p>
                    </div>
                </div>
                <div class="mb-3 text-white bg-white rounded-md">
                    <div class="flex items-center justify-between px-4 py-3 bg-black order-header rounded-t-md">
                        <p class="text-[14px] font-bold ">Order Type</p>
                        <p
                            class="flex items-center justify-center p-2 bg-main font-bold text-[9px]  rounded-md order-type">
                            Dine In
                        </p>
                    </div>
                    <div class="py-2 order-items-wrapper rounded-b-md">
                        <div id="items-container" v-if="cartItemsStatus === 'success'">
                            <CheckoutOrderedItem v-for="(item, key) in cartItems" :key="item.id" :item="item"
                                :itemIndex="key" @fetch-detail="fetchCartDetails()" />
                        </div>
                        <p class="px-5 mt-4 text-center text-gray-500"
                            v-if="cartItemsStatus === 'success' && !cartItems.length >= 1">
                            Keranjang kosong, silahkan pilih menu terlebih dahulu.
                        </p>
                        <p class="mt-4 text-center text-gray-500 " v-if="cartItemsStatus !== 'success'">
                            Loading...</p>
                    </div>
                </div>

                <div class="mb-3 bg-white rounded-md">
                    <div class="p-3 px-4 font-bold text-white bg-main rounded-t-md">
                        <p>Detail Payment</p>
                    </div>
                    <button type="button" class="w-full p-3 font-medium cursor-pointer discount-container text-main"
                        @click="showDiscountModal()">
                        <div class="border-[1.2px] rounded-md flex w-full justify-between items-center p-2 px-4">
                            <span class="discount-item-count" v-if="!currentPromo?.id">
                                {{ availablePromo.length }}&nbsp;Discount Available
                            </span>
                            <span class="discount-item-count" v-if="currentPromo?.id">{{ currentPromo.promo_name }} - {{
                                currentPromo.discount_type === 'percentage' ?
                                    `${currentPromo.discount}%` : toLocaleCurrency(currentPromo.discount) }}</span>
                            <IconBiArrowRightSquareFill />
                        </div>
                    </button>
                </div>

                <div class="mb-3">
                    <div class="p-3 px-4 font-bold text-white bg-main rounded-t-md">
                        <p>Detail Payment</p>
                    </div>
                    <div class="p-3 px-4 bg-white rounded-b-md">
                        <table class="w-full">
                            <tbody>
                                <tr class="font-bold">
                                    <td><span class="inline-block py-[1px]">Sub total</span></td>
                                    <td class="text-right sub-total"><span>
                                            {{ toLocaleCurrency(cartDetails?.subTotal) }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span class="inline-block py-[1px]">PPN 10%</span></td>
                                    <td class="text-right ppn"><span>{{ toLocaleCurrency(cartDetails?.tax) }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span class="inline-block py-[1px]">Application</span></td>
                                    <td class="text-right application-fee"><span>{{
                                        toLocaleCurrency(cartDetails?.fee) }}</span></td>
                                </tr>
                                <tr>
                                    <td><span class="inline-block py-[1px]">Discount</span></td>
                                    <td class="text-right discount"><span>{{ toLocaleCurrency(cartDetails?.discount)
                                            }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="flex items-center justify-between px-4 py-3 mb-3 rounded-md use-point-wrapper bg-main">
                    <p class="inline-block font-bold text-white text-[13px]">Use {{ userData?.data?.points }} point</p>
                    <input type="checkbox" class="scale-[.8] toggle take-away switch" name="use_points"
                        :disabled="(+userData?.data?.points || 0) < 1 || cartDetailsStatus === 'pending'" @change="($event) => {
                            isUsingPoint = $event.target.checked
                            fetchCartDetails()
                        }">
                </div>
                <div class="mt-5">
                    <div class="p-3 px-4 font-bold text-white bg-main rounded-t-md">
                        <p>Payment Method</p>
                    </div>
                    <div class="flex flex-col p-2 bg-white rounded-md gap-y-2">
                        <label type="button"
                            class="border-[1.2px] font-medium p-2 rounded-md discount-container text-main flex w-full justify-between items-center cursor-pointer"
                            v-for="(method) in availablePaymentMethod" :key="method.id"
                            :for="`fth_${method.payment_method}`">
                            <span>
                                <span class=" discount-item-count">{{ method.payment_method }}</span>
                            </span>
                            <input type="radio" name="payment_id" :value="method.id"
                                :id="`fth_${method.payment_method}`" class="radio radio-primary radio-xs" required>
                        </label>
                    </div>
                </div>
            </div>
            <div
                class="sticky bottom-0 flex items-center w-full p-4 text-white justify-stretch bg-main font-bold text-[11px] form-footer-pay mt-auto">
                <div class="flex items-center grow gap-x-2">
                    <IconBiCart4 width="26" height="26" />
                    <span class="bills">
                        {{ toLocaleCurrency(cartDetails?.total) }}
                    </span>
                </div>
                <button class="p-2 bg-black rounded-md px-7 pay-btn" type="submit">Pay</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.customer-info .wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.customer-info .wrapper label {
    position: absolute;
    padding: .25rem .5rem;
    font-size: .75rem;
    margin-left: .5rem;
    transition: all 200ms ease;
    background-color: transparent;
}

.customer-info .wrapper input:is(:not(:placeholder-shown), :focus)+label {
    transform: translateY(-80%);
    background-color: white;
}

.customer-info .wrapper input {
    padding: 0 1rem;
    font-size: 14px;
}
</style>