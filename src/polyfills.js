// Polyfills for Node.js modules
import { Buffer } from 'buffer';

// Make Buffer available globally
if (typeof global !== 'undefined') {
  global.Buffer = Buffer;
}

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// Make sure Buffer is available for Node.js modules
if (typeof globalThis !== 'undefined') {
  globalThis.Buffer = Buffer;
}
