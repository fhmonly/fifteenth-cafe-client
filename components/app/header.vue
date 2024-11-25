<template>
    <header class="bg-[rgb(21,21,21)] box-shadow flex px-3 items-center relative">
        <div class="absolute left-0 aspect-square ms-3">
            <slot name="left_content"></slot>
        </div>
        <nav class="m-auto">
            <h1 class="text-center text-white">
                <a href="javascript:void(0)" class="fifteenth-logo">Fifteen</a>
                <sup>TH</sup>
            </h1>
        </nav>
        <div class="absolute right-0 aspect-square me-3">
            <slot name="right_content"></slot>
        </div>
    </header>
</template>