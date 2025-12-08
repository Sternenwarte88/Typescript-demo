# 📘 CourseManager API – TypeScript Showcase Backend

The **CourseManager API** is a deliberately lightweight backend project built with **TypeScript**, **Express.js** and **Vitest**.

It is designed as a **technical showcase** for modern TypeScript backend development, focusing on:

- Clean, layered architecture
- Strong typing and clear domain models
- Declarative validation with **class-validator**
- Automated documentation via **TypeDoc**
- Unit testing of core business logic with **Vitest**

The goal is to demonstrate **practical backend skills** without hiding anything behind heavy frameworks.

---

## 🎯 Showcase Focus

This project is not meant as a full product, but as a **portfolio-ready reference**. It demonstrates:

### ✅ TypeScript as a first-class citizen

- Strict typing across the entire codebase
- Separation of **types**, **models**, **services** and **controllers**
- Use of interfaces, type aliases and enums / union types
- Clear boundaries between layers (Controller → Service → Storage / Utils)

### ✅ Request validation with class-validator

- DTOs (Data Transfer Objects) for incoming requests
- Decorator-based validation with `class-validator` / `class-transformer`
- Consistent validation flow: **parse → validate → handle**
- Clean separation between transport layer and business logic

### ✅ Testing with Vitest

- Unit tests for service-layer logic
- Mocking of JSON-based storage and filesystem access
- Tests for success paths and error cases
- Fast feedback loop without starting the HTTP server

### ✅ Automated documentation with TypeDoc

- Documentation generated directly from TypeScript types and comments
- Developer-focused API overview instead of manual, outdated docs
- Published documentation:
  - **GitHub Pages:** https://sternenwarte88.github.io/Typescript-demo/

### ✅ Conscious use of external libraries

- **Express.js** – minimal HTTP layer and routing
- **class-validator / class-transformer** – declarative validation for DTOs
- **uuid** – ID generation for entities
- **TypeDoc** – documentation generation
- **Vitest** – modern test runner for TypeScript

Each dependency is chosen to highlight specific **backend skills** instead of adding unnecessary complexity.

---

## 🔧 Planned Improvements

These parts are explicitly planned as next steps and tracked in the repository roadmap:

### 🔜 Unified error handling layer

A dedicated error handling concept will be added, including:

- Custom error classes (e.g. `NotFoundError`, `ValidationError`)
- Centralized Express error middleware
- Consistent JSON error responses with status codes

Goal: mimic production-grade error behaviour while staying lightweight.

---

## 🚀 Getting Started

### Requirements

- **Node.js** 18+
- **npm** (or yarn / pnpm)
- **Git**

### Installation

```bash
git clone git@github-alt:Sternenwarte88/Typescript-demo.git
cd Typescript-demo
npm install
```

### Scripts

The project exposes the following npm scripts:

```json
{
  "start": "node ./dist/index.js",
  "build": "tsc",
  "develop": "tsc --watch",
  "test": "vitest run --coverage",
  "doc": "npx typedoc src --plugin typedoc-github-theme"
}
```

Examples:

```
npm run develop
npm run build
npm start
npm test
npm run doc
```
```

----------------- | ------------------------------------------------ |
| `npm run dev`   | Start development server with ts-node-dev        |
| `npm run build` | Compile TypeScript to JavaScript into `dist/`    |
| `npm start`     | Run the compiled production build from `dist/`   |
| `npm test`      | Run the Vitest unit test suite                   |

Examples:

npm run dev
npm run build
npm start
npm test
```

---

## 🔁 Example Requests (curl/Postman)

### Create a user

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Anna",
    "email": "anna@example.com",
    "role": "User"
  }'
```

Allowed roles (example): `Admin`, `User`, `Guest`.

### Create a course

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

Basic rules (example):

- `price` must be a number
- `tags` must be an array of strings

---



---

## 🧪 Testing

The project uses **Vitest** for fast, TypeScript-friendly testing.

Typical patterns in the test suite:

- Service-level tests without starting the HTTP server
- Mocks for the file-based storage layer
- Assertions for both valid and invalid input

Run tests with:

```bash
npm test
```

---

## 📚 Documentation

Documentation is generated automatically using **TypeDoc**.

Generate docs locally:

```bash
npm run doc
npm run docs
```

The generated HTML documentation is available in the `docs/` folder and is also published via GitHub Pages:

- **Online docs:** https://sternenwarte88.github.io/Typescript-demo/

---

## 💼 Purpose & Context

The **CourseManager API** was created as a **showcase project** for backend-focused TypeScript roles. It demonstrates:

- Clean, maintainable code structure
- Type-safe API design with DTOs and validation
- Practical testing skills with Vitest
- Automated documentation workflows
- Conscious use of libraries instead of framework magic

It is ideal as a portfolio reference in job applications or technical discussions.

---

## 👤 Author

Project & implementation: **Stephan aka Sternenwarte88**  
GitHub: https://github.com/Sternenwarte88

Feedback, ideas or suggestions? Feel free to open an issue or start a discussion in the repository.

