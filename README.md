# VeriFeed Frontend

A **Vue 3 + Tailwind CSS** web application integrated with a **Django backend API**.  
This project is part of an **academic research project** at *De La Salle University - Dasmariñas*.

---

## 🧩 Features

- 🎨 Modern UI with **Tailwind CSS**
- ⚡ Fast development using **Vite**
- 🧠 State management with **Pinia**
- 🔗 API integration with **Axios**
- 📱 Responsive and user-friendly interface

---

## 🌿 Technologies Used

| Type | Technology |
|------|-------------|
| Framework | [Vue 3](https://vuejs.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| State Management | [Pinia](https://pinia.vuejs.org/) |
| API Communication | [Axios](https://axios-http.com/) |
| Build Tool | [Vite](https://vitejs.dev/) |

---

## ⚙️ Installation Guide

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/christinaesico456/VeriFeed-Frontend.git
cd VeriFeed-Frontend
```

---

### 2️⃣ Install Dependencies
```bash
npm install   # Requires Node 16+
```

---

### 3️⃣ (Optional) Configure Tailwind

If Tailwind CSS isn’t initialized yet:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Make sure your **tailwind.config.js** includes:
```js
content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"]
```

---

### 4️⃣ Run the Development Server
```bash
npm run dev
```
The app should now be running at:  
➡️ **http://localhost:5173/**

---

### 5️⃣ Build for Production
```bash
npm run build
```
The production-ready files will be generated in the **/dist** directory.

---

## 🗂️ Project Structure

```bash
VeriFeed-Frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── App.vue
│   └── main.js
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```
---

## 🧪 Development Notes

If you encounter issues with Node or NPM versions:
```bash
node -v   # Ensure Node 16+
npm -v
```

To reset dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Backend Integration Guide

The frontend communicates with the Django backend API.

### Run the Django backend:
```bash
python manage.py runserver
```

**CORS settings** (already configured in `settings.py`):
```python
CORS_ALLOW_ALL_ORIGINS = True
```

**Backend Endpoints:**
- `http://127.0.0.1:8000/api/accounts/` → Registration, Login, Profile  
- `http://127.0.0.1:8000/api/reviews/` → Feedback Endpoints  

**JWT Authentication:**
- Tokens (`auth_token`, `refresh_token`) are stored in `localStorage`.
- Protected actions (e.g., feedback submission) require a valid JWT.

---

## 📄 License

This project is intended for academic and research use only.  
Feel free to use and modify it with attribution.

---

## 💌 Author

Developed by **GAN**  
🏫 *De La Salle University - Dasmariñas*

---
