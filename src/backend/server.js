import express from "express";
import cors from "cors";
import mysql from "mysql2";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ================= CORS =================

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5175",
        "https://fresh-connect-ai-3a6m.vercel.app"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ================= GEMINI =================

if (process.env.GEMINI_API_KEY) {
    console.log("✅ Gemini API Key Loaded");
} else {
    console.log("❌ Gemini API Key Missing");
}

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash"
});

// ================= MYSQL =================
// IMPORTANT: "localhost" only works when the DB is on the SAME machine as
// this server. On Render, your MySQL is not reachable via localhost.
// Use a cloud MySQL (Railway / Aiven / Clever Cloud) and set these as
// Environment Variables in your Render dashboard.

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true
    }
});
db.connect((err) => {
    if (err) {
        console.log("❌ MySQL Connection Failed");
        console.log(err.message);
    } else {
        console.log("✅ MySQL Connected Successfully");
    }
});

// ================= HOME =================

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send("🚀 FreshConnect Backend Running");
});

// ================= AI CHATBOT =================

app.post("/ask-ai", async (req, res) => {
    console.log("🔥 ASK AI ROUTE HIT");
    console.log(req.body);

    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                error: "Question required"
            });
        }

        const prompt = `
You are FreshConnect AI Assistant.

Help college freshers.

Topics:
Events,
Clubs,
Faculty,
Timetable,
College Facilities.

Question:
${question}

Answer simply.
`;

        const result = await model.generateContent(prompt);
        const answer = result.response.text();

        res.json({ answer });

    } catch (error) {
        console.log("🔥 Gemini Error");
        console.log(error.message);

        const q = req.body.question?.toLowerCase() || "";
        let answer;

        if (q.includes("event")) {
            answer = "📅 FreshConnect campus events include workshops, hackathons, seminars and cultural activities.";
        } else if (q.includes("club")) {
            answer = "🎯 FreshConnect provides technical, AI, coding and cultural clubs.";
        } else if (q.includes("faculty")) {
            answer = "👨‍🏫 Faculty details are available in Faculty section.";
        } else if (q.includes("timetable")) {
            answer = "📚 Timetable details are available in Timetable section.";
        } else {
            answer = "👋 Hi! I am FreshConnect AI Assistant. I can help with events, clubs, faculty and timetable.";
        }

        res.json({ answer });
    }
});

// ================= EVENTS =================

app.get("/events", (req, res) => {
    db.query("SELECT * FROM events", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// ================= CLUBS =================

app.get("/clubs", (req, res) => {
    db.query("SELECT * FROM clubs", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// ================= FACULTY =================

app.get("/faculty", (req, res) => {
    db.query("SELECT * FROM faculty", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// ================= TIMETABLE =================

app.get("/timetable", (req, res) => {
    db.query("SELECT * FROM timetable", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// ================= REGISTER =================

app.post("/register", (req, res) => {
    console.log("🔥 REGISTER ROUTE HIT");
    console.log(req.body);

    const { name, email, event } = req.body;

    if (!name || !email || !event) {
        return res.status(400).json({
            message: "Missing registration details"
        });
    }

    const sql = `
        INSERT INTO registrations
        (student_name, event_name, email)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, event, email], (err, result) => {
        if (err) {
            console.log("❌ MYSQL INSERT ERROR");
            console.log(err.message);

            return res.status(500).json({
                message: err.message
            });
        }

        console.log("✅ Registration Saved");

        res.json({
            message: "Registration Successful",
            id: result.insertId
        });
    });
});

// ================= SERVER =================
// NOTE: app.listen() should only be called ONCE.
// Your original file called it twice — that's a bug that can crash
// the server (EADDRINUSE) or cause confusing double-logging.

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});