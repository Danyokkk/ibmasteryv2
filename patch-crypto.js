// patch-crypto.js
try {
  if (typeof globalThis.crypto === 'undefined' || typeof globalThis.crypto.getRandomValues !== 'function') {
    const { webcrypto } = require('crypto');
    if (webcrypto && typeof webcrypto.getRandomValues === 'function') {
      globalThis.crypto = webcrypto;
      console.log('Patched globalThis.crypto with Node webcrypto');
    }
  }
} catch (e) {
  // ignore
}
