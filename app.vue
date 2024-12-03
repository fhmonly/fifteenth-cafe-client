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
    { href: "/css/font-poppins.css", rel: "stylesheet", fetchpriority: 'high' },
    { href: "/css/root.css", rel: "stylesheet", fetchpriority: 'high' },
    { href: "/css/main.css", rel: "stylesheet", fetchpriority: 'high' },
  ],
});

const { data } = useUserData()

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
  <div id="root">
    <NuxtPwaManifest />
    <Html class="overflow-hidden bg-dark" />

    <Body
      class="mx-auto max-w-screen-tablet [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-dark [&::-webkit-scrollbar-thumb]:bg-main max-h-screen overflow-y-auto [padding-right:0rem_!important] [scrollbar-gutter:stable] text-xs" />
    <NuxtLoadingIndicator color="red" :throttle="0" />
    <LazyNuxtPage class="flex flex-col items-stretch w-full min-h-screen bg-white" />
  </div>
</template>