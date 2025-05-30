# 📘 CourseManager API – TypeScript Showcase-Projekt

Willkommen zur **CourseManager API**, einem strukturierten Backend-Projekt zur Verwaltung von Online-Kursen und Teilnehmern – entwickelt mit **Express.js** und **TypeScript**.

Dieses Projekt dient als **technisches Showcase**, um relevante TypeScript-Fähigkeiten zu demonstrieren:  
🔹 saubere Architektur,  
🔹 klare Trennung von Verantwortlichkeiten,  
🔹 häufig genutzte Sprachfeatures,  
🔹 realistische REST-Schnittstellen – **ohne Framework-Magic oder externe Validatoren**.

---

## 🎯 Features – Demonstrierte Kompetenzen

- 📚 **Kurs-Management** via REST-API (`/courses`)
- 👤 **Nutzerverwaltung** (`/users`)
- 🧱 **OOP**: Klassen, einfache Servicelogik, Typsicherheit
- 🧠 **TypeScript Features**:
  - Type Aliases für Datenmodelle
  - Primitive manuelle Validierung
  - Saubere Trennung von Routing, Logik & Typen
- 📦 **Modularer Aufbau** (Controller, Services, Routes, Types)
- 🗂️ JSON-Dateien als einfacher Persistenz-Ersatz

---

## 🚀 Getting Started

### Voraussetzungen

- Node.js 18+
- npm oder yarn
- Git

### Installation

```bash
git clone git@github-alt:Sternenwarte88/Typescript-demo.git
cd Typescript-demo
npm install
```

### Scripts

| Befehl          | Beschreibung                                 |
|------------------|----------------------------------------------|
| `npm run dev`     | Starte das Projekt im Watch-Modus mit `ts-node-dev` |
| `npm run build`   | Transpiliere TypeScript in `/dist`           |
| `npm start`       | Starte die App aus dem `/dist`-Verzeichnis   |

```bash
npm run dev      # Entwicklung
npm run build    # Build
npm start        # Produktion (dist/index.js)
```

---

## 🔁 Beispiel-Requests (curl/Postman)

### 👤 User anlegen

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Anna", "email": "anna@example.com", "role": "student"}'
```

➡️ `role` kann `"admin"`, `"instructor"` oder `"student"` sein

---

### 📚 Kurs anlegen

```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TypeScript Basics",
    "description": "Grundlagenkurs für Einsteiger",
    "price": 99.99,
    "tags": ["typescript", "beginner"],
    "author": "Max Mustermann"
  }'
```

➡️ `price` muss eine Zahl sein, `tags` ist ein Array von Strings

---

## 🧱 Projektstruktur

```plaintext
src/
├── controllers/      # REST-Request-Logik
├── models/           # Datenmodelle (z. B. User, Course)
├── routes/           # Express-Router
├── services/         # Geschäftslogik
├── types/            # Typdefinitionen
├── utils/            # Helferfunktionen (z. B. ID-Generator)
└── index.ts          # Einstiegspunkt
```

---

## ⚙️ Technologien & Konzepte

| Thema                    | Umsetzung im Projekt                                   |
|--------------------------|--------------------------------------------------------|
| **TypeScript**           | Type Aliases, Strukturierung, Typisierung              |
| **Express.js**           | Routing & REST-API                                     |
| **Manuelle Validierung** | Basisprüfungen ohne externe Libraries                  |
| **Modularisierung**      | Trennung von Logik, Typen und Struktur                 |
| **Dateibasierte Speicherung** | JSON-Dateien als Ersatz für Datenbank       |

---

## 💼 Ziel & Einsatz als Showcase

Die CourseManager API wurde im Rahmen eines Eigenprojekts entwickelt, um **relevante TypeScript-Fähigkeiten im Backend-Kontext** zu demonstrieren.

Ziel war es, einen klar strukturierten API-Server aufzubauen, der:

- realistische REST-Schnittstellen bietet
- saubere Code-Trennung verfolgt
- TypeScript typisch und verständlich einsetzt
- ohne Framework-Ballast funktioniert

Das Projekt kann als **Portfolio-Beitrag in Bewerbungen** genutzt werden.

---

## 👤 Kontakt

Projekt & Umsetzung: [Stefan aka Sternenwarte88](https://github.com/Sternenwarte88)  
Fragen oder Feedback? Gerne per Issue oder Mail!
