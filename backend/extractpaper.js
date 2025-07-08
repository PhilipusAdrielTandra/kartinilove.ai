import fs from "fs";
import path from "path";
import pdf from "pdf-parse/lib/pdf-parse.js";
import fg from "fast-glob";

const papersDir = path.join(process.cwd(), "papers");

const pdfFiles = await fg("papers/**/*.pdf");

const chunksByCategory = {};

for (const filePath of pdfFiles) {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdf(dataBuffer);
  const text = pdfData.text;

  const relativePath = path.relative(papersDir, filePath);
  const category = relativePath.split(path.sep)[0]; 
  const filename = path.basename(filePath);

  const paragraphs = text.match(/(.|[\r\n]){1,1000}/g) || [];

  const chunked = paragraphs.map((t, i) => ({
    id: `${filename}-chunk-${i}`,
    text: t.trim(),
    source: filename,
  }));

  chunksByCategory[category] ??= [];
  chunksByCategory[category].push(...chunked);

  console.log(`✅ Extracted ${chunked.length} chunks from: ${filePath}`);
}

for (const category in chunksByCategory) {
  const chunks = chunksByCategory[category];
  const outFile = `chunks-${category}.json`;
  fs.writeFileSync(outFile, JSON.stringify(chunks, null, 2));
  console.log(`💾 Wrote ${chunks.length} chunks to ${outFile}`);
}
