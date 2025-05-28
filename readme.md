# 📘 CourseManager API – TypeScript Demo Projekt

Willkommen zur **CourseManager API**, einem Lern-Backend-Projekt zur Verwaltung von Online-Kursen
und Teilnehmern – umgesetzt mit **Express.js** und **TypeScript**.  
Ziel ist es, moderne Konzepte wie Klassen, Interfaces, eigene Decorators und zentrale
Fehlerbehandlung realistisch anzuwenden.

---

## 🎯 Features (MVP)

- 📚 Verwaltung von Kursen (`/courses`)
- 👤 Verwaltung von Nutzern (`/users`)
- 📝 Einschreibung von Nutzern in Kurse (`/enroll`)
- ✅ Validierung von Eingaben (z. B. Email, leere Felder)
- 🧠 TypeScript mit Klassen, Interfaces, Generics & Decorators
- 📦 Modularer Aufbau (Models, Services, Controller)
- 🛠 Fehlerhandling via Middleware

---

## 🚀 Getting Started

### 🔧 Voraussetzungen

- Node.js 18+
- npm oder yarn
- Git + SSH-Zugriff

### 🛠 Installation

```bash
git clone git@github-alt:Sternenwarte88/Typescript-demo.git
cd Typescript-demo
npm install
```

### ⚙️ Build & Start

```bash
npm run build   # Transpiliert TypeScript
npm start       # Startet die App (dist/index.js)
```

Alternativ für die Entwicklung:

```bash
npm run dev     # Start über ts-node-dev
```

---

## 🔁 Beispiel-Requests (curl/Postman)

### 👤 Neuen User anlegen

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Anna", "email": "anna@example.com"}'
```

### 📚 Neuen Kurs anlegen

```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{"title": "TypeScript Basics", "description": "Grundlagenkurs", "maxParticipants": 10}'
```

### 📝 User einschreiben

```bash
curl -X POST http://localhost:3000/enroll \
  -H "Content-Type: application/json" \
  -d '{"userId": "1", "courseId": "2"}'
```

---

## 🧱 Projektstruktur

```bash
src/
├── controllers/    # Request-Handling
├── decorators/     # Custom Decorators (@Required, @Default)
├── middlewares/    # Fehlerhandling
├── models/         # Datenmodelle & abstrakte Basis
├── routes/         # Express-Router
├── services/       # Geschäftslogik
├── types/          # Interfaces & Typen
├── utils/          # Validierung etc.
└── index.ts        # Einstiegspunkt
```

---

## ⚙️ Technologien & Konzepte

| Thema                | Verwendung im Projekt                          |
| -------------------- | ---------------------------------------------- |
| **TypeScript**       | Klassen, Interfaces, Generics, Utility Types   |
| **Express.js**       | HTTP API                                       |
| **reflect-metadata** | Custom Decorators für Required & Default       |
| **Zod / Eigenbau**   | Eingabevalidierung                             |
| **Modularisierung**  | Trennung von Routes, Services, Controller etc. |
| **Fehlerhandling**   | Zentrale Middleware für Exceptions             |

---

## 🧪 Hintergrund & Ziel

Dieses Projekt ist **im Eigenstudium entstanden** und baut auf dem Abschluss des Udemy-Kurses  
**„Understanding TypeScript – 2024 Edition“** von Maximilian Schwarzmüller auf.

🎓 Ziel war es, die dort vermittelten Konzepte wie:

- Klassen & Interfaces
- Generics & Utility Types
- Decorators mit reflect-metadata
- Modularisierung & saubere Architektur

...nicht nur theoretisch zu verstehen, sondern **praxisnah in einem eigenständigen Backend-Projekt
umzusetzen**.

So dient die CourseManager API als Proof-of-Concept und Demonstration der erworbenen Fähigkeiten.
