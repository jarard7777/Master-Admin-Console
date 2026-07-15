# Master Admin Console

This is a personal project I built to help manage and monitor system users in a clean, organized way. I wanted to move away from messy, manual data tracking and build something that actually keeps data secure and organized.

### What it does
At its core, this console takes raw user data and turns it into a structured, real-time dashboard. Instead of just "dumping" data, the system acts like a filter to make sure everything stays secure.

### Why I built it this way
I got tired of seeing "dirty data" (like bad formatting or dangerous code) break dashboards. So, I built this to solve three main problems:
* **Security:** I included a sanitization layer that automatically cleans any inputs (like scripts or weird characters) so the console can't be hacked or injected with bad code.
* **Reliability:** I built a custom parsing engine using Regex. If an entry in my data file is formatted incorrectly, the system just ignores that bad line instead of crashing the whole dashboard.
* **Organization:** It takes flat, messy text data and moves it into a proper SQL database. This makes it really easy to run calculations, like tracking how many users are "Active" versus "Offline" and calculating system efficiency.

### How it works
1. **The Gateway:** When you add a new user via the web form, it saves that info into a text file.
2. **The Parser:** Every time you load the page, the console reads that text file, cleans it up, and validates the format.
3. **The Locker:** The clean data is pushed into an SQLite database.
4. **The View:** The dashboard pulls the data from the database, does some quick math to show your efficiency stats, and displays everything in a clean, easy-to-read table.

### My Tech Stack
* **Node.js & Express:** To handle the web server and the routing.
* **SQLite:** For storing the data locally in a safe, structured way.
* **Regex & Custom Sanitization:** To make sure the data coming in is clean and safe to display.
