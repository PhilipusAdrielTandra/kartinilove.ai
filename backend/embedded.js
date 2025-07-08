import fs from "fs";
import path from "path";
import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chunkFiles = fs.readdirSync(".").filter(
  (file) => file.startsWith("chunks-") && file.endsWith(".json")
);

const embedText = async (text) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
};

const run = async () => {
  for (const chunkFile of chunkFiles) {
    const category = chunkFile.replace("chunks-", "").replace(".json", "");
    const embeddedFile = `embedded-${category}.json`;

    const chunks = JSON.parse(fs.readFileSync(chunkFile, "utf-8"));
    const existing = fs.existsSync(embeddedFile)
      ? JSON.parse(fs.readFileSync(embeddedFile, "utf-8"))
      : [];

    const embedded = [...existing];
    const existingIds = new Set(existing.map((e) => e.id));

    console.log(`📂 Processing: ${chunkFile} (${chunks.length} chunks)`);

    for (const chunk of chunks) {
      if (existingIds.has(chunk.id)) {
        console.log(`⏭️ Skipped (already embedded): ${chunk.id}`);
        continue;
      }

      try {
        const embedding = await embedText(chunk.text);
        embedded.push({ ...chunk, embedding });
        console.log(`✅ Embedded: ${chunk.id}`);
      } catch (err) {
        console.error(`❌ Failed embedding ${chunk.id}:`, err.message);
      }
    }

    fs.writeFileSync(embeddedFile, JSON.stringify(embedded, null, 2));
    console.log(`💾 Saved to ${embeddedFile} (${embedded.length} total embeddings)`);
  }

  console.log("🎉 All embedding complete.");
};

run();
