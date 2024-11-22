<script setup>
import Swal from "sweetalert2";

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Fifteenth Cafe` : 'Fifteenth Cafe by Mark Design'
  },
})

useHead({
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/device-detector@1.0.2/dist/DeviceDetector.min.js',
      integrity: 'sha256-JlxJtLn6DgtbyHlIvp3Y055ocnTykCI5jcbYq3CfWKc=',
      crossorigin: 'anonymous'
    }
  ],
  link: [
    { href: "/css/index.css", rel: "stylesheet" }
  ],
});

onMounted(() => {
  window.Swal = Swal;
  if (typeof DeviceDetector !== 'undefined') {
    const { type } = DeviceDetector.parse(navigator.userAgent)
    document.body.setAttribute('device-type', type.toLowerCase())
  } else {
    console.error('DeviceDetector is not available')
  }
});
</script>

<template>
  <div id="root" class="flex flex-col min-h-screen">
    <NuxtPwaManifest />
    <NuxtLoadingIndicator color="red" :throttle="0" />
    <LazyNuxtPage />
  </div>
</template>