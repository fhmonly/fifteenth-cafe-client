<template>
    <header
        class="bg-[rgb(21,21,21)] box-shadow flex p-3 items-center relative min-h-[56px] [border-radius:0px_0px_10px_10px]">
        <nav class="m-auto">
            <div class="absolute left-0 aspect-square ms-3">
                <slot name="left_content"></slot>
            </div>
            <h2 class="flex font-bold text-center text-white">
                <a href="javascript:void(0)" class="text-3xl">Fifteen</a>
                <sup class="text-xs font-semibold">TH</sup>
            </h2>
            <div class="absolute right-0 aspect-square me-3">
                <slot name="right_content"></slot>
            </div>
        </nav>
    </header>
</template>