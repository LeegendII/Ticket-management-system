# Ticket Management System - Multi-Framework Implementation

This project is a comprehensive ticket management system implemented in three different web technologies: React, Vue.js, and Twig (PHP). Each implementation provides the same core functionality while demonstrating the unique characteristics and approaches of each framework.

## Project Overview

The Ticket Management System allows users to:
- Create, read, update, and delete tickets
- Authenticate and manage user sessions
- View dashboard statistics
- Filter tickets by status
- Experience a responsive, modern UI

## Implementations

### 1. React Implementation

**Location**: `react-app/`

**Technology Stack**:
- React 18 with functional components and hooks
- React Router for navigation
- Context API for state management
- CSS-in-JS with CSS modules
- LocalStorage for data persistence

**Getting Started**:
```bash
cd react-app
npm install
npm start
```

**Features**:
- Component-based architecture
- Custom hooks for reusable logic
- Protected routes with authentication
- Toast notifications for user feedback
- Responsive design with CSS modules

### 2. Vue.js Implementation

**Location**: `vue-app/`

**Technology Stack**:
- Vue 3 with Composition API
- Vue Router for navigation
- Vue's built-in reactivity system for state management
- Scoped CSS for component styling
- LocalStorage for data persistence

**Getting Started**:
```bash
cd vue-app
npm install
npm run serve
```

**Features**:
- Composition API for organized component logic
- Reactive data binding
- Route guards for protected routes
- Toast notifications for user feedback
- Responsive design with scoped CSS

### 3. Twig Implementation

**Location**: `twig-app/`

**Technology Stack**:
- PHP 7.0+ for server-side logic
- Twig-like templating using PHP includes
- Session-based authentication
- CSS and JavaScript for client-side interactions
- Session storage for data persistence

**Getting Started**:
1. Set up a PHP-enabled web server (Apache, Nginx, etc.)
2. Point the server root to the `twig-app` directory
3. Access the application in your browser

**Features**:
- Server-side rendering
- Session-based authentication
- Template-based UI
- JavaScript utilities for client-side interactions
- Responsive design with CSS

## Shared Assets

### CSS
**Location**: `shared-assets/css/common.css`

Common CSS styles used across all implementations:
- CSS custom properties for consistent theming
- Responsive design patterns
- Component styles (cards, buttons, forms, etc.)
- Utility classes

### JavaScript
**Location**: `shared-assets/js/utils.js`

Shared JavaScript utilities:
- Date formatting functions
- Validation helpers
- API simulation functions
- Authentication utilities

## Features Comparison

| Feature | React | Vue.js | Twig |
|---------|-------|--------|------|
| Authentication | ✅ | ✅ | ✅ |
| Dashboard | ✅ | ✅ | ✅ |
| Ticket CRUD | ✅ | ✅ | ✅ |
| Form Validation | ✅ | ✅ | ✅ |
| Responsive Design | ✅ | ✅ | ✅ |
| Toast Notifications | ✅ | ✅ | ✅ |
| Data Persistence | LocalStorage | LocalStorage | Sessions |

## Project Structure

```
ticket-management-system/
├── README.md                 # This file
├── shared-assets/            # Shared assets across implementations
│   ├── css/
│   │   └── common.css       # Common CSS styles
│   ├── js/
│   │   └── utils.js         # Shared JavaScript utilities
│   └── README.md            # Shared assets documentation
├── react-app/                # React implementation
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   ├── package.json         # Dependencies and scripts
│   └── README.md            # React-specific documentation
├── vue-app/                  # Vue.js implementation
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   ├── package.json         # Dependencies and scripts
│   └── README.md            # Vue.js-specific documentation
└── twig-app/                 # Twig implementation
    ├── assets/              # CSS and JS assets
    ├── templates/           # PHP templates
    ├── index.php            # Main entry point
    └── README.md            # Twig-specific documentation
```

## Installation and Setup

### Prerequisites

- Node.js (v14.0.0 or higher) for React and Vue.js implementations
- PHP (v7.0 or higher) and a web server for Twig implementation
- A modern web browser

### Setting Up React Implementation

```bash
cd react-app
npm install
npm start
```

Access the application at [http://localhost:3000](http://localhost:3000)

### Setting Up Vue.js Implementation

```bash
cd vue-app
npm install
npm run serve
```

Access the application at [http://localhost:8080](http://localhost:8080)

### Setting Up Twig Implementation

1. Configure a web server (Apache, Nginx, etc.) to serve the `twig-app` directory
2. Ensure PHP is properly configured
3. Access the application at the configured URL

## Testing

Each implementation includes its own testing approach:

### React
```bash
cd react-app
npm test
```

### Vue.js
```bash
cd vue-app
npm run test:unit
```

### Twig
- Manual testing through browser interaction
- Form validation testing
- Authentication flow testing

## Deployment

### React
```bash
cd react-app
npm run build
```
Deploy the contents of the `build` directory to any static hosting service.

### Vue.js
```bash
cd vue-app
npm run build
```
Deploy the contents of the `dist` directory to any static hosting service.

### Twig
Deploy the entire `twig-app` directory to any PHP-enabled web server.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React team for the amazing library
- Vue.js team for the progressive framework
- PHP community for the robust server-side language
- All contributors who have helped improve this project