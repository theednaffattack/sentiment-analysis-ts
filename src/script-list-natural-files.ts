import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { transform } from "cjstoesm";
import { asyncWrapper } from "./utils.ts/async-wrapper";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const pathToNatural = path.join(__dirname, "..", "node_modules", "natural");

const outputPath = path.join(__dirname, "..", "libs", "natural");

const oldValue =
  "/Users/eddienaff/Documents/github/theednaffattack/sentiment-analysis-ts/src/Users/eddienaff/Documents/github/theednaffattack/sentiment-analysis-ts/node_modules/natural/";
const newValue =
  "/Users/eddienaff/Documents/github/theednaffattack/sentiment-analysis-ts/libs/natural";

// Adapted from: https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js#get-all-the-files
function getAllFiles(dirPath: string, arrayOfFiles: string[]) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

// Copy all NON JS files
// Convert and generate all JS files

// Maybe do it in one shot?

const libName = "natural";

const pathToLib = path.join(__dirname, "..", "node_modules", libName);
const input = pathToLib + "/**/*.*";
const outDir = path.join(__dirname, "..", "libs", libName);

transform({
  input: input,
  outDir: outDir,
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

// let transformExample: typeof data = { files: [{ fileName: "", text: "" }] };
