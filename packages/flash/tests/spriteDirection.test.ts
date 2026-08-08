import assert from 'node:assert/strict';
import test from 'node:test';
import { getDirection } from '../src/MovieClips/Sprite/direction';

test('getDirection maps cardinal vectors correctly', () => {
  assert.equal(getDirection(0, -1), 'N');
  assert.equal(getDirection(1, 0), 'E');
  assert.equal(getDirection(0, 1), 'S');
  assert.equal(getDirection(-1, 0), 'W');
});

test('getDirection maps diagonal vectors correctly', () => {
  assert.equal(getDirection(1, -1), 'NE');
  assert.equal(getDirection(1, 1), 'SE');
  assert.equal(getDirection(-1, 1), 'SW');
  assert.equal(getDirection(-1, -1), 'NW');
});

test('getDirection returns fallback for zero vectors', () => {
  assert.equal(getDirection(0, 0), 'S');
  assert.equal(getDirection(0, 0, 'N'), 'N');
});

test('getDirection rounds to the nearest octant', () => {
  assert.equal(getDirection(2, -1), 'NE');
  assert.equal(getDirection(2, 1), 'SE');
  assert.equal(getDirection(-2, 1), 'SW');
  assert.equal(getDirection(-2, -1), 'NW');
});
