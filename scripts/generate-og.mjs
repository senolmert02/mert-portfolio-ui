import sharp from "sharp";
import fs from "fs";
import path from "path";

const svgPath = path.resolve("public/senol-mert-sar.svg");
const outPath = path.resolve("public/og-image.png");

const svgBuffer = fs.readFileSync(svgPath);

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
})
  .composite([
    {
      input: await sharp(svgBuffer)
        .resize({ width: 800, height: 400, fit: "inside" })
        .png()
        .toBuffer(),
      gravity: "center",
    },
  ])
  .png()
  .toFile(outPath);

console.log("OG image created:", outPath);
