# 🗳️ Voting Application

A secure and user-friendly voting backend system built with **Node.js** and **MongoDB**. This application allows users to register with a unique ID card number, authenticate, view candidates, vote once, and see real-time vote counts. Admins can manage candidate records but are restricted from voting.

---

## 🚀 Features

- 🔐 User registration and login with **ID Card Number** and password
- 📋 View list of election candidates
- 👤 View user profile: name, address, email, phone number, ID card number
- 🔁 Change password functionality
- 🗳️ Vote for only one candidate per user
- 🔎 Real-time **vote counts** sorted by highest votes
- 👮 Admin management of candidate data (create, update, delete)
- ❌ Admins cannot vote
- ✅ Each user can vote **only once**

---

## 📦 API Endpoints

### 🧑‍💻 User Authentication

| Method | Endpoint   | Description                |
|--------|------------|----------------------------|
| POST   | `/signup`  | Register a new user        |
| POST   | `/login`   | Login with ID card number and password |

---

### 🗳️ Voting

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| GET    | `/candidate`           | Get list of candidates         |
| POST   | `/vote/:candidateID`   | Vote for a specific candidate  |

---

### 📊 Vote Counting

| Method | Endpoint        | Description                                    |
|--------|-----------------|------------------------------------------------|
| GET    | `/vote/count`   | Get all candidates with live vote counts (sorted by vote count) |

---

### 👤 User Profile

| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/profile`           | Get user profile information   |
| PUT    | `/profile/password`  | Change user password           |

---

### 👮 Admin: Candidate Management

| Method | Endpoint                     | Description                    |
|--------|------------------------------|--------------------------------|
| POST   | `/candidate`                 | Add a new candidate            |
| PUT    | `/candidate/:candidateID`    | Update a candidate's details   |
| DELETE | `/candidate/:candidateID`    | Delete a candidate             |

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token), bcrypt
- **Environment Config:** dotenv

---
## 📁 Folder Structure (suggested)

voting-app/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── .env
├── server.js
├── package.json

## ⚙️ Setup Instructions

1. Clone the repo:

git clone https://github.com/Mawra-Abdul_Khaliq/voting-app.git
cd voting-app
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file and add your configuration:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the development server:

npm run dev
