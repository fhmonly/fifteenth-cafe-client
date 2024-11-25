import { createApp } from 'vue';
import type { Component } from 'vue'
export function useClientHelper() {
    function isNotClientEnv() { return !import.meta.client }
    return {
        fireCustomEventTo({ eventName = null, eventDetail = {}, targetElement = document.createElement('div') }) {
            if (isNotClientEnv()) return false
            if (!eventName || !targetElement) {
                throw new Error("eventName dan targetElement tidak boleh kosong")
            }

            const event = new CustomEvent(eventName, {
                detail: {
                    ...eventDetail
                },
            });

            targetElement.dispatchEvent(event);
        },
    }
}

export function useCreateApp<T extends Component, Props extends Record<string, any>>
    (
        containerTagName: string = 'div',
        vueComponent: T,
        vueProp?: Props
    ): [HTMLElement, ReturnType<typeof createApp>] {
    const container = document.createElement(containerTagName);
    const vueApp = createApp(vueComponent, vueProp);
    vueApp.mount(container);
    return [container, vueApp];
}
