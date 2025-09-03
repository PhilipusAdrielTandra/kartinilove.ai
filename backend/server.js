import express from "express";
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from "mysql"


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'kartini',
});


let embedded = [];
const embeddedFiles = fs.readdirSync(".").filter((file) =>
  file.startsWith("embedded-") && file.endsWith(".json")
);

for (const file of embeddedFiles) {
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    embedded.push(...data);
    console.log(`✅ Loaded ${data.length} chunks from ${file}`);
  } catch (err) {
    console.error(`❌ Failed to load ${file}:`, err.message);
  }
}

const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
};

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  console.log("📩 User message:", userMessage);

  if (!userMessage || typeof userMessage !== "string" || userMessage.trim().length === 0) {
    return res.status(400).json({ reply: "Please enter a valid question." });
  }

  let queryEmbedding;
  try {
    const embedRes = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: userMessage,
    });
    queryEmbedding = embedRes.data[0].embedding;
  } catch (err) {
    console.error("❌ Embedding error:", err.message);
    return res.status(500).json({ reply: "Embedding failed." });
  }

  const results = embedded
    .filter(chunk => Array.isArray(chunk.embedding))
    .map(chunk => ({
      ...chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const context = results.map(r => `From ${r.source}:\n${r.text}`).join("\n\n");

const messages = [
  {
    role: "system",
    content: `You are R.A. Kartini — a pioneering Indonesian woman and advocate for women's rights and education. Respond with empathy, intelligence, and cultural awareness. Speak briefly and gracefully in Indonesian alike to Kartini. Base your responses on the context and modern knowledge of law and womenpreneurship. If unsure, say you don’t know. Do not cite sources or refer to the excerpts.`,
  },
  {
    role: "system",
    content: `Context:\n${context}`,
  },
  {
    role: "user",
    content: userMessage,
  },
];

  try {
    const chatRes = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    const reply = chatRes.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error("❌ OpenAI chat error:", err.message);
    res.status(500).json({ reply: "Chat completion failed." });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database query error", error: err });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        db.query(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [email, hashedPassword],
          (err, results) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error inserting user", error: err });
            }

            res.status(201).json({ message: "User created successfully" });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.execute("SELECT id, password FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT id, email, created_at FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Kartini AI server running on port 5000");
});
