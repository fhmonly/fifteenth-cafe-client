<script setup>
import Swal from 'sweetalert2';

const menuMode = useMenuMode();
const { data, status, error, refresh } = useAuthFetch('/api/category', {
    key: 'api-categories'
});
function changeMenuMode(categoryName) {
    Swal.close()
    menuMode.value = categoryName
}
</script>
<template>
    <div id="modal-category" class="m-auto bg-white rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Categories</h2>
            <button id="closeButton" class="text-gray-600 text-2xl focus-visible:outline-none aspect-square w-[24px]"
                onclick="Swal.close()">&times;</button>
        </div>
        <p class="text-center" v-if="!(data?.categories.length >= 1)">Loading...</p>
        <div class="grid items-center justify-between grid-cols-3 gap-5 mt-4 category-container">
            <div class="flex flex-col items-center m-auto cursor-pointer item" v-for="category in data?.categories"
                :key="category.id" @click="changeMenuMode(category.name)">
                <NuxtImg :src="category.image || '/img/no-image.png'" onerror="this.src='/img/no-image.png'"
                    :alt="`Gambar ${category.name}`" format="webp" />
                <p class="capitalize">{{ category.name }}</p>
            </div>
        </div>
    </div>
</template>