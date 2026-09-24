# AI Blog Web App 🚀

Welcome to the **AI Blog Web App** repository! This is a full-stack, AI-powered blogging platform featuring a modern React frontend, a robust Java backend, and an intelligent Python AI service powered by FastAPI.

---

## 🛠️ Tech Stack & Architecture

The project is split into three main modules:

| Layer | Technology | Responsibility | Directory |
| :--- | :--- | :--- | :--- |
| **Frontend** | React + Vite, UI/UX Components | User interface, blogging dashboard, and responsive design | `/frontend` |
| **Backend** | Java (Spring Boot) | Core business logic, user auth, database management, and API routing | `/backend` |
| **AI Service**| Python >= 3.11, FastAPI | AI blog generation, summarization, and NLP features | `/ai-service` |

---

## 📋 Prerequisites

Before setting up the project, make sure you have the following installed on your machine:
* **Node.js** (v18 or higher)
* **Java JDK** (v17 or higher)
* **Python** (`>= 3.11` required for AI dependencies)
* **Maven** or **Gradle** (depending on your Java build tool)

---

## 🚀 Getting Started

Follow these steps to run each microservice locally.

### 1. React Frontend (UI/UX via Vite)
This template provides a minimal setup to get React working in Vite with HMR (Hot Module Replacement) and some ESLint rules.

Currently, two official plugins are available:
* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

#### ⚡ React Compiler Notice
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

#### 🛠️ Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

#### 🏃‍♂️ How to Run:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the node packages:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *Open `http://127.0.0.1:5173` in your browser to view the app.*

### 2. Java Backend (Core Logic)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build the project:
   ```bash
   ./mvnw clean install  # For Maven
   ```
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The core backend will be running at `http://127.0.0.1:8080`*

### 3. Python AI Service (FastAPI)
1. Navigate to the AI directory:
   ```bash
   cd ai-service
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   fastapi dev main.py
   ```
   *The AI service will be running at `http://127.0.0.1:8000`*

---

## 🤝 Git Workflow for the Team

To keep our repository clean and organized, please follow these rules before pushing any code:

1. **Never push directly to `main` or `master`** unless authorized.
2. **Create a feature branch** for your task:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Stage and commit** your changes with clear messages:
   ```bash
   git add .
   git commit -m "feat: added AI summary generation endpoint"
   ```
4. **Push your branch** to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request (PR)** on GitHub for review.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

