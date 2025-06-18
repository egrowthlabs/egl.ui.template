# CyrLab Admin Dashboard

This is a SaaS admin dashboard for CyrLab with secure login and role-based access control.

## Authentication Details

For demonstration purposes, the application has two mock users:

- **Admin User**
  - Username: `admin`
  - Password: `admin123`
  - Role: `Admin`
  - Access: All pages

- **Regular User**
  - Username: `user`
  - Password: `user123`
  - Role: `User`
  - Access: Dashboard, Productos, Pedidos, Mantenimientos, Visitas

## Features

- JWT-based authentication
- Role-based access control
- Protected routes
- Responsive layout
- Dark/light mode toggle
- Modern UI with Tailwind CSS

## Pages

- **Login**: Authentication page
- **Dashboard**: Home page with navigation cards
- **Regular User Pages**: Productos, Pedidos, Mantenimientos, Visitas
- **Admin-only Pages**: Usuarios, Reportes, Catálogos

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js 13 with App Router
- Tailwind CSS
- React Hook Form with Zod validation
- Lucide React for icons
- shadcn/ui components