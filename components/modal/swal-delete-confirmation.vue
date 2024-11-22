<script setup>
import Swal from 'sweetalert2';
const props = defineProps({
    text: {
        type: String
    }
});
</script>
<template>
    <div class="flex flex-col items-center justify-center p-10 bg-white rounded-lg">
        <LottiePlayer src="/json/animation-delete.json" />
        <div class="mt-2 text-xl font-bold text-black" v-html="props.text"></div>
        <div class="mt-1 text-xs text-black font-base">
            <div class="flex justify-between mt-5 gap-x-1">
                <div class="bg-[#A91D3A] text-white font-bold py-2 px-5 rounded-[6px]" @click="Swal.clickConfirm()">
                    Hapus
                </div>
                <div id="cancelButton"
                    class="bg-slate-500 font-bold py-2 px-5  rounded-[6px]  text-white font-base my-auto"
                    @click="Swal.clickCancel()">
                    Batal
                </div>
            </div>
        </div>
    </div>
</template>