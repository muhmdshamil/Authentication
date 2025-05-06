# 🔐 Simple Authentication System

A basic user authentication system built using **Node.js**, **Express**, **MongoDB**, and **HTML**. It includes Register, Login, and Home pages with session-based authentication.

---

## 📂 Project Structure

auth-app/
│
├── views/ # HTML Pages
│ ├── register.html
│ ├── login.html
│ └── home.html
│
├── models/ # Mongoose Model
│ └── User.js
│
├── routes/ # Route Handlers
│ └── auth.js
│
├── app.js # Main Entry Point
├── package.json
└── .env


---

## 🚀 Features

- 📝 User Registration
- 🔐 Login with password hashing (bcrypt)
- ✅ Session-based authentication
- 🏠 Protected home route
- 📦 MongoDB integration using Mongoose

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt.js
- Express-Session
- HTML5 / CSS (basic)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/muhmdshamil/Authentication.git
cd auth-app

2. Install Dependencies
bash
Copy code
npm install
3. Configure Environment Variables
Create a .env file in the root directory:

bash
Copy code
MONGO_URI=mongodb://localhost:27017/auth-app
4. Start the Server
bash
Copy code
npm start
The app will run at http://localhost:3000.
