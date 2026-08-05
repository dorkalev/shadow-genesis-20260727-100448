import assert from "node:assert";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";

test("Firestore client access is denied by default", () => {
  const rules = readFileSync(resolve(__dirname, "../../../firestore.rules"), "utf8");
  assert.match(rules, /allow read, write: if false/);
  assert.doesNotMatch(rules, /allow (read|write|read, write): if true/);
});
