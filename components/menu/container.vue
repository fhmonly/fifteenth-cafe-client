<script setup>
const menuMode = useMenuMode()
const { menusInCategory } = defineProps({
    menusInCategory: {
        required: true,
        type: Object,
    }
})
const { category_name, menus } = menusInCategory
</script>
<template>
    <div v-if="menus.length >= 1">
        <div class="flex items-center justify-between menu-header">
            <div class="flex items-center justify-center gap-2 category-name">
                <IconBiCupFill />
                <span class="font-bold">
                    {{ category_name }}
                </span>
            </div>
            <a href="javascript:void(0)" class="font-bold text-black see-all"
                @click="menuMode = 'show-category-[' + category_name + ']'">See
                all</a>
        </div>
        <div class="flex flex-wrap justify-between pb-5 menu-content mt-9 gap-y-5"
            @show-by-category="console.log($event.detail)">
            <div v-for="menuData in menus">
                <MenuCard :menu-data="menuData" :key="menuData.id" />
            </div>
        </div>
    </div>
</template>
<style>
.menu-header .category-name {
    width: 100px;
    height: 29px;
    border-radius: 5px;
    background-color: #eeeeee;
    color: var(--bg-main);
}

.menu-header span {
    font-size: 9px;
}

.menu-header .see-all {
    font-size: 9px;
    line-height: 20px;
}

.menu-content .card-title {
    font-size: 10px;
    font-weight: 700;
    line-height: 20px;
    color: var(--bg-main);
}

.menu-content .menu-price {
    font-size: 7px;
    font-weight: 400;
    line-height: 20px;
}

.menu-content .menu-rating {
    font-size: 7px;
    font-weight: 700;
    line-height: 20px;
}

.menu-content .menu-rating svg {
    width: 7px;
}
</style>