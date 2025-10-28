# Ticket Management System - Vue.js Implementation

This is the Vue.js implementation of the Ticket Management System, a web application for creating, tracking, and managing tickets.

## Features

- **Landing Page**: Welcoming page with wavy background, decorative elements, and call-to-action buttons
- **Authentication**: Secure login and signup with form validation and session management
- **Dashboard**: Overview of ticket statistics with navigation to ticket management
- **Ticket Management**: Full CRUD operations (Create, Read, Update, Delete) with validation
- **Responsive Design**: Mobile, tablet, and desktop adaptations
- **Toast Notifications**: User-friendly feedback for actions
- **Form Validation**: Client-side validation with error messages

## Project Structure

```
vue-app/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── assets/
│   │   └── main.css         # Vue-specific styles
│   ├── components/
│   │   └── ui/
│   │       └── ToastContainer.vue  # Toast notification component
│   ├── router/
│   │   └── index.js         # Vue Router configuration
│   ├── utils/
│   │   └── index.js         # Utility functions
│   ├── views/
│   │   ├── auth/
│   │   │   ├── LoginPage.vue        # Login page component
│   │   │   └── SignupPage.vue       # Signup page component
│   │   ├── DashboardPage.vue        # Dashboard page component
│   │   ├── LandingPage.vue          # Landing page component
│   │   └── TicketManagementPage.vue # Ticket management page component
│   ├── App.vue                     # Main app component
│   └── main.js                     # App entry point
├── package.json                   # Project dependencies and scripts
└── README.md                      # This file
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ticket-management-system/vue-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run serve
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

### Scripts

- `npm run serve` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs the linter

### Compiles and Hot-Reloads for Development

```bash
npm run serve
```

### Compiles and Minifies for Production

```bash
npm run build
```

### Lints and Fixes Files

```bash
npm run lint
```

## Usage

### Authentication

1. **Login**: Navigate to `/auth/login` and enter your credentials
   - Demo credentials: `admin@example.com` / `password123`

2. **Signup**: Navigate to `/auth/signup` to create a new account

### Dashboard

After logging in, you'll be redirected to the dashboard at `/dashboard` which shows:
- Ticket statistics (total, open, in progress, closed)
- Recent tickets table
- Navigation to ticket management

### Ticket Management

Navigate to `/tickets` to:
- View all tickets in a table format
- Filter tickets by status (all, open, in progress, closed)
- Create new tickets
- View ticket details
- Edit existing tickets
- Delete tickets

### Routes

- `/` - Landing page
- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/dashboard` - Dashboard (protected)
- `/tickets` - Ticket management (protected)
- `/tickets/:id` - Ticket details (protected)

## Technology Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Official routing library for Vue
- **Composition API** - Vue 3's new way of organizing component logic
- **CSS Variables** - For theming and consistent design
- **LocalStorage** - For session management and data persistence

## State Management

This implementation uses Vue's built-in reactivity system:
- Component state with `ref` and `reactive`
- LocalStorage for session persistence and data storage

## Data Persistence

For demonstration purposes, this implementation uses LocalStorage to persist:
- User session information
- Ticket data

In a production environment, this would be replaced with a backend API.

## Styling

The application uses:
- Shared CSS from `../shared-assets/css/common.css`
- Vue-specific styles in `src/assets/main.css`
- CSS custom properties for consistent theming
- Responsive design with media queries

## Testing

To run the linter:

```bash
npm run lint
```

## Build for Production

To create an optimized production build:

```bash
npm run build
```

This will create a `dist` folder with optimized assets ready for deployment.

## Deployment

The `dist` folder can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.