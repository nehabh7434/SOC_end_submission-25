
# 📺 YouTube Clone Project

A full-stack **YouTube-inspired video platform** built using **React.js** for the frontend and **Django REST Framework** for the backend. This project mimics core YouTube functionalities including video listing, watch later, likes, comments, dark mode, and more.

## 🚀 Features

### ✅ Core Functionality
- 🎥 Upload & display videos
- 🏠 Home page video listing
- 🔍 Search videos by title
- 🗂️ Video categories/tags

### ❤️ User Interactions
- ❤️ Like/Unlike videos
- ⏰ Watch Later toggle
- 📤 Share button (copy video link)
- 💬 Comment section (optional local/backend)
- 🧾 Subscriptions page
- 📱 Shorts (vertical video layout)

### 🎨 UI/UX
- 🎨 Dark mode toggle (light/dark themes)
- 🍭 Cute emoji-based buttons
- 🧭 Sidebar navigation
- 🎬 Clean responsive layout using Bootstrap 5

## 📁 Project Structure

```
ytclone/
├── backend/        # Django backend (REST API)
│   └── api/        # Video model, serializers, views
├── frontend/       # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── Upload.js
│   │   │   ├── Sidebar.js
│   │   │   ├── Navbar.js
│   │   │   ├── Shorts.js
│   │   │   ├── Liked.js
│   │   │   ├── Subscriptions.js
│   │   │   └── VideoPlayer.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── axiosConfig.js
```

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/yt-clone.git
cd yt-clone
```

### 2. Backend Setup (Django)

```bash
cd backend
python -m venv env
env\Scripts\activate  # or source env/bin/activate (Mac/Linux)

pip install -r requirements.txt

# If you don’t have requirements.txt, install manually:
pip install django djangorestframework djangorestframework-simplejwt corsheaders

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

The backend will be available at:  
`http://127.0.0.1:8000`

### 3. Frontend Setup (React)

```bash
cd ../frontend
npm install
npm start
```

The frontend will be available at:  
`http://localhost:3000`

## 🔐 Authentication (if added)

- Login: `/login`
- JWT token generation: `/api/token/`

## 📦 Features To Customize

- Connect backend DB to persist likes/watch later
- Add user profiles
- Add real-time comments
- Use PostgreSQL for production
- Deploy on Render, Vercel, or Heroku

## 📸 Screenshots

| Home Page        | Dark Mode         | Video Playback Page  |
|------------------|-------------------|------------------------|
| ![home](screens/home.png) | ![dark](screens/dark.png) | ![watch](screens/watch.png) |

> Screenshots go in `/frontend/public/screens/` folder.

## 👩‍💻 Author

Made with ❤️ by Neha Bharti 
This project was created as part of a college assignment at IIT Bombay.