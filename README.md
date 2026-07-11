# Master Admin Console

A secure full stack metrics tracking dashboard and administrative control panel. This application features an automated backend built to process unstructured data, a robust security gateway, and a high fidelity interface for monitoring internal system metrics in real time.

## Live Demo and Deployment
* **Production Build:** Deployed and running smoothly on Render
* **Status:** Active / Stable

## Technical Stack
* **Backend:** Node.js, Express framework
* **Database:** SQLite (Embedded relational data engine optimized for rapid read and write workflows)
* **Frontend:** Vanilla JavaScript, HTML5, CSS3 (Modular, high fidelity dashboard layouts)
* **Version Control:** Git

## Core Engineering Features

### 1. Sanitization Gateway Layer
To mitigate the risk of Cross Site Scripting (XSS) and injection vectors, all incoming unstructured data payloads flow through a dedicated backend sanitization layer. This middleware enforces strict input parsing and encoding before data hits the storage engine, ensuring the application remains robust against malicious injection attempts.

### 2. High Fidelity Metrics Dashboard
An internal tracking view engineered to render data streams into human readable performance and administrative metrics. The UI communicates directly with native Express API routes to fetch and update states asynchronously without requiring full page lifecycle reloads.

### 3. Optimized Database Workflows
Utilizes a structured SQLite schema configured to maintain relational data integrity while handling rapid analytical updates. The schema design focuses on clean query logic and minimal overhead for analytical data tracking.

## Repository Structure
├── server.js              # Express application entry point and API routing
├── middleware/            # Security and Sanitization Gateway logic
├── models/                # SQLite database schemas and initialize scripts
├── public/                # High fidelity dashboard assets (JS, CSS, HTML)
└── README.md              # Project documentation

## Local Setup and Installation
Follow these steps to clone and spin up the development environment locally:

1. **Clone the repository:**
   git clone https://github.com/your-username/master-admin-console.git

2. **Install project dependencies:**
   npm install

3. **Boot the local development server:**
   npm start
   *The console will be accessible at http://localhost:3000*

## Development Methodology
This system was built with production scalability and clean code in mind. Every major milestone and feature set was systematically tracked, structured, and pushed using atomic Git commits to ensure a transparent, stable version history.

## License
This project is open source and available under the MIT License.

## Contact
For any inquiries or technical discussions regarding this system, feel free to reach out via your professional channels or open an issue directly in the repository.
