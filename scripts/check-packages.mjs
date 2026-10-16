// Fails when a package imports a module it is not allowed to depend on (keeps the graph one-way).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/packages";

/** Each package may import only the packages listed here. */
const ALLOWED = {
  "module-common": [],
  "module-quote": ["module-common"],
  "module-catalog": ["module-common", "module-quote"],
  "module-customer": ["module-common", "module-quote", "module-catalog"],
  "module-theme": ["module-common", "module-quote", "module-catalog", "module-customer"],
};

const files = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : /\.(tsx?|mjs)$/.test(name) ? [path] : [];
  });

const problems = [];
for (const pkg of readdirSync(ROOT)) {
  const allowed = ALLOWED[pkg];
  if (!allowed) {
    problems.push(`${ROOT}/${pkg}: unknown package, add it to ALLOWED in scripts/check-packages.mjs`);
    continue;
  }
  for (const file of files(join(ROOT, pkg))) {
    for (const [, target] of readFileSync(file, "utf8").matchAll(/@\/packages\/(module-[a-z-]+)/g)) {
      if (target !== pkg && !allowed.includes(target)) problems.push(`${file}: ${pkg} must not import ${target}`);
    }
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("packages: dependency rules OK");
