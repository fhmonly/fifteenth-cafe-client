<template>
    <div class="p-4 mx-2 mb-2 overflow-hidden text-left bg-white rounded-lg shadow-lg">
        <div class="flex items-center mb-3">
            <NuxtImg class="w-[68px] aspect-square rounded-md object-cover" :src="item.image || `/img/no-image.png`"
                :alt="`gambar ${item.menu_name}`" @error="this.src = '/img/no-image.png'" format="webp" />
            <div class="flex-1 ml-4">
                <div class="flex items-center gap-2 text-base font-bold text-black">
                    <span>{{ item.menu_name }}</span>
                    <span>-</span>
                    <span class="text-sm font-normal text-gray-400">
                        {{ toLocaleCurrency(item.price) }}
                    </span>
                </div>
                <p class="text-sm text-gray-600">
                    Total: {{ toLocaleCurrency(totalPrice) }}
                </p>

                <div class="flex items-center justify-start mt-2">
                    <button id="decrement" class="bg-[#A91D3A] text-white px-2 rounded aspect-square h-[29px]"
                        @click="decrement()" type="button" @focusout="updateCartQty()">
                        -
                    </button>
                    <input id="quantity" type="number"
                        class="w-10 text-sm text-center text-black bg-transparent border rounded no-spin-btn"
                        :value="qty" min="1" />
                    <button id="increment" class="bg-[#A91D3A] text-white px-2 rounded aspect-square h-[29px]"
                        @click="increment()" type="button" @focusout="updateCartQty()">
                        +
                    </button>
                </div>
            </div>

            <div class="flex mt-auto ml-4 space-x-2 top-">
                <button class="p-2 text-white bg-red-600 rounded-md delete-item" @click="showConfirmDeleteModal()"
                    type="button">
                    <IconBiTrash />
                </button>
            </div>
        </div>
        <textarea
            class="w-full p-2 text-gray-500 bg-gray-100 border-none rounded resize-none focus:text-gray-800 focus:ring focus:ring-opacity-50"
            rows="2" placeholder="Anything we should know?" v-model="item.notes" @keyup="($event) => {
                notes = $event.target.value
            }" @focusout="updateCartNotes()"></textarea>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2';
import SwalDeleteConfirmation from '../modal/swal-delete-confirmation.vue';

const { cartItems, removeItemFromCart } = useCart()
const { toLocaleCurrency } = useUtils()
const router = useRouter();
const { item, itemIndex } = defineProps({
    item: {
        type: Object
    },
    itemIndex: {
        type: Number
    }
});

const emits = defineEmits(['fetch-detail'])

watch(() => item, () => {
    qty.value = item.qty;
    notes.value = item.notes
})

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
    }).then((result) => {
        if (result.isConfirmed) {
            removeItemFromCart(itemIndex)
            useAuth$fetch('/api/remove-from-cart', {
                method: 'DELETE',
                body: item,
                onResponse() {
                    emits('fetch-detail')
                    if (!cartItems.value.length >= 1) {
                        router.push('/')
                    }
                }
            })
        }
    })
}

function updateCartQty() {
    if (firstQty !== qty.value) {
        useAuth$fetch('/api/update-quantity', {
            method: 'PUT',
            body: {
                menu_id: item.menu_id,
                qty: qty.value
            },
            onResponse() {
                cartItems.value[itemIndex].qty = qty.value
                emits('fetch-detail')
                firstQty = qty.value
            }
        })
    }
}

let isNotesUpdating = false;
function updateCartNotes() {
    if (firstNotes !== notes.value?.trim() && isNotesUpdating === false && notes.value.trim().length > 0) {
        isNotesUpdating = true
        useAuth$fetch('/api/update-notes', {
            method: 'PUT',
            body: {
                menu_id: item.menu_id,
                notes: notes.value
            },
            onResponse() {
                firstNotes = notes.value
                cartItems.value[itemIndex].notes = notes.value
                isNotesUpdating = false
            }
        })
    }
}
</script>