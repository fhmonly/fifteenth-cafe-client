<script setup>
import ModalCategory from "@/components/modal/category.vue";
import Swal from "sweetalert2";

const menuMode = useMenuMode()
const { data: menus, status: menusLoadingStatus, error, refresh } = useAuthFetch('/api/menu', {
    pick: ['data'],
    key: 'api-menus',
});

function showCategoryModal() {
    const [modal] = useCreateApp('div', ModalCategory)
    Swal.fire({
        showConfirmButton: false,
        didRender: () => {
            Swal.getHtmlContainer().appendChild(modal);
        },
    });
}
</script>

<template>
    <div class="main-content bg-[#eeeeee]">
        <AppHeader />
        <Jumbotron />
        <div class="relative flex flex-col items-stretch pt-3 bg-white grow">
            <div class="sticky top-0 z-50 flex flex-col px-5 py-3 bg-white gap-y-2">
                <div class="grid grid-cols-2 text-xs font-semibold text-center text-white gap-x-3">
                    <div class="bg-main rounded-[5px] cursor-pointer flex items-center gap-2 relative p-2"
                        @click="menuMode = 'show-all'">
                        <span class="grow">
                            All Item
                        </span>
                        <span
                            class="bg-white rounded-[5px] text-black me-1 px-1 pt-[1.5px] min-w-[25px] min-h-[25px] flex items-center justify-center absolute right-0">
                            {{ menus?.data?.length || 0 }}
                        </span>
                    </div>
                    <div class="bg-black categories rounded-[5px] p-1 flex items-center justify-center cursor-pointer"
                        @click="showCategoryModal()">
                        <p>Categories</p>
                        <IconBiCaretRightFill width="12" height="12" />
                    </div>
                </div>
                <div class="flex gap-x-2 justify-stretch search-header2">
                    <label
                        class="px-2 py-1 input-bordered flex items-center gap-2 bg-white border-black border-[1px] rounded-[5px] grow focus-within:outline-none focus-within:border-[#a91d3a] text-black">
                        <input type="text" class="text-sm bg-transparent outline-none grow w-full"
                            placeholder="Search...." />
                        <a href="javascript:void(0)" @click="menuMode = 'show-by-keyword'">
                            <IconBiSearch />
                        </a>
                    </label>
                    <NuxtLink to="/transaction"
                        class="history aspect-square w-[32px] flex items-center justify-center text-main border-main border-[1px] rounded-md">
                        <IconBiClockHistory />
                    </NuxtLink>
                    <NuxtLink to="/edit-profile"
                        class="history aspect-square w-[32px] flex items-center justify-center text-main border-main border-[1px] rounded-md">
                        <IconBiPerson />
                    </NuxtLink>
                </div>
                <p class="p-2 text-black bg-red-100 border-red-500 rounded-lg border-[1px] text-xs">
                    Note: Untuk pesanan bungkus wajib pesan dikasir.
                </p>
            </div>
            <div class="flex flex-col px-5 mt-5 menu-result-container grow gap-y-7">
                <div v-if="!menus?.data >= 1" class="flex items-center justify-center w-full h-full">
                    Loading...</div>
                <MenuContainer v-for="(menuByCategory, index) in menus?.data" :key="index"
                    :menus-in-category="menuByCategory" />
            </div>
            <CheckoutFooter class="mt-auto" />
        </div>
    </div>
</template>