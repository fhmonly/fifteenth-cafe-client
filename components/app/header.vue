<template>
    <header class="bg-[rgb(21,21,21)] flex box-shadow">
        <div class="flex items-center justify-center min-w-8 aspect-square">
            <slot name="left_content"></slot>
        </div>
        <nav class="m-auto grow">
            <h1 class="flex justify-center text-center text-white">
                <a href="javascript:void(0)" class="fifteenth-logo">Fifteen</a>
                <sup>TH</sup>
            </h1>
        </nav>
        <div class="flex items-center justify-center min-w-8 aspect-square">
            <slot name="right_content"></slot>
        </div>
    </header>
</template>