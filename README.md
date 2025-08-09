# Trenzia E-Commerce Platform

Trenzia is a modern, full-stack e-commerce web application designed to deliver a seamless shopping experience for users and robust management tools for administrators. The platform supports user authentication, product browsing, cart and checkout functionality, order management, and an admin dashboard for product and user management.

## Project Vision

Our vision is to create a scalable, user-friendly, and visually appealing online store that can be easily customized and extended. Trenzia aims to provide a smooth shopping journey for customers and efficient tools for store owners to manage their business.

## Tech Stack

**Frontend:**

- React (with Vite)
- Redux Toolkit (state management)
- Tailwind CSS (utility-first styling)
- Axios (API requests)
- React Router (routing)

**Backend:**

- Node.js & Express.js (REST API)
- MongoDB (database)
- Mongoose (ODM)
- JWT (authentication)
- Bcrypt.js (password hashing)
- dotenv (environment variables)

## Project Status

The project is currently in active development. Core features such as user registration/login, product catalog, cart, checkout, and admin management are implemented. Further enhancements, UI polish, and additional features (like payment integration and advanced analytics) are planned.

## Features & Outcome

- User registration, login, and profile management
- Product browsing, filtering, and detailed views
- Shopping cart and guest cart merging
- Secure checkout and order confirmation
- Order history and order details for users
- Admin dashboard for managing products, users, and orders
- Responsive design for all devices

## How to Run the Project

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud instance)

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/trenzia-ecommerce.git
cd trenzia-ecommerce
```

### 2. Setup the Backend

```sh
cd backend
npm install
# Create a .env file with your MongoDB URI and JWT secret
cp .env.example .env
# Edit .env as needed
npm run seed   # (Optional) Seed the database with sample data
npm run dev    # Start the backend server
```

### 3. Setup the Frontend

```sh
cd frontend
npm install
npm run dev    # Start the frontend development server
```

The frontend will be available at [http://localhost:5173](http://localhost:5173) and the backend API at [http://localhost:3000](http://localhost:3000) by default.

---
## Check out the website
https://trenzia-e-commerce.vercel.app/
