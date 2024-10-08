<script setup>
import Swal from 'sweetalert2'
const { menuData } = defineProps({
    menuData: {
        required: true,
        type: Object,
        validator(value) {
            const { nama, price_menu, category, id } = value
            return !!nama && !!price_menu && !!category && !!id
        },
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
            const modal = document.createElement("modal-add-cart")
            modal.dataMenu = menuData
            Swal.getHtmlContainer().appendChild(modal)
        }
    })
}
</script>
<template>
    <div class="card shadow-xl w-[142px] bg-white rounded-[10px] z-[0] min-h-[184px] h-full">
        <figure>
            <img :src="img" :alt="nama" class="aspect-[142/107]" />
        </figure>
        <div class="gap-1 p-2 card-body">
            <div class="flex">
                <div class="grow">
                    <h2 class="card-title">{{ nama }}</h2>
                    <p class="menu-price">{{ makeIDR(price_menu) }}</p>
                </div>
                <div class="menu-rating text-[7px] text-black flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <div class="text-black">
                        <span>&nbsp;10</span>
                        <span>&nbsp;poin</span>
                    </div>
                </div>
            </div>
            <div class="justify-end mt-auto card-actions">
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