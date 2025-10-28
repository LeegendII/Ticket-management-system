<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">Ticket Management</div>
        
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tickets" class="nav-link active">Tickets</router-link>
          </li>
          <li class="nav-item">
            <button @click="handleLogout" class="btn btn-danger btn-sm">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
    
    <!-- Main Content -->
    <div class="container">
      <div v-if="isLoading" class="text-center my-5">
        <div class="spinner" style="width: 3rem; height: 3rem; border-width: 0.3rem"></div>
        <p class="mt-3">Loading tickets...</p>
      </div>
      
      <div v-else>
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Ticket Management</h1>
            <p class="text-secondary">Manage and track all your tickets</p>
          </div>
          <button @click="handleCreateClick" class="btn btn-primary">
            Create New Ticket
          </button>
        </div>
        
        <!-- Create/Edit Form -->
        <div v-if="isCreating || isEditing" class="card mb-4">
          <div class="card-header">
            <h3 class="mb-0">{{ isCreating ? 'Create New Ticket' : 'Edit Ticket' }}</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="title" class="form-label">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  :class="['form-control', { 'is-invalid': errors.title }]"
                  v-model="formData.title"
                  @input="handleInputChange"
                  placeholder="Enter ticket title"
                />
                <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
              </div>
              
              <div class="form-group">
                <label for="description" class="form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  class="form-control"
                  v-model="formData.description"
                  @input="handleInputChange"
                  placeholder="Enter ticket description"
                  rows="4"
                ></textarea>
              </div>
              
              <div class="form-row">
                <div class="form-col">
                  <div class="form-group">
                    <label for="status" class="form-label">Status *</label>
                    <select
                      id="status"
                      name="status"
                      :class="['form-control', { 'is-invalid': errors.status }]"
                      v-model="formData.status"
                      @change="handleInputChange"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                    <div v-if="errors.status" class="invalid-feedback">{{ errors.status }}</div>
                  </div>
                </div>
                
                <div class="form-col">
                  <div class="form-group">
                    <label for="priority" class="form-label">Priority</label>
                    <select
                      id="priority"
                      name="priority"
                      class="form-control"
                      v-model="formData.priority"
                      @change="handleInputChange"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div class="d-flex gap-2 mt-4">
                <button type="submit" class="btn btn-primary">
                  {{ isCreating ? 'Create Ticket' : 'Update Ticket' }}
                </button>
                <button type="button" @click="handleCancelClick" class="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <!-- Ticket Detail View -->
        <div v-if="ticket && !isCreating && !isEditing" class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3 class="mb-0">Ticket Details</h3>
            <div>
              <button @click="handleEditClick" class="btn btn-sm btn-outline-primary me-2">
                Edit
              </button>
              <button @click="handleDeleteClick" class="btn btn-sm btn-outline-danger">
                Delete
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h4 class="mb-0">{{ ticket.title }}</h4>
              <div>
                <span :class="['badge', getStatusBadgeClass(ticket.status), 'me-2']">
                  {{ getStatusText(ticket.status) }}
                </span>
                <span :class="['badge', getPriorityBadgeClass(ticket.priority)]">
                  {{ ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1) }} Priority
                </span>
              </div>
            </div>
            
            <div v-if="ticket.description" class="mb-4">
              <h5>Description</h5>
              <p>{{ ticket.description }}</p>
            </div>
            
            <div class="row text-sm text-secondary">
              <div class="col-md-4">
                <strong>Created:</strong> {{ DateUtils.format(ticket.createdAt) }}
              </div>
              <div class="col-md-4">
                <strong>Last Updated:</strong> {{ DateUtils.relativeTime(ticket.updatedAt) }}
              </div>
              <div class="col-md-4">
                <strong>ID:</strong> #{{ ticket.id }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Delete Confirmation Modal -->
        <div v-if="isDeleting && ticket" class="card position-fixed" style="top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; min-width: 400px">
          <div class="card-header">
            <h3 class="mb-0">Confirm Delete</h3>
          </div>
          <div class="card-body">
            <p>Are you sure you want to delete the ticket "{{ ticket.title }}"? This action cannot be undone.</p>
            <div class="d-flex justify-content-end gap-2">
              <button @click="cancelDelete" class="btn btn-secondary">
                Cancel
              </button>
              <button @click="confirmDelete" class="btn btn-danger">
                Delete Ticket
              </button>
            </div>
          </div>
        </div>
        
        <!-- Tickets List -->
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3 class="mb-0">Tickets</h3>
            <div class="d-flex align-items-center gap-3">
              <div>
                <label for="filter" class="form-label mb-0 me-2">Filter:</label>
                <select 
                  id="filter" 
                  class="form-control form-control-sm d-inline-block" 
                  style="width: auto"
                  v-model="filter"
                  @change="handleFilterChange"
                >
                  <option value="all">All Tickets</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <span class="badge bg-secondary">{{ filteredTickets.length }} tickets</span>
            </div>
          </div>
          
          <div class="card-body">
            <div v-if="filteredTickets.length > 0" class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ticket in filteredTickets" :key="ticket.id">
                    <td>
                      <div>
                        <strong>{{ ticket.title }}</strong>
                      </div>
                    </td>
                    <td>
                      <span :class="['badge', getStatusBadgeClass(ticket.status)]">
                        {{ getStatusText(ticket.status) }}
                      </span>
                    </td>
                    <td>
                      <span :class="['badge', getPriorityBadgeClass(ticket.priority)]">
                        {{ ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1) }}
                      </span>
                    </td>
                    <td>{{ DateUtils.relativeTime(ticket.updatedAt) }}</td>
                    <td>
                      <router-link 
                        :to="`/tickets/${ticket.id}`" 
                        class="btn btn-sm btn-outline-primary"
                      >
                        View
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="text-center py-4">
              <p class="text-secondary">No tickets found.</p>
              <button @click="handleCreateClick" class="btn btn-primary">
                Create Your First Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AuthUtils, ApiUtils, ValidationUtils, DateUtils, ToastUtils } from '../utils'

export default {
  name: 'TicketManagementPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const tickets = ref([])
    const filteredTickets = ref([])
    const ticket = ref(null)
    const isLoading = ref(true)
    const isEditing = ref(false)
    const isCreating = ref(false)
    const isDeleting = ref(false)
    const filter = ref('all')
    const formData = ref({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    })
    const errors = ref({})
    
    onMounted(() => {
      // Check if user is authenticated
      if (!AuthUtils.isAuthenticated()) {
        ToastUtils.error('Your session has expired. Please log in again.')
        router.push('/auth/login')
        return
      }
      
      // Load tickets
      loadTickets()
    })
    
    // Watch for route changes
    watch(() => route.params.id, (newId) => {
      if (newId) {
        loadTicket(newId)
      } else {
        ticket.value = null
        isEditing.value = false
        isCreating.value = false
      }
    }, { immediate: true })
    
    // Watch for filter changes
    watch(filter, () => {
      applyFilter()
    })
    
    const loadTickets = () => {
      try {
        const allTickets = ApiUtils.getTickets()
        tickets.value = allTickets
      } catch (error) {
        ToastUtils.error('Failed to load tickets. Please try again.')
      } finally {
        isLoading.value = false
      }
    }
    
    const loadTicket = (ticketId) => {
      try {
        const ticketData = ApiUtils.getTicket(ticketId)
        if (ticketData) {
          ticket.value = ticketData
          formData.value = {
            title: ticketData.title,
            description: ticketData.description || '',
            status: ticketData.status,
            priority: ticketData.priority || 'medium'
          }
        } else {
          ToastUtils.error('Ticket not found.')
          router.push('/tickets')
        }
      } catch (error) {
        ToastUtils.error('Failed to load ticket details. Please try again.')
        router.push('/tickets')
      }
    }
    
    const applyFilter = () => {
      if (filter.value === 'all') {
        filteredTickets.value = tickets.value
      } else {
        filteredTickets.value = tickets.value.filter(t => t.status === filter.value)
      }
    }
    
    const handleFilterChange = (e) => {
      filter.value = e.target.value
    }
    
    const handleInputChange = (e) => {
      const { name, value } = e.target
      formData.value = { ...formData.value, [name]: value }
      
      // Clear error when user starts typing
      if (errors.value[name]) {
        errors.value = { ...errors.value, [name]: '' }
      }
    }
    
    const validateForm = () => {
      const newErrors = {}
      
      if (!ValidationUtils.isRequired(formData.value.title)) {
        newErrors.title = 'Title is required'
      }
      
      if (!ValidationUtils.isValidStatus(formData.value.status)) {
        newErrors.status = 'Please select a valid status'
      }
      
      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }
    
    const handleSubmit = () => {
      if (!validateForm()) {
        return
      }
      
      try {
        if (isCreating.value) {
          // Create new ticket
          const newTicket = ApiUtils.createTicket(formData.value)
          ToastUtils.success('Ticket created successfully!')
          router.push(`/tickets/${newTicket.id}`)
        } else if (isEditing.value && ticket.value) {
          // Update existing ticket
          ApiUtils.updateTicket(ticket.value.id, formData.value)
          ToastUtils.success('Ticket updated successfully!')
          isEditing.value = false
          loadTicket(ticket.value.id)
        }
      } catch (error) {
        ToastUtils.error('An error occurred. Please try again.')
      }
    }
    
    const handleCreateClick = () => {
      formData.value = {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium'
      }
      errors.value = {}
      isCreating.value = true
      isEditing.value = false
      ticket.value = null
      router.push('/tickets')
    }
    
    const handleEditClick = () => {
      errors.value = {}
      isEditing.value = true
      isCreating.value = false
    }
    
    const handleCancelClick = () => {
      if (isCreating.value) {
        isCreating.value = false
        formData.value = {
          title: '',
          description: '',
          status: 'open',
          priority: 'medium'
        }
      } else if (isEditing.value) {
        isEditing.value = false
        if (ticket.value) {
          loadTicket(ticket.value.id)
        }
      }
    }
    
    const handleDeleteClick = () => {
      if (ticket.value) {
        isDeleting.value = true
      }
    }
    
    const confirmDelete = () => {
      if (ticket.value) {
        try {
          ApiUtils.deleteTicket(ticket.value.id)
          ToastUtils.success('Ticket deleted successfully!')
          router.push('/tickets')
        } catch (error) {
          ToastUtils.error('Failed to delete ticket. Please try again.')
        } finally {
          isDeleting.value = false
        }
      }
    }
    
    const cancelDelete = () => {
      isDeleting.value = false
    }
    
    const handleLogout = () => {
      AuthUtils.clearSession()
      ToastUtils.success('You have been logged out successfully.')
      router.push('/')
    }
    
    const getStatusBadgeClass = (status) => {
      switch (status) {
        case 'open':
          return 'badge-success'
        case 'in_progress':
          return 'badge-warning'
        case 'closed':
          return 'badge-gray'
        default:
          return 'badge-secondary'
      }
    }
    
    const getStatusText = (status) => {
      switch (status) {
        case 'open':
          return 'Open'
        case 'in_progress':
          return 'In Progress'
        case 'closed':
          return 'Closed'
        default:
          return status
      }
    }
    
    const getPriorityBadgeClass = (priority) => {
      switch (priority) {
        case 'high':
          return 'badge-danger'
        case 'medium':
          return 'badge-warning'
        case 'low':
          return 'badge-success'
        default:
          return 'badge-secondary'
      }
    }
    
    return {
      tickets,
      filteredTickets,
      ticket,
      isLoading,
      isEditing,
      isCreating,
      isDeleting,
      filter,
      formData,
      errors,
      handleFilterChange,
      handleInputChange,
      handleSubmit,
      handleCreateClick,
      handleEditClick,
      handleCancelClick,
      handleDeleteClick,
      confirmDelete,
      cancelDelete,
      handleLogout,
      getStatusBadgeClass,
      getStatusText,
      getPriorityBadgeClass,
      DateUtils
    }
  }
}
</script>