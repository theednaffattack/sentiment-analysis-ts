import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import fse from "fs-extra";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const libName = "natural";

const replace =
  "/Users/eddienaff/Documents/github/theednaffattack/sentiment-analysis-ts/node_modules/natural/";

const pathToLib = path.join(__dirname, "..", "node_modules", libName);
const input = pathToLib + "/**/*.json";
const outDir = path.join(__dirname, "..", "libs", libName);

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
async function copyFiles(data: string[]) {
  //   const newPath = path.join(outDir, "");
  //   const newData = data.map((path) => path.replace(replace, newPath));

  // Just log for now

  Promise.all(
    data.map(async (file) => {
      const pathToFile = file.replace(replace, "");
      const newPath = path.join(outDir, pathToFile);
      console.log("attempt", { from: file, to: newPath });

      return fse
        .copy(file, file.replace(replace, newPath))
        .then(() => {
          console.log("success!", { from: file, to: newPath });
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    })
  );
}
// Copy all NON JS files
// Convert and generate all JS files
glob(input)
  .then(copyFiles)
  .catch((err) => {
    console.error("Glob ERROR", err);
  });
