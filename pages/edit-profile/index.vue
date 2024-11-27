<script setup>
useSeoMeta({
    titleTemplate: "",
    title: "Customer Profile",
});
</script>

<template>
    <div id="page" class="px-4 mb-10 bg-white shadow-sm">
        <div class=" flex items-center justify-between px-3 pt-4 pb-2  h-[56px] sticky top-0 bg-white">
            <p class="text-xl font-bold text-black">Profil</p>
            <NuxtLink to="/" class="text-black text-2xl font-bold ms-[238px]">
                <IconBiX />
            </NuxtLink>
        </div>
        <div class="my-1 overflow-y-auto content grow scrollbar-hide">
            <div id="itemsContainer">
                <div class="max-w-lg p-5 mx-auto bg-white rounded-lg shadow-lg">
                    <div class="mb-4 text-center">
                        <div class="inline-flex items-center justify-center  rounded-full p-3 ring-[#A91D3A] ring-1">
                            <span class="text-[#A91D3A] font-bold text-sm px-3"> Point : 100</span>
                        </div>
                    </div>

                    <!-- Form Fields -->
                    <form class="space-y-4">
                        <!-- Name -->
                        <div>
                            <label class="block mb-1 text-sm font-bold text-black">Name</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                value="Mardiyanto">
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block mb-1 text-sm font-bold text-black">Email</label>
                            <input type="email"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                value="mardiyanto@gmail.com">
                        </div>

                        <!-- WhatsApp No -->
                        <div>
                            <label class="block mb-1 text-sm font-bold text-black">Whatsapp No</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                value="089509512660">
                        </div>

                        <!-- Province -->
                        <div>
                            <label class="block mb-1 text-sm font-bold text-black">Province</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                value="Jawa Timur">
                        </div>

                        <!-- City -->
                        <div>
                            <label class="block mb-1 text-sm font-bold text-black">City</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                value="Surabaya">
                        </div>

                        <!-- Address Detail -->
                        <div>
                            <label class="block mb-1 text-sm font-bold text-black">Address Detail</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                value="Jl Kalibokor Selatan No.8">
                        </div>

                        <!-- Place and Date of Birth -->
                        <div>
                            <label class="block mb-1 text-sm font-bold text-black">Place and Date Birth</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                value="Surabaya, 13 Januari 2007">
                        </div>

                        <!-- Age -->
                        <div>
                            <label class="block mb-1 text-sm font-bold text-black">Age</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                value="21">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>