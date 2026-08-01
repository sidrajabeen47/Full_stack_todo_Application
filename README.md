# 📝 Full-Stack Todo Application

A feature-rich Full-Stack Todo Web Application built with a **Django REST Framework** backend and a **React.js** frontend. This application allows users to register, log in, and manage their daily tasks securely.

---

## ✨ Features

* **User Authentication:** JWT / Token-based Authentication (User Registration & Login).
* **Task Management:** Create, Read, Update, and Delete (CRUD) tasks.
* **User Isolation:** Each user can only view and manage their own todos.
* **Responsive UI:** Clean and modern interface built with React.

---

## 🛠️ Tech Stack

### **Backend**
* **Framework:** Python / Django & Django REST Framework (DRF)
* **Database:** SQLite (Development) / PostgreSQL (Production ready)
* **Authentication:** REST Framework Permissions & Token Auth

### **Frontend**
* **Library:** React.js
* **HTTP Client:** Axios / Fetch API

---

## 📁 Project Structure

```text
Full_stack_todo/
├── backend/            # Django REST API project
│   ├── todo/           # Todo app (models, views, serializers, urls)
│   ├── manage.py
│   └── requirements.txt
└── frontend/           # React frontend application
    ├── src/            # React components and styling
    ├── public/
    └── package.json
🚀 Local Setup Instructions
Prerequisites
Python 3.x installed

Node.js & npm installed

Git installed

1. Backend Setup (Django)
Navigate to the root directory and activate your virtual environment:

Bash
# Windows
.\venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
Navigate to the backend directory (if applicable) or install dependencies:

Bash
pip install -r requirements.txt
Run database migrations:

Bash
python manage.py migrate
Start the Django development server:

Bash
python manage.py runserver
Backend server running at: http://127.0.0.1:8000/

2. Frontend Setup (React)
Open a new terminal window and navigate to the frontend folder:

Bash
cd frontend
Install Node packages:

Bash
npm install
Start the React development server:

Bash
npm start
Frontend application running at: http://localhost:3000/
