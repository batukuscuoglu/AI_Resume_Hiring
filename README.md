# 🚀 AI Hiring Website

An end-to-end AI-powered resume screening application that automatically scores and ranks candidates against a job description, provides interactive explanations, anonymizes personal data, and ensures ethical hiring practices.

## 📖 Table of Contents
- [✨ Features](#-features)
- [⚙️ Prerequisites](#-prerequisites)
- [🛠️ Installation](#-installation)
  - [🌐 Frontend](#frontend)
  - [🐍 Backend](#backend)
- [🚀 Usage](#-usage)
- [🗂️ Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features
- **🤖 Semantic Resume Screening**: Scores PDFs using transformer embeddings.
- **ℹ️ “Why This Score?”**: Popovers highlighting top-matched sentences.
- **🔒 Anonymization**: Strips PII (emails, phone numbers, names) on upload.
- **✅ Consent Management**: Explicit consent modal; withdraw link to purge data.
- **📝 Human Oversight**: In-app note-taking, manual overrides, audit logs.
- **📄 Secure PDF Viewer**: Stream originals within your network.

## ⚙️ Prerequisites
- **Node.js** (v16+)
- **npm** (v8+)
- **Python** (v3.10+)
- **Git** (optional, for cloning)

## 🛠️ Installation

### 🌐 Clone the repository
```bash
git clone https://github.com/your-org/ai-hiring-website.git
cd ai-hiring-website
```

### Frontend
```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install
```

### 🐍 Backend
```bash
# Navigate to the backend folder
cd backend

# Create a virtual environment (Windows PowerShell)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Or (macOS / Linux)
# python3 -m venv .venv
# source .venv/bin/activate

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

## 🚀 Usage

### Start the Backend
Ensure your virtual environment is activated:
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

### Start the Frontend
Open a new terminal:
```bash
cd frontend
npm run dev
```

Open your browser at `http://localhost:3000` (or the port shown) to explore the app.

## 🗂️ Project Structure
```
ai-hiring-website/
├── frontend/          # React + Tailwind + Framer Motion UI
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # FastAPI REST API
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   └── ...
│   ├── .venv/
│   ├── requirements.txt
│   └── README.md
└── README.md
```

## 🤝 Contributing
Contributions welcome! 🎉 Please:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/XYZ`)
3. Commit your changes (`git commit -m "Add XYZ"`)
4. Push to your branch (`git push origin feature/XYZ`)
5. Open a Pull Request

## 📄 License
This project is open source, released by Batu Kuşcuoğlu © 2025. Everyone is free to copy, modify, and use this software in their own projects. All contributions and forks are welcome.
