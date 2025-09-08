# Backend - Auth API

This is the **Node.js + Express backend** for the authentication system.  
It provides APIs for **registering** and **logging in** users.  

---

## 🚀 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB (or in-memory for testing)**
- **bcryptjs** (password hashing)
- **jsonwebtoken (JWT)** (authentication)
- **cors** (Cross-Origin Resource Sharing)
- **dotenv** (environment variables)

---

## 📂 Project Structure
backend/
│── routes/
│ └── auth.js # Auth routes (login/register)
│── models/
│ └── User.js # User schema (if using MongoDB)
│── server.js # Main server entry
│── db.js # Database connection
│── .env # Environment variables
│── package.json
│── README.md

Install dependencies

npm install


Create .env file
Inside backend/.env add:

# Server
PORT=5000

# SQLite database file
SQLITE_FILE=users.db

# Session secret (used by express-session to sign cookies)
SESSION_SECRET=my_super_secret_key


installation 

npm install 

live server start

node server.js

live server 

http://localhost:5000/

deploy backend : https://klickks-backend-2.onrender.com/api
deploy frontend : https://klickks-frontend-4sir.vercel.app

deploy: https://klickks-frontend-4sir.vercel.app
