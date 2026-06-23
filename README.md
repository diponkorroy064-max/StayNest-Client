# 🏠 StayNest

StayNest is a modern rental property management platform that connects property owners with tenants. Owners can list and manage rental properties, tenants can browse and book available homes, and administrators can oversee the platform through a dedicated dashboard.

---

## 🚀 Live Demo

* **Client:** https://your-client-url.vercel.app
* **Server:** https://your-server-url.onrender.com

---

## 📌 Features

### 👤 Authentication

* Secure user authentication with Better Auth
* Role-based access control (Admin, Owner, Tenant)
* Protected dashboard routes

### 🏡 Property Management

* Owners can add new rental properties
* View and manage their listed properties
* Upload property details including images, amenities, rent, and location
* Property approval workflow

### 🔍 Property Browsing

* Browse all approved rental properties
* Search and filter properties
* View detailed property information

### 📊 Dashboard

* Responsive dashboard layout
* Shared sidebar for desktop and mobile
* Different dashboard navigation for:

  * Admin
  * Property Owner
  * Tenant

### 📱 Responsive Design

* Mobile-first responsive interface
* Optimized for desktop, tablet, and mobile devices

---

# 🛠 Tech Stack

### Frontend

* Next.js 16
* React 19
* HeroUI
* Tailwind CSS
* React Hook Form
* React Icons
* React Toastify
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB

### Authentication

* Better Auth
* MongoDB Adapter

---

# 📂 Project Structure

```bash
staynest/
│
├── app/
│   ├── dashboard/
│   ├── properties/
│   ├── about/
│   ├── api/
│   └── ...
│
├── components/
│
├── lib/
│
├── hooks/
│
├── public/
│
└── ...
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/staynest.git
```

Go to the project folder

```bash
cd staynest
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_API_URL=

MONGODB_URI=

BETTER_AUTH_SECRET=

BETTER_AUTH_URL=
```

For the backend, create a `.env` file:

```env
PORT=5000

MONGODB_URI=

DB_NAME=

BETTER_AUTH_SECRET=
```

---

# 📌 API Endpoints

| Method | Endpoint                                     | Description                   |
| ------ | -------------------------------------------- | ----------------------------- |
| GET    | `/api/properties`                            | Get all properties            |
| GET    | `/api/properties/email?email=user@gmail.com` | Get properties by owner email |
| POST   | `/api/properties`                            | Add a new property            |
| PATCH  | `/api/properties/:id`                        | Update property               |
| DELETE | `/api/properties/:id`                        | Delete property               |

---

# 📦 NPM Packages

* better-auth
* mongodb
* @heroui/react
* react-hook-form
* react-toastify
* framer-motion
* react-icons
* lucide-react

---

# 🎯 Future Improvements

* Image upload with Cloudinary
* Wishlist/Favorites
* Property booking system
* Payment integration
* Review & rating system
* Real-time notifications
* Admin analytics dashboard

---

# 👨‍💻 Author

**Your Name**

GitHub: https://github.com/your-github

LinkedIn: https://linkedin.com/in/your-linkedin

---

## 📄 License

This project is licensed under the MIT License.
