<script setup>
import Swal from 'sweetalert2';

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const outlet_id = computed(() => route.query.outlet_id)
const no_table = computed(() => route.query.no_table)
watch(() => route.query, () => {
    $fetch('/api/customer-auth', {
        baseURL: config.public.apiURL,
        method: 'POST',
        body: {
            outlet_id: outlet_id.value,
            no_table: no_table.value
        },
        credentials: 'include',
        onResponse: ({ response }) => {
            if (response.ok) window.location.href = '/'
        },
        onResponseError: ({ response }) => {
            console.error(response._data)
        }
    })
}, { immediate: true });
onMounted(() => {
    Swal.close()
});
</script>
<template>
    <div class="flex flex-col items-center justify-center h-screen max-h-screen bg-white">
        <LottiePlayer src="/json/animation-scan-qr.json" />
        <input type="file" id="scan-img" accept="image/*" capture="environment" hidden />
        <label class="flex items-center p-2 px-4 text-sm text-white rounded-md gap-x-2 bg-main" for="scan-img">
            <IconBiQrCodeScan width="24" height="24" /><span>Scan now</span>
        </label>
        <NuxtLink to="/scan-qr?no_table=MQ==&outlet_id=Mg=="
            class="px-4 mt-10 text-lg text-black rounded-lg bg-primary">Demo
        </NuxtLink>
    </div>
</template>