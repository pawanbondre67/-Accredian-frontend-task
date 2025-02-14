# Refer & Earn Landing Page (MERN Stack)

## 📌 Project Overview

The **Refer & Earn** project is a full-stack web application that allows users to refer a course to others and earn rewards. The application consists of a **React.js (Vite)** frontend, an **Express.js** backend, and **MySQL** as the database, managed with **Prisma ORM**. Users can sign up, log in, and refer courses via a form. Upon successful referral submission, an email notification is sent using **EmailJS**.

---
## 🚀 Features

### 🌐 Frontend (React.js + Vite + MUI)

- **Responsive UI** with Material-UI components
- **Refer & Earn Landing Page** with:
  - Hero section
  - "Refer Now" button to open a modal
  - Referral form with validation
- **Authentication** (Signup & Login pages with validation)
- **State management** using React Context API
  
--- 

## 📂 Tech Stack

### Frontend:

- **React.js (Vite)**
- **Material-UI (MUI)**
- **Tailwind CSS (for additional styling)**
- EmailJS (for sending referral emails)
- **React Router** (for navigation)
- **React Context API** (for state management)

---

## 🛠 Installation & Setup

### 1️⃣ Prerequisites

Ensure you have the following installed:

- **Vite** (for frontend setup)

 ## 2️⃣ Clone the Repository

```sh
 git clone https://github.com/pawanbondre67-Accredian-frontend-task.git
 cd -Accredian-frontend-task
```


### 3️⃣  Frontend Setup

```sh
 npm install
```
#### Configure Environment Variables:

Create a `.env` file in the  directory and add:

```env
VITE_BASE_URL="http://localhost:3000/api"
VITE_SERVICE_ID="service_Id"
VITE_TEMPLATE_ID="template_Id"
VITE_USER_ID="userId"
```

Run the frontend:

```sh
npm run dev
```

## 📌 API Endpoints

### 🔑 Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### 📩 Referral System

- `POST /api/referrals/create-referral` - Submit a referral
- `GET /api/referrals/get-referrals` - Get Referrals sent by User

---

## 🔥 Contributing

Feel free to fork the repo and submit pull requests for improvements!

---

## 📜 License

This project is **MIT Licensed**.

---

### 👨‍💻 Developed by:

**Pawan Bondre** | [GitHub](https://github.com/pawanbondre67) | [LinkedIn](https://linkedin.com/in/pawan-bondre-62621243)


