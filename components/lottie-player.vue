<script setup>
useHead({
    script: [
        {
            src: 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js'
        }
    ]
});

const props = defineProps({
    src: {
        required: true,
    }
})

const src = ref(props.src)
const html = ref('')

watch(src, (newSrc) => {
    src.value = newSrc
});

onMounted(() => {
    html.value = `
        <dotlottie-player src="${src.value}" speed="1" loop autoplay class="w-full h-fit"></dotlottie-player>
    `
});
</script>
<template>
    <div v-html="html" class='w-full max-w-[150px] aspect-square'></div>
</template>