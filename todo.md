CDC Sénégal Application - MVP Development Plan
Core Files to Create/Modify:
1. Main Application Structure
src/App.tsx - Update routing for multiple pages
src/pages/Index.tsx - Landing page with CDC branding
index.html - Update title and meta tags for CDC
2. Authentication & User Management
src/pages/Login.tsx - Secure login page with MFA support
src/pages/Register.tsx - User registration with role selection
src/pages/Dashboard.tsx - Main user dashboard
3. Core Service Pages
src/pages/Services.tsx - Service catalog (consignment, financing, real estate)
src/pages/DocumentSubmission.tsx - Online document submission form
src/pages/RequestTracking.tsx - Real-time request tracking
4. Administrative Features
src/pages/AdminDashboard.tsx - Analytics dashboard for CDC staff
src/components/AdminPanel.tsx - Administrative controls
5. Shared Components
src/components/Navbar.tsx - Navigation with CDC branding
src/components/ServiceCard.tsx - Reusable service display component
Key Features to Implement:
Bilingual support (French/English)
Responsive design with CDC branding
Role-based access (Individual, Business, Institution, Admin)
Service catalog with detailed descriptions
Document submission workflow
Request tracking system
Basic payment integration UI
Administrative analytics dashboard
Technical Approach:
Use shadcn/ui components for consistent UI
Implement mock data for demonstration
Focus on user experience and visual appeal
Ensure responsive design for mobile/web
Use Tailwind CSS for CDC color scheme
