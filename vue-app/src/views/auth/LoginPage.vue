<template>
  <div class="container my-5" style="max-width: 500px">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Login</h2>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              :class="['form-control', { 'is-invalid': errors.email }]"
              v-model="email"
              @input="handleInputChange"
              placeholder="Enter your email"
            />
            <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              :class="['form-control', { 'is-invalid': errors.password }]"
              v-model="password"
              @input="handleInputChange"
              placeholder="Enter your password"
            />
            <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary w-100"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="spinner"></span>
            <span v-if="isLoading"> Logging in...</span>
            <span v-else>Login</span>
          </button>
        </form>
        
        <div class="text-center mt-4">
          <p>Don't have an account? <router-link to="/auth/signup">Sign up</router-link></p>
        </div>
        
        <div class="mt-4 p-3 bg-light rounded">
          <h6 class="text-center">Demo Credentials</h6>
          <p class="mb-1"><strong>Email:</strong> admin@example.com</p>
          <p class="mb-0"><strong>Password:</strong> password123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AuthUtils, ToastUtils } from '../../utils'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const email = ref('')
    const password = ref('')
    const errors = ref({})
    const isLoading = ref(false)
    
    // Redirect if already authenticated
    onMounted(() => {
      if (AuthUtils.isAuthenticated()) {
        const from = route.query.redirect || '/dashboard'
        router.replace(from)
      }
    })
    
    const validateForm = () => {
      const newErrors = {}
      
      if (!AuthUtils.isRequired(email.value)) {
        newErrors.email = 'Email is required'
      } else if (!AuthUtils.isValidEmail(email.value)) {
        newErrors.email = 'Please enter a valid email'
      }
      
      if (!AuthUtils.isRequired(password.value)) {
        newErrors.password = 'Password is required'
      }
      
      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }
    
    const handleSubmit = async () => {
      if (!validateForm()) {
        return
      }
      
      isLoading.value = true
      
      try {
        const result = AuthUtils.authenticate(email.value, password.value)
        
        if (result.success) {
          ToastUtils.success('Login successful!')
          const from = route.query.redirect || '/dashboard'
          router.replace(from)
        } else {
          ToastUtils.error(result.message)
        }
      } catch (error) {
        ToastUtils.error('An error occurred during login. Please try again.')
      } finally {
        isLoading.value = false
      }
    }
    
    const handleInputChange = (e) => {
      const { name, value } = e.target
      
      if (name === 'email') {
        email.value = value
      } else if (name === 'password') {
        password.value = value
      }
      
      // Clear error when user starts typing
      if (errors.value[name]) {
        errors.value = { ...errors.value, [name]: '' }
      }
    }
    
    return {
      email,
      password,
      errors,
      isLoading,
      handleSubmit,
      handleInputChange
    }
  }
}
</script>