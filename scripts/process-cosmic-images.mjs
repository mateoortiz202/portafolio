import sharp from "sharp";
import path from "node:path";

const SCRATCH =
  "C:/Users/mortiz/AppData/Local/Temp/claude/C--Users-mortiz-Documents-I/89a73814-27b0-45e6-a97c-914e9fd000f1/scratchpad";
const OUT_DIR = path.resolve("public/images/cosmic");
const SIZE = 900;

const jobs = [
  { in: "galaxy.jpg", out: "galaxy.webp" },
  { in: "star.jpg", out: "star.webp" },
  { in: "nebula.jpg", out: "nebula.webp" },
  { in: "planet.jpg", out: "planet.webp" },
  { in: "blackhole.jpg", out: "blackhole.webp" },
];

for (const job of jobs) {
  const inputPath = path.join(SCRATCH, job.in);
  const outputPath = path.join(OUT_DIR, job.out);
  await sharp(inputPath)
    .resize(SIZE, SIZE, { fit: "cover", position: "attention" })
    .webp({ quality: 82 })
    .toFile(outputPath);
  console.log("wrote", outputPath);
}
