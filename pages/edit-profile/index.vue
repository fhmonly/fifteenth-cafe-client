<script setup>
useSeoMeta({
    titleTemplate: "",
    title: "Customer Profile",
});
const { data: userData, refresh } = useUserData();
const { getAgeFromDate } = useUtils();
const dateBirth = ref();
const age = computed(() => getAgeFromDate(dateBirth.value || userData.value?.data?.date_birth || new Date()));
function updateUser(form) {
    const formData = new FormData(form)
    useAuth$fetch('/api/update-profile', {
        method: 'PUT',
        body: formData,
        onResponse({ response }) {
            if (response.ok) {
                refresh()
            }
        }
    })
}
</script>

<template>
    <div id="page" class="px-4 bg-white shadow-sm">
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
                            <span class="text-[#A91D3A] font-bold text-sm px-3">
                                Point : {{ userData?.data?.points || 0 }}
                            </span>
                        </div>
                    </div>

                    <!-- Form Fields -->
                    <form class="flex flex-col space-y-4 gap-y-2" @submit="$event => {
                        $event.preventDefault()
                        updateUser($event.target)
                    }">
                        <!-- Name -->
                        <div>
                            <label class="block text-sm font-bold text-black">Name</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                :value="userData?.data?.name_customer">
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-bold text-black">Email</label>
                            <input type="email"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                :value="userData?.data?.email">
                        </div>

                        <!-- WhatsApp No -->
                        <div>
                            <label class="block text-sm font-bold text-black">Whatsapp No</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                :value="userData?.data?.wa_number">
                        </div>

                        <!-- Province -->
                        <div>
                            <label class="block text-sm font-bold text-black">Province</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                :value="userData?.data?.province">
                        </div>

                        <!-- City -->
                        <div>
                            <label class="block text-sm font-bold text-black">City</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                :value="userData?.data?.city">
                        </div>

                        <!-- Address Detail -->
                        <div>
                            <label class="block text-sm font-bold text-black">Address Detail</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                :value="userData?.data?.address">
                        </div>

                        <!-- Place and Date of Birth -->
                        <div>
                            <label class="block text-sm font-bold text-black">Birth Date</label>
                            <input type="date"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                :value="userData?.data?.date_birth"
                                @change="($event) => dateBirth = $event.target.value">
                        </div>

                        <!-- Age -->
                        <div>
                            <label class="block text-sm font-bold text-black">Age</label>
                            <input type="text"
                                class="w-full text-black text-xs bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                                :value="age" disabled>
                        </div>

                        <div class="flex items-center justify-center w-full">
                            <button type="submit" class="p-3 px-5 text-white rounded-lg bg-main">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>