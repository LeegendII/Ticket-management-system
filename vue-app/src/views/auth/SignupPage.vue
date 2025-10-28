<template>
  <div class="container my-5" style="max-width: 500px">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Sign Up</h2>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name" class="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              :class="['form-control', { 'is-invalid': errors.name }]"
              v-model="name"
              @input="handleInputChange"
              placeholder="Enter your full name"
            />
            <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
          </div>
          
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
          
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              :class="['form-control', { 'is-invalid': errors.confirmPassword }]"
              v-model="confirmPassword"
              @input="handleInputChange"
              placeholder="Confirm your password"
            />
            <div v-if="errors.confirmPassword" class="invalid-feedback">{{ errors.confirmPassword }}</div>
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary w-100"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="spinner"></span>
            <span v-if="isLoading"> Creating Account...</span>
            <span v-else>Sign Up</span>
          </button>
        </form>
        
        <div class="text-center mt-4">
          <p>Already have an account? <router-link to="/auth/login">Login</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AuthUtils, ToastUtils } from '../../utils'

export default {
  name: 'SignupPage',
  setup() {
    const router = useRouter()
    
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const errors = ref({})
    const isLoading = ref(false)
    
    // Redirect if already authenticated
    onMounted(() => {
      if (AuthUtils.isAuthenticated()) {
        router.replace('/dashboard')
      }
    })
    
    const validateForm = () => {
      const newErrors = {}
      
      if (!AuthUtils.isRequired(name.value)) {
        newErrors.name = 'Name is required'
      }
      
      if (!AuthUtils.isRequired(email.value)) {
        newErrors.email = 'Email is required'
      } else if (!AuthUtils.isValidEmail(email.value)) {
        newErrors.email = 'Please enter a valid email'
      }
      
      if (!AuthUtils.isRequired(password.value)) {
        newErrors.password = 'Password is required'
      } else if (!AuthUtils.minLength(password.value, 6)) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      
      if (!AuthUtils.isRequired(confirmPassword.value)) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (password.value !== confirmPassword.value) {
        newErrors.confirmPassword = 'Passwords do not match'
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
        const result = AuthUtils.signup(name.value, email.value, password.value)
        
        if (result.success) {
          ToastUtils.success('Account created successfully!')
          router.replace('/dashboard')
        } else {
          ToastUtils.error(result.message)
        }
      } catch (error) {
        ToastUtils.error('An error occurred during signup. Please try again.')
      } finally {
        isLoading.value = false
      }
    }
    
    const handleInputChange = (e) => {
      const { name, value } = e.target
      
      if (name === 'name') {
        name.value = value
      } else if (name === 'email') {
        email.value = value
      } else if (name === 'password') {
        password.value = value
      } else if (name === 'confirmPassword') {
        confirmPassword.value = value
      }
      
      // Clear error when user starts typing
      if (errors.value[name]) {
        errors.value = { ...errors.value, [name]: '' }
      }
    }
    
    return {
      name,
      email,
      password,
      confirmPassword,
      errors,
      isLoading,
      handleSubmit,
      handleInputChange
    }
  }
}
</script>