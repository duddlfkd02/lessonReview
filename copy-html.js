const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");
const distDir = path.join(__dirname, "dist");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

fs.readdirSync(srcDir).forEach((file) => {
  if (file.endsWith(".html") || file.endsWith(".js")) {
    fs.copyFileSync(path.join(srcDir, file), path.join(distDir, file));
  }
});
