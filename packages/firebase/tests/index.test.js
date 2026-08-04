import assert from 'node:assert/strict';
import test from 'node:test';
import { isFirebaseHistoryEnabled } from '../index.js';

test('isFirebaseHistoryEnabled returns false without required env vars', () => {
  const originalEnv = {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  };

  delete process.env.FIREBASE_PROJECT_ID;
  delete process.env.FIREBASE_CLIENT_EMAIL;
  delete process.env.FIREBASE_PRIVATE_KEY;

  try {
    assert.equal(isFirebaseHistoryEnabled(), false);
  } finally {
    process.env.FIREBASE_PROJECT_ID = originalEnv.FIREBASE_PROJECT_ID;
    process.env.FIREBASE_CLIENT_EMAIL = originalEnv.FIREBASE_CLIENT_EMAIL;
    process.env.FIREBASE_PRIVATE_KEY = originalEnv.FIREBASE_PRIVATE_KEY;
  }
});

test('isFirebaseHistoryEnabled returns true when required env vars are present', () => {
  const originalEnv = {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  };

  process.env.FIREBASE_PROJECT_ID = 'project-id';
  process.env.FIREBASE_CLIENT_EMAIL = 'service@example.com';
  process.env.FIREBASE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----';

  try {
    assert.equal(isFirebaseHistoryEnabled(), true);
  } finally {
    process.env.FIREBASE_PROJECT_ID = originalEnv.FIREBASE_PROJECT_ID;
    process.env.FIREBASE_CLIENT_EMAIL = originalEnv.FIREBASE_CLIENT_EMAIL;
    process.env.FIREBASE_PRIVATE_KEY = originalEnv.FIREBASE_PRIVATE_KEY;
  }
});