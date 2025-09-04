# 🚀 Node.js Authentication System with Email Verification

This project is my **backend project** where I built a complete **authentication system** with **signup, login, and email verification** using Node.js, Express, MongoDB, JWT, and Nodemailer.

I documented my journey step by step so that anyone learning backend can follow along.  
This project shows how I started backend development and learned how real-world authentication works.

---

## 📌 Features
- User Signup with name, email, and password
- Passwords **hashed** with `bcrypt` (no plain text stored!)
- Unique **JWT token** generated on signup
- Verification email sent with **Nodemailer**
- Email verification link activates user account
- Users cannot login until they verify email
- Login notification email sent on successful login
- Data stored in **MongoDB (Mongoose)** with `verified` field
- Secure environment variables with `.env`

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **Email Service:** Nodemailer (Gmail App Password / Ethereal)
- **Tools:** Postman, MongoDB Compass

---

## ⚡ Endpoints (Postman Tested)

### 1. Signup
**POST** `/api/auth/signup`  
Body (JSON):
```json
{
  "name": "Pranay",
  "email": "pranay@demo.com",
  "password": "mypassword123"
}
```

---
2. Verify Email <br>

GET /api/auth/verify/:token <br>
✅ Marks the user as verified: true in MongoDB.<br>
Response: <br>

{ "message": "Email verified successfully. You can now log in." }

3. Login <br>

POST /api/auth/login <br>
Body: <br>

{
  "email": "pranay@demo.com", <br>
  "password": "mypassword123"
}

✅ Only works after email verification. <br> 
📩 Sends a "New Login Alert" email. <br> 

## 📝 Steps I Performed  

### 🔹 Project Setup  
- Initialized Node.js project with `npm init`  
- Installed dependencies: **express, mongoose, dotenv, bcrypt, jsonwebtoken, nodemailer, cookie-parser**  

### 🔹 Server & Database  
- Created **server.js** with Express  
- Connected MongoDB using **config/db.js**  

### 🔹 User Model  
- Defined **User schema** (`user.js`) with fields: `name`, `email`, `password`, `verified`  

### 🔹 Signup Flow  
- Hashed password using **bcrypt**  
- Stored user in **MongoDB**  
- Generated **JWT token**  
- Sent **verification email** with Nodemailer  

### 🔹 Email Verification  
- Built `verify/:token` route  
- Verified **JWT token** from email  
- Updated `verified: true` in MongoDB  

### 🔹 Login Flow  
- Checked if email is **verified**  
- Compared password using **bcrypt.compare**  
- Sent **login alert email** on successful login  

### 🔹 Testing  
- Tested APIs using **Postman**  
- Verified data in **MongoDB Compass**  
- Clicked verification link from **Gmail inbox** <br>

<img width="1739" height="557" alt="Screenshot 2025-09-04 173951" src="https://github.com/user-attachments/assets/39c3ee8b-f62b-4f0e-8945-f3f1a7723aed" /> 
<img width="845" height="447" alt="Screenshot 2025-09-04 174217" src="https://github.com/user-attachments/assets/b24e8d8d-e916-4e77-b87d-deafea67013a" />
<img width="453" height="299" alt="Screenshot 2025-09-04 174356" src="https://github.com/user-attachments/assets/74ad55fa-476b-42cc-9960-4287b26b283a" />
<img width="368" height="93" alt="Screenshot 2025-09-04 174408" src="https://github.com/user-attachments/assets/d4cfd9f3-96af-4b87-8f05-271dfc9e6806" />







