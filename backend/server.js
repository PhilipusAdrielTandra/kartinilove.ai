import express from "express";
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Kartini AI server running on port 5000");
});
