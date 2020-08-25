import { ref } from 'vue'

const visible = ref(false);

export function useModel() {
    return {
        visible,
        showModel: () => (visible.value = true),
        hideModel: () => (visible.value = false)
    }
}