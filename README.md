# To-Do API (Node.js + Express + MongoDB)

# Live API : https://todo-api-task-2.onrender.com/api/users

# Frontend URL 😉 :  https://todo-api-task-client-side.vercel.app/

For understanding of the RESTful api i have implemented Frontend also !


![Screenshot 2025-03-17 113335](https://github.com/user-attachments/assets/6261a71a-176a-4c44-b6d3-59b824fba1fc)

![Screenshot 2025-03-17 113321](https://github.com/user-attachments/assets/27303586-aab9-41b7-8372-ba3c0a6a970c)


## 📌 Overview

This project is a **RESTful API** for a **To-Do application** built using **Node.js, Express, MongoDB, and JWT authentication**.

ADDITIONAL Feature (FRONTEND (REACT)):  https://todo-api-task-client-side.vercel.app/

## 🚀 Features

- User authentication (JWT-based login system)
- Secure API routes
- CRUD operations for Users and To-Dos
- Protected routes using JWT authentication

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git https://github.com/Arjuntiruveedula/TODO_API_TASK.git
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Run the Server

```sh
npm run dev 
```

Server will run on `http://localhost:5000/`.

Also Deployed link : https://todo-api-task-2.onrender.com

---

## 📌 API Endpoints

### 🟢 Authentication

#### **Register User**

```http
POST /users
```

![WhatsApp Image 2025-03-17 at 10 13 13_c5d4d465](https://github.com/user-attachments/assets/9b878bc0-604d-4777-97ef-4a10d58e6f4b)

**Body:**

```json
{
  "user_fname": "Arjun",
  "user_lname": "Sarthak",
  "user_id": "123",
  "password": "securepassword"
}
```

#### **Login User**

```http
POST /login
```

**Body:**

```json
{
  "user_id": "123",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "token": "your_jwt_token"
}
```

### 🟢 User Management (Protected Routes)

#### **Get All Users**


  ![WhatsApp Image 2025-03-17 at 10 15 37_dd672a34](https://github.com/user-attachments/assets/96eda883-57bc-4970-8264-320f7887b477)

```http
GET /users
```

**Headers:**

```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

#### **Get User by ID**

![WhatsApp Image 2025-03-17 at 10 18 27_58dc63ca](https://github.com/user-attachments/assets/67b0d475-7a50-4863-8c4f-9d290ac31417)

```http
GET /users/:id
```

#### **Delete User by ID**

```http
DELETE /users/:id
```

### 🟢 To-Do Management (Protected Routes)

#### **Get All Todos**

```http
GET /todos
```

#### **Create a New Todo**

```http
POST /todos
```

**Body:**

```json
{
  "title": "Finish Assignment",
  "completed": false
}
```

#### **Get a Todo by ID**
![Screenshot 2025-03-17 105051](https://github.com/user-attachments/assets/1f63164f-acb3-450f-9eda-c9e54a029e7f)

```http
GET /todos/:id
```

#### **Update a Todo**

```http
PUT /todos/:id
```

**Body:**

```json
{
  "title": "Updated Task",
  "completed": true
}
```

#### **Delete a Todo**

```http
DELETE /todos/:id
```

---

## 🧪 Testing the API

### ✅ Using Postman

1. **Register a User** (`POST /users`)
2. **Login and Get Token** (`POST /login`)
3. **Use the Token for Further API Calls**
   - Add `Authorization: Bearer YOUR_JWT_TOKEN` in the headers
   - Test CRUD operations for **Users** and **To-Dos**

### ✅ Using cURL

Example: Fetch all users

```sh
curl -X GET http://localhost:5000/users \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```





---

## 🌍 Deployment on RENDER

```sh
render
```

Update your `.env` variables on Render using:

```sh
render env add MONGO_URI
render env add JWT_SECRET
```

---

## 📷 Screenshots & Demo Video

![Screenshot 2025-03-17 105112](https://github.com/user-attachments/assets/f15698d3-3eb1-4da4-bfd4-7316d62b919f)
![Screenshot 2025-03-17 105051](https://github.com/user-attachments/assets/c3621dfd-ee52-47c4-9fb9-f84c965c1900)


---

## 👨‍💻 Author


[Apparao Tiruveedula](https://github.com/Arjuntiruveedula)  
---

## 📜 License

This project is licensed under the MIT License.

