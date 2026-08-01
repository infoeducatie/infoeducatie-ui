import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const translationsRoot = path.resolve("src/translations");
const languages = ["ro", "en"];

function flatten(value, prefix = "") {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    flatten(child, prefix ? `${prefix}.${key}` : key),
  );
}

async function readCatalog(language, filename) {
  const source = await readFile(
    path.join(translationsRoot, language, filename),
    "utf8",
  );
  return JSON.parse(source);
}

const fileLists = await Promise.all(
  languages.map(async (language) =>
    (await readdir(path.join(translationsRoot, language)))
      .filter((filename) => filename.endsWith(".json"))
      .sort(),
  ),
);

const failures = [];
if (JSON.stringify(fileLists[0]) !== JSON.stringify(fileLists[1])) {
  failures.push("Romanian and English translation folders contain different files.");
}

for (const filename of new Set(fileLists.flat())) {
  try {
    const [romanian, english] = await Promise.all(
      languages.map((language) => readCatalog(language, filename)),
    );
    const romanianKeys = flatten(romanian).sort();
    const englishKeys = flatten(english).sort();

    if (JSON.stringify(romanianKeys) !== JSON.stringify(englishKeys)) {
      const onlyRomanian = romanianKeys.filter((key) => !englishKeys.includes(key));
      const onlyEnglish = englishKeys.filter((key) => !romanianKeys.includes(key));
      failures.push(
        `${filename}: key mismatch` +
          (onlyRomanian.length ? `; missing in en: ${onlyRomanian.join(", ")}` : "") +
          (onlyEnglish.length ? `; missing in ro: ${onlyEnglish.join(", ")}` : ""),
      );
    }
  } catch (error) {
    failures.push(`${filename}: ${error.message}`);
  }
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Translation catalogs match across ${fileLists[0].length} namespaces.\n`,
  );
}
