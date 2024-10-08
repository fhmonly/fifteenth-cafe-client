<template>
    <div class="p-5">
        <div class="flex jumbotron-wrapper bg-main rounded-[6px] items-stretch">
            <div class="jumbotron-image" style="background-image: url('/img/slider-img-1.jpg')">
            </div>
            <div class="flex p-5 jumbotron-card">
                <div class="m-auto text-white">
                    <h1 class="font-bold jumbotron-title">Fifteen Cafe by Mark Design</h1>
                    <h1 class="my-3 italic jumbotron-address">
                        Jl. Lombok No.15, Ngagel, Kec. Wonokromo, Surabaya, Jawa Timur 60246
                    </h1>
                    <h1 class=" jumbotron-table">
                        <p>You at:</p><span class="inline-block font-bold text-center bg-black ms-2">-</span>
                    </h1>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.jumbotron-wrapper .jumbotron-image {
    width: 149px;
    border-radius: 6px 0px 0px 6px;
    flex-shrink: 0;
    overflow-y: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.jumbotron-wrapper .jumbotron-title {
    font-size: var(--font-size-xl);
}

.jumbotron-wrapper .jumbotron-address {
    font-size: calc(var(--font-size-md) - 2);
    line-height: 10px;
}

.jumbotron-wrapper .jumbotron-table {
    font-size: calc(var(--font-size-md) - 1);
}

.jumbotron-wrapper .jumbotron-table span {
    font-size: 8px;
    border-radius: 4px;
    min-width: 44px;
}
</style>