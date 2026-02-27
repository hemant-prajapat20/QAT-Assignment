# JWT Auth App - MERN Stack

A full-stack MERN application with JWT authentication and three role-based panels: User, Manager, and Admin.

## Project Structure

```
jwt-auth-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Prerequisites

- Node.js (v18+)
- MongoDB (running locally on port 27017)
- npm

## Setup Instructions

### 1. Start MongoDB

Make sure MongoDB is running on your machine:
```
mongod
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```
Backend runs at: http://localhost:5000

### 3. Setup Frontend

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:3000

## Roles & Access

| Role    | Dashboard | Can Access          |
|---------|-----------|---------------------|
| User    | /user     | Own profile only    |
| Manager | /manager  | View team members   |
| Admin   | /admin    | Full control (CRUD) |

## API Endpoints

| Method | Endpoint                  | Access         |
|--------|---------------------------|----------------|
| POST   | /api/auth/register        | Public         |
| POST   | /api/auth/login           | Public         |
| GET    | /api/auth/me              | All logged in  |
| GET    | /api/user/all             | Admin only     |
| GET    | /api/user/members         | Manager, Admin |
| DELETE | /api/user/:id             | Admin only     |
| PUT    | /api/user/:id/role        | Admin only     |
