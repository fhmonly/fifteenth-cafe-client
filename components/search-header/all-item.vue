<script setup>
const menus = useMenu()
</script>

<template>
    <div class="all-item bg-main rounded-[5px] flex p-1">
        <span class="inline-block text-center grow text-white pt-[1.5px]">
            All Item
        </span>
        <span class="bg-white count-all rounded-[5px] text-black px-1 pt-[1.5px]">{{ menus.length }}</span>
    </div>
</template>