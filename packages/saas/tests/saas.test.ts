import test from "node:test";
import assert from "node:assert/strict";
import { CreateAccount, Login, isPublicPath, getRouteZone, SESSION_COOKIE_NAME, createAuthMiddleware } from "../src/index.js";

test("identifies public and authenticated paths accurately", () => {
  assert.equal(isPublicPath("/"), true);
  assert.equal(isPublicPath("/create-account"), true);
  assert.equal(isPublicPath("/sign-in"), true);
  assert.equal(isPublicPath("/forgot-password"), true);
  assert.equal(isPublicPath("/console"), false);
  assert.equal(isPublicPath("/dashboard"), false);

  assert.equal(getRouteZone("/"), "public");
  assert.equal(getRouteZone("/console"), "authenticated");
});

test("exposes session cookie constant", () => {
  assert.equal(SESSION_COOKIE_NAME, "__session");
});

test("createAuthMiddleware returns middleware handler", () => {
  const middleware = createAuthMiddleware({ signInPath: "/sign-in" });
  assert.equal(typeof middleware, "function");
});

test("exposes the Firebase create-account component", () => {
  assert.equal(typeof CreateAccount, "function");
});

test("exposes the Firebase login component", () => {
  assert.equal(typeof Login, "function");
});
