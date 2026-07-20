// Run: node download-icons.js
// Place this file in your project root, then run it once.
// All icons will be saved to public/icons/

const https = require("https");
const fs = require("fs");
const path = require("path");

const ICONS_DIR = path.join(__dirname, "public", "icons");

if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// simple-icons CDN: https://cdn.simpleicons.org/<slug>/<color>
const icons = [
  // Frontend
  { file: "html5.svg",       url: "https://cdn.simpleicons.org/html5/E34F26" },
  { file: "css3.svg",        url: "https://cdn.simpleicons.org/css3/1572B6" },
  { file: "javascript.svg",  url: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { file: "react.svg",       url: "https://cdn.simpleicons.org/react/61DAFB" },
  { file: "nextjs.svg",      url: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { file: "tailwindcss.svg", url: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  // Backend
  { file: "nodejs.svg",      url: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { file: "php.svg",         url: "https://cdn.simpleicons.org/php/777BB4" },
  { file: "mysql.svg",       url: "https://cdn.simpleicons.org/mysql/4479A1" },
  { file: "mongodb.svg",     url: "https://cdn.simpleicons.org/mongodb/47A248" },
  { file: "postgresql.svg",  url: "https://cdn.simpleicons.org/postgresql/4169E1" },
  // Languages
  { file: "python.svg",      url: "https://cdn.simpleicons.org/python/3776AB" },
  { file: "java.svg",        url: "https://cdn.simpleicons.org/openjdk/FFFFFF" },
  { file: "c.svg",           url: "https://cdn.simpleicons.org/c/A8B9CC" },
  { file: "cpp.svg",         url: "https://cdn.simpleicons.org/cplusplus/00599C" },
  // Tools
  { file: "git.svg",         url: "https://cdn.simpleicons.org/git/F05032" },
  { file: "github.svg",      url: "https://cdn.simpleicons.org/github/FFFFFF" },
  { file: "vscode.svg",      url: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
  { file: "androidstudio.svg", url: "https://cdn.simpleicons.org/androidstudio/3DDC84" },
  { file: "xampp.svg",       url: "https://cdn.simpleicons.org/xampp/FB7A24" },
  { file: "postman.svg",     url: "https://cdn.simpleicons.org/postman/FF6C37" },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log("Downloading icons to public/icons/ ...\n");
  for (const icon of icons) {
    const dest = path.join(ICONS_DIR, icon.file);
    try {
      await download(icon.url, dest);
      console.log(`✓  ${icon.file}`);
    } catch (err) {
      console.error(`✗  ${icon.file} — ${err.message}`);
    }
  }
  console.log("\nDone! All icons saved to public/icons/");
}

main();
