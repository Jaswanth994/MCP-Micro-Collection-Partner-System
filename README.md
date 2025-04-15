


# MCP Micro Collection Partner System


A web application for managing Micro Collection Partners (MCP) and their pickup partners, with order management, wallet transactions, and analytics.

## Deployed Link
MCP Web-App Link https://mcp-micro-collection-partner-system-pata.vercel.app/

Pickup Partner Web-App Link https://mcp-micro-collection-partner-system-pata.vercel.app/partner-login

#### Note:
   we can only login into pickup-partner app through the partners created by MCP.

## Table of Contents
- [Features](#features)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)

## Features

### MCP App Features
✅ **Dashboard** - Overview of earnings, partners, and orders  
✅ **Partner Management** - Add, remove, and view partner performance  
✅ **Wallet Management** - Add/subtract funds for self & partners  
✅ **Order Assignment** - Manual assignment of orders to partners  
✅ **Order Tracking** - Track progress of each assigned order  
✅ **Notifications** - Toast notifications for payments and orders  
✅ **Reports & Analytics** - Earnings reports and order history  

### Pickup Partner App Features
✅ **Dashboard** - View available orders, earnings, and completed tasks  
✅ **Order Management** - Accept/reject orders and update status  
✅ **Wallet** - View earnings and funds received from MCP  
✅ **Live Order Tracking** - Update order status (Pending/In Progress/Completed)  
✅ **Notifications** - New order alerts and payment updates  
✅ **Performance Stats** - View completed orders and earnings  

## System Architecture

```
MCP-MICRO-COLLECTION-PARTNER-SYSTEM
├── client/                  # Frontend React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images, styles
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Main application pages
│   │   ├── services/       # API service files
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── server/                 # Backend Node.js server
    ├── config/            # Configuration files
    ├── controllers/       # Business logic
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── utils/            # Utility functions
    ├── .env              # Environment variables
    ├── package.json
    └── server.js         # Server entry point
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm (v8 or higher)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Jaswanth994/MCP-Micro-Collection-Partner-System.git
   cd mcp-system
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

2. In a separate terminal, start the frontend:
   ```bash
   cd client
   npm run dev
   ```

3. Access the applications:
   - MCP App: `http://localhost:3000`
   - Partner App: `http://localhost:3000/partner-login`

## API Documentation

The backend provides RESTful APIs for:

- **Auth Routes**: `/api/auth/register`, `/api/auth/login`
- **Partner Routes**: `/api/partners`, `/api/partners/:id`
- **Order Routes**: `/api/orders`, `/api/orders/:id`
- **Wallet Routes**: `/api/wallet`, `/api/wallet/transfer`

## Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS (or your CSS framework)
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT for authentication
- Bcrypt for password hashing

## Future Enhancements

1. Implement auto-assignment of orders to partners
2. Integrate Google Maps API for live location tracking
3. Add rating system for partners
4. Implement push notifications
5. Add advanced analytics with charts
6. Multi-language support
