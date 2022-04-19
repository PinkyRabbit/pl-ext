import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const settings = {
    name: process.env.npm_package_name,
    description: process.env.npm_package_description,
    version: process.env.npm_package_version,
    manifest_version: 3,
    background: {
      service_worker: "background.js"
    },
    permissions: ["storage"],
    action: {
      default_popup: "popup.html",
      default_icon: {
        "16": "/images/get_started16.png",
        "32": "/images/get_started32.png",
        "48": "/images/get_started48.png",
        "128": "/images/get_started128.png"
      }
    }
}

const manifestPath = path.join(__dirname, "dist/manifest.json");

fs.writeFile(manifestPath, JSON.stringify(settings), { encoding: "utf8" }, (error) => {
    console.log(`> Manifest: ${error || "created"}`);
});