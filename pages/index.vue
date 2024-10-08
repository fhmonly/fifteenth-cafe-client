<script setup>
import Swal from "sweetalert2";

useSeoMeta({
    title: "Fifteenth Cafe by Mark Design",
    titleTemplate: ""
});

useHead({
    script: [
        {
            src: "/js/modal/modal-category.js",
        },
        {
            src: "/js/modal/modal-add-cart.js"
        },
    ],
})

const config = useRuntimeConfig()
const menuMode = useMenuMode();
const tableId = "01";
const outletId = 2;
const currentMenuUrl = computed(() => {
    let url = "api/"
    switch (menuMode.value) {
        case "test":
            url = "menu"
            break;
        default:
            url = `menu/${btoa(outletId)}/${btoa(tableId)}`
            break;
    }
    return `${config.public.apiURL}/${url}`
})
const menuCategoryUrl = `${config.public.apiURL}/category`
const { data: menus } = await useFetch(currentMenuUrl, {
    pick: [],
    headers: {
        "ngrok-skip-browser-warning": true,
    },
    onResponse: ({ response }) => {
        console.log(response)
    }
});
const { data: menuCategory } = await useFetch(menuCategoryUrl, { pick: [] });

function showCategoryModal() {
    Swal.fire({
        showConfirmButton: false,
        didRender: () => {
            const modal = document.createElement("modal-category")
            modal.categories = categories
            Swal.getHtmlContainer().appendChild(modal)
        }
    })
}
</script>

<template>
    <AppHeader />
    <div class="main-content bg-[#eeeeee] flex-1 flex flex-col">
        <Jumbotron />
        <div class="relative flex-1 pt-3 bg-white">
            <div class="text-white search-item-wrapper sticky top-0 z-[1] bg-white shadow-sm px-5 py-2">
                <div class="flex flex-col gap-y-3">
                    <div class="flex font-bold search-header gap-x-2">
                        <SearchHeaderAllItem @click="menuMode = 'show-all'" class="cursor-pointer" />
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
            </div>
            <div class="px-5 mt-5 menu-result-container">
                <div v-for="menuByCategory in menus">
                    <MenuContainer :menus-in-category="menuByCategory" />
                </div>
            </div>
            <CheckoutFooter />
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