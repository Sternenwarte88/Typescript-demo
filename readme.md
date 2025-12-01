# 📘 CourseManager API – TypeScript Showcase Project

Welcome to the **CourseManager API**, a structured backend project for managing online courses and participants — built with **Express.js** and **TypeScript**.

This repository serves as a **technical showcase** to demonstrate relevant TypeScript backend skills:

- Clean architecture  
- Clear separation of concerns  
- Practical TypeScript features  
- Realistic REST endpoints — **without heavy frameworks or external validators**

---

## 🎯 Features – Demonstrated Skills

- 📚 **Course management** via REST API (`/courses`)
- 👤 **User management** (`/users`)
- 🧱 **OOP concepts** (classes, basic service logic, strong typing)
- 🧠 **TypeScript usage**:
  - Type aliases for data models  
  - Lightweight manual validation  
  - Separation of routing, logic, and type definitions  
- 📦 **Modular project structure**
- 🗂️ JSON-based storage for simple persistence
- 🧪 **Unit tests** for core logic (services, validation, and edge cases)

---

## 🚀 Getting Started

### Requirements

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
git clone git@github-alt:Sternenwarte88/Typescript-demo.git
cd Typescript-demo
npm install
```

### Scripts

| Command         | Description                                      |
|-----------------|--------------------------------------------------|
| `npm run dev`   | Start development mode using `ts-node-dev`       |
| `npm run build` | Transpile TypeScript into `/dist`                |
| `npm start`     | Run the production server from `dist/index.js`   |
| `npm test`      | Run the unit test suite                          |

```bash
npm run dev
npm run build
npm start
npm test
```

---

## 🔁 Example Requests (curl/Postman)

### Create User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Anna", "email": "anna@example.com", "role": "student"}'
```

Allowed roles: `admin`, `instructor`, `student`.

---

### Create Course

```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TypeScript Basics",
    "description": "Introductory course for beginners",
    "price": 99.99,
    "tags": ["typescript", "beginner"],
    "author": "Max Mustermann"
  }'
```

- `price` must be a number  
- `tags` must be an array of strings  

---

## 🧱 Project Structure

```plaintext
src/
├── controllers/      # REST request handlers
├── models/           # Data models (User, Course)
├── routes/           # Express routers
├── services/         # Business logic
├── types/            # Type definitions
├── utils/            # Helper functions (e.g. ID generator)
└── index.ts          # Application entry point
```

---

## ⚙️ Technologies & Concepts

| Topic                    | Implementation                                    |
|--------------------------|----------------------------------------------------|
| **TypeScript**           | Type aliases, strong typing, modular structure     |
| **Express.js**           | Routing & REST endpoints                           |
| **Manual validation**    | Basic checks without external validation libraries |
| **Modularization**       | Separation of logic, routes, and type definitions  |
| **File-based storage**   | JSON files as a simple database alternative        |
| **Unit testing**         | Automated tests for core business logic            |

---

## 💼 Purpose & Showcase Value

The CourseManager API was developed as a personal project to demonstrate **practical TypeScript skills in backend development**.

Goals of this project:

- Provide realistic, easy-to-understand REST endpoints  
- Showcase clean, maintainable architecture patterns  
- Use TypeScript in a transparent, beginner-friendly way  
- Avoid framework complexity to focus on fundamentals  
- Demonstrate basic **unit testing** and test-driven thinking

This repository can be used as a **portfolio project in job applications**.

---

## 👤 Contact

Project & implementation: **[Stephan aka Sternenwarte88](https://github.com/Sternenwarte88)**  

Feedback or questions? Feel free to open an issue or reach out via GitHub.
