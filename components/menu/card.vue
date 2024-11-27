<script setup>
import Swal from 'sweetalert2'
import { createApp } from 'vue'
import AddToCart from '@/components/modal/add-to-cart.vue';
const { menuData } = defineProps({
    menuData: {
        required: true,
        type: Object,
    }
})
const { nama, img = "/img/no-image.png", price_menu } = menuData
function makeIDR(params) {
    return params.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}
function showAddCartModal() {
    Swal.fire({
        showConfirmButton: false,
        didRender: () => {
            const modal = document.createElement("div")
            createApp(AddToCart, { menuData }).mount(modal)
            Swal.getHtmlContainer().appendChild(modal)
        }
    })
}
</script>
<template>
    <div class="card shadow-xl w-auto bg-white rounded-[10px] min-h-[184px] h-full flex flex-col">
        <div class="aspect-[142/107] w-full">
            <LazyNuxtImg :src="img" :alt="nama" class="w-full h-full" sizes="200px" fit="cover" format="webp" />
        </div>
        <div class="flex flex-col h-full gap-1 p-3">
            <div class="flex gap-3 grow">
                <div class="grow">
                    <h2 class="mb-2 font-bold text-main card-title line-clamp-2">{{ nama }}</h2>
                    <p class="menu-price">{{ makeIDR(price_menu) }}</p>
                </div>
                <div class="flex items-center gap-2 text-black menu-rating h-fit">
                    <IconBiStarFill />
                    <span class="text-black">
                        10
                    </span>
                </div>
            </div>
            <div class="justify-end mt-auto card-actions ms-auto">
                <button
                    class="flex items-center h-auto min-h-0 px-3 py-1 text-white bg-black rounded-md gap-x-2 hover:bg-opacity-85"
                    @click="showAddCartModal()">
                    <IconBiCart4 />
                    <span class="text-[9px] mt-[2px]">Add</span>
                </button>
            </div>
        </div>
    </div>
</template>