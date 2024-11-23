<template>
    <div class="p-4 mx-2 mb-2 overflow-hidden text-left bg-white rounded-lg shadow-lg">
        <div class="flex items-center mb-3">
            <NuxtImg class="w-[68px] aspect-square rounded-md object-cover" :src="item.image || '/img/no-image.png'"
                :alt="`gambar ${item.menu_name}`" @error="this.src = `/img/no-image.png`" format="webp" />
            <div class="flex-1 ml-4">
                <div class="text-base font-bold text-black">
                    {{ item.menu_name }} -
                    <span class="text-gray-400 font-thin text-sm">
                        {{ (+item.price || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}
                    </span>
                </div>
                <p class="text-sm text-gray-600">
                    Total: {{ (totalPrice || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                    }}
                </p>

                <div class="flex items-center justify-start mt-2">
                    <button id="decrement" class="bg-[#A91D3A] text-white px-2 rounded aspect-square h-[29px]"
                        @click="decrement()">
                        -
                    </button>
                    <input id="quantity" type="number"
                        class="w-10 text-center bg-transparent border rounded text-md no-btn" :value="qty" min="1" />
                    <button id="increment" class="bg-[#A91D3A] text-white px-2 rounded aspect-square h-[29px]"
                        @click="increment()">
                        +
                    </button>
                </div>
            </div>

            <div class="flex mt-auto ml-4 space-x-2 top-">
                <button class="p-2 text-white bg-red-600 rounded-md delete-item" @click="showConfirmDeleteModal()">
                    <IconBiTrash />
                </button>
                <button class="p-2 text-white bg-green-600 rounded-md delete-item" @click="updateCart()">
                    <IconBiSave />
                </button>
            </div>
        </div>
        <textarea class="w-full p-2 bg-gray-100 border-none rounded resize-none focus:ring focus:ring-opacity-50 "
            rows="2" placeholder="Anything we should know?" v-model="item.notes" @keyup="($event) => {
                notes = $event.target.value
            }"></textarea>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2';
import CheckoutCartContainer from './checkout-cart-container.vue';
import SwalDeleteConfirmation from './swal-delete-confirmation.vue';

const { cartItemsStatus, cartItems } = useCart()
const { item } = defineProps({
    item: {
        type: Object
    },
});

let firstQty = +item.qty || 0
let firstNotes = item.notes || ''

const qty = ref(firstQty);
const notes = ref(firstNotes);
const totalPrice = computed(() => qty.value * (+item.price))

function increment() {
    qty.value += 1
}
function decrement() {
    if (qty.value >= 2) qty.value -= 1
}

function showConfirmDeleteModal() {
    const [modal] = useCreateApp('div', SwalDeleteConfirmation, {
        text: 'Tidak jadi pilih menu ini?'
    })
    Swal.fire({
        showConfirmButton: false,
        didRender() {
            Swal.getHtmlContainer().appendChild(modal)
        }
    }).then(async (result) => {
        const [modal] = useCreateApp('div', CheckoutCartContainer);
        if (result.isConfirmed) {
            await useAuth$fetch('/api/remove-from-cart', {
                method: 'DELETE',
                body: item,
                onResponse() {
                    cartItemsStatus.value = 'to-be-refresh'
                }
            })
        }

        Swal.fire({
            showConfirmButton: false,
            didRender() {
                Swal.getHtmlContainer().appendChild(modal)
            }
        })
    })
}

onUnmounted(() => {
    updateCart(false)
});

function updateCart(updateFirstValueToo = true) {
    if (firstQty !== qty.value) {
        useAuth$fetch('/api/update-quantity', {
            method: 'PUT',
            body: {
                menu_id: item.menu_id,
                qty: qty.value
            },
            onResponse() {
                if (updateFirstValueToo) {
                    firstQty = qty.value
                }
            }
        })
    }
    if (firstNotes !== notes.value?.trim()) {
        useAuth$fetch('/api/update-notes', {
            method: 'PUT',
            body: {
                menu_id: item.menu_id,
                notes: notes.value
            },
            onResponse() {
                if (updateFirstValueToo) {
                    firstNotes = notes.value
                }
            }
        })
    }
}
</script>