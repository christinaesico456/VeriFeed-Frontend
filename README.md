# VeriFeed Frontend

VeriFeed is an AI-powered **deepfake detection system** designed as a **browser extension for Facebook**.  
This repository contains the **frontend** built with **Vue.js 3 (Composition API)** and **Tailwind CSS**, providing a responsive, user-friendly interface that connects to the Django backend API.

---

## 🧠 Overview

The VeriFeed frontend allows users to:

- Detect deepfake videos on Facebook in real time.  
- View AI-driven authenticity results (✅ Real / ⚠ Deepfake).  
- Send and view user feedback.  
- Access informational sections such as **About**, **Features**, **How It Works**, **FAQ**, and **Contact Us**.

---

## ✨ Features

- 🎥 **Real-Time Detection UI** – Displays AI results seamlessly.  
- 🧩 **Component-Based Architecture** – Clean and reusable Vue components.  
- 💬 **Feedback System** – Authenticated users can rate and send feedback.  
- 🛡 **Privacy-First** – Runs locally in the browser, no data upload.  
- 📱 **Responsive Design** – Works smoothly on desktop and mobile.  
- ⚡ **Animated Interface** – Smooth scroll and transition effects.

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
git clone https://github.com/yourusername/verifeed-frontend.git
cd verifeed-frontend

2️⃣ Install Dependencies
Requires Node 16+
npm install

3️⃣ (Optional) Configure Tailwind
If Tailwind isn’t initialized yet:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Then ensure your tailwind.config.js contains:

content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"]

🔧 Configuration
Create a .env file in the project root and add:

VITE_API_BASE_URL=http://127.0.0.1:8000/api
Adjust the URL if your backend runs on a different host or port.

🚀 Run the Project

Development
npm run dev
The app runs by default at http://localhost:5173

Production Build
npm run build

Preview Production
npm run preview

🧱 Project Structure
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

📦 Dependencies
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
🔗 Backend Integration Guide
The frontend communicates with the Django backend API (see Backend project).

Backend Quick Setup

Run the Django backend:
python manage.py runserver

CORS Settings (already configured):
In settings.py
CORS_ALLOW_ALL_ORIGINS = True

Backend Endpoints:
http://127.0.0.1:8000/api/accounts/ → Registration, Login, Profile
http://127.0.0.1:8000/api/reviews/ → Feedback Endpoints

JWT Authentication:
Tokens (auth_token, refresh_token) are stored in localStorage.
Protected actions (e.g., feedback submission) require a valid JWT.

🧑‍💻 Author
Developed by GAN

Academic Research Project – De La Salle University – Dasmariñas

📜 License
This project is intended for academic and research use only.
Do not redistribute or commercialize without permission from the authors.