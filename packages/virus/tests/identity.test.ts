import assert from 'node:assert/strict';
import test from 'node:test';
import { collectDeviceInfo, collectFingerprintSignals } from '../src/index';
import { identityCharacters, randomIdentity, randomIdentityProfile } from '../src/randomIdentity';

test('randomIdentityProfile returns the requested character profile', () => {
  const identity = randomIdentityProfile('biker');

  assert.equal(identity.character, 'biker');
  assert.equal(identity.label, 'Biker');
  assert.equal(identity.svg, '/shared/svg/characters/biker.svg');
  assert.ok(identity.name.startsWith('B1ker'));
  assert.ok(identity.name.length >= 12);
});

test('randomIdentity falls back to a known character', () => {
  const originalRandom = Math.random;
  Math.random = () => 0;

  try {
    const name = randomIdentity();
    assert.equal(typeof name, 'string');
    assert.ok(name.length >= 12);
    assert.ok(identityCharacters.length > 0);
  } finally {
    Math.random = originalRandom;
  }
});

test('collectDeviceInfo and collectFingerprintSignals read browser data', () => {
  const originalWindow = globalThis.window;

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      navigator: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36',
        language: 'en-US',
        languages: ['en-US', 'en'],
        platform: 'Win32',
        vendor: 'Google Inc.',
        hardwareConcurrency: 8,
        maxTouchPoints: 1,
        doNotTrack: '1',
      },
      screen: {
        colorDepth: 24,
        width: 1920,
        height: 1080,
      },
      devicePixelRatio: 2,
    },
  });

  try {
    const deviceInfo = collectDeviceInfo();
    assert.equal(deviceInfo.browser, 'Chrome');
    assert.equal(deviceInfo.os, 'Windows');
    assert.equal(deviceInfo.isMobile, false);

    const signals = collectFingerprintSignals();
    assert.equal(signals.userAgent.includes('Chrome'), true);
    assert.equal(signals.pixelRatio, 2);
    assert.equal(signals.screen, '1920x1080');
  } finally {
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: originalWindow,
    });
  }
});