const express = require('express');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Tell Express to automatically unpack form data from Chrome
app.use(express.urlencoded({ extended: true }));
const PORT = 5000;

// THE SANITIZATION GATEWAY
function escapeHTML(text) {
    if (!text) return '';
    return text
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Initialize Machine #2: Connect to the SQLite Database Locker
const db = new sqlite3.Database('tasks.db', (err) => {
    if (err) console.error("Database initialization failed:", err.message);
    else console.log("Machine #2: Database Locker linked safely.");
});

// Setup the database structure automatically on ignition
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS system_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        status TEXT,
        role TEXT
    )`);
});

// ==========================================
// ROUTE 1: THE HOME PAGE DISPLAY GET REQUEST
// ==========================================
app.get('/', (req, res) => {
    // 1. MACHINE #3: Read the raw unstructured text file from storage
    fs.readFile('data.txt', 'utf8', (err, rawData) => {
        if (err) return res.status(500).send("Master Engine Error: Missing data.txt");

        const lines = rawData.trim().split('\n');
        
        // Clear old records so we don't duplicate on every single page refresh
        db.run(`DELETE FROM system_logs`, () => {
            
            // Insert the freshly parsed file items directly into the Database Locker
            const stmt = db.prepare(`INSERT INTO system_logs (username, status, role) VALUES (?, ?, ?)`);
            
            lines.forEach((line) => {
                if (!line.includes('|')) return;

                const parts = line.split('|');
                if (parts.length !== 3) {
                    console.log(`⚠️ WARNING: Dropping corrupt data entry line -> "${line}"`);
                    return;
                }
                const username = parts[0].replace('User:', '').trim();
                const status = parts[1].replace('Status:', '').trim();
                const role = parts[2].replace('Role:', '').trim();
                stmt.run(username, status, role);
            });
            
            stmt.finalize(() => {
                
                // 2. MACHINE #2 & #4: Retrieve the data out of the database to calculate metrics
                db.all(`SELECT * FROM system_logs`, [], (err, rows) => {
                    if (err) return res.status(500).send("Database extraction failure.");

                    // Run the calculation math logic
                    const totalTasks = rows.length;
                    let completeCount = 0;
                    let maintenanceCount = 0;
                    let offlineCount = 0;

                    let tableRowsHtml = '';

                    rows.forEach(row => {
                        if (row.status === "Active") completeCount++;
                        if (row.status === "Maintenance") maintenanceCount++;
                        if (row.status === "Offline") offlineCount++;

                        const safeUsername = escapeHTML(row.username);
                        const safeRole = escapeHTML(row.role);

                        tableRowsHtml += `
                        <tr>
                            <td>${safeUsername}</td>
                            <td><span class="status-badge ${row.status}">${row.status}</span></td>
                            <td>${safeRole}</td>
                        </tr>`;
                    });

                    const efficiencyRate = totalTasks > 0 ? Math.round((completeCount / totalTasks) * 100) : 0;

                    // 3. THE UNIFIED CONTROL PANEL INTERFACE
                    let htmlResponse = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Jarard's Master Admin Console</title>
                        <style>
                            body { font-family: 'Segoe UI', sans-serif; margin: 40px; background: #0f0f12; color: #e1e1e6; }
                            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
                            .card { background: #171717; padding: 20px; border-radius: 6px;}
                            .card h3 { margin: 0; font-size: 13px; color: #8a8a93; text-transform: uppercase; }
                            .card .value { font-size: 36px; font-weight: bold; margin-top: 10px; color: #00bcff; }
                            table { width: 100%; border-collapse: collapse; background: #17171c; border-radius: 8px; overflow: hidden; border: 1px solid #2e2e38; }
                            th, td { padding: 15px; text-align: left; border-bottom: 1px solid #2e2e38; }
                            th { background-color: #1f1f29; color: #00bcff; text-transform: uppercase; font-size: 12px; }
                            .status-badge { padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 11px; }
                            .Active { background: #2ec4b6; color: #fff; }
                            .Maintenance { background: #ff9f1c; color: #fff; }
                            .Offline { background: #e71d36; color: #fff; }
                            .progress-bar { background: #2ec4b6; height: 12px; border-radius: 6px; width: ${efficiencyRate}%; transition: width 0.4s; }
                            .progress-track { background: #2e2e38; border-radius: 6px; margin-top: 10px; }
                            .form-container { background: #17171c; padding: 20px; border-radius: 8px; border: 1px solid #2e2e38; margin-bottom: 30px; }
                            .form-container h3 { margin-top: 0; color: #00bcff; }
                            input, select, button { padding: 10px; margin-right: 10px; background: #2e2e38; border: 1px solid #444; color: #fff; border-radius: 4px; }
                            button { background: #00bcff; color: #0f0f12; font-weight: bold; cursor: pointer; border: none; }
                            button:hover { background: #0094cc; }
                        </style>
                    </head>
                    <body>
                        <h1>🖥️ Jarard's Unified Master Administration Console</h1>
                        <p style="color: #8a8a93;">Ecosystem Status: <span style="color: #2ec4b6; font-weight: bold;">ALL ENGINES OPERATIONAL</span></p>
                        <hr style="border: 1px solid #2e2e38; margin-bottom: 30px;">

                        <div class="grid">
                            <div class="card"><h3>Total Monitored Accounts</h3><div class="value">${totalTasks}</div></div>
                            <div class="card"><h3>Active & Healthy</h3><div class="value" style="color: #2ec4b6;">${completeCount}</div></div>
                            <div class="card"><h3>System Efficiency</h3><div class="value">${efficiencyRate}%</div><div class="progress-track"><div class="progress-bar"></div></div></div>
                        </div>

                        <div class="form-container">
                            <h3>➕ Add System User</h3>
                            <form action="/submit-form" method="POST">
                                <input type="text" name="username" placeholder="Enter Username" required>
                                <select name="status">
                                    <option value="Active">Active</option>
                                    <option value="Offline">Offline</option>
                                </select>
                                <input type="text" name="role" placeholder="Enter Job Role" required>
                                <button type="submit">Submit to System</button>
                            </form>
                        </div>

                        <h2>📂 Live Database Table (Machine #2 + Machine #3)</h2>
                        <table>
                            <tr><th>User Account</th><th>Network Status</th><th>Security Rank</th></tr>
                            ${tableRowsHtml}
                        </table>
                    </body>
                    </html>`;

                    res.send(htmlResponse);
                });
            });
        });
    });
});

// ==========================================
// ROUTE 2: THE FORM CAPTURE POST REQUEST
// ==========================================
app.post('/submit-form', (req, res) => {
    const username = req.body.username;
    const status = req.body.status;
    const role = req.body.role;

    // Format the line cleanly to ensure it works nicely with our parser rules
    const formattedLine = `\nUser: ${username} | Status: ${status} | Role: ${role}`;

    fs.appendFile('data.txt', formattedLine, (err) => {
        if (err) {
            console.error("Failed to write to file:", err);
            return res.status(500).send("System Error: Could not save data.");
        }
        
        // Return to home page to see changes automatically processed!
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`⚡ JARARD'S MASTER ADMIN CONSOLE ONLINE ON PORT ${PORT} ⚡`);
});
