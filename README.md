# Bank Management Frontend

This is the frontend application for the Bank Management System, built with **React.js**. It provides separate portals for admins and customers, with full functionality for authentication, transactions, analytics, and more.

---

## 💡 Tech Stack

- **React.js** – Component-based UI library.
- **Context API** – Global state management (authentication, theme).
- **Custom CSS** – Styling for components and layouts.
- **Fetch/Axios** – For communicating with the backend API.
- **Other Dependencies** – See `package.json` for details.

---

## 📁 Project Structure

```bash
Bank-Management-Frontend/
├── public/ # Static assets and HTML template
└── src/
├── Authentication/ # Login, MPIN, OTP, security question flows
├── AdminDashboard/ # Admin dashboard, analytics, customer management
├── CustomerDashboard/ # Deposit, withdraw, transfer, profile, etc.
├── Components/ # Shared components (Navbar, Modal, ThemeToggle)
├── Context/ # Auth and Theme Context
├── apiConfig.js # Backend API endpoint setup
└── App.js # Root component and routing
```

---

## 🎯 Key Features

- **Admin and Customer Portals** – Dedicated dashboards for each user type.
- **Authentication** – Login, OTP verification, MPIN and security question flows.
- **Customer Management** – Admins can add, update, or delete customers.
- **Transaction Handling** – Deposit, withdraw, transfer, and view transaction history.
- **Analytics** – Admins can view insights via a dashboard.
- **Responsive UI** – Clean layout with mobile-friendly design.
- **Theme Toggle** – Light and dark mode support.

---

## ▶️ Usage

### 1. Clone the Repository
```bash
git clone https://github.com/Yash-Jaju1/Bank-Management-Frontend.git
cd Bank-Management-Frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up API Endpoint
In src/apiConfig.js, configure the base URL of your backend:

```js
export const API_BASE_URL = "https://bank-management-6r4z.onrender.com";
```

### 4. Run the App Locally

```bash
npm start
```
This will start the app at http://localhost:3000

---

## 🔗 Backend Connection
Make sure the backend is running at the URL defined in apiConfig.js.

---

## 🧪 Available Scripts
- npm start – Start dev server

- npm run build – Build for production

- npm test – Run tests (if available)

