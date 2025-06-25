const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware, um statische Dateien bereitzustellen
app.use(express.static("public"));

// Route zum Abrufen der IP-Adresse
app.get("/api/ip", (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    res.json({ ip });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
