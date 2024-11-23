<script setup>
import Swal from 'sweetalert2'
const { insertItemToCart } = useCart()
const { menuData } = defineProps({
    menuData: { type: Object }
});
const qty = ref(1);
function increment() {
    qty.value += 1
}
function decrement() {
    if (qty.value >= 2) qty.value -= 1
}
function insertItem(target) {
    const formdata = new FormData(target)
    insertItemToCart({
        ...menuData,
        menu_id: menuData.id,
        qty: qty.value,
        notes: formdata.get('notes')
    })
}
</script>
<template>
    <form class="text-left bg-white rounded-lg shadow-sm" @submit="($event) => {
        $event.preventDefault()
        insertItem($event.target)
    }">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-black">Detail Order</h2>
            <button id="closeButton" class="text-2xl text-gray-600" @click="Swal.close()">&times;</button>
        </div>
        <div class="flex items-center">
            <NuxtImg :src="menuData.img || '/img/no-image.png'" onerror="this.src='/img/no-image.png'"
                :alt="`gambar ${menuData.nama}`" class="object-cover w-24 h-24 mr-4 rounded-lg" format="webp" />
            <div class="grow">
                <h3 class="text-lg font-semibold text-black">{{ menuData.nama }}</h3>
                <p class="text-gray-600 text-start">
                    {{ (+menuData.price || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}
                </p>
                <div class="flex mt-2 gap-x-1">
                    <button id="decrement" class="px-2 text-white rounded bg-main" @click="decrement()">-</button>
                    <input id="quantity" type="number" no-btn
                        class="w-10 text-center text-white bg-black border rounded text-md" :value="qty" min="1">
                    <button id="increment" class="px-2 text-white rounded bg-main" @click="increment()">+</button>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center w-full h-10 mt-4 bg-black rounded-md">
            <p class="font-semibold text-white text-md me-2">Untuk pesanan bungkus wajib pesan dikasir</p>
        </div>

        <div class="mt-4 ">
            <textarea
                class="w-full p-2 bg-gray-100 border-gray-600 rounded resize-none focus:ring focus:ring-opacity-50"
                rows="2" placeholder="Anything we should know?" name="notes"></textarea>
        </div>

        <div class="flex items-center justify-between mt-4">
            <button class="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-main confirm-button"
                type="submit">
                <IconBiCart4 width="20" height="20" />
                <p class="font-bold">Add to Cart</p>
            </button>
            <button class="flex items-center gap-2 px-4 py-2 rounded-lg text-bg-main " @click="Swal.close()"
                type="button">
                <p>Cancel</p>
            </button>
        </div>
    </form>
</template>