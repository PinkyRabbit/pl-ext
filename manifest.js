import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import axios from "axios";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const distributionDirectory = path.join(__dirname, "dist");
if (!fs.existsSync(distributionDirectory)){
    fs.mkdirSync(distributionDirectory);
}

const mainExtensionFileName = "main.js";
const popupMarkdownFileName = "popup.html";

const permissions = [
    "storage", 
    "activeTab",
    "scripting",
];

const iconSizes = ["16", "32", "48", "128"];
async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath, { flags: 'a+' }))
            .on('error', reject)
            .once('close', () => resolve(filepath)); 
    });
}
const iconDirectory = path.join(__dirname, "dist/icons");
const defaultIcon = {};
const icons = {};
const downloadIcons = [];
if (!fs.existsSync(iconDirectory)){
    fs.mkdirSync(iconDirectory);
}
for (const v of iconSizes) {
    const defaultIconInWeb = `https://cdn3.iconfinder.com/data/icons/valentines-day-65/128/_Mouth_tongue_sex_blowjob_teeth-${v}.png`;
    const defaultIconName = `default_icon_${v}.png`;
    defaultIcon[v] = `icons/${defaultIconName}`;
    const defaultIconPath = path.join(__dirname, "dist", defaultIcon[v]);
    // eslint-disable-next-line unicorn/prefer-top-level-await
    downloadIcons.push(downloadImage(defaultIconInWeb, defaultIconPath));

    // const iconInWeb = `https://cdn2.iconfinder.com/data/icons/sexual-positions/239/sex-007-${v}.png`;
    const iconInWeb = `https://cdn2.iconfinder.com/data/icons/sexual-positions/239/sex-013-${v}.png`;
    const iconName = `icon_${v}.png`;
    icons[v] = `icons/${iconName}`;
    const iconPath = path.join(__dirname, "dist", icons[v]);
    // eslint-disable-next-line unicorn/prefer-top-level-await
    downloadIcons.push(downloadImage(iconInWeb, iconPath));
}
Promise.all(downloadIcons);

const settings = {
    manifest_version: 3,
    permissions,
    name: process.env.npm_package_name,
    description: process.env.npm_package_description,
    version: process.env.npm_package_version,
    background: {
      service_worker: mainExtensionFileName,
    },
    action: {
      default_popup: popupMarkdownFileName,
      default_icon: defaultIcon,
    },
    icons,
}

const manifestPath = path.join(__dirname, "dist/manifest.json");

fs.writeFile(manifestPath, JSON.stringify(settings), { encoding: "utf8" }, (error) => {
    console.log(`> Manifest: ${error || "created"}`);
});