<script setup>
useSeoMeta({
    titleTemplate: "",
    title: "Transaction",
})
onMounted(() => {
    const tabs = document.querySelectorAll(".tab-wrapper > [class*=-tab]");
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            document
                .querySelector(".tab-wrapper")
                .setAttribute("active-tab", tab.getAttribute("tab-name"));
        });
    });
})
</script>
<template>
    <AppHeader>
        <template #left_content>
            <NuxtLink to="/" class="text-white ps-2">
                <IconBiArrowLeftSquareFill />
            </NuxtLink>
        </template>
    </AppHeader>
    <div class="flex flex-col px-5 mt-2 bg-white">
        <div class="tab-wrapper flex justify-around text-black font-bold sticky top-0 bg-white text-[9px]"
            active-tab="process-tab">
            <div class="process-tab w-[49%] text-center pt-2" tab-name="process-tab" target=".process-content">
                <span>Process</span>
            </div>
            <div class="done-tab w-[49%] text-center pt-2" tab-name="done-tab" target=".done-content">
                <span>Done</span>
            </div>
        </div>
        <div class="mt-4 content-wrapper">
            <div class="process-content" content-name="process-content">
                <TransactionCard />
            </div>
            <div class="done-content" content-name="done-content">
                <TransactionCard />
            </div>
        </div>
    </div>
</template>
<style>
.content-wrapper {
    --done-visibility: none;
    --process-visibility: none;
}

.tab-wrapper[active-tab="done-tab"]+.content-wrapper [content-name="done-content"] {
    --done-visibility: block;
    --process-visibility: none;
}

.tab-wrapper[active-tab="process-tab"]+.content-wrapper [content-name="process-content"] {
    --done-visibility: none;
    --process-visibility: block;
}

.tab-wrapper[active-tab="process-tab"] [tab-name="process-tab"] span,
.tab-wrapper[active-tab="done-tab"] [tab-name="done-tab"] span {
    width: 100%;
    display: inline-block;
    border-bottom: 1.4px solid black;
    padding-bottom: 0.35rem;
}

.content-wrapper>[content-name="done-content"] {
    display: var(--done-visibility);
}

.content-wrapper>[content-name="process-content"] {
    display: var(--process-visibility);
}

body,
html,
#root {
    background-color: white;
}

/* card */

.order-card .order-header {
    background-color: black;
    border-radius: 2px 2px 0px 0px;
}

.order-card .order-body {
    border-radius: 0 0 2px 2px;
    border-color: #a91d3a;
    border-width: 1px;
    border-top: none;
    color: black;
}

.order-card {
    font-size: 9px;
}

.order-body table tr td:nth-child(even) {
    text-align: end;
    font-weight: 700;
}

.order-body table tr td span {
    display: inline-block;
    padding: 0.5rem 0;
}

.order-body>[class*="order-"] {
    padding: 0.5rem 1rem;
}

.order-body .order-total-price {
    border-top: 1px solid #a91d3a;
}

.order-body a {
    border: 1px solid #a91d3a;
    color: #a91d3a;
    border-radius: 6px;
    margin-bottom: 1rem;
    padding: 0.5rem 0;
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
    text-align: center;
}
</style>