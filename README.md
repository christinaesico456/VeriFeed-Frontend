# 🧠 VeriFeed Frontend

VeriFeed is an AI-powered **deepfake detection system** designed as a **browser extension for Facebook**.  
This repository contains the **frontend** built with **Vue.js 3 (Composition API)** and **Tailwind CSS**, providing a responsive, user-friendly interface that connects to the Django backend API.

---

## 🪄 Overview

The VeriFeed frontend allows users to:

- 🎥 Detect deepfake videos on Facebook in real time  
- 🧩 View AI-driven authenticity results (✅ Real / ⚠ Deepfake)  
- 💬 Send and view user feedback  
- 📚 Access informational sections such as **About**, **Features**, **How It Works**, **FAQ**, and **Contact Us**

---

## ✨ Features

- 🎥 **Real-Time Detection UI** – Displays AI detection results seamlessly  
- 🧱 **Component-Based Architecture** – Modular, reusable Vue components  
- 💬 **Feedback System** – Authenticated users can rate and send feedback  
- 🛡 **Privacy-First** – Runs locally in the browser, no user data upload  
- 📱 **Responsive Design** – Works on both desktop and mobile  
- ⚡ **Smooth Animations** – Clean transitions and scroll effects  

---

## 🧩 Technologies Used

| Type | Technology |
|------|-------------|
| Framework | [Vue.js 3](https://vuejs.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Icons | [Heroicons](https://heroicons.com/) |
| State Management | [Pinia](https://pinia.vuejs.org/) |
| API Communication | Axios (via custom `api.js`) |
| Build Tool | Vite |

---

## ⚙️ Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/christinaesico456/VeriFeed-Frontend.git
cd VeriFeed-Frontend

### 2️⃣ Install Dependencies
```bash
npm install   # Requires Node 16+

### 3️⃣ (Optional) Configure Tailwind
```bash
npm install -D tailwindcss postcss autoprefixer   # If Tailwind isn’t initialized yet
npx tailwindcss init -p 

```js
content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"]  # ensure your tailwind.config.js contains this

---

## 🔧 Configuration
- Create a .env file in the project root and add:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000/api  # Adjust the URL if your backend runs on a different host or port.

---

## 🚀 Run the Project

### Development
```bash
npm run dev   # The app runs by default at http://localhost:5173

### Production Build
```bash
npm run build

### Preview Production
```bash
npm run preview

---

## 🧱 Project Structure
```bash
verifeed-frontend/
├── src/
│   ├── assets/              # Images, logos, global styles
│   ├── components/          # Vue components
│   │   ├── Hero.vue
│   │   ├── About.vue
│   │   ├── Features.vue
│   │   ├── HowItWorks.vue
│   │   ├── FAQ.vue
│   │   ├── Contacts.vue
│   │   ├── FeedbackModal.vue
│   │   ├── FeedbackList.vue
│   ├── services/api.js      # Axios service for backend API
│   ├── stores/auth.js       # Pinia store for auth state
│   ├── App.vue              # Root component
│   ├── main.js              # Entry point
├── public/
│   └── verifeed_logo.png    # Project logo
├── index.html
├── package.json
└── tailwind.config.js

---

## 📦 Dependencies
```json
"dependencies": {
  "vue": "^3.x",
  "pinia": "^2.x",
  "axios": "^1.x",
  "@heroicons/vue": "^2.x"
},
"devDependencies": {
  "vite": "^5.x",
  "tailwindcss": "^3.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x"
}

---

##🔗 Backend Integration Guide

- The frontend communicates with the Django backend API (see Backend project).

### Backend Quick Setup

* Run the Django backend:
```bash
python manage.py runserver

* CORS Settings (already configured):
```python
CORS_ALLOW_ALL_ORIGINS = True   # In settings.py

* Backend Endpoints:
- http://127.0.0.1:8000/api/accounts/ → Registration, Login, Profile
- http://127.0.0.1:8000/api/reviews/ → Feedback Endpoints

* JWT Authentication:
Tokens (auth_token, refresh_token) are stored in localStorage.
Protected actions (e.g., feedback submission) require a valid JWT.

---

## 🧑‍💻 Author
- Developed by GAN
- Academic Research Project – De La Salle University – Dasmariñas

---

## 📜 License
- This project is intended for academic and research use only.
- Do not redistribute or commercialize without permission from the authors.
