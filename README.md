# Student Dashboard

A comprehensive React-based dashboard for managing student information with Firebase authentication and advanced filtering capabilities.

## Live Demo
Visit the deployed application at: [Student Dashboard](https://student-dashboard-hazel.vercel.app/)

## Video Demonstration
Watch the application in action with network interactions: [Video Demo](https://drive.google.com/file/d/17JNCgD05wLR9QS3LFkWjp8BvF_NI-cKM/view?usp=sharing)

## Core Features

### Authentication
- Firebase authentication integration
- Protected routes requiring login
- Secure user session management

### Student Management
- View list of students with pagination
- Add new students with form validation
- Bulk import students functionality
- Detailed student cards with comprehensive information

### Advanced Filtering & Sorting
- Filter students by:
  - Status (Enrolled, Pending, Graduated, Dropped)
  - Year
  - Course
  - Search by name or email
- Sort students by:
  - Enrollment Date
  - Age
  - Year
  - Created At
- Toggle between ascending and descending order
- Reset filters option

### Responsive Design
- Mobile-first approach
- Responsive grid layout
- Adaptive UI elements for different screen sizes
- Optimized for both desktop and mobile devices
- Smooth scrolling and pagination

### UI/UX Features
- Loading skeletons for better user experience
- Error handling with retry options
- Intuitive navigation
- Clean and modern interface
- Sticky header for easy access to controls
- Pagination controls with student count

## Technical Implementation
- React with modern hooks
- Firebase integration for authentication and data storage
- Responsive design using Tailwind CSS
- Mock API simulation for development
- Form validation
- Error boundary implementation
- Optimized performance with pagination

## Additional Features (Bonus)
- Bulk import functionality
- Advanced sorting capabilities
- Comprehensive search functionality
- Status-based filtering
- Year-based filtering
- Course-based filtering
- Real-time updates
- Loading states and error handling
- Responsive design optimizations

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up Firebase configuration
4. Run the development server:
```bash
npm run dev
```

## Technologies Used
- React
- Firebase
- Tailwind CSS
- React Router
- Lucide Icons
- Custom Hooks

## Deployment
The application is deployed on Vercel for optimal performance and reliability.