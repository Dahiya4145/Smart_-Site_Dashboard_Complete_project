# 🏗️ Smart Site Dashboard

A full-stack Smart Construction Site Management System built with the MERN stack. This system enables efficient tracking and management of construction workflows including tasks, materials, labor logs, and real-time updates through a user-friendly admin portal.

## 🧩 Project Structure

```

smart-site-dashboard/
├── server/      → Backend (Node.js + Express)
├── client/      → Client-side user web app (React)
└── admin/       → Admin portal (React)

````

---

## 🚀 Features

- Real-time site monitoring and updates
- Task, material, and labor log management
- Role-based access control (admin & engineer)
- Notifications system
- Clean and responsive UI for both users and admins

---

## ⚙️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Others**: Socket.io, Toastify, Axios, JWT Auth, LocationIQ maps API Key, OPENWEATHER_API_KEY

---

## 🛠️ Setup Instructions

Follow the steps below to set up and run the project locally.

### 📁 Step 1: Clone the Repository

```bash
git clone https://github.com/Dahiya4145/Smart_-Site_Dashboard_Complete_project.git
cd smart-site-dashboard
````

---

### 🌐 Step 2: Configure the Backend (`server/`)

1. Navigate to the server folder:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and **add your MongoDB URI**:

   ```env
   MONGODB_URI=your_mongodb_connection_url
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the backend server:

   ```bash
   nodemon server.js
   ```

   **or**

   ```bash
   npm start
   ```

---

### 💻 Step 3: Run the Client App (`client/`)

1. Open a new terminal window and navigate to the `client` folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the client-side React app:

   ```bash
   npm start
   ```

---

### 🧑‍💼 Step 4: Run the Admin Portal (`admin/`)

1. Open **another terminal** and navigate to the `admin` folder:

   ```bash
   cd admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the admin React app:

   ```bash
   npm start
   ```

---

## 🖼️ Screenshots


[Admin Dashboard](https://github.com/user-attachments/assets/d145785d-96dc-4575-a79d-bf0eca658947)

[Login page](https://github.com/user-attachments/assets/ab112ca6-c5fa-4cd5-bf69-1720c3a66000)

[Register page](https://github.com/user-attachments/assets/b06fea58-ca05-4a89-b9f9-bb5b2e4c1811)

[Home Page](https://github.com/user-attachments/assets/a8b00523-0b6f-4e31-b2dd-49bff72017c7)

[About](https://github.com/user-attachments/assets/db31185f-2bb8-46f1-90db-c227df67c6c5)

[Site Details Page](https://github.com/user-attachments/assets/8f815d6d-76f3-43db-bb93-642c845d247d)

[Contact As](https://github.com/user-attachments/assets/01c73793-f801-4a31-83e0-928ca90dd073)

[Footer](https://github.com/user-attachments/assets/aea0f43f-78f1-45ac-bd31-0cdeaf2d06c7)






---

## 📦 Folder Breakdown

| Folder | Description                    |
| ------ | ------------------------------ |
| server | Backend API & DB configuration |
| client | Frontend for site users        |
| admin  | Admin dashboard interface      |

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📬 Contact

For any queries or support, please contact:
**Nishant Dahiya**

---
📧 dahiya4145@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/nishant-dahiya-080bb4259/)

---

## Live links
**Client Portal** (https://smartsitedashboard.netlify.app)
**Admin portal** (https://smartsiteadminportal.netlify.app)
