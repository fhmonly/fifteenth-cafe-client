import type { UseFetchOptions } from "#app";
import type { NitroFetchOptions } from 'nitropack';

export function useAuthFetch<T>(
    url: string,
    options?: UseFetchOptions<T>
) {
    const config = useRuntimeConfig();
    const router = useRouter();

    return useFetch(url, {
        baseURL: config.public.apiURL,
        onResponseError: async ({ response }) => {
            if (!response.ok) {
                const {
                    success, message
                } = response._data
                const qrStatus = response._data['qr-status']
                if (qrStatus === 'unscan') router.push('/scan-qr')
            }
        },
        lazy: true,
        credentials: 'include',
        server: false,
        ...options,
    });
}

export function useAuth$fetch<T = unknown, O = NitroFetchOptions<any, any>>(
    url: any,
    options: O = {} as O
): Promise<T> {
    const config = useRuntimeConfig();
    const router = useRouter();

    return $fetch<T>(url, {
        baseURL: config.public.apiURL,
        credentials: 'include',
        onResponse: async ({ response }) => {
            if (response.status !== 200) {
                const data = response._data || {};
                const qrStatus = data['qr-status'];

                if (qrStatus === 'unscan') {
                    await router.push('/scan-qr');
                }

                console.error('Fetch error:', data.message || 'Unknown error');
            }
        },
        ...options,
    });
}
