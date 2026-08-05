import assert from "node:assert";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { after, before, test } from "node:test";
import { assertFails, initializeTestEnvironment, RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc } from "firebase/firestore";

let env: RulesTestEnvironment;

before(async () => {
  const rules = readFileSync(resolve(__dirname, "../../../firestore.rules"), "utf8");
  assert.match(rules, /allow read, write: if false/);
  env = await initializeTestEnvironment({
    projectId: "demo-shadow",
    firestore: { rules },
  });
});

after(async () => {
  await env?.cleanup();
});

test("unauthenticated Firebase clients cannot read or write any document", async () => {
  const db = env.unauthenticatedContext().firestore();
  await assertFails(getDoc(doc(db, "readings/one")));
  await assertFails(setDoc(doc(db, "readings/one"), { value: 1 }));
});

test("authenticated Firebase clients are also denied because only the Admin runtime may access Firestore", async () => {
  const db = env.authenticatedContext("user-1", { email: "user@example.com" }).firestore();
  await assertFails(getDoc(doc(db, "subjects/user@example.com")));
  await assertFails(setDoc(doc(db, "subjects/user@example.com"), { display_name: "User" }));
});
