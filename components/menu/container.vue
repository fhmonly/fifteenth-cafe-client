<script setup>
const menuMode = useMenuMode()
const { menusInCategory } = defineProps({
    menusInCategory: {
        required: true,
        type: Object,
    }
});
const { category_name, menus } = menusInCategory;
const list = ref(menus?.slice(0, 10));
const isCurrentCategory = ref(false)
watch(menuMode, () => {
    isCurrentCategory.value = [category_name, 'show-all'].includes(menuMode.value)
    if (menuMode.value === category_name) {
        list.value = menus
    } else if (menuMode.value === 'show-all') {
        list.value = menus?.slice(0, 10)
    }
}, { immediate: true });
</script>
<template>
    <div v-if="menus?.length >= 1 && isCurrentCategory">
        <div class="flex items-center justify-between menu-header">
            <div class="flex items-center justify-center gap-2 p-2 px-4 rounded-md text-main bg-grey">
                <IconBiCupFill />
                <span class="font-bold">
                    {{ category_name }}
                </span>
            </div>
            <a href="javascript:void(0)" class="font-semibold text-black see-all" @click="menuMode = category_name">
                See all
            </a>
        </div>
        <div class="grid grid-cols-2 gap-5 pb-5 mt-4 menu-content" @show-by-category="console.log($event.detail)">
            <MenuCard v-for="item in list" :menu-data="item" :key="item.id" />
        </div>
    </div>
</template>