import '@testing-library/jest-dom';

// jsdom does not implement window.scrollTo; provide a no-op mock for tests.
if (typeof window !== 'undefined') {
	Object.defineProperty(window, 'scrollTo', {
		writable: true,
		value: jest.fn(),
	});
}
