export function useUserData() {
    return useAuthFetch('/api/profile', {
        pick: ['data'],
        key: 'api-user-profile'
    })
}