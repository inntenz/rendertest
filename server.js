const express = require("express");
const axios = require("axios"); // Zum Abrufen der API-Daten
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware, um statische Dateien bereitzustellen
app.use(express.static("public"));

// Route zum Abrufen der IP-Adresse und des Standorts
app.get("/api/ip", async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const cleanIp = ip.split(",")[0]; // Entfernt ggf. mehrere IPs (falls Proxy)
    
    try {
        // Anfrage an die kostenlose Geolocation-API
        const response = await axios.get(`http://ip-api.com/json/${cleanIp}`);
        const data = response.data;

        res.json({
            ip: cleanIp,
            location: {
                country: data.country,
                region: data.regionName,
                city: data.city,
                isp: data.isp,
            }
        });
    } catch (error) {
        console.error("Error fetching IP data:", error);
        res.status(500).json({ error: "Failed to fetch IP location" });
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
