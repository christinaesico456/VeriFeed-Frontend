```markdown
\# 🧠 VeriFeed Frontend

A \*\*Vue 3 + Tailwind CSS\*\* web application integrated with a \*\*Django REST backend\*\*.  
This project is part of an \*\*academic research project\*\* at *De La Salle University – Dasmariñas.*

---

\## 🧩 Technologies Used

\| Type \| Technology \|
\|------\|-------------\|
\| Framework \| [Vue 3](https://vuejs.org/) \|
\| Styling \| [Tailwind CSS](https://tailwindcss.com/) \|
\| State Management \| [Pinia](https://pinia.vuejs.org/) \|
\| API Communication \| [Axios](https://axios-http.com/) \|
\| Build Tool \| [Vite](https://vitejs.dev/) \|

---

\## ⚙️ Installation Guide

\### 1️⃣ Clone the Repository
\`\`\`bash
git clone https://github.com/christinaesico456/VeriFeed-Frontend.git
cd VeriFeed-Frontend
\`\`\`

---

\### 2️⃣ Install Dependencies
\`\`\`bash
npm install   # Requires Node 16+
\`\`\`

---

\### 3️⃣ (Optional) Configure Tailwind
If Tailwind CSS isn’t initialized yet:
\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Make sure your \*\*tailwind.config.js\*\* includes:
\`\`\`js
content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"]
\`\`\`

---

\## 🔧 Configuration

Create a \`.env\` file in the project root and add:

\`\`\`bash
VITE_API_BASE_URL=http://127.0.0.1:8000/api
\`\`\`

> Adjust the URL if your backend runs on a different host or port.

---

\## 🚀 Run the Project

\### Development
\`\`\`bash
npm run dev
\`\`\`
> The app runs by default at [http://localhost:5173](http://localhost:5173)

\### Production Build
\`\`\`bash
npm run build
\`\`\`

\### Preview Production
\`\`\`bash
npm run preview
\`\`\`

---

\## 🧱 Project Structure
\`\`\`bash
verifeed-frontend/
├── src/
│   ├── assets/              
│   ├── components/          
│   │   ├── Hero.vue
│   │   ├── About.vue
│   │   ├── Features.vue
│   │   ├── HowItWorks.vue
│   │   ├── FAQ.vue
│   │   ├── Contacts.vue
│   │   ├── FeedbackModal.vue
│   │   ├── FeedbackList.vue
│   ├── services/api.js      
│   ├── stores/auth.js       
│   ├── App.vue              
│   ├── main.js              
├── public/
│   └── verifeed_logo.png    
├── index.html
├── package.json
└── tailwind.config.js
\`\`\`

---

\## 📦 Dependencies
\`\`\`json
{
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
}
\`\`\`

---

\## 🔗 Backend Integration Guide

The frontend communicates with the \*\*Django backend API\*\* (see VeriFeed Backend project).

\### 🖥️ Backend Quick Setup

Run the Django backend:
\`\`\`bash
python manage.py runserver
\`\`\`

\*\*CORS Settings (already configured):\*\*
\`\`\`python
CORS_ALLOW_ALL_ORIGINS = True   # In settings.py
\`\`\`

\*\*Backend Endpoints:\*\*
\`\`\`
http://127.0.0.1:8000/api/accounts/ → Registration, Login, Profile
http://127.0.0.1:8000/api/reviews/  → Feedback endpoints
\`\`\`

\*\*JWT Authentication:\*\*
- Tokens (\`auth_token\`, \`refresh_token\`) are stored in **localStorage**  
- Protected actions (e.g., feedback submission) require a valid JWT  

---

\## 🧑‍💻 Author

- Developed by \*\*GAN\*\*  
- Academic Research Project – *De La Salle University – Dasmariñas*

---

\## 📜 License

- This project is intended for \*\*academic and research use only.\*\*  
- Do \*\*not redistribute or commercialize\*\* without permission from the authors.
