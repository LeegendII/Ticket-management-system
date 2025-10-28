<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">Ticket Management</div>
        
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link active">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tickets" class="nav-link">Tickets</router-link>
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
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Dashboard</h1>
          <p class="text-secondary">Welcome back, {{ user?.name }}!</p>
        </div>
        <router-link to="/tickets" class="btn btn-primary">
          Manage Tickets
        </router-link>
      </div>
      
      <div v-if="isLoading" class="text-center my-5">
        <div class="spinner" style="width: 3rem; height: 3rem; border-width: 0.3rem"></div>
        <p class="mt-3">Loading dashboard...</p>
      </div>
      
      <div v-else>
        <!-- Stats Cards -->
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.total }}</div>
            <div class="stat-label">Total Tickets</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-value" style="color: var(--success-color)">{{ stats.open }}</div>
            <div class="stat-label">Open Tickets</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-value" style="color: var(--warning-color)">{{ stats.inProgress }}</div>
            <div class="stat-label">In Progress</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-value" style="color: var(--gray-color)">{{ stats.closed }}</div>
            <div class="stat-label">Closed Tickets</div>
          </div>
        </div>
        
        <!-- Recent Tickets -->
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3 class="mb-0">Recent Tickets</h3>
            <router-link to="/tickets" class="btn btn-sm btn-outline-primary">
              View All
            </router-link>
          </div>
          
          <div class="card-body">
            <div v-if="recentTickets.length > 0" class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ticket in recentTickets" :key="ticket.id">
                    <td>
                      <div>
                        <strong>{{ ticket.title }}</strong>
                        <span v-if="ticket.priority === 'high'" class="badge badge-danger ms-2">High Priority</span>
                      </div>
                    </td>
                    <td>
                      <span :class="['badge', getStatusBadgeClass(ticket.status)]">
                        {{ getStatusText(ticket.status) }}
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
              <router-link to="/tickets" class="btn btn-primary">
                Create Your First Ticket
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AuthUtils, ApiUtils, DateUtils, ToastUtils } from '../utils'

export default {
  name: 'DashboardPage',
  setup() {
    const router = useRouter()
    
    const stats = ref({
      total: 0,
      open: 0,
      inProgress: 0,
      closed: 0
    })
    const recentTickets = ref([])
    const isLoading = ref(true)
    const user = ref(null)
    
    onMounted(() => {
      // Check if user is authenticated
      if (!AuthUtils.isAuthenticated()) {
        ToastUtils.error('Your session has expired. Please log in again.')
        router.push('/auth/login')
        return
      }
      
      // Get user data
      user.value = AuthUtils.getSession()
      
      // Load dashboard data
      loadDashboardData()
    })
    
    const loadDashboardData = () => {
      try {
        // Get ticket statistics
        const ticketStats = ApiUtils.getTicketStats()
        stats.value = ticketStats
        
        // Get recent tickets (last 5)
        const allTickets = ApiUtils.getTickets()
        const sortedTickets = [...allTickets].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
        recentTickets.value = sortedTickets.slice(0, 5)
      } catch (error) {
        ToastUtils.error('Failed to load dashboard data. Please try again.')
      } finally {
        isLoading.value = false
      }
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
    
    return {
      stats,
      recentTickets,
      isLoading,
      user,
      handleLogout,
      getStatusBadgeClass,
      getStatusText,
      DateUtils
    }
  }
}
</script>