import assert from "node:assert";
import { test } from "node:test";
import { bearerToken, ownsSubject, recentlyAuthenticated } from "../src/auth";

test("Bearer parsing fails closed", () => {
  assert.equal(bearerToken(undefined), null);
  assert.equal(bearerToken("Basic abc"), null);
  assert.equal(bearerToken("Bearer"), null);
  assert.equal(bearerToken("Bearer token-value"), "token-value");
  assert.equal(bearerToken("bearer token-value extra"), null);
});

test("subject authorization accepts only matching uid or verified email", () => {
  const principal = { uid: "uid-1", email: "Owner@Example.com", authTime: 100 };
  assert.equal(ownsSubject(principal, "uid-1"), true);
  assert.equal(ownsSubject(principal, "owner@example.com"), true);
  assert.equal(ownsSubject(principal, "other@example.com"), false);
});

test("destructive operations require recent authentication", () => {
  const principal = { uid: "uid-1", authTime: 1_000 };
  assert.equal(recentlyAuthenticated(principal, 1_899), true);
  assert.equal(recentlyAuthenticated(principal, 1_901), false);
  assert.equal(recentlyAuthenticated({ ...principal, authTime: 0 }, 1_001), false);
  assert.equal(recentlyAuthenticated(principal, 999), false);
});
