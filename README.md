# Master Admin Console: A Full-Stack Data Pipeline

## Overview
I built this project to demonstrate a complete, robust full-stack ecosystem from scratch using Node.js, Express, and SQLite3. The application features a dynamic data pipeline that ingests unstructured flat-file data, sanitizes it, transitions it into a structured relational database, calculates real-time system metrics, and serves an interactive dashboard interface to the user.

Most importantly, I implemented an active **HTTP POST feedback loop**, allowing real-time data input directly from Google Chrome that appends to the source file, instantly refreshing the system analytics.

---

## 🛠️ The 5-Step Architecture & Data Journey
The system acts as a multi-stage machine that handles data persistence, transition, and security:

1. **The User Input (Frontend Interface):** Built an HTML/CSS dashboard with an interactive registration form running locally in the browser.
2. **The HTTP Postal Loop (Express Backend):** When a user submits the form, Chrome packages the data payload into a secure `HTTP POST` request, which is caught and processed by an Express.js server.
3. **The Persistent Data Trail (`data.txt`):** The server appends the new raw data into an unstructured flat-file to ensure persistent storage on the physical hard drive.
4. **The Safe Database Vault (`tasks.db`):** On every page lifecycle, the system runs an **idempotent operation**—it clears the relational SQLite3 table and parses the text file line-by-line to rebuild the state cleanly without duplicating records.
5. **The Metrics Engine & Live Render:** The backend reads the freshly populated database tables, calculates structural metrics (Total Users, Active Statuses, and overall System Efficiency %), and injects the live analytical grids dynamically into the DOM.

---

## 🛡️ Key Technical Implementations & Security

### 1. The Sanitization Gateway (XSS Defense)
To prevent Cross-Site Scripting (XSS) and code-injection vulnerabilities, I built a custom sanitization gate. Every piece of user-generated data moving from the form into the database is intercepted and forced through a character replacement matrix:
* Converts special layout characters (`<`, `>`, `&`, `"`, `'`) into safe HTML entities before rendering.

### 2. Multi-Tiered Guard Clause System
The parsing loop handles system crashes before they can bring down the server by executing validation checks:
* **Structural Check:** Ensures every parsed line contains proper pipe (`|`) delimiters.
* **Corruption Shield:** Rejects data lines that do not split cleanly into exactly 3 expected columns, flagging warnings to the console rather than causing a crash.

---

## 🚀 Tech Stack Used
* **Frontend:** HTML5, CSS3 Grid, Semantic UI Styling
* **Backend Runtime:** Node.js
* **Server Framework:** Express.js
* **Database Management:** SQLite3 (Relational)
* **File System Core:** Native `fs` Modules

---

## 🧠 What I Learned Building This Machine
* **Memory Management vs. Physical Storage:** Mastered the difference between persistent hard drive storage and live server memory (RAM).
* **HTTP Protocol Foundations:** Learned how to structure `GET` and `POST` requests, utilizing urlencoded body-parsing middleware to unpack incoming server payloads safely.
* **Defensive Coding Practices:** Experienced how to identify server crashing vectors (like bracket misplacements, file reading loops, and duplicate database keys) and guard against them actively.