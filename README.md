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
git clone https://github.com/Dahiya4145/smart-site-dashboard.git
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

*(Include some UI screenshots here if available)*

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
📧 dahiya4145@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/nishant-dahiya-080bb4259/)

```

## Live links
**Client Portal** (https://smartsitedashboard.netlify.app)
*Admin portal* (https://smartsiteadminportal.netlify.app)
