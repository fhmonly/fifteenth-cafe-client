<script setup>
import Swal from "sweetalert2";

useSeoMeta({
  titleTemplate: "%s | Fifteenth Cafe",
})
useHead({
  script: [
    { src: 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs', type: 'module' },
    {
      src: 'https://cdn.jsdelivr.net/npm/device-detector@1.0.2/dist/DeviceDetector.min.js',
      integrity: 'sha256-JlxJtLn6DgtbyHlIvp3Y055ocnTykCI5jcbYq3CfWKc=',
      crossorigin: 'anonymous'
    }
  ],
  link: [
    { href: "/css/index.css", rel: "stylesheet" }
  ],
})

onMounted(() => {
  window.Swal = Swal;
  window.fireCustomEventTo = ({ eventName = null, eventDetail = {}, targetElement = null }) => {
    if (!eventName || !targetElement) {
      throw new Error("eventName dan targetElement tidak boleh kosong")
    }

    const event = new CustomEvent(eventName, {
      detail: {
        ...eventDetail
      },
    });

    targetElement.dispatchEvent(event);
  };
  if (typeof DeviceDetector !== 'undefined') {
    const { type } = DeviceDetector.parse(navigator.userAgent)
    document.body.setAttribute('device-type', type.toLowerCase())
  } else {
    console.error('DeviceDetector is not available')
  }
})
</script>

<template>
  <div id="root" class="min-h-screen flex flex-col">
    <NuxtLoadingIndicator color="red" :throttle="0" />
    <NuxtPage />
  </div>
</template>