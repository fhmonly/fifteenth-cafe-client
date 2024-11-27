<template>
    <div class="max-h-[80%] overflow-y-scroll">
        <div class="relative flex items-center mb-4 bg-[#A91D3A] rounded-t-sm p-3 justify-center">
            <button id="closeButton" class="absolute text-2xl font-bold text-white left-3" onclick="Swal.close()">
                <IconBiArrowLeft class="stroke-3" />
            </button>
            <h2 class="text-xl font-semibold text-white">Discount</h2>
        </div>
        <!-- <div class="px-4 mb-4">
            <div class="flex">
                <input type="text" id="redeemCode" placeholder="Enter Redeem Code"
                    class="flex-grow border-2 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#A91D3A]">
                <button id="searchButton"
                    class="ml-2 bg-[#A91D3A] text-white px-4 py-2 rounded-md hover:bg-[#86162e] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </button>
            </div>
        </div> -->

        <div class="m-4 content overflow-y-auto max-h-[200px] scrollbar-hide">
            <div id="itemsContainer">
                <div class="my-3 flex border-2 border-[#A91D3A] rounded-md py- text-start font-bold text-white"
                    v-for="(promo, index) in availablePromo" :key="promo.id" @click="setCurrentPromo(promo, index)"
                    :class="{
                        'opacity-70': currentPromo?.id === promo.id
                    }">
                    <span class="bg-[#A91D3A] p-[10px] rounded-l-[2px]">
                        <p class="mx-3 text-xs">Diskon</p>
                        <p class="mx-3 text-3xl">
                            {{ promo.discount_type === 'percentage' ?
                                `${promo.discount}%` : (promo.discount) }}
                        </p>
                    </span>
                    <div class="my-auto ms-5">
                        <p class="font-bold text-black text-l">{{ promo.promo_name }}</p>
                        <p class="text-xs font-medium text-black">{{ promo.discount_type === 'percentage' ?
                            `${promo.discount}%` : toLocaleCurrency(promo.discount) }}</p>
                    </div>
                </div>
            </div>
            <p id="noDataMessage" class="mt-4 text-center text-gray-500" v-if="availablePromo.length < 1">
                Diskon tidak tersedia.
            </p>
        </div>
    </div>
</template>
<script setup>
const { availablePromo, currentPromo } = useCart();
const { toLocaleCurrency } = useUtils();
function setCurrentPromo(promo, index) {
    if (currentPromo.value?.id === promo.id) {
        currentPromo.value = null
    } else {
        currentPromo.value = promo;
        const currentPromoArr = availablePromo.value.splice(index, 1)
        availablePromo.value.unshift(...currentPromoArr)
    }
}
</script>