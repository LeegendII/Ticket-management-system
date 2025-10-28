<template>
  <div class="toast-container">
    <div 
      v-for="toast in toasts" 
      :key="toast.id" 
      :class="['toast', `toast-${toast.type}`]"
    >
      <div class="toast-body">{{ toast.message }}</div>
      <button class="toast-close" @click="removeToast(toast.id)">
        &times;
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ToastContainer',
  setup() {
    const toasts = ref([])

    const handleShowToast = (event) => {
      const { message, type, duration } = event.detail
      
      const newToast = {
        id: Date.now(),
        message,
        type,
        duration
      }
      
      toasts.value.push(newToast)
      
      // Auto remove after duration
      setTimeout(() => {
        removeToast(newToast.id)
      }, duration)
    }

    const removeToast = (id) => {
      toasts.value = toasts.value.filter(toast => toast.id !== id)
    }

    onMounted(() => {
      document.addEventListener('showToast', handleShowToast)
    })

    onUnmounted(() => {
      document.removeEventListener('showToast', handleShowToast)
    })

    return {
      toasts,
      removeToast
    }
  }
}
</script>