<script setup>
import ModalCategory from "@/components/modal/category.vue";
import { createApp } from 'vue';
import Swal from "sweetalert2";

const menuMode = useMenuMode()
const { data: menus, status: menusLoadingStatus, error, refresh } = useAuthFetch('/api/menu', {
    pick: ['data'],
    key: 'api-menus',
});

function showCategoryModal() {
    Swal.fire({
        showConfirmButton: false,
        didRender: () => {
            const modal = document.createElement('div');
            createApp(ModalCategory).mount(modal);
            Swal.getHtmlContainer().appendChild(modal);
        },
    });
}
</script>

<template>
    <div class="main-content bg-[#eeeeee] flex-1 flex flex-col">
        <AppHeader />
        <Jumbotron />
        <div class="relative flex flex-col flex-1 pt-3 bg-white">
            <div class="text-white search-item-wrapper sticky top-0 z-[1] bg-white shadow-sm px-5 py-2">
                <div class="flex flex-col gap-y-3">
                    <div class="flex font-bold search-header gap-x-2">
                        <div class="all-item bg-main rounded-[5px] cursor-pointer flex p-1"
                            @click="menuMode = 'show-all'">
                            <span class="inline-block text-center grow text-white pt-[1.5px]">
                                All Item
                            </span>
                            <span class="bg-white count-all rounded-[5px] text-black px-1 pt-[1.5px]">{{
                                menus?.data?.length || 0 }}</span>
                        </div>
                        <div class="bg-black categories rounded-[5px] flex p-1 items-center justify-center cursor-pointer"
                            @click="showCategoryModal()">
                            <p>Categories</p>
                            <IconBiCaretRightFill />
                        </div>
                    </div>
                    <div class="flex gap-x-2 justify-stretch search-header2">
                        <label
                            class="px-2 py-1 input-bordered flex items-center gap-2 bg-white border-black border-[1px] rounded-[5px] grow focus-within:outline-none focus-within:border-[#a91d3a] text-black">
                            <input type="text" class="bg-transparent outline-none grow" placeholder="Search...."
                                @input="menuMode = 'show-by-keyword'" />
                            <a href="javascript:void(0)" @click="menuMode = 'show-by-keyword'">
                                <IconBiSearch />
                            </a>
                        </label>
                        <NuxtLink to="/transaction"
                            class="history aspect-square w-[32px] flex items-center justify-center hover:bg-transparent">
                            <IconBiClockHistory />
                        </NuxtLink>
                        <NuxtLink to="/edit-profile"
                            class="history aspect-square w-[32px] flex items-center justify-center hover:bg-transparent">
                            <IconBiPerson />
                        </NuxtLink>
                    </div>
                </div>
                <p class="p-2 mt-3 text-black bg-red-100 border-red-500 rounded-lg border-[1px]">
                    Note: Untuk pesanan bungkus wajib pesan dikasir.
                </p>
            </div>
            <div class="px-5 mt-5 menu-result-container">
                <div v-if="!menus?.data >= 1" class="flex items-center justify-center w-full h-full">
                    Loading...</div>
                <MenuContainer v-for="(menuByCategory, index) in menus?.data" :key="index"
                    :menus-in-category="menuByCategory" />
            </div>
            <LazyCheckoutFooter class="mt-auto" />
        </div>
    </div>
</template>

<style scoped>
.search-header>div {
    flex-grow: 1;
}

.search-header2 .history {
    border-color: var(--bg-main);
    color: var(--bg-main);
}

.search-header2>a {
    border: 1px solid currentColor;
    border-radius: 6px;
}
</style>