import sharp from "sharp";
import path from "node:path";

const SCRATCH =
  "C:/Users/mortiz/AppData/Local/Temp/claude/C--Users-mortiz-Documents-I/89a73814-27b0-45e6-a97c-914e9fd000f1/scratchpad";
const OUT_DIR = path.resolve("public/images/cosmic");
const SIZE = 900;

// Único objeto cósmico del sitio: la galaxia del Hero (ver lib/galaxy.ts).
const jobs = [{ in: "galaxy.jpg", out: "galaxy.webp", fit: "cover" }];

for (const job of jobs) {
  const inputPath = path.join(SCRATCH, job.in);
  const outputPath = path.join(OUT_DIR, job.out);
  await sharp(inputPath)
    .resize(SIZE, SIZE, {
      fit: job.fit,
      position: "attention",
      background: job.background,
    })
    .webp({ quality: 82 })
    .toFile(outputPath);
  console.log("wrote", outputPath);
}
