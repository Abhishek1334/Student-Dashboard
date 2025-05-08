# Student Dashboard
## BabyCode Assessment
A modern, responsive web application for managing student information, built with React and Vite.

## Features

- 📊 Interactive student management dashboard
- 👥 Student profile management
- 🔍 Advanced filtering and search capabilities
- 📱 Fully responsive design
- 📤 Bulk import functionality
- 🔐 Secure authentication with Firebase
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Firebase
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Icons:** Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/student-dashboard.git
   cd student-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
student-dashboard/
├── src/
│   ├── api/          # API integration
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── routes/       # Route configurations
│   └── utils/        # Utility functions
├── public/           # Static assets
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint