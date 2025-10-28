<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="decoration-circle decoration-circle-1"></div>
          <div class="decoration-circle decoration-circle-2"></div>
          
          <h1 class="text-center mb-4">Ticket Management System</h1>
          <p class="text-center mb-5" style="max-width: 700px; margin: 0 auto 2rem">
            Streamline your workflow with our powerful ticket management solution. 
            Track, prioritize, and resolve issues efficiently to keep your team productive.
          </p>
          
          <div class="d-flex justify-content-center gap-3">
            <router-link to="/auth/login" class="btn btn-light btn-lg">
              Login
            </router-link>
            <router-link to="/auth/signup" class="btn btn-primary btn-lg">
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="container my-5">
      <h2 class="text-center mb-5">Key Features</h2>
      
      <div class="d-flex justify-content-center flex-wrap gap-4">
        <div class="card" style="width: 300px">
          <div class="card-body">
            <h3 class="card-title">Easy Ticket Creation</h3>
            <p class="card-text">
              Quickly create tickets with all the necessary details. 
              Assign priorities and track progress effortlessly.
            </p>
          </div>
        </div>
        
        <div class="card" style="width: 300px">
          <div class="card-body">
            <h3 class="card-title">Real-time Updates</h3>
            <p class="card-text">
              Stay informed with real-time notifications and updates 
              on ticket status changes and comments.
            </p>
          </div>
        </div>
        
        <div class="card" style="width: 300px">
          <div class="card-body">
            <h3 class="card-title">Insightful Analytics</h3>
            <p class="card-text">
              Gain valuable insights with comprehensive dashboards 
              and reports on ticket resolution times and team performance.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Ticket Management System</h3>
            <p>A powerful solution for tracking and managing tickets efficiently.</p>
          </div>
          
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/auth/login">Login</router-link></li>
              <li><router-link to="/auth/signup">Sign Up</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>Implementations</h3>
            <ul>
              <li><a href="/react-app">React</a></li>
              <li><a href="/vue-app">Vue.js</a></li>
              <li><a href="/twig-app">Twig</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} Ticket Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>